// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import FollowingCard from './Form.jsx/FollowingCard';

const flex = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const styles = {
  wrapper: css`
    ${flex}
    overflow: auto;
  `,
  following: css`
    ${flex}
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    margin: 0 0 40px 0;
  `,
  industry: css`
    ${flex}
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
  `,
  industryCardWrapper: css`
    ${flex}
    align-items: flex-start;
    justify-content: flex-start;
    flex: 3;
  `,
  title: css`
    font-size: 20px;
    font-weight: 500;
    margin: 0 0 18px 0;
  `,
};

function StockersInfo() {
  return (
    <div css={styles.wrapper}>
      <div css={styles.following}>
        <h3 css={styles.title}>
          已追蹤
        </h3>
        <div>
          <FollowingCard />
        </div>
      </div>
      <div css={styles.industry}>
        <h3 css={styles.title}>
          大盤產業
        </h3>
      </div>
      <div css={styles.industryCardWrapper}>
        大盤拼圖
      </div>
    </div>
  );
}

export default StockersInfo;
