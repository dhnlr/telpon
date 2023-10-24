import { Contact } from "../../types";
import Avatar from "../Avatar";
import {
  styListContainer,
  styListDetailContainer,
  styListParagraph,
} from "./style";

interface ListProps {
  contact: Contact;
  handleClick?: (value: Contact) => void;
}

function List({ contact, handleClick = () => {} }: ListProps) {
  return (
    <div css={styListContainer} onClick={() => handleClick(contact)}>
      <Avatar initial={contact?.first_name[0]} />
      <div css={styListDetailContainer}>
        <p css={styListParagraph}>
          {contact?.first_name + " " + contact?.last_name}
        </p>
        <p css={styListParagraph}>{contact?.phones[0]?.number}</p>
      </div>
    </div>
  );
}

export default List;
