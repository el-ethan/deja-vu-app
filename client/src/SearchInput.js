import React from 'react';

import Input from '@material-ui/core/Input';


class SearchInput extends React.Component {

    handleInput = (event) => {
        this.props.filterFunc(event.target.value);
    }

    render() {
        return (
            <div>
                <nav className="fixed-top navbar navbar-light bg-light">
                    <Input className="search-input" placeholder="Search problem or solution" onChange={this.handleInput} />
                </nav>
                <div id="spacer">
                </div>
            </div>
        );
    }

}

export default SearchInput;
