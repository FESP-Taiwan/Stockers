// @flow

import React, {
} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import StockPage from './StockPage';
import InvestStrategyPageWrapper from '../InvestStrategy/InvestStrategyPageWrapper';

function StockPageWrapper() {
  return (
    <Switch>
      <Route path="/industry/:industryId/stocks/:stockId/modules">
        <InvestStrategyPageWrapper />
      </Route>
      <Route>
        <StockPage />
      </Route>
    </Switch>
  );
}

export default StockPageWrapper;
