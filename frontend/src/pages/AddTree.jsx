import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { treesApi } from "@/api/trees";
import TreeForm from "@/components/trees/TreeForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/AuthContext";

export default function AddTree() {
  const navigate = useNavigate();
  const qc       = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  if (user?.role === "citizen") {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto animate-page-enter">
        <Link
          to="/ai-identify"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to AI Identify
        </Link>

        <div className="bg-card border border-border/60 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h1 className="font-fraunces text-2xl sm:text-3xl font-semibold">Official Inventory Restricted</h1>
          <p className="text-muted-foreground mt-3 text-sm">
            Citizen accounts cannot add official inventory trees directly.
            Please use AI Identify and submit the species for expert review.
            Admins or field workers will verify approved records.
          </p>
          <Button className="mt-6 shadow-md shadow-primary/15" onClick={() => navigate("/ai-identify")}>
            Submit Through AI Identify
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const newTree = await treesApi.create(data);
      qc.invalidateQueries({ queryKey: ["trees"] });
      toast.success("Tree record created successfully!");
      navigate(`/trees/${newTree.id}`);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Failed to create tree record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto animate-page-enter">
      <Link
        to="/trees"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Inventory
      </Link>

      <div className="mb-6">
        <h1 className="font-fraunces text-2xl sm:text-3xl font-semibold">Add New Tree</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Record a new tree entry with GPS location and measurements
        </p>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl p-5 sm:p-6 shadow-sm">
        <TreeForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
