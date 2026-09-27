import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, Route as WouterRoute, Switch, useLocation } from "wouter";
import {
  Activity,
  ArrowRight,
  ArrowDownUp,
  ArrowUpRight,
  Bell,
  Bot,
  BookOpen,
  Check,
  CircleCheck,
  CircleX,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Clock4,
  Copy,
  Crosshair,
  Cpu,
  Eye,
  ExternalLink,
  FileText,
  Fingerprint,
  Gauge,
  Globe2,
  Grid2X2,
  KeyRound,
  LayoutDashboard,
  Link2,
  Mail,
  Loader2,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Play,
  Plus,
  Radio,
  RefreshCw,
  Route as RouteIcon,
  Rocket,
  Search,
  Send,
  ShieldAlert,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  TrendingDown,
  TriangleAlert,
  UserRound,
  X,
} from "lucide-react";

type IconType = typeof Activity;
const Route = RouteIcon;

const navItems: { label: string; href: string; icon: IconType; hint: string }[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, hint: "Live system" },
  { label: "Command", href: "/command", icon: Activity, hint: "Model telemetry" },
  { label: "Signals", href: "/signals", icon: Radio, hint: "Intake & review" },
  { label: "Lwazi", href: "/lwazi", icon: Bot, hint: "Personal insight" },
  { label: "Execution (Multi-Chain)", href: "/execution", icon: RouteIcon, hint: "Order control" },
  { label: "Onboarding", href: "/onboarding", icon: Rocket, hint: "Setup flow" },
  { label: "Settings", href: "/settings", icon: Settings2, hint: "Preferences" },
  { label: "States", href: "/states", icon: Grid2X2, hint: "UI patterns" },
];
const settingsItems: { key: string; icon: IconType; label: string }[] = [
  { key: "profile", icon: UserRound, label: "Personal info" },
  { key: "security", icon: ShieldCheck, label: "Security" },
  { key: "connections", icon: Link2, label: "Webhooks & API" },
  { key: "notifications", icon: Bell, label: "Notifications" },
];
const stateItems: { key: string; icon: IconType; label: string }[] = [
  { key: "empty", icon: FileText, label: "Empty" },
  { key: "loading", icon: Loader2, label: "Loading" },
  { key: "success", icon: Check, label: "Success" },
  { key: "error", icon: TriangleAlert, label: "Failure" },
];

const activityItems = [
  { id: "a1", tag: "TRADE ROUTE", title: "EURUSD alert routed to MT5", detail: "Breakout rule / London session", time: "2 min ago", color: "teal", icon: Radio },
  { id: "a2", tag: "LWAZI", title: "Decision brief prepared", detail: "3 signals · 1 conflict surfaced", time: "18 min ago", color: "purple", icon: Bot },
  { id: "a3", tag: "PRODUCTIVITY", title: "Deep work window closed", detail: "1h 42m · 86% focus score", time: "43 min ago", color: "blue", icon: Target },
  { id: "a4", tag: "ASSET", title: "Sui asset watchlist synced", detail: "12 collections monitored", time: "1h ago", color: "magenta", icon: Network },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`nomo-logo ${compact ? "nomo-logo-compact" : ""}`} data-testid="brand-nomo">
      {compact ? (
        <span className="nomo-mark" aria-hidden="true"><i /><i /><i /></span>
      ) : (
        <img className="nomo-logo-image" src="/assets/nomolabs-logo-dark.jpg" alt="NOMO Labs" />
      )}
    </div>
  );
}

function StatusDot({ color = "teal" }: { color?: string }) {
  return <span className={`status-dot status-${color}`} aria-hidden="true" />;
}

function Sparkline({ color = "purple", down = false }: { color?: string; down?: boolean }) {
  return (
    <svg className={`sparkline spark-${color}`} viewBox="0 0 130 42" preserveAspectRatio="none" aria-hidden="true">
      <path d={down ? "M1 8 C15 9, 18 22, 28 20 S44 12, 54 24 S67 29, 76 22 S90 27, 102 30 S118 27, 129 39" : "M1 36 C11 34, 18 29, 26 31 S39 18, 48 22 S60 16, 69 19 S79 8, 90 13 S103 4, 111 8 S121 3, 129 4"} />
    </svg>
  );
}

function MetricCard({ label, value, delta, meta, color, down = false }: { label: string; value: string; delta: string; meta: string; color: string; down?: boolean }) {
  return (
    <article className="metric-card surface" data-testid={`card-metric-${label.toLowerCase().replaceAll(" ", "-")}`}>
      <div className="metric-top"><span className="eyebrow">{label}</span><span className={`delta ${down ? "delta-down" : ""}`}>{delta}</span></div>
      <div className="metric-value">{value}</div>
      <div className="metric-foot"><span>{meta}</span><Sparkline color={color} down={down} /></div>
    </article>
  );
}

function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileNav, setMobileNav] = useState(false);
  const [rail, setRail] = useState(true);
  const [view, setView] = useState<"live" | "blueprint">("live");
  const current = navItems.find((item) => item.href === location)?.label ?? "Overview";
  return (
    <div className={`app-frame ${rail ? "" : "rail-collapsed"}`} data-testid="app-shell">
      <aside className={`sidebar ${mobileNav ? "mobile-open" : ""}`}>
        <div className="sidebar-head"><Link href="/dashboard" data-testid="link-dashboard-brand"><Logo /></Link><button className="icon-button mobile-only" onClick={() => setMobileNav(false)} aria-label="Close navigation" data-testid="button-close-navigation"><X size={18} /></button></div>
        <div className="workspace-switcher"><div className="workspace-avatar">AK</div><div className="workspace-copy"><strong>Ayo K.</strong><span>Personal command center</span></div><ChevronDown size={14} /></div>
        <div className="nav-label">CONTROL CENTER</div>
        <nav className="side-nav">
          {navItems.map(({ label, href, icon: Icon, hint }) => (
            <Link key={href} href={href} onClick={() => setMobileNav(false)} className={`side-link ${location === href ? "side-link-active" : ""}`} data-testid={`link-nav-${label.toLowerCase()}`}>
              <Icon size={17} /><span>{label}</span>{location === href ? <StatusDot /> : <small>{hint}</small>}
            </Link>
          ))}
        </nav>
        <div className="nav-label nav-label-lower">SYSTEMS</div>
        <div className="system-card"><div className="system-icon"><Cpu size={16} /></div><div><strong>Core online</strong><span><StatusDot color="teal" /> All routes healthy</span></div><MoreHorizontal size={15} className="muted-icon" /></div>
        <div className="sidebar-spacer" />
        <div className="sidebar-footer"><Link href="/info" onClick={() => setMobileNav(false)} className={`side-link ${location === "/info" ? "side-link-active" : ""}`} data-testid="link-nav-platform-info"><Globe2 size={17} /><span>Platform info</span></Link><button className="side-link" onClick={() => alert("NOMO support is ready for your question.")} data-testid="button-open-support"><CircleHelp size={17} /><span>Support</span></button><div className="profile-chip"><div className="avatar">AK</div><div><strong>Ayo K.</strong><span>Operator</span></div><MoreHorizontal size={16} /></div></div>
      </aside>
      {mobileNav && <button className="nav-scrim mobile-only" onClick={() => setMobileNav(false)} aria-label="Close navigation overlay" data-testid="button-navigation-overlay" />}
      <main className="main-canvas">
        <header className="topbar">
          <div className="topbar-left"><button className="icon-button mobile-only" onClick={() => setMobileNav(true)} aria-label="Open navigation" data-testid="button-open-navigation"><Menu size={19} /></button><button className="rail-toggle desktop-only" onClick={() => setRail(!rail)} aria-label="Toggle sidebar" data-testid="button-toggle-sidebar">{rail ? <PanelLeftClose size={17} /> : <PanelLeftOpen size={17} />}</button><div className="breadcrumb"><span>NOMO</span><ChevronRight size={14} /><strong>{current}</strong></div></div>
          <div className="topbar-actions"><div className="template-toggle" role="group" aria-label="Template view"><button className={view === "live" ? "selected" : ""} onClick={() => setView("live")} data-testid="button-view-live"><Eye size={14} /> Live surfaces</button><button className={view === "blueprint" ? "selected" : ""} onClick={() => setView("blueprint")} data-testid="button-view-blueprint"><Grid2X2 size={14} /> Blueprint</button></div><button className="icon-button has-indicator" aria-label="Notifications" onClick={() => alert("No new high-priority alerts.")} data-testid="button-notifications"><Bell size={17} /><i /></button><div className="topbar-status"><StatusDot /> <span>Synced</span></div></div>
        </header>
        {view === "blueprint" ? <BlueprintView /> : children}
      </main>
    </div>
  );
}

