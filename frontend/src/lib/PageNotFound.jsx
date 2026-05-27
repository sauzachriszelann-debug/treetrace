import { Link } from "react-router-dom";
import { TreePine, ArrowLeft, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-background to-green-50/30 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl" />
        <Leaf className="absolute top-[20%] right-[20%] w-16 h-16 text-primary/[0.06] rotate-45 animate-float" />
        <TreePine className="absolute bottom-[20%] left-[15%] w-20 h-20 text-primary/[0.04] -rotate-12" />
      </div>
      <div className="text-center relative z-10 animate-slide-up">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/8 mb-6">
          <TreePine className="w-12 h-12 text-primary/40" />
        </div>
        <h1 className="font-fraunces text-6xl font-bold text-foreground/80 mb-2">404</h1>
        <p className="text-muted-foreground text-lg mb-8">This page got lost in the forest</p>
        <Link to="/">
          <Button size="lg" className="flex items-center gap-2 mx-auto shadow-md shadow-primary/15">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
