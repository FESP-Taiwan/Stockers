// @flow

import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import Modal from '../Modal/Modal';
import { ModuleDataContext } from '../../Constant/context';
import { headerChipData } from '../../Mocks/Queries/financeTable';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnBoard: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 19,
    fontWeight: 500,
  },
  btn: {
    width: 220,
    height: 32,
    padding: 0,
    lineHeight: '32px',
    textAlign: 'left',
    fontSize: 13,
  },
};

type Props = {
  isOpen: boolean,
  setOpen: Function,
}

function ChipHeaderUpdateBlock({
  isOpen,
  setOpen,
}: Props) {
  const moduleData = useContext(ModuleDataContext);

  const [headerChips, setHeaderChips] = useState([]);

  useEffect(() => {
    if (headerChipData) {
      setHeaderChips(headerChipData);
    }
  }, []);

  const onClose = useCallback(() => {
    if (setOpen) {
      setOpen(false);
    }
  }, [setOpen]);

  const onClick = useCallback(() => {

  }, []);

  const mainBlock = useMemo(() => {
    if (!headerChips.length) return null;

    return (
      <div style={styles.wrapper}>
        {headerChips.map(({ name, childNodes }) => (
          <div style={styles.columnBoard}>
            <h2 style={styles.title}>{name}</h2>
            {childNodes.map(childNode => (
              <button
                onClick={onClick}
                style={styles.btn}
                type="button">
                {childNode.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }, [headerChips, onClick]);

  console.log(moduleData);

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      {mainBlock}
    </Modal>
  );
}

export default ChipHeaderUpdateBlock;
