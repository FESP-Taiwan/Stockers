// @flow

import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import CommentBlock from './CommentBlock';
import { CommentInitDataContext } from '../../Constant/context';

function CommentBlockWrapper({
  comment,
}: {
  comment: {},
}) {
  const [contextProviderData, setContextProviderData] = useState();

  useEffect(() => {
    setContextProviderData(comment);
  }, [comment]);

  const updateCommentInitData = useCallback((data) => {
    setContextProviderData(data);
  }, []);

  return (
    <CommentInitDataContext.Provider value={contextProviderData}>
      <CommentBlock
        updateCommentInitData={updateCommentInitData} />
    </CommentInitDataContext.Provider>
  );
}

export default CommentBlockWrapper;
