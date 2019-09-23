// @flow

import React, {
  Fragment,
} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import SiteHeader from '../Elements/Sites/SiteHeader';
import HomePage from './HomePage/HomePage';
import EllipsisText from '../Elements/Misc/EllipsisText';
import InvestStrategyPageWrapper from './InvestStrategy/InvestStrategyPageWrapper';
import Chart from '../Elements/Chart/Chart';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  example: {
    width: '100%',
  },
};

function MainBoard() {
  return (
    <div style={styles.wrapper}>
      <Switch>
        <Route component={SiteHeader} />
      </Switch>
      <div style={styles.main}>
        <Switch>
          <Route exact path="/strategy" component={InvestStrategyPageWrapper} />
          <Route render={() => (<HomePage />)} />
        </Switch>
      </div>
    </div>
  );
}

export default MainBoard;
