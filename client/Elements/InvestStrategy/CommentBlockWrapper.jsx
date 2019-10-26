// @flow

import React from 'react';
import CommentBlock from './CommentBlock';
import { CommentInitDataContext } from '../../Constant/context';

// Mock data
const MOCK = {
  blocks: [{
    content: '',
    id: '12dde25f-4578-470b-9943-b0c3b0fa85aa',
    meta: {
      GRIDS: [{
        rowId: 'header',
        columnId: 2,
        name: '存貨',
      }, {
        columnId: 3,
        name: '折舊費用',
        rowId: 'header',
      }],
    },
    type: 'GRID',
  }, {
    content: 'adsfasdf:asdfsafdasdfdsfsdafasfdsdfsdfasfshifsjkfhskjfhjkshfkjh',
    id: 'a9dd5f05-1d50-4cb2-934e-f81fc682361b',
    meta: {},
    type: 'TEXT',
  }, {
    content: '',
    id: '7e66351d-f629-4472-a796-10ec368ce36f',
    meta: '',
    type: 'LINE',
  }],
};

function CommentBlockWrapper() {
  return (
    <CommentInitDataContext.Provider value={MOCK}>
      <CommentBlock />
    </CommentInitDataContext.Provider>
  );
}

export default CommentBlockWrapper;
