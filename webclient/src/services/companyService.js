import { gql } from '@apollo/client';

export const GET_COMPANIES = gql`
  query GET_COMPANIES {
    investment(limit: 1000, order_by: { company: { id: asc } }) {
      investor {
        name
      }
      company {
        id
        name
      }
    }
  }
`;
