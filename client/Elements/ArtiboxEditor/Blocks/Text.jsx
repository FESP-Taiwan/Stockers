// @flow

import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import Actions from '../../../Constant/ArtiboxEditor/actions';
import { Dispatch as DispatchContext } from '../../../Constant/ArtiboxEditor/context';
import { BLOCK_TYPES } from '../../../Constant/ArtiboxEditor/types';
import MarkerEditorMenu from '../Elements/MarkerEditorMenu';

const BASIC_HEIGHT = {
  [BLOCK_TYPES.TEXT]: 26,
  [BLOCK_TYPES.TITLE]: 36,
  [BLOCK_TYPES.SUBTITLE]: 30,
  [BLOCK_TYPES.QUOTE]: 26,
};

const FONT_SIZE = {
  [BLOCK_TYPES.TEXT]: 16,
  [BLOCK_TYPES.TITLE]: 24,
  [BLOCK_TYPES.SUBTITLE]: 20,
  [BLOCK_TYPES.QUOTE]: 16,
};

const FONT_WEIGHT = {
  [BLOCK_TYPES.TEXT]: 400,
  [BLOCK_TYPES.TITLE]: 700,
  [BLOCK_TYPES.SUBTITLE]: 500,
  [BLOCK_TYPES.QUOTE]: 400,
};

const LETTER_SPACING = {
  [BLOCK_TYPES.TEXT]: 1,
  [BLOCK_TYPES.TITLE]: 3,
  [BLOCK_TYPES.SUBTITLE]: 2,
  [BLOCK_TYPES.QUOTE]: 6,
};

const COLOR = {
  [BLOCK_TYPES.TEXT]: '#FFF',
  [BLOCK_TYPES.TITLE]: '#4a4a4a',
  [BLOCK_TYPES.SUBTITLE]: '#212121',
  [BLOCK_TYPES.QUOTE]: '#b2b2b2',
};

const styles = {
  wrapper: {
    width: '100%',
    position: 'relative',
    borderLeft: '2px solid transparent',
    padding: '0 12px',
  },
  focusWrapper: {
    width: '100%',
    position: 'relative',
    borderLeft: `2px solid ${Colors.PRIMARY}`,
    padding: '0 12px',
  },
  input: {
    height: 26,
    border: 'none',
    width: '100%',
    outline: 'none',
    resize: 'none',
    backgroundColor: 'transparent',
    padding: 0,
  },
  displayer: {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  },
};

type Props = {
  type: symbol,
  content: string,
  focus: boolean,
  meta: Object,
  id: string,
  placeholder?: string,
}

function Text({
  type,
  content,
  focus,
  meta,
  id,
  placeholder,
}: Props) {
  // console.log({
  //   id,
  //   type,
  //   content,
  //   focus,
  //   meta,
  // });
  const textarea = useRef();
  const displayer = useRef();

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (textarea.current && displayer.current) {
      textarea.current.style.height = `${BASIC_HEIGHT[type]}px`;

      displayer.current.style.height = `${BASIC_HEIGHT[type]}px`;

      const {
        parentNode,
      } = textarea.current;

      parentNode.style.height = `${BASIC_HEIGHT[type]}px`;
    }
  }, [type]);

  useEffect(() => {
    const { current } = textarea;

    if (current && focus) {
      current.focus();
    }
  }, [focus]);

  const onInputHandler = useCallback(({ target }) => {
    target.style.setProperty('height', `${BASIC_HEIGHT[type]}px`);

    const newHeight = `${target.scrollHeight}px`;

    target.style.setProperty('height', newHeight);
    target.parentNode.style.setProperty('height', newHeight);
  }, [type]);

  const onFocusHandler = useCallback(() => {
    dispatch({
      type: Actions.FOCUS,
      id,
    });
  }, [dispatch, id]);

  const onChangeHandler = useCallback(({ target }) => {
    dispatch({
      type: Actions.UPDATE_META_AND_CONTENT,
      id,
      content: target.value,
    });
  }, [dispatch, id]);

  const onKeyDownHandler = useCallback((e) => {
    const {
      keyCode,
    } = e;

    // delete
    if (keyCode === 8) {
      if (content === '') {
        dispatch({
          type: Actions.REMOVE_BLOCK,
          id,
        });
      }
    } else if (keyCode === 13) { // enter
      e.preventDefault();

      dispatch({
        type: Actions.NEW_LINE,
        at: id,
      });
    }
  }, [dispatch, content, id]);

  const wrapperStyles = useMemo(() => ({
    ...(focus ? styles.focusWrapper : styles.wrapper),
    height: BASIC_HEIGHT[type],
  }), [focus, type]);

  const inputStyles = useMemo(() => ({
    ...styles.input,
    fontSize: FONT_SIZE[type],
    fontWeight: FONT_WEIGHT[type],
    letterSpacing: LETTER_SPACING[type],
    color: COLOR[type],
    lineHeight: `${BASIC_HEIGHT[type]}px`,
  }), [type]);

  const displayerStyles = useMemo(() => ({
    ...styles.displayer,
    fontSize: FONT_SIZE[type],
    fontWeight: FONT_WEIGHT[type],
    letterSpacing: LETTER_SPACING[type],
    color: COLOR[type],
    lineHeight: `${BASIC_HEIGHT[type]}px`,
  }), [type]);

  return (
    <div style={wrapperStyles}>
      <textarea
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
        onInput={onInputHandler}
        onFocus={onFocusHandler}
        style={inputStyles}
        placeholder={placeholder}
        className="Artibox-input"
        ref={textarea} />
      <div
        style={displayerStyles}
        ref={displayer}>
        <MarkerEditorMenu
          meta={meta}
          blockId={id}
          displayer={displayer}
          textarea={textarea} />
      </div>
    </div>
  );
}

Text.defaultProps = {
  placeholder: '請在此輸入內容',
};

export default Text;
