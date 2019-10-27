// @flow
/** @jsx jsx */

import {
  useEffect, useMemo,
} from 'react';
import { jsx, css } from '@emotion/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { flex } from '../../Constant/emotion';
import FollowingCard from '../../Elements/StocksInfo/FollowingCard';
import LineChartWrapper from '../../Elements/Form/Chart/LineChartWrapper';
import IndustryCard from '../../Elements/StocksInfo/IndustryCard';
import { followingStocks, industryCards } from '../../Mocks/Queries/StockInfo';
import { FOLLOWING_STATE } from '../../Constant/stockNumber';
import * as IndustryCardActions from '../../actions/IndustryCard';
import { FORM_SITE_HEADER } from '../../Constant/form';

const selector = formValueSelector(FORM_SITE_HEADER);

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
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex-grow: 1;
  `,
  industryCardWrapper: css`
    ${flex}
    flex-direction: row;
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
    height: 225px;
    border-radius: 40px;
    background-color: ${Colors.LAYER_FIRST};
    margin: 0 0 20px 0;
  `,
};

type Props = {
  searchTerm: string,
  fetchIndustryCardData: Function,
  // industryCardData: Array,
};

function StockersInfoPage({
  searchTerm,
  fetchIndustryCardData,
  // industryCardData,
}: Props) {
  // useEffect(() => {
  //   fetchIndustryCardData();
  // }, [fetchIndustryCardData]);

  // console.log('industryCardData', industryCardData);

  const filteredIndustryCards = useMemo(() => {
    if (!searchTerm) return industryCards;

    return industryCards.filter(card => card.name.includes(searchTerm));
  }, [searchTerm]);

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
        {filteredIndustryCards.map(industry => (
          <IndustryCard
            key={industry.id}
            name={industry.name}
            chart={industry.chart} />
        ))}
      </div>
    </div>
  );
}

const reduxHook = connect(
  state => ({
    // industryCardData: state.industryCardData,
    searchTerm: selector(state, 'searchTerm'),
  }),
  dispatch => bindActionCreators({
    ...IndustryCardActions,
  }, dispatch),
);

export default reduxHook(StockersInfoPage);
