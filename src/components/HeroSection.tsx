import React from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import RingButton from "./RingButton";
import OpenToWorkNote from "./OpenToWorkNote";

const HeroSection = () => {
  return (
    <div>
      <div className="bg-[#09090B] pt-20 md:px-[2%]">
        <div className="px-4 pt-4 sm:px-6 sm:pt-6 md:ml-4 md:px-0 md:pt-8">
          <div className="mb-7 flex max-w-7xl flex-col items-start justify-center pt-10 text-white sm:mt-18 md:mb-20 md:pt-0 lg:mt-6">
            <h1 className="font-space-grotesk text-4xl leading-tight font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-[130px]">
              <span className="flex items-center gap-4">
                <span>
                  Hi I&apos;m Sujal
                  <span className="sr-only"> Kumar Shah</span>
                </span>
              </span>
            </h1>
            <p className="font-space-grotesk text-4xl leading-tight font-semibold tracking-tight sm:-mt-4 sm:text-6xl md:-mt-6 md:text-7xl lg:-mt-2 lg:text-8xl xl:-mt-10 xl:text-[130px]">
              I build &amp; solve.
            </p>
            <p className="font-geist-pixel text-secondary mt-4 w-full text-sm sm:mt-6 sm:w-[80%] sm:text-base md:mt-2 md:w-[70%] md:text-lg lg:w-[60%] lg:text-xl xl:w-[45%] xl:text-2xl">
              Software Developer specializing in modern web applications, Data Structures,
              Algorithms, and Linux systems. Understand first, build second.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 sm:mt-6 md:mt-8 md:gap-6">
              <RingButton
                href="mailto:sujalks6758@gmail.com"
                text="Get in Touch"
                icon={Mail}
              />
              <RingButton
                href="https://github.com/SujalKumarShah"
                target="_blank"
                rel="noopener noreferrer"
                text="GitHub Profile"
                icon={ArrowUpRight}
              />
              <OpenToWorkNote />
            </div>
          </div>
        </div>
      </div>
      <div className="h-14"></div>
    </div>
  );
};

export default HeroSection;
