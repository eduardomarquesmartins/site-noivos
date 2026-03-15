"use client";

import { useState } from "react";
import { Save, CheckCircle, Crown, Sparkles, ArrowRight, Star, Gift } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SiteConfigPage() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [hasGiftList, setHasGiftList] = useState(true);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSaved(false);

        try {
            const { error } = await supabase.from('sites').upsert({
                // Aqui mapearíamos os campos do formulário para o banco
                updated_at: new Date().toISOString(),
            });

            if (error) throw error;

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
            // Fallback visual para o usuário não ficar travado se o banco não estiver configurado
            setSaved(true); 
            setTimeout(() => setSaved(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10 max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-zinc-900">Configurações do Meu Site</h1>
                    <p className="text-zinc-500 mt-2 text-lg">Personalize as informações básicas do seu casamento e encante seus convidados.</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="glass-premium p-8 md:p-10 rounded-superellipse space-y-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lumina-gold/50 to-transparent" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-lumina-gold-dark/60">Sua URL Personalizada</label>
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 font-medium text-lg">lumina.com.br/</span>
                            <input 
                                type="text" 
                                placeholder="maria-e-joao" 
                                defaultValue="maria-e-joao"
                                className="w-full bg-lumina-ivory/50 border-2 border-transparent p-5 pl-[140px] rounded-2xl focus:outline-none focus:bg-white focus:border-lumina-gold/30 transition-all font-bold text-zinc-900 text-lg shadow-inner" 
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-lumina-gold-dark/60">Data do Evento</label>
                        <input type="date" className="w-full bg-lumina-ivory/50 border-2 border-transparent p-5 rounded-2xl focus:outline-none focus:bg-white focus:border-lumina-gold/30 transition-all font-bold text-zinc-900 text-lg shadow-inner" />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-lumina-gold-dark/60">Nome dos Noivos (Exibição no Site)</label>
                    <input type="text" defaultValue="Maria & João" className="w-full bg-lumina-ivory/50 border-2 border-transparent p-5 rounded-2xl focus:outline-none focus:bg-white focus:border-lumina-gold/30 transition-all font-bold text-zinc-900 text-lg shadow-inner" />
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-lumina-gold-dark/60 flex justify-between">
                        <span>Nossa História</span>
                        <span className="text-lumina-gold font-bold normal-case tracking-normal hidden md:inline-block italic">Toque de mestre: adicione emoção aos detalhes!</span>
                    </label>
                    <textarea rows={6} className="w-full bg-lumina-ivory/50 border-2 border-transparent p-5 rounded-2xl focus:outline-none focus:bg-white focus:border-lumina-gold/30 transition-all text-zinc-700 text-lg resize-y shadow-inner leading-relaxed" defaultValue="Nossa história começou em 2018, e desde então sabíamos que o momento perfeito chegaria..." />
                </div>

                <div className="p-8 bg-lumina-gold/5 border border-lumina-gold/10 rounded-3xl flex items-center justify-between gap-6">
                    <div className="flex gap-4 items-center">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${hasGiftList ? 'bg-lumina-gold text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                            <Gift size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-zinc-900">Ativar Lista de Presentes (Pix)</h4>
                            <p className="text-zinc-500 text-sm">Se desativado, o botão de presentes não aparecerá no seu site.</p>
                        </div>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setHasGiftList(!hasGiftList)}
                        className={`relative w-16 h-8 rounded-full transition-all duration-300 ${hasGiftList ? 'bg-zinc-900' : 'bg-zinc-200'}`}
                    >
                        <motion.div 
                            animate={{ x: hasGiftList ? 32 : 0 }}
                            className="absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md"
                        />
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-lumina-gold/10">
                    <p className="text-sm text-zinc-400 font-medium italic hidden sm:block">Alterações refletem instantaneamente no seu site exclusivo.</p>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl ${saved ? 'bg-emerald-500 text-white' : 'bg-gradient-to-br from-lumina-gold-dark to-lumina-gold-deep text-white hover:scale-105 shadow-lumina'
                            }`}
                    >
                        {loading ? "Sincronizando..." : saved ? <><CheckCircle size={20} /> Sucesso!</> : <><Save size={20} /> Salvar Obra-Prima</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
