import { ChevronDown } from "lucide-react"; // Add this to your imports

// ... inside your Revenue Analytics section
<div className="relative group">
  <select
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
    className="appearance-none bg-zinc-800 border border-zinc-700/50 rounded-xl pl-4 pr-10 py-1.5 text-xs text-zinc-300 focus:ring-2 focus:ring-orange-500/20 cursor-pointer outline-none transition-all hover:border-zinc-600"
  >
    <option value="YEARLY">Yearly View</option>
    <option value="MONTHLY">Monthly View</option>
    <option value="WEEKLY">Weekly View</option>
  </select>
  
  {/* Manual Icon positioned with right-3 to ensure it never touches the boundary */}
  <ChevronDown 
    size={14} 
    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none group-hover:text-zinc-300 transition-colors" 
  />
</div>