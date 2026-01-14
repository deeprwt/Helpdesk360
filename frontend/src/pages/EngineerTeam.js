import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LayoutShell from '../components/LayoutShell';
import { engineerNav } from '../constants/nav';
import { useRoster } from '../hooks/useRemote';
const escalations = [
    { id: 'ESC-902', requester: 'User · D. Khan', target: 'Apps stack', state: 'Waiting' },
    { id: 'ESC-903', requester: 'Admin · H. Wu', target: 'Network edge', state: 'Accepted' }
];
const fallbackDetail = {
    name: 'Priya Kulkarni',
    timezone: 'UTC+5:30',
    badges: ['On remote', 'Camera ready'],
    bio: 'Senior engineer covering application stack escalations and remote approvals.',
    stats: [
        { label: 'Tickets this week', value: '14' },
        { label: 'Approvals cleared', value: '6' },
        { label: 'Avg. handle', value: '11m' }
    ]
};
const EngineerTeam = () => {
    const { data: roster = [], isLoading } = useRoster();
    const placeholders = isLoading && !roster.length ? Array.from({ length: 4 }, (_, idx) => ({ id: `placeholder-${idx}`, name: 'Loading...', role: '--', status: 'Remote', skills: [], load: '--' })) : [];
    const rosterDisplay = roster.length ? roster : placeholders;
    const focus = roster[0]
        ? {
            name: roster[0].name,
            timezone: 'Local',
            badges: ['Live', roster[0].status],
            bio: `${roster[0].role} covering ${roster[0].team ?? 'core operations'}.`,
            stats: fallbackDetail.stats
        }
        : fallbackDetail;
    return (_jsx(LayoutShell, { title: "Team mates", subtitle: "Presence, skills, and escalations per the engineer roster board.", navItems: engineerNav, accent: "teal", children: _jsxs("section", { style: { display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '24px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }, children: [_jsx("h2", { style: { margin: 0 }, children: "Live roster" }), _jsx("button", { type: "button", style: { border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-pill)', padding: '10px 18px', background: 'transparent', fontWeight: 600 }, children: "Filter" })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }, children: rosterDisplay.map((engineer) => (_jsxs("article", { className: "widget-card", style: { padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsxs("div", { children: [_jsx("p", { style: { margin: 0, fontWeight: 600 }, children: engineer.name }), _jsx("p", { style: { margin: 0, color: 'var(--ink-500)' }, children: engineer.role })] }), _jsx("span", { className: "pill", style: { background: 'var(--panel-highlight)', color: engineer.status === 'Online' ? 'var(--accent-teal)' : engineer.status === 'Remote' ? '#c07aff' : '#ffb347', fontWeight: 600 }, children: engineer.status })] }), _jsx("div", { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' }, children: (engineer.skills?.length ? engineer.skills : ['Console']).map((skill) => (_jsx("span", { className: "pill", style: { background: 'var(--panel-muted)', color: 'var(--ink-600)', fontWeight: 600 }, children: skill }, skill))) }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsx("span", { style: { fontSize: '13px', color: 'var(--ink-500)' }, children: engineer.load ?? '2 tickets' }), _jsx("button", { type: "button", style: { border: 'none', background: 'transparent', color: 'var(--accent-blue-strong)', fontWeight: 600 }, children: "Ping" })] })] }, engineer.id ?? engineer.name))) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", style: { margin: 0, color: 'var(--ink-400)' }, children: "Focus engineer" }), _jsx("h3", { style: { margin: '4px 0 0' }, children: focus.name }), _jsx("p", { style: { margin: 0, color: 'var(--ink-500)' }, children: focus.bio })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }, children: [_jsx("span", { style: { fontWeight: 600 }, children: focus.timezone }), _jsx("div", { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' }, children: focus.badges.map((badge) => (_jsx("span", { className: "pill", style: { background: 'var(--panel-highlight)', color: 'var(--accent-teal)', fontWeight: 600 }, children: badge }, badge))) })] })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', marginTop: '16px' }, children: focus.stats.map((stat) => (_jsxs("article", { className: "widget-card", style: { padding: '14px' }, children: [_jsx("p", { style: { margin: 0, color: 'var(--ink-500)' }, children: stat.label }), _jsx("p", { style: { margin: 0, fontWeight: 600 }, children: stat.value })] }, stat.label))) }), _jsx("button", { type: "button", style: { marginTop: '16px', border: 'none', borderRadius: 'var(--radius-pill)', padding: '10px 18px', background: 'var(--accent-blue)', color: '#fff', fontWeight: 600 }, children: "Start swarm" })] }), _jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }, children: [_jsx("h3", { style: { margin: 0 }, children: "Escalations" }), _jsx("button", { type: "button", style: { border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-pill)', padding: '8px 14px', background: 'transparent', fontWeight: 600 }, children: "Create" })] }), _jsx("ul", { style: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }, children: escalations.map((item) => (_jsxs("li", { style: { border: '1px solid var(--border-strong)', borderRadius: '16px', padding: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', alignItems: 'center' }, children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", style: { margin: 0, color: 'var(--ink-400)' }, children: item.id }), _jsx("p", { style: { margin: '4px 0 0', fontWeight: 600 }, children: item.requester })] }), _jsx("p", { style: { margin: 0, fontWeight: 600 }, children: item.target }), _jsx("span", { className: "pill", style: { background: 'var(--panel-highlight)', color: item.state === 'Waiting' ? '#f07f2e' : 'var(--accent-teal)', fontWeight: 600 }, children: item.state })] }, item.id))) })] })] })] }) }));
};
export default EngineerTeam;