function BlueprintView() {
  return <div className="blueprint-page page-enter"><div className="page-heading"><div><span className="kicker">TEMPLATE GALLERY / BLUEPRINT</span><h1>System surfaces, mapped.</h1><p>Review the interaction language behind the live control center.</p></div><Link href="/dashboard" className="button button-primary" data-testid="button-return-live"><Eye size={16} /> Return to live</Link></div><div className="blueprint-grid">{["Signal-first metrics", "Autonomous routing", "Human supervision", "Quiet failure states", "Lwazi guidance", "Connection trust"].map((item, index) => <div className="blueprint-tile surface" key={item} data-testid={`tile-blueprint-${index}`}><span className="tile-index">0{index + 1}</span><div className={`blueprint-visual visual-${index}`}><span /><span /><span /></div><h3>{item}</h3><p>{["A glanceable read on what changed and why.", "Rules that turn alerts into deliberate actions.", "Every automation leaves a clear handoff.", "Recovery is a path, not a dead end.", "Context before confidence. Always.", "Make the invisible state legible."][index]}</p></div>)}</div></div>;
}

function LandingPage() {
  const [location, setLocation] = useLocation();
  const [menu, setMenu] = useState(false);
  return (
    <div className="landing-page grain">
      <nav className="landing-nav"><Link href="/" data-testid="link-landing-logo"><Logo /></Link><div className={`landing-links ${menu ? "landing-links-open" : ""}`}><a href="#systems" data-testid="link-landing-systems">Systems</a><a href="#lwazi" data-testid="link-landing-lwazi">Lwazi</a><a href="#principles" data-testid="link-landing-principles">Principles</a><Link href="/dashboard" data-testid="link-landing-preview">Preview control center</Link></div><button className="icon-button mobile-only" onClick={() => setMenu(!menu)} aria-label="Toggle menu" data-testid="button-toggle-landing-menu"><Menu size={19} /></button><button className="button button-small button-outline desktop-only" onClick={() => setLocation("/onboarding")} data-testid="button-landing-enter">Enter NOMO <ArrowRight size={14} /></button></nav>
      <section className="landing-hero">
        <div className="hero-copy"><div className="status-pill"><StatusDot /> <span>Private beta · human supervised</span></div><h1>Think clearer.<br /><em>Move earlier.</em></h1><p>NOMO is the quiet layer between your signal and your next decision. Productivity intelligence, trading automation, and Sui assets — in one precise control center.</p><div className="hero-actions"><button className="button button-primary button-large" onClick={() => setLocation("/onboarding")} data-testid="button-hero-start">Build your command center <ArrowRight size={17} /></button><Link href="/dashboard" className="text-link" data-testid="link-hero-preview">Explore the live preview <ChevronRight size={15} /></Link></div><div className="hero-note"><span className="micro-line" /> Designed for operators, not spectators.</div></div>
        <div className="hero-orbit" aria-label="NOMO autonomous systems visualization" data-testid="visual-hero-orbit"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core"><Logo compact /><span>LWAZI<br /><small>knowledge spirit</small></span></div><div className="orbit-node node-one">01 <span>focus</span></div><div className="orbit-node node-two">02 <span>signal</span></div><div className="orbit-node node-three">03 <span>route</span></div><div className="crosshair" /></div>
      </section>
      <div className="signal-strip"><span>OPERATING AT A GLANCE</span><div><strong>04</strong> decision systems</div><div><strong>12</strong> signal routes</div><div><strong>01</strong> human in loop</div><div className="signal-live"><StatusDot /> all systems nominal</div></div>
      <section className="landing-section systems-section" id="systems"><div className="section-intro"><span className="kicker">THE CONTROL CENTER</span><h2>One field of view.<br /><span>Every move accounted for.</span></h2><p>NOMO turns scattered tools into a decision surface that respects your attention. See the state, understand the context, choose the action.</p></div><div className="system-panels"><div className="system-panel panel-purple"><span className="panel-number">01 / PRODUCTIVITY</span><Gauge size={22} /><h3>Protect the work<br />that compounds.</h3><p>Focus windows, energy patterns, and the next best action — without another productivity scoreboard.</p><Link href="/dashboard" data-testid="link-system-productivity">View productivity layer <ArrowRight size={14} /></Link><div className="mini-chart chart-purple"><span /><span /><span /><span /><span /><span /><span /></div></div><div className="system-panel panel-teal"><span className="panel-number">02 / TRADING AUTOMATION</span><Terminal size={22} /><h3>Signal in.<br />Execution out.</h3><p>TradingView alerts become deliberate MT4 or MT5 actions with every route visible and auditable.</p><Link href="/settings" data-testid="link-system-trading">Inspect connection layer <ArrowRight size={14} /></Link><div className="terminal-lines"><i>TV_ALERT / EURUSD</i><i>RULESET / LONDON_BREAK</i><i className="live-line">→ MT5 / ORDER READY</i></div></div><div className="system-panel panel-blue"><span className="panel-number">03 / SUI ASSETS</span><Network size={22} /><h3>Digital ownership,<br />without the noise.</h3><p>Keep dummy Sui tokens and NFTs in the same decision context as your work and risk.</p><Link href="/dashboard" data-testid="link-system-assets">Open asset watch <ArrowRight size={14} /></Link><div className="asset-orbs"><span /><span /><span /></div></div></div></section>
      <section className="lwazi-section" id="lwazi"><div className="lwazi-visual"><div className="lwazi-ring ring-a" /><div className="lwazi-ring ring-b" /><div className="lwazi-glyph"><span /><span /><span /><span /></div></div><div className="lwazi-copy"><span className="kicker">04 / LWAZI</span><h2>A second mind.<br /><em>Never a louder one.</em></h2><p>Lwazi is NOMO's digital knowledge spirit — a calm layer that remembers your patterns, names the trade-offs, and keeps the question in view.</p><div className="quote">“The next move is smaller than it feels.”<span>— Lwazi, 09:42</span></div><Link href="/dashboard" className="text-link" data-testid="link-lwazi-preview">Meet Lwazi in the preview <ArrowRight size={15} /></Link></div></section>
      <section className="principles-section landing-section" id="principles"><span className="kicker">BUILT FOR HUMAN SUPERVISION</span><div className="principle-row"><div><strong>01</strong><h3>Legible by default</h3><p>Automation should explain itself before it acts.</p></div><div><strong>02</strong><h3>Fast, never frantic</h3><p>High signal density with space to make the call.</p></div><div><strong>03</strong><h3>Own your context</h3><p>Your systems, preferences, and decisions stay connected.</p></div></div></section>
      <footer className="landing-footer"><Logo /><span>Decision infrastructure for the next move.</span><div><Link href="/dashboard" data-testid="link-footer-dashboard">Dashboard</Link><Link href="/states" data-testid="link-footer-states">State library</Link></div></footer>
    </div>
  );
}

