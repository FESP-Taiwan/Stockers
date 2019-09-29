// @flow

import React from 'react';
import Icons from '../../../Constant/ArtiboxEditor/icons';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  btn: {
    height: '100%',
    padding: '0 9px',
  },
};

type Props = {
  focus: true,
  type: symbol,
  id: string,
};

function TypeSelectorMenu({
  focus,
  type,
  id,
}: Props) {
  // if (!focus) return null;

  return (
    <div style={styles.wrapper}>
      <button
        style={styles.btn}
        type="button">
        <Icons.TITLE />
      </button>
      <button
        style={styles.btn}
        type="button">
        <Icons.SUBTITLE />
      </button>
      <button
        style={styles.btn}
        type="button">
        <Icons.LINE />
      </button>
      <button
        style={styles.btn}
        type="button">
        <Icons.QUOTE />
      </button>
    </div>
  );
}

export default TypeSelectorMenu;
