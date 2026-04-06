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
} from "lucide-react";
import { Icon } from "@iconify/react";

export default function Register() {
  const [step, setStep] = useState(1);
  const [isAgent, setIsAgent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    area: "",
    pincode: "",
    password: "",
  });

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
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 3) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 4) {
      nextStep();
    } else {
      // Final submission logic
      console.log("Verified Registration:", {
        ...formData,
        isAgent,
        otp: otp.join(""),
      });
      navigate("/login");
    }
  };

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
                  {step === 2 && "Location Information"}
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
                  />
                  <InputField
                    label="Email Address"
                    icon={Mail}
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Phone Number"
                    icon={Phone}
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
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
                  <InputField
                    label="City"
                    icon={MapPin}
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Area"
                      icon={Map}
                      name="area"
                      placeholder="Manhattan"
                      value={formData.area}
                      onChange={handleInputChange}
                    />
                    <InputField
                      label="Pincode"
                      name="pincode"
                      placeholder="10001"
                      value={formData.pincode}
                      onChange={handleInputChange}
                    />
                  </div>
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
                      We've sent a 4-digit code to <br />
                      <span className="text-zinc-300 font-medium">
                        {formData.email}
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-center gap-3">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpRefs.current[idx] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className="w-14 h-16 bg-zinc-900 border border-zinc-800 rounded-xl text-center text-2xl font-bold text-orange-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
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
                        onClick={() => setTimer(30)}
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
                  className="flex-1 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-[0.98]"
                >
                  <ChevronLeft size={18} />
                  Back
                </button>
              )}
              <button
                type="submit"
                className="flex-[2] py-4 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/10 active:scale-[0.98] group"
              >
                {step === 4 ? "Verify & Finish" : "Next Step"}
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
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
function InputField({ label, icon: Icon, type = "text", ...props }) {
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
          required
          className={`w-full ${Icon ? "pl-12" : "px-4"} pr-4 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm`}
        />
      </div>
    </div>
  );
}
