import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const steps = [
  {
    icon: "mdi:account-plus-outline",
    title: "Create an Account",
    desc: "Users register on the platform as buyers, sellers, or agents. Authentication ensures secure and verified access.",
  },
  {
    icon: "mdi:home-search-outline",
    title: "Browse & Search Properties",
    desc: "Users can explore listings using advanced filters such as location, pricing, and property type.",
  },
  {
    icon: "mdi:account-tie-outline",
    title: "Connect with Agents",
    desc: "Buyers can connect with verified agents to get expert guidance and assistance throughout the process.",
  },
  {
    icon: "mdi:file-document-outline",
    title: "List or Request Properties",
    desc: "Sellers can list properties, while buyers can express interest or make inquiries directly.",
  },
  {
    icon: "mdi:cash-check",
    title: "Secure Transactions",
    desc: "All transactions are tracked and managed securely within the system to ensure transparency.",
  },
  {
    icon: "mdi:bell-outline",
    title: "Real-time Updates",
    desc: "Users receive notifications about listing updates, transaction status, and important activities.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Working() {
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
          How It <span className="text-orange-500">Works</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-zinc-400 text-lg leading-relaxed"
        >
          UrbanEnclaves simplifies the real estate process through a structured,
          transparent, and efficient workflow powered by a robust database
          system.
        </motion.p>
      </div>

      {/* TIMELINE */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto relative"
      >
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-zinc-800"></div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative flex items-start gap-6 group"
            >
              {/* Icon Circle */}
              <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-orange-500 transition-all">
                <Icon icon={step.icon} className="text-orange-500 text-lg" />
              </div>

              {/* Content Card */}
              <div className="flex-1">
                <div
                  className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6
                  shadow-[0_20px_50px_-15px_rgba(0,0,0,1)]
                  hover:shadow-[0_30px_70px_-15px_rgba(249,115,22,0.25)]
                  hover:border-orange-500/50
                  transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* EXTRA SECTION */}
      <div className="max-w-6xl mx-auto mt-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
        >
          Designed for <span className="text-orange-500">Efficiency</span>
        </motion.h2>

        <p className="text-zinc-400 max-w-3xl mx-auto">
          Every step in UrbanEnclaves is backed by optimized database
          operations, ensuring fast queries, consistent data, and a smooth
          experience for all users.
        </p>
      </div>
    </div>
  );
}
