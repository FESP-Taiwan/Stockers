// @flow

import React from 'react';
import {
  Switch,
  Route,
  useParams,
} from 'react-router-dom';
import SiteHeader from '../Elements/Sites/SiteHeader';
import StocksInfoPage from './StocksInfo/StocksInfoPage';
import IndustryPage from './Indusry/IndustryPage';
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
  console.log('---');

  return (
    <div style={styles.wrapper}>
      <Switch>
        <Route>
          <SiteHeader />
        </Route>
      </Switch>
      <div style={styles.main}>
        <Switch>
          <Route path="/industry/:industryId/stocks/:stockId">
            <StockPageWrapper />
          </Route>
          <Route path="/industry/:industryId">
            <IndustryPage />
          </Route>
          <Route>
            <StocksInfoPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default MainBoard;
