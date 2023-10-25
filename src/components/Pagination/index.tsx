import { useContext } from "react";

import { ContactContext } from "../../contexts/List";
import { Contact } from "../../types";
import { styContactListPagination } from "./style";

function Pagination() {
  const { data, page, handlePagination } = useContext(ContactContext);
  const listContact: Contact[] = data?.contact || [];

  return (
    <section css={styContactListPagination}>
      <button
        data-testid="prev"
        disabled={page === 0}
        onClick={() => handlePagination("prev")}
      >
        Prev
      </button>
      <p>{page + 1}</p>
      <button
        data-testid="next"
        disabled={listContact.length < 10}
        onClick={() => handlePagination("next")}
      >
        Next
      </button>
    </section>
  );
}

export default Pagination;
