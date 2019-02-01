const { Schema, model } = require('mongoose');

const IncidentSchema = new Schema(
    {
        solution: String,
        problem: String
    }
);

export default model('Incident', IncidentSchema);
