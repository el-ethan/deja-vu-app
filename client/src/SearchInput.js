import React from 'react';

import Input from '@material-ui/core/Input';


class SearchInput extends React.Component {

    handleInput = (event) => {
        this.props.filterFunc(event.target.value);
    }

    render() {
        return (
            <Input placeholder="Search problem or solution" onChange={this.handleInput} />
        );
    }

}

export default SearchInput;
