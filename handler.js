import { getDB } from "./db.js";

// /health
export const health = async () => {
    return {
        statusCode: 200,
        body: JSON.stringify({ status: "ok" }),
    };
};

// /add
export const add = async (event) => {
    const body = JSON.parse(event.body || "{}");
    const { title, content } = body;

    if (!title) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "title required" }),
        };
    }

    const db = await getDB();

    await db.query(
        "INSERT INTO notes(title, content) VALUES($1, $2)",
        [title, content]
    );

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "note added" }),
    };
};

// /list
export const list = async () => {
    const db = await getDB();

    const res = await db.query("SELECT * FROM notes ORDER BY id DESC");

    return {
        statusCode: 200,
        body: JSON.stringify(res.rows),
    };
};