import React from 'react';
import './index.scss';
import 'whatwg-fetch';
import IncidentList from './IncidentList';

function App() {
    return (
        <div className="incident-list">
            <IncidentList />
        </div>
    );
}

export default App;
