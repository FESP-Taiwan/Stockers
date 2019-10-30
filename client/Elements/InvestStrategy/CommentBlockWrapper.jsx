// @flow

import React from 'react';
import CommentBlock from './CommentBlock';
import { CommentInitDataContext } from '../../Constant/context';

function CommentBlockWrapper({
  comment,
}: {
  comment: {},
}) {
  return (
    <CommentInitDataContext.Provider value={comment}>
      <CommentBlock />
    </CommentInitDataContext.Provider>
  );
}

export default CommentBlockWrapper;
