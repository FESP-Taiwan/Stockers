// @flow

import React, { useMemo } from 'react';
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

type Props = {
  average: number,
  data: Array,
};

function IndustryCardChart({
  average,
  data,
}: Props) {
  const area = useMemo(() => {
    if (average < 0) {
      return (
        <Area type="monotone" dataKey="percent" stakeId="1" stroke="#5EF28F" fill="#5EF28F" />
      );
    }

    return (
      <Area type="monotone" dataKey="percent" stakeId="1" stroke="#FF7E72" fill="#FF7E72" />
    );
  }, [average]);

  return (
    <div style={styles.wrapper}>
      <AreaChart width={235} height={120} data={data}>
        {area}
      </AreaChart>
    </div>
  );
}

export default IndustryCardChart;
