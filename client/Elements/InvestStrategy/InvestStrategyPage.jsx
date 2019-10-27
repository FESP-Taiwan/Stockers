// @flow

import React from 'react';
import ModuleTableWrapper from './Module/ModuleTableWrapper';
import CommentBlockWrapper from './CommentBlockWrapper';
import HeaderBlock from './HeaderBlock';
import MathModuleBlockWrapper from './Math/MathModuleBlockWrapper';

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
      <MathModuleBlockWrapper />
      <ModuleTableWrapper />
      <CommentBlockWrapper />
    </div>
  );
}

export default InvestStrategyPage;
