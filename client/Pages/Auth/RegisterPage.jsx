// @flow
/** @jsx jsx */

import { useCallback } from 'react';
import { jsx, css } from '@emotion/core';
import debug from 'debug';
import {
  reduxForm,
  Field,
  Form,
} from 'redux-form';
import type { FormProps } from 'redux-form';
// import { withRouter } from 'react-router';
// import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FORM_REGISTER } from '../../Constant/form';
import TextInput from '../../Form/TextInput';

const debugRegister = debug('Stocekers:Register');

const styles = {
  wrapper: css`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  `,
};

function RegisterPage({
  handleSubmit,
}: FormProps) {
  // const [register, { loading }] = useMutation();

  const onSubmit = useCallback(() => console.log('hi'), []);

  return (
    <Form css={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div css={styles.main}>
        <Field
          label="姓"
          name="firstName"
          component={TextInput} />
        <Field
          label="名"
          name="lastName"
          component={TextInput} />
        <Field
          label="電子信箱"
          name="email"
          component={TextInput} />
        <Field
          label="密碼"
          name="password"
          component={TextInput} />
        <Field
          label="確認密碼"
          name="checkPassword"
          component={TextInput} />
      </div>
    </Form>
  );
}

const formHook = reduxForm({
  form: FORM_REGISTER,
});

export default formHook(RegisterPage);
