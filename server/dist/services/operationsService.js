"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRoster = exports.listApprovals = exports.listRemoteSessions = exports.listImportBatches = void 0;
const pool_1 = require("../db/pool");
const parseMetadata = (metadata) => ({
    schedule: typeof metadata?.schedule === 'string' ? metadata.schedule : undefined,
    errors: typeof metadata?.errors === 'number' ? metadata.errors : undefined
});
const mapImportBatch = (row) => {
    const meta = parseMetadata(row.metadata);
    const calculatedErrors = meta.errors ?? Math.max(row.records_total - row.records_success, 0);
    return {
        id: row.id,
        source: row.source,
        status: row.status,
        recordsTotal: row.records_total,
        recordsSuccess: row.records_success,
        errors: calculatedErrors,
        schedule: meta.schedule,
        actor: row.actor_name ?? undefined,
        createdAt: row.created_at.toISOString()
    };
};
const listImportBatches = async () => {
    const rows = await (0, pool_1.query)(`SELECT b.id,
            b.source,
            b.status,
            b.records_total,
            b.records_success,
            b.metadata,
            b.created_at,
            u.full_name AS actor_name
       FROM import_batches b
       LEFT JOIN users u ON u.id = b.actor_id
       ORDER BY b.created_at DESC
       LIMIT 25`);
    return rows.map(mapImportBatch);
};
exports.listImportBatches = listImportBatches;
const mapRemoteSession = (row) => ({
    id: row.id,
    ticketId: row.ticket_id,
    state: row.state,
    provider: row.provider,
    pin: row.pin_code ?? undefined,
    startedAt: row.started_at?.toISOString(),
    endedAt: row.ended_at?.toISOString(),
    ticketTitle: row.ticket_title ?? undefined,
    requester: row.requester_name ?? undefined,
    site: row.site ?? undefined
});
const listRemoteSessions = async () => {
    const rows = await (0, pool_1.query)(`SELECT rs.id,
            rs.ticket_id,
            rs.state,
            rs.provider,
            rs.pin_code,
            rs.started_at,
            rs.ended_at,
            t.title AS ticket_title,
            t.requester_name,
            t.site
       FROM remote_sessions rs
       LEFT JOIN tickets t ON t.id = rs.ticket_id
       ORDER BY rs.created_at DESC
       LIMIT 30`);
    return rows.map(mapRemoteSession);
};
exports.listRemoteSessions = listRemoteSessions;
const mapApproval = (row) => ({
    id: row.id,
    ticketId: row.ticket_id,
    approverId: row.approver_id ?? undefined,
    approverName: row.approver_name ?? undefined,
    state: row.state,
    note: row.note ?? undefined,
    createdAt: row.created_at.toISOString(),
    ticketTitle: row.ticket_title ?? undefined
});
const listApprovals = async () => {
    const rows = await (0, pool_1.query)(`SELECT ta.id,
            ta.ticket_id,
            ta.approver_id,
            ta.approver_name,
            ta.state,
            ta.note,
            ta.created_at,
            t.title AS ticket_title
       FROM ticket_approvals ta
       LEFT JOIN tickets t ON t.id = ta.ticket_id
       ORDER BY ta.created_at DESC
       LIMIT 30`);
    return rows.map(mapApproval);
};
exports.listApprovals = listApprovals;
const listRoster = async () => {
    const rows = await (0, pool_1.query)(`SELECT u.id,
            u.full_name,
            u.role,
            tm.team_id,
            t.name AS team
       FROM users u
       LEFT JOIN team_memberships tm ON tm.user_id = u.id AND tm.is_primary IS TRUE
       LEFT JOIN teams t ON t.id = tm.team_id`);
    return rows.map((row) => ({
        id: row.id,
        name: row.full_name,
        role: row.role,
        status: row.role === 'engineer' ? 'Online' : 'Remote',
        team: row.team ?? undefined,
        skills: row.role === 'engineer' ? ['Network', 'Console'] : ['Admin'],
        load: row.role === 'engineer' ? '2 tickets' : undefined
    }));
};
exports.listRoster = listRoster;
