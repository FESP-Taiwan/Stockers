// @flow

import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { MathInitDataContext } from '../../../Constant/context';
import {
  mathSharedEmitter,
  START_EDITTING,
  END_EDITTING,
  INIT_MODULE,
} from '../../../Constant/investStrategyEmitter';

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

function MathInput() {
  const inputRef = useRef();

  const mathInitData = useContext(MathInitDataContext);

  const [firstLoaded, setFirstLoaded] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
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
    const { current } = inputRef;

    if (current && isEditting) {
      current.focus();


    }
  }, [isEditting]);

  useEffect(() => {
    function startEditHandler() {
      console.log('EDIT START');

      setIsEditting(true);
    }

    function endEditHandler() {
      console.log('EDIT END');

      setIsEditting(false);
    }

    function initModuleHandler() {
      console.log('INITTED MODULE');

      setIsEditting(false);
    }

    mathSharedEmitter.on(START_EDITTING, startEditHandler);
    mathSharedEmitter.on(END_EDITTING, endEditHandler);
    mathSharedEmitter.on(INIT_MODULE, initModuleHandler);

    return () => {
      mathSharedEmitter.removeListener(START_EDITTING, startEditHandler);
      mathSharedEmitter.removeListener(END_EDITTING, endEditHandler);
      mathSharedEmitter.removeListener(INIT_MODULE, initModuleHandler);
    };
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
        ref={inputRef}
        disabled={!isEditting}
        value={inputState.content}
        onChange={onChangeHandler}
        style={styles.input} />
    </div>
  );
}

export default MathInput;
