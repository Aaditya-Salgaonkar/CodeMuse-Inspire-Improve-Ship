// app/api/generate-readme/route.js
import axios from "axios";

export async function POST(req) {
  try {
    const { repoUrl } = await req.json();
    if (!repoUrl) {
      return new Response(
        JSON.stringify({ error: "GitHub repo URL is required" }),
        { status: 400 }
      );
    }

    // Extract owner and repo
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)(?:\.git)?/);
    if (!match) {
      return new Response(
        JSON.stringify({ error: "Invalid GitHub repo URL" }),
        { status: 400 }
      );
    }
    const [_, owner, repo] = match;

    // Step 1: Repo metadata
    const repoRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
    const branch = repoRes.data.default_branch;
    const stars = repoRes.data.stargazers_count;
    const forks = repoRes.data.forks_count;
    const license = repoRes.data.license?.name || "No license specified";
    const description = repoRes.data.description || "";

    // Step 2: Languages breakdown
    const langsRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`);
    const languages = Object.keys(langsRes.data).join(", ") || "Unknown";

    // Step 3: Repo tree
    const treeRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
    );
    const allFiles = treeRes.data.tree.map(f => f.path);

    // Step 4: Pick important files
    const importantPatterns = [
      "package.json", "requirements.txt", "setup.py",
      "main.py", "app.js", "index.js",
      "src/", "lib/", "README.md"
    ];
    const importantFiles = allFiles.filter(path =>
      importantPatterns.some(p => path.startsWith(p) || path.endsWith(p))
    );

    // Step 5: Fetch contents
    let codeData = "";
    for (const file of importantFiles.slice(0, 10)) {
      try {
        const fileRes = await axios.get(
          `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`
        );
        codeData += `\n\n### ${file}\n\`\`\`\n${fileRes.data}\n\`\`\`\n`;
      } catch {
        console.warn(`Skipping file: ${file}`);
      }
    }

    // Step 6: Generate badges
    const badges = [
      `https://img.shields.io/github/stars/${owner}/${repo}?style=social`,
      `https://img.shields.io/github/forks/${owner}/${repo}?style=social`,
      `https://img.shields.io/github/license/${owner}/${repo}`,
      `https://img.shields.io/github/languages/top/${owner}/${repo}`,
    ];

    // Step 7: AI Prompt
    const prompt = `
Generate a **detailed and professional GitHub README.md** for this repository.

Repo: ${repoUrl}
Stars: ${stars}
Forks: ${forks}
License: ${license}
Languages: ${languages}

Important project files:
${codeData}

README should include:
- Attractive project title
- Badges section (use this): 
${badges.map(b => `![badge](${b})`).join(" ")}
- Clear description
- Features list
- Tech stack
- Installation steps
- Usage examples
- Contributing guidelines
- License info
`;

    // Step 8: Call OpenRouter
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "z-ai/glm-4.5-air:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message =
      response.data?.choices?.[0]?.message?.content || "No content returned from OpenRouter";

    const finalReadme = `${badges.map(b => `![badge](${b})`).join(" ")}\n\n${message}`;

    return new Response(JSON.stringify({
      content: finalReadme,
      repoData: {
        name: repo,
        owner,
        description,
        stars,
        forks,
        license,
        languages
      },
      badges
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Error in generate-readme API:", err.response?.data || err.message);
    return new Response(
      JSON.stringify({ error: "Failed to generate README" }),
      { status: 500 }
    );
  }
}
