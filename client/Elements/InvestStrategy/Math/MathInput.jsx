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
  investStrategySharedEmitter,
  START_EDITTING,
  END_EDITTING,
  INIT_MODULE,
  CLICK_EVENT,
} from '../../../Constant/investStrategy';

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

    function clickEventHandler(el) {
      console.log('el->', el);
    }

    if (current && isEditting) {
      current.focus();

      investStrategySharedEmitter.on(CLICK_EVENT, clickEventHandler);
    }

    return () => {
      investStrategySharedEmitter.removeListener(CLICK_EVENT, clickEventHandler);
    };
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

    investStrategySharedEmitter.on(START_EDITTING, startEditHandler);
    investStrategySharedEmitter.on(END_EDITTING, endEditHandler);
    investStrategySharedEmitter.on(INIT_MODULE, initModuleHandler);

    return () => {
      investStrategySharedEmitter.removeListener(START_EDITTING, startEditHandler);
      investStrategySharedEmitter.removeListener(END_EDITTING, endEditHandler);
      investStrategySharedEmitter.removeListener(INIT_MODULE, initModuleHandler);
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
