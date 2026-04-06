import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Play,
  Trash2,
  History,
  Table as TableIcon,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";

const sampleQueries = [
  {
    id: 1,
    title: "Guwahati Rent 2023+",
    query:
      "SELECT * FROM Property WHERE City = 'Guwahati' AND YearBuilt > 2023 AND ListType = 'Rent';",
  },
  {
    id: 2,
    title: "Price Range 20L-60L",
    query:
      "SELECT Address FROM Property WHERE Price BETWEEN 2000000 AND 6000000;",
  },
  {
    id: 3,
    title: "G.S. Road 2BHK < 15k",
    query:
      "SELECT Address FROM Property WHERE Locality = 'G.S. Road' AND BHK >= 2 AND Price < 15000 AND ListType = 'Rent';",
  },
  {
    id: 4,
    title: "Top Agent 2023",
    query:
      "SELECT Name FROM Agent JOIN Transaction ON Agent.AID = Transaction.AID WHERE YEAR(Date) = 2023 GROUP BY AID ORDER BY SUM(Amount) DESC LIMIT 1;",
  },
];

const sampleResults = [
  {
    id: 101,
    address: "Skyline Apt #402",
    price: 8500000,
    type: "Sale",
    area: "G.S. Road",
    bhk: 3,
  },
  {
    id: 102,
    address: "Green Valley Villa",
    price: 45000,
    type: "Rent",
    area: "Zoo Road",
    bhk: 4,
  },
  {
    id: 103,
    address: "Modern Studio Loft",
    price: 3500000,
    type: "Sale",
    area: "Dispur",
    bhk: 1,
  },
];

export default function RawQueries() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState(null);

  const handleExecute = () => {
    setIsExecuting(true);
    setError(null);
    // Simulate API call
    setTimeout(() => {
      if (query.trim().toLowerCase().includes("select")) {
        setResults(sampleResults);
      } else {
        setError("Invalid SQL query. Please check your syntax.");
        setResults([]);
      }
      setIsExecuting(false);
    }, 1000);
  };

  const handleDownloadCSV = () => {
    if (results.length === 0) return;
    const headers = Object.keys(results[0]).join(",");
    const rows = results.map((row) => Object.values(row).join(",")).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "query_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Raw SQL Queries
        </h1>
        <p className="text-zinc-400 font-medium">
          Execute custom database queries and export results.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Query Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between px-8 py-4 border-b border-zinc-800/50 bg-zinc-900/80">
              <div className="flex items-center gap-2 text-orange-500">
                <Database size={18} />
                <span className="text-sm font-bold uppercase tracking-widest">
                  SQL Editor
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuery("")}
                  className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={handleExecute}
                  disabled={isExecuting || !query.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
                >
                  {isExecuting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Play size={16} fill="currentColor" />
                  )}
                  Execute
                </button>
              </div>
            </div>
            <div className="p-0">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="-- Write your SQL query here...&#10;SELECT * FROM Property WHERE City = 'Guwahati';"
                className="w-full h-[300px] bg-zinc-950/50 p-8 text-zinc-300 font-mono text-sm focus:outline-none resize-none placeholder:text-zinc-700"
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-500 text-sm font-medium"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Table */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800/50">
              <div className="flex items-center gap-2 text-white">
                <TableIcon size={18} className="text-orange-500" />
                <h3 className="text-lg font-bold">Query Results</h3>
                <span className="ml-2 px-2 py-0.5 bg-zinc-800 rounded text-xs font-bold text-zinc-500">
                  {results.length} Rows
                </span>
              </div>
              <button
                onClick={handleDownloadCSV}
                disabled={results.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all"
              >
                <FileSpreadsheet size={16} />
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/80">
                    {results.length > 0 ? (
                      Object.keys(results[0]).map((key) => (
                        <th
                          key={key}
                          className="px-8 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50"
                        >
                          {key}
                        </th>
                      ))
                    ) : (
                      <th className="px-8 py-12 text-center text-zinc-600 font-medium italic">
                        Execute a query to see results here
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-zinc-800/30 transition-colors"
                    >
                      {Object.values(row).map((val, j) => (
                        <td
                          key={j}
                          className="px-8 py-4 text-sm text-zinc-300 font-medium border-b border-zinc-800/50"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Saved/Sample Queries */}
        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-white mb-6">
              <History size={18} className="text-orange-500" />
              <h3 className="text-lg font-bold">Sample Queries</h3>
            </div>
            <div className="space-y-4">
              {sampleQueries.map((sq) => (
                <div
                  key={sq.id}
                  onClick={() => setQuery(sq.query)}
                  className="p-4 bg-zinc-800/30 border border-zinc-800/50 rounded-2xl hover:border-orange-500/30 cursor-pointer transition-all group"
                >
                  <h4 className="text-white font-bold text-sm mb-2 group-hover:text-orange-500 transition-colors">
                    {sq.title}
                  </h4>
                  <p className="text-zinc-500 text-xs font-mono line-clamp-2">
                    {sq.query}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-500/5 border border-orange-500/10 p-8 rounded-[2rem] backdrop-blur-sm">
            <h4 className="text-orange-500 font-bold mb-4 flex items-center gap-2">
              <AlertCircle size={18} /> Query Tips
            </h4>
            <ul className="space-y-3 text-xs text-zinc-400 font-medium">
              <li className="flex gap-2">
                <span className="text-orange-500">•</span>
                Use JOIN to combine Agent and Transaction tables.
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500">•</span>
                Filter by ListType ('Rent' or 'Sale') for specific listings.
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500">•</span>
                Always include a LIMIT for large datasets.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
