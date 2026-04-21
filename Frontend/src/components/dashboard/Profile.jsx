import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios"; // Adjust path as needed
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  CheckCircle2,
  Save,
  ShieldCheck,
  Briefcase,
  AlertCircle,
  Info,
  Edit3,
} from "lucide-react";

export default function Profile({ role }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    area: "",
    pin: "",
    username: "",
    userId: "",
    profileUrl: "",
  });

  // --- FETCH DATA ON MOUNT ---
  useEffect(() => {
    const fetchProfile = async () => {
      const id = localStorage.getItem("id");
      if (!id) return;

      try {
        const response = await API.get(`/api/users/${id}`);
        const user = response.data.data;
        setUserData(user);
        console.log(user);
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          city: user.city || "",
          area: user.area || "",
          pin: user.pin || "",
          username: user.username || "",
          userId: user.userId || "",
          profileUrl: user.profileUrl || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setError(null);
    setSaving(true);

    // Prepare only the fields that match the POST /api/user/me API schema
    const payload = {
      name: formData.name,
      phone:
        typeof formData.phone === "string"
          ? parseInt(formData.phone)
          : formData.phone,
      profileURL: formData.profileUrl,
      area: formData.area,
      city: formData.city,
      pin:
        typeof formData.pin === "string"
          ? parseInt(formData.pin)
          : formData.pin,
    };

    try {
      // Make POST request to /api/users/me endpoint
      const response = await API.post("/api/users/me", payload);

      // Update local userData with new values
      const updatedUser = response.data.data || response.data;
      setUserData(updatedUser);

      // Update form data with response
      setFormData({
        ...formData,
        name: updatedUser.name || formData.name,
        phone: updatedUser.phone || formData.phone,
        area: updatedUser.area || formData.area,
        city: updatedUser.city || formData.city,
        pin: updatedUser.pin || formData.pin,
        profileUrl:
          updatedUser.profileURL ||
          updatedUser.profileUrl ||
          formData.profileUrl,
      });

      // Show success message
      setShowSuccess(true);
      setIsEditing(false);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to update profile",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 animate-pulse">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-5xl px-4 mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            My Profile
          </h1>
          <p className="text-zinc-400 font-medium">
            Manage your personal information and account details.
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl transition-all border border-zinc-700/50"
          >
            <Edit3 size={18} /> Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                // Reset form data to original values
                setFormData({
                  name: userData.name || "",
                  email: userData.email || "",
                  phone: userData.phone || "",
                  city: userData.city || "",
                  area: userData.area || "",
                  pin: userData.pin || "",
                  username: userData.username || "",
                  userId: userData.userId || "",
                  profileUrl: userData.profileUrl || "",
                });
                setIsEditing(false);
                setError(null);
              }}
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-bold rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} /> Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-500 text-sm font-bold"
          >
            <CheckCircle2 size={18} /> Profile updated successfully!
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-bold"
          >
            <AlertCircle size={18} /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] text-center backdrop-blur-sm relative overflow-hidden group">
            <div className="relative inline-block mb-4">
              {formData.profileUrl ? (
                <img
                  src={formData.profileUrl}
                  alt={formData.name}
                  className="w-32 h-32 rounded-[2.5rem] object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-orange-500/30 uppercase">
                  {formData.name?.substring(0, 2) || "U"}
                </div>
              )}
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-orange-500 rounded-full shadow-lg">
                  <Camera size={16} className="text-white" />
                </button>
              )}
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {formData.name}
            </h3>
            <p className="text-zinc-500 text-md font-bold lowercase red-hat-display tracking-widest mb-6">
              @{formData.username}
            </p>

            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500/10 rounded-xl border border-orange-500/20 text-orange-500 text-xs font-bold mb-4"> 
              <ShieldCheck size={14} /> Verified {userData?.userType || role}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 px-4 bg-zinc-800/30 rounded-2xl border border-zinc-800/50">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                  User ID
                </span>
                <span className="text-white font-bold text-sm">
                  #{formData.userId}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 px-4 bg-zinc-800/30 rounded-xl border border-zinc-800/50">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                  Member Since
                </span>
                <span className="text-white font-bold text-sm">
                  {userData?.regDate
                    ? new Date(userData.regDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] backdrop-blur-sm">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <User size={14} className="text-orange-500" /> Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all disabled:opacity-50 font-medium"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={14} className="text-orange-500" /> Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled={true}
                  className="w-full bg-zinc-800/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-zinc-400 cursor-not-allowed font-medium"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Phone size={14} className="text-orange-500" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  disabled={!isEditing}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numbers
                    if (value === "" || /^\d+$/.test(value)) {
                      setFormData({ ...formData, phone: value });
                    }
                  }}
                  className="w-full bg-zinc-800/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all disabled:opacity-50 font-medium"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={14} className="text-orange-500" /> City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all disabled:opacity-50 font-medium"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={14} className="text-orange-500" /> Area
                </label>
                <input
                  type="text"
                  value={formData.area}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all disabled:opacity-50 font-medium"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={14} className="text-orange-500" /> PIN Code
                </label>
                <input
                  type="number"
                  value={formData.pin}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, pin: e.target.value })
                  }
                  className="w-full bg-zinc-800/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all disabled:opacity-50 font-medium"
                />
              </div>

              {isEditing && (
                <div className="space-y-3 md:col-span-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Camera size={14} className="text-orange-500" /> Profile URL
                  </label>
                  <input
                    type="text"
                    value={formData.profileUrl}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, profileUrl: e.target.value })
                    }
                    placeholder="https://example.com/profile-image.jpg"
                    className="w-full bg-zinc-800/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all disabled:opacity-50 font-medium"
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
