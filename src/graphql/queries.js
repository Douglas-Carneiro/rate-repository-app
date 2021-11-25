import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query(
  $orderBy: AllRepositoriesOrderBy, 
  $orderDirection: OrderDirection, 
  $searchKeyword: String,
  $first: Int,
  $after: String
  ){
  repositories(
    orderBy: $orderBy, 
    orderDirection: $orderDirection, 
    searchKeyword: $searchKeyword,
    first: $first,
    after: $after
    ) {
    totalCount
    edges {
      node {
        id
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        forksCount
        ownerAvatarUrl
        description
        language
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
`;

export const GET_REPOSITORY = gql`
query($id: ID!, $first: Int, $after: String) {
  repository(id: $id) {
    id
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    ownerAvatarUrl
    description
    language
    url
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`;

export const GET_AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

// I was getting a weird error using include in the query,
// so I decided to use two different queries
export const GET_AUTHORIZED_USER_AND_REVIEWS = gql`
  query {
    authorizedUser {
      id
      username
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              fullName
              id
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;