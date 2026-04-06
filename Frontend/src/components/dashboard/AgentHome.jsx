import { motion } from "framer-motion";
import {
  Building2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  MapPin,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { name: "Jan", deals: 4, commission: 24000 },
  { name: "Feb", deals: 3, commission: 13980 },
  { name: "Mar", deals: 2, commission: 98000 },
  { name: "Apr", deals: 5, commission: 39080 },
  { name: "May", deals: 1, commission: 48000 },
  { name: "Jun", deals: 4, commission: 38000 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "orange" }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl backdrop-blur-sm"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 bg-${color}-500/10 rounded-2xl`}>
        <Icon className={`text-${color}-500`} size={24} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-medium ${trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>
          {trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trendValue}%
        </div>
      )}
    </div>
    <p className="text-zinc-400 text-sm font-medium mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
  </motion.div>
);

export default function AgentHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">Agent Dashboard</h1>
        <p className="text-zinc-400 font-medium">Manage your properties and track your performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Commission" value="₹12.5L" icon={DollarSign} trend="up" trendValue={15.2} />
        <StatCard title="Active Holdings" value="18" icon={Building2} trend="up" trendValue={5.4} />
        <StatCard title="Deals Closed" value="42" icon={CheckCircle2} trend="up" trendValue={10.1} />
        <StatCard title="Agent Score" value="9.8/10" icon={Star} trend="up" trendValue={2.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Commission Chart */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Commission Earnings</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-xs font-bold text-orange-500">Monthly</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "12px" }}
                  itemStyle={{ color: "#f97316" }}
                />
                <Area type="monotone" dataKey="commission" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorComm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best Selling Property */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] backdrop-blur-sm flex flex-col">
          <h3 className="text-xl font-bold text-white mb-6">Best Selling Property</h3>
          <div className="flex flex-col flex-1">
            <div className="relative mb-6 rounded-2xl overflow-hidden aspect-video group">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                alt="Property" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                SOLD
              </div>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">The Grand Enclave #102</h4>
            <div className="flex items-center gap-2 text-zinc-500 text-sm mb-6">
              <MapPin size={16} />
              <span>G.S. Road, Guwahati</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full mb-6">
              <div className="bg-zinc-800/50 p-4 rounded-2xl">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Sold Price</p>
                <p className="text-white font-bold text-lg">₹85.0L</p>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-2xl">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Commission</p>
                <p className="text-orange-500 font-bold text-lg">₹1.7L</p>
              </div>
            </div>
            
            <button className="w-full mt-auto py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2">
              View Details <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Deal Requests */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Pending Deal Requests</h3>
            <button className="text-orange-500 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-zinc-800/30 rounded-2xl border border-zinc-800/50 hover:border-orange-500/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold">Amit Sharma wants to visit</p>
                    <p className="text-zinc-500 text-xs font-medium">Skyline Apartment #402 • 15 mins ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors">
                    Accept
                  </button>
                  <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs font-bold rounded-lg transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Score */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-8">Agent Rating</h3>
          <div className="flex flex-col items-center text-center">
            <div className="relative w-40 h-40 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-zinc-800"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * 98) / 100}
                  className="text-orange-500 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">9.8</span>
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Score</span>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="text-orange-500 fill-orange-500" size={20} />
              ))}
            </div>
            <p className="text-zinc-400 text-sm font-medium">
              You are in the <span className="text-orange-500 font-bold">Top 1%</span> of agents in your region. Keep it up!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}