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
        id
        number
      }
    }
  }
`);

export const CREATE_CONTACT = gql(`
  mutation CreateContact(
    $first_name: String!, 
    $last_name: String!, 
    $phones: [phone_insert_input!]!
  ) {
    insert_contact_one(
      object: {
        first_name: $first_name, 
        last_name: $last_name, 
        phones: { 
          data: $phones
        }
      }
    ) {
      id
    }
  }`
);

export const DELETE_CONTACT = gql(`
  mutation DeleteContact ( $id: Int! ) {
    delete_contact_by_pk( id: $id ){
      id
    }
  }
`);

export const UPDATE_CONTACT_USER = gql`
  mutation UpdateContactUser(
    $id: Int!, 
    $_set: contact_set_input
  ) {
    update_contact_by_pk(
      pk_columns: { id: $id }, 
      _set: $_set
    ) {
      id
    }
  }
`;

export const UPDATE_CONTACT_PHONE = gql`
mutation UpdateContactPhone(
  $where: phone_bool_exp!
  $phone: String!
) {
  update_phone(
    where: $where
    _set: { number: $phone }
  ) {
    return {
      id
    }
  }
}
`;
