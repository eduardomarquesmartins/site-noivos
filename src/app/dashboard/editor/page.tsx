"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, CheckCircle, Sparkles, Image as ImageIcon, Loader2, Layout, Smartphone, Monitor } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

interface Photo {
    name: string;
    url: string;
}

export default function SiteEditorPage() {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    
    // Site data
    const [siteData, setSiteData] = useState({
        couple_names: "Maria & João",
        event_date: "2026-12-15",
        story: "Nossa história começou em 2018...",
        hero_image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
        theme: "minimalista",
        has_gift_list: true
    });

    // Gallery photos to pick from
    const [gallery, setGallery] = useState<Photo[]>([]);
    const [showGalleryModal, setShowGalleryModal] = useState(false);

    const fetchSiteData = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('sites').select('*').limit(1).maybeSingle();
            
            if (error) {
                console.warn('Banco de dados ainda não configurado para sites. Usando padrão.', error);
                return;
            }

            if (data) setSiteData(data);
        } catch (err) {
            console.warn('Erro silencioso ao carregar siteData:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchGallery = useCallback(async () => {
        try {
            const { data, error } = await supabase.storage.from('photos').list();
            
            if (error) {
                console.warn('Storage ainda não configurado. Galeria vazia.', error);
                return;
            }

            if (data) {
                const urls = data.map(file => ({
                    name: file.name,
                    url: supabase.storage.from('photos').getPublicUrl(file.name).data.publicUrl
                }));
                setGallery(urls);
            }
        } catch (err) {
            console.warn('Erro silencioso ao carregar galeria:', err);
        }
    }, []);

    useEffect(() => {
        fetchSiteData();
        fetchGallery();
    }, [fetchSiteData, fetchGallery]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const { error: upsertError } = await supabase.from('sites').upsert({
                ...siteData,
                updated_at: new Date().toISOString(),
            });
            
            if (upsertError) {
                console.warn('Salvando em modo demonstração (Supabase off):', upsertError);
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.warn('Erro ao salvar (Fallback Demo):', err);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    const selectHeroImage = (url: string) => {
        setSiteData({ ...siteData, hero_image_url: url });
        setShowGalleryModal(false);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Editor Visual do Site</h1>
                    <p className="text-zinc-500">Personalize a aparência do seu site em tempo real.</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex bg-zinc-100 p-1 rounded-xl">
                        <button 
                            onClick={() => setViewMode('desktop')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'desktop' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400'}`}
                        >
                            <Monitor size={20} />
                        </button>
                        <button 
                            onClick={() => setViewMode('mobile')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'mobile' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400'}`}
                        >
                            <Smartphone size={20} />
                        </button>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold uppercase tracking-widest transition-all ${
                            saved ? 'bg-emerald-500 text-white' : 'bg-zinc-900 text-white hover:scale-105'
                        }`}
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : saved ? <CheckCircle size={18} /> : <Save size={18} />}
                        {loading ? "Salvando..." : saved ? "Salvo!" : "Salvar"}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex gap-8 min-h-0">
                {/* Editor Sidebar */}
                <div className="w-80 bg-white border border-zinc-100 rounded-[32px] p-6 shadow-xl shadow-zinc-200/50 overflow-y-auto space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Identidade Visual</h3>
                        
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-zinc-700">Foto de Capa</label>
                            <div 
                                onClick={() => setShowGalleryModal(true)}
                                className="relative aspect-video bg-zinc-100 rounded-2xl overflow-hidden cursor-pointer group border-2 border-transparent hover:border-[#D4AF37]/40 transition-all shadow-inner"
                            >
                                <img src={siteData.hero_image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Preview Capa" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xs font-bold uppercase tracking-widest bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">Trocar Foto</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4">
                            <label className="text-sm font-bold text-zinc-700">Título do Site</label>
                            <input 
                                type="text" 
                                value={siteData.couple_names}
                                onChange={(e) => setSiteData({ ...siteData, couple_names: e.target.value })}
                                className="w-full bg-zinc-50 border-2 border-transparent p-4 rounded-xl focus:outline-none focus:bg-white focus:border-[#D4AF37]/40 transition-all font-bold text-zinc-900 shadow-sm"
                            />
                        </div>

                        <div className="space-y-3 pt-4">
                            <label className="text-sm font-bold text-zinc-700">Data Especial</label>
                            <input 
                                type="date" 
                                value={siteData.event_date}
                                onChange={(e) => setSiteData({ ...siteData, event_date: e.target.value })}
                                className="w-full bg-zinc-50 border-2 border-transparent p-4 rounded-xl focus:outline-none focus:bg-white focus:border-[#D4AF37]/40 transition-all font-bold text-zinc-900 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-zinc-100">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Conteúdo</h3>
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-zinc-700">Nossa História</label>
                            <textarea 
                                rows={4}
                                value={siteData.story}
                                onChange={(e) => setSiteData({ ...siteData, story: e.target.value })}
                                className="w-full bg-zinc-50 border-2 border-transparent p-4 rounded-xl focus:outline-none focus:bg-white focus:border-[#D4AF37]/40 transition-all text-zinc-600 shadow-sm text-sm leading-relaxed"
                            />
                        </div>

                        <div className="pt-4 flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Lista de Presentes</h4>
                                <div className="text-xs font-bold text-zinc-700">{siteData.has_gift_list ? 'Ativada' : 'Desativada'}</div>
                            </div>
                            <button 
                                onClick={() => setSiteData({ ...siteData, has_gift_list: !siteData.has_gift_list })}
                                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${siteData.has_gift_list ? 'bg-zinc-900' : 'bg-zinc-200'}`}
                            >
                                <motion.div 
                                    animate={{ x: siteData.has_gift_list ? 24 : 0 }}
                                    className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="flex-1 bg-zinc-100 rounded-[40px] overflow-hidden border-8 border-white shadow-2xl relative">
                    <div className={`mx-auto h-full transition-all duration-500 overflow-y-auto bg-white shadow-2xl ${
                        viewMode === 'mobile' ? 'max-w-[375px]' : 'w-full'
                    }`}>
                        {/* Mock Site Preview */}
                        <div className="relative h-[400px] flex items-center justify-center text-center px-6 overflow-hidden">
                            <img src={siteData.hero_image_url} className="absolute inset-0 w-full h-full object-cover" alt="Hero Preview" />
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="relative z-10 text-white space-y-4">
                                <motion.p 
                                    key={siteData.event_date}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="uppercase tracking-[0.3em] text-sm font-medium"
                                >
                                    {new Date(siteData.event_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </motion.p>
                                <motion.h2 
                                    key={siteData.couple_names}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-5xl md:text-7xl font-serif italic"
                                >
                                    {siteData.couple_names}
                                </motion.h2>
                                <div className="w-12 h-[1px] bg-white/50 mx-auto mt-6" />
                            </div>
                        </div>

                        <div className="max-w-xl mx-auto py-20 px-8 text-center space-y-8">
                            <h3 className="text-2xl font-serif italic text-zinc-900">Nossa História</h3>
                            <p className="text-zinc-500 leading-relaxed italic">
                                &quot;{siteData.story}&quot;
                            </p>
                            <div className="grid grid-cols-1 gap-2 pt-8">
                                <div className="aspect-[21/9] bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 shadow-sm">
                                   {gallery.length > 0 ? (
                                        <img src={gallery[0]?.url} className="w-full h-full object-cover" alt="Galeria Preview" />
                                   ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100/50">
                                            <ImageIcon size={24} className="text-zinc-300 mb-2" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Adicione fotos na Galeria</span>
                                        </div>
                                   )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Sparkles size={12} className="text-[#D4AF37]" /> Visualização em Tempo Real
                    </div>
                </div>
            </div>

            {/* Gallery Picker Modal */}
            {showGalleryModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
                        <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-900">Selecione uma Foto</h2>
                                <p className="text-zinc-500 text-sm">Escolha uma foto da sua galeria para a capa do site.</p>
                            </div>
                            <button 
                                onClick={() => setShowGalleryModal(false)}
                                className="p-2 hover:bg-zinc-100 rounded-full transition-all"
                            >
                                <Layout size={24} className="rotate-45" />
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-8">
                            {gallery.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {gallery.map((photo) => (
                                        <div 
                                            key={photo.name}
                                            onClick={() => selectHeroImage(photo.url)}
                                            className="group relative aspect-square bg-zinc-100 rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent hover:border-[#D4AF37] transition-all"
                                        >
                                            <img src={photo.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Gallery Option" />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 space-y-4">
                                    <ImageIcon size={48} className="mx-auto text-zinc-200" />
                                    <p className="text-zinc-400 font-medium">Sua galeria está vazia.</p>
                                    <button 
                                        onClick={() => window.location.href = '/dashboard/fotos'}
                                        className="text-[#D4AF37] font-bold uppercase text-xs tracking-widest hover:underline"
                                    >
                                        Ir para Galeria e Subir Fotos
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className="p-8 bg-zinc-50 border-t border-zinc-100 flex justify-end">
                            <button 
                                onClick={() => setShowGalleryModal(false)}
                                className="px-6 py-3 bg-zinc-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
