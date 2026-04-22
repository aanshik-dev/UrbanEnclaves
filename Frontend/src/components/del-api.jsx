// MyProperties.jsx
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
  AlertCircle,
  CheckCircle2,
  Home,
  TrendingUp,
  TrendingDown,
  Eye,
} from "lucide-react";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=2074&auto=format&fit=crop",
];

const getFallbackImage = (id) => {
  return FALLBACK_IMAGES[id % FALLBACK_IMAGES.length];
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

const cityOfficeMap = {
  "New Delhi": 100002,
  Mumbai: 100003,
  Lucknow: 100004,
  Gwalior: 100005,
  Guwahati: 100006,
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
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchAllData = async () => {
    try {
      const [listingsRes, propertiesRes] = await Promise.all([
        API.get("/api/listings/me/listings"),
        API.get("/api/properties/me/properties"),
      ]);

      const listingsData = listingsRes.data.data || [];
      const propertiesData = propertiesRes.data.data || [];

      setListings(listingsData);
      setOwnedProperties(propertiesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      showNotification("Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const getListingStatusForProperty = (propertyId) => {
    const propertyListings = listings.filter(
      (l) => l.property.propertyId === propertyId && l.status === "ACTIVE"
    );
    
    const hasRent = propertyListings.some(l => l.listingType === "RENT");
    const hasSell = propertyListings.some(l => l.listingType === "SELL");
    
    if (hasRent && hasSell) return "LISTED_BOTH";
    if (hasRent) return "LISTED_RENT";
    if (hasSell) return "LISTED_SELL";
    return "UNLISTED";
  };

  const canDeleteProperty = (propertyId) => {
    const hasAnyListing = listings.some(
      (l) => l.property.propertyId === propertyId
    );
    return !hasAnyListing;
  };

  const canListForType = (propertyId, listingType) => {
    const existingListing = listings.find(
      (l) => 
        l.property.propertyId === propertyId && 
        l.listingType === listingType && 
        l.status === "ACTIVE"
    );
    return !existingListing;
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      type: formData.get("type"),
      description: formData.get("description"),
      houseNo: formData.get("houseNo"),
      locality: formData.get("locality"),
      BHK: parseInt(formData.get("bhk")),
      size: parseFloat(formData.get("size")),
      city: formData.get("city"),
      area: formData.get("area"),
      year_built: parseInt(formData.get("yearBuilt")),
      pin: parseInt(formData.get("pin")),
      officeId: cityOfficeMap[formData.get("city")],
    };

    try {
      const response = await API.post("/api/properties", data);
      if (response.status === 200 || response.status === 201) {
        showNotification("Property added successfully!", "success");
        setIsAddModalOpen(false);
        fetchAllData();
      }
    } catch (error) {
      console.error("Error adding property:", error);
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
      console.error("Error editing property:", error);
      showNotification(
        error.response?.data?.message || "Failed to update property",
        "error",
      );
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!canDeleteProperty(propertyId)) {
      showNotification(
        "Cannot delete property with active or inactive listings!",
        "error"
      );
      return;
    }

    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      const response = await API.delete(`/api/properties/${propertyId}`);
      if (response.status === 200) {
        showNotification("Property deleted successfully!", "success");
        fetchAllData();
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      showNotification(
        error.response?.data?.message || "Failed to delete property",
        "error",
      );
    }
  };

  const handleListProperty = async (e) => {
    e.preventDefault();
    if (!selectedProperty) return;

    if (!canListForType(selectedProperty.id, listingForm.listingType)) {
      showNotification(
        `Property already has an active ${listingForm.listingType} listing!`,
        "error"
      );
      return;
    }

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
      console.error("Error listing property:", error);
      showNotification(
        error.response?.data?.message || "Failed to list property",
        "error",
      );
    }
  };

  const getActiveListingsForProperty = (propertyId) => {
    return listings.filter(
      (l) => l.property.propertyId === propertyId && l.status === "ACTIVE"
    );
  };

  const filteredProperties = ownedProperties.filter((property) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    
    return (
      property.houseNo?.toLowerCase().includes(query) ||
      property.locality?.toLowerCase().includes(query) ||
      property.city?.toLowerCase().includes(query) ||
      `${property.BHK} bhk`.includes(query) ||
      property.area?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 animate-pulse">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-500 font-medium">
            Loading your properties...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
              <AlertCircle size={18} />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            My Properties
          </h1>
          <p className="text-zinc-400 text-sm font-medium">
            Manage your property portfolio. {ownedProperties.length} properties owned.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 text-sm"
        >
          <PlusCircle size={16} /> Add Property
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors"
          size={16}
        />
        <input
          type="text"
          placeholder="Search by house no, locality, city, BHK, area..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-9 pr-3 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600 text-sm font-medium"
        />
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => {
          const listingStatus = getListingStatusForProperty(property.id);
          const activeListings = getActiveListingsForProperty(property.id);
          const fallbackImage = getFallbackImage(property.id);
          const canDelete = canDeleteProperty(property.id);
          const canEdit = true;

          return (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-[1.5rem] overflow-hidden group backdrop-blur-sm flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={fallbackImage}
                  alt={property.houseNo}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Status Badges */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {listingStatus !== "UNLISTED" && (
                    <span className="px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg bg-emerald-500 text-white">
                      LISTED
                    </span>
                  )}
                </div>

                {listingStatus !== "UNLISTED" && (
                  <div className="absolute top-3 left-3 flex gap-1">
                    {activeListings.map((listing, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-lg ${
                          listing.listingType === "RENT"
                            ? "bg-blue-500 text-white"
                            : "bg-purple-500 text-white"
                        }`}
                      >
                        {listing.listingType}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  {canEdit && (
                    <button
                      onClick={() => {
                        setSelectedProperty(property);
                        setIsEditModalOpen(true);
                      }}
                      className="p-2.5 bg-orange-500 hover:bg-orange-600 rounded-full transition-all transform hover:scale-110"
                      title="Edit Property"
                    >
                      <Edit3 size={18} className="text-white" />
                    </button>
                  )}
                  {(listingStatus === "UNLISTED" || activeListings.length < 2) && (
                    <button
                      onClick={() => {
                        setSelectedProperty(property);
                        setIsListModalOpen(true);
                      }}
                      className="p-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-full transition-all transform hover:scale-110"
                      title="List Property"
                    >
                      <Tag size={18} className="text-white" />
                    </button>
                  )}
                  {canDelete && (
                    <button
                      onClick={() => handleDeleteProperty(property.id)}
                      className="p-2.5 bg-red-500 hover:bg-red-600 rounded-full transition-all transform hover:scale-110"
                      title="Delete Property"
                    >
                      <Trash2 size={18} className="text-white" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-1 gap-2">
                  <h3 className="text-base font-bold text-white truncate flex-1">
                    {property.houseNo}, {property.locality}
                  </h3>
                  {listingStatus !== "UNLISTED" && activeListings[0] && (
                    <p className="text-orange-500 font-bold text-sm whitespace-nowrap">
                      {formatPrice(activeListings[0].price, activeListings[0].listingType)}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-zinc-500 text-xs mb-3 font-medium">
                  <MapPin size={12} />
                  <span className="truncate">
                    {property.area}, {property.city} - {property.pin}
                  </span>
                </div>

                {/* Property Details */}
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

                {/* Additional Info */}
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

                {/* Active Listings Info */}
                {listingStatus !== "UNLISTED" && activeListings.length > 0 && (
                  <div className="mb-3 p-2 bg-zinc-800/30 rounded-xl border border-zinc-800/50">
                    <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-1.5">
                      Active Listings
                    </p>
                    <div className="space-y-1">
                      {activeListings.map((listing, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span className="text-zinc-400">{listing.listingType}:</span>
                          <span className="text-white font-bold">
                            {formatPrice(listing.price, listing.listingType)}
                          </span>
                          <span className="text-zinc-500 text-[9px]">
                            Token #{listing.tokenId}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12 bg-zinc-900/30 rounded-[1.5rem] border border-dashed border-zinc-800">
          <Building2 className="mx-auto text-zinc-800 mb-2" size={32} />
          <p className="text-zinc-500 font-medium text-sm">
            No properties found. Click "Add Property" to get started.
          </p>
        </div>
      )}

      {/* Add Property Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <Modal
            onClose={() => setIsAddModalOpen(false)}
            title="Add New Property"
          >
            <form onSubmit={handleAddProperty} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    Property Type *
                  </label>
                  <select
                    name="type"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="FLAT">FLAT</option>
                    <option value="APARTMENT">APARTMENT</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    House No *
                  </label>
                  <input
                    name="houseNo"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="2"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    Locality *
                  </label>
                  <input
                    name="locality"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    Area *
                  </label>
                  <input
                    name="area"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    City *
                  </label>
                  <select
                    name="city"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="New Delhi">New Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="Gwalior">Gwalior</option>
                    <option value="Guwahati">Guwahati</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    PIN Code *
                  </label>
                  <input
                    name="pin"
                    type="number"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    BHK (1-10) *
                  </label>
                  <input
                    name="bhk"
                    type="number"
                    min="1"
                    max="10"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    Size (sq.ft) *
                  </label>
                  <input
                    name="size"
                    type="number"
                    step="0.01"
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                  Year Built *
                </label>
                <input
                  name="yearBuilt"
                  type="number"
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs"
                >
                  Save Property
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Edit Property Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedProperty && (
          <Modal
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Property"
          >
            <form onSubmit={handleEditProperty} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    Property Type *
                  </label>
                  <select
                    name="type"
                    defaultValue={selectedProperty.type}
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="FLAT">FLAT</option>
                    <option value="APARTMENT">APARTMENT</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    House No *
                  </label>
                  <input
                    name="houseNo"
                    defaultValue={selectedProperty.houseNo}
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedProperty.description}
                  rows="2"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    Locality *
                  </label>
                  <input
                    name="locality"
                    defaultValue={selectedProperty.locality}
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    Area *
                  </label>
                  <input
                    name="area"
                    defaultValue={selectedProperty.area}
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    PIN Code *
                  </label>
                  <input
                    name="pin"
                    type="number"
                    defaultValue={selectedProperty.pin}
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    BHK (1-10) *
                  </label>
                  <input
                    name="bhk"
                    type="number"
                    min="1"
                    max="10"
                    defaultValue={selectedProperty.BHK}
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    Size (sq.ft) *
                  </label>
                  <input
                    name="size"
                    type="number"
                    step="0.01"
                    defaultValue={selectedProperty.size}
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                    Year Built *
                  </label>
                  <input
                    name="yearBuilt"
                    type="number"
                    defaultValue={selectedProperty.year_built}
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
              <div className="bg-zinc-800/30 p-3 rounded-xl">
                <p className="text-zinc-500 text-[9px] font-medium">
                  Note: City and Office cannot be changed
                </p>
                <p className="text-white text-xs font-medium mt-1">
                  City: {selectedProperty.city}
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs"
                >
                  Update Property
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* List Property Modal */}
      <AnimatePresence>
        {isListModalOpen && selectedProperty && (
          <Modal
            onClose={() => setIsListModalOpen(false)}
            title="List Property"
          >
            <form onSubmit={handleListProperty} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                  Listing Type *
                </label>
                <select
                  value={listingForm.listingType}
                  onChange={(e) =>
                    setListingForm({
                      ...listingForm,
                      listingType: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="SELL">SELL</option>
                  <option value="RENT">RENT</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  value={listingForm.price}
                  onChange={(e) =>
                    setListingForm({ ...listingForm, price: e.target.value })
                  }
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                  Description
                </label>
                <textarea
                  value={listingForm.description}
                  onChange={(e) =>
                    setListingForm({
                      ...listingForm,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                  placeholder="Describe the property..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsListModalOpen(false)}
                  className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-xs"
                >
                  List Property
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// Modal Component
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
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden"
    >
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
            <Building2 size={20} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-zinc-800 rounded-xl text-zinc-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </motion.div>
  </div>
);