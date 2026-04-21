{/* Agent Detail Panel */}
{selectedAgent && (
  <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-y-auto scrollbar-hide flex flex-col backdrop-blur-sm">
    <div className="p-6 border-b border-zinc-800/50 bg-gradient-to-br from-zinc-900/80 to-transparent">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Image with fallback */}
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold uppercase overflow-hidden">
          {selectedAgent.profileUrl ? (
            <img
              src={selectedAgent.profileUrl}
              alt={selectedAgent.agentName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
                e.target.parentElement.innerText =
                  selectedAgent.agentName?.substring(0, 2);
              }}
            />
          ) : (
            selectedAgent.agentName?.substring(0, 2)
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 my-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {selectedAgent.agentName}
            </h2>
            <span
              className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                selectedAgent.agentStatus === "ACTIVE"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-rose-500/10 text-rose-500"
              }`}
            >
              {selectedAgent.agentStatus}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
              <Award className="text-orange-500" size={14} />
              <span>AID: {selectedAgent.agentId}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
              <Calendar className="text-orange-500" size={14} />
              <span>Exp: {selectedAgent.experience} Years</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
              <TrendingUp className="text-orange-500" size={14} />
              <span>Commission: {selectedAgent.commissionRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800/50">
          <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
            Total Sales
          </p>
          <div className="flex items-center gap-2">
            <DollarSign className="text-orange-500" size={16} />
            <span className="text-lg font-bold text-white">
              ₹{(selectedAgent.totalSales / 100000).toFixed(1)}L
            </span>
          </div>
        </div>
        <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800/50">
          <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
            Total Deals
          </p>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-orange-500" size={16} />
            <span className="text-lg font-bold text-white">
              {selectedAgent.total_deals}
            </span>
          </div>
        </div>
        <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800/50">
          <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
            Active Deals
          </p>
          <div className="flex items-center gap-2">
            <Building2 className="text-orange-500" size={16} />
            <span className="text-lg font-bold text-white">
              {selectedAgent.activeDeals}
            </span>
          </div>
        </div>
        <div className="bg-zinc-800/30 p-4 rounded-2xl border border-zinc-800/50">
          <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">
            Deals Left
          </p>
          <div className="flex items-center gap-2">
            <Clock className="text-orange-500" size={16} />
            <span className="text-lg font-bold text-white">
              {selectedAgent.deals_left}
            </span>
          </div>
        </div>
      </div>

      {/* Equal height row - using grid with auto-rows-fr */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Performance Score Card */}
        <div className="flex flex-col">
          <h4 className="text-white font-bold flex items-center gap-2 text-sm mb-3">
            <BarChart3 className="text-orange-500" size={18} /> Performance Score
          </h4>
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-zinc-800/30 rounded-2xl border border-zinc-800/50 min-h-[220px]">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="46"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="10"
                  fill="none"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="46"
                  stroke="url(#gradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: 289, strokeDashoffset: 289 }}
                  animate={{
                    strokeDashoffset: 289 - (289 * selectedAgent.score) / 100,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[20px] font-bold text-white">
                  {selectedAgent.score}%
                </span>
                <span className="text-[10px] text-zinc-500">Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Rating Card */}
        <div className="flex flex-col">
          <h4 className="text-white font-bold flex items-center gap-2 text-sm mb-3">
            <Star className="text-orange-500 fill-orange-500" size={18} /> User Rating
          </h4>
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-zinc-800/30 rounded-2xl border border-zinc-800/50 min-h-[220px]">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="46"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="10"
                  fill="none"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="46"
                  stroke="url(#gradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: 289, strokeDashoffset: 289 }}
                  animate={{
                    strokeDashoffset: 289 - (289 * selectedAgent.user_rating) / 5,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[20px] font-bold text-white">
                  {selectedAgent.user_rating}
                </span>
                <span className="text-[10px] text-zinc-500">out of 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="flex flex-col">
          <h4 className="text-white font-bold flex items-center gap-2 text-sm mb-3">
            <Mail className="text-orange-500" size={18} /> Contact Info
          </h4>
          <div className="flex-1 flex flex-col justify-center p-4 bg-zinc-800/30 rounded-2xl border border-zinc-800/50 min-h-[220px]">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl">
                <Mail size={14} className="text-orange-500 flex-shrink-0" />
                <p className="text-white font-bold text-xs truncate">
                  {selectedAgent.email}
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl">
                <Phone size={14} className="text-orange-500 flex-shrink-0" />
                <p className="text-white font-bold text-xs">
                  {selectedAgent.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}