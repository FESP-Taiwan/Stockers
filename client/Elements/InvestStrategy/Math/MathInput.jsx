// @flow

import React, {
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
    letterSpacing: 3,
  },
  displayer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
};

function MathInput() {
  const inputRef = useRef();

  const mathInitData = useContext(MathInitDataContext);

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

  useEffect(() => {
    if (!firstLoaded) {
      setInputState(mathInitData);

      setFirstLoaded(true);
    }
  }, [firstLoaded, mathInitData]);

  // triggered after click event
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(
        caretPositionAfterClickEvent, caretPositionAfterClickEvent
      );
    }
  }, [caretPositionAfterClickEvent]);

  // for selectionchange range determination
  useEffect(() => {
    const { current } = inputRef;

    if (!isEditting || !current) return () => {};

    function onSelectionChangeHandler() {
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
      const addContent = `${name}_${metaTypeContent}`;

      const newContent = `${content.substring(0, currentCaret.from)}${addContent}${content.substring(currentCaret.to)}`;

      const newCaretPosition = (
        newContent.length - newContent.substring(currentCaret.from).length + addContent.length
      );

      const chipInfosMap = chipInfos.reduce((map, chipInfo) => {
        if (chipInfo.FROM === currentCaret.from && chipInfo.TO === currentCaret.to) {
          return map;
        }

        map.set(chipInfo.FROM, {
          ...chipInfo,
          isInsertData: false,
        });

        return map;
      }, new Map());

      const chipInfosMapAfterInsertedData = chipInfosMap.set(currentCaret.from, {
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
        .sort((cursorA, cursorB) => cursorA[0] - cursorB[0])
        .reduce((chips, chip) => {
          if (chip[0] < currentCaret.from || chip[1].isInsertData) {
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
        }, []);

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
  }, [inputState]);

  const onPasteHandler = useCallback((e) => {
    e.preventDefault();

    alert('此項目禁止使用貼上功能');
  }, []);

  const contentDisplayer = useMemo(() => {
    return null;
  }, []);

  return (
    <div
      style={styles.wrapper}>
      <input
        ref={inputRef}
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
