"use client";

import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ScanEye, Sprout, Wind, Droplets, Sun, Smartphone, ChevronDown, Activity, Camera, Leaf, Globe, Zap, Thermometer, Settings } from "lucide-react";
import { useRef, MouseEvent } from "react";

// --- COMPONENTE: TEXTURA DE GRANULAÇÃO ---
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.03] mix-blend-overlay" 
       style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}>
  </div>
);

// --- COMPONENTE: TEXTO NARRATIVO ---
const StoryText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
      viewport={{ margin: "-50px" }}
      className={`max-w-4xl mx-auto text-center px-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- DIVISOR ---
const ChapterLine = () => (
  <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-green-400 to-transparent mx-auto my-12 opacity-60" />
);

// --- BOTÃO MAGNÉTICO ---
function MagneticButton({ children, className }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const xSpring = useSpring(x, { stiffness: 120, damping: 25, mass: 0.5 });
  const ySpring = useSpring(y, { stiffness: 120, damping: 25, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.2); 
    y.set((clientY - (top + height / 2)) * 0.2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: xSpring, y: ySpring }} className={className}>
      {children}
    </motion.div>
  );
}

// --- CARD HOLOFOTE ---
function SpotlightCard({ icon: Icon, title, text, color, bg }: any) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div className="group relative border border-white/60 bg-white/50 backdrop-blur-md overflow-hidden rounded-[1.5rem] p-8 transition-all duration-500 hover:shadow-xl hover:scale-[1.02]" onMouseMove={handleMouseMove}>
      <motion.div className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(34, 197, 94, 0.1), transparent 80%)` }} />
      <div className="relative z-10">
        <div className={`w-12 h-12 ${bg} ${color} rounded-2xl flex items-center justify-center mb-5 shadow-sm`}><Icon size={24} /></div>
        <h3 className="text-lg font-bold mb-2 text-neutral-900 tracking-tight">{title}</h3>
        <p className="text-neutral-500 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    // CORREÇÃO MÓVEL: 
    // 1. select-none: Impede selecionar texto/imagem ao clicar
    // 2. style={{ WebkitTapHighlightColor: "transparent" }}: Remove o "flash" de toque no Android/iOS
    // 3. cursor-auto lg:cursor-none: Garante comportamento nativo no mobile
    <main 
      className="min-h-screen font-sans selection:bg-green-500 selection:text-white overflow-x-hidden cursor-auto lg:cursor-none bg-[#F5F7F5] select-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <NoiseOverlay />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden text-neutral-900">
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
          <Image src="/img/hero-bg.png" alt="Kruka One Hero" fill className="object-cover scale-105" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#F5F7F5]" />
        </motion.div>

        <div className="container mx-auto px-6 z-10 relative pt-20 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/70 backdrop-blur-md border border-white/50 shadow-sm text-neutral-800 font-bold text-[11px] uppercase tracking-widest mb-8 cursor-default">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> Tecnologia Botânica
            </div>
            
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 leading-[1.05] text-neutral-900">
              Natureza. <br /><span className="text-green-600">Decodificada.</span>
            </h1>
            
            <p className="text-xl text-neutral-600 mb-10 max-w-lg mx-auto font-medium leading-relaxed">
              Hardware de precisão que traduz a biologia das suas plantas em dados acionáveis. O fim da jardinagem por intuição.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link href="/shop">
                <MagneticButton className="bg-green-600 text-white text-lg font-bold py-4 px-10 rounded-full hover:bg-green-700 transition-colors shadow-xl hover:shadow-green-200 hover:shadow-2xl cursor-pointer flex items-center justify-center gap-2">
                  Comprar Agora <ArrowRight size={20}/>
                </MagneticButton>
              </Link>
              <Link href="/technology">
                <MagneticButton className="bg-white/60 backdrop-blur-xl text-neutral-900 text-lg font-bold py-4 px-10 rounded-full hover:bg-white transition-colors border border-white shadow-sm cursor-pointer">
                  Explorar Tech
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-400">
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* --- PROVA SOCIAL --- */}
      <section className="py-12 border-b border-neutral-200/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 cursor-default select-none items-center hover:opacity-100">
             <span className="text-xl font-bold font-serif">WIRED</span>
             <span className="text-xl font-bold font-mono tracking-tighter">TechCrunch</span>
             <span className="text-xl font-extrabold italic">TheVerge</span>
             <span className="text-xl font-semibold">FastCompany</span>
          </div>
        </div>
      </section>

      {/* --- O PROBLEMA --- */}
      <section className="py-32 bg-neutral-900 text-white relative">
        <div className="container mx-auto px-6">
          <StoryText>
            <h2 className="text-3xl md:text-5xl font-medium mb-6 leading-tight text-neutral-200 tracking-tight">
              O problema da agricultura <br /> doméstica é o <span className="text-neutral-500 line-through decoration-red-500 decoration-2">silêncio</span>.
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light">
              Plantas são sistemas biológicos complexos que não emitem sons.
              Durante séculos, cultivá-las exigiu sorte ou anos de estudo.
            </p>
          </StoryText>
          <ChapterLine />
          <StoryText>
            <h2 className="text-3xl md:text-5xl font-medium mb-6 text-white tracking-tight">
              Nós lhes demos <br /> <span className="text-green-500">voz digital.</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto font-light">
              O Kruka é um organismo biônico que vê o invisível e comunica o essencial.
            </p>
          </StoryText>
        </div>
      </section>

      {/* --- KRUKA VISION (BLUR PURO, SEM ESCURECER) --- */}
      <section className="py-32 bg-white text-neutral-900 relative rounded-t-[3rem] -mt-10 z-10 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* TEXTO */}
            <div>
              <div className="inline-flex items-center gap-2 text-green-700 font-bold mb-6 uppercase tracking-wider text-[10px] border border-green-200 bg-green-50 px-3 py-1 rounded-full">
                <ScanEye size={14} /> Kruka Vision™
              </div>
              <h2 className="text-4xl md:text-6xl font-semibold mb-6 leading-[1.1] tracking-tighter">Ela vê o que <br/> você não vê.</h2>
              <p className="text-lg text-neutral-500 mb-10 leading-relaxed max-w-md font-medium">
                Algoritmos de visão computacional analisam a textura, cor e turgidez das folhas, detectando stress biótico dias antes do olho humano.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-5 group p-4 rounded-2xl hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-100">
                  <div className="bg-green-100 p-3 rounded-xl text-green-700 h-fit"><Activity size={24}/></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-neutral-900">Diagnóstico Preditivo</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed">Identifica deficiências de NPK precocemente.</p>
                  </div>
                </div>
                <div className="flex gap-5 group p-4 rounded-2xl hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-100">
                  <div className="bg-green-100 p-3 rounded-xl text-green-700 h-fit"><Camera size={24}/></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-neutral-900">Registro de Crescimento</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed">Timelapses automáticos em 4K do ciclo de vida.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* IMAGEM COM EFEITO DE FOCO (Sem Escurecer) */}
            <div className="relative w-full aspect-[4/5] bg-neutral-100 rounded-[2rem] overflow-hidden shadow-2xl border-[1px] border-neutral-200 group">
              
              {/* 1. FUNDO: Apenas desfocado (blur-md). REMOVIDO 'brightness-[0.4]' */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/img/kruka-vision.png" 
                  alt="Background Blur" 
                  fill 
                  className="object-cover object-center blur-md" 
                />
              </div>

              {/* 2. FRENTE: Nítido e com recorte */}
              <div 
                className="absolute inset-0 z-10"
                style={{ 
                  clipPath: "inset(22% 20% 22% 20% round 1.5rem)" 
                }}
              >
                <Image 
                  src="/img/kruka-vision.png" 
                  alt="Visão IA Manjericão" 
                  fill 
                  className="object-cover object-center"
                />
              </div>

              {/* 3. HUD (INTERFACE) */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="w-[60%] aspect-square border border-white/40 rounded-[1.5rem] relative backdrop-blur-none shadow-[0_0_30px_rgba(0,0,0,0.1)]">
                   
                   {/* Cantos */}
                   <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400 rounded-tl-lg shadow-[0_0_10px_#22c55e]"/>
                   <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400 rounded-tr-lg shadow-[0_0_10px_#22c55e]"/>
                   <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400 rounded-bl-lg shadow-[0_0_10px_#22c55e]"/>
                   <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400 rounded-br-lg shadow-[0_0_10px_#22c55e]"/>

                   {/* Tag Live */}
                   <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"/>
                      <span className="text-[10px] text-white font-mono tracking-widest">LIVE FEED</span>
                   </div>

                   {/* Dados */}
                   <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-xl p-3 rounded-xl border border-white/10">
                      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 mb-1">
                        <span>TARGET CLASS</span>
                        <span>CONFIDENCE</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold text-white tracking-wider">
                        <span>OCIMUM BASILICUM</span>
                        <span className="text-green-400">99.8%</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SENSORES --- */}
      <section className="py-24 bg-[#F5F7F5] relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight text-neutral-900">6 Sentidos Digitais</h2>
            <p className="text-lg text-neutral-500">
              Monitoramento ambiental contínuo para replicar o habitat natural.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <SpotlightCard icon={Sprout} title="Química do Solo" text="Analisa níveis de NPK em tempo real." bg="bg-amber-100" color="text-amber-700" />
            <SpotlightCard icon={Droplets} title="Hidratação" text="Sensor capacitivo de precisão na raiz." bg="bg-blue-100" color="text-blue-600" />
            <SpotlightCard icon={Wind} title="Microclima" text="Temperatura e humidade do ar local." bg="bg-cyan-100" color="text-cyan-600" />
            <SpotlightCard icon={Sun} title="Espectro PAR" text="Mede radiação fotossintética ativa." bg="bg-yellow-100" color="text-yellow-600" />
            <SpotlightCard icon={Zap} title="Smart Tank" text="Gestão autônoma do reservatório de água." bg="bg-purple-100" color="text-purple-600" />
            <SpotlightCard icon={Thermometer} title="Proteção Térmica" text="Alertas de choque térmico." bg="bg-red-100" color="text-red-600" />
          </div>
        </div>
      </section>

      {/* --- O APP (MOCKUP FLAT) --- */}
      <section className="py-32 bg-neutral-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            {/* Texto */}
            <div>
              <div className="inline-flex items-center gap-2 text-green-400 font-bold mb-6 uppercase tracking-wider text-[10px] border border-green-500/30 px-3 py-1 rounded-full bg-green-900/20">
                <Smartphone size={14} /> Interface Humana
              </div>
              <h2 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight tracking-tighter">
                Dados brutos em <br/><span className="text-green-500">conversa fluida.</span>
              </h2>
              <p className="text-lg text-neutral-400 mb-10 leading-relaxed max-w-md font-light">
                O App Kruka elimina gráficos complexos. Ele avisa apenas o que importa, como uma mensagem de texto.
              </p>
              
              <div className="space-y-4">
                 <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5 flex items-center gap-4 max-w-sm hover:bg-white/10 transition-colors cursor-default">
                    <div className="bg-blue-500/20 p-2.5 rounded-full text-blue-400"><Droplets size={18}/></div>
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider mb-0.5">Alertas</p>
                      <p className="font-medium text-sm text-neutral-200">"Seu Manjericão precisa de água."</p>
                    </div>
                 </div>
                 <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/5 flex items-center gap-4 max-w-sm hover:bg-white/10 transition-colors cursor-default ml-4">
                    <div className="bg-green-500/20 p-2.5 rounded-full text-green-400"><Leaf size={18}/></div>
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider mb-0.5">Insights</p>
                      <p className="font-medium text-sm text-neutral-200">"Colheita prevista para 2 dias."</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* --- MOCKUP FLAT & CLEAN --- */}
            <div className="relative mx-auto lg:mx-0">
               <div className="relative z-10 bg-black rounded-[3rem] h-[600px] w-[300px] shadow-2xl border-[8px] border-neutral-800 mx-auto overflow-hidden">
                 
                 {/* Tela */}
                 <div className="h-full w-full bg-neutral-950 p-6 flex flex-col relative">
                    
                    {/* Dynamic Island */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20"></div>
                    
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8 mt-8">
                       <div>
                        <p className="text-neutral-500 text-[10px] mb-1">Bom dia,</p>
                        <h3 className="text-xl font-bold text-white">Ana</h3>
                       </div>
                       <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-xs text-white">A</div>
                    </div>
                    
                    {/* Card Status */}
                    <div className="bg-neutral-900 p-5 rounded-3xl mb-6 relative overflow-hidden">
                       <div className="flex justify-between items-start mb-8">
                          <div>
                             <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <p className="text-green-500 text-[10px] font-bold uppercase">Ativo</p>
                             </div>
                             <p className="text-2xl font-medium text-white">Saudável</p>
                          </div>
                          <Leaf size={20} className="text-green-500"/>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[9px] text-neutral-500 uppercase font-bold mb-1">Humidade</p>
                            <p className="text-white text-sm">60%</p>
                          </div>
                          <div>
                             <p className="text-[9px] text-neutral-500 uppercase font-bold mb-1">Luz</p>
                             <p className="text-white text-sm">Indireta</p>
                          </div>
                       </div>
                    </div>
                    
                    {/* Timeline */}
                    <div>
                      <p className="text-neutral-500 font-bold mb-4 text-[10px] uppercase">Hoje</p>
                      <div className="space-y-4 pl-2 border-l border-neutral-800 ml-1">
                         <div className="flex gap-4 items-center relative">
                            <div className="w-2 h-2 bg-green-500 rounded-full absolute -left-[5px]"></div>
                            <div className="text-[10px] text-neutral-500">09:00</div>
                            <div className="text-xs text-white">Irrigação</div>
                         </div>
                         <div className="flex gap-4 items-center opacity-50 relative">
                            <div className="w-2 h-2 bg-neutral-800 rounded-full absolute -left-[5px]"></div>
                            <div className="text-[10px] text-neutral-500">14:00</div>
                            <div className="text-xs text-white">Luz Solar</div>
                         </div>
                      </div>
                    </div>

                    {/* Navbar */}
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-neutral-900 flex items-center justify-around text-neutral-600">
                        <Leaf size={20} className="text-green-500"/>
                        <Activity size={20}/>
                        <Settings size={20}/>
                    </div>

                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RODAPÉ REDUZIDO --- */}
      <footer className="bg-white text-neutral-900 border-t border-neutral-200">
        <div className="py-12 border-b border-neutral-100">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
              Pronto para cultivar o futuro?
            </h2>
            <Link href="/shop">
              <MagneticButton className="bg-green-600 text-white text-sm font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-colors shadow-lg hover:shadow-green-200 hover:scale-[1.02] cursor-pointer">
                Comprar Kruka One
              </MagneticButton>
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
             <div className="col-span-2 md:col-span-1 pr-8">
                <div className="relative w-8 h-8 mb-4">
                  <Image src="/img/logo-black.png" alt="K" fill className="object-contain" />
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Design botânico de precisão. Engenharia feita para durar.
                </p>
             </div>
             
             {[
               { head: "Produto", links: ["Hardware", "Consumíveis", "App"] },
               { head: "Empresa", links: ["Sobre", "Carreiras", "Imprensa"] },
               { head: "Suporte", links: ["Help Center", "Garantia", "Contato"] }
             ].map((col, i) => (
               <div key={i}>
                  <h4 className="font-bold mb-4 text-xs uppercase tracking-wider text-neutral-900">{col.head}</h4>
                  <ul className="space-y-2 text-xs text-neutral-500">
                    {col.links.map(l => (
                      <li key={l} className="hover:text-green-600 cursor-pointer transition-colors">{l}</li>
                    ))}
                  </ul>
               </div>
             ))}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-100 text-[10px] text-neutral-400 font-medium uppercase tracking-widest">
             <p>© 2026 Kruka Tech.</p>
             <div className="flex gap-6 mt-4 md:mt-0">
                <span className="hover:text-neutral-900 cursor-pointer">Privacidade</span>
                <span className="hover:text-neutral-900 cursor-pointer">Termos</span>
                <span className="flex items-center gap-1 hover:text-neutral-900 cursor-pointer"><Globe size={10}/> PT</span>
             </div>
          </div>
        </div>
      </footer>
    </main>
  );
}