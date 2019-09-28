// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { flex } from '../../../Constant/emotion';
import IndustryCardChart from './IndustryCardChart';

const styles = {
  wrapper: css`
    width: 225px;
    height: 225px;
    border-radius: 40px;
    background-color: ${Colors.LAYER_FIRST};
    margin: 0 10px 20px 10px;
  `,
  main: css`
    ${flex}
  `,
  word: css`
    ${flex}
    flex-grow: 1;
    align-items: flex-start;
    padding: 0 0 0 40px;
  `,
  chart: css`
    ${flex}
    flex-grow: 1;
  `,
  title: css`
    font-size: 13px;
    color: #FFFFFF;
    margin: 0 0 18px;
  `,
  percent: css`
    font-size: 13px;
    color: ${Colors.BULL_MARKET};
  `,
};
type Props = {
  name: string,
  chart: Array,
};

function IndustryCard({
  name,
  chart,
}: Props) {
  console.log('c', chart);

  return (
    <div css={styles.wrapper}>
      <div css={styles.main}>
        <div css={styles.word}>
          <span css={styles.title}>
            {name}
          </span>
          <span css={styles.percent}>
            (近三個月來漲幅)
          </span>
        </div>
        <div css={styles.chart}>
          <IndustryCardChart
            data={chart} />
        </div>
      </div>
    </div>
  );
}

export default IndustryCard;
