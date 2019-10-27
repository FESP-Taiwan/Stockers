// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import {
  useCallback,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
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
    width: 220px;
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

export default ChipHeaderUpdateBlock;
