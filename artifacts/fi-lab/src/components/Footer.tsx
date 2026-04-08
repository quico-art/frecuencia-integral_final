import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F7] border-t border-black/[0.06] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Row 1: Logo + nav */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-2.5">
            <span className="text-primary text-lg">✦</span>
            <span className="font-serif font-medium text-[15px] text-[#1D1D1F]">
              Frecuencia Integral Academy
            </span>
          </div>

          <div className="flex gap-8 text-sm text-[#6E6E73]">
            <a href="/#el-metodo" className="hover:text-[#1D1D1F] transition-colors">El Método</a>
            <a href="/#cursos" className="hover:text-[#1D1D1F] transition-colors">Formaciones</a>
            <a href="/#contacto" className="hover:text-[#1D1D1F] transition-colors">Contacto</a>
            <Link href="/login" className="hover:text-[#1D1D1F] transition-colors">Alumnos</Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-black/[0.06] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">

          {/* Legal links */}
          <div className="flex gap-6 text-xs text-[#6E6E73]">
            <Link href="/aviso-legal" className="hover:text-[#1D1D1F] transition-colors">
              Aviso Legal
            </Link>
            <Link href="/privacidad" className="hover:text-[#1D1D1F] transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/cookies" className="hover:text-[#1D1D1F] transition-colors">
              Cookies
            </Link>
          </div>

          <p className="text-xs text-[#6E6E73]">© {new Date().getFullYear()} Frecuencia Integral Academy · Todos los derechos reservados</p>
        </div>

      </div>
    </footer>
  );
}
