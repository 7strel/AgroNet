import { useState } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@mui/material";
import { Card } from "@mui/material";



const notifications = [
  { id: 1, message: "New comment on your post" },
  { id: 2, message: "Your order has been shipped" },
  { id: 3, message: "Reminder: Meeting at 3 PM" },
];

const NotificationDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button onClick={() => setOpen(!open)} className="relative">
        <Bell className="text-2xl text-gray-500" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-0.1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {notifications.length}
          </span>
        )}
      </Button>

      {open && (
        <Card className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-2 z-10">
          <div className="flex justify-between items-center px-2 pb-2 border-b">
            <span className="font-semibold text-gray-700">Notifications</span>
            <button onClick={() => setOpen(false)}>
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <li
                  key={notif.id}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer text-sm text-gray-600"
                >
                  {notif.message}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500 text-sm">No new notifications</li>
            )}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default NotificationDropdown;
