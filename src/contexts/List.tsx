import { useState, useEffect, createContext, ReactNode } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { CONTACT_LIST, DELETE_CONTACT } from "../helpers/graphql/queries";
import { Contact } from "../types";

interface ContactCtx {
  loading: boolean;
  data: any;
  page: number;
  setPage: (value: number) => void;
  search: string;
  setSearch: (value: string) => void;
  favorite: number[];
  favoriteData: Contact[];
  setFavorite: (value: number[]) => void;
  setFavoriteData: (value: Contact[]) => void;
  handlePagination: (value: string) => void;
  handleFavorite: (value: Contact) => void;
  handleDelete: (value: Contact) => void;
}

interface ContactProviderProps {
  children: string | ReactNode;
}

interface WhereQuery {
  _or:
    | {
        [key: string]: { _ilike: string };
      }[]
    | undefined;
  id:
    | {
        _nin: number[];
      }
    | undefined;
}

export const ContactContext = createContext<ContactCtx>({
  loading: false,
  data: null,
  page: 0,
  setPage: () => {},
  search: "",
  setSearch: () => {},
  favorite: [],
  favoriteData: [],
  setFavorite: () => {},
  setFavoriteData: () => {},
  handlePagination: () => {},
  handleFavorite: () => {},
  handleDelete: () => {},
});

const ContactProvider = ({ children }: ContactProviderProps) => {
  const [deleteContactById] = useMutation(DELETE_CONTACT, {
    refetchQueries: [CONTACT_LIST, "GetContactList"],
  });

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

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

  const [favorite, setFavorite] = useState<number[]>([]);
  const [favoriteData, setFavoriteData] = useState<Contact[]>([]);

  const handleFavorite = (contact: Contact) => {
    setFavorite((prev) => {
      let newFavorite = null;
      if (prev.includes(contact?.id)) {
        newFavorite = prev.filter((p) => p !== contact?.id);
      } else {
        newFavorite = [...prev, contact?.id];
      }
      localStorage.setItem("favorite", JSON.stringify(newFavorite));
      return newFavorite;
    });
    setFavoriteData((prev) => {
      let newFavoriteData = null;
      if (prev.some((p) => p.id === contact?.id)) {
        newFavoriteData = prev.filter(({ id }) => id !== contact?.id);
      } else {
        newFavoriteData = [...prev, contact];
      }
      localStorage.setItem("favoriteData", JSON.stringify(newFavoriteData));
      return newFavoriteData;
    });
  };

  const handleDelete = (contact: Contact) => {
    deleteContactById({
      variables: {
        id: contact?.id,
      },
    });
    if (favorite.includes(contact?.id)) {
      handleFavorite(contact);
    }
  };

  let whereQuery: WhereQuery = {
    _or: undefined,
    id: undefined,
  };
  if (search !== "") {
    whereQuery["_or"] = [
      { first_name: { _ilike: `%${search}%` } },
      { last_name: { _ilike: `%${search}%` } },
    ];
  }
  if (favorite.length > 0) {
    whereQuery["id"] = { _nin: favorite };
  }
  const { loading, data } = useQuery(CONTACT_LIST, {
    fetchPolicy: "network-only",
    variables: {
      limit: 10,
      offset: page * 10,
      where: whereQuery,
    },
  });

  const getFromLocalStorage = () => {
    const favorite = localStorage["favorite"]
      ? JSON.parse(localStorage["favorite"])
      : [];
    const favoriteData = localStorage["favoriteData"]
      ? JSON.parse(localStorage["favoriteData"])
      : [];
    setFavorite(favorite);
    setFavoriteData(favoriteData);
  };

  useEffect(() => {
    getFromLocalStorage();
  }, []);

  const valueProps = {
    loading,
    data,
    page,
    setPage,
    search,
    setSearch,
    favorite,
    favoriteData,
    setFavorite,
    setFavoriteData,
    handlePagination,
    handleFavorite,
    handleDelete,
  };

  return (
    <ContactContext.Provider value={valueProps}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
