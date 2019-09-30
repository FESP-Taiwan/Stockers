// @flow

import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import search from '../static/images/search-icon.png';

const styles = {
  wrapper: {
    width: 170,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.LAYER_FIRST,
    border: 'none',
    borderRadius: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  search: {
    width: 120,
    height: 20,
    backgroundColor: Colors.LAYER_FIRST,
    border: 'none',
    outline: 'none',
    margin: '0 0 0 10px',
  },
};

type Props = {
  placeholder: string,
};

function SearchBar({
  placeholder,
}: Props) {
  return (
    <div style={styles.wrapper}>
      <img src={search} alt="search" style={styles.icon} />
      <input
        style={styles.search}
        placeholder={placeholder}
        type="search" />
    </div>
  );
}

export default SearchBar;
