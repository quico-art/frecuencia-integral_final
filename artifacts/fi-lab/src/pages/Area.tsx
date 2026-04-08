import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { getAuth, setAuth, logout } from "@/lib/auth";
import { activatePlan } from "@/lib/checkout";
import { Link } from "wouter";
import { useContent } from "@/hooks/useContent";
import { ArrowLeft, ChevronUp, Pencil, ExternalLink, Users, BarChart3, Shield, RefreshCw, Search, ChevronDown } from "lucide-react";
import Dashboard from "./area/Dashboard";
import Semanas from "./area/Semanas";
import Multimedia from "./area/Multimedia";
import MaterialesPDF from "./area/MaterialesPDF";
import Progreso from "./area/Progreso";
import Diario from "./area/Diario";
import Arteterapia from "./area/Arteterapia";
import Comunidad from "./area/Comunidad";
import type { WeekDetail } from "@/lib/data";

export type AreaTab =
  | "dashboard"
  | "semanas"
  | "multimedia"
  | "pdf"
  | "progreso"
  | "diario"
  | "arteterapia"
  | "comunidad"
  | "admin";

export type WeekSidebarTab =
  | "descripcion"
  | "conceptos"
  | "ejercicio"
  | "arteterapia"
  | "multimedia"
  | "materiales"
  | "diario"
  | "completar";

const sidebarTabs: { id: AreaTab; label: string; icon: string }[] = [
  { id: "dashboard",   label: "Inicio",      icon: "🏠" },
  { id: "semanas",     label: "Formaciones",  icon: "📚" },
  { id: "arteterapia", label: "Arteterapia",  icon: "🎨" },
  { id: "multimedia",  label: "Multimedia",   icon: "🎵" },
  { id: "pdf",         label: "Materiales",   icon: "📄" },
  { id: "diario",      label: "Diario",       icon: "📝" },
  { id: "comunidad",   label: "Comunidad",    icon: "💬" },
  { id: "progreso",    label: "Progreso",     icon: "📊" },
];

const weekSidebarItems: { id: WeekSidebarTab; label: string; icon: string }[] = [
  { id: "descripcion", label: "Descripción",  icon: "📋" },
  { id: "conceptos",   label: "Conceptos",    icon: "💡" },
  { id: "ejercicio",   label: "Ejercicios",   icon: "📈" },
  { id: "arteterapia", label: "Arteterapia",  icon: "🎨" },
  { id: "multimedia",  label: "Multimedia",   icon: "🎵" },
  { id: "materiales",  label: "Materiales",   icon: "📄" },
  { id: "diario",      label: "Diario",       icon: "📓" },
  { id: "completar",   label: "Completar",    icon: "✅" },
];


const gold = "#BC9640";
const teal = "#2b7d7a";

/* ══ AdminPanel types ════════════════════════════════════════ */
type AdminUser = {
  id: string; email: string; name: string;
  role: string; plan: string; createdAt: string;
  lastSignIn: string | null; emailConfirmed: boolean;
  currentWeek: number | null; totalCompleted: number | null;
};

