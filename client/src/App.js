import React from 'react';
import './index.css';
import 'whatwg-fetch';
import ReactMarkdown from 'react-markdown';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Input from '@material-ui/core/Input';


class SearchInput extends React.Component {

    handleInput = (event) => {
        console.log(event.target.value);
        this.props.filterFunc(event.target.value)
    }

    render() {
        return (
            <Input onChange={this.handleInput} />
        );
    }

}


function Incident(props) {
    return (
        <Card className="incident-card">
            <DeleteRoundedIcon className="trash-can" onClick={() => props.onDelete(props._id)}/>
            <CardContent>
    	        <Typography variant="h5" component="h2">Problem:</Typography>
                <p>{props.problem}</p>
                <Typography variant="h5" component="h2">Solution:</Typography>
                <ReactMarkdown source={props.solution} />
            </CardContent>
    	</Card>
    );
}


class IncidentList extends React.Component {

    constructor() {
        super();
        this.state = {
            incidents: [],
            incidentFilterQuery: ''
        }
    }

    componentDidMount() {
        this.loadIncidentsFromServer();
    }

    loadIncidentsFromServer() {
        fetch('/api/incidents').then((data) => data.json()).then((res) => {
            if (!res.success) {
                this.setState({ error: res.error })
            } else {
                this.setState({ incidents: res.data })
            };
        });
    }

    filterIncidents = (searchQuery) => {
        if (searchQuery) {
            this.setState({incidentFilterQuery: searchQuery});
        }
    }

    onDelete = (incidentId) => {
        const incidentsMinusDeleted = this.state.incidents.filter((incident) => incident._id !== incidentId);
        this.setState({incidents: incidentsMinusDeleted});
        fetch(`/api/incidents/${incidentId}`, {method: 'DELETE'})
    }

    render() {
        return (
            <div>
                <SearchInput filterFunc={this.filterIncidents} />
                {
                    this.state.incidents.filter((incident) => {
                        const problem = incident.problem.toLowerCase();
                        const solution = incident.solution.toLowerCase();
                        const problemMatches =problem.includes(this.state.incidentFilterQuery.toLowerCase());
                        const solutionMatches = solution.includes(this.state.incidentFilterQuery.toLowerCase());
                        return problemMatches || solutionMatches;
                    }).map((incident) => (
                        <Incident onDelete={this.onDelete} key={incident._id} {...incident} />
                    ))
                }
            </div>
        );
    }
}


class App extends React.Component {
    render () {
        return (
            <div className="incident-list">
                <IncidentList />
            </div>
        );
    }
}


export default App;
