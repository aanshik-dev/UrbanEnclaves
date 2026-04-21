import { motion, useScroll, useTransform } from "framer-motion";
import {
  Building2,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Clock,
  Award,
  MapPin,
  Search,
  Heart,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function Home({ onStart }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-orange-500/20 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute bottom-[10%] right-[5%] w-[35%] h-[35%] bg-orange-600/15 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
          className="absolute top-[50%] left-[40%] w-[25%] h-[25%] bg-orange-500/10 blur-[120px] rounded-full"
        />
      </div>

      <main ref={targetRef} className="relative z-10">
        {/* HERO SECTION */}
        <div className="max-w-7xl mx-auto px-6 pt-15 pb-32 md:pt-20 md:pb-25">
          <div className="grid py-16 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-orange-400 rounded-full text-sm font-semibold mb-6 border border-zinc-800">
                <Sparkles size={16} />
                <span>Next Generation Real Estate Platform</span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                Find your <span className="text-orange-500">perfect</span> urban
                sanctuary.
              </h1>

              <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-lg">
                UrbanEncleaves connects buyers, sellers, and elite agents
                through a transparent, high-performance DBMS ecosystem.
              </p>

              {/* CTA SECTION */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-10 py-2 bg-orange-500 text-white font-semibold rounded-2xl hover:bg-orange-600 transition-all group"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center gap-4 px-6 py-2 border border-zinc-800 rounded-2xl bg-zinc-900">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        src={`https://picsum.photos/seed/user${i}/100/100`}
                        className="w-10 h-10 rounded-full border-2 border-zinc-900 object-cover"
                        alt="User"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-zinc-400">
                    <span className="text-white font-bold">10k+</span> active
                    users
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex justify-end"
            >
              <div className="w-full max-w-md">
                <div className="aspect-square rounded-[30px] overflow-hidden border border-zinc-800 rotate-5 hover:rotate-0 transition-transform duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                    alt="Luxury Home"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 left-20 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <p className="text-xl font-bold">2,500+</p>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">
                      Properties
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FEATURES SECTION - Enhanced */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-6 max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                <Sparkles size={14} className="text-orange-500" />
                <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                  Find Your Next Home
                </span>
              </h2>
              <p className="text-zinc-400 text-lg font-medium">
                Whether you're looking for a home, managing listings, or
                overseeing the entire market, we've got you covered.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: UserCheck,
                  title: "Expert Agents",
                  desc: "Connect with verified professionals who understand your needs.",
                  gradient: "from-blue-500 to-blue-600",
                  stats: "500+ Agents",
                },
                {
                  icon: Building2,
                  title: "Smart Search",
                  desc: "Find exactly what you need quickly with AI-powered recommendations.",
                  gradient: "from-green-500 to-green-600",
                  stats: "10k+ Listings",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Deals",
                  desc: "Transparent and secure transactions with blockchain verification.",
                  gradient: "from-purple-500 to-purple-600",
                  stats: "100% Secure",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                  <div className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 hover:border-orange-500/40 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                      <feature.icon className="text-orange-500" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-4">
                      {feature.desc}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-orange-500 font-semibold">
                      <span>{feature.stats}</span>
                      <ChevronRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 py-20"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#2d0f00] to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(249,115,22,0.15),transparent_70%)]" />
            <div className="relative bg-linear-to-br from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-3xl p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Find Your Dream Home?
              </h3>
              <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied users who found their perfect urban
                sanctuary with UrbanEnclaves.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#ac4800] to-[#b47200] text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-orange-500/25 transition-all group"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
