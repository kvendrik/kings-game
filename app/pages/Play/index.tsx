import * as React from 'react';
import {Prompt} from 'react-router-dom';
import {Bind} from 'lodash-decorators';
import Page from 'Components/Page';
import Button from 'Components/Button';
import {Row} from 'Components/Grid';
import Lottie from 'Components/Lottie';
import Heading from 'Components/Heading';
import Link from 'Components/Link';
import {Rule, getRules, MAX_CARDS_PER_RULE} from '../Rules';
import * as lottieCrown from './lottie-crown.json';

export default class Play extends React.Component<
  {
    history: any;
  },
  {
    rule: Rule;
    lastDrawnRuleIndex: number;
    gameOver: boolean;
    cardsLeft: number;
  }
> {
  state = {
    rule: {
      name: '',
      description: '',
    },
    lastDrawnRuleIndex: -1,
    gameOver: false,
    cardsLeft: 0,
  };
  private rules: Rule[];
  private drawnCardCounts: any = {};

  componentWillMount() {
    const rules = getRules();
    if (!rules) {
      this.props.history.push('/');
      return;
    }
    this.rules = rules;
    this.drawCard();
  }

  @Bind()
  drawCard() {
    const {rules} = this;
    const {lastDrawnRuleIndex} = this.state;
    const randomIndex = Math.round(Math.random() * (rules.length - 1) + 0);
    const rule = rules[randomIndex];

    const cardsLeft = rules.reduce((currentCardsLeft, {name}: Rule) => {
      const timesDrawn = this.drawnCardCounts[name] || 0;
      const left = MAX_CARDS_PER_RULE - timesDrawn;
      return currentCardsLeft + left;
    }, 0);

    const uniqueCardNames = rules.reduce((currentCardsNames, {name}: Rule) => {
      const timesDrawn = this.drawnCardCounts[name] || 0;
      return timesDrawn !== MAX_CARDS_PER_RULE
        ? [name, ...currentCardsNames]
        : currentCardsNames;
    }, []);

    if (
      this.drawnCardCounts[rule.name] === MAX_CARDS_PER_RULE - 1 &&
      rule.isKingCard
    ) {
      // if the king card is drawn MAX_CARDS_PER_RULE times the game finishes
      this.setState({rule, gameOver: true, cardsLeft});
      return;
    }

    if (this.drawnCardCounts[rule.name] >= MAX_CARDS_PER_RULE) {
      // all cards can only be drawn a maximum of MAX_CARDS_PER_RULE times
      const newRules = rules.filter(({name}) => name !== rule.name);
      this.rules = newRules;
      this.drawCard();
      return;
    }

    if (randomIndex === lastDrawnRuleIndex && uniqueCardNames.length > 1) {
      // no double cards
      this.drawCard();
      return;
    }

    if (!this.drawnCardCounts[rule.name]) {
      this.drawnCardCounts[rule.name] = 0;
    }

    this.drawnCardCounts[rule.name] += 1;
    this.setState({rule, lastDrawnRuleIndex: randomIndex, cardsLeft});
  }

  render() {
    const {rule, gameOver, cardsLeft} = this.state;

    if (gameOver) {
      return (
        <Page>
          <Lottie animationData={lottieCrown} autoplay />
          <div
            style={{
              position: 'relative',
              top: '-50px',
            }}
          >
            <Row>
              <small>YOU DREW</small>
              <Heading size="extra-large">The last king!</Heading>
              <Heading size="large" subdued>
                <div>{rule.name}</div>
                {rule.description}
              </Heading>
            </Row>
            <Button href="/rules">Start a new game</Button>
          </div>
        </Page>
      );
    }

    return (
      <Page>
        <Row>
          <Prompt message="Are you sure you want to end this game?" />
          <small>YOU DREW</small>
          <Heading size="extra-large">{rule.name}</Heading>
          <Heading size="large" subdued>
            {rule.description}
          </Heading>
          <small>
            This card has been drawn {this.drawnCardCounts[rule.name]}/{
              MAX_CARDS_PER_RULE
            }{' '}
            times.
          </small>
          <br />
          <small>There are {cardsLeft} cards left in the deck.</small>
        </Row>
        <Row>
          <Button onClick={this.drawCard}>Draw a card</Button>
        </Row>
        <div className="text-center">
          <small>
            <Link href="/">End this game</Link>
          </small>
        </div>
      </Page>
    );
  }
}
