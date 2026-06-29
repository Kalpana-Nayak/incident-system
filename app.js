const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const db = require('./database');

require("dotenv").config();
const transporter = require("./config/mail");

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: "incident-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);

app.set('view engine', 'ejs');

app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", (req, res) => {
    const { username, role } = req.body;

    req.session.user = {
        username,
        role
    };

    res.redirect("/");
});

app.get("/", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("index", {
        user: req.session.user
    });

});

app.post('/create', (req, res) => {
    const title = req.body.title;
    const assigned_to = req.body.assigned_to;

    db.run(
        "INSERT INTO incidents (title, assigned_to, status) VALUES (?, ?, ?)",
        [title, assigned_to, "Open"],
        async (err) => {
            if (err) {
                console.error(err.message);
                return res.redirect("/issues");
            }
             try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_USER,
                    subject: "New Incident Created",
                    text: `A new incident has been created.

Title: ${title}
Assigned To: ${assigned_to}
Status: Open`
                });

                console.log("Email sent successfully");
            } catch (error) {
                console.log("Email error:", error.message);
            }

            res.redirect("/issues");
        }
    );
});

app.get('/issues', (req, res) => {
    db.all("SELECT * FROM incidents", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.send("Database Error");
        }

        res.render("issues", { 
            issues: rows,
            user: req.session.user
        });
    });
});

app.get("/api/incidents", (req, res) => {
    db.all("SELECT * FROM incidents", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

app.post("/api/incidents", (req, res) => {
    const { title, assigned_to } = req.body;

    db.run(
        "INSERT INTO incidents (title, assigned_to, status) VALUES (?, ?, ?)",
        [title, assigned_to, "Open"],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: "Incident created successfully",
                id: this.lastID
            });
        }
    );
});

app.put("/api/incidents/:id", (req, res) => {
    const { title, assigned_to, status } = req.body;

    db.run(
        "UPDATE incidents SET title = ?, assigned_to = ?, status = ? WHERE id = ?",
        [title, assigned_to, status, req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Incident updated successfully"
            });
        }
    );
});

app.put("/api/incidents/:id/close", (req, res) => {
    db.run(
        "UPDATE incidents SET status = 'Closed' WHERE id = ?",
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Incident closed successfully"
            });
        }
    );
});

app.get("/close/:id", (req, res) => {
    db.run(
        "UPDATE incidents SET status = ? WHERE id = ?",
        ["Closed", req.params.id],
        (err) => {
            if (err) {
                console.error(err.message);
            }
            res.redirect("/issues");
        }
    );
});

app.listen(3000, () => console.log("Server running"));