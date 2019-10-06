// @flow

import React, {
  useState,
  useEffect,
} from 'react';
import EventEmitter from 'events';

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

export const mathSharedEmitter = new EventEmitter();

mathSharedEmitter.setMaxListeners(30);

export const START_EDITTING = 'MATH/START_EDITTING';
export const END_EDITTING = 'MATH/END_EDITTING';
export const INIT_MODULE = 'MATH/INIT_MODULE';

function MathInput() {
  const [inputState, setInputState] = useState({
    content: '',
    meta: {},
  });

  useEffect(() => {
    function startEditHandler() {
      console.log('EDIT START');
    }

    function endEditHandler() {
      console.log('EDIT END');
    }

    function initModuleHandler() {
      console.log('INITTED MODULE');
    }

    mathSharedEmitter.on(START_EDITTING, startEditHandler);
    mathSharedEmitter.on(END_EDITTING, endEditHandler);
    mathSharedEmitter.on(INIT_MODULE, initModuleHandler);
  }, []);

  return (
    <div
      style={styles.wrapper}>
      <input
        style={styles.input} />
    </div>
  );
}

export default MathInput;
