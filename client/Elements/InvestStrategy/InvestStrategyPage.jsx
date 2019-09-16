// @flow

import React from 'react';
import ModuleTableWrapper from './Module/ModuleTableWrapper';

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
  mathBlock: {
    width: '100%',
    flexBasis: 100,
    flexShrink: 0,
    backgroundColor: Colors.LAYER_THIRD,
  },
};

function InvestStrategyPage() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.headerBlock} />
      <div style={styles.mathBlock} />
      <ModuleTableWrapper />
    </div>
  );
}

export default InvestStrategyPage;
