import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
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
import API from "../../api/axios";

const Sidebar = ({ role, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("id");

    navigate("/login");
  };

  const adminItems = [
    { title: "Dashboard", path: "/admin/home", icon: LayoutDashboard },
    { title: "Track Properties", path: "/admin/track", icon: Map },
    { title: "Raw Queries", path: "/admin/queries", icon: Database },
    { title: "Agent Performance", path: "/admin/agents", icon: TrendingUp },
    { title: "Transactions", path: "/admin/transactions", icon: History },
    { title: "Profile", path: "/admin/profile", icon: User },
    { title: "About", path: "/admin/about", icon: Info },
    { title: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const officeItems = [
    { title: "Dashboard", path: "/office/home", icon: LayoutDashboard },
    { title: "Track Properties", path: "/office/track", icon: Map },
    { title: "Agent Performance", path: "/office/agents", icon: TrendingUp },
    { title: "Transactions", path: "/office/transactions", icon: History },
    { title: "Profile", path: "/office/profile", icon: User },
    { title: "About", path: "/office/about", icon: Info },
    { title: "Settings", path: "/office/settings", icon: Settings },
  ];

  const agentItems = [
    { title: "Dashboard", path: "/agent/home", icon: LayoutDashboard },
    { title: "Listings", path: "/agent/listings", icon: Home },
    { title: "Holdings", path: "/agent/holdings", icon: Building2 },
    { title: "Profile", path: "/agent/profile", icon: User },
    { title: "About", path: "/agent/about", icon: Info },
    { title: "Settings", path: "/agent/settings", icon: Settings },
  ];

  const userItems = [
    { title: "Listings", path: "/user/home", icon: Home },
    { title: "My Properties", path: "/user/properties", icon: Building2 },
    { title: "Profile", path: "/user/profile", icon: User },
    { title: "About", path: "/user/about", icon: Info },
    { title: "Settings", path: "/user/settings", icon: Settings },
  ];

  const items =
    role === "ADMIN"
      ? adminItems
      : role === "AGENT"
        ? agentItems
        : role === "OFFICE"
          ? officeItems
          : userItems;

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
          onClick={handleLogout}
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
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [greeting, setGreeting] = useState("");

  // Arrays of greetings without emojis
  const greetings = [
    { text: "Find your dream home today", icon: "solar:home-bold" },
    { text: "Discover exceptional properties", icon: "lucide:sparkles" },
    { text: "Your next investment awaits", icon: "lucide:trending-up" },
    { text: "Track your real estate portfolio", icon: "lucide:bar-chart-3" },
    { text: "Making property dreams come true", icon: "lucide:target" },
    { text: "Smart investments start here", icon: "lucide:brain" },
    { text: "Premium properties at your fingertips", icon: "lucide:crown" },
    { text: "Your perfect match is waiting", icon: "lucide:heart" },
    { text: "Discover luxury living", icon: "lucide:gem" },
    { text: "Urban living, redefined", icon: "solar:city-bold-duotone" },
    { text: "Unlock your dream property", icon: "lucide:key" },
    { text: "Where dreams find a home", icon: "lucide:star" },
    { text: "Experience excellence in real estate", icon: "lucide:award" },
    { text: "Welcome to your real estate journey", icon: "lucide:compass" },
  ];

  const timeBasedGreetings = [
    { start: 5, end: 12, text: "Good morning! Ready to find your dream home?", icon: "line-md:sun-rising-twotone-loop" },
    { start: 12, end: 17, text: "Good afternoon! Let's explore amazing properties", icon: "lucide:sun" },
    { start: 17, end: 21, text: "Good evening! Perfect time to find your sanctuary", icon: "lucide:moon" },
    { start: 21, end: 24, text: "Your dream home is waiting to be discovered", icon: "material-symbols:stars-2-rounded" },
    { start: 0, end: 5, text: "Your dream home never sleeps", icon: "lucide:moon-star" },
  ];

  const professionalQuotes = [
    { text: "Market insights at your command", icon: "lucide:trending-up" },
    { text: "Managing premium properties with precision", icon: "lucide:building-2" },
    { text: "Tracking real estate excellence", icon: "lucide:line-chart" },
    { text: "Precision in every transaction", icon: "material-symbols:check-circle-unread-outline-rounded" },
    { text: "Your property management hub", icon: "lucide:layers" },
    { text: "Excellence in real estate services", icon: "lucide:trophy" },
    { text: "Smart search, smarter results", icon: "lucide:search" },
    { text: "Curated properties for discerning clients", icon: "lucide:diamond" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.get("/api/users/me");
        if (response.data?.data) {
          setUserData(response.data.data);
          localStorage.setItem("userName", response.data.data.name);
          localStorage.setItem("userProfileUrl", response.data.data.profileUrl);
          localStorage.setItem("userEmail", response.data.data.email);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        const storedName = localStorage.getItem("username");
        if (storedName) {
          setUserData({ name: storedName });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    selectRandomGreeting();
  }, []);

  const selectRandomGreeting = () => {
    const allGreetings = [...greetings, ...professionalQuotes];
    const currentHour = new Date().getHours();
    const isTimeBased = Math.random() < 0.3;
    
    if (isTimeBased) {
      const timeGreeting = timeBasedGreetings.find(
        g => currentHour >= g.start && currentHour < g.end
      );
      if (timeGreeting) {
        setGreeting(timeGreeting);
        return;
      }
    }
    
    const randomIndex = Math.floor(Math.random() * allGreetings.length);
    setGreeting(allGreetings[randomIndex]);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = userData?.name || localStorage.getItem("username") || "User";
  const displayRole = role || localStorage.getItem("role") || "USER";

  if (!greeting) return null;

  return (
    <div className="h-18 bg-zinc-950/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Greeting Section */}
      <div className="flex-1">
        <motion.div
          key={greeting.text}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
            <Icon icon={greeting.icon} width="20" className="text-orange-500" />
          </div>
          <div>
            <p className="text-zinc-400 text-xs font-medium mb-0.5">
              Welcome back, {displayName.split(" ")[0]}
            </p>
            <p className="text-white font-semibold text-sm">
              {greeting.text}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="hidden lg:flex items-center gap-6 mr-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp size={14} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Active Listings</p>
            <p className="text-white font-bold text-sm">2,847</p>
          </div>
        </div>
        <div className="w-px h-8 bg-zinc-800" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Building2 size={14} className="text-blue-500" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Properties Sold</p>
            <p className="text-white font-bold text-sm">15.2K</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        <div className="h-10 w-[1px] bg-zinc-800 mx-2"></div>

        <div className="flex items-center gap-3 pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">{displayName}</p>
            <p className="text-xs text-zinc-500 font-medium">{displayRole}</p>
          </div>
          
          {/* Avatar with Profile Image Support */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20 overflow-hidden">
            {!loading && userData?.profileUrl && !imageError ? (
              <img
                src={userData.profileUrl}
                alt={displayName}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-sm">{getInitials(displayName)}</span>
            )}
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
        <main className="px-10 py-6 flex-1 overflow-y-auto">
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