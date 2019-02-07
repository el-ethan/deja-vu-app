import React from 'react';

import Input from '@material-ui/core/Input';
import BugReportIcon from '@material-ui/icons/BugReport';

const someBase16Colors = ['#ab4642', '#dc9656', '#f7ca88', '#a1b56c', '#86c1b9', '#7cafc2', '#ba8baf'];

class SearchBar extends React.Component {

    handleInput = (event) => {
        this.props.filterFunc(event.target.value);
    }

    render() {
        return (
            <div>
                <nav className="fixed-top navbar navbar-light bg-light">
                    <Input className="search-input" placeholder="Search problem or solution"
                           onChange={this.handleInput} />
                    {someBase16Colors.map(color => (
                        <BugReportIcon key={color} style={{color: color}} />
                    ))}
                </nav>
                <div id="spacer">
                </div>
            </div>
        );
    }

}

export default SearchBar;
