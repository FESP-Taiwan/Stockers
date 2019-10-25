// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

const data = [
  {
    name: 'Page A', share: 400,
  },
  {
    name: 'Page B', share: 200,
  },
  {
    name: 'Page C', share: 1000,
  },
  {
    name: 'Page A', share: 400,
  },
  {
    name: 'Page B', share: 800,
  },
];

const styles = {
  wrapper: {
    width: '100%',
  },
};

function StockSimulationChart() {
  return (
    <div css={styles.wrapper}>
      <LineChart width={800} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <XAxis dataKey="name" />
        <YAxis dataKey="share" />
        <Line type="monotone" dataKey="share" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default StockSimulationChart;
