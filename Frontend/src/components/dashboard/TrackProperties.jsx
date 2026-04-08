import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
import {
  Search,
  Filter,
  MapPin,
  Building2,
  Activity,
  Briefcase,
  Info,
  ChevronDown,
} from "lucide-react";
import PropertyCarousel from "./PropertyCarousel";
import FilterPanel from "./FilterPanel";

// 1. Pool of high-quality fallback images
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2073&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop",
];

// Helper to assign 3 random fallback images
const getRandomImages = () => {
  const shuffled = [...FALLBACK_IMAGES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

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
        
        // Map data and assign fallback images if API array is empty
        const processedData = response.data.data.map(p => ({
          ...p,
          images: (p.images && p.images.length > 0) ? p.images : getRandomImages()
        }));

        setPropertyData(processedData);

        if (processedData.length > 0) {
          setSelectedProperty(processedData[0]);
        }
      } catch (error) {
        console.error("Error fetching property data:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, []);

  const query = searchQuery.trim().toLowerCase();

  const filteredProperties = propertyData.filter((p) =>
    (p.locality || "").toLowerCase().includes(query) ||
    (p.city || "").toLowerCase().includes(query) ||
    (p.area || "").toLowerCase().includes(query) ||
    String(p.pin || "").includes(query) ||
    (p.type || "").toLowerCase().includes(query)
  );

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 font-medium animate-pulse">
        Fetching Property Portfolio...
      </div>
    );
  }

  if (propertyData.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 font-medium">
        No Property Data Available
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold text-white tracking-tight">Track Properties</h1>
          <p className="text-zinc-400 text-sm font-medium">Monitor your personal listings and handler offices.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={14} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-3 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all text-xs font-medium"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Listings List */}
        <div className="w-[380px] overflow-y-auto pr-2 space-y-3 scrollbar-hide">
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              onClick={() => setSelectedProperty(property)}
              whileHover={{ x: 4 }}
              className={`p-3 rounded-2xl border cursor-pointer transition-all group ${
                selectedProperty?.id === property.id
                  ? "bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/5"
                  : "bg-zinc-900/50 border-zinc-800 hover:border-orange-500/30"
              }`}
            >
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-800">
                  <img
                    src={property.images[0]}
                    alt="property thumb"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                      #{property.id}
                    </span>
                    <span className="text-orange-500 font-bold text-xs uppercase">{property.type}</span>
                  </div>
                  <h3 className="text-white font-bold truncate text-sm mb-0.5">
                    {property.BHK} BHK • {property.locality}
                  </h3>
                  <div className="flex items-center gap-1 text-zinc-500 text-[10px] mb-1.5">
                    <MapPin size={10} />
                    <span className="truncate">{property.city}, {property.area}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-lg bg-orange-500/20 flex items-center justify-center text-[9px] font-bold text-orange-500 uppercase">
                        {property.owner?.name?.substring(0, 2)}
                      </div>
                      <span className="text-zinc-400 text-[9px] font-bold truncate max-w-[80px]">
                        {property.owner?.name}
                      </span>
                    </div>
                    <span className="text-zinc-600 text-[9px] font-bold">{property.year_built}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Property Detail Panel */}
        {selectedProperty && (
          <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-y-auto scrollbar-hide flex flex-col backdrop-blur-sm">
            <div className="h-[400px] min-h-[400px] relative group">
              <PropertyCarousel images={selectedProperty.images} title={selectedProperty.houseNo} />
              <div className="absolute bottom-6 left-8 pointer-events-none">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase">
                    {selectedProperty.type}
                  </span>
                  <span className="text-white/80 text-xs font-medium flex items-center gap-1">
                    <MapPin size={12} /> {selectedProperty.city}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {selectedProperty.BHK} BHK in {selectedProperty.locality}
                </h2>
              </div>
              <div className="absolute bottom-6 right-8 pointer-events-none text-right">
                <p className="text-2xl font-bold text-orange-500">#{selectedProperty.id}</p>
                <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Property ID</p>
              </div>
            </div>

            <div className="p-6">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800/50 text-center">
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">BHK</p>
                  <p className="text-white font-bold text-sm">{selectedProperty.BHK}</p>
                </div>
                <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800/50 text-center">
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">Area Size</p>
                  <p className="text-white font-bold text-sm">{selectedProperty.size} sq.ft</p>
                </div>
                <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800/50 text-center">
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">Year Built</p>
                  <p className="text-white font-bold text-sm">{selectedProperty.year_built}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Office Info */}
                <div className="space-y-6">
                  <h4 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Activity className="text-orange-500" size={16} /> Handling Office
                  </h4>
                  <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 text-xs font-medium">Office Name</span>
                      <span className="text-white font-bold text-xs">{selectedProperty.office?.officeName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 text-xs font-medium">Contact</span>
                      <span className="text-white font-bold text-xs">+91 {selectedProperty.office?.officeContact}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 text-xs font-medium">Pin Code</span>
                      <span className="text-white font-bold text-xs">{selectedProperty.pin}</span>
                    </div>
                  </div>
                  <div className="mx-2">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
                      <Info className="text-orange-500" size={16} /> Description
                    </h4>
                    <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                      Premium {selectedProperty.BHK} BHK {selectedProperty.type} located in the prime area of {selectedProperty.locality}. 
                      The property features a spacious {selectedProperty.size} sq.ft layout with modern amenities handled by the {selectedProperty.office?.officeName}.
                    </p>
                  </div>
                </div>

                {/* Owner Info */}
                <div className="space-y-6">
                  <h4 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Briefcase className="text-orange-500" size={16} /> Owner details
                  </h4>
                  <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-orange-500/20 uppercase">
                        {selectedProperty.owner?.name?.substring(0, 2)}
                      </div>
                      <div>
                        <h5 className="text-white font-bold text-sm">{selectedProperty.owner?.name}</h5>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                          Contact: {selectedProperty.owner?.phone}
                        </p>
                      </div>
                    </div>
                    <button className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-zinc-700/50">
                      View Owner History
                    </button>
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