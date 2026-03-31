import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <nav className="p-8 flex justify-between items-center relative z-10">
        <h1 className="text-2xl font-bold tracking-tighter text-orange-500">URBAN ENCLAVES</h1>
        <button 
          onClick={onStart}
          className="px-6 py-2 rounded-full border border-zinc-800 hover:bg-white hover:text-black transition-all duration-300 font-medium"
        >
          Sign In
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-7xl font-bold leading-[0.9] tracking-tighter mb-8">
              FIND YOUR <br />
              <span className="text-orange-500 italic">PERFECT</span> <br />
              SANCTUARY.
            </h2>
            <p className="text-zinc-400 text-lg max-w-md mb-10 leading-relaxed">
              Experience real estate management redefined. Urban Enclaves connects homeowners, 
              agents, and buyers through a seamless, transparent, and beautiful interface.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={onStart}
                className="px-8 py-4 rounded-2xl bg-orange-500 text-white font-bold flex items-center gap-2 hover:bg-orange-600 transition-all group"
              >
                Get Started Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-2xl border border-zinc-800 font-bold hover:bg-zinc-900 transition-all">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-[40px] overflow-hidden border border-zinc-800 rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" 
                alt="Luxury Home" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl -rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                  <Building2 size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">2,500+</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">Properties Listed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-32">
          {[
            { icon: UserCheck, title: "Verified Users", desc: "Trust-based community of real buyers and sellers." },
            { icon: ShieldCheck, title: "Expert Agents", desc: "Top-tier professionals to guide your journey." },
            { icon: Building2, title: "Prime Locations", desc: "Curated listings in the most desirable enclaves." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/50 transition-colors"
            >
              <feature.icon className="text-orange-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-zinc-500 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
