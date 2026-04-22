import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
import {
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  Handshake,
  CheckCircle2,
  User,
  Info,
  UserPlus,
  Calendar,
  Activity,
  Building,
} from "lucide-react";
import PropertyCarousel from "./PropertyCarousel";
import FilterPanel from "./FilterPanel";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2073&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop",
  "https://img.collegepravesh.com/2018/12/IIIT-Guwahati.jpg",
  "https://img.collegepravesh.com/2018/12/IIIT-Guwahati.jpg",
  "https://img.collegepravesh.com/2018/12/IIIT-Guwahati.jpg",
  "https://img.collegepravesh.com/2018/12/IIIT-Guwahati.jpg",
  "https://img.collegepravesh.com/2018/12/IIIT-Guwahati.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR78_uYwLxHr3wdtkSlldhkgW8JnLkUPvMmsA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR78_uYwLxHr3wdtkSlldhkgW8JnLkUPvMmsA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR78_uYwLxHr3wdtkSlldhkgW8JnLkUPvMmsA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR78_uYwLxHr3wdtkSlldhkgW8JnLkUPvMmsA&s",
];

const getRandomImages = () => {
  const shuffled = [...FALLBACK_IMAGES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

// True defaults — always "no filter applied" semantics, sliders driven by data bounds passed in
const BLANK_FILTERS = {
  listingType: "All",
  propertyType: "All",
  city: "All",
  bhk: "All",
  minPrice: 0,
  maxPrice: Infinity,
  minSize: 0,
  maxSize: Infinity,
};

export default function AgentListings() {
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [activeFilters, setActiveFilters] = useState(BLANK_FILTERS);
  const [notification, setNotification] = useState(null);
  const filterBtnRef = useRef(null);

  const fetchPropertyData = async () => {
    try {
      const response = await API.get("/api/agents/listings/available");
      const processedData = response.data.data.map((p) => ({
        ...p,
        images: p.images && p.images.length > 0 ? p.images : getRandomImages(),
      }));
      setPropertyData(processedData);
      console.log("Property Data:", processedData);
      if (
        processedData.length > 0 &&
        (!selectedProperty ||
          !processedData.find((p) => p.tokenId === selectedProperty.tokenId))
      ) {
        setSelectedProperty(processedData[0]);
      } else if (processedData.length === 0) {
        setSelectedProperty(null);
      }
    } catch (error) {
      console.error(
        "Error fetching property data:",
        error.response?.data || error.message,
      );
      showNotification("Failed to fetch listings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyData();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBecomeAgent = async () => {
    if (!selectedProperty) return;

    setRequestSent(true);
    try {
      const response = await API.put(
        `/api/listings/${selectedProperty.tokenId}/accept`,
      );

      if (response.data.success || response.status === 200) {
        showNotification(
          `Successfully accepted listing ${selectedProperty.tokenId}!`,
          "success",
        );
        // Refresh the listings
        await fetchPropertyData();
      } else {
        showNotification(
          response.data.message || "Failed to accept listing",
          "error",
        );
      }
    } catch (error) {
      console.error("Error accepting listing:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to accept listing";
      showNotification(errorMessage, "error");
    } finally {
      setRequestSent(false);
    }
  };

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

  const query = searchQuery.trim().toLowerCase();

  const filteredProperties = propertyData.filter((token) => {
    const p = token.property;

    if (query) {
      const matchFields = [
        p.locality || "",
        p.city || "",
        p.area || "",
        String(p.pin || ""),
        String(p.propertyId || ""),
        String(token.tokenId || ""),
      ];
      if (!matchFields.some((s) => s.toLowerCase().includes(query)))
        return false;
    }

    // Listing type — exact match (SELL / RENT)
    if (
      activeFilters.listingType !== "All" &&
      token.listingType !== activeFilters.listingType
    )
      return false;

    // Property type — exact uppercase match (FLAT / APARTMENT)
    if (
      activeFilters.propertyType !== "All" &&
      (p.type || "").toUpperCase() !== activeFilters.propertyType.toUpperCase()
    )
      return false;

    // City — case-insensitive exact match
    if (
      activeFilters.city !== "All" &&
      (p.city || "").toLowerCase() !== activeFilters.city.toLowerCase()
    )
      return false;

    // BHK — stored as "3 BHK" string, parse out the number
    if (activeFilters.bhk !== "All") {
      const bhkNum = parseInt(String(activeFilters.bhk));
      if (p.BHK !== bhkNum) return false;
    }

    // Price — Infinity means "no upper bound" so always passes
    if (token.price < activeFilters.minPrice) return false;
    if (
      activeFilters.maxPrice !== Infinity &&
      token.price > activeFilters.maxPrice
    )
      return false;

    // Size — same Infinity sentinel
    if (p.size < activeFilters.minSize) return false;
    if (activeFilters.maxSize !== Infinity && p.size > activeFilters.maxSize)
      return false;

    return true;
  });

  // Count only non-default selections as "active"
  const activeFilterCount = [
    activeFilters.listingType !== "All",
    activeFilters.propertyType !== "All",
    activeFilters.city !== "All",
    activeFilters.bhk !== "All",
    activeFilters.minPrice > 0,
    activeFilters.maxPrice !== Infinity,
    activeFilters.minSize > 0,
    activeFilters.maxSize !== Infinity,
  ].filter(Boolean).length;

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    setShowFilters(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] relative">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 ${
              notification.type === "success"
                ? "bg-emerald-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <Info size={18} />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Sidebar */}
        <div className="w-[380px] flex flex-col gap-3 min-h-0">
          {/* Search + Filter controls above the list */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative group flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors"
                size={14}
              />
              <input
                type="text"
                placeholder="Search city, area, locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-3 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600 text-xs font-medium"
              />
            </div>
            <button
              ref={filterBtnRef}
              onClick={() => setShowFilters(!showFilters)}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border transition-all font-bold text-xs flex-shrink-0 ${
                showFilters || activeFilterCount > 0
                  ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-orange-500/50 hover:text-white"
              }`}
            >
              <Filter size={14} />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-orange-500 rounded-full text-[9px] font-black flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between flex-shrink-0">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
              {filteredProperties.length} listing
              {filteredProperties.length !== 1 ? "s" : ""}
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={() => setActiveFilters(BLANK_FILTERS)}
                className="text-orange-500 text-[10px] font-bold hover:text-orange-400 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Listings list */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-hide">
            {filteredProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-zinc-600 text-xs font-medium">
                <Filter size={24} className="mb-2 opacity-40" />
                No listings match your filters
              </div>
            ) : (
              filteredProperties.map((token) => (
                <motion.div
                  key={token.tokenId}
                  onClick={() => setSelectedProperty(token)}
                  whileHover={{ x: 4 }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all group ${
                    selectedProperty?.tokenId === token.tokenId
                      ? "bg-orange-500/10 border-orange-500 shadow-lg shadow-orange-500/5"
                      : "bg-zinc-900/50 border-zinc-800 hover:border-orange-500/30"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={token.images[0]}
                        alt={token.property.propertyId}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full ${
                            token.listingType === "SELL"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-blue-500/10 text-blue-500"
                          }`}
                        >
                          {token.listingType}
                        </span>
                        <span className="text-orange-500 font-bold text-xs">
                          ₹{token.price.toLocaleString()}
                        </span>
                      </div>
                      <h3 className="text-white font-bold truncate text-sm mb-0.5">
                        {token.property.BHK} BHK • {token.property.locality}
                      </h3>
                      <div className="flex items-center gap-1 text-zinc-500 text-[10px] mb-1.5">
                        <MapPin size={10} />
                        <span className="truncate">
                          {token.property.area}, {token.property.city}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-400 text-[9px] font-bold">
                        <span className="flex items-center gap-1">
                          <Bed size={10} /> {token.property.BHK} BHK
                        </span>
                        <span className="flex items-center gap-1">
                          <Square size={10} /> {token.property.size} sq ft
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Property Details Preview */}
        {selectedProperty && (
          <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-y-auto scrollbar-hide flex flex-col relative backdrop-blur-sm">
            <div className="h-[350px] min-h-[350px] relative group">
              <PropertyCarousel
                images={selectedProperty.images}
                title={selectedProperty.property.houseNo}
              />
              <div className="absolute bottom-6 left-8 pointer-events-none">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase">
                    {selectedProperty.property.type}
                  </span>
                  <span className="text-white/80 text-xs font-medium flex items-center gap-1">
                    <MapPin size={12} /> {selectedProperty.property.city}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {selectedProperty.property.BHK} BHK in{" "}
                  {selectedProperty.property.locality},{" "}
                  {selectedProperty.property.area}
                </h2>
              </div>
              <div className="absolute bottom-6 right-8 pointer-events-none">
                <p className="text-2xl font-bold text-orange-500">
                  ₹{selectedProperty.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-zinc-800/30 p-3 rounded-xl flex items-center gap-3 border border-zinc-800/50">
                  <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                    <Bed size={16} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                      Bedrooms
                    </p>
                    <p className="text-white font-bold text-sm">
                      {selectedProperty.property.BHK} BHK
                    </p>
                  </div>
                </div>
                <div className="bg-zinc-800/30 p-3 rounded-xl flex items-center gap-3 border border-zinc-800/50">
                  <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                    <Building size={16} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                      Type
                    </p>
                    <p className="text-white font-bold text-sm">
                      {selectedProperty.property.type}
                    </p>
                  </div>
                </div>
                <div className="bg-zinc-800/30 p-3 rounded-xl flex items-center gap-3 border border-zinc-800/50">
                  <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                    <Square size={16} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                      Total Area
                    </p>
                    <p className="text-white font-bold text-sm">
                      {selectedProperty.property.size} sq ft
                    </p>
                  </div>
                </div>
                <div className="bg-zinc-800/30 p-3 rounded-xl flex items-center gap-3 border border-zinc-800/50">
                  <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                      Listing Type
                    </p>
                    <p className="text-white font-bold text-sm">
                      {selectedProperty.listingType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Address */}
              <div className="mb-8">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <MapPin className="text-orange-500" size={16} /> Location
                  Details
                </h4>
                <div className="bg-zinc-800/20 rounded-2xl border border-zinc-800/50 overflow-hidden">
                  <div className="grid grid-cols-2 sm:grid-cols-3">
                    {/* Flat / House No */}
                    <div className="p-4 border-b border-r border-zinc-800/50">
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                        Flat / House No
                      </p>
                      <p className="text-zinc-200 font-semibold text-sm">
                        {selectedProperty.property.houseNo}
                      </p>
                    </div>

                    {/* Locality */}
                    <div className="p-4 border-b border-r sm:border-r border-zinc-800/50">
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                        Locality
                      </p>
                      <p className="text-zinc-200 font-semibold text-sm">
                        {selectedProperty.property.locality}
                      </p>
                    </div>

                    {/* Area */}
                    <div className="p-4 border-b border-zinc-800/50">
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                        Area
                      </p>
                      <p className="text-zinc-200 font-semibold text-sm">
                        {selectedProperty.property.area}
                      </p>
                    </div>

                    {/* City */}
                    <div className="p-4 border-r border-zinc-800/50">
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                        City
                      </p>
                      <p className="text-zinc-200 font-semibold text-sm">
                        {selectedProperty.property.city}
                      </p>
                    </div>

                    {/* Pincode */}
                    <div className="p-4 border-r border-zinc-800/50">
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                        Pincode
                      </p>
                      <p className="text-zinc-200 font-semibold text-sm">
                        {selectedProperty.property.pin}
                      </p>
                    </div>

                    {/* State / Region (Optional Placeholder or filler) */}
                    <div className="p-4 border-r border-zinc-800/50">
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                        Country
                      </p>
                      <p className="text-zinc-200 font-semibold text-sm">
                        INDIA
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Office Info */}
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Activity className="text-orange-500" size={16} /> Listing
                    Details
                  </h4>
                  <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 text-xs font-medium">
                        Token ID
                      </span>
                      <span className="text-white font-bold text-xs">
                        #{selectedProperty.tokenId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 text-xs font-medium">
                        Property ID
                      </span>
                      <span className="text-white font-bold text-xs">
                        #{selectedProperty.property.propertyId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 text-xs font-medium">
                        Listing Date
                      </span>
                      <span className="text-white font-bold text-xs">
                        {" "}
                        {(() => {
                          const [year, month, day] =
                            selectedProperty.listingDate.split("-");
                          return `${day}-${month}-${year}`;
                        })()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Owner Info */}
                {/* Owner Info Section - Updated with Profile Image */}
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                    <User className="text-orange-500" size={16} /> Owner details
                  </h4>
                  <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50">
                    <div className="flex items-center gap-3 mb-4">
                      {/* Avatar with Profile Image Support */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-orange-500/20 overflow-hidden">
                        {selectedProperty.owner?.profileUrl ? (
                          <img
                            src={selectedProperty.owner.profileUrl}
                            alt={selectedProperty.owner.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to initials if image fails to load
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML =
                                selectedProperty.owner.name
                                  .substring(0, 2)
                                  .toUpperCase();
                            }}
                          />
                        ) : (
                          <span className="uppercase">
                            {selectedProperty.owner.name.substring(0, 2)}
                          </span>
                        )}
                      </div>
                      <div>
                        <h5 className="text-white font-bold text-sm">
                          {selectedProperty.owner.name}
                        </h5>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                          Contact:{" "}
                          {selectedProperty.owner?.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <button className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-zinc-700/50">
                      View Owner Profile
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                      <Handshake className="text-orange-500" size={16} />{" "}
                      Representative Request
                    </h4>
                    <p className="text-zinc-500 text-[10px] font-medium mb-4">
                      Send a request to the owner to become the official agent
                      for this property.
                    </p>
                    <button
                      onClick={handleBecomeAgent}
                      disabled={requestSent}
                      className={`w-full py-3 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm ${
                        requestSent
                          ? "bg-emerald-500 text-white shadow-emerald-500/20"
                          : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20"
                      }`}
                    >
                      {requestSent ? (
                        <>
                          <CheckCircle2 size={16} /> Request Sent
                        </>
                      ) : (
                        <>
                          <UserPlus size={16} /> Become Agent
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-1 space-y-6 mt-5">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Info className="text-orange-500" size={16} /> Description
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium bg-zinc-800/20 p-4 rounded-xl border border-zinc-800/50">
                    Premium {selectedProperty.property.BHK} BHK{" "}
                    {selectedProperty.property.type} located in the prime area
                    of {selectedProperty.property.locality},{" "}
                    {selectedProperty.property.city}. The property features a
                    spacious {selectedProperty.property.size} sq.ft layout with
                    modern amenities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Modal Overlay */}
      <AnimatePresence>
        {showFilters && (
          <FilterPanel
            initialFilters={activeFilters}
            propertyData={propertyData}
            onApply={handleApplyFilters}
            onClose={() => setShowFilters(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
