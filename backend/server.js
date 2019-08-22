import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secrets';
import { Incident, Context } from './models';

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

mongoose.set('useFindAndModify', false);
mongoose.connect(getSecret('dbUri'), {useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/incidents', (req, res) => {
    Incident.find((err, incidents) => res.json({ success: true, data: incidents }));
});

router.get('/contexts', (req, res) => {
    Context.find((err, contexts) => res.json({ success: true, data: contexts }));
});

router.post('/incidents', (req, res) => {
    const incident = new Incident();
    const { problem, solution, context } = req.body;
    incident.problem = problem;
    incident.solution = solution;
    incident.context = context;
    incident.save(() => res.json({ success: true }));
    return incident;
});

router.put('/incidents/:incidentId', (req, res) => {
    const { problem, solution, context } = req.body;
    const { incidentId } = req.params;
    Incident.findOneAndUpdate({_id: incidentId}, {problem, solution, context}, () => res.json({ success: true }));
});

router.delete('/incidents/:incidentId', (req, res) => {
    const { incidentId } = req.params;
    Incident.findOneAndDelete({_id: incidentId}, () => res.json({ success: true }));
});

app.use('/api', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