function DashboardPage() {
  const [timeframe, setTimeframe] = useState("1W");
  const chartPoints: Record<string, string> = { "1D": "M0 112 C28 104 45 116 68 92 S103 101 126 78 S156 89 177 61 S212 71 236 43 S272 50 302 24", "1W": "M0 119 C30 101 46 109 71 82 S103 96 126 67 S153 76 180 52 S211 63 238 39 S274 55 302 18", "1M": "M0 126 C28 122 46 90 70 103 S103 72 128 85 S163 54 186 61 S218 45 240 50 S274 22 302 29", ALL: "M0 105 C25 80 44 120 68 94 S102 112 125 69 S160 83 182 55 S215 72 238 40 S273 47 302 15" };
  const trades = [{ pair: "EURUSD", detail: "Long · 1.0824", pnl: "+$42.18", tone: "positive", time: "09:36" }, { pair: "BTC / USDT", detail: "Short · 69,180", pnl: "+$86.40", tone: "positive", time: "08:54" }, { pair: "SUI / USDC", detail: "Long · 1.14", pnl: "−$12.62", tone: "negative", time: "Yesterday" }];
  return <div className="page page-enter overview-page">
    <div className="page-heading dashboard-heading"><div><span className="kicker">PORTFOLIO / TUESDAY, 18 JUNE 2024 · 09:42 UTC</span><h1>Overview</h1><p>A clear read on capital, performance, and the moves already in motion.</p></div><div className="heading-actions"><button className="button button-outline" onClick={() => alert("Overview brief exported locally.")} data-testid="button-export-brief"><Copy size={15} /> Export brief</button><Link href="/lwazi" className="button button-primary" data-testid="link-overview-lwazi"><Bot size={15} /> Open Lwazi</Link></div></div>
    <section className="overview-hero surface" data-testid="card-net-worth">
      <div className="overview-hero-top"><div><span className="eyebrow">NET WORTH / PAPER PORTFOLIO</span><div className="net-worth-value">$24,870.60</div><span className="net-worth-delta"><TrendingUp size={14} /> +$684.20 <small>+2.83% this period</small></span></div><div className="portfolio-status"><StatusDot /> Valuation current<span>09:42:18 UTC</span></div></div>
      <div className="balance-stats"><div><span>Balance</span><strong>$16,458.20</strong></div><div><span>Invested</span><strong>$8,412.80</strong></div><div><span>Profit</span><strong className="positive">+$684.20</strong></div></div>
      <div className="overview-chart-head"><div><span className="eyebrow">PORTFOLIO PERFORMANCE</span><strong>Value movement</strong></div><div className="timeframe-tabs">{["1D", "1W", "1M", "ALL"].map((item) => <button className={timeframe === item ? "active" : ""} key={item} onClick={() => setTimeframe(item)} data-testid={`button-overview-timeframe-${item.toLowerCase()}`}>{item}</button>)}</div></div>
      <div className="overview-chart" data-testid="chart-overview-performance"><svg viewBox="0 0 302 145" preserveAspectRatio="none" aria-label={`Portfolio chart for ${timeframe}`}><defs><linearGradient id="overview-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#328ef2" stopOpacity=".28" /><stop offset="1" stopColor="#328ef2" stopOpacity="0" /></linearGradient></defs><path className="chart-area" d={`${chartPoints[timeframe]} L302 145 L0 145 Z`} /><path className="chart-line" d={chartPoints[timeframe]} /><line x1="0" y1="119" x2="302" y2="119" /><line x1="0" y1="78" x2="302" y2="78" /><line x1="0" y1="37" x2="302" y2="37" /></svg><div className="chart-axis"><span>09:00</span><span>12:00</span><span>15:00</span><span>Close</span></div></div>
    </section>
    <section className="overview-stat-strip surface" data-testid="strip-overview-stats"><div><span>Portfolio value</span><strong>$24,870.60</strong></div><div><span>Today’s return</span><strong className="positive">+2.83%</strong></div><div><span>Open positions</span><strong>03</strong></div></section>
    <section className="trades-panel surface"><div className="section-head"><div><span className="eyebrow">RECENT ACTIVITY</span><h2>Trades</h2></div><Link href="/execution" className="text-action" data-testid="link-overview-execution">View execution <ArrowRight size={13} /></Link></div><div className="overview-trade-list">{trades.map((trade) => <div className="overview-trade-row" key={trade.pair} data-testid={`row-overview-trade-${trade.pair.toLowerCase().replaceAll(" ", "-")}`}><div className="trade-symbol"><span>{trade.pair.slice(0, 2)}</span></div><div><strong>{trade.pair}</strong><small>{trade.detail}</small></div><time>{trade.time}</time><strong className={trade.tone}>{trade.pnl}</strong><ChevronRight size={15} className="muted-icon" /></div>)}</div></section>
  </div>;
}

