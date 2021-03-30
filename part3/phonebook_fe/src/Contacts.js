import React from "react";
import Contact from "./Contact";
function Contacts({ contacts, onDelete }) {
  return (
    <div>
      {contacts.map((contact) => (
        <Contact contact={contact} onClickDelete={onDelete} key={contact.id}>
          {contact.name}
          {contact.number}
        </Contact>
      ))}
    </div>
  );
}

export default Contacts;
