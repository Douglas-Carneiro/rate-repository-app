import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 0,
    color: theme.colors.errorColor,
  },
  errorBorder: {
    borderColor: theme.colors.errorColor,
  }
});

const FormikTextInput = ({ name, isPassword, ...props }) => {
  const [field, meta, helpers] = useField(name);
  
  // Check if the field is touched and the error message is present
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        isPassword={isPassword}
        style={showError && styles.errorBorder}
        {...props}
      />
      {/* Show the error message if the value of showError variable is true  */}
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;