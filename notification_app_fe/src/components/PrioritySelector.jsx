import Log from "../utils/logger";

function PrioritySelector({ limit, setLimit }) {
  const handleChange = (e) => {
    const value = Number(e.target.value);
    setLimit(value);

    Log(
      "frontend",
      "info",
      "component",
      `Priority limit changed to ${value}`
    );
  };

  return (
    <div className="priority-select">
      <label>Show Top:</label>

      <select value={limit} onChange={handleChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
}

export default PrioritySelector;