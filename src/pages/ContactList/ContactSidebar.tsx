import { useContext, useState } from "react";

import {
  styContactListSidebarContainer,
  styContactListSidebarListContainer,
  styContactListSidebarNavigation,
  styContactListSidebarNavigationButtonAdd,
  styContactListSidebarNavigationButtonFav,
} from "./style";
import List from "../../components/List";
import { Contact } from "../../types";
import { ContactContext } from "../../contexts/List";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

interface ContactListSidebarProps {
  isShow: boolean | undefined;
  handleClickContact: (value: Contact) => void;
  handleClickAdd: () => void;
}

function ContactListSidebar({
  isShow,
  handleClickContact,
  handleClickAdd,
}: ContactListSidebarProps) {
  const { data, loading, favoriteData } = useContext(ContactContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const listContact: Contact[] = data?.contact || [];

  const handleSetFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <aside css={styContactListSidebarContainer(!!isShow)}>
      <nav css={styContactListSidebarNavigation}>
        <h1>{isFavorite ? "Favorites" : "Contacts"}</h1>
        <button
          css={styContactListSidebarNavigationButtonFav}
          onClick={handleSetFavorite}
        >
          {isFavorite ? "Reg" : "Fav"}
        </button>
        <button
          css={styContactListSidebarNavigationButtonAdd}
          onClick={handleClickAdd}
        >
          Add
        </button>
      </nav>
      {!isFavorite && <Search />}
      {loading && <p>Loading...</p>}
      {!loading && data && (
        <section css={styContactListSidebarListContainer}>
          {!isFavorite &&
            listContact.map((contact) => (
              <List
                key={contact?.id}
                contact={contact}
                handleClick={handleClickContact}
              />
            ))}
          {isFavorite &&
            favoriteData.map((contact) => (
              <List
                key={contact?.id}
                contact={contact}
                handleClick={handleClickContact}
              />
            ))}
        </section>
      )}
      {!isFavorite && <Pagination />}
    </aside>
  );
}

export default ContactListSidebar;
