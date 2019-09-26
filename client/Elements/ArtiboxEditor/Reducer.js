// @flow

import uuid from 'uuid/v4';
import { BLOCK_TYPES } from '../../Constant/ArtiboxEditor/blockTypes';
import Actions from '../../Constant/ArtiboxEditor/actions';

export function initializer(initialArg = { blocks: [] }) {
  return {
    ...initialArg,
    blocks: [
      ...initialArg.blocks.map(block => ({
        ...block,
        focus: false,
      })),
    ],
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case Actions.NEW_LINE:
      return {
        ...state,
        blocks: [
          ...state.blocks,
          {
            id: uuid(),
            type: BLOCK_TYPES.TEXT,
            content: '',
            meta: {},
          },
        ],
      };

    default:
      return state;
  }
}
