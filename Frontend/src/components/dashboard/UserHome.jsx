import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import PropertyCarousel from "./PropertyCarousel";
import FilterPanel from "./FilterPanel";

const properties = [
  {
    id: 1,
    title: "Skyline Luxury Apartment",
    location: "G.S. Road, Guwahati",
    price: "₹85,00,000",
    type: "Sale",
    bhk: 3,
    bath: 2,
    size: "1500 sq.ft",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1536376074432-bc42fa45c170?q=80&w=2070&auto=format&fit=crop",
    ],
    agent: {
      name: "Rahul Kapoor",
      rating: 4.8,
      phone: "+91 98765 43210",
      email: "rahul.k@urbanenclaves.com",
      image: "RK",
    },
    description:
      "Experience luxury living in the heart of the city. This 3BHK apartment offers breathtaking views and modern amenities. The property features high-end finishes, a spacious balcony, and access to a premium clubhouse and gym. Located in a prime residential area with excellent connectivity to major business hubs and shopping centers.",
  },
  {
    id: 2,
    title: "Green Valley Villa",
    location: "Zoo Road, Guwahati",
    price: "₹45,000/mo",
    type: "Rent",
    bhk: 4,
    bath: 3,
    size: "2200 sq.ft",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
    ],
    agent: {
      name: "Priya Singh",
      rating: 4.9,
      phone: "+91 98765 43211",
      email: "priya.s@urbanenclaves.com",
      image: "PS",
    },
    description:
      "Spacious 4BHK villa with a private garden and high-end finishes. Perfect for families looking for comfort and style. This villa is part of a gated community with 24/7 security, a swimming pool, and beautifully landscaped common areas. The interiors are designed with a focus on natural light and ventilation.",
  },
  {
    id: 3,
    title: "Modern Studio Loft",
    location: "Dispur, Guwahati",
    price: "₹35,00,000",
    type: "Sale",
    bhk: 1,
    bath: 1,
    size: "650 sq.ft",
    images: [
      "https://images.unsplash.com/photo-1536376074432-bc42fa45c170?q=80&w=2070&auto=format&fit=crop",
    ],
    agent: {
      name: "Amit Verma",
      rating: 4.7,
      phone: "+91 98765 43212",
      email: "amit.v@urbanenclaves.com",
      image: "AV",
    },
    description:
      "Compact and stylish studio loft ideal for young professionals. Located in a prime business district, this loft offers a modern open-plan layout with high ceilings and large windows. The building provides excellent amenities including a co-working space and a rooftop lounge.",
  },
];

export default function UserHome() {
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [isVisitToggle, setIsVisitToggle] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header & Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Available Listings
          </h1>
          <p className="text-zinc-400 text-sm font-medium">
            Find your dream home with our elite agents.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all font-bold text-xs ${
              showFilters
                ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-orange-500/50 hover:text-white"
            }`}
          >
            <Filter size={16} /> Filters
          </button>
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:border-orange-500/50 hover:text-white transition-all cursor-pointer font-bold text-xs">
            <ArrowUpDown size={16} /> Sort By
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <FilterPanel
            onClose={() => setShowFilters(false)}
            onApply={(f) => {
              console.log(f);
              setShowFilters(false);
            }}
          />
        )}
      </AnimatePresence>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Listings Sidebar */}
        <div className="w-[380px] overflow-y-auto pr-2 space-y-3 scrollbar-hide">
          {properties.map((property) => (
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
                        property.type === "Sale"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {property.type}
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
                  <div className="flex items-center gap-3 text-zinc-400 text-[9px] font-bold">
                    <span className="flex items-center gap-1">
                      <Bed size={10} /> {property.bhk} BHK
                    </span>
                    <span className="flex items-center gap-1">
                      <Square size={10} /> {property.size}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Property Details Preview */}
        <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-y-auto scrollbar-hide flex flex-col relative backdrop-blur-sm">
          <div className="h-[350px] min-h-[350px] relative group">
            <PropertyCarousel
              images={selectedProperty.images}
              title={selectedProperty.title}
            />
            <div className="absolute bottom-6 left-8 pointer-events-none">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                  {selectedProperty.type}
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
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-zinc-800/30 p-3 rounded-xl flex items-center gap-3 border border-zinc-800/50">
                <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                  <Bed size={16} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                    Bedrooms
                  </p>
                  <p className="text-white font-bold text-sm">
                    {selectedProperty.bhk} BHK
                  </p>
                </div>
              </div>
              <div className="bg-zinc-800/30 p-3 rounded-xl flex items-center gap-3 border border-zinc-800/50">
                <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                  <Bath size={16} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                    Bathrooms
                  </p>
                  <p className="text-white font-bold text-sm">
                    {selectedProperty.bath} Baths
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
                    {selectedProperty.size}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm">
                    <Info className="text-orange-500" size={16} /> Description
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                    {selectedProperty.description}
                  </p>
                </div>

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

              <div>
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
                      <div className="flex items-center gap-1 text-orange-500">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-bold">
                          {selectedProperty.agent.rating} Rating
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 text-zinc-400 text-xs hover:text-white transition-colors cursor-pointer">
                      <Phone size={14} className="text-orange-500" />
                      <span className="font-medium">
                        {selectedProperty.agent.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-zinc-400 text-xs hover:text-white transition-colors cursor-pointer">
                      <Mail size={14} className="text-orange-500" />
                      <span className="font-medium truncate">
                        {selectedProperty.agent.email}
                      </span>
                    </div>
                  </div>
                  <button className="w-full mt-5 py-2 border border-orange-500/30 hover:bg-orange-500/10 text-orange-500 font-bold rounded-lg transition-all text-xs">
                    Contact Agent
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
