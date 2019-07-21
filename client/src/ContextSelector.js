import React, {useState} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


const ALL_CONTEXTS = 'All contexts';
const CONTEXTS = [
    'work',
    'personal',
    'pagerduty'
];


function ContextSelector({contexts, setContext, previousSelectedContext}) {
    const [selectedContext, setSelectedContext] = useState(previousSelectedContext || ALL_CONTEXTS);

    const handleSelect = (selectedContext) => {
        setContext(selectedContext);
        setSelectedContext(selectedContext);
    };

    return (
        <DropdownButton id="context-selector" title={selectedContext}>
            <Dropdown.Item eventKey={ALL_CONTEXTS}
                           onSelect={handleSelect}
                           key={'all-contexts'}>
                All contexts
            </Dropdown.Item>
            {
                contexts.map((context) => {
                    return (
                        <Dropdown.Item eventKey={context}
                                       onSelect={handleSelect}
                                       key={context}>
                            {context}
                        </Dropdown.Item>
                    );
                })
            }
        </DropdownButton>
    );
}

export {ContextSelector, ALL_CONTEXTS, CONTEXTS};
