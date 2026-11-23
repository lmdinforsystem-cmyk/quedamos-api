import express, { json } from 'express';

const app = express();

app.use(json());

app.get('/api/health', (req, res) =>{
    res.status(200).json({ status: "ok"});
});

export default app;