import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="d-flex gap-2" onSubmit={handleSubmit}>
      <input
        className="form-control"
        placeholder="Search recipe..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-primary">Search</button>
    </form>
  );
}