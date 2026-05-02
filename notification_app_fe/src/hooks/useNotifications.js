import { useEffect, useState, useCallback } from "react";
import {
  fetchNotifications,
  fetchAllNotifications,
} from "../services/notificationService";
import Log from "../utils/logger";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [view, setView] = useState("all");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [type, setType] = useState("all");
  const [limit, setLimit] = useState(15);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      let data;

      if (debouncedSearch) {
        data = await fetchAllNotifications();
      } else {
        data = await fetchNotifications(page);
      }

      setNotifications(data);
      setLoading(false);
    };

    load();
  }, [page, debouncedSearch]);

  useEffect(() => {
    let result = [...notifications];

    if (type !== "all") {
      result = result.filter((n) => n.type === type);
    }

    if (debouncedSearch) {
      result = result.filter((n) =>
        n.message.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    result.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    setFiltered(result);
  }, [notifications, debouncedSearch, type]);

  const priorityNotifications = [...filtered]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);

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
    loading,
  };
};

export default useNotifications;