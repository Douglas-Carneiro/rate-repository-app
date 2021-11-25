import React from 'react';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useReview from '../hooks/useReview';
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
  buttonContainer: {
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
  repositoryName: '',
  rating: '',
  review: ''
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.container}>
      <FormikTextInput 
        style={formStyles.input} 
        name="username" 
        placeholder="Owner username" />
      <FormikTextInput 
        style={formStyles.input}
        name="repositoryName" 
        placeholder="Repository name" />
      <FormikTextInput 
        style={formStyles.input}
        name="rating" 
        placeholder="Rating" />
      <FormikTextInput 
        style={formStyles.input}
        name="review" 
        placeholder="Write your review"
        multiline />
      <Pressable style={formStyles.buttonContainer} onPress={onSubmit} testID="submitButton">
        <Text style={formStyles.button}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  repositoryName: yup.string().required('Name is required'),
  rating: yup.number().required('Rating is required').positive().integer(),
  review: yup.string()
});

export const CompleteForm = ({ onSubmit }) => {
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

const NewReview = () => {
  const [createNewReview] = useReview();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, repositoryName, rating, review } = values;

    try {
      const data = await createNewReview({ username, repositoryName, rating, review });
      console.log(data);
      history.push(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <CompleteForm onSubmit={onSubmit} />
  );
};

export default NewReview;