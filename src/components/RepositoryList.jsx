import React from 'react';
import useRepositories from '../hooks/useRepositories';

import { FlatList, View, StyleSheet, SafeAreaView } from 'react-native';
import RepositoryItem from './RepositoryItem';

import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
  list: {
    backgroundColor: theme.colors.mainScreenBgColor,
    flex: 1,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  
  const renderItem = ({ item }) => (
    <RepositoryItem repository={item} />
  );
  return (
    <SafeAreaView style={styles.list}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={<View style={{height: 20}}/>}
        ListFooterComponent={<View style={{height: 20}}/>}
      />
    </SafeAreaView>
  );
};

export default RepositoryList;