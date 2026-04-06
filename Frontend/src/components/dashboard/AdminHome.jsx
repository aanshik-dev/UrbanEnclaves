import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  History,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { name: "Jan", sales: 4000, revenue: 2400 },
  { name: "Feb", sales: 3000, revenue: 1398 },
  { name: "Mar", sales: 2000, revenue: 9800 },
  { name: "Apr", sales: 2780, revenue: 3908 },
  { name: "May", sales: 1890, revenue: 4800 },
  { name: "Jun", sales: 2390, revenue: 3800 },
];

const pieData = [
  { name: "Sold", value: 400 },
  { name: "Rent", value: 300 },
  { name: "Pending", value: 200 },
];

const COLORS = ["#f97316", "#fb923c", "#fdba74"];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl backdrop-blur-sm"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="p-2 bg-orange-500/10 rounded-xl">
        <Icon className="text-orange-500" size={18} />
      </div>
      {trend && (
        <div
          className={`flex items-center gap-1 text-[10px] font-bold ${
            trend === "up" ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {trend === "up" ? (
            <ArrowUpRight size={12} />
          ) : (
            <ArrowDownRight size={12} />
          )}
          {trendValue}%
        </div>
      )}
    </div>
    <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">
      {title}
    </p>
    <h3 className="text-xl font-bold text-white tracking-tight">{value}</h3>
  </motion.div>
);

export default function AdminHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-zinc-400 text-sm font-medium">
          Welcome back, here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value="₹4.2Cr"
          icon={DollarSign}
          trend="up"
          trendValue={12.5}
        />
        <StatCard
          title="Total Listings"
          value="1,284"
          icon={Building2}
          trend="up"
          trendValue={8.2}
        />
        <StatCard
          title="Active Agents"
          value="42"
          icon={Users}
          trend="down"
          trendValue={2.1}
        />
        <StatCard
          title="Sales Overview"
          value="156"
          icon={TrendingUp}
          trend="up"
          trendValue={15.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-[1.5rem] backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">
              Revenue Performance
            </h3>
            <select className="bg-zinc-800 border-none rounded-xl px-3 py-1.5 text-xs text-zinc-300 focus:ring-2 focus:ring-orange-500/20">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "12px",
                  }}
                  itemStyle={{ color: "#f97316" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f97316"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best Performing Agent */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-[1.5rem] backdrop-blur-sm flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Top Agent</h3>
          <div className="flex flex-col items-center text-center flex-1 justify-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-2xl shadow-orange-500/40">
                RK
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 bg-zinc-900 p-1.5 rounded-lg border border-zinc-800">
                <Star className="text-orange-500 fill-orange-500" size={12} />
              </div>
            </div>
            <h4 className="text-lg font-bold text-white mb-0.5">
              Rahul Kapoor
            </h4>
            <p className="text-zinc-500 text-xs font-medium mb-6">
              AID: AG-2024-001
            </p>

            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="bg-zinc-800/50 p-3 rounded-xl text-center">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                  Deals
                </p>
                <p className="text-white font-bold text-base">24</p>
              </div>
              <div className="bg-zinc-800/50 p-3 rounded-xl text-center">
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                  Revenue
                </p>
                <p className="text-white font-bold text-base">₹1.2Cr</p>
              </div>
            </div>

            <button className="w-full mt-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-xs">
              View Profile <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-[1.5rem] backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">
              Recent Transactions
            </h3>
            <button className="text-orange-500 text-xs font-bold hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-xl border border-zinc-800/50 hover:border-orange-500/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <History size={16} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">
                      Skyline Apartment #402
                    </p>
                    <p className="text-zinc-500 text-[10px] font-medium">
                      2 hours ago • Sale
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">₹85,00,000</p>
                  <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                    Completed
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Property Distribution */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-[1.5rem] backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-6">Listings Status</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {pieData.map((item, i) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  ></div>
                  <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                    {item.name}
                  </span>
                </div>
                <p className="text-white font-bold text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
