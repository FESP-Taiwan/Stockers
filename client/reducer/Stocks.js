// @flow

import {
  FETCH_STOCK_DATA,
} from '../actions/Stocks';

type State = {

}

export default (state: State = {
  StockData: [],
}, action: any) => {
  switch (action.type) {
    case FETCH_STOCK_DATA:
      return {
        ...state,
        stockData: action.data,
      };

    default:
      return state;
  }
};
