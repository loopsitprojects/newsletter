import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/20 rounded-full blur-[110px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Back to Home Link */}
            <div className="absolute top-6 left-6 z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 px-3.5 py-1.5 rounded-full transition shadow-sm backdrop-blur"
                >
                    &larr; Back to Website
                </Link>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header with Logo */}
                <div className="text-center mb-6">
                    <Link href="/" className="inline-block transform hover:scale-105 transition-transform duration-200">
                        <div className="inline-flex h-16 w-52 rounded-2xl bg-slate-900/90 border border-slate-700/60 items-center justify-center p-3 shadow-2xl shadow-blue-500/25 backdrop-blur-xl">
                            <ApplicationLogo className="h-full w-full object-contain" />
                        </div>
                    </Link>
                    {title && (
                        <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            {title}
                        </h1>
                    )}
                    {subtitle && (
                        <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Glassmorphism Card */}
                <div className="bg-slate-900/85 border border-slate-800/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/70 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                    {children}
                </div>
            </div>
        </div>
    );
}
