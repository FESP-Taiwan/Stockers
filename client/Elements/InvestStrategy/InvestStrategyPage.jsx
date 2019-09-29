// @flow

import React from 'react';
import ModuleTableWrapper from './Module/ModuleTableWrapper';
import CommentBlock from './CommentBlock';
import HeaderBlock from './HeaderBlock';

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
    backgroundColor: Colors.FIRST,
  },
};

function InvestStrategyPage() {
  return (
    <div style={styles.wrapper}>
      <HeaderBlock />
      <div style={styles.mathBlock} />
      <ModuleTableWrapper />
      <CommentBlock
        initialValues={{
          comment: '',
        }} />
    </div>
  );
}

export default InvestStrategyPage;
