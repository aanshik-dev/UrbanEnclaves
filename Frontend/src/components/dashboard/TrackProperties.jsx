import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
import {
  Search,
  Filter,
  MapPin,
  Star,
  ArrowUpRight,
  Activity,
  Briefcase,
  Info,
} from "lucide-react";
import PropertyCarousel from "./PropertyCarousel";
import FilterPanel from "./FilterPanel";

export default function TrackProperties() {
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await API.get("/api/properties/me/properties");
        setPropertyData(response.data.data);
        console.log(response.data.data);

        if (response.data.data.length > 0) {
          setSelectedProperty(response.data.data[0]);
        }
      } catch (error) {
        console.error(
          "Error fetching property data:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, []);

  const filteredProperties = propertyData.filter(
    (p) =>
      p.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  console.log(filteredProperties);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 font-medium animate-pulse">
        Loading Dashboard Analytics...
      </div>
    );
  }

  if (!propertyData) {
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 font-medium">
        No Property Data Available
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header & Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Track Properties
          </h1>
          <p className="text-zinc-400 text-sm font-medium">
            Monitor all property listings and assigned agents.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group w-48">
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
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all font-bold text-xs ${
              showFilters
                ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-orange-500/50 hover:text-white"
            }`}
          >
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <FilterPanel
            role="ADMIN"
            onClose={() => setShowFilters(false)}
            onApply={(f) => {
              console.log(f);
              setShowFilters(false);
            }}
          />
        )}
      </AnimatePresence>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Listings List */}
        <div className="w-[380px] overflow-y-auto pr-2 space-y-3 scrollbar-hide">
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              onClick={() => setSelectedProperty(property)}
              whileHover={{ x: 4 }}
              className={`p-3 rounded-2xl border cursor-pointer transition-all group ${
                selectedProperty.id === property.id
                  ? "bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/5"
                  : "bg-zinc-900/50 border-zinc-800 hover:border-orange-500/30"
              }`}
            >
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={property.images.length > 0 ? property.images[0] : ""}
                    alt={`property #${property.id}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500`}
                    >
                      #{property.id}
                    </span>
                    <span
                      className={`font-bold text-xs ${
                        property.type === "FLAT"
                          ? "bg-rose-500/10 text-rose-500"
                          : "bg-emerald-500/10 text-emerald-500"
                      }`}
                    >
                      {property.type}
                    </span>
                  </div>
                  <h3 className="text-white font-bold truncate text-sm mb-0.5">
                    {`${property.BHK} BHK in ${property.locality}`}
                  </h3>
                  <div className="flex items-center gap-1 text-zinc-500 text-[10px] mb-1.5">
                    <MapPin size={10} />
                    <span className="truncate">{`${property.houseNo}, ${property.area}, ${property.city}`}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-lg bg-orange-500/20 flex items-center justify-center text-[9px] font-bold text-orange-500">
                        {property.owner.name.substring(0, 2)}
                      </div>
                      <span className="text-zinc-400 text-[9px] font-bold truncate max-w-[80px]">
                        {property.owner.name}
                      </span>
                    </div>
                    <span className="text-zinc-600 text-[9px] font-bold">
                      {property.year_built}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Property Detail Panel */}
        <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-y-auto scrollbar-hide flex flex-col backdrop-blur-sm">
          <div className="h-[400px] min-h-[400px] relative group">
            <PropertyCarousel
              images={selectedProperty.images}
              title={`${selectedProperty.BHK} BHK in ${selectedProperty.locality}`}
            />
            <div className="absolute bottom-6 left-8 pointer-events-none">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                  {selectedProperty.type}
                </span>
                <span className="text-white/80 text-xs font-medium flex items-center gap-1">
                  <MapPin size={12} />{" "}
                  {`${selectedProperty.houseNo}, ${selectedProperty.locality}, ${selectedProperty.area}, ${selectedProperty.city} - ${selectedProperty.pin}`}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {`${selectedProperty.BHK} BHK in ${selectedProperty.locality}`}
              </h2>
            </div>
            <div className="absolute bottom-6 right-8 pointer-events-none">
              <p className="text-2xl font-bold text-orange-500">
                #{selectedProperty.id}
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800/50 text-center">
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                  BHK
                </p>
                <p className="text-white font-bold text-sm">
                  {selectedProperty.BHK}
                </p>
              </div>
              <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800/50 text-center">
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                  Area
                </p>
                <p className="text-white font-bold text-sm">
                  {selectedProperty.size}
                </p>
              </div>
              <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800/50 text-center">
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                  Year
                </p>
                <p className="text-white font-bold text-sm">
                  {selectedProperty.year_built}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-6">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                  <Activity className="text-orange-500" size={16} /> Property
                  Status
                </h4>
                <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-xs font-medium">
                      Property Type
                    </span>
                    <span className="text-white font-bold text-xs">
                      {selectedProperty.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-xs font-medium">
                      Property ID
                    </span>
                    <span className="text-white font-bold text-xs">
                      {selectedProperty.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-xs font-medium">
                      Handler Office
                    </span>
                    <span className="text-white font-bold text-xs">
                      {selectedProperty.office.officeName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-xs font-medium">
                      Office Contact
                    </span>
                    <span className="text-white font-bold text-xs">
                      +91 {selectedProperty.office.officeContact}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                  <Briefcase className="text-orange-500" size={16} /> Owner
                  details
                </h4>
                <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-orange-500/20">
                      {selectedProperty.owner.name.substring(0, 2)}
                    </div>
                    <div>
                      <h5 className="text-white font-bold text-sm">
                        {selectedProperty.owner.name}
                      </h5>
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-0.5">
                        {selectedProperty.owner.phone}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-all text-xs flex items-center justify-center gap-2"
                  >
                    View Profile <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

              <div className="col-span-2 mb-3 mx-3">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
                  <Info className="text-orange-500" size={16} /> Description
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                  {null || "No description available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
