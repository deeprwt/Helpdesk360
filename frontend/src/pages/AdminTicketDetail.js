import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LayoutShell from '../components/LayoutShell';
import { useTicket } from '../hooks/useTickets';
import { addTicketComment, fetchTicketComments, updateTicketStatus } from '../api/tickets';
import Timeline from '../components/Timeline';
import { adminDetailNav } from '../constants/nav';
const statusOptions = [
    'new',
    'open',
    'in_progress',
    'waiting_customer',
    'waiting_vendor',
    'remote_required',
    'out_of_sla',
    'closed'
];
const AdminTicketDetail = () => {
    const { ticketId } = useParams();
    const queryClient = useQueryClient();
    const { data: ticket } = useTicket(ticketId);
    const { data: comments = [] } = useQuery({
        queryKey: ['comments', ticketId],
        queryFn: () => {
            if (!ticketId) {
                throw new Error('Missing ticket id');
            }
            return fetchTicketComments(ticketId);
        },
        enabled: Boolean(ticketId)
    });
    const [comment, setComment] = useState('');
    const [visibility, setVisibility] = useState('public');
    const statusMutation = useMutation({
        mutationFn: (status) => {
            if (!ticketId) {
                throw new Error('Missing ticket id');
            }
            return updateTicketStatus(ticketId, status);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] });
            queryClient.invalidateQueries({ queryKey: ['tickets'] });
        }
    });
    const commentMutation = useMutation({
        mutationFn: () => {
            if (!ticketId) {
                throw new Error('Missing ticket id');
            }
            return addTicketComment(ticketId, comment, visibility);
        },
        onSuccess: () => {
            setComment('');
            queryClient.invalidateQueries({ queryKey: ['comments', ticketId] });
        }
    });
    if (!ticket) {
        return null;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        commentMutation.mutate();
    };
    return (_jsx(LayoutShell, { title: ticket.title, subtitle: `${ticket.requester} · ${ticket.site}`, navItems: adminDetailNav(ticket.id), accent: "violet", children: _jsxs("section", { style: { display: 'grid', gap: '24px', gridTemplateColumns: '2fr 1fr', alignItems: 'start' }, children: [_jsxs("div", { children: [_jsxs("div", { className: "glass-panel", style: { padding: '24px', marginBottom: '24px' }, children: [_jsx("h2", { children: "Resolution stream" }), _jsx(Timeline, { items: comments.map((note) => ({
                                        label: note.body,
                                        timestamp: new Date(note.createdAt).toLocaleString(),
                                        meta: `${note.author} · ${note.visibility}`
                                    })) })] }), _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx("textarea", { value: comment, onChange: (event) => setComment(event.target.value), placeholder: "Add internal or public commentary", style: {
                                        borderRadius: '20px',
                                        border: '1px solid var(--border-strong)',
                                        padding: '16px',
                                        minHeight: '120px',
                                        background: 'var(--panel-muted)',
                                        color: 'var(--ink-900)'
                                    } }), _jsxs("div", { style: { display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between' }, children: [_jsx("div", { style: { display: 'flex', gap: '8px' }, children: ['public', 'internal'].map((type) => (_jsx("button", { type: "button", onClick: () => setVisibility(type), style: {
                                                    padding: '10px 18px',
                                                    borderRadius: '999px',
                                                    border: '1px solid var(--border-strong)',
                                                    background: visibility === type ? 'var(--gradient-pill)' : 'transparent',
                                                    color: visibility === type ? '#fff' : 'var(--ink-600)',
                                                    cursor: 'pointer'
                                                }, children: type }, type))) }), _jsx("button", { type: "submit", disabled: commentMutation.isPending, style: {
                                                borderRadius: '999px',
                                                border: 'none',
                                                padding: '12px 24px',
                                                background: 'var(--gradient-pill)',
                                                color: '#fff',
                                                fontWeight: 600,
                                                cursor: 'pointer'
                                            }, children: commentMutation.isPending ? 'Posting…' : 'Add comment' })] })] })] }), _jsxs("aside", { style: { display: 'flex', flexDirection: 'column', gap: '18px' }, children: [_jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("label", { style: { fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-400)' }, children: "Status" }), _jsx("select", { value: ticket.status, onChange: (event) => statusMutation.mutate(event.target.value), style: {
                                        width: '100%',
                                        marginTop: '12px',
                                        borderRadius: '16px',
                                        padding: '14px',
                                        background: 'var(--panel-muted)',
                                        border: '1px solid var(--border-strong)',
                                        color: 'var(--ink-900)'
                                    }, children: statusOptions.map((status) => (_jsx("option", { value: status, style: { color: '#111322' }, children: status.replace('_', ' ') }, status))) })] }), _jsxs("div", { className: "glass-panel", style: { padding: '20px' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Remote guidance" }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: "Kick off a secure remote session, review engineer notes, and trigger approvals as designed in the Figma remote page." }), _jsx("button", { style: {
                                        width: '100%',
                                        borderRadius: '16px',
                                        border: '1px solid var(--border-strong)',
                                        padding: '14px',
                                        marginTop: '12px',
                                        background: 'var(--panel-muted)',
                                        color: 'var(--ink-900)',
                                        fontWeight: 600
                                    }, children: "Launch remote console" })] })] })] }) }));
};
export default AdminTicketDetail;
