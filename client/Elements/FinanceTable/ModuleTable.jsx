// @flow

import React, {
  useContext,
  useMemo,
} from 'react';
import { ModuleDataContext } from '../../Constant/context';
import ModuleTableColumnBoard from './ModuleTableColumnBoard';
import addIcon from '../../static/images/icon-add-w.png';

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
  addBtn: {
    width: 140,
    height: 100,
    padding: 0,
    fontSize: 13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnImg: {
    width: 18,
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
      <button
        style={styles.addBtn}
        type="button">
        <img src={addIcon} alt="add" style={styles.addBtnImg} />
      </button>
    </div>
  );
}

export default ModuleTable;
