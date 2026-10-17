import React from "react";
import { ArrowUpRight } from "lucide-react";

const About = () => {
  return (
    <section className="bg-[#09090B] text-gray-300">
      <div className="px-[3%] py-10 md:py-15">
        <p className="mb-4 leading-relaxed text-base sm:text-lg md:text-xl text-[#A6A6A6]">
          Hello! I’m <span className="text-neutral-200 font-medium">Sujal Kumar Shah</span>, a <span className="text-neutral-200 font-medium">Software Developer &amp; Systems Engineer</span> focusing on core problem solving, modern web applications, and systems engineering.
        </p>
        <p className="mb-4 leading-relaxed text-base sm:text-lg md:text-xl text-[#A6A6A6]">
          I spend my time diving deep into <span className="text-white font-medium">Data Structures &amp; Algorithms</span>, navigating the <span className="text-white font-medium">Linux command line</span>, and understanding computer systems from first principles.
        </p>
        <p className="mb-4 leading-relaxed text-base sm:text-lg md:text-xl text-[#A6A6A6]">
          I also enjoy building modern, fast, and accessible web experiences using React, Next.js, and TypeScript. My core philosophy is simple:
          <span className="block mt-2 font-mono text-sm sm:text-base text-neutral-300 border-l-2 border-neutral-600 pl-3 italic">
            &ldquo;Understand first. Build second.&rdquo;
          </span>
        </p>
        <p className="mb-6 leading-relaxed text-base sm:text-lg md:text-xl text-[#A6A6A6]">
          Always open to tech discussions, collaboration, open source contributions, and internship opportunities.
        </p>

        <div className="flex flex-wrap gap-4 sm:gap-6 py-2 sm:py-4">
          <a
            href="https://github.com/SujalKumarShah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white hover:text-neutral-400 transition-colors text-sm sm:text-base"
          >
            GitHub <ArrowUpRight size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/sujalkumarshah/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white hover:text-neutral-400 transition-colors text-sm sm:text-base"
          >
            LinkedIn <ArrowUpRight size={16} />
          </a>
          <a
            href="https://leetcode.com/u/Sujalkumarshah/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white hover:text-neutral-400 transition-colors text-sm sm:text-base"
          >
            LeetCode <ArrowUpRight size={16} />
          </a>
          <a
            href="https://www.codechef.com/users/sujalkumarshah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white hover:text-neutral-400 transition-colors text-sm sm:text-base"
          >
            CodeChef <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
