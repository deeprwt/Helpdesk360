const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
async function request(input, init) {
    const response = await fetch(`${API_URL}${input}`, {
        headers: {
            'Content-Type': 'application/json',
            ...init?.headers
        },
        ...init
    });
    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'API request failed');
    }
    return (await response.json());
}
export const apiClient = {
    get: (path) => request(path),
    post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
    patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) })
};
