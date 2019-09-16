// @flow

import React from 'react';

const styles = {
  wrapper: {
    width: 106,
    height: 80,
    position: 'fixed',
    right: 30,
    bottom: 30,
  },
  btn: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    padding: 0,
    lineHeight: '80px',
    textAlign: 'center',
  },
};

function CommentBlock() {
  return (
    <div style={styles.wrapper}>
      <button
        style={styles.btn}
        type="button">
        筆記欄
      </button>
    </div>
  );
}

export default CommentBlock;
