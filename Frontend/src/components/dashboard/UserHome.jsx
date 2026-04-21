import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
import {
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  ChevronRight,
  Star,
  Phone,
  Mail,
  Calendar,
  Handshake,
  ArrowUpDown,
  Briefcase,
  Info,
  Search,
  User,
  Activity,
  CheckCircle2,
  UserPlus,
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
];

const getRandomImages = () => {
  const shuffled = [...FALLBACK_IMAGES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

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

// Helper function to format price
const formatPrice = (price, listingType) => {
  if (!price) return "N/A";

  if (listingType === "RENT") {
    return `₹${(price / 1000).toLocaleString("en-IN")}k/mo`;
  } else {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    }
    return `₹${price.toLocaleString("en-IN")}`;
  }
};

// Helper function to get property title
const getPropertyTitle = (property) => {
  if (!property) return "Property";
  const bhkText = property.BHK === 1 ? "1 bhk" : `${property.BHK} BHK`;
  return `${bhkText} ${property.type.toLowerCase() || "Property"} in ${property.area || property.city || "Prime Location"}`;
};

// Helper function to get location string
const getLocationString = (property) => {
  if (!property) return "Location not specified";
  const parts = [property.locality, property.area, property.city].filter(
    Boolean,
  );
  return parts.join(", ");
};

export default function UserHome() {
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState(BLANK_FILTERS);
  const filterBtnRef = useRef(null);
  const [isVisitToggle, setIsVisitToggle] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await API.get("/api/listings");
        const processedData = response.data.data.map((item) => ({
          ...item,
          images: getRandomImages(),
        }));
        // Filter only ACTIVE listings that have an agent assigned
        const userListings = processedData.filter(
          (p) => p.status === "ACTIVE" && p.agent,
        );
        setPropertyData(userListings);
        if (userListings.length > 0) setSelectedProperty(userListings[0]);
        console.log("Property Data:", userListings);
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

    // BHK — stored as number
    if (activeFilters.bhk !== "All") {
      const bhkNum = parseInt(String(activeFilters.bhk));
      if (p.BHK !== bhkNum) return false;
    }

    // Price
    if (token.price < activeFilters.minPrice) return false;
    if (
      activeFilters.maxPrice !== Infinity &&
      token.price > activeFilters.maxPrice
    )
      return false;

    // Size
    if (p.size < activeFilters.minSize) return false;
    if (activeFilters.maxSize !== Infinity && p.size > activeFilters.maxSize)
      return false;

    return true;
  });

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

  const handleBecomeAgent = () => {
    setRequestSent(true);
    setTimeout(() => setRequestSent(false), 3000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] relative">
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
                          {formatPrice(token.price, token.listingType)}
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

        {/* Property Details Preview - CORRECTED FOR API STRUCTURE */}
        {selectedProperty && (
          <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-y-auto scrollbar-hide flex flex-col relative backdrop-blur-sm">
            <div className="h-[450px] min-h-[450px] relative group">
              <PropertyCarousel
                images={selectedProperty.images}
                title={getPropertyTitle(selectedProperty.property)}
              />
              <div className="absolute bottom-6 left-8 pointer-events-none">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase">
                    {selectedProperty.property.type}
                  </span>
                  <span className="text-white/80 text-sm font-medium flex items-center gap-1">
                    <MapPin size={12} /> {selectedProperty.property.area},{" "}
                    {selectedProperty.property.city}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {getPropertyTitle(selectedProperty.property)}
                </h2>
              </div>
              <div className="absolute bottom-6 right-8 pointer-events-none">
                <p className="text-2xl font-bold text-orange-500">
                  {formatPrice(
                    selectedProperty.price,
                    selectedProperty.listingType,
                  )}
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
              <div className="mb-6">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <MapPin className="text-orange-500" size={16} /> Location
                  Details
                </h4>
                <div className="bg-zinc-800/20 rounded-2xl border border-zinc-800/50 overflow-hidden">
                  <div className="grid grid-cols-2 sm:grid-cols-3">
                    <div className="p-4 border-b border-r border-zinc-800/50">
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                        Flat / House No
                      </p>
                      <p className="text-zinc-200 font-semibold text-sm">
                        {selectedProperty.property.houseNo}
                      </p>
                    </div>
                    <div className="p-4 border-b border-r sm:border-r border-zinc-800/50">
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                        Locality
                      </p>
                      <p className="text-zinc-200 font-semibold text-sm">
                        {selectedProperty.property.locality}
                      </p>
                    </div>
                    <div className="p-4 border-b border-zinc-800/50">
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                        Area
                      </p>
                      <p className="text-zinc-200 font-semibold text-sm">
                        {selectedProperty.property.area}
                      </p>
                    </div>
                    <div className="p-4 border-r border-zinc-800/50">
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                        City
                      </p>
                      <p className="text-zinc-200 font-semibold text-sm">
                        {selectedProperty.property.city}
                      </p>
                    </div>
                    <div className="p-4 border-r border-zinc-800/50">
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                        Pincode
                      </p>
                      <p className="text-zinc-200 font-semibold text-sm">
                        {selectedProperty.property.pin}
                      </p>
                    </div>
                    <div className="p-4">
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

              <div className="mb-6">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Info className="text-orange-500" size={16} /> Description
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium bg-zinc-800/20 p-4 rounded-xl border border-zinc-800/50">
                  {`Premium ${selectedProperty.property.BHK} BHK ${selectedProperty.property.type} located in the prime area of ${selectedProperty.property.locality}, ${selectedProperty.property.city}. The property features a spacious ${selectedProperty.property.size} sq.ft layout with modern amenities.`}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Listing Details */}
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
                        {(() => {
                          const [year, month, day] =
                            selectedProperty.listingDate.split("-");
                          return `${day}-${month}-${year}`;
                        })()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 text-xs font-medium">
                        Status
                      </span>
                      <span
                        className={`text-xs font-bold ${selectedProperty.status === "ACTIVE" ? "text-emerald-500" : "text-rose-500"}`}
                      >
                        {selectedProperty.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Owner Info */}
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                    <User className="text-orange-500" size={16} /> Owner details
                  </h4>
                  <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50">
                    <div className="flex items-center gap-3 mb-4">
                      {/* Owner Profile Picture */}
                      {selectedProperty.owner?.profileUrl ? (
                        <img
                          src={selectedProperty.owner.profileUrl}
                          alt={selectedProperty.owner.name}
                          className="w-12 h-12 rounded-xl object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-orange-500/20 uppercase ${
                          selectedProperty.owner?.profileUrl ? "hidden" : ""
                        }`}
                      >
                        {selectedProperty.owner?.name?.substring(0, 2) || "NA"}
                      </div>
                      <div>
                        <h5 className="text-white font-bold text-sm">
                          {selectedProperty.owner?.name || "Unknown"}
                        </h5>
                        <div className="flex items-center gap-2.5 text-zinc-400 text-xs hover:text-white transition-colors cursor-pointer mt-2">
                          <Phone
                            size={12}
                            className="text-orange-500 flex-shrink-0"
                          />
                          <span className="font-medium truncate">
                            {selectedProperty.owner?.phone || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-zinc-700/50">
                      View Owner Profile
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Agent Section */}
                <div className="space-y-4">
                  <h4 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
                    <Briefcase className="text-orange-500" size={16} /> Assigned
                    Agent
                  </h4>
                  <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50">
                    {selectedProperty.agent ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          {/* Agent Profile Picture */}
                          {selectedProperty.agent.profileUrl ? (
                            <img
                              src={selectedProperty.agent.profileUrl}
                              alt={selectedProperty.agent.name}
                              className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-orange-500/20 uppercase flex-shrink-0 ${
                              selectedProperty.agent.profileUrl ? "hidden" : ""
                            }`}
                          >
                            {selectedProperty.agent.name?.substring(0, 2) ||
                              "AG"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <h5 className="text-white font-bold text-sm truncate">
                                {selectedProperty.agent.name}
                              </h5>
                              <div className="flex items-center gap-1 text-orange-500">
                                <Star size={14} fill="currentColor" />
                                <span className="text-[11px] font-bold">
                                  {selectedProperty.agent.userRating || "N/A"}{" "}
                                  Rating
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2.5 text-zinc-400 text-xs hover:text-white transition-colors cursor-pointer mt-2">
                              <Phone
                                size={12}
                                className="text-orange-500 flex-shrink-0"
                              />
                              <span className="font-medium truncate">
                                {selectedProperty.agent.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="w-full py-2.5 border border-orange-500/30 hover:bg-orange-500/10 text-orange-500 font-bold rounded-lg transition-all text-xs">
                          Contact Agent
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-zinc-500 text-sm">
                          No agent assigned to this property
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Representative Request */}
                <div className="space-y-6">
                  <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                      <Handshake className="text-orange-500" size={16} /> Make a
                      Deal
                    </h4>
                    <div className="flex items-center justify-between mb-4 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                          <Calendar size={16} />
                        </div>
                        <span className="text-xs font-bold text-zinc-300">
                          Visit Property
                        </span>
                      </div>
                      <button
                        onClick={() => setIsVisitToggle(!isVisitToggle)}
                        className={`w-10 h-5 rounded-full transition-all relative ${isVisitToggle ? "bg-orange-500" : "bg-zinc-700"}`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${isVisitToggle ? "left-5.5" : "left-0.5"}`}
                        ></div>
                      </button>
                    </div>
                    <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-sm">
                      Make a Deal <ChevronRight size={16} />
                    </button>
                  </div>
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
