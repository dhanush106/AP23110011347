import apiClient from "./apiClient";
import Log from "../utils/logger";

export const fetchNotifications = async (page = 1) => {
  try {
    await Log("frontend", "info", "api", `Fetching page ${page}`);

    const res = await apiClient.get("/notifications", {
      params: { page },
    });

    return (res.data.notifications || []).map((n) => ({
      id: n.ID,
      type: n.Type,
      message: n.Message,
      timestamp: n.Timestamp,
    }));
  } catch (err) {
    await Log("frontend", "error", "api", `Page fetch failed: ${err.message}`);
    return [];
  }
};

export const fetchAllNotifications = async () => {
  let allData = [];
  let page = 1;

  try {
    await Log("frontend", "info", "api", "Fetching ALL pages for search");

    while (true) {
      const res = await apiClient.get("/notifications", {
        params: { page },
      });

      const data = res.data.notifications || [];

      if (data.length === 0) break;

      allData = [...allData, ...data];
      page++;
    }

    return allData.map((n) => ({
      id: n.ID,
      type: n.Type,
      message: n.Message,
      timestamp: n.Timestamp,
    }));
  } catch (err) {
    await Log("frontend", "error", "api", "Fetch all failed");
    return [];
  }
};