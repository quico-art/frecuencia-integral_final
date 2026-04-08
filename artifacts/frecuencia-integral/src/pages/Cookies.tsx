import { Link } from "wouter";

const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Plus Jakarta Sans', DM Sans, sans-serif";
const GOLD  = "#BC9640";
const MUTED = "#6E6E73";
const TEXT  = "#1D1D1F";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 400, color: TEXT, marginBottom: 16, paddingBottom: 10, borderBottom: "1px solid #E5E5EA" }}>
        {title}
      </h2>
      <div style={{ fontSize: 15, color: TEXT, lineHeight: 1.85, fontFamily: SANS }}>
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: 14 }}>{children}</p>;
}

function Li({ children }: { children: React.ReactNode }) {
  return <li style={{ marginBottom: 8, paddingLeft: 4 }}>{children}</li>;
}

export default function Cookies() {
  return (
    <div style={{ fontFamily: SANS, color: TEXT, background: "#fff", minHeight: "100vh" }}>

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,.94)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "0 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: GOLD }}>✦</span>
            <span style={{ fontFamily: SERIF, fontSize: 15, color: TEXT }}>Frecuencia Integral Academy</span>
          </Link>
          <Link href="/" style={{ fontSize: 13, color: MUTED, textDecoration: "none" }}>← Volver al inicio</Link>
        </div>
      </header>

      {/* CONTENT */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "64px 32px 96px" }}>

        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 12, color: GOLD, textTransform: "uppercase", letterSpacing: ".14em", fontWeight: 700, marginBottom: 16 }}>Legal</p>
          <h1 style={{ fontFamily: SERIF, fontSize: "clamp(32px,5vw,52px)", fontWeight: 300, color: TEXT, lineHeight: 1.1, marginBottom: 16 }}>
            Política de Cookies
          </h1>
          <p style={{ fontSize: 14, color: MUTED }}>Última actualización: abril de 2025</p>
        </div>

        <Section title="1. ¿Qué son las cookies?">
          <P>
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tablet, móvil) cuando visita una página web. Sirven para que el sitio web recuerde información sobre su visita, como su idioma preferido u otras opciones, lo que puede facilitar su próxima visita y hacer que el sitio le resulte más útil.
          </P>
        </Section>

        <Section title="2. Cookies que utilizamos">
          <P>Frecuencia Integral Academy utiliza exclusivamente <strong>cookies técnicas estrictamente necesarias</strong> para el funcionamiento de la plataforma. No utilizamos cookies de rastreo, publicidad ni analítica de terceros.</P>
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#F5F5F7" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E5EA", fontWeight: 600 }}>Cookie</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E5EA", fontWeight: 600 }}>Finalidad</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E5EA", fontWeight: 600 }}>Tipo</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E5EA", fontWeight: 600 }}>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #F0F0F5", fontFamily: "monospace", fontSize: 13 }}>fi_auth</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #F0F0F5" }}>Mantener la sesión del alumno autenticado</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #F0F0F5" }}>Técnica / Necesaria</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #F0F0F5" }}>Sesión</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #F0F0F5", fontFamily: "monospace", fontSize: 13 }}>fi_cookies</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #F0F0F5" }}>Recordar la aceptación de cookies</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #F0F0F5" }}>Técnica / Necesaria</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #F0F0F5" }}>12 meses</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 13 }}>sb-* (Supabase)</td>
                  <td style={{ padding: "12px 16px" }}>Gestión de la sesión de autenticación de Supabase</td>
                  <td style={{ padding: "12px 16px" }}>Técnica / Necesaria</td>
                  <td style={{ padding: "12px 16px" }}>Sesión / 1 semana</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="3. Almacenamiento local (localStorage)">
          <P>
            Adicionalmente a las cookies, la plataforma utiliza el <strong>almacenamiento local del navegador (localStorage)</strong> para guardar información relacionada con su progreso formativo, entradas del diario personal y obras de arteterapia. Estos datos no se transmiten a nuestros servidores y permanecen exclusivamente en su dispositivo. Puede eliminarlos en cualquier momento desde la configuración de su navegador.
          </P>
        </Section>

        <Section title="4. Cómo gestionar o eliminar las cookies">
          <P>Puede configurar su navegador para aceptar, rechazar o eliminar las cookies en cualquier momento. Tenga en cuenta que la desactivación de las cookies técnicas puede afectar al funcionamiento de la plataforma (por ejemplo, deberá iniciar sesión en cada visita).</P>
          <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
            <Li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" style={{ color: GOLD }}>Google Chrome</a></Li>
            <Li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web" target="_blank" rel="noreferrer" style={{ color: GOLD }}>Mozilla Firefox</a></Li>
            <Li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer" style={{ color: GOLD }}>Safari</a></Li>
            <Li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noreferrer" style={{ color: GOLD }}>Microsoft Edge</a></Li>
          </ul>
        </Section>

        <Section title="5. Cambios en la política de cookies">
          <P>
            Podemos actualizar esta Política de Cookies para reflejar cambios en las cookies que utilizamos o por otras razones operativas, legales o reglamentarias. Le recomendamos revisar esta política periódicamente para estar informado sobre el uso que hacemos de las cookies.
          </P>
        </Section>

        <Section title="6. Contacto">
          <P>
            Si tiene dudas sobre el uso de cookies en nuestra plataforma, puede contactarnos en{" "}
            <a href="mailto:hola@frecuenciaintegral.com" style={{ color: GOLD }}>hola@frecuenciaintegral.com</a>.
          </P>
        </Section>

      </div>

      {/* FOOTER MINI */}
      <footer style={{ background: "#F5F5F7", borderTop: "1px solid rgba(0,0,0,0.06)", padding: "32px", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <Link href="/aviso-legal" style={{ fontSize: 13, color: MUTED, textDecoration: "none" }}>Aviso Legal</Link>
          <Link href="/privacidad" style={{ fontSize: 13, color: MUTED, textDecoration: "none" }}>Privacidad</Link>
          <Link href="/cookies" style={{ fontSize: 13, color: MUTED, textDecoration: "none" }}>Cookies</Link>
        </div>
        <p style={{ fontSize: 13, color: MUTED }}>© {new Date().getFullYear()} Frecuencia Integral Academy</p>
      </footer>
    </div>
  );
}
