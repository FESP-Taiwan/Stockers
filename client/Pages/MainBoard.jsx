// @flow

import React, {
  Fragment,
} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import SiteHeader from '../Elements/Sites/SiteHeader';
import StocksInfoPage from './StocksInfo/StocksInfoPage';
import IndustryPage from './Indusry/IndustryPage';
import InvestStrategyPageWrapper from './InvestStrategy/InvestStrategyPageWrapper';
import TestPage from './TestPage';

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
    padding: '0 20px 0 30px',
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
          <Route exact path="/industry" component={IndustryPage} />
<<<<<<< HEAD
          <Route exact path="/test" component={TestPage} />
=======
>>>>>>> ae11b33406bfaf1ca6875c48a8f728f79e85d5f5
          <Route render={() => (<StocksInfoPage />)} />
        </Switch>
      </div>
    </div>
  );
}

export default MainBoard;
