import React from 'react';

import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';


class SearchInput extends React.Component {

    handleInput = (event) => {
        this.props.filterFunc(event.target.value);
    }

    render() {
        return (
            <Card className="incident-card">
                <Input className="search-input" placeholder="Search problem or solution" onChange={this.handleInput} />
            </Card>

        );
    }

}

export default SearchInput;
