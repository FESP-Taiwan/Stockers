// @flow
/* eslint no-nested-ternary: 0 */

import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import compact from 'lodash/compact';
import isNil from 'lodash/isNil';
import type { FieldProps } from 'redux-form';

type Props = {
  type?: 'text' | 'number' | 'password',
  disabled?: boolean,
  placeholder?: string,
  inline?: boolean,
  numberOnly?: boolean,
} & FieldProps

const styles = {
  input: {
    height: 40,
    border: 'none',
    outline: 'none',
    fontSize: 13,
    color: '#FFF',
    letterSpacing: 1,
    margin: '9px 0',
    fontWeight: 400,
    backgroundColor: '#262626',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  label: {
    width: 100,
    fontSize: 13,
    color: Colors.SECONDARY,
    fontWeight: 500,
    letterSpacing: 1,
    margin: '0 0 12px 20px',
    display: 'block',
  },
  lableInline: {
    margin: ' 0 12px 0 20px',
    display: 'inline',
  },
};

function TextInput({
  disabled,
  placeholder,
  type,
  label,
  maxLength,
  input,
  meta,
  inline,
  numberOnly,
}: Props) {
  const {
    name,
    value,
    onChange,
    onFocus,
    onBlur,
  } = input || {};

  const {
    error,
    dirty,
    visited,
    submitFailed,
    form: formName,
  } = meta || {};

  const wrapperStyles = useMemo(() => ({
    ...styles.inputWrapper,
  }), []);

  const labelStyles = useMemo(() => ({
    ...styles.label,
    ...(inline ? styles.lableInline : {}),
  }), [inline]);

  const labelTag = useMemo(() => (label ? (
    <label style={labelStyles} htmlFor={`${formName}:${name}`}>
      {label}
    </label>
  ) : null), [labelStyles, label, formName, name]);

  const inputStyles = useMemo(() => ({
    ...styles.input,
  }), []);

  const formattedValue = useMemo(() => value, [value]);

  const onChangeHandler = useCallback(({ target }) => {
    if (numberOnly) {
      onChange(target.value.replace(/[^\d]+/g, ''))
    } else {
      onChange(target.value);
    }
  }, [onChange, numberOnly]);

  const errorTag = useMemo(() => {
    if (!error) return null;

    return (
      <div style={styles.errorStr}>
        {error}
      </div>
    );
  }, [error]);

  return (
    <div css={wrapperStyles}>
      {labelTag}
      <input
        disabled={disabled}
        style={inputStyles}
        value={formattedValue}
        onChange={onChangeHandler}
        placeholder={placeholder}
        maxLength={maxLength}
        type={type} />
    </div>
  );
}

TextInput.defaultProps = {
  type: 'text',
  placeholder: '',
  disabled: false,
  inline: false,
  numberOnly: false,
};

export default TextInput;
