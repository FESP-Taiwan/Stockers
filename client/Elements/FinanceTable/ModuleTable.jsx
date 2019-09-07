// @flow

import React, {
  useContext,
  useMemo,
} from 'react';
import { ModuleDataContext } from '../../Constant/context';
import ModuleTableColumnBoard from './ModuleTableColumnBoard';

const styles = {
  wrapper: {
    padding: 16,
    backgroundColor: Colors.LAYER_FIRST,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  dateSideHeaderMock: {
    width: 32,
    height: '100%',
  },
};

function ModuleTable() {
  const moduleData = useContext(ModuleDataContext);

  const moduleMainBlock = useMemo(() => {
    if (!moduleData) return null;

    console.log(moduleData);

    return (
      <>
        {moduleData.map(elem => (
          <ModuleTableColumnBoard
            elem={elem} />
        ))}
      </>
    );
  }, [moduleData]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.dateSideHeaderMock} />
      {moduleMainBlock}
    </div>
  );
}

export default ModuleTable;
