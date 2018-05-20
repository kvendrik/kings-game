import * as React from 'react';
import Page from 'Components/Page';
import Button from 'Components/Button';
import Link from 'Components/Link';
import {Row} from 'Components/Grid';
import Heading from 'Components/Heading';

export default () => (
  <Page>
    <Row>
      <Heading size="extra-large">Kings</Heading>
      <Heading size="large" subdued>
        An online version of the popular drinking game{' '}
        <Link href="https://en.wikipedia.org/wiki/Kings_(game)">Kings</Link> for
        when you forgot your playing cards.
      </Heading>
    </Row>
    <Button href="/rules">Start new game</Button>
  </Page>
);
