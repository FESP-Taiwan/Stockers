// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';

const styles = {
  wrapper: css`
    width: 100%;
    height: 100%;
    display: flex;
    flexDirection: column,
    justify-content: center;
    align-items: center;
  `,
};

function HomePage() {
  return (
    <div css={styles.wrapper}>
      <div>
        已追蹤
      </div>
      <div>
        大盤產業
      </div>
      <div>
        大盤拼圖
      </div>
    </div>
  );
}

export default HomePage;
