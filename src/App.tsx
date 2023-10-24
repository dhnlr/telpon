import ContactProvider from "./contexts/List";
import ContactList from "./pages/ContactList";

function App() {
  return (
    <>
      <ContactProvider>
        <ContactList />
      </ContactProvider>
    </>
  );
}

export default App;
