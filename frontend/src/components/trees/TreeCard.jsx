import { Link } from "react-router-dom";
import { MapPin, Ruler, TreePine, Leaf, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import HealthBadge from "./HealthBadge";

export default function TreeCard({ tree }) {
  return (
    <Link to={`/trees/${tree.id}`}>
      <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group border-border/80">
        {/* Photo */}
        <div className="h-44 bg-gradient-to-br from-primary/8 via-emerald-50 to-accent overflow-hidden relative">
          {tree.photo_url ? (
            <img
              src={tree.photo_url}
              alt={tree.common_name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <TreePine className="w-16 h-16 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
            </div>
          )}
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3">
            <HealthBadge status={tree.health_status} />
          </div>
          {/* View indicator on hover */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-foreground text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
              View <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-fraunces font-semibold text-foreground text-lg leading-tight group-hover:text-primary transition-colors duration-200">
            {tree.common_name}
          </h3>
          {tree.scientific_name && (
            <p className="text-muted-foreground text-xs italic mt-0.5">{tree.scientific_name}</p>
          )}

          <div className="mt-3 space-y-1.5">
            {tree.lat && tree.lng && (
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>{tree.barangay || "Location tagged"}</span>
              </div>
            )}
            {tree.dbh_cm && (
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <Ruler className="w-3.5 h-3.5" />
                <span>DBH: {tree.dbh_cm} cm</span>
              </div>
            )}
            {tree.carbon_kg && (
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <Leaf className="w-3.5 h-3.5" />
                <span>Carbon: {tree.carbon_kg.toFixed(2)} kg</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
