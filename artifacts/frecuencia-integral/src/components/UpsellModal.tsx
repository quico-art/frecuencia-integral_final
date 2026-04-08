import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "wouter";
import { Lock } from "lucide-react";

interface UpsellModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UpsellModal({ open, onOpenChange }: UpsellModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] bg-white border-0 rounded-[24px] p-0 overflow-hidden" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.15)" }}>
        <div className="p-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={20} className="text-primary" />
          </div>

          <DialogTitle className="text-[24px] font-serif text-[#1D1D1F] text-center tracking-[-0.01em] mb-2">
            Continúa tu camino
          </DialogTitle>
          <DialogDescription className="text-[15px] text-[#6E6E73] text-center leading-[1.6] mb-6">
            Has completado tu acceso gratuito. Accede al programa completo de 48 semanas.
          </DialogDescription>

          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {[
              { icon: "🌿", label: "Puerta Blanca", sub: "12 semanas" },
              { icon: "🔥", label: "Puerta Roja", sub: "12 semanas" },
              { icon: "🔵", label: "Puerta Azul", sub: "12 semanas" },
              { icon: "🌈", label: "Arcoíris", sub: "12 semanas" },
            ].map((item) => (
              <div key={item.label} className="bg-[#F5F5F7] rounded-[14px] px-4 py-3">
                <p className="text-[13px] font-medium text-[#1D1D1F]">{item.icon} {item.label}</p>
                <p className="text-[11px] text-[#6E6E73] mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-[#AEAEB2] text-center mb-5">Acceso de por vida · Sin suscripción</p>

          <Link href="/metodo" onClick={() => onOpenChange(false)}>
            <button className="w-full py-3 bg-[#1D1D1F] text-white rounded-full text-[15px] font-medium hover:bg-black transition-colors">
              Ver el curso completo →
            </button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
