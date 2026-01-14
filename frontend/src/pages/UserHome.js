import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import LayoutShell from '../components/LayoutShell';
import TicketList from '../components/TicketList';
import { useTickets } from '../hooks/useTickets';
import { userNav } from '../constants/nav';
const filterConfig = {
    open: ['new', 'open', 'in_progress'],
    waiting: ['waiting_customer', 'waiting_vendor'],
    remote: ['remote_required'],
    sla: ['out_of_sla'],
    closed: ['closed']
};
const pillPalette = {
    all: 'var(--accent-blue)',
    open: 'var(--accent-teal)',
    waiting: 'var(--accent-amber)',
    remote: 'var(--accent-blue-strong)',
    sla: '#ff6b6b',
    closed: 'var(--ink-400)'
};
const UserHome = () => {
    const { data: tickets = [] } = useTickets({ scope: 'user' });
    const [filter, setFilter] = useState('all');
    const counts = useMemo(() => {
        return tickets.reduce((acc, ticket) => {
            if (filterConfig.open.includes(ticket.status))
                acc.open += 1;
            if (filterConfig.waiting.includes(ticket.status))
                acc.waiting += 1;
            if (filterConfig.remote.includes(ticket.status))
                acc.remote += 1;
            if (filterConfig.sla.includes(ticket.status))
                acc.sla += 1;
            if (ticket.status === 'closed')
                acc.closed += 1;
            return acc;
        }, { open: 0, waiting: 0, remote: 0, sla: 0, closed: 0 });
    }, [tickets]);
    const filteredTickets = useMemo(() => {
        if (filter === 'all') {
            return tickets;
        }
        const statuses = filterConfig[filter];
        return tickets.filter((ticket) => statuses.includes(ticket.status));
    }, [tickets, filter]);
    const nextSla = useMemo(() => {
        const upcoming = tickets
            .filter((ticket) => Boolean(ticket.slaEndsAt))
            .sort((a, b) => new Date(a.slaEndsAt ?? '').getTime() - new Date(b.slaEndsAt ?? '').getTime());
        return upcoming[0];
    }, [tickets]);
    return (_jsxs(LayoutShell, { title: "Requester control room", subtitle: "Mirrors the requester prototype: KPI chips, SLA banner, remote session CTA, and the stacked ticket table.", navItems: userNav, accent: "violet", actions: _jsx(Link, { to: "/user/tickets/new", style: {
                borderRadius: '999px',
                border: 'none',
                padding: '12px 24px',
                background: 'var(--gradient-pill)',
                color: '#fff',
                fontWeight: 600
            }, children: "Raise ticket" }), children: [_jsx("section", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }, children: [{
                        label: 'Open tickets',
                        value: counts.open,
                        chip: '+12% vs last week',
                        color: pillPalette.open
                    },
                    {
                        label: 'Waiting on me',
                        value: counts.waiting,
                        chip: 'Action needed',
                        color: pillPalette.waiting
                    },
                    {
                        label: 'Remote sessions',
                        value: counts.remote,
                        chip: 'Prep devices',
                        color: pillPalette.remote
                    },
                    {
                        label: 'Resolved',
                        value: counts.closed,
                        chip: 'This month',
                        color: pillPalette.closed
                    }].map((card) => (_jsxs("div", { className: "widget-card", style: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx("p", { className: "eyebrow", style: { color: card.color }, children: card.label }), _jsx("span", { style: { fontSize: '36px', fontWeight: 600 }, children: card.value }), _jsx("span", { className: "pill", style: { background: `${card.color}22`, color: card.color }, children: card.chip })] }, card.label))) }), _jsxs("section", { style: { marginTop: '24px', display: 'grid', gap: '24px', gridTemplateColumns: '2fr 1fr' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '24px' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }, children: [_jsx("h2", { style: { margin: 0 }, children: "Ticket queue" }), _jsxs("span", { style: { color: 'var(--ink-400)', fontSize: '14px' }, children: [filteredTickets.length, " showing"] })] }), _jsx("div", { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' }, children: Object.keys(pillPalette).map((key) => (_jsx("button", { type: "button", onClick: () => setFilter(key), className: "pill", style: {
                                                border: '1px solid var(--border-strong)',
                                                background: filter === key ? pillPalette[key] : 'transparent',
                                                color: filter === key ? '#fff' : 'var(--ink-600)',
                                                cursor: 'pointer'
                                            }, children: key === 'all' ? 'All tickets' : key.replace('_', ' ') }, key))) })] }), _jsx(TicketList, { tickets: filteredTickets, role: "user", compact: true })] }), _jsxs("aside", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '20px', background: 'var(--panel-highlight)' }, children: [_jsx("p", { className: "eyebrow", style: { color: pillPalette.sla }, children: "SLA timer" }), nextSla ? (_jsxs(_Fragment, { children: [_jsx("h3", { style: { margin: '8px 0 4px' }, children: formatDistanceToNow(new Date(nextSla.slaEndsAt ?? ''), { addSuffix: true }) }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: nextSla.title }), _jsx(Link, { to: `/user/tickets/${nextSla.id}`, style: { marginTop: '12px', display: 'inline-flex', gap: '6px', fontWeight: 600, color: 'var(--accent-blue-strong)' }, children: "Review ticket \u2192" })] })) : (_jsx("p", { style: { marginTop: '8px', color: 'var(--ink-500)' }, children: "No timers running right now." }))] }), _jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Remote session" }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: "Matches the \u201Cremote session\u201D tile from the Figma boards. Launch when an engineer requests screen sharing or device control." }), _jsx("button", { type: "button", style: {
                                            width: '100%',
                                            borderRadius: '16px',
                                            border: 'none',
                                            padding: '14px',
                                            background: 'var(--gradient-pill)',
                                            color: '#fff',
                                            fontWeight: 600,
                                            marginTop: '12px'
                                        }, children: "Share access code" })] })] })] })] }));
};
export default UserHome;
