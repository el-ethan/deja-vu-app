import React from 'react';
import './index.scss';
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
