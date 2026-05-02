import useNotifications from "../hooks/useNotifications";
import NotificationCard from "../components/NotificationCard";
import Pagination from "../components/Pagination";
import PrioritySelector from "../components/PrioritySelector";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Log from "../utils/logger";
import '../assets/styles.css';

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
  } = useNotifications();

  const currentData = view === "all" ? filtered : priorityNotifications;

  const handleViewChange = (v) => {
    setView(v);
    Log("frontend", "info", "component", `View changed to ${v}`);
  };

  return (
    <div className="container">
      <h1 className="title">📩 Notifications</h1>

      {/* Tabs */}
      <div className="tabs">
        <button onClick={() => handleViewChange("all")}>All</button>
        <button onClick={() => handleViewChange("priority")}>
          Priority
        </button>
      </div>

      {/* 🔥 Controls */}
      <SearchBar search={search} setSearch={setSearch} />
      <FilterBar type={type} setType={setType} />

      {view === "priority" && (
        <PrioritySelector limit={limit} setLimit={setLimit} />
      )}

      {/* Cards */}
      <div className="grid">
        {currentData.map((n) => (
          <NotificationCard key={n.id} data={n} />
        ))}
      </div>

      {/* Pagination */}
      {view === "all" && (
        <Pagination page={page} setPage={setPage} />
      )}
    </div>
  );
}

export default Dashboard;