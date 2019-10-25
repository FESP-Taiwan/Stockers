// @flow

import React, {
  useEffect,
  useMemo,
  useContext,
  useCallback,
} from 'react';
import Actions from '../../../Constant/ArtiboxEditor/actions';
import { Dispatch as DispatchContext } from '../../../Constant/ArtiboxEditor/context';

const styles = {
  wrapper: {
    width: '100%',
    borderLeft: '2px solid transparent',
    padding: '0 12px',
    height: 30,
    position: 'relative',
    outline: 'none',
  },
  invisibleTxtButton: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    fontSize: 0,
    padding: 0,
  },
  focusWrapper: {
    width: '100%',
    borderLeft: `2px solid ${Colors.PRIMARY}`,
    padding: '0 12px',
    height: 30,
    position: 'relative',
    outline: 'none',
  },
};

type Props = {
  type: symbol,
  focus: boolean,
  meta: Object,
  id: string,
}

function Grid({
  type,
  focus,
  meta,
  id,
}: Props) {
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (!meta.GRIDS || !meta.GRIDS.length) {
      dispatch({
        type: Actions.REMOVE_BLOCK,
        id,
      });
    }
  }, [meta, dispatch, id]);

  const onFocusHandler = useCallback(() => {
    dispatch({
      type: Actions.FOCUS,
      id,
    });
  }, [dispatch, id]);

  const gridButtons = useMemo(() => {
    if (!meta.GRIDS || !meta.GRIDS.length) return null;

    const buttonList = [];

    const {
      GRIDS: grids,
    } = meta;

    grids.forEach((grid) => {
      buttonList.push(
        <button
          type="button">
          {grid.name}
        </button>
      );
    });

    return (
      <div style={styles.buttonsWrapper}>
        {buttonList}
      </div>
    );
  }, [meta]);

  const wrapperStyles = useMemo(() => ({
    ...(focus ? styles.focusWrapper : styles.wrapper),
  }), [focus]);

  return (
    <div style={wrapperStyles}>
      {gridButtons}
      <button
        style={styles.invisibleTxtButton}
        onClick={onFocusHandler}
        type="button">
        focusHandler
      </button>
    </div>
  );
}

export default Grid;
