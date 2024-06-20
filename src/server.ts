import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
const dbFilePath = path.join(__dirname, 'db.json');

app.use(bodyParser.json());

// Endpoint to check server status
app.get('/ping', (req, res) => {
    res.send(true);
});

// Endpoint to submit form data
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newSubmission = { name, email, phone, github_link, stopwatch_time };

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading database file');
            return;
        }

        const submissions = JSON.parse(data || '[]');
        submissions.push(newSubmission);

        fs.writeFile(dbFilePath, JSON.stringify(submissions), (err) => {
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
    const index = parseInt(req.query.index as string, 10);

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading database file');
            return;
        }

        const submissions = JSON.parse(data || '[]');
        if (index >= 0 && index < submissions.length) {
            res.status(200).send(submissions[index]);
        } else {
            res.status(404).send('Submission not found');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
