"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function ReadmeGenerator() {
  const [repoUrl, setRepoUrl] = useState("");
  const [readmeContent, setReadmeContent] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");

  const generateReadme = async () => {
    if (!repoUrl) {
      alert("Please enter a GitHub repository URL");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate-readme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });
      const data = await res.json();
      setReadmeContent(data.content || "");
      setRepoData(data.repoData);
      setBadges(data.badges || []);
    } catch (err) {
      console.error(err);
      setReadmeContent("Failed to generate README.");
    }
    setLoading(false);
  };

  const downloadReadme = () => {
    const blob = new Blob([readmeContent], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "README.md";
    link.click();
  };

  const copyRawMarkdown = () => {
    navigator.clipboard.writeText(readmeContent);
    alert("Copied to clipboard!");
  };

  return (
    <div className="font-sans bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-24 flex items-center justify-center text-center overflow-hidden">
        <Particles
          options={{
            fpsLimit: 60,
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
            },
            particles: { color: { value: ["#6366F1","#3B82F6","#9333EA"] }, links: { enable:true, color:"#6366F1", opacity:0.15 }, move:{enable:true, speed:1.2}, number:{value:80}, size:{value:{min:1,max:3}} },
          }}
          className="absolute top-0 left-0 w-full h-full"
        />
        
      </section>

      {/* Generator Section */}
      <section className="pb-12 px-6 max-w-9xl mx-auto space-y-6 mt-12 items-center justify-center flex flex-col">

        {/* Input Box */}
        {!readmeContent && (
          <section>
            <motion.div initial={{opacity:0, y:-50}} animate={{opacity:1, y:0}} transition={{duration:1}} className="relative z-10 px-6">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-500 text-transparent bg-clip-text drop-shadow-lg">
            Generate a README for Any GitHub Repo
          </h1>
           <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto text-gray-300 leading-relaxed text-center">
  Instantly generate professional GitHub README files using AI. Just enter your repository URL below.
</p>

        </motion.div>
          <motion.div initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.8}} className="bg-gradient-to-br from-[#111] to-[#1a1a1a]/ backdrop-blur-2xl p-8 rounded-3xl border border-indigo-900 shadow-[0_0_25px_rgba(99,102,241,0.3)] space-y-6 max-w-5xl mt-20">
            
           
       
            <input
              type="text"
              placeholder="GitHub Repository URL"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full p-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button onClick={generateReadme} disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 transition rounded-xl py-4 font-semibold shadow-lg">
              {loading ? "Generating..." : "Generate README"}
            </button>
          </motion.div>
            </section>
        )}

        {/* Premium Layout */}
        {readmeContent && repoData && badges.length > 0 && (
          <motion.div initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.8}} className="space-y-6">
            <motion.div initial={{opacity:0, y:-50}} animate={{opacity:1, y:0}} transition={{duration:1}} className="relative z-10 px-6">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-500 text-transparent bg-clip-text drop-shadow-lg">
            Here&apos;s your README
          </h1>
          
        </motion.div>
            {/* Repo Info */}
            <div className="bg-white/5 backdrop-blur-md p-6 mb-10 flex flex-row justify-between rounded-3xl border border-indigo-900 shadow-xl">
              <div>
                <h2 className="text-4xl font-bold mb-5 text-indigo-400">{repoData.name}</h2>
              <p className="text-gray-300 mb-5">{repoData.description}</p>
              <div className="flex flex-wrap gap-2 my-5">
                {badges.map((b,i) => (
                  <Image key={i} src={b} alt="badge" width={120} height={20} unoptimized />
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-gray-400 text-lg font-bold mt-2">
                <span>Owner: {repoData.owner}</span>
                <span>Stars: {repoData.stars}</span>
                <span>Forks: {repoData.forks}</span>
                <span>License: {repoData.license}</span>
                <span>Languages: {repoData.languages}</span>
              </div>
              </div>
              <div>
                {/* Download Button */}
            <div className="flex justify-end">
              <button onClick={downloadReadme} className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold shadow-lg">Download README.md</button>
            </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-900 overflow-hidden">
              <div className="flex border-b border-indigo-700">
                <button className={`flex-1 py-2 text-center font-semibold transition ${activeTab === "preview" ? "bg-indigo-900/50 text-white" : "text-indigo-300 hover:bg-indigo-800/30"}`} onClick={() => setActiveTab("preview")}>Markdown Preview</button>
                <button className={`flex-1 py-2 text-center font-semibold transition ${activeTab === "raw" ? "bg-indigo-900/50 text-white" : "text-indigo-300 hover:bg-indigo-800/30"}`} onClick={() => setActiveTab("raw")}>Raw Markdown</button>
              </div>

              <div className="p-6  overflow-auto">
                {activeTab === "preview" && (
                  <ReactMarkdown
  components={{
    // Fix paragraph rendering
    p({ node, children }) {
      return <p className="mb-4">{children}</p>; 
    },

    // Fix code rendering
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match?.[1] || "text"}
          PreTag="div" // ✅ safe block container
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-800 px-1 rounded" {...props}>
          {children}
        </code>
      );
    },
  }}
>
  {readmeContent}
</ReactMarkdown>

                )}

                {activeTab === "raw" && (
                  <div className="relative max-w-[93vw]">
                    <button onClick={copyRawMarkdown} className="absolute right-5 bg-indigo-600 px-2 py-1 rounded text-white text-sm z-10">Copy</button>
                    <pre className="text-sm p-2 pt-10">{readmeContent}</pre>
                  </div>
                )}
              </div>
            </div>

            
          </motion.div>
        )}

      </section>
    </div>
  );
}
