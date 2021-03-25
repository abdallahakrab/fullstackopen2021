import React from "react";

function Form({ searchTerm, onSearchChange }) {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input value={searchTerm} onChange={onSearchChange} id="search" />
    </div>
  );
}

export default Form;
