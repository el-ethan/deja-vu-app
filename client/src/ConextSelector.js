import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


const ALL_CONTEXTS = 'All contexts';


class ContextSelector extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedContext: ALL_CONTEXTS
        };
    }

    handleSelect = (selectedContext) => {
        this.props.setAppContext(selectedContext);
        this.setState({selectedContext: selectedContext});
    }

    render () {
        return (
            <DropdownButton id="context-selector" title={this.state.selectedContext}>
                <Dropdown.Item eventKey={ALL_CONTEXTS}
                               onSelect={this.handleSelect}
                               key={'all-contexts'}>
                    All contexts
                </Dropdown.Item>
                {
                    this.props.contexts.map((context) => {
                        return (
                            <Dropdown.Item eventKey={context.context}
                                           onSelect={this.handleSelect}
                                           key={context._id}>
                                {context.context}
                            </Dropdown.Item>
                        );

                    })
                }
            </DropdownButton>
        );
    }

}

export {ContextSelector, ALL_CONTEXTS};
