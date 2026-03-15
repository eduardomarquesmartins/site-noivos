"use client";

import { Save, User, Mail, Lock, Shield, Settings2 } from "lucide-react";

export default function ConfigPage() {
    return (
        <div className="space-y-10 max-w-4xl">
            <div>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-zinc-900">Configurações da Conta</h1>
                <p className="text-zinc-500 mt-2 text-lg">Gerencie suas informações pessoais, segurança e notificações da plataforma.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Menu de Configuração */}
                <div className="md:col-span-4 p-6 bg-zinc-50 rounded-[32px] border border-zinc-100 flex flex-col gap-2 h-fit">
                    {[
                        { label: "Dados Pessoais", icon: User, active: true },
                        { label: "Segurança & Senha", icon: Lock, active: false },
                        { label: "Notificações", icon: Mail, active: false },
                        { label: "Privacidade", icon: Shield, active: false },
                        { label: "Avançado", icon: Settings2, active: false },
                    ].map((item, i) => (
                        <button key={i} className={`p-4 rounded-xl flex items-center gap-3 font-bold text-sm transition-all ${item.active ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-200/50' : 'text-zinc-500 hover:bg-white hover:text-zinc-900 border border-transparent'}`}>
                            <item.icon size={18} /> {item.label}
                        </button>
                    ))}
                </div>

                {/* Área de Formulário */}
                <div className="md:col-span-8 bg-white p-8 md:p-10 rounded-[40px] border border-zinc-100 shadow-xl shadow-zinc-200/30 space-y-8">
                    <div className="space-y-2 pb-6 border-b border-zinc-50">
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Perfil Público</h2>
                        <p className="text-zinc-500 text-sm">Informações básicas associadas à administração do seu site Lumina.</p>
                    </div>

                    <form className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-3xl bg-zinc-100 flex items-center justify-center text-zinc-400 font-bold text-2xl border-4 border-zinc-50 overflow-hidden relative group cursor-pointer shadow-sm hover:border-lumina-gold transition-colors">
                                M&J
                                <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white text-[10px] uppercase font-bold tracking-widest text-center px-2 z-10">Trocar Foto</div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-zinc-400 block">Avatar do Casal</label>
                                <button type="button" className="px-5 py-2.5 bg-zinc-50 text-zinc-900 rounded-xl text-xs font-bold transition-colors hover:bg-zinc-100 border border-zinc-200">
                                    Fazer Upload
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Nome Oficial</label>
                            <input 
                                type="text" 
                                defaultValue="Maria e João" 
                                className="w-full bg-zinc-50 border-2 border-transparent p-4 rounded-xl focus:outline-none focus:bg-white focus:border-lumina-gold/40 transition-all font-bold text-zinc-900 text-sm shadow-sm" 
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-zinc-400">E-mail Principal de Acesso</label>
                            <input 
                                type="email" 
                                defaultValue="contato@casal.com" 
                                className="w-full bg-zinc-50 border-2 border-transparent p-4 rounded-xl focus:outline-none focus:bg-white focus:border-lumina-gold/40 transition-all font-bold text-zinc-900 text-sm shadow-sm"
                            />
                            <p className="text-xs text-amber-600 font-medium">Trocar de e-mail deslogará todos os dispositivos ativos.</p>
                        </div>

                        <div className="pt-6 border-t border-zinc-50 flex justify-end">
                            <button
                                type="button"
                                className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200"
                            >
                                <Save size={18} /> Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
