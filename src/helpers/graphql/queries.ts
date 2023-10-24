import { gql } from "@apollo/client";

export const CONTACT_LIST = gql(`
query GetContactList (
    $limit: Int, 
    $offset: Int,
    $where: contact_bool_exp, 
) {
  contact(
      limit: $limit, 
      offset: $offset,
      where: $where 
  ){
    created_at
    first_name
    id
    last_name
    phones {
      number
    }
  }
}
`);