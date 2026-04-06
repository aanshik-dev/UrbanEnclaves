import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const team = [
  {
    name: "Ansik Singh Tomar",
    role: "Lead Developer",
    id: "2401037",
    image: "AT",
    socials: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Anuved Pratap Singh",
    role: "Database Architect",
    id: "2401041",
    image: "AS",
    socials: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Anmol Kumar",
    role: "UI/UX Designer",
    id: "2401031",
    image: "AK",
    socials: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Anmol Kumar",
    role: "Backend Engineer",
    id: "2401032",
    image: "AK",
    socials: { github: "#", twitter: "#", linkedin: "#" },
  },
];

export default function About() {
  return (
    <div className="max-w-6xl mx-auto space-y-16">
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
          Urban Enclaves is a state-of-the-art real estate management system
          designed to bring transparency, efficiency, and elite performance to
          the property market.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Transparency",
            desc: "Direct communication between owners, agents, and buyers with real-time tracking.",
            icon: "lucide:globe",
          },
          {
            title: "Efficiency",
            desc: "Robust SQL-powered query system for instant data retrieval and analysis.",
            icon: "lucide:users",
          },
          {
            title: "Innovation",
            desc: "Modern UI/UX designed for high-performance real estate operations.",
            icon: "lucide:heart",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] backdrop-blur-sm group hover:border-orange-500/30 transition-all"
          >
            <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-500 w-fit mb-6 group-hover:scale-110 transition-transform">
              <Icon icon={item.icon} width="28" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Team Section */}
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Meet the Developers
          </h2>
          <p className="text-zinc-500 font-medium">
            A dedicated team of 4 working to revolutionize real estate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] text-center backdrop-blur-sm group hover:border-orange-500/30 transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-orange-500/20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  {member.image}
                </div>
                <h4 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">
                  {member.role}
                </p>
                <p className="text-zinc-500 text-xs font-medium mb-6">
                  ID: {member.id}
                </p>

                <div className="flex items-center justify-center gap-3">
                  <a
                    href={member.socials.github}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-all"
                  >
                    <Icon icon="lucide:github" width="18" />
                  </a>
                  <a
                    href={member.socials.twitter}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-all"
                  >
                    <Icon icon="lucide:twitter" width="18" />
                  </a>
                  <a
                    href={member.socials.linkedin}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-all"
                  >
                    <Icon icon="lucide:linkedin" width="18" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-12 rounded-[3rem] backdrop-blur-sm text-center space-y-6">
        <h3 className="text-2xl font-bold text-white">
          Built for CS241 - DBMS Project
        </h3>
        <p className="text-zinc-500 font-medium max-w-xl mx-auto">
          This project demonstrates a complete real estate ecosystem with robust
          database management, role-based access control, and modern UI/UX
          principles.
        </p>
        <div className="flex items-center justify-center gap-6 pt-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm font-bold">
            <Icon icon="lucide:mail" width="18" className="text-orange-500" />{" "}
            contact@urbanenclaves.com
          </div>
          <div className="flex items-center gap-2 text-zinc-400 text-sm font-bold">
            <Icon icon="lucide:globe" width="18" className="text-orange-500" />{" "}
            www.urbanenclaves.com
          </div>
        </div>
      </div>
    </div>
  );
}
