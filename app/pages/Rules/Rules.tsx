import * as React from 'react';
import {Bind} from 'lodash-decorators';
import Page from 'Components/Page';
import Button from 'Components/Button';
import {Row} from 'Components/Grid';
import Heading from 'Components/Heading';
import TextField from 'Components/TextField';
import Break from 'Components/Break';
import Link from 'Components/Link';
import * as routes from 'Utils/routes';
import * as defaultRules from './defaultRules.json';

export interface Rule {
  name: string;
  description: string;
  isKingCard?: boolean;
}

export const RULES_STORAGE_KEY = 'kings-game__rules';
export const MAX_CARDS_PER_RULE = 4;

export function getRules(): Rule[] | null {
  const rulesString = window.localStorage[RULES_STORAGE_KEY];
  if (!rulesString) {
    return defaultRules as any;
  }
  return JSON.parse(rulesString);
}

const Rule = ({name, description, isKingCard}: Rule) => (
  <Row>
    <Row>
      <TextField
        label="Rule name"
        value={name}
        data-king-card={isKingCard}
        required
      />
    </Row>
    <Row>
      <TextField label="Rule description" value={description} long required />
    </Row>
    {isKingCard && (
      <Row>
        <small>
          This is the King Card. There are only {MAX_CARDS_PER_RULE} and when
          they are all drawn the game ends.
        </small>
      </Row>
    )}
    <Break />
  </Row>
);

function setRules(rules: Rule[]) {
  console.log('SET', rules);
  window.localStorage[RULES_STORAGE_KEY] = JSON.stringify(rules);
}

export default class Rules extends React.Component<
  {
    history: any;
  },
  {
    rules: React.ReactNode;
    kingCardRule: React.ReactNode;
  }
> {
  componentWillMount() {
    this.loadRules();
  }

  loadRules() {
    const mapNodes = ({name, description, isKingCard}: Rule, index: number) => (
      <div key={name}>
        <Heading size="medium">
          {isKingCard ? 'King Card Rule' : `Rule #${index + 2}`}
        </Heading>
        <Rule name={name} description={description} isKingCard={isKingCard} />
      </div>
    );

    const rules = getRules();

    const rulesNodes = (rules as any)
      .filter(({isKingCard}: Rule) => !isKingCard)
      .map(mapNodes);

    const kingCardRuleNode = (rules as any)
      .filter(({isKingCard}: Rule) => isKingCard)
      .map(mapNodes);

    this.setState({rules: rulesNodes, kingCardRule: kingCardRuleNode});
  }

  @Bind()
  onSubmit(evt: any) {
    evt.preventDefault();

    const inputs = document.getElementsByTagName('input');
    const textareas = document.getElementsByTagName('textarea');
    const rules: Rule[] = [];

    [].forEach.call(inputs, (input: HTMLInputElement, index: number) => {
      const name = input.value;
      const isKingCard = input.hasAttribute('data-king-card');
      const description = textareas[index].value;
      const rule: Rule = {name, description};
      if (isKingCard) {
        rule.isKingCard = true;
      }
      rules.push(rule);
    });

    setRules(rules);
    this.props.history.push(routes.play());
  }

  @Bind()
  resetRules() {
    window.localStorage.removeItem(RULES_STORAGE_KEY);
    window.alert('The rules have been reset.');
    this.loadRules();
  }

  render() {
    const {rules, kingCardRule} = this.state;

    return (
      <Page>
        <Row>
          <Heading size="extra-large">Rules</Heading>
          <Heading size="large" subdued>
            Below you see the game rules. Change them if you like before we
            start the game.
          </Heading>
        </Row>
        <Row>
          <Break />
        </Row>
        <form onSubmit={this.onSubmit}>
          {kingCardRule}
          {rules}
          <Row>
            <Button type="submit">Start game</Button>
          </Row>
          <div className="text-center">
            <small>
              <Link onClick={this.resetRules}>Reset the rules</Link>
            </small>
          </div>
        </form>
      </Page>
    );
  }
}
