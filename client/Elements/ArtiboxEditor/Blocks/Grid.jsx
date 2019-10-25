// @flow

import React, {
  Fragment,
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
    width: '100%',
    height: '100%',
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

  const removeGrid = useCallback((gridIndex) => {
    console.log('button clicked');
    dispatch({
      type: Actions.REMOVE_GRID_INFO,
      id,
      gridIndex,
    });
  }, [dispatch, id]);

  const gridButtons = useMemo(() => {
    if (!meta.GRIDS || !meta.GRIDS.length) return null;

    const buttonList = [];

    const {
      GRIDS: grids,
    } = meta;

    grids.forEach((grid, index) => {
      buttonList.push(
        <button
          onClick={() => removeGrid(index)}
          type="button">
          {grid.name}
        </button>
      );
    });

    return (
      <Fragment>
        {buttonList}
      </Fragment>
    );
  }, [meta, removeGrid]);

  const wrapperStyles = useMemo(() => ({
    ...(focus ? styles.focusWrapper : styles.wrapper),
  }), [focus]);

  return (
    <div
      tabIndex="0"
      onMouseDown={onFocusHandler}
      role="button"
      style={wrapperStyles}>
      {gridButtons}
    </div>
  );
}

export default Grid;
