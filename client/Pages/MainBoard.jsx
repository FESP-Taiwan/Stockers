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
import StockSimulationPage from './StockSimulation/StockSimulationPage';
import StockPage from './Stock/StockPage';

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
          <Route exact path="/stockSimulation" component={StockSimulationPage} />
          <Route component={StocksInfoPage} />
          <Route exact path="/industry/stock" component={StockPage} />
          <Route render={() => (<StocksInfoPage />)} />
        </Switch>
      </div>
    </div>
  );
}

export default MainBoard;
