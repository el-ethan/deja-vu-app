const { Schema, model } = require('mongoose');

const IncidentSchema = new Schema(
    {
        solution: String,
        problem: String,
        context: String
    }
);

const ContextSchema = new Schema(
    {
        context: String
    }
);

const Incident = model('Incident', IncidentSchema);
const Context = model('Context', ContextSchema);

export {
    Incident,
    Context
};
