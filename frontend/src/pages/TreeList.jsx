import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { treesApi } from "@/api/trees";
import TreeCard from "@/components/trees/TreeCard";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Plus, TreePine, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function TreeList() {
  const [search, setSearch]             = useState("");
  const [healthFilter, setHealthFilter] = useState("all");
  const { user } = useAuth();
  const canAddOfficialTree = user?.role !== "citizen";

  const { data: trees = [], isLoading } = useQuery({
    queryKey: ["trees"],
    queryFn: () => treesApi.list({ limit: 500 }),
  });

  const filtered = trees.filter((t) => {
    const matchSearch =
      t.common_name?.toLowerCase().includes(search.toLowerCase()) ||
      t.scientific_name?.toLowerCase().includes(search.toLowerCase()) ||
      t.barangay?.toLowerCase().includes(search.toLowerCase());
    const matchHealth = healthFilter === "all" || t.health_status === healthFilter;
    return matchSearch && matchHealth;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-fraunces text-2xl sm:text-3xl font-semibold">Tree Inventory</h1>
          <p className="text-muted-foreground mt-1 text-sm">{trees.length} trees recorded</p>
        </div>
        {canAddOfficialTree && (
          <Link to="/add-tree">
            <Button className="flex items-center gap-2 shadow-md shadow-primary/15">
              <Plus className="w-4 h-4" />
              Add Tree
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, species, barangay…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
        <Select value={healthFilter} onValueChange={setHealthFilter}>
          <SelectTrigger className="w-full sm:w-44 h-10">
            <SelectValue placeholder="Health Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Healthy">Healthy</SelectItem>
            <SelectItem value="Fair">Fair</SelectItem>
            <SelectItem value="Poor">Poor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/5 mb-5">
            <TreePine className="w-10 h-10 text-primary/30" />
          </div>
          <p className="font-fraunces text-xl text-foreground/70">No trees found</p>
          <p className="text-sm mt-1.5 text-muted-foreground">Try adjusting your search or add a new tree</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((tree) => (
            <TreeCard key={tree.id} tree={tree} />
          ))}
        </div>
      )}
    </div>
  );
}
