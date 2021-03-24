import React from "react";
import Contact from "./Contact";
function Contacts({ contacts }) {
  return (
    <div>
      {contacts.map((contact) => (
        <Contact contact={contact} key={contact.name}>
          {contact.name}
          {contact.number}
        </Contact>
      ))}
    </div>
  );
}

export default Contacts;
