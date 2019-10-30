// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { ContextRouter } from 'react-router';
import { storeUserModules as storeUserModulesAction } from '../../actions/InvestStrategy';
import InvestStrategyPage from '../../Elements/InvestStrategy/InvestStrategyPage';

function InvestStrategyPageWrapper({
  storeUserModules,
  history,
  match: {
    params: {
      industryId,
      stockId,
    },
  },
}: {
  storeUserModules: Function,
} & ContextRouter) {
  const localState = {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
  };

  useEffect(() => {
    if (!localState.userId || !localState.token) {
      history.replace(`/industry/${industryId}/stocks/${stockId}`);
    }
  }, [localState, history, industryId, stockId]);

  useEffect(() => {
    let canceled = false;

    async function fetchUserModulesData() {
      const resData = await fetch(`${API_HOST}/modules/userModules/${localState.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localState.token,
        },
      }).then(res => (!canceled ? res.json() : null));

      console.log('resData', resData);

      if (resData) {
        storeUserModules(resData);
      }
    }

    if (localState.userId && localState.token) {
      fetchUserModulesData();
    }

    return () => {
      canceled = true;
    };
  }, [storeUserModules, localState]);

  return (
    <InvestStrategyPage />
  );
}

const reduxHook = connect(
  () => ({}),
  dispatch => bindActionCreators({
    storeUserModules: storeUserModulesAction,
  }, dispatch),
);

export default reduxHook(InvestStrategyPageWrapper);
