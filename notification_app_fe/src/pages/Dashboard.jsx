import useNotifications from "../hooks/useNotifications";
import NotificationCard from "../components/NotificationCard";
import Pagination from "../components/Pagination";
import PrioritySelector from "../components/PrioritySelector";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import FilterStatus from "../components/FilterStatus";
import Log from "../utils/logger";
import "../assets/styles.css";

function Dashboard() {
  const {
    filtered,
    priorityNotifications,
    page,
    setPage,
    view,
    setView,
    search,
    setSearch,
    type,
    setType,
    limit,
    setLimit,
    loading,
  } = useNotifications();

  const currentData = view === "all" ? filtered : priorityNotifications;

  const handleResetFilters = () => {
    setSearch("");
    setType("all");
    setPage(1);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    Log("frontend", "info", "component", `Switched view to ${newView}`);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Notifications</h1>
        <p className="subtitle">View and manage your notifications</p>
      </header>

      <div className="controls-section">
        <div className="view-tabs">
          <button
            className={`tab-btn ${view === "all" ? "active" : ""}`}
            onClick={() => handleViewChange("all")}
          >
            All Notifications
          </button>
          <button
            className={`tab-btn ${view === "priority" ? "active" : ""}`}
            onClick={() => handleViewChange("priority")}
          >
            Priority View
          </button>
        </div>

        <SearchBar search={search} setSearch={setSearch} />
        <FilterBar type={type} setType={setType} />

        {view === "priority" && (
          <PrioritySelector limit={limit} setLimit={setLimit} />
        )}

        <FilterStatus
          search={search}
          type={type}
          onReset={handleResetFilters}
        />
      </div>

      <div className="content-section">
        {loading ? (
          <LoadingSpinner />
        ) : currentData.length === 0 ? (
          <EmptyState search={search} type={type} />
        ) : (
          <div className="grid">
            {currentData.map((n) => (
              <NotificationCard key={n.id} data={n} />
            ))}
          </div>
        )}
      </div>

      {!search && view === "all" && !loading && (
        <Pagination page={page} setPage={setPage} />
      )}

      {currentData.length > 0 && (
        <div className="result-count">
          Showing {currentData.length} notification{currentData.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}

export default Dashboard;