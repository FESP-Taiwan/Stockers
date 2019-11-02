// @flow

import React, {
  Fragment,
} from 'react';
import { connect } from 'react-redux';
import ModuleTableWrapper from './Module/ModuleTableWrapper';
import CommentBlockWrapper from './CommentBlockWrapper';
import MathModuleBlockWrapper from './Math/MathModuleBlockWrapper';

type Props = {
  moduleInfo: {
    comment: {},
    mathModule: {},
    headers: Array,
  },
};

function InvestStrategyMainBlock({
  match: {
    params: {
      moduleId,
    },
  },
  moduleInfo,
}: Props) {
  const {
    comment,
    mathModule,
    headers,
  } = moduleInfo;

  return (
    <Fragment>
      <MathModuleBlockWrapper
        mathModule={mathModule || {}} />
      <ModuleTableWrapper
        headers={headers || []} />
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
