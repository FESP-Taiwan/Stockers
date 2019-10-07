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
import EventEmitter from 'events';
import editIcon from '../../../static/images/icon-edit.png';
import cancelIcon from '../../../static/images/icon-cancel.png';
import {
  mathSharedEmitter,
  START_EDITTING,
  END_EDITTING,
  INIT_MODULE,
} from '../Math/MathInput';

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
    position: 'absolute',
    right: 4,
    bottom: 80,
    width: 0,
    height: 0,
    opacity: 0,
    backgroundColor: Colors.LAYER_FOURTH,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 30,
  },
  mathEditBtn: {
    width: '100%',
    height: 30,
    borderRadius: 30,
  },
};

export const sharedEmitter = new EventEmitter();

sharedEmitter.setMaxListeners(300);

export const ENTER_EVENT = 'E/MOUSE_ENTER';
export const LEAVE_EVENT = 'E/MOUSE_LEAVE';
export const CLICK_EVENT = 'E/ONCLICK';

type Props = {
  label: string,
  rowId: string | number,
  columnId: string | number,
  headerName?: string,
  setHeaderUpdateBlockOpen?: Function,
}

function ModuleGridUnit({
  label,
  rowId,
  columnId,
  headerName,
  setHeaderUpdateBlockOpen,
}: Props) {
  const moduleGridUnit = useRef();
  const mathEditHandler = useRef();

  const [isMathModuleEditting, setMathModuleEditting] = useState(false);

  console.log(isMathModuleEditting);

  const mathEmitHandlerBlock = useMemo(() => {
    if (!isMathModuleEditting) return null;

    return (
      <div
        ref={mathEditHandler}
        className="module-math-edit-handler"
        style={styles.mathHandlerBlock}>
        <button
          style={styles.mathEditBtn}
          type="button">
          1
        </button>
        <button
          style={styles.mathEditBtn}
          type="button">
          2
        </button>
      </div>
    );
  }, [isMathModuleEditting]);

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

  useEffect(() => {
    const enterHandler = ({ activedRowId, activedColumnId }) => {
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

        if (activedColumnId === columnId) {
          if (activedRowId === rowId) {
            current.classList.add('hovered');

            if (isMathModuleEditting && mathHandlerCurrent) {
              mathHandlerCurrent.classList.add('hovered');
            }
          }
        }
      }
    };

    const leaveHandler = () => {
      const { current } = moduleGridUnit;
      const { current: mathHandlerCurrent } = mathEditHandler;

      if (current && current.classList.contains('hovered')) {
        current.classList.remove('hovered');
      }

      if (isMathModuleEditting && mathHandlerCurrent && mathHandlerCurrent.classList.contains('hovered')) {
        mathHandlerCurrent.classList.remove('hovered');
      }
    };

    sharedEmitter.on(ENTER_EVENT, enterHandler);
    sharedEmitter.on(LEAVE_EVENT, leaveHandler);

    return () => {
      sharedEmitter.removeListener(ENTER_EVENT, enterHandler);
      sharedEmitter.removeListener(LEAVE_EVENT, leaveHandler);
    };
  }, [rowId, columnId, isMathModuleEditting]);

  const onMouseEnter = useCallback(() => {
    if (moduleGridUnit.current && rowId === 'header') {
      const childrenNodes = Object.values(moduleGridUnit.current.parentNode.children);

      childrenNodes.forEach((child) => {
        if (child.className !== 'module-grid-unit') {
          child.style.setProperty('top', '43px');

          child.style.setProperty('opacity', 1);
        }
      });
    }

    sharedEmitter.emit(ENTER_EVENT, {
      activedRowId: rowId,
      activedColumnId: columnId,
    });
  }, [rowId, columnId]);

  const onMouseLeave = useCallback(() => {
    if (moduleGridUnit.current && rowId === 'header') {
      const childrenNodes = Object.values(moduleGridUnit.current.parentNode.children);

      childrenNodes.map((child) => {
        if (child.className === 'module-grid-unit hovered') return null;

        child.style.setProperty('top', '50px');

        child.style.setProperty('opacity', 0);

        return null;
      });
    }

    sharedEmitter.emit(LEAVE_EVENT);
  }, [rowId]);

  const setHeaderUpdateBlock = useCallback(() => {
    if (typeof (setHeaderUpdateBlockOpen) === 'function') {
      setHeaderUpdateBlockOpen(true);
    }
  }, [setHeaderUpdateBlockOpen]);

  const onClick = useCallback(() => {
    sharedEmitter.emit(CLICK_EVENT, {
      rowId,
      columnId,
      name: (headerName || label),
    });
  }, [rowId, columnId, headerName, label]);

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
        onClick={onClick}
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
};

export default ModuleGridUnit;
