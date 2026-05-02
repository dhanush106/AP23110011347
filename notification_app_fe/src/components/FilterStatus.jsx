import Log from "../utils/logger";

function FilterStatus({ search, type, onReset }) {
  const hasActiveFilters = search || type !== "all";

  if (!hasActiveFilters) return null;

  const handleReset = () => {
    onReset();
    Log("frontend", "info", "component", "Filters reset");
  };

  return (
    <div className="filter-status">
      <span className="status-label">Active Filters:</span>
      {type !== "all" && <span className="status-badge">{type}</span>}
      {search && <span className="status-badge">Search: "{search}"</span>}
      <button className="reset-btn" onClick={handleReset}>
        Clear All
      </button>
    </div>
  );
}

export default FilterStatus;
