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
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Guwahati", // Keeping static if not in API
    username: "",
    userId: ""
  });

  // --- FETCH DATA ON MOUNT ---
  useEffect(() => {
    const fetchProfile = async () => {
      const id = localStorage.getItem("id");
      if (!id) return;

      try {
        const response = await API.get(`/users/${id}`);
        const user = response.data.data;

        setFormData({
          fullName: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          username: user.username || "",
          userId: user.userId || "",
          city: "Guwahati", 
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    // Note: You might need a PUT endpoint in your UserController to actually save
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (loading) {
    return <div className="h-96 flex items-center justify-center text-zinc-500 animate-pulse">Loading Profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">My Profile</h1>
          <p className="text-zinc-400 font-medium">Manage your personal information and account details.</p>
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
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-bold rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20"
            >
              <Save size={18} /> Save Changes
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
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] text-center backdrop-blur-sm relative overflow-hidden group">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-orange-500/30 uppercase">
                {formData.fullName?.substring(0, 2) || "U"}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{formData.fullName}</h3>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-6">@{formData.username}</p>

            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500/10 rounded-xl border border-orange-500/20 text-orange-500 text-xs font-bold">
              <ShieldCheck size={14} /> Verified {role}
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] backdrop-blur-sm">
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Info className="text-orange-500" size={18} /> ID Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-800/30 rounded-2xl border border-zinc-800/50">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">User ID</span>
                <span className="text-white font-bold text-sm">#{formData.userId}</span>
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
                  value={formData.fullName}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-800/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all disabled:opacity-50 font-medium"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Phone size={14} className="text-orange-500" /> Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-zinc-800/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all disabled:opacity-50 font-medium"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800/50">
              <div className="flex items-center gap-3 p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl text-orange-500/80 text-xs font-medium">
                <AlertCircle size={16} />
                Your profile is public and visible to other users and agents.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}