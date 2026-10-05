import React from 'react';
import { Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

const TikTokIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const Logo = ({
    light = false,
    darkMode = false,
    logoUrl = '/images/loops-logo-dark.png',
    logoDarkUrl = '/images/loops-logo-white.png',
    brandName = 'Loops Integrated',
    logoHeight = 64,
}) => {
    const isDark = light || darkMode;
    const activeSrc = isDark ? (logoDarkUrl || logoUrl) : (logoUrl || logoDarkUrl);

    return (
        <div className="flex items-center justify-center gap-2">
            {activeSrc ? (
                <img
                    src={activeSrc}
                    alt={brandName}
                    style={{ height: `${logoHeight}px`, maxHeight: `${logoHeight}px` }}
                    className={cn('w-auto max-w-[320px] object-contain', isDark && !logoDarkUrl && 'brightness-0 invert')}
                />
            ) : (
                <span
                    className={cn(
                        'text-xl font-bold tracking-tight',
                        isDark ? 'text-white' : 'text-[#151a29]'
                    )}
                >
                    {brandName}
                </span>
            )}
        </div>
    );
};

const Btn = ({ children, inverse, href = '#', color, className }) => (
    <a
        href={href}
        className={cn(
            'inline-block whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-95 shadow-sm',
            inverse
                ? 'bg-white text-[#0057c5] border border-white hover:bg-slate-100'
                : color
                    ? 'text-white border'
                    : 'bg-[#0057c5] text-white border border-[#0057c5] hover:bg-[#004bb0]',
            className
        )}
        style={color ? { backgroundColor: color, borderColor: color } : undefined}
    >
        {children}
    </a>
);

export default function MeridianNewsletter({
    mobile = false,
    darkMode = false,
    logoUrl = '/images/loops-logo-dark.png',
    logoDarkUrl = '/images/loops-logo-white.png',
    logoHeight = 64,
    brandName = 'Loops Integrated',
    firstName = 'Sarah',
    edition = 'October Edition',
    title = "What's New This Month?",
    subtitle = 'Discover our latest updates, products, news and special offers.',
    heroImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&h=720&fit=crop&q=80',
    heroButtonText = 'Explore More',
    heroButtonUrl = '#',
    heroButtonColor = '#ff0878',
    featuredItems = null,
    featuredLayout = 'columns',
    featuredCardHeight = '460',
    featuredLinkAlign = 'bottom',
    featuredImage = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=750&fit=crop&q=80',
    ctaStyle = 'clean',
    ctaTitle = 'See Our Latest Work',
    ctaSubtitle = "From award-winning campaigns to new productions, take a look at what we've been creating recently.",
    ctaButtonText = 'VISIT OUR WEBSITE',
    ctaButtonUrl = '#',
    ctaButtonColor = '#0b0f19',
    showCtaSecondaryButton = false,
    ctaSecondaryButtonText = '',
    ctaSecondaryButtonUrl = '#',
    companyName = 'Loops Integrated',
    companyAddress = '',
    companyContact = '',
    unsubscribeUrl = '#',
    facebookUrl = 'https://facebook.com',
    linkedinUrl = 'https://linkedin.com',
    instagramUrl = 'https://instagram.com',
    tiktokUrl = 'https://tiktok.com',
    youtubeUrl = 'https://youtube.com',
}) {
    const px = mobile ? 'px-5' : 'px-10';

    const items = (Array.isArray(featuredItems) && featuredItems.length > 0)
        ? featuredItems
        : [
            {
                badge: 'Featured',
                title: "Discover What's New",
                text: 'Explore our latest products, services and updates — designed with feedback from customers like you.',
                linkText: 'Read More →',
                linkUrl: '#',
                image: featuredImage,
            },
        ];

    return (
        <div className="w-full max-w-[760px] mx-auto bg-white font-sans text-[#151a29] rounded-2xl shadow-xl overflow-hidden border border-[#e2e4ea]">
            {/* Top Brand Bar (Black Header Bar) */}
            <div className={cn(px, 'py-6 flex items-center justify-center bg-[#0b0f19] rounded-t-2xl')}>
                <Logo light={true} logoUrl={logoUrl} logoDarkUrl={logoDarkUrl} logoHeight={logoHeight} brandName={brandName} />
            </div>

            {/* Hero */}
            <section className={cn(px, mobile ? 'pt-6' : 'pt-8', 'text-center')}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0057c5]">
                    {edition}
                </p>
                <h1
                    className={cn(
                        'mt-3 font-serif font-bold leading-tight text-[#151a29]',
                        mobile ? 'text-3xl' : 'text-[40px]'
                    )}
                >
                    {title}
                </h1>
                <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#636978]">
                    {subtitle}
                </p>
                <div className="mt-6">
                    <Btn href={heroButtonUrl || '#'} color={heroButtonColor || '#ff0878'}>
                        {heroButtonText || 'Explore More'}
                    </Btn>
                </div>
                <img
                    src={heroImage}
                    alt="Bright modern office workspace"
                    width={1280}
                    height={720}
                    className="mt-8 w-full rounded-2xl object-cover shadow-sm"
                />
            </section>

            {/* Intro */}
            <section className={cn(px, 'py-8')}>
                <p className="text-lg font-bold text-[#151a29]">Hello {firstName},</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[#636978]">
                    Here are the latest updates, highlights and news from our team. It's been a busy month — we hope you enjoy what we've been working on.
                </p>
            </section>

            {/* Featured */}
            <section className={cn('bg-[#f5f7fb] py-8', px)}>
                <div className={cn(
                    featuredLayout === 'rows'
                        ? 'space-y-6'
                        : 'grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch'
                )}>
                    {items.map((item, idx) => {
                        const badgeStyles = [
                            'bg-[#e6f0fd] text-[#0057c5]',
                            'bg-[#ffe6f0] text-[#ff0878]',
                            'bg-[#f3eafd] text-[#8035d1]',
                            'bg-[#e2faf8] text-[#09908a]',
                        ];
                        const styleClass = badgeStyles[idx % badgeStyles.length];

                        if (featuredLayout === 'rows') {
                            return (
                                <div
                                    key={idx}
                                    className={cn(
                                        'overflow-hidden rounded-2xl bg-white border border-[#e2e4ea]',
                                        mobile ? 'space-y-0' : 'flex'
                                    )}
                                >
                                    <img
                                        src={item.image || featuredImage}
                                        alt={item.title || "Featured"}
                                        width={1024}
                                        height={768}
                                        loading="lazy"
                                        className={cn(
                                            'object-cover',
                                            mobile ? 'h-52 w-full' : 'w-1/2 min-h-[260px]'
                                        )}
                                    />
                                    <div
                                        className={cn(
                                            'flex flex-col justify-center',
                                            mobile ? 'p-5' : 'w-1/2 p-7'
                                        )}
                                    >
                                        <span className={cn('w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest', styleClass)}>
                                            {item.badge || 'Featured'}
                                        </span>
                                        <h2 className="mt-3 font-serif text-2xl font-bold leading-snug text-[#151a29]">
                                            {item.title}
                                        </h2>
                                        <p className="mt-2 text-sm leading-relaxed text-[#636978]">
                                            {item.text}
                                        </p>
                                        <a
                                            href={item.linkUrl || '#'}
                                            className="mt-4 text-sm font-semibold text-[#0057c5] hover:underline"
                                        >
                                            {item.linkText || 'Read More →'}
                                        </a>
                                    </div>
                                </div>
                            );
                        }

                        const isFlowLink = featuredLinkAlign === 'flow';
                        return (
                            <div
                                key={idx}
                                className="overflow-hidden rounded-2xl bg-white border border-[#e2e4ea] flex flex-col justify-between shadow-sm h-full"
                            >
                                {item.image && (
                                    <img
                                        src={item.image || featuredImage}
                                        alt={item.title || "Featured"}
                                        width={640}
                                        height={360}
                                        loading="lazy"
                                        className="h-44 w-full object-cover shrink-0"
                                    />
                                )}
                                <div className={cn("p-5 flex flex-col flex-1", isFlowLink ? "" : "justify-between")}>
                                    <div>
                                        <span className={cn('w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest', styleClass)}>
                                            {item.badge || 'Featured'}
                                        </span>
                                        <h2 className="mt-2.5 font-serif text-lg font-bold leading-snug text-[#151a29]">
                                            {item.title}
                                        </h2>
                                        <p className="mt-2 text-sm leading-relaxed text-[#636978]">
                                            {item.text}
                                        </p>
                                        {isFlowLink && (
                                            <div className="mt-3.5">
                                                <a
                                                    href={item.linkUrl || '#'}
                                                    className="text-sm font-semibold text-[#0057c5] hover:underline inline-flex items-center"
                                                >
                                                    {item.linkText || 'Read More →'}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    {!isFlowLink && (
                                        <div className="mt-4 pt-1">
                                            <a
                                                href={item.linkUrl || '#'}
                                                className="text-sm font-semibold text-[#0057c5] hover:underline inline-flex items-center"
                                            >
                                                {item.linkText || 'Read More →'}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className={cn(px, 'pb-8')}>
                {ctaStyle === 'gradient' ? (
                    <div
                        className={cn(
                            'rounded-2xl text-center text-white',
                            mobile ? 'px-6 py-10' : 'px-12 py-12'
                        )}
                        style={{
                            background: 'linear-gradient(135deg, #0057c5 0%, #8035d1 50%, #ff0878 100%)',
                            backgroundColor: '#0057c5',
                        }}
                    >
                        <h3 className={cn('font-serif font-bold', mobile ? 'text-2xl' : 'text-3xl')}>
                            {ctaTitle}
                        </h3>
                        <p className="mx-auto mt-3 max-w-sm text-sm opacity-90 leading-relaxed">
                            {ctaSubtitle}
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <Btn inverse href={ctaButtonUrl || '#'}>{ctaButtonText || 'Explore Now'}</Btn>
                            {(showCtaSecondaryButton !== false && ctaSecondaryButtonText) && (
                                <a
                                    href={ctaSecondaryButtonUrl || '#'}
                                    className="inline-block whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:bg-white/20 active:scale-95 border border-white/80 bg-white/10 text-white backdrop-blur-sm shadow-sm"
                                >
                                    {ctaSecondaryButtonText}
                                </a>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-left py-2">
                        <h3 className={cn('font-sans font-extrabold text-[#151a29] tracking-tight leading-tight', mobile ? 'text-xl' : 'text-2xl')}>
                            {ctaTitle}
                        </h3>
                        <p className="mt-2.5 max-w-xl text-[15px] text-[#636978] leading-relaxed">
                            {ctaSubtitle}
                        </p>
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <a
                                href={ctaButtonUrl || '#'}
                                className="inline-block rounded-lg px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm transition hover:opacity-90 active:scale-95"
                                style={{ backgroundColor: ctaButtonColor || '#0b0f19' }}
                            >
                                {ctaButtonText || 'VISIT OUR WEBSITE'}
                            </a>
                            {(showCtaSecondaryButton !== false && ctaSecondaryButtonText) && (
                                <a
                                    href={ctaSecondaryButtonUrl || '#'}
                                    className="inline-block rounded-lg px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#151a29] bg-[#f1f5f9] border border-[#cbd5e1] shadow-sm transition hover:bg-[#e2e8f0] active:scale-95"
                                >
                                    {ctaSecondaryButtonText}
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className={cn('bg-[#f5f7fb] border-t border-[#e2e4ea] py-9 text-center text-xs text-[#636978]', px)}>
                <div className="flex justify-center mb-3">
                    <Logo logoUrl={logoUrl} logoDarkUrl={logoDarkUrl} brandName={brandName} />
                </div>
                <p className="font-semibold text-sm text-[#151a29]">{companyName}</p>
                {companyAddress && <p className="mt-1">{companyAddress}</p>}
                {companyContact && (
                    <p className={cn('mt-1', mobile && 'flex flex-col gap-1')}>
                        <span>{companyContact}</span>
                    </p>
                )}
                <div className="mt-5 flex justify-center gap-2.5">
                    {[
                        { id: 'facebook', icon: Facebook, label: 'Facebook', href: facebookUrl || '#' },
                        { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: linkedinUrl || '#' },
                        { id: 'instagram', icon: Instagram, label: 'Instagram', href: instagramUrl || '#' },
                        { id: 'tiktok', icon: TikTokIcon, label: 'TikTok', href: tiktokUrl || '#' },
                        { id: 'youtube', icon: Youtube, label: 'YouTube', href: youtubeUrl || '#' },
                    ].map(({ id, icon: Icon, label, href }) => (
                        <a
                            key={id}
                            href={href}
                            title={label}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="grid h-8 w-8 place-items-center rounded-full bg-white border border-[#e2e4ea] text-[#0057c5] shadow-xs hover:border-[#0057c5] hover:text-[#0057c5] transition"
                        >
                            <Icon className="h-4 w-4" />
                        </a>
                    ))}
                </div>

                <div className="my-5 h-px bg-[#e2e4ea]" />
                <p>You're receiving this email because you subscribed to our newsletter.</p>
                <a
                    href={unsubscribeUrl}
                    className="mt-1.5 inline-block font-semibold text-[#0057c5] underline"
                >
                    Unsubscribe
                </a>
            </footer>
        </div>
    );
}
