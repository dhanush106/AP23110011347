import useNotifications from "../hooks/useNotifications";
import NotificationCard from "../components/NotificationCard";
import Pagination from "../components/Pagination";
import Log from "../utils/logger";
import PrioritySelector from "../components/PrioritySelector";
import "../assets/styles.css";

function Dashboard() {
  const {
    notifications,
    priorityNotifications,
    page,
    setPage,
    view,
    setView,
    limit,
    setLimit,
  } = useNotifications();

  const currentData = view === "all" ? notifications : priorityNotifications;

  const handleViewChange = (type) => {
    setView(type);
    Log("frontend", "info", "component", `Switched to ${type}`);
  };

  return (
    <div className="container">
      <h1 className="title">Notifications</h1>

      <div className="tabs">
        {view === "priority" && (
            <PrioritySelector limit={limit} setLimit={setLimit} />
        )}
        <button
          className={view === "all" ? "active" : ""}
          onClick={() => handleViewChange("all")}
        >
          All
        </button>

        <button
          className={view === "priority" ? "active" : ""}
          onClick={() => handleViewChange("priority")}
        >
          Priority
        </button>
      </div>

      <div className="grid">
        {currentData.map((n) => (
          <NotificationCard key={n.id} data={n} />
        ))}
      </div>

      {/* 🔥 Pagination UI */}
      {view === "all" && (
        <Pagination page={page} setPage={setPage} />
      )}
    </div>
  );
}

export default Dashboard;