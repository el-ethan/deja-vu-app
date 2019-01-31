const { Schema, model } = require('mongoose');

const IncidentSchema = new Schema(
    {
        solution: String,
        problem: String,
        _id: String
    }
);

export default model('Incident', IncidentSchema);
