// @flow

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

const styles = {
  blockBtn: {
    fontSize: 16,
    pointerEvents: 'auto',
    letterSpacing: 3,
    color: '#FFF',
    borderBottom: `1px solid ${Colors.PRIMARY}`,
    position: 'relative',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeft: '4px solid transparent',
    borderRight: '4px solid transparent',
    borderTop: `6px solid ${Colors.PRIMARY}`,
    position: 'absolute',
    right: 3,
    top: 9,
  },
};

type Props = {
  subContent: string,
  isEditting: boolean,
  inputState: {
    content: string,
    chipInfos: Array,
  },
  inputRef: {
    current: ?Node,
  },
};

function MathInputBlockButton({
  subContent,
  isEditting,
  inputState,
  inputRef,
}: Props) {
  const blockButtonRef = useRef();

  const [buttonChipInfo, setButtonChipInfo] = useState(null);

  console.log('buttonChipInfo', buttonChipInfo);

  useEffect(() => {
    const { current: input } = inputRef;
    const { current: button } = blockButtonRef;

    if (input && button) {
      const { chipInfos } = inputState;

      const blockButtonList = input.parentNode.querySelectorAll('.math-module-block-button');

      const chipInfoIndex = Array.from(blockButtonList)
        .findIndex(blockButton => blockButton === button);

      setButtonChipInfo(chipInfos[chipInfoIndex]);
    }
  }, [inputState, inputRef]);

  const blockBtnMouseEnterHandler = useCallback(({ target }) => {
    if (target) {
      target.classList.add('hovered');
    }
  }, []);

  const blockBtnMouseLeaveHandler = useCallback(({ target }) => {
    const { current } = inputRef;

    if (current && target) {
      const {
        selectionStart,
        selectionEnd,
      } = current;

      const {
        FROM: from,
        TO: to,
      } = buttonChipInfo;

      if (target.classList.contains('hovered') && (from !== selectionStart || to !== selectionEnd || !isEditting)) {
        target.classList.remove('hovered');
      }
    }
  }, [isEditting, inputRef, buttonChipInfo]);

  return (
    <button
      style={styles.blockBtn}
      ref={blockButtonRef}
      className="math-module-block-button"
      onMouseEnter={blockBtnMouseEnterHandler}
      onMouseLeave={blockBtnMouseLeaveHandler}
      type="button">
      {subContent}
      &nbsp;
      <div style={styles.arrow} />
    </button>
  );
}

export default MathInputBlockButton;