function CommandPage() {
  const [range, setRange] = useState("1D");
  const [showAnnotations, setShowAnnotations] = useState(true);
  const focus = [62, 71, 68, 76, 81, 79, 86];
  return <div className="page page-enter command-page">
    <div className="page-heading"><div><span className="kicker">COMMAND / MODEL TELEMETRY</span><h1>Command</h1><p>Process discipline and model reasoning in one transparent view.</p></div><div className="command-readout"><StatusDot /> MODEL STATUS <strong>SATM / OBSERVING</strong></div></div>
    <div className="command-kpi-grid"><section className="command-kpi surface"><div className="section-head"><div><span className="eyebrow">FOCUS SCORE</span><h2>86 / 100</h2></div><span className="kpi-trend">+12.4%</span></div><div className="mini-trend" data-testid="chart-focus-trend">{focus.map((value, index) => <span key={value + index} style={{ height: `${value}%` }} />)}</div><small>7-day attention trend · strongest window 09:00–11:00</small></section><section className="command-kpi surface"><div className="section-head"><div><span className="eyebrow">TRADE ROUTES</span><h2>03 <small>/ 04 ready</small></h2></div><RouteIcon size={17} className="text-cyan" /></div><div className="route-summary"><span><StatusDot /> TradingView → MT5</span><span><StatusDot /> TradingView → MT4</span><span><StatusDot color="yellow" /> Webhook relay <em>needs attention</em></span></div></section><section className="command-kpi surface"><div className="section-head"><div><span className="eyebrow">DECISION DEBT</span><h2>02:14</h2></div><span className="kpi-trend debt">−18m</span></div><div className="debt-line"><span style={{ width: "38%" }} /></div><small>Since last review · below your 03:00 attention limit</small></section></div>
    <section className="reasoning-panel surface"><div className="reasoning-head"><div><span className="eyebrow">SATM / GLOBAL REASONING LAYER</span><h2>Market structure with model-authored context</h2><p>Annotations show what the model is watching. This is an explainability surface, not a manual trading terminal.</p></div><div className="reasoning-controls"><div className="timeframe-tabs">{["1D", "1W", "1M", "ALL"].map((item) => <button className={range === item ? "active" : ""} onClick={() => setRange(item)} key={item} data-testid={`button-command-timeframe-${item.toLowerCase()}`}>{item}</button>)}</div><button className={`annotation-toggle ${showAnnotations ? "active" : ""}`} onClick={() => setShowAnnotations(!showAnnotations)} data-testid="button-toggle-model-annotations"><Eye size={13} /> {showAnnotations ? "Annotations on" : "Annotations off"}</button></div></div><div className="reasoning-chart" data-testid="chart-model-reasoning"><svg viewBox="0 0 920 360" preserveAspectRatio="none"><defs><linearGradient id="reason-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2c93ed" stopOpacity=".18" /><stop offset="1" stopColor="#2c93ed" stopOpacity="0" /></linearGradient></defs>{[70, 140, 210, 280].map((y) => <line key={y} x1="0" y1={y} x2="920" y2={y} className="grid-line" />)}<path d="M0 274 C55 258 75 242 112 251 S165 211 201 226 S250 183 282 200 S327 154 362 178 S404 146 441 165 S488 112 520 133 S566 95 602 121 S647 83 681 106 S726 76 763 91 S820 52 920 63 L920 360 L0 360Z" className="reason-area" /><path d="M0 274 C55 258 75 242 112 251 S165 211 201 226 S250 183 282 200 S327 154 362 178 S404 146 441 165 S488 112 520 133 S566 95 602 121 S647 83 681 106 S726 76 763 91 S820 52 920 63" className="reason-line" />{[["M42 264", "M42 246"], ["M118 244", "M118 222"], ["M198 219", "M198 190"], ["M292 193", "M292 164"], ["M375 168", "M375 137"], ["M478 153", "M478 116"], ["M570 120", "M570 87"], ["M673 104", "M673 70"], ["M776 89", "M776 56"], ["M859 71", "M859 40"]].map(([low, high], index) => <g key={index} className="candle"><line x1={low.slice(1).split(" ")[0]} y1={low.split(" ")[1]} x2={low.slice(1).split(" ")[0]} y2={high.split(" ")[1]} /><rect x={Number(low.slice(1).split(" ")[0]) - 5} y={Number(high.split(" ")[1]) + 7} width="10" height={index % 2 ? 17 : 25} /></g>)}{showAnnotations && <g className="model-annotations"><line x1="292" y1="80" x2="292" y2="165" /><circle cx="292" cy="165" r="4" /><text x="305" y="77">SATM ENTRY / reclaim</text><line x1="673" y1="54" x2="673" y2="104" /><circle cx="673" cy="104" r="4" /><text x="686" y="51">STRUCTURE / continuation</text><line x1="776" y1="185" x2="776" y2="91" /><text x="790" y="182">INVALIDATION / 69,220</text></g>}<text x="12" y="24" className="chart-label">69,420</text><text x="12" y="345" className="chart-label">68,600</text></svg><div className="volume-bars">{[38, 52, 31, 66, 45, 78, 58, 69, 42, 84, 63, 71, 54, 88].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className="reasoning-axis"><span>09:00</span><span>11:00</span><span>13:00</span><span>15:00</span><span>17:00</span></div></div><div className="model-legend"><span><i className="legend-dot entry" /> SATM entry / structure call</span><span><i className="legend-dot ma" /> MA 20 / MA 50</span><span><i className="legend-dot volume" /> volume</span><span className="model-note">No user drawing tools · model-authored only</span></div></section>
    <section className="command-footer-grid"><div className="command-log surface"><div className="section-head"><div><span className="eyebrow">MODEL LOG</span><h2>Why the state changed</h2></div><button className="text-action" onClick={() => alert("Model log is local sample data.")} data-testid="button-command-model-log">View log <ArrowRight size={13} /></button></div>{["09:38 · Confidence crossed 78% as range reclaim held.", "09:31 · Volume confirmation added to structure call.", "09:18 · Invalidation level moved below prior swing."].map((item, index) => <div className="model-log-row" key={item}><span>0{index + 1}</span><p>{item}</p><StatusDot color={index === 2 ? "yellow" : "teal"} /></div>)}</div><div className="command-note surface"><span className="eyebrow">SUPERVISION NOTE</span><h2>Readable by design.</h2><p>Command keeps self-monitoring separate from trading decisions. Review the evidence, then choose whether a signal belongs in your own plan.</p><Link href="/signals" className="button button-outline" data-testid="link-command-signals">Review signals <ArrowRight size={14} /></Link></div></section>
  </div>;
}

function LwaziPage() {
  const [message, setMessage] = useState("");
  const [insights, setInsights] = useState(["You tend to size up after a fast win. Today’s cleaner edge is the smaller EURUSD setup, not a larger position.", "Your focus score has been strongest before noon this week. Keep the next review inside that window.", "SUI volatility is compressing, but your recent notes favor waiting for confirmation."]);
  const send = (value = message) => { if (!value.trim()) return; setInsights((items) => [`You asked: “${value.trim()}” Lwazi is holding this context for your next review.`, ...items]); setMessage(""); };
  return <div className="page page-enter lwazi-page"><div className="page-heading"><div><span className="kicker">LWAZI / PERSONAL INSIGHT</span><h1>Lwazi</h1><p>A quieter read on your habits, attention, and the trades that deserve a second look.</p></div><span className="lwazi-presence"><StatusDot /> PRESENT / LOCAL CONTEXT</span></div><div className="lwazi-hero surface"><div className="lwazi-hero-glyph"><span /><span /><span /><span /></div><div><span className="eyebrow">KNOWLEDGE SPIRIT / 09:42</span><h2>Keep the pattern<br />in view.</h2><p>Lwazi studies the way you work in NOMO and returns short, persona-led observations. It does not place trades or decide for you.</p></div><div className="lwazi-hero-meta"><span>Current read</span><strong>Protect the next 90m</strong><small>One focused review before the London range closes.</small></div></div><div className="lwazi-content-grid"><section className="insight-feed"><div className="section-head"><div><span className="eyebrow">TODAY'S READ</span><h2>Three things worth knowing</h2></div><button className="button button-outline" onClick={() => setInsights((items) => [...items, "No new pattern has cleared the threshold. Lwazi is staying quiet on purpose."])} data-testid="button-refresh-lwazi"><RefreshCw size={14} /> Refresh read</button></div>{insights.map((insight, index) => <article className="lwazi-insight surface" key={`${insight}-${index}`} data-testid={`card-lwazi-insight-${index}`}><span className="insight-index">0{index + 1}</span><div><span className="eyebrow">{index === 0 ? "TRADING HABIT" : index === 1 ? "ATTENTION" : "RISK CONTEXT"}</span><p>{insight}</p><small>Based on local sample activity · just now</small></div><ArrowUpRight size={15} /></article>)}</section><aside className="lwazi-ask surface"><span className="eyebrow">ASK LWAZI</span><h2>What should stay<br />in view?</h2><div className="lwazi-prompt-stack">{["What am I overreacting to?", "Summarize my open risk", "When is my best review window?"].map((prompt) => <button key={prompt} onClick={() => send(prompt)} data-testid={`button-lwazi-prompt-${prompt.toLowerCase().replaceAll(" ", "-").replaceAll("?", "")}`}>{prompt}<ArrowRight size={14} /></button>)}</div><form className="lwazi-input" onSubmit={(event) => { event.preventDefault(); send(); }}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask Lwazi..." aria-label="Ask Lwazi" data-testid="input-lwazi-dedicated" /><button type="submit" aria-label="Send to Lwazi" data-testid="button-send-lwazi-dedicated"><Send size={15} /></button></form><small className="provider-note"><ShieldCheck size={13} /> Provider-agnostic prototype · local context only</small></aside></div></div>;
}

function InfoPage() {
  return <div className="page page-enter info-page"><div className="info-hero"><div><span className="kicker">NOMO LABS / PLATFORM</span><h1>Decision infrastructure<br /><em>with a human in the loop.</em></h1><p>NOMO brings portfolio context, signals, model transparency, and personal operating patterns into one precise control center.</p></div><div className="info-orbit"><Logo compact /><span>01 / NOMO<br /><small>private beta surface</small></span></div></div><div className="info-grid"><section className="info-block surface"><div className="info-block-icon"><BookOpen size={17} /></div><span className="eyebrow">DOCUMENTATION</span><h2>Learn the operating model.</h2><p>Read the principles behind human-supervised routing, model-authored reasoning, and deliberate review.</p><a href="https://docs.nomo.systems" target="_blank" rel="noreferrer" data-testid="link-info-docs">Open NOMO docs <ExternalLink size={14} /></a></section><section className="info-block surface"><div className="info-block-icon"><Mail size={17} /></div><span className="eyebrow">CONTACT</span><h2>Talk to the team.</h2><p>Questions about the private beta, integrations, or a safer way to move from signal to decision.</p><a href="mailto:hello@nomolabs.xyz" data-testid="link-info-contact">hello@nomolabs.xyz <ArrowUpRight size={14} /></a></section><section className="info-block surface"><div className="info-block-icon"><Globe2 size={17} /></div><span className="eyebrow">ELSEWHERE</span><h2>Follow the build.</h2><p>Small notes on decision systems, market structure, and the tools we use to stay clear.</p><div className="info-socials"><a href="https://x.com/nomolabs" target="_blank" rel="noreferrer" data-testid="link-info-x">X <ExternalLink size={12} /></a><a href="https://www.linkedin.com/company/nomolabs" target="_blank" rel="noreferrer" data-testid="link-info-linkedin">LinkedIn <ExternalLink size={12} /></a></div></section></div><footer className="info-footer"><Link href="/dashboard" className="back-link" data-testid="link-info-back"><ChevronRight size={15} className="rotate-180" /> Back to control center</Link><span>NOMOLABS · HUMAN-SUPERVISED DECISION INFRASTRUCTURE</span><span>© 2024 NOMO Labs</span></footer></div>;
}

function LwaziCard({ chat, message, setMessage, ask }: { chat: { from: "user" | "lwazi"; text: string }[]; message: string; setMessage: (s: string) => void; ask: (s?: string) => void }) {
  return <section className="lwazi-card surface"><div className="lwazi-card-head"><div className="lwazi-mini"><div className="lwazi-mini-glyph"><span /><span /><span /></div><div><span className="eyebrow">LWAZI / CONTEXT LAYER</span><h2>Keep the question close.</h2></div></div><span className="context-badge"><StatusDot /> listening</span></div><div className="lwazi-body"><div className="lwazi-transcript">{chat.slice(-3).map((item, index) => <div className={`chat-line ${item.from}`} key={`${item.text}-${index}`}><span className="chat-who">{item.from === "lwazi" ? "LW" : "YOU"}</span><p>{item.text}</p></div>)}</div><div className="lwazi-prompts"><span>TRY A PROMPT</span>{["What am I avoiding?", "Summarize my exposure", "Plan the next 90m"].map((prompt) => <button key={prompt} onClick={() => ask(prompt)} data-testid={`button-prompt-${prompt.toLowerCase().replaceAll(" ", "-")}`}>{prompt}<ArrowUpRight /></button>)}</div></div><form className="lwazi-input" onSubmit={(e) => { e.preventDefault(); ask(); }}><input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask Lwazi about your systems..." aria-label="Ask Lwazi" data-testid="input-lwazi-message" /><button type="submit" aria-label="Send question" data-testid="button-send-lwazi"><Send size={16} /></button></form></section>;
}

function InsightsPanel() {
  return <div className="insights-layout"><section className="insight-hero surface"><div><span className="eyebrow">LWAZI SYNTHESIS / 09:42</span><h2>Your best edge is a smaller<br />decision surface.</h2><p>Three signals point to the same constraint: protect the next 90 minutes from context switching. The EURUSD route is ready, but not urgent.</p><button className="button button-primary" onClick={() => alert("Insight marked as active.")} data-testid="button-activate-insight">Make this my focus <ArrowRight size={15} /></button></div><div className="synthesis-graphic"><div className="synthesis-ring" /><Sparkline color="purple" /><span>86<br /><small>signal confidence</small></span></div></section><div className="insight-list">{[["01", "Close the open loop", "Your risk journal has been open for 42m. A 25m closeout keeps the afternoon clean.", "PRODUCTIVITY", "purple"], ["02", "Hold the route", "The breakout is forming, not confirmed. Your rule says wait for the 15m close.", "TRADING", "teal"], ["03", "Review one asset", "SUI-NFT-07 moved into your watch threshold. No action needed before your review block.", "ASSETS", "blue"]].map(([num, title, copy, tag, color]) => <div className="insight-row surface" key={num} data-testid={`row-insight-${num}`}><span className={`insight-num text-${color}`}>{num}</span><div><span className={`eyebrow text-${color}`}>{tag}</span><h3>{title}</h3><p>{copy}</p></div><button className="icon-button" onClick={() => alert(`${title} added to focus.`)} aria-label={`Add ${title} to focus`} data-testid={`button-insight-${num}`}><Plus size={16} /></button></div>)}</div></div>;
}

function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({ name: "Ayo K.", role: "Trader & creator", goal: "Make better calls with less context switching" });
  const [connected, setConnected] = useState({ tv: false, mt5: false });
  const [saved, setSaved] = useState(false);
  const steps = ["Your operating mode", "Connect your stack", "Set your signal"];
  const next = () => { if (step < 3) setStep(step + 1); else { setSaved(true); setTimeout(() => setSaved(false), 2600); } };
  return <div className="page onboarding-page page-enter"><div className="onboarding-top"><Link href="/dashboard" className="back-link" data-testid="link-onboarding-back"><ChevronRight size={15} className="rotate-180" /> Back to control center</Link><span className="step-count">SETUP / 0{step} OF 03</span></div><div className="onboarding-layout"><aside className="onboarding-aside"><span className="kicker">NOMO / FIRST RUN</span><h1>Make the system<br /><em>yours.</em></h1><p>A few precise choices help NOMO distinguish signal from noise.</p><div className="step-list">{steps.map((label, index) => <div className={`step-item ${step === index + 1 ? "current" : ""} ${step > index + 1 ? "done" : ""}`} key={label}><span>{step > index + 1 ? <Check size={13} /> : `0${index + 1}`}</span><div><strong>{label}</strong><small>{["Tell us how you spend your attention.", "Give your tools a safe handoff.", "Choose what should reach you."][index]}</small></div></div>)}</div><div className="privacy-note"><ShieldCheck size={16} /><span><strong>Private by design</strong><small>This prototype uses local sample data. No connections are made.</small></span></div></aside><section className="onboarding-form surface">{step === 1 && <div className="form-stage"><span className="eyebrow">01 / OPERATING MODE</span><h2>What should NOMO know<br />about your day?</h2><p className="form-intro">This gives Lwazi a useful starting context. You can change it later.</p><label>Display name<input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} data-testid="input-onboarding-name" /></label><label>Your primary mode<select value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })} data-testid="select-onboarding-role"><option>Trader & creator</option><option>Founder & operator</option><option>Student & builder</option><option>Researcher</option></select></label><label>What brings you here?<textarea value={profile.goal} onChange={(e) => setProfile({ ...profile, goal: e.target.value })} rows={3} data-testid="textarea-onboarding-goal" /></label></div>}{step === 2 && <div className="form-stage"><span className="eyebrow">02 / CONNECT YOUR STACK</span><h2>Make your tools<br />speak clearly.</h2><p className="form-intro">Connect the surfaces you already trust. These are simulated connections in the template.</p><ConnectionOption icon={TrendingUp} name="TradingView" detail="Alerts and watchlists" connected={connected.tv} onClick={() => setConnected({ ...connected, tv: !connected.tv })} testId="button-connect-tradingview" /><ConnectionOption icon={Terminal} name="MetaTrader 5" detail="Execution relay / paper mode" connected={connected.mt5} onClick={() => setConnected({ ...connected, mt5: !connected.mt5 })} testId="button-connect-mt5" /><div className="helper-line"><LockKeyhole size={14} /> Credentials remain encrypted and scoped to a single route.</div></div>}{step === 3 && <div className="form-stage"><span className="eyebrow">03 / SIGNAL PREFERENCES</span><h2>Choose what earns<br />your attention.</h2><p className="form-intro">NOMO will use these preferences to rank suggestions, not make decisions for you.</p><Preference label="High-confidence trade setups" detail="Only surface a route above 78% confidence" defaultOn testId="toggle-high-confidence" /><Preference label="Focus protection" detail="Quiet non-critical alerts during deep work" defaultOn testId="toggle-focus-protection" /><Preference label="Daily decision brief" detail="A compact synthesis at 09:30" defaultOn={false} testId="toggle-daily-brief" /></div>}<div className="form-actions"><span>{saved ? <><Check size={15} /> Preferences saved</> : "You can revisit this in settings."}</span><button className="button button-primary" onClick={next} data-testid="button-onboarding-next">{step === 3 ? "Finish setup" : "Continue"} <ArrowRight size={16} /></button></div></section></div></div>;
}

