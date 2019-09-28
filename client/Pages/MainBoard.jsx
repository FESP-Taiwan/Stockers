// @flow

import React, {
  Fragment,
} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import SiteHeader from '../Elements/Sites/SiteHeader';
import StocksInfoPageWrapper from './StocksInfoPage/StocksInfoPageWrapper';
import InvestStrategyPageWrapper from './InvestStrategy/InvestStrategyPageWrapper';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 0 0 30px',
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
          <Route render={() => (<StocksInfoPageWrapper />)} />
        </Switch>
      </div>
    </div>
  );
}

export default MainBoard;
