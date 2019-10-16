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
  inputRef: {
    current: input,
  },
}: Props) {
  const blockButtonRef = useRef();

  const [buttonChipInfo, setButtonChipInfo] = useState(null);
  const [buttonIndex, setButtonIndex] = useState(null);
  const [isInfoModalOpened, setInfoModalOpened] = useState(false);

  console.log('isInfoModalOpened', isInfoModalOpened);

  console.log('buttonChipInfo', buttonChipInfo);
  console.log('buttonIndex', buttonIndex);

  useEffect(() => {
    const { current: button } = blockButtonRef;

    if (button) {
      const { chipInfos } = inputState;

      const blockButtonList = button.parentNode.querySelectorAll('.math-module-block-button');

      const chipInfoIndex = Array.from(blockButtonList)
        .findIndex(blockButton => blockButton === button);

      setButtonChipInfo(chipInfos[chipInfoIndex]);

      setButtonIndex(chipInfoIndex);
    }
  }, [inputState]);

  useEffect(() => {
    const { current: button } = blockButtonRef;

    if (!button) return () => {};

    function onObserveHandler(mutations) {
      const classList = Array.from(mutations[0].target.classList);

      const isHoveredClassAdded = classList.some(className => className === 'hovered');

      if (isHoveredClassAdded) {
        setInfoModalOpened(true);
      } else {
        setInfoModalOpened(false);
      }

      console.log('isHoveredClassAdded', isHoveredClassAdded);
    }

    const buttonObserver = new MutationObserver(onObserveHandler);

    console.log(button);

    buttonObserver.observe(button, {
      attributeOldValue: true,
      attributes: true,
    });

    return () => {
      buttonObserver.disconnect();
    };
  }, []);

  const blockBtnMouseEnterHandler = useCallback(({ target }) => {
    if (target) {
      target.classList.add('hovered');
    }
  }, []);

  const blockBtnMouseLeaveHandler = useCallback(({ target }) => {
    if (input && target) {
      const {
        selectionStart,
        selectionEnd,
      } = input;

      const {
        FROM: from,
        TO: to,
      } = buttonChipInfo;

      if (target.classList.contains('hovered') && (from !== selectionStart || to !== selectionEnd || !isEditting)) {
        target.classList.remove('hovered');
      }
    }
  }, [isEditting, input, buttonChipInfo]);

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
