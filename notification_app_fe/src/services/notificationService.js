import apiClient from "./apiClient";
import Log from "../utils/logger";

export const fetchNotifications = async (params = {}) => {
  try {
    await Log(
      "frontend",
      "info",
      "api",
      `Fetching notifications with params ${JSON.stringify(params)}`
    );

    const res = await apiClient.get("/notifications", {
      params,
    });

    await Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched successfully"
    );

    // 🔥 normalize
    return (res.data.notifications || []).map((n) => ({
      id: n.ID,
      type: n.Type,
      message: n.Message,
      timestamp: n.Timestamp,
    }));
  } catch (err) {
    await Log(
      "frontend",
      "error",
      "api",
      `Fetch failed: ${err.message}`
    );

    return [];
  }
};