// @flow

import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useParams,
} from 'react-router-dom';
import SiteHeader from '../Elements/Sites/SiteHeader';
import StocksInfoPage from './StocksInfo/StocksInfoPage';
import IndustryPage from './Indusry/IndustryPage';
import StockSimulationPage from './StockSimulation/StockSimulationPage';
import StockPage from './Stock/StockPage';
import StockPageWrapper from './Stock/StockPageWrapper';

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
      <SiteHeader />
      <div style={styles.main}>
        <Switch>
          <Route path="/industry/:industryId/stocks/:stockId">
            <StockPageWrapper />
          </Route>
          <Route path="/industry/:industryId">
            <IndustryPage />
          </Route>
          <Route exact path="/stockSimulation">
            <StockSimulationPage />
          </Route>
          <Route exact path="/industry/stock">
            <StockPage />
          </Route>
          <Route path="/stockInfo" component={StocksInfoPage} />
          <Redirect to="/stockInfo" />
        </Switch>
      </div>
    </div>
  );
}

export default MainBoard;