/* ══ AdminPanel component ═══════════════════════════════════ */
function AdminPanel({ onGoEditor }: { onGoEditor: () => void }) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPlan, setEditPlan] = useState("");
  const [editRole, setEditRole] = useState("");
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const API = "/api";

  const loadUsers = useCallback(async () => {
    setLoading(true); setApiError(null);
    try {
      const r = await fetch(`${API}/admin/users`);
      if (!r.ok) { const t = await r.text(); throw new Error(t); }
      const d = await r.json();
      setUsers(d.users ?? []);
    } catch (e: any) {
      setApiError(e.message ?? "Error cargando usuarios");
    } finally { setLoading(false); }
  }, [API]);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  async function savePlan() {
    if (!editingId) return;
    setSaving(true);
    try {
      await fetch(`${API}/admin/users/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: editPlan, role: editRole }),
      });
      setEditingId(null);
      await loadUsers();
    } finally { setSaving(false); }
  }

  const filtered = users.filter(u =>
    search === "" ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const thisMonth = users.filter(u => {
    const d = new Date(u.createdAt);
    const n = new Date();
    return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
  }).length;

  function fmtDate(iso: string | null) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "2-digit" });
  }

  const planColors: Record<string, { bg: string; color: string; border: string }> = {
    oro:   { bg: `${gold}18`,   color: gold,    border: `${gold}40` },
    plata: { bg: "#8E8E9318",   color: "#8E8E93", border: "#8E8E9344" },
    libre: { bg: "#F5F5F7",     color: "#6E6E73", border: "#E8E8ED" },
    admin: { bg: "#1D1D1F",     color: gold,    border: `${gold}44` },
  };

  const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
  const SER  = "'Playfair Display', Georgia, serif";

  return (
    <div style={{ fontFamily: FONT }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Shield size={18} style={{ color: gold }} />
            <h1 style={{ fontFamily: SER, fontSize: 24, fontWeight: 400, color: "#1D1D1F", margin: 0 }}>
              Panel <em style={{ color: gold }}>Admin</em>
            </h1>
          </div>
          <p style={{ fontSize: 12, color: "#6E6E73", margin: 0 }}>Frecuencia Integral Academy</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={loadUsers}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: teal, background: `${teal}10`, border: `1px solid ${teal}40`, padding: "7px 14px", borderRadius: 9999, cursor: "pointer", transition: "all .15s" }}
          >
            <RefreshCw size={12} /> Actualizar
          </button>
          <button
            onClick={onGoEditor}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#6E6E73", background: "#F5F5F7", border: "1px solid #E8E8ED", padding: "7px 14px", borderRadius: 9999, cursor: "pointer", transition: "all .15s" }}
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Alumnos Totales",    value: loading ? "…" : users.length,    icon: <Users size={14} /> },
          { label: "Este mes",           value: loading ? "…" : thisMonth,       icon: <BarChart3 size={14} /> },
          { label: "Con plan oro",       value: loading ? "…" : users.filter(u => u.plan === "oro").length, icon: "✦" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1px solid #E8E8ED", borderRadius: 14, padding: "20px 16px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
            <div style={{ color: gold, marginBottom: 6, display: "flex", justifyContent: "center", fontSize: 16 }}>{s.icon}</div>
            <div style={{ fontFamily: SER, fontSize: 34, fontWeight: 300, color: "#1D1D1F", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#86868B", textTransform: "uppercase", letterSpacing: ".09em", marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Users table card ── */}
      <div style={{ background: "#fff", border: "1px solid #E8E8ED", borderRadius: 16, boxShadow: "0 1px 6px rgba(0,0,0,.04)", overflow: "hidden" }}>

        {/* Card header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #F0F0F5" }}>
          <h2 style={{ fontFamily: SER, fontSize: 16, fontWeight: 400, color: "#1D1D1F", margin: 0 }}>Alumnos Registrados</h2>
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#AEAEB2" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar alumno…"
              style={{ paddingLeft: 30, paddingRight: 12, height: 34, borderRadius: 9999, border: "1px solid #E8E8ED", fontSize: 12, fontFamily: FONT, background: "#F9F9FB", outline: "none", color: "#1D1D1F", width: 180 }}
            />
          </div>
        </div>

        {/* Error */}
        {apiError && (
          <div style={{ margin: "12px 20px", background: "#FFF0F0", border: "1px solid #FFCCC9", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#C0392B" }}>
            {apiError}
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div style={{ padding: "48px 0", textAlign: "center", fontSize: 13, color: "#86868B" }}>Cargando usuarios…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "48px 0", textAlign: "center", fontSize: 13, color: "#86868B" }}>Sin resultados para «{search}»</div>
        ) : (
          <>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 1fr 1.2fr 1fr", gap: 0, background: "#F9F9FB", padding: "8px 20px", borderBottom: "1px solid #F0F0F5" }}>
              {["Alumno", "Email", "Plan", "Progreso", "Registro"].map(h => (
                <div key={h} style={{ fontSize: 9, fontWeight: 800, color: "#AEAEB2", textTransform: "uppercase", letterSpacing: ".1em" }}>{h}</div>
              ))}
            </div>

            {/* Rows */}
            {filtered.map((u, i) => {
              const pc = planColors[u.plan] ?? planColors["libre"];
              const isEditing = editingId === u.id;
              const isExpanded = expandedId === u.id;
              const progPct = u.totalCompleted != null ? Math.round((u.totalCompleted / 48) * 100) : null;
              return (
                <div key={u.id}>
                  <div
                    style={{
                      display: "grid", gridTemplateColumns: "2fr 3fr 1fr 1.2fr 1fr",
                      gap: 0, padding: "14px 20px", alignItems: "center",
                      borderBottom: i < filtered.length - 1 ? "1px solid #F5F5F7" : "none",
                      cursor: "pointer", transition: "background .1s",
                    }}
                    onClick={() => setExpandedId(isExpanded ? null : u.id)}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F9F9FB"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {/* Nombre */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${gold},#D4AA5A)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                        {(u.name || u.email).charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>{u.name || "—"}</span>
                    </div>
                    {/* Email */}
                    <div style={{ fontSize: 12, color: "#6E6E73", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                    {/* Plan */}
                    <div>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 9999, background: pc.bg, color: pc.color, border: `1px solid ${pc.border}` }}>
                        {u.plan === "oro" ? "✦ " : ""}{u.plan.charAt(0).toUpperCase() + u.plan.slice(1)}
                      </span>
                    </div>
                    {/* Progreso */}
                    <div>
                      {progPct != null ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ flex: 1, height: 5, background: "#F0F0F5", borderRadius: 9999, overflow: "hidden", maxWidth: 60 }}>
                            <div style={{ height: "100%", background: gold, borderRadius: 9999, width: `${progPct}%`, transition: "width .3s" }} />
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: gold, whiteSpace: "nowrap" }}>
                            S.{u.currentWeek ?? "?"} · {progPct}%
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontSize: 11, color: "#AEAEB2" }}>Sin datos</span>
                      )}
                    </div>
                    {/* Registro */}
                    <div style={{ fontSize: 11, color: "#86868B" }}>{fmtDate(u.createdAt)}</div>
                  </div>

                  {/* Expanded row: edit plan/role */}
                  {isExpanded && (
                    <div style={{ padding: "12px 20px 16px", borderBottom: "1px solid #F0F0F5", background: "#FAFAF8" }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                        <div>
                          <label style={{ fontSize: 10, fontWeight: 700, color: "#86868B", letterSpacing: ".06em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Plan</label>
                          {isEditing ? (
                            <select
                              value={editPlan}
                              onChange={e => setEditPlan(e.target.value)}
                              style={{ background: "#fff", color: "#1D1D1F", border: "1px solid #E8E8ED", borderRadius: 8, fontSize: 12, padding: "6px 10px", fontFamily: FONT }}
                            >
                              {["libre", "plata", "oro", "admin"].map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                          ) : (
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#1D1D1F" }}>{u.plan}</span>
                          )}
                        </div>
                        <div>
                          <label style={{ fontSize: 10, fontWeight: 700, color: "#86868B", letterSpacing: ".06em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Rol</label>
                          {isEditing ? (
                            <select
                              value={editRole}
                              onChange={e => setEditRole(e.target.value)}
                              style={{ background: "#fff", color: "#1D1D1F", border: "1px solid #E8E8ED", borderRadius: 8, fontSize: 12, padding: "6px 10px", fontFamily: FONT }}
                            >
                              {["user", "admin"].map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                          ) : (
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#1D1D1F" }}>{u.role}</span>
                          )}
                        </div>
                        <div>
                          <label style={{ fontSize: 10, fontWeight: 700, color: "#86868B", letterSpacing: ".06em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Último acceso</label>
                          <span style={{ fontSize: 12, color: "#6E6E73" }}>{fmtDate(u.lastSignIn)}</span>
                        </div>
                        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                          {isEditing ? (
                            <>
                              <button
                                onClick={savePlan}
                                disabled={saving}
                                style={{ background: gold, color: "#fff", border: "none", borderRadius: 9999, fontSize: 12, fontWeight: 700, padding: "7px 18px", cursor: "pointer", opacity: saving ? 0.7 : 1 }}
                              >
                                {saving ? "Guardando…" : "Guardar"}
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                style={{ background: "#F5F5F7", color: "#6E6E73", border: "1px solid #E8E8ED", borderRadius: 9999, fontSize: 12, padding: "7px 14px", cursor: "pointer" }}
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => { setEditingId(u.id); setEditPlan(u.plan); setEditRole(u.role); }}
                              style={{ background: `${gold}12`, color: gold, border: `1px solid ${gold}40`, borderRadius: 9999, fontSize: 12, fontWeight: 600, padding: "7px 16px", cursor: "pointer" }}
                            >
                              Editar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* ── Editor del sitio ── */}
      <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
        <button
          onClick={onGoEditor}
          style={{ display: "flex", alignItems: "center", gap: 8, background: `${gold}10`, color: gold, border: `1px solid ${gold}40`, borderRadius: 12, padding: "12px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT, flex: 1, justifyContent: "center" }}
        >
          <Pencil size={14} /> Editor visual del sitio
        </button>
        <button
          onClick={() => window.open("https://supabase.com/dashboard/project/jtwbbyjspanirbsuoipa/auth/users", "_blank")}
          style={{ display: "flex", alignItems: "center", gap: 8, background: `${teal}0D`, color: teal, border: `1px solid ${teal}40`, borderRadius: 12, padding: "12px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}
        >
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}

export default function Area() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<AreaTab>("dashboard");
  const [auth, setAuthState] = useState(getAuth());
  const [paidBanner, setPaidBanner] = useState<{ plan: string } | null>(null);
  const [paidError, setPaidError] = useState<string | null>(null);
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const [tabScroll, setTabScroll] = useState({ ratio: 0, thumbW: 0.3 });

  const measureAreaTabs = () => {
    const el = tabScrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setTabScroll({
      ratio: max > 0 ? el.scrollLeft / max : 0,
      thumbW: max > 0 ? el.clientWidth / el.scrollWidth : 1,
    });
  };

  useEffect(() => {
    const id = requestAnimationFrame(measureAreaTabs);
    return () => cancelAnimationFrame(id);
  }, [activeTab]);

  const scrollTabs = (dir: -1 | 1) => {
    if (tabScrollRef.current) tabScrollRef.current.scrollBy({ left: dir * 130, behavior: "smooth" });
  };

  const [selectedWeek, setSelectedWeek] = useState<WeekDetail | null>(null);
  const [weekSidebarTab, setWeekSidebarTab] = useState<WeekSidebarTab>("descripcion");

  useEffect(() => {
    if (!auth.isLoggedIn) setLocation("/login");
  }, [auth.isLoggedIn, setLocation]);

  /* Handle Stripe return: ?paid=ok&plan=blanca&session_id=cs_xxx */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") !== "ok") return;

    const sessionId = params.get("session_id") ?? "";
    const currentAuth = getAuth();

    if (!currentAuth.isLoggedIn || !currentAuth.userId) return;

    activatePlan(sessionId, currentAuth.userId)
      .then(({ plan }) => {
        const updated = { ...currentAuth, plan } as typeof currentAuth;
        setAuth(updated);
        setAuthState(updated);
        setPaidBanner({ plan });
        /* clean URL so banner doesn't reappear on reload */
        window.history.replaceState({}, "", window.location.pathname);
      })
      .catch((err) => {
        console.error("Plan activation error:", err);
        setPaidError("No se pudo activar el plan automáticamente. Contacta con soporte.");
        window.history.replaceState({}, "", window.location.pathname);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    await logout();
    setLocation("/");
  }

  function handleMainTab(tab: AreaTab) {
    setActiveTab(tab);
    if (tab !== "semanas") setSelectedWeek(null);
    setTimeout(() => document.querySelector(".fi-main-content")?.scrollTo({ top: 0 }), 0);
  }

  function handleWeekSelect(week: WeekDetail | null) {
    setSelectedWeek(week);
    if (week) {
      setWeekSidebarTab("descripcion");
      setActiveTab("semanas");
      setTimeout(() => document.querySelector(".fi-main-content")?.scrollTo({ top: 0 }), 0);
    }
  }

  /* Fix: no double setSelectedWeek — handleMainTab already clears it */
  function handleWeekSidebarTab(item: WeekSidebarTab) {
    if (item === "diario") { handleMainTab("diario"); return; }
    setWeekSidebarTab(item);
    setTimeout(() => document.querySelector(".fi-main-content")?.scrollTo({ top: 0 }), 0);
  }

  const [navInicio]       = useContent("area.nav.inicio",       "Inicio");
  const [navFormaciones]  = useContent("area.nav.formaciones",  "Formaciones");
  const [navArteterapia]  = useContent("area.nav.arteterapia",  "Arteterapia");
  const [navMultimedia]   = useContent("area.nav.multimedia",   "Multimedia");
  const [navMateriales]   = useContent("area.nav.materiales",   "Materiales");
  const [navDiario]       = useContent("area.nav.diario",       "Diario");
  const [navComunidad]    = useContent("area.nav.comunidad",    "Comunidad");
  const [navProgreso]     = useContent("area.nav.progreso",     "Progreso");
  const [navAreaTitle]    = useContent("area.nav.areaTitle",    "Área de Alumnos");

  const navLabels: Record<string, string> = {
    dashboard:   navInicio,
    semanas:     navFormaciones,
    arteterapia: navArteterapia,
    multimedia:  navMultimedia,
    pdf:         navMateriales,
    diario:      navDiario,
    comunidad:   navComunidad,
    progreso:    navProgreso,
  };

  if (!auth.isLoggedIn) return null;

  const inWeekView = activeTab === "semanas" && selectedWeek !== null;

  /* ── Sidebar ── */
  const sidebarContent = inWeekView ? (
    /* ── WEEK SIDEBAR ── */
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Week info card */}
      <div style={{ padding: "12px 12px 12px", borderBottom: "1px solid #E8E8ED", flexShrink: 0 }}>
        {/* Back button — prominent */}
        <button
          onClick={() => setSelectedWeek(null)}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "#1D1D1F";
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "#F0F0F5";
            (e.currentTarget as HTMLElement).style.color = "#1D1D1F";
          }}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            width: "100%", padding: "9px 13px",
            background: "#F0F0F5", color: "#1D1D1F",
            border: "none", borderRadius: 10,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            marginBottom: 10, transition: "all .15s",
            letterSpacing: ".01em",
          }}
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Volver a las semanas
        </button>

        {/* Week info pill */}
        <div style={{ background: "#F5F5F7", borderRadius: 10, padding: "10px 12px" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: teal, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4 }}>
            Semana {selectedWeek.n}
          </p>
          <p style={{ fontSize: 11, color: "#1D1D1F", lineHeight: 1.45, fontWeight: 500 }}>
            {selectedWeek.title}
          </p>
        </div>
      </div>

      {/* Week nav items */}
      <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
        {weekSidebarItems.map((item) => {
          const isActive = weekSidebarTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleWeekSidebarTab(item.id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "8px 11px",
                borderRadius: 9,
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 9,
                transition: "all .12s",
                background: isActive ? `${teal}15` : "transparent",
                color: isActive ? teal : "#3A3A3C",
                marginBottom: 1,
              }}
              onMouseEnter={e => !isActive && ((e.currentTarget as HTMLElement).style.background = "#F5F5F7")}
              onMouseLeave={e => !isActive && ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <span style={{ fontSize: 14, width: 20, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  ) : (
    /* ── MAIN SIDEBAR ── */
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* User card */}
      <div style={{ padding: "16px 12px 14px", borderBottom: "1px solid #E8E8ED", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
            background: `linear-gradient(135deg, ${teal}, #3a9e9b)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "#fff",
          }}>
            {(auth.name || "A").charAt(0).toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{auth.name}</p>
            <p style={{ fontSize: 11, color: "#86868B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{auth.email || "alumno@tct.es"}</p>
          </div>
        </div>
        {(() => {
          const plan = auth.plan ?? "libre";
          const planMap: Record<string, { label: string; bg: string; color: string }> = {
            libre:  { label: "ACCESO LIBRE · SEM. 1", bg: `linear-gradient(135deg,${teal},#3a9e9b)`, color: "#fff" },
            oro:    { label: "PLAN ORO · ACCESO TOTAL",  bg: `linear-gradient(135deg,${gold},#D4AA5A)`,   color: "#fff" },
            plata:  { label: "PLAN PLATA",               bg: "linear-gradient(135deg,#8E8E93,#AEAEB2)",   color: "#fff" },
            admin:  { label: "ADMINISTRADOR",            bg: `linear-gradient(135deg,#1D1D1F,#3A3A3C)`,   color: gold },
          };
          const p = planMap[plan] ?? planMap["libre"];
          return (
            <span style={{
              display: "inline-block",
              background: p.bg,
              color: p.color,
              fontSize: 9, fontWeight: 700, letterSpacing: ".06em",
              padding: "3px 9px", borderRadius: 9999,
              border: plan === "admin" ? `1px solid ${gold}55` : "none",
            }}>
              {p.label}
            </span>
          );
        })()}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
        {sidebarTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleMainTab(tab.id)}
              data-testid={`tab-${tab.id}`}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "8px 11px",
                borderRadius: 9,
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 9,
                transition: "all .12s",
                background: isActive ? `${teal}15` : "transparent",
                color: isActive ? teal : "#3A3A3C",
                marginBottom: 1,
              }}
              onMouseEnter={e => !isActive && ((e.currentTarget as HTMLElement).style.background = "#F5F5F7")}
              onMouseLeave={e => !isActive && ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <span style={{ fontSize: 14, width: 20, textAlign: "center", flexShrink: 0 }}>{tab.icon}</span>
              <span data-fi-key={`area.nav.${tab.id === "dashboard" ? "inicio" : tab.id === "semanas" ? "formaciones" : tab.id === "pdf" ? "materiales" : tab.id}`}>
                {navLabels[tab.id] ?? tab.label}
              </span>
            </button>
          );
        })}

        {/* Admin tab — solo visible para admins */}
        {auth.role === "admin" && (() => {
          const isActive = activeTab === "admin";
          return (
            <button
              onClick={() => handleMainTab("admin")}
              data-testid="tab-admin"
              style={{
                width: "100%", textAlign: "left", padding: "8px 11px", borderRadius: 9,
                fontSize: 13, fontWeight: isActive ? 600 : 400, border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 9,
                transition: "all .12s", marginTop: 8,
                background: isActive ? `${gold}18` : "rgba(188,150,64,.06)",
                color: isActive ? gold : "#795901",
              }}
              onMouseEnter={e => !isActive && ((e.currentTarget as HTMLElement).style.background = `${gold}12`)}
              onMouseLeave={e => !isActive && ((e.currentTarget as HTMLElement).style.background = `${gold}06`)}
            >
              <Shield size={14} style={{ width: 20, flexShrink: 0 }} />
              <span>Admin</span>
            </button>
          );
        })()}
      </nav>

      {/* Salir */}
      <div style={{ padding: "8px 8px 16px", borderTop: "1px solid #E8E8ED", flexShrink: 0 }}>
        <button
          onClick={handleLogout}
          data-testid="button-logout-sidebar"
          style={{
            width: "100%", textAlign: "left", padding: "8px 11px", borderRadius: 9,
            fontSize: 13, fontWeight: 400, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 9,
            background: "transparent", color: "#86868B",
            transition: "all .12s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F5F5F7"; (e.currentTarget as HTMLElement).style.color = "#3A3A3C"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#86868B"; }}
        >
          <span style={{ fontSize: 14, width: 20, textAlign: "center", flexShrink: 0 }}>🚪</span>
          <span>Salir</span>
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#ffffff", color: "#1D1D1F", overflow: "hidden" }}>

      {/* ── Paid success banner ── */}
      {paidBanner && (
        <div style={{ background: "#1D1D1F", color: "#fff", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexShrink: 0, zIndex: 60 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>
            ✅ ¡Acceso activado! Tu plan <strong style={{ textTransform: "capitalize" }}>Puerta {paidBanner.plan === "oro" ? "Oro" : paidBanner.plan.charAt(0).toUpperCase() + paidBanner.plan.slice(1)}</strong> ya está activo.
          </span>
          <button onClick={() => setPaidBanner(null)} style={{ background: "none", border: "none", color: "#fff", fontSize: 18, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
      )}

      {/* ── Paid error banner ── */}
      {paidError && (
        <div style={{ background: "#C54B3A", color: "#fff", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexShrink: 0, zIndex: 60 }}>
          <span style={{ fontSize: 13 }}>{paidError}</span>
          <button onClick={() => setPaidError(null)} style={{ background: "none", border: "none", color: "#fff", fontSize: 18, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
      )}

      {/* ── Top Nav ── */}
      <header style={{
        background: "rgba(255,255,255,.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        flexShrink: 0,
        zIndex: 50,
      }}>
        <div className="fi-topbar" style={{ padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>

            {/* LEFT: title always at left edge */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: gold }}>✦</span>
              <span data-fi-key="area.nav.areaTitle" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500, fontSize: 15, color: "#1D1D1F" }}>
                {navAreaTitle}
              </span>
            </div>

            {/* RIGHT: from left-to-right on screen = Editar | Academia | Salir */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {auth.role === "admin" && (
                <button
                  onClick={() => setLocation("/")}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    fontSize: 12, fontWeight: 600, color: gold,
                    background: `${gold}12`, border: `1px solid ${gold}35`,
                    padding: "6px 10px", borderRadius: 9999, cursor: "pointer",
                    transition: "all .15s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${gold}22`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${gold}12`; }}
                  title="Editor visual del sitio"
                >
                  <Pencil size={11} />
                  <span className="fi-hide-mobile">Editar</span>
                </button>
              )}
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#6E6E73", textDecoration: "none", fontWeight: 500, padding: "6px 8px 6px 8px" }}>
                <ArrowLeft size={13} />
                <span>Academia</span>
              </Link>
              <span style={{ width: 1, height: 16, background: "#D2D2D7", flexShrink: 0, alignSelf: "center" }} />
              <button
                onClick={handleLogout}
                style={{ fontSize: 13, color: "#6E6E73", background: "none", border: "none", cursor: "pointer", fontWeight: 500, padding: "6px 8px" }}
                data-testid="button-logout"
              >
                Salir
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile tab strip (replaces bottom bar) ── */}
      {!inWeekView && (
        <div className="fi-mobile-tabs-wrap" style={{ display: "none", flexShrink: 0, background: "rgba(255,255,255,.96)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,0,0,.08)" }}>
          {/* Row 1: pills (native scrollbar hidden) */}
          <div
            ref={tabScrollRef}
            className="fi-mobile-tabs"
            onScroll={measureAreaTabs}
            style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as any, scrollbarWidth: "none" as any, paddingLeft: 16, paddingRight: 12, paddingTop: 10, paddingBottom: 6 }}
          >
            <div style={{ display: "flex", gap: 6, paddingRight: 16 }}>
              {sidebarTabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleMainTab(tab.id as AreaTab)}
                    style={{ flexShrink: 0, padding: "7px 13px", borderRadius: 9999, border: "none", background: isActive ? gold : "#F2F2F7", color: isActive ? "#fff" : "#6E6E73", fontSize: 12, fontWeight: isActive ? 600 : 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", transition: "color .15s, background .15s" }}
                  >
                    <span>{tab.icon}</span>
                    <span>{(navLabels[tab.id] ?? tab.label).split(" ")[0]}</span>
                  </button>
                );
              })}
              {auth.role === "admin" && (
                <button
                  onClick={() => handleMainTab("admin" as AreaTab)}
                  style={{ flexShrink: 0, padding: "7px 13px", borderRadius: 9999, border: "none", background: activeTab === "admin" ? gold : "#F2F2F7", color: activeTab === "admin" ? "#fff" : "#6E6E73", fontSize: 12, fontWeight: activeTab === "admin" ? 600 : 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", transition: "color .15s, background .15s" }}
                >
                  <span>🛡️</span>
                  <span>Admin</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 2: custom scrollbar — ‹ [track+thumb] › */}
          <div style={{ display: "flex", alignItems: "center", padding: "0 4px 7px", gap: 2 }}>
            <button onClick={() => scrollTabs(-1)} style={{ flexShrink: 0, width: 22, height: 18, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", cursor: "pointer", color: "#8E8E93", fontSize: 15, lineHeight: 1, padding: 0 }}>‹</button>
            <div style={{ flex: 1, height: 5, background: "#EBEBEB", borderRadius: 3, position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: 0, height: "100%",
                left: `${tabScroll.ratio * (1 - tabScroll.thumbW) * 100}%`,
                width: `${Math.max(tabScroll.thumbW * 100, 15)}%`,
                background: "#8E8E93", borderRadius: 3,
                transition: "left .08s",
              }} />
            </div>
            <button onClick={() => scrollTabs(1)} style={{ flexShrink: 0, width: 22, height: 18, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", cursor: "pointer", color: "#8E8E93", fontSize: 15, lineHeight: 1, padding: 0 }}>›</button>
          </div>
        </div>
      )}

      {/* ── Body: Sidebar + Content ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── Desktop Sidebar ── */}
        <aside
          className="fi-sidebar"
          style={{
            width: 196,
            flexShrink: 0,
            background: "#ffffff",
            borderRight: "1px solid #E8E8ED",
            overflowY: "auto",
            display: "none",
          }}
        >
          {sidebarContent}
        </aside>

        {/* ── Main content ── */}
        <main className="fi-main-content" style={{ flex: 1, overflowY: "auto", padding: "28px 28px 28px" }}>
          {activeTab === "dashboard"   && <Dashboard auth={auth} onTabChange={(t) => handleMainTab(t as AreaTab)} onWeekNavigate={(w) => handleWeekSelect(w)} />}
          {activeTab === "semanas"     && (
            <Semanas
              selectedWeek={selectedWeek}
              onWeekSelect={handleWeekSelect}
              weekSidebarTab={weekSidebarTab}
              onWeekSidebarTabChange={setWeekSidebarTab}
            />
          )}
          {activeTab === "multimedia"  && <Multimedia />}
          {activeTab === "pdf"         && <MaterialesPDF />}
          {activeTab === "progreso"    && <Progreso />}
          {activeTab === "diario"      && <Diario />}
          {activeTab === "arteterapia" && <Arteterapia />}
          {activeTab === "comunidad"   && <Comunidad />}
          {activeTab === "admin"       && auth.role === "admin" && <AdminPanel onGoEditor={() => setLocation("/")} />}
        </main>
      </div>


      <style>{`
        @media (min-width: 768px) {
          .fi-sidebar { display: flex !important; flex-direction: column; }
          .fi-mobile-tabs-wrap { display: none !important; }
          .fi-hide-mobile { display: inline !important; }
          .fi-show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .fi-sidebar { display: none !important; }
          .fi-mobile-tabs-wrap { display: block !important; }
          .fi-hide-mobile { display: none !important; }
          .fi-show-mobile { display: inline !important; }
          .fi-main-content { padding: 16px 16px 24px !important; }
          .fi-topbar { padding: 0 12px !important; }
          .fi-mobile-tabs::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </div>
  );
}
