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

export default function AvisoLegal() {
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
            Aviso Legal
          </h1>
          <p style={{ fontSize: 14, color: MUTED }}>Última actualización: abril de 2025</p>
        </div>

        <Section title="1. Datos identificativos del titular">
          <P>En cumplimiento con el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:</P>
          <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
            <Li><strong>Denominación:</strong> Frecuencia Integral Academy</Li>
            <Li><strong>NIF/CIF:</strong> [Pendiente de completar]</Li>
            <Li><strong>Domicilio social:</strong> [Dirección completa, Código Postal, Ciudad, España]</Li>
            <Li><strong>Correo electrónico:</strong> <a href="mailto:hola@frecuenciaintegral.com" style={{ color: GOLD }}>hola@frecuenciaintegral.com</a></Li>
            <Li><strong>Sitio web:</strong> frecuenciaintegral.com</Li>
          </ul>
        </Section>

        <Section title="2. Objeto y ámbito de aplicación">
          <P>
            Este Aviso Legal regula el acceso, la navegación y el uso del sitio web y la plataforma de formación online de Frecuencia Integral Academy. El acceso a este sitio web implica la aceptación plena y sin reservas de las presentes condiciones.
          </P>
          <P>
            Frecuencia Integral Academy se reserva el derecho a modificar en cualquier momento las condiciones de acceso y uso de este sitio web, así como sus contenidos y servicios, sin perjuicio de los contratos ya formalizados con alumnos.
          </P>
        </Section>

        <Section title="3. Propiedad intelectual e industrial">
          <P>
            Todos los contenidos de este sitio web y de la plataforma de formación — incluyendo, sin carácter limitativo, textos, imágenes, logotipos, diseños, estructura, programas de formación, materiales pedagógicos, audios, y demás elementos — son titularidad de Frecuencia Integral Academy o de sus legítimos licenciantes, y están protegidos por las leyes españolas y europeas de propiedad intelectual e industrial.
          </P>
          <P>
            Queda expresamente prohibida la reproducción, distribución, transformación, comunicación pública o cualquier otra forma de explotación de los contenidos de esta plataforma, total o parcialmente, sin la autorización expresa y por escrito de Frecuencia Integral Academy. El incumplimiento de estas prohibiciones podrá constituir una infracción sancionable conforme a la legislación vigente.
          </P>
          <P>
            El alumno recibe, al contratar cualquiera de nuestros planes, una licencia personal, intransferible y no exclusiva de acceso a los contenidos contratados, exclusivamente para su uso privado y formativo.
          </P>
        </Section>

        <Section title="4. Condiciones de acceso y uso">
          <P>El usuario se compromete a utilizar el sitio web y la plataforma de conformidad con la ley, el presente Aviso Legal y las buenas costumbres. En particular, queda prohibido:</P>
          <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
            <Li>Compartir credenciales de acceso con terceros.</Li>
            <Li>Reproducir, descargar, distribuir o hacer uso comercial de los contenidos de la plataforma.</Li>
            <Li>Utilizar la plataforma para actividades ilícitas o contrarias al orden público.</Li>
            <Li>Intentar acceder sin autorización a áreas restringidas o sistemas de la plataforma.</Li>
            <Li>Transmitir virus, malware o cualquier otro código dañino.</Li>
          </ul>
          <P>
            El incumplimiento de las presentes condiciones podrá dar lugar a la suspensión o cancelación inmediata del acceso a la plataforma, sin derecho a devolución.
          </P>
        </Section>

        <Section title="5. Política de contratación y pagos">
          <P>
            Los servicios de formación online ofrecidos por Frecuencia Integral Academy se formalizan mediante la aceptación de las condiciones de contratación en el momento del pago. El precio, la modalidad (pago único o suscripción) y las condiciones de cada plan se describen de forma detallada en la página de ventas correspondiente.
          </P>
          <P>
            Los pagos se procesan de forma segura a través de <strong>Stripe</strong>. Frecuencia Integral Academy no almacena datos bancarios.
          </P>
        </Section>

        <Section title="6. Política de devoluciones y garantía">
          <P>
            Frecuencia Integral Academy ofrece una <strong>garantía de devolución de 14 días naturales</strong> desde la fecha de contratación, sin necesidad de justificación. Para solicitarla, el alumno debe enviar un correo a <a href="mailto:hola@frecuenciaintegral.com" style={{ color: GOLD }}>hola@frecuenciaintegral.com</a> dentro de dicho plazo.
          </P>
          <P>
            Transcurridos los 14 días, no se aceptarán devoluciones por acceso ya disfrutado del contenido, salvo incumplimiento grave por parte de Frecuencia Integral Academy.
          </P>
          <P>
            Este derecho de desistimiento es conforme al artículo 102 del Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios.
          </P>
        </Section>

        <Section title="7. Exclusión de responsabilidad">
          <P>
            Frecuencia Integral Academy no garantiza la disponibilidad continua e ininterrumpida del sitio web y la plataforma, aunque realizará sus mejores esfuerzos para mantener la continuidad del servicio.
          </P>
          <P>
            Los contenidos formativos de la plataforma tienen finalidad educativa y de desarrollo personal. No constituyen asesoramiento médico, psicológico, ni de ningún otro tipo profesional regulado. El usuario asume en exclusiva la responsabilidad del uso que haga de dichos contenidos.
          </P>
        </Section>

        <Section title="8. Legislación aplicable y jurisdicción">
          <P>
            Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier conflicto derivado del acceso o uso de este sitio web, las partes se someten a los Juzgados y Tribunales competentes conforme a la legislación vigente, sin perjuicio del fuero que pudiera corresponder al consumidor según la normativa de protección de consumidores y usuarios.
          </P>
          <P>
            Para reclamaciones de consumo, puede acudir a la plataforma europea de resolución de litigios en línea: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" style={{ color: GOLD }}>ec.europa.eu/consumers/odr</a>.
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
