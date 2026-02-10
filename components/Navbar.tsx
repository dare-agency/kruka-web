"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  const { toggleCart, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Tecnologia", href: "/technology" },
    { name: "Loja", href: "/shop" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md py-4 border-b border-neutral-200" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="relative z-50 block group">
             <div className="relative w-10 h-10">
               <Image 
                  src="/img/logo-black.png" 
                  alt="Kruka Home" 
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                  priority
               />
             </div>
          </Link>

          {/* LINKS CENTRAIS */}
          <div className="hidden md:flex items-center gap-8 bg-white/70 backdrop-blur-sm px-8 py-2.5 rounded-full border border-white/40 shadow-sm">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  pathname === link.href ? "text-green-600 font-bold" : "text-neutral-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* AÇÕES DIREITA */}
          <div className="flex items-center gap-4">
            
            {/* BOTÃO DO CARRINHO */}
            <button 
              onClick={toggleCart} 
              className="relative p-2.5 hover:bg-neutral-100 rounded-full transition-colors group"
            >
              <ShoppingBag className="w-5 h-5 text-neutral-800 group-hover:text-green-600 transition-colors" />
              
              {/* Contador de Itens */}
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full text-[10px] flex items-center justify-center text-white font-bold border border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            
            {/* REMOVI O BOTÃO "COMPRAR" AQUI. O visual fica mais limpo. */}

            {/* Menu Mobile */}
            <button className="md:hidden z-50 p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="text-neutral-900 w-6 h-6" /> : <Menu className="text-neutral-900 w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MENU MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-bold text-neutral-900 hover:text-green-600 transition-colors tracking-tight"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}