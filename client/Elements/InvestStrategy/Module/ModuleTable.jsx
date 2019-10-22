// @flow

import React, {
  useContext,
  useMemo,
  useState,
} from 'react';
import { ModuleDataContext } from '../../../Constant/context';
import ModuleTableColumnBoard from './ModuleTableColumnBoard';
import addIcon from '../../../static/images/icon-white-add.png';
import ChipHeaderUpdateBlock from './ChipHeaderUpdateBlock';

const styles = {
  wrapper: {
    padding: 16,
    backgroundColor: Colors.LAYER_FIRST,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'auto',
    maxWidth: '100%',
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
    flexShrink: 0,
  },
  addBtnImg: {
    width: 18,
  },
};

function ModuleTable() {
  const [isHeaderUpdateBlockOpen, setHeaderUpdateBlockOpen] = useState(false);
  const moduleData = useContext(ModuleDataContext);

  console.log('moduleData', moduleData);

  const moduleMainBlock = useMemo(() => {
    if (!moduleData) return null;

    return (
      <>
        {moduleData.map((elem, id) => (
          <ModuleTableColumnBoard
            key={elem.id}
            columnId={id}
            setHeaderUpdateBlockOpen={setHeaderUpdateBlockOpen}
            elem={elem} />
        ))}
      </>
    );
  }, [moduleData, setHeaderUpdateBlockOpen]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.dateSideHeaderMock} />
      {moduleMainBlock}
      <button
        onClick={() => setHeaderUpdateBlockOpen(true)}
        style={styles.addBtn}
        type="button">
        <img src={addIcon} alt="add" style={styles.addBtnImg} />
      </button>
      <ChipHeaderUpdateBlock
        isOpen={isHeaderUpdateBlockOpen}
        setOpen={setHeaderUpdateBlockOpen} />
    </div>
  );
}

export default ModuleTable;
