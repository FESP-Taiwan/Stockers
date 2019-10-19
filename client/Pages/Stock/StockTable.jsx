// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';

const styles = {
  blockWrapper: css`
    width: 100%,
    height: 100%,
    display: flex,
    flex-direction: column,
  `,
  block: css`
    width: 135px;
    height: 100px;
    border: solid 1px;
  `,
  word: css`
    font-size: 16px;
    font-weight: 500,
  `,
};

function StockTable({
  title,
  value,
}: {
  title: string,
  value: ?number,
}) {
  return (
    <div css={styles.blockWrapper}>
      <div css={styles.block}>
        <span>{title}</span>
      </div>
      <div css={styles.block}>
        <span>{value}</span>
      </div>
    </div>
  );
}

export default StockTable;
