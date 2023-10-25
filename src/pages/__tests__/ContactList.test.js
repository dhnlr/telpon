import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  findByText,
} from "@testing-library/react";
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
  {
    delay: 30,
    request: {
      query: CONTACT_LIST,
      variables: {
        where: {
          _or: [{ first_name: { _ilike: "" } }, { last_name: { _ilike: "" } }],
        },
      },
    },
    result: {
      data: {
        contact: [{
          id: 1,
          contact1d: 1,
          first_name: "Anak",
          last_name: "Gembala",
          phones: [{ id: 1, number: "134567890" }],
        }],
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
  it("Should render contact detail properly", async () => {
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

  it("Should validate contact form properly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContactProvider>
          <ContactList />
        </ContactProvider>
      </MockedProvider>
    );
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(await screen.findAllByText("Anak Gembala")).toHaveLength(10);
    const add = screen.getByText("Add");
    fireEvent.click(add);
    expect(await screen.findByText("🔙 Back")).toBeInTheDocument();
    expect(await screen.findByText("💾 Save")).toBeInTheDocument();

    fireEvent.click(await screen.findByText("💾 Save"));
    expect(
      await screen.findByText("First name should be unique")
    ).toBeInTheDocument();
    const firstName = await screen.findByLabelText("First Name");
    fireEvent.change(firstName, {
      target: {
        value: "#",
      },
    });
    expect(
      await screen.findByText("First name should only alphabetical")
    ).toBeInTheDocument();
    fireEvent.change(firstName, {
      target: {
        value: "",
      },
    });
    expect(
      await screen.findByText("First name should not be empty")
    ).toBeInTheDocument();

    const phoneNumber = await screen.findByLabelText("Phone Number");
    fireEvent.change(phoneNumber, {
      target: {
        value: "#",
      },
    });
    expect(
      await screen.findByText("Phone number should only numeric")
    ).toBeInTheDocument();
    fireEvent.change(phoneNumber, {
      target: {
        value: "",
      },
    });
    expect(
      await screen.findByText("Phone number should not be empty")
    ).toBeInTheDocument();

    fireEvent.click(await screen.findByText("❌"));
    expect(screen.queryAllByLabelText("Phone Number")).toHaveLength(0);
    fireEvent.click(await screen.findByText("Add Phone Number"));
    expect(await screen.findAllByLabelText("Phone Number")).toHaveLength(1);
  });
});
