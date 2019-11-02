// @flow
/** @jsx jsx */

import { useMemo } from 'react';
import { jsx } from '@emotion/core';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

const mockData = [{
  id: 1,
  name: '2019-03',
}, {
  id: 2,
  name: '2019-06',
}, {
  id: 3,
  name: '2019-09',
}, {
  id: 4,
  name: '2019-12',
}, {
  id: 5,
  name: '2019-03',
}, {
  id: 6,
  name: '2019-06',
}, {
  id: 7,
  name: '2019-09',
}, {
  id: 8,
  name: '2019-12',
}];

const mockchartdata = [
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

function StockSimulationChart({
  from,
  to,
}: Props) {
  const rangeData = useMemo(() => {
    const fromIndex = mockData.findIndex(data => data.id === Number(from));
    const toIndex = mockData.findIndex(data => data.id === Number(to)) + 1;
    const range = mockData.slice(fromIndex, toIndex);

    return range.map(q => ({ name: q.name, share: 600 }));
  }, [from, to]);

  return (
    <div css={styles.wrapper}>
      <LineChart width={800} height={300} data={rangeData}>
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
