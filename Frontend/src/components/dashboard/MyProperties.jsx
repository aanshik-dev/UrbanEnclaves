import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Building2,
  MapPin,
  Edit3,
  Trash2,
  Tag,
  Search,
  Filter,
  X,
  Upload,
} from "lucide-react";
import FilterPanel from "./FilterPanel";

const myProperties = [
  {
    id: 1,
    title: "The Grand Enclave #102",
    location: "G.S. Road, Guwahati",
    city: "Guwahati",
    area: "G.S. Road",
    price: "₹85,00,000",
    priceValue: 8500000,
    status: "LISTED",
    type: "Sale",
    bhk: 3,
    bath: 2,
    size: "1500 sq.ft",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Riverview Residency",
    location: "Uzan Bazar, Guwahati",
    city: "Guwahati",
    area: "Uzan Bazar",
    status: "OWNED",
    type: "Sale",
    price: "₹1.2Cr",
    priceValue: 12000000,
    bhk: 4,
    bath: 3,
    size: "2200 sq.ft",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1600607687940-4e524cb35a36?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Cozy Studio Dispur",
    location: "Dispur, Guwahati",
    city: "Guwahati",
    area: "Dispur",
    status: "PURCHASED",
    type: "Sale",
    price: "₹35,00,000",
    priceValue: 3500000,
    bhk: 1,
    bath: 1,
    size: "650 sq.ft",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1536376074432-bc42fa45c170?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function MyProperties() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    city: "All",
    type: "All",
    maxPrice: 10000000,
    minRating: 0,
    search: "",
  });

  const filteredProperties = myProperties.filter((p) => {
    const matchesTab = activeTab === "ALL" || p.status === activeTab;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCity = filters.city === "All" || p.area === filters.city;
    const matchesType = filters.type === "All" || p.type === filters.type;
    const matchesPrice = p.priceValue <= filters.maxPrice;
    const matchesRating = p.rating >= filters.minRating;

    return (
      matchesTab &&
      matchesSearch &&
      matchesCity &&
      matchesType &&
      matchesPrice &&
      matchesRating
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            My Properties
          </h1>
          <p className="text-zinc-400 text-sm font-medium">
            Manage your real estate portfolio and listings.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 text-xs"
        >
          <PlusCircle size={16} /> Add Property
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto scrollbar-hide">
          {["ALL", "OWNED", "LISTED", "PURCHASED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/10"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64 group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors"
              size={14}
            />
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
              showFilters
                ? "bg-orange-500 border-orange-500 text-white"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            <Filter size={14} /> Filters
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <FilterPanel
            onClose={() => setShowFilters(false)}
            onApply={(newFilters) => {
              setFilters(newFilters);
              setShowFilters(false);
            }}
            initialFilters={filters}
          />
        )}
      </AnimatePresence>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((p) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-[1.5rem] overflow-hidden group backdrop-blur-sm"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-lg ${
                    p.status === "LISTED"
                      ? "bg-orange-500 text-white"
                      : p.status === "OWNED"
                        ? "bg-emerald-500 text-white"
                        : "bg-blue-500 text-white"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="flex gap-2 w-full">
                  <button className="flex-1 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 text-[10px]">
                    <Edit3 size={12} /> Edit
                  </button>
                  <button className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md text-red-400 font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 text-[10px]">
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-white truncate">
                  {p.title}
                </h3>
                <p className="text-orange-500 font-bold text-sm">{p.price}</p>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] mb-4 font-medium">
                <MapPin size={12} />
                <span>{h.location}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 p-3 bg-zinc-800/30 rounded-xl border border-zinc-800/50">
                <div className="text-center">
                  <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-0.5">
                    BHK
                  </p>
                  <p className="text-white font-bold text-xs">{p.bhk}</p>
                </div>
                <div className="text-center border-x border-zinc-800/50">
                  <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-0.5">
                    Bath
                  </p>
                  <p className="text-white font-bold text-xs">{p.bath}</p>
                </div>
                <div className="text-center">
                  <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-0.5">
                    Area
                  </p>
                  <p className="text-white font-bold text-xs truncate px-1">
                    {p.size}
                  </p>
                </div>
              </div>
              {p.status === "OWNED" && (
                <button className="w-full mt-4 py-2.5 bg-zinc-800 hover:bg-orange-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs group/btn">
                  <Tag
                    size={14}
                    className="group-hover/btn:rotate-12 transition-transform"
                  />{" "}
                  List Property
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Property Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
                    <Building2 size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Add New Property
                  </h2>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-zinc-800 rounded-xl text-zinc-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Property Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Modern Apartment"
                      className="w-full bg-zinc-800 border-none rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Expected Price
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹85,00,000"
                      className="w-full bg-zinc-800 border-none rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Address / Locality
                    </label>
                    <input
                      type="text"
                      placeholder="Full address"
                      className="w-full bg-zinc-800 border-none rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      BHK
                    </label>
                    <select className="w-full bg-zinc-800 border-none rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:ring-2 focus:ring-orange-500/20">
                      <option>1 BHK</option>
                      <option>2 BHK</option>
                      <option>3 BHK</option>
                      <option>4+ BHK</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Size (sq.ft)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1500"
                      className="w-full bg-zinc-800 border-none rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Property Images
                    </label>
                    <div className="border-2 border-dashed border-zinc-800 rounded-xl p-6 text-center hover:border-orange-500/30 transition-colors cursor-pointer group">
                      <Upload
                        className="mx-auto text-zinc-700 group-hover:text-orange-500 transition-colors mb-1.5"
                        size={24}
                      />
                      <p className="text-zinc-500 text-xs font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-zinc-700 text-[10px] mt-0.5">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              <div className="p-6 border-t border-zinc-800 bg-zinc-950/50 flex gap-3">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all text-xs"
                >
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 text-xs">
                  Save Property
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
