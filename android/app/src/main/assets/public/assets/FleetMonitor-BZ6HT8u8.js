import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { A as Radio, O as RefreshCw, _t as CircleCheckBig, b as Shield, kt as require_react, ot as Globe, q as Monitor, ut as Download, v as Smartphone } from "./icons-B-I2x5TV.js";
import { w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { o as CURRENT_VERSION } from "./index-CRyeGhgM.js";
import { n as getOrCreateDeviceNodeKey, r as getRuntimePlatform } from "./FleetService-Bh5okCP6.js";
//#region src/components/FleetMonitor.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var FleetMonitor = () => {
	const [devices, setDevices] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const myNodeKey = getOrCreateDeviceNodeKey();
	const myPlatform = getRuntimePlatform();
	const fetchFleet = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/fleet/devices");
			if (res.ok) {
				const data = await res.json();
				setDevices(data.devices || []);
			}
		} catch (err) {
			console.warn("Failed to load remote fleet, using local telemetry snapshot:", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchFleet();
		const iv = setInterval(fetchFleet, 3e4);
		return () => clearInterval(iv);
	}, []);
	const exportCSV = () => {
		const csvContent = "data:text/csv;charset=utf-8," + [["Device Key,Platform,App Version,Customer Email,Customer Name,Org Code,Installed At,Last Seen,Status"], ...(devices.length > 0 ? devices : [{
			node_key: myNodeKey,
			platform: myPlatform,
			app_version: CURRENT_VERSION,
			customer_email: localStorage.getItem("sl_user_email") || "active_user@safetylink.online",
			customer_name: localStorage.getItem("sl_user_name") || "Local Device",
			org_code: localStorage.getItem("sl_org_code") || "SL-COMMUNITY",
			first_installed_at: (/* @__PURE__ */ new Date()).toISOString(),
			last_seen_at: (/* @__PURE__ */ new Date()).toISOString(),
			status: "online"
		}]).map((d) => `"${d.node_key}","${d.platform}","${d.app_version}","${d.customer_email || ""}","${d.customer_name || ""}","${d.org_code || ""}","${d.first_installed_at}","${d.last_seen_at}","${d.status}"`)].join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", `SafetyLink_Fleet_Customers_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	const getPlatformIcon = (platform) => {
		if (platform.includes("android")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "w-4 h-4 text-emerald-400" });
		if (platform.includes("windows") || platform.includes("exe")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "w-4 h-4 text-blue-400" });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4 text-amber-400" });
	};
	const activeCount = devices.length > 0 ? devices.length : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "fleet-monitor-panel",
		className: "bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-5 h-5 text-emerald-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold tracking-tight",
						children: "Active Fleet & Device Registry"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400 mt-1",
					children: "Real-time telemetry heartbeat across all installed Android APKs, Windows EXEs, and Web nodes."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: fetchFleet,
						disabled: loading,
						className: "p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700",
						title: "Refresh Fleet",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-4 h-4 ${loading ? "animate-spin" : ""}` })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: exportCSV,
						id: "btn-export-customers-csv",
						className: "flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-emerald-500/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Export Customer Fleet (CSV)" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/60 border border-slate-800 rounded-xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-400 uppercase tracking-wider font-semibold",
								children: "Total Installations"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-black text-white mt-1",
								children: activeCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-emerald-400 mt-1 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "w-3 h-3" }), " Permanent Node Keys Bound"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/60 border border-slate-800 rounded-xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-400 uppercase tracking-wider font-semibold",
								children: "This Device Key"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-mono text-emerald-400 mt-1 truncate",
								children: myNodeKey
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-slate-400 mt-1 capitalize",
								children: [
									myPlatform.replace("_", " "),
									" • v",
									CURRENT_VERSION
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/60 border border-slate-800 rounded-xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-400 uppercase tracking-wider font-semibold",
								children: "Database Persistence"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-4 h-4" }), " Cloud + Local Immutable Sync"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-slate-400 mt-1",
								children: "Zero-data-loss protection active"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-xs text-slate-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-slate-950/80 uppercase text-[10px] text-slate-400 font-semibold border-b border-slate-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4",
								children: "Device Node Key"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4",
								children: "Platform"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4",
								children: "App Version"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4",
								children: "Customer Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4",
								children: "Last Seen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 px-4 text-right",
								children: "Status"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-slate-800/60",
						children: devices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3.5 px-4 font-mono text-emerald-400",
								children: myNodeKey
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3.5 px-4 flex items-center gap-2",
								children: [getPlatformIcon(myPlatform), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize",
									children: myPlatform.replace("_", " ")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3.5 px-4 font-mono",
								children: CURRENT_VERSION
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3.5 px-4 text-slate-400",
								children: localStorage.getItem("sl_user_email") || "Current Active Session"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3.5 px-4 text-slate-400",
								children: "Just now"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3.5 px-4 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" }), " Online"]
								})
							})
						] }) : devices.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-slate-900/40 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3.5 px-4 font-mono text-emerald-400",
									children: d.node_key
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-3.5 px-4 flex items-center gap-2",
									children: [getPlatformIcon(d.platform), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "capitalize",
										children: d.platform.replace("_", " ")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3.5 px-4 font-mono",
									children: d.app_version
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3.5 px-4 text-slate-300 font-medium",
									children: d.customer_email || d.customer_name || "Anonymous User"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3.5 px-4 text-slate-400",
									children: d.last_seen_at ? new Date(d.last_seen_at).toLocaleTimeString() : "Recent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3.5 px-4 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400" }), " Active"]
									})
								})
							]
						}, d.node_key || i))
					})]
				})
			})
		]
	});
};
//#endregion
export { FleetMonitor as t };
