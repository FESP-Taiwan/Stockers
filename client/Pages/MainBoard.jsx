// @flow

import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import SiteHeader from '../Elements/Sites/SiteHeader';
import StocksInfoPage from './StocksInfo/StocksInfoPage';
import IndustryPage from './Indusry/IndustryPage';
import StockSimulationPage from './StockSimulation/StockSimulationPage';
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
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) history.replace('/');
  }, [history]);

  return (
    <div style={styles.wrapper}>
      <SiteHeader />
      <div style={styles.main}>
        <Switch>
          <Route path="/industry/:industryId/stocks/:stockId" component={StockPageWrapper} />
          <Route path="/industry/:industryId" component={IndustryPage} />
          <Route exact path="/stockSimulation" component={StockSimulationPage} />
          <Route path="/stockInfo" component={StocksInfoPage} />
          <Redirect to="/stockInfo" />
        </Switch>
      </div>
    </div>
  );
}

export default MainBoard;
