import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, XCircle, Mail, Sparkles, ArrowRight } from 'lucide-react';

export default function PublicVerificationResult({ status, message, subscriber }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-4">
            <Head title="Subscription Verification" />

            <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-center space-y-6">
                <div className="inline-flex h-16 w-16 rounded-full items-center justify-center mx-auto">
                    {status === 'success' ? (
                        <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-10 w-10" />
                        </div>
                    ) : (
                        <div className="h-16 w-16 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-full flex items-center justify-center">
                            <XCircle className="h-10 w-10" />
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold text-white">
                        {status === 'success' ? 'Subscription Verified! 🎉' : 'Verification Failed'}
                    </h1>
                    <p className="text-slate-300 text-sm">{message}</p>
                </div>

                {status === 'success' && subscriber && (
                    <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-800 text-xs text-slate-400 space-y-1">
                        <div>
                            Subscribed as: <strong className="text-white">{subscriber.email}</strong>
                        </div>
                        <div>Status: <span className="text-emerald-400 font-bold uppercase">ACTIVE</span></div>
                    </div>
                )}

                <a
                    href="/"
                    className="inline-flex items-center px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition"
                >
                    Return Home <ArrowRight className="h-4 w-4 ml-2" />
                </a>
            </div>
        </div>
    );
}
