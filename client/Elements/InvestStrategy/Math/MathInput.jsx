// @flow

import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
  useMemo,
} from 'react';
import moment from 'moment';
import { MathInitDataContext } from '../../../Constant/context';
import {
  investStrategySharedEmitter,
  START_EDITTING,
  END_EDITTING,
  INIT_MODULE,
  CLICK_EVENT,
  MATH_META_TYPES,
} from '../../../Constant/investStrategy';
import { useGlobalErrorMessage } from '../../../helper/useGlobalMessage';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  input: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    textDecoration: 'none',
    border: 'none',
    outline: 'none',
    fontSize: 16,
    color: Colors.PRIMARY_THIRD,
    letterSpacing: 3,
    caretColor: '#FFF',
  },
  displayer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    letterSpacing: 3,
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
  },
  blockBtn: {
    fontSize: 16,
    pointerEvents: 'auto',
    letterSpacing: 3,
    color: '#FFF',
    // height: 40,
    borderBottom: `1px solid ${Colors.PRIMARY}`,
    // borderRadius: 4,
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

function MathInput() {
  const inputRef = useRef();

  const mathInitData = useContext(MathInitDataContext);

  const showErrorMessage = useGlobalErrorMessage();

  const [firstLoaded, setFirstLoaded] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [caretPositionAfterClickEvent, setCaretPositionAfterClickEvent] = useState(0);
  const [caretPosition, setCaretPosition] = useState(0);
  const [inputState, setInputState] = useState({
    content: '',
    chipInfos: [],
  });

  console.log('inputState--->', inputState);

  const getMetaTypeContent = useCallback((type, date, rowId) => {
    switch (type) {
      case MATH_META_TYPES.NUMEROUS:
        return '眾數';

      case MATH_META_TYPES.AVERAGE:
        return '平均';

      case MATH_META_TYPES.DATE:
        return (date ? `${moment(date).format('YYYY/MM')}季` : '??');

      case MATH_META_TYPES.GRID:
        return (rowId + 1 || '??');

      default:
        return '?';
    }
  }, []);

  const addSpanToTags = useCallback((tags, subContent, from) => {
    Array.from(Array(subContent.length)).forEach((n, index) => {
      tags.push(
        <span
          className="math-module-text"
          data-from={from + index}
          key={`${from + index}:${from + index + 1}`}>
          {subContent.substring(index, index + 1)}
        </span>
      );
    });
  }, []);

  useEffect(() => {
    if (!firstLoaded) {
      setInputState(mathInitData);

      setFirstLoaded(true);
    }
  }, [firstLoaded, mathInitData]);

  // clear when isEditting triggered
  useEffect(() => {
    if (!isEditting) {
      const { current } = inputRef;
      const wrapper = current.parentNode;

      const blockButtonList = wrapper.querySelectorAll('.math-module-block-button');
      const textList = wrapper.querySelectorAll('.math-module-text');

      blockButtonList.forEach((blockButton) => {
        if (blockButton.classList.contains('hovered')) {
          blockButton.classList.remove('hovered');
        }
      });

      textList.forEach((text) => {
        if (text.classList.contains('selected')) {
          text.classList.remove('selected');
        }
      });
    }
  }, [isEditting]);

  // emitter listener
  useEffect(() => {
    function startEditHandler() {
      setIsEditting(true);
    }

    function endEditHandler() {
      setIsEditting(false);
    }

    function initModuleHandler() {
      setIsEditting(false);
    }

    investStrategySharedEmitter.on(START_EDITTING, startEditHandler);
    investStrategySharedEmitter.on(END_EDITTING, endEditHandler);
    investStrategySharedEmitter.on(INIT_MODULE, initModuleHandler);

    return () => {
      investStrategySharedEmitter.removeListener(START_EDITTING, startEditHandler);
      investStrategySharedEmitter.removeListener(END_EDITTING, endEditHandler);
      investStrategySharedEmitter.removeListener(INIT_MODULE, initModuleHandler);
    };
  }, []);

  // selectionchange range determination
  useEffect(() => {
    const { current } = inputRef;

    if (!isEditting || !current) return () => {};

    function onSelectionChangeHandler() {
      // clear class
      const wrapper = current.parentNode;

      const blockButtonList = wrapper.querySelectorAll('.math-module-block-button');
      const textList = wrapper.querySelectorAll('.math-module-text');

      blockButtonList.forEach((blockButton) => {
        if (blockButton.classList.contains('hovered')) {
          blockButton.classList.remove('hovered');
        }
      });

      textList.forEach((text) => {
        if (text.classList.contains('selected')) {
          text.classList.remove('selected');
        }
      });

      if (document.activeElement !== current) {
        return;
      }

      const {
        chipInfos,
      } = inputState;

      const {
        selectionStart,
        selectionEnd,
      } = current;

      let tempSelectionRange = {
        from: selectionStart,
        to: selectionEnd,
      };

      if (tempSelectionRange) {
        chipInfos.some((chipInfo) => {
          if (selectionStart <= chipInfo.FROM) {
            if (selectionEnd <= chipInfo.FROM) {
              tempSelectionRange = {
                from: selectionStart,
                to: selectionEnd,
              };

              return true;
            }

            tempSelectionRange = {
              from: chipInfo.FROM,
              to: chipInfo.TO,
            };

            return true;
          }

          if (selectionStart < chipInfo.TO) {
            tempSelectionRange = {
              from: chipInfo.FROM,
              to: chipInfo.TO,
            };

            return true;
          }

          return false;
        });

        current.setSelectionRange(tempSelectionRange.from, tempSelectionRange.to);
      }

      tempSelectionRange = null;
    }

    document.addEventListener('selectionchange', onSelectionChangeHandler, false);

    return () => {
      document.removeEventListener('selectionchange', onSelectionChangeHandler, false);
    };
  }, [isEditting, inputState]);

  // selectionRange and blockBtn class connection
  useEffect(() => {
    const { current: input } = inputRef;

    if (!input) return () => {};

    function onSelectHandler() {
      const {
        selectionStart,
        selectionEnd,
      } = input;

      const selectedChipInfoIndex = inputState.chipInfos
        .findIndex(chipInfo => chipInfo.FROM === selectionStart && chipInfo.TO === selectionEnd);

      const wrapper = input.parentNode;

      if (~selectedChipInfoIndex) {
        const blockButtonList = wrapper.querySelectorAll('.math-module-block-button');

        blockButtonList[selectedChipInfoIndex].classList.add('hovered');
      } else {
        const textList = wrapper.querySelectorAll('.math-module-text');

        textList.forEach((text) => {
          const dataAttribute = text.dataset.from;

          if (dataAttribute >= selectionStart && dataAttribute < selectionEnd) {
            text.classList.add('selected');
          }
        });
      }
    }

    input.addEventListener('select', onSelectHandler, false);

    return () => {
      input.removeEventListener('select', onSelectHandler, false);
    };
  }, [inputState]);

  // click emitter effect
  useEffect(() => {
    const { current } = inputRef;

    if (!current) return () => {};

    function clickEventHandler({
      name,
      type,
      rowId,
      columnId,
      date,
    }) {
      const {
        content,
        chipInfos,
      } = inputState;

      const currentCaret = {
        from: current.selectionStart,
        to: current.selectionEnd,
      };

      const selectionDiff = currentCaret.to - currentCaret.from;

      const metaTypeContent = getMetaTypeContent(type, date, rowId);
      const addContent = `${name}_${metaTypeContent}  `;

      const newContent = `${content.substring(0, currentCaret.from)}${addContent}${content.substring(currentCaret.to)}`;

      const newCaretPosition = (
        newContent.length - newContent.substring(currentCaret.from).length + addContent.length
      );

      const chipInfosMap = chipInfos.reduce((map, chipInfo) => {
        if (chipInfo.FROM === currentCaret.from && chipInfo.TO === currentCaret.to) {
          return map;
        }

        map.set(`${chipInfo.FROM}_old`, {
          ...chipInfo,
          isInsertData: false,
        });

        return map;
      }, new Map());

      const chipInfosMapAfterInsertedData = chipInfosMap.set(`${currentCaret.from}_new`, {
        FROM: currentCaret.from,
        TO: newCaretPosition,
        chipData: {
          name,
          type,
          rowId,
          columnId,
          date,
        },
        isInsertData: true,
      });

      const newChipInfos = Array.from(chipInfosMapAfterInsertedData.entries())
        .reduce((chips, chip) => {
          if (chip[1].FROM < currentCaret.from || chip[1].isInsertData) {
            return [
              ...chips,
              {
                FROM: chip[1].FROM,
                TO: chip[1].TO,
                chipData: chip[1].chipData,
              },
            ];
          }

          return [
            ...chips,
            {
              FROM: chip[1].FROM - selectionDiff + addContent.length,
              TO: chip[1].TO - selectionDiff + addContent.length,
              chipData: chip[1].chipData,
            },
          ];
        }, [])
        .sort((cursorA, cursorB) => cursorA.FROM - cursorB.FROM);

      setCaretPositionAfterClickEvent(newCaretPosition);

      setInputState({
        content: newContent,
        chipInfos: newChipInfos,
      });
    }

    if (isEditting) {
      current.focus();

      investStrategySharedEmitter.on(CLICK_EVENT, clickEventHandler);
    }

    return () => {
      investStrategySharedEmitter.removeListener(CLICK_EVENT, clickEventHandler);
    };
  }, [isEditting, getMetaTypeContent, inputState]);

  // triggered after click event
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(
        caretPositionAfterClickEvent, caretPositionAfterClickEvent
      );
    }
  }, [caretPositionAfterClickEvent]);

  const onChangeHandler = useCallback(({ target }) => {
    const diff = target.selectionStart - caretPosition;

    const { chipInfos } = inputState;

    const newChipInfos = chipInfos.reduce((accum, chipInfo) => {
      if (target.selectionStart >= chipInfo.TO) {
        return [
          ...accum,
          chipInfo,
        ];
      }

      if (target.selectionStart >= chipInfo.FROM && caretPosition === chipInfo.TO) {
        return accum;
      }

      return [
        ...accum,
        {
          ...chipInfo,
          FROM: chipInfo.FROM + diff,
          TO: chipInfo.TO + diff,
        },
      ];
    }, []);

    setInputState({
      content: target.value,
      chipInfos: newChipInfos,
    });

    setCaretPosition(target.selectionEnd);
  }, [inputState, caretPosition]);

  const onKeyDownHandler = useCallback((e) => {
    const {
      keyCode,
      target,
    } = e;

    setCaretPosition(target.selectionEnd);

    const {
      selectionStart,
      selectionEnd,
    } = target;

    const {
      content,
      chipInfos,
    } = inputState;

    if (keyCode === 32) {
      e.preventDefault();

      showErrorMessage('此項目禁止輸入空白鍵');
    }

    if (keyCode === 8) {
      const removeChipInfoIndex = chipInfos.findIndex(
        chip => chip.TO === selectionEnd && chip.TO === selectionStart
      );

      if (~removeChipInfoIndex) {
        e.preventDefault();

        const newContent = `${content.substring(0, chipInfos[removeChipInfoIndex].FROM)}${content.substring(chipInfos[removeChipInfoIndex].TO)}`;

        const newChipInfos = chipInfos.reduce((chips, chipInfo, index) => {
          if (index < removeChipInfoIndex) {
            return [
              ...chips,
              chipInfo,
            ];
          }

          if (index === removeChipInfoIndex) {
            return chips;
          }

          const subtractLength = chipInfos[removeChipInfoIndex].TO
            - chipInfos[removeChipInfoIndex].FROM;

          return [
            ...chips,
            {
              ...chipInfo,
              FROM: chipInfo.FROM - subtractLength,
              TO: chipInfo.TO - subtractLength,
            },
          ];
        }, []);

        setInputState({
          content: newContent,
          chipInfos: newChipInfos,
        });
      }
    }
  }, [inputState, showErrorMessage]);

  const onPasteHandler = useCallback((e) => {
    e.preventDefault();

    showErrorMessage('此項目禁止使用貼上功能');
  }, [showErrorMessage]);

  const onDropHandler = useCallback((e) => {
    e.preventDefault();
  }, []);

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

      const { chipInfos } = inputState;

      const blockButtonList = current.parentNode.querySelectorAll('.math-module-block-button');

      const chipInfoIndex = Array.from(blockButtonList)
        .findIndex(blockButton => blockButton === target);

      const {
        FROM: from,
        TO: to,
      } = chipInfos[chipInfoIndex];

      if (target.classList.contains('hovered') && (from !== selectionStart || to !== selectionEnd || !isEditting)) {
        target.classList.remove('hovered');
      }
    }
  }, [inputState, isEditting]);

  const contentDisplayer = useMemo(() => {
    const tags = [];

    const {
      content,
      chipInfos,
    } = inputState;

    if (!chipInfos.length) {
      addSpanToTags(tags, content, 0);
    } else {
      chipInfos.forEach((chipInfo, index) => {
        if (index === 0) {
          addSpanToTags(tags, content.substring(0, chipInfo.FROM), 0);

          tags.push(
            <button
              className="math-module-block-button"
              onMouseEnter={blockBtnMouseEnterHandler}
              onMouseLeave={blockBtnMouseLeaveHandler}
              key={`${chipInfo.FROM}:${chipInfo.TO}`}
              style={styles.blockBtn}
              type="button">
              {content.substring(chipInfo.FROM, chipInfo.TO)}
              &nbsp;
              <div style={styles.arrow} />
            </button>
          );

          if (chipInfos.length === 1) {
            addSpanToTags(tags, content.substring(chipInfo.TO), chipInfo.TO);
          }

          return;
        }

        const prevChip = chipInfos[index - 1];

        if (prevChip.TO !== chipInfo.FROM) {
          addSpanToTags(tags, content.substring(prevChip.TO, chipInfo.FROM), prevChip.TO);
        }

        tags.push(
          <button
            className="math-module-block-button"
            onMouseEnter={blockBtnMouseEnterHandler}
            onMouseLeave={blockBtnMouseLeaveHandler}
            key={`${chipInfo.FROM}:${chipInfo.TO}`}
            style={styles.blockBtn}
            type="button">
            {content.substring(chipInfo.FROM, chipInfo.TO)}
            &nbsp;
            <div style={styles.arrow} />
          </button>
        );

        if (index === chipInfos.length - 1) {
          addSpanToTags(tags, content.substring(chipInfo.TO), chipInfo.TO);
        }
      });
    }

    return (
      <Fragment>
        {tags}
      </Fragment>
    );
  }, [inputState, blockBtnMouseEnterHandler, blockBtnMouseLeaveHandler, addSpanToTags]);

  return (
    <div
      style={styles.wrapper}>
      <input
        className="math-module-input"
        ref={inputRef}
        onDrop={onDropHandler}
        disabled={!isEditting}
        value={inputState.content}
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
        onPaste={onPasteHandler}
        style={styles.input} />
      <div style={styles.displayer}>
        {contentDisplayer}
      </div>
    </div>
  );
}

export default MathInput;
