import { gql } from '@apollo/client';

export const GET_INVESTMENT = (id) => gql`
query GET_INVESTMENT {
  investment(distinct_on: company_id, where: {investor_id: {_eq: ${id}}}) {
    investor {
      id
      name
      photo_large
    }
    amount
    company {
      name
      id
    }
  }
  investment_aggregate {
    aggregate {
      sum {
        amount
      }
    }
  }
}`;
