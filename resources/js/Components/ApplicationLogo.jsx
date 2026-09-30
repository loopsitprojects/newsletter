export default function ApplicationLogo({ className = 'h-9 w-auto', variant = 'white', ...props }) {
    const src = variant === 'dark' ? '/images/loops-logo-dark.png' : '/images/loops-logo-white.png';

    return (
        <img
            src={src}
            alt="Loops Integrated"
            className={`object-contain ${className}`}
            {...props}
        />
    );
}

