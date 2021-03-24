import React from "react";

function ContactForm({
  onAdd,
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
}) {
  return (
    <div>
      <form onSubmit={onAdd}>
        <label htmlFor="name">Name</label>
        <input value={newName} onChange={onNameChange} id="name" type="text" />
        <label htmlFor="number">Number</label>
        <input value={newNumber} onChange={onNumberChange} id="number" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default ContactForm;
