import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const team = [
  {
    name: "Ansik Singh Tomar",
    role: "Lead Frontend Developer",
    id: "2401037",
    image: "AT",
    imageUrl: null, // Add image URL if available, e.g., "/avatars/ansik.jpg"
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
    role: "Lead Backend Developer",
    id: "2401041",
    image: "AS",
    imageUrl: null,
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
    role: "Lead Backend Developer",
    id: "2401032",
    image: "AK",
    imageUrl: null,
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
    imageUrl: null,
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

const About = () => {
  const Avatar = ({ image, imageUrl, name }) => {
    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
      );
    }
    return (
      <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent text-2xl font-bold">
        {image}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="relative px-6 py-24 md:py-32">
        {/* ABOUT SECTION */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 backdrop-blur-sm"
          >
            <div className="relative">
              <Icon
                icon="lucide:building-2"
                width="16"
                className="text-orange-500"
              />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Icon
                  icon="lucide:building-2"
                  width="16"
                  className="text-orange-500"
                />
              </div>
            </div>
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">
              About Urban Enclaves
            </span>
          </motion.div>

          {/* Title with Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
          >
            The Future of Real Estate{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                Starts Here.
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
            Built as a comprehensive DBMS project to demonstrate modern data
            management and professional UI/UX standards in property tech.
          </motion.p>

          {/* Floating elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* TEAM SECTION */}
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-8"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Icon icon="lucide:users" width="24" className="text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Development Team
                </h2>
              </div>
              <p className="text-zinc-500 text-base font-medium">
                Meet the brilliant minds behind Urban Enclaves
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-5 py-2.5 rounded-full border border-orange-500/20 backdrop-blur-sm">
              <Icon
                icon="lucide:code-2"
                width="16"
                className="text-orange-500"
              />
              <span className="text-orange-500 font-mono text-sm font-semibold">
                CS241 - Database Management Systems
              </span>
            </div>
          </motion.div>

          {/* Team Grid - Fixed Grid Layout */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {team.map((dev, index) => (
              <motion.div
                key={index}
                variants={card}
                whileHover={{ y: -8 }}
                className="relative group flex-1"
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

                {/* Main Card */}
                <div className="relative h-full flex flex-col bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden group-hover:border-orange-500/40 transition-all duration-300">
                  {/* Top Gradient Bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="p-6 flex flex-col h-full">
                    {/* Avatar with Ring */}
                    <div className="relative mb-5 flex justify-center">
                      <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border-2 border-zinc-700 group-hover:border-orange-500 transition-all duration-300 group-hover:scale-105 overflow-hidden">
                        <Avatar
                          image={dev.image}
                          imageUrl={dev.imageUrl}
                          name={dev.name}
                        />
                      </div>
                      {/* Online Indicator */}
                      <div className="absolute bottom-1 right-1/3 w-3 h-3 rounded-full bg-green-500 border-2 border-zinc-900" />
                    </div>

                    {/* Info */}
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">
                        {dev.name}
                      </h3>
                      <p className="text-xs text-zinc-500 font-mono mb-2">
                        {dev.id}
                      </p>
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                        <Icon
                          icon="lucide:sparkles"
                          className="w-3 h-3 text-orange-500"
                        />
                        <p className="text-orange-400 text-xs font-semibold">
                          {dev.role}
                        </p>
                      </div>
                    </div>

                    {/* Contributions Section - Always Visible */}
                    <div className="flex-1 mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon
                          icon="lucide:git-pull-request"
                          className="w-3.5 h-3.5 text-orange-500"
                        />
                        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          Key Contributions
                        </h4>
                      </div>

                      {/* Scrollable Contributions List */}
                      <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar">
                        {dev.contribution.map((point, i) => (
                          <div key={i} className="flex gap-2 group/item">
                            <Icon
                              icon="lucide:check-circle-2"
                              className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0"
                            />
                            <p className="text-zinc-400 text-xs leading-relaxed group-hover/item:text-zinc-300 transition-colors">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-3 pt-3 border-t border-zinc-800 mt-auto">
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        href={dev.socials.github}
                        className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-orange-500/20 transition-all"
                      >
                        <Icon icon="mdi:github" className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        href={dev.socials.linkedin}
                        className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-orange-500/20 transition-all"
                      >
                        <Icon icon="mdi:linkedin" className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-orange-500/20 transition-all cursor-pointer"
                      >
                        <Icon icon="mdi:email-outline" className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech Stack Section with Modern Design */}
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
                <Icon icon="lucide:layers" width="32" className="text-white" />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                System Architecture
              </h3>
              <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Urban Enclaves utilizes a{" "}
                <span className="inline-flex items-center gap-1 px-1 bg-orange-500/10 rounded-lg font-semibold text-white">
                  <Icon
                    icon="lucide:zap"
                    width="14"
                    className="text-orange-500"
                  />
                  React-Vite
                </span>{" "}
                frontend, a{" "}
                <span className="inline-flex items-center gap-1 px-1 bg-orange-500/10 rounded-lg font-semibold text-white">
                  <Icon
                    icon="lucide:server"
                    width="14"
                    className="text-orange-500"
                  />
                  Spring Boot
                </span>{" "}
                microservice backend, and a{" "}
                <span className="inline-flex items-center gap-1 px-1 bg-orange-500/10 rounded-lg font-semibold text-white">
                  <Icon
                    icon="lucide:database"
                    width="14"
                    className="text-orange-500"
                  />
                  MySQL
                </span>{" "}
                relational database to deliver high-performance property
                management.
              </p>

              {/* Tech icons row */}
              <div className="flex flex-wrap justify-center gap-4 mt-8 pt-4">
                {[
                  "devicon:react",
                  "devicon:vitejs",
                  "logos:spring-icon",
                  "vscode-icons:file-type-mysql",
                ].map((tech, idx) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700 backdrop-blur-sm"
                  >
                    <Icon icon={tech} width="24" className="mx-auto" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative line */}
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto" />
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(39, 39, 42, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.8);
        }
      `}</style>
    </div>
  );
};

export default About;
