import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { useTicket } from '../hooks/useTickets';
import LayoutShell from '../components/LayoutShell';
import Timeline from '../components/Timeline';
import { engineerDetailNav } from '../constants/nav';
const EngineerTicketDetail = () => {
    const { ticketId } = useParams();
    const { data: ticket } = useTicket(ticketId);
    if (!ticket) {
        return null;
    }
    return (_jsx(LayoutShell, { title: `Working: ${ticket.title}`, subtitle: `${ticket.requester} · ${ticket.site}`, navItems: engineerDetailNav(ticket.id), accent: "teal", children: _jsxs("section", { style: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }, children: [_jsxs("div", { children: [_jsx("h2", { children: "Activity timeline" }), _jsx(Timeline, { items: [
                                { label: 'Ticket accepted by you', timestamp: new Date(ticket.updatedAt).toLocaleString(), meta: ticket.team },
                                {
                                    label: 'Remote diagnostics requested',
                                    timestamp: new Date(ticket.updatedAt).toLocaleString(),
                                    meta: 'Awaiting user confirmation'
                                }
                            ] })] }), _jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Remote session" }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: "Mirrors the remote page in the engineer prototype\u2014session pin, voice channel toggle, device telemetry. Hook up with the real remote-control provider when ready." }), _jsx("button", { style: {
                                width: '100%',
                                borderRadius: '16px',
                                padding: '14px',
                                border: 'none',
                                background: 'var(--accent-teal)',
                                color: '#041421',
                                fontWeight: 600
                            }, children: "Generate session pin" })] })] }) }));
};
export default EngineerTicketDetail;
