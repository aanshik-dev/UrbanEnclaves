import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import {
  Building2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  MapPin,
  ChevronDown,
  CheckCircle2,
  Clock,
  IndianRupee,
  Home,
  TrendingUp,
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

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "orange",
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl backdrop-blur-sm"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 bg-${color}-500/10 rounded-2xl`}>
        <Icon className={`text-${color}-500`} size={24} />
      </div>
      {trend && (
        <div
          className={`flex items-center gap-1 text-sm font-medium ${trend === "up" ? "text-emerald-500" : "text-rose-500"}`}
        >
          {trend === "up" ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}
          {trendValue}%
        </div>
      )}
    </div>
    <p className="text-zinc-400 text-sm font-medium mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
  </motion.div>
);

export default function AgentHome() {
  const [dashboardData, serDashBoardData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [graphLoading, setGraphLoading] = useState(true);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [filterType, setFilterType] = useState("YEARLY");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDash = async () => {
      try {
        const response = await API.get("/api/agents/me/dashboard");
        serDashBoardData(response.data.data);
        console.log("Dashboard Data:", response.data.data);
      } catch (error) {
        console.error("Dashboard Stats Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDash();
  }, []);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const response = await API.get(`/analytics/revenue?type=${filterType}`);
        setGraphData(response.data.data);
        console.log("Graph Data:", response.data.data);
      } catch (error) {
        console.error("Graph Data Error:", error);
      } finally {
        setGraphLoading(false);
      }
    };
    fetchGraph();
  }, [filterType]);

  useEffect(() => {
    const fetchRecommendedProperties = async () => {
      try {
        const response = await API.get("/api/agents/listings/available");
        setRecommendedProperties(response.data.data || []);
        console.log("Recommended Properties:", response.data.data);
      } catch (error) {
        console.error("Recommended Properties Error:", error);
      } finally {
        setPropertiesLoading(false);
      }
    };
    fetchRecommendedProperties();
  }, []);

  // Helper function to format price
  const formatPrice = (price, listingType) => {
    if (listingType === "RENT") {
      return `₹ ${(price / 1000).toFixed(0)}k / month`;
    }
    if (price >= 10000000) {
      return `₹ ${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
      return `₹ ${(price / 100000).toFixed(2)} L`;
    }
    return `₹ ${price.toLocaleString()}`;
  };

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 animate-pulse">
        Loading...
      </div>
    );

  if (!dashboardData) {
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 font-medium">
        No Data Available
      </div>
    );
  }
  const topPercent = Math.max(1, 100 - (dashboardData.rating - 1) * 25).toFixed(
    0,
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Agent Dashboard
        </h1>
        <p className="text-zinc-400 font-medium">
          Manage your properties and track your performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Commission"
          value={`₹ ${(dashboardData.totalCommission / 100000).toFixed(2)} L`}
          icon={IndianRupee}
          trend="up"
          trendValue={15.2}
        />
        <StatCard
          title="Active Holdings"
          value={dashboardData.activeListings}
          icon={Building2}
          trend="up"
          trendValue={5.4}
        />
        <StatCard
          title="Deals Closed"
          value={dashboardData.totalDeals}
          icon={CheckCircle2}
          trend="up"
          trendValue={10.1}
        />
        <StatCard
          title="Agent Score"
          value={dashboardData.performanceScore}
          icon={Star}
          trend="up"
          trendValue={2.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 flex flex-col bg-zinc-900/50 border border-zinc-800 p-6 rounded-[1.5rem] backdrop-blur-sm relative">
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
          <div className="flex-1 w-full">
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

        {/* Best Selling Property */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 pt-4 rounded-2xl backdrop-blur-sm flex flex-col">
          <h3 className="text-lg font-bold text-white mb-3">
            Best Selling Property
          </h3>
          <div className="flex flex-col flex-1">
            <div className="relative mb-3 rounded-2xl overflow-hidden aspect-video group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                alt="Property"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {dashboardData.bestPropertySold.listingDetail.listingType}
              </div>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">
              {dashboardData.bestPropertySold.propertyDetail.BHK} BHK in{" "}
              {dashboardData.bestPropertySold.propertyDetail.locality},{" "}
              {dashboardData.bestPropertySold.propertyDetail.area}
            </h4>
            <div className="flex items-center gap-2 text-zinc-500 text-sm mb-3">
              <MapPin size={16} />
              <span>
                {dashboardData.bestPropertySold.propertyDetail.area},{" "}
                {dashboardData.bestPropertySold.propertyDetail.city},{" "}
                {dashboardData.bestPropertySold.propertyDetail.pin}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mb-3">
              <div className="bg-zinc-800/50 px-4 py-3 rounded-2xl">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">
                  Sold Price
                </p>
                <p className="text-white font-bold text-lg">
                  {`₹ ${(dashboardData.bestPropertySold.listingDetail.listingPrice / 10000000).toFixed(2)} Cr`}
                </p>
              </div>
              <div className="bg-zinc-800/50 px-4 py-3 rounded-2xl">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">
                  Commission
                </p>
                <p className="text-orange-500 font-bold text-lg">{`₹ ${((dashboardData.bestPropertySold.listingDetail.listingPrice * dashboardData.commissionRate) / 10000000).toFixed(2)} L`}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/agent/holdings")}
              className="w-full mt-auto py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              View Details <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Properties */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 px-8 py-6 rounded-3xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-xl">
                <TrendingUp className="text-orange-500" size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">
                Recommended Properties
              </h3>
            </div>
            <button
              onClick={() => navigate("/agent/listings")}
              className="text-orange-500 text-sm font-bold hover:underline"
            >
              View All
            </button>
          </div>

          {propertiesLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : recommendedProperties.length === 0 ? (
            <div className="text-center py-12">
              <Home className="text-zinc-600 mx-auto mb-3" size={48} />
              <p className="text-zinc-500 font-medium">
                No properties available
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {recommendedProperties.slice(0, 5).map((property) => (
                <div
                  key={property.tokenId}
                  className="group flex items-center gap-2 p-2.5 bg-zinc-800/30 rounded-lg border border-zinc-800/50 hover:border-orange-500/30 hover:bg-zinc-800/50 transition-all cursor-pointer"
                >
                  {/* Icon */}
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 flex-shrink-0">
                    <Home size={16} />
                  </div>

                  {/* Content - Single line */}
                  <div className="flex-1 flex items-center gap-2 flex-wrap min-w-0">
                    <p className="text-white font-semibold text-sm truncate">
                      {property.property.BHK} BHK {property.property.type}
                    </p>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${
                        property.listingType === "SELL"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {property.listingType}
                    </span>
                    <p className="text-zinc-400 text-xs truncate">
                      {property.property.locality}
                    </p>
                    <p className="text-orange-500 text-xs font-bold flex-shrink-0">
                      {formatPrice(property.price, property.listingType)}
                    </p>
                  </div>

                  {/* Action Icon */}
                  <button
                    onClick={() => navigate("/agent/listings")}
                    className="p-1.5 mr-3 hover:translate-x-1 cursor-pointer bg-orange-500/80 hover:bg-orange-500 text-white rounded-lg transition-all group-hover:shadow-lg group-hover:shadow-orange-500/25 flex-shrink-0"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Performance Score */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-sm">
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
                  strokeDashoffset={440 - (440 * dashboardData.rating) / 5}
                  className="text-orange-500 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {dashboardData.rating}
                </span>
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                  Rating
                </span>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="text-orange-500 fill-orange-500"
                  size={20}
                />
              ))}
            </div>
            <p className="text-zinc-400 text-sm font-medium">
              You are in the{" "}
              <span className="text-orange-500 font-bold">
                Top {topPercent} %{" "}
              </span>{" "}
              of agents in your region. Keep it up!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
