import React from 'react';

import Input from '@material-ui/core/Input';
import BugReportIcon from '@material-ui/icons/BugReport';


const someBase16Colors = ['#ab4642', '#dc9656', '#f7ca88', '#a1b56c', '#86c1b9', '#7cafc2', '#ba8baf'];
function SearchBar({filterFunc, children}) {

    const handleInput = (event) => {
        filterFunc(event.target.value);
    };

    return (
        <div>
            <nav className="fixed-top navbar navbar-light bg-light">
                <Input className="search-input" placeholder="Search problem or solution"
                       onChange={handleInput} />
                {someBase16Colors.map(color => (
                    <BugReportIcon key={color} style={{color: color}} />
                ))}
                <div>{children}</div>
            </nav>
            <div id="spacer">
            </div>
        </div>
    );
}

export default SearchBar;
