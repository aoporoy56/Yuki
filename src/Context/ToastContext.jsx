import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success", duration = 3000) => {
    const id = Date.now(); // Generate a unique ID for each toast
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    // Set a timeout to automatically remove the toast after the specified duration
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() =>
                setToasts((prevToasts) =>
                  prevToasts.filter((t) => t.id !== toast.id)
                )
              }
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

const Toast = ({ message, type, onClose }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg border border-gray-100 p-4 flex items-center gap-3 min-w-[300px]"
      style={{ animation: "slideIn 0.5s ease-out" }}
    >
      {type === "success" && (
        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
      )}
      <p className="text-gray-800 flex-1">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
