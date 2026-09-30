import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Check, Loader2, X } from 'lucide-react';

export default function ImageUploaderField({ label, value, onChange, placeholder = 'https://...' }) {
    const [uploading, setUploading] = useState(false);
    const [mode, setMode] = useState('upload'); // 'upload' | 'url'
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setUploadError('');

        const formData = new FormData();
        formData.append('image', file);

        try {
            // Get CSRF token
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

            const response = await fetch('/upload-image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Normalize localhost/127.0.0.1 port to root-relative so it loads directly from active origin
                const normalized = (result.url || '').replace(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//i, '/');
                onChange(normalized);
            } else {
                setUploadError(result.message || 'Failed to upload image. Please try again.');
            }
        } catch (err) {
            setUploadError('An error occurred during upload. Please check your internet connection.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">{label}</label>
                <div className="flex items-center space-x-1.5 text-[10px]">
                    <button
                        type="button"
                        onClick={() => setMode('upload')}
                        className={`px-2 py-0.5 rounded font-semibold transition ${
                            mode === 'upload' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        File Upload
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('url')}
                        className={`px-2.5 py-0.5 rounded font-semibold transition ${
                            mode === 'url' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        Paste URL
                    </button>
                </div>
            </div>

            {mode === 'upload' ? (
                <div className="space-y-2">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-1.5 ${
                            uploading
                                ? 'border-indigo-500 bg-indigo-500/10'
                                : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800 hover:border-indigo-500/80'
                        }`}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {uploading ? (
                            <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs py-1">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Uploading image from computer...</span>
                            </div>
                        ) : (
                            <>
                                <div className="p-2 rounded-xl bg-slate-700/80 text-indigo-400">
                                    <Upload className="h-5 w-5" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-white block">Click to upload image file</span>
                                    <span className="text-[10px] text-slate-400">Supports JPG, PNG, WEBP, GIF (Max 5MB)</span>
                                </div>
                            </>
                        )}
                    </div>

                    {uploadError && (
                        <p className="text-xs text-rose-400 font-semibold">{uploadError}</p>
                    )}

                    {value && (
                        <div className="flex items-center justify-between bg-slate-800/80 border border-slate-700/70 p-2 rounded-xl">
                            <div className="flex items-center space-x-2.5 overflow-hidden">
                                <img
                                    src={(value || '').replace(/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//i, '/')}
                                    alt="Preview"
                                    className="h-9 w-14 object-cover rounded-lg border border-slate-700 bg-slate-900"
                                    onError={(e) => {
                                        if (e.target.src && e.target.src.includes('/storage/')) {
                                            const rel = '/storage/' + e.target.src.split('/storage/')[1];
                                            if (e.target.src !== window.location.origin + rel) {
                                                e.target.src = rel;
                                            }
                                        }
                                    }}
                                />
                                <span className="text-[11px] text-emerald-400 font-bold flex items-center">
                                    <Check className="h-3.5 w-3.5 mr-1" /> Image Ready
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => onChange('')}
                                className="text-slate-400 hover:text-rose-400 p-1"
                                title="Remove Image"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                </div>
            )}
        </div>
    );
}
