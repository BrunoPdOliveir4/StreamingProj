import React, { useEffect } from "react";
import './PopUp.css';

const Popup = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Closes after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`popup ${type}`}>
      {message}
    </div>
  );
};

export default Popup;
