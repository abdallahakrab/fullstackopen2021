import React from "react";

function Contact({ contact }) {
  return <div>{`${contact.name}  ${contact.number}`}</div>;
}

export default Contact;
