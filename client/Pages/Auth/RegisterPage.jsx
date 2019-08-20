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
import { withRouter } from 'react-router';
import gql from 'graphql-tag';
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
}: FormProps ) {
  const [register, { loading }] = useMutation();

  const onSubmit = useCallback(() => {}, []);

  return (
    <Form css={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div css={styles.main}>
        <Field
          name="firstName"
          compoennt={TextInput} />
        <Field
          name="lastName"
          compoennt={TextInput} />
        <Field
          name="email"
          compoennt={TextInput} />
        <Field
          name="password"
          compoennt={TextInput} />
        <Field
          name="checkPassword"
          compoennt={TextInput} />
        <Field
          name="checkPassword"
          compoennt={TextInput} />
      </div>
    </Form>
  );
}

const formHook = reduxForm({
  form: FORM_REGISTER,
});

export default formHook(RegisterPage);
