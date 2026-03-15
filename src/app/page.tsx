"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Crown, Star, Play, Lock, TrendingUp, ShieldCheck, Zap, Instagram, Camera, Gift, Check, CreditCard, Scissors, ChevronRight, Layout, Smartphone, Globe, UserCheck, Wallet, Laptop, X, Church, Menu, Eye, Image as ImageIcon, Upload, Clock, Music, MapPin, Users, Shirt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback, memo } from "react";

const SPOTLIGHT_SIZE = 400;

const Rings = ({ size, className = "" }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="12" r="5" />
    <circle cx="15" cy="12" r="5" />
  </svg>
);

const PARTICLES = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  iconIndex: i % 4,
  left: (i * 17) % 100,
  size: 36 + (i % 3) * 18,
  duration: 25 + (i % 3) * 6,
  delay: -(i * 5.5),
  rotate: i * 60,
  opacity: 0.15 + (i % 3) * 0.06,
}));

const ParticleIcons = [Heart, Church, Crown, Sparkles];

const FloatingParticles = memo(function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {PARTICLES.map((p) => {
        const Icon = ParticleIcons[p.iconIndex];
        return (
          <motion.div
            key={p.id}
            initial={{ y: "110vh", opacity: 0, rotate: p.rotate }}
            animate={{ y: "-20vh", opacity: [0, p.opacity, p.opacity, 0], rotate: p.rotate + 360 }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
            style={{ left: `${p.left}%`, willChange: 'transform, opacity' }}
            className="absolute"
          >
            <Icon size={p.size} className="text-[#D4AF37]" strokeWidth={1.5} fill="none" />
          </motion.div>
        );
      })}
    </div>
  );
});

