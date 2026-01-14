import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const Landing = () => (_jsx("div", { style: { background: 'var(--page-bg)', minHeight: '100vh', padding: '48px clamp(24px, 6vw, 80px)' }, children: _jsxs("div", { style: { maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }, children: [_jsxs("section", { className: "glass-panel", style: {
                    background: 'var(--gradient-hero)',
                    borderRadius: '40px',
                    padding: '48px',
                    textAlign: 'left'
                }, children: [_jsx("p", { className: "eyebrow", children: "Helpdesk Automation Tool" }), _jsx("h1", { children: "Ops that feel orchestrated" }), _jsx("p", { style: { marginTop: '12px', color: 'var(--ink-500)', maxWidth: '640px' }, children: "Choose the workspace that mirrors your role. Each surface follows the official Helpdesk UI kit\u2014Inter typography, elevated cards, cheerful iconography, and high-contrast alerts that carry across admin, engineer, and requester journeys." }), _jsx("div", { style: { display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }, children: _jsx(Link, { to: "/admin", style: {
                                borderRadius: 'var(--radius-pill)',
                                background: 'var(--gradient-pill)',
                                color: '#fff',
                                padding: '14px 28px',
                                fontWeight: 600,
                                boxShadow: '0 20px 40px rgba(63, 140, 255, 0.35)'
                            }, children: "Enter workspace" }) })] }), _jsx("section", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '24px'
                }, children: [
                    {
                        path: '/admin',
                        label: 'Admin cockpit',
                        description: 'Monitor SLA, orchestrate teams, run imports, and push broadcast notifications.',
                        accent: 'var(--accent-blue)'
                    },
                    {
                        path: '/engineer',
                        label: 'Engineer lane',
                        description: 'See handoffs, remote sessions, teammate status, and approvals in one place.',
                        accent: 'var(--accent-teal)'
                    },
                    {
                        path: '/user',
                        label: 'Requester hub',
                        description: 'Raise tickets, follow SLA timers, join remote sessions, and close once resolved.',
                        accent: 'var(--accent-blue-strong)'
                    }
                ].map((card) => (_jsxs(Link, { to: card.path, className: "glass-panel", style: {
                        padding: '28px',
                        borderRadius: '32px',
                        border: '1px solid var(--border-strong)',
                        background: '#fff'
                    }, children: [_jsx("p", { className: "eyebrow", style: { color: card.accent }, children: card.label }), _jsx("p", { style: { marginTop: '12px', color: 'var(--ink-500)' }, children: card.description })] }, card.path))) })] }) }));
export default Landing;
