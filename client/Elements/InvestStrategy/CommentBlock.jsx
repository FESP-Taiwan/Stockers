// @flow

import React, {
  useState,
  useMemo,
  useCallback,
} from 'react';
import CommentForm from './CommentForm';
import { FIXED_BUTTON_INDEX, BASE_CONTAINER_INDEX } from '../../Constant/zIndex';

const styles = {
  wrapper: {
    width: 106,
    height: 80,
    position: 'fixed',
    right: 30,
    bottom: 30,
  },
  btn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: FIXED_BUTTON_INDEX,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    padding: 0,
    lineHeight: '80px',
    textAlign: 'center',
    color: '#000',
    fontWeight: 500,
    borderRadius: 40,
  },
  formBlock: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: BASE_CONTAINER_INDEX,
    width: 0,
    height: 0,
    padding: 40,
    borderRadius: 40,
    backgroundColor: Colors.LAYER_THIRD,
    transition: '0.5s',
  },
  formBlockActived: {
    width: 284,
    height: 456,
  },
};

function CommentBlock() {
  const [isFormOpened, setFormOpened] = useState(false);

  const onClick = useCallback(() => {
    setFormOpened(!isFormOpened);
  }, [isFormOpened]);

  const formBlockStyles = useMemo(() => ({
    ...styles.formBlock,
    ...(isFormOpened ? styles.formBlockActived : {}),
  }), [isFormOpened]);

  return (
    <div style={styles.wrapper}>
      <button
        onClick={onClick}
        style={styles.btn}
        type="button">
        筆記欄
      </button>
      <div style={formBlockStyles}>
        <CommentForm />
      </div>
    </div>
  );
}

export default CommentBlock;