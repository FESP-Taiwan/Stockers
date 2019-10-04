// @flow

import React, {
  useState,
} from 'react';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  input: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    textDecoration: 'none',
    border: 'none',
    outline: 'none',
    fontSize: 14,
  },
};

function MathInput() {
  const [inputState, setInputState] = useState({
    content: '',
    meta: {},
  });

  return (
    <div
      style={styles.wrapper}>
      <input
        style={styles.input} />
    </div>
  );
}

export default MathInput;
