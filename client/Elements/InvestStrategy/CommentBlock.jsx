// @flow

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import Editor from '../ArtiboxEditor/Editor';
import {
  investStrategySharedEmitter,
  CLICK_EVENT,
  START_EDITTING,
  END_EDITTING,
  INIT_MODULE,
  EDITTER_GET_GRID,
} from '../../Constant/investStrategy';
import { FIXED_BUTTON_INDEX, BASE_CONTAINER_INDEX } from '../../Constant/zIndex';

const styles = {
  wrapper: {
    width: 80,
    height: 80,
    position: 'fixed',
    right: 30,
    bottom: 30,
  },
  btn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: FIXED_BUTTON_INDEX,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    padding: 0,
    lineHeight: '80px',
    textAlign: 'center',
    color: '#000',
    fontWeight: 500,
    borderRadius: 50,
  },
  formBlock: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: BASE_CONTAINER_INDEX,
    width: 0,
    height: 0,
    borderRadius: 40,
    backgroundColor: Colors.LAYER_THIRD,
    transition: '0.5s',
    opacity: 0,
  },
  formBlockActived: {
    width: 284,
    height: 456,
    opacity: 1,
  },
};

function CommentBlock() {
  const [isFormOpened, setFormOpened] = useState(false);
  const [isMathModuleEditting, setMathModuleEditting] = useState(false);

  useEffect(() => {
    function mathStartEditHandler() {
      setMathModuleEditting(true);
    }

    function mathEndEditHandler() {
      setMathModuleEditting(false);
    }

    investStrategySharedEmitter.on(START_EDITTING, mathStartEditHandler);
    investStrategySharedEmitter.on(END_EDITTING, mathEndEditHandler);
    investStrategySharedEmitter.on(INIT_MODULE, mathEndEditHandler);

    return () => {
      investStrategySharedEmitter.removeListener(START_EDITTING, mathStartEditHandler);
      investStrategySharedEmitter.removeListener(END_EDITTING, mathEndEditHandler);
      investStrategySharedEmitter.removeListener(INIT_MODULE, mathEndEditHandler);
    };
  }, []);

  useEffect(() => {
    if (isMathModuleEditting) return () => {};

    function clickHandler(gridInfo) {
      setFormOpened(true);

      console.log('gridInfo', gridInfo);
      investStrategySharedEmitter.emit(EDITTER_GET_GRID, gridInfo);
    }

    investStrategySharedEmitter.on(CLICK_EVENT, clickHandler);

    return () => {
      investStrategySharedEmitter.removeListener(CLICK_EVENT, clickHandler);
    };
  }, [isMathModuleEditting]);

  const onClick = useCallback(() => {
    setFormOpened(!isFormOpened);
  }, [isFormOpened]);

  const formBlockStyles = useMemo(() => ({
    ...styles.formBlock,
    ...(isFormOpened ? styles.formBlockActived : {}),
  }), [isFormOpened]);

  return (
    <div style={styles.wrapper}>
      <button
        onClick={onClick}
        style={styles.btn}
        type="button">
        筆記欄
      </button>
      <div style={formBlockStyles}>
        <Editor />
      </div>
    </div>
  );
}

export default CommentBlock;
