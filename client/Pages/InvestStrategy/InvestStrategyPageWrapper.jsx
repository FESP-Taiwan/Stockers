// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeUserModules as storeUserModulesAction } from '../../actions/InvestStrategy';
import InvestStrategyPage from '../../Elements/InvestStrategy/InvestStrategyPage';

function InvestStrategyPageWrapper({
  storeUserModules,
}: {
  storeUserModules: Function,
}) {
  const localState = {
    useId: localStorage.getItem('userId'),
    tokem: localStorage.getItem('token'),
  };

  useEffect(() => {
    let canceled = false;

    async function fetchUserModulesData() {
      const resData = await fetch(`${localState.useId}/modules/userModules/2`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localState.token,
        },
      }).then(res => (!canceled ? res.json() : null));

      if (resData) {
        storeUserModules(resData);
        console.log("resData", resData);
      }
    }

    fetchUserModulesData();

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
