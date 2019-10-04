// @flow

import React from 'react';
import MathInput from './MathInput';

const styles = {
  wrapper: {
    width: '100%',
    flexBasis: 100,
    backgroundColor: Colors.PRIMARY_THIRD,
    borderRadius: 40,
    padding: '0 0 0 40px',
    margin: '20px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    fontSize: 14,
    color: Colors.PRIMARY,
    margin: '0 40px 0 0',
    flexShrink: 0,
  },
  mathInputBlock: {
    flexGrow: 1,
    height: '100%',
  },
  btn: {
    flexBasis: 106,
    height: '100%',
    borderRadius: 40,
    backgroundColor: Colors.PRIMARY_SECOND,
    fontSize: 13,
    lineHeight: '100px',
    textAlign: 'center',
  },
};

function MathModuleBlock() {
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.header}>數學公式：</h2>
      <div style={styles.mathInputBlock}>
        <MathInput />
      </div>
      <button
        onClick={() => {}}
        style={styles.btn}
        type="button">
        註釋
      </button>
    </div>
  );
}

export default MathModuleBlock;
