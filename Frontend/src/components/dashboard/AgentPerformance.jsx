import { useState, useEffect } from "react"; // Added useEffect
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios"; // Adjust path as needed
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

export default function AgentPerformance() {
  const [agentData, setAgentData] = useState([]); // Real backend data
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: [],
    area: [],
    status: [],
    priceRange: [0, 20000000],
    rating: 0,
  });

  // 1. Fetch Agent Performance Data
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await API.get("/api/agents/performance");
        // Access nested "data" from ThunderClient response
        const fetchedAgents = response.data.data || response.data;
        setAgentData(fetchedAgents);
        
        // Auto-select first agent
        if (fetchedAgents.length > 0) {
          setSelectedAgent(fetchedAgents[0]);
        }
      } catch (error) {
        console.error("Agent Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // 2. Updated filtering logic to use agentData
  const filteredAgents = agentData.filter(agent => {
    const matchesSearch = agent.agentName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         agent.agentId?.toString().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status.length === 0 || filters.status.includes(agent.agentStatus);
    const matchesRating = agent.user_rating >= filters.rating;

    return matchesSearch && matchesStatus && matchesRating;
  });

  if (loading) return <div className="h-full flex items-center justify-center text-zinc-500 animate-pulse">Loading Agents...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header & Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold text-white tracking-tight">Agent Performance</h1>
          <p className="text-zinc-400 text-sm font-medium">Monitor and evaluate agent productivity across all offices.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500" size={14} />
            <input
              type="text"
              placeholder="Search agent name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-3 text-zinc-200 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0 relative">
        {/* Agent List */}
        <div className="w-[380px] space-y-3 overflow-y-auto pr-2 scrollbar-hide">
          {filteredAgents.map((agent) => (
            <motion.div
              key={agent.agentId}
              onClick={() => setSelectedAgent(agent)}
              whileHover={{ x: 4 }}
              className={`p-3 rounded-2xl border cursor-pointer transition-all group ${
                selectedAgent?.agentId === agent.agentId
                  ? "bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/5"
                  : "bg-zinc-900/50 border-zinc-800 hover:border-orange-500/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-orange-500/20 uppercase">
                  {agent.agentName?.substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-white font-bold truncate text-sm">{agent.agentName}</h3>
                    <div className="flex items-center gap-1 text-orange-500">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[10px] font-bold">{agent.user_rating}</span>
                    </div>
                  </div>
                  <p className="text-zinc-500 text-[10px] font-medium mb-1">AID: {agent.agentId}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-[9px] font-bold uppercase tracking-widest">{agent.experience} Years Exp</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      agent.agentStatus === "ACTIVE" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                    }`}>
                      {agent.agentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Agent Detail Panel */}
        {selectedAgent && (
          <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-y-auto scrollbar-hide flex flex-col backdrop-blur-sm">
            <div className="p-6 border-b border-zinc-800/50 bg-gradient-to-br from-zinc-900/80 to-transparent">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold uppercase">
                  {selectedAgent.agentName?.substring(0, 2)}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-white tracking-tight">{selectedAgent.agentName}</h2>
                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      selectedAgent.agentStatus === "ACTIVE" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                    }`}>
                      {selectedAgent.agentStatus}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                      <Award className="text-orange-500" size={14} />
                      <span>AID: {selectedAgent.agentId}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                      <Calendar className="text-orange-500" size={14} />
                      <span>Exp: {selectedAgent.experience} Years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
                <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800/50">
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">Total Sales</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="text-orange-500" size={16} />
                    <span className="text-lg font-bold text-white">₹{(selectedAgent.totalSales / 100000).toFixed(1)}L</span>
                  </div>
                </div>
                <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800/50">
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">Total Deals</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-orange-500" size={16} />
                    <span className="text-lg font-bold text-white">{selectedAgent.total_deals}</span>
                  </div>
                </div>
                <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800/50">
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">Active Deals</p>
                  <div className="flex items-center gap-2">
                    <Building2 className="text-orange-500" size={16} />
                    <span className="text-lg font-bold text-white">{selectedAgent.activeDeals}</span>
                  </div>
                </div>
                <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800/50">
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">Rating</p>
                  <div className="flex items-center gap-2">
                    <Star className="text-orange-500 fill-orange-500" size={16} />
                    <span className="text-lg font-bold text-white">{selectedAgent.user_rating}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Performance Bars - Using 'score' field for progress */}
                <div className="space-y-6">
                  <h4 className="text-white font-bold flex items-center gap-2 text-sm">
                    <BarChart3 className="text-orange-500" size={18} /> Performance Score
                  </h4>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-zinc-400">Activity Score</span>
                      <span className="text-white">{selectedAgent.score * 10}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedAgent.score * 10}%` }}
                        className="h-full bg-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                  <h4 className="text-white font-bold flex items-center gap-2 text-sm">
                    <Mail className="text-orange-500" size={18} /> Contact Info
                  </h4>
                  <div className="p-4 bg-zinc-800/30 rounded-2xl border border-zinc-800/50 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl">
                      <Mail size={14} className="text-orange-500" />
                      <p className="text-white font-bold text-xs">{selectedAgent.email}</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl">
                      <Phone size={14} className="text-orange-500" />
                      <p className="text-white font-bold text-xs">{selectedAgent.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}