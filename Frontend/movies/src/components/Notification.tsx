import React, { useState, useEffect } from 'react';

type NotificationProps = {
  message: string;
  type: 'success' | 'error';
  duration?: number; // Tempo opcional para exibir a mensagem em milissegundos
};

const Notification: React.FC<NotificationProps> = ({ message, type, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    // Limpeza do timeout ao desmontar o componente
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const bgColor = type === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900';
  const borderColor = type === 'success' ? 'border-green-500 dark:border-green-700' : 'border-red-500 dark:border-red-700';
  const textColor = type === 'success' ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100';
  const iconColor = type === 'success' ? 'text-green-600' : 'text-red-600';

  return (
    <div
      role="alert"
      className={`${bgColor} ${borderColor} ${textColor} p-2 rounded-lg flex items-center transition-all duration-500 ease-in-out transform ${visible ? 'animate-slideIn' : ''} absolute top-10 right-3`}
    >
      <svg
        stroke="currentColor"
        viewBox="0 0 24 24"
        fill="none"
        className={`h-5 w-5 flex-shrink-0 mr-2 ${iconColor}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
      <p className="text-xs font-semibold">{message}</p>
    </div>
  );
};

export default Notification;
