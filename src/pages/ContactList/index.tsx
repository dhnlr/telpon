import {  useState } from "react";

import ContactListDetail from "./ContactDetail";
import ContactListSidebar from "./ContactSidebar";
import { Contact } from "../../types";
import { styContactListContainer } from "./style";

function ContactList() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  return (
    <main css={styContactListContainer}>
      <ContactListSidebar selectedContact={selectedContact} handleClickContact={setSelectedContact}/>
      {selectedContact && <ContactListDetail contact={selectedContact} handleBack={setSelectedContact}/>}
    </main>
  );
}

export default ContactList;
