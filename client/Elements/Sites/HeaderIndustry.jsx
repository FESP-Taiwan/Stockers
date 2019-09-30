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
    justify-content: flex-start;
    align-items: center;
  `,
  arrow: css`
    width: 24px;
    height: 24px;
    margin: 0 20px;
  `,
  industryName: css`
    font-size: 20px;
    font-weight: 800;
  `,
};

function HeaderIndustry() {
  return (
    <div css={styles.wrapper}>
      <img src={arrow} alt="arrow" css={styles.arrow} />
      <span css={styles.industryName}>
        半導體
      </span>
    </div>
  );
}

export default HeaderIndustry;
