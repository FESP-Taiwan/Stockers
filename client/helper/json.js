// @flow

import uuid from 'uuid/v4';
import { BLOCK_TYPES, BLOCK_NAMES } from '../Constant/ArtiboxEditor/types';

export function fromJSON(json = { blocks: [] }) {
  return {
    blocks: json.blocks.map(block => ({
      id: block.id || uuid(),
      type: BLOCK_TYPES[block.type],
      content: block.content,
      meta: block.meta,
    })),
  };
}

export function toJSON(storedObject = {}) {
  return {
    blocks: storedObject.blocks.map(block => ({
      id: block.id,
      type: BLOCK_NAMES[block.type],
      content: block.content,
      meta: block.meta,
    })),
  };
}

export default null;
