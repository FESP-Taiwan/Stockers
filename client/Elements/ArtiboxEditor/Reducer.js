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
    case Actions.NEW_LINE: {
      if (action.at) {
        const currentIndex = state.blocks.findIndex(block => block.id === action.at);

        if (~currentIndex) {
          return {
            ...state,
            blocks: [
              ...state.blocks.slice(0, currentIndex + 1).map(block => (block.focus ? {
                ...block,
                focus: false,
              } : block)),
              {
                id: uuid(),
                type: BLOCK_TYPES.TEXT,
                content: '',
                meta: {},
                focus: true,
              },
              ...state.blocks.slice(currentIndex + 1).map(block => (block.focus ? {
                ...block,
                focus: false,
              } : block)),
            ],
          };
        }
      }

      return {
        ...state,
        blocks: [
          ...state.blocks.map(block => (block.focus ? {
            ...block,
            focus: false,
          } : block)),
          {
            id: uuid(),
            type: BLOCK_TYPES.TEXT,
            content: '',
            meta: {},
            focus: true,
          },
        ],
      };
    }

    case Actions.UPDATE_META_AND_CONTENT: {
      const updateIndex = state.blocks.findIndex(block => block.id === action.id);

      if (~updateIndex) {
        const targetBlock = state.blocks[updateIndex];

        return {
          ...state,
          blocks: [
            ...state.blocks.slice(0, updateIndex),
            {
              ...targetBlock,
              content: action.content,
            },
            ...state.blocks.slice(updateIndex + 1),
          ],
        };
      }

      return state;
    }

    case Actions.FOCUS: {
      return {
        ...state,
        blocks: [
          ...state.blocks.map((block) => {
            if (block.id === action.id) {
              return {
                ...block,
                focus: true,
              };
            }

            return {
              ...block,
              focus: false,
            };
          }),
        ],
      };
    }

    case Actions.REMOVE_BLOCK: {
      const removeId = state.blocks.findIndex(block => block.id === action.id);

      if (~removeId) {
        return {
          ...state,
          blocks: [
            ...state.blocks.slice(0, removeId),
            ...state.blocks.slice(removeId + 1),
          ],
        };
      }

      return state;
    }

    default:
      return state;
  }
}
