import { motion } from "framer-motion";
import {
  Building2,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home({ onStart }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-7xl mx-auto px-8 pt-16 pb-16 relative z-10">
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
              UrbanEncleaves connects buyers, sellers, and elite agents through
              a transparent, high-performance DBMS ecosystem.
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
            className="relative flex justify-center"
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
            <div className="absolute -bottom-6 -left-6 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl -rotate-3 hover:rotate-0 transition-transform duration-500">
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

        {/* FEATURES */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-4xl font-black tracking-tight text-white">
                Everything You Need to Find Your Next Home
              </h2>
              <p className="text-zinc-400 font-medium">
                Whether you're looking for a home, managing listings, or
                overseeing the entire market, we've got you covered.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: UserCheck,
                  title: "Expert Agents",
                  desc: "Connect with verified professionals.",
                },
                {
                  icon: Building2,
                  title: "Smart Search",
                  desc: "Find exactly what you need quickly.",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Deals",
                  desc: "Transparent and secure transactions.",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900 p-8 rounded-[28px] border border-zinc-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,1)] hover:shadow-[0_35px_80px_-15px_rgba(249,115,22,0.25)] hover:border-orange-500/50  hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-orange-500/10 group-hover:scale-110 transition-transform">
                    <feature.icon className="text-orange-500" size={28} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-400 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
