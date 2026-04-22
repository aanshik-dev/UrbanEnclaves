import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
import {
  Building2,
  MapPin,
  DollarSign,
  CheckCircle2,
  LogOut,
  Search,
  ArrowUpRight,
  AlertCircle,
  Hash,
  Home,
  CreditCard,
  X,
  Banknote,
  Wallet,
} from "lucide-react";

// Pool of high-quality fallback images
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

// Helper function to get consistent fallback image based on tokenId
const getFallbackImage = (tokenId) => {
  return FALLBACK_IMAGES[tokenId % FALLBACK_IMAGES.length];
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

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Helper function to get commission (assume 2% of price for sale, 1 month rent for rent)
const getCommission = (price, listingType) => {
  if (!price) return "N/A";

  if (listingType === "RENT") {
    return `₹${(price / 1000).toLocaleString("en-IN")}k`;
  } else {
    const commission = price * 0.02;
    if (commission >= 10000000) {
      return `₹${(commission / 10000000).toFixed(2)} Cr`;
    } else if (commission >= 100000) {
      return `₹${(commission / 100000).toFixed(2)} Lac`;
    }
    return `₹${commission.toLocaleString("en-IN")}`;
  }
};

// Helper function to get property title
const getPropertyTitle = (property) => {
  if (!property) return "Property";
  const bhkText = property.BHK === 1 ? "1 BHK" : `${property.BHK} BHK`;
  return `${bhkText} ${property.type || "Property"} in ${property.area || property.city || "Prime Location"}`;
};

// Helper function to get location string
const getLocationString = (property) => {
  if (!property) return "Location not specified";
  const parts = [property.locality, property.area, property.city].filter(
    Boolean,
  );
  return parts.join(", ");
};

export default function Holdings() {
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leavingTokenId, setLeavingTokenId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    type: "FULL",
    mode: "ONLINE",
    buyerId: "",
  });
  const [processingPayment, setProcessingPayment] = useState(false);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchPropertyData = async () => {
    try {
      const response = await API.get("/api/listings/me/listings");
      console.log("Property Data:", response.data.data);
      setPropertyData(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching property data:",
        error.response?.data || error.message,
      );
      showNotification("Failed to fetch holdings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyData();
  }, []);

  const handleLeaveProperty = async (tokenId) => {
    setLeavingTokenId(tokenId);
    try {
      const response = await API.patch(`/api/listings/${tokenId}/leave`);

      if (response.data.success || response.status === 200) {
        showNotification(`Successfully left property ${tokenId}`, "success");
        await fetchPropertyData();
      } else {
        showNotification(
          response.data.message || "Failed to leave property",
          "error",
        );
      }
    } catch (error) {
      console.error("Error leaving property:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to leave property";
      showNotification(errorMessage, "error");
    } finally {
      setLeavingTokenId(null);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!selectedProperty) return;

    setProcessingPayment(true);
    try {
      const transactionData = {
        amount: parseFloat(paymentDetails.amount),
        type: paymentDetails.type,
        mode: paymentDetails.mode,
        agentId: selectedProperty.agent?.agentId,
        buyerId: parseInt(paymentDetails.buyerId),
        tokenId: selectedProperty.tokenId,
      };

      console.log("Transaction Data:", transactionData);
      const response = await API.post("/api/transactions", transactionData);

      if (
        response.data.success ||
        response.status === 200 ||
        response.status === 201
      ) {
        showNotification(
          `Payment of ₹${paymentDetails.amount} processed successfully!`,
          "success",
        );
        setShowPaymentModal(false);
        setPaymentDetails({
          amount: "",
          type: "FULL",
          mode: "ONLINE",
          buyerId: "",
        });
        await fetchPropertyData();
      } else {
        showNotification(response.data.message || "Payment failed", "error");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to process payment";
      showNotification(errorMessage, "error");
    } finally {
      setProcessingPayment(false);
    }
  };

  const openPaymentModal = (property) => {
    setSelectedProperty(property);
    // Pre-fill amount with property price
    setPaymentDetails({
      amount: property.price.toString(),
      type: "FULL",
      mode: "ONLINE",
      buyerId: "",
    });
    setShowPaymentModal(true);
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 animate-pulse">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-500 font-medium">Loading your holdings...</p>
        </div>
      </div>
    );
  }

  if (!propertyData || propertyData.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 font-medium">
        <div className="text-center">
          <Building2 className="mx-auto text-zinc-800 mb-3" size={48} />
          <p className="text-zinc-500 font-medium">
            No Property Data Available
          </p>
        </div>
      </div>
    );
  }

  const query = searchQuery.trim().toLowerCase();

  const filteredHoldings = propertyData.filter((h) => {
    const matchesTab = activeTab === "ALL" || h.status === activeTab;
    const property = h.property || {};
    const matchesSearch =
      String(h.tokenId || "").includes(query) ||
      String(property.propertyId || "").includes(query) ||
      (property.locality || "").toLowerCase().includes(query) ||
      (property.area || "").toLowerCase().includes(query) ||
      (property.city || "").toLowerCase().includes(query) ||
      String(property.pin || "").includes(query) ||
      (property.type || "").toLowerCase().includes(query) ||
      (property.BHK ? `${property.BHK} bhk`.includes(query) : false);
    return matchesTab && matchesSearch;
  });

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

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-xl">
                    <CreditCard className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      Make Payment
                    </h3>
                    <p className="text-zinc-500 text-xs">
                      Token #{selectedProperty.tokenId}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-1 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X size={18} className="text-zinc-500" />
                </button>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                {/* Amount Field */}
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={paymentDetails.amount}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        amount: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="Enter amount"
                    required
                    step="1"
                    min="1"
                  />
                  <p className="text-zinc-600 text-[10px] mt-1">
                    Property price: ₹{selectedProperty.price.toLocaleString()}
                  </p>
                </div>

                {/* Transaction Type */}
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                    Transaction Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setPaymentDetails({ ...paymentDetails, type: "FULL" })
                      }
                      className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        paymentDetails.type === "FULL"
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                      }`}
                    >
                      FULL
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPaymentDetails({
                          ...paymentDetails,
                          type: "ADVANCE",
                        })
                      }
                      className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        paymentDetails.type === "ADVANCE"
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                      }`}
                    >
                      ADVANCE
                    </button>
                  </div>
                </div>

                {/* Payment Mode */}
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                    Payment Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPaymentDetails({ ...paymentDetails, mode: "ONLINE" })
                      }
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        paymentDetails.mode === "ONLINE"
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                      }`}
                    >
                      <Wallet size={14} />
                      ONLINE
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPaymentDetails({
                          ...paymentDetails,
                          mode: "BANK_TRANSFER",
                        })
                      }
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        paymentDetails.mode === "BANK_TRANSFER"
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                      }`}
                    >
                      <Banknote size={14} />
                      BANK
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPaymentDetails({ ...paymentDetails, mode: "CARD" })
                      }
                      className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        paymentDetails.mode === "CARD"
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                      }`}
                    >
                      <CreditCard size={14} />
                      CARD
                    </button>
                  </div>
                </div>

                {/* Buyer ID */}
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                    Buyer ID
                  </label>
                  <input
                    type="number"
                    value={paymentDetails.buyerId}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        buyerId: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/50 transition-all"
                    placeholder="Enter buyer ID"
                    required
                    step="1"
                    min="1"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processingPayment}
                  className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    processingPayment
                      ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
                  }`}
                >
                  {processingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={16} />
                      Pay ₹
                      {parseFloat(paymentDetails.amount || 0).toLocaleString()}
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Manage Holdings
        </h1>
        <p className="text-zinc-400 text-sm font-medium">
          Track your assigned properties and manage their status.
        </p>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto scrollbar-hide">
          {["ALL", "ACTIVE", "INACTIVE"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/10"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors"
            size={14}
          />
          <input
            type="text"
            placeholder="Search by token ID, property ID, locality, area, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-3 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600 text-xs font-medium"
          />
        </div>
      </div>

      {/* Holdings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHoldings.map((h) => {
          const property = h.property || {};
          const owner = h.owner || {};
          const agent = h.agent || {};
          const fallbackImage = getFallbackImage(h.tokenId);

          return (
            <motion.div
              key={h.tokenId}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-[1.5rem] overflow-hidden group backdrop-blur-sm flex flex-col hover:border-zinc-700 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={fallbackImage}
                  alt={getPropertyTitle(property)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Pay Now Button - appears on hover (only for active properties) */}
                {h.status === "ACTIVE" && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => openPaymentModal(h)}
                      className="px-3 py-2 text-xs bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all transform scale-90 group-hover:scale-100 flex items-center gap-2 shadow-lg"
                    >
                      <CreditCard size={16} />
                      Pay Now
                    </button>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-lg ${
                      h.status === "INACTIVE"
                        ? "bg-rose-500 text-white"
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    {h.status}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-lg ${
                      h.listingType === "RENT"
                        ? "bg-blue-500 text-white"
                        : "bg-purple-500 text-white"
                    }`}
                  >
                    {h.listingType}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-1 gap-2">
                  <h3 className="text-sm font-bold text-white truncate flex-1">
                    {getPropertyTitle(property)}
                  </h3>
                  <p className="text-orange-500 font-bold text-sm whitespace-nowrap">
                    {formatPrice(h.price, h.listingType)}
                  </p>
                </div>

                {/* Token ID and Property ID Section */}
                <div className="flex items-center gap-3 mt-1 mb-2 pb-2 border-b border-zinc-800/50">
                  <div className="flex items-center gap-1.5">
                    <Hash size={10} className="text-zinc-500" />
                    <span className="text-[12px] font-mono text-zinc-400">
                      Token:{" "}
                      <span className="text-zinc-300 font-medium">
                        {h.tokenId}
                      </span>
                    </span>
                  </div>
                  <div className="w-px h-3 bg-zinc-800"></div>
                  <div className="flex items-center gap-1.5">
                    <Home size={10} className="text-zinc-500" />
                    <span className="text-[12px] font-mono text-zinc-400">
                      Prop:{" "}
                      <span className="text-zinc-300 font-medium">
                        {property.propertyId || "N/A"}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] mb-3 font-medium">
                  <MapPin size={12} />
                  <span className="truncate">
                    {getLocationString(property)}
                  </span>
                </div>

                {/* Property Details Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.BHK && (
                    <span className="px-2 py-1 bg-zinc-800/50 rounded-lg text-zinc-400 text-[9px] font-medium">
                      {property.BHK} BHK
                    </span>
                  )}
                  {property.type && (
                    <span className="px-2 py-1 bg-zinc-800/50 rounded-lg text-zinc-400 text-[9px] font-medium">
                      {property.type}
                    </span>
                  )}
                  {property.size && (
                    <span className="px-2 py-1 bg-zinc-800/50 rounded-lg text-zinc-400 text-[9px] font-medium">
                      {property.size} sq.ft
                    </span>
                  )}
                  {property.houseNo && (
                    <span className="px-2 py-1 bg-zinc-800/50 rounded-lg text-zinc-400 text-[9px] font-medium">
                      House: {property.houseNo}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800/50">
                    <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-0.5">
                      Commission
                    </p>
                    <p className="text-white font-bold text-xs">
                      {getCommission(h.price, h.listingType)}
                    </p>
                  </div>
                  <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800/50">
                    <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest mb-0.5">
                      Listed On
                    </p>
                    <p className="text-white font-bold text-xs">
                      {formatDate(h.listingDate)}
                    </p>
                  </div>
                </div>

                <div className="mt-auto space-y-2">
                  {h.status === "ACTIVE" ? (
                    <button
                      onClick={() => handleLeaveProperty(h.tokenId)}
                      disabled={leavingTokenId === h.tokenId}
                      className={`w-full py-2.5 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs group/btn border ${
                        leavingTokenId === h.tokenId
                          ? "bg-zinc-700/50 text-zinc-400 border-zinc-600 cursor-not-allowed"
                          : "bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20"
                      }`}
                    >
                      {leavingTokenId === h.tokenId ? (
                        <>
                          <div className="w-3 h-3 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
                          Leaving...
                        </>
                      ) : (
                        <>
                          <LogOut
                            size={14}
                            className="group-hover/btn:-translate-x-1 transition-transform"
                          />{" "}
                          Leave Property
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 p-2.5 bg-zinc-800/50 rounded-xl border border-zinc-800/50 text-zinc-500 text-[10px] font-bold justify-center">
                      <CheckCircle2 size={14} />
                      Property Status: Inactive
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredHoldings.length === 0 && (
        <div className="text-center py-12 bg-zinc-900/30 rounded-[1.5rem] border border-dashed border-zinc-800">
          <Building2 className="mx-auto text-zinc-800 mb-2" size={32} />
          <p className="text-zinc-500 font-medium text-sm">
            No properties found in your {activeTab.toLowerCase()} holdings.
          </p>
          {searchQuery && (
            <p className="text-zinc-600 text-xs mt-1">
              Try adjusting your search criteria
            </p>
          )}
        </div>
      )}

      {/* Info Banner */}
      <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-[1.5rem] flex items-center gap-3">
        <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
          <AlertCircle size={20} />
        </div>
        <div>
          <h4 className="text-white font-bold text-xs">
            Holding Management Policy
          </h4>
          <p className="text-zinc-500 text-[10px] font-medium">
            You can only leave properties that are currently active. Inactive
            properties will remain in your history for commission tracking.
          </p>
        </div>
      </div>
    </div>
  );
}
