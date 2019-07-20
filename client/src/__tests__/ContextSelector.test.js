import React from 'react';
import { shallow } from 'enzyme';
import {ContextSelector} from '../ContextSelector';

describe('ContextSelector', () => {
    it('should render correctly', () => {
        const component = shallow(
            <ContextSelector selectedContext={'home'}
                             setContext={() => {}}
                             contexts={['home', 'work']}/>
        );
        expect(component).toMatchSnapshot();
    });
});
