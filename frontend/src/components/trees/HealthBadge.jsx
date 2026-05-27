import { cn } from "@/lib/utils";

const config = {
    Healthy: { bg: "bg-emerald-50 text-emerald-700 border-emerald-200/80", dot: "bg-emerald-500" },
    Fair: { bg: "bg-amber-50 text-amber-700 border-amber-200/80", dot: "bg-amber-500" },
    Poor: { bg: "bg-red-50 text-red-700 border-red-200/80", dot: "bg-red-500" },
};

export default function HealthBadge({ status, className }) {
    const c = config[status] || config.Fair;
    return (
        <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shadow-sm", c.bg, className)}>
            <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", c.dot)} />
            {status || "Unknown"}
        </span>
    );
}
