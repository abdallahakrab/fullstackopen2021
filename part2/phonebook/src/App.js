import { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import Contacts from "./Contacts";
import SearchForm from "./SearchForm";
import service from "./services/persons";
import axios from "axios";
function App() {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setContacts(res.data);
    });
  }, []);

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
    service
      .addPerson(contactObject)
      .then((person) => setContacts(contacts.concat(person)));

    // setContacts(contacts.concat(contactObject));
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
