// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { flex } from '../../Constant/emotion';
import { SITE_HEADER_INDEX } from '../../Constant/zIndex';
import arrow from '../../static/images/arrow.png';

const styles = {
  wrapper: css`
    ${flex}
    flex-direction: row;
    justify-content: flex-start;
  `,
  arrow: css`
    width: 24px;
    height: 24px;
    margin: 0 20px;
  `,
  industryName: css`
    font-size: 20px;
    font-weight: 800;
    text-decoration: none;
    z-index: ${SITE_HEADER_INDEX};
  `,
  stock: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  `,
  stockName: css`
    font-size: 20px;
    font-weight: 800;
    color: ${Colors.PRIMARY};
  `,
  following: css`
    width: 60px;
    height: 24px;
    border: solid 1px ${Colors.PRIMARY};
    border-radius: 4px;
    text-align: center;
    line-height: 20px;
    margin: 0 0 0 20px;
  `,
  followingWord: css`
    font-size: 13px;
    font-weight: 500;
    colors: ${Colors.PRIMARY};
  `,
};

function HeaderIndustry() {
  return (
    <div css={styles.wrapper}>
      <img src={arrow} alt="arrow" css={styles.arrow} />
      <Link
        to="/industry"
        css={styles.industryName}>
        半導體
      </Link>
      <img src={arrow} alt="arrow" css={styles.arrow} />
      <div css={styles.stock}>
        <span
          css={styles.stockName}>
          2200
          台積電
        </span>
        <div css={styles.following}>
          <span css={styles.followingWord}>
            已追蹤
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeaderIndustry;
