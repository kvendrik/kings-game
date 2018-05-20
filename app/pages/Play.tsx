import * as React from 'react';
import {Prompt} from 'react-router-dom';
import {Bind} from 'lodash-decorators';
import Page from 'Components/Page';
import Button from 'Components/Button';
import {Row} from 'Components/Grid';
import Lottie from 'Components/Lottie';
import Heading from 'Components/Heading';
import Link from 'Components/Link';
import {Rule, getRules} from './Rules';
import * as lottieCrown from './lottie-crown.json';

export default class Play extends React.Component<
  {
    history: any;
  },
  {
    rule: Rule;
    lastDrawnRuleIndex: number;
    gameOver: boolean;
  }
> {
  state = {
    rule: {
      name: '',
      description: '',
    },
    lastDrawnRuleIndex: -1,
    gameOver: false,
  };
  private rules: Rule[];
  private drawnCardCounts: any = {};
  private crownAnimation: any;
  private animationNode: React.ReactNode;

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

    if (randomIndex === lastDrawnRuleIndex) {
      // no double cards
      this.drawCard();
      return;
    }

    if (!this.drawnCardCounts[rule.name]) {
      this.drawnCardCounts[rule.name] = 0;
    }

    this.drawnCardCounts[rule.name] += 1;

    if (this.drawnCardCounts[rule.name] === 4 && rule.isKingCard) {
      // if the king card is drawn 4 times the game finishes
      // this.crownAnimation.play();
      this.setState({rule, gameOver: true});
      return;
    }

    if (this.drawnCardCounts[rule.name] > 4) {
      // all cards can only be drawn a maximum of 4 times
      this.drawCard();
      return;
    }

    this.setState({rule, lastDrawnRuleIndex: randomIndex});
  }

  render() {
    const {rule, gameOver} = this.state;

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
            This card has been drawn {this.drawnCardCounts[rule.name]}/4 times.
          </small>
        </Row>
        <Row>
          <Button onClick={this.drawCard}>Draw a card</Button>
        </Row>
        <div className="text-center">
          <small
            style={{
              marginTop: '5rem',
            }}
          >
            <Link href="/">End this game</Link>
          </small>
        </div>
      </Page>
    );
  }
}
