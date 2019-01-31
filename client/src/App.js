import React from 'react';
import './index.css';
import 'whatwg-fetch';

function Incident(props) {
    return (
        <div className="incident-card">
    	    <h1>Problem:</h1>
            <p>{props.problem}</p>
            <h1>Solution:</h1>
            <p>{props.solution}</p>
    	</div>
    );

}


function IncidentList(props) {
    return (
        <div>
            {props.incidents.map(incident => <Incident key={incident._id} {...incident} />)}
        </div>
    );

}


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            incidents: [
            ]
        }
    }

    loadIncidentsFromServer() {
        fetch('/api/incidents').then((data) => data.json()).then((res) => {
            if (!res.success) this.setState({ error: res.error });
            else this.setState({ incidents: res.data });
        });
    }

    componentDidMount() {
        this.loadIncidentsFromServer();
    }

    render () {
        return (
            <IncidentList incidents={this.state.incidents} />
        );
    }
}


export default App;
