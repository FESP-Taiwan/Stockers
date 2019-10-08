// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from 'react';
import editIcon from '../../../static/images/icon-edit.png';
import cancelIcon from '../../../static/images/icon-cancel.png';
import {
  mathSharedEmitter,
  START_EDITTING,
  END_EDITTING,
  INIT_MODULE,
} from '../../../Constant/investStrategyEmitter';

const styles = {
  btnWrapper: css`
    position: relative;
    width: 140px;
    height: 100px;
    padding: 0;
    margin: 0 0 10px 0;
    font-size: 13px;
    text-align: center;
    line-height: 100px;
    flex-shrink: 0;
  `,
  headerBtn: {
    width: '100%',
    height: '100%',
    padding: 0,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: '100px',
  },
  editBtn: {
    width: 14,
    height: 14,
    padding: 0,
    position: 'absolute',
    top: 50,
    left: 20,
    transition: '0.3s',
    opacity: 0,
  },
  cancelBtn: {
    width: 14,
    height: 14,
    padding: 0,
    position: 'absolute',
    top: 50,
    right: 20,
    transition: '0.3s',
    opacity: 0,
  },
  icon: {
    width: 14,
    height: 14,
  },
  mathHandlerBlock: {
    padding: 4,
    position: 'absolute',
    right: 4,
    top: -14,
    width: 0,
    height: 0,
    opacity: 0,
    backgroundColor: Colors.LAYER_THIRD,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,
  },
  mathEditBtn: css`
    flex-grow: 1;
    height: 100%;
    text-align: center;
    line-height: 22px;
    &:hover {
      background-color: ${Colors.LAYER_FOURTH};
    }
  `,
};

type Props = {
  label: string,
  rowId: string | number,
  columnId: string | number,
  headerName?: string,
  setHeaderUpdateBlockOpen?: Function,
  timeStamp?: MomentType,
}

function ModuleGridUnit({
  label,
  rowId,
  columnId,
  headerName,
  timeStamp,
  setHeaderUpdateBlockOpen,
}: Props) {
  const moduleGridUnit = useRef();
  const mathEditHandler = useRef();

  const [isMathModuleEditting, setMathModuleEditting] = useState(false);

  console.log(isMathModuleEditting);

  const mathEmitHandlerBlock = useMemo(() => {
    if (!isMathModuleEditting) return null;

    if (rowId === 'header') {
      return (
        <div
          ref={mathEditHandler}
          className="module-math-edit-handler"
          style={styles.mathHandlerBlock}>
          <button
            css={styles.mathEditBtn}
            type="button">
            取平均
          </button>
          <button
            css={styles.mathEditBtn}
            type="button">
            取眾數
          </button>
        </div>
      );
    }

    return (
      <div
        ref={mathEditHandler}
        className="module-math-edit-handler"
        style={styles.mathHandlerBlock}>
        <button
          css={styles.mathEditBtn}
          type="button">
          取格子
        </button>
        <button
          css={styles.mathEditBtn}
          type="button">
          取時間
        </button>
      </div>
    );
  }, [isMathModuleEditting, rowId]);

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

  const onMouseEnter = useCallback(() => {
    const { current } = moduleGridUnit;
    const { current: mathHandlerCurrent } = mathEditHandler;

    if (current) {
      // clean up
      if (current.classList.contains('hovered')) {
        current.classList.remove('hovered');
      }

      if (isMathModuleEditting && mathHandlerCurrent && mathHandlerCurrent.classList.contains('hovered')) {
        mathHandlerCurrent.classList.remove('hovered');
      }

      // hover feature
      if (rowId === 'header') {
        const childrenNodes = Object.values(moduleGridUnit.current.parentNode.children);

        childrenNodes.forEach((child) => {
          if (child.className !== 'module-grid-unit' && child.className !== 'module-math-edit-handler') {
            child.style.setProperty('top', '43px');

            child.style.setProperty('opacity', 1);
          }
        });
      }

      current.classList.add('hovered');

      if (isMathModuleEditting && mathHandlerCurrent) {
        mathHandlerCurrent.classList.add('hovered');
      }
    }
  }, [isMathModuleEditting, rowId]);

  const onMouseLeave = useCallback(() => {
    const { current } = moduleGridUnit;
    const { current: mathHandlerCurrent } = mathEditHandler;

    if (current) {
      if (current && current.classList.contains('hovered')) {
        current.classList.remove('hovered');
      }

      if (isMathModuleEditting && mathHandlerCurrent && mathHandlerCurrent.classList.contains('hovered')) {
        mathHandlerCurrent.classList.remove('hovered');
      }

      if (rowId === 'header') {
        const childrenNodes = Object.values(moduleGridUnit.current.parentNode.children);

        childrenNodes.forEach((child) => {
          if (child.className !== 'module-grid-unit' && child.className !== 'module-math-edit-handler') {
            child.style.setProperty('top', '50px');

            child.style.setProperty('opacity', 0);
          }
        });
      }
    }
  }, [rowId, isMathModuleEditting]);

  const setHeaderUpdateBlock = useCallback(() => {
    if (typeof (setHeaderUpdateBlockOpen) === 'function') {
      setHeaderUpdateBlockOpen(true);
    }
  }, [setHeaderUpdateBlockOpen]);

  // const onClick = useCallback(() => {
  //   moduleGridSharedEmitter.emit(CLICK_EVENT, {
  //     rowId,
  //     columnId,
  //     name: (headerName || label),
  //   });
  // }, [rowId, columnId, headerName, label]);

  if (rowId === 'header') {
    return (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        css={styles.btnWrapper}>
        <button
          ref={moduleGridUnit}
          className="module-grid-unit"
          style={styles.headerBtn}
          // onClick={onClick}
          type="button">
          {label}
        </button>
        <button
          style={styles.editBtn}
          onClick={setHeaderUpdateBlock}
          type="button">
          <img src={editIcon} alt="edit" style={styles.icon} />
        </button>
        <button
          style={styles.cancelBtn}
          onClick={() => console.log('CANCEL ACTION')}
          type="button">
          <img src={cancelIcon} alt="cancel" style={styles.icon} />
        </button>
        {mathEmitHandlerBlock}
      </div>
    );
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      css={styles.btnWrapper}>
      <button
        ref={moduleGridUnit}
        className="module-grid-unit"
        css={styles.headerBtn}
        // onClick={onClick}
        type="button">
        {label}
      </button>
      {mathEmitHandlerBlock}
    </div>
  );
}

ModuleGridUnit.defaultProps = {
  setHeaderUpdateBlockOpen: null,
  headerName: null,
  timeStamp: null,
};

export default ModuleGridUnit;
