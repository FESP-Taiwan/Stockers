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
    mathModule: {},
  },
};

function InvestStrategyMainBlock({
  moduleInfo,
}: Props) {
  console.log('moduleInfo', moduleInfo);

  const {
    comment,
    mathModule,
  } = moduleInfo;

  return (
    <Fragment>
      <MathModuleBlockWrapper
        mathModule={mathModule || {}} />
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
