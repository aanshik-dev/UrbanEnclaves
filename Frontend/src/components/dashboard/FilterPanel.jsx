import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  X,
  Filter as FilterIcon,
  MapPin,
  IndianRupee,
  Star,
  Calendar,
} from "lucide-react";

export default function FilterPanel({
  onApply,
  onClose,
  role,
  initialFilters,
}) {
  const [filters, setFilters] = useState(
    initialFilters || {
      search: "",
      type: "All",
      city: "All",
      minPrice: 0,
      maxPrice: 10000000,
      minRating: 0,
      amenities: [],
      dateRange: "All",
    },
  );

  const handleApply = () => {
    onApply(filters);
  };

  const toggleAmenity = (amenity) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden mb-6"
    >
      <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-orange-500">
            <FilterIcon size={18} />
            <span className="font-bold uppercase tracking-widest text-xs">
              Advanced Filters
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Search & Location */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Search size={12} /> Search Keyword
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                placeholder="Title, description..."
                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2 text-sm text-zinc-300 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <MapPin size={12} /> City Area
              </label>
              <select
                value={filters.city}
                onChange={(e) =>
                  setFilters({ ...filters, city: e.target.value })
                }
                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2 text-sm text-zinc-300 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 outline-none transition-all"
              >
                <option>All Areas</option>
                <option>G.S. Road</option>
                <option>Zoo Road</option>
                <option>Dispur</option>
                <option>Beltola</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <IndianRupee size={12} /> Price Range
              </label>
              <div className="pt-4 px-2">
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="100000"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxPrice: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] font-bold text-zinc-500">
                    ₹0
                  </span>
                  <span className="text-[10px] font-bold text-orange-500">
                    Up to ₹{(filters.maxPrice / 100000).toFixed(1)}L
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Calendar size={12} /> Listing Date
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) =>
                  setFilters({ ...filters, dateRange: e.target.value })
                }
                className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2 text-sm text-zinc-300 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 outline-none transition-all"
              >
                <option>All Time</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>
            </div>
          </div>

          {/* Rating & Type */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Star size={12} /> Min Agent Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFilters({ ...filters, minRating: star })}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      filters.minRating >= star
                        ? "bg-orange-500/20 border-orange-500/50 text-orange-500"
                        : "bg-zinc-800/50 border-zinc-700/50 text-zinc-500 hover:border-zinc-600"
                    }`}
                  >
                    {star}+
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {["Sale", "Rent"].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                      filters.type === type
                        ? "bg-orange-500/20 border-orange-500/50 text-orange-500"
                        : "bg-zinc-800/50 border-zinc-700/50 text-zinc-500 hover:border-zinc-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="propType"
                      className="hidden"
                      checked={filters.type === type}
                      onChange={() => setFilters({ ...filters, type })}
                    />
                    <span className="text-xs font-bold">{type}</span>
                  </label>
                ))}
                <label
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                    filters.type === "All"
                      ? "bg-orange-500/20 border-orange-500/50 text-orange-500"
                      : "bg-zinc-800/50 border-zinc-700/50 text-zinc-500 hover:border-zinc-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="propType"
                    className="hidden"
                    checked={filters.type === "All"}
                    onChange={() => setFilters({ ...filters, type: "All" })}
                  />
                  <span className="text-xs font-bold">All</span>
                </label>
              </div>
            </div>
          </div>

          {/* Amenities (Checkboxes) */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Amenities
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["Parking", "Gym", "Pool", "Security", "Garden", "Elevator"].map(
                (amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div
                      onClick={() => toggleAmenity(amenity)}
                      className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                        filters.amenities.includes(amenity)
                          ? "bg-orange-500 border-orange-500"
                          : "border-zinc-700 group-hover:border-zinc-600"
                      }`}
                    >
                      {filters.amenities.includes(amenity) && (
                        <div className="w-2 h-2 bg-white rounded-sm" />
                      )}
                    </div>
                    <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      {amenity}
                    </span>
                  </label>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 border-t border-zinc-800 pt-6">
          <button
            type="button"
            onClick={() =>
              setFilters({
                search: "",
                type: "All",
                city: "All",
                minPrice: 0,
                maxPrice: 10000000,
                minRating: 0,
                amenities: [],
                dateRange: "All",
              })
            }
            className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors"
          >
            Reset All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </motion.div>
  );
}
