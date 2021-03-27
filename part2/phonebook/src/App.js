import { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import Contacts from "./Contacts";
import SearchForm from "./SearchForm";
import service from "./services/persons";
import axios from "axios";
import Notification from "./Notification";
function App() {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorColor, setErrorColor] = useState("Green");

  useEffect(() => {
    axios.get("/api/persons").then((res) => {
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
    const contactFound = contacts.find((contact) => contact.name === newName);
    if (contactFound) {
      const answer = window.confirm(
        `${newName} already exists do you want to replace the old number with the new one?`
      );
      if (answer) {
        const newObject = { ...contactFound, number: newNumber };
        service
          .updateNumber(newObject)
          .then((person) => {
            const newList = contacts.map((contact) =>
              contact.id === person.id ? person : contact
            );
            setErrorMessage("Number updated");
            setTimeout(() => setErrorMessage(""), 5000);
            setContacts(newList);
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            setErrorMessage(`${newName} is not found`);
            setErrorColor("Red");
            setTimeout(() => {
              setErrorMessage("");
              setErrorColor("Green");
            }, 5000);
            const updatedList = contacts.filter(
              (contact) => contact.name !== newName
            );
            setContacts(updatedList);
          });
      }
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
    setNewNumber("");
    setErrorMessage("Contact added");
    setTimeout(() => setErrorMessage(""), 5000);
  };
  const onDelete = ({ id, name }) => {
    const answer = window.confirm(` do you really want to delete ${name}?`);
    if (answer) {
      console.log("here");
      service
        .removePerson(id)
        .then(() => {
          console.log("newlist");

          const newList = contacts.filter((contact) => contact.id !== id);
          setContacts(newList);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div>
      <h1>PhoneBook</h1>
      <Notification error={errorMessage} errorColor={errorColor} />
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
      <Contacts
        contacts={searchTerm ? filteredContacts : contacts}
        onDelete={onDelete}
      />
    </div>
  );
}

export default App;
