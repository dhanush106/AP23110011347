function NotificationCard({ data }) {
  if (!data) return null;

  const formatDate = (timestamp) => {
    if (!timestamp) return "No date";

    const fixed = timestamp.replace(" ", "T");
    const date = new Date(fixed);

    if (isNaN(date)) return "Invalid date";

    return date.toLocaleString();
  };

  return (
    <div className={`card ${data.type.toLowerCase()}`}>
      <div className="card-header">
        <span className="badge">{data.type}</span>
        <span className="time">{formatDate(data.timestamp)}</span>
      </div>

      <p className="message">{data.message}</p>
    </div>
  );
}

export default NotificationCard;