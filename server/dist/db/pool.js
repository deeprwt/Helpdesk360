"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.pool = void 0;
const pg_1 = require("pg");
const env_1 = require("../config/env");
exports.pool = new pg_1.Pool({
    connectionString: env_1.env.databaseUrl,
    ssl: { rejectUnauthorized: false }
});
const query = async (text, params = []) => {
    const result = await exports.pool.query(text, params);
    return result.rows;
};
exports.query = query;
