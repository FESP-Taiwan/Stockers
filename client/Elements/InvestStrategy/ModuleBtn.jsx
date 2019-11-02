// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useMemo } from 'react';
import { Field } from 'redux-form';
import { useParams, NavLink } from 'react-router-dom';
import TextInput from '../../Form/TextInput';
import closeIcon from '../../static/images/close-icon.png';
import RangeSlider from './Field/RangeSlider';

const styles = {
  modules: {
    position: 'relative',
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: Colors.PRIMARY_THIRD,
    transition: '0.5s ease-out',
    margin: '0 20px 0 0',
  },
  btn: {
    position: 'absolute',
    zIndex: 1,
    height: 80,
    width: '100%',
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY_THIRD,
    textDecoration: 'none',
    color: '#FFF',
    fontSize: 13,
  },
  btnSelected: {
    backgroundColor: Colors.PRIMARY,
  },
  btnActived: {
    height: 360,
  },
  closeBtn: {
    width: 16,
    height: 16,
    borderRadius: 12,
    backgroundColor: '#FFF',
    position: 'absolute',
    right: 4,
    top: 4,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 8,
    height: 8,
    zIndex: 2,
  },
  btnDisabled: {
    backgroundColor: Colors.DISABLED,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: -40,
    left: -6,
    width: 94,
  },
};

type Props = {
  actived: boolean,
  id: number,
  name: string,
  subName: number,
  disabled: boolean,
  removeUserUsingModules: Function,
}

function ModuleBtn({
  actived,
  id,
  name,
  disabled,
  removeUserUsingModules,
}: Props) {
  const { industryId, stockId } = useParams();

  const modulesStyle = useMemo(() => ({
    ...styles.modules,
    ...(actived ? styles.btnActived : {}),
    ...(disabled ? styles.btnDisabled : {}),
  }), [actived, disabled]);

  const btnStyles = useMemo(() => ({
    ...styles.btn,
    ...(disabled ? styles.btnDisabled : {}),
  }), [disabled]);

  return (
    <div css={modulesStyle} key={id}>
      <div style={styles.inputWrapper}>
        <Field
          small
          placeholder="模型名稱"
          name={`${id}`}
          component={TextInput} />
      </div>
      <button
        css={styles.closeBtn}
        type="button"
        onClick={() => removeUserUsingModules(id)}>
        <img src={closeIcon} alt="close" css={styles.icon} />
      </button>
      <NavLink
        activeStyle={styles.btnSelected}
        css={btnStyles}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
          }
        }}
        to={`/industry/${industryId}/stocks/${stockId}/modules/${id}`}>
        {name}
      </NavLink>
      <RangeSlider
        index={id - 1}
        actived={actived} />
    </div>
  );
}

export default ModuleBtn;
