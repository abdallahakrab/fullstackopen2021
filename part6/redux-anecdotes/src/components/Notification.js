import React from "react";
import { useSelector } from "react-redux";
const Notification = () => {
  const message = useSelector(({ message }) => message);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: !message ? "none" : "",
  };
  return <div style={style}>{message ? message : ""}</div>;
};

export default Notification;
