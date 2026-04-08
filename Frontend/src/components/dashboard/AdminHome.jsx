import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../../api/axios";
import {
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  History,
  ChevronDown,
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
  const [dashboardData, setDashboardData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [graphLoading, setGraphLoading] = useState(false);
  const [filterType, setFilterType] = useState("YEARLY"); // New state for selection

  // 1. Initial Load: Fetch static Dashboard stats once
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get("/admin/dashboard");
        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Dashboard Stats Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // 2. Dynamic Load: Fetch Graph data whenever filterType changes
  useEffect(() => {
    const fetchGraph = async () => {
      setGraphLoading(true);
      try {
        // Adjust the URL if your backend requires /admin/analytics/...
        const response = await API.get(`/analytics/revenue?type=${filterType}`);
        setGraphData(response.data.data);
      } catch (error) {
        console.error("Graph Data Error:", error);
      } finally {
        setGraphLoading(false);
      }
    };
    fetchGraph();
  }, [filterType]); // Triggered every time filterType changes

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 animate-pulse">
        Loading...
      </div>
    );
  if (!dashboardData) return null;

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const [response, graph] = await Promise.allSettled([
  //         API.get("/admin/dashboard"),
  //         API.get("/analytics/revenue?type=YEARLY"),
  //       ]);

  //       if (response.status === "fulfilled") {
  //         setDashboardData(response.value.data.data);
  //       } else {
  //         console.error("Dashboard API failed:", response.reason);
  //       }

  //       if (graph.status === "fulfilled") {
  //         setGraphData(graph.value.data.data);
  //         console.log(graph.value.data.data);
  //       } else {
  //         console.error("Graph API failed:", graph.reason);
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Dashboard Fetch Error:",
  //         error.response?.data || error.message,
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 font-medium animate-pulse">
        Loading Dashboard Analytics...
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 font-medium">
        No Data Available
      </div>
    );
  }

  const pieData = [
    { name: "Sold", value: dashboardData.soldListings },
    { name: "Rented", value: dashboardData.rentedListings },
    { name: "Listed", value: dashboardData.activeListings },
  ];

  const topAgent = dashboardData.agents?.reduce((prev, current) =>
    prev.score > current.score ? prev : current,
  );

  const chartData = [
    { name: "Total", revenue: dashboardData.totalRevenue / 100000 }, // in Lakhs for better scaling
  ];

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
          value={`₹${(dashboardData.totalRevenue / 10000000).toFixed(2)}Cr`}
          icon={DollarSign}
          trend="up"
          trendValue={12.5}
        />
        <StatCard
          title="Total Properties"
          value={dashboardData.totalProperties}
          icon={Building2}
          trend="up"
          trendValue={8.2}
        />
        <StatCard
          title="Active Agents"
          value={dashboardData.totalAgents}
          icon={Users}
          trend="down"
          trendValue={2.1}
        />
        <StatCard
          title="Total Users"
          value={dashboardData.totalUsers}
          icon={TrendingUp}
          trend="up"
          trendValue={15.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-[1.5rem] backdrop-blur-sm">
          {/* Chart Loading Overlay */}
          {graphLoading && (
            <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-[1.5rem]">
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Revenue Analytics</h3>
            {/* Dropdown to switch filterType */}
            <div className="relative group">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none bg-zinc-800 border border-zinc-700/50 rounded-xl pl-4 pr-10 py-1.5 text-xs text-zinc-300 focus:ring-2 focus:ring-orange-500/20 cursor-pointer outline-none transition-all hover:border-zinc-600"
              >
                <option value="YEARLY">Yearly View</option>
                <option value="MONTHLY">Monthly View</option>
                <option value="WEEKLY">Weekly View</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none group-hover:text-zinc-300 transition-colors"
              />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData?.chart || []}>
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
                  dataKey="label"
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
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
          {topAgent ? (
            <div className="flex flex-col items-center text-center flex-1 justify-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-2xl shadow-orange-500/40">
                  {topAgent.username.substring(0, 2)}
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 bg-zinc-900 p-1.5 rounded-lg border border-zinc-800">
                  <Star className="text-orange-500 fill-orange-500" size={12} />
                </div>
              </div>
              <h4 className="text-lg font-bold text-white mb-0.5">
                {topAgent.username}
              </h4>
              <p className="text-zinc-500 text-xs font-medium mb-6">
                AID: {topAgent.agentId}
              </p>

              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="bg-zinc-800/50 p-3 rounded-xl text-center">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Deals
                  </p>
                  <p className="text-white font-bold text-base">
                    {topAgent.totalDeals}
                  </p>
                </div>
                <div className="bg-zinc-800/50 p-3 rounded-xl text-center">
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                    Rating
                  </p>
                  <p className="text-white font-bold text-base">
                    {topAgent.rating}
                  </p>
                </div>
              </div>

              <button className="w-full mt-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-xs">
                View Profile <ArrowUpRight size={14} />
              </button>
            </div>
          ) : (
            <p className="text-zinc-500 text-center my-auto italic">
              No agents found
            </p>
          )}
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
            {dashboardData.recentTransactions?.map((tx) => (
              <div
                key={tx.transactionId}
                className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-xl border border-zinc-800/50 hover:border-orange-500/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <History size={16} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">
                      {tx.propertyCity} - {tx.buyerName} To {tx.sellerName}
                    </p>
                    <p className="text-zinc-500 text-[10px] font-medium">
                      {tx.mode} • {tx.date} #{tx.transactionId}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">
                    ₹{tx.amount.toLocaleString()}
                  </p>
                  <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                    {tx.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Property Distribution */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-[1.5rem] backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-6">
            Property Distribution
          </h3>
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
