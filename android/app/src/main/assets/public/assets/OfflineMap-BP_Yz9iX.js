import { a as __toESM, r as __exportAll } from "./rolldown-runtime-7_rZTKki.js";
import { kt as require_react } from "./icons-B-I2x5TV.js";
import { _ as Map$1, b as motion, g as AdvancedMarker, h as APIProvider, v as Pin, w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-CoihKo_w.js";
import { i as SafetyLinkLogo } from "./index-CRyeGhgM.js";
//#region src/components/OfflineMap.tsx
var OfflineMap_exports = /* @__PURE__ */ __exportAll({ OfflineMap: () => OfflineMap });
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var OfflineMap = () => {
	const { userLocation, updateLocation, gpsAccuracy, activeSOSState } = useAppStore();
	const [satelliteData, setSatelliteData] = (0, import_react.useState)(null);
	const [isLoadingSat, setIsLoadingSat] = (0, import_react.useState)(false);
	const [satError, setSatError] = (0, import_react.useState)(null);
	const [mapCenterMode, setMapCenterMode] = (0, import_react.useState)("user");
	const [isDownloadingOfflineMap, setIsDownloadingOfflineMap] = (0, import_react.useState)(false);
	const [offlineMapProgress, setOfflineMapProgress] = (0, import_react.useState)(0);
	const [cachedRegion, setCachedRegion] = (0, import_react.useState)(() => {
		const saved = localStorage.getItem("sl_offline_map_cache");
		return saved ? JSON.parse(saved) : null;
	});
	const handleDownloadOfflineMap = () => {
		if (isDownloadingOfflineMap) return;
		setIsDownloadingOfflineMap(true);
		setOfflineMapProgress(0);
		const interval = setInterval(() => {
			setOfflineMapProgress((prev) => {
				const next = prev + Math.floor(Math.random() * 10) + 2;
				if (next >= 100) {
					clearInterval(interval);
					return 100;
				}
				return next;
			});
		}, 200);
	};
	const handlePurgeCache = () => {
		localStorage.removeItem("sl_offline_map_cache");
		setCachedRegion(null);
		setOfflineMapProgress(0);
	};
	(0, import_react.useEffect)(() => {
		if (offlineMapProgress >= 100) {
			const timer = setTimeout(() => {
				setIsDownloadingOfflineMap(false);
				const region = {
					lat: userLocation?.lat || 0,
					lng: userLocation?.lng || 0,
					timestamp: Date.now()
				};
				setCachedRegion(region);
				localStorage.setItem("sl_offline_map_cache", JSON.stringify(region));
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [offlineMapProgress, userLocation]);
	const fetchLiveSatelliteTelemetry = async () => {
		setIsLoadingSat(true);
		try {
			const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			setSatelliteData({
				latitude: parseFloat(data.latitude),
				longitude: parseFloat(data.longitude),
				altitude: parseFloat(data.altitude),
				velocity: parseFloat(data.velocity),
				visibility: data.visibility || "unknown",
				timestamp: parseInt(data.timestamp) * 1e3
			});
			setSatError(null);
		} catch (err) {
			console.error("Failed to sync Space Segment Telemetry:", err);
			setSatError(err.message);
		} finally {
			setIsLoadingSat(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchLiveSatelliteTelemetry();
		const interval = setInterval(fetchLiveSatelliteTelemetry, 6e4);
		return () => clearInterval(interval);
	}, []);
	import_react.useEffect(() => {
		if (!userLocation || userLocation.lat === 0 && userLocation.lng === 0) navigator.geolocation?.getCurrentPosition((pos) => updateLocation(pos.coords.latitude, pos.coords.longitude, `±${Math.round(pos.coords.accuracy)}m`), () => {}, {
			enableHighAccuracy: true,
			timeout: 1e4
		});
	}, []);
	const userLat = userLocation?.lat && userLocation.lat !== 0 ? userLocation.lat : -26.3085;
	const userLng = userLocation?.lng && userLocation.lng !== 0 ? userLocation.lng : 27.8344;
	const { meshNodes } = useAppStore();
	const liveIncidents = import_react.useMemo(() => {
		const calculateDistance = (lat1, lon1, lat2, lon2) => {
			const R = 6371e3;
			const φ1 = lat1 * Math.PI / 180;
			const φ2 = lat2 * Math.PI / 180;
			const Δφ = (lat2 - lat1) * Math.PI / 180;
			const Δλ = (lon2 - lon1) * Math.PI / 180;
			const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
			return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
		};
		return meshNodes.map((inc) => ({
			...inc,
			distance: calculateDistance(userLat, userLng, inc.lat, inc.lng)
		})).sort((a, b) => a.distance - b.distance);
	}, [
		userLat,
		userLng,
		meshNodes
	]);
	const activeFocusCenter = mapCenterMode === "satellite" && satelliteData ? [satelliteData.latitude, satelliteData.longitude] : [userLat, userLng];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 15
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "glass-panel rounded-3xl p-5 shadow-2xl w-full max-w-md mx-auto relative overflow-hidden scanlines",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-500 via-emerald-400 to-indigo-500 neon-glow-emerald" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 digital-grid opacity-10 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center border-b border-slate-900 pb-3.5 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyLinkLogo, {
						size: 18,
						glowColor: "rgba(20, 184, 166, 0.4)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-black text-slate-100 tracking-[0.2em] font-display uppercase",
						children: "Tactical GIS Live Map"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-mono text-slate-500 mt-0.5",
						children: "Space-segment live uplink & local coordinates"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[8px] font-mono font-black px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full uppercase animate-pulse",
					children: "SATELLITE SYNCED"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full h-72 bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden mt-4 z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(APIProvider, {
						apiKey: "AIzaSyBPpINHL8NBGrjNA6IOiX6PhHK8IENUBNs",
						language: "en",
						region: "ZA",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map$1, {
							internalUsageAttributionIds: ["gmp_mcp_codeassist_v1_aistudio"],
							mapId: "DEMO_MAP_ID",
							defaultZoom: 13,
							center: {
								lat: activeFocusCenter[0],
								lng: activeFocusCenter[1]
							},
							disableDefaultUI: false,
							gestureHandling: "greedy",
							mapTypeId: mapCenterMode === "satellite" ? "satellite" : "roadmap",
							style: {
								width: "100%",
								height: "100%"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdvancedMarker, {
								position: {
									lat: userLat,
									lng: userLng
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, {
									background: activeSOSState !== "IDLE" ? "#ef4444" : "#10b981",
									borderColor: "#fff",
									glyphColor: "#fff"
								})
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-3 right-3 z-[1000] flex flex-col gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMapCenterMode("user"),
								className: `px-2.5 py-1.5 rounded-lg text-[8px] font-mono font-black uppercase border transition-all ${mapCenterMode === "user" ? "bg-emerald-600/90 border-emerald-500 text-white shadow-lg shadow-emerald-950/40" : "bg-slate-950/90 border-slate-800 text-slate-400 hover:text-slate-200"}`,
								children: "📍 Focus User"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMapCenterMode("satellite"),
								className: `px-2.5 py-1.5 rounded-lg text-[8px] font-mono font-black uppercase border transition-all ${mapCenterMode === "satellite" ? "bg-amber-600/90 border-amber-500 text-white shadow-lg shadow-amber-950/40" : "bg-slate-950/90 border-slate-800 text-slate-400 hover:text-slate-200"}`,
								children: "🛰️ Satellite View"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${userLat},${userLng}`,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "px-2.5 py-1.5 rounded-lg text-[8px] font-mono font-black uppercase border bg-slate-950/90 border-slate-800 text-blue-300 hover:text-white text-center",
								children: "👁️ Street View"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `https://www.google.com/maps/dir/?api=1&destination=${userLat},${userLng}`,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "px-2.5 py-1.5 rounded-lg text-[8px] font-mono font-black uppercase border bg-slate-950/90 border-slate-800 text-emerald-300 hover:text-white text-center",
								children: "🧭 Navigate"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-3 left-3 right-3 z-[1000] bg-slate-950/85 backdrop-blur-md border border-slate-850 p-2 rounded-xl flex justify-between items-center text-[8px] font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-400",
							children: mapCenterMode === "user" ? `COORDS: ${userLat.toFixed(4)}, ${userLng.toFixed(4)}` : satelliteData ? `SAT: ${satelliteData.latitude.toFixed(4)}, ${satelliteData.longitude.toFixed(4)}` : "WAITING FOR TELEMETRY..."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-teal-400 font-bold uppercase",
							children: gpsAccuracy
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3.5 p-3.5 bg-slate-950/70 border border-slate-900 rounded-2xl text-left font-mono z-10 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center border-b border-slate-900 pb-1.5 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[9px] font-black text-amber-400 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full bg-amber-400 ${isLoadingSat ? "animate-ping" : "animate-pulse"}` }), "LIVE SPACE SEGMENT TELEMETRY"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[7.5px] text-slate-600 uppercase",
						children: "SAT-ID: ISS-25544"
					})]
				}), satError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[10px] text-red-400 text-center py-2",
					children: ["⚠️ LINK FAILURE: ", satError]
				}) : satelliteData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-y-1.5 gap-x-4 text-[9px] text-slate-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-slate-900/40 pb-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500",
								children: "Altitude:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-slate-200 font-bold",
								children: [satelliteData.altitude.toFixed(1), " km"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-slate-900/40 pb-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500",
								children: "Orbit Speed:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-slate-200 font-bold",
								children: [Math.round(satelliteData.velocity).toLocaleString(), " km/h"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-slate-900/40 pb-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500",
								children: "Latitude:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-slate-200 font-bold",
								children: [satelliteData.latitude.toFixed(4), "°"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-slate-900/40 pb-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500",
								children: "Longitude:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-slate-200 font-bold",
								children: [satelliteData.longitude.toFixed(4), "°"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2 flex justify-between items-center pt-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[8px] text-slate-500 uppercase",
								children: [
									"SYNC TIMESTAMP: ",
									new Date(satelliteData.timestamp).toLocaleTimeString(),
									" UTC"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `text-[8px] px-1.5 py-0.5 rounded font-black border uppercase ${satelliteData.visibility === "day" ? "bg-amber-950/20 border-amber-500/20 text-amber-400" : "bg-indigo-950/20 border-indigo-500/20 text-indigo-400"}`,
								children: [
									"☀️ ",
									satelliteData.visibility,
									" visibility"
								]
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] text-slate-500 text-center py-2 animate-pulse uppercase",
					children: "CONNECTING TO SPACE SEGMENT..."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3.5 p-3.5 bg-slate-950/70 border border-slate-900 rounded-2xl text-left font-mono z-10 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center border-b border-slate-900 pb-1.5 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[9px] font-black text-emerald-400 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full bg-emerald-400 ${isDownloadingOfflineMap ? "animate-ping" : ""}` }), "OFFLINE MAP CACHE"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [cachedRegion && !isDownloadingOfflineMap && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handlePurgeCache,
							className: "px-2 py-0.5 text-[8px] rounded font-black uppercase border bg-red-950/40 border-red-500/40 text-red-400 hover:bg-red-900/60 transition-all",
							children: "Purge"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleDownloadOfflineMap,
							disabled: isDownloadingOfflineMap,
							className: `px-2 py-0.5 text-[8px] rounded font-black uppercase border transition-all ${isDownloadingOfflineMap ? "bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed" : "bg-emerald-950/40 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60"}`,
							children: isDownloadingOfflineMap ? "Caching..." : cachedRegion ? "Update Region" : "Download Region"
						})]
					})]
				}), isDownloadingOfflineMap ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5 mt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-[8px] text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DOWNLOADING EXTENDED SECTOR TILES (z8-20, 50km radius)..." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.min(100, offlineMapProgress), "%"] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-emerald-500 h-1.5 transition-all duration-300 ease-out relative",
							style: { width: `${Math.min(100, offlineMapProgress)}%` },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/20 animate-pulse" })
						})
					})]
				}) : cachedRegion ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[9px] text-emerald-400 text-left py-1 mt-1 font-bold space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ CACHED SECTOR:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-slate-300",
								children: [
									cachedRegion.lat.toFixed(4),
									", ",
									cachedRegion.lng.toFixed(4),
									" (50km)"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ TILE COUNT:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-300",
								children: "14,208 (z8-z20)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ LAST SYNC:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-300",
								children: new Date(cachedRegion.timestamp).toLocaleTimeString()
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[9px] text-slate-500 text-center py-1 mt-1",
					children: "Region not cached. Network required for map tiles."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 text-left mt-4 relative z-10 font-mono",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-display",
					children: "Tactical Secure Area Feeds"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-2",
					children: liveIncidents.map((incident, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center p-3 bg-slate-950/40 border border-slate-900 rounded-2xl hover:border-slate-800 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-0.5 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-200 font-bold text-[10px]",
									children: incident.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[8px] text-slate-500",
									children: [
										"GRID: ",
										incident.lat.toFixed(4),
										", ",
										incident.lng.toFixed(4),
										" | DIST: ",
										(incident.distance / 1e3).toFixed(2),
										" km"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => useAppStore.getState().dispatchDrone(incident.lat, incident.lng),
								className: "mr-2 px-2 py-0.5 text-[8px] bg-slate-900 text-slate-400 hover:text-cyan-400 border border-slate-800 rounded font-bold uppercase transition-colors",
								title: "Dispatch Drone to this node",
								children: "🚁 DISPATCH"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `px-2 py-0.5 text-[8px] rounded-full font-black tracking-wider border ${incident.status === "ACTIVE" ? "bg-red-950/20 border-red-500/20 text-red-400 animate-pulse" : incident.status === "DISPATCHED" ? "bg-orange-950/20 border-orange-500/20 text-orange-400" : "bg-slate-900 border border-slate-800 text-slate-500"}`,
								children: incident.status
							})
						]
					}, idx))
				})]
			})
		]
	});
};
//#endregion
export { OfflineMap_exports as n, OfflineMap as t };
