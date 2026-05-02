function EmptyState({ search, type }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">∅</div>
      <h3>No Notifications Found</h3>
      <p>
        {search && type !== "all"
          ? `No ${type} notifications match "${search}"`
          : search
          ? `No notifications match "${search}"`
          : type !== "all"
          ? `No ${type} notifications yet`
          : "No notifications at this time"}
      </p>
    </div>
  );
}

export default EmptyState;
