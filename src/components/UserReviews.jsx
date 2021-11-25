import React from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, Pressable, Alert }from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';
import { GET_AUTHORIZED_USER_AND_REVIEWS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useHistory } from "react-router-native";

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
  },
  buttonContainer: {
    marginTop: 20,
    marginLeft: -50,
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
  },
  redButton: {
    textAlign: 'center',
    borderRadius: 5,
    flexGrow: 1,
    height: 60,
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    backgroundColor: theme.colors.errorColor,
    padding: 16,
  }
});

const ReviewItem = ({ review, handleDelete, history }) => {
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: async () => await handleDelete(review.id) }
      ]
    );

  return (
    <View style={reviewStyles.container}>
      <View style={reviewStyles.ratingContainer}>
        <Text style={reviewStyles.rating} fontSize="subheading">{review.rating}</Text>
      </View>
      <View style={reviewStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{review.repository.fullName}</Text>
        <Text color="textSecondary" style={reviewStyles.subtitle}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <View style={reviewStyles.reviewBody}>
          <Text fontSize="body">{review.text}</Text>
        </View>
        <View style={reviewStyles.buttonContainer}>
          <Pressable style={{marginRight: 10}}  onPress={() => {history.push(`/${review.repository.id}`);}}>
            <Text style={reviewStyles.button}>View Repository</Text>
          </Pressable>
          <Pressable  onPress={createTwoButtonAlert}>
            <Text style={reviewStyles.redButton}>Delete Review</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={reviewStyles.separator} />;

const UserReviews = () => {
  const { data, refetch } = useQuery(GET_AUTHORIZED_USER_AND_REVIEWS);
  const [mutation] = useMutation(DELETE_REVIEW);

  let history = useHistory();

  if ( data.authorizedUser === null ) {
    history.push('/');
    return null;
  }

  const reviews = data.authorizedUser.reviews
    ? data.authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];
  
  const handleDelete = async ( id ) => {
    
    const { data } = await mutation({ variables: { id } });

    if (data.deleteReview === true) {
      refetch();
    }
  };

  return (
    <SafeAreaView style={reviewStyles.list}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} handleDelete={handleDelete} history={history} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={<View style={{height: 20}}/>}
      />
    </SafeAreaView>
    
  );
};

export default UserReviews;