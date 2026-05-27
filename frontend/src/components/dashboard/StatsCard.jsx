import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const colorConfig = {
    primary: {
        icon: "bg-primary/10 text-primary",
        border: "border-primary/10",
        glow: "shadow-primary/5",
    },
    emerald: {
        icon: "bg-emerald-50 text-emerald-600",
        border: "border-emerald-100",
        glow: "shadow-emerald-500/5",
    },
    amber: {
        icon: "bg-amber-50 text-amber-600",
        border: "border-amber-100",
        glow: "shadow-amber-500/5",
    },
    red: {
        icon: "bg-red-50 text-red-600",
        border: "border-red-100",
        glow: "shadow-red-500/5",
    },
    blue: {
        icon: "bg-blue-50 text-blue-600",
        border: "border-blue-100",
        glow: "shadow-blue-500/5",
    },
};

export default function StatsCard({ title, value, subtitle, icon: Icon, color = "primary" }) {
    const c = colorConfig[color] || colorConfig.primary;

    return (
        <Card className={cn(
            "border hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group",
            c.border, c.glow
        )}>
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{title}</p>
                        <p className="font-fraunces text-3xl font-semibold text-foreground mt-1.5">{value}</p>
                        {subtitle && <p className="text-muted-foreground text-xs mt-1.5">{subtitle}</p>}
                    </div>
                    {Icon && (
                        <div className={cn("p-3 rounded-xl transition-transform duration-300 group-hover:scale-110", c.icon)}>
                            <Icon className="w-5 h-5" />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
