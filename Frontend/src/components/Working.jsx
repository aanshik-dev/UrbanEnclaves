import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const steps = [
  {
    icon: "lucide:user-plus",
    title: "Create an Account",
    desc: "Users register on the platform as buyers, sellers, or agents. Authentication ensures secure and verified access.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: "lucide:search",
    title: "Browse & Search Properties",
    desc: "Users can explore listings using advanced filters such as location, pricing, and property type.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: "lucide:handshake",
    title: "Connect with Agents",
    desc: "Buyers can connect with verified agents to get expert guidance and assistance throughout the process.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: "lucide:file-text",
    title: "List or Request Properties",
    desc: "Sellers can list properties, while buyers can express interest or make inquiries directly.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: "lucide:shield-check",
    title: "Secure Transactions",
    desc: "All transactions are tracked and managed securely within the system to ensure transparency.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: "lucide:bell",
    title: "Real-time Updates",
    desc: "Users receive notifications about listing updates, transaction status, and important activities.",
    color: "from-pink-500 to-pink-600",
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
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Working() {
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
              <Icon
                icon="lucide:settings-2"
                width="16"
                className="text-orange-500"
              />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Icon
                  icon="lucide:settings-2"
                  width="16"
                  className="text-orange-500"
                />
              </div>
            </div>
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">
              Platform Workflow
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            How It{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                Works
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
            UrbanEnclaves simplifies the real estate process through a
            structured, transparent, and efficient workflow powered by a robust
            database system.
          </motion.p>

          {/* Floating elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* TIMELINE SECTION */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-12"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Icon
                icon="material-symbols:fire-check-rounded"
                width="30"
                className="text-white"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Step-by-Step <span className="text-orange-500">Journey</span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Vertical Line with Gradient */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-500/50 via-orange-500/20 to-transparent hidden md:block" />

            {/* Animated Line Progress */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-8 top-0 w-[2px] bg-gradient-to-b from-orange-500 to-orange-600 hidden md:block"
              style={{ height: "0%" }}
            />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="relative flex flex-col md:flex-row items-start gap-6 group"
                >
                  {/* Step Number & Icon */}
                  <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
                    <div className="flex items-center gap-4 md:block">
                      {/* Mobile Step Number */}
                      <div className="md:hidden w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>

                      {/* Desktop Timeline Node */}
                      <div className="hidden md:flex relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border-2 border-zinc-700 group-hover:border-orange-500 transition-all duration-300 flex items-center justify-center group-hover:scale-110">
                          <Icon
                            icon={step.icon}
                            className="text-orange-500 text-2xl"
                          />
                        </div>
                        <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-px bg-gradient-to-r from-orange-500/50 to-transparent hidden xl:block" />
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 w-full">
                    <div className="relative group/card">
                      {/* Card Glow */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl opacity-0 group-hover/card:opacity-20 transition duration-500 blur-xl" />

                      {/* Card Content */}
                      <div className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 md:p-8 hover:border-orange-500/40 transition-all duration-300">
                        {/* Step Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-orange-500/10 border border-orange-500/20">
                          <span className="text-orange-500 text-xs font-bold">
                            Step {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover/card:text-orange-500 transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-zinc-400 leading-relaxed">
                          {step.desc}
                        </p>

                        {/* Decorative Line */}
                        <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-orange-500/50 to-transparent rounded-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* EFFICIENCY SECTION */}
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
                <Icon icon="lucide:gauge" width="32" className="text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Designed for{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                  Efficiency
                </span>
              </h2>

              <p className="text-zinc-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Every step in UrbanEnclaves is backed by optimized database
                operations, ensuring fast queries, consistent data, and a smooth
                experience for all users.
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap justify-center gap-3 mt-8 pt-4">
                {[
                  "⚡ Fast Queries",
                  "🛡️ Data Integrity",
                  "📈 Scalable",
                  "🔒 Secure",
                  "🔄 Real-time",
                ].map((feature, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-sm backdrop-blur-sm hover:border-orange-500/50 transition-all"
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Decorative line */}
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto" />
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm hover:bg-orange-500/20 transition-all cursor-pointer group">
            <Icon
              icon="lucide:play"
              width="16"
              className="text-orange-500 group-hover:animate-pulse"
            />
            <span className="text-orange-500 text-sm font-semibold">
              Experience the Platform
            </span>
            <Icon
              icon="lucide:arrow-right"
              width="16"
              className="text-orange-500 group-hover:translate-x-1 transition-transform"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
