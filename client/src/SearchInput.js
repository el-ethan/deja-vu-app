import React from 'react';

import Input from '@material-ui/core/Input';


class SearchInput extends React.Component {

    handleInput = (event) => {
        console.log(event.target.value);
        this.props.filterFunc(event.target.value);
    }

    render() {
        return (
            <Input onChange={this.handleInput} />
        );
    }

}

export default SearchInput;
