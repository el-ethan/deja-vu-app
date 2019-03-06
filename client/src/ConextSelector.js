import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class ContextSelector extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedContext: null
        };
    }

    handleSelect = (selectedContext) => {
        this.props.setAppContext(selectedContext);
        this.setState({selectedContext: selectedContext});
    }

    render () {
        return (
            <DropdownButton id="context-selector" title={this.state.selectedContext || 'Select context' }>
                {
                    this.props.contexts.map((context) => {
                        return <Dropdown.Item eventKey={context.context}
                                              onSelect={this.handleSelect}
                                              key={context._id}>
                       {context.context}
                   </Dropdown.Item>;
                    })
                }
            </DropdownButton>
        );
    }

}

export default ContextSelector;
