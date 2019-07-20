import React from 'react';
import { shallow } from 'enzyme';
import Incident from '../Incident';

describe('Inicdent', () => {
    it('should render correctly', () => {
        const component = shallow(<Incident problem="gremlins" solution="don't feed after midnight" />);
        expect(component).toMatchSnapshot();
    });
});
