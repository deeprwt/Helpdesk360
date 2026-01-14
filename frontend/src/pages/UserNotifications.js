import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import LayoutShell from '../components/LayoutShell';
import PagePlaceholder from '../components/PagePlaceholder';
import { userNav } from '../constants/nav';
import { useTickets } from '../hooks/useTickets';
const badgePalette = {
    sla: '#ff6b6b',
    remote: 'var(--accent-blue-strong)',
    waiting: 'var(--accent-amber)',
    closed: 'var(--accent-lime)'
};
const UserNotifications = () => {
    const { data: tickets = [] } = useTickets({ scope: 'user' });
    const notifications = useMemo(() => {
        const items = tickets.flatMap((ticket) => {
            const baseDate = new Date(ticket.updatedAt);
            const rows = [];
            if (ticket.status === 'out_of_sla') {
                rows.push({
                    id: `${ticket.id}-sla`,
                    title: `${ticket.title} is trending past SLA`,
                    body: 'Engineers escalated this request. Add context or attachments so they can close faster.',
                    kind: 'sla',
                    createdAt: baseDate,
                    href: `/user/tickets/${ticket.id}`
                });
            }
            if (ticket.status === 'remote_required') {
                rows.push({
                    id: `${ticket.id}-remote`,
                    title: `Remote assist requested for ${ticket.title}`,
                    body: 'Join the secure session and keep your device online while the engineer troubleshoots.',
                    kind: 'remote',
                    createdAt: baseDate,
                    href: `/user/tickets/${ticket.id}`
                });
            }
            if (ticket.status === 'waiting_customer' || ticket.status === 'waiting_vendor') {
                rows.push({
                    id: `${ticket.id}-waiting`,
                    title: `Action needed on ${ticket.title}`,
                    body: 'Reply to the latest comment so we can resume work. The SLA pause mirrors the Figma notifications sheet.',
                    kind: 'waiting',
                    createdAt: baseDate,
                    href: `/user/tickets/${ticket.id}`
                });
            }
            if (ticket.status === 'closed') {
                rows.push({
                    id: `${ticket.id}-closed`,
                    title: `${ticket.title} closed`,
                    body: 'Review the resolution summary and mark the session as satisfied—or reopen if the issue reappears.',
                    kind: 'closed',
                    createdAt: baseDate,
                    href: `/user/tickets/${ticket.id}`
                });
            }
            return rows;
        });
        return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }, [tickets]);
    return (_jsx(LayoutShell, { title: "Notifications", subtitle: "Exactly like the Figma notifications drawer: SLA alerts, remote session invites, and closure summaries.", navItems: userNav, accent: "violet", children: notifications.length === 0 ? (_jsx(PagePlaceholder, { heading: "Inbox", body: "Once data plugs in, notifications scoped to the current requester will render here with the same styling as the exported boards.", hint: "User \u00B7 Notifications" })) : (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: notifications.map((item) => (_jsxs("div", { className: "glass-panel", style: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }, children: [_jsx("span", { className: "pill", style: { background: `${badgePalette[item.kind]}22`, color: badgePalette[item.kind] }, children: item.title }), _jsx("span", { style: { color: 'var(--ink-400)', fontSize: '13px' }, children: formatDistanceToNow(item.createdAt, { addSuffix: true }) })] }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: item.body }), _jsx(Link, { to: item.href, style: { fontWeight: 600, color: 'var(--accent-blue-strong)' }, children: "View ticket \u2192" })] }, item.id))) })) }));
};
export default UserNotifications;
