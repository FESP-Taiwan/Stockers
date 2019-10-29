// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import {
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { connect } from 'react-redux';
import Modal from '../../Modal/Modal';
import { ModuleDataContext } from '../../../Constant/context';
import { headerChipData } from '../../../Mocks/Queries/financeTable';

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
  btn: css`
    width: 320px;
    height: 32px;
    padding: 0;
    line-height: 32px;
    text-align: left;
    font-size: 13px;
    transition: 0.3s;
    margin: 0 30px 10px 0;
    &:hover {
      background-color: ${Colors.LAYER_THIRD};
    }
  `,
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

  console.log('headerChipData', headerChipData);
  console.log('stockData', stockData);

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

  const onClick = useCallback(() => {
    console.log('ONCLICK ACTIONED');

    setOpen(false);
  }, [setOpen]);

  const mainBlock = useMemo(() => {
    if (!headerChips.length) return null;

    return (
      <div css={styles.wrapper}>
        {headerChips.map(({ name, childNodes, id }) => (
          <div key={id} css={styles.columnBoard}>
            <h2 css={styles.title}>{name}</h2>
            {childNodes.map(childNode => (
              <button
                key={childNode.id}
                onClick={onClick}
                css={styles.btn}
                type="button">
                {childNode.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }, [headerChips, onClick]);

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
