import React from 'react';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import RepositoryItem from '../components/RepositoryItem';
import { StyleSheet, View, FlatList, SafeAreaView }from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';

const reviewStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: 'white'
  },
  rating: {
    fontWeight: '700',
    color: theme.colors.primary
  },
  ratingContainer: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    width: 45,
    height: 45,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: theme.colors.primary
  },
  infoContainer: {
    flexGrow: 1,
  },
  subtitle: {
    width: 260,
    paddingVertical: 5
  },
  reviewBody: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    borderRadius: 5,
    width: 275
  },
  separator: {
    height: 12,
  },
  list: {
    backgroundColor: theme.colors.mainScreenBgColor,
    flex: 1,
  }
});

const ReviewItem = ({ review }) => {
  return (
    <View style={reviewStyles.container}>
      <View style={reviewStyles.ratingContainer}>
        <Text style={reviewStyles.rating} fontSize="subheading">{review.rating}</Text>
      </View>
      <View style={reviewStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
        <Text color="textSecondary" style={reviewStyles.subtitle}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <View style={reviewStyles.reviewBody}>
          <Text fontSize="body">{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={reviewStyles.separator} />;

const SingleRepository = () => {
  let { id } = useParams();
  console.log('ID: ', id);
  const { repository, fetchMore } = useRepository({ id, first: 2 });

  if (!repository) {
    return <Text>Repository not found</Text>;
  }

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };
  
  return (
    <SafeAreaView style={reviewStyles.list}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryItem repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={<View style={{height: 20}}/>}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
    
  );
};

export default SingleRepository;