import Avatar from "../Avatar";
import {
  styListContainer,
  styListDetailContainer,
  styListParagraph,
} from "./style";

interface ListProps {
  name: string;
  phoneNumber: string;
}

function List({ name, phoneNumber }: ListProps) {
  return (
    <div css={styListContainer}>
      <Avatar initial={name[0]} />
      <div css={styListDetailContainer}>
        <p css={styListParagraph}>{name}</p>
        <p css={styListParagraph}>{phoneNumber}</p>
      </div>
    </div>
  );
}

export default List;
