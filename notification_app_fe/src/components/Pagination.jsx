import Log from "../utils/logger";

function Pagination({ page, setPage }) {
  const handleNext = () => {
    setPage(page + 1);
    Log("frontend", "info", "component", "Next page clicked");
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      Log("frontend", "info", "component", "Previous page clicked");
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={page === 1}>
        ⬅ Prev
      </button>

      <span>Page {page}</span>

      <button onClick={handleNext}>
        Next ➡
      </button>
    </div>
  );
}

export default Pagination;