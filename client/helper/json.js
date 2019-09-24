// @flow

import uuid from 'uuid/v4';
import { BLOCK_TYPES } from '../Constant/ArtiboxEditor/blockTypes';

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

export default null;
