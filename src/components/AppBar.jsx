import React from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from "react-router-native";
import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

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
    paddingVertical: 20,
    paddingHorizontal: 10
  }
});

const AppBarTab = ({ tabTitle, slug }) => (
  <Link to={slug}>
    <Text style={styles.title}>{tabTitle}</Text>
  </Link>
);

const Logout = () => {
  const signOut = useSignOut();
  return (
    <Pressable onPress={async () => await signOut()}>
    <Text style={styles.title}>Sign Out</Text>
  </Pressable>
  );
};

const AppBar = () => {
  const { loading, data } = useQuery(GET_AUTHORIZED_USER);

  if (loading) return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading ...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabTitle="Repositories" slug="/"/>
        {data.authorizedUser === null ? 
          <>
            <AppBarTab tabTitle="Sign In" slug="/login"/> 
            <AppBarTab tabTitle="Sign Up" slug="/signUp"/>
          </>
           : 
          <>
            <AppBarTab tabTitle="Create a review" slug="/review"/>
            <AppBarTab tabTitle="My Reviews" slug="/userReviews"/>
            <Logout /> 
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;