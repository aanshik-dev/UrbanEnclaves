import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  DollarSign,
  CheckCircle2,
  LogOut,
  Search,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";

const holdings = [
  {
    id: 1,
    title: "Skyline Luxury Apartment",
    location: "G.S. Road, Guwahati",
    price: "₹85,00,000",
    status: "CURRENT",
    type: "Sale",
    bhk: 3,
    bath: 2,
    size: "1500 sq.ft",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
    commission: "₹1,70,000",
    listedDate: "2024-03-01",
  },
  {
    id: 2,
    title: "Green Valley Villa",
    location: "Zoo Road, Guwahati",
    price: "₹45,000/mo",
    status: "CURRENT",
    type: "Rent",
    bhk: 4,
    bath: 3,
    size: "2200 sq.ft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    commission: "₹45,000",
    listedDate: "2024-02-15",
  },
  {
    id: 3,
    title: "Modern Studio Loft",
    location: "Dispur, Guwahati",
    price: "₹35,00,000",
    status: "SOLD",
    type: "Sale",
    bhk: 1,
    bath: 1,
    size: "650 sq.ft",
    image: "https://images.unsplash.com/photo-1536376074432-bc42fa45c170?q=80&w=2070&auto=format&fit=crop",
    commission: "₹70,000",
    listedDate: "2024-01-10",
    soldDate: "2024-03-20",
  },
];

export default function Holdings() {
  const [activeTab, setActiveTab] = useState("CURRENT");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHoldings = holdings.filter(h => {
    const matchesTab = activeTab === "ALL" || h.status === activeTab;
    const matchesSearch = h.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold text-white tracking-tight">Manage Holdings</h1>
        <p className="text-zinc-400 text-sm font-medium">Track your assigned properties and manage their status.</p>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto scrollbar-hide">
          {["ALL", "CURRENT", "SOLD"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab ? "bg-orange-500 text-white shadow-lg shadow-orange-500/10" : "text-zinc-500 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={14} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-3 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600 text-xs font-medium"
          />
        </div>
      </div>

      {/* Holdings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHoldings.map((h) => (
          <motion.div
            key={h.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-[1.5rem] overflow-hidden group backdrop-blur-sm flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden">
              <img src={h.image} alt={h.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-lg ${
                  h.status === "SOLD" ? "bg-rose-500 text-white" : "bg-emerald-500 text-white"
                }`}>
                  {h.status}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 text-[10px]">
                  <ArrowUpRight size={12} /> View Full Details
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-white truncate">{h.title}</h3>
                <p className="text-orange-500 font-bold text-sm">{h.price}</p>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] mb-4 font-medium">
                <MapPin size={12} />
                <span>{h.location}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800/50">
                  <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-0.5">Commission</p>
                  <p className="text-white font-bold text-xs">{h.commission}</p>
                </div>
                <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800/50">
                  <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-0.5">Listed On</p>
                  <p className="text-white font-bold text-xs">{h.listedDate}</p>
                </div>
              </div>

              <div className="mt-auto space-y-2">
                {h.status === "CURRENT" ? (
                  <button className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs group/btn border border-red-500/20">
                    <LogOut size={14} className="group-hover/btn:-translate-x-1 transition-transform" /> Leave Property
                  </button>
                ) : (
                  <div className="flex items-center gap-2 p-2.5 bg-zinc-800/50 rounded-xl border border-zinc-800/50 text-zinc-500 text-[10px] font-bold justify-center grayscale">
                    <CheckCircle2 size={14} /> Property Sold on {h.soldDate}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredHoldings.length === 0 && (
        <div className="text-center py-12 bg-zinc-900/30 rounded-[1.5rem] border border-dashed border-zinc-800">
          <Building2 className="mx-auto text-zinc-800 mb-2" size={32} />
          <p className="text-zinc-500 font-medium text-sm">No properties found in your {activeTab.toLowerCase()} holdings.</p>
        </div>
      )}

      {/* Info Banner */}
      <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-[1.5rem] flex items-center gap-3">
        <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
          <AlertCircle size={20} />
        </div>
        <div>
          <h4 className="text-white font-bold text-xs">Holding Management Policy</h4>
          <p className="text-zinc-500 text-[10px] font-medium">
            You can only leave properties that are currently for rent or sale. Sold properties will remain in your history for commission tracking.
          </p>
        </div>
      </div>
    </div>
  );
}