function SpotlightCard({ children, className = "", dark = false }: { children: React.ReactNode, className?: string, dark?: boolean }) {
  return (
    <div className={`${dark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'} rounded-[32px] p-8 transition-all duration-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [siteData, setSiteData] = useState({
    coupleNames: '',
    date: '',
    story: '',
    style: '',
    bgPhoto: null as string | null,
    galleryPhotos: ['', '', '', '', '', ''] as string[],
    hasGiftList: true,
    isCreating: false,
    sections: {
      gallery: true,
      ceremony: true,
      story: true,
      groomsmen: false,
      gifts: true,
      countdown: true,
      playlist: false,
      rsvp: true,
      dresscode: false,
      map: true,
    } as Record<string, boolean>
  });
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle");
  const [selectedTemplate, setSelectedTemplate] = useState<{ name: string; price: string } | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('mobile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
    });
  }, []);

  const handleCreateSite = () => {
    setSiteData(prev => ({ ...prev, isCreating: true }));
    setTimeout(() => {
      setShowOnboarding(false);
      router.push('/dashboard');
    }, 2500);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'bg' | 'gallery', index?: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'bg') {
          setSiteData(prev => ({ ...prev, bgPhoto: result }));
        } else if (index !== undefined) {
          setSiteData(prev => {
            const newGallery = [...prev.galleryPhotos];
            newGallery[index] = result;
            return { ...prev, galleryPhotos: newGallery };
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const iframeDesktopRef = useRef<HTMLIFrameElement>(null);
  const iframeMobileRef = useRef<HTMLIFrameElement>(null);
  const isSyncing = useRef(false);

  useEffect(() => {
    if (!selectedPreview) return;

    const desktopWin = iframeDesktopRef.current?.contentWindow;
    const mobileWin = iframeMobileRef.current?.contentWindow;

    const sync = (source: Window, target: Window) => {
      if (isSyncing.current) return;
      isSyncing.current = true;

      const sourceDoc = source.document.documentElement;
      const targetDoc = target.document.documentElement;

      const percentage = source.scrollY / (sourceDoc.scrollHeight - source.innerHeight);
      const targetY = percentage * (targetDoc.scrollHeight - target.innerHeight);

      target.scrollTo(0, targetY);

      setTimeout(() => {
        isSyncing.current = false;
      }, 20);
    };

    const handleDesktopScroll = () => {
      if (desktopWin && mobileWin) sync(desktopWin, mobileWin);
    };

    const handleMobileScroll = () => {
      if (desktopWin && mobileWin) sync(mobileWin, desktopWin);
    };

    const setup = () => {
      try {
        desktopWin?.addEventListener("scroll", handleDesktopScroll);
        mobileWin?.addEventListener("scroll", handleMobileScroll);

        const styleDesktop = `
          ::-webkit-scrollbar { width: 5px; height: 5px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #C5A028; }
        `;
        const styleMobile = `
          ::-webkit-scrollbar { display: none; }
          scrollbar-width: none;
        `;

        if (desktopWin) {
          const s = desktopWin.document.createElement("style");
          s.innerHTML = styleDesktop;
          desktopWin.document.head.appendChild(s);
        }
        if (mobileWin) {
          const s = mobileWin.document.createElement("style");
          s.innerHTML = styleMobile;
          mobileWin.document.head.appendChild(s);
        }
        desktopWin?.addEventListener("scroll", handleDesktopScroll, { passive: true });
        mobileWin?.addEventListener("scroll", handleMobileScroll, { passive: true });
      } catch (e) {
        console.warn("Couldn't sync scroll or style - cross-origin or load issues.");
      }
    };

    const timeout = setTimeout(setup, 1500);

    return () => {
      clearTimeout(timeout);
      desktopWin?.removeEventListener("scroll", handleDesktopScroll);
      mobileWin?.removeEventListener("scroll", handleMobileScroll);
    };
  }, [selectedPreview]);


  return (
    <div className="min-h-screen bg-white text-zinc-600 font-sans selection:bg-[#D4AF37]/30 selection:text-zinc-900 overflow-hidden scroll-smooth">
      <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #C5A028; }
      `}</style>

      {/* Background Ambience e Fundo Animado */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-[#B76E79]/5 blur-[80px] rounded-full" />
      </div>

      {/* Camada Dedicada apenas para a Animação para Garantir Visibilidade */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <FloatingParticles />
      </div>

      {/* Navbar Premium */}
      {/* Navbar Premium */}
      <nav className="fixed top-0 w-full px-4 md:px-8 py-3 flex justify-between items-center z-50 backdrop-blur-2xl bg-white/80 border-b border-lumina-gold/10">
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-bold tracking-tighter text-zinc-900 flex items-center gap-2"
        >
          <Crown className="text-lumina-gold" size={20} />
          Lumina<span className="text-lumina-gold">.</span>
        </motion.div>
        <div className="hidden md:flex gap-10 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          <a href="#colecao" className="hover:text-zinc-900 transition-colors">Coleção</a>
          <a href="#diferencial" className="hover:text-zinc-900 transition-colors">Diferenciais</a>
          <a href="#fluxo" className="hover:text-zinc-900 transition-colors">Como Funciona</a>
          <a href="#precos" className="hover:text-zinc-900 transition-colors">Planos</a>
        </div>

        <div className="flex items-center gap-4">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/dashboard" className="relative group overflow-hidden px-4 md:px-8 py-2 md:py-3 rounded-full bg-white/80 text-zinc-900 text-xs md:text-sm font-bold border border-[#D4AF37]/30 hover:border-[#D4AF37]/80 transition-all shadow-sm flex items-center gap-2">
              <span className="relative z-10 flex items-center gap-2">
                <span className="hidden sm:inline">Painel Exclusivo</span>
                <span className="sm:hidden">Painel</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Link>
          </motion.div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-900"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white border-b border-lumina-gold/10 p-6 flex flex-col gap-6 md:hidden shadow-xl"
            >
              <a href="#colecao" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-zinc-600">Coleção</a>
              <a href="#diferencial" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-zinc-600">Diferenciais</a>
              <a href="#precos" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-zinc-600">Planos</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Epic Hero Section Otimizado e Premium */}
      <main
        onMouseMove={handleMouseMove}
        className="relative pt-24 md:pt-32 pb-20 md:pb-32 px-6 md:px-8 min-h-screen flex text-center items-center justify-center z-10 overflow-hidden"
      >
        {/* Background transparente para PRESERVAR a animação do fundo fixo */}
        <div className="absolute inset-0 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/40 backdrop-blur-md border border-lumina-gold/20 text-[10px] uppercase tracking-[0.3em] font-black text-lumina-gold-dark mb-10 shadow-xl shadow-lumina-gold/5"
          >
            <Sparkles size={14} className="animate-pulse" />
            O espaço oficial do seu "Sim"
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-[9.2rem] font-bold tracking-tighter text-zinc-900 max-w-6xl leading-[0.9] md:leading-[0.85] mb-8 md:mb-10"
          >
            Elevando o seu <br />
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-lumina-gold-dark via-lumina-gold to-lumina-gold-dark drop-shadow-sm">
              Grande Dia.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-base md:text-2xl text-zinc-500 max-w-3xl font-light leading-relaxed mb-12 md:mb-16"
          >
            Design feito para <span className="text-zinc-900 font-medium text-italic">emocionar</span>, tecnologia feita para <span className="text-zinc-900 font-medium">descomplicar</span>.
            Seu site de casamento sem taxas escondidas e com a sofisticação que o momento pede.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-8 w-full justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setShowOnboarding(true); setOnboardingStep(1); }}
              className="relative group bg-zinc-900 text-white px-8 md:px-16 py-5 md:py-7 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.3em] transition-all flex items-center gap-4 overflow-hidden shadow-2xl shadow-zinc-900/30 w-full sm:w-auto justify-center"
            >
              <div className="absolute inset-0 bg-lumina-gold/40 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10 flex items-center gap-3">
                Criar Nosso Site <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.02)" }}
              whileTap={{ scale: 0.95 }}
              href="#diferencial"
              className="px-8 md:px-16 py-5 md:py-7 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest text-zinc-900 border-2 border-zinc-100 transition-all flex items-center gap-3 bg-white/50 backdrop-blur-sm shadow-sm w-full sm:w-auto justify-center"
            >
              Ver Coleção <Layout size={18} className="text-lumina-gold" />
            </motion.a>
          </motion.div>

        </div>

        {/* Notificação de Presente - animação suave declarativa */}
        <motion.div
          animate={{ x: [-20, 20, -20], y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[8%] top-[25%] hidden xl:block z-20 pointer-events-none"
        >
          <div className="bg-white p-6 rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-zinc-50 flex items-center gap-4 w-72">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Zap size={24} fill="currentColor" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-0.5">Novo Presente</div>
              <div className="text-xl font-bold text-zinc-900">R$ 1.500,00</div>
              <div className="text-[11px] text-zinc-500 font-medium">Enviado por André & Juliana</div>
            </div>
          </div>
        </motion.div>

        {/* Badge RSVP Online */}
        <motion.div
          animate={{ x: [0, 12, 0], y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute left-[10%] bottom-[20%] hidden xl:block z-20 pointer-events-none"
        >
          <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-full shadow-[0_15px_40px_rgba(212,175,55,0.1)] border border-lumina-gold/20 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-lumina-gold animate-ping" />
            <span className="text-xs font-black uppercase tracking-widest text-zinc-900">182 Convidados Confirmados</span>
          </div>
        </motion.div>

        {/* Tag Taxa Zero */}
        <motion.div
          animate={{ rotate: [-12, -8, -12], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute left-[12%] top-[30%] hidden 2xl:block z-20 pointer-events-none"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/30">
            Taxa 0% no PIX
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-lumina-gold to-transparent" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
        </motion.div>

      </main>

      {/* Trust Bar */}
      <div className="relative z-10 py-10 bg-white border-y border-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">Plataforma recomendada para quem quer facilidade </div>
          <div className="flex gap-12 items-center">
            <span className="text-xl font-serif italic text-zinc-900">Wedding</span>
            <span className="text-xl font-serif italic text-zinc-900">SeuSite.com</span>
            <span className="text-xl font-serif italic text-zinc-900">MaisFacil</span>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <section className="py-40 px-8 relative z-10 bg-[#FAF8F5]" id="fluxo">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-[#D4AF37] mb-4">Sem complicação</h2>
            <p className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">O site dos seus sonhos, criado em segundos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative">
            <div className="hidden md:block absolute top-24 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

            {[
              { num: "01", icon: Layout, title: "Escolha seu Estilo", desc: "Navegue por nossa coleção de estéticas exclusivas. Você não precisa entender de código, apenas de bom gosto." },
              { num: "02", icon: Sparkles, title: "Deixe com a sua cara", desc: "Altere fotos, frases e detalhes com um toque. O site se molda à história de vocês." },
              { num: "03", icon: Globe, title: "Compartilhe o amor", desc: "Ative seu domínio e comece a receber carinho, confirmações e presentes em tempo real." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white shadow-2xl shadow-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-8 border border-[#D4AF37]/10">
                  <step.icon size={32} />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-zinc-900 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">{step.num}</div>
                </div>
                <h4 className="text-xl font-bold text-zinc-900 mb-4">{step.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features / Social Proof */}
      <section className="py-32 px-8 relative z-10" id="diferencial">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4">A Diferença Lumina</h2>
            <p className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">O Fim das Taxas Abusivas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]">
            {/* Bento 1: Large Span */}
            <SpotlightCard className="md:col-span-2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6">
                <ShieldCheck size={18} /> Liberdade Financeira
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-4">
                100% do valor<br />direto no seu Pix.
              </h3>
              <p className="text-zinc-500 text-lg max-w-md">
                Enquanto o mercado cobra até 6% sobre os seus presentes, na Lumina você recebe o valor integral na hora. Sem intermediários.
              </p>
            </SpotlightCard>

            {/* Bento 2: RSVP - Agora Limpo e Claro */}
            <SpotlightCard className="flex flex-col justify-between items-start bg-white shadow-xl shadow-zinc-100/50">
              <div className="w-full">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-8 border border-[#D4AF37]/20">
                  <Heart className="text-[#D4AF37]" fill="currentColor" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Confirmação via WhatsApp</h3>
                <p className="text-zinc-500 text-sm font-medium">Controle de convidados automatizado pelo WhatsApp, com confirmação em tempo real.</p>
              </div>
            </SpotlightCard>

            {/* Bento 3 */}
            <SpotlightCard className="group flex flex-col justify-between bg-white">
              <div className="flex justify-between w-full">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <Zap size={24} />
                </div>
                <div className="text-zinc-300 font-bold text-5xl transition-all group-hover:text-zinc-400 group-hover:scale-110">01</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Performance Real</h3>
                <p className="text-zinc-500 text-sm">Seu site carrega instantaneamente. Respeito pelo tempo dos seus convidados.</p>
              </div>
            </SpotlightCard>

            {/* Bento 4: Comparison Chart */}
            <SpotlightCard className="md:col-span-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-50" />
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-bold text-zinc-900">Compare e Decida</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-zinc-500 opacity-80">
                      <Lock size={20} /> Sites de Casamento Comuns (5-7% de taxa)
                    </div>
                    <div className="flex items-center gap-4 text-emerald-600 font-medium bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                      <TrendingUp size={20} /> Lumina Wedding (Taxa ZERO no Pix)
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white/60 p-6 rounded-2xl border border-[#D4AF37]/20 w-full shadow-inner">
                  <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-4">Economia Estimada</div>
                  <div className="text-6xl font-black text-zinc-900 mb-2">R$ 4.200<span className="text-2xl text-zinc-400">,00</span></div>
                  <div className="text-sm text-[#D4AF37]">Em uma lista de R$ 60 mil</div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Dashboard Showcase - The "Brain" */}
      <section className="py-40 px-8 relative z-10 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#D4AF37]">Gestão Inteligente</h2>
              <p className="text-5xl font-bold text-zinc-900 tracking-tight leading-tight">Um Painel feito para <br /> a tranquilidade dos noivos.</p>
              <div className="space-y-6">
                {[
                  { title: "Gestão de Presentes", desc: "Acompanhe cada centavo recebido em tempo real com extratos detalhados." },
                  { title: "Lista de Convidados", desc: "Gestão automatizada com filtros por família e status de confirmação." },
                  { title: "Editor Visual", desc: "Altere fotos, textos e músicas do seu site com um clique, direto do celular." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-[#D4AF37]/10">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 font-bold">{idx + 1}</div>
                    <div>
                      <h4 className="font-bold text-zinc-900 mb-1">{item.title}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent blur-[40px] -z-10" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(212,175,55,0.15)] border border-[#D4AF37]/20 overflow-hidden"
              >
                {/* Mockup Top Bar */}
                <div className="bg-zinc-100 px-6 py-4 flex items-center justify-between border-b border-zinc-200">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF605C]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD44]" />
                    <div className="w-3 h-3 rounded-full bg-[#00CA4E]" />
                  </div>
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Lumina Dashboard</div>
                  <div className="w-20" />
                </div>
                {/* Mockup Content */}
                <div className="p-8 space-y-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Saldo Disponível</span>
                      <div className="text-4xl font-black text-zinc-900">R$ 24.850,00</div>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp size={12} /> +12% hoje
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                      <div className="text-[10px] uppercase font-bold text-zinc-400 mb-2">Convidados Confirmados</div>
                      <div className="text-2xl font-bold text-zinc-900">182<span className="text-zinc-300 text-sm font-normal"> / 250</span></div>
                    </div>
                    <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                      <div className="text-[10px] uppercase font-bold text-zinc-400 mb-2">Presentes Recebidos</div>
                      <div className="text-2xl font-bold text-zinc-900">42</div>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4">
                    <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Atividade Recente</div>
                    {[
                      { initial: "JM", color: "bg-blue-100 text-blue-600", name: "João & Maria enviaram um presente", desc: "Cota de Viagem • 2 min atrás", price: "R$ 500" },
                      { initial: "RA", color: "bg-emerald-100 text-emerald-600", name: "Ricardo & Ana confirmaram presença", desc: "Confirmação Realizada • 15 min atrás", price: "" },
                      { initial: "L", color: "bg-amber-100 text-amber-600", name: "Lucas enviou um presente", desc: "Faqueiro de Prata • 1 hora atrás", price: "R$ 350" }
                    ].map((item, id) => (
                      <div key={id} className="flex justify-between items-center p-3 hover:bg-zinc-50 rounded-lg transition-colors cursor-default">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${item.color} border border-white shadow-sm`}>
                            {item.initial}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-zinc-900">{item.name}</div>
                            <div className="text-[10px] text-zinc-400 uppercase">{item.desc}</div>
                          </div>
                        </div>
                        {item.price && <div className="text-sm font-bold text-zinc-900">{item.price}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Collection - Spatial Design */}
      <section className="py-32 relative z-10" id="colecao">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4">A Coleção 2026</h2>
              <p className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight">Arquitetura <br /> de Emoções.</p>
            </div>
            <div className="mt-8 md:mt-0 text-zinc-600 max-w-md text-lg">
              Seis estéticas fundamentais, lapidadas com precisão nanométrica para refletir a verdadeira essência do seu evento.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                num: '01', tag: 'Obsidiana', name: 'Obsidiana', tagColor: 'text-white', arrowColor: 'text-white', borderColor: 'border-white/50',
                desc: <>A escolha de <span className="text-white font-medium">Marcella & Lucca</span> no Fasano.</>, descColor: 'text-zinc-300',
                gradFrom: 'from-black/80', gradVia: 'via-black/20', img: 'photo-1511285560929-80b456fea0bc',
                preview: '/site-demo/minimalista', price: 'R$ 597', offset: false,
                previewBtnClass: 'bg-white text-black hover:bg-[#D4AF37] hover:text-white shadow-sm',
                buyBtnClass: 'bg-white/20 border border-white/40 text-white hover:bg-white hover:text-black',
              },
              {
                num: '02', tag: 'Royalty', name: 'Classic Gold', tagColor: 'text-[#D4AF37]', arrowColor: 'text-[#D4AF37]', borderColor: 'border-[#D4AF37]/50',
                desc: <>A tradição de <span className="text-white font-medium">Sophia & Arthur</span> na Catedral.</>, descColor: 'text-[#D4AF37]/90',
                gradFrom: 'from-[#1A1814]/90', gradVia: 'via-[#1A1814]/30', img: 'photo-1519741497674-611481863552',
                preview: '/site-demo/classico', price: 'R$ 597', offset: true,
                previewBtnClass: 'bg-[#D4AF37] text-white hover:bg-white hover:text-black shadow-lg',
                buyBtnClass: 'bg-white/20 border border-white/40 text-white hover:bg-white hover:text-black',
              },
              {
                num: '03', tag: 'Orgânico', name: 'Boho Chic', tagColor: 'text-[#F3E5AB]', arrowColor: 'text-[#F3E5AB]', borderColor: 'border-[#F3E5AB]/50',
                desc: <>O pôr-do-sol de <span className="text-white font-medium">Livia & Gabriel</span> em Trancoso.</>, descColor: 'text-white/80',
                gradFrom: 'from-[#3A2219]/90', gradVia: 'via-[#3A2219]/20', img: 'photo-1515934751635-c81c6bc9a2d8',
                preview: '/site-demo/boho', price: 'R$ 597', offset: false,
                previewBtnClass: 'bg-white/20 border border-white/40 text-white hover:bg-white hover:text-[#3A2219]',
                buyBtnClass: 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black',
              },
              {
                num: '04', tag: 'Vanguarda', name: 'Vanguarda', tagColor: 'text-zinc-300', arrowColor: 'text-white', borderColor: 'border-white/30',
                desc: <>A ousadia de <span className="text-white font-medium">Clara & Theo</span> na Pinacoteca.</>, descColor: 'text-zinc-300',
                gradFrom: 'from-black/90', gradVia: 'via-black/40', img: 'photo-1583939003579-730e3918a45a',
                preview: '/site-demo/vanguarda', price: 'R$ 597', offset: false,
                previewBtnClass: 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black',
                buyBtnClass: 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black',
              },
              {
                num: '05', tag: 'Celeste', name: 'Celeste', tagColor: 'text-[#A3C9B4]', arrowColor: 'text-[#A3C9B4]', borderColor: 'border-[#A3C9B4]/50',
                desc: <>O "Sim" de <span className="text-white font-medium">Helena & Vinicius</span> no Jardim.</>, descColor: 'text-[#A3C9B4]/80',
                gradFrom: 'from-[#15241C]/90', gradVia: 'via-[#15241C]/30', img: 'photo-1519225421980-715cb0215aed',
                preview: '/site-demo/celeste', price: 'R$ 597', offset: true,
                previewBtnClass: 'bg-white/20 border border-white/30 text-white hover:bg-white hover:text-[#15241C]',
                buyBtnClass: 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black',
              },
              {
                num: '06', tag: 'Ícone', name: 'Ícone', tagColor: 'text-[#F3E6D5]', arrowColor: 'text-[#F3E6D5]', borderColor: 'border-[#F3E6D5]/50',
                desc: <>A história de <span className="text-white font-medium">Isabella & Matteo</span> na Toscana.</>, descColor: 'text-[#F3E6D5]/80',
                gradFrom: 'from-[#2C1A14]/90', gradVia: 'via-[#2C1A14]/40', img: 'photo-1502082553048-f009c37129b9',
                preview: '/site-demo/icone', price: 'R$ 597', offset: false,
                previewBtnClass: 'bg-gradient-to-r from-[#8C4A32] to-[#6E3524] text-white hover:from-[#A85B3F] hover:to-[#8C4A32] shadow-lg',
                buyBtnClass: 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black',
              },
            ].map((t) => (
              <motion.div
                key={t.num}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`group relative rounded-[40px] overflow-hidden bg-white border ${
                  t.offset ? 'border-[#D4AF37]/30 mt-0 md:mt-12 shadow-xl' : 'border-[#D4AF37]/20 shadow-lg'
                } isolate`}
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-t ${t.gradFrom} ${t.gradVia} to-transparent z-10`} />
                  <Image
                    src={`https://images.unsplash.com/${t.img}?auto=format&fit=crop&q=75&w=600`}
                    alt={t.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 border-[10px] border-white/10 z-20 rounded-[40px] pointer-events-none" />

                  <div className="absolute bottom-0 left-0 w-full p-10 z-20 space-y-6">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold uppercase tracking-[0.3em] ${t.tagColor}`}>{t.num} / {t.tag}</span>
                      <span className={`w-8 h-8 rounded-full border ${t.borderColor} flex items-center justify-center`}>
                        <ArrowRight size={14} className={t.arrowColor} />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2 font-serif">{t.name}</h3>
                      <p className={`${t.descColor} text-sm`}>{t.desc}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedPreview(t.preview)}
                        className={`flex-1 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${t.previewBtnClass}`}
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTemplate({ name: t.name, price: t.price });
                          setShowPayment(true);
                        }}
                        className="flex-1"
                      >
                        <div className={`w-full py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all text-center ${t.buyBtnClass}`}>
                          Comprar
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Infinite — CSS puro para melhor performance */}
      <div className="py-20 border-y border-[#D4AF37]/20 bg-[#D4AF37]/[0.05] overflow-hidden whitespace-nowrap">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-16 items-center text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-600 to-zinc-400 uppercase tracking-tighter px-8">
              <span>Acesso Imediato</span>
              <Star className="text-[#D4AF37]" size={32} />
              <span>Zero Taxas</span>
              <Star className="text-[#D4AF37]" size={32} />
              <span>Lista via PIX</span>
              <Star className="text-[#D4AF37]" size={32} />
              <span>Confirmação Mágica</span>
              <Star className="text-[#D4AF37]" size={32} />
            </div>
          ))}
        </div>
      </div>

      {/* Pricing / Investment Section */}
      <section className="py-40 px-8 relative z-10 bg-white/40" id="precos">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4">O Seu Investimento</h2>
            <p className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-6">Transparência em Cada Detalhe.</p>
            <p className="text-zinc-600 text-lg">Sem mensalidades, sem comissões escondidas sobre os seus presentes. Um valor único para criar um espaço inesquecível e receber <span className="font-bold text-zinc-900">100% do dinheiro</span> direto na sua conta.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Competition Card */}
            <SpotlightCard className="bg-white border-zinc-200 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-100" />
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-zinc-500 mb-2 uppercase tracking-widest flex items-center gap-2">
                    Outras Plataformas <Scissors size={16} className="text-red-400" />
                  </h3>
                  <p className="text-zinc-400 text-sm italic">Onde o custo sobe e o lucro deles é quem brilha.</p>
                </div>
                <div className="text-4xl font-black text-zinc-400 mb-10">R$ 490<span className="text-sm font-bold text-zinc-300 ml-1">+ taxas extras</span></div>
                <ul className="space-y-5 mb-10">
                  {[
                    "Corte de 3.8% a 6% sobre cada presente",
                    "Mensalidades recorrentes obrigatórias",
                    "Site com propaganda e marca alheia",
                    "Limite de convidados (cobram por extras)",
                    "Suporte lento via ticket/e-mail"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-500 text-sm font-medium">
                      <X size={16} className="text-red-400 shrink-0" strokeWidth={3} /> {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-red-50 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center border border-red-100/50">
                Modelo Ultrapassado & Caro
              </div>
            </SpotlightCard>

            {/* Lumina Card */}
            <SpotlightCard dark className="border-lumina-gold/30 shadow-2xl relative overflow-hidden group !bg-zinc-950 flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-lumina-gold text-white px-6 py-2 text-[10px] uppercase font-black tracking-widest rounded-bl-2xl z-20">O Seu Novo Padrão</div>

              <div className="relative z-10">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">Lumina Experience <Crown size={20} className="text-lumina-gold" /></h3>
                  <p className="text-zinc-400 text-sm">Transparência total para o seu grande dia.</p>
                </div>
                <div className="flex flex-col mb-10">
                  <div className="text-[10px] font-black text-lumina-gold uppercase tracking-[0.3em] mb-2">Pagamento único sem Surpresas</div>
                  <div className="text-6xl font-black text-white leading-none">R$ 199<span className="text-2xl">,99</span></div>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    { text: "Taxa 0% (Você recebe 100% do valor via Pix)", icon: <Wallet size={18} /> },
                    { text: "Ativo por 1 ano após a compra", icon: <Check size={18} /> },
                    { text: "URL Premium (lumina.com.br/seu-nome)", icon: <Globe size={18} /> },
                    { text: "Download Digital do Site Incluso", icon: <Sparkles size={18} /> },
                    { text: "RSVP Ilimitado via Site e WhatsApp", icon: <UserCheck size={18} /> }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-zinc-200 font-bold text-sm">
                      <span className="text-lumina-gold shrink-0">{item.icon}</span> {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full py-6 rounded-2xl bg-gradient-to-r from-lumina-gold-dark to-lumina-gold text-white font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-lumina-gold/20 relative z-10 group">
                RESERVAR MINHA VAGA <ArrowRight size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-40 px-8 relative z-10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-[#D4AF37]">Depoimentos</h2>
              <p className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">Histórias que <br /> nos inspiram.</p>
              <div className="flex gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="relative w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-zinc-200">
                      <Image src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="couples" fill sizes="48px" className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium text-zinc-500">
                  <span className="text-zinc-900 font-bold">+10.000 casais</span> <br />
                  já realizaram o sonho conosco.
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 p-12 rounded-[48px] border border-zinc-100 relative">
              <Sparkles className="absolute top-10 right-10 text-[#D4AF37]/20" size={64} />
              <p className="text-2xl font-serif italic text-zinc-700 leading-relaxed mb-10">
                "O Lumina mudou completamente nossa experiência. A facilidade de receber os presentes por Pix direto na conta, sem as taxas gigantes dos outros sites, nos deu uma economia de quase 5 mil reais."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold text-xl font-serif italic">A&M</div>
                <div>
                  <div className="font-bold text-zinc-900">Amanda & Marcelo</div>
                  <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Fevereiro 2025 • Casamento Campestre</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-40 px-8 relative z-10 bg-[#FAF9F7]/50" id="faq">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4">Transparência Total</h2>
            <p className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-8">Dúvidas comuns <br /> (sem letras miúdas).</p>
            <p className="text-zinc-500 text-lg mb-10">Ficou alguma ponta solta? Nossa equipe de suporte fala com você pelo WhatsApp em minutos.</p>
            <a href="https://wa.me/550000000000" className="inline-flex items-center gap-2 text-zinc-900 font-bold border-b-2 border-[#D4AF37] pb-1 hover:text-[#D4AF37] transition-colors">
              Conversar com especialista <ArrowRight size={18} />
            </a>
          </div>

          <div className="space-y-6">
            {[
              { q: "Como vou receber o dinheiro dos presentes?", a: "Direto na sua conta bancária via Pix. O Lumina não 'segura' seu dinheiro — ele cai na hora e 100% livre de taxas de comissão." },
              { q: "Vou ter um endereço personalizado?", a: "Sim! Você terá uma URL premium no formato lumina.com.br/seu-nome. É elegante, fácil de compartilhar e sem os custos de registro de um domínio próprio." },
              { q: "Tem limite de pessoas para a lista de convidados?", a: "Nenhum. Seja para um micro-wedding ou um festão para 1.000 pessoas, o controle de presença é ilimitado e organizado." },
              { q: "O site fica online para sempre?", a: "Seu site fica ativo por 1 ano completo a partir da compra. Mas não se preocupe: você poderá baixar uma versão digital completa do seu site para guardar como recordação eterna." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                <h5 className="font-bold text-zinc-900 mb-3 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> {item.q}
                </h5>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Epic CTA */}
      <section className="relative py-40 overflow-hidden flex items-center justify-center text-center px-8 z-10" id="final">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=60&w=1200" fill sizes="100vw" className="object-cover opacity-[0.2]" alt="Background" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8A5B32] p-[1px] mb-8 shadow-2xl">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center backdrop-blur-xl">
              <Crown size={40} className="text-[#D4AF37]" />
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl font-black text-zinc-900 tracking-tighter leading-none">
            Inicie o Seu <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C5A028]">Felizes Para Sempre.</span>
          </h2>
          <p className="text-xl text-zinc-600 font-light max-w-2xl mx-auto">Sua história é única. O seu site de casamento também deveria ser. Crie um espaço virtual que reflete a beleza do seu amor.</p>

          <div className="pt-10 flex flex-col md:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => { setShowOnboarding(true); setOnboardingStep(1); }}
              className="bg-[#D4AF37] text-white px-14 py-6 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:scale-105 transition-all w-full md:w-auto shadow-lg shadow-[#D4AF37]/30 flex items-center justify-center"
            >
              Começar Agora
            </button>
            <a href="#colecao" className="px-14 py-6 rounded-full font-bold text-sm uppercase tracking-[0.2em] text-zinc-900 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-all backdrop-blur-md w-full md:w-auto bg-white/50 flex items-center justify-center">
              Ver Demonstrações
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-[#D4AF37]/20 bg-white pt-20 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-2xl font-bold text-zinc-900 mb-6">
              <Crown className="text-[#D4AF37]" size={28} />
              Lumina<span className="text-[#D4AF37]">.</span>
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed mb-8">
              Redefinindo a presença digital de casamentos de luxo. Design de alta-costura para momentos que merecem a eternidade.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Pinterest', 'Play'].map((iconName) => (
                <a key={iconName} href="#" className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all">
                  <div className="w-5 h-5 flex items-center justify-center">
                    {iconName === 'Instagram' && <Instagram size={18} />}
                    {iconName === 'Pinterest' && <Camera size={18} />}
                    {iconName === 'Play' && <Play size={18} />}
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-6 uppercase text-xs tracking-widest">Produto</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-500">
              <li><a href="#colecao" className="hover:text-[#D4AF37] transition-colors">Coleção 2026</a></li>
              <li><a href="#diferencial" className="hover:text-[#D4AF37] transition-colors">Funcionalidades</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Lista de Presentes</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Confirmação de Presença</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-6 uppercase text-xs tracking-widest">Suporte</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-500">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Ajuda</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Privacidade</a></li>
              <li><a href="https://wa.me/550000000000" className="flex items-center gap-2 text-[#D4AF37] hover:opacity-80 transition-opacity">WhatsApp Concierge</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-[#D4AF37]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-zinc-400 text-xs font-light">
            © 2026 Lumina Wedding Technology. Todos os direitos reservados.
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-zinc-400">
            <span>Orgulhosamente Brasileiro</span>
            <span>Design High-End</span>
          </div>
        </div>
      </footer>

      {/* Onboarding Wizard Modal */}
      <AnimatePresence>
        {showOnboarding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowOnboarding(false)}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2rem] md:rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D4AF37]/20"
            >
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-zinc-100 flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(onboardingStep / 6) * 100}%` }}
                  className="bg-[#D4AF37]"
                />
              </div>

              <div className="p-5 md:p-12">
                <div className="flex justify-between items-center mb-6 md:mb-12">
                  <div className="flex items-center gap-2 font-black text-zinc-900 uppercase text-[9px] md:text-xs tracking-[0.2em]">
                    <Crown size={18} className="text-[#D4AF37]" /> Passo {onboardingStep} de 6
                  </div>
                  <button onClick={() => setShowOnboarding(false)} className="text-zinc-400 hover:text-zinc-900 transition-colors p-2">
                    <X size={20} />
                  </button>
                </div>

                {onboardingStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 md:space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight">Qual o nome <br className="md:hidden" /> do casal?</h3>
                      <p className="text-sm md:text-base text-zinc-500 font-medium italic">Comece nos contando quem são os protagonistas.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest pl-4">Nomes dos Noivos</label>
                        <input
                          type="text"
                          placeholder="Ex: Maria & João"
                          value={siteData.coupleNames}
                          onChange={(e) => setSiteData(prev => ({ ...prev, coupleNames: e.target.value }))}
                          className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-8 py-5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-bold text-zinc-900 text-lg shadow-inner"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest pl-4">Data do Casamento</label>
                        <input
                          type="date"
                          value={siteData.date}
                          onChange={(e) => setSiteData(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-8 py-5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-bold text-zinc-900 text-lg shadow-inner"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {onboardingStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 md:space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight">O que seu site <br className="md:hidden" /> vai ter?</h3>
                      <p className="text-sm md:text-base text-zinc-500 font-medium italic">Selecione as seções que deseja incluir. Você pode mudar depois!</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-h-[55vh] overflow-y-auto pr-1 scrollbar-hide">
                      {[
                        { key: 'gallery', icon: Camera, label: 'Galeria de Fotos', desc: 'Exiba os melhores momentos do casal em um álbum bonito.' },
                        { key: 'ceremony', icon: Church, label: 'Endereço da Cerimônia', desc: 'Local, horário e um mapa integrado para os convidados.' },
                        { key: 'story', icon: Heart, label: 'História dos Noivos', desc: 'Conte como tudo começou até o grande "Sim".' },
                        { key: 'groomsmen', icon: Users, label: 'Padrinhos & Madrinhas', desc: 'Apresente as pessoas especiais que estarão ao lado de vocês.' },
                        { key: 'gifts', icon: Gift, label: 'Lista de Presentes', desc: 'Receba presentes via Pix, sem taxas, direto na sua conta.' },
                        { key: 'countdown', icon: Clock, label: 'Contagem Regressiva', desc: 'Um timer elegante contando os dias até o grande momento.' },
                        { key: 'playlist', icon: Music, label: 'Playlist / Música', desc: 'Sugira músicas ou toque uma trilha sonora ao fundo.' },
                        { key: 'rsvp', icon: UserCheck, label: 'Confirmação de Presença', desc: 'RSVP automático via site ou WhatsApp dos convidados.' },
                        { key: 'dresscode', icon: Shirt, label: 'Dress Code / Traje', desc: 'Oriente seus convidados sobre a vestimenta ideal.' },
                        { key: 'map', icon: MapPin, label: 'Mapa & Como Chegar', desc: 'Mapa interativo com rotas e referências do local.' },
                      ].map((item) => {
                        const isActive = siteData.sections[item.key];
                        return (
                          <button
                            key={item.key}
                            onClick={() => setSiteData(prev => ({
                              ...prev,
                              sections: { ...prev.sections, [item.key]: !prev.sections[item.key] }
                            }))}
                            className={`relative text-left p-5 md:p-6 rounded-2xl md:rounded-[1.5rem] border-2 transition-all duration-300 group ${
                              isActive
                                ? 'bg-zinc-900 border-lumina-gold/50 shadow-xl shadow-lumina-gold/10'
                                : 'bg-zinc-50 border-zinc-100 hover:border-zinc-200 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                                isActive
                                  ? 'bg-lumina-gold text-white shadow-lg shadow-lumina-gold/30 scale-110'
                                  : 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200'
                              }`}>
                                <item.icon size={20} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`font-bold text-sm mb-1 transition-colors ${isActive ? 'text-white' : 'text-zinc-900'}`}>{item.label}</h4>
                                <p className={`text-[11px] leading-relaxed transition-colors ${isActive ? 'text-zinc-400' : 'text-zinc-500'}`}>{item.desc}</p>
                              </div>
                            </div>
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-3 right-3 w-6 h-6 bg-lumina-gold rounded-full flex items-center justify-center text-white shadow-md"
                              >
                                <Check size={14} strokeWidth={3} />
                              </motion.div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between pt-2 px-2">
                      <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
                        {Object.values(siteData.sections).filter(Boolean).length} seções selecionadas
                      </p>
                      <button
                        onClick={() => {
                          const allActive = Object.values(siteData.sections).every(Boolean);
                          const newSections = Object.fromEntries(
                            Object.keys(siteData.sections).map(k => [k, !allActive])
                          );
                          setSiteData(prev => ({ ...prev, sections: newSections }));
                        }}
                        className="text-[10px] uppercase font-bold text-lumina-gold tracking-widest hover:text-lumina-gold-dark transition-colors"
                      >
                        {Object.values(siteData.sections).every(Boolean) ? 'Desmarcar Tudo' : 'Marcar Tudo'}
                      </button>
                    </div>
                  </motion.div>
                )}

                {onboardingStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight">Agora, conte <br /> sua história</h3>
                      <p className="text-sm md:text-base text-zinc-500 font-medium italic leading-relaxed">Escreva como vocês se conheceram e o que torna essa história especial.</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest pl-4">Nossa Jornada</label>
                      <textarea
                        rows={7}
                        placeholder="Em um café numa tarde de outono, dois destinos se cruzaram..."
                        value={siteData.story}
                        onChange={(e) => setSiteData(prev => ({ ...prev, story: e.target.value }))}
                        className="w-full bg-zinc-50 border border-zinc-100 rounded-3xl px-8 py-6 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-medium text-zinc-900 text-lg shadow-inner resize-none"
                      />
                    </div>

                  </motion.div>
                )}

                {onboardingStep === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 md:space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight">Defina a estética do site</h3>
                      <p className="text-sm md:text-base text-zinc-500 font-medium italic">Escolha o template que melhor reflete vocês.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                      {[
                        { id: '1', label: 'Obsidiana', url: '/site-demo/minimalista', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80' },
                        { id: '2', label: 'Classic Gold', url: '/site-demo/classico', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80' },
                        { id: '3', label: 'Boho Chic', url: '/site-demo/boho', img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80' },
                        { id: '4', label: 'Vanguarda', url: '/site-demo/vanguarda', img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800' },
                        { id: '5', label: 'Ethereal', url: '/site-demo/celeste', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800' },
                        { id: '6', label: 'Palazzo', url: '/site-demo/icone', img: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800' }
                      ].map((style) => (
                        <div key={style.id} className="group relative">
                          <button
                            onClick={() => setSiteData(prev => ({ ...prev, style: style.id }))}
                            className={`w-full relative aspect-[16/10] md:aspect-[16/10] rounded-2xl md:rounded-[1.5rem] overflow-hidden border-2 transition-all ${siteData.style === style.id
                                ? 'border-lumina-gold scale-[1.02] shadow-2xl'
                                : 'border-transparent hover:border-lumina-gold/50'
                              }`}
                          >
                            <img src={style.img} alt={style.label} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className={`absolute inset-0 bg-black/40 transition-opacity ${siteData.style === style.id ? 'opacity-20' : 'opacity-40 group-hover:opacity-20'}`} />

                            <div className="absolute inset-0 p-4 flex flex-col justify-end text-left">
                              <span className="text-white text-[9px] font-black uppercase tracking-[0.2em] leading-tight">{style.label}</span>
                            </div>

                            {siteData.style === style.id && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 w-5 h-5 bg-lumina-gold rounded-full flex items-center justify-center text-white z-10">
                                <Check size={12} strokeWidth={4} />
                              </motion.div>
                            )}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPreview(style.url);
                            }}
                            className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-black text-white md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-white hover:text-zinc-900 z-20 flex items-center gap-1.5 shadow-xl"
                          >
                            <Eye size={10} />
                            <span>PRÉVIA</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {onboardingStep === 5 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 md:space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight">Suas memórias</h3>
                      <p className="text-sm md:text-base text-zinc-500 font-medium italic">A foto principal e mais 6 fotos especiais.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      {/* Background Photo */}
                      <div
                        onClick={() => document.getElementById('bg-upload')?.click()}
                        className="col-span-2 relative aspect-[16/9] bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[2rem] flex flex-col items-center justify-center gap-2 group hover:border-lumina-gold transition-all cursor-pointer overflow-hidden shadow-inner"
                      >
                        {siteData.bgPhoto ? (
                          <img src={siteData.bgPhoto} alt="Capa" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <ImageIcon size={32} className="text-zinc-300 group-hover:text-lumina-gold transition-colors" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Foto de Capa</span>
                          </>
                        )}
                        <input
                          id="bg-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handlePhotoUpload(e, 'bg')}
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-zinc-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center gap-2 text-white">
                          <Upload size={14} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{siteData.bgPhoto ? 'Trocar Foto' : 'Upload Capa'}</span>
                        </div>
                      </div>

                      {/* Other 3 photos */}
                      {siteData.galleryPhotos.map((photo, i) => (
                        <div
                          key={i}
                          onClick={() => document.getElementById(`gallery-upload-${i}`)?.click()}
                          className="relative aspect-square bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[1.5rem] flex flex-col items-center justify-center gap-2 group hover:border-lumina-gold transition-all cursor-pointer overflow-hidden shadow-inner"
                        >
                          {photo ? (
                            <img src={photo} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                          ) : (
                            <>
                              <ImageIcon size={20} className="text-zinc-300 group-hover:text-lumina-gold transition-colors" />
                              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Foto {i + 1}</span>
                            </>
                          )}
                          <input
                            id={`gallery-upload-${i}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handlePhotoUpload(e, 'gallery', i)}
                          />
                          <div className="absolute inset-x-0 bottom-0 p-3 bg-zinc-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center gap-2 text-white">
                            <Upload size={12} />
                            <span className="text-[8px] font-bold uppercase tracking-widest">{photo ? 'Trocar' : 'Upload'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {onboardingStep === 6 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 py-4">
                    {siteData.isCreating ? (
                      <div className="space-y-6 text-center py-10">
                        <div className="relative w-24 h-24 mx-auto">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-4 border-dashed border-lumina-gold rounded-full"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles size={32} className="text-lumina-gold animate-bounce" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter">Lapidando sua experiência...</h3>
                          <div className="flex justify-center gap-1 mt-3">
                            {[1, 2, 3].map(i => (
                              <motion.div
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                                className="w-1.5 h-1.5 bg-lumina-gold rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-6">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lumina-gold/10 text-lumina-gold-dark text-[10px] uppercase font-black tracking-widest">
                            <Sparkles size={14} /> Design & Tecnologia
                          </div>
                          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-none">
                            Tudo pronto <br /> para o "Sim".
                          </h2>
                          <p className="text-zinc-500 font-medium italic text-lg leading-relaxed">
                            Confira cada detalhe do seu site. Esta é a versão que seus convidados verão. Role o celular ao lado para explorar!
                          </p>
                          
                          <div className="grid grid-cols-1 gap-4 pt-4">
                            {[
                              { icon: <Wallet size={16} />, title: "Receba via Pix", desc: "100% dos presentes caem na hora sem taxas." },
                              { icon: <UserCheck size={16} />, title: "RSVP Inteligente", desc: "Confirmações automáticas direto no WhatsApp." },
                              { icon: <Globe size={16} />, title: "URL Premium", desc: "Um endereço elegante com o nome de vocês." }
                            ].map((item, i) => (
                              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 items-start">
                                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-lumina-gold shrink-0">
                                  {item.icon}
                                </div>
                                <div>
                                  <h4 className="font-bold text-zinc-900 text-sm">{item.title}</h4>
                                  <p className="text-zinc-500 text-[11px] leading-tight">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Live Summary Card - lightweight, no heavy scroll/images */}
                        <div className="space-y-3">
                          {/* Hero Card */}
                          <div className="rounded-2xl overflow-hidden border border-zinc-100 shadow-sm">
                            <div
                              className="h-28 flex flex-col items-center justify-center text-center text-white relative"
                              style={siteData.bgPhoto ? { backgroundImage: `url(${siteData.bgPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: 'linear-gradient(135deg,#1a1a1a,#333)' }}
                            >
                              <div className="absolute inset-0 bg-black/40" />
                              <div className="relative z-10">
                                <Crown size={16} className="text-lumina-gold mx-auto mb-1" />
                                <p className="text-sm font-black tracking-tight leading-tight">{siteData.coupleNames || 'Maria & João'}</p>
                                <p className="text-[9px] text-lumina-gold font-bold uppercase tracking-widest mt-0.5">
                                  {siteData.date ? new Date(siteData.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Data do Casamento'}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Story preview */}
                          {siteData.sections.story && (
                            <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                              <p className="text-[9px] font-black text-lumina-gold uppercase tracking-widest mb-1">Nossa História</p>
                              <p className="text-[11px] text-zinc-500 italic leading-relaxed line-clamp-3">
                                {siteData.story || 'Sua história aparecerá aqui...'}
                              </p>
                            </div>
                          )}

                          {/* Sections chips */}
                          <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm">
                            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-3">Seções Ativadas</p>
                            <div className="flex flex-wrap gap-2">
                              {([
                                { key: 'gallery', icon: Camera, label: 'Galeria' },
                                { key: 'ceremony', icon: Church, label: 'Cerimônia' },
                                { key: 'story', icon: Heart, label: 'História' },
                                { key: 'groomsmen', icon: Users, label: 'Padrinhos' },
                                { key: 'gifts', icon: Gift, label: 'Presentes' },
                                { key: 'countdown', icon: Clock, label: 'Contagem' },
                                { key: 'playlist', icon: Music, label: 'Playlist' },
                                { key: 'rsvp', icon: UserCheck, label: 'RSVP' },
                                { key: 'dresscode', icon: Shirt, label: 'Dress Code' },
                                { key: 'map', icon: MapPin, label: 'Mapa' },
                              ] as const).filter(s => siteData.sections[s.key]).map(s => (
                                <span key={s.key} className="inline-flex items-center gap-1 bg-zinc-900 text-white text-[9px] font-bold px-2 py-1 rounded-full">
                                  <s.icon size={9} className="text-lumina-gold" />
                                  {s.label}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Template + photo strip */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-zinc-50 rounded-2xl p-3 border border-zinc-100">
                              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Template</p>
                              <p className="text-xs font-bold text-zinc-900">
                                {siteData.style === '1' ? 'Obsidiana' :
                                 siteData.style === '2' ? 'Classic Gold' :
                                 siteData.style === '3' ? 'Boho Chic' :
                                 siteData.style === '4' ? 'Vanguarda' :
                                 siteData.style === '5' ? 'Ethereal' :
                                 siteData.style === '6' ? 'Palazzo' : 'Não escolhido'}
                              </p>
                            </div>
                            <div className="bg-zinc-50 rounded-2xl p-3 border border-zinc-100">
                              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Fotos</p>
                              <p className="text-xs font-bold text-zinc-900">
                                {(siteData.bgPhoto ? 1 : 0) + siteData.galleryPhotos.filter(Boolean).length} carregadas
                              </p>
                            </div>
                          </div>

                          {/* Photo thumbnails if any */}
                          {(siteData.bgPhoto || siteData.galleryPhotos.some(Boolean)) && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                              {siteData.bgPhoto && (
                                <img src={siteData.bgPhoto} alt="capa" className="h-14 w-14 rounded-xl object-cover shrink-0 border border-zinc-100" />
                              )}
                              {siteData.galleryPhotos.filter(Boolean).map((p, i) => (
                                <img key={i} src={p} alt={`foto ${i}`} className="h-14 w-14 rounded-xl object-cover shrink-0 border border-zinc-100" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {!siteData.isCreating && (
                  <div className="mt-16 flex flex-col sm:flex-row gap-4">
                    {onboardingStep > 1 && (
                      <button
                        onClick={() => setOnboardingStep(prev => prev - 1)}
                        className="px-10 py-5 rounded-2xl font-black text-zinc-400 hover:text-zinc-900 transition-colors uppercase text-[10px] tracking-widest order-3 sm:order-1"
                      >
                        Voltar
                      </button>
                    )}
                    
                    {onboardingStep === 6 ? (
                      <>
                        <button
                          onClick={() => {
                            const styleNames: Record<string, string> = {
                              '1': 'Obsidiana', '2': 'Classic Gold', '3': 'Boho Chic',
                              '4': 'Vanguarda', '5': 'Ethereal', '6': 'Palazzo'
                            };
                            setSelectedTemplate({ 
                              name: styleNames[siteData.style] || "Personalizado", 
                              price: "R$ 199,99" 
                            });
                            setShowPayment(true);
                            setShowOnboarding(false);
                          }}
                          className="flex-1 bg-lumina-gold text-white rounded-2xl md:rounded-3xl py-5 md:py-6 font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:scale-[1.02] transition-all order-1"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <CreditCard size={18} />
                            Finalizar Compra
                          </div>
                        </button>
                        <button
                          onClick={() => handleCreateSite()}
                          className="flex-1 bg-zinc-900 text-white rounded-2xl md:rounded-3xl py-5 md:py-6 font-black uppercase text-[10px] tracking-[0.3em] shadow-xl hover:bg-zinc-800 transition-all order-2"
                        >
                          Salvar & Explorar Painel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setOnboardingStep(prev => prev + 1)}
                        className="flex-1 bg-zinc-900 text-white rounded-2xl md:rounded-3xl py-5 md:py-6 font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:bg-zinc-800 transition-all order-1 sm:order-2"
                      >
                        Próximo Passo
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {selectedPreview && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedPreview(null)}
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center"
            >
              <div className="flex justify-between items-center w-full mb-6 shrink-0">
                <div className="text-white">
                  <h4 className="font-bold text-xl mb-1 text-zinc-100">Preview Real-Time</h4>
                  <p className="text-zinc-400 text-xs uppercase tracking-widest font-bold">Experiência Multi-Device</p>
                </div>
                <button
                  onClick={() => setSelectedPreview(null)}
                  className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Device Toggle - Visible only on Mobile/Tablet */}
              <div className="flex lg:hidden bg-white/10 p-1 rounded-full mb-8 self-center">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${previewMode === 'desktop' ? 'bg-white text-zinc-900 shadow-xl' : 'text-white/60'}`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${previewMode === 'mobile' ? 'bg-white text-zinc-900 shadow-xl' : 'text-white/60'}`}
                >
                  Celular
                </button>
              </div>

              <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-10 overflow-hidden lg:overflow-visible py-4 lg:py-0">
                {/* Desktop Preview Wrapper */}
                <div className={`relative h-full flex items-center justify-center shrink-0 ${previewMode === 'desktop' ? 'flex' : 'hidden lg:flex'}`}>
                  {/* Desktop Frame */}
                  <div className="w-[1000px] h-[600px] bg-zinc-800 rounded-xl lg:rounded-[2rem] border-[4px] lg:border-[12px] border-zinc-800 shadow-2xl relative overflow-hidden shrink-0 origin-center scale-[0.32] sm:scale-[0.55] lg:scale-100">
                    <div className="absolute top-0 left-0 w-full h-4 lg:h-6 bg-zinc-900 flex items-center px-2 lg:px-4 gap-1 lg:gap-1.5 z-20">
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#FF605C]" />
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#FFBD44]" />
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#00CA4E]" />
                    </div>
                    <iframe
                      ref={iframeDesktopRef}
                      src={selectedPreview}
                      className="w-full h-full pt-4 lg:pt-6 border-none bg-white font-sans"
                    />
                  </div>
                </div>

                {/* Mobile Preview Wrapper */}
                <div className={`relative h-full flex items-center justify-center shrink-0 z-30 ${previewMode === 'mobile' ? 'flex' : 'hidden lg:flex'}`}>
                  {/* Mobile Frame */}
                  <div className="w-[320px] h-[680px] bg-zinc-950 rounded-[3.5rem] border-[10px] border-zinc-900 shadow-2xl relative overflow-hidden shrink-0 ring-1 ring-white/10 outline outline-1 outline-[#D4AF37]/20 origin-center scale-[0.75] md:scale-[0.85] lg:scale-100">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-zinc-900 rounded-b-[1.5rem] z-20 flex items-center justify-center gap-2">
                      <div className="w-10 h-1 bg-zinc-800 rounded-full" />
                      <div className="w-2 h-2 rounded-full bg-zinc-800" />
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-800 rounded-full z-20 opacity-50" />
                    <iframe
                      ref={iframeMobileRef}
                      src={selectedPreview}
                      className="w-full h-full border-none bg-white pt-6"
                      style={{ scrollbarWidth: 'none' }}
                    />
                    <div className="absolute inset-0 pointer-events-none rounded-[2.8rem] bg-gradient-to-tr from-white/5 to-transparent z-30" />
                  </div>
                </div>
              </div>

              <div className="mt-10 flex gap-4 shrink-0">
                <Link
                  href={selectedPreview}
                  onClick={() => setSelectedPreview(null)}
                  className="px-10 py-4 rounded-full bg-[#D4AF37] text-white font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#D4AF37]/20"
                >
                  Escolher Este Estilo
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment Simulation Modal */}
      <AnimatePresence>
        {showPayment && !isPaid && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPayment(false)}
              className="absolute inset-0 bg-zinc-900/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl border border-[#D4AF37]/30"
            >
              <div className="p-10 text-center space-y-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-4">
                  <CreditCard size={40} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-zinc-900 tracking-tight">Checkout Seguro</h3>
                  <p className="text-zinc-500 mt-2">Você está adquirindo o template <span className="text-[#D4AF37] font-bold">{selectedTemplate?.name}</span></p>
                </div>

                  <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 flex justify-between items-center">
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-zinc-400">Total a Pagar</div>
                    <div className="text-2xl font-black text-zinc-900">{selectedTemplate?.price}</div>
                  </div>
                  <div className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-[10px] font-bold uppercase">Acesso por 1 Ano</div>
                </div>

                {paymentStatus === "idle" && (
                  <button
                    onClick={() => {
                      setPaymentStatus("processing");
                      setTimeout(() => {
                        setPaymentStatus("success");
                        setTimeout(() => {
                          setIsPaid(true);
                          setShowPayment(false);
                        }, 1500);
                      }, 2000);
                    }}
                    className="w-full bg-[#D4AF37] text-white py-5 rounded-2xl font-bold uppercase text-xs tracking-widest shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.02] transition-all"
                  >
                    Confirmar Pagamento
                  </button>
                )}

                {paymentStatus === "processing" && (
                  <div className="flex flex-col items-center gap-4 py-4">
                    <div className="w-10 h-10 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
                    <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Processando Transação...</p>
                  </div>
                )}

                {paymentStatus === "success" && (
                  <div className="flex flex-col items-center gap-4 py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center"
                    >
                      <Check size={24} />
                    </motion.div>
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Pagamento Aprovado!</p>
                  </div>
                )}

                <p className="text-[10px] text-zinc-400 uppercase tracking-[0.1em]">Ambiente de teste • Nenhuma cobrança real será feita</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Access Notification */}
      <AnimatePresence>
        {isPaid && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-zinc-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border border-[#D4AF37]/50 backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-sm font-bold">Plataforma de Edição Liberada!</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Redirecionando para o painel de edição...</p>
            </div>
            <Link href="/dashboard" className="ml-4 px-4 py-2 bg-white text-black text-[10px] font-heavy uppercase rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors">
              Acessar Agora
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
