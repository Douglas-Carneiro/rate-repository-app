import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as Linking from 'expo-linking';

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    paddingBottom: 5
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
  imgContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
  },
  subtitle: {
    width: 260,
    paddingVertical: 5
  },
  languageTag: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
});

const CardHeader = ({ imgUrl, repoTitle, description, language }) => {
  return (
    <View testID="repoHeader" style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.imgContainer}>
        <Image testID="repoImg" style={cardHeaderStyles.img} source={{
          uri: imgUrl,
        }}/>
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text testID="repoTitle" fontWeight="bold" fontSize="subheading">{repoTitle}</Text>
        <Text testID="repoDescription" color="textSecondary" style={cardHeaderStyles.subtitle}>{description}</Text>
        <View style={cardHeaderStyles.languageTag}>
          <Text testID="repoLanguage" style={{color: 'white'}}>{language}</Text>
        </View>
      </View>
    </View>
  );
};

const cardFooterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  actionTouchable: {
    flexGrow: 0,
  },
  actionText: {
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 20,
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
  }
});

const CardFooterInfo = ({ metric, quantity }) => {
  return (
    <View testID="repoFooter" style={cardFooterStyles.actionTouchable} >
      <Text fontWeight="bold" fontSize="subheading">{quantity}</Text>
      <Text color="textSecondary">{metric}</Text>
    </View>
  );
};

const CardFooter = ({ stars, forks, reviews, rating }) => {
  const formattedStars = stars/1000 >= 1 ? `${(Math.round((stars/1000) * 100) / 100).toFixed(1)}k` : stars;
  const formattedForks = forks/1000 >= 1 ? `${(Math.round((forks/1000) * 100) / 100).toFixed(1)}k` : forks;
  return (
    <View style={cardFooterStyles.container}>
      <CardFooterInfo metric="Stars" quantity={formattedStars}/>
      <CardFooterInfo metric="Forks" quantity={formattedForks}/>
      <CardFooterInfo metric="Reviews" quantity={reviews}/>
      <CardFooterInfo metric="Rating" quantity={rating}/>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'white',
    padding: 10
  },
});


const RepositoryItem = ({ repository }) => (
  <View style={cardStyles.container}>
    <CardHeader imgUrl={repository.ownerAvatarUrl} repoTitle={repository.fullName} description={repository.description} language={repository.language}/>
    <CardFooter stars={repository.stargazersCount} forks={repository.forksCount} reviews={repository.reviewCount} rating={repository.ratingAverage} />
    {repository.url ? 
      <Pressable style={cardFooterStyles.buttonContainer} onPress={() => {Linking.openURL(repository.url);}}>
        <Text style={cardFooterStyles.button}>Open in Github</Text>
      </Pressable> :
      null
    }
  </View>
);

export default RepositoryItem;