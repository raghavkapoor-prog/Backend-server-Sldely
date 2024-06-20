"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const dbFilePath = path_1.default.join(__dirname, 'db.json');
app.use(body_parser_1.default.json());
// Endpoint to check server status
app.get('/ping', (req, res) => {
    res.send(true);
});
// Endpoint to submit form data
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    fs_1.default.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading database file');
            return;
        }
        const submissions = JSON.parse(data || '[]');
        submissions.push(newSubmission);
        fs_1.default.writeFile(dbFilePath, JSON.stringify(submissions), (err) => {
            if (err) {
                res.status(500).send('Error writing to database file');
                return;
            }
            res.status(200).send('Submission saved successfully');
        });
    });
});
// Endpoint to read a submission by index
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index, 10);
    fs_1.default.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading database file');
            return;
        }
        const submissions = JSON.parse(data || '[]');
        if (index >= 0 && index < submissions.length) {
            res.status(200).send(submissions[index]);
        }
        else {
            res.status(404).send('Submission not found');
        }
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
