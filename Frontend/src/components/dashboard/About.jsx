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
    role: "Lead Backend Developer and System Designer",
    id: "2401032",
    image: "AK",
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
    contribution: [
      "Designed intuitive and user-friendly interfaces with a focus on usability and accessibility.",
      "Created wireframes, prototypes, and user flows to enhance user experience across the platform.",
      "Collaborated with developers to ensure seamless implementation of design systems.",
      "Conducted user research and usability testing to improve interaction and visual design.",
    ],
    socials: { github: "#", linkedin: "#" },
  },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto space-y-24 pb-20">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest"
        >
          <Icon icon="lucide:building-2" width="14" /> About Urban Enclaves
        </motion.div>
        <h1 className="text-5xl font-bold text-white tracking-tight">
          The Future of Real Estate <br />{" "}
          <span className="text-orange-500">Starts Here.</span>
        </h1>
        <p className="text-zinc-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          Built as a comprehensive DBMS project to demonstrate modern data
          management and professional UI/UX standards in property tech.
        </p>
      </div>

      {/* Detailed Team Section */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Development Team
            </h2>
            <p className="text-zinc-500 font-medium">
              Detailed contributions and core responsibilities.
            </p>
          </div>
          <div className="text-orange-500 font-mono text-sm bg-orange-500/5 px-4 py-2 rounded-lg border border-orange-500/10">
            CS241 - Database Management Systems
          </div>
        </div>

        <div className="space-y-8">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 hover:border-orange-500/20 transition-all overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] -mr-32 -mt-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex flex-col lg:flex-row gap-10 relative z-10">
                {/* Profile Side */}
                <div className="lg:w-1/3 space-y-6 text-center lg:text-left">
                  <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-orange-500/20 mx-auto lg:mx-0">
                    {member.image}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-4">
                      {member.role}
                    </p>
                    <p className="text-zinc-500 text-xs font-mono bg-zinc-800/50 w-fit px-3 py-1 rounded-md mx-auto lg:mx-0">
                      ID: {member.id}
                    </p>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                    <a
                      href={member.socials.github}
                      className="text-zinc-500 hover:text-white transition-colors"
                    >
                      <Icon icon="lucide:github" width="22" />
                    </a>
                    <a
                      href={member.socials.linkedin}
                      className="text-zinc-500 hover:text-white transition-colors"
                    >
                      <Icon icon="lucide:linkedin" width="22" />
                    </a>
                  </div>
                </div>

                {/* Contribution Side */}
                <div className="lg:w-2/3">
                  <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                    <Icon
                      icon="lucide:terminal"
                      className="text-orange-500"
                      width="18"
                    />
                    Core Contributions
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {member.contribution.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 p-4 bg-zinc-950/40 border border-zinc-800/50 rounded-2xl text-zinc-400 text-sm leading-relaxed"
                      >
                        <Icon
                          icon="lucide:check-circle-2"
                          className="text-orange-500 mt-1 flex-shrink-0"
                          width="16"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-12 rounded-[3rem] backdrop-blur-sm text-center space-y-6">
        <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>
        <h3 className="text-2xl font-bold text-white">System Architecture</h3>
        <p className="text-zinc-500 font-medium max-w-2xl mx-auto">
          Urban Enclaves utilizes a{" "}
          <span className="text-white">React-Vite</span> frontend, a{" "}
          <span className="text-white">Spring Boot</span> microservice backend,
          and a<span className="text-white">MySQL</span> relational database to
          deliver high-performance property management.
        </p>
      </div>
    </div>
  );
}
