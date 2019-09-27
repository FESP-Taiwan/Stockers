// @flow

import React, {
  useRef,
  useEffect,
} from 'react';
import { BLOCK_TYPES } from '../../../Constant/ArtiboxEditor/blockTypes';

const BASIC_HEIGHT = {
  [BLOCK_TYPES.TEXT]: 26,
  [BLOCK_TYPES.TITLE]: 36,
  [BLOCK_TYPES.SUBTITLE]: 30,
  [BLOCK_TYPES.QUOTE]: 26,
};

const FONT_SIZE = {
  [BLOCK_TYPES.TEXT]: 16,
  [BLOCK_TYPES.TITLE]: 28,
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
  [BLOCK_TYPES.TITLE]: 4,
  [BLOCK_TYPES.SUBTITLE]: 2,
  [BLOCK_TYPES.QUOTE]: 6,
};

const COLOR = {
  [BLOCK_TYPES.TEXT]: '#000',
  [BLOCK_TYPES.TITLE]: '#4a4a4a',
  [BLOCK_TYPES.SUBTITLE]: '#212121',
  [BLOCK_TYPES.QUOTE]: '#b2b2b2',
};

const styles = {
  placement: {
    position: 'relative',
  },
};

type Props = {
  type: symbol,
  content: string,
  focus: boolean,
  meta: Object,
}

function Text({
  type,
  content,
  focus,
  meta,
}: Props) {
  const textarea = useRef();
  const displayer = useRef();

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

  return (
    <div style={styles.placement}>
      <textarea
        ref={textarea} />
      <div
        ref={displayer}>

      </div>
    </div>
  );
}

export default Text;
