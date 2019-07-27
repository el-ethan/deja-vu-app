const postIncidentToDatabase = (problem, solution, context) => {
    if (!(problem && solution && context)) {
        return null;
    }
    const incidentObj = {
        problem: problem,
        solution: solution,
        context: context
    };

    fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incidentObj),
    });
    return incidentObj;
};


const updateIncidentInDatabase = (incident) => {
    if (!(incident.problem && incident.solution && incident.context)) {
        return null;
    }

    fetch(`/api/incidents/${incident._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incident),
    });
    return incident;
};

export {postIncidentToDatabase, updateIncidentInDatabase};
