import React, {useState, useEffect} from 'react';
import './index.scss';
import 'whatwg-fetch';
import IncidentList from './IncidentList';
import ProgressBar from './ProgressBar';
import SearchBar from './SearchBar';
import IncidentDialog from './IncidentDialog';
import AddButton from './AddButton';
import {ContextSelector, ALL_CONTEXTS} from './ContextSelector';


function App() {
    const [incidents, setIncidents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [incidentModalOpen, setIncidentModalOpen] = useState(false);
    const [currentContext, setCurrentContext] = useState(
        localStorage.getItem('dejavu-context') || ALL_CONTEXTS
    );

    const loadIncidentsFromServer = () => {
        fetch('/api/incidents').then(data => data.json()).then(res => setIncidents(res.data));
    };
    useEffect(loadIncidentsFromServer, []);

    const addNewIncidentToList = (newIncident) => {
        const newIncidents = [...incidents];
        newIncidents.push(newIncident);
        setIncidents(newIncidents);
    };

    const updateIncidentInList = (incident) => {
        const incidentsCopy = [...incidents];
        let indexOfIncident;
        const incidentToUpdate = incidentsCopy.find((thisIncident, index) => {
            const incidentFound = thisIncident._id === incident._id;
            if (incidentFound) {
                indexOfIncident = index;
            }
            return incidentFound;
        });

        if (incidentToUpdate) {
            incidentsCopy[indexOfIncident] = {...incidentToUpdate, ...incident};
            setIncidents(incidentsCopy);
        }
    };

    const onDelete = (incidentId) => {
        if (!window.confirm('Delete this incident?')) {
            return;
        }

        const incidentsMinusDeleted = incidents.filter((incident) => incident._id !== incidentId);
        setIncidents(incidentsMinusDeleted);
        fetch(`/api/incidents/${incidentId}`, {method: 'DELETE'});
    };

    const setContext = (context) => {
        localStorage.setItem('dejavu-context', context);
        setCurrentContext(context);
    };

    const updateSearchQuery = (userSearchQuery) => {
        setSearchQuery(userSearchQuery);
    };

    const handleClickOpen = () => {
        setIncidentModalOpen(true);
    };

    const handleModalClose = () => {
        setIncidentModalOpen(false);
    };


    return (
        <div>
            <SearchBar filterFunc={updateSearchQuery}>
                <ContextSelector previousSelectedContext={currentContext} setContext={setContext} />
            </SearchBar>
            <div>

                <ProgressBar loadInProgress={incidents.length < 1}/>
                <IncidentList incidents={incidents}
                              searchQuery={searchQuery}
                              onAdd={addNewIncidentToList}
                              onEdit={updateIncidentInList}
                              onDelete={onDelete}
                              currentContext={currentContext} />
                <AddButton handleClickOpen={handleClickOpen} />
                <IncidentDialog handleClose={handleModalClose}
                                shouldOpen={incidentModalOpen}
                                appContext={currentContext}
                                onSaveFunc={addNewIncidentToList} />
            </div>
        </div>
    );
}

export default App;
