export default function ApplicationLogo({ className = 'h-9 w-auto', variant = 'white', ...props }) {
    const src = variant === 'dark' ? '/images/loops-logo-dark.png?v=3' : '/images/loops-logo-white.png?v=3';

    return (
        <img
            src={src}
            alt="Loops Integrated"
            className={`object-contain ${className}`}
            {...props}
        />
    );
}

