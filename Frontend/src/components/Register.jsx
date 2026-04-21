import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Building2,
  User,
  Phone,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Users,
  Map,
  ShieldCheck,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Smartphone,
  AlertCircle,
} from "lucide-react";
import { Icon } from "@iconify/react";
import API from "../api/axios";

export default function Register() {
  const [step, setStep] = useState(1);
  const [isAgent, setIsAgent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedUsername, setGeneratedUsername] = useState("");
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "Aanshik Singh",
    email: "techansiksinghtomar@gmail.com",
    phone: "8822630829",
    city: "Gwalior",
    area: "Adityapuram",
    pincode: "474569",
    password: "password123",
    username: "",
  });

  // Generate random profile URL
  const generateProfileURL = () => {
    const isMale = Math.random() < 0.5;
    const randomNumber = Math.floor(Math.random() * 100);
    const gender = isMale ? "men" : "women";
    return `https://randomuser.me/api/portraits/${gender}/${randomNumber}.jpg`;
  };

  // Generate username when full name changes
  useEffect(() => {
    if (formData.fullName && formData.fullName.trim()) {
      const nameParts = formData.fullName.trim().toLowerCase().split(" ");
      const firstName = nameParts[0];
      const lastName =
        nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
      const baseUsername = lastName ? `${firstName}.${lastName}` : firstName;
      const randomNum = Math.floor(Math.random() * 900) + 100;
      const newUsername = `${baseUsername}${randomNum}`;
      setGeneratedUsername(newUsername);
      setFormData((prev) => ({ ...prev, username: newUsername }));
    }
  }, [formData.fullName]);

  // Timer logic for OTP resend
  useEffect(() => {
    let interval;
    if (step === 4 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user makes any change
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError(""); // Clear error when user enters OTP

    // Move to next input
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        setError("Please fill all fields");
        return false;
      }
      if (!formData.email.includes("@")) {
        setError("Please enter a valid email");
        return false;
      }
      if (formData.phone.length < 10) {
        setError("Please enter a valid phone number");
        return false;
      }
    } else if (step === 2) {
      if (
        !formData.city ||
        !formData.area ||
        !formData.pincode ||
        !formData.username
      ) {
        setError("Please fill all fields");
        return false;
      }
      if (formData.pincode.length !== 6 || !/^\d+$/.test(formData.pincode)) {
        setError("Please enter a valid 6-digit pincode");
        return false;
      }
    } else if (step === 3) {
      if (!formData.password) {
        setError("Please enter a password");
        return false;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return false;
      }
    }
    return true;
  };

  const sendOtp = async () => {
    setIsLoading(true);
    setError("");
    try {
      await API.post("/auth/send-otp", {
        email: formData.email,
      });
      nextStep();
      setTimer(30);
      // Reset OTP fields
      setOtp(["", "", "", "", "", ""]);
    } catch (err) {
      console.error("OTP Error:", err);
      const errorMessage =
        err.response?.data?.error?.message ||
        "Failed to send OTP. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Generate random profile URL
      const profileURL = generateProfileURL();

      // Step 1: Signup with OTP and userType
      const signupResponse = await API.post("/auth/signup", {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        otp: otp.join(""),
        userType: isAgent ? "AGENT" : "USER",
      });

      console.log("Signup Response:", signupResponse.data);

      // Step 2: Login after successful signup
      const loginResponse = await API.post("/auth/login", {
        username: formData.email,
        password: formData.password,
        userType: isAgent ? "AGENT" : "USER",
      });

      const { jwt, refresh, username, id } = loginResponse.data.data;

      // Store auth tokens
      localStorage.setItem("token", jwt);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("role", isAgent ? "AGENT" : "USER");
      localStorage.setItem("username", username);
      localStorage.setItem("id", id);

      // Step 3: Update user profile with additional details including profileURL
      await API.post("/api/users/me", {
        name: formData.fullName,
        phone: parseInt(formData.phone.replace(/\D/g, "")),
        profileURL: profileURL,
        area: formData.area,
        city: formData.city,
        pin: parseInt(formData.pincode),
        userType: isAgent ? "AGENT" : "USER",
      });

      // Clear tokens before redirecting to login
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("id");

      alert("Registration successful! Please login with your credentials.");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      const errorMessage =
        err.response?.data?.error?.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }

    if (step < 3) {
      nextStep();
    } else if (step === 3) {
      // Send OTP
      await sendOtp();
    } else if (step === 4) {
      // Complete registration
      await handleSignup();
    }
  };

  const nextStep = () => {
    setError(""); // Clear error when moving to next step
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setError(""); // Clear error when moving to previous step
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const cities = ["New Delhi", "Mumbai", "Lucknow", "Gwalior", "Guwahati"];

  const stats = [
    { label: "Active Listings", value: "12,400+", icon: Building2 },
    { label: "Verified Agents", value: "850+", icon: Users },
  ];

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex relative overflow-hidden selection:bg-orange-500/30">
      {/* BACK BUTTON */}
      <div className="absolute top-16 left-16 right-6 z-50 flex items-center justify-between lg:justify-start lg:gap-12">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all group"
        >
          <div className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-zinc-600 group-hover:bg-zinc-900 transition-all">
            <Icon icon="ic:round-arrow-back-ios" className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium tracking-wide">Back</span>
        </button>
      </div>

      {/* LEFT SIDE - IMMERSIVE VISUAL */}
      <div className="hidden lg:flex w-[50%] relative overflow-hidden border-r border-zinc-800/50">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
            alt="Modern Skyscraper"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <div className="flex items-center gap-3"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl xl:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
              Start Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Journey Today
              </span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-md">
              Join thousands of professionals in the most advanced real estate
              ecosystem.
            </p>

            <div className="space-y-4">
              {[
                "Exclusive Listing Access",
                "Direct Agent Channels",
                "Secure Digital Transactions",
              ].map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-3 text-zinc-300"
                >
                  <CheckCircle2 size={18} className="text-orange-500" />
                  <span className="font-medium text-sm">{feat}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md"
              >
                <div className="text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[440px]"
        >
          {/* Progress Header */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-1">
                  Create Account
                </h2>
                <p className="text-zinc-500 text-sm">
                  {step === 1 && "Personal Details"}
                  {step === 2 && "Location & Username"}
                  {step === 3 && "Security & Role"}
                  {step === 4 && "Verification"}
                </p>
              </div>
              <span className="text-orange-500 font-bold text-xs bg-orange-500/10 px-2 py-1 rounded">
                STEP {step}/4
              </span>
            </div>
            <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm"
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <InputField
                    label="Full Name"
                    icon={User}
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    label="Email Address"
                    icon={Mail}
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    label="Phone Number"
                    icon={Phone}
                    name="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-500 ml-1 uppercase tracking-wider">
                      City
                    </label>
                    <div className="relative group">
                      <MapPin
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors z-10"
                        size={18}
                      />
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm appearance-none cursor-pointer text-white"
                        style={{ backgroundColor: "#18181b" }}
                      >
                        <option value="" className="bg-zinc-900 text-zinc-400">
                          Select City
                        </option>
                        {cities.map((city) => (
                          <option
                            key={city}
                            value={city}
                            className="bg-zinc-900 text-white"
                          >
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Area and Pincode side by side */}
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      label="Area/Locality"
                      icon={Map}
                      name="area"
                      placeholder="Connaught Place"
                      value={formData.area}
                      onChange={handleInputChange}
                      required
                    />
                    <InputField
                      label="Pincode"
                      name="pincode"
                      placeholder="110001"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <InputField
                    label="Username"
                    icon={User}
                    name="username"
                    placeholder="john.doe123"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    helperText="This will be your unique identifier"
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <InputField
                    label="Create Password"
                    icon={Lock}
                    name="password"
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />

                  <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-between group hover:border-orange-500/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-sm">
                          Register as Agent
                        </div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                          Access professional tools
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAgent(!isAgent)}
                      className={`w-12 h-6 rounded-full transition-all relative ${isAgent ? "bg-orange-500" : "bg-zinc-800"}`}
                    >
                      <motion.div
                        animate={{ x: isAgent ? 24 : 4 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-4">
                    <Smartphone size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Verify your Email</h3>
                    <p className="text-zinc-500 text-sm mt-1">
                      We've sent a 6-digit code to <br />
                      <span className="text-zinc-300 font-medium">
                        {formData.email}
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-center gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpRefs.current[idx] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className="w-12 h-14 bg-zinc-900 border border-zinc-800 rounded-xl text-center text-2xl font-bold text-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                        autoComplete="off"
                      />
                    ))}
                  </div>

                  <div className="text-sm">
                    {timer > 0 ? (
                      <p className="text-zinc-500">
                        Resend code in{" "}
                        <span className="text-orange-500 font-bold">
                          {timer}s
                        </span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={sendOtp}
                        className="text-orange-500 font-bold hover:underline"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isLoading}
                  className="flex-1 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] py-4 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/10 active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {step === 4 ? "Verify & Finish" : "Next Step"}
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 font-bold hover:text-orange-400 transition-colors"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-12 flex justify-center items-center gap-2 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
            <ShieldCheck size={14} />
            Secure Encrypted Platform
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Reusable Input Component for cleaner code
function InputField({
  label,
  icon: Icon,
  type = "text",
  helperText,
  ...props
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-xs font-semibold text-zinc-500 ml-1 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors"
            size={18}
          />
        )}
        <input
          {...props}
          type={type}
          autoComplete="off"
          className={`w-full ${Icon ? "pl-12" : "px-4"} pr-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm text-white placeholder-zinc-500`}
          style={{ backgroundColor: "#18181b" }}
        />
      </div>
      {helperText && (
        <p className="text-[10px] text-zinc-500 ml-1">{helperText}</p>
      )}
    </div>
  );
}
