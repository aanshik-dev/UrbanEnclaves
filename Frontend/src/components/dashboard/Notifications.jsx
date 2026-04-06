import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Handshake,
  Calendar,
  MessageSquare,
  Trash2,
  Check,
  Eye,
  Clock,
  ShieldCheck,
} from "lucide-react";

const adminNotifications = [
  {
    id: 1,
    type: "VERIFY_AGENT",
    title: "New Agent Registration",
    message:
      "Vikram Singh has registered as an agent and requires profile verification.",
    time: "10 mins ago",
    isRead: false,
    sender: { name: "Vikram Singh", image: "VS", role: "AGENT" },
  },
  {
    id: 2,
    type: "SYSTEM",
    title: "System Update",
    message: "Monthly performance reports are now available for download.",
    time: "2 hours ago",
    isRead: true,
  },
];

const agentNotifications = [
  {
    id: 1,
    type: "VISIT_REQUEST",
    title: "Property Visit Request",
    message:
      "Ankit Mehra wants to visit 'Skyline Apartment #402' on Sunday at 11:00 AM.",
    time: "5 mins ago",
    isRead: false,
    sender: { name: "Ankit Mehra", image: "AM", role: "USER" },
  },
  {
    id: 2,
    type: "DEAL_REQUEST",
    title: "New Deal Negotiation",
    message:
      "Pooja Sharma has sent a negotiation request for 'Green Valley Villa'.",
    time: "1 hour ago",
    isRead: false,
    sender: { name: "Pooja Sharma", image: "PS", role: "USER" },
  },
];

const userNotifications = [
  {
    id: 1,
    type: "MESSAGE",
    title: "Message from Agent",
    message:
      "Rahul Kapoor: 'The owner has accepted your visit request for tomorrow.'",
    time: "20 mins ago",
    isRead: false,
    sender: { name: "Rahul Kapoor", image: "RK", role: "AGENT" },
  },
  {
    id: 2,
    type: "DEAL_REQUEST",
    title: "Offer Received",
    message:
      "You have received a new offer on your listed property 'The Grand Enclave'.",
    time: "3 hours ago",
    isRead: true,
  },
];

export default function Notifications({ role }) {
  const initialNotifications =
    role === "ADMIN"
      ? adminNotifications
      : role === "AGENT"
        ? agentNotifications
        : userNotifications;

  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("ALL");

  const filteredNotifications = notifications.filter(
    (n) => filter === "ALL" || !n.isRead,
  );

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "VERIFY_AGENT":
        return <ShieldCheck className="text-orange-500" size={20} />;
      case "DEAL_REQUEST":
        return <Handshake className="text-emerald-500" size={20} />;
      case "VISIT_REQUEST":
        return <Calendar className="text-blue-500" size={20} />;
      case "MESSAGE":
        return <MessageSquare className="text-purple-500" size={20} />;
      default:
        return <Bell className="text-zinc-500" size={20} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Notifications
          </h1>
          <p className="text-zinc-400 font-medium">
            Stay updated with the latest activities and requests.
          </p>
        </div>
        <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === "ALL" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("UNREAD")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === "UNREAD" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            Unread
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.map((n) => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-6 rounded-[2rem] border transition-all relative group ${
                n.isRead
                  ? "bg-zinc-900/30 border-zinc-800/50"
                  : "bg-zinc-900/80 border-orange-500/30 shadow-lg shadow-orange-500/5"
              }`}
            >
              {!n.isRead && (
                <div className="absolute top-6 right-6 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
              )}

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center relative">
                    {getIcon(n.type)}
                    {n.sender && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-orange-500 border-2 border-zinc-900 flex items-center justify-center text-[10px] font-bold text-white">
                        {n.sender.image}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className={`font-bold ${n.isRead ? "text-zinc-300" : "text-white text-lg"}`}
                    >
                      {n.title}
                    </h3>
                    <span className="text-zinc-500 text-xs font-medium flex items-center gap-1">
                      <Clock size={12} /> {n.time}
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed mb-4 ${n.isRead ? "text-zinc-500" : "text-zinc-400 font-medium"}`}
                  >
                    {n.message}
                  </p>

                  <div className="flex items-center gap-3">
                    {n.type === "VERIFY_AGENT" && (
                      <>
                        <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2">
                          <Check size={14} /> Verify Agent
                        </button>
                        <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs font-bold rounded-xl transition-all flex items-center gap-2">
                          <Eye size={14} /> View Profile
                        </button>
                      </>
                    )}
                    {n.type === "VISIT_REQUEST" && (
                      <>
                        <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all">
                          Accept Visit
                        </button>
                        <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs font-bold rounded-xl transition-all">
                          Reschedule
                        </button>
                      </>
                    )}
                    {n.type === "MESSAGE" && (
                      <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl transition-all">
                        Reply Now
                      </button>
                    )}
                    {!n.isRead &&
                      n.type !== "VERIFY_AGENT" &&
                      n.type !== "VISIT_REQUEST" && (
                        <button
                          onClick={() => markAsRead(n.id)}
                          className="text-orange-500 text-xs font-bold hover:underline"
                        >
                          Mark as read
                        </button>
                      )}
                  </div>
                </div>

                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => deleteNotification(n.id)}
                    className="p-2 hover:bg-red-500/10 text-zinc-600 hover:text-red-500 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/30 rounded-[2.5rem] border border-dashed border-zinc-800">
            <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="text-zinc-700" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              All caught up!
            </h3>
            <p className="text-zinc-500 font-medium">
              No new notifications to show.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
