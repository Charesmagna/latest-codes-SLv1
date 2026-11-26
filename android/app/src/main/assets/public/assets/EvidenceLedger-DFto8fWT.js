import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { kt as require_react } from "./icons-B-I2x5TV.js";
import { b as motion, f as format, w as require_jsx_runtime, x as AnimatePresence } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-CoihKo_w.js";
//#region src/components/EvidenceLedger.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var EvidenceLedger = () => {
	const { auditLogs, clearAuditLogs, currentUser, currentOrg } = useAppStore();
	const [filterCategory, setFilterCategory] = (0, import_react.useState)("ALL");
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const filteredLogs = (0, import_react.useMemo)(() => {
		return auditLogs.filter((log) => {
			const matchCategory = filterCategory === "ALL" || log.category === filterCategory;
			const searchStr = searchTerm.toLowerCase();
			const matchSearch = log.message.toLowerCase().includes(searchStr) || log.details && log.details.toLowerCase().includes(searchStr) || log.category.toLowerCase().includes(searchStr) || log.severity.toLowerCase().includes(searchStr);
			return matchCategory && matchSearch;
		});
	}, [
		auditLogs,
		filterCategory,
		searchTerm
	]);
	const getSeverityColor = (severity) => {
		switch (severity) {
			case "SEVERE": return "text-red-400 bg-red-400/10 border-red-500/30";
			case "WARN": return "text-amber-400 bg-amber-400/10 border-amber-500/30";
			case "INFO": return "text-emerald-400 bg-emerald-400/10 border-emerald-500/30";
			default: return "text-slate-300 bg-slate-800 border-slate-700";
		}
	};
	const getCategoryIcon = (category) => {
		switch (category) {
			case "SYSTEM": return "fa-server";
			case "BLE": return "fa-bluetooth-b";
			case "GPS": return "fa-satellite-dish";
			case "DISPATCH": return "fa-truck-fast";
			case "SECURITY": return "fa-shield-halved";
			default: return "fa-microchip";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col h-full min-h-[600px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 border-b border-slate-800 bg-slate-900/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa-solid fa-scale-balanced text-amber-500" }), "EVIDENCE LEDGER"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-slate-400 font-mono mt-1",
					children: ["Immutable Audit Trail & Telemetry Logs", currentOrg && ` • ORG: ${currentOrg.id}`]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row gap-2 w-full md:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search signatures...",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value),
							className: "bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-4 py-2 text-sm text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none w-full md:w-64 font-mono"
						})]
					}), currentUser?.username === "SL-admin-0000" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if (confirm("WARNING: Purging the Evidence Ledger will permanently delete local telemetry history. This is restricted to Super Admins. Proceed?")) clearAuditLogs();
						},
						className: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-2 rounded-lg text-xs font-bold font-mono transition-colors flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa-solid fa-trash-can" }), "PURGE"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-3 border-b border-slate-800 bg-slate-900/30 flex gap-2 overflow-x-auto custom-scrollbar",
				children: [
					"ALL",
					"SYSTEM",
					"BLE",
					"GPS",
					"DISPATCH",
					"SECURITY"
				].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilterCategory(cat),
					className: `px-3 py-1.5 rounded-full text-xs font-bold font-mono whitespace-nowrap transition-colors border ${filterCategory === cat ? "bg-amber-500/20 text-amber-400 border-amber-500/50" : "bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800"}`,
					children: cat
				}, cat))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-950/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "popLayout",
					children: filteredLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						exit: { opacity: 0 },
						className: "flex flex-col items-center justify-center h-full text-slate-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa-solid fa-box-open text-4xl mb-3 opacity-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm",
							children: "No telemetry records found."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: filteredLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								scale: .95
							},
							className: "bg-slate-900 rounded-lg p-3 border border-slate-800 hover:border-slate-700 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `px-2 py-0.5 rounded border text-[10px] font-bold font-mono flex items-center gap-1.5 ${getSeverityColor(log.severity)}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: `fa-solid ${getCategoryIcon(log.category)}` }), log.category]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-slate-500 font-mono font-bold tracking-wider",
											children: log.id.split(".")[1]?.substring(0, 8).toUpperCase() || log.id.substring(0, 8)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800 flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa-regular fa-clock" }), format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss.SSS")]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-bold text-slate-200 mb-1",
									children: log.message
								}),
								log.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-slate-400 font-mono bg-slate-950 p-2 rounded border border-slate-800 mt-2 break-words",
									children: log.details
								})
							]
						}, log.id))
					})
				})
			})
		]
	});
};
//#endregion
export { EvidenceLedger as t };
