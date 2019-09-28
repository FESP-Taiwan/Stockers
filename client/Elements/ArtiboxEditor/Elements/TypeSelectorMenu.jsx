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
    border: 'solid 1px #000',
  },
};

function TypeSelectorMenu() {
  return (
    <div style={styles.wrapper}>
      <Icons.TITLE />
      <Icons.SUBTITLE />
      <Icons.LINE />
      <Icons.QUOTE />
    </div>
  );
}

export default TypeSelectorMenu;
