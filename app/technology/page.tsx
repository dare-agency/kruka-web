// src/app/technology/page.tsx
"use client";

import { motion } from "framer-motion";
import { Cpu, Wifi, Zap, Eye, Wind, Droplets } from "lucide-react";
import Image from "next/image";

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white pt-32 pb-20">
      
      {/* HERO DA TECNOLOGIA */}
      <div className="container mx-auto px-6 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-green-500 font-mono text-sm tracking-widest uppercase mb-4 block">Engenharia de Precisão</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">O cérebro por trás da <span className="text-neutral-500">beleza.</span></h1>
          <p className="text-xl text-neutral-400">
            Por baixo do design minimalista, o Kruka One esconde uma rede neural de sensores e processadores que tomam 14.000 decisões por dia.
          </p>
        </motion.div>
      </div>

      {/* RAIO-X DOS SENSORES */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Cpu, title: "Processador Core K1", desc: "Chip proprietário dedicado a processamento de dados biológicos em tempo real." },
            { icon: Eye, title: "Visão Computacional", desc: "Câmera de 12MP com filtro IR para análise de saúde foliar." },
            { icon: Wifi, title: "Conectividade Dual", desc: "Módulo Wi-Fi 6 + Bluetooth 5.0 para conexão instantânea e sem falhas." },
            { icon: Zap, title: "Bateria de Backup", desc: "Até 48h de funcionamento em caso de queda de energia." },
            { icon: Wind, title: "Sensores Ambientais", desc: "Barômetro e termômetro de precisão suíça." },
            { icon: Droplets, title: "Hidráulica Silenciosa", desc: "Bomba de água magnética com ruído zero (<10db)." },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-green-500/50 transition-colors group">
              <item.icon className="w-10 h-10 text-neutral-600 group-hover:text-green-500 mb-6 transition-colors" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TABELA DE ESPECIFICAÇÕES */}
      <section className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold mb-10 border-b border-neutral-800 pb-4">Especificações Técnicas</h2>
        
        <div className="space-y-6 text-neutral-400 font-mono text-sm">
          <div className="flex justify-between py-4 border-b border-neutral-900 hover:bg-neutral-900/50 px-4 rounded transition-colors">
            <span>Dimensões</span>
            <span className="text-white">350mm x 150mm x 150mm</span>
          </div>
          <div className="flex justify-between py-4 border-b border-neutral-900 hover:bg-neutral-900/50 px-4 rounded transition-colors">
            <span>Peso</span>
            <span className="text-white">1.2kg (Vazio)</span>
          </div>
          <div className="flex justify-between py-4 border-b border-neutral-900 hover:bg-neutral-900/50 px-4 rounded transition-colors">
            <span>Material</span>
            <span className="text-white">Cerâmica, Vidro Temperado, Plástico Reciclado OceanBound™</span>
          </div>
          <div className="flex justify-between py-4 border-b border-neutral-900 hover:bg-neutral-900/50 px-4 rounded transition-colors">
            <span>Tanque</span>
            <span className="text-white">2.5 Litros (Autonomia ~30 dias)</span>
          </div>
          <div className="flex justify-between py-4 border-b border-neutral-900 hover:bg-neutral-900/50 px-4 rounded transition-colors">
            <span>Iluminação</span>
            <span className="text-white">Full Spectrum LED 15W (4000K)</span>
          </div>
        </div>
      </section>

    </main>
  );
}