import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import API from "../../api/axios";
import {
  MapPin,
  Edit3,
  Search,
  X,
  CheckCircle2,
  AlertCircle,
  Hash,
  Star,
  Phone,
  BedDouble,
  Maximize2,
  Tag,
  XCircle,
  IndianRupee,
} from "lucide-react";

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

const getFallbackImage = (id) => FALLBACK_IMAGES[id % FALLBACK_IMAGES.length];

const formatPrice = (price, listingType) => {
  if (!price) return "N/A";
  if (listingType === "RENT") {
    return `₹${(price / 1000).toLocaleString("en-IN")}k/mo`;
  }
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lac`;
  return `₹${price.toLocaleString("en-IN")}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function MyListings() {
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [notification, setNotification] = useState(null);
  const [editForm, setEditForm] = useState({
    listingType: "SELL",
    price: "",
    description: "",
    propertyId: "",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/listings/me/listings");
      setListings(res.data.data || []);
    } catch {
      showNotification("Failed to fetch listings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleUnlist = async (listing) => {
    if (
      !window.confirm(
        `Unlist Token #${listing.tokenId}? It can be relisted later.`,
      )
    )
      return;
    try {
      const response = await API.delete(`/api/listings/${listing.tokenId}`);
      if (response.status >= 200 && response.status < 300) {
        showNotification("Listing removed successfully!", "success");
        fetchListings();
      }
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Failed to unlist property",
        "error",
      );
    }
  };

  const openEditModal = (listing) => {
    setSelectedListing(listing);
    setEditForm({
      listingType: listing.listingType,
      price: String(listing.price),
      description: listing.description || "",
      propertyId: String(listing.property.propertyId),
    });
    setIsEditModalOpen(true);
  };

  const handleEditListing = async (e) => {
    e.preventDefault();
    if (!selectedListing) return;
    try {
      const response = await API.put(
        `/api/listings/${selectedListing.tokenId}`,
        {
          propertyId: parseInt(editForm.propertyId),
          listingType: editForm.listingType,
          price: parseFloat(editForm.price),
          description: editForm.description,
        },
      );
      if (response.status >= 200 && response.status < 300) {
        showNotification("Listing updated successfully!", "success");
        setIsEditModalOpen(false);
        fetchListings();
      }
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Failed to update listing",
        "error",
      );
    }
  };

  const query = searchQuery.trim().toLowerCase();
  const filteredListings = listings
    .filter((l) => l.status === activeTab)
    .filter(
      (l) =>
        String(l.tokenId).includes(query) ||
        l.property.houseNo?.toLowerCase().includes(query) ||
        l.property.locality?.toLowerCase().includes(query) ||
        l.property.city?.toLowerCase().includes(query) ||
        `${l.property.BHK} bhk`.includes(query),
    );

  const activeCount = listings.filter((l) => l.status === "ACTIVE").length;
  const inactiveCount = listings.filter((l) => l.status === "INACTIVE").length;

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-500 font-medium">Loading your listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-[200] px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 ${
              notification.type === "success"
                ? "bg-emerald-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            My Listings
          </h1>
          <p className="text-zinc-400 text-sm font-medium">
            Track and manage your active and closed listings.
          </p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto scrollbar-hide">
          {[
            { key: "ACTIVE", label: "Active", count: activeCount },
            { key: "INACTIVE", label: "Sold / Closed", count: inactiveCount },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.key
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/10"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {tab.label}
              <span
                className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                  activeTab === tab.key ? "bg-white/20" : "bg-zinc-800"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 lg:w-64 group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors"
            size={14}
          />
          <input
            type="text"
            placeholder="Search by token ID, locality, city, BHK..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-9 pr-3 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600 text-sm font-medium"
          />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => {
          const property = listing.property;
          const isActive = listing.status === "ACTIVE";

          return (
            <motion.div
              key={listing.tokenId}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-zinc-900/50 border rounded-[1.5rem] overflow-hidden group backdrop-blur-sm flex flex-col ${
                isActive ? "border-zinc-800" : "border-zinc-800/50 opacity-75"
              }`}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={getFallbackImage(property.propertyId)}
                  alt={property.houseNo}
                  className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? "group-hover:scale-110" : "grayscale-[30%]"}`}
                />

                {isActive && (
                  <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => openEditModal(listing)}
                      title="Edit Listing"
                      className="p-2.5 bg-white/10 hover:bg-orange-500 backdrop-blur-sm rounded-xl text-white transition-all border border-white/20"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleUnlist(listing)}
                      title="Unlist Property"
                      className="p-2.5 bg-white/10 hover:bg-red-500 backdrop-blur-sm rounded-xl text-white transition-all border border-white/20"
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                )}

                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-zinc-950/80 backdrop-blur-sm rounded-lg text-[9px] font-bold text-zinc-300 flex items-center gap-1">
                    <Hash size={9} /> {listing.tokenId}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                  <span
                    className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg ${
                      isActive
                        ? "bg-emerald-500 text-white"
                        : "bg-zinc-600 text-zinc-300"
                    }`}
                  >
                    {isActive ? "Active" : "Closed"}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg ${
                      listing.listingType === "RENT"
                        ? "bg-blue-500 text-white"
                        : "bg-purple-500 text-white"
                    }`}
                  >
                    {listing.listingType}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">
                      {property.houseNo}, {property.locality}
                    </h3>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] mt-0.5 font-medium">
                      <MapPin size={11} />
                      <span className="truncate">
                        {property.area}, {property.city} — {property.pin}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-orange-400 font-bold text-sm">
                      {formatPrice(listing.price, listing.listingType)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 px-2 py-1 bg-zinc-800/50 rounded-lg text-zinc-400 text-[10px] font-medium">
                    <BedDouble size={10} className="text-orange-400" />{" "}
                    {property.BHK} BHK
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 bg-zinc-800/50 rounded-lg text-zinc-400 text-[10px] font-medium">
                    <Maximize2 size={10} className="text-orange-400" />{" "}
                    {property.size} sq.ft
                  </span>
                  <span className="px-2 py-1 bg-zinc-800/50 rounded-lg text-zinc-400 text-[10px] font-medium">
                    {property.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-zinc-800/30 p-2 rounded-xl border border-zinc-800/50">
                    <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-0.5">
                      Property ID
                    </p>
                    <p className="text-white font-bold text-[10px]">
                      #{property.propertyId}
                    </p>
                  </div>
                  <div className="bg-zinc-800/30 p-2 rounded-xl border border-zinc-800/50">
                    <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-0.5">
                      Listed On
                    </p>
                    <p className="text-white font-bold text-[10px]">
                      {formatDate(listing.listingDate)}
                    </p>
                  </div>
                </div>

                {listing.description && (
                  <p
                    className="text-zinc-500 text-[10px] leading-relaxed truncate pl-2"
                    title={listing.description}
                  >
                    {listing.description}
                  </p>
                )}

                {/* Agent Info */}
                {listing.agent ? (
                  <div className="p-2.5 bg-zinc-800/50 rounded-xl border border-zinc-800/50">
                    <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-1.5">
                      Assigned Agent
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {listing.agent.name?.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-xs truncate">
                          {listing.agent.name}
                        </p>
                        <div className="flex pt-1 items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            <Star
                              size={9}
                              className="text-orange-500 fill-orange-500"
                            />
                            <span className="text-orange-500 text-[10px] font-bold">
                              {listing.agent.userRating || "N/A"}
                            </span>
                          </div>
                          <span className="text-zinc-600 text-[10px]">·</span>
                          <span className="text-zinc-500 text-[10px]">
                            {listing.agent.commissionRate?.toFixed(1)}% Rate
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-500 pr-2">
                        <Phone size={10} />
                        <span className="text-[12px]">
                          {listing.agent.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 bg-zinc-800/40 rounded-xl border border-zinc-800/30">
                    <p className="text-zinc-400 text-[8px] font-bold uppercase tracking-widest mb-1.5">
                      No Agent Assigned
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-zinc-600/30 flex items-center justify-center text-zinc-600 text-xs font-bold shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-zinc-400 text-xs truncate">
                          Not Assigned
                        </p>
                        <div className="flex pt-1  items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            <Star
                              size={9}
                              className="text-zinc-600 fill-zinc-500"
                            />
                            <span className="text-zinc-600 text-[10px] font-bold">
                              N/A
                            </span>
                          </div>
                          <span className="text-zinc-500 text-[10px]">·</span>
                          <span className="text-zinc-500 text-[10px]">
                            N/A Rate
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400 pr-2">
                        <Phone size={10} />
                        <span className="text-[12px]">Not Available</span>
                      </div>
                    </div>
                  </div>
                )}

                {isActive ? (
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => openEditModal(listing)}
                      className="flex-1 py-2 bg-zinc-800 hover:bg-orange-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      <Edit3 size={12} /> Edit
                    </button>
                    <button
                      onClick={() => handleUnlist(listing)}
                      className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      <XCircle size={12} /> Unlist
                    </button>
                  </div>
                ) : (
                  <div className="mt-auto py-2 bg-zinc-800/30 rounded-xl text-center">
                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                      Listing Closed
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12 bg-zinc-900/30 rounded-[1.5rem] border border-dashed border-zinc-800">
          <Tag className="mx-auto text-zinc-800 mb-2" size={32} />
          <p className="text-zinc-500 font-medium text-sm">
            No {activeTab.toLowerCase()} listings found.
          </p>
        </div>
      )}

      {/* Modern Edit Listing Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedListing && (
          <ModernModal onClose={() => setIsEditModalOpen(false)} title="Edit Listing">
            <form onSubmit={handleEditListing}>
              {/* Listing info card */}
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-xl p-3 mb-4 border border-zinc-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-orange-500 rounded-full" />
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Listing Information
                  </p>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                    Token ID
                  </p>
                  <p className="text-white font-bold text-sm">
                    #{selectedListing.tokenId}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                    Property
                  </p>
                  <p className="text-zinc-300 text-xs text-right">
                    {selectedListing.property.houseNo}, {selectedListing.property.locality}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                    Location
                  </p>
                  <p className="text-zinc-400 text-[10px] text-right">
                    {selectedListing.property.city} — {selectedListing.property.pin}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <ModernFormField label="Listing Type" icon="lucide:clipboard-list">
                    <div className="relative">
                      <select
                        value={editForm.listingType}
                        disabled
                        className={`${modernInputCls} cursor-not-allowed bg-zinc-800/30 opacity-60`}
                      >
                        <option value="SELL">For Sale</option>
                        <option value="RENT">For Rent</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <span className="text-zinc-600 text-[10px]">Locked</span>
                      </div>
                    </div>
                    <p className="text-zinc-600 text-[9px] mt-1 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-zinc-600" />
                      Listing type cannot be changed after creation
                    </p>
                  </ModernFormField>

                  <ModernFormField 
                    label="Price" 
                    icon={editForm.listingType === "RENT" ? "material-symbols:database-outline" : "material-symbols:attach-money"}
                  >
                    <div className="relative">
                      <IndianRupee
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                        size={14}
                      />
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm({ ...editForm, price: e.target.value })
                        }
                        required
                        className={`${modernInputCls} pl-8`}
                        placeholder={
                          editForm.listingType === "RENT"
                            ? "Monthly rent amount"
                            : "Sale price"
                        }
                      />
                    </div>
                  </ModernFormField>
                </div>

                <ModernFormField label="Description" icon="lucide:file-text">
                  <textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    rows="3"
                    className={`${modernInputCls} resize-none`}
                    placeholder="Describe the property features, terms, and other details..."
                  />
                </ModernFormField>
              </div>

              <ModernModalActions
                onCancel={() => setIsEditModalOpen(false)}
                submitLabel="Save Changes"
              />
            </form>
          </ModernModal>
        )}
      </AnimatePresence>
    </div>
  );
}

// Modern Form Components
const modernInputCls =
  "w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all duration-200";

const ModernFormField = ({ label, icon, children }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
      <Icon icon={icon} className="text-sm" />
      {label}
    </label>
    {children}
  </div>
);

const ModernModalActions = ({ onCancel, submitLabel }) => (
  <div className="flex gap-3 pt-6 mt-2 border-t border-zinc-800">
    <button
      type="button"
      onClick={onCancel}
      className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl text-sm transition-all duration-200"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-orange-500/20"
    >
      {submitLabel}
    </button>
  </div>
);

const ModernModal = ({ onClose, title, children }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="relative w-full max-w-lg bg-gradient-to-br from-zinc-900 to-zinc-900/95 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Modal header */}
      <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/50">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-orange-500/10 rounded-xl text-orange-500">
            <Tag size={18} />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
        >
          <X size={18} />
        </button>
      </div>

      {/* Modal body */}
      <div className="px-6 py-5">{children}</div>
    </motion.div>
  </div>
);