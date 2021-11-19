import React from 'react';
import { View, StyleSheet, Text, ScrollView, Platform } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondary,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    padding: 20,
    fontFamily: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  }
});

const AppBarTab = ({ tabTitle, slug }) => (
  <Link to={slug}>
    <Text style={styles.title}>{tabTitle}</Text>
  </Link>
);

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabTitle="Repositories" slug="/"/>
        <AppBarTab tabTitle="Sign In" slug="/login"/>
      </ScrollView>
    </View>
  );
};

export default AppBar;