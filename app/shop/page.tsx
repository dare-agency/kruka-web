"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Plus, Package, ArrowRight, Check, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

// --- DADOS DOS PRODUTOS ---

const device = {
  id: "kruka-one",
  name: "Kruka One™",
  description: "O sistema de crescimento universal. Hardware premiado com sensores de precisão.",
  price: "€249,00",
  tag: "Flagship",
  images: [
    "/img/products/kruka-1.png",
    "/img/products/kruka-2.png",
    "/img/products/kruka-3.png"
  ]
};

const bundles = [
  { id: "bundle-chef", name: "Pack Chef", items: "Manjericão, Hortelã, Salsa", price: "€14,90", save: "15% OFF", image: "/img/products/pack-chef.png", type: "Pacotes" },
  { id: "bundle-tea", name: "Pack Chás", items: "Camomila, Cidreira, Lúcia-lima", price: "€14,90", save: "15% OFF", image: "/img/products/pack-tea.png", type: "Pacotes" },
  { id: "bundle-salad", name: "Pack Salada", items: "Alface Baby, Rúcula, Tomate", price: "€16,90", save: "10% OFF", image: "/img/products/pack-salad.png", type: "Pacotes" },
  { id: "bundle-flowers", name: "Pack Floral", items: "Petúnias, Amores-perf., Calêndula", price: "€14,90", save: "15% OFF", image: "/img/products/pack-floral.png", type: "Pacotes" },
];

const singles = [
  { id: "seed-basil", name: "Manjericão Genovese", category: "Aromáticas", price: "€5,90", image: "/img/products/seed-basil.png", type: "Cápsulas" },
  { id: "seed-mint", name: "Hortelã Pimenta", category: "Aromáticas", price: "€5,90", image: "/img/products/seed-mint.png", type: "Cápsulas" },
  { id: "seed-parsley", name: "Salsa Frisada", category: "Aromáticas", price: "€5,90", image: "/img/products/seed-parsley.png", type: "Cápsulas" },
  { id: "seed-cidreira", name: "Erva Cidreira", category: "Chás", price: "€5,90", image: "/img/products/seed-chamomile.png", type: "Cápsulas" },
  { id: "seed-chamomile", name: "Camomila Real", category: "Chás", price: "€5,90", image: "/img/products/seed-chamomile.png", type: "Cápsulas" },
  { id: "seed-lettuce", name: "Alface Baby", category: "Saladas", price: "€5,90", image: "/img/products/seed-lettuce.png", type: "Cápsulas" },
  { id: "seed-rucula", name: "Rúcula Selvagem", category: "Saladas", price: "€5,90", image: "/img/products/seed-lettuce.png", type: "Cápsulas" },
  { id: "seed-tomato", name: "Tomate Cherry", category: "Frutos", price: "€6,90", image: "/img/products/seed-tomato.png", type: "Cápsulas" },
  { id: "seed-chilli", name: "Pimenta Malagueta", category: "Frutos", price: "€6,90", image: "/img/products/seed-chilli.png", type: "Cápsulas" },
  { id: "seed-petunia", name: "Petúnia Híbrida", category: "Flores", price: "€6,90", image: "/img/products/seed-petunia.png", type: "Cápsulas" },
  { id: "seed-pansy", name: "Amor-Perfeito", category: "Flores", price: "€6,90", image: "/img/products/seed-pansy.png", type: "Cápsulas" },
  { id: "seed-orchid", name: "Orquídea Phalaenopsis", category: "Exóticas", price: "€9,90", image: "/img/products/seed-petunia.png", type: "Cápsulas" },
  { id: "seed-bonsai", name: "Bonsai Ficus", category: "Árvores", price: "€12,90", image: "/img/products/seed-bonsai.png", type: "Cápsulas" },
];

const accessories = [
  { id: "acc-nutrients", name: "Kruka Nutrients A+B", desc: "Nutrição líquida.", category: "Nutrição", price: "€19,90", image: "/img/products/acc-nutrients.png", type: "Acessórios" },
  { id: "acc-scissors", name: "Tesoura de Poda", desc: "Aço japonês.", category: "Ferramentas", price: "€29,90", image: "/img/products/acc-scissors.png", type: "Acessórios" },
  { id: "acc-trellis", name: "Suporte Treliça", desc: "Suporte modular.", category: "Suporte", price: "€14,90", image: "/img/products/acc-trellis.png", type: "Acessórios" },
];

const allProducts = [...bundles, ...singles, ...accessories];
const mainTabs = ["Todos", "Pacotes", "Cápsulas", "Acessórios"];
const capsuleCategories = ["Todas", "Aromáticas", "Chás", "Saladas", "Frutos", "Flores", "Exóticas", "Árvores"];

