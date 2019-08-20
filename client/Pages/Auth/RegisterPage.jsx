// @flow
/** @jsx jsx */

import { useCallback } from 'react';
import { jsx, css } from '@emotion/core';
import debug from 'debug';
import isEmail from 'validator/lib/isEmail';
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
          name="accountEmail"
          component={TextInput} />
        <Field
          label="密碼"
          name="password"
          component={TextInput} />
        <Field
          label="確認密碼"
          name="confirmPassword"
          component={TextInput} />
      </div>
    </Form>
  );
}

const formHook = reduxForm({
  form: FORM_REGISTER,
  validate: (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = '必填';
    }

    if (!values.lastName) {
      errors.lastName = '必填';
    }

    if (!values.accountEmail) {
      errors.accountEmail = '必填';
    }

    if (values.accountEmail && !isEmail(values.accountEmail)) {
      errors.accountEmail = '信箱格式不正確';
    }

    if (!values.password) {
      errors.password = '必填';
    }

    if (values.password) {
      if (values.password.length < 8) {
        errors.password = '請輸入至少八個字的密碼';
      }

      if (!values.password.match(/[A-Z]/)) {
        errors.password = '密碼須包含至少一個大寫字母';
      }

      if (!values.password.match(/[a-z]/)) {
        errors.password = '密碼須包含至少一個小寫字母';
      }

      if (!values.password.match(/[0-9]/)) {
        errors.password = '密碼須包含至少一個數字';
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = '確認密碼不相符';
      }
    }
  },
});

export default formHook(RegisterPage);
