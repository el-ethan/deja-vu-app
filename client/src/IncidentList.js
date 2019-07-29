import React from 'react';
import Incident from './Incident';
import {ALL_CONTEXTS} from './ContextSelector';


function IncidentList({incidents, searchQuery, currentContext, onDelete, onAdd}) {

    const getFilteredIncidents = () => {
        return incidents.filter((incident) => {
            const problem = incident.problem.toLowerCase();
            const solution = incident.solution.toLowerCase();
            const problemMatches = problem.includes(searchQuery.toLowerCase());
            const solutionMatches = solution.includes(searchQuery.toLowerCase());
            const contextMatches = currentContext === ALL_CONTEXTS || incident.context.includes(currentContext);
            return contextMatches && (problemMatches || solutionMatches);
        });
    };

    return (
        <div>
            {
                getFilteredIncidents().map((incident, i) => (
                    <Incident onDelete={onDelete}
                              onSaveFunc={onAdd}
                              key={incident._id || i}
                              incident={incident} />
                )).reverse()
            }
        </div>
    );
}

export default IncidentList;
