import { useState } from "react";
import ContactForm from "./ContactForm";
import Contacts from "./Contacts";
import SearchForm from "./SearchForm";

function App() {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [contacts, setContacts] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const onNameChange = (e) => {
    const input = e.target.value;
    setNewName(input);
  };
  const onNumberChange = (e) => {
    const input = e.target.value;
    setNewNumber(input);
  };
  const onSearch = (e) => {
    const input = e.target.value;
    setSearchTerm(input);
  };
  const onAdd = (e) => {
    e.preventDefault();
    // console.log(contacts.find((contact) => contact.name === newContact));
    if (contacts.find((contact) => contact.name === newName)) {
      alert(`${newName} already exists`);
      return;
    }
    const contactObject = {
      name: newName,
      number: newNumber,
    };
    setContacts(contacts.concat(contactObject));
    setNewName("");
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  return (
    <div>
      <h1>PhoneBook</h1>
      {/* Search */}
      <h1>Search</h1>
      <SearchForm searchTerm={searchTerm} onSearch={onSearch} />
      <h1>Add new Contact</h1>
      <ContactForm
        onAdd={onAdd}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      {/*  View Numbers */}
      <h3>Numbers</h3>
      <Contacts contacts={searchTerm ? filteredContacts : contacts} />
    </div>
  );
}

export default App;
