// @flow

import React, {
  useMemo,
} from 'react';
import type { FiledProps } from 'redux-form';

const styles = {
  wrapper: {
    width: 559,
    position: 'relative',
  },
  title: {
    width: 460,
    height: 20,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 300,
    color: '#000',
    textAlign: 'left',
  },
  selectWrapper: {
    padding: '8px 0 0 0',
  },
  select: {
    width: 557,
    height: 32,
    border: '1px solid #F4F4F4',
    borderRadius: 2,
    boxShadow: '0px 1px 4px 0px #000',
    backgroundColor: '#EDEDED',
    outline: 'none',
    padding: '0 12px',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    WebkitAppearance: 'none',
  },
  option: {
    width: 557,
  },
  triangle: {
    width: 0,
    height: 0,
    position: 'absolute',
    borderTop: 'solid 5px #000 ',
    borderLeft: '4px solid transparent',
    borderRight: '4px solid transparent',
    pointerEvents: 'none',
    top: 47,
    right: 15,
  },
};

function Selector({
  input: {
    value,
    onChange,
  },
  options,
  label,
  title,
  name,
  id,
}: FiledProps & {
  options: Array,
  label?: string,
  title?: string,
  name: string,
  id: string,
}) {
  const titleTag = useMemo(() => (
    title ? (
      <span style={styles.title}>
        {title}
      </span>
    ) : null
  ), [title]);

  return (
    <div style={styles.wrapper}>
      {titleTag}
      {label ? (
        <label
          htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div style={styles.selectWrapper}>
        <select
          id={id}
          style={styles.select}
          name={name}
          value={value || options[0].id}
          onChange={onChange}>
          {options.map(option => (
            <option
              style={styles.option}
              key={option.id}
              value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <span style={styles.triangle} />
      </div>
    </div>
  );
}

Selector.defaultProps = {
  label: null,
  title: null,
};

export default Selector;
