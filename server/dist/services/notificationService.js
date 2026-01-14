"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listNotifications = void 0;
const pool_1 = require("../db/pool");
const mapNotification = (row) => ({
    id: row.id,
    title: row.title,
    body: row.body,
    audience: row.audience,
    ticketId: row.ticket_id ?? undefined,
    createdAt: row.created_at.toISOString()
});
const listNotifications = async (audience) => {
    const params = [];
    const where = audience ? `WHERE n.audience = $${params.push(audience)}` : '';
    const rows = await (0, pool_1.query)(`SELECT n.id,
            n.title,
            n.body,
            n.audience,
            n.ticket_id,
            n.created_at,
            t.title AS ticket_title
       FROM notifications n
       LEFT JOIN tickets t ON t.id = n.ticket_id
       ${where}
       ORDER BY n.created_at DESC
       LIMIT 40`, params);
    return rows.map(mapNotification);
};
exports.listNotifications = listNotifications;
