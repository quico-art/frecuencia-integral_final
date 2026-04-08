import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { getAuth, logout } from "@/lib/auth";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar({ isArea = false }: { isArea?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const auth = getAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isArea
          ? "bg-white/95 backdrop-blur-xl border-b border-black/[0.06]"
          : "bg-transparent"
      }`}
      style={{ boxShadow: scrolled || isArea ? "0 1px 0 rgba(0,0,0,0.06)" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-[68px]">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-primary text-xl leading-none">✦</span>
            <span
              className="font-serif font-medium text-[17px] tracking-[-0.01em]"
              style={{ color: "#1D1D1F" }}
            >
              Frecuencia Integral
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {!isArea ? (
              <>
                {[
                  { label: "El Método", href: "/#el-metodo" },
                  { label: "Cursos", href: "/#cursos" },
                  { label: "El Equipo", href: "/#el-equipo" },
                  { label: "Testimonios", href: "/#testimonios" },
                  { label: "Contacto", href: "/#contacto" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm text-[#424245] hover:text-[#1D1D1F] transition-colors font-medium tracking-[-0.01em]"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pl-4 border-l border-black/10">
                  {auth.isLoggedIn ? (
                    <Link href="/area">
                      <Button
                        size="sm"
                        className="bg-primary text-white hover:bg-primary/90 rounded-full px-5 font-medium text-sm"
                      >
                        Mi Área
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full px-5 font-medium text-sm border-black/20 text-[#1D1D1F] hover:bg-black/5"
                      >
                        Acceso Alumnos
                      </Button>
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/" className="text-sm text-[#424245] hover:text-[#1D1D1F] transition-colors font-medium">
                  Academia
                </Link>
                <span className="text-sm text-[#1D1D1F] font-semibold">Mi Área</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-[#424245] hover:text-[#1D1D1F] transition-colors font-medium"
                >
                  Salir
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-[#1D1D1F]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-black/[0.06] px-5 pb-5 pt-3 space-y-1">
          {!isArea ? (
            <>
              {["El Método", "Cursos", "El Equipo", "Testimonios", "Contacto"].map((label, i) => (
                <a
                  key={label}
                  href={`/#${["el-metodo", "cursos", "el-equipo", "testimonios", "contacto"][i]}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 text-sm font-medium text-[#424245] hover:text-[#1D1D1F]"
                >
                  {label}
                </a>
              ))}
              <div className="pt-3">
                {auth.isLoggedIn ? (
                  <Link href="/area" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary text-white rounded-full">Mi Área</Button>
                  </Link>
                ) : (
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full border-black/20">
                      Acceso Alumnos
                    </Button>
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-sm font-medium text-[#424245]">
                Academia
              </Link>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="block py-2.5 text-sm font-medium text-[#424245] hover:text-[#1D1D1F] w-full text-left"
              >
                Salir
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
