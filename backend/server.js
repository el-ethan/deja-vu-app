// first we import our dependencies
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secrets';
import { Incident, Context } from './models';

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;

//db config
mongoose.connect(getSecret('dbUri'), {useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// now we can set the route path & initialize the API
router.get('/incidents', (req, res) => {
    Incident.find((err, incidents) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: incidents });
    });
});

router.get('/contexts', (req, res) => {
    Context.find((err, contexts) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: contexts });
    });
});

router.post('/incidents', (req, res) => {
    const incident = new Incident();
    // body parser lets us use the req.body
    const { problem, solution } = req.body;
    incident.problem = problem;
    incident.solution = solution;
    incident.save(err => {
        if (err) {
            return res.json({ success: false, error: err });
        };
        return res.json({ success: true });
    });
    return incident;
});


router.delete('/incidents/:incidentId', (req, res) => {
    const { incidentId } = req.params;
    if (!incidentId) {
        return res.json({ success: false, error: 'No incident id provided' });
    }

    Incident.findOneAndDelete({_id: incidentId}, (error) => {
        if (error) {
            console.log('error');
            return res.json({ success: false, error });
        }
        console.log('no error');
        return res.json({ success: true });
    });
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
