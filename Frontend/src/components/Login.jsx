import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Building2,
  User,
  Briefcase,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  TrendingUp,
  Globe,
} from "lucide-react";
import { Icon } from "@iconify/react";

const Login = () => {
  const [role, setRole] = useState("USER");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const routes = {
      OFFICE: "/agent/home",
      ADMIN: "/admin/home",
      AGENT: "/agent/home",
      USER: "/user/home",
    };
    navigate(routes[role] || "/user/home");
  };

  const roles = [
    { id: "USER", icon: "mi:user", label: "User" },
    { id: "AGENT", icon: "mdi:face-agent", label: "Agent" },
    { id: "OFFICE", icon: "tabler:briefcase", label: "Office" },
    { id: "ADMIN", icon: "iconamoon:shield-yes", label: "Admin" },
  ];

  const stats = [
    { label: "Active Listings", value: "12,400+", icon: Building2 },
    { label: "Market Growth", value: "+18%", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex selection:bg-orange-500/30 selection:text-orange-200">
      {/* --- FIXED NAVIGATION HEADER --- */}
      <div className="absolute top-16 left-16 right-6 z-50 flex items-center justify-between lg:justify-start lg:gap-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all group"
        >
          <div className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-zinc-600 group-hover:bg-zinc-900 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-medium tracking-wide">Back</span>
        </button>
      </div>

      {/* --- LEFT SIDE: VISUAL SIDEBAR --- */}
      <section className="hidden lg:flex w-[50%] xl:w-[55%] relative flex-col justify-between p-12 pl-20 overflow-hidden border-r border-zinc-800/50">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
            alt="Modern Property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        </div>

        <div className="relative z-10 flex items-center gap-3"></div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl xl:text-6xl font-bold leading-tight mb-6">
              Unlock the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Premium Market
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-md mb-8 leading-relaxed">
              Access exclusive listings and advanced analytics designed for
              professional real estate management.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
              >
                <stat.icon className="text-orange-500 mb-2" size={20} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-zinc-500 text-xs font-medium uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Globe size={14} /> Global Access
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} /> Encrypted
          </div>
        </div>
      </section>

      {/* RIGHT SIDE LOGIN CARD */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,1)]"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="p-2 bg-orange-800 rounded-xl flex items-center text-lg justify-center">
              <Icon icon="icon-park-solid:building-two" />
            </div>
            <span className="text-[25px] font-bold tracking-tight">
              Urban<span className="text-orange-500">Enclaves</span>
            </span>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-zinc-400 text-sm">
              Sign in to continue your journey
            </p>
          </div>

          {/* Role Selector */}
          <div className="flex p-1 bg-zinc-800 rounded-xl border border-zinc-800 mb-6">
            {roles.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setRole(opt.id)}
                className={`relative flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
                  role === opt.id
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {role === opt.id && (
                  <motion.div
                    layoutId="roleTab"
                    className="absolute inset-0 bg-orange-500 rounded-lg"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="text-lg" icon={opt.icon} />
                  {opt.label}
                </span>
              </button>
            ))}
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-zinc-500 font-semibold ml-1">
                Email
              </label>
              <div className="relative mt-1">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                  size={16}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-800 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-xs text-zinc-500 font-semibold ml-1">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-orange-500 hover:text-orange-400"
                >
                  Forgot?
                </button>
              </div>

              <div className="relative mt-1">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-zinc-800 border border-zinc-800 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all group"
            >
              Sign In
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-400">
            New here?{" "}
            <Link
              to="/register"
              className="text-orange-500 font-semibold hover:text-orange-400"
            >
              Create Account
            </Link>
          </div>

          <div className="flex justify-center mt-8 text-xs text-zinc-600 gap-2 items-center">
            <ShieldCheck size={14} />
            Secure • Encrypted Platform
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
