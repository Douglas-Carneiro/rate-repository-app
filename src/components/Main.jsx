import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import NewReview from './NewReview';
import AddUser from './AddUser';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/login" exact>
          <SignIn />
        </Route>
        <Route path="/review" exact>
          <NewReview />
        </Route>
        <Route path="/signUp" exact>
          <AddUser />
        </Route>
        <Route path="/userReviews" exact>
          <UserReviews />
        </Route>
        <Route path="/:id" exact>
          <SingleRepository />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;