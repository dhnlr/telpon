import {useContext} from 'react'

import Avatar from "../../components/Avatar";
import { Contact } from "../../types";
import {
  styContactListDetailButton,
  styContactListDetailContainer,
  styContactListDetailContent,
} from "./style";
import { ContactContext } from '../../contexts/List';

interface ContactListDetailProps {
  contact: Contact;
  handleBack: (value: Contact | null) => void;
}

function ContactListDetail({ contact, handleBack }: ContactListDetailProps) {
  const { favorite, handleFavorite } = useContext(ContactContext);
  const isFavorite = favorite.includes(contact?.id)

  return (
    <div css={styContactListDetailContainer}>
      <div css={styContactListDetailButton}>
        <button onClick={() => handleBack(null)}>Back</button>
        <div>
          <button onClick={() => handleFavorite(contact)}>{isFavorite ? 'Unfavorite': 'Favorite'}</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
      <article css={styContactListDetailContent}>
        <Avatar initial={contact?.first_name[0]} />
        <div>
          <h2>{contact?.first_name + " " + contact?.last_name}</h2>
          {contact?.phones.map((phone) => (
            <p>{phone?.number}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

export default ContactListDetail;
