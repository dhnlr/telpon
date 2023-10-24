import { useState, useEffect, createContext, ReactNode } from "react";
import { useQuery } from "@apollo/client";

import { CONTACT_LIST } from "../helpers/graphql/queries";
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
  handlePagination: (value: string) => void;
  handleFavorite: (value: Contact) => void;
}

interface ContactProviderProps {
  children: string | ReactNode;
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
  handlePagination: () => {},
  handleFavorite: () => {},
});

const ContactProvider = ({ children }: ContactProviderProps) => {
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
      const newFavorite = [...prev, contact?.id];
      localStorage.setItem("favorite", JSON.stringify(newFavorite));
      return newFavorite;
    });
    setFavoriteData((prev) => {
      const newFavoriteData = [...prev, contact];
      localStorage.setItem("favoriteData", JSON.stringify(newFavoriteData));
      return newFavoriteData;
    });
  };

  let whereQuery: {
    _or: any;
    id: any;
  } = {
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
    variables: {
      limit: 10,
      offset: page * 10,
      where: whereQuery,
    },
  });

  const getFromLocalStorage = () => {
    const favorite = localStorage["favorite"]? JSON.parse(localStorage["favorite"]) : [];
    const favoriteData = localStorage["favoriteData"] ? JSON.parse(localStorage["favoriteData"]) : [];
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
    handlePagination,
    handleFavorite,
  };

  return (
    <ContactContext.Provider value={valueProps}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
