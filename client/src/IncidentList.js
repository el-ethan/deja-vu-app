import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';


import Incident from './Incident';
import SearchBar from './SearchBar';
import IncidentDialog from './IncidentDialog';
import {ContextSelector, ALL_CONTEXTS, CONTEXTS} from './ConextSelector';


class IncidentList extends React.Component {

    constructor() {
        super();
        this.state = {
            currentContext: localStorage.getItem('dejavu-context') || ALL_CONTEXTS,
            incidents: [],
            contexts: CONTEXTS,
            searchQuery: ''
        };
    }

    componentDidMount() {
        // this.loadContextsFromServer();
        this.loadIncidentsFromServer();
    }

    addNewIncidentToList = (newIncident) => {
        const incidents = this.state.incidents;
        incidents.push(newIncident);
        this.setState({incidents: incidents});
    }

    setContext = (context) => {
        localStorage.setItem('dejavu-context', context);
        this.setState({currentContext: context});
    }

    loadIncidentsFromServer = () => {
        fetch('/api/incidents').then((data) => data.json()).then((res) => {
            if (!res.success) {
                this.setState({ error: res.error });
            } else {
                this.setState({ incidents: res.data });
            }
        });
    }

    loadContextsFromServer = () => {
        fetch('/api/contexts').then((data) => data.json()).then((res) => {
            if (!res.success) {
                this.setState({ error: res.error });
            } else {
                this.setState({ contexts: res.data });
            }
        });
    }

    updateSearchQuery = (searchQuery) => {
        this.setState({searchQuery: searchQuery});
    }

    onDelete = (incidentId) => {
        if (!window.confirm('Delete this incident?')) {
            return;
        }

        const incidentsMinusDeleted = this.state.incidents.filter((incident) => incident._id !== incidentId);
        this.setState({incidents: incidentsMinusDeleted});
        fetch(`/api/incidents/${incidentId}`, {method: 'DELETE'});
    }

    getFilteredIncidents = () => {
        return this.state.incidents.filter((incident) => {
            const problem = incident.problem.toLowerCase();
            const solution = incident.solution.toLowerCase();
            const problemMatches = problem.includes(this.state.searchQuery.toLowerCase());
            const solutionMatches = solution.includes(this.state.searchQuery.toLowerCase());
            const contextMatches = this.state.currentContext === ALL_CONTEXTS || incident.context.includes(this.state.currentContext);
            return contextMatches && (problemMatches || solutionMatches);
        });
    }

    render() {
        return (
            <div>
                <SearchBar filterFunc={this.updateSearchQuery}>
                    <ContextSelector selectedContext={this.state.currentContext}
                                     setContext={this.setContext}
                                     contexts={this.state.contexts}/>
                </SearchBar>
                <div>
                    <div>
                        {
                            this.state.incidents.length < 1 &&
                            <LinearProgress style={{marginTop: '1rem'}} />
                        }
                        {
                            this.getFilteredIncidents().map((incident, i) => (
                                <Incident onDelete={this.onDelete} key={incident._id || i} {...incident} />
                            )).reverse()
                        }
                    </div>
                    <IncidentDialog contexts={this.state.contexts}
                                    appContext={this.state.currentContext}
                                    onAddFunc={this.addNewIncidentToList} />
                </div>
            </div>
        );
    }
}

export default IncidentList;
