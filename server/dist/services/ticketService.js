"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardInsights = exports.addComment = exports.listComments = exports.updateTicketStatus = exports.createTicket = exports.getTicketById = exports.listTickets = void 0;
const pool_1 = require("../db/pool");
const mapTicket = (row) => ({
    id: row.id,
    title: row.title,
    requester: row.requester_name ?? row.requester_fallback ?? 'Unidentified',
    assignee: row.assignee_name ?? row.assignee_fallback ?? undefined,
    team: row.team,
    priority: row.priority,
    status: row.status,
    slaEndsAt: row.sla_ends_at?.toISOString(),
    updatedAt: row.updated_at.toISOString(),
    category: row.category,
    site: row.site
});
const fallbackTickets = [
    {
        id: 'demo-1',
        title: 'Printer outage at Mumbai HQ',
        requester: 'Nikita Shah',
        assignee: 'Karan Patel',
        team: 'Field Ops',
        priority: 'high',
        status: 'in_progress',
        slaEndsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        category: 'Hardware',
        site: 'Mumbai HQ'
    },
    {
        id: 'demo-2',
        title: 'VPN not reachable for APAC users',
        requester: 'Liang Chen',
        assignee: 'Remote Swarm',
        team: 'Network',
        priority: 'urgent',
        status: 'out_of_sla',
        slaEndsAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        category: 'Network',
        site: 'Remote'
    }
];
const listTickets = async (scope) => {
    const filter = scope === 'engineer'
        ? "WHERE t.assignee_id IS NOT NULL"
        : scope === 'user'
            ? 'WHERE t.requester_id IS NOT NULL OR t.requester_name IS NOT NULL'
            : '';
    const rows = await (0, pool_1.query)(`SELECT
        t.id,
        t.title,
        t.description,
        r.full_name AS requester_name,
        t.requester_name AS requester_fallback,
        a.full_name AS assignee_name,
        t.assignee_name AS assignee_fallback,
        t.team,
        t.priority,
        t.status,
        t.sla_ends_at,
        t.updated_at,
        t.category,
        t.site
      FROM tickets t
      LEFT JOIN users r ON r.id = t.requester_id
      LEFT JOIN users a ON a.id = t.assignee_id
      ${filter}
      ORDER BY t.updated_at DESC
      LIMIT 40`);
    if (!rows.length) {
        return fallbackTickets;
    }
    return rows.map(mapTicket);
};
exports.listTickets = listTickets;
const getTicketById = async (ticketId) => {
    const rows = await (0, pool_1.query)(`SELECT t.id,
            t.title,
            t.description,
            r.full_name AS requester_name,
            t.requester_name AS requester_fallback,
            a.full_name AS assignee_name,
            t.assignee_name AS assignee_fallback,
            t.team,
            t.priority,
            t.status,
            t.sla_ends_at,
            t.updated_at,
            t.category,
            t.site
       FROM tickets t
       LEFT JOIN users r ON r.id = t.requester_id
       LEFT JOIN users a ON a.id = t.assignee_id
       WHERE t.id = $1
       LIMIT 1`, [ticketId]);
    const ticket = rows[0];
    if (!ticket) {
        const fallback = fallbackTickets.find((demo) => demo.id === ticketId);
        if (fallback) {
            return fallback;
        }
        throw new Error('Ticket not found');
    }
    return mapTicket(ticket);
};
exports.getTicketById = getTicketById;
const createTicket = async (payload) => {
    const [inserted] = await (0, pool_1.query)(`INSERT INTO tickets (title, description, requester_name, site, priority, category, status, team)
     VALUES ($1, $2, $3, $4, $5, $6, 'new', 'Field Ops')
     RETURNING id`, [payload.title, payload.description, payload.requester, payload.site, payload.priority, payload.category]);
    return (0, exports.getTicketById)(inserted.id);
};
exports.createTicket = createTicket;
const updateTicketStatus = async (ticketId, status) => {
    const [row] = await (0, pool_1.query)(`UPDATE tickets
       SET status = $2,
           updated_at = now()
     WHERE id = $1
     RETURNING id`, [ticketId, status]);
    if (!row) {
        throw new Error('Ticket not found');
    }
    return (0, exports.getTicketById)(row.id);
};
exports.updateTicketStatus = updateTicketStatus;
const mapComment = (row) => ({
    id: row.id,
    ticketId: row.ticket_id,
    author: row.author_name,
    role: row.author_role,
    body: row.body,
    visibility: row.visibility,
    createdAt: row.created_at.toISOString()
});
const commentFallback = [
    {
        id: 'demo-comment',
        ticketId: 'demo-1',
        author: 'Automation bot',
        role: 'admin',
        body: 'Baseline comment placeholder—configure Supabase to store the real stream.',
        visibility: 'public',
        createdAt: new Date().toISOString()
    }
];
const listComments = async (ticketId) => {
    const rows = await (0, pool_1.query)(`SELECT id, ticket_id, author_name, author_role, body, visibility, created_at
       FROM ticket_comments
       WHERE ticket_id = $1
       ORDER BY created_at DESC`, [ticketId]);
    if (!rows.length) {
        return commentFallback.filter((demo) => demo.ticketId === ticketId);
    }
    return rows.map(mapComment);
};
exports.listComments = listComments;
const addComment = async (ticketId, body, visibility) => {
    const [row] = await (0, pool_1.query)(`INSERT INTO ticket_comments (ticket_id, author_name, author_role, body, visibility)
     VALUES ($1, 'Admin Persona', 'admin', $2, $3)
     RETURNING id, ticket_id, author_name, author_role, body, visibility, created_at`, [ticketId, body, visibility]);
    return mapComment(row);
};
exports.addComment = addComment;
const dashboardInsights = async () => {
    const [overview] = await (0, pool_1.query)(`SELECT COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE status = 'out_of_sla')::int AS breached,
            COUNT(*) FILTER (WHERE status = 'remote_required')::int AS remote,
            COUNT(*) FILTER (WHERE status = 'waiting_customer')::int AS awaiting
       FROM tickets`);
    const backlog = await (0, pool_1.query)(`SELECT t.id,
            t.title,
            t.description,
            r.full_name AS requester_name,
            t.requester_name AS requester_fallback,
            a.full_name AS assignee_name,
            t.assignee_name AS assignee_fallback,
            t.team,
            t.priority,
            t.status,
            t.sla_ends_at,
            t.updated_at,
            t.category,
            t.site
       FROM tickets t
       LEFT JOIN users r ON r.id = t.requester_id
       LEFT JOIN users a ON a.id = t.assignee_id
       ORDER BY t.updated_at DESC
       LIMIT 5`);
    const stats = [
        { label: 'Live tickets', value: overview?.total ?? 24, trend: 8, variant: 'positive' },
        { label: 'Out of SLA', value: overview?.breached ?? 2, trend: -4, variant: 'negative' },
        { label: 'Remote sessions', value: overview?.remote ?? 5, trend: 12, variant: 'positive' },
        { label: 'Waiting on users', value: overview?.awaiting ?? 3, trend: -6, variant: 'neutral' }
    ];
    return { stats, backlog: backlog.length ? backlog.map(mapTicket) : fallbackTickets };
};
exports.dashboardInsights = dashboardInsights;
