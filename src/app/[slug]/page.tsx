"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// Este componente será o "renderizador" oficial dos sites dos noivos.
// Ele buscará os dados no Supabase pelo slug e carregará o template escolhido.

export default function PublicSitePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [loading, setLoading] = useState(true);
  const [siteData, setSiteData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadSite() {
      try {
        const { data, error } = await supabase
          .from('sites')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error || !data) {
          setError(true);
          return;
        }

        setSiteData(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (slug) loadSite();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-full"></div>
          <div className="h-4 w-32 bg-zinc-50 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !siteData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 p-6 text-center">
        <h1 className="text-4xl font-black text-zinc-900 mb-4">404</h1>
        <p className="text-zinc-500 mb-8 max-w-md">O site que você está procurando não existe ou o link está incorreto.</p>
        <a href="/" className="px-8 py-4 bg-zinc-900 text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#D4AF37] transition-all">
          Voltar para a Home
        </a>
      </div>
    );
  }

  // Aqui é onde faremos o switch de templates no futuro.
  // Por enquanto, apenas um placeholder elegante.
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-20 px-8 text-center space-y-8">
        <div className="w-20 h-[1px] bg-[#D4AF37] mx-auto opacity-50" />
        <h1 className="text-6xl font-bold tracking-tighter text-zinc-900">
           {siteData.couple_names || 'Nome do Casal'}
        </h1>
        <p className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-sm">
          {siteData.event_date ? new Date(siteData.event_date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Data do Grande Dia'}
        </p>
        <div className="h-[1px] w-20 bg-[#D4AF37] mx-auto opacity-50" />
        
        <div className="pt-20 max-w-2xl mx-auto">
          <p className="text-xl text-zinc-500 font-serif italic leading-relaxed">
            "{siteData.story || 'Em breve, a nossa história será contada aqui...'}"
          </p>
        </div>
        
        <div className="pt-20">
             <button className="px-12 py-6 bg-zinc-900 text-white rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-[#D4AF37] transition-all">
                Confirmar Presença
             </button>
        </div>
      </div>
    </div>
  );
}