export default function ShopPage() {
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState("Todos");
  const [activeSubCategory, setActiveSubCategory] = useState("Todas");
  const [activeDeviceImage, setActiveDeviceImage] = useState(device.images[0]);

  const filteredProducts = allProducts.filter((product) => {
    if (activeTab !== "Todos" && product.type !== activeTab) return false;
    if (activeTab === "Cápsulas" || (activeTab === "Todos" && product.type === "Cápsulas")) {
      if (activeSubCategory !== "Todas" && (product as any).category !== activeSubCategory) {
        return false;
      }
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 text-neutral-900 font-sans">
      
      {/* HEADER COMPACTO */}
      <div className="container mx-auto px-6 mb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-green-600 font-bold uppercase tracking-widest text-[10px] mb-3 block">Loja Oficial</span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-neutral-900">Ecossistema Kruka</h1>
        </motion.div>
      </div>

      <div className="container mx-auto px-6">

        {/* --- HARDWARE --- */}
        <section className="mb-24">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-neutral-100 flex flex-col md:flex-row items-start gap-10 hover:shadow-xl transition-shadow duration-700">
            {/* Galeria */}
            <div className="w-full md:w-1/2 flex flex-col gap-3">
               <div className="relative h-[400px] bg-[#F5F5F7] rounded-[2rem] flex items-center justify-center overflow-hidden">
                  <span className="absolute top-5 left-5 bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest z-10 shadow-lg">Flagship</span>
                  <motion.div
                    key={activeDeviceImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full p-4"
                  >
                     {/* CORREÇÃO: object-contain garante que a foto NÃO deforme */}
                     <Image 
                       src={activeDeviceImage} 
                       alt={device.name} 
                       fill 
                       className="object-contain" 
                       priority
                       onError={(e) => { e.currentTarget.src = device.images[0] }}
                     />
                  </motion.div>
               </div>
               <div className="flex gap-3">
                  {device.images.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveDeviceImage(img)}
                      className={`relative h-20 flex-1 bg-[#F5F5F7] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        activeDeviceImage === img ? "border-green-500 ring-1 ring-green-100 opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                       <Image src={img} alt={`View ${index}`} fill className="object-contain p-2" />
                    </button>
                  ))}
               </div>
            </div>
            
            {/* Info */}
            <div className="w-full md:w-1/2 pt-4">
              <h3 className="text-4xl font-semibold text-neutral-900 tracking-tighter mb-4">{device.name}</h3>
              <p className="text-base text-neutral-500 mb-8 leading-relaxed font-light">{device.description}</p>
              
              <div className="space-y-4 mb-8">
                 <div className="flex items-center gap-3 text-sm text-neutral-800 font-medium">
                    <div className="bg-green-50 p-1 rounded-full"><Check size={14} className="text-green-600"/></div> Sensores de NPK, Água e Luz
                 </div>
                 <div className="flex items-center gap-3 text-sm text-neutral-800 font-medium">
                    <div className="bg-green-50 p-1 rounded-full"><Check size={14} className="text-green-600"/></div> Irrigação Automática Autônoma
                 </div>
                 <div className="flex items-center gap-3 text-sm text-neutral-800 font-medium">
                    <div className="bg-green-50 p-1 rounded-full"><Check size={14} className="text-green-600"/></div> App Premium Vitalício Incluso
                 </div>
              </div>

              <div className="flex justify-between items-end mb-6 bg-[#FAFAFA] p-5 rounded-2xl border border-neutral-100">
                 <div>
                    <span className="block text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-1">Preço Final</span>
                    <span className="text-4xl font-semibold text-green-700 tracking-tighter">{device.price}</span>
                 </div>
                 <span className="text-[10px] text-neutral-500 font-bold bg-white px-3 py-1.5 rounded-full border border-neutral-200 shadow-sm">Frete Grátis 🇪🇺</span>
              </div>
              <button onClick={() => addItem(device)} className="w-full bg-neutral-900 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-all flex items-center justify-center gap-3 shadow-lg hover:scale-[1.01] active:scale-[0.99]">
                Adicionar ao Carrinho <ShoppingBag size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* --- BANNER CLUBE (DARK MODE COMPACTO & PREMIUM) --- */}
        <section className="mb-24">
           {/* Altura reduzida, Dark Mode, layout horizontal */}
           <div className="relative overflow-hidden rounded-[2rem] bg-neutral-950 border border-white/10 shadow-2xl">
             <div className="flex flex-col md:flex-row items-center justify-between p-10 md:p-12 gap-8 relative z-10">
               
               {/* Texto à Esquerda */}
               <div className="text-center md:text-left max-w-xl">
                 <div className="inline-flex items-center gap-2 mb-4 bg-white/10 px-3 py-1 rounded-full border border-white/5">
                    <Sparkles size={10} className="text-green-400" />
                    <span className="text-neutral-300 font-bold uppercase tracking-widest text-[10px]">Assinatura Inteligente</span>
                 </div>
                 <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3 tracking-tighter">
                   Jardim no <span className="text-green-500">Piloto Automático.</span>
                 </h2>
                 <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                   O Kruka Club usa IA para detectar sua colheita e enviar novas sementes com 20% de desconto antes que o jardim fique vazio.
                 </p>
               </div>

               {/* Botão à Direita */}
               <Link href="/club">
                 <button className="whitespace-nowrap bg-white text-neutral-900 px-8 py-4 rounded-full font-bold text-sm hover:bg-green-500 hover:text-white transition-all shadow-lg flex items-center gap-2 hover:scale-105 duration-300">
                   Conhecer Planos <ArrowRight size={16}/>
                 </button>
               </Link>
             </div>

             {/* Fundo Sutil */}
             <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/20 to-transparent pointer-events-none" />
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
           </div>
        </section>

        {/* --- CATÁLOGO --- */}
        <div id="catalog" className="scroll-mt-32">
          
          {/* FILTRO MESTRE */}
          <div className="flex justify-center mb-10">
            <div className="bg-white p-1.5 rounded-full shadow-sm border border-neutral-200 inline-flex gap-1 overflow-x-auto max-w-full">
              {mainTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setActiveSubCategory("Todas"); }}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-500 ${
                    activeTab === tab 
                      ? "bg-neutral-900 text-white shadow-md" 
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* SUB-FILTROS */}
          <AnimatePresence>
            {(activeTab === "Cápsulas" || activeTab === "Todos") && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 40 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex gap-2 overflow-x-auto pb-2 justify-center scrollbar-hide">
                  {capsuleCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveSubCategory(cat)}
                      className={`px-4 py-2 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border duration-300 ${
                        activeSubCategory === cat 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-transparent text-neutral-400 border-transparent hover:bg-white hover:border-neutral-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* GRID DE PRODUTOS (ANIMAÇÃO SUTIL) */}
          <motion.div 
             layout
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((item) => (
                <motion.div
                  layout
                  // ANIMAÇÃO SUTIL:
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }} // Curva Cubic Bezier (Premium Feel)
                  key={item.id}
                  className="bg-white p-5 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col h-full"
                >
                  {/* Container da Imagem */}
                  <div className="relative h-64 w-full bg-[#F5F5F7] rounded-2xl mb-5 overflow-hidden flex items-center justify-center">
                    
                    {/* Tags */}
                    {(item as any).save && (
                      <span className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10 tracking-wide">
                        {(item as any).save}
                      </span>
                    )}
                    {!((item as any).save) && (
                      <span className="absolute top-4 left-4 bg-white/60 backdrop-blur-md text-neutral-400 border border-white text-[10px] font-bold px-2 py-1 rounded z-10 uppercase tracking-widest">
                        {(item as any).category || item.type}
                      </span>
                    )}

                    {/* Botão + */}
                    <button 
                      onClick={() => addItem(item)} 
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-green-500 hover:text-white transition-colors z-10 cursor-pointer active:scale-90 text-neutral-900 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                    >
                      <Plus size={16} />
                    </button>
                    
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>

                  <div className="mb-3">
                    <h4 className="font-bold text-lg text-neutral-900 tracking-tight">{item.name}</h4>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed h-8">
                      {(item as any).items || (item as any).desc || (item as any).category}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-dashed border-neutral-100 flex justify-between items-center">
                    <span className="font-bold text-lg text-neutral-900">{item.price}</span>
                    <button 
                      onClick={() => addItem(item)} 
                      className="text-[10px] font-bold bg-neutral-900 text-white px-5 py-2.5 rounded-lg hover:bg-green-600 transition-colors shadow-lg hover:shadow-green-200 tracking-wide"
                    >
                      COMPRAR
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-32">
              <Package size={48} className="mx-auto text-neutral-200 mb-6" />
              <p className="text-neutral-400 font-medium text-lg">Nenhum produto encontrado.</p>
              <button onClick={() => setActiveTab("Todos")} className="text-green-600 font-bold mt-4 hover:underline">Ver catálogo completo</button>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}