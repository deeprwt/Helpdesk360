import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LayoutShell from '../components/LayoutShell';
import { engineerNav } from '../constants/nav';
import { useRemoteSessions } from '../hooks/useRemote';
const quickActions = ['Lock console', 'Share camera', 'Escalate', 'End session'];
const healthMetrics = [
    { label: 'Latency', value: '48 ms', tone: 'positive' },
    { label: 'Packet loss', value: '0.6%', tone: 'alert' },
    { label: 'Camera FPS', value: '24', tone: 'neutral' },
    { label: 'Audio status', value: 'Stable', tone: 'positive' }
];
const formatTime = (value) => (value ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--');
const formatDuration = (value) => {
    if (!value)
        return '--';
    const diffMs = Date.now() - new Date(value).getTime();
    if (diffMs <= 0)
        return '--';
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} elapsed`;
};
const defaultTimeline = [
    { time: '12:07', label: 'Config backup stored', tone: 'positive' },
    { time: '12:02', label: 'Session resumed after approval', tone: 'neutral' },
    { time: '11:55', label: 'Camera feed muted by requester', tone: 'neutral' }
];
const EngineerRemote = () => {
    const { data: sessions = [], isLoading } = useRemoteSessions();
    const liveSession = sessions.find((session) => session.state === 'live') ?? sessions[0];
    const sessionTimeline = liveSession
        ? [
            { time: formatTime(liveSession.startedAt), label: 'Session started', tone: 'positive' },
            liveSession.endedAt ? { time: formatTime(liveSession.endedAt), label: 'Session closed', tone: 'neutral' } : null
        ].filter(Boolean)
        : [];
    const timeline = sessionTimeline.length ? sessionTimeline : defaultTimeline;
    return (_jsx(LayoutShell, { title: "Remote console", subtitle: "Session console, chat, and controls the way the engineer board depicts.", navItems: engineerNav, accent: "teal", children: _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }, children: [_jsxs("section", { className: "glass-panel", style: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }, children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", style: { margin: 0, color: 'var(--ink-400)' }, children: liveSession?.ticketTitle ?? 'No session selected' }), _jsxs("h2", { style: { margin: 0 }, children: ["Session pin ", liveSession?.pin ?? '-- -- --'] }), _jsx("p", { style: { margin: '4px 0 0', color: 'var(--ink-500)' }, children: liveSession?.site ?? 'Select a session to see details' })] }), _jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx("span", { className: "pill", style: { background: 'var(--panel-highlight)', color: 'var(--accent-teal)', fontWeight: 600 }, children: liveSession?.state ?? 'Idle' }), _jsx("button", { type: "button", style: { border: 'none', borderRadius: 'var(--radius-pill)', padding: '10px 18px', background: 'var(--accent-blue)', color: '#fff', fontWeight: 600 }, children: "End session" })] })] }), _jsxs("div", { className: "widget-card", style: { padding: '20px', display: 'flex', justifyContent: 'space-between', borderRadius: '24px' }, children: [_jsxs("div", { children: [_jsx("p", { style: { margin: 0, color: 'var(--ink-500)' }, children: "Uptime" }), _jsx("p", { style: { margin: 0, fontWeight: 600 }, children: formatDuration(liveSession?.startedAt) })] }), _jsxs("div", { children: [_jsx("p", { style: { margin: 0, color: 'var(--ink-500)' }, children: "Channel" }), _jsx("p", { style: { margin: 0, fontWeight: 600 }, children: liveSession?.provider ?? 'Switchboard console' })] }), _jsxs("div", { children: [_jsx("p", { style: { margin: 0, color: 'var(--ink-500)' }, children: "Controls" }), _jsx("div", { style: { display: 'flex', gap: '8px' }, children: ['Mic', 'Camera', 'Console'].map((control) => (_jsx("button", { type: "button", style: { border: '1px solid var(--border-strong)', borderRadius: '50%', width: '40px', height: '40px', background: 'transparent', fontWeight: 600 }, children: control[0] }, control))) })] })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx("h3", { style: { margin: 0 }, children: "Chat" }), _jsx("div", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: liveSession ? (_jsxs("p", { style: { margin: 0 }, children: ["Requester \u00B7 ", liveSession.requester ?? '--', " \u00B7 ", formatTime(liveSession.startedAt)] })) : (_jsx("p", { style: { margin: 0 }, children: "Chat transcript will surface once a session is live." })) }), _jsx("textarea", { placeholder: "Type update", style: { borderRadius: '16px', border: '1px solid var(--border-strong)', padding: '10px', background: 'var(--panel-muted)', minHeight: '72px' } }), _jsx("button", { type: "button", style: { alignSelf: 'flex-end', border: 'none', borderRadius: 'var(--radius-pill)', padding: '8px 16px', background: 'var(--accent-teal)', color: '#fff', fontWeight: 600 }, children: "Send" })] }), _jsxs("div", { className: "glass-panel", style: { padding: '16px' }, children: [_jsx("h3", { style: { margin: 0 }, children: "Timeline" }), _jsx("ul", { style: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }, children: timeline.map((entry) => (_jsxs("li", { style: { display: 'flex', gap: '12px' }, children: [_jsx("span", { className: "eyebrow", style: { width: '48px', color: 'var(--ink-400)' }, children: entry.time }), _jsx("span", { style: { fontWeight: 600, color: entry.tone === 'positive' ? 'var(--accent-teal)' : entry.tone === 'alert' ? '#ff6b6b' : 'var(--ink-600)' }, children: entry.label })] }, entry.label))) })] })] })] }), _jsxs("section", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx("h3", { style: { margin: 0 }, children: "Quick actions" }), _jsx("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '10px' }, children: quickActions.map((action) => (_jsx("button", { type: "button", style: { border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-pill)', padding: '10px 18px', background: 'transparent', fontWeight: 600 }, children: action }, action))) })] }), _jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Session health" }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }, children: healthMetrics.map((metric) => (_jsxs("article", { className: "widget-card", style: { padding: '14px' }, children: [_jsx("p", { style: { margin: 0, color: 'var(--ink-500)' }, children: metric.label }), _jsx("p", { style: { margin: 0, fontWeight: 600, color: metric.tone === 'alert' ? '#ff6b6b' : metric.tone === 'positive' ? 'var(--accent-teal)' : 'var(--ink-600)' }, children: metric.value })] }, metric.label))) })] })] })] }) }));
};
export default EngineerRemote;
