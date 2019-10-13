// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import StockStrategyPage from './StockStrategyPage';

const styles = {
  wrapper: css`
    width: 100%;
    height: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  sharePriceWrapper: css`
    width: 100%;
    height: 225px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  `,
  sharePriceTitle: css`
    font-size: 18px;
    font-weight: 500;
  `,
  infoTableWrapper: css`
    width; 100%;
    height: 100%;
  `,
};

function StockPage() {
  return (
    <div css={styles.wrapper}>
      <StockStrategyPage />
      <div css={styles.sharePriceWrapper}>
        <span>
          股價
        </span>
        <div>
          圖表
        </div>
      </div>
      <div css={styles.infoTableWrapper}>
        Table
      </div>
    </div>
  );
}

export default StockPage;
