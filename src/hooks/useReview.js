import { useMutation } from '@apollo/client';
import { CREATE_REVIEW, DELETE_REVIEW } from '../graphql/mutations';

const useReview = () => {

  const [mutate, result] = useMutation(CREATE_REVIEW);
  const [deletion, result2] = useMutation(DELETE_REVIEW);


  const createNewReview = async ({ username, repositoryName, rating, review }) => {
    const ratingValue = Number(rating);
    const { data } = await mutate({ variables: { repositoryName, ownerName: username, rating: ratingValue, text: review } });

    return data;
  };

  const deleteReview = async ({ id }) => {
    console.log('Received id: ', id);
    const { data } = await deletion({ variables: { id } });

    return data;
  };

  return [createNewReview, deleteReview, result, result2];
};

export default useReview;