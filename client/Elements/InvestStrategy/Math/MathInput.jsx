// @flow

import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import EventEmitter from 'events';
import { MathInitDataContext } from '../../../Constant/context';

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
    fontSize: 16,
    letterSpacing: 3,
  },
};

export const mathSharedEmitter = new EventEmitter();

mathSharedEmitter.setMaxListeners(30);

export const START_EDITTING = 'MATH/START_EDITTING';
export const END_EDITTING = 'MATH/END_EDITTING';
export const INIT_MODULE = 'MATH/INIT_MODULE';

function MathInput() {
  const mathInitData = useContext(MathInitDataContext);

  const [firstLoaded, setFirstLoaded] = useState(false);
  const [isInputDisabled, setInputDisabled] = useState(true);
  const [inputState, setInputState] = useState({
    content: '',
    meta: {},
  });

  console.log(inputState);

  useEffect(() => {
    if (!firstLoaded) {
      setInputState(mathInitData);

      setFirstLoaded(true);
    }
  }, [firstLoaded, mathInitData]);

  useEffect(() => {
    function startEditHandler() {
      console.log('EDIT START');

      setInputDisabled(false);
    }

    function endEditHandler() {
      console.log('EDIT END');

      setInputDisabled(true);
    }

    function initModuleHandler() {
      console.log('INITTED MODULE');

      setInputDisabled(true);
    }

    mathSharedEmitter.on(START_EDITTING, startEditHandler);
    mathSharedEmitter.on(END_EDITTING, endEditHandler);
    mathSharedEmitter.on(INIT_MODULE, initModuleHandler);
  }, []);

  const onChangeHandler = useCallback(({ target }) => {
    setInputState({
      content: target.value,
    });
  }, []);

  return (
    <div
      style={styles.wrapper}>
      <input
        disabled={isInputDisabled}
        value={inputState.content}
        onChange={onChangeHandler}
        style={styles.input} />
    </div>
  );
}

export default MathInput;
