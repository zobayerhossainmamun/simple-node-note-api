import pkg from "pg";
import { getSecret } from "./secret.js";

const { Pool } = pkg;

let pool;

export const getDB = async () => {
    if (pool) return pool;

    const secret = await getSecret();

    pool = new Pool({
        host: secret.host,
        user: secret.username,
        password: secret.password,
        database: secret.database,
        port: 5432,

        // IMPORTANT for Lambda stability
        max: 2,
        idleTimeoutMillis: 10000,
        connectionTimeoutMillis: 5000,
    });

    return pool;
};