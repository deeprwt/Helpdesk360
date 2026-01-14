import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import LayoutShell from '../components/LayoutShell';
import StatCard from '../components/StatCard';
import TicketList from '../components/TicketList';
import Timeline from '../components/Timeline';
import { useTickets } from '../hooks/useTickets';
import { fetchInsights } from '../api/tickets';
import { adminNav } from '../constants/nav';
const AdminDashboard = () => {
    const { data: insights } = useQuery({ queryKey: ['insights'], queryFn: fetchInsights });
    const { data: tickets = [] } = useTickets({ scope: 'admin' });
    const backlog = useMemo(() => insights?.backlog ?? [], [insights]);
    return (_jsxs(LayoutShell, { title: "Admin runway", subtitle: "Track SLA burn-down, orchestrate imports, push broadcast notifications\u2014all mapped from the Helpdesk Automation Tool boards.", navItems: adminNav, accent: "amber", actions: _jsx("button", { style: {
                borderRadius: '999px',
                border: 'none',
                padding: '14px 28px',
                background: 'var(--accent-amber)',
                color: '#15182c',
                fontWeight: 600,
                cursor: 'pointer'
            }, children: "+ New automation" }), children: [_jsx("section", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }, children: insights?.stats.map((stat) => _jsx(StatCard, { ...stat }, stat.label)) }), _jsxs("section", { style: { marginTop: '32px', display: 'grid', gap: '24px', gridTemplateColumns: '2fr 1fr', alignItems: 'start' }, children: [_jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }, children: [_jsx("h2", { style: { margin: 0 }, children: "Live ticket mix" }), _jsx("span", { style: { color: 'var(--ink-400)', fontSize: '14px' }, children: "Synced every 60s" })] }), _jsx(TicketList, { tickets: tickets, role: "admin" })] }), _jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Backlog pressure" }), _jsx(Timeline, { items: backlog.map((ticket) => ({
                                    label: ticket.title,
                                    timestamp: new Date(ticket.updatedAt).toLocaleString(),
                                    meta: `${ticket.team} · ${ticket.status.replace('_', ' ')}`
                                })) })] })] })] }));
};
export default AdminDashboard;
