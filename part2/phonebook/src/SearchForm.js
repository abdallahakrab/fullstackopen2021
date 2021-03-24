import React from "react";

function SearchForm({ searchTerm, onSearch }) {
  return (
    <div>
      <label htmlFor="search">name</label>
      <input id="search" value={searchTerm} onChange={onSearch} type="text" />
    </div>
  );
}

export default SearchForm;
