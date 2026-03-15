"use client";

import {
    LayoutDashboard,
    Settings,
    Image as ImageIcon,
    Heart,
    Gift,
    Users,
    CreditCard,
    Monitor,
    Menu,
    X as CloseIcon
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { href: "/dashboard", label: "Resumo", icon: LayoutDashboard },
        { href: "/dashboard/editor", label: "Editor", icon: Monitor },
        { href: "/dashboard/site", label: "Meu Site (Infos)", icon: Heart },
        { href: "/dashboard/fotos", label: "Galeria de Fotos", icon: ImageIcon },
        { href: "/dashboard/presentes", label: "Lista de Presentes (PIX)", icon: Gift },
        { href: "/dashboard/convidados", label: "Convidados RSVP", icon: Users },
    ];

    return (
        <div className="min-h-screen bg-[#FFFEFC] text-zinc-900 font-sans flex">
            {/* Overlay Mobile */}
            {isMobileMenuOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-zinc-900/60 z-[60] md:hidden backdrop-blur-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Mobile */}
            <aside className={`fixed inset-y-0 left-0 w-80 bg-white z-[70] md:hidden transform transition-transform duration-500 ease-out shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 flex justify-between items-center border-b border-zinc-50">
                    <div className="text-2xl font-bold tracking-tighter text-zinc-900 flex items-center gap-2">
                        Lumina<span className="text-lumina-gold">.</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                        <CloseIcon size={24} />
                    </button>
                </div>
                <nav className="flex-1 px-6 py-10 space-y-2">
                    {navItems.map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-4 px-4 py-4 rounded-2xl text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 font-bold text-sm transition-all"
                        >
                            <item.icon size={20} className="text-lumina-gold/60" /> {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-72 bg-white border-r border-zinc-50 h-screen sticky top-0">
                <div className="p-10">
                    <div className="text-2xl font-bold tracking-tighter text-zinc-900 flex items-center gap-2">
                        Lumina<span className="text-lumina-gold">.</span>
                    </div>
                    <div className="mt-2 text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em]">Ateliê Digital</div>
                </div>

                <nav className="flex-1 px-6 space-y-2">
                    {navItems.map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all group ${
                                item.href === '/dashboard' ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-900/20' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                            }`}
                        >
                            <item.icon size={20} className={`${item.href === '/dashboard' ? 'text-lumina-gold' : 'text-lumina-gold/40 group-hover:text-lumina-gold'} transition-colors`} /> 
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="mx-6 mb-10 p-6 bg-zinc-50 rounded-[32px] space-y-1">
                    <Link href="/dashboard/config" className="flex items-center gap-3 py-2 text-zinc-500 hover:text-zinc-900 font-bold text-xs uppercase tracking-widest transition-all">
                        <Settings size={16} /> Configurações
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden w-full">
                <header className="bg-white/80 backdrop-blur-md border-b border-zinc-50 h-20 flex items-center px-8 lg:px-20 justify-between md:justify-end sticky top-0 z-50">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-zinc-900">
                        <Menu size={28} />
                    </button>
                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex flex-col items-end">
                            <span className="text-sm font-black text-zinc-900 tracking-tight">Casar Edition</span>
                            <span className="text-[10px] font-bold text-lumina-gold uppercase tracking-[0.2em]">Membro Elite</span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-white border-2 border-white shadow-xl">
                            <ImageIcon size={20} className="text-lumina-gold" />
                        </div>
                    </div>
                </header>
                <div className="p-6 md:p-12 lg:p-20">
                    {children}
                </div>
            </main>
        </div>
    );
}
