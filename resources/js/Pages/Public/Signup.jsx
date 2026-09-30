import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Mail, Check, Sparkles, Send, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PublicSignup({ groups }) {
    const { flash } = usePage().props;
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        first_name: '',
        last_name: '',
        group_ids: groups.map((g) => g.id),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('public.subscribe'), {
            onSuccess: () => {
                setSubmitted(true);
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.6 },
                });
            },
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
            <Head title="Newsletter" />

            <div className="max-w-xl w-full">
                {/* Brand Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex h-16 w-52 rounded-2xl bg-white/5 border border-white/10 items-center justify-center shadow-xl shadow-blue-500/20 mb-4 p-2.5 transform hover:scale-105 transition">
                        <img src="/images/loops-logo-white.png" alt="Loops Integrated" className="h-full w-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Stay Ahead of the Curve</h1>
                    <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
                        Get curated weekly insights, developer updates, and exclusive discount codes directly to your inbox.
                    </p>
                </div>

                {/* Glassmorphism Card */}
                <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

                    {submitted || flash?.success ? (
                        <div className="text-center py-8 space-y-4 animate-fade-in">
                            <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                                <Check className="h-8 w-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Check Your Inbox!</h2>
                            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
                                We sent a confirmation link to <strong className="text-indigo-400">{data.email}</strong>. Please click the link in your email to activate your subscription.
                            </p>
                            <div className="pt-4 text-xs text-slate-500">Didn't receive it? Check your spam or promotions folder.</div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="alex.rivera@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full bg-slate-800/80 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                                />
                                {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Alex"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        className="w-full bg-slate-800/80 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Rivera"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        className="w-full bg-slate-800/80 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                                    />
                                </div>
                            </div>

                            {/* Interest Topics */}
                            {groups.length > 0 && (
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                                        Select Topics of Interest
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        {groups.map((g) => {
                                            const isChecked = data.group_ids.includes(g.id);
                                            return (
                                                <label
                                                    key={g.id}
                                                    className={`flex items-center space-x-3 p-3 rounded-2xl border cursor-pointer transition ${
                                                        isChecked
                                                            ? 'bg-indigo-600/10 border-indigo-500/40 text-white'
                                                            : 'bg-slate-800/30 border-slate-800 text-slate-400 hover:border-slate-700'
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setData('group_ids', [...data.group_ids, g.id]);
                                                            } else {
                                                                setData(
                                                                    'group_ids',
                                                                    data.group_ids.filter((id) => id !== g.id)
                                                                );
                                                            }
                                                        }}
                                                        className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
                                                    />
                                                    <span className="text-xs font-semibold">{g.name}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:to-pink-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center transition transform active:scale-98"
                            >
                                <Send className="h-4 w-4 mr-2" /> Subscribe Now — It's Free
                            </button>

                            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 pt-2">
                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                                <span>Double Opt-In Protected. Zero spam. Unsubscribe anytime.</span>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
