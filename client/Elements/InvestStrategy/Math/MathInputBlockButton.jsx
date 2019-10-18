// @flow

import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { MATH_META_TYPES } from '../../../Constant/investStrategy';

const styles = {
  wrapper: {
    position: 'relative',
  },
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
  infoBlock: {
    position: 'absolute',
    right: 0,
    bottom: 20,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.LAYER_THIRD,
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

  console.log('buttonChipInfo', buttonChipInfo);

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

  const buttonMetaType = useMemo(() => {
    if (!buttonChipInfo) return null;

    const { type } = buttonChipInfo.chipData;

    switch (type) {
      case MATH_META_TYPES.NUMEROUS: {
        return (
          <span>類型：眾數</span>
        );
      }

      case MATH_META_TYPES.AVERAGE: {
        return (
          <span>類型：平均</span>
        );
      }

      case MATH_META_TYPES.DATE: {
        return (
          <span>類型：日期</span>
        );
      }

      case MATH_META_TYPES.GRID: {
        return (
          <span>類型：格子</span>
        );
      }

      default: return null;
    }
  }, [buttonChipInfo]);

  const buttonMetaSubInfo = useMemo(() => {
    if (!buttonChipInfo) return null;

    const { type, date, rowId } = buttonChipInfo.chipData;

    switch (type) {
      case MATH_META_TYPES.NUMEROUS:
      case MATH_META_TYPES.AVERAGE:
        return (
          <span>計算量：10筆</span>
        );

      case MATH_META_TYPES.DATE:
        return (
          <span>日期：{date}</span>
        );

      case MATH_META_TYPES.GRID:
        return (
          <span>格號：{rowId}</span>
        );

      default:
        return null;
    }
  }, [buttonChipInfo]);

  const buttonInfoBlock = useMemo(() => {
    if (!isInfoModalOpened) return null;

    return (
      <div style={styles.infoBlock}>
        {buttonMetaType}
        {buttonMetaSubInfo}
      </div>
    );
  }, [isInfoModalOpened, buttonMetaType, buttonMetaSubInfo]);

  return (
    <div style={styles.wrapper}>
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
      {buttonInfoBlock}
    </div>
  );
}

export default MathInputBlockButton;
