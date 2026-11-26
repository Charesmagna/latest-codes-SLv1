import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { kt as require_react } from "./icons-B-I2x5TV.js";
import { w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-DQZ7ziRL.js";
//#region src/components/ClientDatabaseModule.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var ClientDatabaseModule = () => {
	const { clientDatabaseRecords, refreshClientDatabase, exportToGoogleDrive, isAutoRefreshUsersEnabled, setAutoRefreshUsersEnabled, autoRefreshIntervalSeconds, setAutoRefreshIntervalSeconds, lastClientDatabaseSync, googleDriveSyncFileId, addToast } = useAppStore();
	const [search, setSearch] = (0, import_react.useState)("");
	const [filterTier, setFilterTier] = (0, import_react.useState)("ALL");
	const [isSyncingDrive, setIsSyncingDrive] = (0, import_react.useState)(false);
	const [isRefreshing, setIsRefreshing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (clientDatabaseRecords.length === 0) refreshClientDatabase();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isAutoRefreshUsersEnabled) return;
		const interval = setInterval(() => {
			refreshClientDatabase();
		}, autoRefreshIntervalSeconds * 1e3);
		return () => clearInterval(interval);
	}, [
		isAutoRefreshUsersEnabled,
		autoRefreshIntervalSeconds,
		refreshClientDatabase
	]);
	const handleManualRefresh = async () => {
		setIsRefreshing(true);
		await refreshClientDatabase();
		setIsRefreshing(false);
		addToast("Client database refreshed with latest telemetry.", "info");
	};
	const handleDriveExport = async () => {
		setIsSyncingDrive(true);
		try {
			const res = await exportToGoogleDrive();
			if (res.success) addToast(`Google Drive document updated: ${res.fileId?.slice(-8)}`, "success");
			else addToast(res.error || "Drive sync failed", "error");
		} finally {
			setIsSyncingDrive(false);
		}
	};
	const handleDownloadCsv = () => {
		const headers = "ID,Full Name,Username,Phone,Email,Org,Role,Subscription,Last Seen,Lat,Lng,Beacon ID,Battery\n";
		const rows = clientDatabaseRecords.map((r) => `"${r.id}","${r.fullName}","${r.username}","${r.phone}","${r.email}","${r.orgName}","${r.role}","${r.subscriptionTier}","${new Date(r.lastSeen).toISOString()}","${r.location?.lat || 0}","${r.location?.lng || 0}","${r.hardwareBeaconId || "NONE"}","${r.batteryLevel || 100}%"`).join("\n");
		const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `SafetyLink_Users_Master_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		addToast("Master CSV roster downloaded.", "success");
	};
	const filteredRecords = clientDatabaseRecords.filter((r) => {
		const matchesSearch = r.fullName.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search) || r.email.toLowerCase().includes(search.toLowerCase()) || r.orgName.toLowerCase().includes(search.toLowerCase());
		const matchesTier = filterTier === "ALL" || r.subscriptionTier === filterTier;
		return matchesSearch && matchesTier;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 font-mono text-left max-w-md mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center border-b border-slate-900 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-black text-slate-100 uppercase tracking-widest font-display",
					children: "👥 Client Database Server & Drive Sync"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[9px] text-slate-500 mt-0.5",
					children: "Auto-refreshing master roster with real-time Google Drive document export"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1.5 items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleManualRefresh,
						disabled: isRefreshing,
						className: "p-1.5 bg-slate-900 hover:bg-slate-850 text-cyan-400 border border-slate-800 rounded-xl text-[9px] font-bold",
						title: "Refresh from server",
						children: isRefreshing ? "⏳" : "🔄"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-3 bg-slate-950/70 border border-slate-900 rounded-2xl flex items-center justify-between gap-2 text-[8.5px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-2 h-2 rounded-full ${isAutoRefreshUsersEnabled ? "bg-emerald-500 animate-pulse" : "bg-slate-600"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-slate-300 font-bold uppercase",
						children: "Auto-Refresh Updates"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: autoRefreshIntervalSeconds,
						onChange: (e) => setAutoRefreshIntervalSeconds(parseInt(e.target.value) || 15),
						className: "bg-slate-900 border border-slate-800 rounded-lg px-2 py-0.5 text-slate-200 text-[8px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 5,
								children: "Every 5s"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 15,
								children: "Every 15s"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 30,
								children: "Every 30s"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 60,
								children: "Every 60s"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: isAutoRefreshUsersEnabled,
						onChange: (e) => setAutoRefreshUsersEnabled(e.target.checked),
						className: "accent-emerald-500 w-4 h-4 cursor-pointer"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-3.5 bg-slate-950/90 border border-blue-500/20 rounded-2xl space-y-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center text-[8.5px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-blue-400 uppercase flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📁" }), " Google Drive Linked Master Doc"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[7.5px] text-slate-500 block",
						children: googleDriveSyncFileId ? `Doc ID: ${googleDriveSyncFileId}` : "Not yet exported"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleDriveExport,
							disabled: isSyncingDrive,
							className: "px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase text-[8px] transition-all shadow-md flex items-center gap-1",
							children: isSyncingDrive ? "Syncing..." : "Export to Drive"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleDownloadCsv,
							className: "px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 rounded-xl font-bold uppercase text-[8px] border border-slate-800",
							children: "CSV"
						})]
					})]
				}), lastClientDatabaseSync && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[7.5px] text-slate-500 flex justify-between pt-1 border-t border-slate-900",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["TOTAL USERS SYNCED: ", clientDatabaseRecords.length] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["LAST POLLING: ", new Date(lastClientDatabaseSync).toLocaleTimeString()] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search by name, phone, email, or org...",
						className: "flex-1 bg-slate-950 border border-slate-900 rounded-xl px-3 py-1.5 text-[9px] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: filterTier,
						onChange: (e) => setFilterTier(e.target.value),
						className: "bg-slate-950 border border-slate-900 rounded-xl px-2 py-1 text-[8.5px] text-slate-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ALL",
								children: "All Tiers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "active",
								children: "Active"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "trial",
								children: "Trial"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "locked",
								children: "Locked"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2 max-h-80 overflow-y-auto pr-1",
				children: filteredRecords.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-6 text-[9px] text-slate-600",
					children: "No client records matching filter."
				}) : filteredRecords.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 bg-slate-950/80 border border-slate-900 hover:border-slate-850 rounded-2xl text-[8.5px] space-y-1.5 transition-all shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-slate-200 text-[9.5px]",
							children: user.fullName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[7.5px] text-slate-500",
							children: [
								user.email,
								" • ",
								user.phone
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `px-2 py-0.5 rounded-full text-[7px] font-black uppercase ${user.subscriptionTier === "active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : user.subscriptionTier === "trial" ? "bg-amber-500/10 text-amber-400 border border-amber-500/30" : "bg-red-500/10 text-red-400 border border-red-500/30"}`,
							children: user.subscriptionTier
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-1 text-[7.5px] text-slate-400 bg-slate-900/60 p-1.5 rounded-xl border border-slate-850",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 uppercase block",
								children: "ORG / ROLE:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-slate-300 font-bold",
								children: [
									user.orgName,
									" (",
									user.role,
									")"
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 uppercase block",
								children: "HARDWARE BEACON:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-cyan-400 font-bold",
								children: user.hardwareBeaconId || "None"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 uppercase block",
								children: "BATTERY:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-emerald-400 font-bold",
								children: [user.batteryLevel, "%"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 uppercase block",
								children: "LAST SEEN:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-400",
								children: new Date(user.lastSeen).toLocaleTimeString()
							})] })
						]
					})]
				}, user.id))
			})
		]
	});
};
//#endregion
export { ClientDatabaseModule };
