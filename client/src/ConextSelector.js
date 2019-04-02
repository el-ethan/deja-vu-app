import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


const ALL_CONTEXTS = 'All contexts';
const CONTEXTS = [
    'work',
    'personal',
    'pagerduty'
];


class ContextSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedContext: props.selectedContext || ALL_CONTEXTS
        };
    }

    handleSelect = (selectedContext) => {
        this.props.setContext(selectedContext);
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
                            <Dropdown.Item eventKey={context}
                                           onSelect={this.handleSelect}
                                           key={context}>
                                {context}
                            </Dropdown.Item>
                        );

                    })
                }
            </DropdownButton>
        );
    }

}

export {ContextSelector, ALL_CONTEXTS, CONTEXTS};
