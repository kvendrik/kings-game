import * as React from 'react';
import {MemoryRouter, withRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import TextField from 'Components/TextField';
import * as defaultRules from './defaultRules.json';
import Rules, {RULES_STORAGE_KEY, Rule} from './Rules';

it('renders default rules when no stored rules are available', () => {
  const RulesWithHistory = withRouter(({history}) => (
    <Rules history={history} />
  ));
  const wrapper = mount(
    <MemoryRouter>
      <RulesWithHistory />
    </MemoryRouter>,
  );
  expect(
    wrapper
      .find(TextField)
      .find({'data-king-card': true})
      .first()
      .prop('value'),
  ).toBe('Kings Cup!');
});

it('renders stored rules when available', () => {
  const newRules = (defaultRules as any).map((rule: Rule) => {
    if (rule.name !== 'Kings Cup!') {
      return rule;
    }
    const newRule = rule;
    newRule.name = 'The new kings cup!';
    return newRule;
  });

  window.localStorage[RULES_STORAGE_KEY] = JSON.stringify(newRules);

  const RulesWithHistory = withRouter(({history}) => (
    <Rules history={history} />
  ));

  const wrapper = mount(
    <MemoryRouter>
      <RulesWithHistory />
    </MemoryRouter>,
  );

  expect(
    wrapper
      .find(TextField)
      .find({'data-king-card': true})
      .first()
      .prop('value'),
  ).toBe('The new kings cup!');
});

it('saves rules to storage on form submit', () => {
  console.log(window.localStorage[RULES_STORAGE_KEY]);
});

// it('resets rules when the reset rules button is clicked', () => {

// });
