import { useContext, useState } from "react";

import {
  styContactListContainer,
  styContactListListContainer,
  styContactListNavigation,
  styContactListNavigationButtonAdd,
  styContactListNavigationButtonFav,
} from "./style";
import List from "../../components/List";
import { Contact } from "../../types";
import { ContactContext } from "../../contexts/List";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

function ContactList() {
  const {
    data,
    loading,
    favoriteData,
    handleFavorite,
  } = useContext(ContactContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const listContact: Contact[] = data?.contact || [];

  const handleSetFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <aside css={styContactListContainer}>
      <nav css={styContactListNavigation}>
        <h1>{isFavorite ? "Favorites" : "Contacts"}</h1>
        <button
          css={styContactListNavigationButtonFav}
          onClick={handleSetFavorite}
        >
          {isFavorite ? "Reg" : "Fav"}
        </button>
        <button css={styContactListNavigationButtonAdd}>Add</button>
      </nav>
      {!isFavorite && <Search />}
      {loading && <p>Loading...</p>}
      {!loading && data && (
        <section css={styContactListListContainer}>
          {!isFavorite &&
            listContact.map((contact) => (
              <List
                key={contact?.id}
                contact={contact}
                handleClick={handleFavorite}
              />
            ))}
          {isFavorite &&
            favoriteData.map((contact) => (
              <List
                key={contact?.id}
                contact={contact}
              />
            ))}
        </section>
      )}
      {!isFavorite && <Pagination />}
    </aside>
  );
}

export default ContactList;
