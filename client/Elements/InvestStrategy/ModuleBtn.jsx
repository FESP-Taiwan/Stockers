// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
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
  btn: css`
    position: absolute;
    z-index: 1;
    height: 80px;
    width: 100%;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.PRIMARY_THIRD};
    text-decoration: none;
    color: #FFF;
    font-size: 13px;
  `,
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
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 8,
    height: 8,
    zIndex: 1000,
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
  }), [actived]);

  return (
    <div css={modulesStyle} key={id}>
      <button
        css={styles.closeBtn}
        type="button"
        onClick={() => removeUserUsingModules(id)}>
        <img src={closeIcon} alt="close" css={styles.icon} />
      </button>
      <NavLink
        activeStyle={styles.btnSelected}
        css={styles.btn}
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