function ConnectionOption({ icon: Icon, name, detail, connected, onClick, testId }: { icon: IconType; name: string; detail: string; connected: boolean; onClick: () => void; testId: string }) {
  return <button className={`connection-option ${connected ? "connected" : ""}`} onClick={onClick} data-testid={testId}><span className="connection-icon"><Icon size={19} /></span><span><strong>{name}</strong><small>{detail}</small></span><span className="connection-action">{connected ? <><Check size={14} /> Connected</> : "Connect"}</span></button>;
}

function Preference({ label, detail, defaultOn, testId }: { label: string; detail: string; defaultOn: boolean; testId: string }) {
  const [on, setOn] = useState(defaultOn);
  return <div className="preference-row"><div><strong>{label}</strong><small>{detail}</small></div><button className={`switch ${on ? "on" : ""}`} onClick={() => setOn(!on)} role="switch" aria-checked={on} data-testid={testId}><span /></button></div>;
}

function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2200); };
  return <div className="page page-enter"><div className="page-heading"><div><span className="kicker">CONTROL CENTER / CONFIGURATION</span><h1>Settings</h1><p>Make the system behave like your best working day.</p></div>{saved && <span className="save-toast"><Check size={15} /> Changes saved locally</span>}</div><div className="settings-layout"><nav className="settings-nav">{settingsItems.map(({ key, icon: Icon, label }) => <button className={tab === key ? "active" : ""} onClick={() => setTab(key)} key={key} data-testid={`button-settings-${key}`}><Icon size={16} />{label}<ChevronRight size={14} /></button>)}</nav><section className="settings-content surface">{tab === "profile" && <><SettingHeader icon={UserRound} title="Personal information" copy="The context NOMO uses to personalize your control center." /><div className="settings-form"><label>Display name<input defaultValue="Ayo K." data-testid="input-settings-name" /></label><label>Workspace label<input defaultValue="Personal command center" data-testid="input-settings-workspace" /></label><label>Working timezone<select defaultValue="Africa/Lagos" data-testid="select-settings-timezone"><option>Africa/Lagos</option><option>Europe/London</option><option>America/New_York</option></select></label></div><SaveButton onClick={save} /></>}{tab === "security" && <><SettingHeader icon={ShieldCheck} title="Security & access" copy="Your account surface is protected with controls you can understand." /><div className="security-banner"><Fingerprint size={21} /><div><strong>Passkey enabled</strong><p>Last used today at 08:11 from this device.</p></div><button className="text-action" onClick={() => alert("Passkey management opened.")} data-testid="button-manage-passkey">Manage</button></div><Preference label="Require confirmation before execution" detail="Always ask before NOMO sends a trading route" defaultOn testId="toggle-confirm-execution" /><Preference label="Sign out inactive sessions" detail="Revoke sessions after 30 days without activity" defaultOn={false} testId="toggle-inactive-sessions" /><SaveButton onClick={save} /></>}{tab === "connections" && <><SettingHeader icon={Link2} title="Webhooks & API" copy="Route external signals into NOMO with a narrow, auditable handoff." /><div className="api-row"><div className="api-provider"><span className="provider-mark">TV</span><div><strong>TradingView webhook</strong><small>Primary signal ingress</small></div></div><span className="route-state">CONNECTED</span><button className="icon-button" onClick={() => alert("Webhook key copied to clipboard.")} aria-label="Copy webhook" data-testid="button-copy-webhook"><Copy size={15} /></button></div><div className="api-key-field"><span>https://hooks.nomo.systems/v1/••••••••42f</span><button onClick={() => alert("Webhook URL copied.")} data-testid="button-copy-webhook-url"><Copy size={14} /> Copy URL</button></div><button className="add-connection" onClick={() => alert("Connection picker opened.")} data-testid="button-add-connection"><Plus size={16} /> Add another connection</button></>}{tab === "notifications" && <><SettingHeader icon={Bell} title="Notifications" copy="Choose the moments that deserve to interrupt your flow." /><Preference label="Critical route issues" detail="Credential failures and blocked executions" defaultOn testId="toggle-critical-alerts" /><Preference label="Lwazi daily brief" detail="Your 09:30 synthesis and open loops" defaultOn testId="toggle-daily-notifications" /><Preference label="Productivity milestones" detail="Focus windows and weekly patterns" defaultOn={false} testId="toggle-productivity-notifications" /><Preference label="Email fallback" detail="Only send if an in-app alert stays unread" defaultOn={false} testId="toggle-email-fallback" /><SaveButton onClick={save} /></>}</section></div></div>;
}

