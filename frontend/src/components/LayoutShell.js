import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
const accentMap = {
    amber: 'linear-gradient(90deg, #ffcc00 0%, #f6b73c 100%)',
    teal: 'linear-gradient(90deg, #12c6c2 0%, #1a7a5e 100%)',
    violet: 'linear-gradient(90deg, #3f8cff 0%, #006dc7 100%)'
};
const accentShadow = {
    amber: 'rgba(255, 204, 0, 0.35)',
    teal: 'rgba(18, 198, 194, 0.35)',
    violet: 'rgba(63, 140, 255, 0.35)'
};
const LayoutShell = ({ title, subtitle, navItems, accent = 'amber', actions, children }) => {
    const location = useLocation();
    return (_jsx("div", { style: { minHeight: '100vh', background: 'var(--page-bg)' }, children: _jsx("div", { style: { padding: '32px clamp(20px, 4vw, 64px)' }, children: _jsxs("div", { style: {
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px'
                }, children: [_jsxs("header", { style: {
                            background: 'var(--gradient-hero)',
                            borderRadius: '32px',
                            padding: '32px',
                            border: '1px solid var(--border-light)',
                            boxShadow: 'var(--shadow-panel)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }, children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "Helpdesk Automation" }), _jsx("h1", { style: { marginTop: '4px' }, children: title }), subtitle && (_jsx("p", { style: { marginTop: '8px', color: 'var(--ink-500)', maxWidth: '640px' }, children: subtitle }))] }), actions && (_jsx("div", { style: { display: 'flex', alignItems: 'center' }, children: actions }))] }), _jsx("nav", { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' }, children: navItems.map((item) => {
                                    const active = item.href === location.pathname;
                                    return (_jsx(Link, { to: item.href, style: {
                                            padding: '12px 20px',
                                            borderRadius: 'var(--radius-pill)',
                                            border: `1px solid ${active ? 'transparent' : 'var(--border-light)'}`,
                                            background: active ? accentMap[accent] : 'transparent',
                                            color: active ? '#fff' : 'var(--ink-600)',
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            boxShadow: active ? `0 12px 30px ${accentShadow[accent]}` : 'none'
                                        }, children: item.label }, item.href));
                                }) })] }), _jsx("main", { className: clsx('glass-panel'), style: { padding: '32px', background: 'var(--panel-bg)' }, children: children })] }) }) }));
};
export default LayoutShell;
