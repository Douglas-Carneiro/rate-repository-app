/* eslint-disable no-unused-vars */
import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({});

const TextInput = ({ style, error, isPassword,...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput secureTextEntry={isPassword} style={textInputStyle} {...props} />;
};

export default TextInput;