"use client";

import { useState } from "react";
import { Search, UserPlus, Filter, X, Check, Clock } from "lucide-react";

export default function GuestsPage() {
    const [search, setSearch] = useState("");
    const [guests, setGuests] = useState([
        { id: 1, name: "Família Oliveira (4 pessoas)", status: "Confirmado", date: "Ontem" },
        { id: 2, name: "Sr. José Santos", status: "Pendente", date: "2 dias atrás" },
        { id: 3, name: "Pedro Bial & Esposa", status: "Confirmado", date: "Hoje" },
        { id: 4, name: "Maria Clara", status: "Recusado", date: "Hoje" }
    ]);

    const updateStatus = (id: number, newStatus: string) => {
        setGuests(guests.map(g => g.id === id ? { ...g, status: newStatus } : g));
    };

    const addGuest = () => {
        const newGuest = {
            id: Date.now(),
            name: "Novo Convidado",
            status: "Pendente",
            date: "Agora"
        };
        setGuests([newGuest, ...guests]);
    };

    const filteredGuests = guests.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Lista de Convidados (RSVP)</h1>
                    <p className="text-zinc-500">Acompanhe quem já confirmou presença no seu casamento.</p>
                </div>
                <button
                    onClick={addGuest}
                    className="bg-zinc-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-100"
                >
                    <UserPlus size={18} /> Adicionar manualmente
                </button>
            </div>

            <div className="bg-white rounded-[40px] border border-zinc-100 shadow-xl shadow-zinc-200/50 overflow-hidden">
                <div className="p-8 border-b border-zinc-50 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Pesquisar convidado..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/20"
                        />
                    </div>
                    <button className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-zinc-500 hover:bg-white transition-all">
                        <Filter size={18} />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-zinc-50/50 text-zinc-400 text-[10px] uppercase font-bold tracking-widest border-b border-zinc-50">
                                <th className="px-8 py-6">Convidado</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6">Data RSVP</th>
                                <th className="px-8 py-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {filteredGuests.map((guest) => (
                                <tr key={guest.id} className="hover:bg-zinc-50/30 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-zinc-800">{guest.name}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${guest.status === 'Confirmado' ? 'bg-emerald-50 text-emerald-600' :
                                                guest.status === 'Pendente' ? 'bg-amber-50 text-amber-600' :
                                                    'bg-rose-50 text-rose-600'
                                            }`}>
                                            {guest.status === 'Confirmado' ? <Check size={12} /> : guest.status === 'Pendente' ? <Clock size={12} /> : <X size={12} />}
                                            {guest.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-zinc-500">{guest.date}</td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        <button
                                            onClick={() => updateStatus(guest.id, 'Confirmado')}
                                            className="p-3 bg-zinc-50 rounded-xl text-zinc-400 hover:bg-emerald-500 hover:text-white transition-all"
                                        >
                                            <Check size={16} />
                                        </button>
                                        <button
                                            onClick={() => updateStatus(guest.id, 'Recusado')}
                                            className="p-3 bg-zinc-50 rounded-xl text-zinc-400 hover:bg-rose-500 hover:text-white transition-all"
                                        >
                                            <X size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
