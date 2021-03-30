import React from "react";

function Notification({ error, errorColor }) {
  if (!error) {
    return null;
  }
  return <div className={`error${errorColor}`}>{error}</div>;
}

export default Notification;
