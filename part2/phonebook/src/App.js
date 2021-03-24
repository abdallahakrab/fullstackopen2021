import { useState } from "react";

function App() {
  const [newContact, setNewContact] = useState("");
  const [contacts, setContacts] = useState([]);
  const onChange = (e) => {
    const input = e.target.value;
    setNewContact(input);
  };
  const onAdd = (e) => {
    e.preventDefault();
    // console.log(contacts.find((contact) => contact.name === newContact));
    if (contacts.find((contact) => contact.name === newContact)) {
      alert(`${newContact} already exists`);
      return;
    }
    const contactObject = {
      name: newContact,
    };
    setContacts(contacts.concat(contactObject));
    setNewContact("");
  };
  return (
    <div>
      <h1>PhoneBook</h1>
      <form onSubmit={onAdd}>
        <label htmlFor="new">Add:</label>
        <input value={newContact} onChange={onChange} id="new" type="text" />
        <button type="submit">Add</button>
      </form>
      <h3>Numbers</h3>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.name}>{contact.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
