import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const properties = [
  {
    id: 1,
    title: "Skyline Luxury Apartment",
    location: "G.S. Road, Guwahati",
    price: "₹85,00,000",
    status: "FOR SALE",
    type: "Apartment",
    bhk: 3,
    bath: 2,
    size: "1500 sq.ft",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    ],
    agent: {
      name: "Rahul Kapoor",
      aid: "AG-2024-001",
      rating: 4.8,
      image: "RK",
    },
    owner: {
      name: "Suresh Mehra",
      phone: "+91 98765 43210",
    },
    yearBuilt: 2024,
    description:
      "Experience luxury living in the heart of the city. This 3BHK apartment offers breathtaking views and modern amenities. The property features high-end finishes, a spacious balcony, and access to a premium clubhouse and gym.",
  },
  {
    id: 2,
    title: "Green Valley Villa",
    location: "Zoo Road, Guwahati",
    price: "₹45,000/mo",
    status: "FOR RENT",
    type: "Villa",
    bhk: 4,
    bath: 3,
    size: "2200 sq.ft",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
    ],
    agent: {
      name: "Priya Singh",
      aid: "AG-2024-002",
      rating: 4.9,
      image: "PS",
    },
    owner: {
      name: "Anita Das",
      phone: "+91 98765 43211",
    },
    yearBuilt: 2022,
    description:
      "Spacious 4BHK villa with a private garden and high-end finishes. Perfect for families looking for comfort and style. Part of a gated community with 24/7 security.",
  },
  {
    id: 3,
    title: "Modern Studio Loft",
    location: "Dispur, Guwahati",
    price: "₹35,00,000",
    status: "SOLD",
    type: "Apartment",
    bhk: 1,
    bath: 1,
    size: "650 sq.ft",
    images: [
      "https://images.unsplash.com/photo-1536376074432-bc42fa45c170?q=80&w=2070&auto=format&fit=crop",
    ],
    agent: {
      name: "Amit Verma",
      aid: "AG-2024-003",
      rating: 4.7,
      image: "AV",
    },
    owner: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43212",
    },
    yearBuilt: 2023,
    description:
      "Compact and stylish studio loft ideal for young professionals. Located in a prime business district.",
  },
];

export default function TrackProperties() {
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full ${
                        property.status === "SOLD"
                          ? "bg-rose-500/10 text-rose-500"
                          : "bg-emerald-500/10 text-emerald-500"
                      }`}
                    >
                      {property.status}
                    </span>
                    <span className="text-orange-500 font-bold text-xs">
                      {property.price}
                    </span>
                  </div>
                  <h3 className="text-white font-bold truncate text-sm mb-0.5">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-zinc-500 text-[10px] mb-1.5">
                    <MapPin size={10} />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-lg bg-orange-500/20 flex items-center justify-center text-[9px] font-bold text-orange-500">
                        {property.agent.image}
                      </div>
                      <span className="text-zinc-400 text-[9px] font-bold truncate max-w-[80px]">
                        {property.agent.name}
                      </span>
                    </div>
                    <span className="text-zinc-600 text-[9px] font-bold">
                      {property.yearBuilt}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Property Detail Panel */}
        <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-y-auto scrollbar-hide flex flex-col backdrop-blur-sm">
          <div className="h-[350px] min-h-[350px] relative group">
            <PropertyCarousel
              images={selectedProperty.images}
              title={selectedProperty.title}
            />
            <div className="absolute bottom-6 left-8 pointer-events-none">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                  {selectedProperty.status}
                </span>
                <span className="text-white/80 text-xs font-medium flex items-center gap-1">
                  <MapPin size={12} /> {selectedProperty.location}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {selectedProperty.title}
              </h2>
            </div>
            <div className="absolute bottom-6 right-8 pointer-events-none">
              <p className="text-2xl font-bold text-orange-500">
                {selectedProperty.price}
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800/50 text-center">
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                  BHK
                </p>
                <p className="text-white font-bold text-sm">
                  {selectedProperty.bhk}
                </p>
              </div>
              <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800/50 text-center">
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                  Baths
                </p>
                <p className="text-white font-bold text-sm">
                  {selectedProperty.bath}
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
                  {selectedProperty.yearBuilt}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                  <Activity className="text-orange-500" size={16} /> Property
                  Status
                </h4>
                <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-xs font-medium">
                      Listing Type
                    </span>
                    <span className="text-white font-bold text-xs">
                      {selectedProperty.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-xs font-medium">
                      Owner Name
                    </span>
                    <span className="text-white font-bold text-xs">
                      {selectedProperty.owner.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-xs font-medium">
                      Owner Contact
                    </span>
                    <span className="text-white font-bold text-xs">
                      {selectedProperty.owner.phone}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
                    <Info className="text-orange-500" size={16} /> Description
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                    {selectedProperty.description}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm">
                  <Briefcase className="text-orange-500" size={16} /> Assigned
                  Agent
                </h4>
                <div className="p-5 bg-zinc-800/20 rounded-2xl border border-zinc-800/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-orange-500/20">
                      {selectedProperty.agent.image}
                    </div>
                    <div>
                      <h5 className="text-white font-bold text-sm">
                        {selectedProperty.agent.name}
                      </h5>
                      <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-0.5">
                        {selectedProperty.agent.aid}
                      </p>
                      <div className="flex items-center gap-1 text-orange-500">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-bold">
                          {selectedProperty.agent.rating} Rating
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg transition-all text-xs flex items-center justify-center gap-2"
                  >
                    View Agent Performance <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
