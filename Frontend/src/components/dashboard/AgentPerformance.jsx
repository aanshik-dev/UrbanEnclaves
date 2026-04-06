import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  Star,
  Building2,
  DollarSign,
  MapPin,
  CheckCircle2,
  Award,
  BarChart3,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";
import FilterPanel from "./FilterPanel";

const agents = [
  {
    aid: "AG-2024-001",
    name: "Rahul Kapoor",
    office: "Guwahati Central",
    rating: 4.8,
    commission: "₹1.2Cr",
    commissionValue: 12000000,
    sold: 24,
    holdings: 12,
    status: "Active",
    image: "RK",
    email: "rahul.k@urbanenclaves.com",
    phone: "+91 98765 43210",
    experience: "5 Years",
    city: "Guwahati",
    area: "Central",
  },
  {
    aid: "AG-2024-002",
    name: "Priya Singh",
    office: "Guwahati Central",
    rating: 4.9,
    commission: "₹95.0L",
    commissionValue: 9500000,
    sold: 18,
    holdings: 8,
    status: "Active",
    image: "PS",
    email: "priya.s@urbanenclaves.com",
    phone: "+91 98765 43211",
    experience: "3 Years",
    city: "Guwahati",
    area: "Central",
  },
  {
    aid: "AG-2024-003",
    name: "Amit Verma",
    office: "Dispur Branch",
    rating: 4.7,
    commission: "₹75.0L",
    commissionValue: 7500000,
    sold: 15,
    holdings: 10,
    status: "Active",
    image: "AV",
    email: "amit.v@urbanenclaves.com",
    phone: "+91 98765 43212",
    experience: "4 Years",
    city: "Guwahati",
    area: "Dispur",
  },
  {
    aid: "AG-2024-004",
    name: "Sonia Das",
    office: "Zoo Road Branch",
    rating: 4.6,
    commission: "₹65.0L",
    commissionValue: 6500000,
    sold: 12,
    holdings: 6,
    status: "Inactive",
    image: "SD",
    email: "sonia.d@urbanenclaves.com",
    phone: "+91 98765 43213",
    experience: "2 Years",
    city: "Guwahati",
    area: "Zoo Road",
  },
];

export default function AgentPerformance() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    city: [],
    area: [],
    status: [],
    priceRange: [0, 20000000],
    rating: 0,
  });

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         agent.aid.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = filters.city.length === 0 || filters.city.includes(agent.city);
    const matchesArea = filters.area.length === 0 || filters.area.includes(agent.area);
    const matchesStatus = filters.status.length === 0 || filters.status.includes(agent.status);
    const matchesPrice = agent.commissionValue >= filters.priceRange[0] && 
                        agent.commissionValue <= filters.priceRange[1];
    const matchesRating = agent.rating >= filters.rating;

    return matchesSearch && matchesCity && matchesArea && matchesStatus && matchesPrice && matchesRating;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold text-white tracking-tight">Agent Performance</h1>
          <p className="text-zinc-400 text-sm font-medium">Monitor and evaluate agent productivity across all offices.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={14} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-3 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600 text-xs font-medium"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-xl border transition-all flex items-center gap-2 text-xs font-bold ${
              showFilters ? "bg-orange-500 border-orange-500 text-white" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            <Filter size={14} /> Filters
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0 relative">
        <AnimatePresence>
          {showFilters && (
            <FilterPanel 
              onClose={() => setShowFilters(false)} 
              onApply={setFilters}
              initialFilters={filters}
            />
          )}
        </AnimatePresence>

        {/* Agent List */}
        <div className="w-[380px] space-y-3 overflow-y-auto pr-2 scrollbar-hide">
          {filteredAgents.map((agent) => (
            <motion.div
              key={agent.aid}
              onClick={() => setSelectedAgent(agent)}
              whileHover={{ x: 4 }}
              className={`p-3 rounded-2xl border cursor-pointer transition-all group ${
                selectedAgent.aid === agent.aid
                  ? "bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/5"
                  : "bg-zinc-900/50 border-zinc-800 hover:border-orange-500/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform`}>
                  {agent.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-white font-bold truncate text-sm">{agent.name}</h3>
                    <div className="flex items-center gap-1 text-orange-500">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[10px] font-bold">{agent.rating}</span>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-[10px] font-medium mb-1">{agent.aid}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-[9px] font-bold uppercase tracking-widest">{agent.office}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      agent.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredAgents.length === 0 && (
            <div className="text-center py-12 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
              <Users className="mx-auto text-zinc-700 mb-4" size={48} />
              <p className="text-zinc-500 font-medium">No agents found matching your search.</p>
            </div>
          )}
        </div>

        {/* Agent Detail Panel */}
        <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-y-auto scrollbar-hide flex flex-col backdrop-blur-sm">
          <div className="p-6 border-b border-zinc-800/50 bg-gradient-to-br from-zinc-900/80 to-transparent">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-2xl shadow-orange-500/30">
                {selectedAgent.image}
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{selectedAgent.name}</h2>
                  <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    selectedAgent.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                  }`}>
                    {selectedAgent.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                    <Award className="text-orange-500" size={14} />
                    <span>AID: {selectedAgent.aid}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                    <MapPin className="text-orange-500" size={14} />
                    <span>{selectedAgent.office}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                    <Calendar className="text-orange-500" size={14} />
                    <span>Exp: {selectedAgent.experience}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 text-xs">
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all text-xs">
                  Deactivate
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
              <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800/50">
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">Total Commission</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="text-orange-500" size={16} />
                  <span className="text-lg font-bold text-white">{selectedAgent.commission}</span>
                </div>
              </div>
              <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800/50">
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">Properties Sold</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-orange-500" size={16} />
                  <span className="text-lg font-bold text-white">{selectedAgent.sold}</span>
                </div>
              </div>
              <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800/50">
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">Current Holdings</p>
                <div className="flex items-center gap-2">
                  <Building2 className="text-orange-500" size={16} />
                  <span className="text-lg font-bold text-white">{selectedAgent.holdings}</span>
                </div>
              </div>
              <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800/50">
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">User Rating</p>
                <div className="flex items-center gap-2">
                  <Star className="text-orange-500 fill-orange-500" size={16} />
                  <span className="text-lg font-bold text-white">{selectedAgent.rating}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-white font-bold flex items-center gap-2 text-sm">
                  <BarChart3 className="text-orange-500" size={18} /> Performance Insights
                </h4>
                <div className="space-y-4">
                  {[
                    { label: "Sales Target", value: 85 },
                    { label: "Customer Satisfaction", value: 92 },
                    { label: "Listing Quality", value: 78 },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-zinc-400">{stat.label}</span>
                        <span className="text-white">{stat.value}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.value}%` }}
                          className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-white font-bold flex items-center gap-2 text-sm">
                  <Mail className="text-orange-500" size={18} /> Contact Information
                </h4>
                <div className="p-4 bg-zinc-800/30 rounded-2xl border border-zinc-800/50 space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><Mail size={16} /></div>
                    <div>
                      <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest">Email Address</p>
                      <p className="text-white font-bold text-xs">{selectedAgent.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><Phone size={16} /></div>
                    <div>
                      <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest">Phone Number</p>
                      <p className="text-white font-bold text-xs">{selectedAgent.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}