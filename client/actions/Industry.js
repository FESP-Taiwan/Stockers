// @flow

import { API_REQUEST } from 'redux-middleware-fetch';

export const FETCH_INDUSTRY_DATA = 'INDUSTRY/FETCH_INDUSTRY_DATA';

export function fetchIndustryData() {
  return {
    [API_REQUEST]: {
      type: [
        FETCH_INDUSTRY_DATA,
      ],
      auth: false,
      method: 'GET',
      entrypoint: '/stocker/mainpage_1',
    },
  };
}
