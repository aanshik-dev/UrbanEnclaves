import { useState, useEffect } from "react";
import API from "../../api/axios";
import {
  History,
  Search,
  Building2,
  User,
  ChevronRight,
  Download,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function TransactionsRecord() {
  const [transactionData, setTransactionData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await API.get("/api/transactions/me/transactions");
        const sortedData = (response.data.data || []).sort(
          (a, b) => a.transactionId - b.transactionId,
        );
        console.log("Sorted Data:", sortedData);
        setTransactionData(sortedData);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactionData.filter((t) => {
    const matchesSearch =
      t.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.agentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.buyerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.sellerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.transactionId?.toString().includes(searchQuery);

    const matchesStatus = filterStatus === "All" || t.mode === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Move export function INSIDE the component
  const exportToCSV = () => {
    if (filteredTransactions.length === 0) {
      alert("No transactions to export");
      return;
    }

    setExporting(true);

    try {
      // Define CSV headers
      const headers = [
        "Transaction ID",
        "City",
        "Listing Type",
        "Property Type",
        "Agent Name",
        "Buyer Name",
        "Seller Name",
        "Amount (₹)",
        "Listing Price (₹)",
        "Payment Mode",
        "Transaction Date",
      ];

      // Map data to rows
      const rows = filteredTransactions.map((t) => [
        `TR-${t.transactionId}`,
        t.city || "",
        t.listingType || "",
        t.type || "",
        t.agentName || "",
        t.buyerName || "",
        t.sellerName || "",
        t.amount?.toLocaleString() || "0",
        t.listingPrice?.toLocaleString() || "0",
        t.mode || "",
        t.transactionDate ? new Date(t.transactionDate).toLocaleDateString() : "",
      ]);

      // Combine headers and rows
      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ].join("\n");

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `transactions_export_${new Date().toISOString().split("T")[0]}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export transactions");
    } finally {
      setExporting(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "ONLINE" || status === "BANK_TRANSFER")
      return "text-emerald-500 bg-emerald-500/10";
    return "text-blue-500 bg-blue-500/10";
  };

  const getStatusIcon = (status) => {
    if (status === "ONLINE" || status === "BANK_TRANSFER")
      return <CheckCircle2 size={12} />;
    return <Clock size={12} />;
  };

  if (loading)
    return (
      <div className="p-10 text-zinc-500 animate-pulse">
        Loading Transaction Records...
      </div>
    );

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
        <button
          onClick={exportToCSV}
          disabled={exporting}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all border border-zinc-700/50 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {exporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download size={16} /> Export Records
            </>
          )}
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
            placeholder="Search by agent, buyer, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-9 pr-3 text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-600 text-xs font-medium"
          />
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
                  Property/City
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                  Agent
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                  Parties
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                  Amount
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                  Mode
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr
                  key={t.transactionId}
                  className="hover:bg-zinc-800/30 transition-colors group"
                >
                  <td className="px-6 py-4 text-xs text-zinc-400 font-mono border-b border-zinc-800/50">
                    TR-{t.transactionId}
                  </td>
                  <td className="px-6 py-4 border-b border-zinc-800/50">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-orange-500/10 rounded-lg text-orange-500">
                        <Building2 size={14} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-xs">{t.city}</p>
                        <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest">
                          {t.listingType} • {t.type}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-zinc-800/50">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                        {t.agentName?.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-zinc-300 font-medium text-xs">
                        {t.agentName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-zinc-800/50">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <User size={10} className="text-emerald-500" />
                        <span className="text-zinc-300 text-[10px]">
                          B: {t.buyerName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={10} className="text-zinc-500" />
                        <span className="text-zinc-400 text-[10px]">
                          S: {t.sellerName}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-zinc-800/50">
                    <p className="text-white font-bold text-xs">
                      ₹{t.amount.toLocaleString()}
                    </p>
                    <p className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest">
                      List: ₹{t.listingPrice.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 border-b border-zinc-800/50">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${getStatusColor(t.mode)}`}
                    >
                      {getStatusIcon(t.mode)}
                      {t.mode.replace("_", " ")}
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
                No transactions found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}