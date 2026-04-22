import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
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
  CheckCircle2,
  AlertCircle,
  Hash,
  Calendar,
  Square,
  Bed,
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

const cityOfficeMap = {
  "New Delhi": 100002,
  Mumbai: 100003,
  Lucknow: 100004,
  Gwalior: 100005,
  Guwahati: 100006,
};

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

export default function MyProperties() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [ownedProperties, setOwnedProperties] = useState([]);
  const [notification, setNotification] = useState(null);
  const [listingForm, setListingForm] = useState({
    listingType: "SELL",
    price: "",
    description: "",
  });

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
      setListings(listingsRes.data.data || []);
      setOwnedProperties(propertiesRes.data.data || []);
    } catch (error) {
      showNotification("Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const getActiveListings = (propertyId) =>
    listings.filter(
      (l) => l.property.propertyId === propertyId && l.status === "ACTIVE",
    );

  const isPropertyInAnyListing = (propertyId) =>
    listings.some((l) => l.property.propertyId === propertyId);

  const getListingBadges = (propertyId) => {
    const active = getActiveListings(propertyId);
    return active.map((l) => l.listingType);
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const city = formData.get("city");
    const data = {
      type: formData.get("type"),
      description: formData.get("description"),
      houseNo: formData.get("houseNo"),
      locality: formData.get("locality"),
      BHK: parseInt(formData.get("bhk")),
      size: parseFloat(formData.get("size")),
      city,
      area: formData.get("area"),
      year_built: parseInt(formData.get("yearBuilt")),
      pin: parseInt(formData.get("pin")),
      officeId: cityOfficeMap[city],
    };
    try {
      const response = await API.post("/api/properties", data);
      if (response.status === 200 || response.status === 201) {
        showNotification("Property added successfully!", "success");
        setIsAddModalOpen(false);
        fetchAllData();
      }
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Failed to add property",
        "error",
      );
    }
  };

  const handleEditProperty = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      type: formData.get("type"),
      description: formData.get("description"),
      houseNo: formData.get("houseNo"),
      locality: formData.get("locality"),
      BHK: parseInt(formData.get("bhk")),
      size: parseFloat(formData.get("size")),
      city: selectedProperty.city,
      area: formData.get("area"),
      year_built: parseInt(formData.get("yearBuilt")),
      pin: parseInt(formData.get("pin")),
      officeId: cityOfficeMap[selectedProperty.city],
    };
    try {
      const response = await API.put(
        `/api/properties/${selectedProperty.id}`,
        data,
      );
      if (response.status === 200) {
        showNotification("Property updated successfully!", "success");
        setIsEditModalOpen(false);
        fetchAllData();
      }
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Failed to update property",
        "error",
      );
    }
  };

  const handleDeleteProperty = async (property) => {
    if (isPropertyInAnyListing(property.id)) {
      showNotification(
        "Cannot delete: property has existing listings.",
        "error",
      );
      return;
    }
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;
    try {
      const response = await API.delete(`/api/properties/${property.id}`);
      if (response.status === 200) {
        showNotification("Property deleted successfully!", "success");
        fetchAllData();
      }
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Failed to delete property",
        "error",
      );
    }
  };

  const handleListProperty = async (e) => {
    e.preventDefault();
    if (!selectedProperty) return;
    try {
      const response = await API.post("/api/listings", {
        propertyId: selectedProperty.id,
        listingType: listingForm.listingType,
        price: parseFloat(listingForm.price),
        description: listingForm.description,
      });
      if (response.status === 200 || response.status === 201) {
        showNotification("Property listed successfully!", "success");
        setIsListModalOpen(false);
        setListingForm({ listingType: "SELL", price: "", description: "" });
        fetchAllData();
      }
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Failed to list property",
        "error",
      );
    }
  };

  const openListModal = (property) => {
    const activeListings = getActiveListings(property.id);
    const hasRent = activeListings.some((l) => l.listingType === "RENT");
    const hasSell = activeListings.some((l) => l.listingType === "SELL");

    let defaultType = "SELL";
    if (hasSell && !hasRent) defaultType = "RENT";
    else if (!hasSell) defaultType = "SELL";

    setListingForm({ listingType: defaultType, price: "", description: "" });
    setSelectedProperty(property);
    setIsListModalOpen(true);
  };

  const query = searchQuery.trim().toLowerCase();
  const filteredProperties = ownedProperties.filter(
    (p) =>
      p.houseNo?.toLowerCase().includes(query) ||
      p.locality?.toLowerCase().includes(query) ||
      p.city?.toLowerCase().includes(query) ||
      p.area?.toLowerCase().includes(query) ||
      `${p.BHK} bhk`.includes(query) ||
      String(p.id).includes(query),
  );

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-500 font-medium">
            Loading your properties...
          </p>
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
            My Properties
          </h1>
          <p className="text-zinc-400 text-sm font-medium">
            Manage your owned real estate portfolio.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 text-xs"
        >
          <PlusCircle size={16} /> Add Property
        </button>
      </div>

      {/* Search & Stats */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex gap-3">
          <div className="px-4 py-1 bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl">
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
              Owned
            </p>
            <p className="text-xl font-bold text-white">
              {ownedProperties.length}
            </p>
          </div>
          <div className="px-4 py-1 bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl">
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
              Listed
            </p>
            <p className="text-xl font-bold text-white">
              {
                ownedProperties.filter(
                  (p) => getActiveListings(p.id).length > 0,
                ).length
              }
            </p>
          </div>
          <div className="px-4 py-1 bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl">
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
              Unlisted
            </p>
            <p className="text-xl font-bold text-white">
              {
                ownedProperties.filter(
                  (p) => getActiveListings(p.id).length === 0,
                ).length
              }
            </p>
          </div>
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

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => {
          const activeListings = getActiveListings(property.id);
          const listingBadges = getListingBadges(property.id);
          const inAnyListing = isPropertyInAnyListing(property.id);

          const hasRentListing = activeListings.some(
            (l) => l.listingType === "RENT",
          );
          const hasSellListing = activeListings.some(
            (l) => l.listingType === "SELL",
          );

          const rentListing = activeListings.find(
            (l) => l.listingType === "RENT",
          );
          const sellListing = activeListings.find(
            (l) => l.listingType === "SELL",
          );

          const canList = !hasRentListing || !hasSellListing;

          return (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-[1.5rem] overflow-hidden group backdrop-blur-sm flex flex-col"
            >
              {/* Image with hover actions */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={getFallbackImage(property.id)}
                  alt={property.houseNo}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedProperty(property);
                      setIsEditModalOpen(true);
                    }}
                    title="Edit Property"
                    className="p-2.5 bg-white/10 hover:bg-orange-500 backdrop-blur-sm rounded-xl text-white transition-all border border-white/20"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property)}
                    title={
                      inAnyListing
                        ? "Cannot delete: property has listings"
                        : "Delete Property"
                    }
                    className={`p-2.5 backdrop-blur-sm rounded-xl text-white transition-all border ${
                      inAnyListing
                        ? "bg-white/5 border-white/10 opacity-40 cursor-not-allowed"
                        : "bg-white/10 hover:bg-red-500 border-white/20"
                    }`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-zinc-950/80 backdrop-blur-sm rounded-lg text-[9px] font-bold text-zinc-300 flex items-center gap-1">
                    <Hash size={9} /> {property.id}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                  {listingBadges.length === 0 ? (
                    <span className="px-2 py-1 bg-zinc-700/80 backdrop-blur-sm text-zinc-300 rounded-full text-[9px] font-bold uppercase tracking-widest">
                      Unlisted
                    </span>
                  ) : (
                    listingBadges.map((badge) => (
                      <span
                        key={badge}
                        className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg ${
                          badge === "RENT"
                            ? "bg-blue-500 text-white"
                            : "bg-purple-500 text-white"
                        }`}
                      >
                        {badge}
                      </span>
                    ))
                  )}
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-zinc-950/80 backdrop-blur-sm rounded-full text-[9px] font-bold uppercase tracking-widest text-zinc-300">
                    {property.type}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-1 gap-2">
                  <h3 className="text-base font-bold text-white truncate flex-1">
                    {property.houseNo}, {property.locality}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs mb-3 font-medium">
                  <MapPin size={12} />
                  <span className="truncate">
                    {property.area}, {property.city} - {property.pin}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-zinc-800/50 rounded-lg text-zinc-400 text-[10px] font-medium flex items-center gap-1">
                    <Bed size={10} /> {property.BHK} BHK
                  </span>
                  <span className="px-2 py-1 bg-zinc-800/50 rounded-lg text-zinc-400 text-[10px] font-medium">
                    {property.type}
                  </span>
                  <span className="px-2 py-1 bg-zinc-800/50 rounded-lg text-zinc-400 text-[10px] font-medium flex items-center gap-1">
                    <Square size={10} /> {property.size} sq.ft
                  </span>
                  <span className="px-2 py-1 bg-zinc-800/50 rounded-lg text-zinc-400 text-[10px] font-medium flex items-center gap-1">
                    <Calendar size={10} /> Built: {property.year_built}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-zinc-800/30 p-2 rounded-xl border border-zinc-800/50">
                    <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-0.5">
                      Property ID
                    </p>
                    <p className="text-white font-bold text-xs">
                      #{property.id}
                    </p>
                  </div>
                  <div className="bg-zinc-800/30 p-2 rounded-xl border border-zinc-800/50">
                    <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-0.5">
                      Office
                    </p>
                    <p className="text-white font-bold text-xs">
                      {property.office?.officeName || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <div
                    className={`flex-1 rounded-lg p-1.5 border transition-all ${
                      hasRentListing
                        ? "bg-emerald-500/10 border-emerald-500/30"
                        : "bg-zinc-800/30 border-zinc-800/50 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        RENT
                      </span>
                      {hasRentListing && (
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </div>
                    {hasRentListing && rentListing ? (
                      <div className="mt-0.5 flex justify-between">
                        <p className="text-emerald-300 text-[12px] font-bold leading-tight">
                          {formatPrice(rentListing.price, "RENT")}
                        </p>
                        <p className="text-zinc-400 text-[10px]">
                          Token #{rentListing.tokenId}
                        </p>
                      </div>
                    ) : (
                      <p className="text-zinc-400 text-[10px] mt-0.5">
                        Not listed
                      </p>
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-lg p-1.5 border transition-all ${
                      hasSellListing
                        ? "bg-purple-500/10 border-purple-500/30"
                        : "bg-zinc-800/30 border-zinc-800/50 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                        SELL
                      </span>
                      {hasSellListing && (
                        <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
                      )}
                    </div>
                    {hasSellListing && sellListing ? (
                      <div className="mt-0.5 flex justify-between">
                        <p className="text-purple-300 text-[12px] font-bold leading-tight">
                          {formatPrice(sellListing.price, "SELL")}
                        </p>
                        <p className="text-zinc-400 text-[10px]">
                          Token #{sellListing.tokenId}
                        </p>
                      </div>
                    ) : (
                      <p className="text-zinc-400 text-[10px] mt-0.5">
                        Not listed
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => canList && openListModal(property)}
                  disabled={!canList}
                  className={`w-full py-2 font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 text-[11px] ${
                    canList
                      ? "bg-orange-500/10 hover:bg-orange-500 border border-orange-500/30 hover:border-orange-500 text-orange-400 hover:text-white cursor-pointer"
                      : "bg-zinc-800/30 border border-zinc-800/50 text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  <Tag size={12} />
                  {activeListings.length === 0
                    ? "List Property"
                    : hasRentListing && hasSellListing
                      ? "Both Types Listed"
                      : hasRentListing
                        ? "Add Sell Listing"
                        : hasSellListing
                          ? "Add Rent Listing"
                          : "Add Listing"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12 bg-zinc-900/30 rounded-[1.5rem] border border-dashed border-zinc-800">
          <Building2 className="mx-auto text-zinc-800 mb-2" size={32} />
          <p className="text-zinc-500 font-medium text-sm">
            No properties found.
          </p>
        </div>
      )}

      {/* Modern Add Property Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <Modal onClose={() => setIsAddModalOpen(false)} title="Add Property">
            <form onSubmit={handleAddProperty}>
              <div className="space-y-4">
                {/* Property Type & Basic Info */}
                <div className="grid grid-cols-2 gap-3">
                  <ModernFormField
                    label="Property Type"
                    icon="fluent:building-24-regular"
                  >
                    <select name="type" required className={modernInputCls}>
                      <option value="FLAT">Flat</option>
                      <option value="APARTMENT">Apartment</option>
                    </select>
                  </ModernFormField>
                  <ModernFormField label="House Number" icon="lucide:home">
                    <input
                      name="houseNo"
                      required
                      className={modernInputCls}
                      placeholder="e.g., A-101"
                    />
                  </ModernFormField>
                </div>

                {/* BHK & Size */}
                <div className="grid grid-cols-2 gap-3">
                  <ModernFormField
                    label="BHK"
                    icon="material-symbols:bed-outline"
                  >
                    <input
                      name="bhk"
                      type="number"
                      min="1"
                      max="10"
                      required
                      className={modernInputCls}
                      placeholder="Bedrooms"
                    />
                  </ModernFormField>
                  <ModernFormField label="Size (sq.ft)" icon="lucide:ruler">
                    <input
                      name="size"
                      type="number"
                      step="0.01"
                      required
                      className={modernInputCls}
                      placeholder="Total area"
                    />
                  </ModernFormField>
                </div>

                {/* Location Details */}
                <div className="grid grid-cols-2 gap-3">
                  <ModernFormField label="Locality" icon="lucide:map-pin">
                    <input
                      name="locality"
                      required
                      className={modernInputCls}
                      placeholder="Neighborhood"
                    />
                  </ModernFormField>
                  <ModernFormField label="Area" icon="lucide:map">
                    <input
                      name="area"
                      required
                      className={modernInputCls}
                      placeholder="Sector/Zone"
                    />
                  </ModernFormField>
                </div>

                {/* City & PIN */}
                <div className="grid grid-cols-2 gap-3">
                  <ModernFormField label="City" icon="solar:city-bold">
                    <select name="city" required className={modernInputCls}>
                      {Object.keys(cityOfficeMap).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </ModernFormField>
                  <ModernFormField
                    label="PIN Code"
                    icon="material-symbols:mark-as-unread-outline-rounded"
                  >
                    <input
                      name="pin"
                      type="number"
                      required
                      className={modernInputCls}
                      placeholder="6 digits"
                    />
                  </ModernFormField>
                </div>

                {/* Year Built & Description */}
                <div className="grid grid-cols-2 gap-3">
                  <ModernFormField label="Year Built" icon="lucide:calendar">
                    <input
                      name="yearBuilt"
                      type="number"
                      required
                      className={modernInputCls}
                      placeholder="YYYY"
                    />
                  </ModernFormField>
                  <ModernFormField label="Description" icon="lucide:file-text">
                    <input
                      name="description"
                      className={modernInputCls}
                      placeholder="Additional details"
                    />
                  </ModernFormField>
                </div>
              </div>
              <ModernModalActions
                onCancel={() => setIsAddModalOpen(false)}
                submitLabel="Create Property"
              />
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Modern Edit Property Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedProperty && (
          <Modal
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Property"
          >
            <form onSubmit={handleEditProperty}>
              <div className="space-y-4">
                {/* Property Type & Basic Info */}
                <div className="grid grid-cols-2 gap-3">
                  <ModernFormField
                    label="Property Type"
                    icon="fluent:building-24-regular"
                  >
                    <select
                      name="type"
                      defaultValue={selectedProperty.type}
                      required
                      className={modernInputCls}
                    >
                      <option value="FLAT">Flat</option>
                      <option value="APARTMENT">Apartment</option>
                    </select>
                  </ModernFormField>
                  <ModernFormField label="House Number" icon="lucide:home">
                    <input
                      name="houseNo"
                      defaultValue={selectedProperty.houseNo}
                      required
                      className={modernInputCls}
                    />
                  </ModernFormField>
                </div>

                {/* BHK & Size */}
                <div className="grid grid-cols-2 gap-3">
                  <ModernFormField
                    label="BHK"
                    icon="material-symbols:bed-outline"
                  >
                    <input
                      name="bhk"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue={selectedProperty.BHK}
                      required
                      className={modernInputCls}
                    />
                  </ModernFormField>
                  <ModernFormField label="Size (sq.ft)" icon="lucide:ruler">
                    <input
                      name="size"
                      type="number"
                      step="0.01"
                      defaultValue={selectedProperty.size}
                      required
                      className={modernInputCls}
                    />
                  </ModernFormField>
                </div>

                {/* Location Details */}
                <div className="grid grid-cols-2 gap-3">
                  <ModernFormField label="Locality" icon="lucide:map-pin">
                    <input
                      name="locality"
                      defaultValue={selectedProperty.locality}
                      required
                      className={modernInputCls}
                    />
                  </ModernFormField>
                  <ModernFormField label="Area" icon="lucide:map">
                    <input
                      name="area"
                      defaultValue={selectedProperty.area}
                      required
                      className={modernInputCls}
                    />
                  </ModernFormField>
                </div>

                {/* City (locked) & PIN */}
                <div className="grid grid-cols-2 gap-3">
                  <ModernFormField
                    label="City"
                    icon="material-symbols:location-city-outline"
                  >
                    <input
                      value={selectedProperty.city}
                      disabled
                      className={`${modernInputCls} opacity-50 cursor-not-allowed bg-zinc-800/50`}
                    />
                  </ModernFormField>
                  <ModernFormField
                    label="PIN Code"
                    icon="material-symbols:mark-as-unread-outline-rounded"
                  >
                    <input
                      name="pin"
                      type="number"
                      defaultValue={selectedProperty.pin}
                      required
                      className={modernInputCls}
                    />
                  </ModernFormField>
                </div>

                {/* Year Built & Description */}
                <div className="grid grid-cols-2 gap-3">
                  <ModernFormField label="Year Built" icon="lucide:calendar">
                    <input
                      name="yearBuilt"
                      type="number"
                      defaultValue={selectedProperty.year_built}
                      required
                      className={modernInputCls}
                    />
                  </ModernFormField>
                  <ModernFormField label="Description" icon="lucide:file-text">
                    <input
                      name="description"
                      defaultValue={selectedProperty.description}
                      className={modernInputCls}
                    />
                  </ModernFormField>
                </div>
              </div>
              <ModernModalActions
                onCancel={() => setIsEditModalOpen(false)}
                submitLabel="Save Changes"
              />
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Modern List Property Modal */}
      <AnimatePresence>
        {isListModalOpen && selectedProperty && (
          <Modal
            onClose={() => setIsListModalOpen(false)}
            title="List Property"
          >
            {(() => {
              const activeListings = getActiveListings(selectedProperty.id);
              const canListRent = !activeListings.some(
                (l) => l.listingType === "RENT",
              );
              const canListSell = !activeListings.some(
                (l) => l.listingType === "SELL",
              );
              return (
                <form onSubmit={handleListProperty}>
                  {/* Active listings summary */}
                  {activeListings.length > 0 && (
                    <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-800/30 rounded-xl p-3 mb-4 border border-zinc-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-4 bg-orange-500 rounded-full" />
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                          Active Listings
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeListings.map((l) => (
                          <span
                            key={l.tokenId}
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                              l.listingType === "RENT"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                            }`}
                          >
                            {l.listingType} · Token #{l.tokenId}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <ModernFormField
                        label="Listing Type"
                        icon="lucide:clipboard-list"
                      >
                        <select
                          value={listingForm.listingType}
                          onChange={(e) =>
                            setListingForm({
                              ...listingForm,
                              listingType: e.target.value,
                            })
                          }
                          className={modernInputCls}
                        >
                          {canListSell && (
                            <option value="SELL">For Sale</option>
                          )}
                          {canListRent && (
                            <option value="RENT">For Rent</option>
                          )}
                        </select>
                      </ModernFormField>
                      <ModernFormField
                        label="Price"
                        icon={
                          listingForm.listingType === "RENT"
                            ? "material-symbols:database-outline"
                            : "material-symbols:attach-money"
                        }
                      >
                        <input
                          type="number"
                          value={listingForm.price}
                          onChange={(e) =>
                            setListingForm({
                              ...listingForm,
                              price: e.target.value,
                            })
                          }
                          required
                          className={modernInputCls}
                          placeholder={
                            listingForm.listingType === "RENT"
                              ? "Monthly rent amount"
                              : "Sale price"
                          }
                        />
                      </ModernFormField>
                    </div>

                    <ModernFormField
                      label="Description"
                      icon="lucide:file-text"
                    >
                      <textarea
                        value={listingForm.description}
                        onChange={(e) =>
                          setListingForm({
                            ...listingForm,
                            description: e.target.value,
                          })
                        }
                        rows="3"
                        className={`${modernInputCls} resize-none`}
                        placeholder="Describe the property features, condition, and terms..."
                      />
                    </ModernFormField>
                  </div>

                  <ModernModalActions
                    onCancel={() => setIsListModalOpen(false)}
                    submitLabel="Create Listing"
                  />
                </form>
              );
            })()}
          </Modal>
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
            <Building2 size={18} />
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
