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
};

function IndustryPage() {
  return (
    <div css={styles.wrapper}>
      Hi
    </div>
  );
}

export default IndustryPage;
