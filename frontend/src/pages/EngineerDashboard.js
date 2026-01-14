import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LayoutShell from '../components/LayoutShell';
import TicketList from '../components/TicketList';
import { useTickets } from '../hooks/useTickets';
import { engineerNav } from '../constants/nav';
const EngineerDashboard = () => {
    const { data: tickets = [] } = useTickets({ scope: 'engineer' });
    return (_jsx(LayoutShell, { title: "Engineer runway", subtitle: "Blend remote approvals, teammate visibility, and SLA guardrails. The layout mirrors the engineer prototype: vertical tickets, teammate chips, and remote session callouts.", navItems: engineerNav, accent: "teal", actions: _jsx("button", { style: {
                borderRadius: '999px',
                border: 'none',
                padding: '12px 22px',
                background: 'var(--accent-teal)',
                color: '#041421',
                fontWeight: 600
            }, children: "Start remote assist" }), children: _jsxs("section", { style: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }, children: [_jsxs("div", { children: [_jsx("h2", { children: "My live tickets" }), _jsx(TicketList, { tickets: tickets, role: "engineer" })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Teammate pulse" }), _jsx("ul", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: ['Anika · Networking', 'Prakash · Field', 'Rita · Apps'].map((mate) => (_jsxs("li", { style: { display: 'flex', justifyContent: 'space-between', fontWeight: 600 }, children: [_jsx("span", { children: mate }), _jsx("span", { style: { color: 'var(--accent-teal)' }, children: "online" })] }, mate))) })] }), _jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Notifications" }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: "Shift handoffs, approvals, and SLA breaches land here just like the Figma alerts." })] })] })] }) }));
};
export default EngineerDashboard;
