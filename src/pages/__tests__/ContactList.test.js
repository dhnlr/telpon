import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { CONTACT_LIST } from "../../helpers/graphql/queries";
import ContactList from "../ContactList";
import ContactProvider from "../../contexts/List";

const mocks = [
  {
    delay: 30,
    request: {
      query: CONTACT_LIST,
      variables: {
        limit: 10,
        offset: 0,
        where: {
          _or: undefined,
          id: undefined,
        },
      },
    },
    result: {
      data: {
        contact: Array.apply(null, Array(10)).map(function (_, i) {
          let mockcontact = {
            id: i,
            contactId: i,
            first_name: "Anak",
            last_name: "Gembala",
            phones: [{ id: i, number: "134567890" }],
          };
          return mockcontact;
        }),
      },
    },
  },
  {
    delay: 30,
    request: {
      query: CONTACT_LIST,
      variables: {
        limit: 10,
        offset: 10,
        where: {
          _or: undefined,
          id: undefined,
        },
      },
    },
    result: {
      data: {
        contact: Array.apply(null, Array(10)).map(function (_, i) {
          let mockcontact = {
            id: i,
            contactId: i,
            first_name: "Anak",
            last_name: "Gembala",
            phones: [{ id: i, number: "134567890" }],
          };
          return mockcontact;
        }),
      },
    },
  },
];

describe("ContactList", () => {
  it("Should render properly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContactProvider>
          <ContactList />
        </ContactProvider>
      </MockedProvider>
    );

    expect(screen.getByText("Contacts")).toBeInTheDocument();
    expect(screen.getByText("Fav")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findAllByText("Anak Gembala")).toHaveLength(10);
    expect(await screen.findAllByText("134567890")).toHaveLength(10);
  });
  it("Should handle pagination properly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContactProvider>
          <ContactList />
        </ContactProvider>
      </MockedProvider>
    );
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findAllByText("Anak Gembala")).toHaveLength(10);
    const nextButton = await screen.findByTestId("next");
    const prevButton = await screen.findByTestId("prev");
    expect(nextButton).toBeEnabled();
    expect(prevButton).toBeDisabled();
    fireEvent.click(nextButton);
    expect(await screen.findByText("2")).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
    expect(prevButton).toBeEnabled();
  });
  it("Should render detail contact properly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContactProvider>
          <ContactList />
        </ContactProvider>
      </MockedProvider>
    );
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findAllByText("Anak Gembala")).toHaveLength(10);
    const contact = await screen.findByTestId("contact-list-1");
    fireEvent.click(contact);
    expect(await screen.findByText("🔙 Back")).toBeInTheDocument();
    expect(await screen.findByText("🌟 Favorite")).toBeInTheDocument();
    expect(await screen.findByText("✏️ Edit")).toBeInTheDocument();
    expect(await screen.findByText("❌ Delete")).toBeInTheDocument();
  });
});
