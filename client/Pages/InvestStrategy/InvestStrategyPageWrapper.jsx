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
  useEffect(() => {
    let canceled = false;

    async function fetchUserModulesData() {
      const resData = await fetch(`${API_HOST}/modules/userModules/2`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlhbjI0MjU3NTg3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JHgvN1lkdTQ4cnh2QzYwZ3VnMFJzRU80Mk1uSTBzSWgxOFdVVllGZG5haEJ6SnZsa2lSRE1xIiwiaWF0IjoxNTcyMTg3NzkzLCJleHAiOjE1NzIyNzQxOTN9.nTFowhpiFaJdfWWBWImH2IkcWmos8mdl6aH4hVB-Juk',
        },
      }).then(res => (!canceled ? res.json() : null));

      if (resData) {
        storeUserModules(resData);
      }
    }

    fetchUserModulesData();

    return () => {
      canceled = true;
    };
  }, [storeUserModules]);

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
