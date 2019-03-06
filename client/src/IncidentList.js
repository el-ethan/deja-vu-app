import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';


import Incident from './Incident';
import SearchBar from './SearchBar';
import IncidentDialog from './IncidentDialog';
import ContextSelector from './ConextSelector';


class IncidentList extends React.Component {

    constructor() {
        super();
        this.state = {
            currentContext: null,
            incidents: [],
            contexts: [],
            searchQuery: ''
        };
    }

    componentDidMount() {
        this.loadContextsFromServer();
        this.loadIncidentsFromServer();
    }

    addNewIncidentToList = (newIncident) => {
        const incidents = this.state.incidents;
        incidents.push(newIncident);
        this.setState({incidents: incidents});
    }

    setContext = (context) => {
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
            return problemMatches || solutionMatches;
        });
    }

    render() {
        return (
            <div>
                <SearchBar filterFunc={this.updateSearchQuery}>
                    <ContextSelector setAppContext={this.setContext} contexts={this.state.contexts}/>
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
                    <IncidentDialog onAddFunc={this.addNewIncidentToList} />
                </div>
            </div>
        );
    }
}

export default IncidentList;
