import Log from "../utils/logger";

function FilterBar({ type, setType }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setType(value);
    Log("frontend", "info", "component", `Filter changed to ${value}`);
  };

  return (
    <div className="filter-wrapper">
      <label>Filter by Type:</label>
      <select value={type} onChange={handleChange} className="filter-select">
        <option value="all">All Types</option>
        <option value="Placement">Placement</option>
        <option value="Event">Event</option>
        <option value="Result">Result</option>
      </select>
    </div>
  );
}

export default FilterBar;