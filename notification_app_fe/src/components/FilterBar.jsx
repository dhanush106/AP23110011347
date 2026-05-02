import Log from "../utils/logger";

function FilterBar({ type, setType }) {
  return (
    <select
      value={type}
      onChange={(e) => {
        setType(e.target.value);
        Log("frontend", "info", "component", "Filter changed");
      }}
    >
      <option value="all">All</option>
      <option value="Placement">Placement</option>
      <option value="Event">Event</option>
      <option value="Result">Result</option>
    </select>
  );
}

export default FilterBar;