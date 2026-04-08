import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
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
    title: "Guwahati Rentals built after 2023",
    query:
      "SELECT p.ID, p.House_No, p.city, p.Area, lt.list_type, p.year_built FROM Property p JOIN Listing_Token lt ON p.ID = lt.PID where p.city = 'Delhi' and p.year_built > 2016 and lt.List_Type = 'SELL';",
  },
  {
    id: 2,
    title: "Price Range 20L-60L",
    query:
      "SELECT p.HouseNo, p.Locality, p.Area, p.City, lt.status FROM Property p JOIN Listing_Token lt ON p.PID = lt.PID WHERE lt.Price BETWEEN 2000000 AND 6000000;",
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
  {
    id: 5,
    title: "Top Agent 2023",
    query:
      "SELECT Name FROM Agent JOIN Transaction ON Agent.AID = Transaction.AID WHERE YEAR(Date) = 2023 GROUP BY AID ORDER BY SUM(Amount) DESC LIMIT 1;",
  },
  {
    id: 6,
    title: "Top Agent 2023",
    query:
      "SELECT Name FROM Agent JOIN Transaction ON Agent.AID = Transaction.AID WHERE YEAR(Date) = 2023 GROUP BY AID ORDER BY SUM(Amount) DESC LIMIT 1;",
  },
];


export default function RawQueries() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]); // Store dynamic column names
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState(null);



  const handleExecute = async () => {
  if (!query.trim()) return;

  setIsExecuting(true);
  setError(null);
  setResults([]);
  setColumns([]);

  try {
    // 1. Change to API.post since backend is now @PostMapping
    // 2. Pass the payload directly as the second argument
    const response = await API.post("/admin/query", { 
      query: query 
    });

    // Based on your previous successful API calls, 
    // your backend structure is: { data: { success: true, columns: [...], data: [...] } }
    const serverPayload = response.data.data; 

    if (serverPayload) {
      // Set columns and rows dynamically from the server response
      setColumns(serverPayload.columns || []);
      setResults(serverPayload.data || []);
      
      // If the backend doesn't send a 'success' boolean but sends data, 
      // we assume success. Otherwise, check for serverPayload.success
      if (serverPayload.success === false) {
        setError(serverPayload.message || "Query failed to execute.");
      }
    }
  } catch (err) {
    console.error("SQL Execution Error:", err);
    
    // Using your global error logger structure
    const errorMessage =
      err.response?.data?.error?.message || "Failed to execute query.";
    setError(errorMessage);
  } finally {
    setIsExecuting(false);
  }
};



  // const handleExecute = async () => {
  //   if (!query.trim()) return;

  //   setIsExecuting(true);
  //   setError(null);
  //   setResults([]);
  //   setColumns([]);

  //   try {
  //     // Backend structured as { data: { columns: [], data: [] } }
  //     // Using API.get with 'params' or 'data' depending on your backend config
  //     const response = await API.get("/admin/query", {
  //       data: { query: query },
  //     });

  //     const serverPayload = response.data.data; // This is the inner "data" object

  //     if (serverPayload.success) {
  //       setColumns(serverPayload.columns || []);
  //       setResults(serverPayload.data || []);
  //     } else {
  //       setError(serverPayload.message || "Query failed to execute.");
  //     }
  //   } catch (err) {
  //     console.error("SQL Execution Error:", err);
  //     const errorMessage =
  //       err.response?.data?.error?.message || "Failed to execute query.";
  //     setError(errorMessage);
  //   } finally {
  //     setIsExecuting(false);
  //   }
  // };

  const handleDownloadCSV = () => {
    if (results.length === 0) return;
    const headers = columns.join(",");
    const rows = results
      .map((row) => columns.map((col) => `"${row[col] ?? ""}"`).join(","))
      .join("\n");

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
        <div className="lg:col-span-2 space-y-6">
        {/* Query Editor */}
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
                    {/* Results Table */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800/50">
              <div className="flex items-center gap-2 text-white">
                <TableIcon size={18} className="text-orange-500" />
                <h3 className="text-lg font-bold">Query Results</h3>
                <span className="ml-2 px-2 py-0.5 bg-zinc-800 rounded text-xs font-bold text-zinc-500">{results.length} Rows</span>
              </div>
              <button onClick={handleDownloadCSV} disabled={results.length === 0} className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl">
                <FileSpreadsheet size={16} /> Export CSV
              </button>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/80">
                    {columns.length > 0 ? (
                      columns.map((col) => (
                        <th key={col} className="px-8 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50 whitespace-nowrap">
                          {col}
                        </th>
                      ))
                    ) : (
                      <th className="px-8 py-12 text-center text-zinc-600 font-medium italic">Execute a query to see results here</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                      {columns.map((col, j) => (
                        <td key={j} className="px-8 py-4 text-sm text-zinc-300 font-medium border-b border-zinc-800/50 whitespace-nowrap">
                          {row[col] === null ? (
                            <span className="text-zinc-600 italic">null</span>
                          ) : typeof row[col] === "object" ? (
                            JSON.stringify(row[col])
                          ) : (
                            row[col].toString()
                          )}
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
