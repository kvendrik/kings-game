import * as React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import * as routes from 'Utils/routes';

import * as styles from './App.scss';

import Welcome from './pages/Welcome';
import Rules from './pages/Rules';
import Play from './pages/Play';

const App = withRouter(({location}) => (
  <div className={styles.App}>
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames={{
          enter: styles.PageEnter,
          enterActive: styles.PageEnterActive,
          exit: styles.PageExit,
          exitActive: styles.PageExitActive,
        }}
        timeout={500}
      >
        <Switch location={location}>
          <Route exact path={routes.welcome()} component={Welcome} />
          <Route path={routes.rules()} component={Rules} />
          <Route path={routes.play()} component={Play} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  </div>
));

render(
  <Router basename="/kings-game">
    <App />
  </Router>,
  document.getElementById('app'),
);
