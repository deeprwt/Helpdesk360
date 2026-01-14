import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import LayoutShell from '../components/LayoutShell';
import { createTicket } from '../api/tickets';
import { userNav } from '../constants/nav';
const priorityOptions = ['low', 'medium', 'high', 'urgent'];
const UserNewTicket = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        requester: '',
        site: '',
        priority: 'medium',
        category: 'Hardware'
    });
    const mutation = useMutation({
        mutationFn: () => createTicket(form),
        onSuccess: (ticket) => navigate(`/user/tickets/${ticket.id}`)
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        mutation.mutate();
    };
    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };
    return (_jsx(LayoutShell, { title: "Create ticket", subtitle: "Matches the 'User new ticket' board: simple stacked form with priority tabs and attachment affordances.", navItems: userNav, accent: "violet", children: _jsxs("form", { onSubmit: handleSubmit, style: { display: 'grid', gap: '18px', maxWidth: '720px' }, children: [['title', 'requester', 'site'].map((field) => (_jsxs("label", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("span", { style: { fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-400)' }, children: field }), _jsx("input", { required: true, value: form[field], onChange: (event) => handleChange(field, event.target.value), style: {
                                borderRadius: '16px',
                                border: '1px solid var(--border-strong)',
                                padding: '14px',
                                background: 'var(--panel-muted)',
                                color: 'var(--ink-900)'
                            } })] }, field))), _jsxs("label", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("span", { style: { fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-400)' }, children: "Category" }), _jsx("select", { value: form.category, onChange: (event) => handleChange('category', event.target.value), style: {
                                borderRadius: '16px',
                                padding: '14px',
                                background: 'var(--panel-muted)',
                                color: 'var(--ink-900)',
                                border: '1px solid var(--border-strong)'
                            }, children: ['Hardware', 'Software', 'Network', 'Access'].map((option) => (_jsx("option", { value: option, style: { color: '#111322' }, children: option }, option))) })] }), _jsxs("label", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("span", { style: { fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-400)' }, children: "Priority" }), _jsx("div", { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' }, children: priorityOptions.map((priority) => (_jsx("button", { type: "button", onClick: () => handleChange('priority', priority), style: {
                                    flex: '1 1 120px',
                                    borderRadius: '18px',
                                    padding: '14px',
                                    border: '1px solid var(--border-strong)',
                                    background: form.priority === priority ? 'var(--gradient-pill)' : 'transparent',
                                    color: form.priority === priority ? '#fff' : 'var(--ink-900)',
                                    textTransform: 'capitalize'
                                }, children: priority }, priority))) })] }), _jsxs("label", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("span", { style: { fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-400)' }, children: "Description" }), _jsx("textarea", { required: true, value: form.description, onChange: (event) => handleChange('description', event.target.value), rows: 6, style: {
                                borderRadius: '20px',
                                border: '1px solid var(--border-strong)',
                                padding: '16px',
                                background: 'var(--panel-muted)',
                                color: 'var(--ink-900)'
                            } })] }), _jsx("button", { type: "submit", disabled: mutation.isPending, style: {
                        borderRadius: '999px',
                        border: 'none',
                        padding: '14px',
                        background: 'var(--gradient-pill)',
                        color: '#fff',
                        fontWeight: 600
                    }, children: mutation.isPending ? 'Dispatching…' : 'Submit ticket' })] }) }));
};
export default UserNewTicket;
