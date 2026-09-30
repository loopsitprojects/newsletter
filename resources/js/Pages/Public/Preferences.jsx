import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Sliders, Check, Save } from 'lucide-react';

export default function PublicPreferences({ subscriber, allGroups, token }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing } = useForm({
        first_name: subscriber.first_name || '',
        last_name: subscriber.last_name || '',
        group_ids: subscriber.groups ? subscriber.groups.map((g) => g.id) : [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('public.preferences.update', token));
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-4">
            <Head title="Manage Subscription Preferences" />

            <div className="max-w-lg w-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl space-y-6">
                <div className="text-center space-y-2">
                    <div className="h-12 w-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/20">
                        <Sliders className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-white">Subscription Preferences</h1>
                    <p className="text-xs text-slate-400">Update your details and select the topics you want to receive.</p>
                </div>

                {flash?.success && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center">
                        ✨ {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            disabled
                            value={subscriber.email}
                            className="w-full bg-slate-800/40 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
                            <input
                                type="text"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
                            <input
                                type="text"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2">Subscribed Topics</label>
                        <div className="space-y-2">
                            {allGroups.map((g) => {
                                const isChecked = data.group_ids.includes(g.id);
                                return (
                                    <label key={g.id} className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800 cursor-pointer">
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
                                        <div>
                                            <div className="text-xs font-bold text-white">{g.name}</div>
                                            <div className="text-[10px] text-slate-400">{g.description}</div>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition flex items-center justify-center"
                    >
                        <Save className="h-4 w-4 mr-2" /> Save Preferences
                    </button>
                </form>
            </div>
        </div>
    );
}
