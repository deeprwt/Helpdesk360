import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LayoutShell from '../components/LayoutShell';
import { adminNav } from '../constants/nav';
import { useApprovals, useRemoteSessions } from '../hooks/useRemote';
const formatTime = (iso) => (iso ? new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--');
const AdminRemote = () => {
    const { data: sessions = [], isLoading: sessionsLoading } = useRemoteSessions();
    const { data: approvals = [], isLoading: approvalsLoading } = useApprovals();
    const activity = sessions.slice(0, 3).map((session) => ({
        time: formatTime(session.startedAt),
        label: `${session.ticketTitle ?? 'Session'} · ${session.state}`,
        tone: session.state === 'live' ? 'positive' : session.state === 'closed' ? 'neutral' : 'alert'
    }));
    const placeholderSessions = Array.from({ length: 3 }, (_, i) => ({
        id: `placeholder-${i}`,
        ticketId: 'placeholder',
        state: 'scheduled',
        provider: 'Loading',
        pin: '-- -- --'
    }));
    const placeholderApprovals = Array.from({ length: 2 }, (_, i) => ({
        id: `placeholder-${i}`,
        ticketId: 'placeholder',
        state: 'pending',
        note: 'Loading',
        createdAt: new Date().toISOString()
    }));
    const sessionCards = sessions.length ? sessions : sessionsLoading ? placeholderSessions : [];
    const approvalList = approvals.length ? approvals : approvalsLoading ? placeholderApprovals : [];
    return (_jsx(LayoutShell, { title: "Remote session orchestration", subtitle: "Session queue, approvals, and audit activity just like the admin remote board.", navItems: adminNav, accent: "violet", children: _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }, children: [_jsxs("section", { className: "glass-panel", style: { padding: '24px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }, children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", style: { marginBottom: '4px', color: 'var(--ink-400)' }, children: "Live sessions" }), _jsx("h2", { style: { margin: 0 }, children: "Console orchestration" })] }), _jsxs("div", { style: { display: 'flex', gap: '8px' }, children: [_jsx("button", { type: "button", style: {
                                                borderRadius: 'var(--radius-pill)',
                                                border: '1px solid var(--border-strong)',
                                                padding: '10px 16px',
                                                background: 'transparent',
                                                fontWeight: 600
                                            }, children: "Pause all" }), _jsx("button", { type: "button", style: {
                                                borderRadius: 'var(--radius-pill)',
                                                border: 'none',
                                                padding: '10px 18px',
                                                background: 'var(--gradient-pill)',
                                                color: '#fff',
                                                fontWeight: 600
                                            }, children: "New session" })] })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }, children: sessionCards.map((session) => (_jsxs("article", { className: "widget-card", style: { padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', fontWeight: 600 }, children: [_jsx("span", { children: session.id }), _jsx("span", { className: "pill", style: { background: 'var(--panel-highlight)', color: session.state === 'live' ? 'var(--accent-teal)' : session.state === 'closed' ? 'var(--accent-blue-strong)' : '#c07aff' }, children: session.state ?? 'pending' })] }), _jsxs("div", { children: [_jsx("p", { style: { margin: 0, fontWeight: 600 }, children: session.requester ?? '--' }), _jsx("p", { style: { margin: 0, color: 'var(--ink-500)', fontSize: '14px' }, children: session.site ?? '--' })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--ink-500)' }, children: [_jsx("span", { children: session.provider ?? 'Console' }), _jsxs("span", { children: ["Started ", formatTime(session.startedAt)] })] }), _jsxs("div", { style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '10px 14px',
                                            borderRadius: '16px',
                                            background: 'var(--panel-muted)'
                                        }, children: [_jsx("span", { style: { fontWeight: 600, letterSpacing: '0.08em' }, children: session.pin ?? '-- -- --' }), _jsx("button", { type: "button", style: { border: 'none', background: 'transparent', color: 'var(--accent-blue-strong)', fontWeight: 600 }, children: "Copy" })] })] }, session.id))) })] }), _jsxs("section", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }, children: [_jsx("h3", { style: { margin: 0 }, children: "Approvals queue" }), _jsx("button", { type: "button", style: { border: 'none', background: 'transparent', color: 'var(--accent-blue-strong)', fontWeight: 600 }, children: "View policy" })] }), _jsx("ul", { style: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }, children: approvalList.map((approval) => (_jsxs("li", { style: { border: '1px solid var(--border-strong)', borderRadius: '18px', padding: '14px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', fontWeight: 600 }, children: [_jsx("span", { children: approval.ticketTitle ?? approval.ticketTitle }), _jsx("span", { className: "eyebrow", style: { color: 'var(--ink-400)' }, children: approval.id })] }), _jsxs("p", { style: { margin: '4px 0', color: 'var(--ink-500)' }, children: ["Owner \u00B7 ", approval.approverName ?? '--'] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--ink-500)' }, children: [_jsx("span", { children: approval.note ?? 'Awaiting note' }), _jsx("span", { style: { color: approval.state === 'pending' ? '#ff6b6b' : 'var(--accent-teal)', fontWeight: 600 }, children: approval.state })] }), _jsxs("div", { style: { display: 'flex', gap: '8px', marginTop: '12px' }, children: [_jsx("button", { type: "button", style: { border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-pill)', padding: '8px 14px', background: 'transparent', fontWeight: 600 }, children: "Reject" }), _jsx("button", { type: "button", style: { border: 'none', borderRadius: 'var(--radius-pill)', padding: '8px 18px', background: 'var(--accent-teal)', color: '#fff', fontWeight: 600 }, children: "Approve" })] })] }, approval.id))) })] }), _jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Audit feed" }), _jsx("ul", { style: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }, children: (activity.length ? activity : [{ time: '--', label: 'No recent activity', tone: 'neutral' }]).map((entry) => (_jsxs("li", { style: { display: 'flex', justifyContent: 'space-between', fontSize: '13px' }, children: [_jsx("span", { style: { color: 'var(--ink-500)' }, children: entry.time }), _jsx("span", { style: { flex: 1, marginLeft: '12px', fontWeight: 600, color: entry.tone === 'alert' ? '#ff6b6b' : entry.tone === 'positive' ? 'var(--accent-teal)' : 'var(--ink-600)' }, children: entry.label })] }, entry.label))) }), _jsx("button", { type: "button", style: { marginTop: '16px', border: 'none', background: 'transparent', color: 'var(--accent-blue-strong)', fontWeight: 600 }, children: "View audit trail" })] })] })] }) }));
};
export default AdminRemote;
