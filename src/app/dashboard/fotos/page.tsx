"use client";

import { useState, useEffect, useCallback } from "react";
import { Upload, Trash2, Image as ImageIcon, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Photo {
    id?: string;
    name: string;
    url: string;
}

export default function PhotosPage() {
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState<Photo[]>([]);

    const fetchPhotos = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.storage.from('photos').list();
            
            if (error) {
                console.warn('Supabase Storage (photos) ainda não configurado ou inacessível.', error);
                setPhotos([]);
                setLoading(false);
                return;
            }

            if (data) {
                const photoUrls = data.map(file => ({
                    id: file.id,
                    name: file.name,
                    url: supabase.storage.from('photos').getPublicUrl(file.name).data.publicUrl
                }));
                setPhotos(photoUrls);
            }
        } catch (err) {
            console.warn('Erro silencioso ao carregar fotos:', err);
            setPhotos([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPhotos();
    }, [fetchPhotos]);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('photos')
                .upload(filePath, file);

            if (uploadError) {
                console.warn('Erro ao subir imagem (Modo Demo):', uploadError);
                alert('Atenção: O upload falhou porque o banco de dados ainda não foi configurado. Mas não se preocupe, o sistema de visualização continua funcionando!');
                setUploading(false);
                return;
            }

            await fetchPhotos();
        } catch (err) {
            console.warn('Erro no upload:', err);
        } finally {
            setUploading(false);
        }
    };

    const removePhoto = async (name: string) => {
        const { error } = await supabase.storage
            .from('photos')
            .remove([name]);

        if (error) {
            console.error('Error removing photo:', error);
            alert('Erro ao remover a imagem.');
            return;
        }

        setPhotos(photos.filter(p => p.name !== name));
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Galeria de Fotos</h1>
                    <p className="text-zinc-500">Suba as fotos que contarão a história de vocês no site.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-100">
                    <Sparkles size={14} className="text-[#D4A373]" /> Armazenamento Otimizado Grátis
                </div>
            </div>

            {/* Upload Area */}
            <label
                className={`border-4 border-dashed rounded-[40px] p-20 flex flex-col items-center justify-center text-center gap-6 cursor-pointer transition-all ${uploading ? "bg-zinc-100 border-[#D4A373]/20" : "bg-white border-zinc-50 hover:border-[#D4A373]/40 hover:bg-zinc-50 shadow-xl shadow-zinc-200/20"
                    }`}
            >
                <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleUpload} 
                    disabled={uploading}
                />
                <div className={`w-20 h-20 bg-zinc-900 text-white rounded-3xl flex items-center justify-center transition-all ${uploading ? 'animate-pulse scale-110 bg-[#D4A373]' : ''}`}>
                    {uploading ? <Loader2 size={32} className="animate-spin" /> : <Upload size={32} />}
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-zinc-800">{uploading ? "Enviando suas memórias..." : "Clique ou arraste suas fotos aqui"}</h2>
                    <p className="text-zinc-500">Suporta JPG, PNG e WebP de até 10MB por arquivo.</p>
                </div>
            </label>

            {/* Photo Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 size={40} className="animate-spin text-zinc-300" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {photos.map((photo) => (
                        <div key={photo.name} className="group relative aspect-[4/5] bg-zinc-100 rounded-[32px] overflow-hidden border border-zinc-100 shadow-sm transition-all hover:shadow-2xl hover:shadow-zinc-200">
                            <img src={photo.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Couple Memory" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <a 
                                    href={photo.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-4 bg-white text-zinc-900 rounded-2xl hover:bg-zinc-100 transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 active:scale-95"
                                >
                                    <ImageIcon size={16} /> Ver Foto
                                </a>
                                <button
                                    onClick={(e) => { e.stopPropagation(); removePhoto(photo.name); }}
                                    className="p-4 bg-rose-500 text-white rounded-2xl hover:bg-rose-600 transition-all active:scale-95"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {photos.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-zinc-50 rounded-[40px] border-2 border-dashed border-zinc-100">
                            <p className="text-zinc-400 font-medium">Nenhuma foto enviada ainda.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
