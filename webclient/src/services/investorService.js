import { gql } from '@apollo/client';

export const GET_INVESTORS = gql`
  query MyQuery {
    investment(limit: 10000) {
      company {
        name
      }
      investor {
        id
        name
        photo_thumbnail
      }
    }
  }
`;
