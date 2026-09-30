import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { UserX, Check, AlertCircle, ArrowLeft } from 'lucide-react';

export default function PublicUnsubscribe({ subscriber, token }) {
    const { flash } = usePage().props;
    const { post, processing } = useForm();
    const [unsubscribed, setUnsubscribed] = useState(false);

    const handleUnsubscribe = (e) => {
        e.preventDefault();
        post(route('public.unsubscribe.process', token), {
            onSuccess: () => setUnsubscribed(true),
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-4">
            <Head title="Unsubscribe from Newsletter" />

            <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl space-y-6 text-center">
                <div className="h-14 w-14 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto">
                    <UserX className="h-7 w-7" />
                </div>

                {unsubscribed || flash?.success || subscriber?.status === 'unsubscribed' ? (
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-white">You've Been Unsubscribed</h1>
                        <p className="text-xs text-slate-400">
                            We're sorry to see you go! <strong className="text-slate-200">{subscriber?.email}</strong> will no longer receive marketing updates from us.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-extrabold text-white">Confirm Unsubscribe</h1>
                            <p className="text-xs text-slate-400 mt-1">
                                Are you sure you want to stop receiving newsletters for <strong className="text-indigo-300">{subscriber?.email}</strong>?
                            </p>
                        </div>

                        <form onSubmit={handleUnsubscribe} className="space-y-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/20 transition"
                            >
                                Yes, Unsubscribe Me
                            </button>

                            <a
                                href={route('public.preferences', token)}
                                className="block w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition"
                            >
                                Manage Email Preferences Instead
                            </a>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
