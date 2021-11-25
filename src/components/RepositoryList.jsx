import React, { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';

import { FlatList, View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useHistory } from "react-router-native";
import theme from '../theme';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from "use-debounce";

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

export const RepositoryListContainer = ({ repositories, refetch, onEndReach }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  let history = useHistory();
  const [orderPrinciple, setOrderPrinciple] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedsSearchQuery] = useDebounce(searchQuery, 500);

  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    switch (orderPrinciple) {
      case 'LATEST':
        refetch({ orderBy: "CREATED_AT", orderDirection: "DESC" });
        break;
      case 'HIGHEST_RATED':
        refetch({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" });
        break;
      case 'LOWEST_RATED':
        refetch({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" });
        break;
      default: break;
    }
  }, [orderPrinciple]);

  useEffect(() => {
    if(debouncedsSearchQuery) {
      refetch({ searchKeyword: debouncedsSearchQuery });
    } else {
      refetch({ searchKeyword: "" });
    }
  }, [debouncedsSearchQuery]);

  const renderItem = ({ item }) => (
    <Pressable onPress={() => { history.push(`/${item.id}`); }} >
      <RepositoryItem repository={item} />
    </Pressable>
  );
  return (
    <SafeAreaView style={styles.list}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={{paddingVertical: 20, paddingHorizontal: 30}}>
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={{ marginBottom: 20}}
            />
            <Picker
              selectedValue={orderPrinciple}
              onValueChange={(itemValue) =>
                setOrderPrinciple(itemValue)
              }>
              <Picker.Item label="Latest respositories" value="LATEST" />
              <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
              <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />  
            </Picker>
          </View>
        }
        ListFooterComponent={<View style={{height: 20}}/>}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const RepositoryList = () => {
  const { repositories, fetchMore, refetch } = useRepositories({
    first: 8,
  });
  
  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      refetch={refetch} 
      onEndReach={onEndReach} />
  );
};

export default RepositoryList;