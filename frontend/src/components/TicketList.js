import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
const statusPalette = {
    new: '#95d65c',
    open: '#12c6c2',
    in_progress: '#ffc857',
    waiting_customer: '#ff8f70',
    waiting_vendor: '#a3a1ff',
    remote_required: '#6a64ff',
    closed: '#1dd3b0',
    out_of_sla: '#ff6b6b'
};
const TicketList = ({ tickets, role, compact }) => (_jsx("div", { style: { overflowX: 'auto' }, children: _jsxs("table", { style: {
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            minWidth: compact ? '680px' : '960px'
        }, children: [_jsx("thead", { children: _jsx("tr", { style: { textAlign: 'left', fontSize: '12px', color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.08em' }, children: ['Ticket', 'Requester', 'Assignee', 'Status', 'Priority', 'Updated'].map((heading) => (_jsx("th", { style: { padding: '0 12px 12px' }, className: "eyebrow", children: heading }, heading))) }) }), _jsx("tbody", { children: tickets.map((ticket) => (_jsxs("tr", { style: {
                        background: 'var(--panel-bg)',
                        borderRadius: 'var(--radius-medium)',
                        border: '1px solid var(--border-light)',
                        boxShadow: 'var(--shadow-widget)'
                    }, children: [_jsxs("td", { style: { padding: '18px 12px' }, children: [_jsx(Link, { to: `/${role === 'user' ? 'user' : role}/tickets/${ticket.id}`, style: { fontWeight: 600 }, children: ticket.title }), _jsx("p", { style: { margin: '4px 0 0', color: 'var(--ink-400)', fontSize: '14px' }, children: ticket.category })] }), _jsx("td", { style: { padding: '18px 12px' }, children: ticket.requester }), _jsx("td", { style: { padding: '18px 12px' }, children: ticket.assignee ?? 'Unassigned' }), _jsx("td", { style: { padding: '18px 12px' }, children: _jsx("span", { className: "pill", style: {
                                    background: `${statusPalette[ticket.status]}22`,
                                    color: statusPalette[ticket.status]
                                }, children: ticket.status.replace('_', ' ') }) }), _jsx("td", { style: { padding: '18px 12px', textTransform: 'capitalize' }, children: ticket.priority }), _jsx("td", { style: { padding: '18px 12px', color: 'var(--ink-400)' }, children: formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true }) })] }, ticket.id))) })] }) }));
export default TicketList;
