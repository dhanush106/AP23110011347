import Log from "../utils/logger";

function SearchBar({ search, setSearch }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      Log("frontend", "info", "component", `Search for: ${value}`);
    }
  };

  const handleClear = () => {
    setSearch("");
    Log("frontend", "info", "component", "Search cleared");
  };

  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        type="text"
        placeholder="Search notifications..."
        value={search}
        onChange={handleChange}
      />
      {search && (
        <button className="search-clear" onClick={handleClear} title="Clear search">
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;