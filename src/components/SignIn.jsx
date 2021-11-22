import React from 'react';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-native";

import theme from '../theme';

const formStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 10,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  input: {
    height: 60,
    borderRadius: 5,
    borderColor: 'lightgray',
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    fontSize: 16,
    padding: 10,
    marginVertical: 8,
  },
  buttonnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    textAlign: 'center',
    borderRadius: 5,
    flexGrow: 1,
    height: 60,
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    backgroundColor: theme.colors.primary,
    padding: 16,
  }
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.container}>
      <FormikTextInput style={formStyles.input} name="username" placeholder="Username" />
      <FormikTextInput style={formStyles.input} isPassword={true} name="password" placeholder="Password" />
      <Pressable style={formStyles.buttonnContainer} onPress={onSubmit}>
        <Text style={formStyles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Username must be at least 2 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters in length')
    .required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log(data);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;