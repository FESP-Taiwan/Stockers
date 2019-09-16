// @flow

import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import SiteHeader from '../Elements/Sites/SiteHeader';
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
    height: '100%',
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
          <Route render={() => <div>首頁待完成，Table這邊請 - /strategy</div>} />
        </Switch>
      </div>
    </div>
  );
}

export default MainBoard;