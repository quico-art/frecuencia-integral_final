import { useState, useEffect } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuth, setAuth, setProgress } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

// ── Scalable courses registry ──────────────────────────────────────────────
const COURSES = [
  {
    id: "tct",
    label: "Método TCT",
    icon: "🌿",
    desc: "48 semanas · Transformación integral",
    accentColor: "#2b7d7a",
    bgColor: "rgba(43,125,122,.09)",
    comingSoon: false,
  },
  {
    id: "deportista",
    label: "El Deportista Consciente",
    icon: "🏃",
    desc: "Rendimiento y consciencia plena",
    accentColor: "#BC9640",
    bgColor: "rgba(188,150,64,.09)",
    comingSoon: true,
  },
] as const;

type CourseId = typeof COURSES[number]["id"];

function isCourseId(s: string | null): s is CourseId {
  return COURSES.some(c => c.id === s);
}

export default function Login() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);

  const courseParam = params.get("course");
  const initialTab = params.get("tab") === "register" ? "register" : "login";
  const initialPlan = params.get("plan") ?? "libre";

  // If URL has a valid course, pre-select it; otherwise show selector
  const [selectedCourse, setSelectedCourse] = useState<CourseId | null>(
    isCourseId(courseParam) ? courseParam : null
  );
  // Track whether the course was forced by the landing URL (hides "Cambiar" link)
  const courseFromLanding = isCourseId(courseParam);

  const courseData = COURSES.find(c => c.id === selectedCourse) ?? null;

  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();
    if (auth.isLoggedIn) setLocation("/area");
  }, [setLocation]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    setLoginLoading(false);

    if (error || !data.user) {
      setLoginError("Email o contraseña incorrectos.");
      return;
    }

    const displayName =
      data.user.user_metadata?.full_name ||
      data.user.user_metadata?.name ||
      data.user.email?.split("@")[0] ||
      "Alumno";

    const plan = (data.user.user_metadata?.plan ?? "libre") as string;
    // URL param takes priority; fallback to stored metadata
    const course = selectedCourse ?? (data.user.user_metadata?.course as string | undefined) ?? "tct";

    setAuth({
      name: displayName,
      email: data.user.email ?? "",
      isLoggedIn: true,
      role: (data.user.user_metadata?.role as "user" | "admin") ?? "user",
      plan,
      course,
    });

    const planNorm = plan.toLowerCase();
    if (!planNorm || planNorm === "libre" || planNorm === "prueba") {
      setProgress({ currentWeek: 1, completedWeeks: [], currentGate: "blanca", unlockedGates: ["blanca"] });
    }

    setLocation("/area");
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError("");
    if (!regName || !regEmail || !regPassword) {
      setRegError("Completa todos los campos.");
      return;
    }
    setRegLoading(true);

    const course = selectedCourse ?? "tct";

    const { data, error } = await supabase.auth.signUp({
      email: regEmail,
      password: regPassword,
      options: {
        data: { full_name: regName, role: "user", plan: initialPlan, course },
      },
    });

    setRegLoading(false);

    if (error) {
      setRegError(error.message);
      return;
    }

    if (data.user) {
      setAuth({ name: regName, email: regEmail, isLoggedIn: true, role: "user", plan: initialPlan, course });
      setLocation("/area");
    } else {
      setRegError("Revisa tu email para confirmar tu cuenta.");
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/login`,
    });
    setResetSent(true);
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center px-5 py-12">
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors font-medium">
        <ArrowLeft size={14} /> Academia
      </Link>

      <div className="w-full max-w-[400px]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-primary text-2xl mb-3">✦</div>
          <h1 className="font-serif text-[22px] tracking-[-0.01em] text-[#1D1D1F]">
            Frecuencia Integral Academy
          </h1>
          <p className="text-sm text-[#6E6E73] mt-1.5">Área privada de alumnos</p>
        </div>

        {/* ── STEP 1: Course selector (only when no course in URL) ── */}
        {!selectedCourse ? (
          <div
            className="bg-white rounded-[24px] p-8"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)" }}
          >
            <p className="text-[13px] font-semibold text-[#1D1D1F] uppercase tracking-[0.08em] mb-5">
              ¿A qué área deseas acceder?
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {COURSES.map(course => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 16,
                    border: `1.5px solid ${course.accentColor}30`,
                    background: course.bgColor,
                    cursor: "pointer", textAlign: "left",
                    transition: "border-color .15s, box-shadow .15s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = course.accentColor;
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 3px ${course.accentColor}15`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = `${course.accentColor}30`;
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{course.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1D1D1F", marginBottom: 2 }}>
                      {course.label}
                    </div>
                    <div style={{ fontSize: 12, color: "#6E6E73" }}>{course.desc}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: course.accentColor, fontSize: 18 }}>›</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── STEP 2: Login / Register form ── */
          <div
            className="bg-white rounded-[24px] p-8"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)" }}
          >
            {/* Course badge */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: courseData!.bgColor, borderRadius: 10,
              padding: "8px 12px", marginBottom: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{courseData!.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: courseData!.accentColor }}>
                  {courseData!.label}
                </span>
              </div>
              {!courseFromLanding && (
                <button
                  onClick={() => setSelectedCourse(null)}
                  style={{ fontSize: 11, color: "#8E8E93", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  Cambiar
                </button>
              )}
            </div>

            {courseData!.comingSoon ? (
              /* ── Coming soon panel ── */
              <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>🚧</div>
                <h2 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 18, color: "#1D1D1F", marginBottom: 8, fontWeight: 600 }}>
                  Curso en construcción
                </h2>
                <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.6, marginBottom: 24 }}>
                  Estamos preparando <strong style={{ color: "#BC9640" }}>El Deportista Consciente</strong> con todo el cuidado que merece. Muy pronto podrás acceder al área de alumnos.
                </p>
                <div style={{ background: "rgba(188,150,64,.07)", border: "1px solid rgba(188,150,64,.2)", borderRadius: 12, padding: "12px 16px", marginBottom: 24 }}>
                  <p style={{ fontSize: 12, color: "#8a6f2e", margin: 0, fontWeight: 500 }}>
                    🔔 ¿Quieres que te avisemos cuando abra?<br />
                    <span style={{ fontWeight: 400, color: "#6E6E73" }}>Escríbenos a <a href="mailto:info@frecuenciaintegralacademy.com" style={{ color: "#BC9640", textDecoration: "none" }}>info@frecuenciaintegralacademy.com</a></span>
                  </p>
                </div>
                <button
                  onClick={() => setLocation("/")}
                  style={{ fontSize: 12, color: "#8E8E93", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  ← Ir a Academia
                </button>
              </div>
            ) : showReset ? (
              <div>
                <button
                  onClick={() => setShowReset(false)}
                  className="flex items-center gap-1.5 text-sm text-[#6E6E73] hover:text-[#1D1D1F] mb-6"
                >
                  <ArrowLeft size={13} /> Volver
                </button>
                <h2 className="font-serif text-[18px] text-[#1D1D1F] mb-2">Recuperar contraseña</h2>
                <p className="text-sm text-[#6E6E73] mb-5">
                  Te enviaremos un enlace para restablecer tu contraseña.
                </p>
                {resetSent ? (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-green-700">
                    ✓ Revisa tu correo. Te hemos enviado el enlace de recuperación.
                  </div>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-[0.05em]">Email</Label>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="bg-[#F5F5F7] border-0 h-12 rounded-xl text-[#1D1D1F] placeholder:text-[#AEAEB2] focus-visible:ring-1 focus-visible:ring-primary/40"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#1D1D1F] text-white hover:bg-black rounded-full h-12 font-medium text-[15px]"
                    >
                      Enviar enlace
                    </Button>
                  </form>
                )}
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-7 bg-[#F5F5F7] rounded-xl p-1 h-auto">
                  <TabsTrigger
                    value="login"
                    className="rounded-lg text-sm font-medium py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1D1D1F] text-[#6E6E73]"
                  >
                    Iniciar Sesión
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="rounded-lg text-sm font-medium py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#1D1D1F] text-[#6E6E73]"
                  >
                    Registrarse
                  </TabsTrigger>
                </TabsList>

                {/* LOGIN */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-[0.05em]">Email</Label>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="bg-[#F5F5F7] border-0 h-12 rounded-xl text-[#1D1D1F] placeholder:text-[#AEAEB2] focus-visible:ring-1 focus-visible:ring-primary/40"
                        required
                        data-testid="input-login-email"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-[0.05em]">Contraseña</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="bg-[#F5F5F7] border-0 h-12 rounded-xl text-[#1D1D1F] pr-11 focus-visible:ring-1 focus-visible:ring-primary/40"
                          required
                          data-testid="input-login-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AEAEB2] hover:text-[#6E6E73]"
                          data-testid="button-toggle-password"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                    <Button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full bg-[#1D1D1F] text-white hover:bg-black rounded-full h-12 font-medium text-[15px] mt-2 disabled:opacity-60"
                      data-testid="button-login-submit"
                    >
                      {loginLoading ? "Entrando…" : "Entrar al Área de Alumnos"}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setShowReset(true)}
                      className="w-full text-center text-[12px] text-[#6E6E73] hover:text-[#1D1D1F] transition-colors pt-1"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </form>
                </TabsContent>

                {/* REGISTER */}
                <TabsContent value="register">
                  {initialPlan === "prueba" && (
                    <div style={{ background: "rgba(43,125,122,.07)", borderRadius: 12, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 16 }}>🌿</span>
                      <span style={{ fontSize: 12, color: "#2b7d7a", fontWeight: 600 }}>Acceso gratuito — 1 semana completa</span>
                    </div>
                  )}
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-[0.05em]">Nombre</Label>
                      <Input
                        type="text"
                        placeholder="Tu nombre"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="bg-[#F5F5F7] border-0 h-12 rounded-xl text-[#1D1D1F] placeholder:text-[#AEAEB2] focus-visible:ring-1 focus-visible:ring-primary/40"
                        required
                        data-testid="input-register-name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-[0.05em]">Email</Label>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="bg-[#F5F5F7] border-0 h-12 rounded-xl text-[#1D1D1F] placeholder:text-[#AEAEB2] focus-visible:ring-1 focus-visible:ring-primary/40"
                        required
                        data-testid="input-register-email"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-[0.05em]">Contraseña</Label>
                      <div className="relative">
                        <Input
                          type={showRegPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className="bg-[#F5F5F7] border-0 h-12 rounded-xl text-[#1D1D1F] pr-11 focus-visible:ring-1 focus-visible:ring-primary/40"
                          required
                          data-testid="input-register-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AEAEB2] hover:text-[#6E6E73]"
                        >
                          {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    {regError && <p className="text-red-500 text-sm">{regError}</p>}
                    <Button
                      type="submit"
                      disabled={regLoading}
                      className="w-full bg-[#1D1D1F] text-white hover:bg-black rounded-full h-12 font-medium text-[15px] mt-2 disabled:opacity-60"
                      data-testid="button-register-submit"
                    >
                      {regLoading ? "Creando cuenta…" : "Crear Cuenta"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
