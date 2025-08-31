"use client";
import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="font-sans bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Elegant Particles */}
        <Particles
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
              },
            },
            particles: {
              color: { value: ["#6366F1", "#3B82F6", "#9333EA"] }, // indigo, blue, violet
              links: { enable: true, color: "#6366F1", opacity: 0.15 },
              move: { enable: true, speed: 1.2 },
              number: { value: 85 },
              size: { value: { min: 1, max: 3 } },
            },
          }}
          className="absolute top-0 left-0 w-full h-full"
        />

        {/* Neon Glows */}
        <div className="absolute top-28 left-16 w-96 h-96 bg-indigo-600/30 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-28 right-16 w-96 h-96 bg-violet-600/30 rounded-full blur-[160px]"></div>
   
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-500 text-transparent bg-clip-text drop-shadow-lg">
            CodeMuse
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-2xl mx-auto text-gray-300 leading-relaxed">
            Inspire. Improve. Ship. <br /> The AI Co-Pilot that elevates your
            code with precision.
          </p>
          <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">
            <a
              href="#features"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 font-bold rounded-2xl text-white shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:scale-105 transition transform"
            >
              Explore Features
            </a>
            <a
              href="#demo"
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 font-bold rounded-2xl text-white shadow-[0_0_25px_rgba(147,51,234,0.6)] hover:scale-105 transition transform"
            >
              Watch Demo
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
<section id="features" className="py-40 px-6 max-w-7xl mx-auto">
  <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-500 text-transparent bg-clip-text">
    All-in-One AI Coding Suite
  </h2>
  <div className="grid md:grid-cols-3 gap-12">
    {[
      {
        title: "Generate README",
        desc: "Auto-create professional READMEs with setup instructions, usage examples, and best practices.",
      },
      {
        title: "Suggest Improvements",
        desc: "Refactor code with smarter naming, optimized logic, and enhanced readability.",
      },
      {
        title: "Generate Comments & Docstrings",
        desc: "Automatic inline comments and docstrings aligned with coding standards.",
      },
      {
        title: "Code Explanation",
        desc: "Convert complex code into plain-English explanations effortlessly.",
      },
      {
        title: "Generate Unit Tests",
        desc: "Instantly build test cases to validate and secure your codebase.",
      },
      {
        title: "Bug Detection",
        desc: "Identify potential bugs, errors, and pitfalls in your code before runtime.",
      },
    ].map((feature, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-6 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]/ backdrop-blur-2xl rounded-3xl border border-indigo-900 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_35px_rgba(147,51,234,0.4)] transition"
      >
        <h3 className="text-2xl font-semibold mb-3 text-indigo-300">
          {feature.title}
        </h3>
        <p className="text-gray-400">{feature.desc}</p>
      </motion.div>
    ))}
  </div>
</section>

{/* Demo Section */}
<section
  id="demo"
  className="py-40 px-6 max-w-7xl mx-auto relative "
>
  <h2 className="text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-500 text-transparent bg-clip-text drop-shadow-lg">
    Watch CodeMuse in Action
  </h2>

  <div className="flex flex-col md:flex-row items-center gap-12">
    {/* Demo Video */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex-1 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(147,51,234,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] transition-shadow"
    >
      <Image
        src="/banner.jpg"
        className="w-full h-full object-cover rounded-3xl"
        width={800}
        height={450}
        alt="CodeMuse Demo"
        priority
      />
    </motion.div>

    {/* Feature Highlights */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex-1 space-y-6"
    >
      <h3 className="text-3xl font-semibold text-indigo-300">
        Generate README
      </h3>
      <p className="text-gray-300 text-md leading-relaxed">
        Experience the power of CodeMuse as it automatically generates professional, ready-to-use READMEs for your projects, complete with setup instructions, usage examples, and best practices. 
      </p>
      <ul className="list-disc list-inside text-gray-400 space-y-2">
        <li>Auto-generate structured, professional README files</li>
        <li>Save hours of documentation work instantly</li>
        <li>Customize templates and examples for your project</li>
        <li>Integrated AI suggestions for clarity and completeness</li>
      </ul>
      <Link
        href="/readme"
        className="inline-block mt-6 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 font-bold rounded-2xl text-white shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:scale-105 transition transform"
      >
        Try the Feature
      </Link>
    </motion.div>
  </div>
</section>


      {/* Call-to-Action */}
      <section className="py-28 text-center bg-gradient-to-r from-black via-[#0a0a0a] to-black">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-300">
          Ready to Supercharge Your Code?
        </h2>
        <p className="text-lg mb-10 text-gray-400">
          Experience CodeMuse – Inspire. Improve. Ship.
        </p>
        <Link
          href="/readme"
          className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 font-bold rounded-2xl text-white shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:scale-105 transition transform"
        >
          Get Started for Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center bg-black text-gray-500 text-sm">
        <p>&copy; 2025 CodeMuse. All rights reserved.</p>
      </footer>
    </div>
  );
}
