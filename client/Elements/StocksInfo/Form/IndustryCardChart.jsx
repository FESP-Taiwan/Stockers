// @flow

import React from 'react';
// 引用要使用的圖表元素
import {
  AreaChart, Area,
} from 'recharts';

const styles = {
  wrapper: {
    width: 225,
    height: 112,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
};

// 這是每個點
const xxx = [
  {
    name: 'Page A', uv: 100,
  },
  {
    name: 'Page B', uv: 50,
  },
  {
    name: 'Page C', uv: 75,
  },
];

type Props = {
  data: Array,
};

function IndustryCardChart({
  data,
}: Props) {
  return (
    <div style={styles.wrapper}>
      <AreaChart width={235} height={120} data={data}>
        <Area type="monotone" dataKey="percent" stakeId="1" stroke="#FF7E72" fill="#FF7E72" />
      </AreaChart>
    </div>
  );
}

export default IndustryCardChart;
