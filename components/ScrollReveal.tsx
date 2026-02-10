// src/components/ScrollReveal.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  text: string;
  className?: string;
}

export default function ScrollReveal({ text, className }: ScrollRevealProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"], // Ajuste fino de quando começa/termina
  });

  const words = text.split(" ");

  return (
    <p ref={container} className={`flex flex-wrap leading-tight ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({ children, progress, range }: any) => {
  const opacity = useTransform(progress, range, [0.1, 1]); // Vai de 10% opaco para 100%
  return (
    <span className="relative mr-3 mt-2">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity: opacity }} className="text-neutral-900">
        {children}
      </motion.span>
    </span>
  );
};