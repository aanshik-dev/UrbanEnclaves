import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Info,
  Database,
  TrendingUp,
  History,
  Building2,
  Map,
  Sun,
  Moon,
} from "lucide-react";

const Sidebar = ({ role, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const adminItems = [
    { title: "Dashboard", path: "/admin/home", icon: LayoutDashboard },
    { title: "Track Properties", path: "/admin/track", icon: Map },
    { title: "Raw Queries", path: "/admin/queries", icon: Database },
    { title: "Agent Performance", path: "/admin/agents", icon: TrendingUp },
    { title: "Transactions", path: "/admin/transactions", icon: History },
    { title: "Notifications", path: "/admin/notifications", icon: Bell },
    { title: "Profile", path: "/admin/profile", icon: User },
    { title: "About", path: "/admin/about", icon: Info },
    { title: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const officeItems = [
    { title: "Dashboard", path: "/office/home", icon: LayoutDashboard },
    { title: "Track Properties", path: "/office/track", icon: Map },
    { title: "Agent Performance", path: "/office/agents", icon: TrendingUp },
    { title: "Transactions", path: "/office/transactions", icon: History },
    { title: "Notifications", path: "/office/notifications", icon: Bell },
    { title: "Profile", path: "/office/profile", icon: User },
    { title: "About", path: "/office/about", icon: Info },
    { title: "Settings", path: "/office/settings", icon: Settings },
  ];

  const agentItems = [
    { title: "Dashboard", path: "/agent/home", icon: LayoutDashboard },
    { title: "Listings", path: "/agent/listings", icon: Home },
    { title: "Holdings", path: "/agent/holdings", icon: Building2 },
    { title: "Notifications", path: "/agent/notifications", icon: Bell },
    { title: "Profile", path: "/agent/profile", icon: User },
    { title: "About", path: "/agent/about", icon: Info },
    { title: "Settings", path: "/agent/settings", icon: Settings },
  ];

  const userItems = [
    { title: "Listings", path: "/user/home", icon: Home },
    { title: "My Properties", path: "/user/properties", icon: Building2 },
    { title: "Notifications", path: "/user/notifications", icon: Bell },
    { title: "Profile", path: "/user/profile", icon: User },
    { title: "About", path: "/user/about", icon: Info },
    { title: "Settings", path: "/user/settings", icon: Settings },
  ];

  const items =
    role === "ADMIN" ? adminItems : role === "AGENT" ? agentItems : role === "OFFICE" ? officeItems : userItems;

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? "80px" : "260px" }}
      className="h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col sticky top-0 z-50 overflow-hidden"
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-between border-b border-zinc-800/50">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Building2 className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              UrbanEnclaves
            </span>
          </motion.div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all group relative ${
                isActive
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <item.icon
                size={22}
                className={
                  isActive
                    ? "text-white"
                    : "group-hover:scale-110 transition-transform"
                }
              />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium whitespace-nowrap"
                >
                  {item.title}
                </motion.span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                  {item.title}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-zinc-800/50">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group relative"
        >
          <LogOut
            size={22}
            className="group-hover:scale-110 transition-transform"
          />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

const TopBar = ({ role }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="h-20 bg-zinc-950/50 backdrop-blur-md border-b border-zinc-800/50 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search properties, agents, transactions..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-zinc-200 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-zinc-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 hover:bg-zinc-800 rounded-xl transition-colors text-zinc-400"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative">
          <button className="p-3 hover:bg-zinc-800 rounded-xl transition-colors text-zinc-400 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-zinc-950"></span>
          </button>
        </div>

        <div className="h-10 w-[1px] bg-zinc-800 mx-2"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">John Doe</p>
            <p className="text-xs text-zinc-500 font-medium">{role}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20">
            JD
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DashboardLayout({ role }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-200 font-sans">
      <Sidebar
        role={role}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar role={role} />
        <main className="p-8 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
