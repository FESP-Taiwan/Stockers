// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import {
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import Modal from '../../Modal/Modal';
import { ModuleDataContext } from '../../../Constant/context';
import ChipHeaderUpdateBlockButton from './ChipHeaderUpdateBlockButton';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    maxHeight: 'calc(100vh - 130px)',
    overflow: 'auto',
    backgroundColor: Colors.LAYER_SECOND,
  },
  columnBoard: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 19,
    fontWeight: 500,
  },
};

type Props = {
  isOpen: boolean,
  setOpen: Function,
  stockData: {},
}

function ChipHeaderUpdateBlock({
  isOpen,
  setOpen,
  stockData,
}: Props) {
  const moduleData = useContext(ModuleDataContext);

  const [usingHeaderChips, setUsingHeaderChips] = useState([]);

  useEffect(() => {
    const initHeaderChips = moduleData.map(el => ({
      id: el.id,
      name: el.name,
      parentName: el.parentName,
    }));

    setUsingHeaderChips(initHeaderChips);
  }, [moduleData]);

  console.log('usingHeaderChips', usingHeaderChips);

  const headerChips = useMemo(() => {
    const headerData = Object.values(stockData).reduce((accum, el, index) => {
      if (!el.name) return accum;

      return [
        ...accum,
        {
          name: el.name,
          id: index,
          childNodes: el.chipInfos.slice(0, 30).map((chip, chipIndex) => ({
            id: chipIndex,
            name: chip.chipName,
          })),
        },
      ];
    }, []);

    return headerData;
  }, [stockData]);

  const onClose = useCallback(() => {
    if (setOpen) {
      setOpen(false);
    }
  }, [setOpen]);

  const mainBlock = useMemo(() => {
    if (!headerChips.length) return null;

    console.log('headerChips', headerChips);

    return (
      <div css={styles.wrapper}>
        {headerChips.map(({ name, childNodes, id }) => (
          <div key={id} css={styles.columnBoard}>
            <h2 css={styles.title}>{name}</h2>
            {childNodes.map(childNode => (
              <ChipHeaderUpdateBlockButton
                usingIndex={usingHeaderChips.findIndex(chip => chip.name === childNode.name)}
                key={childNode.id}
                id={childNode.id}
                name={childNode.name} />
            ))}
          </div>
        ))}
      </div>
    );
  }, [headerChips, usingHeaderChips]);

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      {mainBlock}
    </Modal>
  );
}

const reduxHook = connect(
  state => ({
    stockData: state.Stocks.stockData,
  }),
);

export default reduxHook(ChipHeaderUpdateBlock);
