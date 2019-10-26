// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import {
  Fragment,
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
  btn: css`
    font-size: 12px;
    letter-spacing: 1px;
    color: #FFF;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: ${Colors.LAYER_SECOND};
    margin: 0 4px 4px 0;
    &:hover {
      background-color: ${Colors.PRIMARY};
    }
  `,
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

  const onFocusHandler = useCallback(() => {
    dispatch({
      type: Actions.FOCUS,
      id,
    });
  }, [dispatch, id]);

  const removeGrid = useCallback((gridIndex) => {
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
          css={styles.btn}
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
