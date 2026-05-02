import Log from "../utils/logger";

function Pagination({ page, setPage }) {
  const handlePrev = () => {
    setPage(page - 1);
    Log("frontend", "info", "component", `Navigated to page ${page - 1}`);
  };

  const handleNext = () => {
    setPage(page + 1);
    Log("frontend", "info", "component", `Navigated to page ${page + 1}`);
  };

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={handlePrev}>
        Previous
      </button>

      <span className="page-number">Page {page}</span>

      <button onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default Pagination;