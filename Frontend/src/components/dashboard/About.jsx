import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

const team = [
  {
    name: "Ansik Singh Tomar",
    role: "Lead Frontend Developer",
    id: "2401037",
    image: "AT",
    imageUrl: null,
    contribution: [
      "Architected the React frontend infrastructure and global state management.",
      "Integrated JWT-based authentication flow with silent refresh token logic, to the fronted",
      "Developed the dynamic Admin and Agent dashboards with real-time analytics visualization.",
      "Integrated Axios interceptors for global API error handling and debugging.",
    ],
    socials: { github: "#", linkedin: "#" },
  },
  {
    name: "Anuved Pratap Singh",
    role: "Lead Backend Developer and Database Architect",
    id: "2401041",
    image: "AS",
    imageUrl: null,
    contribution: [
      "Architected a robust relational database schema for properties, listings, agents, and transactions.",
      "Engineered RESTful APIs for property, listing token, and image management with a focus on scalability.",
      "Built and maintained data scraping workflows ensuring consistency, normalization, and reliability of data.",
      "Enhanced query performance by optimizing complex SQL operations used in analytics and query tools.",
    ],
    socials: { github: "#", linkedin: "#" },
  },
  {
    name: "Anmol Kumar",
    role: "Lead Backend Developer & System Designer",
    id: "2401032",
    image: "AK",
    imageUrl: null,
    contribution: [
      "Designed the complete backend system architecture and developed scalable REST APIs using Spring Boot following layered architecture",
      "Implemented secure authentication and authorization using JWT with role-based access control for User, Admin, Office, and Agent modules",
      "Applied Strategy Design Pattern to build flexible API architecture, enabling easier frontend integration and extensibility",
      "Developed analytics and revenue tracking system with optimized and complex database queries for efficient data processing and reporting.",
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
      "Designed intuitive and user-friendly interfaces with a focus on usability and accessibility.",
      "Created wireframes, prototypes, and user flows to enhance user experience across the platform.",
      "Collaborated with developers to ensure seamless implementation of design systems.",
      "Conducted user research and usability testing to improve interaction and visual design.",
    ],
    socials: { github: "#", linkedin: "#" },
  },
];

// Add this helper component before the About component
const Avatar = ({ image, imageUrl, name }) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover rounded-2xl"
      />
    );
  }
  return <span className="text-white text-3xl font-bold">{image}</span>;
};

export default function About() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-28 overflow-hidden">
        {/* Hero Section with 3D effect */}
        <div className="relative text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-full border border-orange-500/20 backdrop-blur-sm"
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

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            The Future of Real Estate
            <span className="relative inline-block ml-4">
              <span className="relative z-10 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Built as a comprehensive DBMS project to demonstrate modern data
            management and professional UI/UX standards in property tech.
          </motion.p>

          {/* Floating elements */}
          <div className="absolute top-1/2 left-50 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-50 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Team Section with Modern Cards */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8"
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

          <div className="space-y-6">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group"
              >
                {/* Animated border gradient */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-[2rem] opacity-0 group-hover:opacity-5 transition duration-500 blur-xl" />

                <div className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-[2rem] overflow-hidden">
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Profile Section */}
                      <div className="lg:w-1/3 space-y-5">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-5 group-hover:opacity-10 transition-opacity" />
                          <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl overflow-hidden">
                            <Avatar
                              image={member.image}
                              imageUrl={member.imageUrl}
                              name={member.name}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-white">
                            {member.name}
                          </h3>
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/20">
                            <Icon
                              icon="lucide:sparkles"
                              width="14"
                              className="text-orange-500"
                            />
                            <p className="text-orange-500 text-xs font-bold uppercase tracking-wider">
                              {member.role}
                            </p>
                          </div>
                          <p className="text-zinc-500 text-xs font-mono bg-zinc-800/50 w-fit px-3 py-1.5 rounded-lg">
                            ID: {member.id}
                          </p>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <motion.a
                            whileHover={{ scale: 1.1, y: -2 }}
                            href={member.socials.github}
                            className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-white hover:border-orange-500/50 transition-all"
                          >
                            <Icon icon="lucide:github" width="20" />
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.1, y: -2 }}
                            href={member.socials.linkedin}
                            className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-white hover:border-orange-500/50 transition-all"
                          >
                            <Icon icon="lucide:linkedin" width="20" />
                          </motion.a>
                        </div>
                      </div>

                      {/* Contributions Section */}
                      <div className="lg:w-2/3">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="p-1.5 rounded-lg bg-orange-500/10">
                            <Icon
                              icon="lucide:git-pull-request"
                              className="text-orange-500"
                              width="18"
                            />
                          </div>
                          <h4 className="text-white font-bold text-lg">
                            Core Contributions
                          </h4>
                          <div className="flex-1 h-px bg-gradient-to-r from-orange-500/20 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {member.contribution.map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="group/item relative"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity" />
                              <div className="relative flex gap-3 p-4 bg-zinc-950/40 border border-zinc-800 rounded-xl hover:border-orange-500/30 transition-all">
                                <div className="flex-shrink-0 mt-0.5">
                                  <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <Icon
                                      icon="lucide:check"
                                      className="text-orange-500"
                                      width="12"
                                    />
                                  </div>
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed group-hover/item:text-zinc-300 transition-colors">
                                  {item}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-500/5 to-transparent rounded-tl-full pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section with Modern Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
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
                <span className="inline-flex items-center gap-1 px-2 bg-orange-500/10 rounded-lg font-semibold text-white">
                  <Icon
                    icon="lucide:zap"
                    width="14"
                    className="text-orange-500"
                  />
                  React-Vite
                </span>{" "}
                frontend, a{" "}
                <span className="inline-flex items-center gap-1 px-2 bg-orange-500/10 rounded-lg font-semibold text-white">
                  <Icon
                    icon="lucide:server"
                    width="14"
                    className="text-orange-500"
                  />
                  Spring Boot
                </span>{" "}
                microservice backend, and a{" "}
                <span className="inline-flex items-center gap-1 px-2 bg-orange-500/10 rounded-lg font-semibold text-white">
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
    </div>
  );
}
