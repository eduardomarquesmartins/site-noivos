"use client";

import { motion } from "framer-motion";
import { Users, Heart, Gift, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DashboardSummary() {
    const stats = [
        { label: "Convidados Confirmados", value: "48", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Presentes Recebidos", value: "R$ 4.250", icon: Gift, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Dias para o Casamento", value: "184", icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
    ];

    return (
        <div className="space-y-10 max-w-6xl p-4 md:p-10 rounded-[40px]">
            {/* Header com Status do Site */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-lumina-gold/10 pb-10">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 leading-tight">Nosso Cantinho</h1>
                    <p className="text-zinc-500 text-lg mt-3 font-light italic">
                        Seu <span className="text-zinc-900 font-medium text-not-italic">site oficial</span> está no ar. Aproveite cada segundo!
                    </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-lumina-gold/20 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">Site Publicado: <span className="text-lumina-gold-dark">lumina.com.br/maria-joao</span></span>
                    </div>
                    <Link href="/" className="px-6 py-3 bg-zinc-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2 group shadow-xl">
                        Ver Site <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Stats Grid Principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Quem já confirmou", value: "182", sub: "maioria já garantiu o lugar", icon: Users },
                    { label: "Presentes no bolso", value: "R$ 12.450", sub: "Sem descontos no Pix", icon: Gift },
                    { label: "Recados recebidos", value: "24", sub: "Histórias compartilhadas", icon: Heart },
                    { label: "Tempo para o altar", value: "184", sub: "frio na barriga aumentando", icon: Zap }
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        className="bg-white p-6 rounded-[32px] border border-zinc-50 shadow-sm hover:shadow-xl hover:border-lumina-gold/10 transition-all duration-500 group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-lumina-gold group-hover:bg-lumina-gold group-hover:text-white transition-all">
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-zinc-900 tracking-tight">{stat.value}</div>
                        <div className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mt-1">{stat.label}</div>
                        <div className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
                            <CheckCircle2 size={10} /> {stat.sub}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Checklist de Progresso */}
                <div className="lg:col-span-2 bg-white border border-zinc-100 p-10 rounded-[48px] shadow-sm space-y-8 relative overflow-hidden">
                    <div className="flex justify-between items-center relative z-10">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold tracking-tight text-zinc-900">Nossa jornada de criação</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-48 h-1.5 bg-zinc-100 rounded-full">
                                    <div className="w-3/4 h-full bg-lumina-gold rounded-full" />
                                </div>
                                <span className="text-[10px] font-black text-lumina-gold uppercase tracking-widest">75% Concluído</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                        {[
                            { title: "Personalizar Cores", done: true },
                            { title: "Configurar Chave PIX", done: true },
                            { title: "Lista de Convidados", done: false },
                            { title: "RSVP via WhatsApp", done: false }
                        ].map((item, idx) => (
                            <div key={idx} className={`flex items-center gap-4 p-5 rounded-3xl border transition-all cursor-pointer ${item.done ? 'bg-zinc-50/50 border-zinc-100' : 'bg-white border-zinc-100 hover:border-lumina-gold/30 hover:shadow-lg'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${item.done ? 'bg-emerald-500 text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                                    {item.done ? "✓" : idx + 1}
                                </div>
                                <span className={`font-medium text-sm ${item.done ? 'text-zinc-400 line-through' : 'text-zinc-700'}`}>{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resumo da Lista de Presentes */}
                <div className="bg-[#1A1814] p-10 rounded-[48px] space-y-8 shadow-2xl relative overflow-hidden text-white">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-lumina-gold/10 blur-[60px]" />
                    <div className="relative z-10">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4A373] mb-4">Carinho convertido (sem taxas)</div>
                        <div className="text-5xl font-black tracking-tighter mb-2">R$ 1.840</div>
                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest text-emerald-400">Poupados por vocês com a taxa zero</p>
                    </div>
                    
                    <div className="pt-6 border-t border-white/10 relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xs font-bold text-white/60">Novos Presentes (48h)</span>
                            <span className="text-xs font-bold text-emerald-400">+ R$ 2.450</span>
                        </div>
                        <Link href="/dashboard/presentes" className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all">
                            Gerenciar Extrato
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
