// @flow
/** @jsx jsx */

import { useCallback, useContext } from 'react';
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
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { MessageHandlerContext, ErrorHandlerContext } from '../../Constant/context';
import { FORM_REGISTER } from '../../Constant/form';
import TextInput from '../../Form/TextInput';
import stockersLogo from '../../static/images/logo_stockers_text.png';

const styles = {
  wrapper: css`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  `,
  block: css`
    width: 306px;
    height: 80px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 13px;
    padding: 20px;
    background-color: #262626;
  `,
  registerBlock: css`
    width: 306px;
    height: 80px;
    background-color: #FF9500;
    border-radius: 40px;
    text-align: center;
    color: #FFF;
    font-size: 13px;
    fontWeight: 500;
    padding: 20px;
  `,
  title: css`
    width: 100px;
    font-size: 13px;
  `,
  fakeBlock: css`
    height: 20px;
  `,
  submitBtn: css`
    color: #FFF;
    font-size: 13px;
  `,
  submitBtnWrapper: css`
    width: 306px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  brandWrapper: css`
    display: flex;
    justify-content: center;
  `,
  logo: {
    width: 30,
    height: 30,
  },
  brandLogo: {
    width: 80,
    height: 78,
  },
};

function RegisterPage({
  handleSubmit,
}: FormProps) {
  // const [register, { loading }] = useMutation();

  const {
    messageHub,
    MESSAGE,
  } = useContext(MessageHandlerContext);

  const {
    errorHub,
    ERROR,
  } = useContext(ErrorHandlerContext);

  const onSubmit = useCallback(async () => {
    try {
      // await logIn({
      //   variables: {
      //     email,
      //     password,
      //   },
      // });

      // await localStorage.setItem('token', data.logIn.token);
      console.log('------');
    } catch {
      errorHub.emit(ERROR, '註冊失敗');
    }

    messageHub.emit(MESSAGE, '註冊成功！');
  }, [MESSAGE, messageHub, ERROR, errorHub]);

  return (
    <Form css={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div css={styles.main}>
        <div css={styles.brandWrapper}>
          <img css={styles.brandLogo} src={stockersLogo} alt="logo" />
        </div>
        <div css={styles.fakeBlock} />
        <div css={styles.block}>
          <Field
            inline
            name="firstName"
            placeholder="姓"
            component={TextInput} />
        </div>
        <div css={styles.fakeBlock} />
        <div css={styles.block}>
          <Field
            inline
            name="lastName"
            placeholder="名"
            component={TextInput} />
        </div>
        <div css={styles.fakeBlock} />
        <div css={styles.block}>
          <Field
            inline
            name="email"
            placeholder="電子郵件"
            component={TextInput} />
        </div>
        <div css={styles.fakeBlock} />
        <div css={styles.block}>
          <Field
            inline
            type="password"
            name="password"
            placeholder="密碼"
            component={TextInput} />
        </div>
        <div css={styles.fakeBlock} />
        <button
          type="button"
          css={styles.registerBlock}
          onClick={() => console.log('click')}>
          建立帳號
        </button>
        <div css={styles.fakeBlock} />
        <div css={styles.submitBtnWrapper}>
          <button
            css={styles.submitBtn}
            type="submit"
            onClick={() => console.log('submit!')}>
            已經有帳號? 登入
          </button>
        </div>
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
