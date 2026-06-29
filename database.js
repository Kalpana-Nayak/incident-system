const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./incidents.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS incidents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            assigned_to TEXT,
            status TEXT NOT NULL
        )
    `);
});

module.exports = db;