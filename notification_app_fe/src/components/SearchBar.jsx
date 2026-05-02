import Log from "../utils/logger";

function SearchBar({ search, setSearch }) {
  return (
    <input
      className="search"
      placeholder="Search notifications..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        Log("frontend", "info", "component", "Search updated");
      }}
    />
  );
}

export default SearchBar;