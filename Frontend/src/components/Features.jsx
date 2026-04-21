import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const features = [
  {
    icon: "lucide:user-check",
    title: "Verified Users",
    desc: "Every user is authenticated to ensure a trusted environment for buyers, sellers, and agents.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: "lucide:search",
    title: "Smart Property Search",
    desc: "Advanced filtering system to quickly find properties based on location, price, and preferences.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: "lucide:shield",
    title: "Secure Transactions",
    desc: "End-to-end transparency in deals with verified listings and transaction tracking.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: "lucide:database",
    title: "Optimized Database",
    desc: "Built on a normalized relational database ensuring consistency, scalability, and performance.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: "lucide:users",
    title: "Agent Management",
    desc: "Dedicated system to manage real estate agents and monitor their performance efficiently.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: "lucide:bell",
    title: "Real-time Notifications",
    desc: "Stay updated with instant alerts on listings, transactions, and important activities.",
    color: "from-pink-500 to-pink-600",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white overflow-hidden">
      
      {/* Animated Background Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="relative px-6 py-24 md:py-32">
        
        {/* HERO SECTION */}
        <div className="max-w-5xl mx-auto text-center mb-28">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 backdrop-blur-sm"
          >
            <div className="relative">
              <Icon icon="lucide:sparkles" width="16" className="text-orange-500" />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Icon icon="lucide:sparkles" width="16" className="text-orange-500" />
              </div>
            </div>
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">
              Platform Capabilities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Powerful{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                Features
              </span>
              <motion.div
                className="absolute -inset-2 bg-orange-500/20 blur-2xl rounded-full -z-0"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            UrbanEnclaves provides a complete ecosystem for managing real estate
            operations with efficiency, transparency, and performance.
          </motion.p>

          {/* Floating elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* FEATURES GRID */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-12"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Icon icon="lucide:grid-3x3" width="24" className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              What We <span className="text-orange-500">Offer</span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={card}
                whileHover={{ y: -8 }}
                className="relative group h-full"
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
                
                {/* Main Card */}
                <div className="relative h-full bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden group-hover:border-orange-500/40 transition-all duration-300">
                  
                  {/* Top Gradient Bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  <div className="p-6 md:p-8">
                    {/* Icon with animated background */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-orange-500/30">
                        <Icon icon={feature.icon} className="text-orange-500 text-2xl" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                      {feature.desc}
                    </p>

                    {/* Decorative Element */}
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-orange-500/5 to-transparent rounded-tl-full pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* PERFORMANCE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto mt-32"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 rounded-[3rem]" />
          <div className="relative bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 backdrop-blur-sm border border-zinc-800 rounded-[3rem] p-10 md:p-12 text-center space-y-8 overflow-hidden">
            
            {/* Animated particles */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
            
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/20">
                <Icon icon="lucide:trending-up" width="32" className="text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Built for{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                  Performance & Scale
                </span>
              </h2>
              
              <p className="text-zinc-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                With optimized queries, normalized database design, and efficient data
                relationships, UrbanEnclaves ensures fast performance even with large-scale
                real estate data.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">99.9%</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">&lt;100ms</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Query Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">10k+</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Listings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">24/7</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Monitoring</div>
                </div>
              </div>
            </div>
            
            {/* Decorative line */}
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto" />
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 backdrop-blur-sm hover:bg-orange-500/20 transition-all cursor-pointer group">
            <Icon icon="lucide:rocket" width="18" className="text-orange-500 group-hover:animate-bounce" />
            <span className="text-orange-500 font-semibold">
              Explore All Features
            </span>
            <Icon icon="lucide:arrow-right" width="18" className="text-orange-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}