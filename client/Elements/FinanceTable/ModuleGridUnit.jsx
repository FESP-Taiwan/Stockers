// @flow

import React, {
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import EventEmitter from 'events';

const styles = {
  btn: {
    width: 140,
    height: 100,
    padding: 0,
    margin: '0 0 10px 0',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: '100px',
  },
  btnActived: {
    backgroundColor: Colors.LAYER_SECOND,
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
}

function ModuleGridUnit({
  label,
  rowId,
  columnId,
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
    sharedEmitter.emit(ENTER_EVENT, {
      activedRowId: rowId,
      activedColumnId: columnId,
    });
  }, [rowId, columnId]);

  const onMouseLeave = useCallback(() => {
    sharedEmitter.emit(LEAVE_EVENT);
  }, []);

  return (
    <div
      ref={moduleGridUnit}
      className="module-grid-unit"
      disabled={rowId === 'header'}
      style={styles.btn}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button">
      {label}
    </div>
  );
}

export default ModuleGridUnit;
