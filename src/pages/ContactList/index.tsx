import { useState } from "react";
import { useQuery } from "@apollo/client";

import {
  styContactListContainer,
  styContactListListContainer,
  styContactListNavigation,
  styContactListNavigationButton,
  styContactListPagination,
  styContactListSearchContainer,
  styContactListSearchInput,
} from "./style";
import List from "../../components/List";
import { GET_CONTACT_LIST } from "../../helpers/graphql/queries";

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phones: {
    number: string;
  }[];
}

function ContactList() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { loading, data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: 10,
      offset: page * 10,
      where: search
        ? {
            _or: [
              { first_name: { _ilike: `%${search}%` } },
              { last_name: { _ilike: `%${search}%` } },
            ],
          }
        : {},
    },
  });

  const listContact: Contact[] = data?.contact || [];

  const handlePagination = (type: string) => {
    switch (type) {
      case "next":
        setPage(page + 1);
        break;
      case "prev":
        setPage(page - 1);
        break;
    }
  };

  return (
    <aside css={styContactListContainer}>
      <nav css={styContactListNavigation}>
        <h1>Contacts</h1>
        <button css={styContactListNavigationButton}>Add</button>
      </nav>
      <section css={styContactListSearchContainer}>
        <input
          css={styContactListSearchInput}
          type="search"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      {loading && <p>Loading...</p>}
      {!loading && data && (
        <section css={styContactListListContainer}>
          {listContact.map((contact) => (
            <List
              key={contact?.id}
              name={contact?.first_name + " " + contact?.last_name}
              phoneNumber={contact.phones[0].number}
            />
          ))}
        </section>
      )}
      <section css={styContactListPagination}>
        <button disabled={page === 0} onClick={() => handlePagination("prev")}>
          Prev
        </button>
        <p>{page + 1}</p>
        <button
          disabled={listContact.length < 10}
          onClick={() => handlePagination("next")}
        >
          Next
        </button>
      </section>
    </aside>
  );
}

export default ContactList;
