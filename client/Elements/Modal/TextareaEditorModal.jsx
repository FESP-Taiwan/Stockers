// @flow

import React, {
  useState,
  useEffect,
} from 'react';
import Modal from './Modal';
import LoadingSpinner from '../LoadingSpinner';

const styles = {
  title: {
    fontSize: 24,
    color: Colors.SECONDARY,
    letterSpacing: 2,
    lineHeight: 1,
    margin: '0 0 10px 0',
    fontWeight: 500,
  },
  desc: {
    fontSize: 14,
    color: '#9b9b9b',
    letterSpacing: 2,
    lineHeight: 1,
    margin: '0 0 18px 0',
    fontWeight: 300,
  },
  textarea: {
    height: 128,
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    border: '1px solid #E0E0E0',
    fontSize: 13,
    color: Colors.SECONDARY,
    letterSpacing: 1,
    width: 330,
    padding: 6,
    outline: 'none',
    resize: 'none',
  },
  actionWrapper: {
    width: '100%',
    marginTop: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: Colors.MAIN,
    width: 244,
    height: 40,
    color: '#fff',
    fontSize: 16,
    letterSpacing: 6,
    padding: '0 0 0 6px',
    lineHeight: '40px',
    borderRadius: 4,
  },
};

type Props = {
  editTitle?: string,
  editDesc?: ?string,
  defaultValue?: string,
  placeholder?: string,
  onEdit: Function,
  close: Function,
};

function TextareaEditorModal({
  defaultValue,
  editTitle,
  editDesc,
  placeholder,
  onEdit,
  close,
}: Props) {
  // Area的值為上層給的預設值或空字串
  const [value, setValue] = useState(defaultValue || '');
  const [submitting, setSubmitting] = useState(false);

  // 有預設值就會先跑一次
  useEffect(() => {
    setValue(defaultValue || '');
    setSubmitting(false);
  }, [defaultValue]);

  return (
    <Modal onClose={close}>
      <h3 style={styles.title}>{editTitle}</h3>
      <p style={styles.desc}>{editDesc}</p>
      <textarea
        placeholder={placeholder}
        onChange={({ target: { value: newValue } }) => setValue(newValue)}
        value={value}
        style={styles.textarea} />
      <div style={styles.actionWrapper}>
        {submitting ? (
          <LoadingSpinner />
        ) : (
          <button
            onClick={() => {
              setSubmitting(true);

              onEdit(value, close);
            }}
            style={styles.btn}
            type="button">
            完成
          </button>
        )}
      </div>
    </Modal>
  );
}

TextareaEditorModal.defaultProps = {
  editTitle: '編輯',
  editDesc: null,
  defaultValue: '',
  placeholder: '',
};

export default TextareaEditorModal;
