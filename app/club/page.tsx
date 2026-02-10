// src/app/club/page.tsx
"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap, Truck, ShieldCheck, Leaf } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function ClubPage() {
  const { addItem } = useCart();

  const clubPlan = {
    id: "kruka-club-subscription",
    name: "Assinatura Kruka Club™",
    price: "€12,90",
    image: "/img/hero-bg.png", // Use uma imagem que represente o clube ou uma caixa misteriosa
    quantity: 1,
    type: "subscription"
  };

  const benefits = [
    { icon: Zap, title: "Envio Automático Inteligente", desc: "A IA detecta quando sua planta foi colhida e envia novas cápsulas antes que você precise pedir." },
    { icon: Star, title: "Desconto Permanente", desc: "Economize 20% em todas as cápsulas e acessórios da loja oficial." },
    { icon: Truck, title: "Frete Grátis Sempre", desc: "Entrega expressa sem custo adicional para membros, em qualquer pedido." },
    { icon: ShieldCheck, title: "Garantia Estendida", desc: "Seu Kruka One coberto contra qualquer defeito enquanto você for assinante." },
  ];

  return (
    <main className="min-h-screen font-sans selection:bg-green-500 selection:text-white overflow-x-hidden cursor-auto lg:cursor-none bg-[#F5F7F5]">
      
      {/* HERO SECTION */}
      <div className="container mx-auto px-6 text-center mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-green-500 font-bold tracking-widest uppercase text-xs border border-green-500/30 px-3 py-1 rounded-full bg-green-900/20">Membros Apenas</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-6 mb-6 tracking-tighter">O Jardim no <br/><span className="text-green-500">Piloto Automático.</span></h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Junte-se ao Kruka Club e nunca mais se preocupe em comprar sementes. 
            A IA cuida da logística, você cuida da colheita.
          </p>
        </motion.div>
      </div>

      {/* BENEFÍCIOS GRID */}
      <div className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/5 p-8 rounded-3xl hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-500 mb-6">
                <b.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{b.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CARD DE PREÇO E CONFIRMAÇÃO */}
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-900 to-neutral-900 rounded-[3rem] p-10 md:p-16 border border-green-500/30 shadow-2xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"/>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Plano Infinite Garden</h2>
              <ul className="space-y-4 mb-8 text-neutral-300">
                <li className="flex items-center gap-3"><div className="bg-green-500 rounded-full p-1"><Check size={12} className="text-black"/></div> 3 Cápsulas Premium / mês</li>
                <li className="flex items-center gap-3"><div className="bg-green-500 rounded-full p-1"><Check size={12} className="text-black"/></div> Nutrientes inclusos</li>
                <li className="flex items-center gap-3"><div className="bg-green-500 rounded-full p-1"><Check size={12} className="text-black"/></div> Acesso antecipado a novas espécies</li>
              </ul>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-bold text-white">€12,90</span>
                <span className="text-neutral-400">/mês</span>
              </div>
              <p className="text-sm text-green-400 mb-8">Cancele quando quiser.</p>
              
              <button 
                onClick={() => addItem(clubPlan)}
                className="w-full bg-green-500 text-black font-bold py-4 rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-green-500/50 transform hover:scale-[1.02]"
              >
                Confirmar Assinatura
              </button>
            </div>

            {/* Imagem Decorativa */}
            <div className="flex-1 flex justify-center">
               <div className="relative w-64 h-64 bg-white/10 rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center">
                  <Leaf size={80} className="text-green-400" />
                  <div className="absolute inset-0 border border-green-500/30 rounded-full animate-ping opacity-20"></div>
               </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}