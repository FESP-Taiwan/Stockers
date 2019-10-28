// @flow

import React from 'react';
import { Route } from 'react-router-dom';
import HeaderBlock from './HeaderBlock';
import InvestStrategyMainBlock from './InvestStrategyMainBlock';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  headerBlock: {
    width: '100%',
    flexBasis: 100,
    flexShrink: 0,
    backgroundColor: Colors.LAYER_SECOND,
  },
};

function InvestStrategyPage() {
  return (
    <div style={styles.wrapper}>
      <HeaderBlock />
      <Route path="/industry/stocks/:stockId/modules/:moduleId" component={InvestStrategyMainBlock} />
    </div>
  );
}

export default InvestStrategyPage;
