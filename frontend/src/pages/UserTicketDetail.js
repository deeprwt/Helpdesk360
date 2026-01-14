import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import LayoutShell from '../components/LayoutShell';
import Timeline from '../components/Timeline';
import { useTicket } from '../hooks/useTickets';
import { userNav } from '../constants/nav';
import { fetchTicketComments } from '../api/tickets';
const statusColorMap = {
    new: 'var(--accent-blue)',
    open: 'var(--accent-teal)',
    in_progress: 'var(--accent-teal)',
    waiting_customer: 'var(--accent-amber)',
    waiting_vendor: 'var(--accent-amber)',
    remote_required: 'var(--accent-blue-strong)',
    closed: 'var(--accent-lime)',
    out_of_sla: '#ff6b6b'
};
const UserTicketDetail = () => {
    const { ticketId } = useParams();
    const { data: ticket } = useTicket(ticketId);
    const { data: comments = [] } = useQuery({
        queryKey: ['comments', ticketId],
        queryFn: () => {
            if (!ticketId) {
                throw new Error('Missing ticket id');
            }
            return fetchTicketComments(ticketId);
        },
        enabled: Boolean(ticketId)
    });
    if (!ticket) {
        return null;
    }
    const readableStatus = ticket.status.replace(/_/g, ' ');
    const slaCopy = ticket.slaEndsAt ? formatDistanceToNow(new Date(ticket.slaEndsAt), { addSuffix: true }) : 'Not set';
    const timelineItems = comments.length
        ? comments.map((note) => ({
            label: note.body,
            timestamp: new Date(note.createdAt).toLocaleString(),
            meta: `${note.author} · ${note.role}`
        }))
        : [
            {
                label: 'Ticket created',
                timestamp: new Date(ticket.updatedAt).toLocaleString(),
                meta: `${ticket.requester} submitted`
            }
        ];
    return (_jsx(LayoutShell, { title: ticket.title, subtitle: `${ticket.requester} · ${ticket.site}`, navItems: userNav, accent: "violet", children: _jsxs("section", { style: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '24px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }, children: [_jsxs("div", { children: [_jsx("h2", { style: { margin: 0 }, children: "Updates timeline" }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: "Every admin/engineer comment pipes through the `/comments` endpoint." })] }), _jsx("span", { className: "pill", style: { background: `${statusColorMap[ticket.status]}22`, color: statusColorMap[ticket.status] }, children: readableStatus })] }), _jsx(Timeline, { items: timelineItems }), _jsxs("div", { style: { marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }, children: [_jsx("button", { type: "button", style: {
                                        borderRadius: 'var(--radius-pill)',
                                        border: '1px solid var(--border-strong)',
                                        padding: '12px 20px',
                                        background: 'transparent',
                                        fontWeight: 600,
                                        color: 'var(--ink-600)'
                                    }, children: "Add comment" }), _jsx("button", { type: "button", style: {
                                        borderRadius: 'var(--radius-pill)',
                                        border: 'none',
                                        padding: '12px 20px',
                                        background: 'var(--gradient-pill)',
                                        color: '#fff',
                                        fontWeight: 600
                                    }, children: "Attach file" })] })] }), _jsxs("aside", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '20px', background: 'var(--panel-highlight)' }, children: [_jsx("p", { className: "eyebrow", style: { color: '#ff6b6b' }, children: "SLA" }), _jsx("h3", { style: { margin: '8px 0 4px' }, children: slaCopy }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: "You\u2019ll get the same SLA badge colors as the \u201CUser out of SLA\u201D board." })] }), _jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Ticket details" }), _jsx("ul", { style: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }, children: [{ label: 'Requester', value: ticket.requester }, { label: 'Team', value: ticket.team }, { label: 'Site', value: ticket.site }].map((row) => (_jsxs("li", { style: { display: 'flex', justifyContent: 'space-between', color: 'var(--ink-600)' }, children: [_jsx("span", { style: { fontWeight: 500 }, children: row.label }), _jsx("span", { children: row.value })] }, row.label))) })] }), _jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Remote support" }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: "When engineers request access you\u2019ll see the same CTA stack as in the Figma \u201Cremote session\u201D card." }), _jsx(Link, { to: "/user", style: { display: 'inline-flex', gap: '6px', marginTop: '12px', fontWeight: 600, color: 'var(--accent-blue-strong)' }, children: "View instructions \u2192" })] })] })] }) }));
};
export default UserTicketDetail;
