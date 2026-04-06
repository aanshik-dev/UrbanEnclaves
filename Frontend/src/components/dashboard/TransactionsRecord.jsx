import { useState } from "react";
import {
  History,
  Search,
  Building2,
  User,
  ChevronRight,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

const transactions = [
  {
    id: "TR-2024-001",
    property: "Skyline Luxury Apartment",
    agent: "Rahul Kapoor",
    buyer: "Amit Sharma",
    amount: "₹85,00,000",
    date: "2024-03-28",
    type: "Sale",
    status: "Completed",
    commission: "₹1,70,000",
  },
  {
    id: "TR-2024-002",
    property: "Green Valley Villa",
    agent: "Priya Singh",
    buyer: "Suresh Mehra",
    amount: "₹45,000/mo",
    date: "2024-03-25",
    type: "Rent",
    status: "Pending",
    commission: "₹45,000",
  },
  {
    id: "TR-2024-003",
    property: "Modern Studio Loft",
    agent: "Amit Verma",
    buyer: "Anita Das",
    amount: "₹35,00,000",
    date: "2024-03-20",
    type: "Sale",
    status: "Completed",
    commission: "₹70,000",
  },
  {
    id: "TR-2024-004",
    property: "The Grand Enclave #102",
    agent: "Rahul Kapoor",
    buyer: "Rajesh Kumar",
    amount: "₹85,00,000",
    date: "2024-03-15",
    type: "Sale",
    status: "Cancelled",
    commission: "₹0",
  },
];

export default function TransactionsRecord() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.buyer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-emerald-500 bg-emerald-500/10";
      case "Pending":
        return "text-blue-500 bg-blue-500/10";
      case "Cancelled":
        return "text-rose-500 bg-rose-500/10";
      default:
        return "text-zinc-500 bg-zinc-500/10";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 size={12} />;
      case "Pending":
        return <Clock size={12} />;
      case "Cancelled":
        return <XCircle size={12} />;
      default:
        return <History size={12} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Transactions Record
          </h1>
          <p className="text-zinc-400 text-sm font-medium">
            View and manage all financial transactions across the platform.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all border border-zinc-700/50 text-xs">
          <Download size={16} /> Export Records
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors"
            size={14}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-3 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600 text-xs font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-orange-500/50 transition-all font-bold"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-[1.5rem] overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/80">
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                  ID
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                  Property
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                  Agent
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                  Buyer
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                  Amount
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-zinc-800/30 transition-colors group"
                >
                  <td className="px-6 py-4 text-xs text-zinc-400 font-mono border-b border-zinc-800/50">
                    {t.id}
                  </td>
                  <td className="px-6 py-4 border-b border-zinc-800/50">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                        <Building2 size={14} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-xs">
                          {t.property}
                        </p>
                        <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest">
                          {t.type}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-zinc-800/50">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                        {t.agent
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-zinc-300 font-medium text-xs">
                        {t.agent}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-zinc-800/50">
                    <div className="flex items-center gap-2">
                      <User size={12} className="text-zinc-500" />
                      <span className="text-zinc-300 font-medium text-xs">
                        {t.buyer}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-zinc-800/50">
                    <p className="text-white font-bold text-xs">{t.amount}</p>
                    <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest">
                      Comm: {t.commission}
                    </p>
                  </td>
                  <td className="px-6 py-4 border-b border-zinc-800/50">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${getStatusColor(t.status)}`}
                    >
                      {getStatusIcon(t.status)}
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-zinc-800/50 text-right">
                    <button className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-all">
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <History className="mx-auto text-zinc-800 mb-2" size={32} />
              <p className="text-zinc-500 font-medium text-sm">
                No transactions found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
