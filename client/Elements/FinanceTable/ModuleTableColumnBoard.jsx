// @flow

import React, {
  useState,
  useEffect,
  useMemo,
} from 'react';
import moment from 'moment';
import ModuleGridUnit from './ModuleGridUnit';

type Props = {
  elem: {
    name: string,
    chipData: Array,
  },
  columnId: number,
  setHeaderUpdateBlockOpen: Function,
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
};

function ModuleTableColumnBoard({
  elem: {
    chipData,
    name,
  },
  columnId,
  setHeaderUpdateBlockOpen,
}: Props) {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(chipData)) return () => {};

    const data = chipData.sort((elem1, elem2) => moment(elem2.timeStamp).format('x') - moment(elem1.timeStamp).format('x'));

    setSortedData(data);

    return () => {};
  }, [chipData, setSortedData]);

  const moduleMainBoard = useMemo(() => {
    if (!sortedData.length) return null;

    return (
      <>
        {sortedData.map(({ value }, id) => (
          <ModuleGridUnit
            rowId={id}
            columnId={columnId}
            label={value} />
        ))}
      </>
    );
  }, [sortedData, columnId]);

  return (
    <div style={styles.wrapper}>
      <ModuleGridUnit
        rowId="header"
        setHeaderUpdateBlockOpen={setHeaderUpdateBlockOpen}
        columnId={columnId}
        label={name} />
      {moduleMainBoard}
    </div>
  );
}

export default ModuleTableColumnBoard;
