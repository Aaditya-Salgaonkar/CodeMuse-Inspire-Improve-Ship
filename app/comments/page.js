"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navbar from "@/components/Navbar";

export default function CodeCommentsPage() {
  const [code, setCode] = useState("");
  const [commentedCode, setCommentedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const generateComments = async () => {
    if (!code.trim()) return alert("Please enter some code.");

    setLoading(true);

    const prompt = `
Add detailed inline comments and docstrings to the following code. Maintain proper formatting and readability:
\`\`\`\n${code}\n\`\`\`
`;

    try {
      const res = await fetch("/api/code-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setCommentedCode(data.content || "Failed to generate comments.");
    } catch (err) {
      console.error(err);
      setCommentedCode("Failed to generate comments.");
    }

    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="font-sans bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full mt-10 h-80 flex items-center justify-center text-center overflow-hidden">
        <Particles
          options={{
            fpsLimit: 60,
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
            },
            particles: {
              color: { value: ["#6366F1", "#3B82F6", "#9333EA"] },
              links: { enable: true, color: "#6366F1", opacity: 0.15 },
              move: { enable: true, speed: 1.2 },
              number: { value: 85 },
              size: { value: { min: 1, max: 3 } },
            },
          }}
          className="absolute top-0 left-0 w-full h-full"
        />

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-500 text-transparent bg-clip-text drop-shadow-lg">
            Code Comments
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto text-gray-300 leading-relaxed">
            Automatically add detailed inline comments and docstrings to your code, improving readability and maintainability.
          </p>
        </motion.div>
      </section>

      {/* Input Section */}
      <section className="pb-10 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#111] to-[#1a1a1a]/ backdrop-blur-2xl p-8 rounded-3xl border border-indigo-900 shadow-[0_0_25px_rgba(99,102,241,0.3)] space-y-6"
        >
          <textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-40 p-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white/10"
          />

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={generateComments}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-700 hover:via-purple-700 hover:to-violet-700 transition rounded-xl py-4 font-semibold shadow-lg"
            >
              {loading ? "Generating..." : "Add Comments"}
            </button>
            {commentedCode && (
              <button
                onClick={() => copyToClipboard(commentedCode)}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition rounded-xl py-4 font-semibold shadow-lg"
              >
                Copy Commented Code
              </button>
            )}
          </div>
        </motion.div>

        {/* Output Section */}
        {commentedCode && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12"
          >
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-indigo-900 max-h-[500px] overflow-auto prose prose-invert">
              <h3 className="text-xl font-semibold mb-4 text-indigo-300">Preview</h3>
              <ReactMarkdown>{commentedCode}</ReactMarkdown>
            </div>

   
          </motion.div>
        )}
      </section>
    </div>
  );
}
