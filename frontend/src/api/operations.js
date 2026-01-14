import { apiClient } from './client';
export const fetchImportBatches = () => apiClient.get('/api/import-batches');
export const fetchNotifications = (audience) => apiClient.get(`/api/notifications${audience ? `?audience=${audience}` : ''}`);
export const fetchRemoteSessions = () => apiClient.get('/api/remote-sessions');
export const fetchApprovals = () => apiClient.get('/api/approvals');
export const fetchRoster = () => apiClient.get('/api/roster');
