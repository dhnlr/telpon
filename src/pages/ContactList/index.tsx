import { useState } from "react";

import ContactListDetail from "../ContactDetail";
import ContactListSidebar from "./ContactSidebar";
import { Contact } from "../../types";
import { styContactListContainer } from "./style";
import ContactForm from "../ContactForm";

function ContactList() {
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
  const [editedContact, setEditedContact] = useState<Contact | undefined>();
  const [isForm, setIsForm] = useState<boolean>();

  const handleSetDetail = (contact: Contact) => {
    setSelectedContact(contact);
    setIsForm(false);
  };

  const handleSetEdit = (contact: Contact) => {
    setEditedContact(contact);
    setIsForm(true);
  };

  const handleSetForm = () => {
    setSelectedContact(undefined);
    setIsForm(true);
  };

  const handleBack = () => {
    setIsForm(false);
    setEditedContact(undefined);
    setSelectedContact(undefined)
  };

  return (
    <main css={styContactListContainer}>
      <ContactListSidebar
        isShow={!!selectedContact?.id || isForm}
        handleClickContact={handleSetDetail}
        handleClickAdd={handleSetForm}
      />
      {selectedContact && !isForm && !editedContact?.id && (
        <ContactListDetail
          contact={selectedContact}
          handleEdit={handleSetEdit}
          handleBack={handleBack}
        />
      )}
      {(isForm || editedContact?.id) && (
        <ContactForm
          contact={editedContact}
          handleBack={handleBack}
        />
      )}
    </main>
  );
}

export default ContactList;
