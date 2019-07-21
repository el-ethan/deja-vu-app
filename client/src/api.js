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


export {postIncidentToDatabase};
