"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const operationsService_1 = require("../services/operationsService");
const notificationService_1 = require("../services/notificationService");
const router = (0, express_1.Router)();
router.get('/import-batches', async (_req, res, next) => {
    try {
        const batches = await (0, operationsService_1.listImportBatches)();
        res.json(batches);
    }
    catch (error) {
        next(error);
    }
});
router.get('/remote-sessions', async (_req, res, next) => {
    try {
        const sessions = await (0, operationsService_1.listRemoteSessions)();
        res.json(sessions);
    }
    catch (error) {
        next(error);
    }
});
router.get('/approvals', async (_req, res, next) => {
    try {
        const approvals = await (0, operationsService_1.listApprovals)();
        res.json(approvals);
    }
    catch (error) {
        next(error);
    }
});
router.get('/roster', async (_req, res, next) => {
    try {
        const roster = await (0, operationsService_1.listRoster)();
        res.json(roster);
    }
    catch (error) {
        next(error);
    }
});
router.get('/notifications', async (req, res, next) => {
    try {
        const audience = req.query.audience?.toString();
        const notifications = await (0, notificationService_1.listNotifications)(audience);
        res.json(notifications);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
