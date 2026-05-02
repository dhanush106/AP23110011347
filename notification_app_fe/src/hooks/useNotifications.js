import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/notificationService";
import Log from "../utils/logger";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("all");
  const [limit, setLimit] = useState(15);

  const loadData = async (pageNum) => {
    await Log("frontend", "info", "api", `Fetching page ${pageNum}`);

    const data = await fetchNotifications(pageNum);
    setNotifications(data);

    await Log("frontend", "debug", "state", `Loaded page ${pageNum}`);
  };

  useEffect(() => {
    loadData(page);
  }, [page]);

  
  const priorityNotifications = [...notifications]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);

  return {
    notifications,
    priorityNotifications,
    page,
    setPage,
    view,
    setView,
    limit,
    setLimit,
  };
};

export default useNotifications;