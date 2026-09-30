export default function ApplicationLogo({ className = 'h-9 w-auto', ...props }) {
    return (
        <img
            src="/favicon.png"
            alt="SL Newsletter"
            className={`object-contain rounded-xl ${className}`}
            {...props}
        />
    );
}

