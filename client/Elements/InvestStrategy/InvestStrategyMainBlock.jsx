// @flow

import React, {
  Fragment,
  useMemo,
} from 'react';
import { connect } from 'react-redux';
import { ContextRouter } from 'react-router';
import ModuleTableWrapper from './Module/ModuleTableWrapper';
import CommentBlockWrapper from './CommentBlockWrapper';
import MathModuleBlockWrapper from './Math/MathModuleBlockWrapper';

type Props = {
  moduleInfo: Array,
} & ContextRouter;

function InvestStrategyMainBlock({
  match: {
    params: {
      moduleId,
    },
  },
  moduleInfo,
}: Props) {
  console.log('moduleInfo', moduleInfo);

  return (
    <Fragment>
      <MathModuleBlockWrapper />
      <ModuleTableWrapper />
      <CommentBlockWrapper />
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
      .find(module => module.id === parseInt(moduleId, 10)),
  }),
);

export default reduxHook(InvestStrategyMainBlock);
