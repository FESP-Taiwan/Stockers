// @flow

import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import MathInput, {
  mathSharedEmitter,
  START_EDITTING,
  END_EDITTING,
  INIT_MODULE,
} from './MathInput';

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
  btnWrapper: {
    height: '100%',
    width: 106,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 40,
    transition: '0.3s',
    backgroundColor: Colors.PRIMARY_SECOND,
  },
  btn: {
    flexBasis: 106,
    height: '100%',
    borderRadius: 40,
    fontSize: 13,
    lineHeight: '100px',
    textAlign: 'center',
  },
  btnWrapperActived: {
    width: 212,
  },
};

function MathModuleBlock() {
  const [isMathModuleEditting, setMathModuleEditting] = useState(false);

  useEffect(() => {
    function startEditHandler() {
      setMathModuleEditting(true);
    }

    function endEditHandler() {
      setMathModuleEditting(false);
    }

    mathSharedEmitter.on(START_EDITTING, startEditHandler);
    mathSharedEmitter.on(END_EDITTING, endEditHandler);
    mathSharedEmitter.on(INIT_MODULE, endEditHandler);

    return () => {
      mathSharedEmitter.removeListener(START_EDITTING, startEditHandler);
      mathSharedEmitter.removeListener(END_EDITTING, endEditHandler);
      mathSharedEmitter.removeListener(INIT_MODULE, endEditHandler);
    };
  }, []);

  const mathModuleHandlerOnClick = useCallback(() => {
    if (!isMathModuleEditting) {
      mathSharedEmitter.emit(START_EDITTING);

      document.querySelector('.math-module-handler').style.setProperty('width', '212px');
    } else {
      mathSharedEmitter.emit(END_EDITTING);

      document.querySelector('.math-module-handler').style.setProperty('width', '106px');
    }
  }, [isMathModuleEditting]);

  const initMathModuleOnClick = useCallback(() => {
    mathSharedEmitter.emit(INIT_MODULE);

    document.querySelector('.math-module-handler').style.setProperty('width', '106px');
  }, []);

  const mathModuleHandlerBtn = useMemo(() => {
    if (isMathModuleEditting) {
      return '編輯完成';
    }

    return '編輯數學模型';
  }, [isMathModuleEditting]);

  const cancelBtn = useMemo(() => {
    if (!isMathModuleEditting) return null;

    return (
      <button
        style={styles.btn}
        onClick={initMathModuleOnClick}
        type="button">
        取消編輯
      </button>
    );
  }, [isMathModuleEditting, initMathModuleOnClick]);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.header}>數學模型：</h2>
      <div style={styles.mathInputBlock}>
        <MathInput />
      </div>
      <div
        className="math-module-handler"
        style={styles.btnWrapper}>
        {cancelBtn}
        <button
          onClick={mathModuleHandlerOnClick}
          style={styles.btn}
          type="button">
          {mathModuleHandlerBtn}
        </button>
      </div>
    </div>
  );
}

export default MathModuleBlock;
