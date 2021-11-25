import React from 'react';
import { RepositoryListContainer } from '../../components/RepositoryList';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      console.log('Size of elements array: ', getAllByTestId('repoHeader').length);
      console.log('Size of elements array: ', getAllByTestId('repoFooter').length);

      expect(getAllByTestId('repoHeader')[0]).toHaveTextContent('jaredpalmer/formik');
      expect(getAllByTestId('repoHeader')[0]).toHaveTextContent('Build forms in React, without the tears');
      expect(getAllByTestId('repoHeader')[0]).toHaveTextContent('TypeScript');
      
      expect(getAllByTestId('repoFooter')[0]).toHaveTextContent('21.9k');
      expect(getAllByTestId('repoFooter')[1]).toHaveTextContent('1.6k');
      expect(getAllByTestId('repoFooter')[2]).toHaveTextContent('3');
      expect(getAllByTestId('repoFooter')[3]).toHaveTextContent('88');

      expect(getAllByTestId('repoHeader')[1]).toHaveTextContent('async-library/react-async');
      expect(getAllByTestId('repoHeader')[1]).toHaveTextContent('Flexible promise-based React data loader');
      expect(getAllByTestId('repoHeader')[1]).toHaveTextContent('JavaScript');

      expect(getAllByTestId('repoFooter')[4]).toHaveTextContent('1.8k');
      expect(getAllByTestId('repoFooter')[5]).toHaveTextContent('69');
      expect(getAllByTestId('repoFooter')[6]).toHaveTextContent('3');
      expect(getAllByTestId('repoFooter')[7]).toHaveTextContent('72');
    });
  });
});