function SettingHeader({ icon: Icon, title, copy }: { icon: IconType; title: string; copy: string }) { return <div className="setting-header"><div className="setting-icon"><Icon size={18} /></div><div><h2>{title}</h2><p>{copy}</p></div></div>; }
function SaveButton({ onClick }: { onClick: () => void }) { return <div className="save-row"><button className="button button-primary" onClick={onClick} data-testid="button-save-settings">Save changes <Check size={15} /></button></div>; }

function StatesPage() {
  const [state, setState] = useState("success");
  const [retrying, setRetrying] = useState(false);
  const retry = () => { setRetrying(true); setState("loading"); setTimeout(() => { setRetrying(false); setState("success"); }, 1100); };
  return <div className="page page-enter"><div className="page-heading"><div><span className="kicker">TEMPLATE GALLERY / STATES</span><h1>Every state has a next move.</h1><p>Composed patterns for the moments where data is arriving, absent, or needs a second look.</p></div></div><div className="state-tabs">{stateItems.map(({ key, icon: Icon, label }) => <button className={state === key ? "active" : ""} onClick={() => setState(key)} key={key} data-testid={`button-state-${key}`}><Icon size={15} />{label}</button>)}</div><div className="state-stage surface">{state === "empty" && <div className="state-content"><div className="empty-visual"><Plus size={23} /></div><span className="eyebrow">NO SAVED ROUTES</span><h2>Your signal layer is quiet.</h2><p>When you connect a source, your active routes will appear here with health and execution history.</p><button className="button button-primary" onClick={() => setState("success")} data-testid="button-empty-connect">Connect a source <ArrowRight size={15} /></button></div>}{state === "loading" && <div className="state-content"><div className="loading-visual"><span /><span /><span /></div><span className="eyebrow">SYNCING SYSTEMS</span><h2>Finding the signal.</h2><p>NOMO is checking your connected surfaces. This usually takes a few seconds.</p><div className="skeleton-lines"><i /><i /><i /></div></div>}{state === "success" && <div className="state-content success-content"><div className="success-visual"><Check size={24} /></div><span className="eyebrow">SYNC COMPLETE / 09:42</span><h2>Everything is in position.</h2><p>Your systems are current. The next brief will arrive when there is something worth your attention.</p><div className="success-detail"><span><StatusDot /> 4 systems healthy</span><span><Clock3 size={14} /> Next review in 48m</span></div><button className="button button-outline" onClick={() => setState("empty")} data-testid="button-success-reset">Preview empty state <Grid2X2 size={15} /></button></div>}{state === "error" && <div className="state-content"><div className="error-visual"><TriangleAlert size={24} /></div><span className="eyebrow">ROUTE INTERRUPTED / E-204</span><h2>The handoff needs attention.</h2><p>TradingView did not reach the webhook relay. No order was sent. Your other systems are unaffected.</p><div className="error-detail"><span>Last successful ping</span><strong>09:37:12 UTC</strong></div><div className="state-actions"><button className="button button-primary" onClick={retry} disabled={retrying} data-testid="button-retry-state">{retrying ? <Loader2 className="spin" size={15} /> : <RefreshCw size={15} />} {retrying ? "Retrying..." : "Retry connection"}</button><button className="button button-outline" onClick={() => alert("Support context copied.")} data-testid="button-copy-error"><Copy size={15} /> Copy context</button></div></div>}</div></div>;
}

type SignalSource = "TradingView" | "AI analysis";
type Signal = {
  id: string;
  source: SignalSource;
  market: string;
  title: string;
  summary: string;
  time: string;
  confidence: number;
  risk: "Low" | "Moderate" | "Elevated";
  bias: "Bullish" | "Bearish" | "Neutral";
  timeframe: string;
  context: string[];
};

const signalItems: Signal[] = [
  { id: "sig-104", source: "TradingView", market: "EURUSD", title: "London range reclaim", summary: "Price is holding above the 1.0820 range high after a clean retest.", time: "2 min ago", confidence: 87, risk: "Moderate", bias: "Bullish", timeframe: "15m", context: ["Volume is 1.4× the 20-bar average", "Retest held on the second candle", "Macro calendar: ECB remarks in 46m"] },
  { id: "sig-103", source: "AI analysis", market: "BTC / USDT", title: "Momentum cooling at resistance", summary: "The model flags a divergence between price expansion and declining momentum.", time: "11 min ago", confidence: 74, risk: "Elevated", bias: "Neutral", timeframe: "1h", context: ["RSI divergence detected across 4 candles", "Liquidity cluster between 68,900–69,200", "Funding remains slightly positive"] },
  { id: "sig-102", source: "TradingView", market: "XAUUSD", title: "Mean reversion watch", summary: "Gold is stretched from the session VWAP; setup is not confirmed.", time: "24 min ago", confidence: 68, risk: "Moderate", bias: "Bearish", timeframe: "30m", context: ["2.1 standard deviations from VWAP", "US dollar basket is firming", "Wait for a lower-high confirmation"] },
  { id: "sig-101", source: "AI analysis", market: "SUI / USD", title: "Volatility regime shift", summary: "Range compression suggests a larger move, but direction remains unresolved.", time: "38 min ago", confidence: 61, risk: "Low", bias: "Neutral", timeframe: "4h", context: ["ATR contracted 22% this week", "Open interest is flat", "No action recommended before daily close"] },
];

function SignalConfidence({ value }: { value: number }) {
  return <div className="confidence-meter"><span style={{ width: `${value}%` }} /><strong>{value}%</strong></div>;
}

