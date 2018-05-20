import * as React from 'react';
import {Bind} from 'lodash-decorators';
import Page from 'Components/Page';
import Button from 'Components/Button';
import {Row} from 'Components/Grid';
import Heading from 'Components/Heading';
import TextField from 'Components/TextField';
import Break from 'Components/Break';
import * as defaultRules from './defaultRules.json';

export interface Rule {
  name: string;
  description: string;
  isKingCard?: boolean;
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
          This is the King Card. There are only 4 and when they are all drawn
          the game ends.
        </small>
      </Row>
    )}
    <Break />
  </Row>
);

export default class Rules extends React.Component<{
  history: any;
}> {
  private rules: Rule[];
  private kingCardRule: Rule[];

  componentWillMount() {
    const mapNodes = ({name, description, isKingCard}: Rule, index: number) => (
      <div key={name}>
        <Heading size="medium">
          {isKingCard ? 'King Card Rule' : `Rule #${index + 2}`}
        </Heading>
        <Rule name={name} description={description} isKingCard={isKingCard} />
      </div>
    );

    const rulesNodes = (defaultRules as any)
      .filter(({isKingCard}: Rule) => !isKingCard)
      .map(mapNodes);

    const kingCardRuleNode = (defaultRules as any)
      .filter(({isKingCard}: Rule) => isKingCard)
      .map(mapNodes);

    this.rules = rulesNodes;
    this.kingCardRule = kingCardRuleNode;
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

    localStorage['kings-game__rules'] = JSON.stringify(rules);
    this.props.history.push('/play');
  }

  render() {
    const {rules, kingCardRule} = this;

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
          <Button type="submit">Start game</Button>
        </form>
      </Page>
    );
  }
}
