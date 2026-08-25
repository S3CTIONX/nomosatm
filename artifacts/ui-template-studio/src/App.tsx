import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Copy,
  Cpu,
  Eye,
  FileText,
  Fingerprint,
  Gauge,
  Grid2X2,
  KeyRound,
  LayoutDashboard,
  Link2,
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
  Rocket,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  TriangleAlert,
  UserRound,
  X,
} from "lucide-react";

type IconType = typeof Activity;

const navItems: { label: string; href: string; icon: IconType; hint: string }[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, hint: "Live system" },
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
      <span className="nomo-mark" aria-hidden="true"><i /><i /><i /></span>
      {!compact && <span className="nomo-word">NOMO<span className="nomo-dot">.</span></span>}
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
        <div className="sidebar-footer"><button className="side-link" onClick={() => alert("NOMO support is ready for your question.")} data-testid="button-open-support"><CircleHelp size={17} /><span>Support</span></button><div className="profile-chip"><div className="avatar">AK</div><div><strong>Ayo K.</strong><span>Operator</span></div><MoreHorizontal size={16} /></div></div>
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
  const [tab, setTab] = useState<"overview" | "insights">("overview");
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ from: "user" | "lwazi"; text: string }[]>([{ from: "lwazi", text: "You have room for one meaningful move before 14:00. EURUSD is approaching your London range; your focus block ends in 18m." }]);
  const visibleActivity = useMemo(() => filter === "all" ? activityItems : activityItems.filter((item) => item.tag.toLowerCase().includes(filter === "trade" ? "trade" : filter)), [filter]);
  const ask = (text = message) => { if (!text.trim()) return; setChat((prev) => [...prev, { from: "user", text }, { from: "lwazi", text: "Noted. I’ll keep the signal in view and leave the execution to you." }]); setMessage(""); };
  return <div className="page page-enter">
    <div className="page-heading dashboard-heading"><div><span className="kicker">TUESDAY, 18 JUNE 2024 / 09:42 UTC</span><h1>Good morning, Ayo.</h1><p>Four systems checked in. Here is what deserves your attention.</p></div><div className="heading-actions"><button className="button button-outline" onClick={() => alert("Brief exported to your workspace.")} data-testid="button-export-brief"><Copy size={15} /> Export brief</button><button className="button button-primary" onClick={() => ask("Give me the highest-leverage next move.")} data-testid="button-ask-lwazi"><Sparkles size={15} /> Ask Lwazi</button></div></div>
    <div className="dashboard-tabs"><button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")} data-testid="button-dashboard-overview">Command overview</button><button className={tab === "insights" ? "active" : ""} onClick={() => setTab("insights")} data-testid="button-dashboard-insights">Decision insights <span>3</span></button></div>
    {tab === "insights" ? <InsightsPanel /> : <><div className="metric-grid"><MetricCard label="Focus score" value="86" delta="+12.4%" meta="vs. last 7 days" color="purple" /><MetricCard label="Portfolio value" value="$24,870.60" delta="+2.8%" meta="paper assets / Sui" color="teal" /><MetricCard label="Trade routes" value="03 / 04" delta="stable" meta="one needs attention" color="blue" /><MetricCard label="Decision debt" value="02:14" delta="-18m" meta="since yesterday" color="magenta" down /></div><div className="dashboard-main-grid"><section className="activity-section surface"><div className="section-head"><div><span className="eyebrow">LIVE ACTIVITY</span><h2>System pulse</h2></div><div className="filter-group">{["all", "trade", "lwazi", "productivity"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)} data-testid={`button-filter-${item}`}>{item}</button>)}</div></div><div className="activity-list">{visibleActivity.map(({ id, tag, title, detail, time, color, icon: Icon }) => <div className="activity-row" key={id} data-testid={`row-activity-${id}`}><div className={`activity-icon icon-${color}`}><Icon size={16} /></div><div className="activity-copy"><span>{tag}</span><strong>{title}</strong><small>{detail}</small></div><time>{time}</time><ChevronRight size={15} className="muted-icon" /></div>)}</div><button className="under-link" onClick={() => setFilter("all")} data-testid="button-view-all-activity">View full activity <ArrowRight size={14} /></button></section><div className="right-stack"><section className="focus-card surface"><div className="section-head"><div><span className="eyebrow">NOW / NEXT</span><h2>Focus window</h2></div><button className="icon-button" onClick={() => alert("Focus timer paused.")} aria-label="More focus options" data-testid="button-focus-options"><MoreHorizontal size={17} /></button></div><div className="focus-time">01<span>:</span>18<span>:</span>42</div><div className="focus-progress"><span style={{ width: "72%" }} /></div><div className="focus-meta"><span><StatusDot /> Deep work</span><span>72% complete</span></div><div className="focus-task"><div className="task-check"><Check size={13} /></div><div><strong>Review weekly risk journal</strong><span>Personal / 25 min remaining</span></div><button className="icon-button" onClick={() => alert("Task editor opened.")} aria-label="Edit focus task" data-testid="button-edit-focus"><Pencil size={14} /></button></div></section><section className="routes-card surface"><div className="section-head"><div><span className="eyebrow">AUTOMATION</span><h2>Trade routes</h2></div><button className="text-action" onClick={() => alert("Route manager opened.")} data-testid="button-manage-routes">Manage</button></div><div className="route-row"><span className="route-pulse"><StatusDot /></span><div><strong>TradingView → MT5</strong><small>EURUSD / London range</small></div><span className="route-state">READY</span></div><div className="route-row"><span className="route-pulse"><StatusDot /></span><div><strong>TradingView → MT4</strong><small>XAUUSD / mean reversion</small></div><span className="route-state">READY</span></div><div className="route-row route-muted"><span className="route-pulse"><StatusDot color="yellow" /></span><div><strong>Webhook relay</strong><small>Credential refresh required</small></div><span className="route-state warn">CHECK</span></div></section></div></div><LwaziCard chat={chat} message={message} setMessage={setMessage} ask={ask} /></>}
  </div>;
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

function NotFound() { return <div className="not-found"><Logo /><h1>Signal not found.</h1><p>This route is outside the current command center.</p><Link href="/dashboard" className="button button-primary" data-testid="link-not-found-dashboard">Return to dashboard <ArrowRight size={15} /></Link></div>; }

function App() {
  useEffect(() => { document.documentElement.classList.add("dark"); document.body.classList.add("grain"); return () => document.documentElement.classList.remove("dark"); }, []);
  return <Switch><Route path="/" component={LandingPage} /><Route path="/dashboard"><AppShell><DashboardPage /></AppShell></Route><Route path="/onboarding"><AppShell><OnboardingPage /></AppShell></Route><Route path="/settings"><AppShell><SettingsPage /></AppShell></Route><Route path="/states"><AppShell><StatesPage /></AppShell></Route><Route component={NotFound} /></Switch>;
}

export default App;