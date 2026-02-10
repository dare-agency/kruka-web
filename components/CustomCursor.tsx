"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Função que atualiza a posição do mouse
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Verifica se estamos em cima de um link ou botão
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center text-green-700 mix-blend-difference"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 8), // Centraliza dependendo do tamanho
        y: mousePosition.y - (isHovering ? 24 : 8),
        width: isHovering ? 48 : 16, // Aumenta se estiver hover
        height: isHovering ? 48 : 16,
        backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(34, 197, 94, 0.8)",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      style={{ borderRadius: "50%" }}
    >
      {/* A folhinha só aparece quando o mouse cresce (hover) */}
      <motion.div 
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0 }}
      >
        <Leaf size={20} fill="currentColor" />
      </motion.div>
    </motion.div>
  );
}