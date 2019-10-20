// @flow

import { API_REQUEST } from 'redux-middleware-fetch';

export const FETCH_STOCK_DATA = 'STOCK/FETCH_STOCK_DATA';

export function fetchStockData() {
  return {
    [API_REQUEST]: {
      types: [
        FETCH_STOCK_DATA,
      ],
      auth: false,
      method: 'GET',
      entrypoint: '/stocker/mainpage_1',
    },
  };
}
