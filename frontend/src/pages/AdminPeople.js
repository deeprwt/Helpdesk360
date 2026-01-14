import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LayoutShell from '../components/LayoutShell';
import { adminNav } from '../constants/nav';
const teammates = [
    { name: 'Anika Shah', role: 'Admin', team: 'Networking', status: 'Online' },
    { name: 'Marcus Lee', role: 'Engineer', team: 'Field Ops', status: 'Remote' },
    { name: 'Priya Kulkarni', role: 'Engineer', team: 'Applications', status: 'Offline' },
    { name: 'Diego Ramirez', role: 'Admin', team: 'Security', status: 'Online' }
];
const AdminPeople = () => (_jsx(LayoutShell, { title: "People & permissions", subtitle: "Matches the people boards: directory cards, quick actions, and add-engineer forms.", navItems: adminNav, accent: "amber", children: _jsxs("section", { style: { display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '24px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }, children: [_jsx("h2", { style: { margin: 0 }, children: "Team directory" }), _jsx("button", { type: "button", style: {
                                    borderRadius: 'var(--radius-pill)',
                                    border: 'none',
                                    padding: '12px 20px',
                                    background: 'var(--gradient-pill)',
                                    color: '#fff',
                                    fontWeight: 600
                                }, children: "+ Add engineer" })] }), _jsxs("table", { style: { width: '100%', borderCollapse: 'collapse' }, children: [_jsx("thead", { children: _jsx("tr", { style: { textAlign: 'left', color: 'var(--ink-400)', fontSize: '12px' }, children: ['Name', 'Role', 'Team', 'Status', 'Actions'].map((heading) => (_jsx("th", { className: "eyebrow", style: { paddingBottom: '8px' }, children: heading }, heading))) }) }), _jsx("tbody", { children: teammates.map((mate) => (_jsxs("tr", { style: { borderTop: '1px solid var(--border-strong)' }, children: [_jsx("td", { style: { padding: '12px 0', fontWeight: 600 }, children: mate.name }), _jsx("td", { style: { padding: '12px 0' }, children: mate.role }), _jsx("td", { style: { padding: '12px 0' }, children: mate.team }), _jsx("td", { style: { padding: '12px 0' }, children: _jsx("span", { className: "pill", style: { background: 'var(--panel-highlight)', color: mate.status === 'Online' ? 'var(--accent-teal)' : 'var(--ink-600)' }, children: mate.status }) }), _jsx("td", { style: { padding: '12px 0' }, children: _jsx("button", { type: "button", style: {
                                                    border: 'none',
                                                    background: 'transparent',
                                                    color: 'var(--accent-blue-strong)',
                                                    fontWeight: 600,
                                                    cursor: 'pointer'
                                                }, children: "Manage" }) })] }, mate.name))) })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Invite form" }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: "Hook this form to the `/api/users` endpoint when ready." }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }, children: [['Full name', 'Email', 'Team'].map((label) => (_jsx("input", { placeholder: label, style: {
                                            borderRadius: '16px',
                                            border: '1px solid var(--border-strong)',
                                            padding: '12px',
                                            background: 'var(--panel-muted)'
                                        } }, label))), _jsx("button", { type: "button", style: {
                                            borderRadius: 'var(--radius-pill)',
                                            border: 'none',
                                            padding: '12px',
                                            background: 'var(--accent-blue)',
                                            color: '#fff',
                                            fontWeight: 600
                                        }, children: "Send invite" })] })] }), _jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Access summary" }), _jsx("ul", { style: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }, children: ['Admins: 6', 'Engineers: 18', 'Requesters: 1.2k'].map((row) => (_jsx("li", { style: { color: 'var(--ink-600)', fontWeight: 600 }, children: row }, row))) }), _jsx("button", { type: "button", style: {
                                    marginTop: '12px',
                                    borderRadius: 'var(--radius-pill)',
                                    border: '1px solid var(--border-strong)',
                                    padding: '10px 16px',
                                    background: 'transparent',
                                    fontWeight: 600,
                                    color: 'var(--ink-600)'
                                }, children: "Export CSV" })] })] })] }) }));
export default AdminPeople;
