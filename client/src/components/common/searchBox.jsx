import React, { Component } from "react";
const SearchBox = ({ value, onChange, label }) => {
  return (
    <input
      autoFocus
      type="text"
      name="query"
      className="form-control my-3"
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
