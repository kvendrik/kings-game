import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import Button from 'Components/Button';
import routes from 'Utils/routes';
import Welcome from './Welcome';

it('navigates to rules page when cta is clicked', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Welcome />
    </MemoryRouter>,
  );
  expect(wrapper.find(Button).prop('href')).toBe(routes.rules);
});
