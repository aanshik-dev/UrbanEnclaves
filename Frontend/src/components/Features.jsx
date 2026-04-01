import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const features = [
  {
    icon: "mdi:account-check-outline",
    title: "Verified Users",
    desc: "Every user is authenticated to ensure a trusted environment for buyers, sellers, and agents.",
  },
  {
    icon: "mdi:home-search-outline",
    title: "Smart Property Search",
    desc: "Advanced filtering system to quickly find properties based on location, price, and preferences.",
  },
  {
    icon: "mdi:shield-check-outline",
    title: "Secure Transactions",
    desc: "End-to-end transparency in deals with verified listings and transaction tracking.",
  },
  {
    icon: "mdi:database-outline",
    title: "Optimized Database",
    desc: "Built on a normalized relational database ensuring consistency, scalability, and performance.",
  },
  {
    icon: "mdi:account-tie-outline",
    title: "Agent Management",
    desc: "Dedicated system to manage real estate agents and monitor their performance efficiently.",
  },
  {
    icon: "mdi:bell-outline",
    title: "Real-time Notifications",
    desc: "Stay updated with instant alerts on listings, transactions, and important activities.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function Features() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-40">

      {/* HERO */}
      <div className="max-w-5xl mx-auto text-center mb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-6"
        >
          Powerful <span className="text-orange-500">Features</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-zinc-400 text-lg leading-relaxed"
        >
          UrbanEnclaves provides a complete ecosystem for managing real estate
          operations with efficiency, transparency, and performance.
        </motion.p>
      </div>

      {/* FEATURES GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={card}
            whileHover={{ scale: 1.05, y: -8 }}
            className="relative group"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 to-orange-700/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Card */}
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 
              shadow-[0_25px_60px_-15px_rgba(0,0,0,1)]
              hover:shadow-[0_35px_80px_-15px_rgba(249,115,22,0.25)]
              hover:border-orange-500/50
              transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-orange-500/10 mb-6 group-hover:scale-110 transition-transform">
                <Icon icon={feature.icon} className="text-orange-500 text-2xl" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* EXTRA SECTION (OPTIONAL WOW FACTOR) */}
      <div className="max-w-6xl mx-auto mt-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
        >
          Built for <span className="text-orange-500">Performance & Scale</span>
        </motion.h2>

        <p className="text-zinc-400 max-w-3xl mx-auto">
          With optimized queries, normalized database design, and efficient data
          relationships, UrbanEnclaves ensures fast performance even with large-scale
          real estate data.
        </p>
      </div>

    </div>
  );
}