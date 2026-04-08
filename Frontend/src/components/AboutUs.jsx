import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const team = [
  {
    name: "Ansik Singh Tomar",
    role: "Lead Frontend Developer",
    id: "2401037",
    image: "AT",
    contribution: [
      "Architected the React frontend infrastructure and global state management.",
      "Integrated JWT-based authentication flow with silent refresh token logic.",
      "Developed dynamic Admin and Agent dashboards with real-time analytics.",
      "Integrated Axios interceptors for global API error handling.",
    ],
    socials: { github: "#", linkedin: "#" },
  },
  {
    name: "Anuved Pratap Singh",
    role: "Lead Backend Developer and Database Architect",
    id: "2401041",
    image: "AS",
    contribution: [
      "Architected a robust relational database schema for properties, listings, agents, and transactions.",
      "Engineered scalable REST APIs for property, listing token, and image management.",
      "Built data scraping workflows ensuring consistency and normalization.",
      "Optimized complex SQL queries for analytics and query tools.",
    ],
    socials: { github: "#", linkedin: "#" },
  },
  {
    name: "Anmol Kumar",
    role: "Lead Backend Developer and System Designer",
    id: "2401032",
    image: "AK",
    contribution: [
      "Designed backend architecture and scalable REST APIs using Spring Boot.",
      "Implemented JWT authentication with role-based access control.",
      "Applied Strategy Design Pattern for flexible API architecture.",
      "Built analytics and revenue tracking system with optimized queries.",
    ],
    socials: { github: "#", linkedin: "#" },
  },
  {
    name: "Anmol Kumar",
    role: "UI/UX Designer",
    id: "2401031",
    image: "AK",
    contribution: [
      "Designed intuitive UI with focus on usability and accessibility.",
      "Created wireframes, prototypes, and user flows.",
      "Collaborated with developers for design implementation.",
      "Conducted usability testing and research.",
    ],
    socials: { github: "#", linkedin: "#" },
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

      {/* TEAM */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Meet the <span className="text-orange-500">Team</span>
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((dev, index) => (
            <motion.div
              key={index}
              variants={card}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 to-orange-700/10 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Card */}
              <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 transition-all duration-300 group-hover:border-orange-500/50">
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center text-xl font-bold border-2 border-zinc-700 group-hover:border-orange-500 transition-all duration-300">
                    {dev.image}
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-xl font-semibold text-center mb-1">
                  {dev.name}
                </h3>

                <p className="text-xs text-zinc-500 text-center mb-1">
                  ROLL NO: {dev.id}
                </p>

                <p className="text-orange-400 text-sm text-center mb-3">
                  {dev.role}
                </p>

                {/* Contributions */}
                <ul className="text-zinc-400 text-sm space-y-2 mb-4">
                  {dev.contribution.map((point, i) => (
                    <li key={i} className="text-center">
                      • {point}
                    </li>
                  ))}
                </ul>

                {/* Icons */}
                <div className="flex justify-center gap-4 text-zinc-400">
                  <Icon
                    icon="mdi:github"
                    className="hover:text-orange-500 cursor-pointer transition"
                  />
                  <Icon
                    icon="mdi:linkedin"
                    className="hover:text-orange-500 cursor-pointer transition"
                  />
                  <Icon
                    icon="mdi:email-outline"
                    className="hover:text-orange-500 cursor-pointer transition"
                  />
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
