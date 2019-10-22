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
  investStrategySharedEmitter,
  START_EDITTING,
  END_EDITTING,
  INIT_MODULE,
  CLICK_EVENT,
  MATH_META_TYPES,
} from '../../../Constant/investStrategy';

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
  redTxt: {
    color: Colors.ERROR,
  },
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
  const mathEmitHandler = useRef();

  const [isMathModuleEditting, setMathModuleEditting] = useState(false);

  const onClick = useCallback((type: null) => {
    investStrategySharedEmitter.emit(CLICK_EVENT, {
      rowId,
      columnId,
      type,
      date: (type === MATH_META_TYPES.DATE ? timeStamp : null),
      name: (headerName || label),
    });
  }, [rowId, columnId, headerName, label, timeStamp]);

  const mathEmitHandlerBlock = useMemo(() => {
    if (!isMathModuleEditting) return null;

    if (rowId === 'header') {
      return (
        <div
          ref={mathEmitHandler}
          className="module-math-edit-handler"
          style={styles.mathHandlerBlock}>
          <button
            css={styles.mathEditBtn}
            onClick={() => onClick(MATH_META_TYPES.AVERAGE)}
            type="button">
            取平均
          </button>
          <button
            css={styles.mathEditBtn}
            onClick={() => onClick(MATH_META_TYPES.NUMEROUS)}
            type="button">
            取眾數
          </button>
        </div>
      );
    }

    return (
      <div
        ref={mathEmitHandler}
        className="module-math-edit-handler"
        style={styles.mathHandlerBlock}>
        <button
          css={styles.mathEditBtn}
          onClick={() => onClick(MATH_META_TYPES.GRID)}
          type="button">
          取格子
        </button>
        <button
          css={styles.mathEditBtn}
          onClick={() => onClick(MATH_META_TYPES.DATE)}
          type="button">
          取時間
        </button>
      </div>
    );
  }, [isMathModuleEditting, rowId, onClick]);

  useEffect(() => {
    function startEditHandler() {
      setMathModuleEditting(true);
    }

    function endEditHandler() {
      setMathModuleEditting(false);
    }

    investStrategySharedEmitter.on(START_EDITTING, startEditHandler);
    investStrategySharedEmitter.on(END_EDITTING, endEditHandler);
    investStrategySharedEmitter.on(INIT_MODULE, endEditHandler);

    return () => {
      investStrategySharedEmitter.removeListener(START_EDITTING, startEditHandler);
      investStrategySharedEmitter.removeListener(END_EDITTING, endEditHandler);
      investStrategySharedEmitter.removeListener(INIT_MODULE, endEditHandler);
    };
  }, []);

  const onMouseEnter = useCallback(() => {
    const { current } = moduleGridUnit;
    const { current: mathHandlerCurrent } = mathEmitHandler;

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
    const { current: mathHandlerCurrent } = mathEmitHandler;

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

  const headerBtnStyles = useMemo(() => ({
    ...styles.headerBtn,
    ...(!label ? styles.redTxt : {}),
  }), [label]);

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
          onClick={onClick}
          type="button">
          {label}
        </button>
        <button
          style={styles.editBtn}
          onClick={setHeaderUpdateBlock}
          disabled={isMathModuleEditting}
          type="button">
          <img src={editIcon} alt="edit" style={styles.icon} />
        </button>
        <button
          style={styles.cancelBtn}
          onClick={() => console.log('CANCEL ACTION')}
          disabled={isMathModuleEditting}
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
        css={headerBtnStyles}
        onClick={onClick}
        // disabled={isMathModuleEditting}
        type="button">
        {label || '資料從缺'}
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
