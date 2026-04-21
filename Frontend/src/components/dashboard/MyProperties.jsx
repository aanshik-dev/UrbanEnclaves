import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
import {
  PlusCircle,
  Building2,
  MapPin,
  Edit3,
  Trash2,
  Tag,
  Search,
  X,
  Bed,
  Square,
  Calendar,
  DollarSign,
  Phone,
  Star,
  AlertCircle,
  CheckCircle2,
  Hash,
  Home,
  TrendingDown,
  UserCheck,
  UserX,
  RefreshCw,
  Clock,
  BadgeCheck,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

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

const cityOfficeMap = {
  "New Delhi": 100002,
  Mumbai: 100003,
  Lucknow: 100004,
  Gwalior: 100005,
  Guwahati: 100006,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getFallbackImage = (id) => FALLBACK_IMAGES[id % FALLBACK_IMAGES.length];

const formatPrice = (price, listingType) => {
  if (!price) return "N/A";
  if (listingType === "RENT") return `₹${(price / 1000).toLocaleString("en-IN")}k/mo`;
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lac`;
  return `₹${price.toLocaleString("en-IN")}`;
};

const formatDate = (ds) => {
  if (!ds) return "N/A";
  return new Date(ds).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const StarRating = ({ rating }) => {
  const r = parseFloat(rating) || 0;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-2.5 h-2.5 ${i <= Math.round(r) ? "text-amber-400" : "text-zinc-700"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-amber-400 text-[9px] font-bold ml-0.5">{r.toFixed(1)}</span>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MyProperties() {
  const [activeTab, setActiveTab] = useState("OWNED");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listingsData, setListingsData] = useState([]);
  const [ownedProperties, setOwnedProperties] = useState([]);
  const [notification, setNotification] = useState(null);
  const [listingForm, setListingForm] = useState({ listingType: "SELL", price: "", description: "" });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [listingsRes, propertiesRes] = await Promise.all([
        API.get("/api/listings/me/listings"),
        API.get("/api/properties/me/properties"),
      ]);

      const listings = listingsRes.data.data || [];
      const properties = propertiesRes.data.data || [];

      console.log("Listings Data:", listings);
      console.log("Properties Data:", properties);

      setListingsData(listings);

      // Filter rule: exclude properties that have an INACTIVE SELL listing
      const inactiveSellPropertyIds = new Set(
        listings
          .filter((l) => l.status === "INACTIVE" && l.listingType === "SELL")
          .map((l) => l.property.propertyId)
      );

      const filteredProperties = properties.filter(
        (p) => !inactiveSellPropertyIds.has(p.id)
      );

      setOwnedProperties(filteredProperties);
    } catch (err) {
      console.error("Error fetching data:", err);
      showNotification("Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllData(); }, []);

  // ── Helpers for property state ──────────────────────────────────────────────

  const getListingsForProperty = (propertyId) =>
    listingsData.filter((l) => l.property.propertyId === propertyId);

  const getActiveListingForProperty = (propertyId) =>
    listingsData.find((l) => l.property.propertyId === propertyId && l.status === "ACTIVE");

  // Can edit: not in any active listing
  const canEdit = (propertyId) => !getActiveListingForProperty(propertyId);

  // Can delete: not in any listing at all
  const canDelete = (propertyId) => getListingsForProperty(propertyId).length === 0;

  // Can list: not already active, and not in inactive RENT listing
  const canList = (propertyId) => {
    const listings = getListingsForProperty(propertyId);
    const hasActive = listings.some((l) => l.status === "ACTIVE");
    const hasInactiveRent = listings.some((l) => l.status === "INACTIVE" && l.listingType === "RENT");
    return !hasActive && !hasInactiveRent;
  };

  // ── API Actions ─────────────────────────────────────────────────────────────

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const city = fd.get("city");
    const data = {
      type: fd.get("type"),
      desctiption: fd.get("description"),
      houseNo: fd.get("houseNo"),
      locality: fd.get("locality"),
      BHK: parseInt(fd.get("bhk")),
      size: parseFloat(fd.get("size")),
      city,
      area: fd.get("area"),
      year_built: parseInt(fd.get("yearBuilt")),
      pin: parseInt(fd.get("pin")),
      officeId: cityOfficeMap[city],
    };
    try {
      const res = await API.post("/api/properties", data);
      if (res.status === 200 || res.status === 201) {
        showNotification("Property added successfully!");
        setIsAddModalOpen(false);
        fetchAllData();
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to add property", "error");
    }
  };

  const handleEditProperty = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      type: fd.get("type"),
      desctiption: fd.get("description"),
      houseNo: fd.get("houseNo"),
      locality: fd.get("locality"),
      BHK: parseInt(fd.get("bhk")),
      size: parseFloat(fd.get("size")),
      city: selectedProperty.city,
      area: fd.get("area"),
      year_built: parseInt(fd.get("yearBuilt")),
      pin: parseInt(fd.get("pin")),
      officeId: cityOfficeMap[selectedProperty.city],
    };
    try {
      const res = await API.put(`/api/properties/${selectedProperty.id}`, data);
      if (res.status === 200) {
        showNotification("Property updated successfully!");
        setIsEditModalOpen(false);
        fetchAllData();
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to update property", "error");
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const res = await API.delete(`/api/properties/${propertyId}`);
      if (res.status === 200) {
        showNotification("Property deleted successfully!");
        fetchAllData();
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to delete property", "error");
    }
  };

  const handleListProperty = async (e) => {
    e.preventDefault();
    if (!selectedProperty) return;
    try {
      const res = await API.post("/api/listings", {
        propertyId: selectedProperty.id,
        listingType: listingForm.listingType,
        price: parseFloat(listingForm.price),
        description: listingForm.description,
      });
      if (res.status === 200 || res.status === 201) {
        showNotification("Property listed successfully!");
        setIsListModalOpen(false);
        setListingForm({ listingType: "SELL", price: "", description: "" });
        fetchAllData();
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to list property", "error");
    }
  };

  const handleUnlistProperty = async (tokenId) => {
    if (!window.confirm("Unlist this property? It will return to your owned properties.")) return;
    try {
      const res = await API.delete(`/api/listings/${tokenId}`);
      if (res.status === 200) {
        showNotification("Property unlisted successfully!");
        fetchAllData();
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to unlist property", "error");
    }
  };

  // ── Filtered data ───────────────────────────────────────────────────────────

  const query = searchQuery.trim().toLowerCase();

  const getFilteredData = () => {
    const matches = (p) =>
      !query ||
      p.houseNo?.toLowerCase().includes(query) ||
      p.locality?.toLowerCase().includes(query) ||
      p.city?.toLowerCase().includes(query) ||
      p.area?.toLowerCase().includes(query) ||
      `${p.BHK} bhk`.includes(query);

    if (activeTab === "OWNED") {
      return ownedProperties.filter((p) => matches(p));
    }
    if (activeTab === "ACTIVE") {
      return listingsData.filter(
        (l) =>
          l.status === "ACTIVE" &&
          (matches(l.property) ||
            String(l.tokenId).includes(query) ||
            String(l.property.propertyId).includes(query))
      );
    }
    // SOLD = INACTIVE listings
    return listingsData.filter(
      (l) =>
        l.status === "INACTIVE" &&
        (matches(l.property) ||
          String(l.tokenId).includes(query) ||
          String(l.property.propertyId).includes(query))
    );
  };

  const filteredData = getFilteredData();

  const tabCounts = {
    OWNED: ownedProperties.length,
    ACTIVE: listingsData.filter((l) => l.status === "ACTIVE").length,
    SOLD: listingsData.filter((l) => l.status === "INACTIVE").length,
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-[3px] border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-zinc-500 text-sm font-medium">Loading your properties…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            className={`fixed top-5 right-5 z-[200] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-sm font-semibold ${
              notification.type === "success"
                ? "bg-emerald-500 text-white shadow-emerald-500/30"
                : "bg-red-500 text-white shadow-red-500/30"
            }`}
          >
            {notification.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">My Properties</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Manage your real estate portfolio and listings.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/25 text-xs"
        >
          <PlusCircle size={15} /> Add Property
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl gap-0.5">
          {["OWNED", "ACTIVE", "SOLD"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab}
              <span
                className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[8px] font-black ${
                  activeTab === tab ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {tabCounts[tab]}
              </span>
            </button>
          ))}
        </div>
        <div className="relative group max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={13} />
          <input
            type="text"
            placeholder="Search address, city, BHK…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-9 pr-3 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600 text-xs"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredData.map((item) => {
            if (activeTab === "OWNED") {
              return (
                <OwnedCard
                  key={item.id}
                  property={item}
                  activeListing={getActiveListingForProperty(item.id)}
                  canEdit={canEdit(item.id)}
                  canDelete={canDelete(item.id)}
                  canList={canList(item.id)}
                  onEdit={() => { setSelectedProperty(item); setIsEditModalOpen(true); }}
                  onDelete={() => handleDeleteProperty(item.id)}
                  onList={() => { setSelectedProperty(item); setIsListModalOpen(true); }}
                />
              );
            }
            return (
              <ListingCard
                key={item.tokenId}
                listing={item}
                isActive={activeTab === "ACTIVE"}
                onUnlist={() => handleUnlistProperty(item.tokenId)}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-16 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
          <Building2 className="mx-auto text-zinc-800 mb-3" size={36} />
          <p className="text-zinc-500 font-medium text-sm">
            No properties in{" "}
            <span className="text-zinc-400">{activeTab.toLowerCase()}</span> section.
          </p>
        </div>
      )}

      {/* ── Modals ── */}
      <AnimatePresence>
        {isAddModalOpen && (
          <Modal onClose={() => setIsAddModalOpen(false)} title="Add New Property">
            <AddPropertyForm onSubmit={handleAddProperty} onCancel={() => setIsAddModalOpen(false)} />
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditModalOpen && selectedProperty && (
          <Modal onClose={() => setIsEditModalOpen(false)} title="Edit Property">
            <EditPropertyForm
              property={selectedProperty}
              onSubmit={handleEditProperty}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isListModalOpen && selectedProperty && (
          <Modal onClose={() => setIsListModalOpen(false)} title="List Property">
            <form onSubmit={handleListProperty} className="space-y-4">
              <div className="p-3 bg-zinc-800/40 rounded-xl border border-zinc-800">
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-0.5">Property</p>
                <p className="text-white text-sm font-bold">{selectedProperty.houseNo}, {selectedProperty.locality}</p>
                <p className="text-zinc-500 text-xs">{selectedProperty.area}, {selectedProperty.city}</p>
              </div>
              <FormField label="Listing Type *">
                <select
                  value={listingForm.listingType}
                  onChange={(e) => setListingForm({ ...listingForm, listingType: e.target.value })}
                  className="input-base"
                >
                  <option value="SELL">SELL</option>
                  <option value="RENT">RENT</option>
                </select>
              </FormField>
              <FormField label={`Price * ${listingForm.listingType === "RENT" ? "(₹/month)" : "(₹ total)"}`}>
                <input
                  type="number"
                  min="0"
                  value={listingForm.price}
                  onChange={(e) => setListingForm({ ...listingForm, price: e.target.value })}
                  required
                  placeholder="Enter price in ₹"
                  className="input-base"
                />
              </FormField>
              <FormField label="Description">
                <textarea
                  value={listingForm.description}
                  onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
                  rows="3"
                  placeholder="Describe the property listing…"
                  className="input-base resize-none"
                />
              </FormField>
              <ModalActions
                onCancel={() => setIsListModalOpen(false)}
                submitLabel="List Property"
                submitIcon={<Tag size={13} />}
              />
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Owned Property Card ──────────────────────────────────────────────────────

function OwnedCard({ property, activeListing, canEdit, canDelete, canList, onEdit, onDelete, onList }) {
  const img = getFallbackImage(property.id);
  const isActivelyListed = !!activeListing;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col group backdrop-blur-sm"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={img}
          alt={property.houseNo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="px-2 py-0.5 bg-zinc-950/70 backdrop-blur-sm rounded-full text-[9px] font-bold text-zinc-300 uppercase tracking-wider border border-zinc-700/50">
            {property.type}
          </span>
          {isActivelyListed && (
            <span className="px-2 py-0.5 bg-emerald-500/90 backdrop-blur-sm rounded-full text-[9px] font-bold text-white uppercase tracking-wider">
              Listed
            </span>
          )}
        </div>

        {/* Hover action icons */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {canEdit && (
            <button
              onClick={onEdit}
              className="w-8 h-8 bg-zinc-950/80 backdrop-blur-sm border border-zinc-700/50 rounded-xl flex items-center justify-center text-zinc-300 hover:text-orange-400 hover:border-orange-500/50 transition-all"
              title="Edit property"
            >
              <Edit3 size={13} />
            </button>
          )}
          {canDelete && (
            <button
              onClick={onDelete}
              className="w-8 h-8 bg-zinc-950/80 backdrop-blur-sm border border-zinc-700/50 rounded-xl flex items-center justify-center text-zinc-300 hover:text-red-400 hover:border-red-500/50 transition-all"
              title="Delete property"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>

        {/* Price badge if listed */}
        {isActivelyListed && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 bg-orange-500/90 backdrop-blur-sm rounded-xl text-xs font-black text-white shadow-lg">
              {formatPrice(activeListing.price, activeListing.listingType)}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Address */}
        <div>
          <h3 className="text-sm font-bold text-white truncate">
            {property.houseNo}, {property.locality}
          </h3>
          <div className="flex items-center gap-1 text-zinc-500 text-[11px] mt-0.5">
            <MapPin size={11} />
            <span className="truncate">{property.area}, {property.city} – {property.pin}</span>
          </div>
        </div>

        {/* Specs row */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { icon: <Bed size={10} />, label: `${property.BHK} BHK` },
            { icon: <Square size={10} />, label: `${property.size} sq.ft` },
            { icon: <Calendar size={10} />, label: `Built ${property.year_built}` },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1 px-2 py-1 bg-zinc-800/60 rounded-lg text-zinc-400 text-[10px] font-medium border border-zinc-800"
            >
              {icon} {label}
            </span>
          ))}
        </div>

        {/* IDs */}
        <div className="flex items-center gap-3 pt-0.5">
          <div className="flex items-center gap-1 text-zinc-600 text-[10px]">
            <Hash size={10} />
            <span className="font-mono">Prop {property.id}</span>
          </div>
          {isActivelyListed && (
            <div className="flex items-center gap-1 text-zinc-600 text-[10px]">
              <Tag size={10} />
              <span className="font-mono">Token {activeListing.tokenId}</span>
            </div>
          )}
        </div>

        {/* Active listing mini-info */}
        {isActivelyListed && (
          <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/15 rounded-xl">
            <p className="text-emerald-400 text-[9px] font-bold uppercase tracking-widest mb-1">Active Listing</p>
            <div className="flex items-center justify-between">
              <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold ${activeListing.listingType === "RENT" ? "bg-blue-500/15 text-blue-400" : "bg-purple-500/15 text-purple-400"}`}>
                {activeListing.listingType}
              </span>
              <span className="text-zinc-400 text-[10px]">Since {formatDate(activeListing.listingDate)}</span>
            </div>
          </div>
        )}

        {/* List button (bottom) */}
        {canList && (
          <button
            onClick={onList}
            className="mt-auto w-full py-2 bg-orange-500/10 hover:bg-orange-500 border border-orange-500/30 hover:border-orange-500 text-orange-400 hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
          >
            <Tag size={12} /> List Property
          </button>
        )}

        {!canList && !isActivelyListed && (
          <div className="mt-auto w-full py-2 bg-zinc-800/30 rounded-xl flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-medium">
            <AlertCircle size={11} />
            <span>Prev. rental – cannot relist</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Listing Card (Active / Sold) ─────────────────────────────────────────────

function ListingCard({ listing, isActive, onUnlist }) {
  const p = listing.property;
  const img = getFallbackImage(p.propertyId);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`bg-zinc-900/60 border rounded-2xl overflow-hidden flex flex-col group backdrop-blur-sm ${
        isActive ? "border-zinc-800" : "border-zinc-800/60"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={img}
          alt={p.houseNo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm ${
              listing.listingType === "RENT"
                ? "bg-blue-500/90 text-white"
                : "bg-purple-500/90 text-white"
            }`}
          >
            {listing.listingType}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm ${
              isActive
                ? "bg-emerald-500/90 text-white"
                : "bg-zinc-600/90 text-zinc-200"
            }`}
          >
            {isActive ? "Active" : "Sold / Closed"}
          </span>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1.5 bg-zinc-950/80 backdrop-blur-sm rounded-xl text-sm font-black text-orange-400 border border-orange-500/20">
            {formatPrice(listing.price, listing.listingType)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Address + ID row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white truncate">
              {p.houseNo}, {p.locality}
            </h3>
            <div className="flex items-center gap-1 text-zinc-500 text-[11px] mt-0.5">
              <MapPin size={10} />
              <span className="truncate">{p.area}, {p.city}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-widest">Token</p>
            <p className="text-zinc-400 font-mono text-[11px] font-bold">#{listing.tokenId}</p>
          </div>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { icon: <Bed size={10} />, label: `${p.BHK} BHK` },
            { icon: <Home size={10} />, label: p.type },
            { icon: <Square size={10} />, label: `${p.size} sq.ft` },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1 px-2 py-1 bg-zinc-800/60 rounded-lg text-zinc-400 text-[10px] font-medium border border-zinc-800"
            >
              {icon} {label}
            </span>
          ))}
        </div>

        {/* Listing description */}
        {listing.description && (
          <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2">{listing.description}</p>
        )}

        {/* Meta row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-zinc-800/30 rounded-xl p-2.5 border border-zinc-800/50">
            <p className="text-zinc-600 text-[8px] font-bold uppercase tracking-widest mb-0.5">Listed On</p>
            <div className="flex items-center gap-1 text-white text-[11px] font-bold">
              <Clock size={10} className="text-zinc-500" />
              {formatDate(listing.listingDate)}
            </div>
          </div>
          <div className="bg-zinc-800/30 rounded-xl p-2.5 border border-zinc-800/50">
            <p className="text-zinc-600 text-[8px] font-bold uppercase tracking-widest mb-0.5">Property ID</p>
            <div className="flex items-center gap-1 text-white text-[11px] font-mono font-bold">
              <Hash size={10} className="text-zinc-500" />
              {p.propertyId}
            </div>
          </div>
        </div>

        {/* Agent section */}
        <div className="bg-zinc-800/30 rounded-xl p-3 border border-zinc-800/50">
          <p className="text-zinc-600 text-[8px] font-bold uppercase tracking-widest mb-2">
            Assigned Agent
          </p>
          {listing.agent ? (
            <div className="flex items-center gap-3">
              <img
                src={listing.agent.profileUrl}
                alt={listing.agent.name}
                className="w-9 h-9 rounded-xl object-cover border border-zinc-700"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-xs truncate">{listing.agent.name}</p>
                <StarRating rating={listing.agent.userRating} />
              </div>
              <a
                href={`tel:${listing.agent.phone}`}
                className="w-7 h-7 bg-zinc-700/50 hover:bg-orange-500/20 rounded-lg flex items-center justify-center text-zinc-500 hover:text-orange-400 transition-all"
                title={listing.agent.phone}
              >
                <Phone size={11} />
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-zinc-600">
              <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-dashed border-zinc-700 flex items-center justify-center">
                <UserX size={14} />
              </div>
              <div>
                <p className="text-zinc-500 text-xs font-medium">No agent assigned</p>
                <p className="text-zinc-700 text-[10px]">Will be assigned soon</p>
              </div>
            </div>
          )}
        </div>

        {/* Unlist button for ACTIVE */}
        {isActive && (
          <button
            onClick={onUnlist}
            className="w-full py-2 bg-red-500/8 hover:bg-red-500/15 border border-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
          >
            <TrendingDown size={12} /> Unlist Property
          </button>
        )}

        {!isActive && (
          <div className="flex items-center justify-center gap-1.5 py-1.5 text-zinc-700 text-[10px] font-medium">
            <BadgeCheck size={11} />
            <span>Transaction completed</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Form Components ──────────────────────────────────────────────────────────

const FormField = ({ label, children, className = "" }) => (
  <div className={className}>
    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

// Inline style for inputs (Tailwind can't do dynamic via className in prod, so reuse)
const inputCls = "w-full bg-zinc-800/70 border border-zinc-700/80 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/60 focus:bg-zinc-800 transition-all";

function AddPropertyForm({ onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Property Type *">
          <select name="type" required className={inputCls}>
            <option value="FLAT">FLAT</option>
            <option value="APARTMENT">APARTMENT</option>
          </select>
        </FormField>
        <FormField label="House No *">
          <input name="houseNo" required placeholder="e.g. A-101" className={inputCls} />
        </FormField>
      </div>

      <FormField label="Description">
        <textarea name="description" rows="2" placeholder="Brief description…" className={`${inputCls} resize-none`} />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Locality *">
          <input name="locality" required placeholder="e.g. Powai" className={inputCls} />
        </FormField>
        <FormField label="Area *">
          <input name="area" required placeholder="e.g. Andheri East" className={inputCls} />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="City *">
          <select name="city" required className={inputCls}>
            {Object.keys(cityOfficeMap).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FormField>
        <FormField label="PIN Code *">
          <input name="pin" type="number" required placeholder="6-digit PIN" minLength={6} maxLength={6} className={inputCls} />
        </FormField>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <FormField label="BHK (1–10) *">
          <input name="bhk" type="number" min="1" max="10" required placeholder="e.g. 3" className={inputCls} />
        </FormField>
        <FormField label="Size (sq.ft) *">
          <input name="size" type="number" step="0.01" min="1" required placeholder="e.g. 1200" className={inputCls} />
        </FormField>
        <FormField label="Year Built *">
          <input name="yearBuilt" type="number" min="1800" max={new Date().getFullYear()} required placeholder={String(new Date().getFullYear() - 5)} className={inputCls} />
        </FormField>
      </div>

      <ModalActions onCancel={onCancel} submitLabel="Save Property" submitIcon={<PlusCircle size={13} />} />
    </form>
  );
}

function EditPropertyForm({ property, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* City is read-only */}
      <div className="px-3 py-2 bg-zinc-800/40 rounded-xl border border-zinc-800 text-xs text-zinc-500 flex items-center gap-2">
        <MapPin size={11} className="text-orange-500" />
        <span>City: <strong className="text-zinc-300">{property.city}</strong> (cannot be changed)</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Property Type *">
          <select name="type" defaultValue={property.type} required className={inputCls}>
            <option value="FLAT">FLAT</option>
            <option value="APARTMENT">APARTMENT</option>
          </select>
        </FormField>
        <FormField label="House No *">
          <input name="houseNo" defaultValue={property.houseNo} required className={inputCls} />
        </FormField>
      </div>

      <FormField label="Description">
        <textarea name="description" defaultValue={property.description} rows="2" className={`${inputCls} resize-none`} />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Locality *">
          <input name="locality" defaultValue={property.locality} required className={inputCls} />
        </FormField>
        <FormField label="Area *">
          <input name="area" defaultValue={property.area} required className={inputCls} />
        </FormField>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <FormField label="BHK (1–10) *">
          <input name="bhk" type="number" min="1" max="10" defaultValue={property.BHK} required className={inputCls} />
        </FormField>
        <FormField label="Size (sq.ft) *">
          <input name="size" type="number" step="0.01" min="1" defaultValue={property.size} required className={inputCls} />
        </FormField>
        <FormField label="Year Built *">
          <input name="yearBuilt" type="number" min="1800" max={new Date().getFullYear()} defaultValue={property.year_built} required className={inputCls} />
        </FormField>
      </div>

      <FormField label="PIN Code *">
        <input name="pin" type="number" defaultValue={property.pin} required className={inputCls} />
      </FormField>

      <ModalActions onCancel={onCancel} submitLabel="Update Property" submitIcon={<Edit3 size={13} />} />
    </form>
  );
}

const ModalActions = ({ onCancel, submitLabel, submitIcon }) => (
  <div className="flex gap-3 pt-2">
    <button
      type="button"
      onClick={onCancel}
      className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs transition-all"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20"
    >
      {submitIcon} {submitLabel}
    </button>
  </div>
);

// ─── Modal Shell ──────────────────────────────────────────────────────────────

const Modal = ({ onClose, title, children }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 16 }}
      transition={{ type: "spring", stiffness: 340, damping: 30 }}
      className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-xl">
            <Building2 size={18} className="text-orange-500" />
          </div>
          <h2 className="text-base font-bold text-white">{title}</h2>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center hover:bg-zinc-800 rounded-xl text-zinc-500 hover:text-white transition-all"
        >
          <X size={16} />
        </button>
      </div>
      <div className="px-6 py-5 max-h-[70vh] overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </motion.div>
  </div>
);