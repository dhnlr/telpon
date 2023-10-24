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
    id
    first_name
    last_name
    phones {
      number
    }
  }
}
`);

export const DELETE_CONTACT = gql(`
mutation DeleteContact ( $id: Int! ) {
  delete_contact_by_pk( id: $id ){
    id
  }
}
`);
