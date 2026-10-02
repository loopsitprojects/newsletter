import React from 'react';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Logo = ({
    light = false,
    darkMode = false,
    logoUrl = '/images/loops-logo-dark.png',
    logoDarkUrl = '/images/loops-logo-white.png',
    brandName = 'Loops Integrated',
}) => {
    const isDark = light || darkMode;
    const activeSrc = isDark ? (logoDarkUrl || logoUrl) : (logoUrl || logoDarkUrl);

    return (
        <div className="flex items-center justify-center gap-2">
            {activeSrc ? (
                <img
                    src={activeSrc}
                    alt={brandName}
                    className={cn('h-10 w-auto max-h-10 object-contain', isDark && !logoDarkUrl && 'brightness-0 invert')}
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
    featuredImage = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=750&fit=crop&q=80',
    ctaTitle = 'Ready to Discover More?',
    ctaSubtitle = "Explore our latest updates and find something you'll love.",
    ctaButtonText = 'Explore Now',
    ctaButtonUrl = '#',
    showCtaSecondaryButton = true,
    ctaSecondaryButtonText = 'Contact Us',
    ctaSecondaryButtonUrl = '#',
    companyName = 'Loops Integrated',
    companyAddress = '',
    companyContact = '',
    unsubscribeUrl = '#',
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
                <Logo light={true} logoUrl={logoUrl} logoDarkUrl={logoDarkUrl} brandName={brandName} />
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
                <div className="space-y-6">
                    {items.map((item, idx) => {
                        const badgeStyles = [
                            'bg-[#e6f0fd] text-[#0057c5]',
                            'bg-[#ffe6f0] text-[#ff0878]',
                            'bg-[#f3eafd] text-[#8035d1]',
                            'bg-[#e2faf8] text-[#09908a]',
                        ];
                        const styleClass = badgeStyles[idx % badgeStyles.length];

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
                    })}
                </div>
            </section>

            {/* CTA Banner */}
            <section className={cn(px, 'pb-8')}>
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
                    {['f', 'in', 'ig', 'tt', '▶'].map((s) => (
                        <a
                            key={s}
                            href="#"
                            className="grid h-8 w-8 place-items-center rounded-full bg-white border border-[#e2e4ea] text-xs font-bold text-[#0057c5] shadow-xs hover:border-[#0057c5]"
                        >
                            {s}
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
