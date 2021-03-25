import React from "react";

function Contact({ contact, onClickDelete }) {
  return (
    <div>
      {`${contact.name}  ${contact.number}`}{" "}
      <button onClick={() => onClickDelete(contact)}>delete</button>
    </div>
  );
}

export default Contact;
