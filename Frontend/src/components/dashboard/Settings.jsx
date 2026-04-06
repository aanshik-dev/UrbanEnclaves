import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings as SettingsIcon,
  Lock,
  Moon,
  Sun,
  LogOut,
  Bell,
  ShieldCheck,
  Eye,
  EyeOff,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Account Settings
        </h1>
        <p className="text-zinc-400 font-medium">
          Manage your security, theme, and account preferences.
        </p>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-500 text-sm font-bold"
          >
            <CheckCircle2 size={18} />
            Password updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <SettingsIcon className="text-orange-500" size={20} /> Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-2xl border border-zinc-800/50">
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <Moon size={18} className="text-orange-500" />
                  ) : (
                    <Sun size={18} className="text-orange-500" />
                  )}
                  <span className="text-white font-bold text-sm">
                    Dark Mode
                  </span>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-12 h-6 rounded-full transition-all relative ${isDarkMode ? "bg-orange-500" : "bg-zinc-700"}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isDarkMode ? "left-7" : "left-1"}`}
                  ></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-2xl border border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-orange-500" />
                  <span className="text-white font-bold text-sm">
                    Notifications
                  </span>
                </div>
                <button className="w-12 h-6 rounded-full bg-orange-500 transition-all relative">
                  <div className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white transition-all"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="text-orange-500" size={20} /> Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-2xl border border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <Smartphone size={18} className="text-orange-500" />
                  <span className="text-white font-bold text-sm">
                    2FA Security
                  </span>
                </div>
                <ChevronRight size={18} className="text-zinc-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-2xl border border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-orange-500" />
                  <span className="text-white font-bold text-sm">
                    Login Activity
                  </span>
                </div>
                <ChevronRight size={18} className="text-zinc-600" />
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-3 p-6 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-[2.5rem] text-red-500 font-bold transition-all group"
          >
            <LogOut
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />{" "}
            Logout Account
          </button>
        </div>

        {/* Change Password Form */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Lock className="text-orange-500" size={24} /> Change Password
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                Current Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  className="w-full bg-zinc-800/50 border border-zinc-800/50 rounded-2xl px-12 py-4 text-zinc-200 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  New Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors"
                    size={18}
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full bg-zinc-800/50 border border-zinc-800/50 rounded-2xl px-12 py-4 text-zinc-200 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  Confirm New Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors"
                    size={18}
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full bg-zinc-800/50 border border-zinc-800/50 rounded-2xl px-12 py-4 text-zinc-200 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-zinc-500 text-xs font-medium">
                <AlertCircle size={16} className="text-orange-500" />
                Password must be at least 8 characters long.
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
              >
                Update Password <ChevronRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
