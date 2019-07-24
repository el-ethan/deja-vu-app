import React, {useState, useEffect} from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';

import Incident from './Incident';
import SearchBar from './SearchBar';
import IncidentDialog from './IncidentDialog';
import AddButton from './AddButton';
import {ContextSelector, ALL_CONTEXTS} from './ContextSelector';


function IncidentList() {
    const loadIncidentsFromServer = () => {
        fetch('/api/incidents').then((data) => data.json()).then((res) => {
            if (!res.success) {
                setIncidents(res.error);
            } else {
                setIncidents(res.data);
            }
        });
    }
    const [incidentModalOpen, setIncidentModalOpen] = useState(false);
    const [incidentToEdit, setIncidentToEdit] = useState(null);
    const [incidents, setIncidents] = useState([])
    const [currentContext, setCurrentContext] = useState(
        localStorage.getItem('dejavu-context') || ALL_CONTEXTS
    )
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(loadIncidentsFromServer, []);

    const addNewIncidentToList = (newIncident) => {
        const newIncidents = [...incidents];
        newIncidents.push(newIncident);
        setIncidents(newIncidents);
    }

    const setContext = (context) => {
        localStorage.setItem('dejavu-context', context);
        setCurrentContext(context);
    }

    const updateSearchQuery = (userSearchQuery) => {
        setSearchQuery(userSearchQuery);
    }

    const onDelete = (incidentId) => {
        if (!window.confirm('Delete this incident?')) {
            return;
        }

        const incidentsMinusDeleted = incidents.filter((incident) => incident._id !== incidentId);
        setIncidents(incidentsMinusDeleted);
        fetch(`/api/incidents/${incidentId}`, {method: 'DELETE'});
    }

    const getFilteredIncidents = () => {
        return incidents.filter((incident) => {
            const problem = incident.problem.toLowerCase();
            const solution = incident.solution.toLowerCase();
            const problemMatches = problem.includes(searchQuery.toLowerCase());
            const solutionMatches = solution.includes(searchQuery.toLowerCase());
            const contextMatches = currentContext === ALL_CONTEXTS || incident.context.includes(currentContext);
            return contextMatches && (problemMatches || solutionMatches);
        });
    }


    const handleClickOpen = () => {
        setIncidentModalOpen(true);
    };

    const editIncident = (incident) => {
        incident.edititing = true;
        handleClickOpen()
    }

    const handleModalClose = (incident) => {
        if (incident) {
            incident.edititing = false;
        }
        setIncidentModalOpen(false);
    }

    const getIncidentToEdit = () => {
        return incidentToEdit;
    }

    return (
        <div>
            <SearchBar filterFunc={updateSearchQuery}>
                <ContextSelector selectedContext={currentContext} setContext={setContext} />
            </SearchBar>
            <div>
                <div>
                    {
                        incidents.length < 1 &&
                        <LinearProgress style={{marginTop: '1rem'}} />
                    }
                    {
                        getFilteredIncidents().map((incident, i) => (
                            <Incident onEdit={() => editIncident(incident)}
                                      onDelete={onDelete}
                                      key={incident._id || i} {...incident} />
                        )).reverse()
                    }
                </div>
                <AddButton handleClickOpen={handleClickOpen} />
                <IncidentDialog handleClose={handleModalClose}
                                shouldOpen={incidentModalOpen}
                                appContext={currentContext}
                                incidents={incidents}
                                onAddFunc={addNewIncidentToList} />
            </div>
        </div>
    );
}

export default IncidentList;
