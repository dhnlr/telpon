import { useState } from "react";

import ContactListDetail from "../ContactDetail";
import ContactListSidebar from "./ContactSidebar";
import { Contact } from "../../types";
import { styContactListContainer } from "./style";
import ContactForm from "../ContactForm";

function ContactList() {
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
  const [isForm, setIsForm] = useState<boolean>();

  const handleSetDetail = (contact: Contact) => {
    setSelectedContact(contact)
    setIsForm(false)
  }
  const handleSetForm = () => {
    setSelectedContact(undefined);
    setIsForm(true);
  };
  return (
    <main css={styContactListContainer}>
      <ContactListSidebar
        isShow={!!selectedContact?.id || isForm}
        handleClickContact={handleSetDetail}
        handleClickAdd={handleSetForm}
      />
      {selectedContact && !isForm && (
        <ContactListDetail
          contact={selectedContact}
          handleBack={setSelectedContact}
        />
      )}
      {isForm && (
        <ContactForm
          contact={selectedContact}
          handleBack={() => setIsForm(false)}
        />
      )}
    </main>
  );
}

export default ContactList;
