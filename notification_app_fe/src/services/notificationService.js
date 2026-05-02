import apiClient from "./apiClient";
import Log from "../utils/logger";

export const fetchNotifications = async (page = 1) => {
  try {
    await Log(
      "frontend",
      "info",
      "api",
      `Fetching notifications page ${page}`
    );

    const res = await apiClient.get(`/notifications?page=${page}`);

    await Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched successfully"
    );

    return (res.data.notifications || []).map((n) => ({
        id: n.id || n.ID,
        type: n.type || n.Type,
        message: n.message || n.Message,
        timestamp: n.timestamp || n.Timestamp,
    }));
  } catch (err) {
    await Log(
      "frontend",
      "error",
      "api",
      `Failed to fetch notifications: ${err.message}`
    );

    console.error("API Error:", err.message);
    return [];
  }
};