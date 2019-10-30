// @flow

import React, {
  Fragment,
  useMemo,
} from 'react';
import { connect } from 'react-redux';
import ModuleTableWrapper from './Module/ModuleTableWrapper';
import CommentBlockWrapper from './CommentBlockWrapper';
import MathModuleBlockWrapper from './Math/MathModuleBlockWrapper';

type Props = {
  moduleInfo: {
    comment: {},
  },
};

function InvestStrategyMainBlock({
  moduleInfo,
}: Props) {
  const {
    comment,
  } = moduleInfo;

  return (
    <Fragment>
      <MathModuleBlockWrapper />
      <ModuleTableWrapper />
      <CommentBlockWrapper
        comment={comment || {}} />
    </Fragment>
  );
}

const reduxHook = connect(
  (state, {
    match: {
      params: {
        moduleId,
      },
    },
  }) => ({
    moduleInfo: state.InvestStrategy.userModulesInfo
      .find(module => module.id === parseInt(moduleId, 10)) || {},
  }),
);

export default reduxHook(InvestStrategyMainBlock);
