import React from 'react';
import './index.css';
import 'whatwg-fetch';
import ReactMarkdown from 'react-markdown';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';


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
            incidents: [
            ]
        }
    }

    componentDidMount() {
        this.loadIncidentsFromServer();
    }

    loadIncidentsFromServer() {
        fetch('/api/incidents').then((data) => data.json()).then((res) => {
            if (!res.success) this.setState({ error: res.error });
            else this.setState({ incidents: res.data });
        });
    }

    onDelete = (incidentId) => {
        this.setState({
            incidents: this.state.incidents.filter((incident) => incident._id !== incidentId)
        });
        fetch(`/api/incidents/${incidentId}`, {method: 'DELETE'}).then((data) => {
            console.log('hello');
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.incidents.map((incident) => (
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
