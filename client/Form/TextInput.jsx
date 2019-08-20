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
} & FieldProps

function TextInput({
  disabled,
  placeholder,
  type,
  label,
  maxLength,
  input,
  meta,
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

  const wrapperStyles = {};

  const labelStyles = {};
  const labelTag = useMemo(() => (label ? (
    <label style={labelStyles} htmlFor={`${formName}:${name}`}>
      {label}
    </label>
  ) : null), [labelStyles, label, formName, name]);

  const inputStyles = {};
  const formattedValue = useMemo(() => value, [value]);
  const onChangeHandler = useCallback(e => onChange(e), [onChange]);

  return (
    <div css={wrapperStyles}>
      {labelTag}
      <input
        disabled={disabled}
        css={inputStyles}
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
};

export default TextInput;
