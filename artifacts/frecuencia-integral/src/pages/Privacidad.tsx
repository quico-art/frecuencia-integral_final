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

export default function Privacidad() {
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
            Política de Privacidad
          </h1>
          <p style={{ fontSize: 14, color: MUTED }}>Última actualización: abril de 2025</p>
        </div>

        <Section title="1. Responsable del tratamiento">
          <P>
            En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD) y de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le informamos de que los datos personales que nos facilite serán tratados por:
          </P>
          <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
            <Li><strong>Denominación:</strong> Frecuencia Integral Academy</Li>
            <Li><strong>NIF/CIF:</strong> [Pendiente de completar]</Li>
            <Li><strong>Domicilio social:</strong> [Dirección completa]</Li>
            <Li><strong>Correo electrónico de contacto:</strong> <a href="mailto:hola@frecuenciaintegral.com" style={{ color: GOLD }}>hola@frecuenciaintegral.com</a></Li>
          </ul>
        </Section>

        <Section title="2. Datos que recopilamos">
          <P>Recopilamos los siguientes datos personales:</P>
          <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
            <Li><strong>Datos de registro:</strong> nombre y dirección de correo electrónico, necesarios para crear y gestionar su cuenta de alumno.</Li>
            <Li><strong>Datos de pago:</strong> procesados íntegramente por <strong>Stripe, Inc.</strong> No almacenamos en nuestros servidores ningún dato de tarjeta bancaria. Stripe actúa como encargado del tratamiento bajo sus propias políticas de privacidad (<a href="https://stripe.com/es/privacy" target="_blank" rel="noreferrer" style={{ color: GOLD }}>stripe.com/es/privacy</a>).</Li>
            <Li><strong>Datos de uso de la plataforma:</strong> progreso de formación, entradas del diario personal y obras de arteterapia, almacenados localmente en su dispositivo (localStorage) y no transmitidos a nuestros servidores.</Li>
            <Li><strong>Metadatos de sesión:</strong> información técnica básica (plan de acceso contratado) gestionada a través de Supabase.</Li>
          </ul>
        </Section>

        <Section title="3. Finalidades y base jurídica del tratamiento">
          <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
            <Li><strong>Gestión del acceso a la plataforma</strong> — Base: ejecución de un contrato (art. 6.1.b RGPD).</Li>
            <Li><strong>Gestión de pagos y suscripciones</strong> — Base: ejecución de un contrato (art. 6.1.b RGPD).</Li>
            <Li><strong>Envío de comunicaciones sobre el servicio</strong> (actualizaciones, acceso a nuevos contenidos) — Base: interés legítimo (art. 6.1.f RGPD).</Li>
            <Li><strong>Cumplimiento de obligaciones legales</strong> (facturación, fiscales) — Base: obligación legal (art. 6.1.c RGPD).</Li>
          </ul>
        </Section>

        <Section title="4. Plazo de conservación">
          <P>
            Conservaremos sus datos durante el tiempo que mantenga su cuenta activa y, una vez cancelada, durante los plazos legalmente exigidos (generalmente 5 años para obligaciones fiscales y mercantiles). Los datos almacenados localmente en su dispositivo (progreso, diario, arteterapia) permanecen exclusivamente bajo su control y pueden eliminarse borrando la caché del navegador.
          </P>
        </Section>

        <Section title="5. Destinatarios y transferencias internacionales">
          <P>Sus datos podrán ser comunicados a los siguientes destinatarios:</P>
          <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
            <Li><strong>Supabase, Inc.</strong> — Proveedor de autenticación e infraestructura de base de datos. Supabase dispone de las garantías adecuadas conforme al RGPD (Cláusulas Contractuales Tipo).</Li>
            <Li><strong>Stripe, Inc.</strong> — Procesador de pagos. Opera bajo Privacy Shield y Cláusulas Contractuales Tipo.</Li>
          </ul>
          <P>No realizamos cesiones a terceros con fines comerciales ni publicitarios.</P>
        </Section>

        <Section title="6. Sus derechos">
          <P>En cualquier momento puede ejercer los siguientes derechos dirigiéndose a <a href="mailto:hola@frecuenciaintegral.com" style={{ color: GOLD }}>hola@frecuenciaintegral.com</a>:</P>
          <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
            <Li><strong>Acceso:</strong> conocer qué datos personales tratamos.</Li>
            <Li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</Li>
            <Li><strong>Supresión:</strong> solicitar la eliminación de sus datos («derecho al olvido»).</Li>
            <Li><strong>Limitación:</strong> solicitar que se restrinja el tratamiento de sus datos.</Li>
            <Li><strong>Portabilidad:</strong> recibir sus datos en un formato estructurado y de uso común.</Li>
            <Li><strong>Oposición:</strong> oponerse a determinados tratamientos basados en interés legítimo.</Li>
          </ul>
          <P>
            Tiene también derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noreferrer" style={{ color: GOLD }}>www.aepd.es</a>) si considera que el tratamiento de sus datos no es conforme a la normativa.
          </P>
        </Section>

        <Section title="7. Seguridad">
          <P>
            Aplicamos medidas técnicas y organizativas adecuadas para proteger sus datos frente a accesos no autorizados, pérdida o divulgación accidental. Las comunicaciones entre su dispositivo y nuestra plataforma están cifradas mediante TLS/HTTPS. Los datos de autenticación se gestionan a través de Supabase con hashing seguro de contraseñas.
          </P>
        </Section>

        <Section title="8. Cookies">
          <P>
            Esta plataforma utiliza cookies técnicas estrictamente necesarias para el funcionamiento del servicio (gestión de sesión). No utilizamos cookies de seguimiento ni publicidad. Para más información, consulte nuestra{" "}
            <Link href="/cookies" style={{ color: GOLD }}>Política de Cookies</Link>.
          </P>
        </Section>

        <Section title="9. Cambios en esta política">
          <P>
            Podemos actualizar esta Política de Privacidad. Cuando lo hagamos, revisaremos la fecha de «última actualización» en la parte superior. Si los cambios son sustanciales, le notificaremos por correo electrónico o mediante un aviso destacado en la plataforma.
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
