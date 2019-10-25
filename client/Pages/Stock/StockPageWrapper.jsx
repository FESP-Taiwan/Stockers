// @flow

import React, {
  useEffect,
} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { ContextRouter } from 'react-router';
import * as StockActions from '../../actions/Stocks';
import prettifyStockData from '../../helper/stocks';
import StockPage from './StockPage';
import InvestStrategyPageWrapper from '../InvestStrategy/InvestStrategyPageWrapper';

type Props = {
  storeStockData: Function,
} & ContextRouter;

function StockPageWrapper({
  storeStockData,
  match: {
    params: {
      stockId,
    },
  },
}: Props) {
  useEffect(() => {
    let canceled = false;

    async function fetchStockData() {
      const resData = await fetch(`${API_HOST}/stocker/individualStock/${stockId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => (!canceled ? res.json() : null));

      if (resData) {
        const prettifiedStockData = prettifyStockData(resData);

        storeStockData(prettifiedStockData);
      }
    }

    fetchStockData();

    return () => {
      canceled = true;
    };
  }, [storeStockData, stockId]);

  return (
    <Switch>
      <Route path="/industry/stocks/:stockId/modules" component={InvestStrategyPageWrapper} />
      <Route component={StockPage} />
    </Switch>
  );
}

const reduxHook = connect(
  state => ({
    stockData: state.Stocks.stockData,
  }),
  dispatch => bindActionCreators({
    ...StockActions,
  }, dispatch),
);

export default reduxHook(StockPageWrapper);
