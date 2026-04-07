import pkg from "pg";
import { getSecret } from "./secret.js";

const { Client } = pkg;

let db;

export const getDB = async () => {
    if (db) return db;

    const secret = await getSecret();

    db = new Client({
        host: secret.host,
        user: secret.username,
        password: secret.password,
        database: secret.database,
    });

    await db.connect();
    return db;
};