function SignalsPage() {
  const [filter, setFilter] = useState<"All" | SignalSource>("All");
  const [threshold, setThreshold] = useState(80);
  const [selectedId, setSelectedId] = useState(signalItems[0].id);
  const [acknowledged, setAcknowledged] = useState<string[]>([]);
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [monitoringOpen, setMonitoringOpen] = useState(true);
  const [forceNoSetup, setForceNoSetup] = useState(false);
  const [notice, setNotice] = useState("");
  const filteredSignals = signalItems.filter((signal) => filter === "All" || signal.source === filter);
  const actionable = filteredSignals.filter((signal) => signal.confidence >= threshold);
  const monitoring = filteredSignals.filter((signal) => signal.confidence < threshold);
  const selected = actionable.find((item) => item.id === selectedId) ?? actionable[0];
  const act = (message: string, setter?: (id: string) => void) => {
    if (selected) setter?.(selected.id);
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  return <div className="page page-enter signals-page">
     <div className="page-heading"><div><span className="kicker">SIGNALS / INTAKE & REVIEW</span><h1>Signal room</h1><p>Actionable setups first. Monitoring stays quiet until confidence earns your attention.</p></div><div className="heading-actions"><span className="live-readout"><StatusDot /> INTAKE LIVE <small>04 SOURCES</small></span><button className="button button-outline" onClick={() => setNotice("Signal intake refreshed from local sample data.")} data-testid="button-refresh-signals"><RefreshCw size={14} /> Refresh intake</button></div></div>
     <div className="signal-health surface"><div className="health-lead"><div className="health-icon"><Activity size={17} /></div><div><span className="eyebrow">SIGNAL HEALTH</span><strong>{actionable.length} actionable setups cleared</strong><small>Threshold is local and demonstrable · no execution occurs here</small></div></div><div className="health-stat"><span>Actionable</span><strong className="text-cyan">{String(actionable.length).padStart(2, "0")}</strong></div><div className="health-stat"><span>Monitoring</span><strong>{String(monitoring.length).padStart(2, "0")}</strong></div><div className="health-stat"><span>Threshold</span><strong>{threshold}%</strong></div><div className="health-chart"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div></div>
     <div className="signals-toolbar"><div className="filter-group signal-filters">{(["All", "TradingView", "AI analysis"] as const).map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)} data-testid={`button-signal-filter-${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</button>)}<span className="toolbar-divider" /><span className="threshold-label">Threshold</span>{[80, 90].map((value) => <button key={value} className={`threshold-button ${threshold === value ? "active" : ""}`} onClick={() => setThreshold(value)} data-testid={`button-signal-threshold-${value}`}>{value}%</button>)}<button className={`threshold-button ${forceNoSetup ? "active" : ""}`} onClick={() => setForceNoSetup(!forceNoSetup)} data-testid="button-simulate-no-setup">Preview no-setup</button></div><div className="stream-meta"><span><span className="status-dot" /> Actionable first</span><span>Updated moments ago</span></div></div>
    <div className="signals-layout">
       <section className="signal-stream surface"><div className="section-head"><div><span className="eyebrow">THREE-STATE STREAM</span><h2>Signals <span className="count-badge">{actionable.length}</span></h2></div><button className="icon-button" aria-label="Search signals" onClick={() => setNotice("Search is ready for API wiring.")} data-testid="button-search-signals"><Search size={16} /></button></div>{forceNoSetup || actionable.length === 0 ? <div className="no-setup-banner" data-testid="banner-no-valid-setup"><div><Radio size={20} /><div><strong>No valid trade setup</strong><p>{forceNoSetup ? "Preview mode is active. Nothing clears the current session threshold." : "Nothing clears the current confidence threshold this session."}</p></div></div><span>Reason / low confidence</span></div> : <><div className="actionable-list">{actionable.map((signal) => <article className={`actionable-card ${selected?.id === signal.id ? "selected" : ""}`} key={signal.id} data-testid={`card-signal-actionable-${signal.id}`}><button className="actionable-select" onClick={() => setSelectedId(signal.id)} data-testid={`button-select-signal-${signal.id}`}><div className={`source-glyph ${signal.source === "TradingView" ? "tv" : "ai"}`}>{signal.source === "TradingView" ? <TrendingUp size={15} /> : <Bot size={15} />}</div><div className="signal-copy"><div className="signal-row-top"><span>{signal.source}</span><time>{signal.time}</time></div><strong>{signal.market} · {signal.title}</strong><small>{signal.summary}</small><div className="signal-row-foot"><span className={`bias bias-${signal.bias.toLowerCase()}`}>{signal.bias}</span><span>{signal.timeframe}</span><span className={`risk risk-${signal.risk.toLowerCase()}`}>{signal.risk} risk</span></div></div><div className="actionable-confidence"><span>CONFIDENCE</span><strong>{signal.confidence}%</strong><SignalConfidence value={signal.confidence} /></div></button><div className="actionable-logic"><span><Target size={13} /> Entry logic</span><p>{signal.context[0]}. {signal.context[1]}.</p><div className="card-actions"><button className={`button ${acknowledged.includes(signal.id) ? "button-confirmed" : "button-primary"}`} onClick={() => { setAcknowledged((items) => items.includes(signal.id) ? items : [...items, signal.id]); setNotice(`${signal.market} acknowledged for review.`); }} data-testid={`button-acknowledge-signal-${signal.id}`}>{acknowledged.includes(signal.id) ? <CircleCheck size={14} /> : <Check size={14} />} {acknowledged.includes(signal.id) ? "Acknowledged" : "Acknowledge"}</button><button className="button button-outline" onClick={() => { setReviewed((items) => items.includes(signal.id) ? items : [...items, signal.id]); setNotice(`${signal.market} marked reviewed.`); }} data-testid={`button-mark-signal-reviewed-${signal.id}`}>{reviewed.includes(signal.id) ? <CircleCheck size={14} /> : <Eye size={14} />} {reviewed.includes(signal.id) ? "Reviewed" : "Mark reviewed"}</button></div></div></article>)}</div><button className="monitoring-toggle" onClick={() => setMonitoringOpen(!monitoringOpen)} data-testid="button-toggle-monitoring"><ChevronDown size={15} className={monitoringOpen ? "monitoring-open" : ""} /> {monitoring.length} monitoring below threshold <span>{monitoringOpen ? "Collapse" : "Expand"}</span></button>{monitoringOpen && <div className="monitoring-list">{monitoring.map((signal) => <div className="monitoring-row" key={signal.id} data-testid={`row-signal-monitoring-${signal.id}`}><div><strong>{signal.market}</strong><span>Monitoring — below confidence threshold</span></div><time>{signal.time}</time></div>)}</div>}</>}</section>
       <aside className="signal-detail surface">{selected && !forceNoSetup ? <><div className="detail-top"><div><span className="eyebrow">ACTIONABLE DETAIL / {selected.id.toUpperCase()}</span><h2>{selected.market}</h2></div><span className={`detail-source ${selected.source === "TradingView" ? "tv" : "ai"}`}>{selected.source === "TradingView" ? <TrendingUp size={13} /> : <Bot size={13} />} {selected.source}</span></div><div className="detail-title"><h3>{selected.title}</h3><p>{selected.summary}</p></div><div className="detail-metrics"><div><span>Confidence</span><SignalConfidence value={selected.confidence} /></div><div><span>Risk posture</span><strong className={`risk risk-${selected.risk.toLowerCase()}`}>{selected.risk}</strong></div><div><span>Signal bias</span><strong className={`bias bias-${selected.bias.toLowerCase()}`}>{selected.bias}</strong></div></div><div className="context-block"><div className="detail-label"><Crosshair size={13} /> Model context</div><ul>{selected.context.map((item) => <li key={item}><span />{item}</li>)}</ul></div><div className="review-note"><ShieldAlert size={15} /><div><strong>Human review required</strong><span>Context is simulated. Acknowledge only after checking your own market view.</span></div></div>{notice && <div className="inline-notice" role="status" data-testid="status-signal-action"><Check size={14} />{notice}</div>}</> : <div className="signal-empty-detail"><div className="empty-visual"><Radio size={20} /></div><span className="eyebrow">SESSION STATUS</span><h2>No setup to review.</h2><p>Change the threshold or return to the stream when a setup clears the confidence gate.</p></div>}</aside>
    </div>
  </div>;
}

type ExecutionStatus = "Success" | "Pending" | "Failed";
const executionHistory = [
  { id: "ord-884", pair: "EURUSD", side: "Buy", amount: "2,400 USDC", route: "Arbitrum → MetaTrader 5", time: "Today, 09:36", status: "Success" as ExecutionStatus },
  { id: "ord-883", pair: "BTC / USDT", side: "Sell", amount: "0.018 BTC", route: "Ethereum → Prime broker", time: "Today, 08:54", status: "Pending" as ExecutionStatus },
  { id: "ord-882", pair: "SUI / USDC", side: "Buy", amount: "1,000 USDC", route: "Sui → Cetus", time: "Yesterday, 18:22", status: "Failed" as ExecutionStatus },
];

function ExecutionPage() {
  const [route, setRoute] = useState("Arbitrum → MetaTrader 5");
  const [side, setSide] = useState<"Buy" | "Sell">("Buy");
  const [amount, setAmount] = useState("2400");
  const [riskControls, setRiskControls] = useState({ maxSlippage: true, confirmation: true, sizeLimit: true });
  const [confirmed, setConfirmed] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<"All" | ExecutionStatus>("All");
  const [notice, setNotice] = useState("");
  const toggleRisk = (key: keyof typeof riskControls) => setRiskControls((current) => ({ ...current, [key]: !current[key] }));
  const submitOrder = (event: FormEvent) => { event.preventDefault(); setConfirmed(true); setNotice(`${side} order queued in paper mode. No funds moved.`); window.setTimeout(() => setNotice(""), 3500); };
  const history = executionHistory.filter((item) => historyFilter === "All" || item.status === historyFilter);
  return <div className="page page-enter execution-page">
    <div className="page-heading"><div><span className="kicker">EXECUTION / MULTI-CHAIN</span><h1>Execution desk</h1><p>Review routes, guardrails, and simulated orders before a real API handoff.</p></div><div className="heading-actions"><span className="paper-badge"><span className="status-dot" /> PAPER MODE</span><button className="button button-outline" onClick={() => setNotice("Route health refreshed from local sample data.")} data-testid="button-refresh-routes"><RefreshCw size={14} /> Refresh routes</button></div></div>
    <div className="execution-kpis"><div className="exec-kpi surface"><span className="eyebrow">EXECUTION READINESS</span><strong className="text-cyan">READY</strong><small>3 of 3 guardrails passing</small><div className="kpi-line"><span style={{ width: "92%" }} /></div></div><div className="exec-kpi surface"><span className="eyebrow">CONNECTED ROUTES</span><strong>03</strong><small>Across 3 networks</small><div className="route-mini"><i /><i /><i /></div></div><div className="exec-kpi surface"><span className="eyebrow">OPEN EXPOSURE</span><strong>$8,412.80</strong><small className="positive"><TrendingUp size={12} /> +1.84% today</small></div><div className="exec-kpi surface"><span className="eyebrow">LAST CHECK</span><strong>09:42:18</strong><small>All systems nominal</small><div className="latency-readout"><Activity size={12} /> 184ms median</div></div></div>
    <div className="execution-top-grid"><section className="routes-panel surface"><div className="section-head"><div><span className="eyebrow">CONNECTED ROUTES</span><h2>Choose a controlled path</h2></div><button className="text-action" onClick={() => setNotice("Route manager is ready for API wiring.")} data-testid="button-manage-execution-routes">Manage routes <ArrowRight size={13} /></button></div><div className="execution-route-list">{[["Arbitrum → MetaTrader 5", "EURUSD · Paper relay", "Ready", "blue"], ["Ethereum → Prime broker", "BTC / USDT · Review required", "Review", "amber"], ["Sui → Cetus", "SUI / USDC · Connected", "Ready", "cyan"]].map(([name, detail, state, color]) => <button className={`execution-route ${route === name ? "selected" : ""}`} key={name} onClick={() => { setRoute(name); setConfirmed(false); }} data-testid={`button-select-route-${name.split(" ")[0].toLowerCase()}`}><span className={`route-logo route-${color}`}><Route size={15} /></span><span><strong>{name}</strong><small>{detail}</small></span><span className={`route-pill route-pill-${color}`}>{state}</span>{route === name && <CircleCheck size={15} className="route-selected" />}</button>)}</div></section><section className="guardrails-panel surface"><div className="section-head"><div><span className="eyebrow">RISK GUARDRAILS</span><h2>Before any handoff</h2></div><ShieldCheck size={17} className="text-cyan" /></div><div className="guardrail-list"><label><span><strong>Max slippage</strong><small>Keep execution under 0.50%</small></span><button className={`switch ${riskControls.maxSlippage ? "on" : ""}`} onClick={() => toggleRisk("maxSlippage")} role="switch" aria-checked={riskControls.maxSlippage} data-testid="toggle-max-slippage"><span /></button></label><label><span><strong>Human confirmation</strong><small>Ask before submitting every order</small></span><button className={`switch ${riskControls.confirmation ? "on" : ""}`} onClick={() => toggleRisk("confirmation")} role="switch" aria-checked={riskControls.confirmation} data-testid="toggle-human-confirmation"><span /></button></label><label><span><strong>Position size limit</strong><small>Cap new exposure at 5% of balance</small></span><button className={`switch ${riskControls.sizeLimit ? "on" : ""}`} onClick={() => toggleRisk("sizeLimit")} role="switch" aria-checked={riskControls.sizeLimit} data-testid="toggle-position-size-limit"><span /></button></label></div></section></div>
    <div className="execution-main-grid"><section className="order-ticket surface"><div className="ticket-head"><div><span className="eyebrow">ORDER TICKET / SIMULATED</span><h2>Prepare a handoff</h2></div><span className="ticket-id">TICKET / NEW</span></div><form onSubmit={submitOrder}><div className="field-label">Selected route</div><div className="ticket-route"><Route size={15} /><span>{route}</span><ChevronDown size={14} /></div><div className="side-control"><span className="field-label">Order side</span><div className="side-buttons"><button type="button" className={side === "Buy" ? "active buy" : ""} onClick={() => setSide("Buy")} data-testid="button-order-buy"><TrendingUp size={14} /> Buy</button><button type="button" className={side === "Sell" ? "active sell" : ""} onClick={() => setSide("Sell")} data-testid="button-order-sell"><TrendingDown size={14} /> Sell</button></div></div><div className="ticket-fields"><label><span>Market</span><select defaultValue="EURUSD" data-testid="select-order-market"><option>EURUSD</option><option>BTC / USDT</option><option>SUI / USDC</option></select></label><label><span>Amount <small>USDC</small></span><input type="number" min="1" value={amount} onChange={(event) => { setAmount(event.target.value); setConfirmed(false); }} data-testid="input-order-amount" /></label></div><div className="ticket-summary"><span>Estimated notional <strong>${Number(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></span><span>Max slippage <strong>{riskControls.maxSlippage ? "0.50%" : "Not set"}</strong></span><span>Fee estimate <strong>$1.84</strong></span></div><button className="button button-primary ticket-submit" type="submit" disabled={!amount || Number(amount) <= 0} data-testid="button-submit-order">{confirmed ? <CircleCheck size={15} /> : <ArrowDownUp size={15} />} {confirmed ? "Order queued in paper mode" : `Review ${side.toLowerCase()} order`} <ArrowRight size={14} /></button></form>{notice && <div className="inline-notice" role="status" data-testid="status-execution-action"><Check size={14} /> {notice}</div>}</section><section className="open-trades surface"><div className="section-head"><div><span className="eyebrow">OPEN TRADES</span><h2>Exposure now</h2></div><span className="text-action">3 positions</span></div><div className="trade-table"><div className="table-head"><span>PAIR</span><span>SIZE</span><span>PNL</span></div>{[["EURUSD", "2,400", "+$42.18", "positive"], ["BTC / USDT", "0.018", "+$86.40", "positive"], ["SUI / USDC", "1,000", "−$12.62", "negative"]].map(([pair, size, pnl, tone]) => <div className="trade-row" key={pair}><span><strong>{pair}</strong><small>{pair === "EURUSD" ? "Long · 1.0824" : pair === "BTC / USDT" ? "Short · 69,180" : "Long · 1.14"}</small></span><strong>{size}</strong><strong className={tone}>{pnl}</strong></div>)}</div><button className="under-link" onClick={() => setNotice("Open trade management is ready for API wiring.")} data-testid="button-view-open-trades">View open trade detail <ArrowRight size={13} /></button></section></div>
    <section className="execution-history surface"><div className="section-head"><div><span className="eyebrow">EXECUTION HISTORY</span><h2>Recent handoffs</h2></div><div className="filter-group history-filters">{(["All", "Success", "Pending", "Failed"] as const).map((item) => <button key={item} className={historyFilter === item ? "active" : ""} onClick={() => setHistoryFilter(item)} data-testid={`button-history-filter-${item.toLowerCase()}`}>{item}</button>)}</div></div><div className="history-table"><div className="history-head"><span>ORDER</span><span>ROUTE</span><span>TIME</span><span>STATUS</span></div>{history.map((item) => <div className="history-row" key={item.id}><span><strong>{item.pair} · {item.side}</strong><small>{item.amount} · {item.id}</small></span><span>{item.route}</span><span>{item.time}</span><span className={`history-status history-${item.status.toLowerCase()}`}>{item.status === "Success" ? <CircleCheck size={13} /> : item.status === "Pending" ? <Clock4 size={13} /> : <CircleX size={13} />} {item.status}</span></div>)}</div>{history.length === 0 && <div className="empty-stream">No execution records in this view.</div>}</section>
  </div>;
}

function NotFound() { return <div className="not-found"><Logo /><h1>Signal not found.</h1><p>This route is outside the current command center.</p><Link href="/dashboard" className="button button-primary" data-testid="link-not-found-dashboard">Return to dashboard <ArrowRight size={15} /></Link></div>; }

function App() {
  useEffect(() => { document.documentElement.classList.add("dark"); document.body.classList.add("grain"); return () => document.documentElement.classList.remove("dark"); }, []);
  return <Switch><WouterRoute path="/" component={LandingPage} /><WouterRoute path="/dashboard"><AppShell><DashboardPage /></AppShell></WouterRoute><WouterRoute path="/command"><AppShell><CommandPage /></AppShell></WouterRoute><WouterRoute path="/signals"><AppShell><SignalsPage /></AppShell></WouterRoute><WouterRoute path="/lwazi"><AppShell><LwaziPage /></AppShell></WouterRoute><WouterRoute path="/info"><AppShell><InfoPage /></AppShell></WouterRoute><WouterRoute path="/execution"><AppShell><ExecutionPage /></AppShell></WouterRoute><WouterRoute path="/onboarding"><AppShell><OnboardingPage /></AppShell></WouterRoute><WouterRoute path="/settings"><AppShell><SettingsPage /></AppShell></WouterRoute><WouterRoute path="/states"><AppShell><StatesPage /></AppShell></WouterRoute><WouterRoute component={NotFound} /></Switch>;
}

export default App;