export default function GlassCard({ children, className = "" }) {
    return (
        <div
            className={`
                rounded-3xl
                bg-white
                shadow-xl
                border
                border-gray-100
                p-6
                text-gray-900
                ${className}
            `}
        >
            {children}
        </div>
    );
}
