// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';

const styles = {
  wrapper: css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  blockWrapper: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-grow: 1;
    flex-basis: 0;
    flex-shrink: 0;
  `,
};

function IndustryPage() {
  return (
    <div css={styles.wrapper}>
      <div css={styles.blockWrapper}>
        產業概況
      </div>
      <div css={styles.blockWrapper}>
        產業上中下游
      </div>
    </div>
  );
}

export default IndustryPage;
