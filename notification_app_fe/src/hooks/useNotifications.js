import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/notificationService";
import Log from "../utils/logger";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [page, setPage] = useState(1);
  const [view, setView] = useState("all");

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [limit, setLimit] = useState(15);

  // 🔥 FETCH DATA
  useEffect(() => {
    const load = async () => {
      const data = await fetchNotifications({ page });

      setNotifications(data);

      await Log("frontend", "debug", "state", "Data fetched");
    };

    load();
  }, [page]);

  // 🔥 FILTER + SEARCH
  useEffect(() => {
    let result = [...notifications];

    if (type !== "all") {
      result = result.filter((n) => n.type === type);
    }

    if (search) {
      result = result.filter((n) =>
        n.message.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🔥 sort latest
    result.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    setFiltered(result);

    Log("frontend", "debug", "state", "Filtering applied");
  }, [notifications, search, type]);

  // 🔥 PRIORITY
  const priorityNotifications = filtered.slice(0, limit);

  return {
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
  };
};

export default useNotifications;