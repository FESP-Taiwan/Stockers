// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { flex } from '../../Constant/emotion';
import FollowingCard from './Form/FollowingCard';
import LineChartWrapper from '../Form/Chart/LineChartWrapper';
import IndustryCard from './Form/IndustryCard';
import { followingStocks, industryCard } from '../../Mocks/Queries/StockInfo';
import { FOLLOWING_STATE } from '../../Constant/stockNumber';

const styles = {
  wrapper: css`
    ${flex}
    overflow-y: auto;
  `,
  following: css`
    ${flex}
    align-items: flex-start;
    justify-content: flex-start;
    flex-grow: 1;
    margin: 0 0 40px 0;
  `,
  industry: css`
    ${flex}
    align-items: flex-start;
    justify-content: flex-start;
    flex-grow: 1;
  `,
  industryCardWrapper: css`
    ${flex}
    flex-direction: row;
    align-items: flex-start;
    flex-grow: 3;
    flex-wrap: wrap;
  `,
  title: css`
    font-size: 20px;
    font-weight: 500;
    margin: 0 0 18px 10px;
  `,
  cardWrapper: css`
    display: flex;
    width: 100%;
    min-height: 130px;
    flex-direction: row;
    overflow-x: auto;
  `,
  kLine: css`
    ${flex}
  `,
};

function StockersInfo() {
  return (
    <div css={styles.wrapper}>
      <div css={styles.following}>
        <h3 css={styles.title}>
          已追蹤
        </h3>
        <div css={styles.cardWrapper}>
          {followingStocks.map(stock => (
            <FollowingCard
              key={stock.id}
              id={stock.id}
              name={stock.name}
              number={stock.number}
              status={FOLLOWING_STATE.find(s => s.status === stock.status).name}
              following={stock.following} />
          ))}
        </div>
      </div>
      <div css={styles.industry}>
        <h3 css={styles.title}>
          大盤產業
        </h3>
        <div css={styles.kLine}>
          <LineChartWrapper />
        </div>
      </div>
      <div css={styles.industryCardWrapper}>
        {industryCard.map(industry => (
          <IndustryCard
            key={industry.id}
            name={industry.name}
            chart={industry.chart} />
        ))}
      </div>
    </div>
  );
}

export default StockersInfo;
