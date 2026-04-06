import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const developers = [
  {
    name: "Member 1",
    role: "Database Architect",
    desc: "Designed the complete ER model and relational schema including entities like Users, Properties, Agents, Transactions, and Notifications. Ensured BCNF normalization and optimized query performance.",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Member 2",
    role: "Frontend Developer",
    desc: "Built a modern, responsive UI using React and Tailwind. Focused on smooth animations, UX, and visual consistency across the platform.",
    img: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Member 3",
    role: "Backend & API Engineer",
    desc: "Developed APIs and handled integration between frontend and database. Ensured scalability and efficient data handling.",
    img: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Member 4",
    role: "Testing & Optimization",
    desc: "Performed system testing, debugging, and optimization. Improved performance and ensured reliability of the system.",
    img: "https://i.pravatar.cc/150?img=4",
  },
];

// Animation Variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const About = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-40">

      {/* ABOUT */}
      <div className="max-w-5xl mx-auto text-center mb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-6"
        >
          About <span className="text-orange-500">UrbanEnclaves</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-zinc-400 text-lg leading-relaxed"
        >
          UrbanEnclaves is a next-generation real estate platform built on a
          robust database-driven architecture, connecting buyers, sellers, and
          agents in a seamless ecosystem.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-zinc-400 text-lg leading-relaxed mt-6"
        >
          The system leverages a structured relational database with entities
          like Properties, Users, Agents, Transactions, and Notifications to
          ensure data integrity, scalability, and performance.
        </motion.p>
      </div>

      {/* DEVELOPERS */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Meet the <span className="text-orange-500">Developers</span>
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{
                scale: 1.05,
                y: -10,
              }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 to-orange-700/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Card */}
              <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 transition-all duration-300 group-hover:border-orange-500/50">
                
                {/* Image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={dev.img}
                    alt={dev.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700 group-hover:border-orange-500 transition-all duration-300"
                  />
                </div>

                {/* Info */}
                <h3 className="text-xl font-semibold text-center mb-1">
                  {dev.name}
                </h3>
                <p className="text-orange-400 text-sm text-center mb-3">
                  {dev.role}
                </p>

                <p className="text-zinc-400 text-sm text-center leading-relaxed mb-4">
                  {dev.desc}
                </p>

                {/* Icons */}
                <div className="flex justify-center gap-4 text-zinc-400">
                  <Icon icon="mdi:github" className="hover:text-orange-500 cursor-pointer transition" />
                  <Icon icon="mdi:email-outline" className="hover:text-orange-500 cursor-pointer transition" />
                  <Icon icon="mdi:phone-outline" className="hover:text-orange-500 cursor-pointer transition" />
                  <Icon icon="mdi:linkedin" className="hover:text-orange-500 cursor-pointer transition" />
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;