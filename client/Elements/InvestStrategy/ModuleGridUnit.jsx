// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import {
  useRef,
  useEffect,
  useCallback,
} from 'react';
import EventEmitter from 'events';
import editIcon from '../../static/images/icon-edit.png';
import cancelIcon from '../../static/images/icon-cancel.png';

const styles = {
  btn: css`
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
};

export const sharedEmitter = new EventEmitter();

sharedEmitter.setMaxListeners(300);

export const ENTER_EVENT = 'E/MOUSE_ENTER';
export const LEAVE_EVENT = 'E/MOUSE_LEAVE';

type Props = {
  label: string,
  rowId: string | number,
  columnId: string | number,
  setHeaderUpdateBlockOpen?: Function,
}

function ModuleGridUnit({
  label,
  rowId,
  columnId,
  setHeaderUpdateBlockOpen,
}: Props) {
  const moduleGridUnit = useRef();

  useEffect(() => {
    const enterHandler = ({ activedRowId, activedColumnId }) => {
      const { current } = moduleGridUnit;

      if (current) {
        if (current.classList.contains('hovered')) {
          current.classList.remove('hovered');
        }

        if (activedColumnId === columnId) {
          if (activedRowId === 'header' || activedRowId === rowId) {
            current.classList.add('hovered');
          }
        }
      }
    };

    const leaveHandler = () => {
      const { current } = moduleGridUnit;

      if (current && current.classList.contains('hovered')) {
        current.classList.remove('hovered');
      }
    };

    sharedEmitter.on(ENTER_EVENT, enterHandler);
    sharedEmitter.on(LEAVE_EVENT, leaveHandler);

    return () => {
      sharedEmitter.removeListener(ENTER_EVENT, enterHandler);
      sharedEmitter.removeListener(LEAVE_EVENT, leaveHandler);
    };
  }, [rowId, columnId]);

  const onMouseEnter = useCallback(() => {
    if (moduleGridUnit.current && rowId === 'header') {
      const childrenNodes = Object.values(moduleGridUnit.current.children);

      childrenNodes.map((child) => {
        child.style.setProperty('top', '43px');

        child.style.setProperty('opacity', 1);

        return null;
      });
    }

    sharedEmitter.emit(ENTER_EVENT, {
      activedRowId: rowId,
      activedColumnId: columnId,
    });
  }, [rowId, columnId]);

  const onMouseLeave = useCallback(() => {
    if (moduleGridUnit.current && rowId === 'header') {
      const childrenNodes = Object.values(moduleGridUnit.current.children);

      childrenNodes.map((child) => {
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

  if (rowId === 'header') {
    return (
      <div
        ref={moduleGridUnit}
        className="module-grid-unit"
        css={styles.btn}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        {label}
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
      </div>
    );
  }

  return (
    <button
      ref={moduleGridUnit}
      className="module-grid-unit"
      css={styles.btn}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type="button">
      {label}
    </button>
  );
}

ModuleGridUnit.defaultProps = {
  setHeaderUpdateBlockOpen: null,
};

export default ModuleGridUnit;
