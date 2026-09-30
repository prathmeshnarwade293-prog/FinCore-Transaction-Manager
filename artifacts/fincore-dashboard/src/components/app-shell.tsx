import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Bell, ChevronRight, CircleHelp, LayoutDashboard, ListFilter, Menu, MessageCircle, PiggyBank, PieChart, Settings, WalletCards, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/accounts', label: 'Accounts', icon: WalletCards },
  { href: '/transactions', label: 'Transactions', icon: ListFilter },
  { href: '/budgets', label: 'Budgets', icon: PiggyBank },
  { href: '/analytics', label: 'Analytics', icon: PieChart },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-[100dvh] bg-background">
      <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0`}>
        <div className="flex items-center justify-between px-7 py-7">
          <Link href="/" className="flex items-center gap-3" data-testid="link-brand">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">F</span>
            <span className="font-display text-[22px] font-bold tracking-tight">FinCore</span>
          </Link>
          <button className="rounded-lg p-1 text-sidebar-foreground/60 lg:hidden" onClick={() => setMobileOpen(false)} data-testid="button-close-menu"><X size={18} /></button>
        </div>
        <div className="px-4 pb-4">
          <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/80 px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#d2e5d3] text-sm font-bold text-[#2e5b4e]">AM</div>
              <div className="min-w-0"><p className="truncate text-sm font-semibold">Alex Morgan</p><p className="text-xs text-sidebar-foreground/55">Personal workspace</p></div>
              <ChevronRight size={15} className="ml-auto text-sidebar-foreground/40" />
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 py-5">
          <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[.18em] text-sidebar-foreground/40">Workspace</p>
          <div className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${location === href ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'}`} data-testid={`link-nav-${label.toLowerCase()}`}>
                <Icon size={18} strokeWidth={location === href ? 2.5 : 1.8} /><span>{label}</span>
              </Link>
            ))}
          </div>
          <p className="px-3 pb-3 pt-10 text-[10px] font-bold uppercase tracking-[.18em] text-sidebar-foreground/40">Tools</p>
          <div className="space-y-1">
            <Link href="/chat" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${location === '/chat' ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'}`} data-testid="link-nav-advisor"><MessageCircle size={18} /><span>Advisor</span><span className="ml-auto h-2 w-2 rounded-full bg-sidebar-primary" /></Link>
            <Link href="/settings" onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${location === '/settings' ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'}`} data-testid="link-nav-settings"><Settings size={18} /><span>Settings</span></Link>
          </div>
        </nav>
        <div className="border-t border-sidebar-border px-7 py-5 text-xs text-sidebar-foreground/45"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#8cc7aa]" />All systems operational</div><p className="mt-2">Updated just now</p></div>
      </aside>
      {mobileOpen && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-[#183640]/40 lg:hidden" onClick={() => setMobileOpen(false)} data-testid="button-overlay-menu" />}
      <main className="lg:pl-[260px]">
        <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-border/80 bg-background/90 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <button className="rounded-lg border border-border p-2 lg:hidden" onClick={() => setMobileOpen(true)} data-testid="button-open-menu"><Menu size={18} /></button>
          <div className="hidden text-sm text-muted-foreground sm:block">Tuesday, June 18, 2024 <span className="mx-2 text-border">/</span> <span className="text-foreground">Good morning, Alex</span></div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative rounded-xl border border-border bg-card p-2.5 text-muted-foreground transition-colors hover:text-foreground" data-testid="button-notifications"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#d96555]" /></button>
            <Link href="/chat" className="flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2.5 text-xs font-bold text-primary-foreground transition-transform hover:-translate-y-0.5" data-testid="link-header-advisor"><CircleHelp size={15} />Ask advisor</Link>
          </div>
        </header>
        <div className="mx-auto max-w-[1480px] p-5 sm:p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
}

export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-[11px] font-bold uppercase tracking-[.19em] text-[#987322]">{eyebrow}</p><h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-[38px]">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>}</div>{action}</div>;
}

export function SectionTitle({ title, detail, action }: { title: string; detail?: string; action?: React.ReactNode }) {
  return <div className="mb-4 flex items-center justify-between"><div><h2 className="font-display text-lg font-bold">{title}</h2>{detail && <p className="mt-1 text-xs text-muted-foreground">{detail}</p>}</div>{action}</div>;
}

export function SkeletonBlock({ className = '' }: { className?: string }) { return <div className={`animate-pulse rounded-xl bg-muted ${className}`} />; }

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 text-center"><div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-secondary text-primary"><span className="h-2 w-2 rounded-full bg-accent" /></div><h3 className="font-display font-bold">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>{action && <div className="mt-5">{action}</div>}</div>;
}