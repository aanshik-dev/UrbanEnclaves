import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  X,
  Filter as FilterIcon,
  MapPin,
  IndianRupee,
  Home,
  LayoutGrid,
  Bed,
  Ruler,
} from "lucide-react";

// Sentinels — "no filter applied". Infinity means slider is at its maximum (unrestricted).
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

export default function FilterPanel({ onApply, onClose, initialFilters, propertyData = [] }) {
  // Derive data bounds first so sliders always reflect actual data
  const prices = propertyData.map((t) => t.price);
  const dataMinPrice = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const dataMaxPrice = prices.length ? Math.ceil(Math.max(...prices)) : 100000000;

  const sizes = propertyData.map((t) => t.property.size);
  const dataMinSize = sizes.length ? Math.floor(Math.min(...sizes)) : 0;
  const dataMaxSize = sizes.length ? Math.ceil(Math.max(...sizes)) : 5000;

  // Resolve Infinity sentinels → actual slider bounds for display
  const resolveFilters = (f) => ({
    ...f,
    minPrice: f.minPrice === 0 ? dataMinPrice : f.minPrice,
    maxPrice: f.maxPrice === Infinity ? dataMaxPrice : f.maxPrice,
    minSize: f.minSize === 0 ? dataMinSize : f.minSize,
    maxSize: f.maxSize === Infinity ? dataMaxSize : f.maxSize,
  });

  const [filters, setFilters] = useState(resolveFilters(initialFilters || BLANK_FILTERS));
  const modalRef = useRef(null);

  // Derived option lists from actual data
  const cities = ["All", ...Array.from(new Set(propertyData.map((t) => t.property.city))).sort()];
  const propertyTypes = ["All", ...Array.from(new Set(propertyData.map((t) => t.property.type))).sort()];
  const bhkNums = Array.from(new Set(propertyData.map((t) => t.property.BHK))).sort((a, b) => a - b);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const formatPrice = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(0)}L`;
    return `₹${val.toLocaleString()}`;
  };

  // Reset: set slider values to data bounds, chip filters to "All"
  const handleReset = () => {
    setFilters({
      listingType: "All",
      propertyType: "All",
      city: "All",
      bhk: "All",
      minPrice: dataMinPrice,
      maxPrice: dataMaxPrice,
      minSize: dataMinSize,
      maxSize: dataMaxSize,
    });
  };

  // Apply: convert slider-at-bound back to Infinity sentinel so AgentListings knows "no limit"
  const handleApply = () => {
    onApply({
      ...filters,
      minPrice: filters.minPrice <= dataMinPrice ? 0 : filters.minPrice,
      maxPrice: filters.maxPrice >= dataMaxPrice ? Infinity : filters.maxPrice,
      minSize: filters.minSize <= dataMinSize ? 0 : filters.minSize,
      maxSize: filters.maxSize >= dataMaxSize ? Infinity : filters.maxSize,
    });
  };

  // Active count: only non-"All" chip selections + slider moved from its bound
  const activeCount = [
    filters.listingType !== "All",
    filters.propertyType !== "All",
    filters.city !== "All",
    filters.bhk !== "All",
    filters.minPrice > dataMinPrice,
    filters.maxPrice < dataMaxPrice,
    filters.minSize > dataMinSize,
    filters.maxSize < dataMaxSize,
  ].filter(Boolean).length;

  const chipSet = (label, icon, key, options) => (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
        {icon} {label}
      </label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={String(opt)}
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, [key]: opt }))}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
              filters[key] === opt
                ? "bg-orange-500/20 border-orange-500/60 text-orange-400"
                : "bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl w-[640px] max-h-[85vh] overflow-y-auto scrollbar-hide"
      >
        {/* Header */}
        <div className="sticky top-0 bg-zinc-950 border-b border-zinc-800/80 px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
          <div className="flex items-center gap-2">
            <FilterIcon size={16} className="text-orange-500" />
            <span className="font-bold text-white text-sm">Filter Listings</span>
            {activeCount > 0 && (
              <span className="bg-orange-500/20 text-orange-400 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                {activeCount} active
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-7">
          {/* Listing Type */}
          {chipSet("Listing Type", <Home size={12} />, "listingType", ["All", "SELL", "RENT"])}

          {/* Property Type */}
          {chipSet("Property Type", <LayoutGrid size={12} />, "propertyType", propertyTypes)}

          {/* City */}
          {chipSet("City", <MapPin size={12} />, "city", cities)}

          {/* BHK — stored as raw number (or "All"), displayed as "1 BHK" etc. */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <Bed size={12} /> BHK
            </label>
            <div className="flex flex-wrap gap-1.5">
              {["All", ...bhkNums].map((opt) => {
                const label = opt === "All" ? "All" : `${opt} BHK`;
                const isActive = filters.bhk === opt;
                return (
                  <button
                    key={String(opt)}
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, bhk: opt }))}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                      isActive
                        ? "bg-orange-500/20 border-orange-500/60 text-orange-400"
                        : "bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <IndianRupee size={12} /> Price Range
            </label>
            <div className="bg-zinc-800/30 border border-zinc-800/50 rounded-2xl p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-xs font-bold">{formatPrice(filters.minPrice)}</span>
                <span className="text-xs text-zinc-600 font-medium">to</span>
                <span className="text-orange-400 text-xs font-bold">{formatPrice(filters.maxPrice)}</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-[9px] font-bold w-6">MIN</span>
                  <input
                    type="range"
                    min={dataMinPrice}
                    max={dataMaxPrice}
                    step={100000}
                    value={filters.minPrice}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: Math.min(val, prev.maxPrice - 100000),
                      }));
                    }}
                    className="flex-1 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-[9px] font-bold w-6">MAX</span>
                  <input
                    type="range"
                    min={dataMinPrice}
                    max={dataMaxPrice}
                    step={100000}
                    value={filters.maxPrice}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setFilters((prev) => ({
                        ...prev,
                        maxPrice: Math.max(val, prev.minPrice + 100000),
                      }));
                    }}
                    className="flex-1 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Size Range */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <Ruler size={12} /> Size Range (sq ft)
            </label>
            <div className="bg-zinc-800/30 border border-zinc-800/50 rounded-2xl p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-xs font-bold">{Math.round(filters.minSize)} sq ft</span>
                <span className="text-xs text-zinc-600 font-medium">to</span>
                <span className="text-orange-400 text-xs font-bold">{Math.round(filters.maxSize)} sq ft</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-[9px] font-bold w-6">MIN</span>
                  <input
                    type="range"
                    min={dataMinSize}
                    max={dataMaxSize}
                    step={50}
                    value={filters.minSize}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setFilters((prev) => ({
                        ...prev,
                        minSize: Math.min(val, prev.maxSize - 50),
                      }));
                    }}
                    className="flex-1 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-[9px] font-bold w-6">MAX</span>
                  <input
                    type="range"
                    min={dataMinSize}
                    max={dataMaxSize}
                    step={50}
                    value={filters.maxSize}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setFilters((prev) => ({
                        ...prev,
                        maxSize: Math.max(val, prev.minSize + 50),
                      }));
                    }}
                    className="flex-1 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-zinc-950 border-t border-zinc-800/80 px-6 py-4 flex items-center justify-between rounded-b-3xl">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors"
          >
            Reset All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}