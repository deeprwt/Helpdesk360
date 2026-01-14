"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const ticketService_1 = require("../services/ticketService");
const router = (0, express_1.Router)();
router.get('/tickets', async (req, res, next) => {
    try {
        const tickets = await (0, ticketService_1.listTickets)(req.query.scope?.toString());
        res.json(tickets);
    }
    catch (error) {
        next(error);
    }
});
router.post('/tickets', async (req, res, next) => {
    try {
        const schema = zod_1.z.object({
            title: zod_1.z.string().min(3),
            description: zod_1.z.string().min(10),
            requester: zod_1.z.string().min(3),
            site: zod_1.z.string().min(2),
            priority: zod_1.z.enum(['low', 'medium', 'high', 'urgent']),
            category: zod_1.z.string().min(2)
        });
        const payload = schema.parse(req.body);
        const ticket = await (0, ticketService_1.createTicket)(payload);
        res.status(201).json(ticket);
    }
    catch (error) {
        next(error);
    }
});
router.get('/tickets/:ticketId', async (req, res, next) => {
    try {
        const ticket = await (0, ticketService_1.getTicketById)(req.params.ticketId);
        res.json(ticket);
    }
    catch (error) {
        next(error);
    }
});
router.patch('/tickets/:ticketId/status', async (req, res, next) => {
    try {
        const schema = zod_1.z.object({
            status: zod_1.z.enum(['new', 'open', 'in_progress', 'waiting_customer', 'waiting_vendor', 'remote_required', 'closed', 'out_of_sla'])
        });
        const payload = schema.parse(req.body);
        const ticket = await (0, ticketService_1.updateTicketStatus)(req.params.ticketId, payload.status);
        res.json(ticket);
    }
    catch (error) {
        next(error);
    }
});
router.get('/tickets/:ticketId/comments', async (req, res, next) => {
    try {
        const comments = await (0, ticketService_1.listComments)(req.params.ticketId);
        res.json(comments);
    }
    catch (error) {
        next(error);
    }
});
router.post('/tickets/:ticketId/comments', async (req, res, next) => {
    try {
        const schema = zod_1.z.object({
            body: zod_1.z.string().min(2),
            visibility: zod_1.z.enum(['public', 'internal'])
        });
        const payload = schema.parse(req.body);
        const comment = await (0, ticketService_1.addComment)(req.params.ticketId, payload.body, payload.visibility);
        res.status(201).json(comment);
    }
    catch (error) {
        next(error);
    }
});
router.get('/metrics/dashboard', async (_req, res, next) => {
    try {
        const payload = await (0, ticketService_1.dashboardInsights)();
        res.json(payload);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
