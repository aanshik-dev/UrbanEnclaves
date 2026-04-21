import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
import {
  Settings as SettingsIcon,
  Lock,
  Moon,
  Sun,
  LogOut,
  Bell,
  Eye,
  EyeOff,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Toggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
        enabled ? "bg-orange-500" : "bg-zinc-700"
      }`}
    >
      <span
        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function PasswordInput({
  placeholder,
  value,
  onChange,
  showToggle,
  show,
  onToggle,
}) {
  return (
    <div className="relative group">
      <Lock
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors"
        size={16}
      />
      <input
        type={show === false ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full mt-1 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-11 py-3.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10 transition-all"
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors"
        >
          {show === false ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
}

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showCurrentPw, setShowCurrentPw] = useState(true);
  const [showNewPw, setShowNewPw] = useState(true);
  const [showConfirmPw, setShowConfirmPw] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/change-password", {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });

      console.log("Password change response:", response.data);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Clear form
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password change error:", error);
      setError(error.response?.data?.message || "Failed to change password");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("id");

    navigate("/login");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Account Settings
        </h1>
        <p className="text-md text-zinc-500 mt-2">
          Manage your security, preferences, and account.
        </p>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2.5 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-medium"
          >
            <CheckCircle2 size={16} />
            Password updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2.5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Preferences Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-2">
            <div className="flex items-center gap-2 mb-5">
              <SettingsIcon size={16} className="text-orange-500" />
              <h3 className="text-sm font-semibold text-white">Preferences</h3>
            </div>

            <div className="space-y-5">
              {/* Dark Mode */}
              <div className="flex items-center justify-between px-4 py-3.5 bg-zinc-800/50 rounded-xl border border-zinc-700/40">
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <Moon size={15} className="text-orange-500" />
                  ) : (
                    <Sun size={15} className="text-orange-500" />
                  )}
                  <span className="text-sm text-zinc-200 font-medium">
                    Dark Mode
                  </span>
                </div>
                <Toggle
                  enabled={isDarkMode}
                  onToggle={() => setIsDarkMode(!isDarkMode)}
                />
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between px-4 py-3.5 bg-zinc-800/50 rounded-xl border border-zinc-700/40">
                <div className="flex items-center gap-3">
                  <Bell size={15} className="text-orange-500" />
                  <span className="text-sm text-zinc-200 font-medium">
                    Notifications
                  </span>
                </div>
                <Toggle
                  enabled={notifications}
                  onToggle={() => setNotifications(!notifications)}
                />
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2.5 px-4 py-3.5 bg-red-500/8 hover:bg-red-500/15 border border-red-500/20 hover:border-red-500/40 rounded-2xl text-red-400 text-sm font-semibold transition-all group cursor-pointer"
          >
            <LogOut
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
            Logout Account
          </button>
        </div>

        {/* Right Column — Change Password */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="flex items-center gap-2.5 mb-7">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Lock size={16} className="text-orange-500" />
            </div>
            <h3 className="text-base font-semibold text-white">
              Change Password
            </h3>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-5">
            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Current Password
              </label>
              <PasswordInput
                placeholder="Enter current password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
                show={showCurrentPw}
                showToggle
                onToggle={() => setShowCurrentPw(!showCurrentPw)}
              />
            </div>

            {/* New + Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  New Password
                </label>
                <PasswordInput
                  placeholder="New password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  show={showNewPw}
                  showToggle
                  onToggle={() => setShowNewPw(!showNewPw)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Confirm Password
                </label>
                <PasswordInput
                  placeholder="Confirm password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  show={showConfirmPw}
                  showToggle
                  onToggle={() => setShowConfirmPw(!showConfirmPw)}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="pt-5 mt-1 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-xs text-zinc-500">
                <AlertCircle size={14} className="text-orange-500 shrink-0" />
                Must be at least 8 characters long.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Password"}
                <ChevronRight size={15} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
