function NotificationCard({ data }) {
  if (!data) return null;

  const formatDate = (timestamp) => {
    if (!timestamp) return "No date";

    try {
      const fixed = String(timestamp).replace(" ", "T");
      const date = new Date(fixed);

      if (isNaN(date.getTime())) return "Invalid date";

      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Invalid date";
    }
  };

  const typeClass = data.type ? data.type.toLowerCase() : "unknown";

  return (
    <div className={`card ${typeClass}`}>
      <div className="card-header">
        <span className="badge">{data.type || "Unknown"}</span>
        <span className="time">{formatDate(data.timestamp)}</span>
      </div>
      <p className="message">{data.message || "No message"}</p>
    </div>
  );
}

export default NotificationCard;