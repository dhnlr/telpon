import {useContext} from 'react'
import { ContactContext } from '../../contexts/List';
import { styContactListSearchContainer, styContactListSearchInput } from './style';
function Search() {
    const {
        search,
    setSearch,
      } = useContext(ContactContext);

      return (<section css={styContactListSearchContainer}>
        <input
          css={styContactListSearchInput}
          type="search"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>)
}

export default Search