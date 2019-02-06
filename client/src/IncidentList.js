import React from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';


import Incident from './Incident';
import SearchInput from './SearchInput';
import IncidentDialog from './IncidentDialog';


class IncidentList extends React.Component {

    constructor() {
        super();
        this.state = {
            incidents: [],
            searchQuery: ''
        };
    }

    componentDidMount() {
        this.loadIncidentsFromServer();
    }

    addNewIncidentToList = (newIncident) => {
        const incidents = this.state.incidents;
        incidents.push(newIncident);
        this.setState({incidents: incidents});
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

    updateSearchQuery = (searchQuery) => {
        if (searchQuery) {
            this.setState({searchQuery: searchQuery});
        }
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
                <SearchInput filterFunc={this.updateSearchQuery} className="col-sm" />
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
        );
    }
}

export default IncidentList;
