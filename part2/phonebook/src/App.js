import { useState } from "react";

function App() {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [contacts, setContacts] = useState([]);
  const onNameChange = (e) => {
    const input = e.target.value;
    setNewName(input);
  };
  const onNumberChange = (e) => {
    const input = e.target.value;
    setNewNumber(input);
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
  return (
    <div>
      <h1>PhoneBook</h1>
      <form onSubmit={onAdd}>
        <label htmlFor="name">Name</label>
        <input value={newName} onChange={onNameChange} id="name" type="text" />
        <label htmlFor="number">Number</label>
        <input value={newNumber} onChange={onNumberChange} id="number" />
        <button type="submit">Add</button>
      </form>
      <h3>Numbers</h3>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.name}>
            {contact.name}
            {contact.number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
