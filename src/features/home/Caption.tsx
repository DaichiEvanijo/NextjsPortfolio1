"use client";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useRef } from "react";
import { FaLaptop } from "react-icons/fa";

const Caption = () => {
  const ref1 = useRef<HTMLHeadingElement>(null);
  const ref2 = useRef<HTMLHeadingElement>(null);
  const ref3= useRef<HTMLParagraphElement>(null);
  const isLoaded = useIntersectionObserver({
    options: [{ threshold: 0.2 }, { threshold: 0.2 }, { threshold: 0.2 }],
    refs: [ref1, ref2, ref3],
  });

  return (
    <>
      <h2 ref={ref1} className={`text-3xl text-center bg-gradient-to-r from-slate-400 via-yellow-200 to-yellow-500  text-transparent bg-clip-text md:hidden whitespace-pre-wrap ${isLoaded[0] ? "animate-fromBelow":null}`}>{`Hello !! My name is\nDaichi Koyanagi`}</h2>
      <h2 ref={ref2} className={`text-3xl text-center bg-gradient-to-r from-slate-400 via-yellow-200 to-yellow-500  text-transparent bg-clip-text hidden md:flex ${isLoaded[1] ? "animate-fromBelow":null}`}>
        Hello !! My name is Daichi Koyanagi
      </h2>
      <p ref={ref3} className={`text-center text-2xl ${isLoaded[2] ? "animate-fromBelow":null}`}>
        I fell in love with web development since about 2 years ago and have
        created a couple of portfolios
        <FaLaptop className="inline ml-2" />
      </p>
    </>
  );
};

export default Caption;
