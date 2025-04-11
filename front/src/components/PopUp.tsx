import React, { useEffect } from "react";
import './PopUp.css';

interface PopupProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Fecha em 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`popup ${type}`}>
      {message}
    </div>
  );
};
