// @flow

import { API_REQUEST } from 'redux-middleware-fetch';

export const FETCH_INDUSTRY_CARD_DATA = 'INDUSTRY/FETCH_INDUSTRY_CARD_DATA';

export function fetchIndustryCardData() {
  return {
    [API_REQUEST]: {
      types: [
        FETCH_INDUSTRY_CARD_DATA,
      ],
      auth: false,
      method: 'GET',
      entrypoint: '/Industry/IndustryCardData',
    },
  };
}
