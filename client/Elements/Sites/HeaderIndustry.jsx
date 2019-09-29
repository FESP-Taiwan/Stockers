// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import arrow from '../../static/images/arrow.png';

const styles = {
  wrapper: css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
};

function HeaderIndustry() {
  return (
    <div css={styles.wrapper}>
      <img src={arrow} alt="arrow" />
      <span>
        半導體
      </span>
    </div>
  );
}

export default HeaderIndustry;
