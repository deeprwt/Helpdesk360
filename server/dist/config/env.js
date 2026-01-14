"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const required = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};
exports.env = {
    port: Number(process.env.PORT ?? 4000),
    databaseUrl: process.env.DATABASE_URL ??
        `postgresql://${required('DB_USER')}:${required('DB_PASSWORD')}@${required('DB_HOST')}:${process.env.DB_PORT ?? 5432}/${required('DB_NAME')}?sslmode=require`
};
