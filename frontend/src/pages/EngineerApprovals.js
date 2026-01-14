import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LayoutShell from '../components/LayoutShell';
import { engineerNav } from '../constants/nav';
import { useApprovals } from '../hooks/useRemote';
const defaultPolicies = [
    { title: 'Privileged change', description: 'Requires MFA + supervisor review', status: 'Active' },
    { title: 'Camera assist', description: 'Auto timeout after 15m idle', status: 'Updating' }
];
const formatTime = (stamp) => stamp ? new Date(stamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
const EngineerApprovals = () => {
    const { data: approvals = [], isLoading } = useApprovals();
    const pending = approvals.filter((approval) => approval.state === 'pending');
    const history = approvals.filter((approval) => approval.state !== 'pending').slice(0, 5);
    // ✅ Typed placeholder to match TicketApproval
    const placeholder = isLoading && !approvals.length
        ? Array.from({ length: 2 }, (_, idx) => ({
            id: `placeholder-${idx}`,
            ticketId: '',
            state: 'pending',
            createdAt: '',
            ticketTitle: undefined,
            note: undefined,
            approverName: undefined,
        }))
        : [];
    return (_jsx(LayoutShell, { title: "Approvals", subtitle: "Quickly approve or decline work before remote consoles unlock.", navItems: engineerNav, accent: "teal", children: _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }, children: [_jsxs("section", { className: "glass-panel", style: { padding: '24px' }, children: [_jsxs("div", { style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '16px',
                                flexWrap: 'wrap',
                                gap: '12px',
                            }, children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", style: { margin: 0, color: 'var(--ink-400)' }, children: "Queue" }), _jsx("h2", { style: { margin: 0 }, children: "Pending decisions" })] }), _jsx("button", { type: "button", style: { border: 'none', background: 'transparent', color: 'var(--accent-blue-strong)', fontWeight: 600 }, children: "View history" })] }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: (pending.length ? pending : placeholder).map((entry) => (_jsxs("article", { style: {
                                    border: '1px solid var(--border-strong)',
                                    borderRadius: '20px',
                                    padding: '18px',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr auto',
                                    gap: '12px',
                                    alignItems: 'center',
                                }, children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", style: { margin: 0, color: 'var(--ink-400)' }, children: entry.id ?? '--' }), _jsx("p", { style: { margin: '4px 0 0', fontWeight: 600 }, children: entry.ticketTitle ?? 'Loading approval' }), _jsx("p", { style: { margin: 0, color: 'var(--ink-500)', fontSize: '14px' }, children: entry.note ?? 'Awaiting note' })] }), _jsxs("div", { children: [_jsx("p", { style: { margin: 0, color: 'var(--ink-500)' }, children: "Requester" }), _jsx("p", { style: { margin: 0, fontWeight: 600 }, children: entry.approverName ?? '--' }), _jsx("p", { style: { margin: 0, color: '#ff6b6b', fontWeight: 600 }, children: formatTime(entry.createdAt) })] }), _jsxs("div", { style: { display: 'flex', gap: '8px' }, children: [_jsx("button", { type: "button", style: {
                                                    border: '1px solid var(--border-strong)',
                                                    borderRadius: 'var(--radius-pill)',
                                                    padding: '10px 16px',
                                                    background: 'transparent',
                                                    fontWeight: 600,
                                                }, children: "Decline" }), _jsx("button", { type: "button", style: {
                                                    border: 'none',
                                                    borderRadius: 'var(--radius-pill)',
                                                    padding: '10px 18px',
                                                    background: 'var(--accent-teal)',
                                                    color: '#fff',
                                                    fontWeight: 600,
                                                }, children: "Approve" })] })] }, entry.id))) })] }), _jsxs("section", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Recent activity" }), _jsx("ul", { style: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }, children: (history.length ? history : placeholder).map((row) => (_jsxs("li", { style: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }, children: [_jsx("span", { style: { color: 'var(--ink-500)' }, children: formatTime(row.createdAt) }), _jsx("span", { style: { flex: 1, marginLeft: '12px' }, children: row.ticketTitle ?? 'Approval update' }), _jsx("span", { style: {
                                                    color: row.state === 'rejected' ? '#ff6b6b' : 'var(--accent-teal)',
                                                }, children: row.state ?? '--' })] }, row.id))) })] }), _jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Policies" }), _jsx("ul", { style: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }, children: defaultPolicies.map((policy) => (_jsx("li", { style: { border: '1px solid var(--border-strong)', borderRadius: '16px', padding: '14px' }, children: _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsxs("div", { children: [_jsx("p", { style: { margin: 0, fontWeight: 600 }, children: policy.title }), _jsx("p", { style: { margin: 0, color: 'var(--ink-500)' }, children: policy.description })] }), _jsx("span", { className: "pill", style: {
                                                        background: 'var(--panel-highlight)',
                                                        color: policy.status === 'Active' ? 'var(--accent-teal)' : '#c07aff',
                                                        fontWeight: 600,
                                                    }, children: policy.status })] }) }, policy.title))) })] })] })] }) }));
};
export default EngineerApprovals;
