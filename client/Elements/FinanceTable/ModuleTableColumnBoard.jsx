// @flow

import React, {
  useState,
  useEffect,
} from 'react';
import moment from 'moment';

type Props = {
  elem: {
    chipData: Array,
  },
}

const styles = {

};

function ModuleTableColumnBoard({
  elem: {
    chipData,
  },
}: Props) {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(chipData)) return () => {};

    const data = chipData.sort((elem1, elem2) => moment(elem2.timeStamp).format('x') - moment(elem1.timeStamp).format('x'));

    setSortedData(data);

    return () => {};
  }, [chipData, setSortedData]);

  console.log(sortedData);

  return (
    <div></div>
  );
}

export default ModuleTableColumnBoard;
