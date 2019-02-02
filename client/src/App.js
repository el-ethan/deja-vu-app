import React from 'react';
import './index.css';
import 'whatwg-fetch';


import IncidentList from './IncidentList';



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
