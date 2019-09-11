// @flow

import React, {
  useMemo,
} from 'react';

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

type Props = {
  isHeader?: boolean,
  label: string,
  isHeaderHovered: boolean,
  setHeaderHovered?: Function,
}

function ModuleGridUnit({
  isHeader,
  label,
  isHeaderHovered,
  setHeaderHovered,
}: Props) {
  const btnStyles = useMemo(() => ({
    ...styles.btn,
    ...(isHeaderHovered ? styles.btnActived : {}),
  }), [isHeaderHovered]);

  return (
    isHeader ? (
      <div
        style={btnStyles}
        onMouseLeave={() => setHeaderHovered(false)}
        onMouseEnter={() => setHeaderHovered(true)}>
        {label}
      </div>
    ) : (
      <button
        style={btnStyles}
        type="button">
        {label}
      </button>
    )
  );
}

ModuleGridUnit.defaultProps = {
  isHeader: false,
  setHeaderHovered: null,
};

export default ModuleGridUnit;
