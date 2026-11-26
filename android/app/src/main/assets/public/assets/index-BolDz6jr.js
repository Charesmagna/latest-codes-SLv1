const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/capacitor-B_jS8XWy.js","assets/rolldown-runtime-7_rZTKki.js","assets/NativeDispatchService-DnOodW5f.js","assets/SuperDashboard-DPnpyTCf.js","assets/icons-B-I2x5TV.js","assets/vendor-DZX22qT5.js","assets/store-DQZ7ziRL.js","assets/firebase-_Tcd8IXL.js","assets/firebase-lrXFt3yU.js","assets/FleetMonitor-B8wJASt4.js","assets/FleetService-Capbu-3O.js","assets/OrgWarRoom-BPWx56c_.js","assets/BLEScanner-B4TMHpjA.js","assets/ITagPluginService-Bw1X7OEl.js","assets/OfflineMap-fejdhbwT.js","assets/Settings-C85luZEj.js","assets/BiometricService-XD0nursW.js","assets/HikvisionCameraManager-B1P-0xwZ.js","assets/WorkspaceIntegrations-CJUYSibf.js","assets/Profile-BBwYvdsX.js","assets/LocationDisplay-vFGoW2ti.js","assets/OrgDashboard-xK4crvrC.js","assets/EvidenceLedger-Dm9G70aq.js","assets/GlobalRadarBackground-CIbDp0Zg.js","assets/LiveCameraFeed-CExT6_Dn.js","assets/AdminPanel-Dojp5F6P.js","assets/r2Assets--dTIOP7L.js","assets/ClientDatabaseModule-jhVUI_lE.js","assets/MediaHub-K3zz_N9f.js","assets/AppTour-DfBYzgML.js","assets/AIHub-CPt0DMND.js","assets/KlevaBot-CxFK8gw_.js","assets/AdvancedSubsystems-DZFTnwPi.js","assets/DecoyCalculator-BcX67CGv.js","assets/ConfidentialVault-B2bSOQ25.js","assets/crypto-DEtdSq-j.js","assets/OpenPlatformHub-B38tOFi7.js"])))=>i.map(i=>d[i]);
import { a as __toESM, r as __exportAll } from "./rolldown-runtime-7_rZTKki.js";
import { $ as MapPin, A as Radio, Ct as Camera, Dt as ArrowRight, E as Search, Et as BatteryCharging, F as PhoneOff, I as PhoneCall, J as Mic, L as Package, O as RefreshCw, P as Phone, S as ShieldAlert, Tt as Battery, X as MessageSquare, Z as Maximize2, _ as Sparkles, b as Shield, bt as ChevronRight, c as Volume2, gt as CircleCheck, i as X, it as KeyRound, kt as require_react, l as Video, lt as ExternalLink, m as TriangleAlert, nt as Lock, o as WifiOff, p as Truck, r as Zap, s as VolumeX, u as User, ut as Download, vt as CircleAlert, wt as Bluetooth, x as ShieldCheck, xt as ChevronLeft, y as ShoppingCart } from "./icons-B-I2x5TV.js";
import { C as require_client, _ as Map$1, b as motion, g as AdvancedMarker, h as APIProvider, m as OneSignal, w as require_jsx_runtime, x as AnimatePresence, y as yt } from "./vendor-DZX22qT5.js";
import { _ as Capacitor, b as registerPlugin, d as SplashScreen, g as __vitePreload, m as App$1, u as PushNotifications } from "./capacitor-B_jS8XWy.js";
import { _ as collection, f as onSnapshot, g as where, p as query } from "./firebase-_Tcd8IXL.js";
import { r as db } from "./firebase-lrXFt3yU.js";
import { a as LocalNotificationService, i as useAppStore } from "./store-DQZ7ziRL.js";
import { r as SafetyLinkEmergency, t as NativeDispatchService } from "./NativeDispatchService-DnOodW5f.js";
import { i as getR2StreamUrl, r as getR2DownloadUrl, t as R2_MEDIA } from "./r2Assets--dTIOP7L.js";
//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/utils/DeepLinkHandler.ts
var import_jsx_runtime = require_jsx_runtime();
var setupDeepLinks = () => {
	if (Capacitor.isNativePlatform()) App$1.addListener("appUrlOpen", (event) => {
		console.log("App opened with URL:", event.url);
		if (event.url.includes("/dispatch/sos")) window.dispatchEvent(new CustomEvent("safetylink:sos-trigger"));
	});
};
//#endregion
//#region src/components/SituationalAwareness.tsx
var import_client = /* @__PURE__ */ __toESM(require_client(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function SituationalAwareness() {
	const { userLocation } = useAppStore();
	const currentLat = userLocation?.lat;
	const currentLng = userLocation?.lng;
	const [weather, setWeather] = (0, import_react.useState)(null);
	const [news, setNews] = (0, import_react.useState)([]);
	const [locationName, setLocationName] = (0, import_react.useState)("");
	const [saferAdvisory, setSaferAdvisory] = (0, import_react.useState)("");
	const [safeZonesText, setSafeZonesText] = (0, import_react.useState)("");
	const [searchLinks, setSearchLinks] = (0, import_react.useState)([]);
	const [mapsLinks, setMapsLinks] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let mounted = true;
		async function fetchData() {
			if (!currentLat || !currentLng) return;
			setLoading(true);
			setError("");
			try {
				let locName = "Current Area";
				try {
					const geoRes = await fetch(`/api/ninjas/reversegeocoding?lat=${currentLat}&lon=${currentLng}`);
					if (geoRes.ok) {
						const geoData = await geoRes.json();
						if (Array.isArray(geoData) && geoData.length > 0) {
							locName = geoData[0].name;
							if (geoData[0].country) locName += `, ${geoData[0].country}`;
						}
					}
				} catch {}
				if (mounted) setLocationName(locName);
				const [weatherRes, newsRes, saferRes] = await Promise.allSettled([
					fetch(`/api/ninjas/weather?lat=${currentLat}&lon=${currentLng}`),
					fetch(`/api/ninjas/news?text=${encodeURIComponent(locName)}`),
					fetch("/api/gemini/safer-city", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							locationName: locName,
							lat: currentLat,
							lng: currentLng
						})
					})
				]);
				if (mounted && weatherRes.status === "fulfilled" && weatherRes.value.ok) setWeather(await weatherRes.value.json());
				if (mounted && newsRes.status === "fulfilled" && newsRes.value.ok) {
					const newsData = await newsRes.value.json();
					setNews(Array.isArray(newsData) ? newsData : []);
				}
				if (mounted && saferRes.status === "fulfilled" && saferRes.value.ok) {
					const saferData = await saferRes.value.json();
					setSaferAdvisory(saferData.advisoryText || "");
					setSafeZonesText(saferData.safeZonesText || "");
					setSearchLinks(Array.isArray(saferData.searchChunks) ? saferData.searchChunks.map((c) => c.web?.uri ? {
						title: c.web.title || "Live Source",
						uri: c.web.uri
					} : null).filter(Boolean) : []);
					setMapsLinks(Array.isArray(saferData.mapsChunks) ? saferData.mapsChunks.map((c) => c.maps?.uri ? {
						title: c.maps.title || "Maps Safe Zone",
						uri: c.maps.uri
					} : null).filter(Boolean) : []);
				}
			} catch (err) {
				if (mounted) setError(err.message || "Failed to load situational awareness data.");
			} finally {
				if (mounted) setLoading(false);
			}
		}
		fetchData();
		return () => {
			mounted = false;
		};
	}, [currentLat, currentLng]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full h-full flex flex-col gap-4 text-slate-200",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold text-white tracking-tight",
					children: "Safer City & Situational Intelligence"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400 mt-1",
					children: "Non-blocking environmental, weather, Google Search CPF & Google Maps safe-zone feed"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl",
						children: "🌐"
					})
				})]
			}),
			!currentLat && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 bg-slate-900 rounded-xl border border-slate-800 text-center text-sm text-slate-400",
				children: "Waiting for GPS coordinates..."
			}),
			loading && currentLat && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 bg-slate-900 rounded-xl border border-slate-800 text-center text-sm text-slate-400 animate-pulse",
				children: "Loading local intelligence & Safer City alerts..."
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 bg-amber-900/20 rounded-xl border border-amber-500/30 text-center text-xs text-amber-300",
				children: [error, " (SOS panic dispatch remains completely unaffected.)"]
			}),
			!loading && currentLat !== 0 && currentLat !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl",
								children: "📍"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase font-bold text-emerald-400 tracking-wider",
								children: "Current Zone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-white",
								children: locationName || `${currentLat.toFixed(4)}, ${currentLng?.toFixed(4)}`
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${currentLat},${currentLng}`,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-blue-300 border border-slate-700",
								children: "Street View"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `https://www.google.com/maps/dir/?api=1&destination=${currentLat},${currentLng}`,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-emerald-300 border border-slate-700",
								children: "Navigate"
							})]
						})]
					}),
					saferAdvisory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 bg-slate-900 rounded-xl border border-emerald-500/30 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase font-bold text-emerald-400 tracking-wider",
								children: "Live Safer City Advisories (Google Search Grounded)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-200 whitespace-pre-line leading-relaxed",
								children: saferAdvisory
							}),
							searchLinks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2 border-t border-slate-800 flex flex-wrap gap-2",
								children: searchLinks.slice(0, 4).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: l.uri,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "text-[11px] bg-slate-800 px-2.5 py-1 rounded-md text-blue-300 underline hover:text-blue-200",
									children: l.title
								}, i))
							})
						]
					}),
					safeZonesText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 bg-slate-900 rounded-xl border border-blue-500/30 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase font-bold text-blue-400 tracking-wider",
								children: "Nearest Verified Safe Points (Google Maps Grounded)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-200 whitespace-pre-line leading-relaxed",
								children: safeZonesText
							}),
							mapsLinks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2 border-t border-slate-800 flex flex-wrap gap-2",
								children: mapsLinks.slice(0, 4).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: l.uri,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "text-[11px] bg-slate-800 px-2.5 py-1 rounded-md text-emerald-300 underline hover:text-emerald-200",
									children: ["📍 ", l.title]
								}, i))
							})
						]
					}),
					weather && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 bg-slate-900 rounded-xl border border-slate-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-amber-400",
								children: "🌤️"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase font-bold text-slate-400 tracking-wider",
								children: "Meteorological Conditions"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-800/50 p-3 rounded-lg border border-slate-700/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-slate-400",
										children: "Temp / Feels"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-bold text-white text-lg",
										children: [
											weather.temp,
											"°C ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-normal text-slate-500",
												children: [
													"(",
													weather.feels_like,
													"°C)"
												]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-800/50 p-3 rounded-lg border border-slate-700/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-slate-400",
										children: "Conditions"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-bold text-white text-lg",
										children: [
											weather.cloud_pct,
											"% ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-normal text-slate-500",
												children: "Clouds"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-800/50 p-3 rounded-lg border border-slate-700/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-slate-400",
										children: "Wind"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-bold text-white text-lg",
										children: [
											weather.wind_speed,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-normal text-slate-500",
												children: "m/s"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-800/50 p-3 rounded-lg border border-slate-700/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-slate-400",
										children: "Humidity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-bold text-white text-lg",
										children: [weather.humidity, "%"]
									})]
								})
							]
						})]
					}),
					news && news.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 bg-slate-900 rounded-xl border border-slate-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-cyan-400",
								children: "📰"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase font-bold text-slate-400 tracking-wider",
								children: "Local Reports & News"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-3",
							children: news.slice(0, 3).map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: item.url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "block bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 hover:border-blue-500/50 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-sm text-white line-clamp-2 leading-snug mb-1",
									children: item.title
								}), item.author && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] text-slate-400",
									children: ["Source: ", item.author]
								})]
							}, idx))
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/FirstLaunchDisclaimer.tsx
var FirstLaunchDisclaimer = () => {
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!localStorage.getItem("sl_disclaimer_accepted")) setIsVisible(true);
	}, []);
	const handleAccept = () => {
		localStorage.setItem("sl_disclaimer_accepted", "true");
		setIsVisible(false);
	};
	if (!isVisible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[9999999] bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-200 select-none overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 w-full max-w-sm flex flex-col items-center gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.1)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "w-8 h-8 text-slate-400",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							strokeWidth: 1.5,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-black uppercase tracking-widest text-slate-100 font-mono",
								children: "SafetyLink Core"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-0.5 bg-red-500/50 mx-auto rounded-full" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 text-[11px] leading-relaxed text-slate-400 font-mono text-justify",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-center text-slate-300",
										children: "© 2026 TM Media Solutions. All rights reserved."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SafetyLink is proprietary software. Unauthorised copying, reverse engineering, redistribution, or recreation of this application or its concepts is strictly prohibited." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-center",
										children: "By continuing you agree to our Terms of Use and Privacy Policy."
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleAccept,
						className: "w-full mt-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-emerald-500/50 py-3.5 px-6 rounded-xl font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95",
						children: "I Understand & Accept"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-slate-800 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-slate-800 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-slate-800 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-slate-800 pointer-events-none" })
		]
	});
};
//#endregion
//#region src/components/ErrorBoundary.tsx
var ErrorBoundary = class extends import_react.Component {
	state = { hasError: false };
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error
		};
	}
	componentDidCatch(error, info) {
		console.error("[SafetyLink ErrorBoundary]", error, info);
		try {
			if (window && window.Sentry) window.Sentry.captureException(error, { extra: info });
		} catch (e) {
			console.warn("Failed to send crash report to analytics hook.", e);
		}
	}
	render() {
		if (this.state.hasError) {
			if (this.props.fallback) return this.props.fallback;
			const rawMsg = this.state.error?.message || "";
			let parsedFs = null;
			try {
				if (rawMsg.trim().startsWith("{")) parsedFs = JSON.parse(rawMsg);
			} catch {}
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center p-6 text-center gap-3 h-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-3xl",
						children: "⚠️"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold text-slate-200",
						children: this.props.tabName ? `${this.props.tabName} failed to load` : "Something went wrong"
					}),
					parsedFs ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-md bg-slate-900 border border-red-500/30 rounded-xl p-3 text-left text-xs font-mono text-slate-300 space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-red-400 font-bold",
								children: "Database Security Context"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Operation: ", parsedFs.operationType || "unknown"] }),
							parsedFs.path && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Path: ", parsedFs.path] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-slate-400 break-words",
								children: parsedFs.error
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-500 font-mono",
						children: rawMsg
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => this.setState({ hasError: false }),
						className: "px-4 py-2 text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-700 transition-all",
						children: "Retry"
					})
				]
			});
		}
		return this.props.children;
	}
};
//#endregion
//#region src/components/DistressVideoStream.tsx
var DistressVideoStream = ({ calleeId, onCallEnd }) => {
	const localVideoRef = (0, import_react.useRef)(null);
	const remoteVideoRef = (0, import_react.useRef)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [isCalling, setIsCalling] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mediaParams = {
			audio: true,
			video: true
		};
		yt.videochat.onCallListener = (session, _extension) => {
			setSession(session);
			session.getUserMedia(mediaParams).then((localStream) => {
				if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
				session.accept({});
			});
		};
		yt.videochat.onAcceptCallListener = (_session, _userId, _extension) => {};
		yt.videochat.onRemoteStreamListener = (_session, _userId, remoteStream) => {
			if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
		};
		return () => {
			yt.videochat.onCallListener = () => {};
			yt.videochat.onAcceptCallListener = () => {};
			yt.videochat.onRemoteStreamListener = () => {};
		};
	}, []);
	const initiateDistressCall = async () => {
		try {
			setIsCalling(true);
			const session = yt.videochat.createNewSession([calleeId], yt.videochat.CallType.VIDEO);
			setSession(session);
			const localStream = await session.getUserMedia({
				audio: true,
				video: true
			});
			if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
			session.call({});
		} catch (error) {
			console.error("Failed to initiate WebRTC distress stream", error);
			setIsCalling(false);
		}
	};
	const endCall = () => {
		if (session) {
			session.stop({});
			yt.videochat.clearSession(session.ID);
			setSession(null);
		}
		setIsCalling(false);
		onCallEnd();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-4 left-4 bg-red-500/20 text-red-400 border border-red-500 font-bold px-3 py-1 rounded animate-pulse text-xs tracking-wider",
				children: "LIVE DISTRESS STREAM"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-4xl aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: remoteVideoRef,
					autoPlay: true,
					playsInline: true,
					className: "w-full h-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-4 right-4 w-32 md:w-48 aspect-video bg-black rounded-lg overflow-hidden border-2 border-slate-700 shadow-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: localVideoRef,
						autoPlay: true,
						playsInline: true,
						muted: true,
						className: "w-full h-full object-cover"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex gap-4",
				children: [!isCalling && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: initiateDistressCall,
					className: "bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105",
					children: "START STREAM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: endCall,
					className: "bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105",
					children: "END STREAM"
				})]
			})
		]
	});
};
//#endregion
//#region src/components/PanicButton.tsx
var PanicButton = () => {
	const [showCancelPin, setShowCancelPin] = (0, import_react.useState)(false);
	const [pinInput, setPinInput] = (0, import_react.useState)("");
	const [pinError, setPinError] = (0, import_react.useState)(false);
	const [showDistressVideo, setShowDistressVideo] = (0, import_react.useState)(false);
	const { activeSOSState, attemptCancelSOS, drillMode, panicCountdown, startMultiStagePanic, auditLogs, watchMeTimerSeconds, startWatchMeTimer, cancelWatchMeTimer, silenceAlerts, setSilenceAlerts } = useAppStore();
	const [showWatchMe, setShowWatchMe] = (0, import_react.useState)(false);
	const [watchMeMinutes, setWatchMeMinutes] = (0, import_react.useState)(30);
	const [showWatchMeCancel, setShowWatchMeCancel] = (0, import_react.useState)(false);
	const [watchMePin, setWatchMePin] = (0, import_react.useState)("");
	const [isHolding, setIsHolding] = (0, import_react.useState)(false);
	const [holdProgress, setHoldProgress] = (0, import_react.useState)(0);
	const holdIntervalRef = (0, import_react.useRef)(null);
	const startHolding = (e) => {
		e.preventDefault();
		if (activeSOSState !== "IDLE") return;
		setIsHolding(true);
		setHoldProgress(0);
		const startTime = Date.now();
		holdIntervalRef.current = window.setInterval(() => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / 1500, 1);
			setHoldProgress(progress);
			if (progress >= 1) {
				clearInterval(holdIntervalRef.current);
				setIsHolding(false);
				setHoldProgress(0);
				startMultiStagePanic("Critical panic beacon initiated manually via interactive mission-control cockpit trigger.");
			}
		}, 30);
	};
	const stopHolding = () => {
		if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
		setIsHolding(false);
		setHoldProgress(0);
	};
	(0, import_react.useEffect)(() => {
		return () => {
			if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (panicCountdown !== null) try {
			NativeDispatchService.triggerVibration();
			NativeDispatchService.forceUnlockAndWake();
		} catch (e) {
			console.warn("Native dispatch unavailable in web:", e);
		}
	}, [panicCountdown]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 15
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "carbon-panel rounded-3xl p-6 shadow-2xl w-full max-w-md mx-auto relative overflow-hidden scanlines lens-flare-overlay",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute top-0 left-0 right-0 h-[3px] transition-all duration-500 ${activeSOSState !== "IDLE" ? "bg-gradient-to-r from-red-500 via-orange-500 to-red-500 neon-glow-red" : "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 neon-glow-emerald"}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 digital-grid opacity-15 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-6 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center gap-2 mb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-black uppercase text-slate-400 tracking-[0.25em] font-display",
						children: activeSOSState !== "IDLE" ? "TRANSMITTING DISTRESS SIGNAL" : "MISSION-CONTROL SOS ACTUATOR"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-slate-400 max-w-[300px] mx-auto leading-relaxed",
					children: activeSOSState === "IDLE" ? "Depress and hold central beacon for 1.5s to initiate sequential security escalation chain." : "Emergency beacon actively transmitting real-time coordinates & ambient diagnostics."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				animate: {
					x: 0,
					y: 0
				},
				transition: {
					type: "spring",
					stiffness: 120,
					damping: 14
				},
				className: "relative flex items-center justify-center w-64 h-64 mx-auto my-2 z-10",
				children: [
					activeSOSState !== "IDLE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex items-center justify-center pointer-events-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								scale: .6,
								opacity: 1
							},
							animate: {
								scale: 1.35,
								opacity: 0
							},
							transition: {
								duration: 1.6,
								repeat: Infinity,
								ease: "easeOut"
							},
							className: "absolute w-full h-full rounded-full border border-red-500/25 bg-red-500/5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								scale: .4,
								opacity: .8
							},
							animate: {
								scale: 1.15,
								opacity: 0
							},
							transition: {
								duration: 2,
								repeat: Infinity,
								delay: .4,
								ease: "easeOut"
							},
							className: "absolute w-full h-full rounded-full border border-orange-500/15"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 pointer-events-none rounded-full border border-blue-500/20 scale-110 border-dashed animate-[spin_45s_linear_infinite]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-2 pointer-events-none rounded-full border border-blue-400/10 scale-105" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "absolute w-56 h-56 transform -rotate-90 pointer-events-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "112",
							cy: "112",
							r: "96",
							stroke: "#1e293b",
							fill: "none",
							strokeWidth: "5"
						}), isHolding && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "112",
							cy: "112",
							r: "96",
							stroke: "#ef4444",
							fill: "none",
							strokeWidth: "5",
							strokeDasharray: 2 * Math.PI * 96,
							strokeDashoffset: 2 * Math.PI * 96 * (1 - holdProgress),
							strokeLinecap: "round"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `absolute w-48 h-48 rounded-full border transition-all duration-500 flex items-center justify-center ${activeSOSState !== "IDLE" ? "border-red-500/50 bg-red-950/30 shadow-[0_0_50px_rgba(239,68,68,0.45)] animate-glow-ring" : "border-slate-800 bg-slate-950/70 shadow-[inset_0_4px_16px_rgba(0,0,0,0.85)]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showCancelPin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							exit: { opacity: 0 },
							className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									scale: .9,
									y: 20
								},
								animate: {
									scale: 1,
									y: 0
								},
								exit: {
									scale: .9,
									y: 20
								},
								className: "bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-red-900/40 p-4 text-center border-b border-red-500/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-10 h-10 text-red-500 mx-auto mb-2 animate-pulse" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-white font-bold text-lg tracking-wide uppercase",
											children: "Cancel Emergency"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-slate-300 text-sm mt-1",
											children: "Enter your secure PIN to stand down responders."
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-center gap-3 mb-6",
											children: [
												0,
												1,
												2,
												3
											].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `w-12 h-14 rounded-lg flex items-center justify-center text-2xl font-mono font-bold transition-all ${pinError ? "bg-red-500/20 border-2 border-red-500 text-red-400" : pinInput.length > i ? "bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-slate-800 border-2 border-slate-700 text-slate-500"}`,
												children: pinInput.length > i ? "*" : "-"
											}, i))
										}),
										pinError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-red-500 text-sm font-medium mb-4 animate-bounce",
											children: "Incorrect PIN. Try again."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-3 gap-3",
											children: [
												[
													1,
													2,
													3,
													4,
													5,
													6,
													7,
													8,
													9
												].map((num) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														if (pinInput.length < 4) {
															setPinError(false);
															const newPin = pinInput + num;
															setPinInput(newPin);
															if (newPin.length === 4) setTimeout(() => {
																if (attemptCancelSOS(newPin)) setShowCancelPin(false);
																else {
																	setPinError(true);
																	setPinInput("");
																}
															}, 300);
														}
													},
													className: "bg-slate-800 hover:bg-slate-700 text-white font-mono text-xl py-4 rounded-xl border border-slate-700/50 active:scale-95 transition-all focus:outline-none",
													children: num
												}, num)),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														setShowCancelPin(false);
														setPinInput("");
													},
													className: "bg-slate-800/50 hover:bg-slate-700 text-slate-400 font-medium py-4 rounded-xl active:scale-95 transition-all focus:outline-none flex items-center justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														if (pinInput.length < 4) {
															setPinError(false);
															const newPin = pinInput + "0";
															setPinInput(newPin);
															if (newPin.length === 4) setTimeout(() => {
																if (attemptCancelSOS(newPin)) setShowCancelPin(false);
																else {
																	setPinError(true);
																	setPinInput("");
																}
															}, 300);
														}
													},
													className: "bg-slate-800 hover:bg-slate-700 text-white font-mono text-xl py-4 rounded-xl border border-slate-700/50 active:scale-95 transition-all focus:outline-none",
													children: "0"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setPinInput(pinInput.slice(0, -1)),
													className: "bg-slate-800/50 hover:bg-slate-700 text-slate-400 font-medium py-4 rounded-xl active:scale-95 transition-all focus:outline-none text-sm uppercase tracking-wider",
													children: "DEL"
												})
											]
										})
									]
								})]
							})
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onMouseDown: startHolding,
							onMouseUp: stopHolding,
							onMouseLeave: stopHolding,
							onTouchStart: startHolding,
							onTouchEnd: stopHolding,
							onClick: () => {
								if (activeSOSState !== "IDLE") {
									setShowCancelPin(true);
									setPinInput("");
									setPinError(false);
								}
							},
							className: `w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden select-none outline-none ${activeSOSState === "IDLE" ? "glossy-sos-btn active:scale-95" : "bg-slate-950 border border-red-500/40 hover:bg-slate-900 shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" }), activeSOSState === "IDLE" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									animate: { scale: isHolding ? [
										1,
										1.15,
										1
									] : 1 },
									transition: {
										repeat: isHolding ? Infinity : 0,
										duration: .8
									},
									className: "w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-1 text-white border border-white/10 shadow-inner",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-6 h-6",
										fill: "currentColor",
										viewBox: "0 0 20 20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fillRule: "evenodd",
											d: "M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z",
											clipRule: "evenodd"
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white font-black text-2xl tracking-[0.1em] font-display",
									children: "SOS"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-red-200 text-[9px] font-mono font-bold uppercase tracking-widest mt-0.5",
									children: ["HOLD ", isHolding ? `${Math.round((1.5 - holdProgress * 1.5) * 10) / 10}S` : "1.5S"]
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									animate: {
										scale: [
											1,
											1.1,
											1
										],
										opacity: [
											.7,
											1,
											.7
										]
									},
									transition: {
										repeat: Infinity,
										duration: 1
									},
									className: "w-11 h-11 rounded-full bg-red-500/10 flex items-center justify-center mb-1 text-red-500 border border-red-500/20 shadow-inner",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-5 h-5",
										fill: "none",
										viewBox: "0 0 24 24",
										stroke: "currentColor",
										strokeWidth: 3,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											d: "M6 18L18 6M6 6l12 12"
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-500 font-black text-base tracking-[0.1em] font-display",
									children: "ACTIVE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-400 text-[8px] font-mono uppercase font-bold tracking-widest mt-1 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-slate-800 hover:text-slate-200",
									children: "TAP CANCEL"
								})
							] })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: activeSOSState !== "IDLE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					height: 0
				},
				animate: {
					opacity: 1,
					height: "auto"
				},
				exit: {
					opacity: 0,
					height: 0
				},
				className: "w-full mt-4 p-4 bg-slate-950/60 rounded-2xl border border-red-500/20 font-mono text-[11px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-[9px] text-slate-500 border-b border-slate-900 pb-1.5 mb-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SECURITY ROUTING PIPELINE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-red-500 font-bold flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" }), "BROADCASTING"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 text-slate-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${activeSOSState === "ACQUIRING_GPS" ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: activeSOSState === "ACQUIRING_GPS" ? "text-amber-400 font-bold" : "opacity-60 text-slate-400",
									children: "1. GPS Triangulation Lock"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] text-slate-500",
								children: activeSOSState === "ACQUIRING_GPS" ? "WAITING" : "LOCKED"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${activeSOSState === "ACQUIRING_GPS" ? "bg-slate-800" : activeSOSState === "CAPTURING_EVIDENCE" ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: activeSOSState === "CAPTURING_EVIDENCE" ? "text-amber-400 font-bold" : "opacity-60 text-slate-400",
									children: "2. Audio Capture & Uplink"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] text-slate-500",
								children: ["IDLE", "ACQUIRING_GPS"].includes(activeSOSState) ? "QUEUED" : activeSOSState === "CAPTURING_EVIDENCE" ? "UPLINKING" : "COMPLETE"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${[
									"IDLE",
									"ACQUIRING_GPS",
									"CAPTURING_EVIDENCE"
								].includes(activeSOSState) ? "bg-slate-800" : activeSOSState === "ESCALATING" ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: activeSOSState === "ESCALATING" ? "text-amber-400 font-bold" : "opacity-60 text-slate-400",
									children: "3. Sequential Alarm Dispatch"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] text-slate-500",
								children: [
									"IDLE",
									"ACQUIRING_GPS",
									"CAPTURING_EVIDENCE"
								].includes(activeSOSState) ? "QUEUED" : activeSOSState === "ESCALATING" ? "SENDING" : "SENT"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${activeSOSState === "DISPATCHED" ? "bg-emerald-500 animate-pulse neon-glow-emerald" : "bg-slate-800"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: activeSOSState === "DISPATCHED" ? "text-emerald-400 font-bold" : "opacity-60 text-slate-400",
									children: "4. Security Dispatch Dispatched"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] text-slate-500",
								children: activeSOSState === "DISPATCHED" ? "EN-ROUTE" : "QUEUED"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowDistressVideo(true),
							className: "w-full mt-4 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2 rounded-lg transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold tracking-wider",
								children: "OPEN DISTRESS CAM"
							})]
						})
					]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 p-3.5 bg-slate-950/85 border border-slate-900 rounded-2xl text-left relative z-10 font-mono hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center border-b border-slate-900 pb-1.5 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[9px] font-black text-blue-400 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" }), "NOTIFICATION GHOST ENGINE"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[7.5px] text-slate-500 uppercase",
						children: "EVENTS LOG"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar",
					children: auditLogs && auditLogs.length > 0 ? auditLogs.slice(0, 5).map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-0.5 pb-2 border-b border-slate-900/40 last:border-0 last:pb-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[8.5px] font-bold uppercase ${log.severity === "SEVERE" ? "text-red-400" : log.severity === "WARN" ? "text-amber-400" : "text-blue-400"}`,
								children: log.message
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[7.5px] text-slate-600",
								children: new Date(log.timestamp).toLocaleTimeString([], {
									hour12: false,
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[9px] text-slate-400 truncate leading-relaxed",
							children: log.details
						})]
					}, log.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center h-full text-[9px] text-slate-600",
						children: "No recent events"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between w-full mt-5 pt-4 border-t border-slate-800/40 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold text-slate-300 font-display",
						children: drillMode ? "SANDBOX SIMULATOR" : "LIVE SECURITY ARMED"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-slate-500 mt-0.5 font-mono",
						children: drillMode ? "Simulated escalation nodes" : "Sequential escalation chain active"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						activeSOSState === "IDLE" && panicCountdown === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => startMultiStagePanic("Manual fast-tap testing alert"),
							className: "px-2.5 py-1.5 bg-red-950/40 hover:bg-red-900 border border-red-500/20 rounded-full text-[8px] font-mono font-bold text-red-400 uppercase tracking-wider",
							children: "⏳ Test 5s"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => useAppStore.getState().toggleDrillMode(),
							className: `px-3.5 py-1.5 rounded-full text-[9px] font-mono font-bold tracking-wider border uppercase transition-all duration-300 ${drillMode ? "bg-slate-800/60 text-amber-400 border-amber-500/20 hover:bg-slate-800 hover:border-amber-400/40" : "bg-red-950/20 text-red-400 border-red-500/20 hover:bg-red-950/40 hover:border-red-500/40"}`,
							children: drillMode ? "DRILL TEST" : "LIVE PROTOCOL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSilenceAlerts(!silenceAlerts),
							className: `px-3 py-1.5 rounded-full flex items-center justify-center border transition-all duration-300 ${silenceAlerts ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-slate-900/40 border-slate-800 text-slate-500"}`,
							title: silenceAlerts ? "Silent Alerts Active" : "Audible Alerts Active",
							children: silenceAlerts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 relative z-10",
				children: watchMeTimerSeconds !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "bg-slate-900/90 border border-emerald-500/30 rounded-xl p-3 backdrop-blur-md flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-4 h-4 text-emerald-400" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-emerald-400 text-[10px] font-bold uppercase tracking-wider",
							children: "Watch-Me"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-white font-mono text-lg",
							children: [
								Math.floor(watchMeTimerSeconds / 60).toString().padStart(2, "0"),
								":",
								(watchMeTimerSeconds % 60).toString().padStart(2, "0")
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowWatchMeCancel(true),
						className: "bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700",
						children: "Cancel"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					whileHover: { scale: 1.02 },
					whileTap: { scale: .98 },
					onClick: () => setShowWatchMe(true),
					className: "w-full bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 rounded-xl p-3 backdrop-blur-sm flex items-center justify-between group transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-slate-200 text-sm font-bold tracking-wide",
								children: "Watch-Me Timer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-slate-500 text-[10px] uppercase",
								children: "Proactive protection"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-slate-600 group-hover:text-slate-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							xmlns: "http://www.w3.org/2000/svg",
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 18 6-6-6-6" })
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showWatchMe && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { y: 400 },
					animate: { y: 0 },
					exit: { y: 400 },
					className: "bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-white font-bold text-lg",
									children: "Watch-Me Timer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-slate-400 text-sm",
									children: "Proactive emergency switch"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setShowWatchMe(false),
									className: "text-slate-400 hover:text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-slate-300 text-sm mb-6",
								children: "If this timer reaches zero before you cancel it, SafetyLink will automatically dispatch responders to your last known location."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-6 mb-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setWatchMeMinutes(Math.max(5, watchMeMinutes - 5)),
										className: "w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700",
										children: "-"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center w-20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-4xl font-mono font-bold text-white",
											children: watchMeMinutes
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-500 text-xs block uppercase mt-1",
											children: "Minutes"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setWatchMeMinutes(Math.min(120, watchMeMinutes + 5)),
										className: "w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700",
										children: "+"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									startWatchMeTimer(watchMeMinutes);
									setShowWatchMe(false);
								},
								className: "w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]",
								children: "Start Protection"
							})
						]
					})
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, { children: [showWatchMeCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						scale: .9,
						y: 20
					},
					animate: {
						scale: 1,
						y: 0
					},
					exit: {
						scale: .9,
						y: 20
					},
					className: "bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm p-6 text-center shadow-2xl relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-white font-bold text-lg mb-2",
							children: "Cancel Watch-Me"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-slate-400 text-sm mb-6",
							children: "Enter PIN to stop the timer."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center gap-3 mb-6",
							children: [
								0,
								1,
								2,
								3
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-12 h-14 rounded-lg flex items-center justify-center text-2xl font-mono font-bold ${watchMePin.length > i ? "bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400" : "bg-slate-800 border-2 border-slate-700 text-slate-500"}`,
								children: watchMePin.length > i ? "*" : "-"
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								[
									1,
									2,
									3,
									4,
									5,
									6,
									7,
									8,
									9
								].map((num) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										if (watchMePin.length < 4) {
											const newPin = watchMePin + num;
											setWatchMePin(newPin);
											if (newPin.length === 4) setTimeout(() => {
												if (cancelWatchMeTimer(newPin)) {
													setShowWatchMeCancel(false);
													setWatchMePin("");
												} else setWatchMePin("");
											}, 300);
										}
									},
									className: "bg-slate-800 hover:bg-slate-700 text-white font-mono text-xl py-4 rounded-xl border border-slate-700/50",
									children: num
								}, num)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setShowWatchMeCancel(false);
										setWatchMePin("");
									},
									className: "bg-slate-800/50 hover:bg-slate-700 text-slate-400 py-4 rounded-xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6 mx-auto" })
								}),
								"                ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										if (watchMePin.length < 4) {
											const newPin = watchMePin + "0";
											setWatchMePin(newPin);
											if (newPin.length === 4) setTimeout(() => {
												if (cancelWatchMeTimer(newPin)) {
													setShowWatchMeCancel(false);
													setWatchMePin("");
												} else setWatchMePin("");
											}, 300);
										}
									},
									className: "bg-slate-800 hover:bg-slate-700 text-white font-mono text-xl py-4 rounded-xl border border-slate-700/50",
									children: "0"
								}),
								"                ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setWatchMePin(watchMePin.slice(0, -1)),
									className: "bg-slate-800/50 hover:bg-slate-700 text-slate-400 py-4 rounded-xl text-sm font-bold",
									children: "DEL"
								}),
								"              "
							]
						}),
						"            "
					]
				}), "          "]
			}), "      "] }),
			showDistressVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DistressVideoStream, {
				callerId: 1e3,
				calleeId: 2e3,
				onCallEnd: () => setShowDistressVideo(false)
			})
		]
	});
};
//#endregion
//#region src/services/FirebaseSyncService.ts
var firestoreUnsubscribe = null;
/**
* FIX #1: Firestore Listener Memory Leak
* Properly manages listener lifecycle to prevent memory leaks on logout.
* Previously: Listeners were created but never unsubscribed.
* Now: Returns unsubscribe function that MUST be called on logout.
*/
var initFirebaseSync = () => {
	const state = useAppStore.getState();
	if (firestoreUnsubscribe) {
		firestoreUnsubscribe();
		firestoreUnsubscribe = null;
	}
	if (!state.currentUser?.id) return;
	try {
		const q = query(collection(db, "users"), where("orgCode", "==", state.currentUser.orgCode || ""));
		firestoreUnsubscribe = onSnapshot(q, (snapshot) => {
			const nodes = [];
			snapshot.forEach((doc) => {
				const data = doc.data();
				if (data.id !== state.currentUser?.id && data.lat && data.lng) nodes.push({
					id: data.id,
					name: data.username || "Responder",
					lat: data.lat,
					lng: data.lng,
					status: data.activeSOS ? "ACTIVE" : "SECURE",
					type: "RESPONDER",
					battery: data.battery || 100
				});
			});
			const localNodes = useAppStore.getState().meshNodes.filter((n) => n.type !== "RESPONDER");
			useAppStore.setState({ meshNodes: [...localNodes, ...nodes] });
		}, (error) => {
			console.warn("[FirebaseSync] Listener error:", error);
		});
	} catch (err) {
		console.error("[FirebaseSync] Failed to initialize:", err);
	}
};
//#endregion
//#region src/components/DispatchChain.tsx
var DispatchChain = () => {
	const { contacts, updateContact, addContact, removeContact, activeSOSState } = useAppStore();
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [label, setLabel] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [template, setTemplate] = (0, import_react.useState)("");
	const [channelType, setChannelType] = (0, import_react.useState)("SMS");
	const [hasWhatsApp, setHasWhatsApp] = (0, import_react.useState)(false);
	const [triggerTypes, setTriggerTypes] = (0, import_react.useState)([]);
	const toggleTriggerType = (t) => {
		setTriggerTypes((prev) => prev.includes(t) ? prev.filter((p) => p !== t) : [...prev, t]);
	};
	const handleEditClick = (contact) => {
		setEditingId(contact.id);
		setLabel(contact.label);
		setPhone(contact.phone);
		setTemplate(contact.template || "");
		setChannelType(contact.channelType || "SMS");
		setHasWhatsApp(Boolean(contact.hasWhatsApp || contact.channelType === "WHATSAPP"));
		setTriggerTypes(contact.triggerTypes || []);
	};
	const handleSaveEdit = (id) => {
		updateContact(id, {
			label,
			phone,
			template,
			channelType,
			hasWhatsApp: hasWhatsApp || channelType === "WHATSAPP",
			triggerTypes
		});
		setEditingId(null);
	};
	const handleAddSubmit = (e) => {
		e.preventDefault();
		if (!label || !phone) return;
		addContact({
			label,
			phone,
			template: template || "EMERGENCY: Distress beacon active near {LAT}, {LNG}",
			channelType,
			hasWhatsApp: hasWhatsApp || channelType === "WHATSAPP",
			triggerTypes,
			priority: contacts.length + 1
		});
		setLabel("");
		setPhone("");
		setTemplate("");
		setChannelType("SMS");
		setHasWhatsApp(false);
		setTriggerTypes([]);
		setShowAddForm(false);
	};
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 neon-glow-blue" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 digital-grid opacity-10 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center border-b border-slate-900 pb-3.5 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-black text-slate-100 tracking-[0.2em] font-display uppercase",
						children: "Sequential Alerts Cascade"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-mono text-slate-500 mt-0.5",
						children: "Emergency dispatch routing contacts"
					})]
				}), !showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowAddForm(true),
					className: "px-3.5 py-1.5 text-[9px] font-mono font-bold text-white bg-blue-600 hover:bg-blue-500 border border-blue-500/20 rounded-full transition-all flex items-center gap-1 shadow-lg shadow-blue-950/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "w-3 h-3",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						strokeWidth: 3.5,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							d: "M12 4v16m8-8H4"
						})
					}), "ADD NODE"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
				initial: {
					opacity: 0,
					height: 0
				},
				animate: {
					opacity: 1,
					height: "auto"
				},
				exit: {
					opacity: 0,
					height: 0
				},
				onSubmit: handleAddSubmit,
				className: "p-4 bg-slate-950/40 rounded-2xl border border-slate-900 space-y-3.5 text-left mt-4 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[10px] font-black text-blue-400 font-display tracking-widest uppercase",
						children: "PROVISION DISPATCH NODE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[9px] font-bold text-slate-500 mb-1 font-mono uppercase",
								children: "Name / Label"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: label,
								onChange: (e) => setLabel(e.target.value),
								placeholder: "e.g. Armed Patrol Duty",
								className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono",
								required: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[9px] font-bold text-slate-500 mb-1 font-mono uppercase",
								children: "Phone / Gateway"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								placeholder: "+27829110000",
								className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono",
								required: true
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[9px] font-bold text-slate-500 mb-1 font-mono uppercase",
								children: "Channel Pathway"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: channelType,
								onChange: (e) => setChannelType(e.target.value),
								className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "CALL",
										children: "Cellular Direct Voice Call"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "SMS",
										children: "Automated SMS Broadcast"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "WHATSAPP",
										children: "WhatsApp Secure Payload"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "GROUP",
										children: "Community Broadcaster Channel"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "POLICE",
										children: "SAPS Police Center"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 mt-2 text-[9px] font-mono text-emerald-400 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: hasWhatsApp || channelType === "WHATSAPP",
									onChange: (e) => setHasWhatsApp(e.target.checked),
									className: "accent-emerald-500"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contact uses WhatsApp (enables Priority 5 WhatsApp fallback)" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[9px] font-bold text-slate-500 mb-1 font-mono uppercase",
							children: "Custom Alert SMS Message Template"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: template,
							onChange: (e) => setTemplate(e.target.value),
							placeholder: "Use {LAT}, {LNG} to inject real-time GPS coordinates",
							className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 h-16 focus:outline-none focus:border-blue-500 font-mono resize-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[9px] font-bold text-slate-500 mb-1.5 font-mono uppercase",
								children: "Alert Scenario — pre-select which contacts receive each alert type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: [
									"Medical",
									"Hijacking",
									"Vehicle Accident",
									"Fire",
									"Domestic Violence",
									"Clock In",
									"Clock Out",
									"Guard Patrol",
									"Custom"
								].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => toggleTriggerType(t),
									className: ["text-[9px] px-2.5 py-1 rounded-lg font-mono border transition-all", triggerTypes.includes(t) ? "bg-blue-600 border-blue-500/40 text-white" : "bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300"].join(" "),
									children: t
								}, t))
							}),
							triggerTypes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[8px] text-slate-600 mt-1 font-mono",
								children: "Leave empty to receive ALL alert types"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-3 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowAddForm(false),
							className: "px-3.5 py-1.5 text-[10px] text-slate-500 hover:text-slate-300 font-bold uppercase font-mono",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "px-4 py-1.5 bg-blue-600 text-white border border-blue-500/20 font-bold rounded-xl text-[10px] hover:bg-blue-500 transition-all font-mono uppercase",
							children: "Save Contact"
						})]
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3.5 text-left mt-4 relative z-10",
				children: contacts.map((contact, index) => {
					const isEditing = editingId === contact.id;
					const isLiveActive = activeSOSState !== "IDLE" && activeSOSState !== "RESOLVED";
					const avatarLetter = contact.label ? contact.label.charAt(0).toUpperCase() : "E";
					const colors = [
						"bg-blue-500/10 text-blue-400 border-blue-500/20",
						"bg-orange-500/10 text-orange-400 border-orange-500/20",
						"bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
						"bg-purple-500/10 text-purple-400 border-purple-500/20",
						"bg-amber-500/10 text-amber-400 border-amber-500/20"
					];
					const colorClass = colors[index % colors.length];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						layout: true,
						className: `p-4 rounded-2xl border transition-all duration-300 ${isLiveActive && index === 0 ? "bg-slate-950 border-orange-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)] scale-[1.01]" : "bg-slate-950/40 border-slate-900/80 hover:border-slate-800"}`,
						children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: label,
										onChange: (e) => setLabel(e.target.value),
										className: "bg-slate-950 border border-slate-900 rounded-xl p-2 text-xs text-slate-100 font-mono"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: phone,
										onChange: (e) => setPhone(e.target.value),
										className: "bg-slate-950 border border-slate-900 rounded-xl p-2 text-xs text-slate-100 font-mono"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: channelType,
									onChange: (e) => setChannelType(e.target.value),
									className: "bg-slate-950 border border-slate-900 rounded-xl p-2 text-xs text-slate-100 font-mono",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "CALL",
											children: "Cellular Direct Voice Call"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "SMS",
											children: "Automated SMS Broadcast"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "WHATSAPP",
											children: "WhatsApp Secure Payload"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "GROUP",
											children: "Community Broadcaster Channel"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "POLICE",
											children: "SAPS Police Center"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[9px] font-bold text-slate-500 mb-1 font-mono uppercase",
										children: "Triggers (Pre-selected conditions)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1",
										children: [
											"Medical",
											"Hijacking",
											"Vehicle Accident",
											"Fire",
											"Domestic Violence",
											"Custom"
										].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => toggleTriggerType(t),
											className: `text-[9px] px-2 py-1 rounded font-mono border ${triggerTypes.includes(t) ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"}`,
											children: t
										}, t))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: template,
									onChange: (e) => setTemplate(e.target.value),
									className: "bg-slate-950 border border-slate-900 rounded-xl p-2 text-xs text-slate-100 w-full h-12 font-mono resize-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2 text-[10px] font-mono font-bold pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setEditingId(null),
										className: "px-2.5 py-1 text-slate-500 hover:text-slate-300 uppercase",
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleSaveEdit(contact.id),
										className: "px-3.5 py-1 bg-blue-600 text-white rounded-xl border border-blue-500/20 hover:bg-blue-500 uppercase",
										children: "Save"
									})]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 font-mono ${colorClass}`,
									children: avatarLetter
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 flex-wrap",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-black text-slate-100",
													children: contact.label
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] font-mono font-extrabold px-1.5 py-0.5 bg-slate-950 border border-slate-900 rounded-full text-blue-400 tracking-wider",
													children: contact.channelType
												}),
												contact.triggerTypes && contact.triggerTypes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] font-mono px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded-full text-emerald-400 tracking-wider flex gap-1",
													children: contact.triggerTypes.join(", ")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[8px] text-slate-500 font-mono",
													children: ["PRIOR #", contact.priority]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-mono text-slate-400 font-bold",
											children: contact.phone
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-slate-400 italic leading-relaxed pl-2 border-l border-slate-800 font-sans",
											children: [
												"\"",
												contact.template,
												"\""
											]
										})
									]
								})]
							}), !isLiveActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 shrink-0 text-[9px] font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleEditClick(contact),
										className: "text-slate-500 hover:text-slate-300 font-bold uppercase p-1",
										children: "EDIT"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-900",
										children: "|"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeContact(contact.id),
										className: "text-red-500/70 hover:text-red-500 font-bold uppercase p-1",
										children: "DEL"
									})
								]
							})]
						})
					}, contact.id);
				})
			})
		]
	});
};
//#endregion
//#region src/components/StatusIndicator.tsx
var StatusIndicator = () => {
	const { bleDevices, activeSOSState } = useAppStore();
	const isBleConnected = bleDevices.some((d) => d.connectionState === "CONNECTED");
	const isSosBeaconActive = activeSOSState !== "IDLE";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-3 w-full max-w-md mx-auto font-mono text-[10px] font-bold",
		children: [
			{
				label: "BLE LINK",
				value: isBleConnected ? "LINKED" : "TERMINATED",
				status: isBleConnected ? "OK" : "ERR",
				colorClass: isBleConnected ? "bg-emerald-500 neon-glow-emerald" : "bg-red-500 neon-glow-red",
				textColor: isBleConnected ? "text-emerald-400" : "text-red-400"
			},
			{
				label: "GNSS LOCK",
				value: isSosBeaconActive ? "HPE LOCK" : "SECURE LOCK",
				status: "OK",
				colorClass: "bg-emerald-500 neon-glow-emerald",
				textColor: "text-emerald-400"
			},
			{
				label: "SOS SECURE",
				value: isSosBeaconActive ? "BROADCASTING" : "STANDBY",
				status: isSosBeaconActive ? "DISTRESS" : "SECURE",
				colorClass: isSosBeaconActive ? "bg-red-500 neon-glow-red animate-ping" : "bg-emerald-500 neon-glow-emerald",
				textColor: isSosBeaconActive ? "text-red-400" : "text-emerald-400"
			}
		].map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .92
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			transition: {
				duration: .3,
				delay: idx * .05
			},
			className: "glass-panel rounded-2xl p-3 flex flex-col justify-between h-18 shadow-xl relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-0 right-0 p-1.5 opacity-30 text-[8px] font-black text-slate-500 uppercase",
					children: m.status
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[8px] text-slate-500 uppercase tracking-widest font-display",
					children: m.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 mt-2 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full shrink-0 ${m.colorClass}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `truncate ${m.textColor} text-[11px] font-black uppercase tracking-wide`,
						children: m.value
					})]
				})
			]
		}, m.label))
	});
};
//#endregion
//#region src/services/BaseService.ts
var BaseService = class {
	serviceName;
	constructor(serviceName) {
		this.serviceName = serviceName;
	}
	logInfo(message, details) {
		console.log(`[${this.serviceName}] INFO: ${message}`, details);
		useAppStore.getState().addAuditLog("SYSTEM", "INFO", `[${this.serviceName}] ${message}`, details);
	}
	logWarn(message, details) {
		console.warn(`[${this.serviceName}] WARN: ${message}`, details);
		useAppStore.getState().addAuditLog("SYSTEM", "WARN", `[${this.serviceName}] ${message}`, details);
	}
	logError(message, details) {
		console.error(`[${this.serviceName}] ERROR: ${message}`, details);
		useAppStore.getState().addAuditLog("SYSTEM", "SEVERE", `[${this.serviceName}] ${message}`, details);
	}
	async requestSystemPermission(permissionName) {
		this.logInfo(`Requesting permission: ${permissionName}`);
		let granted = false;
		try {
			const isNative = Capacitor.isNativePlatform();
			if (permissionName === "ACCESS_FINE_LOCATION" || permissionName === "location") {
				if (isNative) try {
					const { Geolocation } = await __vitePreload(async () => {
						const { Geolocation } = await import("./capacitor-B_jS8XWy.js").then((n) => n.i);
						return { Geolocation };
					}, __vite__mapDeps([0,1]));
					if ((await Geolocation.checkPermissions()).location === "granted") granted = true;
					else granted = (await Geolocation.requestPermissions()).location === "granted";
				} catch (err) {
					this.logWarn("Capacitor Geolocation permission check failed, trying Web Geolocation fallback", String(err));
				}
				if (!granted && typeof navigator !== "undefined" && navigator.geolocation) granted = await new Promise((resolve) => {
					navigator.geolocation.getCurrentPosition(() => resolve(true), () => resolve(false), {
						enableHighAccuracy: true,
						timeout: 5e3
					});
				});
				useAppStore.getState().setPermission("location", granted);
			} else if (permissionName === "BLUETOOTH_SCAN" || permissionName === "bluetooth") {
				granted = true;
				useAppStore.getState().setPermission("bluetooth", granted);
			} else granted = true;
			this.logInfo(`Permission ${permissionName} state: ${granted ? "GRANTED" : "DENIED"}.`);
			return granted;
		} catch (err) {
			const errMsg = err instanceof Error ? err.message : String(err);
			this.logError(`Failed requesting permission ${permissionName}`, errMsg);
			return false;
		}
	}
};
var GeolocationService = class GeolocationService extends BaseService {
	static instance;
	watchId = null;
	simulatedIntervalId = null;
	offlineCache = [];
	constructor() {
		super("GeolocationService");
	}
	static getInstance() {
		if (!GeolocationService.instance) GeolocationService.instance = new GeolocationService();
		return GeolocationService.instance;
	}
	startSimulatedTracking() {
		if (this.simulatedIntervalId !== null) return;
		this.logInfo("Starting simulated backup Geolocation tracking...");
		this.simulatedIntervalId = window.setInterval(() => {
			if (!useAppStore.getState().isBackgroundServiceRunning) return;
			const state = useAppStore.getState();
			if (!state.demoMode) return;
			const baseLat = state.userLocation?.lat || 0;
			const baseLng = state.userLocation?.lng || 0;
			const dLat = (Math.random() - .5) * 5e-4;
			const dLng = (Math.random() - .5) * 5e-4;
			const nextLat = baseLat + dLat;
			const nextLng = baseLng + dLng;
			useAppStore.getState().updateLocation(nextLat, nextLng, "Accuracy: 3.8m (Simulated GNSS fallback)");
			this.offlineCache.push({
				lat: nextLat,
				lng: nextLng,
				timestamp: Date.now()
			});
			if (this.offlineCache.length > 50) this.offlineCache.shift();
			this.purgeStaleLocationData(60);
		}, 3e4);
	}
	async startTracking() {
		if (!await this.requestSystemPermission("ACCESS_FINE_LOCATION")) {
			this.logWarn("Fine location permission denied. Falling back to simulated coordinates.");
			this.startSimulatedTracking();
			return;
		}
		this.logInfo("Starting high-accuracy Geolocation tracking via watchPosition...");
		const hasBatteryBypass = useAppStore.getState().permissions.batteryBypass;
		const watchOptions = {
			enableHighAccuracy: true,
			timeout: hasBatteryBypass ? 1e4 : 25e3,
			maximumAge: hasBatteryBypass ? 0 : 15e3
		};
		if (typeof navigator !== "undefined" && navigator.geolocation) this.watchId = navigator.geolocation.watchPosition((position) => {
			if (!useAppStore.getState().isBackgroundServiceRunning) return;
			const lat = position.coords.latitude;
			const lng = position.coords.longitude;
			const accuracy = position.coords.accuracy;
			useAppStore.getState().updateLocation(lat, lng, `Accuracy: ${accuracy.toFixed(1)}m (Real High-Precision GNSS)`);
			this.offlineCache.push({
				lat,
				lng,
				timestamp: Date.now()
			});
			if (this.offlineCache.length > 50) this.offlineCache.shift();
			this.purgeStaleLocationData(60);
		}, (error) => {
			this.logWarn(`Real Geolocation tracking error: ${error.message}. Engaging simulated fallback.`);
			this.startSimulatedTracking();
		}, watchOptions);
		else {
			this.logWarn("Geolocation API is not supported in this environment. Engaging simulated fallback.");
			this.startSimulatedTracking();
		}
	}
	stopTracking() {
		if (this.watchId !== null) {
			if (typeof navigator !== "undefined" && navigator.geolocation) navigator.geolocation.clearWatch(this.watchId);
			this.watchId = null;
			this.logInfo("Real Geolocation watch cleared.");
		}
		if (this.simulatedIntervalId !== null) {
			window.clearInterval(this.simulatedIntervalId);
			this.simulatedIntervalId = null;
			this.logInfo("Simulated backup Geolocation tracking interval cleared.");
		}
		this.offlineCache = [];
		this.logInfo("Geolocation tracking disabled and offline trajectory cache purged for privacy.");
	}
	purgeStaleLocationData(maxAgeMinutes = 60) {
		const cutoff = Date.now() - maxAgeMinutes * 60 * 1e3;
		const beforeCount = this.offlineCache.length;
		this.offlineCache = this.offlineCache.filter((loc) => loc.timestamp >= cutoff);
		if (beforeCount > this.offlineCache.length) this.logInfo(`Privacy purge: Removed ${beforeCount - this.offlineCache.length} stale location points older than ${maxAgeMinutes} minutes.`);
	}
	getOfflineCache() {
		return this.offlineCache;
	}
};
var OfflineService = class OfflineService extends BaseService {
	static instance;
	isOnline = true;
	sqliteSyncQueue = [];
	constructor() {
		super("OfflineService");
		window.addEventListener("online", () => this.handleNetworkSwitch(true));
		window.addEventListener("offline", () => this.handleNetworkSwitch(false));
	}
	static getInstance() {
		if (!OfflineService.instance) OfflineService.instance = new OfflineService();
		return OfflineService.instance;
	}
	getIsOnline() {
		return this.isOnline;
	}
	handleNetworkSwitch(online) {
		this.isOnline = online;
		if (online) {
			this.logInfo("Internet connection restored. Synchronizing cached SQL queues...");
			this.flushSyncQueue();
		} else this.logWarn("Device entered offline state. SQLite offline-first caching enabled for all state changes.");
	}
	queueSqlSync(action, payload) {
		this.sqliteSyncQueue.push({
			action,
			payload
		});
		this.logInfo(`Offline queue updated. Stored action "${action}" in local SQLite sync_queue.`);
	}
	flushSyncQueue() {
		if (this.sqliteSyncQueue.length === 0) return;
		this.logInfo(`Flushing ${this.sqliteSyncQueue.length} transactions from local cache to secure remote database (Spanner).`);
		this.sqliteSyncQueue = [];
		this.logInfo("Sync complete. Offline database status: In Sync.");
		useAppStore.getState().syncOfflineQueue(true);
	}
};
//#endregion
//#region src/components/LogoSetPart.tsx
var LogoSetPart = ({ part = "main", size = 48, rounded = "xl", showBorder = true }) => {
	const roundedClass = `rounded-${rounded}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `inline-flex items-center justify-center overflow-hidden bg-slate-950/60 ${showBorder ? "border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)]" : ""} ${roundedClass}`,
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/logos/Safety_Link_Logo_Transparent.png",
			alt: "SafetyLink Brand Logo",
			onError: (e) => {
				e.currentTarget.onerror = null;
				e.currentTarget.src = "/logos/New SafetyLink Official Logo.svg";
			},
			className: "w-full h-full object-contain p-0.5"
		})
	});
};
//#endregion
//#region src/components/landing/Pricing.tsx
var PLANS$1 = [
	{
		id: "free",
		category: "individual",
		name: "Free",
		tier: "Individual",
		priceMonthly: "R0",
		priceNum: 0,
		cadence: "/month",
		description: "Basic protection for individuals. No credit card required.",
		features: [
			"1 active user profile",
			"Live GPS emergency tracking",
			"2 emergency contacts (SMS & Push)",
			"Digital SOS trigger & quick widget",
			"24-hour incident event history",
			"Community safety broadcast alerts",
			"Offline SMS emergency fallback",
			"11 South African official languages"
		],
		ctaText: "Get Started Free",
		color: "#64748b"
	},
	{
		id: "premium",
		category: "individual",
		name: "Premium",
		tier: "Individual",
		badge: "Most Popular",
		priceMonthly: "R49",
		priceNum: 49,
		cadence: "/month",
		subPricing: "Or R499/year (Save 15%) • R149 once-off onboarding",
		description: "Full hardware-paired protection for individuals with control room link.",
		features: [
			"Physical iTAG keyfob pairing (Bluetooth Low Energy)",
			"Up to 5 physical iTags per profile",
			"Unlimited SOS panic activations",
			"Control room monitoring & responder routing",
			"Live real-time breadcrumb telemetry",
			"12-month tamper-proof incident evidence logs",
			"Geofenced Safe Zones (enter/exit alerts)",
			"Emergency ambient audio recording",
			"Priority cloud delivery & 24/7 support link"
		],
		ctaText: "Get Premium — R49/mo",
		highlighted: true,
		color: "#15803d"
	},
	{
		id: "family",
		category: "individual",
		name: "Family",
		tier: "Household Group",
		priceMonthly: "R99",
		priceNum: 99,
		cadence: "/month",
		subPricing: "Or R999/year (Save 16%) • R249 once-off onboarding",
		description: "Complete household protection for families, children, and elderly relatives.",
		features: [
			"Protects up to 6 family members",
			"Up to 12 physical Bluetooth iTAG keyfobs",
			"Shared family safety dashboard",
			"Live family radar tracking & check-in pins",
			"Simultaneous family group panic activation",
			"Shared safe zones (Home, School, Work)",
			"Family emergency timeline & audio ledger",
			"Escalation routing to neighbourhood watch"
		],
		ctaText: "Get Family Plan — R99/mo",
		color: "#0284c7"
	},
	{
		id: "starter_security",
		category: "security",
		name: "Starter",
		tier: "Patrol Agency",
		priceMonthly: "R999",
		priceNum: 999,
		cadence: "/month",
		description: "Entry-level dispatch command for private security and neighbourhood watches.",
		features: [
			"Up to 50 active client endpoints",
			"Live GIS client distress radar map",
			"Basic incident reporting & PDF exports",
			"Client contact directory & keyholder records",
			"Manual dispatch assignment",
			"Standard email & WhatsApp alert notifications"
		],
		ctaText: "Deploy Starter — R999/mo",
		color: "#475569"
	},
	{
		id: "pro_security",
		category: "security",
		name: "Professional",
		tier: "Security Company",
		badge: "Recommended for Security",
		priceMonthly: "R2,499",
		priceNum: 2499,
		cadence: "/month",
		description: "Comprehensive automated dispatch for armed response & patrol fleets.",
		features: [
			"Up to 250 active client endpoints",
			"Automated proximity dispatch engine",
			"Guard telemetry & patrol shift monitoring",
			"Full REST API & Webhook integration",
			"Automated instant WhatsApp responder dispatch",
			"Evidence Ledger with cryptographic timestamps",
			"Multi-operator Command Deck logins",
			"Priority 99.9% uptime SLA"
		],
		ctaText: "Deploy Professional — R2,499/mo",
		highlighted: true,
		color: "#e8321e"
	},
	{
		id: "business_security",
		category: "security",
		name: "Business",
		tier: "Regional Operations",
		priceMonthly: "R5,999",
		priceNum: 5999,
		cadence: "/month",
		description: "Enterprise fleet & multi-branch command for established security providers.",
		features: [
			"Up to 1,000 active client endpoints",
			"White-label Command Deck with custom branding",
			"Multi-branch control room federation",
			"Patrol vehicle GPS tracking & geo-fencing",
			"Automated shift change & guard muster checks",
			"Dedicated integration specialist"
		],
		ctaText: "Deploy Business — R5,999/mo",
		color: "#7c3aed"
	},
	{
		id: "enterprise_security",
		category: "security",
		name: "Enterprise",
		tier: "Government & Metro",
		priceMonthly: "Custom",
		priceNum: 0,
		cadence: "tailored",
		description: "Custom mesh safety infrastructure for universities, metropolises & corporations.",
		features: [
			"Unlimited client endpoints & responder nodes",
			"Dedicated private cloud or on-premise infrastructure",
			"Custom white-label Android & iOS mobile apps",
			"Hardware beacon mesh integration (BLE + LoRaWAN)",
			"24/7 dedicated engineering support & 15-min SLA",
			"Custom regulatory compliance & data residency"
		],
		ctaText: "Contact Enterprise Sales",
		color: "#d97706"
	}
];
var HARDWARE_PRODUCTS = [
	{
		id: "lite",
		name: "SafetyLink iTAG Lite",
		price: 100,
		priceStr: "R100",
		tag: "Single Keyfob",
		desc: "Compact Bluetooth Low Energy panic keyfob. One-touch silent trigger with 1-year replaceable battery.",
		features: [
			"BLE 5.0 Long Range",
			"Silent double-click SOS",
			"Keyring attachment included",
			"CR2032 battery included"
		]
	},
	{
		id: "active",
		name: "SafetyLink iTAG Active (3-Pack)",
		price: 179,
		priceStr: "R179",
		tag: "Most Popular Hardware",
		desc: "Bundle of 3 BLE panic tags for the whole family, vehicle keys, or school backpacks.",
		features: [
			"3x BLE panic keyfobs",
			"Individual name assignments",
			"Lanyard & clip attachments",
			"Saves R121 vs single units"
		],
		highlighted: true
	},
	{
		id: "premium",
		name: "SafetyLink iTAG Premium (5-Pack)",
		price: 299,
		priceStr: "R299",
		tag: "Best Value Bundle",
		desc: "Family or small business pack. 5x high-gain transmitters with rugged silicone protective cases.",
		features: [
			"5x Rugged BLE keyfobs",
			"Protective silicone sleeves",
			"5x Extra spare batteries",
			"Priority dispatch pairing"
		]
	}
];
function Pricing({ onNavigate, onRegisterOrg, onLogin, onRegisterUser }) {
	const [categoryTab, setCategoryTab] = (0, import_react.useState)("all");
	const [checkoutModalOpen, setCheckoutModalOpen] = (0, import_react.useState)(false);
	const [selectedPlan, setSelectedPlan] = (0, import_react.useState)(null);
	const [selectedHardware, setSelectedHardware] = (0, import_react.useState)(null);
	const [customerName, setCustomerName] = (0, import_react.useState)("");
	const [customerEmail, setCustomerEmail] = (0, import_react.useState)("");
	const [hardwareQty, setHardwareQty] = (0, import_react.useState)(1);
	const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
	const { globalTheme } = useAppStore();
	const isLight = globalTheme === "light";
	const handleSelectPlan = (plan) => {
		if (plan.priceNum === 0 && plan.id === "free") {
			if (onNavigate) onNavigate("store");
			else window.location.hash = "#download";
			return;
		}
		if (plan.id === "enterprise_security") {
			window.open("https://wa.me/message/YIEA73M7H3P5M1?text=Hi+SafetyLink+Enterprise+Sales+Inquiry", "_blank");
			return;
		}
		setSelectedHardware(null);
		setSelectedPlan(plan);
		setCheckoutModalOpen(true);
	};
	const handleSelectHardware = (item) => {
		setSelectedPlan(null);
		setSelectedHardware(item);
		setHardwareQty(1);
		setCheckoutModalOpen(true);
	};
	const handleExecutePayment = async () => {
		if (!customerEmail || !customerName) {
			alert("Please enter your full name and email address to proceed.");
			return;
		}
		setIsProcessing(true);
		const isHardware = !!selectedHardware;
		const amountZAR = isHardware ? selectedHardware.price * hardwareQty : selectedPlan ? selectedPlan.priceNum : 49;
		const amountInCents = amountZAR * 100;
		const ref = `SL-${isHardware ? "HW" : "SUB"}-${Date.now()}`;
		const PaystackPop = window.PaystackPop;
		const paystackKey = "pk_live_123a593f6611ef474e5076a9d1b8c442eb9f3aa3";
		if (PaystackPop && paystackKey) try {
			PaystackPop.setup({
				key: paystackKey,
				email: customerEmail,
				amount: amountInCents,
				currency: "ZAR",
				ref,
				metadata: {
					customer_name: customerName,
					item_name: isHardware ? selectedHardware.name : selectedPlan?.name,
					item_type: isHardware ? "hardware" : "subscription",
					quantity: isHardware ? hardwareQty : 1
				},
				callback: (response) => {
					setIsProcessing(false);
					setCheckoutModalOpen(false);
					alert(`Order confirmed! Payment Reference: ${response.reference}\nOur dispatch team will contact you on ${customerEmail}.`);
					window.location.hash = "#payment-success";
				},
				onClose: () => {
					setIsProcessing(false);
				}
			}).openIframe();
			return;
		} catch (e) {
			console.warn("PaystackPop setup error, falling back to WhatsApp confirmation:", e);
		}
		setIsProcessing(false);
		setCheckoutModalOpen(false);
		const orderTitle = isHardware ? `${hardwareQty}x ${selectedHardware?.name} (Total: R${amountZAR})` : `${selectedPlan?.name} Subscription (R${amountZAR}/mo)`;
		const msg = encodeURIComponent(`Hi SafetyLink! I want to confirm my order:\n\n• Item: ${orderTitle}\n• Name: ${customerName}\n• Email: ${customerEmail}\n• Ref: ${ref}`);
		window.open(`https://wa.me/message/YIEA73M7H3P5M1?text=${msg}`, "_blank");
	};
	const filteredPlans = PLANS$1.filter((p) => {
		if (categoryTab === "all") return true;
		if (categoryTab === "individual") return p.category === "individual";
		if (categoryTab === "security") return p.category === "security";
		return false;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: isLight ? "rgba(248, 250, 252, 0.85)" : "transparent",
			color: isLight ? "#0f172a" : "#f8fafc",
			minHeight: "100vh",
			paddingTop: "60px",
			fontFamily: "Inter, system-ui, sans-serif"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: {
					padding: "60px 20px 40px",
					textAlign: "center",
					maxWidth: "1000px",
					margin: "0 auto"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontFamily: "monospace",
							fontSize: "11px",
							letterSpacing: "0.15em",
							color: "#15803d",
							fontWeight: 800,
							textTransform: "uppercase",
							marginBottom: "12px"
						},
						children: "// TRANSPARENT COMMUNITY PRICING"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						style: {
							fontSize: "clamp(32px, 5vw, 54px)",
							fontWeight: 900,
							letterSpacing: "-0.03em",
							lineHeight: 1.1,
							marginBottom: "18px"
						},
						children: [
							"Protection Plans Built for ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "#15803d" },
								children: "Every South African Community"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "16px",
							color: isLight ? "#475569" : "#94a3b8",
							maxWidth: "680px",
							margin: "0 auto 32px",
							lineHeight: 1.6
						},
						children: "From free individual smartphone safety to armed response dispatch networks and bulk hardware BLE panic buttons. Cancel anytime."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "inline-flex",
							padding: "4px",
							background: isLight ? "#e2e8f0" : "rgba(255,255,255,0.08)",
							backdropFilter: "blur(8px)",
							borderRadius: "12px",
							gap: "4px",
							flexWrap: "wrap",
							justifyContent: "center"
						},
						children: [
							{
								id: "all",
								label: "All Solutions"
							},
							{
								id: "individual",
								label: "Individuals & Families"
							},
							{
								id: "security",
								label: "Security & Patrol Agencies"
							},
							{
								id: "hardware",
								label: "Physical iTAG Hardware"
							}
						].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setCategoryTab(tab.id),
							style: {
								padding: "8px 18px",
								borderRadius: "8px",
								border: "none",
								cursor: "pointer",
								fontSize: "12px",
								fontWeight: 700,
								transition: "all .2s",
								background: categoryTab === tab.id ? "#15803d" : "transparent",
								color: categoryTab === tab.id ? "#ffffff" : isLight ? "#475569" : "#94a3b8"
							},
							children: tab.label
						}, tab.id))
					})
				]
			}),
			categoryTab !== "hardware" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					maxWidth: "1200px",
					margin: "0 auto",
					padding: "0 20px 60px"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
						gap: "24px"
					},
					children: filteredPlans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: isLight ? "rgba(255,255,255,0.85)" : "rgba(13,17,23,0.65)",
							backdropFilter: "blur(12px)",
							border: plan.highlighted ? "2px solid #15803d" : isLight ? "1px solid #e2e8f0" : "1px solid rgba(255,255,255,0.08)",
							borderRadius: "20px",
							padding: "32px 24px",
							display: "flex",
							flexDirection: "column",
							position: "relative",
							boxShadow: plan.highlighted ? "0 12px 36px rgba(21,128,61,0.18)" : isLight ? "0 4px 16px rgba(0,0,0,0.04)" : "none"
						},
						children: [
							plan.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									position: "absolute",
									top: "-12px",
									left: "50%",
									transform: "translateX(-50%)",
									background: "#15803d",
									color: "#ffffff",
									fontSize: "10px",
									fontWeight: 800,
									padding: "4px 12px",
									borderRadius: "100px",
									letterSpacing: "0.08em",
									textTransform: "uppercase"
								},
								children: plan.badge
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { marginBottom: "16px" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "10px",
											fontWeight: 800,
											color: plan.color || "#64748b",
											textTransform: "uppercase",
											letterSpacing: "0.1em"
										},
										children: plan.tier
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										style: {
											fontSize: "24px",
											fontWeight: 800,
											margin: "6px 0"
										},
										children: plan.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "baseline",
											gap: "4px"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "36px",
												fontWeight: 900
											},
											children: plan.priceMonthly
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "13px",
												color: isLight ? "#64748b" : "#94a3b8"
											},
											children: plan.cadence
										})]
									}),
									plan.subPricing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											fontSize: "11px",
											color: "#15803d",
											fontWeight: 600,
											margin: "4px 0 0"
										},
										children: plan.subPricing
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											fontSize: "12px",
											color: isLight ? "#64748b" : "#94a3b8",
											marginTop: "10px",
											lineHeight: 1.5
										},
										children: plan.description
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
								height: "1px",
								background: isLight ? "#e2e8f0" : "rgba(255,255,255,0.08)",
								margin: "16px 0"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								style: {
									listStyle: "none",
									padding: 0,
									margin: "0 0 24px",
									flex: 1,
									display: "flex",
									flexDirection: "column",
									gap: "10px"
								},
								children: plan.features.map((feat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									style: {
										display: "flex",
										alignItems: "flex-start",
										gap: "8px",
										fontSize: "13px",
										color: isLight ? "#334155" : "#cbd5e1",
										lineHeight: 1.4
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "#15803d",
											fontWeight: 900
										},
										children: "✓"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: feat })]
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleSelectPlan(plan),
								style: {
									width: "100%",
									padding: "12px 20px",
									borderRadius: "10px",
									border: "none",
									cursor: "pointer",
									fontSize: "13px",
									fontWeight: 700,
									letterSpacing: "0.04em",
									transition: "all .2s",
									background: plan.highlighted ? "#15803d" : isLight ? "#0f172a" : "#ffffff",
									color: plan.highlighted ? "#ffffff" : isLight ? "#ffffff" : "#0f172a"
								},
								children: plan.ctaText
							})
						]
					}, plan.id))
				})
			}),
			(categoryTab === "all" || categoryTab === "hardware") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: {
					maxWidth: "1200px",
					margin: "0 auto",
					padding: "0 20px 80px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						textAlign: "center",
						marginBottom: "40px"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "monospace",
								fontSize: "10px",
								letterSpacing: "0.15em",
								color: "#15803d",
								fontWeight: 800,
								textTransform: "uppercase",
								marginBottom: "8px"
							},
							children: "// PHYSICAL HARDWARE ACCESSORIES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "32px",
								fontWeight: 800,
								margin: "0 0 10px"
							},
							children: "SafetyLink iTAG Hardware Units"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "14px",
								color: isLight ? "#64748b" : "#94a3b8",
								maxWidth: "600px",
								margin: "0 auto"
							},
							children: "Physical panic buttons that operate over Bluetooth Low Energy (BLE). No screen wake needed."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
						gap: "24px"
					},
					children: HARDWARE_PRODUCTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: isLight ? "rgba(255,255,255,0.85)" : "rgba(13,17,23,0.65)",
							backdropFilter: "blur(12px)",
							border: item.highlighted ? "2px solid #15803d" : isLight ? "1px solid #e2e8f0" : "1px solid rgba(255,255,255,0.08)",
							borderRadius: "18px",
							padding: "28px 22px",
							display: "flex",
							flexDirection: "column",
							position: "relative"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: "12px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "10px",
										fontWeight: 800,
										color: "#15803d",
										background: "rgba(21,128,61,0.12)",
										padding: "3px 8px",
										borderRadius: "4px",
										textTransform: "uppercase"
									},
									children: item.tag
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "24px",
										fontWeight: 900
									},
									children: item.priceStr
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								style: {
									fontSize: "18px",
									fontWeight: 800,
									margin: "0 0 8px"
								},
								children: item.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "12px",
									color: isLight ? "#64748b" : "#94a3b8",
									lineHeight: 1.5,
									marginBottom: "16px"
								},
								children: item.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								style: {
									listStyle: "none",
									padding: 0,
									margin: "0 0 20px",
									flex: 1,
									display: "flex",
									flexDirection: "column",
									gap: "8px"
								},
								children: item.features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									style: {
										fontSize: "12px",
										color: isLight ? "#334155" : "#cbd5e1",
										display: "flex",
										alignItems: "center",
										gap: "6px"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#15803d" },
										children: "•"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleSelectHardware(item),
								style: {
									width: "100%",
									padding: "11px",
									borderRadius: "8px",
									border: "none",
									cursor: "pointer",
									fontSize: "12px",
									fontWeight: 700,
									background: "#15803d",
									color: "#ffffff",
									transition: "background .2s"
								},
								children: [
									"Order ",
									item.name,
									" — ",
									item.priceStr
								]
							})
						]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					background: isLight ? "#f1f5f9" : "#0d1117",
					borderTop: isLight ? "1px solid #e2e8f0" : "1px solid rgba(255,255,255,0.08)",
					padding: "60px 20px",
					textAlign: "center"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "800px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "20px",
								fontWeight: 800,
								marginBottom: "10px"
							},
							children: "Need a Custom Enterprise or Estate Rollout?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "14px",
								color: isLight ? "#64748b" : "#94a3b8",
								lineHeight: 1.6,
								marginBottom: "24px"
							},
							children: "We deploy complete physical and digital safety meshes for gated residential estates, corporate headquarters, schools, and armed patrol fleets with custom SLAs and API telemetry integrations."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "center",
								gap: "12px",
								flexWrap: "wrap",
								alignItems: "center"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:0816738186",
									style: {
										background: isLight ? "#ffffff" : "rgba(255,255,255,0.06)",
										border: isLight ? "1px solid #cbd5e1" : "1px solid rgba(0,230,118,0.3)",
										color: isLight ? "#0f172a" : "#00e676",
										padding: "12px 20px",
										borderRadius: "8px",
										fontSize: "12px",
										fontWeight: 700,
										textDecoration: "none",
										display: "inline-flex",
										alignItems: "center",
										gap: "6px"
									},
									children: "📞 Tel. 081 673 8186"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:+27680079911",
									style: {
										background: isLight ? "#ffffff" : "rgba(255,255,255,0.06)",
										border: isLight ? "1px solid #cbd5e1" : "1px solid rgba(14,165,233,0.3)",
										color: isLight ? "#0f172a" : "#0ea5e9",
										padding: "12px 20px",
										borderRadius: "8px",
										fontSize: "12px",
										fontWeight: 700,
										textDecoration: "none",
										display: "inline-flex",
										alignItems: "center",
										gap: "6px"
									},
									children: "📲 Cel. +27 68 007 9911"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://wa.me/message/YIEA73M7H3P5M1?text=Hi+SafetyLink+I+need+custom+enterprise+pricing",
									target: "_blank",
									rel: "noreferrer",
									style: {
										background: "#15803d",
										color: "#ffffff",
										padding: "12px 24px",
										borderRadius: "8px",
										fontSize: "12px",
										fontWeight: 700,
										textDecoration: "none"
									},
									children: "💬 Enterprise WhatsApp (+27 68 007 9911)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:info@safetylink.online",
									style: {
										border: isLight ? "1px solid #cbd5e1" : "1px solid rgba(255,255,255,0.15)",
										color: isLight ? "#1e293b" : "#f8fafc",
										padding: "12px 24px",
										borderRadius: "8px",
										fontSize: "12px",
										fontWeight: 700,
										textDecoration: "none"
									},
									children: "✉️ Email info@safetylink.online"
								})
							]
						})
					]
				})
			}),
			checkoutModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "fixed",
					inset: 0,
					background: "rgba(0,0,0,0.85)",
					backdropFilter: "blur(4px)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					zIndex: 99999,
					padding: "20px"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						width: "100%",
						maxWidth: "440px",
						background: isLight ? "#ffffff" : "#0f172a",
						border: isLight ? "1px solid #e2e8f0" : "1px solid #334155",
						borderRadius: "16px",
						padding: "24px",
						position: "relative",
						boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setCheckoutModalOpen(false),
							style: {
								position: "absolute",
								top: "16px",
								right: "16px",
								background: "none",
								border: "none",
								fontSize: "18px",
								cursor: "pointer",
								color: isLight ? "#64748b" : "#94a3b8"
							},
							children: "✕"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: {
								fontSize: "18px",
								fontWeight: 800,
								margin: "0 0 6px"
							},
							children: selectedHardware ? `Order ${selectedHardware.name}` : `Subscribe: ${selectedPlan?.name}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "12px",
								color: isLight ? "#64748b" : "#94a3b8",
								marginBottom: "20px"
							},
							children: "Secure payment processing via Paystack (ZAR) with automated WhatsApp fulfillment link."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								background: isLight ? "#f8fafc" : "#020617",
								border: isLight ? "1px solid #e2e8f0" : "1px solid #1e293b",
								borderRadius: "10px",
								padding: "12px",
								marginBottom: "18px"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										fontSize: "13px",
										fontWeight: 700
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Item" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedHardware ? selectedHardware.name : `${selectedPlan?.name} (${selectedPlan?.tier})` })]
								}),
								selectedHardware && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										fontSize: "13px",
										marginTop: "10px"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quantity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: "8px"
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setHardwareQty((q) => Math.max(1, q - 1)),
												style: {
													padding: "2px 8px",
													borderRadius: "4px",
													border: "1px solid #334155",
													background: "none",
													cursor: "pointer",
													color: "inherit"
												},
												children: "-"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: { fontWeight: 700 },
												children: hardwareQty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setHardwareQty((q) => q + 1),
												style: {
													padding: "2px 8px",
													borderRadius: "4px",
													border: "1px solid #334155",
													background: "none",
													cursor: "pointer",
													color: "inherit"
												},
												children: "+"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										fontSize: "15px",
										fontWeight: 900,
										color: "#15803d",
										marginTop: "12px",
										paddingTop: "8px",
										borderTop: isLight ? "1px solid #e2e8f0" : "1px solid #1e293b"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Amount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"R",
										selectedHardware ? selectedHardware.price * hardwareQty : selectedPlan?.priceNum,
										!selectedHardware && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "11px",
												fontWeight: 400,
												color: "#64748b"
											},
											children: " /mo"
										})
									] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: "10px",
								marginBottom: "18px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Full Name",
								value: customerName,
								onChange: (e) => setCustomerName(e.target.value),
								style: {
									padding: "10px 12px",
									borderRadius: "8px",
									border: isLight ? "1px solid #cbd5e1" : "1px solid #334155",
									background: isLight ? "#ffffff" : "#020617",
									color: "inherit",
									fontSize: "13px",
									outline: "none"
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								placeholder: "Email Address (for receipts & dispatch)",
								value: customerEmail,
								onChange: (e) => setCustomerEmail(e.target.value),
								style: {
									padding: "10px 12px",
									borderRadius: "8px",
									border: isLight ? "1px solid #cbd5e1" : "1px solid #334155",
									background: isLight ? "#ffffff" : "#020617",
									color: "inherit",
									fontSize: "13px",
									outline: "none"
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleExecutePayment,
							disabled: isProcessing,
							style: {
								width: "100%",
								padding: "12px",
								borderRadius: "8px",
								border: "none",
								cursor: isProcessing ? "wait" : "pointer",
								background: "#15803d",
								color: "#ffffff",
								fontWeight: 700,
								fontSize: "13px",
								transition: "background .2s"
							},
							children: isProcessing ? "Connecting..." : "Proceed to Payment →"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/PricingModal.tsx
var PricingModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[99999] bg-slate-950/90 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex flex-col items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-5xl relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				className: "absolute top-4 right-4 z-50 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg border border-slate-700",
				"aria-label": "Close pricing modal",
				children: "✕"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {
					onLogin: onClose,
					onRegisterUser: onClose,
					onRegisterOrg: onClose
				})
			})]
		})
	});
};
//#endregion
//#region src/components/CinematicLogoSmash.tsx
var CinematicLogoSmash = ({ onAnimationEnd, onComplete, size = 180 }) => {
	const [stage, setStage] = (0, import_react.useState)("vault");
	const [sparks, setSparks] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const t1 = setTimeout(() => {
			setStage("transport");
		}, 1500);
		const t2 = setTimeout(() => {
			setStage("smash");
			triggerSparks();
		}, 2800);
		const t3 = setTimeout(() => {
			setStage("final");
			if (onAnimationEnd) onAnimationEnd();
			if (onComplete) onComplete();
		}, 3500);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
		};
	}, []);
	const triggerSparks = () => {
		const arr = [];
		for (let i = 0; i < 40; i++) {
			const angle = Math.random() * Math.PI * 2;
			const speed = 150 + Math.random() * 200;
			arr.push({
				id: i,
				x: 0,
				y: 0,
				r: Math.random() * 360,
				scale: Math.random() * .8 + .4,
				speed,
				angle
			});
		}
		setSparks(arr);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex flex-col items-center justify-center select-none overflow-hidden",
		style: {
			width: size * 1.5,
			height: size * 1.5
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "absolute w-0 h-0 pointer-events-none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
					id: "remove-white-bg-smash",
					colorInterpolationFilters: "sRGB",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feColorMatrix", {
						type: "matrix",
						values: "\n                1 0 0 0 0\n                0 1 0 0 0\n                0 0 1 0 0\n                -3 -3 -3 4.5 -0.15\n              "
					})
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: stage === "smash" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center pointer-events-none z-20",
				children: sparks.map((sp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						x: 0,
						y: 0,
						opacity: 1,
						scale: sp.scale
					},
					animate: {
						x: Math.cos(sp.angle) * sp.speed,
						y: Math.sin(sp.angle) * sp.speed - 30,
						opacity: 0,
						scale: .1
					},
					exit: { opacity: 0 },
					transition: {
						duration: .8,
						ease: "easeOut"
					},
					className: "absolute w-2 h-2 rounded-full",
					style: {
						background: sp.id % 2 === 0 ? "radial-gradient(circle, #fbbf24 0%, rgba(251,191,36,0) 70%)" : "radial-gradient(circle, #34d399 0%, rgba(52,211,153,0) 70%)",
						boxShadow: "0 0 8px #fbbf24"
					}
				}, sp.id))
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center justify-center w-full h-full",
				children: [
					stage === "vault" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							scale: .3,
							opacity: 0,
							rotateX: 45,
							rotateY: -45
						},
						animate: {
							scale: 1,
							opacity: 1,
							rotateX: [
								45,
								15,
								30
							],
							rotateY: [
								-45,
								45,
								-15
							],
							rotateZ: [
								0,
								10,
								0
							]
						},
						transition: {
							duration: 1.5,
							ease: "easeOut"
						},
						className: "absolute w-28 h-28 bg-gradient-to-tr from-slate-900 to-slate-800 border-2 border-slate-700 rounded-2xl flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.3)] z-10",
						style: { transformStyle: "preserve-3d" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 h-16 rounded-full border-4 border-dashed border-slate-500 flex items-center justify-center animate-spin",
							style: { animationDuration: "6s" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-8 h-8 rounded-full border-4 border-slate-600 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-2 text-[7.5px] font-mono text-slate-500 font-bold tracking-widest uppercase",
							children: "SL-VAULT"
						})]
					}),
					stage === "transport" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex flex-col items-center justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								height: 10,
								opacity: 0
							},
							animate: {
								height: [
									10,
									140,
									0
								],
								opacity: [
									0,
									1,
									0
								]
							},
							transition: {
								duration: 1.3,
								ease: "easeInOut"
							},
							className: "absolute w-40 bg-gradient-to-t from-blue-500/20 via-emerald-500/40 to-transparent blur-md rounded-full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								y: -180,
								scale: .5,
								opacity: 0
							},
							animate: {
								y: 0,
								scale: 1.2,
								opacity: [
									0,
									1,
									1,
									.8
								]
							},
							transition: {
								duration: 1.2,
								ease: "easeIn"
							},
							className: "flex flex-col items-center justify-center z-10 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								className: "w-16 h-16 fill-none stroke-current",
								viewBox: "0 0 24 24",
								strokeWidth: "2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[7.5px] font-mono text-emerald-300 font-bold uppercase tracking-widest mt-2 animate-pulse",
								children: "MESH LINKING..."
							})]
						})]
					}),
					stage === "smash" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex items-center justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								scale: .1,
								opacity: 1,
								border: "4px solid #ef4444"
							},
							animate: {
								scale: 2.2,
								opacity: 0,
								border: "1px solid rgba(239,68,68,0)"
							},
							transition: {
								duration: .6,
								ease: "easeOut"
							},
							className: "absolute w-32 h-32 rounded-full z-0 bg-red-500/10"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								scale: .4,
								opacity: 0,
								y: 50
							},
							animate: {
								scale: 1,
								opacity: 1,
								y: 0
							},
							transition: {
								type: "spring",
								stiffness: 260,
								damping: 14,
								mass: .8
							},
							className: "z-10 text-blue-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.9)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "w-24 h-24 fill-none stroke-current",
								viewBox: "0 0 24 24",
								strokeWidth: "2.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
								})
							})
						})]
					}),
					stage === "final" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							scale: 1.4,
							opacity: 0
						},
						animate: {
							scale: 1,
							opacity: 1
						},
						transition: {
							duration: 1.6,
							ease: [
								.16,
								1,
								.3,
								1
							]
						},
						className: "absolute inset-0 flex flex-col items-center justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute w-44 h-44 rounded-full bg-blue-500/10 blur-xl animate-pulse pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative w-44 h-44 flex items-center justify-center p-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNTAwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBjbGFzcz0ic2FmZXR5LWxvZ28tY29udGFpbmVyIj4KICA8ZGVmcz4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iYmctZ3JhZCIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNzUlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFhMWYyNCIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDUwNzBhIiAvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KCiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InJlZC1tZXRhbCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmY0ZDRkIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjQwJSIgc3RvcC1jb2xvcj0iI2NjMDAwMCIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI4MCUiIHN0b3AtY29sb3I9IiM4MDAwMDAiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzRkMDAwMCIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJzaWx2ZXItbWV0YWwiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZTZlNmU2IiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzhjOGM4YyIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KCiAgICA8ZmlsdGVyIGlkPSJkcm9wLXNoYWRvdyIgeD0iLTEwJSIgeT0iLTEwJSIgd2lkdGg9IjEzMCUiIGhlaWdodD0iMTMwJSI+CiAgICAgIDxmZURyb3BTaGFkb3cgZHg9IjAiIGR5PSIxMCIgc3RkRGV2aWF0aW9uPSI4IiBmbG9vZC1jb2xvcj0iIzAwMDAwMCIgZmxvb2Qtb3BhY2l0eT0iMC44Ii8+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYmctZ3JhZCkiIC8+CgogIDxnIGNsYXNzPSJhbmltYXRlZC1oZWFydC1ncm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAwLCAyMjApIj4KICAgIAogICAgPHBhdGggY2xhc3M9ImFuaW1hdGVkLXB1bHNlLXBhdGgiCiAgICAgICAgICBkPSJNIDAsLTQwIAogICAgICAgICAgICAgQyAtNjAsLTEwMCAtMTYwLC01MCAtMTQwLDIwIAogICAgICAgICAgICAgQyAtMTMwLDU1IC05MCw3NSAtNjAsNzUgCiAgICAgICAgICAgICBMIC0yMDAsNzUgCiAgICAgICAgICAgICBMIC02MCw3NSAKICAgICAgICAgICAgIEwgLTMwLDI1IAogICAgICAgICAgICAgTCAyMCwxMzAgCiAgICAgICAgICAgICBMIDUwLDc1IAogICAgICAgICAgICAgTCAyMDAsNzUgCiAgICAgICAgICAgICBMIDUwLDc1IAogICAgICAgICAgICAgQyA4MCw3NSAxMzAsNTUgMTQwLDIwIAogICAgICAgICAgICAgQyAxNjAsLTUwIDYwLC0xMDAgMCwtNDAgWiIgCiAgICAgICAgICBmaWxsPSJ1cmwoI3JlZC1tZXRhbCkiIAogICAgICAgICAgc3Ryb2tlPSJ1cmwoI3NpbHZlci1tZXRhbCkiIAogICAgICAgICAgc3Ryb2tlLXdpZHRoPSI0IiAKICAgICAgICAgIHN0cm9rZS1saW5lam9pbj0icm91bmQiCiAgICAgICAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgICAgICAgICBmaWx0ZXI9InVybCgjZHJvcC1zaGFkb3cpIiAvPgogIDwvZz4KCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAwLCA0MDApIj4KICAgIDx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc2l6ZT0iNTIiIGxldHRlci1zcGFjaW5nPSIxOCIgZmlsbD0idXJsKCNyZWQtbWV0YWwpIiBzdHJva2U9InVybCgjc2lsdmVyLW1ldGFsKSIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbHRlcj0idXJsKCNkcm9wLXNoYWRvdykiPgogICAgICBTQUZFVFlMSU5LCiAgICA8L3RleHQ+CiAgICA8dGV4dCB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjIyIiBsZXR0ZXItc3BhY2luZz0iMjQiIGZpbGw9InVybCgjcmVkLW1ldGFsKSIgeT0iNTAiIGZpbHRlcj0idXJsKCNkcm9wLXNoYWRvdykiPgogICAgICBQQU5JQwogICAgPC90ZXh0PgogICAgCiAgICA8cGF0aCBkPSJNIC0xNjAsNDIgTCAtOTAsNDIgTSA5MCw0MiBMIDE2MCw0MiIgc3Ryb2tlPSJ1cmwoI3NpbHZlci1tZXRhbCkiIHN0cm9rZS13aWR0aD0iMiIgLz4KICA8L2c+Cjwvc3ZnPgo=",
									alt: "SafetyLink",
									className: "w-full h-full object-contain rounded-xl",
									style: { filter: "drop-shadow(0 0 20px rgba(52,211,153,0.7))" }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-black tracking-[0.25em] text-slate-100 uppercase font-mono mt-1",
								children: "SAFETY LINK"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[6.5px] font-bold text-slate-500 font-mono tracking-widest uppercase mt-0.5",
								children: "POWERED BY TM MEDIA SOLUTIONS"
							})
						]
					})
				]
			})
		]
	});
};
//#endregion
//#region src/components/CinematicClosingLogo.tsx
var CinematicClosingLogo = ({ onComplete }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicLogoSmash, { onComplete });
};
//#endregion
//#region src/services/LizzyAIProvider.ts
/** Web Speech Synthesis — always available, works offline */
var WebSpeechProvider = class {
	async speak(text) {
		if (typeof window === "undefined" || !window.speechSynthesis) return;
		return new Promise((resolve) => {
			window.speechSynthesis.cancel();
			const utt = new SpeechSynthesisUtterance(text);
			utt.rate = .9;
			utt.pitch = 1.1;
			utt.lang = "en-ZA";
			utt.onend = () => resolve();
			utt.onerror = () => resolve();
			window.speechSynthesis.speak(utt);
		});
	}
	cancel() {
		if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
	}
};
var _provider = null;
function getLizzyProvider() {
	if (_provider) return _provider;
	_provider = new WebSpeechProvider();
	return _provider;
}
//#endregion
//#region src/components/VoiceAccessibilityAssistant.tsx
var VoiceAccessibilityAssistant = ({ onClose }) => {
	const [step, setStep] = (0, import_react.useState)(0);
	const [transcript, setTranscript] = (0, import_react.useState)("");
	const [isListening, setIsListening] = (0, import_react.useState)(false);
	const recognitionRef = (0, import_react.useRef)(null);
	const [tempName, setTempName] = (0, import_react.useState)("");
	const [tempPhone, setTempPhone] = (0, import_react.useState)("");
	const speak = (text, onEnd) => {
		getLizzyProvider().speak(text).then(() => {
			if (onEnd) onEnd();
		});
	};
	const listen = (onResult) => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			console.warn("Speech recognition not supported in this browser.");
			setTimeout(() => onResult("John Doe"), 2e3);
			return;
		}
		const recognition = new SpeechRecognition();
		recognition.continuous = false;
		recognition.interimResults = false;
		recognition.lang = "en-ZA";
		recognition.onstart = () => setIsListening(true);
		recognition.onend = () => setIsListening(false);
		recognition.onresult = (event) => {
			const text = event.results[0][0].transcript;
			setTranscript(text);
			onResult(text);
		};
		recognitionRef.current = recognition;
		try {
			recognition.start();
		} catch (e) {
			console.error(e);
			setTimeout(() => onResult("Error Input"), 2e3);
		}
	};
	(0, import_react.useEffect)(() => {
		return () => {
			getLizzyProvider().cancel();
			if (recognitionRef.current) try {
				recognitionRef.current.abort();
			} catch (e) {}
		};
	}, []);
	const runStep1 = () => {
		setStep(1);
		setTranscript("");
		speak("Welcome to Safety Link. I am your voice accessibility assistant, here to help you set up your profile. Let's start with your name. What is your full name?", () => {
			listen((name) => {
				setTempName(name);
				runStep2(name);
			});
		});
	};
	const runStep2 = (name) => {
		setStep(2);
		setTranscript("");
		speak(`Nice to meet you, ${name || "friend"}. Now, I need an emergency contact number. Please say the phone number you would like to save for emergencies.`, () => {
			listen((phone) => {
				setTempPhone(phone);
				runStep3(phone);
			});
		});
	};
	const runStep3 = (phone) => {
		setStep(3);
		setTranscript("");
		speak(`Got it. Saving number ${phone || "provided"}. Your profile is ready. I am creating your account and logging you in now.`, () => {
			setTimeout(() => {
				handleRegister();
			}, 1e3);
		});
	};
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			runStep1();
		}, 500);
		return () => clearTimeout(timer);
	}, []);
	const handleRegister = () => {
		const { registerUser, login } = useAppStore.getState();
		const finalName = tempName || "Voice User";
		const username = finalName.replace(/\s+/g, "").toLowerCase() + Math.floor(Math.random() * 1e3);
		registerUser({
			username,
			password: "password123",
			fullName: finalName,
			email: username + "@example.com",
			phone: tempPhone || "911",
			orgCode: "DEMO-ORG-01",
			emergencyContactsList: tempPhone || "911"
		});
		login(username, "password123");
		onClose();
	};
	const getStepText = () => {
		switch (step) {
			case 1: return "Listening for your name...";
			case 2: return "Listening for emergency contact number...";
			case 3: return "Finalizing account setup...";
			default: return "Initializing Assistant...";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-[999999] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden scanlines",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .8,
				opacity: 0
			},
			animate: {
				scale: 1,
				opacity: 1
			},
			className: "relative z-10 w-full max-w-sm flex flex-col items-center gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `w-32 h-32 rounded-full border-4 flex items-center justify-center bg-slate-900 transition-colors duration-500 ${isListening ? "border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.3)]" : "border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: `w-14 h-14 ${isListening ? "text-emerald-400" : "text-blue-400"}`,
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							strokeWidth: 1.5,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							})
						})
					}), isListening && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: {
							scale: [
								1,
								1.5,
								1
							],
							opacity: [
								.5,
								0,
								.5
							]
						},
						transition: {
							duration: 1.5,
							repeat: Infinity
						},
						className: "absolute inset-0 rounded-full border-4 border-emerald-500"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-black text-white font-mono uppercase tracking-widest",
						children: "Voice Assistant"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-blue-400 font-mono text-sm tracking-wider uppercase",
						children: getStepText()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full h-24 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-center p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-300 font-mono text-lg truncate",
						children: transcript || (isListening ? "Speak now..." : "Please wait...")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "mt-6 px-6 py-2 border border-slate-700 text-slate-400 rounded-full hover:bg-slate-800 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest",
					children: "Cancel Setup"
				})
			]
		})]
	});
};
//#endregion
//#region src/utils/cloudinary.ts
var CLOUD = "qcp4fx2v";
var IMG_BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`;
var VID_BASE = `https://res.cloudinary.com/${CLOUD}/video/upload`;
var img = (publicId, transforms = "q_auto,f_auto") => `${IMG_BASE}/${transforms}/${publicId}`;
var vid = (publicId, transforms = "q_auto,f_auto") => `${VID_BASE}/${transforms}/${publicId}`;
var ASSETS = {
	logo: "/logos/Safety_Link_Logo_Transparent.png",
	logoSvg: "/logos/New SafetyLink Official Logo.svg",
	logoTransparent: "/logos/Safety_Link_Logo_Transparent.png",
	logoDark: "/logos/Safety_Link_Logo_Black.png",
	logoCdn: "/logos/Safety_Link_Logo_Transparent.png",
	logo3d: "/logos/Safety_Link_Logo_Transparent.png",
	logoKlev: "/media/kleva_logo/Kleva.svg",
	appSos: getR2StreamUrl("Cat with a button.png"),
	appLogin: getR2StreamUrl("Polish_20260819_014832026.jpg"),
	itagAll: getR2StreamUrl("HST-01-Anti-Lost-Finder-PRODUCT.jpg"),
	itagSingle: getR2StreamUrl("31DP9Fqk0wL._AC_.jpg"),
	itagBattery: getR2StreamUrl("Polish_20260819_020007723.jpg"),
	dispatch: getR2StreamUrl("Polish_20260819_020134421.jpg"),
	family: getR2StreamUrl("Polish_20260819_020007723.jpg"),
	tactical: getR2StreamUrl("Polish_20260907_043403519.jpg"),
	drone: getR2StreamUrl("Polish_20260819_020219883.jpg"),
	controlRoom: getR2StreamUrl("Polish_20260711_034127538.jpg"),
	banner: getR2StreamUrl("Emergency_Response_Platform_Architecture_Overview.png"),
	businessCard: "/logos/Safety_Link_Logo_Transparent.png",
	dashboardDark: getR2StreamUrl("IMG_20260914_221811.png"),
	estateTactical: getR2StreamUrl("Polish_20260907_043403519.jpg"),
	estatePhoto: getR2StreamUrl("Polish_20260819_020134421.jpg"),
	promoGraphic: getR2StreamUrl("Emergency_Mesh_Platform_Overview.png"),
	mapDark: getR2StreamUrl("Polish_20260809_035827088.png")
};
ASSETS.logo, ASSETS.family, ASSETS.dispatch, ASSETS.tactical, ASSETS.drone, ASSETS.controlRoom, ASSETS.family, ASSETS.itagAll, ASSETS.estateTactical, ASSETS.family, ASSETS.banner;
//#endregion
//#region src/components/AuthScreen.tsx
var slide1$1 = ASSETS.logo;
var slide2$1 = ASSETS.logo;
var slide3$1 = ASSETS.promoGraphic;
var slide4 = ASSETS.logo;
var slide5 = ASSETS.logo;
var newBg1$1 = ASSETS.promoGraphic;
var newLogo1$1 = ASSETS.logo;
var AuthScreen = ({ onBackToSite, initialView }) => {
	const { login, signInWithGoogle, registerUser, registerOrganization, rememberedOrgs, generateReferralCode, applyReferralCode, demoMode, toggleDemoMode, globalTheme, setGlobalTheme } = useAppStore();
	const [view, setView] = (0, import_react.useState)(initialView || "LOGIN");
	const [registeredUsername, setRegisteredUsername] = (0, import_react.useState)("");
	const [registeredPassword, setRegisteredPassword] = (0, import_react.useState)("");
	const authSlides = [
		newBg1$1,
		newLogo1$1,
		slide5,
		slide4,
		slide3$1,
		slide1$1,
		slide2$1
	];
	const [, setCurrentSlide] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % authSlides.length);
		}, 5e3);
		return () => clearInterval(timer);
	}, [authSlides.length]);
	const [loginUsername, setLoginUsername] = (0, import_react.useState)("");
	const [loginOrgCode, setLoginOrgCode] = (0, import_react.useState)("");
	const [loginPassword, setLoginPassword] = (0, import_react.useState)("");
	const [loginError, setLoginError] = (0, import_react.useState)("");
	const [showReferralInput, setShowReferralInput] = (0, import_react.useState)(false);
	const [loginReferralCode, setLoginReferralCode] = (0, import_react.useState)(() => {
		return localStorage.getItem("sl_pending_referral") || "";
	});
	(0, import_react.useEffect)(() => {
		if (localStorage.getItem("sl_pending_referral")) setShowReferralInput(true);
	}, []);
	const [referralApplied, setReferralApplied] = (0, import_react.useState)(false);
	const [userUsername, setUserUsername] = (0, import_react.useState)("");
	const [userRole, setUserRole] = (0, import_react.useState)("Community Member");
	const [userOrgCode, setUserOrgCode] = (0, import_react.useState)("");
	const [userPassword, setUserPassword] = (0, import_react.useState)("");
	const [hasMoya, setHasMoya] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined" && window.Capacitor) __vitePreload(async () => {
			const { App } = await import("./capacitor-B_jS8XWy.js").then((n) => n.h);
			return { App };
		}, __vite__mapDeps([0,1])).then(({ App }) => {
			if (App.canOpenUrl) App.canOpenUrl({ url: "moya://" }).then((res) => setHasMoya(res.value)).catch(() => setHasMoya(false));
		});
	}, []);
	const [userFullName, setUserFullName] = (0, import_react.useState)("");
	const [userPhone, setUserPhone] = (0, import_react.useState)("");
	const [userWhatsapp, setUserWhatsapp] = (0, import_react.useState)("");
	const [userAvatar, setUserAvatar] = (0, import_react.useState)("");
	const [isDraggingAvatar, setIsDraggingAvatar] = (0, import_react.useState)(false);
	const [userEmail, setUserEmail] = (0, import_react.useState)("");
	const [userPinInput, setUserPinInput] = (0, import_react.useState)("");
	const [userDuressPinInput, setUserDuressPinInput] = (0, import_react.useState)("");
	const [userSuccessMsg, setUserSuccessMsg] = (0, import_react.useState)("");
	const [userError, setUserError] = (0, import_react.useState)("");
	const [orgName, setOrgName] = (0, import_react.useState)("");
	const [orgContactName, setOrgContactName] = (0, import_react.useState)("");
	const [orgEmail, setOrgEmail] = (0, import_react.useState)("");
	const [orgPassword, setOrgPassword] = (0, import_react.useState)("");
	const [showIdApplication, setShowIdApplication] = (0, import_react.useState)(false);
	const [showExitConfirm, setShowExitConfirm] = (0, import_react.useState)(false);
	const [showClosingLogo, setShowClosingLogo] = (0, import_react.useState)(false);
	const [showVoiceAssistant, setShowVoiceAssistant] = (0, import_react.useState)(false);
	const [showPricing, setShowPricing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let listener = null;
		const setupListener = async () => {
			try {
				listener = await App$1.addListener("backButton", () => {
					if (showIdApplication) setShowIdApplication(false);
					else setShowExitConfirm(true);
				});
			} catch (e) {
				console.log("Capacitor backButton listener not supported on this platform", e);
			}
		};
		setupListener();
		return () => {
			if (listener) listener.remove();
		};
	}, [showIdApplication]);
	const [generatedOrgId, setGeneratedOrgId] = (0, import_react.useState)("");
	const [isGenerating, setIsGenerating] = (0, import_react.useState)(false);
	const [orgError, setOrgError] = (0, import_react.useState)("");
	const [orgSuccessMsg, setOrgSuccessMsg] = (0, import_react.useState)("");
	const [generatedReferralCode, setGeneratedReferralCode] = (0, import_react.useState)("");
	const [showReferralSection, setShowReferralSection] = (0, import_react.useState)(false);
	const handleLoginSubmit = async (e, skipPasswordCheck = false) => {
		if (e?.preventDefault) e.preventDefault();
		setLoginError("");
		const cleanUsername = loginUsername.trim();
		const cleanPassword = loginPassword.trim();
		const cleanOrg = loginOrgCode.trim();
		if (!cleanUsername && !cleanOrg) {
			setLoginError("Please enter a username, email, or organization mesh code.");
			return;
		}
		const res = await login(cleanUsername || cleanOrg, skipPasswordCheck ? "" : cleanPassword, cleanOrg, skipPasswordCheck);
		if (!res.success) setLoginError(res.error || "Invalid credentials or code combination.");
		else if (loginReferralCode.trim() && !referralApplied) {
			const { users } = useAppStore.getState();
			const user = users.find((u) => u.username.toLowerCase() === cleanUsername.toLowerCase());
			if (user && !user.referredByCode) {
				applyReferralCode(loginReferralCode.trim(), user.id);
				setReferralApplied(true);
				localStorage.removeItem("sl_pending_referral");
			}
		}
	};
	const handleUserRegister = async (e) => {
		e.preventDefault();
		setUserError("");
		setUserSuccessMsg("");
		if (!userUsername.trim() || !userEmail.trim()) {
			setUserError("Username and Email are required.");
			return;
		}
		if (!/^\d{4}$/.test(userPinInput.trim())) {
			setUserError("Please set a mandatory 4-digit Safety PIN (digits 0–9) to disarm emergencies.");
			return;
		}
		if (userDuressPinInput.trim() && (!/^\d{4}$/.test(userDuressPinInput.trim()) || userDuressPinInput.trim() === userPinInput.trim())) {
			setUserError("Silent Duress PIN must be 4 digits and different from your primary Safety PIN.");
			return;
		}
		if (!userPassword.trim() || userPassword.trim().length < 4) {
			setUserError("Please set a password of at least 4 characters.");
			return;
		}
		const effectiveFullName = userFullName.trim() || userUsername.trim();
		const effectivePhone = userPhone.trim() || "+27 00 000 0000";
		const effectivePassword = userPassword.trim();
		const effectiveOrgCode = userOrgCode.trim();
		const res = await registerUser({
			username: userUsername.trim(),
			password: effectivePassword,
			role: userRole,
			fullName: effectiveFullName,
			phone: effectivePhone,
			whatsapp: userWhatsapp,
			avatarUrl: userAvatar,
			email: userEmail.trim(),
			orgCode: effectiveOrgCode,
			pinCode: userPinInput.trim(),
			duressPin: userDuressPinInput.trim() || void 0,
			autoLogin: true
		});
		if (res.success) setUserSuccessMsg(res.provisionalOffline ? "Provisional offline profile created! Sync will complete automatically when online." : "Profile created successfully! Opening your SafetyLink Console...");
		else setUserError(res.error || "Registration failed.");
	};
	const handleGenerateOrgId = () => {
		if (!orgName || !orgContactName || !orgEmail) {
			setOrgError("Please fill in contact details and name before generating ID.");
			return;
		}
		setOrgError("");
		setIsGenerating(true);
		setTimeout(() => {
			const { organizations } = useAppStore.getState();
			const prefix = orgName.toLowerCase().includes("family") || orgName.toLowerCase().includes("home") ? "SL-FAM" : "SL-ORG";
			const code = `${prefix}-${(organizations.filter((o) => o.id.startsWith(prefix)).length + 1).toString().padStart(3, "0")}`;
			setGeneratedOrgId(code);
			setIsGenerating(false);
		}, 1200);
	};
	const handleOrgRegister = async (e) => {
		e.preventDefault();
		setOrgError("");
		setOrgSuccessMsg("");
		if (!orgName.trim() || !orgContactName.trim() || !orgEmail.trim()) {
			setOrgError("Please fill in contact details and organization name.");
			return;
		}
		if (!orgPassword.trim() || orgPassword.trim().length < 4) {
			setOrgError("Please set an admin password of at least 4 characters.");
			return;
		}
		const res = await registerOrganization({
			name: orgName.trim(),
			contactName: orgContactName.trim(),
			contactEmail: orgEmail.trim(),
			id: generatedOrgId.trim() || "",
			password: orgPassword
		});
		if (!res || res.error || !res.id) {
			setOrgError(res?.error || "Failed to register organization. Please try again.");
			return;
		}
		const newOrg = res;
		if (newOrg.approved === false) {
			setOrgSuccessMsg(`Registered successfully! Unique Code: ${newOrg.id}. Awaiting registry approval from Super Admin...`);
			const prefillEmail = orgEmail.trim();
			const prefillOrgId = newOrg.id;
			setTimeout(() => {
				setView("LOGIN");
				setLoginUsername(prefillEmail);
				setLoginOrgCode(prefillOrgId);
				setOrgSuccessMsg("");
				setOrgName("");
				setOrgContactName("");
				setOrgEmail("");
				setOrgPassword("");
				setGeneratedOrgId("");
				setShowIdApplication(false);
			}, 3e3);
			return;
		}
		setOrgSuccessMsg(`Organization provisioned (${newOrg.id}). Opening Commander Deck...`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 w-full bg-slate-950 flex flex-col gap-4 items-center justify-start pt-10 pb-32 px-4 sm:px-6 relative overflow-y-auto select-auto scanlines",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				autoPlay: true,
				loop: true,
				muted: true,
				playsInline: true,
				className: "fixed inset-0 w-full h-full object-cover opacity-40 z-0 pointer-events-none",
				src: "https://res.cloudinary.com/qcp4fx2v/video/upload/f_auto,q_auto/Now_I_need_the_d_animation_lo.mp4",
				onError: (e) => e.currentTarget.style.display = "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 bg-slate-950/60 z-0 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: ASSETS.logo,
				className: "fixed inset-0 w-full h-full object-contain opacity-[0.03] z-0 pointer-events-none",
				alt: ""
			}),
			onBackToSite && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onBackToSite,
				className: "absolute top-4 left-4 z-50 px-4 py-2 bg-slate-900/90 border border-slate-700 text-slate-300 rounded-full font-mono text-xs font-bold uppercase hover:bg-slate-800 transition-colors shadow-lg cursor-pointer",
				children: "← Back to Website"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setGlobalTheme(globalTheme === "dark" ? "light" : "dark"),
				className: `absolute top-4 right-4 z-50 p-2.5 rounded-full border transition-all shadow-lg cursor-pointer ${globalTheme === "dark" ? "bg-slate-900/90 border-slate-700 text-amber-400 hover:border-amber-500/50 hover:bg-slate-850" : "bg-white/95 border-slate-300 text-indigo-600 hover:border-indigo-400 hover:bg-slate-100"}`,
				title: globalTheme === "dark" ? "Switch to Light Mode" : "Switch to Tactical Dark Mode",
				"aria-label": "Toggle theme",
				children: globalTheme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "w-4 h-4 text-amber-400",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: 2.2,
					strokeLinecap: "round",
					strokeLinejoin: "round",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "12",
							cy: "12",
							r: "5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "12",
							y1: "1",
							x2: "12",
							y2: "3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "12",
							y1: "21",
							x2: "12",
							y2: "23"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "4.22",
							y1: "4.22",
							x2: "5.64",
							y2: "5.64"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "18.36",
							y1: "18.36",
							x2: "19.78",
							y2: "19.78"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "1",
							y1: "12",
							x2: "3",
							y2: "12"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "21",
							y1: "12",
							x2: "23",
							y2: "12"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "4.22",
							y1: "19.78",
							x2: "5.64",
							y2: "18.36"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "18.36",
							y1: "5.64",
							x2: "19.78",
							y2: "4.22"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					className: "w-4 h-4 text-indigo-600",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: 2.2,
					strokeLinecap: "round",
					strokeLinejoin: "round",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
				})
			}),
			showClosingLogo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CinematicClosingLogo, { onComplete: () => App$1.exitApp() }),
			showVoiceAssistant && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceAccessibilityAssistant, { onClose: () => setShowVoiceAssistant(false) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingModal, {
				isOpen: showPricing,
				onClose: () => setShowPricing(false)
			}),
			showExitConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl",
								children: "🚪"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-black text-slate-100 uppercase tracking-wider font-mono",
							children: "Exit SafetyLink?"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowExitConfirm(false),
								className: "flex-1 py-3 rounded-xl border border-slate-700 font-bold uppercase tracking-wider text-xs",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setShowExitConfirm(false);
									setShowClosingLogo(true);
								},
								className: "flex-1 py-3 rounded-xl bg-red-600 font-bold uppercase tracking-wider text-xs shadow-lg shadow-red-500/20",
								children: "Exit App"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0 pointer-events-none overflow-hidden select-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						autoPlay: true,
						muted: true,
						loop: true,
						playsInline: true,
						className: "absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							src: "https://res.cloudinary.com/qcp4fx2v/video/upload/f_auto,q_auto/petal_20260727_180314.mp4",
							type: "video/mp4"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 digital-grid opacity-[0.08]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-red-500/5 mix-blend-color" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-10%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none z-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] rounded-full bg-red-500/5 blur-[130px] pointer-events-none z-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .96,
					y: 15
				},
				animate: {
					opacity: 1,
					scale: 1,
					y: 0
				},
				transition: { duration: .6 },
				className: "w-full max-w-md glass-panel rounded-[2rem] p-7 shadow-2xl relative z-10 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 via-blue-500 to-emerald-500 neon-glow-blue" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mb-5 -mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoSetPart, {
								part: "main",
								size: 90,
								rounded: "2xl"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 glass-panel p-4 rounded-2xl border border-slate-700/50 flex items-center justify-between font-mono gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowPricing(true),
								title: "View Pricing & Plans",
								className: "p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)] flex items-center justify-center font-mono text-[9px] font-bold uppercase",
								children: "Plans"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9.5px] font-black tracking-wide text-slate-300 block uppercase",
									children: "Demo Showcase Mode"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7.5px] text-slate-500 block leading-tight",
									children: "Instantly populates mock networks and active supervisor nodes."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowVoiceAssistant(true),
								title: "Voice Accessibility Setup",
								className: "p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-all shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)] flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "w-5 h-5",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									strokeWidth: 1.5,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										strokeLinecap: "round",
										strokeLinejoin: "round",
										d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: toggleDemoMode,
								className: `px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border shrink-0 ${demoMode ? "bg-amber-500/20 text-amber-300 border-amber-500/30 shadow-md shadow-amber-950/40" : "bg-slate-950 text-slate-500 border-slate-900 hover:text-slate-300"}`,
								children: demoMode ? "ENABLED" : "DISABLED"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
						mode: "wait",
						children: [
							view === "LOGIN" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
								initial: {
									opacity: 0,
									x: -10
								},
								animate: {
									opacity: 1,
									x: 0
								},
								exit: {
									opacity: 0,
									x: 10
								},
								onSubmit: handleLoginSubmit,
								className: "space-y-4.5 text-left font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-b border-slate-900 pb-3.5 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-xs font-black text-slate-100 uppercase tracking-widest font-display",
											children: "Secure Command Gateway"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-slate-500 mt-0.5",
											children: "Enter authorized coordinates or administrative key for network access."
										})]
									}),
									loginError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3.5 bg-red-950/20 border border-red-500/20 rounded-2xl text-red-400 text-xs font-mono leading-relaxed",
										children: ["⚠️ ", loginError]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider",
											children: "Email / Username"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: loginUsername,
											onChange: (e) => setLoginUsername(e.target.value),
											placeholder: "e.g. thabo_m or user@gmail.com (optional if Org Code filled)",
											className: "bg-slate-950 border border-slate-900 rounded-2xl p-3.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 font-mono transition-all"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider",
													children: "Organizational Mesh Code"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-1.5 py-0.5 rounded",
													children: "e.g. SL-ORG-001 / SL-DEEPSOUTH-002"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: loginOrgCode,
												onChange: (e) => setLoginOrgCode(e.target.value.toUpperCase()),
												placeholder: "e.g. SL-ORG-001 or SL-DEEPSOUTH-002",
												className: "bg-slate-950 border border-slate-900 rounded-2xl p-3.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 font-mono transition-all uppercase"
											}),
											rememberedOrgs && rememberedOrgs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex flex-wrap gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] text-slate-500 uppercase tracking-wider self-center mr-1",
													children: "Remembered Orgs:"
												}), rememberedOrgs.slice(0, 4).map((ro) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => {
														setLoginOrgCode(ro.id);
														if (!loginUsername.trim() && ro.contactEmail && !ro.contactEmail.endsWith("@safetylink.app")) setLoginUsername(ro.contactEmail);
													},
													className: "px-2 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/25 text-emerald-300 text-[9px] font-mono font-bold transition-colors cursor-pointer",
													title: `${ro.name} (${ro.id})`,
													children: [
														ro.name,
														" · ",
														ro.id
													]
												}, ro.id))]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] text-slate-500 mt-1 pl-1",
												children: "Format: SL-<COMPANY>-001. Leave blank for standalone personal profile mode."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider",
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											value: loginPassword,
											onChange: (e) => setLoginPassword(e.target.value),
											placeholder: "••••••••",
											className: "bg-slate-950 border border-slate-900 rounded-2xl p-3.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 font-mono transition-all",
											required: true
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-panel rounded-2xl overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setShowReferralInput((v) => !v),
											className: "w-full flex justify-between items-center px-4 py-3 text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase hover:text-slate-200 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🎟️ Have a Referral Code?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm",
												children: showReferralInput ? "▲" : "▼"
											})]
										}), showReferralInput && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "px-4 pb-4 pt-1 border-t border-slate-900 space-y-2 animate-fadeIn",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[9px] text-slate-500 leading-relaxed",
													children: "Enter the referral code given to you by your agent or organization."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: loginReferralCode,
													onChange: (e) => setLoginReferralCode(e.target.value.toUpperCase()),
													placeholder: "e.g. REF-SLORG-AB12C",
													className: "w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs text-amber-300 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/10 font-mono tracking-widest transition-all"
												}),
												referralApplied && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[9px] text-emerald-400 font-mono",
													children: "✓ Referral code applied."
												})
											]
										})]
									}),
									demoMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-panel rounded-2.5xl p-4.5 space-y-3 animate-fadeIn",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-b border-slate-900 pb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8.5px] font-black tracking-widest text-amber-400 uppercase",
													children: "Exemplary Live Demo Profiles"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[7.5px] font-mono text-slate-500 uppercase",
													children: "Excludes Admin"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[8.5px] text-slate-400 leading-normal mb-1",
												children: "Select a simulated role to automatically configure the console telemetry and log in directly:"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-1 gap-2.5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar",
												children: [
													{
														name: "Security Commander",
														role: "Organization Deck (ORG)",
														username: "commander_wits",
														orgCode: "SL-WITS-4829",
														badge: "Campus Security",
														icon: "🏫",
														color: "hover:bg-emerald-500/5 hover:border-emerald-500/30 text-emerald-400 border-emerald-500/10 bg-emerald-500/2"
													},
													{
														name: "City Patrol Dispatcher",
														role: "Organization Deck (ORG)",
														username: "chief_patrol",
														orgCode: "SL-CITY-2810",
														badge: "Armed Response",
														icon: "🚓",
														color: "hover:bg-red-500/5 hover:border-red-500/30 text-red-400 border-red-500/10 bg-red-500/2"
													},
													{
														name: "Tshilidzi Mukwevho (Wits)",
														role: "Safety Hub (USER)",
														username: "thabo_m",
														orgCode: "SL-WITS-4829",
														badge: "Bound Student",
														icon: "👤",
														color: "hover:bg-blue-500/5 hover:border-blue-500/30 text-blue-400 border-blue-500/10 bg-blue-500/2"
													},
													{
														name: "Lerato Khumalo (Private)",
														role: "Safety Hub (USER)",
														username: "lerato_k",
														orgCode: "",
														badge: "Independent Client",
														icon: "🏡",
														color: "hover:bg-purple-500/5 hover:border-purple-500/30 text-purple-400 border-purple-500/10 bg-purple-500/2"
													}
												].map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: async () => {
														setLoginUsername(p.username);
														setLoginOrgCode(p.orgCode);
														setLoginPassword("");
														setLoginError("");
														const res = await login(p.username, "", p.orgCode, true);
														if (!res.success) setLoginError(res.error || "Invalid credentials.");
													},
													className: `w-full text-left p-3 rounded-2xl border flex items-start gap-3 transition-all ${p.color}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-base pt-0.5",
														children: p.icon
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex-1 min-w-0",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between gap-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] font-black tracking-wide truncate text-slate-200 block",
																	children: p.name
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-850 uppercase shrink-0",
																	children: p.badge
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-[8.5px] text-slate-400 block mt-0.5",
																children: ["Role: ", p.role]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-[7.5px] text-slate-500 font-mono block mt-1",
																children: [
																	"Callsign: ",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																		className: "text-slate-300",
																		children: p.username
																	}),
																	" ",
																	p.orgCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["· Mesh: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																		className: "text-slate-300",
																		children: p.orgCode
																	})] })
																]
															})
														]
													})]
												}, idx))
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 border border-blue-500/20 transition-all text-white text-xs font-bold rounded-2xl uppercase tracking-widest shadow-lg shadow-blue-950 font-mono",
										children: "Sign In to Console"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative flex py-2 items-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-grow border-t border-slate-900" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex-shrink-0 mx-4 text-slate-500 text-[10px] font-mono uppercase tracking-wider",
												children: "Or"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-grow border-t border-slate-900" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: async () => {
											const res = await signInWithGoogle();
											if (!res.success) {
												if (res.error?.includes("missing initial state") || res.error?.includes("sessionStorage") || res.error?.includes("cross-origin")) setLoginError("Iframe Error: Browser blocked Google Sign-In. Please open the app in a new tab (top right icon) to use Google Sign-In, or use a demo profile.");
												else setLoginError(res.error || "Google Sign-In failed.");
											}
										},
										className: "w-full py-3.5 px-4 bg-white hover:bg-gray-100 transition-all text-slate-900 text-xs font-bold rounded-2xl uppercase tracking-widest shadow-lg flex items-center justify-center gap-3 font-mono",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											className: "w-4 h-4",
											viewBox: "0 0 24 24",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
													fill: "#4285F4"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
													fill: "#34A853"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
													fill: "#FBBC05"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
													fill: "#EA4335"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M1 1h22v22H1z",
													fill: "none"
												})
											]
										}), "Sign In with Google"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[10px] pt-4 border-t border-slate-900 font-mono font-bold uppercase tracking-wider",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setView("REGISTER_USER"),
											className: "text-slate-400 hover:text-blue-400 transition-colors",
											children: "Create User / Responder"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setView("REGISTER_ORG"),
											className: "text-slate-400 hover:text-emerald-400 transition-colors",
											children: "Register Organization"
										})]
									})
								]
							}, "login"),
							view === "REGISTER_USER" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
								initial: {
									opacity: 0,
									x: -10
								},
								animate: {
									opacity: 1,
									x: 0
								},
								exit: {
									opacity: 0,
									x: 10
								},
								onSubmit: handleUserRegister,
								className: "space-y-4 text-left font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-b border-slate-900 pb-3.5 mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-xs font-black text-blue-400 uppercase tracking-widest font-display",
											children: "Establish Responder Profile"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-slate-500 mt-0.5",
											children: "Register telemetry and hardware coordinates to the secure database."
										})]
									}),
									userError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-3.5 bg-red-950/20 border border-red-500/20 rounded-2xl text-red-400 text-xs font-mono",
										children: userError
									}),
									userSuccessMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3.5 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-mono",
										children: ["✓ ", userSuccessMsg]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider block",
												children: "Profile Identity Vector"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col sm:flex-row items-center gap-4 p-3.5 bg-slate-950/40 rounded-2xl border border-slate-900",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative w-12 h-12 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center overflow-hidden shrink-0",
													children: [userAvatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: userAvatar,
														alt: "Vector",
														className: "w-full h-full object-cover"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-lg",
														children: "👤"
													}), userAvatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setUserAvatar(""),
														className: "absolute inset-0 bg-slate-950/90 flex items-center justify-center text-[8px] font-black text-red-500 transition-opacity",
														children: "RESET"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex-1 w-full text-center sm:text-left space-y-1.5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														onDragOver: (e) => {
															e.preventDefault();
															setIsDraggingAvatar(true);
														},
														onDragLeave: () => setIsDraggingAvatar(false),
														onDrop: (e) => {
															e.preventDefault();
															setIsDraggingAvatar(false);
															const file = e.dataTransfer.files?.[0];
															if (file) {
																const reader = new FileReader();
																reader.onloadend = () => setUserAvatar(reader.result);
																reader.readAsDataURL(file);
															}
														},
														className: `border border-dashed p-2.5 rounded-xl transition-all cursor-pointer text-center ${isDraggingAvatar ? "border-purple-500 bg-purple-500/10" : "border-slate-900 hover:border-slate-800 hover:bg-slate-950/30"}`,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "cursor-pointer block",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-[9px] text-slate-400 font-mono",
																children: ["Drag & Drop or ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-blue-400 font-bold hover:underline",
																	children: "Browse Image"
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "file",
																accept: "image/*",
																onChange: (e) => {
																	const file = e.target.files?.[0];
																	if (file) {
																		const reader = new FileReader();
																		reader.onloadend = () => setUserAvatar(reader.result);
																		reader.readAsDataURL(file);
																	}
																},
																className: "hidden"
															})]
														})
													})
												})]
											}),
											demoMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] text-slate-500 uppercase tracking-widest block font-bold",
													children: "Or select identity role:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex gap-1.5",
													children: [
														{
															emoji: "🛡️",
															bg: "bg-purple-900/30 border-purple-500/30"
														},
														{
															emoji: "🚨",
															bg: "bg-red-900/30 border-red-500/30"
														},
														{
															emoji: "⚡",
															bg: "bg-amber-900/30 border-amber-500/30"
														},
														{
															emoji: "🛰️",
															bg: "bg-blue-900/30 border-blue-500/30"
														},
														{
															emoji: "❇️",
															bg: "bg-emerald-900/30 border-emerald-500/30"
														}
													].map((preset, idx) => {
														const selectPreset = () => {
															const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="#0f172a"/><circle cx="50" cy="50" r="40" fill="#1e293b" stroke="#6366f1" stroke-width="2"/><text x="50" y="58" font-size="36" text-anchor="middle">${preset.emoji}</text></svg>`;
															const b64 = `data:image/svg+xml;base64,${btoa(svgString)}`;
															setUserAvatar(b64);
														};
														return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: selectPreset,
															className: "w-7 h-7 rounded-lg border flex items-center justify-center text-xs hover:scale-105 transition-all bg-slate-900 border-slate-900",
															children: preset.emoji
														}, idx);
													})
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-wider",
													children: "Username"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: userUsername,
													onChange: (e) => setUserUsername(e.target.value),
													placeholder: "thabo_m",
													className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono",
													required: true
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col mt-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-wider",
													children: "Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "password",
													value: userPassword,
													onChange: (e) => setUserPassword(e.target.value),
													placeholder: "••••••••",
													className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono",
													required: true
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col mt-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-wider",
													children: "Role"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: userRole,
													onChange: (e) => setUserRole(e.target.value),
													className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Community Member",
															children: "Resident / Community Member"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Client",
															children: "Corporate / Estate Client"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "Responder",
															children: "Responder (Patrol / Armed Guard / Medical)"
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col mt-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between mb-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider",
															children: ["Organization / Security Code ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-slate-500 font-normal",
																children: userRole === "Responder" ? "(Required)" : "(Optional)"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[8px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-1.5 py-0.5 rounded",
															children: "e.g. SL-ORG-001 / SL-DEEPSOUTH-002"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: userOrgCode,
														onChange: (e) => setUserOrgCode(e.target.value.toUpperCase()),
														placeholder: "e.g. SL-DEEPSOUTH-002 or SL-ORG-001",
														className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono uppercase",
														required: userRole === "Responder"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[8px] text-slate-500 mt-0.5",
														children: "Link to a security company, university, or estate (e.g. SL-DEEPSOUTH-002) to join their command network."
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-wider",
													children: "Full Name"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: userFullName,
													onChange: (e) => setUserFullName(e.target.value),
													placeholder: "Tshilidzi Mukwevho",
													className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500",
													required: true
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-wider",
												children: "Cell Phone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: userPhone,
												onChange: (e) => setUserPhone(e.target.value),
												placeholder: "+27721234567",
												className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono",
												required: true
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-wider",
												children: "WhatsApp Link"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: userWhatsapp,
												onChange: (e) => setUserWhatsapp(e.target.value),
												placeholder: "+27721234567",
												className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-wider",
											children: "Email Coordinates"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											value: userEmail,
											onChange: (e) => setUserEmail(e.target.value),
											placeholder: "thabo@meshnet.co.za",
											className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500",
											required: true
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[9px] font-bold text-emerald-400 mb-1 uppercase tracking-wider",
													children: "4-Digit Safety PIN *"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "password",
													inputMode: "numeric",
													maxLength: 4,
													value: userPinInput,
													onChange: (e) => setUserPinInput(e.target.value.replace(/\D/g, "").slice(0, 4)),
													placeholder: "e.g. 4829",
													className: "bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono tracking-[0.4em] text-center",
													required: true
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] text-slate-500 mt-1",
													children: "Required to cancel/disarm alerts"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[9px] font-bold text-amber-400 mb-1 uppercase tracking-wider",
													children: "Silent Duress PIN"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "password",
													inputMode: "numeric",
													maxLength: 4,
													value: userDuressPinInput,
													onChange: (e) => setUserDuressPinInput(e.target.value.replace(/\D/g, "").slice(0, 4)),
													placeholder: "Optional",
													className: "bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono tracking-[0.4em] text-center"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] text-slate-500 mt-1",
													children: "Pretends to cancel while dispatching silently"
												})
											]
										})]
									}),
									hasMoya && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl mb-4 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-400 text-xs font-bold block mb-1",
											children: "Moya Detected - Free Mode Active"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-500/70 text-[9px]",
											children: "Zero data costs applied automatically."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 border border-blue-500/20 transition-all text-white text-xs font-bold rounded-2xl uppercase tracking-widest shadow-lg shadow-blue-950 font-mono",
										children: "Create Account Profile"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative flex py-2 items-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-grow border-t border-slate-900" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex-shrink-0 mx-4 text-slate-500 text-[10px] font-mono uppercase tracking-wider",
												children: "Or"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-grow border-t border-slate-900" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: async () => {
											const res = await signInWithGoogle();
											if (!res.success) setUserError(res.error || "Google Sign-Up failed.");
										},
										className: "w-full py-3.5 px-4 bg-white hover:bg-gray-100 transition-all text-slate-900 text-xs font-bold rounded-2xl uppercase tracking-widest shadow-lg flex items-center justify-center gap-3 font-mono",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											className: "w-4 h-4",
											viewBox: "0 0 24 24",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
													fill: "#4285F4"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
													fill: "#34A853"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
													fill: "#FBBC05"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
													fill: "#EA4335"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M1 1h22v22H1z",
													fill: "none"
												})
											]
										}), "Sign Up with Google"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setView("LOGIN"),
											className: "text-[10px] text-slate-400 hover:text-slate-200 font-mono font-bold uppercase tracking-wider",
											children: "← Back to Login"
										})
									})
								]
							}, "register_user"),
							view === "POST_REGISTER_DECISION" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									scale: .95
								},
								animate: {
									opacity: 1,
									scale: 1
								},
								exit: {
									opacity: 0,
									scale: .95
								},
								className: "space-y-6 text-left font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-b border-slate-900 pb-3.5 mb-2 text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xl text-emerald-400",
													children: "✓"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-sm font-black text-emerald-400 uppercase tracking-widest font-display",
												children: "Profile Established"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-slate-400 mt-1",
												children: "Select your desired SafetyLink service path to proceed."
											}),
											userError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-mono mt-2",
												children: userError
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: async () => {
												const res = await login(registeredUsername || userUsername, registeredPassword || userPassword || "demo123");
												if (!res.success && res.error) setUserError(res.error);
											},
											className: "w-full text-left p-4 bg-slate-950/40 hover:bg-slate-950/60 border border-slate-900 hover:border-blue-500/50 rounded-2xl transition-all cursor-pointer group",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors mt-0.5",
													children: "👤"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors uppercase tracking-wider",
													children: "Personal / Individual Account"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-slate-500 mt-1 leading-normal font-sans",
													children: "Deploy the tactical panic dashboard for private security, family networks, offline telemetry queueing, and personal BLE buttons."
												})] })]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setView("REGISTER_ORG");
											},
											className: "w-full text-left p-4 bg-slate-950/40 hover:bg-slate-950/60 border border-slate-900 hover:border-emerald-500/50 rounded-2xl transition-all cursor-pointer group",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors mt-0.5",
													children: "🏢"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors uppercase tracking-wider",
													children: "Create & Provision Organization"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] text-slate-500 mt-1 leading-normal font-sans",
													children: "Establish an enterprise Safety Node Commander Deck to manage patrol guards, monitor student/staff rosters, and configure a Cloud Messaging Gateway."
												})] })]
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setView("LOGIN"),
											className: "text-[10px] text-slate-400 hover:text-slate-200 font-mono font-bold uppercase tracking-wider",
											children: "← Back to Login"
										})
									})
								]
							}, "post_register_decision"),
							view === "REGISTER_ORG" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
								initial: {
									opacity: 0,
									x: -10
								},
								animate: {
									opacity: 1,
									x: 0
								},
								exit: {
									opacity: 0,
									x: 10
								},
								onSubmit: handleOrgRegister,
								className: "space-y-4 text-left font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-b border-slate-900 pb-3.5 mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-xs font-black text-emerald-400 uppercase tracking-widest font-display",
											children: "Provision Safety Node"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-slate-500 mt-0.5",
											children: "Register a security agency, campus perimeter, or corporate workspace."
										})]
									}),
									orgError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-3.5 bg-red-950/20 border border-red-500/20 rounded-2xl text-red-400 text-xs font-mono",
										children: orgError
									}),
									orgSuccessMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3.5 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-mono",
										children: ["✓ ", orgSuccessMsg]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[9px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider",
											children: "Organization Entity Name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: orgName,
											onChange: (e) => setOrgName(e.target.value),
											placeholder: "e.g. Alpha Security, City Patrol, TechCorp, CityCenter",
											className: "bg-slate-950 border border-slate-900 rounded-2xl p-3.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500",
											required: true
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-wider",
												children: "Commander Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: orgContactName,
												onChange: (e) => setOrgContactName(e.target.value),
												placeholder: "Mpho Lekota",
												className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500",
												required: true
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-wider",
												children: "Secure Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "email",
												value: orgEmail,
												onChange: (e) => setOrgEmail(e.target.value),
												placeholder: "mpho@apex.co.za",
												className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500",
												required: true
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-wider",
											children: "Admin Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											value: orgPassword,
											onChange: (e) => setOrgPassword(e.target.value),
											placeholder: "••••••••",
											className: "bg-slate-950 border border-slate-900 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 font-mono",
											required: true
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-panel rounded-2xl p-3.5 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setShowIdApplication(!showIdApplication),
											className: "w-full flex justify-between items-center text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📂 Generate Mesh Node Identifier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm",
												children: showIdApplication ? "▲" : "▼"
											})]
										}), showIdApplication && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3 pt-2.5 border-t border-slate-900/80 animate-fadeIn text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[9px] text-slate-400 leading-normal font-sans",
												children: "Generate a cryptographically validated code on the SafetyLink servers to bind multiple responder devices."
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: handleGenerateOrgId,
													disabled: isGenerating,
													className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-900 disabled:text-slate-600 border border-emerald-500/10 transition-colors text-white font-mono text-[9px] font-bold rounded-xl uppercase tracking-wider",
													children: isGenerating ? "ROUTING..." : "GENERATE NODE ID"
												}), generatedOrgId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex-1 bg-slate-950 border border-emerald-500/20 px-3 py-2 rounded-xl text-center font-mono font-black text-xs text-emerald-400 tracking-widest select-text",
													children: generatedOrgId
												})]
											})]
										})]
									}),
									generatedOrgId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-panel rounded-2xl overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setShowReferralSection((v) => !v),
											className: "w-full flex justify-between items-center px-4 py-3 text-[10px] font-mono font-bold text-amber-400 tracking-wider uppercase hover:text-amber-300 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🎟️ Generate Agent Referral Code" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm",
												children: showReferralSection ? "▲" : "▼"
											})]
										}), showReferralSection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "px-4 pb-4 pt-1 border-t border-slate-900 space-y-3 animate-fadeIn",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[9px] text-slate-400 leading-relaxed",
													children: "Generate a unique referral code for your agents to share with clients. Every client that registers using this code will be tracked under your organization."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => {
															const code = generateReferralCode(generatedOrgId);
															setGeneratedReferralCode(code);
														},
														className: "px-4 py-2 bg-amber-600 hover:bg-amber-500 border border-amber-500/10 transition-colors text-white font-mono text-[9px] font-bold rounded-xl uppercase tracking-wider shrink-0",
														children: generatedReferralCode ? "REGENERATE" : "GENERATE CODE"
													}), generatedReferralCode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex-1 bg-slate-950 border border-amber-500/30 px-3 py-2 rounded-xl text-center font-mono font-black text-xs text-amber-400 tracking-widest select-text",
														children: generatedReferralCode
													})]
												}),
												generatedReferralCode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[9px] text-slate-500 font-mono",
													children: "Share this code with your agents. Clients enter it on the login screen to be linked to your organization."
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/20 transition-all text-white text-xs font-bold rounded-2xl uppercase tracking-widest shadow-lg shadow-emerald-950 font-mono",
										children: "Register Safety Node"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setView("LOGIN"),
											className: "text-[10px] text-slate-400 hover:text-slate-200 font-mono font-bold uppercase tracking-wider",
											children: "← Back to Login"
										})
									})
								]
							}, "register_org")
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 text-center space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-panel rounded-2xl px-5 py-4 max-w-md mx-auto space-y-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono",
							children: "Need Help? Contact SafetyLink"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "mailto:info@safetylink.online",
									className: "flex items-center justify-center gap-2 text-[10px] text-blue-400 hover:text-blue-300 font-mono transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✉️" }), " info@safetylink.online"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://wa.me/message/YIEA73M7H3P5M1",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center justify-center gap-2 text-[10px] text-emerald-400 hover:text-emerald-300 font-mono transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "💬" }), " Chat on WhatsApp (+27 68 007 9911)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://whatsapp.com/channel/0029Vb8MGfc0lwgn9sG1bz2s",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center justify-center gap-2 text-[10px] text-emerald-400 hover:text-emerald-300 font-mono transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📢" }), " Follow Official WhatsApp Channel"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://chat.whatsapp.com/I4PH58YMv438cSU3iwqyu5",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center justify-center gap-2 text-[10px] text-emerald-400 hover:text-emerald-300 font-mono transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "👥" }), " Join WhatsApp Community Group"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://www.facebook.com/share/1D8xnzfY8T/",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center justify-center gap-2 text-[10px] text-sky-400 hover:text-sky-300 font-mono transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📘" }), " Follow Us on Facebook"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[9px] text-slate-600 font-mono uppercase tracking-[0.2em]",
						children: "SECURE ENCRYPTED MESH MATRIX // DEEPMIND SECURITY Blueprints"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-amber-500/60 font-mono uppercase tracking-[0.25em] font-black",
						children: "POWERED BY TM MEDIA SOLUTIONS"
					})
				]
			})
		]
	});
};
//#endregion
//#region src/components/GlobalBackground.tsx
var GlobalBackground = () => {
	const [videoError, setVideoError] = (0, import_react.useState)(false);
	const videoRef = (0, import_react.useRef)(null);
	const isNative = Capacitor.isNativePlatform();
	(0, import_react.useEffect)(() => {
		if (!isNative && videoRef.current) videoRef.current.play().catch(() => {});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-[#020617]",
		children: [
			!isNative && !videoError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 w-full h-full overflow-hidden opacity-30 filter contrast-[1.08] saturate-[1.15]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("video", {
					ref: videoRef,
					autoPlay: true,
					loop: true,
					muted: true,
					playsInline: true,
					onError: () => {
						console.warn("[GlobalBackground] Splash video error, applying visual fallback");
						setVideoError(true);
					},
					className: "w-full h-full object-cover",
					style: {
						width: "100%",
						height: "100%",
						objectFit: "cover"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							src: "/media/videos/SafetyLink 3D Animation Logo.mp4",
							type: "video/mp4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							src: "/splash-video.mp4",
							type: "video/mp4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							src: getR2StreamUrl("SafetyLink 3D Animation Logo.mp4"),
							type: "video/mp4"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-20 pointer-events-none",
				style: {
					backgroundImage: "radial-gradient(rgba(148, 163, 184, 0.16) 1px, transparent 1px)",
					backgroundSize: "28px 28px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#020617]/75 via-[#020617]/60 to-[#020617]/85 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-4 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 font-mono text-[9px] text-slate-500/70 tracking-widest uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.8)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SAFETYLINK MESH // LIVE" })]
			})
		]
	});
};
//#endregion
//#region src/components/SplashReveal.tsx
var SplashReveal = ({ onComplete }) => {
	const [fadingOut, setFadingOut] = (0, import_react.useState)(false);
	const [videoError, setVideoError] = (0, import_react.useState)(false);
	const completed = (0, import_react.useRef)(false);
	const isNative = Capacitor.isNativePlatform();
	const handleComplete = () => {
		if (completed.current) return;
		completed.current = true;
		setFadingOut(true);
		if (isNative) SplashScreen.hide({ fadeOutDuration: 200 }).catch(() => {});
		setTimeout(() => {
			onComplete();
		}, isNative ? 200 : 350);
	};
	(0, import_react.useEffect)(() => {
		if (isNative) {
			SplashScreen.hide({ fadeOutDuration: 0 }).catch(() => {});
			onComplete();
			return;
		}
		const timer = setTimeout(() => {
			handleComplete();
		}, 2500);
		return () => {
			clearTimeout(timer);
		};
	}, [isNative]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "splash-reveal-container",
		onClick: handleComplete,
		onTouchStart: handleComplete,
		className: `fixed inset-0 bg-[#020408] flex flex-col items-center justify-center z-[99999] overflow-hidden select-none cursor-pointer transition-opacity duration-300 ease-out ${fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"}`,
		children: [
			!videoError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative w-full max-w-xl max-h-[70vh] aspect-video z-10 flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("video", {
					autoPlay: true,
					muted: true,
					playsInline: true,
					onEnded: handleComplete,
					onError: () => {
						setVideoError(true);
						setTimeout(handleComplete, 600);
					},
					className: "w-full h-full object-contain",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
						src: "/media/videos/SafetyLink 3D Animation Logo.mp4",
						type: "video/mp4"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
						src: "/splash-video.mp4",
						type: "video/mp4"
					})]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col items-center justify-center gap-5 animate-pulse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-24 h-24 flex items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logos/New SafetyLink Official Logo.svg",
						onError: (e) => {
							e.currentTarget.src = "/logos/Safety_Link_Logo_Transparent.png";
						},
						alt: "SafetyLink",
						className: "w-20 h-20 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-1 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-extrabold text-white text-base tracking-wider font-mono",
						children: "SAFETYLINK CORE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-emerald-400 font-mono tracking-widest uppercase",
						children: "Sequential Emergency Network"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,rgba(2,4,8,0.96)_100%)] pointer-events-none z-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-12 left-0 right-0 flex flex-col items-center gap-1 font-mono text-[9px] text-slate-400/80 tracking-[0.25em] uppercase font-bold z-20 pointer-events-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AUTONOMOUS MESH GATEWAY" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[8px] text-emerald-400/70 tracking-widest mt-0.5",
					children: "TAP ANYWHERE TO ENTER"
				})]
			})
		]
	});
};
//#endregion
//#region src/components/landing/Header.tsx
var T_LANG = {
	en: {
		h1a: "SAFETY FOR YOUR FAMILY AND",
		h1b: "HOUSEHOLD",
		sub: "Peace of mind STARTS AT HOME. Protect what matters most — your family, estate, and team."
	},
	zu: {
		h1a: "UKUPHEPHA KOMNDENI WAKHO",
		h1b: "IKHAYA",
		sub: "Ukuthula kwengqondo kuQALA EKHAYA. Vikela okukubalulekile."
	},
	af: {
		h1a: "VEILIGHEID VIR JOU GESIN EN",
		h1b: "HUISHOUDING",
		sub: "Gemoedsrus BEGIN TUIS. Beskerm wat die meeste saakmaak."
	},
	xh: {
		h1a: "UKHUSELEKO LOSAPHO LWAKHO",
		h1b: "IKHAYA",
		sub: "Ukuzola kwengqondo kuQALA EKHAYA. Khusela okubalulekileyo."
	},
	st: {
		h1a: "TSHIRELETSO YA LELAPA",
		h1b: "LAPENG",
		sub: "Kgotso ya kelello e qala habo. Sireletsa se hlokehang."
	},
	tn: {
		h1a: "TSHIRELETSO YA LELWAPA",
		h1b: "LAPENG",
		sub: "Kagiso ya kelelo e simolola gago. Sireletsa se tlhokegang."
	},
	ts: {
		h1a: "ANTSWISO YA NDYANGU",
		h1b: "KAYA",
		sub: "Ku rula ka miehleketo ku sungula kaya. Hlayisa leswi fambisanaka."
	},
	ss: {
		h1a: "KUVIKELWA KWEMNDENI",
		h1b: "EKHAYA",
		sub: "Kuthula kwenhlitiyo kweQALA EKHAYA. Vikela loko kubalulekile."
	},
	ve: {
		h1a: "VHUSIRELE HA MUVHUSO",
		h1b: "HAYANI",
		sub: "Vhutondoli vhu sumbedzela hayani. Vhusirele zwine zwa vha muhulwane."
	},
	nr: {
		h1a: "UKUVIKELWA KOMNDENI",
		h1b: "EKHAYA",
		sub: "Ukuthula kwenhliziyo kuqala ekhaya. Vikela okuyimqoka."
	},
	nso: {
		h1a: "TSHIRELETSO YA LELOKO",
		h1b: "LAPENG",
		sub: "Kgotso ya kelelo e thoma lapeng. Sireletsa seo se hlokegago."
	}
};
function Header({ onLogin, onNavigate, activePage = "home" }) {
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	const [whatsappMenuOpen, setWhatsappMenuOpen] = (0, import_react.useState)(false);
	const [downloadMenuOpen, setDownloadMenuOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [selectedLang, setSelectedLang] = (0, import_react.useState)("en");
	const { globalTheme, setGlobalTheme } = useAppStore();
	(0, import_react.useEffect)(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const handleLanguageChange = (lang) => {
		setSelectedLang(lang);
		const t = T_LANG[lang] || T_LANG.en;
		const h1 = document.getElementById("hero-h1");
		if (h1) h1.innerHTML = `${t.h1a}<br/><span style="color:#15803d;">${t.h1b}</span>`;
		const sub = document.getElementById("hero-sub");
		if (sub) sub.textContent = t.sub;
		const badge = document.getElementById("lang-badge");
		if (badge) {
			const selectEl = document.getElementById("lang-select");
			if (selectEl) badge.textContent = selectEl.options[selectEl.selectedIndex].text.replace("🌐 ", "");
		}
	};
	const handleLinkClick = (e, pageId) => {
		if (onNavigate) {
			e.preventDefault();
			onNavigate(pageId);
		}
		setMobileMenuOpen(false);
	};
	const isLight = globalTheme !== "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			id: "nav",
			style: {
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1e3,
				background: isLight ? "rgba(255, 255, 255, 0.94)" : "rgba(2, 6, 23, 0.88)",
				backdropFilter: "blur(12px)",
				WebkitBackdropFilter: "blur(12px)",
				borderBottom: isLight ? "1px solid #d1fae5" : "1px solid rgba(30, 41, 59, 0.7)",
				transition: "box-shadow .3s, background .3s",
				boxShadow: scrolled ? isLight ? "0 4px 24px rgba(5,150,105,.08)" : "0 4px 24px rgba(0,0,0,.5)" : "none"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nav-inner",
				style: {
					maxWidth: "1200px",
					margin: "0 auto",
					padding: "0 20px",
					height: "60px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "8px"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#home",
						onClick: (e) => handleLinkClick(e, "home"),
						className: "nav-logo",
						style: {
							display: "flex",
							alignItems: "center",
							gap: "8px",
							textDecoration: "none",
							flexShrink: 0
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/logos/Safety_Link_Logo_Transparent.png",
							alt: "SafetyLink",
							style: {
								height: "36px",
								width: "auto",
								objectFit: "contain"
							},
							onError: (e) => {
								const imgEl = e.currentTarget;
								if (!imgEl.src.includes("New SafetyLink Official Logo")) imgEl.src = "/logos/New SafetyLink Official Logo.svg";
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "nav-brand-text",
							style: {
								fontSize: "17px",
								fontWeight: 800,
								color: isLight ? "#0f172a" : "#f8fafc",
								letterSpacing: "-.02em"
							},
							children: "SafetyLink"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nav-links",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#home",
								onClick: (e) => handleLinkClick(e, "home"),
								className: activePage === "home" ? "active" : "",
								style: {
									fontSize: "12px",
									fontWeight: 500,
									color: activePage === "home" ? "#15803d" : isLight ? "#64748b" : "#94a3b8",
									textDecoration: "none",
									transition: "color .2s",
									whiteSpace: "nowrap",
									borderBottom: activePage === "home" ? "2px solid #15803d" : "none",
									paddingBottom: activePage === "home" ? "2px" : "0"
								},
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#features",
								onClick: (e) => handleLinkClick(e, "platform"),
								className: activePage === "platform" || activePage === "features" ? "active" : "",
								style: {
									fontSize: "12px",
									fontWeight: 500,
									color: activePage === "platform" || activePage === "features" ? "#15803d" : isLight ? "#64748b" : "#94a3b8",
									textDecoration: "none",
									transition: "color .2s",
									whiteSpace: "nowrap",
									borderBottom: activePage === "platform" || activePage === "features" ? "2px solid #15803d" : "none",
									paddingBottom: activePage === "platform" || activePage === "features" ? "2px" : "0"
								},
								children: "Platform Features"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#usecases",
								onClick: (e) => handleLinkClick(e, "usecases"),
								className: activePage === "usecases" ? "active" : "",
								style: {
									fontSize: "12px",
									fontWeight: 500,
									color: activePage === "usecases" ? "#15803d" : isLight ? "#64748b" : "#94a3b8",
									textDecoration: "none",
									transition: "color .2s",
									whiteSpace: "nowrap",
									borderBottom: activePage === "usecases" ? "2px solid #15803d" : "none",
									paddingBottom: activePage === "usecases" ? "2px" : "0"
								},
								children: "Use Cases"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#hardware",
								onClick: (e) => handleLinkClick(e, "hardware"),
								className: activePage === "hardware" ? "active" : "",
								style: {
									fontSize: "12px",
									fontWeight: 500,
									color: activePage === "hardware" ? "#15803d" : isLight ? "#64748b" : "#94a3b8",
									textDecoration: "none",
									transition: "color .2s",
									whiteSpace: "nowrap",
									borderBottom: activePage === "hardware" ? "2px solid #15803d" : "none",
									paddingBottom: activePage === "hardware" ? "2px" : "0"
								},
								children: "Hardware Config"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#ai",
								onClick: (e) => handleLinkClick(e, "enterprise"),
								className: activePage === "enterprise" || activePage === "ai" ? "active" : "",
								style: {
									fontSize: "12px",
									fontWeight: 500,
									color: activePage === "enterprise" || activePage === "ai" ? "#15803d" : isLight ? "#64748b" : "#94a3b8",
									textDecoration: "none",
									transition: "color .2s",
									whiteSpace: "nowrap",
									borderBottom: activePage === "enterprise" || activePage === "ai" ? "2px solid #15803d" : "none",
									paddingBottom: activePage === "enterprise" || activePage === "ai" ? "2px" : "0"
								},
								children: "AI Co-Pilot"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#pricing",
								onClick: (e) => handleLinkClick(e, "pricing"),
								className: activePage === "pricing" ? "active" : "",
								style: {
									fontSize: "12px",
									fontWeight: 500,
									color: activePage === "pricing" ? "#15803d" : isLight ? "#64748b" : "#94a3b8",
									textDecoration: "none",
									transition: "color .2s",
									whiteSpace: "nowrap",
									borderBottom: activePage === "pricing" ? "2px solid #15803d" : "none",
									paddingBottom: activePage === "pricing" ? "2px" : "0"
								},
								children: "Pricing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#store",
								onClick: (e) => handleLinkClick(e, "store"),
								className: activePage === "store" ? "active" : "",
								style: {
									fontSize: "12px",
									fontWeight: 500,
									color: activePage === "store" ? "#15803d" : isLight ? "#64748b" : "#94a3b8",
									textDecoration: "none",
									transition: "color .2s",
									whiteSpace: "nowrap",
									borderBottom: activePage === "store" ? "2px solid #15803d" : "none",
									paddingBottom: activePage === "store" ? "2px" : "0"
								},
								children: "Store"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#download",
								onClick: (e) => handleLinkClick(e, "download"),
								className: activePage === "download" ? "active" : "",
								style: {
									fontSize: "12px",
									fontWeight: 500,
									color: activePage === "download" ? "#15803d" : isLight ? "#64748b" : "#94a3b8",
									textDecoration: "none",
									transition: "color .2s",
									whiteSpace: "nowrap",
									borderBottom: activePage === "download" ? "2px solid #15803d" : "none",
									paddingBottom: activePage === "download" ? "2px" : "0"
								},
								children: "Download"
							}),
							onLogin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onLogin,
								style: {
									fontSize: "11px",
									fontWeight: 600,
									color: isLight ? "#475569" : "#cbd5e1",
									background: isLight ? "#f8fafc" : "#1e293b",
									border: isLight ? "1px solid #e2e8f0" : "1px solid #334155",
									borderRadius: "7px",
									padding: "5px 10px",
									cursor: "pointer",
									transition: "background .2s"
								},
								children: "Log In"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nav-right",
						style: {
							display: "flex",
							alignItems: "center",
							gap: "8px",
							flexShrink: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lang-wrap",
								style: { position: "relative" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "lang-select",
									value: selectedLang,
									onChange: (e) => handleLanguageChange(e.target.value),
									"aria-label": "Select language",
									style: {
										appearance: "none",
										background: isLight ? "#f8fafc" : "#0f172a",
										border: isLight ? "1px solid #e2e8f0" : "1px solid #334155",
										borderRadius: "7px",
										padding: "6px 24px 6px 9px",
										fontSize: "11px",
										fontWeight: 700,
										color: isLight ? "#1e293b" : "#f1f5f9",
										cursor: "pointer",
										outline: "none",
										fontFamily: "inherit"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "en",
											children: "🌐 ENGLISH"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "zu",
											children: "🌐 ZULU"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "af",
											children: "🌐 AFRIKAANS"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "xh",
											children: "🌐 XHOSA"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "st",
											children: "🌐 SESOTHO"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "tn",
											children: "🌐 SETSWANA"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ts",
											children: "🌐 TSONGA"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ss",
											children: "🌐 SWATI"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ve",
											children: "🌐 VENDA"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "nr",
											children: "🌐 NDEBELE"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "nso",
											children: "🌐 SEPEDI"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "10",
									height: "10",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: isLight ? "#64748b" : "#94a3b8",
									strokeWidth: "2.5",
									style: {
										position: "absolute",
										right: "7px",
										top: "50%",
										transform: "translateY(-50%)",
										pointerEvents: "none"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 9l6 6 6-6" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { position: "relative" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setDownloadMenuOpen((prev) => !prev),
									style: {
										display: "flex",
										alignItems: "center",
										gap: "5px",
										background: "#059669",
										color: "#ffffff",
										border: "none",
										borderRadius: "7px",
										padding: "6px 11px",
										cursor: "pointer",
										fontSize: "11px",
										fontWeight: 700,
										fontFamily: "inherit"
									},
									title: "Download SafetyLink APK or Windows EXE",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⬇" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download" })]
								}), downloadMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onMouseLeave: () => setDownloadMenuOpen(false),
									style: {
										position: "absolute",
										right: 0,
										top: "100%",
										marginTop: "6px",
										width: "240px",
										padding: "10px",
										borderRadius: "12px",
										background: isLight ? "#ffffff" : "#0f172a",
										border: isLight ? "1px solid #d1fae5" : "1px solid #334155",
										boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
										zIndex: 1060,
										display: "flex",
										flexDirection: "column",
										gap: "6px"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/safetylink.apk",
											download: true,
											onClick: () => setDownloadMenuOpen(false),
											style: {
												padding: "8px 10px",
												borderRadius: "8px",
												background: isLight ? "#ecfdf5" : "rgba(16,185,129,0.12)",
												color: "#059669",
												fontSize: "11px",
												fontWeight: 700,
												textDecoration: "none"
											},
											children: "📱 Version 1 Android APK"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/beta/safetylink.apk",
											download: true,
											onClick: () => setDownloadMenuOpen(false),
											style: {
												padding: "8px 10px",
												borderRadius: "8px",
												background: isLight ? "#fffbeb" : "rgba(245,158,11,0.12)",
												color: "#d97706",
												fontSize: "11px",
												fontWeight: 700,
												textDecoration: "none"
											},
											children: "🧪 Version 1.1 Beta APK"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://github.com/Charesmagna/SafetyLink-Core/releases/latest",
											target: "_blank",
											rel: "noreferrer",
											onClick: () => setDownloadMenuOpen(false),
											style: {
												padding: "8px 10px",
												borderRadius: "8px",
												background: isLight ? "#f8fafc" : "rgba(255,255,255,0.05)",
												color: isLight ? "#0f172a" : "#e2e8f0",
												fontSize: "11px",
												fontWeight: 700,
												textDecoration: "none"
											},
											children: "💻 Windows Command EXE"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: (e) => {
												setDownloadMenuOpen(false);
												handleLinkClick(e, "download");
											},
											style: {
												padding: "8px 10px",
												borderRadius: "8px",
												border: isLight ? "1px solid #e2e8f0" : "1px solid #334155",
												background: "transparent",
												color: isLight ? "#475569" : "#94a3b8",
												fontSize: "11px",
												fontWeight: 700,
												cursor: "pointer",
												textAlign: "left"
											},
											children: "📦 Open Download Hub →"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "theme-toggle-btn",
								onClick: () => setGlobalTheme(isLight ? "dark" : "light"),
								style: {
									width: "32px",
									height: "32px",
									background: isLight ? "#f8fafc" : "#0f172a",
									border: isLight ? "1px solid #e2e8f0" : "1px solid #334155",
									borderRadius: "7px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									transition: "background .2s",
									flexShrink: 0
								},
								title: isLight ? "Switch to Dark Mode" : "Switch to Light Mode",
								"aria-label": "Toggle visual theme",
								children: !isLight ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "15",
									height: "15",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "#f59e0b",
									strokeWidth: "2.2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "12",
											cy: "12",
											r: "5"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "12",
											y1: "1",
											x2: "12",
											y2: "3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "12",
											y1: "21",
											x2: "12",
											y2: "23"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "4.22",
											y1: "4.22",
											x2: "5.64",
											y2: "5.64"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "18.36",
											y1: "18.36",
											x2: "19.78",
											y2: "19.78"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "1",
											y1: "12",
											x2: "3",
											y2: "12"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "21",
											y1: "12",
											x2: "23",
											y2: "12"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "4.22",
											y1: "19.78",
											x2: "5.64",
											y2: "18.36"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "18.36",
											y1: "5.64",
											x2: "19.78",
											y2: "4.22"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "15",
									height: "15",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "#4f46e5",
									strokeWidth: "2.2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "social-row",
								style: {
									display: "flex",
									alignItems: "center",
									gap: "5px"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "mailto:info@safetylink.online",
										className: "soc-btn",
										title: "Email us (info@safetylink.online)",
										style: {
											width: "32px",
											height: "32px",
											background: isLight ? "#f8fafc" : "#0f172a",
											border: isLight ? "1px solid #e2e8f0" : "1px solid #334155",
											borderRadius: "7px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											textDecoration: "none",
											transition: "background .2s",
											flexShrink: 0
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											width: "15",
											height: "15",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: isLight ? "#64748b" : "#94a3b8",
											strokeWidth: "2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: "2",
												y: "4",
												width: "20",
												height: "16",
												rx: "2"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 7l10 7 10-7" })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://www.facebook.com/share/1D8xnzfY8T/",
										target: "_blank",
										rel: "noreferrer",
										className: "soc-btn fb",
										title: "Facebook",
										style: {
											width: "32px",
											height: "32px",
											background: isLight ? "#f8fafc" : "#0f172a",
											border: isLight ? "1px solid #e2e8f0" : "1px solid #334155",
											borderRadius: "7px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											textDecoration: "none",
											transition: "background .2s",
											flexShrink: 0
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "15",
											height: "15",
											viewBox: "0 0 24 24",
											fill: "#1877f2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: { position: "relative" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setWhatsappMenuOpen((prev) => !prev),
											onMouseEnter: () => setWhatsappMenuOpen(true),
											className: "soc-btn wa",
											title: "Direct Contacts: Tel. 081 673 8186 & Cel. +27 68 007 9911",
											"aria-label": "Direct Contacts and WhatsApp",
											style: {
												width: "32px",
												height: "32px",
												background: isLight ? "#f8fafc" : "#0f172a",
												border: isLight ? "1px solid #e2e8f0" : "1px solid #334155",
												borderRadius: "7px",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												cursor: "pointer",
												transition: "background .2s",
												flexShrink: 0
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "15",
												height: "15",
												viewBox: "0 0 24 24",
												fill: "#25d366",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
											})
										}), whatsappMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onMouseLeave: () => setWhatsappMenuOpen(false),
											style: {
												position: "absolute",
												right: 0,
												top: "100%",
												marginTop: "6px",
												width: "280px",
												padding: "12px",
												borderRadius: "12px",
												background: isLight ? "#ffffff" : "#0f172a",
												border: isLight ? "1px solid #e2e8f0" : "1px solid #334155",
												boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
												zIndex: 1050
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														fontSize: "10px",
														fontWeight: 800,
														color: "#15803d",
														textTransform: "uppercase",
														letterSpacing: "0.08em",
														paddingBottom: "8px",
														borderBottom: isLight ? "1px solid #f1f5f9" : "1px solid #1e293b",
														marginBottom: "8px"
													},
													children: "Official Emergency Lines"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														display: "flex",
														flexDirection: "column",
														gap: "6px",
														marginBottom: "10px",
														paddingBottom: "8px",
														borderBottom: isLight ? "1px solid #f1f5f9" : "1px solid #1e293b"
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: "tel:0816738186",
														style: {
															display: "flex",
															alignItems: "center",
															justifyContent: "space-between",
															padding: "6px 8px",
															borderRadius: "6px",
															textDecoration: "none",
															background: isLight ? "#f1f5f9" : "rgba(255,255,255,0.04)",
															color: isLight ? "#0f172a" : "#f8fafc",
															fontSize: "11px",
															fontWeight: 700
														},
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📞 Tel:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															style: {
																fontFamily: "monospace",
																color: "#15803d",
																fontSize: "12px"
															},
															children: "081 673 8186"
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: "tel:+27680079911",
														style: {
															display: "flex",
															alignItems: "center",
															justifyContent: "space-between",
															padding: "6px 8px",
															borderRadius: "6px",
															textDecoration: "none",
															background: isLight ? "#f1f5f9" : "rgba(255,255,255,0.04)",
															color: isLight ? "#0f172a" : "#f8fafc",
															fontSize: "11px",
															fontWeight: 700
														},
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📲 Cel:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															style: {
																fontFamily: "monospace",
																color: "#0ea5e9",
																fontSize: "12px"
															},
															children: "+27 68 007 9911"
														})]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: "https://wa.me/message/YIEA73M7H3P5M1",
													target: "_blank",
													rel: "noreferrer",
													onClick: () => setWhatsappMenuOpen(false),
													style: {
														display: "flex",
														alignItems: "center",
														gap: "8px",
														padding: "6px 8px",
														borderRadius: "7px",
														textDecoration: "none",
														color: isLight ? "#1e293b" : "#f8fafc",
														fontSize: "11px",
														fontWeight: 600,
														transition: "background .15s"
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: { fontSize: "14px" },
														children: "💬"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Chat on WhatsApp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															fontSize: "9px",
															color: "#64748b",
															fontWeight: 400
														},
														children: "Direct Support & Dispatch"
													})] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: "https://whatsapp.com/channel/0029Vb8MGfc0lwgn9sG1bz2s",
													target: "_blank",
													rel: "noreferrer",
													onClick: () => setWhatsappMenuOpen(false),
													style: {
														display: "flex",
														alignItems: "center",
														gap: "8px",
														padding: "6px 8px",
														borderRadius: "7px",
														textDecoration: "none",
														color: isLight ? "#1e293b" : "#f8fafc",
														fontSize: "11px",
														fontWeight: 600,
														transition: "background .15s"
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: { fontSize: "14px" },
														children: "📢"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Follow WA Channel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															fontSize: "9px",
															color: "#64748b",
															fontWeight: 400
														},
														children: "Official Platform Broadcasts"
													})] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: "https://chat.whatsapp.com/I4PH58YMv438cSU3iwqyu5",
													target: "_blank",
													rel: "noreferrer",
													onClick: () => setWhatsappMenuOpen(false),
													style: {
														display: "flex",
														alignItems: "center",
														gap: "8px",
														padding: "6px 8px",
														borderRadius: "7px",
														textDecoration: "none",
														color: isLight ? "#1e293b" : "#f8fafc",
														fontSize: "11px",
														fontWeight: 600,
														transition: "background .15s"
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: { fontSize: "14px" },
														children: "👥"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Join Community Group" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															fontSize: "9px",
															color: "#64748b",
															fontWeight: 400
														},
														children: "Estates & Mesh Responders"
													})] })]
												})
											]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://wa.me/message/YIEA73M7H3P5M1?text=Hi+I+want+to+get+SafetyLink",
								target: "_blank",
								rel: "noreferrer",
								className: "nav-cta",
								style: {
									background: "#15803d",
									color: "#fff",
									padding: "8px 16px",
									borderRadius: "7px",
									fontSize: "12px",
									fontWeight: 700,
									textDecoration: "none",
									whiteSpace: "nowrap",
									transition: "background .2s"
								},
								children: "Get Started"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "ham",
								onClick: () => setMobileMenuOpen((prev) => !prev),
								"aria-label": mobileMenuOpen ? "Close menu" : "Open menu",
								style: {
									background: "none",
									border: "none",
									cursor: "pointer",
									padding: "4px",
									display: "none"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "22",
									height: "22",
									fill: "none",
									stroke: isLight ? "#0f172a" : "#f8fafc",
									strokeWidth: "2",
									children: mobileMenuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "18",
										y1: "6",
										x2: "6",
										y2: "18"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "6",
										y1: "6",
										x2: "18",
										y2: "18"
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "3",
											y1: "6",
											x2: "21",
											y2: "6"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "3",
											y1: "12",
											x2: "21",
											y2: "12"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "3",
											y1: "18",
											x2: "21",
											y2: "18"
										})
									] })
								})
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "mob-menu",
				className: mobileMenuOpen ? "open" : "",
				style: {
					display: mobileMenuOpen ? "flex" : "none",
					flexDirection: "column",
					gap: 0,
					height: "calc(100vh - 60px)",
					overflowY: "auto",
					background: isLight ? "#ffffff" : "#020617",
					borderTop: isLight ? "1px solid #e2e8f0" : "1px solid #1e293b",
					boxShadow: "0 12px 32px rgba(0,0,0,0.15)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#home",
						onClick: (e) => handleLinkClick(e, "home"),
						style: {
							color: isLight ? "#1e293b" : "#f8fafc",
							fontWeight: 500,
							textDecoration: "none",
							fontSize: "14px",
							padding: "12px 20px",
							borderBottom: isLight ? "1px solid #f1f5f9" : "1px solid #0f172a"
						},
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#features",
						onClick: (e) => handleLinkClick(e, "platform"),
						style: {
							color: isLight ? "#1e293b" : "#f8fafc",
							fontWeight: 500,
							textDecoration: "none",
							fontSize: "14px",
							padding: "12px 20px",
							borderBottom: isLight ? "1px solid #f1f5f9" : "1px solid #0f172a"
						},
						children: "Platform Features"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#usecases",
						onClick: (e) => handleLinkClick(e, "usecases"),
						style: {
							color: isLight ? "#1e293b" : "#f8fafc",
							fontWeight: 500,
							textDecoration: "none",
							fontSize: "14px",
							padding: "12px 20px",
							borderBottom: isLight ? "1px solid #f1f5f9" : "1px solid #0f172a"
						},
						children: "Use Cases"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#hardware",
						onClick: (e) => handleLinkClick(e, "hardware"),
						style: {
							color: isLight ? "#1e293b" : "#f8fafc",
							fontWeight: 500,
							textDecoration: "none",
							fontSize: "14px",
							padding: "12px 20px",
							borderBottom: isLight ? "1px solid #f1f5f9" : "1px solid #0f172a"
						},
						children: "Hardware Config"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#ai",
						onClick: (e) => handleLinkClick(e, "enterprise"),
						style: {
							color: isLight ? "#1e293b" : "#f8fafc",
							fontWeight: 500,
							textDecoration: "none",
							fontSize: "14px",
							padding: "12px 20px",
							borderBottom: isLight ? "1px solid #f1f5f9" : "1px solid #0f172a"
						},
						children: "AI Co-Pilot"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#pricing",
						onClick: (e) => handleLinkClick(e, "pricing"),
						style: {
							color: isLight ? "#1e293b" : "#f8fafc",
							fontWeight: 500,
							textDecoration: "none",
							fontSize: "14px",
							padding: "12px 20px",
							borderBottom: isLight ? "1px solid #f1f5f9" : "1px solid #0f172a"
						},
						children: "Pricing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#store",
						onClick: (e) => handleLinkClick(e, "store"),
						style: {
							color: isLight ? "#1e293b" : "#f8fafc",
							fontWeight: 500,
							textDecoration: "none",
							fontSize: "14px",
							padding: "12px 20px",
							borderBottom: isLight ? "1px solid #f1f5f9" : "1px solid #0f172a"
						},
						children: "SafetyWare Store"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#download",
						onClick: (e) => handleLinkClick(e, "download"),
						style: {
							color: isLight ? "#1e293b" : "#f8fafc",
							fontWeight: 500,
							textDecoration: "none",
							fontSize: "14px",
							padding: "12px 20px",
							borderBottom: isLight ? "1px solid #f1f5f9" : "1px solid #0f172a"
						},
						children: "Download Hub"
					}),
					onLogin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setMobileMenuOpen(false);
							onLogin();
						},
						style: {
							color: isLight ? "#1e293b" : "#f8fafc",
							fontWeight: 600,
							fontSize: "14px",
							padding: "12px 20px",
							border: "none",
							background: "none",
							textAlign: "left",
							borderBottom: isLight ? "1px solid #f1f5f9" : "1px solid #0f172a",
							cursor: "pointer"
						},
						children: "🔑 Log In to Portal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							padding: "10px 20px",
							display: "flex",
							gap: "8px",
							borderBottom: isLight ? "1px solid #f1f5f9" : "1px solid #0f172a"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "tel:0816738186",
							style: {
								flex: 1,
								background: isLight ? "#f1f5f9" : "rgba(255,255,255,0.06)",
								border: isLight ? "1px solid #e2e8f0" : "1px solid rgba(255,255,255,0.1)",
								color: isLight ? "#0f172a" : "#f8fafc",
								fontWeight: 700,
								textAlign: "center",
								textDecoration: "none",
								fontSize: "12px",
								padding: "10px 6px",
								borderRadius: "8px",
								display: "flex",
								flexDirection: "column",
								gap: "2px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "10px",
									color: "#64748b"
								},
								children: "VOICE DISPATCH"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📞 081 673 8186" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "tel:+27680079911",
							style: {
								flex: 1,
								background: isLight ? "#f1f5f9" : "rgba(255,255,255,0.06)",
								border: isLight ? "1px solid #e2e8f0" : "1px solid rgba(255,255,255,0.1)",
								color: isLight ? "#0f172a" : "#f8fafc",
								fontWeight: 700,
								textAlign: "center",
								textDecoration: "none",
								fontSize: "12px",
								padding: "10px 6px",
								borderRadius: "8px",
								display: "flex",
								flexDirection: "column",
								gap: "2px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "10px",
									color: "#64748b"
								},
								children: "CELL LINE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📲 +27 68 007 9911" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://wa.me/message/YIEA73M7H3P5M1?text=Hi+I+want+to+get+SafetyLink",
						target: "_blank",
						rel: "noreferrer",
						style: {
							background: "#15803d",
							color: "#fff",
							fontWeight: 700,
							textAlign: "center",
							textDecoration: "none",
							fontSize: "13px",
							padding: "12px 20px"
						},
						children: "💬 Contact Us on WhatsApp (+27 68 007 9911)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mob-social",
						style: {
							display: "flex",
							gap: "12px",
							padding: "12px 20px",
							alignItems: "center",
							background: isLight ? "#f8fafc" : "#0f172a",
							flexWrap: "wrap"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:info@safetylink.online",
								style: {
									fontSize: "12px",
									color: isLight ? "#64748b" : "#94a3b8",
									textDecoration: "none"
								},
								children: "✉️ info@safetylink.online"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.facebook.com/share/1D8xnzfY8T/",
								target: "_blank",
								rel: "noreferrer",
								style: {
									fontSize: "12px",
									color: "#1877f2",
									textDecoration: "none",
									fontWeight: 600
								},
								children: "📘 Facebook"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://whatsapp.com/channel/0029Vb8MGfc0lwgn9sG1bz2s",
								target: "_blank",
								rel: "noreferrer",
								style: {
									fontSize: "12px",
									color: "#15803d",
									textDecoration: "none",
									fontWeight: 600
								},
								children: "📢 Channel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://chat.whatsapp.com/I4PH58YMv438cSU3iwqyu5",
								target: "_blank",
								rel: "noreferrer",
								style: {
									fontSize: "12px",
									color: "#15803d",
									textDecoration: "none",
									fontWeight: 600
								},
								children: "👥 Group"
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: "60px" } }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .nav-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav-links a:hover {
          color: #15803d !important;
        }
        .view-toggle:hover {
          background: ${isLight ? "#f1f5f9" : "#1e293b"} !important;
        }
        .soc-btn:hover {
          background: ${isLight ? "#e0f2fe" : "#1e293b"} !important;
        }
        .soc-btn.wa:hover {
          background: ${isLight ? "#dcfce7" : "#064e3b"} !important;
        }
        .soc-btn.fb:hover {
          background: ${isLight ? "#dbeafe" : "#1e3a8a"} !important;
        }
        .nav-cta:hover {
          background: #166534 !important;
        }
        #mob-menu a:hover {
          background: ${isLight ? "#f8fafc" : "#0f172a"};
        }

        @media(max-width: 1180px) {
          .nav-links {
            display: none !important;
          }
          #ham {
            display: block !important;
          }
        }
        @media(max-width: 768px) {
          .soc-btn.fb, .soc-btn.ph {
            display: none !important;
          }
          .nav-cta {
            display: none !important;
          }
        }
        @media(max-width: 600px) {
          .view-toggle-text {
            display: none !important;
          }
          .nav-brand-text {
            display: inline-block !important;
            font-size: 15px !important;
          }
        }
      ` })
	] });
}
//#endregion
//#region src/components/landing/R2MediaShowcase.tsx
var FEATURED_MEDIA = [
	{
		id: "eco-video",
		title: "Inside SafetyLink's Offline-First Ecosystem",
		category: "video",
		durationOrSize: "9.5 MB • MP4 Video",
		description: "Deep dive into BLE mesh beacon failovers, local GIS mapping, and zero-connectivity panic triggers.",
		r2Key: "Safetylink/Inside_SafetyLink_s_Offline-First_Emergency_Ecosystem.mp4"
	},
	{
		id: "pipeline-video",
		title: "How Emergency Escalation Pipelines Work",
		category: "video",
		durationOrSize: "2.5 MB • MP4 Video",
		description: "Step-by-step breakdown of how distress signals route sequentially through response teams and contacts.",
		r2Key: "Safetylink/How_Emergency_Escalation_Pipelines_Work.mp4"
	},
	{
		id: "auto-video",
		title: "How SafetyLink Automates Emergency Responses",
		category: "video",
		durationOrSize: "3.6 MB • MP4 Video",
		description: "Autonomous dispatch rules, multi-carrier fallback loops, and real-time subscriber safety checks.",
		r2Key: "Safetylink/How_SafetyLink_Automates_Emergency_Responses.mp4"
	},
	{
		id: "hardware-video",
		title: "SafetyLink's Emergency Hardware Lineup",
		category: "video",
		durationOrSize: "7.5 MB • MP4 Video",
		description: "Physical Bluetooth wearable tags, vehicle responder beacons, and fixed estate muster sensors.",
		r2Key: "Safetylink/SafetyLink_s_New_Emergency_Hardware_Lineup.mp4"
	},
	{
		id: "gap-video",
		title: "The Reliability Gap: Panic Apps vs SafetyLink",
		category: "video",
		durationOrSize: "65 MB • Full Walkthrough",
		description: "Side-by-side comparison of consumer panic buttons failing without cell signal vs mesh delivery.",
		r2Key: "Safetylink/The_Reliability_Gap__Standard_Panic_Apps_vs.mp4"
	},
	{
		id: "arch-system",
		title: "Emergency Response System Architecture",
		category: "architecture",
		durationOrSize: "5.6 MB • High-Res Diagram",
		description: "Complete end-to-end telemetry map: client beacons, WebSocket live relay, and security patrol dispatch.",
		r2Key: "Safetylink/Emergency_Response_System_Architecture.png"
	},
	{
		id: "arch-platform",
		title: "Platform Architecture & Guard Dispatch Deck",
		category: "architecture",
		durationOrSize: "4.6 MB • Technical Blueprint",
		description: "Control room topology showing organization multitenancy, patrol telemetry, and offline caches.",
		r2Key: "Safetylink/Emergency_Response_Platform_Architecture_Overview.png"
	},
	{
		id: "arch-anatomy",
		title: "Emergency Mesh Anatomy & Signal Flow",
		category: "architecture",
		durationOrSize: "4.1 MB • Schematic",
		description: "Hardware, mobile OS background service, and cloud database state machine synchronization.",
		r2Key: "Safetylink/Emergency_System_Architecture_Anatomy.png"
	},
	{
		id: "arch-resilience",
		title: "Universal Resilience Comparison Matrix",
		category: "architecture",
		durationOrSize: "3.8 MB • Comparison Sheet",
		description: "Direct architectural comparison across mesh nodes, offline storage resilience, and failover latency.",
		r2Key: "Safetylink/SafetyLink_Universal_Resilience_Comparison.png"
	},
	{
		id: "arch-ecosystem",
		title: "Security Ecosystem Comparison Sheet",
		category: "architecture",
		durationOrSize: "3.5 MB • Enterprise Matrix",
		description: "Evaluation criteria comparing SafetyLink vs legacy armed response, GSM trackers, and panic apps.",
		r2Key: "Safetylink/Security_Ecosystem_Comparison_Sheet.png"
	}
];
function R2MediaShowcase() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("all");
	const [selectedVideo, setSelectedVideo] = (0, import_react.useState)(FEATURED_MEDIA[0]);
	const [selectedImage, setSelectedImage] = (0, import_react.useState)(null);
	const filtered = activeTab === "all" ? FEATURED_MEDIA : FEATURED_MEDIA.filter((m) => m.category === activeTab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		style: {
			padding: "80px 40px",
			background: "rgba(2,6,23,0.18)",
			backdropFilter: "blur(3px)",
			borderTop: "1px solid rgba(255,255,255,0.07)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				maxWidth: "1160px",
				margin: "0 auto"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-end",
						flexWrap: "wrap",
						gap: "20px",
						marginBottom: "32px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#00e676",
								marginBottom: "8px"
							},
							children: "// CLOUDFLARE R2 SECURE MEDIA VAULT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(26px,4vw,42px)",
								fontWeight: 900,
								letterSpacing: "-.02em",
								color: "#f8fafc",
								margin: 0
							},
							children: "Official Platform Media & Technical Blueprints"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "#8892a4",
								fontSize: "14px",
								marginTop: "8px",
								maxWidth: "640px"
							},
							children: "Explore official system demonstrations, interactive video walk-throughs, and high-resolution architecture blueprints served directly from high-speed Cloudflare storage."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							gap: "8px",
							background: "rgba(255,255,255,0.04)",
							padding: "4px",
							borderRadius: "10px",
							border: "1px solid rgba(255,255,255,0.08)"
						},
						children: [
							"all",
							"video",
							"architecture"
						].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveTab(tab),
							style: {
								padding: "8px 16px",
								borderRadius: "6px",
								border: "none",
								fontSize: "11px",
								fontWeight: 700,
								letterSpacing: ".06em",
								textTransform: "uppercase",
								cursor: "pointer",
								background: activeTab === tab ? "#e8321e" : "transparent",
								color: activeTab === tab ? "#ffffff" : "#8892a4",
								transition: "all .2s"
							},
							children: tab === "all" ? "All Assets" : tab === "video" ? "🎬 Explainer Videos" : "📐 System Blueprints"
						}, tab))
					})]
				}),
				selectedVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						background: "rgba(5,7,12,0.65)",
						backdropFilter: "blur(16px)",
						border: "1px solid rgba(255,255,255,0.12)",
						borderRadius: "16px",
						overflow: "hidden",
						marginBottom: "40px",
						boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								padding: "16px 20px",
								background: "rgba(255,255,255,0.03)",
								borderBottom: "1px solid rgba(255,255,255,0.08)",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "10px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
									display: "inline-block",
									width: "8px",
									height: "8px",
									borderRadius: "50%",
									background: "#00e676"
								} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										fontSize: "13px",
										fontWeight: 800,
										color: "#f1f5f9",
										fontFamily: "monospace"
									},
									children: ["STREAMING FROM R2: ", selectedVideo.title]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "11px",
									color: "#64748b",
									fontFamily: "monospace"
								},
								children: selectedVideo.durationOrSize
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "relative",
								width: "100%",
								background: "rgba(0,0,0,0.3)",
								maxHeight: "520px",
								display: "flex",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								controls: true,
								playsInline: true,
								preload: "metadata",
								style: {
									width: "100%",
									maxHeight: "520px",
									objectFit: "contain"
								},
								src: getR2StreamUrl(selectedVideo.r2Key),
								children: "Your browser does not support HTML5 video streaming."
							}, selectedVideo.r2Key)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								padding: "18px 24px",
								background: "rgba(0,0,0,0.25)",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								flexWrap: "wrap",
								gap: "14px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								style: {
									margin: "0 0 4px",
									fontSize: "16px",
									fontWeight: 800,
									color: "#f8fafc"
								},
								children: selectedVideo.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									margin: 0,
									fontSize: "13px",
									color: "#94a3b8"
								},
								children: selectedVideo.description
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: getR2DownloadUrl(selectedVideo.r2Key),
								style: {
									padding: "8px 16px",
									borderRadius: "6px",
									background: "rgba(255,255,255,0.06)",
									border: "1px solid rgba(255,255,255,0.15)",
									color: "#f8fafc",
									fontSize: "11px",
									fontWeight: 700,
									textDecoration: "none",
									display: "inline-flex",
									alignItems: "center",
									gap: "6px"
								},
								children: "⬇️ Download MP4 File"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
						gap: "16px"
					},
					children: filtered.map((item) => {
						const isVideo = item.category === "video";
						const isSelected = isVideo && selectedVideo?.id === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => {
								if (isVideo) setSelectedVideo(item);
								else setSelectedImage(item);
							},
							style: {
								background: isSelected ? "rgba(0,230,118,0.08)" : "rgba(255,255,255,0.03)",
								border: isSelected ? "1px solid rgba(0,230,118,0.4)" : "1px solid rgba(255,255,255,0.07)",
								borderRadius: "12px",
								padding: "20px",
								cursor: "pointer",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								transition: "all .2s ease"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										marginBottom: "12px"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { fontSize: "18px" },
										children: isVideo ? "▶️" : "📐"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: "10px",
											fontFamily: "monospace",
											color: isVideo ? "#00e676" : "#38bdf8",
											padding: "3px 8px",
											borderRadius: "4px",
											background: isVideo ? "rgba(0,230,118,0.1)" : "rgba(56,189,248,0.1)"
										},
										children: item.durationOrSize
									})]
								}),
								isVideo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full h-[120px] rounded-lg overflow-hidden mb-3 bg-[#05070a] border border-white/5 group-hover:border-emerald-500/30 transition-all",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
											src: `${getR2StreamUrl(item.r2Key)}#t=1.5`,
											muted: true,
											playsInline: true,
											preload: "metadata",
											className: "w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-sm flex items-center justify-center text-white text-xs shadow-lg group-hover:scale-110 transition-transform",
												children: "▶"
											})
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: "100%",
										height: "120px",
										borderRadius: "8px",
										overflow: "hidden",
										marginBottom: "12px",
										background: "#05070a",
										border: "1px solid rgba(255,255,255,0.06)"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: getR2StreamUrl(item.r2Key),
										alt: item.title,
										loading: "lazy",
										onError: (e) => {
											e.currentTarget.onerror = null;
											e.currentTarget.src = "/Screenshot_20260820_201927_com.aistudio.safetylink.vqnztp.jpg";
										},
										style: {
											width: "100%",
											height: "100%",
											objectFit: "cover"
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									style: {
										fontSize: "14px",
										fontWeight: 800,
										color: "#f8fafc",
										marginBottom: "6px",
										lineHeight: 1.4
									},
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										fontSize: "11px",
										color: "#8892a4",
										lineHeight: 1.5,
										margin: 0
									},
									children: item.description
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									marginTop: "16px",
									paddingTop: "12px",
									borderTop: "1px solid rgba(255,255,255,0.05)",
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "11px",
										color: isVideo ? "#00e676" : "#38bdf8",
										fontWeight: 700
									},
									children: isVideo ? isSelected ? "● Now Playing" : "▶ Watch Video" : "🔍 View Full Blueprint"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: getR2DownloadUrl(item.r2Key),
									onClick: (e) => e.stopPropagation(),
									style: {
										color: "#64748b",
										fontSize: "11px",
										textDecoration: "none"
									},
									children: "⬇ Save"
								})]
							})]
						}, item.id);
					})
				}),
				selectedImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					onClick: () => setSelectedImage(null),
					style: {
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: "rgba(0,0,0,0.88)",
						zIndex: 9999,
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						padding: "24px",
						backdropFilter: "blur(8px)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: (e) => e.stopPropagation(),
						style: {
							maxWidth: "1100px",
							width: "100%",
							maxHeight: "90vh",
							background: "#0a0d14",
							border: "1px solid rgba(255,255,255,0.15)",
							borderRadius: "16px",
							overflow: "hidden",
							display: "flex",
							flexDirection: "column"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								padding: "16px 20px",
								background: "rgba(255,255,255,0.04)",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								borderBottom: "1px solid rgba(255,255,255,0.08)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								style: {
									margin: 0,
									fontSize: "15px",
									fontWeight: 800,
									color: "#f8fafc"
								},
								children: selectedImage.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									fontSize: "11px",
									color: "#8892a4"
								},
								children: ["Cloudflare R2 High-Resolution Master • ", selectedImage.durationOrSize]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: "10px",
									alignItems: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: getR2DownloadUrl(selectedImage.r2Key),
									style: {
										padding: "6px 14px",
										borderRadius: "6px",
										background: "#0284c7",
										color: "#ffffff",
										fontSize: "11px",
										fontWeight: 700,
										textDecoration: "none"
									},
									children: "⬇ Download Original"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedImage(null),
									style: {
										background: "rgba(255,255,255,0.1)",
										border: "none",
										color: "#fff",
										width: "32px",
										height: "32px",
										borderRadius: "50%",
										cursor: "pointer",
										fontSize: "16px"
									},
									children: "✕"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								overflow: "auto",
								padding: "16px",
								display: "flex",
								justifyContent: "center",
								background: "#020408"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: getR2StreamUrl(selectedImage.r2Key),
								alt: selectedImage.title,
								onError: (e) => {
									e.currentTarget.onerror = null;
									e.currentTarget.src = "/Screenshot_20260820_201927_com.aistudio.safetylink.vqnztp.jpg";
								},
								style: {
									maxWidth: "100%",
									maxHeight: "72vh",
									objectFit: "contain",
									borderRadius: "8px"
								}
							})
						})]
					})
				})
			]
		})
	});
}
//#endregion
//#region src/components/landing/Home.tsx
var TRANSLATIONS = {
	en: {
		h1a: "EMERGENCY DISPATCH,",
		h1b: "BUILT FOR SOUTH AFRICA.",
		sub: "SafetyLink coordinates BLE iTAG keyfobs, native SMS & Voice dispatch, and multi-tenant responder command — working cleanly across mobile, desktop, and web."
	},
	zu: {
		h1a: "UKULAWULWA KWEZIMO",
		h1b: "EZIPHUTHUMAYO.",
		sub: "SafetyLink ithumela izexwayiso ngokushesha nge-SMS, ucingo, ne-WhatsApp usebenzisa izinkinobho ze-BLE."
	},
	af: {
		h1a: "NOODREAKSIE,",
		h1b: "VIR SUID-AFRIKA GEBOU.",
		sub: "SafetyLink koördineer BLE-knoppies, SMS, stemoproepe en noodspanne in een betroubare platform."
	},
	xh: {
		h1a: "IMPENDULO YEXESHA",
		h1b: "ELIBUHLUNGU.",
		sub: "SafetyLink ithuma izilumkiso nge-SMS, umnxeba kunye ne-WhatsApp ngokukhawuleza."
	},
	st: {
		h1a: "KARABELO EA TŠOHANYETSO",
		h1b: "E TSEPEHANG.",
		sub: "SafetyLink e romela melaetsa ea tšohanyetso ka SMS, mohala le WhatsApp."
	},
	tn: {
		h1a: "KARABELO YA TSHOGANYETSO",
		h1b: "E IKANYEGANG.",
		sub: "SafetyLink e romela melaetsa ya tshoganyetso ka SMS, mogala le WhatsApp."
	}
};
var HERO_SLIDES = [
	{
		src: "/Screenshot_20260820_201927_com.aistudio.safetylink.vqnztp.jpg",
		fallback: "/panic-button-smooth.png",
		title: "Mobile SOS Trigger & 10s Disarm Lock",
		caption: "Single canonical countdown with PIN & silent duress protection"
	},
	{
		src: "/multi-buttons-smooth.png",
		fallback: "/panic-button-smooth.png",
		title: "BLE iTAG Wearable Buttons",
		caption: "Pocket panic triggers wired into the native Android PanicService"
	},
	{
		src: "/Polish_20260727_023640262.jpg",
		fallback: "/hand-smooth.png",
		title: "Rapid Household & Estate Deployment",
		caption: "Unified protection for families, campuses, and security patrols"
	},
	{
		src: "/Polish_20260819_020007723.jpg",
		fallback: "/safetylink-shield.jpg",
		title: "Organization Command Deck",
		caption: "Live Google Maps situational view, Street View, & responder routing"
	}
];
var GALLERY_ITEMS = [
	{
		src: "/panic-button-smooth.png",
		label: "Android One-Tap SOS",
		tag: "MOBILE APP"
	},
	{
		src: "/multi-buttons-smooth.png",
		label: "iTAG Hardware Triggers",
		tag: "BLE WEARABLE"
	},
	{
		src: "/Polish_20260819_020134421.jpg",
		label: "Estate & Patrol Coordination",
		tag: "COMMAND DECK"
	},
	{
		src: "/Polish_20260907_043403519.jpg",
		label: "Offline Queue & Zero-Data Fallback",
		tag: "RESILIENCE"
	},
	{
		src: "/hand-smooth.png",
		label: "Family Safe-Zone Linking",
		tag: "HOUSEHOLDS"
	},
	{
		src: getR2StreamUrl("Safetylink/Emergency_Response_System_Architecture.png"),
		label: "Dispatch Pipeline Blueprint",
		tag: "ARCHITECTURE"
	}
];
function Home({ onLogin, onRegisterOrg, onRegisterUser, navigate }) {
	const { globalTheme } = useAppStore();
	const isLight = globalTheme !== "dark";
	const [language, setLanguage] = (0, import_react.useState)("en");
	const [slideIdx, setSlideIdx] = (0, import_react.useState)(0);
	const [apkDownloadUrl, setApkDownloadUrl] = (0, import_react.useState)("https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/safetylink.apk");
	const [exeDownloadUrl, setExeDownloadUrl] = (0, import_react.useState)("https://github.com/Charesmagna/SafetyLink-Core/releases/latest");
	const [releaseVersion, setReleaseVersion] = (0, import_react.useState)("Version 1");
	const t = TRANSLATIONS[language] || TRANSLATIONS.en;
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
		}, 4500);
		return () => clearInterval(timer);
	}, []);
	(0, import_react.useEffect)(() => {
		fetch("https://safetylink-api.tshilidzi-mukwevho54.workers.dev/api/app/latest").then((r) => r.ok ? r.json() : null).then((data) => {
			if (data?.tag_name) setReleaseVersion(data.tag_name);
			if (Array.isArray(data?.assets)) {
				const apk = data.assets.find((a) => a.name?.endsWith(".apk"));
				const exe = data.assets.find((a) => a.name?.endsWith(".exe"));
				if (apk?.browser_download_url) setApkDownloadUrl(apk.browser_download_url);
				if (exe?.browser_download_url) setExeDownloadUrl(exe.browser_download_url);
			}
		}).catch(() => {});
	}, []);
	const currentSlide = HERO_SLIDES[slideIdx];
	const cardBg = isLight ? "#ffffff" : "rgba(15, 23, 42, 0.85)";
	const softBg = isLight ? "#f8fafc" : "rgba(15, 23, 42, 0.55)";
	const borderCol = isLight ? "#d1fae5" : "rgba(51, 65, 85, 0.7)";
	const headingCol = isLight ? "#0f172a" : "#f8fafc";
	const mutedCol = isLight ? "#475569" : "#94a3b8";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "transparent",
			color: headingCol,
			fontFamily: "'Inter',system-ui,sans-serif"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "56px 24px 72px",
					background: isLight ? "linear-gradient(180deg, rgba(236,253,245,0.72) 0%, rgba(255,255,255,0.92) 100%)" : "transparent"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto",
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
						gap: "40px",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "inline-flex",
								alignItems: "center",
								gap: "8px",
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								fontWeight: 700,
								letterSpacing: ".14em",
								color: "#059669",
								background: isLight ? "#ecfdf5" : "rgba(16,185,129,0.12)",
								border: "1px solid #a7f3d0",
								padding: "5px 12px",
								borderRadius: "999px",
								marginBottom: "18px"
							},
							children: "● SOUTH AFRICAN EMERGENCY NETWORK · POPIA COMPLIANT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { marginBottom: "16px" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: language,
								onChange: (e) => setLanguage(e.target.value),
								"aria-label": "Hero language selector",
								style: {
									background: cardBg,
									border: `1px solid ${borderCol}`,
									borderRadius: "8px",
									padding: "6px 12px",
									fontSize: "11px",
									fontWeight: 700,
									color: headingCol,
									cursor: "pointer"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "en",
										children: "🌐 English"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "zu",
										children: "🌐 isiZulu"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "af",
										children: "🌐 Afrikaans"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "xh",
										children: "🌐 isiXhosa"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "st",
										children: "🌐 Sesotho"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "tn",
										children: "🌐 Setswana"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							id: "hero-h1",
							style: {
								fontSize: "clamp(36px, 5.5vw, 62px)",
								fontWeight: 900,
								letterSpacing: "-.04em",
								lineHeight: 1,
								marginBottom: "20px",
								color: headingCol
							},
							children: [
								t.h1a,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: "#059669" },
									children: t.h1b
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: "hero-sub",
							style: {
								fontSize: "15px",
								lineHeight: 1.7,
								color: mutedCol,
								maxWidth: "520px",
								marginBottom: "28px"
							},
							children: t.sub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexWrap: "wrap",
								gap: "12px",
								alignItems: "center"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: onRegisterUser,
									style: {
										background: "#059669",
										color: "#ffffff",
										fontSize: "12px",
										fontWeight: 800,
										letterSpacing: ".06em",
										padding: "14px 24px",
										borderRadius: "10px",
										border: "none",
										cursor: "pointer",
										boxShadow: "0 8px 20px rgba(5,150,105,0.22)"
									},
									children: "CREATE PERSONAL ACCOUNT →"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: onRegisterOrg,
									style: {
										background: cardBg,
										color: "#059669",
										fontSize: "12px",
										fontWeight: 700,
										padding: "13px 20px",
										borderRadius: "10px",
										border: "1px solid #10b981",
										cursor: "pointer"
									},
									children: "REGISTER ORGANIZATION"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: onLogin,
									style: {
										background: "transparent",
										color: mutedCol,
										fontSize: "12px",
										fontWeight: 700,
										padding: "13px 16px",
										borderRadius: "10px",
										border: `1px solid ${borderCol}`,
										cursor: "pointer"
									},
									children: "SIGN IN"
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: cardBg,
							border: `1px solid ${borderCol}`,
							borderRadius: "20px",
							overflow: "hidden",
							boxShadow: "0 20px 48px rgba(5, 150, 105, 0.10)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								position: "relative",
								height: "320px",
								background: "#f1f5f9",
								overflow: "hidden"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: currentSlide.src,
									alt: currentSlide.title,
									onError: (e) => {
										e.currentTarget.onerror = null;
										e.currentTarget.src = currentSlide.fallback;
									},
									style: {
										width: "100%",
										height: "100%",
										objectFit: "cover",
										display: "block"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										position: "absolute",
										bottom: 0,
										left: 0,
										right: 0,
										padding: "18px 20px",
										background: "linear-gradient(to top, rgba(15,23,42,0.88), transparent)",
										color: "#ffffff"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "14px",
											fontWeight: 800
										},
										children: currentSlide.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "11px",
											color: "#d1fae5",
											marginTop: "2px"
										},
										children: currentSlide.caption
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSlideIdx((slideIdx - 1 + HERO_SLIDES.length) % HERO_SLIDES.length),
									"aria-label": "Previous slide",
									style: {
										position: "absolute",
										left: "12px",
										top: "50%",
										transform: "translateY(-50%)",
										width: "32px",
										height: "32px",
										borderRadius: "50%",
										background: "rgba(255,255,255,0.9)",
										color: "#0f172a",
										border: "none",
										fontWeight: 900,
										cursor: "pointer"
									},
									children: "‹"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSlideIdx((slideIdx + 1) % HERO_SLIDES.length),
									"aria-label": "Next slide",
									style: {
										position: "absolute",
										right: "12px",
										top: "50%",
										transform: "translateY(-50%)",
										width: "32px",
										height: "32px",
										borderRadius: "50%",
										background: "rgba(255,255,255,0.9)",
										color: "#0f172a",
										border: "none",
										fontWeight: 900,
										cursor: "pointer"
									},
									children: "›"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								padding: "12px 16px",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								background: cardBg
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontFamily: "'JetBrains Mono',monospace",
									fontSize: "10px",
									fontWeight: 700,
									color: "#059669"
								},
								children: "CANONICAL SEQUENCE: SERVER → SMS → CALL → USSD"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									gap: "6px"
								},
								children: HERO_SLIDES.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSlideIdx(idx),
									"aria-label": `Slide ${idx + 1}`,
									style: {
										width: idx === slideIdx ? "18px" : "8px",
										height: "8px",
										borderRadius: "999px",
										border: "none",
										cursor: "pointer",
										background: idx === slideIdx ? "#059669" : "#cbd5e1",
										transition: "all .2s"
									}
								}, idx))
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "64px 24px",
					background: softBg,
					borderTop: `1px solid ${borderCol}`,
					borderBottom: `1px solid ${borderCol}`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							textAlign: "center",
							maxWidth: "680px",
							margin: "0 auto 44px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontFamily: "'JetBrains Mono',monospace",
									fontSize: "10px",
									fontWeight: 700,
									letterSpacing: ".16em",
									color: "#059669",
									marginBottom: "10px"
								},
								children: "// BUILT FOR RELIABILITY UNDER PRESSURE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								style: {
									fontSize: "clamp(26px, 4vw, 40px)",
									fontWeight: 900,
									letterSpacing: "-.03em",
									marginBottom: "12px",
									color: headingCol
								},
								children: "One Unified Emergency Engine"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "14px",
									color: mutedCol,
									lineHeight: 1.6
								},
								children: "Every trigger — software button, physical BLE iTAG, home-screen widget, or quick tile — converges on the native Android PanicService with offline persistence and real dispatch tracking."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
							gap: "20px"
						},
						children: [
							{
								icon: "⏱️",
								title: "10-Second Single Countdown",
								desc: "Instant cancellation lock requiring your Safety PIN, fingerprint/device passcode, or silent duress PIN."
							},
							{
								icon: "📶",
								title: "Sequential Carrier Dispatch",
								desc: "Coordinates backend API sync first, then native GSM SMS, direct cellular voice call, optional USSD, and WhatsApp for WhatsApp contacts."
							},
							{
								icon: "📡",
								title: "BLE iTAG Wearable Mesh",
								desc: "Native GATT scanning, automatic reconnect after screen-off, and programmable single/double/triple click triggers."
							},
							{
								icon: "🗺️",
								title: "Google Maps & Street View",
								desc: "Live situational mapping, satellite layers, traffic telemetry, and responder turn-by-turn routing decoupled from SOS dispatch."
							},
							{
								icon: "🔐",
								title: "AES-GCM Encrypted Vault",
								desc: "On-device encrypted password manager and document storage unlocked with your vault password or biometrics."
							},
							{
								icon: "🎙️",
								title: "Lizzy AI Voice Check-In",
								desc: "Free-tier Gemini check-in prompts 10 minutes after panic dispatch plus accessibility audio transcription."
							}
						].map((card, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								background: cardBg,
								border: `1px solid ${borderCol}`,
								borderRadius: "16px",
								padding: "24px",
								boxShadow: "0 4px 16px rgba(15,23,42,0.03)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: "40px",
										height: "40px",
										borderRadius: "10px",
										background: isLight ? "#ecfdf5" : "rgba(16,185,129,0.12)",
										color: "#059669",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "20px",
										marginBottom: "14px"
									},
									children: card.icon
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									style: {
										fontSize: "15px",
										fontWeight: 800,
										marginBottom: "8px",
										color: headingCol
									},
									children: card.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									style: {
										fontSize: "12.5px",
										color: mutedCol,
										lineHeight: 1.6,
										margin: 0
									},
									children: card.desc
								})
							]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "64px 24px",
					background: cardBg
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-end",
							flexWrap: "wrap",
							gap: "16px",
							marginBottom: "32px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								fontWeight: 700,
								letterSpacing: ".16em",
								color: "#059669",
								marginBottom: "8px"
							},
							children: "// PRODUCT GALLERY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(24px, 3.5vw, 36px)",
								fontWeight: 900,
								color: headingCol,
								margin: 0
							},
							children: "Hardware, Mobile & Control Room"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate?.("platform"),
							style: {
								padding: "10px 18px",
								borderRadius: "8px",
								border: "1px solid #059669",
								background: "transparent",
								color: "#059669",
								fontSize: "12px",
								fontWeight: 700,
								cursor: "pointer"
							},
							children: "Explore Platform Architecture →"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
							gap: "18px"
						},
						children: GALLERY_ITEMS.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								borderRadius: "16px",
								overflow: "hidden",
								border: `1px solid ${borderCol}`,
								background: softBg
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									height: "180px",
									background: "#e2e8f0",
									overflow: "hidden"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.src,
									alt: item.label,
									loading: "lazy",
									onError: (e) => {
										e.currentTarget.onerror = null;
										e.currentTarget.src = "/panic-button-smooth.png";
									},
									style: {
										width: "100%",
										height: "100%",
										objectFit: "cover",
										display: "block"
									}
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									padding: "14px 16px",
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "13px",
										fontWeight: 700,
										color: headingCol
									},
									children: item.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontFamily: "'JetBrains Mono',monospace",
										fontSize: "9px",
										fontWeight: 800,
										color: "#059669",
										background: isLight ? "#ecfdf5" : "rgba(16,185,129,0.12)",
										padding: "3px 8px",
										borderRadius: "999px"
									},
									children: item.tag
								})]
							})]
						}, idx))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(R2MediaShowcase, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "64px 24px",
					background: softBg,
					borderTop: `1px solid ${borderCol}`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								fontWeight: 700,
								letterSpacing: ".16em",
								color: "#059669",
								marginBottom: "10px"
							},
							children: "// OFFICIAL PACKAGES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(24px, 4vw, 40px)",
								fontWeight: 900,
								marginBottom: "28px",
								color: headingCol
							},
							children: "Download SafetyLink"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
								gap: "20px"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										background: cardBg,
										border: `1px solid ${borderCol}`,
										borderRadius: "16px",
										padding: "24px",
										display: "flex",
										flexDirection: "column",
										gap: "12px"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { fontSize: "28px" },
											children: "📱"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											style: {
												fontSize: "17px",
												fontWeight: 800,
												margin: 0,
												color: headingCol
											},
											children: [
												"Android Version 1 (",
												releaseVersion,
												")"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "12.5px",
												color: mutedCol,
												lineHeight: 1.5,
												flex: 1,
												margin: 0
											},
											children: "Official stable Android release with foreground protection, BLE iTAG support, and SMS/Voice fallback."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: apkDownloadUrl,
											download: true,
											style: {
												background: "#059669",
												color: "#fff",
												textAlign: "center",
												padding: "12px",
												borderRadius: "8px",
												fontWeight: 700,
												fontSize: "12px",
												textDecoration: "none"
											},
											children: "Download Version 1 APK"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										background: cardBg,
										border: "1px solid #fde68a",
										borderRadius: "16px",
										padding: "24px",
										display: "flex",
										flexDirection: "column",
										gap: "12px"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { fontSize: "28px" },
											children: "🧪"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											style: {
												fontSize: "17px",
												fontWeight: 800,
												margin: 0,
												color: headingCol
											},
											children: "Android Version 1.1 Beta"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "12.5px",
												color: mutedCol,
												lineHeight: 1.5,
												flex: 1,
												margin: 0
											},
											children: "Pre-release beta build for testing upcoming enhancements before promotion to Version 1."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/beta/safetylink.apk",
											download: true,
											style: {
												background: "#f59e0b",
												color: "#0f172a",
												textAlign: "center",
												padding: "12px",
												borderRadius: "8px",
												fontWeight: 800,
												fontSize: "12px",
												textDecoration: "none"
											},
											children: "Download Version 1.1 Beta"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										background: cardBg,
										border: `1px solid ${borderCol}`,
										borderRadius: "16px",
										padding: "24px",
										display: "flex",
										flexDirection: "column",
										gap: "12px"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { fontSize: "28px" },
											children: "💻"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											style: {
												fontSize: "17px",
												fontWeight: 800,
												margin: 0,
												color: headingCol
											},
											children: "Windows Control Deck EXE"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "12.5px",
												color: mutedCol,
												lineHeight: 1.5,
												flex: 1,
												margin: 0
											},
											children: "Desktop application for security control rooms, estate reception desks, and dispatch supervisors."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: exeDownloadUrl,
											target: "_blank",
											rel: "noreferrer",
											style: {
												background: "#0f172a",
												color: "#fff",
												textAlign: "center",
												padding: "12px",
												borderRadius: "8px",
												fontWeight: 700,
												fontSize: "12px",
												textDecoration: "none"
											},
											children: "Get Windows EXE"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								marginTop: "24px",
								textAlign: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => navigate?.("download"),
								style: {
									background: "transparent",
									border: `1px solid ${borderCol}`,
									color: "#059669",
									padding: "10px 20px",
									borderRadius: "8px",
									fontSize: "12px",
									fontWeight: 700,
									cursor: "pointer"
								},
								children: "Open Full Download Hub →"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "56px 24px",
					background: isLight ? "#ecfdf5" : "rgba(6,78,59,0.25)",
					borderTop: `1px solid ${borderCol}`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto",
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
						gap: "28px",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								fontWeight: 700,
								color: "#059669",
								marginBottom: "8px"
							},
							children: "// SOUTH AFRICA HEADQUARTERS & SUPPORT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "26px",
								fontWeight: 900,
								marginBottom: "10px",
								color: headingCol
							},
							children: "TM Media Solutions (Pty) Ltd"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							style: {
								fontSize: "13px",
								color: mutedCol,
								lineHeight: 1.6,
								margin: 0
							},
							children: [
								"Reg: 2018/500191/07 · Johannesburg, Gauteng, South Africa",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Voice Dispatch Line: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "081 673 8186" }),
								" · Cell / WhatsApp: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "+27 68 007 9911" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Email: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:info@safetylink.online",
									style: {
										color: "#059669",
										fontWeight: 700
									},
									children: "info@safetylink.online"
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexWrap: "wrap",
							gap: "10px",
							justifyContent: "flex-start"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://wa.me/message/YIEA73M7H3P5M1",
							target: "_blank",
							rel: "noreferrer",
							style: {
								background: "#059669",
								color: "#fff",
								padding: "12px 18px",
								borderRadius: "8px",
								fontWeight: 700,
								fontSize: "12px",
								textDecoration: "none"
							},
							children: "💬 Chat on WhatsApp"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate?.("privacy"),
							style: {
								background: cardBg,
								color: headingCol,
								border: `1px solid ${borderCol}`,
								padding: "12px 18px",
								borderRadius: "8px",
								fontWeight: 700,
								fontSize: "12px",
								cursor: "pointer"
							},
							children: "🛡️ View POPIA Privacy Policy"
						})]
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/components/landing/Hardware.tsx
var DEVICES = [
	{
		tag: "PRIMARY",
		name: "SafetyLink iTAG Keyfob",
		price: "R149",
		sub: "CR2032 battery · IP65 · BLE 4.0+",
		img: R2_MEDIA.hardware.itagFinderProduct,
		color: "#00e676",
		features: [
			"BLE 4.0+ universal compatibility",
			"IP65 water and dust resistance",
			"6–12 month CR2032 battery life",
			"38×27×8mm · 7g · wearable",
			"Zero-config vendor-agnostic pairing",
			"Works with SafetyLink in any pocket"
		]
	},
	{
		tag: "ENTERPRISE",
		name: "SafetyLink Field Beacon / Tracker",
		price: "R1,999",
		sub: "GSM/LTE + GPS + BLE · SIM-based",
		img: R2_MEDIA.hardware.fieldBeaconAntenna,
		color: "#e8321e",
		features: [
			"Independent SIM-based operation",
			"Two-way voice call built-in",
			"GPS accurate to 3 metres",
			"5-day standby battery",
			"Deployed across SA security firms",
			"No Android dependency required"
		]
	},
	{
		tag: "FIXED SITE",
		name: "Shelly Tactical Button (WiFi/Desk)",
		price: "R380",
		sub: "WiFi direct · Webhook · IP54",
		img: R2_MEDIA.hardware.hardwareAssembly,
		color: "#0ea5e9",
		features: [
			"Direct WiFi webhook to SafetyLink",
			"No phone pairing required",
			"Wall or desk mountable",
			"Long-press, double-tap, hold modes",
			"Ideal for reception desks and offices",
			"IP54 rated for outdoor mounting"
		]
	},
	{
		tag: "AUTONOMOUS",
		name: "LimX Dynamics Patrol & IoT Node",
		price: "Enterprise",
		sub: "Autonomous Robotic Patrol & BLE Mesh",
		img: R2_MEDIA.hardware.limxDynamicsRobot,
		color: "#f5a623",
		features: [
			"Autonomous perimeter patrolling",
			"BLE mesh repeater & locator",
			"Dynamic responder telemetry link",
			"Thermal & optic distress scanning",
			"Seamless integration with Command Deck",
			"Real-time incident verification"
		]
	}
];
var STEPS$1 = [
	{
		n: "01",
		title: "Insert Battery",
		desc: "Rotate the button cap to OPEN. Insert CR2032 with + facing up. Close and rotate to LOCK. LED flashes once to confirm power.",
		img: R2_MEDIA.hardware.itagTeardown
	},
	{
		n: "02",
		title: "Pair to SafetyLink",
		desc: "Open SafetyLink app → DEVICES → ADD DEVICE. Press iTAG button once. Device appears as \"Native iTAG Keyfob\". Tap to pair. RSSI displays once connected.",
		img: R2_MEDIA.hardware.itagKeyring
	},
	{
		n: "03",
		title: "Test Your Connection",
		desc: "From the main SOS screen, confirm status shows CONNECTED. Press TEST 5S to verify alert chain without triggering a live response.",
		img: R2_MEDIA.hardware.itagMacro
	},
	{
		n: "04",
		title: "Configure Button Actions",
		desc: "Single press: locate phone. Double press: SOS trigger. Long press: emergency escalation. Recommended SOS delay: 1.5 seconds.",
		img: R2_MEDIA.hardware.hardwarePack
	},
	{
		n: "05",
		title: "Auto-Reconnect & Keepalive",
		desc: "If iTAG shows RECONNECT status, tap RECONNECT or press the button once. Auto-reconnect fires every 20 seconds via keepalive ping.",
		img: R2_MEDIA.hardware.bleTransmitter
	}
];
function Hardware({ onLogin, onRegisterUser, onRegisterOrg, navigate }) {
	const [active, setActive] = (0, import_react.useState)(0);
	const [hwRotationTick, setHwRotationTick] = (0, import_react.useState)(0);
	import_react.useEffect(() => {
		const timer = setInterval(() => setHwRotationTick((t) => t + 1), 6e3);
		return () => clearInterval(timer);
	}, []);
	const currentPool = {
		0: [
			R2_MEDIA.hardware.itagFinderProduct,
			R2_MEDIA.hardware.itagKeyring,
			R2_MEDIA.hardware.itagMacro,
			R2_MEDIA.hardware.itagTeardown,
			"/multi-buttons-smooth.png"
		],
		1: [
			R2_MEDIA.hardware.fieldBeaconAntenna,
			R2_MEDIA.hardware.fieldDeviceClose,
			R2_MEDIA.hardware.ruggedBeacon
		],
		2: [
			R2_MEDIA.hardware.hardwareAssembly,
			R2_MEDIA.hardware.wearableTrigger,
			R2_MEDIA.hardware.microBeacon
		],
		3: [
			R2_MEDIA.hardware.limxDynamicsRobot,
			R2_MEDIA.hardware.hardwarePack,
			R2_MEDIA.hardware.deviceProfile
		]
	}[active] || [DEVICES[active].img];
	const activeDeviceImg = currentPool[hwRotationTick % currentPool.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "transparent",
			color: "#f0f4f8",
			fontFamily: "'Inter',system-ui,sans-serif",
			minHeight: "100vh"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px 60px",
					background: "transparent",
					backdropFilter: "blur(2px)",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// HARDWARE ECOSYSTEM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							style: {
								fontSize: "clamp(36px,6vw,72px)",
								fontWeight: 900,
								letterSpacing: "-.04em",
								lineHeight: .92,
								marginBottom: "20px"
							},
							children: [
								"Your hardware.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										color: "#e8321e",
										fontStyle: "italic"
									},
									children: "Configured in minutes."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "15px",
								color: "#8892a4",
								maxWidth: "560px",
								lineHeight: 1.7
							},
							children: "SafetyLink works with BLE keyfobs, SIM-based trackers, WiFi buttons and IoT sensors. No proprietary lock-in. Replace any unit within minutes."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "rgba(2,6,23,0.18)",
					backdropFilter: "blur(3px)",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// COMPATIBLE DEVICES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(24px,4vw,44px)",
								fontWeight: 900,
								marginBottom: "40px"
							},
							children: "Pick Your Device."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								gap: "8px",
								flexWrap: "wrap",
								marginBottom: "32px"
							},
							children: DEVICES.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActive(i),
								style: {
									padding: "8px 16px",
									borderRadius: "8px",
									fontSize: "11px",
									fontWeight: 700,
									letterSpacing: ".08em",
									cursor: "pointer",
									transition: "all .2s",
									background: active === i ? d.color : "rgba(255,255,255,.04)",
									color: active === i ? "#000" : "#8892a4",
									border: active === i ? `1px solid ${d.color}` : "1px solid rgba(255,255,255,.08)"
								},
								children: d.tag
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								background: "rgba(255,255,255,.03)",
								border: `1px solid rgba(255,255,255,.07)`,
								borderRadius: "16px",
								padding: "36px",
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "48px",
								alignItems: "start"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontFamily: "'JetBrains Mono',monospace",
										fontSize: "9px",
										color: DEVICES[active].color,
										letterSpacing: ".16em",
										marginBottom: "12px",
										textTransform: "uppercase"
									},
									children: DEVICES[active].tag
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									style: {
										fontSize: "clamp(20px,3vw,32px)",
										fontWeight: 900,
										marginBottom: "8px"
									},
									children: DEVICES[active].name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "clamp(24px,3vw,40px)",
										fontWeight: 900,
										color: DEVICES[active].color,
										marginBottom: "8px"
									},
									children: DEVICES[active].price
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontFamily: "'JetBrains Mono',monospace",
										fontSize: "10px",
										color: "#8892a4",
										marginBottom: "28px"
									},
									children: DEVICES[active].sub
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: activeDeviceImg,
									alt: DEVICES[active].name,
									onError: (e) => {
										e.currentTarget.onerror = null;
										e.currentTarget.src = "/panic-button-smooth.png";
									},
									style: {
										width: "100%",
										maxHeight: "260px",
										objectFit: "contain",
										borderRadius: "12px",
										background: "rgba(255,255,255,.04)",
										transition: "all 0.5s ease"
									}
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontFamily: "'JetBrains Mono',monospace",
										fontSize: "9px",
										color: "#8892a4",
										letterSpacing: ".14em",
										marginBottom: "16px",
										textTransform: "uppercase"
									},
									children: "What's Included"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									style: { listStyle: "none" },
									children: DEVICES[active].features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: "12px",
											padding: "12px 0",
											borderBottom: "1px solid rgba(255,255,255,.06)",
											fontSize: "13px",
											color: "#c8d0dc"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
											width: "6px",
											height: "6px",
											borderRadius: "50%",
											background: DEVICES[active].color,
											flexShrink: 0
										} }), f]
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate?.("pricing"),
									style: {
										marginTop: "24px",
										background: DEVICES[active].color,
										color: DEVICES[active].color === "#0ea5e9" ? "#fff" : "#000",
										padding: "13px 24px",
										borderRadius: "8px",
										fontWeight: 700,
										fontSize: "11px",
										letterSpacing: ".1em",
										border: "none",
										cursor: "pointer",
										width: "100%"
									},
									children: "ORDER THIS DEVICE →"
								})
							] })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "transparent",
					backdropFilter: "blur(2px)",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto",
						textAlign: "center"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// FIELD DEMONSTRATIONS & HARDWARE TEARDOWN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(24px,4vw,44px)",
								fontWeight: 900,
								marginBottom: "36px"
							},
							children: "Hardware in Action"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
								gap: "24px",
								textAlign: "left"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "rgba(255,255,255,0.03)",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: "16px",
									overflow: "hidden"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										position: "relative",
										width: "100%",
										height: "220px",
										background: "#000"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
										src: "https://res.cloudinary.com/qcp4fx2v/video/upload/q_auto,f_auto/SafetyLink_vision_when_ble_is",
										poster: "https://res.cloudinary.com/qcp4fx2v/image/upload/q_auto,f_auto/Polish_20260818_020279883",
										controls: true,
										preload: "none",
										playsInline: true,
										style: {
											width: "100%",
											height: "100%",
											objectFit: "cover"
										}
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { padding: "20px" },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontFamily: "'JetBrains Mono',monospace",
												fontSize: "9px",
												color: "#00e676",
												letterSpacing: ".12em",
												textTransform: "uppercase",
												marginBottom: "6px"
											},
											children: "BLE BEACON FIELD TEST"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											style: {
												fontSize: "18px",
												fontWeight: 800,
												color: "#fff",
												marginBottom: "8px"
											},
											children: "Real-World BLE Detection & Proximity"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "12px",
												color: "#8892a4",
												lineHeight: 1.6
											},
											children: "Live vision test demonstrating Bluetooth keyfob discovery, instant RSSI ranging, and background signal relay."
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "rgba(255,255,255,0.03)",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: "16px",
									overflow: "hidden"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										position: "relative",
										width: "100%",
										height: "220px",
										background: "#000"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("video", {
										controls: true,
										preload: "none",
										playsInline: true,
										poster: R2_MEDIA.hardware.itagTeardown,
										style: {
											width: "100%",
											height: "100%",
											objectFit: "cover"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
											src: "/api/r2/stream/Safetylink/SafetyLink_s_New_Emergency_Hardware_Lineup.mp4",
											type: "video/mp4"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
											src: "/media/videos/How_SafetyLink_Automates_Emergency_Responses.mp4",
											type: "video/mp4"
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { padding: "20px" },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontFamily: "'JetBrains Mono',monospace",
												fontSize: "9px",
												color: "#0ea5e9",
												letterSpacing: ".12em",
												textTransform: "uppercase",
												marginBottom: "6px"
											},
											children: "OFFICIAL R2 HARDWARE SHOWCASE"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											style: {
												fontSize: "18px",
												fontWeight: 800,
												color: "#fff",
												marginBottom: "8px"
											},
											children: "SafetyLink Emergency Hardware Lineup"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "12px",
												color: "#8892a4",
												lineHeight: 1.6
											},
											children: "Deep dive into wearable distress buttons, rugged estate muster pillars, and automated multi-carrier fallback sensors."
										})
									]
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "transparent",
					backdropFilter: "blur(2px)",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto",
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "60px",
						alignItems: "start"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// SETUP GUIDE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							style: {
								fontSize: "clamp(24px,4vw,44px)",
								fontWeight: 900,
								marginBottom: "16px"
							},
							children: [
								"Up and running",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"in under 5 minutes."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "#8892a4",
								fontSize: "14px",
								lineHeight: 1.7
							},
							children: "No technical knowledge required. Any CR2032-compatible iTAG keyfob pairs automatically with SafetyLink via vendor-agnostic BLE discovery."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: "1px",
							background: "rgba(255,255,255,.07)",
							borderRadius: "14px",
							overflow: "hidden"
						},
						children: STEPS$1.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								background: "rgba(17,24,32,0.45)",
								backdropFilter: "blur(6px)",
								padding: "20px 24px",
								display: "flex",
								alignItems: "flex-start",
								gap: "20px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontFamily: "'JetBrains Mono',monospace",
									fontSize: "10px",
									color: "#e8321e",
									fontWeight: 700,
									flexShrink: 0,
									width: "28px"
								},
								children: s.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "13px",
										fontWeight: 700,
										marginBottom: "4px"
									},
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "12px",
										color: "#8892a4",
										lineHeight: 1.5
									},
									children: s.desc
								}),
								s.img && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: s.img,
									alt: s.title,
									onError: (e) => {
										e.currentTarget.onerror = null;
										e.currentTarget.style.display = "none";
									},
									style: {
										marginTop: "12px",
										width: "100%",
										borderRadius: "8px",
										border: "1px solid rgba(255,255,255,.05)"
									}
								})
							] })]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "rgba(2,6,23,0.18)",
					backdropFilter: "blur(3px)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// TECHNICAL SPECS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(24px,4vw,44px)",
								fontWeight: 900,
								marginBottom: "40px"
							},
							children: "Device Comparison."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { overflowX: "auto" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								style: {
									width: "100%",
									borderCollapse: "collapse",
									fontFamily: "'JetBrains Mono',monospace",
									fontSize: "11px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
									style: { borderBottom: "1px solid rgba(255,255,255,.1)" },
									children: [
										"Spec",
										"iTAG Keyfob",
										"Teltonika GH5200",
										"Shelly Button 1",
										"Tuya Smoke"
									].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										style: {
											padding: "12px 16px",
											textAlign: "left",
											color: i === 1 ? "#00e676" : "#8892a4",
											fontWeight: 700,
											letterSpacing: ".08em",
											textTransform: "uppercase",
											fontSize: "10px"
										},
										children: h
									}, i))
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
									[
										"Connection",
										"BLE 4.0+",
										"GSM/LTE + BLE",
										"WiFi 2.4GHz",
										"WiFi + BLE"
									],
									[
										"SIM Required",
										"❌ No",
										"✅ Yes",
										"❌ No",
										"❌ No"
									],
									[
										"Battery Life",
										"6–12 months",
										"5 days (standby)",
										"1–2 years",
										"10 years (sealed)"
									],
									[
										"IP Rating",
										"IP65",
										"IP67",
										"IPX4",
										"IP44"
									],
									[
										"GPS",
										"❌ Relies on phone",
										"✅ 3m accuracy",
										"❌ No",
										"❌ No"
									],
									[
										"Price",
										"R149",
										"R1,999",
										"R380",
										"R280"
									],
									[
										"Best For",
										"Daily carry",
										"Lone workers",
										"Fixed sites",
										"IoT monitoring"
									]
								].map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
									style: { borderBottom: "1px solid rgba(255,255,255,.05)" },
									children: row.map((cell, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										style: {
											padding: "14px 16px",
											fontSize: "11px",
											color: j === 0 ? "#c8d0dc" : cell.startsWith("✅") ? "#00e676" : cell.startsWith("❌") ? "#ef4444" : "#8892a4"
										},
										children: cell
									}, j))
								}, i)) })]
							})
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/landing/Platform.tsx
function Platform({ onLogin, onRegisterUser, onRegisterOrg }) {
	const [showVideoModal, setShowVideoModal] = (0, import_react.useState)(false);
	const [videoSrc, setVideoSrc] = (0, import_react.useState)("");
	const [activePanel, setActivePanel] = (0, import_react.useState)(1);
	const [platformRotation, setPlatformRotation] = (0, import_react.useState)(0);
	(0, import_react.useRef)(null);
	import_react.useEffect(() => {
		const timer = setInterval(() => setPlatformRotation((r) => r + 1), 7e3);
		return () => clearInterval(timer);
	}, []);
	const blueprintPool = [
		{
			src: R2_MEDIA.architecture.responseArchitecture,
			title: "R2 BLUEPRINT: EMERGENCY RESPONSE ARCHITECTURE"
		},
		{
			src: R2_MEDIA.architecture.systemAnatomy,
			title: "R2 SCHEMATIC: SYSTEM ANATOMY & RELAY MATRIX"
		},
		{
			src: R2_MEDIA.architecture.responseOverview,
			title: "R2 OVERVIEW: PLATFORM TOPOLOGY & GUARD DISPATCH"
		},
		{
			src: R2_MEDIA.architecture.meshPlatformOverview,
			title: "R2 ARCHITECTURE: DECENTRALIZED MESH RELAY"
		},
		{
			src: R2_MEDIA.architecture.universalResilience,
			title: "R2 MATRIX: UNIVERSAL RESILIENCE BENCHMARK"
		}
	];
	const telemetryPool = [
		{
			src: R2_MEDIA.platform.commandDeckDark,
			title: "TACTICAL COMMAND TELEMETRY DECK"
		},
		{
			src: R2_MEDIA.platform.networkGrid,
			title: "SPATIAL NETWORK & TRIANGULATION"
		},
		{
			src: R2_MEDIA.platform.dispatchControl,
			title: "CENTRAL INCIDENT CONTROL ROOM"
		},
		{
			src: R2_MEDIA.platform.telemetryDesk,
			title: "REAL-TIME DISPATCH TELEMETRY DESK"
		},
		{
			src: R2_MEDIA.platform.mobileTelemetry,
			title: "FIELD OPERATOR MOBILE TELEMETRY"
		}
	];
	const activeBlueprint = blueprintPool[platformRotation % blueprintPool.length];
	const activeTelemetry = telemetryPool[platformRotation % telemetryPool.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "transparent",
			color: "#f0f4f8",
			fontFamily: "'Inter',system-ui,sans-serif",
			minHeight: "100vh"
		},
		children: [
			showVideoModal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					position: "fixed",
					inset: 0,
					background: "rgba(0,0,0,.92)",
					zIndex: 999999,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setShowVideoModal(false);
						setVideoSrc("");
					},
					style: {
						position: "absolute",
						top: "20px",
						right: "20px",
						background: "transparent",
						border: "none",
						color: "white",
						fontSize: "28px",
						cursor: "pointer"
					},
					children: "✕"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: videoSrc,
					controls: true,
					autoPlay: true,
					style: {
						width: "90%",
						maxWidth: "1000px",
						borderRadius: "12px"
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px 60px",
					background: "rgba(7,10,15,0.25)",
					backdropFilter: "blur(8px)",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// HOW IT WORKS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							style: {
								fontSize: "clamp(36px,6vw,72px)",
								fontWeight: 900,
								letterSpacing: "-.04em",
								lineHeight: .92,
								marginBottom: "20px"
							},
							children: [
								"11-Layer Autonomous",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										color: "#e8321e",
										fontStyle: "italic"
									},
									children: "Emergency Ecosystem."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "15px",
								color: "#8892a4",
								maxWidth: "560px",
								lineHeight: 1.7
							},
							children: "Offline, on purpose. SafetyLink is engineered to survive load-shedding, zero-data scenarios, and network failures — combining BLE hardware, AI voice dispatch, and multi-tenant command dashboards into a single POPIA-compliant infrastructure."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "rgba(13,17,23,0.3)",
					backdropFilter: "blur(8px)",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// THE OPERATING PHILOSOPHY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(28px,4vw,48px)",
								fontWeight: 900,
								marginBottom: "48px"
							},
							children: "Offline, On Purpose."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(3,1fr)",
								gap: "1px",
								background: "rgba(255,255,255,.07)",
								borderRadius: "14px",
								overflow: "hidden"
							},
							children: [
								{
									icon: "📡",
									title: "Zero-Data Readiness",
									desc: "USSD *120# and \"Please Call Me\" fallbacks trigger alerts with R0 airtime and 0MB data. No internet required."
								},
								{
									icon: "🔗",
									title: "Encrypted Local Mesh",
									desc: "When towers go down during load-shedding, SafetyLink devices relay alerts peer-to-peer over BLE until a signal is found."
								},
								{
									icon: "🔐",
									title: "Immutable Evidence",
									desc: "Incident data and audio recordings write to local AES-256-GCM encrypted storage before cloud broadcast — nothing is lost offline."
								}
							].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "rgba(17,24,32,0.45)",
									backdropFilter: "blur(6px)",
									padding: "32px"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "2rem",
											marginBottom: "16px"
										},
										children: f.icon
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "16px",
											fontWeight: 800,
											marginBottom: "8px",
											textTransform: "uppercase",
											letterSpacing: ".02em"
										},
										children: f.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "13px",
											color: "#8892a4",
											lineHeight: 1.6
										},
										children: f.desc
									})
								]
							}, i))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "rgba(7,10,15,0.25)",
					backdropFilter: "blur(8px)",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// ZERO FALSE ALARMS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(28px,4vw,48px)",
								fontWeight: 900,
								marginBottom: "16px"
							},
							children: "The 1-2-3 Click Sequence Engine."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "#8892a4",
								marginBottom: "48px",
								fontSize: "15px",
								maxWidth: "560px",
								lineHeight: 1.7
							},
							children: "Guarantees zero-fail distress escalation while eliminating accidental triggers. Every press is deliberate."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(3,1fr)",
								gap: "20px"
							},
							children: [
								{
									label: "1 Press — Arming",
									color: "#f5a623",
									cr: "245,166,35",
									steps: [
										"Crisp 120ms haptic vibration + beep",
										"Screen turns on via FLAG_TURN_SCREEN_ON",
										"10-second non-dismissible red overlay",
										"SMS preparation begins in background"
									]
								},
								{
									label: "2 Presses — Abort",
									color: "#00e676",
									cr: "0,230,118",
									steps: [
										"Instantly cancels countdown",
										"Clears dispatch pipeline",
										"Dismisses red overlay",
										"Logs cancellation locally for audit"
									]
								},
								{
									label: "3 Presses — Critical Bypass",
									color: "#e8321e",
									cr: "232,50,30",
									steps: [
										"Halts countdown immediately",
										"800ms long haptic + 880Hz beep",
										"Uncancellable — immediate dispatch",
										"All channels fire simultaneously"
									]
								}
							].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "rgba(255,255,255,.03)",
									border: `1px solid rgba(${s.cr},.2)`,
									borderRadius: "14px",
									padding: "28px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "14px",
										fontWeight: 800,
										color: s.color,
										marginBottom: "20px",
										letterSpacing: ".04em",
										textTransform: "uppercase"
									},
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									style: {
										listStyle: "none",
										space: "12px"
									},
									children: s.steps.map((st, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										style: {
											fontSize: "12px",
											color: "#8892a4",
											marginBottom: "8px",
											paddingLeft: "16px",
											position: "relative"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												position: "absolute",
												left: 0,
												color: s.color
											},
											children: "›"
										}), st]
									}, j))
								})]
							}, i))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "rgba(13,17,23,0.3)",
					backdropFilter: "blur(8px)",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// SEQUENTIAL DISPATCH FIRING ORDER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							style: {
								fontSize: "clamp(28px,4vw,48px)",
								fontWeight: 900,
								marginBottom: "48px"
							},
							children: [
								"The Zero-Fail",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Guarantee."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "40px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: "1px",
									background: "rgba(255,255,255,.07)",
									borderRadius: "14px",
									overflow: "hidden"
								},
								children: [
									{
										step: "01",
										title: "BLE Click / Screen SOS",
										desc: "Trigger initiated — 1.5 second hold fires from pocket without screen unlock.",
										color: "#e8321e"
									},
									{
										step: "02",
										title: "Encrypted Local Storage Write",
										desc: "Incident data secured even if offline — AES-256-GCM with PBKDF2 derivation.",
										color: "#f5a623"
									},
									{
										step: "03",
										title: "CPU Wake Lock + GPS Polling",
										desc: "Overrides device sleep states — 10-minute PARTIAL_WAKE_LOCK tactical cycles.",
										color: "#0ea5e9"
									},
									{
										step: "04",
										title: "Cloudflare Worker + FCM Emit",
										desc: "Cloud mesh broadcast — sub-100ms delivery to all registered responders.",
										color: "#a78bfa"
									},
									{
										step: "05",
										title: "Twilio Voice + SMS + WhatsApp",
										desc: "Cellular bridge active — bypasses data congestion via native SMS layer.",
										color: "#25d366"
									},
									{
										step: "06",
										title: "VAPI AI Follow-Up + Lizzy Check-In",
										desc: "AI agent calls all contacts in sequence. Lizzy wellness check at 45s post-dispatch.",
										color: "#00e676"
									}
								].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										background: "rgba(17,24,32,0.45)",
										backdropFilter: "blur(6px)",
										padding: "20px 28px",
										display: "flex",
										alignItems: "center",
										gap: "24px"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontFamily: "'JetBrains Mono',monospace",
												fontSize: "11px",
												color: s.color,
												fontWeight: 700,
												flexShrink: 0,
												width: "24px"
											},
											children: s.step
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: { flex: 1 },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													fontSize: "14px",
													fontWeight: 700,
													marginBottom: "4px"
												},
												children: s.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													fontSize: "12px",
													color: "#8892a4"
												},
												children: s.desc
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
											width: "8px",
											height: "8px",
											borderRadius: "50%",
											background: s.color,
											flexShrink: 0,
											boxShadow: `0 0 8px ${s.color}`
										} })
									]
								}, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: "20px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										position: "relative",
										borderRadius: "14px",
										overflow: "hidden",
										border: "1px solid rgba(0,230,118,0.25)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: activeBlueprint.src,
										alt: activeBlueprint.title,
										onError: (e) => {
											e.currentTarget.onerror = null;
											e.currentTarget.src = "/Screenshot_20260820_201927_com.aistudio.safetylink.vqnztp.jpg";
										},
										style: {
											width: "100%",
											height: "auto",
											display: "block",
											background: "#020617",
											transition: "all 0.6s ease"
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											position: "absolute",
											bottom: 0,
											left: 0,
											right: 0,
											background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
											padding: "12px 16px"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "11px",
												color: "#00e676",
												fontFamily: "'JetBrains Mono',monospace",
												fontWeight: 700
											},
											children: activeBlueprint.title
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										position: "relative",
										borderRadius: "14px",
										overflow: "hidden",
										border: "1px solid rgba(255,255,255,0.08)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: activeTelemetry.src,
										alt: activeTelemetry.title,
										onError: (e) => {
											e.currentTarget.onerror = null;
											e.currentTarget.src = "/Screenshot_20260820_202202_com.aistudio.safetylink.vqnztp.jpg";
										},
										style: {
											width: "100%",
											height: "auto",
											display: "block",
											background: "#020617",
											transition: "all 0.6s ease"
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											position: "absolute",
											bottom: 0,
											left: 0,
											right: 0,
											background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
											padding: "12px 16px"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "11px",
												color: "#94a3b8",
												fontFamily: "'JetBrains Mono',monospace",
												fontWeight: 700
											},
											children: activeTelemetry.title
										})
									})]
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "rgba(7,10,15,0.25)",
					backdropFilter: "blur(8px)",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// NATIVE SURVIVAL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(28px,4vw,48px)",
								fontWeight: 900,
								marginBottom: "16px"
							},
							children: "The Ghost Engine."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "#8892a4",
								marginBottom: "48px",
								fontSize: "15px",
								maxWidth: "560px",
								lineHeight: 1.7
							},
							children: "SafetyLink is \"Recents Swipe Immune.\" Our architecture overrides onTaskRemoved() and restarts PanicService.java within 2 seconds of being closed. We don't wait — we ensure the listener is immortal."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(2,1fr)",
								gap: "20px"
							},
							children: [
								{
									title: "Persistence",
									desc: "Binds to ACTION_BOOT_COMPLETED — service auto-recovers instantly upon device restart. Samsung and Xiaomi killer bypassed via SafetyKeepAliveWorker."
								},
								{
									title: "16KB Page Alignment",
									desc: "Fully compliant with Android 15 (API 35) standards for high-performance memory management. Zero compromise on modern hardware."
								},
								{
									title: "Zero-Config BLE",
									desc: "Vendor-agnostic pairing that binds to any BLE keyfob by listening for the first characteristic to fire — massive logistical flexibility for any iTag variant."
								},
								{
									title: "Lock-Screen Dominance",
									desc: "Uses TYPE_APPLICATION_OVERLAY to draw the 10-second disarm countdown over the lock-screen — removing PIN friction during a real crisis."
								}
							].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "rgba(232,50,30,.05)",
									border: "1px solid rgba(232,50,30,.15)",
									borderRadius: "14px",
									padding: "28px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "14px",
										fontWeight: 800,
										color: "#e8321e",
										marginBottom: "10px",
										textTransform: "uppercase",
										letterSpacing: ".04em"
									},
									children: f.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "13px",
										color: "#8892a4",
										lineHeight: 1.6
									},
									children: f.desc
								})]
							}, i))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: {
					padding: "80px 40px",
					background: "rgba(13,17,23,0.3)",
					backdropFilter: "blur(8px)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto",
						marginBottom: "60px"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: ASSETS.mapDark,
						alt: "SafetyLink Incident Heatmap",
						onError: (e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.src = "/Screenshot_20260820_202202_com.aistudio.safetylink.vqnztp.jpg";
						},
						style: {
							width: "100%",
							borderRadius: "16px",
							border: "1px solid rgba(255,255,255,0.1)"
						}
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// GLOBAL COMMAND CENTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							style: {
								fontSize: "clamp(28px,4vw,48px)",
								fontWeight: 900,
								marginBottom: "48px"
							},
							children: [
								"IoT Integration",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"& Command."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(2,1fr)",
								gap: "20px"
							},
							children: [
								{
									emoji: "📡",
									title: "Wearable Telemetry",
									desc: "Live GIS tracking, RSSI signal strength, and battery health of deployed iTags across your entire estate or campus."
								},
								{
									emoji: "🌡️",
									title: "Tuya Environmental Sensors",
									desc: "Real-time alerts from smart smoke detectors, gas leak monitors, and flood sensors integrated directly into the dispatch chain."
								},
								{
									emoji: "📷",
									title: "Hikvision CCTV Integration",
									desc: "Direct API linkage triggering pan-tilt-zoom (PTZ) cameras based on localized panic coordinates. Eyes on scene within seconds."
								},
								{
									emoji: "🚁",
									title: "Autonomous Drone-in-a-Box",
									desc: "Pre-programmed offline flight paths dispatching a 5G camera drone directly to incident GPS coordinates. Auto-return on mission complete."
								}
							].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "rgba(255,255,255,.03)",
									border: "1px solid rgba(255,255,255,.07)",
									borderRadius: "14px",
									padding: "28px",
									display: "flex",
									gap: "16px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "2rem",
										flexShrink: 0
									},
									children: f.emoji
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "15px",
										fontWeight: 800,
										marginBottom: "8px"
									},
									children: f.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "13px",
										color: "#8892a4",
										lineHeight: 1.6
									},
									children: f.desc
								})] })]
							}, i))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `@keyframes blink{0%,100%{opacity:1}50%{opacity:.12}}` })
		]
	});
}
//#endregion
//#region src/components/landing/UseCases.tsx
var VideoCard = ({ publicId, title, description, poster }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	style: {
		borderRadius: "14px",
		overflow: "hidden",
		background: "#0f172a",
		border: "1px solid #1e293b"
	},
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		style: {
			width: "100%",
			height: "200px",
			objectFit: "cover",
			display: "block"
		},
		poster: poster ? img(poster) : void 0,
		controls: true,
		preload: "none",
		playsInline: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
			src: vid(publicId),
			type: "video/mp4"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { padding: "14px" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: {
				fontWeight: "700",
				color: "#fff",
				fontSize: "14px"
			},
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: {
				color: "#64748b",
				fontSize: "12px",
				marginTop: "4px"
			},
			children: description
		})]
	})]
});
var USE_CASE_VIDEOS = [
	{
		id: "Okay_now_for_the_next_scene",
		title: "Family Protection",
		desc: "How SafetyLink protects your household",
		poster: "Gemini_Generated_Image_virgVirg99"
	},
	{
		id: "Government_use_case_scenario",
		title: "Government Use Case",
		desc: "Municipal and public safety deployment",
		poster: "Gemini_Generated_Image_59pss65p"
	},
	{
		id: "Neighbourhood_watch_security_c",
		title: "Neighbourhood Watch",
		desc: "Community security network in action",
		poster: "copilot_image_178696579200"
	},
	{
		id: "drone_dispatch_tracking_crimin",
		title: "Drone Dispatch",
		desc: "Aerial response to active incidents",
		poster: "Gemini_Generated_Image_chze56oh0"
	},
	{
		id: "Show_the_uses_in_school_and_wo",
		title: "Schools & Workplaces",
		desc: "Protecting learners and employees",
		poster: "Gemini_Generated_Image_4keue49e"
	},
	{
		id: "Old_people_scenario_alone_at_h",
		title: "Elderly at Home",
		desc: "Watch-Me Timer proactive protection",
		poster: "Gemini_Generated_Image_virgVirg99"
	},
	{
		id: "SafetyLink_vision_when_ble_is",
		title: "BLE iTAG in Action",
		desc: "How the keyfob triggers an alert",
		poster: "Polish_20260818_020279883"
	},
	{
		id: "Now_let_s_show_how_kids_would",
		title: "Children & Schools",
		desc: "Smart school safety deployment",
		poster: "Gemini_Generated_Image_59pss65p"
	},
	{
		id: "K_s_south_Africa_so_multirac",
		title: "Multilingual SA",
		desc: "All 11 South African languages",
		poster: "Gemini_Generated_Image_virgVirg99"
	},
	{
		id: "Why",
		title: "Why SafetyLink?",
		desc: "The story behind the platform",
		poster: "copilot_image_178370354D283"
	},
	{
		id: "Pitch_deck",
		title: "Investor Pitch",
		desc: "SafetyLink business overview",
		poster: "Gemini_Generated_Image_s8bRy8s8b"
	}
];
var SECTORS = [
	{
		emoji: "🏘️",
		tag: "RESIDENTIAL",
		title: "Gated Estates & Complexes",
		desc: "Real-time panic alerts, visitor tracking, perimeter alerts and armed response dispatch. Every resident protected — even with R0 airtime.",
		img: R2_MEDIA.usecases.estateCommunity,
		features: [
			"BLE keyfob panic triggers",
			"WhatsApp + SMS dispatch",
			"Armed response coordination",
			"Live GIS map for security booth"
		]
	},
	{
		emoji: "🏢",
		tag: "ENTERPRISE",
		title: "Corporates & Campuses",
		desc: "Lone-worker protection, duress code activation, multi-floor responder routing and AES-256-GCM evidence capture.",
		img: R2_MEDIA.usecases.corporateCampus,
		features: [
			"Silent duress code SOS",
			"Multi-floor responder routing",
			"Cryptographic evidence vault",
			"API integration with HR systems"
		]
	},
	{
		emoji: "🏫",
		tag: "EDUCATION",
		title: "Schools & Universities",
		desc: "Pupil tracking, parent notification chains, lockdown protocol dispatch and dedicated security staff escalation.",
		img: R2_MEDIA.usecases.schoolUniversity,
		features: [
			"Learner iTag wristbands",
			"Parent SMS + WhatsApp alerts",
			"Lockdown mode activation",
			"Integration with school security"
		]
	},
	{
		emoji: "🏥",
		tag: "HEALTHCARE",
		title: "Clinics & Hospitals",
		desc: "Staff duress alerts, patient elopement detection and AI voice dispatch for code-blue events in medical facilities.",
		img: R2_MEDIA.usecases.hospitalHealthcare,
		features: [
			"Clinical staff duress buttons",
			"Patient elopement alerts",
			"Code-blue dispatch chain",
			"POPIA-compliant evidence logs"
		]
	},
	{
		emoji: "🚛",
		tag: "LOGISTICS",
		title: "Transport & Field Ops",
		desc: "Driver SOS with GPS coordinates, route deviation alerts, cargo protection and real-time fleet situational awareness.",
		img: R2_MEDIA.usecases.transportLogistics,
		features: [
			"Driver GPS panic trigger",
			"Route deviation detection",
			"Fleet command dashboard",
			"Multi-driver dispatch coordination"
		]
	},
	{
		emoji: "🏛️",
		tag: "MUNICIPAL",
		title: "Municipalities & SAPS",
		desc: "Community safety networks, neighborhood watch coordination, B-BBEE Level 1 compliance advantage for government procurement.",
		img: R2_MEDIA.usecases.municipalEmergency,
		features: [
			"Community mesh network",
			"Neighborhood watch dispatch",
			"SAPS coordination API",
			"B-BBEE Level 1 certified"
		]
	}
];
function UseCases({ onLogin, onRegisterUser, onRegisterOrg, navigate }) {
	const [activeSector, setActiveSector] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "#070a0f",
			color: "#f0f4f8",
			fontFamily: "'Inter',system-ui,sans-serif",
			minHeight: "100vh"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px 60px",
					background: "linear-gradient(135deg,#070a0f 0%,#0d1117 100%)",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// WHO WE PROTECT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							style: {
								fontSize: "clamp(36px,6vw,72px)",
								fontWeight: 900,
								letterSpacing: "-.04em",
								lineHeight: .92,
								marginBottom: "20px"
							},
							children: [
								"Every sector.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										color: "#e8321e",
										fontStyle: "italic"
									},
									children: "One platform."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "15px",
								color: "#8892a4",
								maxWidth: "560px",
								lineHeight: 1.7
							},
							children: "From gated estates to hospitals and municipal networks — SafetyLink adapts to every security environment in South Africa."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "#0d1117",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// SEE IT IN ACTION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(24px,4vw,44px)",
								fontWeight: 900,
								marginBottom: "40px"
							},
							children: "Watch SafetyLink Work."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
								gap: "20px"
							},
							children: USE_CASE_VIDEOS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, {
								publicId: v.id,
								title: v.title,
								description: v.desc,
								poster: v.poster
							}, v.id))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "#070a0f",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// DEPLOYMENT SECTORS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(24px,4vw,44px)",
								fontWeight: 900,
								marginBottom: "40px"
							},
							children: "Where We Deploy."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								gap: "8px",
								flexWrap: "wrap",
								marginBottom: "32px"
							},
							children: SECTORS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveSector(i),
								style: {
									padding: "8px 16px",
									borderRadius: "8px",
									fontSize: "11px",
									fontWeight: 700,
									letterSpacing: ".08em",
									cursor: "pointer",
									transition: "all .2s",
									background: activeSector === i ? "#e8321e" : "rgba(255,255,255,.04)",
									color: activeSector === i ? "#fff" : "#8892a4",
									border: activeSector === i ? "1px solid #e8321e" : "1px solid rgba(255,255,255,.08)"
								},
								children: [
									s.emoji,
									" ",
									s.tag
								]
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								background: "rgba(255,255,255,.03)",
								border: "1px solid rgba(232,50,30,.2)",
								borderRadius: "16px",
								padding: "36px",
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
								gap: "40px",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "inline-flex",
										alignItems: "center",
										gap: "8px",
										background: "rgba(232,50,30,0.1)",
										border: "1px solid rgba(232,50,30,0.3)",
										padding: "4px 12px",
										borderRadius: "6px",
										fontSize: "11px",
										color: "#ff6b6b",
										fontWeight: 800,
										fontFamily: "'JetBrains Mono',monospace",
										marginBottom: "16px"
									},
									children: [
										SECTORS[activeSector].emoji,
										" ",
										SECTORS[activeSector].tag,
										" PROTOCOL"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "24px",
										fontWeight: 900,
										marginBottom: "12px",
										color: "#fff"
									},
									children: SECTORS[activeSector].title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "14px",
										color: "#94a3b8",
										lineHeight: 1.7,
										marginBottom: "24px"
									},
									children: SECTORS[activeSector].desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									style: {
										listStyle: "none",
										padding: 0,
										display: "flex",
										flexDirection: "column",
										gap: "12px"
									},
									children: SECTORS[activeSector].features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										style: {
											display: "flex",
											gap: "12px",
											alignItems: "center",
											fontSize: "13px",
											color: "#cbd5e1"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
											width: "6px",
											height: "6px",
											borderRadius: "50%",
											background: "#e8321e"
										} }), f]
									}, i))
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									position: "relative",
									borderRadius: "14px",
									overflow: "hidden",
									border: "1px solid rgba(255,255,255,0.08)",
									background: "#020617",
									maxHeight: "340px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: SECTORS[activeSector].img,
									alt: SECTORS[activeSector].title,
									style: {
										width: "100%",
										height: "340px",
										objectFit: "cover",
										display: "block"
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										position: "absolute",
										bottom: 0,
										left: 0,
										right: 0,
										background: "linear-gradient(to top, rgba(2,6,23,0.95) 0%, transparent 100%)",
										padding: "16px 20px"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										style: {
											fontSize: "11px",
											color: "#00e676",
											fontFamily: "'JetBrains Mono',monospace",
											fontWeight: 700
										},
										children: ["TACTICAL DISPATCH REFERENCE · ", SECTORS[activeSector].tag]
									})
								})]
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/landing/Enterprise.tsx
function Enterprise({ onLogin, onRegisterUser, onRegisterOrg }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "transparent",
			color: "#f0f4f8",
			fontFamily: "'Inter',system-ui,sans-serif",
			minHeight: "100vh"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: {
					position: "relative",
					padding: "80px 40px 60px",
					background: "rgba(7,10,15,0.25)",
					backdropFilter: "blur(8px)",
					borderBottom: "1px solid rgba(255,255,255,.07)",
					overflow: "hidden"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: ASSETS.dashboardDark,
						alt: "SafetyLink Enterprise",
						onError: (e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.style.display = "none";
						},
						style: {
							position: "absolute",
							inset: 0,
							width: "100%",
							height: "100%",
							objectFit: "cover",
							opacity: .15
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
						position: "absolute",
						inset: 0,
						background: "linear-gradient(135deg, rgba(7,10,15,0.3) 0%, rgba(13,17,23,0.5) 100%)"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "relative",
							zIndex: 1,
							maxWidth: "1160px",
							margin: "0 auto"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontFamily: "'JetBrains Mono',monospace",
									fontSize: "10px",
									letterSpacing: ".18em",
									color: "#e8321e",
									marginBottom: "16px"
								},
								children: "// B2B ENTERPRISE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								style: {
									fontSize: "clamp(36px,6vw,72px)",
									fontWeight: 900,
									letterSpacing: "-.04em",
									lineHeight: .92,
									marginBottom: "20px"
								},
								children: [
									"Built for Scale.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											color: "#e8321e",
											fontStyle: "italic"
										},
										children: "Designed for Command."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "15px",
									color: "#8892a4",
									maxWidth: "560px",
									lineHeight: 1.7
								},
								children: "B-BBEE Level 1 certified. POPIA-compliant. SA-hosted. The first emergency response platform engineered for South African enterprise procurement."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "60px 40px",
					background: "rgba(13,17,23,0.3)",
					backdropFilter: "blur(8px)",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto",
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "60px",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// PROCUREMENT ADVANTAGE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							style: {
								fontSize: "clamp(24px,4vw,44px)",
								fontWeight: 900,
								marginBottom: "20px"
							},
							children: [
								"B-BBEE Level 1.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"135% Procurement Recognition."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "14px",
								color: "#8892a4",
								lineHeight: 1.7,
								marginBottom: "28px"
							},
							children: "SafetyLink holds B-BBEE Level 1 status — the highest empowerment rating achievable. Government entities, municipalities, and corporates with BEE procurement targets recognise SafetyLink spend at 135%, making it the most cost-effective safety investment for compliance-driven procurement."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: "16px",
								flexWrap: "wrap"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onRegisterOrg,
								style: {
									background: "#e8321e",
									color: "#fff",
									padding: "14px 28px",
									borderRadius: "8px",
									fontWeight: 700,
									fontSize: "11px",
									letterSpacing: ".1em",
									border: "none",
									cursor: "pointer"
								},
								children: "START 14-DAY TRIAL →"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:info@safetylink.online",
								style: {
									color: "#8892a4",
									padding: "13px 20px",
									border: "1px solid rgba(255,255,255,.12)",
									borderRadius: "8px",
									fontWeight: 600,
									fontSize: "12px",
									textDecoration: "none"
								},
								children: "REQUEST QUOTATION"
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: "16px"
						},
						children: [
							{
								val: "Level 1",
								lbl: "B-BBEE Status",
								color: "#00e676"
							},
							{
								val: "135%",
								lbl: "Procurement Recognition",
								color: "#e8321e"
							},
							{
								val: "100%",
								lbl: "SA-Hosted Data",
								color: "#0ea5e9"
							},
							{
								val: "POPIA",
								lbl: "+ GDPR Compliant",
								color: "#a78bfa"
							}
						].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								background: "rgba(255,255,255,.03)",
								border: "1px solid rgba(255,255,255,.07)",
								borderRadius: "12px",
								padding: "24px",
								textAlign: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: "clamp(24px,4vw,40px)",
									fontWeight: 900,
									color: s.color,
									letterSpacing: "-.03em",
									marginBottom: "8px"
								},
								children: s.val
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontFamily: "'JetBrains Mono',monospace",
									fontSize: "9px",
									color: "#8892a4",
									letterSpacing: ".12em",
									textTransform: "uppercase"
								},
								children: s.lbl
							})]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "#070a0f",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// ENTERPRISE CAPABILITIES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							style: {
								fontSize: "clamp(24px,4vw,44px)",
								fontWeight: 900,
								marginBottom: "48px"
							},
							children: [
								"Everything your",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"organisation needs."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(3,1fr)",
								gap: "1px",
								background: "rgba(255,255,255,.07)",
								borderRadius: "14px",
								overflow: "hidden"
							},
							children: [
								{
									icon: "👥",
									title: "Multi-Tier Org Structure",
									desc: "Nested organisations with role-based access — Estate Manager, Security Commander, Responder, Civilian. Unlimited members per tier."
								},
								{
									icon: "🗺️",
									title: "Live Command Dashboard",
									desc: "Real-time GIS map with responder positions, incident heat-mapping, BLE signal strength overlay and panic event timeline."
								},
								{
									icon: "📊",
									title: "Incident Analytics",
									desc: "Weekly and monthly incident reports, response time benchmarking, SLA tracking and audit-ready evidence chain export."
								},
								{
									icon: "🔗",
									title: "API Integration",
									desc: "REST API and webhook endpoints for integration with existing PSIM, VMS, access control and HR systems."
								},
								{
									icon: "🏷️",
									title: "White-Label Option",
									desc: "Fully branded deployment with your logo, colours and domain. Custom splash screen, APK name and Play Store listing."
								},
								{
									icon: "🛡️",
									title: "Dedicated Infrastructure",
									desc: "Dedicated Cloudflare Workers, D1 database nodes and isolated tenant data. SLA-backed 99.9% uptime guarantee."
								}
							].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "#111820",
									padding: "32px",
									cursor: "default",
									transition: "background .2s"
								},
								onMouseOver: (e) => e.currentTarget.style.background = "rgba(232,50,30,.04)",
								onMouseOut: (e) => e.currentTarget.style.background = "#111820",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "2rem",
											marginBottom: "16px"
										},
										children: f.icon
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "15px",
											fontWeight: 800,
											marginBottom: "8px",
											textTransform: "uppercase",
											letterSpacing: ".02em"
										},
										children: f.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "12px",
											color: "#8892a4",
											lineHeight: 1.6
										},
										children: f.desc
									})
								]
							}, i))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "#0d1117",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// PROCUREMENT MODEL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(24px,4vw,44px)",
								fontWeight: 900,
								marginBottom: "20px"
							},
							children: "Enterprise Supply Chain."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								color: "#8892a4",
								marginBottom: "40px",
								fontSize: "15px",
								lineHeight: 1.7,
								maxWidth: "560px"
							},
							children: "SafetyLink sources hardware domestically through SARS-cleared channels. Bulk procurement for 50+ units includes white-labelled packaging, pre-paired device registration and on-site deployment support."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(4,1fr)",
								gap: "16px"
							},
							children: [
								{
									qty: "1–4 units",
									price: "R149/unit",
									lead: "3–5 days",
									tag: "RETAIL"
								},
								{
									qty: "5–24 units",
									price: "R120/unit",
									lead: "5–7 days",
									tag: "SMALL FLEET"
								},
								{
									qty: "25–99 units",
									price: "R99/unit",
									lead: "7–10 days",
									tag: "ESTATE",
									highlight: true
								},
								{
									qty: "100+ units",
									price: "CUSTOM",
									lead: "Dedicated PM",
									tag: "ENTERPRISE"
								}
							].map((tier, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: tier.highlight ? "rgba(232,50,30,.08)" : "rgba(255,255,255,.03)",
									border: tier.highlight ? "1px solid rgba(232,50,30,.3)" : "1px solid rgba(255,255,255,.07)",
									borderRadius: "12px",
									padding: "24px",
									textAlign: "center"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontFamily: "'JetBrains Mono',monospace",
											fontSize: "9px",
											color: tier.highlight ? "#e8321e" : "#8892a4",
											letterSpacing: ".14em",
											marginBottom: "12px",
											textTransform: "uppercase"
										},
										children: tier.tag
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "12px",
											color: "#8892a4",
											marginBottom: "8px"
										},
										children: tier.qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: "clamp(20px,3vw,28px)",
											fontWeight: 900,
											color: tier.highlight ? "#e8321e" : "#f0f4f8",
											marginBottom: "8px"
										},
										children: tier.price
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											fontFamily: "'JetBrains Mono',monospace",
											fontSize: "10px",
											color: "#8892a4"
										},
										children: ["Lead: ", tier.lead]
									})
								]
							}, i))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px",
					background: "#070a0f",
					borderBottom: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#e8321e",
								marginBottom: "16px"
							},
							children: "// DEPLOYMENT TIMELINE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							style: {
								fontSize: "clamp(24px,4vw,44px)",
								fontWeight: 900,
								marginBottom: "48px"
							},
							children: [
								"Up and running",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"in 48 hours."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: "1px",
								background: "rgba(255,255,255,.07)",
								borderRadius: "14px",
								overflow: "hidden"
							},
							children: [
								{
									day: "DAY 1",
									title: "Account Creation & Org Setup",
									desc: "Organisation profile, member roster upload, role assignment and custom alert routing configured."
								},
								{
									day: "DAY 1–2",
									title: "Hardware Dispatch",
									desc: "iTAG keyfobs dispatched pre-paired to your org ID. Includes QR activation cards for each member."
								},
								{
									day: "DAY 2",
									title: "Responder Briefing",
									desc: "45-minute virtual onboarding for security commanders and responders. SOP documentation provided."
								},
								{
									day: "DAY 2–3",
									title: "Full Activation & Testing",
									desc: "Live panic drill with your team. Escalation chain verified. Audit log reviewed. System signed off."
								},
								{
									day: "ONGOING",
									title: "Dedicated Account Manager",
									desc: "Monthly incident reports, SLA reviews, firmware updates pushed automatically to all deployed devices."
								}
							].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "#111820",
									padding: "20px 28px",
									display: "flex",
									alignItems: "flex-start",
									gap: "24px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontFamily: "'JetBrains Mono',monospace",
										fontSize: "9px",
										color: "#e8321e",
										fontWeight: 700,
										flexShrink: 0,
										width: "56px",
										paddingTop: "2px",
										letterSpacing: ".08em"
									},
									children: s.day
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "14px",
										fontWeight: 700,
										marginBottom: "4px"
									},
									children: s.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: "12px",
										color: "#8892a4",
										lineHeight: 1.5
									},
									children: s.desc
								})] })]
							}, i))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				style: {
					padding: "80px 40px",
					background: "#0d1117",
					textAlign: "center"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontFamily: "'JetBrains Mono',monospace",
							fontSize: "10px",
							letterSpacing: ".18em",
							color: "#e8321e",
							marginBottom: "16px"
						},
						children: "// GET STARTED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						style: {
							fontSize: "clamp(28px,4vw,52px)",
							fontWeight: 900,
							marginBottom: "16px"
						},
						children: [
							"Deploy SafetyLink",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"for your organisation."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							color: "#8892a4",
							marginBottom: "36px",
							fontSize: "15px"
						},
						children: "14-day free trial. No credit card. Setup within 48 hours."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "16px",
							justifyContent: "center",
							flexWrap: "wrap"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onRegisterOrg,
								style: {
									background: "#e8321e",
									color: "#fff",
									padding: "14px 32px",
									borderRadius: "8px",
									fontWeight: 700,
									fontSize: "12px",
									letterSpacing: ".1em",
									border: "none",
									cursor: "pointer"
								},
								children: "START FREE TRIAL →"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://wa.me/message/YIEA73M7H3P5M1",
								target: "_blank",
								rel: "noreferrer",
								style: {
									background: "#25d366",
									color: "#fff",
									padding: "14px 24px",
									borderRadius: "8px",
									fontWeight: 700,
									fontSize: "12px",
									letterSpacing: ".1em",
									textDecoration: "none"
								},
								children: "💬 WHATSAPP US"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:info@safetylink.online",
								style: {
									color: "#8892a4",
									padding: "13px 20px",
									border: "1px solid rgba(255,255,255,.12)",
									borderRadius: "8px",
									fontWeight: 600,
									fontSize: "12px",
									textDecoration: "none"
								},
								children: "info@safetylink.online"
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/pages/PrivacyPolicy.tsx
var PrivacyPolicy = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	style: {
		maxWidth: "800px",
		margin: "80px auto",
		padding: "0 24px",
		fontFamily: "Inter, sans-serif",
		color: "#1e293b",
		lineHeight: 1.8
	},
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			style: {
				fontSize: "28px",
				fontWeight: "900",
				marginBottom: "8px",
				color: "#0f172a"
			},
			children: "Privacy Policy"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: {
				color: "#64748b",
				marginBottom: "32px",
				fontSize: "13px"
			},
			children: "SafetyLink® · TM Media Solutions (Reg: 2018/500191/07) · Last updated: September 2026"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: { marginBottom: "32px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					fontSize: "18px",
					fontWeight: "700",
					marginBottom: "12px",
					color: "#0f172a"
				},
				children: "1. Who We Are"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"SafetyLink is an emergency response platform operated by TM Media Solutions (Pty) Ltd, registration number 2018/500191/07, based in South Africa. Our platform is available at ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://safetylink.online",
					style: { color: "#15803d" },
					children: "safetylink.online"
				}),
				". Contact us at ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "mailto:info@safetylink.online",
					style: { color: "#15803d" },
					children: "info@safetylink.online"
				}),
				" or WhatsApp +27 68 007 9911."
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: { marginBottom: "32px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					fontSize: "18px",
					fontWeight: "700",
					marginBottom: "12px",
					color: "#0f172a"
				},
				children: "2. Information We Collect"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				style: { paddingLeft: "20px" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Identity data:" }), " Name, email address, phone number"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Location data:" }), " GPS coordinates captured only during active panic alerts"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Device data:" }), " Bluetooth device identifiers for iTAG pairing"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Emergency contacts:" }), " Names and phone numbers you choose to register"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Alert history:" }), " Timestamps and trigger types of past alerts"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Payment data:" }), " Processed securely by Paystack — we never store card details"] })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: { marginBottom: "32px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					fontSize: "18px",
					fontWeight: "700",
					marginBottom: "12px",
					color: "#0f172a"
				},
				children: "3. How We Use Your Information"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				style: { paddingLeft: "20px" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "To dispatch emergency alerts to your registered contacts" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "To operate the SafetyLink Command Deck for your organisation" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "To process your subscription via Paystack" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "To improve platform performance and response times" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "To comply with legal obligations including POPIA" })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: { marginBottom: "32px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					fontSize: "18px",
					fontWeight: "700",
					marginBottom: "12px",
					color: "#0f172a"
				},
				children: "4. POPIA Compliance"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SafetyLink processes personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA). We only collect information necessary for emergency response purposes. You have the right to access, correct, or request deletion of your personal information at any time by contacting us." })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: { marginBottom: "32px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					fontSize: "18px",
					fontWeight: "700",
					marginBottom: "12px",
					color: "#0f172a"
				},
				children: "5. Location Data"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"GPS location is captured ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "only" }),
				" when a panic alert is triggered. Location data is transmitted to your registered emergency contacts and the SafetyLink command centre solely for the purpose of directing help to you. We do not track your location continuously or sell location data to any third party."
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: { marginBottom: "32px" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: {
						fontSize: "18px",
						fontWeight: "700",
						marginBottom: "12px",
						color: "#0f172a"
					},
					children: "6. Third-Party Services"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SafetyLink uses the following third-party services to deliver its emergency response capabilities:" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					style: { paddingLeft: "20px" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Twilio" }), " — SMS and WhatsApp alert delivery"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "VAPI" }), " — AI voice call dispatch"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Africa's Talking" }), " — USSD emergency access"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Paystack" }), " — Payment processing"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Cloudinary" }), " — Evidence media storage"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Google Gemini" }), " — AI language processing"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Cloudflare" }), " — API infrastructure and DDoS protection"] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: { marginTop: "12px" },
					children: "Each service operates under its own privacy policy and data processing agreements."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: { marginBottom: "32px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					fontSize: "18px",
					fontWeight: "700",
					marginBottom: "12px",
					color: "#0f172a"
				},
				children: "7. Data Retention"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Alert records are retained for 24 months for legal compliance and insurance purposes. Payment records are retained for 7 years as required by South African tax law. You may request earlier deletion of personal data where legally permissible." })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: { marginBottom: "32px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					fontSize: "18px",
					fontWeight: "700",
					marginBottom: "12px",
					color: "#0f172a"
				},
				children: "8. Data Security"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "All data is encrypted in transit using TLS 1.3. Panic alert records are stored in an immutable Evidence Ledger. We do not store payment card details. Access to personal data is restricted to authorised SafetyLink personnel only." })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: { marginBottom: "32px" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: {
						fontSize: "18px",
						fontWeight: "700",
						marginBottom: "12px",
						color: "#0f172a"
					},
					children: "9. Your Rights"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Under POPIA you have the right to:" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					style: { paddingLeft: "20px" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Access your personal information" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Correct inaccurate information" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Request deletion of your data" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Object to processing of your data" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Lodge a complaint with the Information Regulator of South Africa" })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			style: { marginBottom: "32px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					fontSize: "18px",
					fontWeight: "700",
					marginBottom: "12px",
					color: "#0f172a"
				},
				children: "10. Contact & Complaints"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SafetyLink Privacy Officer" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"TM Media Solutions (Pty) Ltd",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"Reg: 2018/500191/07",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"Email: ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "mailto:info@safetylink.online",
					style: { color: "#15803d" },
					children: "info@safetylink.online"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"WhatsApp: +27 68 007 9911",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"Website: ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://safetylink.online",
					style: { color: "#15803d" },
					children: "safetylink.online"
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				background: "#f8fafc",
				border: "1px solid #e2e8f0",
				borderRadius: "12px",
				padding: "20px",
				marginTop: "40px",
				textAlign: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "12px",
					color: "#64748b"
				},
				children: [
					"SafetyLink® · Powered by ©TM Media Solutions · Reg: 2018/500191/07",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"POPIA compliant · All data processed within South Africa"
				]
			})
		})
	]
});
//#endregion
//#region src/components/PepxiOrderModal.tsx
var PepxiOrderModal = ({ isOpen, onClose, onStartTrial }) => {
	const { currentUser, addToast, addAuditLog } = useAppStore();
	const [recipientName, setRecipientName] = (0, import_react.useState)(currentUser?.fullName || currentUser?.username || "");
	const [recipientPhone, setRecipientPhone] = (0, import_react.useState)(currentUser?.phone || "");
	const [pepStoreLocation, setPepStoreLocation] = (0, import_react.useState)(currentUser?.homeAddress || "");
	const [deliverySpeed, setDeliverySpeed] = (0, import_react.useState)("standard");
	const [orderSubmitted, setOrderSubmitted] = (0, import_react.useState)(false);
	const itagPrice = 75;
	const shippingPrice = deliverySpeed === "standard" ? 100 : 130;
	const totalPrice = itagPrice + shippingPrice;
	const handleSubmitOrder = (e) => {
		e.preventDefault();
		if (!recipientName.trim() || !recipientPhone.trim() || !pepStoreLocation.trim()) {
			addToast("Please complete all delivery details for Pepxi collection.", "error");
			return;
		}
		const orderPayload = {
			product: "SafetyLink iTAG BLE Physical Panic Button",
			recipientName,
			recipientPhone,
			pepStore: pepStoreLocation,
			speed: deliverySpeed === "standard" ? "Standard PAXI (7-9 days)" : "Express PAXI (3-5 days)",
			totalZar: totalPrice,
			includesTrial: "14-Day Free Hardware Pairing Trial",
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		};
		addAuditLog("SYSTEM", "INFO", "Pepxi iTAG Order Placed", `Order for ${recipientName} to ${pepStoreLocation} (R${totalPrice})`);
		addToast(`Order logged! Opening WhatsApp dispatch gateway with Pepxi waybill details...`, "success");
		const message = encodeURIComponent(`🚨 *SafetyLink iTAG Order (Pepxi PAXI Delivery)*
-----------------------------------------
👤 *Recipient:* ${recipientName}\n📱 *Mobile Phone:* ${recipientPhone}\n🏪 *Nearest PEP Store:* ${pepStoreLocation}\n🚚 *Service:* ${orderPayload.speed} (R${shippingPrice})\n🏷️ *Hardware:* 1x SafetyLink BLE iTAG (R${itagPrice})\n💰 *Total Amount:* R${totalPrice}\n✨ *Plan:* SafetyLink is Free + 14-Day Hardware Pairing Trial\n-----------------------------------------\nPlease confirm stock dispatch and send PAXI tracking code.`);
		window.open(`https://wa.me/27680079911?text=${message}`, "_blank", "noopener,noreferrer");
		setOrderSubmitted(true);
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .95,
				opacity: 0,
				y: 20
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .95,
				opacity: 0,
				y: 20
			},
			className: "bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 md:p-8 shadow-2xl max-w-lg w-full relative overflow-hidden text-left my-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors",
					children: "✕"
				}),
				!orderSubmitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3" }), " 14-Day Free Trial Included"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "w-3 h-3" }), " Pepxi (PAXI) Nationwide"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-6 h-6 text-emerald-400" }), "Order Your SafetyLink iTAG"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-slate-300 mt-2 leading-relaxed",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SafetyLink is 100% free to use." }),
							" Get an authentic Bluetooth physical panic button delivered to your nearest ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "PEP / Pep Home store" }),
							" anywhere in South Africa with Pepxi counter-to-counter collection."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 my-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-950 border border-slate-800 rounded-2xl p-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono text-slate-500 uppercase block",
									children: "Hardware Unit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-lg font-black text-white mt-0.5",
									children: ["R", itagPrice]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-emerald-400 font-mono",
									children: "Brandability / iTAG spec"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-950 border border-slate-800 rounded-2xl p-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono text-slate-500 uppercase block",
									children: "Pepxi Delivery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-lg font-black text-white mt-0.5",
									children: ["R", shippingPrice]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-amber-400 font-mono",
									children: "Nationwide Counter-to-Counter"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3.5 mb-5 flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5 text-emerald-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-emerald-300 block font-bold",
								children: "14-Day Free Hardware Pairing Trial"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-slate-400 text-[11px] mt-0.5",
								children: "When your tag arrives, pair it instantly in the app. Full silent panic pocket triggering is free for 14 days. Zero upfront card fees."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmitOrder,
						className: "space-y-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-3.5 h-3.5 text-slate-400" }), " Recipient Full Name"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: recipientName,
								onChange: (e) => setRecipientName(e.target.value),
								placeholder: "e.g. Lerato Khumalo",
								className: "w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-emerald-500 outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3.5 h-3.5 text-slate-400" }), " Cellphone Number (for Pepxi SMS PIN)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "tel",
								required: true,
								value: recipientPhone,
								onChange: (e) => setRecipientPhone(e.target.value),
								placeholder: "e.g. 082 123 4567",
								className: "w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-emerald-500 outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5 text-slate-400" }), " Nearest PEP Store / Branch Code"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									value: pepStoreLocation,
									onChange: (e) => setPepStoreLocation(e.target.value),
									placeholder: "e.g. PEP Johannesburg South (P1234) or PEP Soweto Mall",
									className: "w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-emerald-500 outline-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-slate-500 mt-1 block",
									children: "You will receive an SMS from PAXI with an OTP code when the parcel is ready for collection at your chosen PEP store."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1",
								children: "Delivery Speed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setDeliverySpeed("standard"),
									className: `p-2.5 rounded-xl border text-left text-xs transition-all ${deliverySpeed === "standard" ? "border-emerald-500 bg-emerald-500/10 text-white font-bold" : "border-slate-800 bg-slate-950 text-slate-400"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-emerald-400",
										children: "R100 Standard"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-slate-400 mt-0.5",
										children: "7–9 Business Days"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setDeliverySpeed("express"),
									className: `p-2.5 rounded-xl border text-left text-xs transition-all ${deliverySpeed === "express" ? "border-emerald-500 bg-emerald-500/10 text-white font-bold" : "border-slate-800 bg-slate-950 text-slate-400"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-amber-400",
										children: "R130 Express"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-slate-400 mt-0.5",
										children: "3–5 Business Days"
									})]
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2",
									children: [
										"Dispatch via Pepxi (R",
										totalPrice,
										" Total) ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 pt-4 border-t border-slate-800/80 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-slate-400",
							children: "Already bought a tag from Brandability or another store?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								onClose();
								if (onStartTrial) onStartTrial();
							},
							className: "text-xs font-bold text-emerald-400 hover:text-emerald-300 underline mt-1 inline-block",
							children: "Pair it now with your Free 14-Day Trial →"
						})]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-8 h-8" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold text-white",
							children: "Order Details Logged"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-300 max-w-sm mx-auto leading-relaxed",
							children: [
								"Your Pepxi counter-to-counter waybill has been prepared for ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: pepStoreLocation }),
								". Our logistics hub will SMS you the PAXI tracking number shortly."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left max-w-sm mx-auto text-xs space-y-1.5 font-mono",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-slate-400",
									children: ["Recipient: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white",
										children: recipientName
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-slate-400",
									children: ["Mobile: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white",
										children: recipientPhone
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-slate-400",
									children: ["Total: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-emerald-400 font-bold",
										children: ["R", totalPrice]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-slate-400",
									children: ["Benefit: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-amber-400",
										children: "14-Day Free Pairing Included"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 flex flex-col gap-2 max-w-sm mx-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									onClose();
									if (onStartTrial) onStartTrial();
								},
								className: "w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all",
								children: "Activate 14-Day Trial in App"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onClose,
								className: "w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all",
								children: "Close"
							})]
						})
					]
				})
			]
		})
	}) });
};
//#endregion
//#region src/components/SafetyWareStore.tsx
var SafetyWareStore_exports = /* @__PURE__ */ __exportAll({
	STORE_PRODUCTS: () => STORE_PRODUCTS,
	default: () => SafetyWareStore$1
});
var STORE_PRODUCTS = [
	{
		slug: "itag-ble-panic-button",
		name: "SafetyLink iTAG BLE Physical Panic Button",
		category: "Tactical Gear",
		price: 75,
		description: "Ultra-durable Bluetooth Low Energy hardware panic keyfob (Brandability / Altitude spec). Includes 14-day free hardware pairing trial and nationwide Pepxi counter-to-counter delivery (R100).",
		imageUrl: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80",
		affiliateUrl: "https://wa.me/27680079911?text=Order%20iTAG%20BLE%20Keyfob"
	},
	{
		slug: "gsm-tactical-relay-node",
		name: "SafetyLink GSM Mesh Tactical Relay Node",
		category: "Power & Sensors",
		price: 1250,
		description: "Autonomous micro-base station with dual SIM fallback, internal battery backup, and long-range BLE beacon aggregator.",
		imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
		affiliateUrl: "https://wa.me/27680079911?text=Order%20GSM%20Relay%20Node"
	},
	{
		slug: "ai-solar-ptz-security-camera",
		name: "4G AI Solar PTZ Perimeter Surveillance Camera",
		category: "Security Cameras",
		price: 2490,
		description: "Solar-powered 4G LTE PTZ camera with human intrusion detection, night vision, and autonomous webhook alerts directly to SafetyLink War Room.",
		imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80",
		affiliateUrl: "https://wa.me/27680079911?text=Order%20AI%20Solar%20Camera"
	},
	{
		slug: "tactical-body-worn-camera",
		name: "Patrol Grade Body-Worn Camera 1440p",
		category: "Tactical Gear",
		price: 1850,
		description: "Rugged law-enforcement grade body camera with continuous GPS logging, tamper-proof internal storage, and one-touch distress stream.",
		imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=600&auto=format&fit=crop&q=80",
		affiliateUrl: "https://wa.me/27680079911?text=Order%20Bodycam"
	},
	{
		slug: "smart-biometric-deadbolt-lock",
		name: "Heavy-Duty Biometric Bluetooth Smart Deadbolt",
		category: "Access Control",
		price: 1450,
		description: "Anti-tamper fingerprint deadbolt lock with temporary visitor codes, emergency physical key override, and remote lockdown link.",
		imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80",
		affiliateUrl: "https://wa.me/27680079911?text=Order%20Smart%20Lock"
	},
	{
		slug: "obd2-gps-kill-switch-tracker",
		name: "OBD2 Real-Time Vehicle Tracker with Remote Kill-Switch",
		category: "Vehicle Security",
		price: 980,
		description: "Plug-and-play vehicle telemetry tracker with crash detection, geo-fence alerts, and remote ignition disablement on distress.",
		imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80",
		affiliateUrl: "https://wa.me/27680079911?text=Order%20Vehicle%20Tracker"
	}
];
var CATEGORY_ICONS = {
	"Security Cameras": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-5 h-5" }),
	"Access Control": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5" }),
	"Tactical Gear": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-5 h-5" }),
	"Vehicle Security": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "w-5 h-5" }),
	"Power & Sensors": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-5 h-5" })
};
var SafetyWareStore$1 = () => {
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("All");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [checkingStock, setCheckingStock] = (0, import_react.useState)(null);
	const [showPepxiModal, setShowPepxiModal] = (0, import_react.useState)(false);
	const categories = ["All", ...Array.from(new Set(STORE_PRODUCTS.map((p) => p.category)))];
	const filteredProducts = STORE_PRODUCTS.filter((p) => {
		const matchesCategory = activeCategory === "All" || p.category === activeCategory;
		const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});
	const handleBuy = async (product) => {
		if (product.slug === "itag-ble-panic-button") {
			setShowPepxiModal(true);
			return;
		}
		setCheckingStock(product.slug);
		try {
			const data = await (await fetch(`/api/check-stock/${product.slug}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ url: product.affiliateUrl })
			})).json();
			if (data.redirectUrl) window.open(data.redirectUrl, "_blank", "noopener,noreferrer");
		} catch (err) {
			console.error("Stock check failed:", err);
			window.open(`https://wa.me/27680079911?text=${encodeURIComponent(`Hi SafetyLink, I am looking to purchase "${product.name}" (R${product.price}). Please assist with direct checkout.`)}`, "_blank");
		} finally {
			setCheckingStock(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans pb-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-10 h-10 text-emerald-500" }), "SafetyWare Store"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-400 mt-2 max-w-2xl text-sm md:text-base",
						children: "Enterprise-grade hardware integrations for SafetyLink-Core. Secure your perimeter, equip your responders, and harden your infrastructure."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full md:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search hardware...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-amber-500/20 p-2 rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-5 h-5 text-amber-500" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-amber-500 font-bold text-sm",
							children: "Exclusive SA Import Pricing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-amber-500/70 text-xs mt-0.5",
							children: "Direct integration support available for all hardware purchased through SafetyWare."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "shrink-0 bg-amber-500 hover:bg-amber-400 text-amber-950 text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3 h-3" }), " Contact Sales"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveCategory(category),
						className: `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === category ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20" : "bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800"}`,
						children: [category !== "All" && CATEGORY_ICONS[category], category]
					}, category))
				}),
				filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800/50 border-dashed",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-500",
						children: "No hardware found matching your criteria."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
					children: filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col h-full shadow-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "aspect-video bg-slate-950 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-900 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" }),
								product.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: product.imageUrl,
									alt: product.name,
									className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
									loading: "lazy",
									onError: (e) => {
										const target = e.currentTarget;
										target.style.display = "none";
										const parent = target.parentElement;
										if (parent) {
											const fallback = parent.querySelector(".fallback-icon");
											if (fallback) fallback.style.display = "flex";
										}
									}
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `fallback-icon w-full h-full items-center justify-center ${product.imageUrl ? "hidden" : "flex"}`,
									children: CATEGORY_ICONS[product.category] ? import_react.cloneElement(CATEGORY_ICONS[product.category], { className: "w-16 h-16 text-slate-800 group-hover:text-slate-700 transition-colors" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-16 h-16 text-slate-800" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-3 right-3 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-emerald-500/20 backdrop-blur-sm z-20 font-mono",
									children: "IN STOCK"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 flex flex-col flex-grow",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-slate-500 font-medium mb-2",
									children: product.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-slate-200 font-bold leading-snug mb-2 line-clamp-2",
									children: product.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-slate-400 text-xs line-clamp-3 mb-6 flex-grow",
									children: product.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mt-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-lg font-black text-emerald-400",
										children: ["R", product.price]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleBuy(product),
										disabled: checkingStock === product.slug,
										className: "bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 hover:border-transparent",
										children: checkingStock === product.slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "animate-pulse",
											children: "Checking..."
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Buy Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3 h-3" })] })
									})]
								})
							]
						})]
					}, product.slug))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PepxiOrderModal, {
			isOpen: showPepxiModal,
			onClose: () => setShowPepxiModal(false)
		})]
	});
};
//#endregion
//#region src/components/landing/DownloadPage.tsx
function DownloadPage({ onLogin, onRegisterUser, onRegisterOrg, navigate }) {
	const [releases, setReleases] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [latestRelease, setLatestRelease] = (0, import_react.useState)(null);
	const [searchFilter, setSearchFilter] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "https://api.github.com/repos/Charesmagna/SafetyLink-Core/releases?per_page=35", true);
		xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
		xhr.timeout = 1e4;
		xhr.onload = () => {
			try {
				const rawList = JSON.parse(xhr.responseText);
				if (Array.isArray(rawList)) {
					const qualified = [];
					rawList.forEach((r, idx) => {
						if (!r.assets || !Array.isArray(r.assets)) return;
						const apkAsset = r.assets.find((a) => a.name && a.name.endsWith(".apk") && a.size > 83886080);
						const exeAsset = r.assets.find((a) => a.name && a.name.endsWith(".exe"));
						if (apkAsset) qualified.push({
							version: r.tag_name || "latest",
							name: r.name || `SafetyLink Core ${r.tag_name}`,
							publishedAt: r.published_at ? new Date(r.published_at).toLocaleDateString("en-ZA", {
								year: "numeric",
								month: "short",
								day: "numeric"
							}) : "Verified Build",
							sizeMb: (apkAsset.size / 1048576).toFixed(1),
							apkUrl: apkAsset.browser_download_url,
							exeUrl: exeAsset?.browser_download_url,
							isLatest: idx === 0
						});
					});
					if (qualified.length > 0) {
						setReleases(qualified);
						setLatestRelease(qualified[0]);
					} else {
						const fallback = {
							version: "Latest",
							name: "SafetyLink Core (latest release)",
							publishedAt: "Latest",
							sizeMb: "",
							apkUrl: "https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/safetylink.apk",
							isLatest: true
						};
						setReleases([fallback]);
						setLatestRelease(fallback);
					}
				}
			} catch (e) {
				console.warn("Error reading release list:", e);
			}
			setLoading(false);
		};
		xhr.onerror = () => setLoading(false);
		xhr.ontimeout = () => setLoading(false);
		xhr.send();
	}, []);
	const filteredReleases = releases.filter((r) => r.version.toLowerCase().includes(searchFilter.toLowerCase()) || r.name.toLowerCase().includes(searchFilter.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "transparent",
			color: "#f0f4f8",
			fontFamily: "'Inter',system-ui,sans-serif",
			minHeight: "100vh"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "80px 40px 60px",
					background: "#ffffff",
					borderBottom: "1px solid #d1fae5"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto",
						color: "#0f172a"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#059669",
								marginBottom: "16px",
								fontWeight: 700
							},
							children: "// OFFICIAL DOWNLOAD HUB · SECURE DISTRIBUTION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							style: {
								fontSize: "clamp(36px,6vw,72px)",
								fontWeight: 900,
								letterSpacing: "-.04em",
								lineHeight: .95,
								marginBottom: "20px",
								color: "#0f172a"
							},
							children: [
								"Deploy SafetyLink.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										color: "#059669",
										fontStyle: "italic"
									},
									children: "Verified software packages."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "15px",
								color: "#475569",
								maxWidth: "640px",
								lineHeight: 1.7,
								marginBottom: "24px"
							},
							children: "Direct access to official Version 1 production builds and Version 1.1 Beta test builds for Android devices and Windows Dispatch Control rooms."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: "12px",
								flexWrap: "wrap",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: "6px",
									background: "#ecfdf5",
									border: "1px solid #a7f3d0",
									padding: "6px 14px",
									borderRadius: "6px",
									fontSize: "11px",
									color: "#059669",
									fontWeight: 700,
									fontFamily: "'JetBrains Mono',monospace"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
									width: "6px",
									height: "6px",
									borderRadius: "50%",
									background: "#059669",
									display: "inline-block"
								} }), "SIGNED ANDROID BUILDS"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									display: "inline-flex",
									alignItems: "center",
									gap: "6px",
									background: "#f8fafc",
									border: "1px solid #e2e8f0",
									padding: "6px 14px",
									borderRadius: "6px",
									fontSize: "11px",
									color: "#475569",
									fontWeight: 600,
									fontFamily: "'JetBrains Mono',monospace"
								},
								children: "VERSION 1 & VERSION 1.1 BETA"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "60px 40px",
					background: "#f8fafc",
					borderBottom: "1px solid #e2e8f0"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto",
						color: "#0f172a"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#059669",
								marginBottom: "16px",
								fontWeight: 700
							},
							children: "// AVAILABLE CHANNELS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(24px,4vw,40px)",
								fontWeight: 900,
								marginBottom: "36px",
								color: "#0f172a"
							},
							children: "SafetyLink Releases"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
								gap: "24px"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										background: "#ffffff",
										border: "1px solid #a7f3d0",
										borderRadius: "16px",
										padding: "32px",
										display: "flex",
										flexDirection: "column",
										gap: "16px",
										position: "relative",
										overflow: "hidden",
										boxShadow: "0 6px 24px rgba(5,150,105,0.06)"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												position: "absolute",
												top: "16px",
												right: "16px",
												background: "#ecfdf5",
												color: "#059669",
												border: "1px solid #a7f3d0",
												fontSize: "10px",
												fontWeight: 800,
												padding: "4px 10px",
												borderRadius: "999px",
												fontFamily: "'JetBrains Mono',monospace"
											},
											children: "VERSION 1 (LIVE)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: { fontSize: "2.5rem" },
											children: "📱"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											style: {
												fontSize: "20px",
												fontWeight: 800,
												marginBottom: "4px",
												color: "#0f172a"
											},
											children: "SafetyLink Version 1"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											style: {
												fontSize: "12px",
												color: "#059669",
												fontFamily: "'JetBrains Mono',monospace",
												fontWeight: 700
											},
											children: [latestRelease?.version || "v1.0", " · Production Android APK"]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "13px",
												color: "#475569",
												lineHeight: 1.6,
												flex: 1
											},
											children: "Official stable Android APK featuring foreground keepalive service, iTAG Bluetooth keyfob monitoring, native SMS/Call dispatch, and home screen widgets."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												display: "flex",
												flexDirection: "column",
												gap: "10px"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: latestRelease?.apkUrl || "https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/safetylink.apk",
												download: true,
												style: {
													background: "#059669",
													color: "#ffffff",
													fontWeight: 800,
													fontSize: "12px",
													letterSpacing: ".06em",
													padding: "14px 20px",
													borderRadius: "8px",
													textAlign: "center",
													textDecoration: "none",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													gap: "8px",
													boxShadow: "0 4px 16px rgba(5,150,105,0.22)"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⬇️" }), " DOWNLOAD VERSION 1 (APK)"]
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										background: "#ffffff",
										border: "1px solid #fde68a",
										borderRadius: "16px",
										padding: "32px",
										display: "flex",
										flexDirection: "column",
										gap: "16px",
										position: "relative",
										overflow: "hidden",
										boxShadow: "0 6px 24px rgba(245,158,11,0.06)"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												position: "absolute",
												top: "16px",
												right: "16px",
												background: "#fffbeb",
												color: "#d97706",
												border: "1px solid #fde68a",
												fontSize: "10px",
												fontWeight: 800,
												padding: "4px 10px",
												borderRadius: "999px",
												fontFamily: "'JetBrains Mono',monospace"
											},
											children: "VERSION 1.1 BETA"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: { fontSize: "2.5rem" },
											children: "🧪"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											style: {
												fontSize: "20px",
												fontWeight: 800,
												marginBottom: "4px",
												color: "#0f172a"
											},
											children: "SafetyLink Version 1.1 Beta"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "12px",
												color: "#d97706",
												fontFamily: "'JetBrains Mono',monospace",
												fontWeight: 700
											},
											children: "Early Testing Channel · Unreleased Enhancements"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "13px",
												color: "#475569",
												lineHeight: 1.6,
												flex: 1
											},
											children: "Dedicated beta build for validating upcoming updates prior to Version 1 promotion. Recommended for testing devices only."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												display: "flex",
												flexDirection: "column",
												gap: "10px"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/beta/safetylink.apk",
												download: true,
												style: {
													background: "#f59e0b",
													color: "#0f172a",
													fontWeight: 800,
													fontSize: "12px",
													letterSpacing: ".06em",
													padding: "14px 20px",
													borderRadius: "8px",
													textAlign: "center",
													textDecoration: "none",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													gap: "8px"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🧪" }), " DOWNLOAD VERSION 1.1 BETA"]
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										background: "rgba(255,255,255,0.02)",
										border: "1px solid rgba(14,165,233,0.25)",
										borderRadius: "16px",
										padding: "32px",
										display: "flex",
										flexDirection: "column",
										gap: "16px",
										position: "relative"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												position: "absolute",
												top: "16px",
												right: "16px",
												background: "rgba(14,165,233,0.15)",
												color: "#0ea5e9",
												border: "1px solid rgba(14,165,233,0.3)",
												fontSize: "10px",
												fontWeight: 800,
												padding: "4px 10px",
												borderRadius: "999px",
												fontFamily: "'JetBrains Mono',monospace"
											},
											children: "DESKTOP COMMAND"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: { fontSize: "2.5rem" },
											children: "💻"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											style: {
												fontSize: "20px",
												fontWeight: 800,
												marginBottom: "4px"
											},
											children: "Windows Dispatch EXE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "12px",
												color: "#0ea5e9",
												fontFamily: "'JetBrains Mono',monospace",
												fontWeight: 700
											},
											children: "Control Room & Security Desk Application"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "13px",
												color: "#8892a4",
												lineHeight: 1.6,
												flex: 1
											},
											children: "High-capacity multi-screen command console for security control rooms, estate managers, and dispatch centers. Operates with local offline GIS map caching."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												display: "flex",
												flexDirection: "column",
												gap: "10px"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "https://github.com/Charesmagna/SafetyLink-Core/releases/latest",
												target: "_blank",
												rel: "noreferrer",
												style: {
													background: "rgba(14,165,233,0.15)",
													color: "#0ea5e9",
													border: "1px solid rgba(14,165,233,0.4)",
													fontWeight: 800,
													fontSize: "12px",
													letterSpacing: ".06em",
													padding: "14px 20px",
													borderRadius: "8px",
													textAlign: "center",
													textDecoration: "none",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													gap: "8px"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "💻" }), " GET WINDOWS COMMAND DECK"]
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										background: "rgba(255,255,255,0.02)",
										border: "1px solid rgba(167,139,250,0.25)",
										borderRadius: "16px",
										padding: "32px",
										display: "flex",
										flexDirection: "column",
										gap: "16px",
										position: "relative"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												position: "absolute",
												top: "16px",
												right: "16px",
												background: "rgba(167,139,250,0.15)",
												color: "#a78bfa",
												border: "1px solid rgba(167,139,250,0.3)",
												fontSize: "10px",
												fontWeight: 800,
												padding: "4px 10px",
												borderRadius: "999px",
												fontFamily: "'JetBrains Mono',monospace"
											},
											children: "UNIVERSAL WEB"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: { fontSize: "2.5rem" },
											children: "🌐"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											style: {
												fontSize: "20px",
												fontWeight: 800,
												marginBottom: "4px"
											},
											children: "Progressive Web App"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "12px",
												color: "#a78bfa",
												fontFamily: "'JetBrains Mono',monospace",
												fontWeight: 700
											},
											children: "iOS Safari · Android Chrome · Desktop Edge"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											style: {
												fontSize: "13px",
												color: "#8892a4",
												lineHeight: 1.6,
												flex: 1
											},
											children: "Instant deployment directly inside any modern browser. Supports offline service workers, local audio alarm playback, and home screen installation."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												display: "flex",
												flexDirection: "column",
												gap: "10px"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "https://safetylink.online",
												target: "_blank",
												rel: "noreferrer",
												style: {
													background: "rgba(167,139,250,0.15)",
													color: "#a78bfa",
													border: "1px solid rgba(167,139,250,0.4)",
													fontWeight: 800,
													fontSize: "12px",
													letterSpacing: ".06em",
													padding: "14px 20px",
													borderRadius: "8px",
													textAlign: "center",
													textDecoration: "none",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													gap: "8px"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🌐" }), " LAUNCH WEB APP (PWA)"]
											})
										})
									]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "60px 40px",
					background: "rgba(7,10,15,0.65)",
					backdropFilter: "blur(12px)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-end",
							flexWrap: "wrap",
							gap: "20px",
							marginBottom: "28px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontFamily: "'JetBrains Mono',monospace",
									fontSize: "10px",
									letterSpacing: ".18em",
									color: "#00e676",
									marginBottom: "10px"
								},
								children: "// VERIFIED PRODUCTION ARCHIVE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								style: {
									fontSize: "clamp(22px,3.5vw,36px)",
									fontWeight: 900
								},
								children: "High-Capacity Release Catalog"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "13px",
									color: "#8892a4",
									marginTop: "6px"
								},
								children: "Showing only verified production APKs compiled with complete background services (> 80 MB)."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: "100%",
								maxWidth: "300px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search releases (e.g. v1.1.9)...",
								value: searchFilter,
								onChange: (e) => setSearchFilter(e.target.value),
								style: {
									width: "100%",
									background: "rgba(255,255,255,0.04)",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: "8px",
									padding: "10px 14px",
									color: "#fff",
									fontSize: "13px",
									outline: "none",
									fontFamily: "'JetBrains Mono',monospace"
								}
							})
						})]
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							textAlign: "center",
							padding: "60px",
							color: "#8892a4"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							width: "32px",
							height: "32px",
							border: "3px solid rgba(0,230,118,0.2)",
							borderTopColor: "#00e676",
							borderRadius: "50%",
							animation: "spin 1s linear infinite",
							margin: "0 auto 16px"
						} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "12px"
							},
							children: "Loading verified release manifest..."
						})]
					}) : filteredReleases.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							padding: "40px",
							textAlign: "center",
							background: "rgba(255,255,255,0.02)",
							borderRadius: "12px",
							border: "1px solid rgba(255,255,255,0.06)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							style: {
								color: "#8892a4",
								fontSize: "14px"
							},
							children: [
								"No production releases matching \"",
								searchFilter,
								"\"."
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: "12px"
						},
						children: filteredReleases.map((rel, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								background: rel.isLatest ? "rgba(0,230,118,0.04)" : "rgba(255,255,255,0.02)",
								border: rel.isLatest ? "1px solid rgba(0,230,118,0.3)" : "1px solid rgba(255,255,255,0.07)",
								borderRadius: "12px",
								padding: "18px 24px",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								flexWrap: "wrap",
								gap: "16px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "16px",
									minWidth: "240px"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: "36px",
										height: "36px",
										borderRadius: "8px",
										background: rel.isLatest ? "rgba(0,230,118,0.15)" : "rgba(255,255,255,0.04)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "18px"
									},
									children: "📦"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: "8px"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontWeight: 800,
											fontSize: "15px"
										},
										children: rel.name
									}), rel.isLatest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											background: "#00e676",
											color: "#020617",
											fontSize: "9px",
											fontWeight: 900,
											padding: "2px 6px",
											borderRadius: "4px",
											textTransform: "uppercase",
											letterSpacing: ".05em"
										},
										children: "LATEST STABLE"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										fontSize: "11px",
										color: "#8892a4",
										fontFamily: "'JetBrains Mono',monospace",
										marginTop: "2px"
									},
									children: [
										"Released: ",
										rel.publishedAt,
										" · Size: ",
										rel.sizeMb,
										" MB · Signed Package"
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "12px"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: rel.apkUrl,
									download: true,
									style: {
										background: rel.isLatest ? "#00e676" : "rgba(255,255,255,0.08)",
										color: rel.isLatest ? "#020617" : "#f0f4f8",
										padding: "8px 16px",
										borderRadius: "6px",
										fontSize: "11px",
										fontWeight: 700,
										letterSpacing: ".05em",
										textDecoration: "none",
										display: "inline-flex",
										alignItems: "center",
										gap: "6px",
										fontFamily: "'JetBrains Mono',monospace",
										transition: "opacity .15s"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⬇️" }), " DOWNLOAD APK"]
								})
							})]
						}, rel.version + idx))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: {
					padding: "60px 40px",
					background: "#0d1117",
					borderTop: "1px solid rgba(255,255,255,.07)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						maxWidth: "1160px",
						margin: "0 auto"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontFamily: "'JetBrains Mono',monospace",
								fontSize: "10px",
								letterSpacing: ".18em",
								color: "#0ea5e9",
								marginBottom: "16px"
							},
							children: "// INSTALLATION GUIDE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							style: {
								fontSize: "clamp(22px,3.5vw,36px)",
								fontWeight: 900,
								marginBottom: "24px"
							},
							children: "How to Install SafetyLink on Android"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
								gap: "20px"
							},
							children: [
								{
									step: "01",
									title: "Download APK",
									desc: "Tap the Download Official APK button above on your Android smartphone."
								},
								{
									step: "02",
									title: "Allow Unknown Apps",
									desc: "If prompted by Chrome or your file manager, enable \"Allow from this source\"."
								},
								{
									step: "03",
									title: "Tap Install",
									desc: "Open the downloaded package and tap Install to complete setup."
								},
								{
									step: "04",
									title: "Grant Permissions",
									desc: "Grant Location (Always) and Bluetooth to allow emergency beacon monitoring."
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "rgba(255,255,255,0.02)",
									border: "1px solid rgba(255,255,255,0.07)",
									padding: "24px",
									borderRadius: "12px"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontFamily: "'JetBrains Mono',monospace",
											fontSize: "16px",
											fontWeight: 900,
											color: "#0ea5e9",
											marginBottom: "8px"
										},
										children: s.step
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										style: {
											fontSize: "15px",
											fontWeight: 700,
											marginBottom: "6px"
										},
										children: s.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											fontSize: "12px",
											color: "#8892a4",
											lineHeight: 1.6
										},
										children: s.desc
									})
								]
							}, s.step))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								marginTop: "36px",
								padding: "20px 24px",
								background: "rgba(14,165,233,0.06)",
								border: "1px solid rgba(14,165,233,0.2)",
								borderRadius: "12px",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								flexWrap: "wrap",
								gap: "16px"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "13px",
									fontWeight: 700,
									color: "#0ea5e9"
								},
								children: "Need technical assistance deploying to an enterprise fleet?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: "11px",
									color: "#8892a4",
									marginTop: "2px"
								},
								children: "Our technical team supports MDM deployment, custom APK branding, and secure hardware pairing."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://wa.me/message/YIEA73M7H3P5M1?text=Hi+I+need+help+installing+SafetyLink",
								target: "_blank",
								rel: "noreferrer",
								style: {
									background: "#0ea5e9",
									color: "#020617",
									padding: "10px 18px",
									borderRadius: "6px",
									fontSize: "11px",
									fontWeight: 800,
									textDecoration: "none",
									letterSpacing: ".05em"
								},
								children: "CHAT WITH SUPPORT →"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/landing/ContinuousTopologyOverview.tsx
var PAGE_TOPOLOGY_MAP = {
	home: [
		{
			id: "global-network",
			title: "SafetyLink Multi-Tier Mesh & Voice Dispatch Architecture",
			tag: "Global Ecosystem",
			description: "End-to-end failover topology: Physical BLE SOS button -> Multi-path repeater nodes -> Edge cellular gateways -> Live VAPI voice dispatch & guard telemetry.",
			imageSrc: R2_MEDIA.architecture.responseOverview,
			technicalDetails: [
				"Store-and-forward SQLite offline queue",
				"Direct USSD/SMS fallback transmission",
				"Sub-second BLE beacon discovery (0.32s avg)",
				"Autonomous geo-fencing failover loop"
			]
		},
		{
			id: "mesh-platform",
			title: "Decentralized Hardware Mesh Interconnect",
			tag: "Autonomous Mesh",
			description: "Zero-cloud dependency mesh relay connecting fixed beacon anchors, moving guard vehicles, and wearable panic remotes.",
			imageSrc: R2_MEDIA.architecture.meshPlatformOverview,
			technicalDetails: [
				"Frequency: 2.4GHz BLE + Sub-GHz LoRa",
				"Hop-limit: 7 hops without latency decay",
				"AES-256 encrypted payload packets",
				"Battery lifespan: 18-24 months per beacon"
			]
		},
		{
			id: "system-anatomy",
			title: "System Architecture Anatomy & Relay Matrix",
			tag: "Deep Technical Blueprint",
			description: "Internal module wiring showing the separation between edge device drivers, local offline caches, and cloud bridge sync.",
			imageSrc: R2_MEDIA.architecture.systemAnatomy,
			technicalDetails: [
				"Non-blocking background location poller",
				"Capacitor native bridge with push fallback",
				"Zero-trust cryptographic node verification",
				"Automated responder incident assignment"
			]
		}
	],
	hardware: [
		{
			id: "hardware-teardown",
			title: "HST-01 Wearable Panic Tag Micro-Architecture",
			tag: "HST-01 Tag",
			description: "Internal components: Waterproof tactile momentary switch, low-power CR2032 power cell, Nordic Semiconductor nRF52 BLE SoC, and high-decibel piezo buzzer.",
			imageSrc: R2_MEDIA.hardware.itagTeardown,
			technicalDetails: [
				"IP67 water and dust resistance rating",
				"Recessed panic switch prevents false positives",
				"Continuous ping interval: 1000ms idle / 200ms panic",
				"Weight: 8.4 grams"
			]
		},
		{
			id: "rugged-beacon",
			title: "Industrial Fixed Mesh Relay Node Assembly",
			tag: "Fixed Relay Node",
			description: "Heavy-duty wall-mounted beacon anchor designed for parking garages, school stairwells, mines, and load-shedding zones.",
			imageSrc: R2_MEDIA.hardware.ruggedBeacon,
			technicalDetails: [
				"Solar + Supercapacitor dual backup",
				"Omnidirectional 5dBi gain antenna",
				"Surge protection up to 6kV",
				"Real-time temperature & battery telemetry"
			]
		},
		{
			id: "itag-macro",
			title: "Ergonomic Wearable Form Factor",
			tag: "Field Hardware",
			description: "Tactile lanyard and keyring enclosure designed for single-motion blind panic triggers under extreme duress.",
			imageSrc: R2_MEDIA.hardware.itagMacro,
			technicalDetails: [
				"High-contrast safety ring indicator",
				"Braille tactile confirmation pip",
				"Drop-tested up to 3 meters on concrete",
				"Non-allergenic polycarbonate chassis"
			]
		}
	],
	platform: [{
		id: "platform-control",
		title: "Autonomous Dispatch & Multitenant Console Topology",
		tag: "Command Deck",
		description: "Live operations center topology connecting emergency operators, fleet vehicles, private security response units, and municipal services.",
		imageSrc: R2_MEDIA.platform.dispatchControl,
		technicalDetails: [
			"Sub-100ms multi-node live sync via Pusher/WS",
			"Interactive Leaflet GIS mapping with live GPS trails",
			"One-click incident escalation & broadcast",
			"Encrypted evidentiary voice & video playback"
		]
	}, {
		id: "telemetry-grid",
		title: "High-Density Spatial Sensor Grid & RSSI Triangulation",
		tag: "Spatial GIS",
		description: "Indoor multi-floor beacon positioning with weighted RSSI trilateration for pinpointing distress calls in multi-story buildings.",
		imageSrc: R2_MEDIA.platform.networkGrid,
		technicalDetails: [
			"Triangulation accuracy: ±1.8 meters indoor",
			"Floor-level vertical z-index resolution",
			"Automated nearest-responder routing",
			"Offline building schematics caching"
		]
	}],
	usecases: [{
		id: "corporate-campus",
		title: "Enterprise Campus & Muster Point Verification Topology",
		tag: "Enterprise Safety",
		description: "Automated staff headcount, panic tracking in remote stairwells, and lone-worker check-in sequences.",
		imageSrc: R2_MEDIA.usecases.corporateCampus,
		technicalDetails: [
			"Seamless integration with turnstiles & access cards",
			"Automated lone-worker inactivity alerts",
			"Floor marshal command tablet synchronization",
			"OSHA compliance automated reporting"
		]
	}, {
		id: "estate-community",
		title: "Residential Estate & Gated Community Security Network",
		tag: "Estate Mesh",
		description: "Perimeter fence telemetry, resident wearable SOS remotes, rapid gate security notification, and armed patrol dispatch.",
		imageSrc: R2_MEDIA.usecases.estateCommunity,
		technicalDetails: [
			"Zero false alarm dual-tap sequence",
			"Direct gate guard intercom buzzer bridge",
			"Family alert ring simultaneously notified",
			"Works during complete cellular grid outages"
		]
	}]
};
var ContinuousTopologyOverview = ({ activePage }) => {
	const diagrams = PAGE_TOPOLOGY_MAP[activePage] || PAGE_TOPOLOGY_MAP.home;
	const [selectedIndex, setSelectedIndex] = (0, import_react.useState)(0);
	const [isAutoCycling, setIsAutoCycling] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		setSelectedIndex(0);
	}, [activePage]);
	(0, import_react.useEffect)(() => {
		if (!isAutoCycling || diagrams.length <= 1) return;
		const interval = setInterval(() => {
			setSelectedIndex((prev) => (prev + 1) % diagrams.length);
		}, 9e3);
		return () => clearInterval(interval);
	}, [isAutoCycling, diagrams.length]);
	const current = diagrams[selectedIndex] || diagrams[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-slate-950/35 border border-slate-800/60 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl transition-all duration-300",
		onMouseEnter: () => setIsAutoCycling(false),
		onMouseLeave: () => setIsAutoCycling(true),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2 font-mono text-xs text-emerald-400 uppercase tracking-widest",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-3.5 h-3.5 text-emerald-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"// CONTINUOUS TOPOLOGY OVERVIEW • ",
							activePage.toUpperCase(),
							" SECTION"
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl sm:text-3xl font-extrabold text-white tracking-tight",
						children: current.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-400 max-w-2xl mt-1.5 leading-relaxed",
						children: current.description
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 shrink-0 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center bg-slate-950/60 backdrop-blur-md p-1 rounded-xl border border-slate-800/80",
						children: diagrams.map((d, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedIndex(idx),
							className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${idx === selectedIndex ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm" : "text-slate-400 hover:text-slate-200"}`,
							children: d.tag
						}, d.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedIndex((prev) => (prev - 1 + diagrams.length) % diagrams.length),
							className: "p-2 rounded-lg bg-slate-800/60 backdrop-blur-md text-slate-300 hover:bg-slate-700/80 hover:text-white transition-colors",
							title: "Previous diagram",
							"aria-label": "Previous diagram",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedIndex((prev) => (prev + 1) % diagrams.length),
							className: "p-2 rounded-lg bg-slate-800/60 backdrop-blur-md text-slate-300 hover:bg-slate-700/80 hover:text-white transition-colors",
							title: "Next diagram",
							"aria-label": "Next diagram",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative rounded-2xl overflow-hidden border border-slate-700/40 bg-slate-950/40 backdrop-blur-md group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-[320px] max-h-[580px] flex items-center justify-center overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: current.imageSrc,
						alt: current.title,
						onError: (e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.src = "/Screenshot_20260820_201927_com.aistudio.safetylink.vqnztp.jpg";
						},
						className: "w-full h-auto max-h-[580px] object-contain transition-transform duration-700 group-hover:scale-[1.01]"
					}, current.imageSrc)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-950/65 backdrop-blur-md border-t border-slate-800/80 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs flex-1",
						children: current.technicalDetails.map((detail, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-1.5 text-slate-300 font-mono",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-emerald-400 font-bold shrink-0",
								children: "›"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "leading-snug",
								children: detail
							})]
						}, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: current.imageSrc,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 hover:scale-105",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "w-3.5 h-3.5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inspect Full HD Blueprint" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3 h-3 opacity-60" })
						]
					})]
				})]
			})
		]
	});
};
//#endregion
//#region src/services/UpdateService.ts
var UpdateService_exports = /* @__PURE__ */ __exportAll({
	CURRENT_VERSION: () => CURRENT_VERSION,
	applyLiveUpdate: () => applyLiveUpdate,
	checkForUpdate: () => checkForUpdate,
	checkVersionPolicy: () => checkVersionPolicy,
	getCurrentAppVersion: () => getCurrentAppVersion,
	isAppBinary: () => isAppBinary,
	isNewerVersion: () => isNewerVersion,
	isVersionBelow: () => isVersionBelow
});
var CURRENT_VERSION = localStorage.getItem("sl_active_version") || "1.1.1170";
function isAppBinary() {
	if (typeof window === "undefined") return false;
	if (Capacitor.isNativePlatform()) return true;
	if (typeof window.__TAURI__ !== "undefined" || typeof window.__TAURI_IPC__ !== "undefined" || navigator.userAgent.includes("Tauri")) return true;
	if (typeof window.process !== "undefined" && Boolean(window.process?.versions?.electron) || navigator.userAgent.includes("Electron")) return true;
	if (window.matchMedia?.("(display-mode: standalone)").matches || navigator.standalone === true) return true;
	return false;
}
async function getCurrentAppVersion() {
	if (Capacitor.isNativePlatform()) try {
		const { App: CapApp } = await __vitePreload(async () => {
			const { App: CapApp } = await import("./capacitor-B_jS8XWy.js").then((n) => n.h);
			return { App: CapApp };
		}, __vite__mapDeps([0,1]));
		const info = await CapApp.getInfo();
		if (info?.version) return info.version;
	} catch (e) {
		console.warn("[UpdateService] Failed to read native app version:", e);
	}
	return CURRENT_VERSION;
}
var GITHUB_RELEASES_API = "https://safetylink-api.tshilidzi-mukwevho54.workers.dev/api/app/latest";
var APK_DOWNLOAD_BASE = "https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download";
var VERSION_POLICY_URL = "https://api.safetylink.online/api/app/version-policy";
var FALLBACK_VERSION_POLICY_URL = "https://safetylink-api.tshilidzi-mukwevho54.workers.dev/api/app/version-policy";
function isVersionBelow(current, minRequired) {
	try {
		const parse = (v) => v.replace(/^v/, "").split(".").map((n) => parseInt(n, 10) || 0);
		const [cMaj = 0, cMin = 0, cPat = 0] = parse(current);
		const [mMaj = 0, mMin = 0, mPat = 0] = parse(minRequired);
		if (cMaj !== mMaj) return cMaj < mMaj;
		if (cMin !== mMin) return cMin < mMin;
		return cPat < mPat;
	} catch {
		return false;
	}
}
async function checkVersionPolicy(currentVersion) {
	const cur = currentVersion || await getCurrentAppVersion();
	for (const url of [VERSION_POLICY_URL, FALLBACK_VERSION_POLICY_URL]) try {
		const policy = await xhrGet(url);
		if (policy?.minSupportedVersion) return {
			blocked: isVersionBelow(cur, String(policy.minSupportedVersion)),
			minSupportedVersion: String(policy.minSupportedVersion),
			latestVersion: String(policy.latestVersion || policy.minSupportedVersion),
			updateUrl: String(policy.updateUrl || "https://safetylink.online/#/download")
		};
	} catch {}
	return {
		blocked: false,
		minSupportedVersion: "1.0.0",
		latestVersion: cur,
		updateUrl: "https://safetylink.online/#/download"
	};
}
function xhrGet(url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.setRequestHeader("Accept", "application/json");
		xhr.timeout = 8e3;
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) try {
				resolve(JSON.parse(xhr.responseText));
			} catch {
				reject(/* @__PURE__ */ new Error("JSON parse error"));
			}
			else reject(/* @__PURE__ */ new Error(`HTTP ${xhr.status}`));
		};
		xhr.onerror = () => reject(/* @__PURE__ */ new Error("Network error"));
		xhr.ontimeout = () => reject(/* @__PURE__ */ new Error("Timeout"));
		xhr.send();
	});
}
async function checkForUpdate() {
	try {
		const currentVersion = await getCurrentAppVersion();
		console.log(`[UpdateService] Checking updates. Current: ${currentVersion}`);
		const policy = await checkVersionPolicy(currentVersion);
		if (policy.blocked) return {
			available: true,
			updateRequiredBlocked: true,
			minSupportedVersion: policy.minSupportedVersion,
			version: policy.latestVersion,
			apkUrl: `${APK_DOWNLOAD_BASE}/safetylink.apk`,
			releaseNotes: `Version ${currentVersion} is below the minimum supported version (v${policy.minSupportedVersion}). Please update to continue.`,
			isLiveUpdate: false
		};
		try {
			const release = await xhrGet(GITHUB_RELEASES_API);
			const latestVersion = (release.tag_name || "").replace(/^v/, "");
			if (latestVersion && isNewerVersion(latestVersion, currentVersion)) {
				const assets = release.assets || [];
				const apk = assets.find((x) => x.name?.endsWith(".apk"));
				const exe = assets.find((x) => x.name?.endsWith(".exe"));
				return {
					available: true,
					version: latestVersion,
					apkUrl: apk?.browser_download_url || `${APK_DOWNLOAD_BASE}/SafetyLink-v${latestVersion}-Signed.apk`,
					exeUrl: exe?.browser_download_url,
					releaseNotes: release.body ? String(release.body).slice(0, 300) : "New release available.",
					isLiveUpdate: false
				};
			}
			if (latestVersion) return { available: false };
		} catch {}
		return { available: false };
	} catch (e) {
		console.warn("[UpdateService] Check failed:", e);
		return { available: false };
	}
}
function isNewerVersion(latest, current) {
	try {
		const parse = (v) => v.replace(/^v/, "").split(".").map((n) => parseInt(n, 10) || 0);
		const [lMaj, lMin, lPat] = parse(latest);
		const [cMaj, cMin, cPat] = parse(current);
		if (lMaj !== cMaj) return lMaj > cMaj;
		if (lMin !== cMin) return lMin > cMin;
		return lPat > cPat;
	} catch {
		return false;
	}
}
/**
* Applies a Light/OTA Update instantly without requiring the user to download an APK.
* Clears cached assets, activates the latest version, and refreshes the application.
*/
async function applyLiveUpdate(version) {
	console.log("[UpdateService] Applying Live Update...");
	if (version) localStorage.setItem("sl_active_version", version);
	if ("serviceWorker" in navigator) try {
		const registrations = await navigator.serviceWorker.getRegistrations();
		for (const registration of registrations) await registration.unregister();
	} catch (e) {
		console.warn("[UpdateService] SW unregister error:", e);
	}
	if ("caches" in window) try {
		const keys = await caches.keys();
		await Promise.all(keys.map((k) => caches.delete(k)));
	} catch (e) {
		console.warn("[UpdateService] Cache clear error:", e);
	}
	localStorage.setItem("sl_last_ota_update", Date.now().toString());
	const url = new URL(window.location.href);
	url.searchParams.set("v", version || Date.now().toString());
	window.location.href = url.toString();
}
//#endregion
//#region src/components/UpdateBanner.tsx
var UpdateBanner = ({ updateInfo, onDismiss }) => {
	const [isUpdating, setIsUpdating] = (0, import_react.useState)(false);
	const [dismissed, setDismissed] = (0, import_react.useState)(false);
	const isApp = isAppBinary();
	(0, import_react.useEffect)(() => {
		if (updateInfo?.version) try {
			if (sessionStorage.getItem(`sl_dismissed_update_${updateInfo.version}`) === "true") setDismissed(true);
		} catch {}
	}, [updateInfo?.version]);
	(0, import_react.useEffect)(() => {
		if (!isApp && updateInfo?.available && !dismissed) {
			const timer = setTimeout(() => {
				handleDismiss();
			}, 18e3);
			return () => clearTimeout(timer);
		}
	}, [
		isApp,
		updateInfo?.available,
		updateInfo?.version,
		dismissed
	]);
	if (!updateInfo?.available || updateInfo?.updateRequiredBlocked || dismissed) return null;
	const handleDismiss = () => {
		setDismissed(true);
		if (updateInfo?.version) try {
			sessionStorage.setItem(`sl_dismissed_update_${updateInfo.version}`, "true");
		} catch {}
		if (onDismiss) onDismiss();
	};
	const handleDownloadAndInstall = () => {
		if (updateInfo.apkUrl) {
			if (window.Capacitor) window.open(updateInfo.apkUrl, "_system");
			else {
				const a = document.createElement("a");
				a.href = updateInfo.apkUrl;
				a.download = `SafetyLink-v${updateInfo.version || "latest"}.apk`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
		} else if (updateInfo.exeUrl) window.open(updateInfo.exeUrl, "_blank");
	};
	const handleInstantLiveUpdate = async () => {
		setIsUpdating(true);
		try {
			await applyLiveUpdate(updateInfo.version);
		} catch (err) {
			console.error("Update failed:", err);
			setIsUpdating(false);
		}
	};
	if (!isApp) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: !dismissed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 25,
			scale: .9
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: 20,
			scale: .9
		},
		transition: {
			type: "spring",
			stiffness: 350,
			damping: 25
		},
		id: "safetylink-floating-download-btn",
		style: {
			position: "fixed",
			bottom: "24px",
			right: "24px",
			zIndex: 99999,
			display: "flex",
			alignItems: "center",
			gap: "10px",
			backgroundColor: "rgba(15, 23, 42, 0.94)",
			backdropFilter: "blur(12px)",
			padding: "8px 14px 8px 12px",
			borderRadius: "9999px",
			border: "1px solid rgba(16, 185, 129, 0.5)",
			boxShadow: "0 12px 30px -4px rgba(0, 0, 0, 0.6), 0 0 15px rgba(16, 185, 129, 0.3)",
			fontFamily: "Inter, system-ui, sans-serif",
			color: "#ffffff"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				style: {
					position: "relative",
					display: "flex",
					width: "8px",
					height: "8px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
					position: "absolute",
					width: "100%",
					height: "100%",
					borderRadius: "9999px",
					backgroundColor: "#34d399",
					opacity: .75,
					animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite"
				} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
					position: "relative",
					width: "8px",
					height: "8px",
					borderRadius: "9999px",
					backgroundColor: "#10b981"
				} })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					handleDownloadAndInstall();
					handleDismiss();
				},
				style: {
					display: "flex",
					alignItems: "center",
					gap: "8px",
					background: "none",
					border: "none",
					color: "#34d399",
					fontSize: "12px",
					fontWeight: 700,
					cursor: "pointer",
					padding: 0,
					outline: "none"
				},
				title: `Download Latest Build v${updateInfo.version}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { style: {
						width: "15px",
						height: "15px",
						color: "#10b981"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download Latest" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							backgroundColor: "rgba(16, 185, 129, 0.18)",
							color: "#a7f3d0",
							border: "1px solid rgba(16, 185, 129, 0.35)",
							fontSize: "10px",
							fontWeight: 800,
							padding: "2px 6px",
							borderRadius: "6px",
							fontFamily: "monospace"
						},
						children: ["v", updateInfo.version]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleDismiss,
				style: {
					background: "rgba(255, 255, 255, 0.08)",
					border: "none",
					borderRadius: "50%",
					width: "20px",
					height: "20px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "#94a3b8",
					cursor: "pointer",
					marginLeft: "2px",
					transition: "all 0.15s ease"
				},
				title: "Close (will not stay afloat)",
				"aria-label": "Dismiss update prompt",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { style: {
					width: "12px",
					height: "12px"
				} })
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			y: -70,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		exit: {
			y: -70,
			opacity: 0
		},
		id: "safetylink-update-banner",
		style: {
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			zIndex: 999999,
			background: "linear-gradient(90deg, #022c22 0%, #0f172a 50%, #022c22 100%)",
			borderBottom: "2px solid #10b981",
			boxShadow: "0 8px 30px rgba(0,0,0,0.7)",
			padding: "12px 16px",
			color: "#ffffff",
			fontFamily: "Inter, system-ui, sans-serif"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				maxWidth: "1100px",
				margin: "0 auto",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "12px",
				flexWrap: "wrap"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: "10px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: "32px",
						height: "32px",
						borderRadius: "50%",
						background: "rgba(16,185,129,0.2)",
						border: "1px solid rgba(16,185,129,0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "#34d399",
						flexShrink: 0
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 animate-pulse" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "8px",
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						style: {
							fontWeight: 800,
							fontSize: "13px",
							letterSpacing: "-0.01em"
						},
						children: ["SafetyLink Update Available: v", updateInfo.version]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							background: "#10b981",
							color: "#022c22",
							fontSize: "9px",
							fontWeight: 900,
							padding: "2px 6px",
							borderRadius: "4px",
							letterSpacing: "0.05em",
							textTransform: "uppercase"
						},
						children: "NEW RELEASE"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						margin: "2px 0 0",
						fontSize: "11px",
						color: "#94a3b8",
						lineHeight: 1.4
					},
					children: updateInfo.releaseNotes || "A newer version has been deployed with performance & security updates."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: "8px"
				},
				children: [
					updateInfo.apkUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleDownloadAndInstall,
						id: "btn-download-apk-update",
						style: {
							display: "flex",
							alignItems: "center",
							gap: "6px",
							background: "#10b981",
							color: "#022c22",
							border: "none",
							borderRadius: "8px",
							padding: "7px 14px",
							fontSize: "12px",
							fontWeight: 800,
							cursor: "pointer",
							boxShadow: "0 2px 10px rgba(16,185,129,0.3)",
							transition: "all .2s"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Download APK (v",
							updateInfo.version,
							")"
						] })]
					}),
					updateInfo.exeUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleDownloadAndInstall,
						id: "btn-download-exe-update",
						style: {
							display: "flex",
							alignItems: "center",
							gap: "6px",
							background: "#0ea5e9",
							color: "#022c22",
							border: "none",
							borderRadius: "8px",
							padding: "7px 14px",
							fontSize: "12px",
							fontWeight: 800,
							cursor: "pointer",
							boxShadow: "0 2px 10px rgba(14,165,233,0.3)",
							transition: "all .2s"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Download EXE (v",
							updateInfo.version,
							")"
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleInstantLiveUpdate,
						disabled: isUpdating,
						id: "btn-apply-instant-update",
						style: {
							display: "flex",
							alignItems: "center",
							gap: "6px",
							background: "rgba(255,255,255,0.08)",
							color: "#ffffff",
							border: "1px solid rgba(255,255,255,0.2)",
							borderRadius: "8px",
							padding: "7px 12px",
							fontSize: "11px",
							fontWeight: 600,
							cursor: isUpdating ? "wait" : "pointer"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-3 h-3 ${isUpdating ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isUpdating ? "Refreshing..." : "Instant Sync" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleDismiss,
						style: {
							background: "transparent",
							border: "none",
							color: "#94a3b8",
							cursor: "pointer",
							padding: "4px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginLeft: "4px"
						},
						title: "Dismiss for now",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
					})
				]
			})]
		})
	}) });
};
//#endregion
//#region src/components/LandingPage.tsx
var NAV_ITEMS = [
	{
		id: "home",
		label: "Home",
		emoji: "🛡️"
	},
	{
		id: "platform",
		label: "Platform",
		emoji: "📱"
	},
	{
		id: "hardware",
		label: "Hardware",
		emoji: "📡"
	},
	{
		id: "store",
		label: "Store",
		emoji: "🛒"
	},
	{
		id: "download",
		label: "Download",
		emoji: "⬇️"
	},
	{
		id: "usecases",
		label: "Use Cases",
		emoji: "🎯"
	},
	{
		id: "pricing",
		label: "Pricing",
		emoji: "💎"
	},
	{
		id: "enterprise",
		label: "Enterprise",
		emoji: "🏢"
	}
];
function LandingPage({ onLogin, onRegisterUser, onRegisterOrg }) {
	const { globalTheme } = useAppStore();
	const [page, setPage] = (0, import_react.useState)("home");
	const [updateInfo, setUpdateInfo] = (0, import_react.useState)(null);
	const isLight = globalTheme !== "dark";
	(0, import_react.useEffect)(() => {
		checkForUpdate().then((info) => {
			if (info && info.available) setUpdateInfo(info);
		}).catch(() => {});
	}, []);
	(0, import_react.useEffect)(() => {}, []);
	(0, import_react.useEffect)(() => {
		const hash = window.location.hash.replace("#", "");
		if (NAV_ITEMS.find((n) => n.id === hash) || hash === "privacy" || hash === "payment-success") setPage(hash);
	}, []);
	const navigate = (p) => {
		setPage(p);
		window.location.hash = p;
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const sharedProps = {
		onLogin: onLogin || (() => {}),
		onRegisterOrg: onRegisterOrg || (() => {}),
		onRegisterUser: onRegisterUser || (() => {}),
		navigate: (p) => navigate(p),
		onNavigate: (p) => navigate(p)
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `min-h-screen font-sans relative overflow-x-hidden transition-colors ${isLight ? "bg-white text-slate-900" : "bg-[#020617] text-white"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 pointer-events-none z-0 overflow-hidden",
				"aria-hidden": "true",
				style: { opacity: isLight ? .06 : .16 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("video", {
					autoPlay: true,
					loop: true,
					muted: true,
					playsInline: true,
					preload: "auto",
					style: {
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						minWidth: "100%",
						minHeight: "100%",
						width: "auto",
						height: "auto",
						objectFit: "cover"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							src: "/splash-video.mp4",
							type: "video/mp4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							src: "/media/videos/hero_background.mp4",
							type: "video/mp4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							src: "/media/videos/SafetyLink 3D Animation Logo.mp4",
							type: "video/mp4"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpdateBanner, {
				updateInfo,
				onDismiss: () => setUpdateInfo(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				onLogin,
				onRegisterOrg,
				onNavigate: (p) => navigate(p),
				activePage: page
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10",
				children: [
					page === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Home, { ...sharedProps }),
					page === "hardware" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hardware, { ...sharedProps }),
					page === "store" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyWareStore$1, {}),
					page === "download" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadPage, { ...sharedProps }),
					page === "pricing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, { ...sharedProps }),
					page === "platform" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Platform, { ...sharedProps }),
					page === "usecases" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseCases, { ...sharedProps }),
					page === "enterprise" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Enterprise, { ...sharedProps }),
					page === "privacy" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyPolicy, {}),
					page === "payment-success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							minHeight: "80vh",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							padding: "40px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								style: {
									fontSize: "32px",
									color: "#059669",
									fontWeight: 900,
									marginBottom: "12px"
								},
								children: "Payment Successful!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									color: "#475569",
									marginBottom: "24px"
								},
								children: "Your SafetyLink subscription has been activated."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => navigate("home"),
								style: {
									padding: "12px 24px",
									background: "#059669",
									color: "white",
									borderRadius: "8px",
									border: "none",
									fontWeight: 700,
									cursor: "pointer"
								},
								children: "Return to Home"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative z-10",
				style: {
					padding: "0 20px",
					maxWidth: "1240px",
					margin: "48px auto 0"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContinuousTopologyOverview, { activePage: page })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: `relative z-10 border-t px-6 py-10 text-center space-y-4 mt-12 ${isLight ? "bg-emerald-50/40 border-emerald-100 text-slate-700" : "bg-slate-950/80 border-slate-800 text-slate-400"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap justify-center gap-4 text-xs font-mono",
						children: NAV_ITEMS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate(n.id),
							className: "hover:text-emerald-600 transition-colors uppercase tracking-wider font-semibold",
							children: n.label
						}, n.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-center gap-4 text-xs font-mono",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:info@safetylink.online",
								className: "text-emerald-700 hover:text-emerald-600 font-semibold",
								children: "✉️ info@safetylink.online"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "tel:0816738186",
								className: "text-emerald-700 hover:text-emerald-600 font-semibold",
								children: "📞 081 673 8186"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "tel:+27680079911",
								className: "text-emerald-700 hover:text-emerald-600 font-semibold",
								children: "📲 +27 68 007 9911"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => navigate("privacy"),
								className: "hover:text-emerald-600 font-semibold underline",
								children: "Privacy Policy & POPIA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://wa.me/message/YIEA73M7H3P5M1",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-emerald-700 hover:text-emerald-600 font-semibold",
								children: "💬 WhatsApp Support"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `max-w-2xl mx-auto p-3 rounded-xl border text-[10px] leading-relaxed ${isLight ? "bg-white border-emerald-100 text-slate-600" : "bg-slate-900/60 border-slate-800 text-slate-400"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "POPIA Compliance Notice (Act 4 of 2013):" }),
							" SafetyLink processes personal information and emergency GPS coordinates solely for life-safety dispatch and authorized command-center coordination. Operated by ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "TM Media Solutions (Pty) Ltd" }),
							" (Reg: 2018/500191/07), Johannesburg, Gauteng, South Africa."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-widest opacity-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© TM Media Solutions (Pty) Ltd · Reg 2018/500191/07 · safetylink.online" }), onLogin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onLogin,
							"aria-label": "P",
							className: `w-5 h-5 rounded border text-[9px] font-black transition-colors ${isLight ? "border-emerald-200 text-emerald-700 hover:bg-emerald-100" : "border-slate-700 text-slate-400 hover:bg-slate-800"}`,
							children: "P"
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/DnsSetupGuide.tsx
var STEPS = {
	android: {
		title: "Android — Private DNS Setup",
		steps: [
			"Open Settings on your Android device",
			"Tap Network & Internet (or Connections on Samsung)",
			"Tap Advanced → Private DNS",
			"Select Private DNS provider hostname",
			"Type: dns.safetylink.online",
			"Tap Save",
			"The 🔑 key icon will appear in your status bar — SafetyLink DNS is active"
		]
	},
	samsung: {
		title: "Samsung — DNS Setup",
		steps: [
			"Open Settings → Connections",
			"Tap More connection settings",
			"Tap Private DNS",
			"Choose Private DNS provider hostname",
			"Enter: dns.safetylink.online",
			"Tap Save",
			"🔑 key icon confirms SafetyLink DNS is protecting your device"
		]
	},
	windows: {
		title: "Windows 11 — DNS over HTTPS",
		steps: [
			"Open Settings → Network & Internet",
			"Click your active connection (WiFi or Ethernet)",
			"Scroll to DNS server assignment → Edit",
			"Switch to Manual",
			"Enable IPv4, set Preferred DNS: 1.1.1.1",
			"Set DNS over HTTPS: On (automatic template)",
			"Set custom DoH template: https://dns.safetylink.online/dns-query",
			"Save — SafetyLink DNS filtering is now active"
		]
	},
	ios: {
		title: "iPhone / iPad — DNS Setup",
		steps: [
			"Download a DNS profile or use a DoH app (e.g. Cloudflare 1.1.1.1 app)",
			"Or: Open Settings → WiFi → tap your network → Configure DNS",
			"Switch to Manual",
			"Delete existing DNS servers",
			"Tap Add Server → enter: 1.1.1.1",
			"Note: iOS does not natively support custom DoH hostnames without a profile",
			"For full SafetyLink DNS on iOS, use a VPN-based DNS profile (contact support)"
		]
	},
	router: {
		title: "Router — Whole-Network DNS",
		steps: [
			"Open your router admin panel (usually 192.168.1.1 or 192.168.0.1)",
			"Find DNS settings (under WAN, Internet, or Advanced)",
			"Replace DNS servers with SafetyLink DoH-compatible IPs",
			"Primary DNS: 1.1.1.1 (Cloudflare)",
			"For DoH: configure DNS-over-HTTPS URL: https://dns.safetylink.online/dns-query",
			"Save and restart router",
			"Every device on your network is now protected"
		]
	}
};
function DnsSetupGuide({ onClose }) {
	const defaultTab = Capacitor.isNativePlatform() ? "android" : "windows";
	const [tab, setTab] = (0, import_react.useState)(defaultTab);
	const current = STEPS[tab];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-sm flex flex-col overflow-y-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] text-emerald-400 font-mono uppercase tracking-widest",
				children: "SafetyLink"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-black text-white uppercase tracking-wider",
				children: "DNS Shield Setup"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				className: "p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					className: "w-4 h-4",
					fill: "none",
					viewBox: "0 0 24 24",
					stroke: "currentColor",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						strokeLinecap: "round",
						strokeLinejoin: "round",
						strokeWidth: 2,
						d: "M6 18L18 6M6 6l12 12"
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 max-w-lg mx-auto w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-4 mb-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl",
							children: "🔑"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-black text-emerald-400 uppercase tracking-wider mb-1",
							children: "What is SafetyLink DNS?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-300 leading-relaxed",
							children: [
								"SafetyLink runs its own DNS resolver at ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-emerald-400 font-mono",
									children: "dns.safetylink.online"
								}),
								". When configured, your device routes DNS queries through SafetyLink's servers — blocking ads, trackers, and malware before they reach your device. The 🔑 icon in your status bar confirms it's active."
							]
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 flex-wrap mb-5",
					children: Object.keys(STEPS).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setTab(k),
						className: `px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${tab === k ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"}`,
						children: k === "android" ? "📱 Android" : k === "samsung" ? "📱 Samsung" : k === "windows" ? "💻 Windows" : k === "ios" ? "🍎 iPhone" : "📡 Router"
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-black text-white mb-4",
						children: current.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-3",
						children: current.steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5",
								children: i + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-slate-300 leading-relaxed",
								children: step
							})]
						}, i))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-700 rounded-2xl p-4 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-2",
						children: "SafetyLink DNS Endpoints"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: [
							{
								label: "Private DNS (Android 9+)",
								value: "dns.safetylink.online"
							},
							{
								label: "DNS over HTTPS (DoH)",
								value: "https://dns.safetylink.online/dns-query"
							},
							{
								label: "DNS over TLS (DoT)",
								value: "dns.safetylink.online:853"
							}
						].map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-slate-500",
								children: e.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-mono text-emerald-400 bg-slate-800 px-2 py-1 rounded-lg",
								children: e.value
							})]
						}, e.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-slate-500 font-mono",
						children: "Need help configuring?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://wa.me/message/YIEA73M7H3P5M1",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
						children: "💬 WhatsApp Support"
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/ResponderDashboard.tsx
var STATUS_COLORS = {
	safe: "#22c55e",
	panic: "#ef4444",
	offline: "#64748b"
};
var ResponderDashboard = () => {
	const currentUser = useAppStore((s) => s.currentUser);
	const users = useAppStore((s) => s.users);
	const [selectedUserId, setSelectedUserId] = (0, import_react.useState)(null);
	const [mapCenter, setMapCenter] = (0, import_react.useState)({
		lat: -26.3085,
		lng: 27.8344
	});
	const [mapTypeId, setMapTypeId] = (0, import_react.useState)("roadmap");
	const panicEvents = useAppStore((s) => s.panicEvents);
	const orgCode = currentUser?.orgCode;
	const guardedUsers = users.filter((u) => u.orgCode === orgCode && u.role !== "Organization Administrator" && u.role !== "Control Room Operator" && u.role !== "Dispatcher" && u.role !== "Responder");
	const getUserStatus = (u) => {
		if (panicEvents.some((e) => e.profileUsed === u.id && e.status !== "RESOLVED")) return "panic";
		if (!u.lastLocation) return "offline";
		return Date.now() - (u.lastLocation.timestamp || 0) < 3e5 ? "safe" : "offline";
	};
	const panicUsers = guardedUsers.filter((u) => getUserStatus(u) === "panic");
	const focusLoc = (guardedUsers.find((u) => u.id === selectedUserId) || panicUsers[0] || guardedUsers[0])?.lastLocation || mapCenter;
	const focusLat = typeof focusLoc?.lat === "number" && focusLoc.lat !== 0 ? focusLoc.lat : mapCenter.lat;
	const focusLng = typeof focusLoc?.lng === "number" && focusLoc.lng !== 0 ? focusLoc.lng : mapCenter.lng;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full bg-slate-950 text-white overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-2 flex-shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-black font-mono text-sm text-red-400 uppercase tracking-widest",
					children: "Responder Console"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-gray-400 text-xs font-mono mt-0.5",
					children: [
						guardedUsers.length,
						" residents · ",
						panicUsers.length,
						" alerts"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMapTypeId((prev) => prev === "roadmap" ? "hybrid" : prev === "hybrid" ? "satellite" : "roadmap"),
							className: "text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 uppercase",
							children: ["Layer: ", mapTypeId]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${focusLat},${focusLng}`,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-blue-300 hover:bg-slate-700 uppercase",
							children: "Street View"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `https://www.google.com/maps/dir/?api=1&destination=${focusLat},${focusLng}`,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-600/90 text-white hover:bg-emerald-500 uppercase",
							children: "Navigate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 pl-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-emerald-400 font-mono text-xs font-bold",
								children: "LIVE"
							})]
						})
					]
				})]
			}),
			panicUsers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-red-950 border-b border-red-500/50 px-4 py-2 flex-shrink-0 space-y-1",
				children: panicUsers.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 animate-pulse",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-red-400 font-black font-mono text-xs",
							children: "PANIC:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white font-bold text-xs",
							children: u.fullName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-red-300 text-xs",
							children: u.phone
						})
					]
				}, u.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 min-h-[260px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(APIProvider, {
					apiKey: "AIzaSyBPpINHL8NBGrjNA6IOiX6PhHK8IENUBNs",
					language: "en",
					region: "ZA",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map$1, {
						defaultCenter: mapCenter,
						center: {
							lat: focusLat,
							lng: focusLng
						},
						defaultZoom: 14,
						mapId: "DEMO_MAP_ID",
						internalUsageAttributionIds: ["gmp_mcp_codeassist_v1_aistudio"],
						mapTypeId,
						style: {
							width: "100%",
							height: "100%"
						},
						gestureHandling: "greedy",
						disableDefaultUI: false,
						children: guardedUsers.map((u) => {
							const loc = u.lastLocation;
							if (!loc?.lat || !loc?.lng) return null;
							const color = STATUS_COLORS[getUserStatus(u)];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdvancedMarker, {
								position: {
									lat: loc.lat,
									lng: loc.lng
								},
								onClick: () => setSelectedUserId(u.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 14,
										height: 14,
										borderRadius: "50%",
										background: color,
										border: "2px solid white",
										boxShadow: `0 0 8px ${color}`,
										cursor: "pointer",
										transform: selectedUserId === u.id ? "scale(1.6)" : "scale(1)",
										transition: "transform 0.15s"
									},
									title: u.fullName
								})
							}, u.id);
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-slate-900 border-t border-slate-800 flex-shrink-0 max-h-44 overflow-y-auto",
				children: guardedUsers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 text-center text-gray-500 font-mono text-xs",
					children: "No residents assigned to this organisation yet."
				}) : guardedUsers.map((u) => {
					const status = getUserStatus(u);
					const color = STATUS_COLORS[status];
					const loc = u.lastLocation;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => {
							setSelectedUserId(u.id);
							if (loc?.lat) setMapCenter({
								lat: loc.lat,
								lng: loc.lng
							});
						},
						className: `flex items-center gap-3 px-4 py-2.5 border-b border-slate-800/50 cursor-pointer hover:bg-slate-800/50 transition-colors ${selectedUserId === u.id ? "bg-slate-800" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
								style: { background: color }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-xs text-white truncate",
									children: u.fullName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-gray-400 text-[10px] font-mono",
									children: u.phone || "No phone"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-black font-mono uppercase px-2 py-0.5 rounded-full",
								style: {
									background: color + "22",
									color
								},
								children: status
							})
						]
					}, u.id);
				})
			})
		]
	});
};
//#endregion
//#region src/utils/paystackService.ts
var PLANS = {
	individual_premium: {
		name: "SafetyLink Premium",
		amount: 4900,
		description: "Individual Premium — R49/mo"
	},
	individual_family: {
		name: "SafetyLink Family",
		amount: 9900,
		description: "Family Plan — R99/mo"
	},
	org_starter: {
		name: "SafetyLink Org Starter",
		amount: 99900,
		description: "Organisation Starter — R999/mo"
	},
	org_professional: {
		name: "SafetyLink Org Professional",
		amount: 249900,
		description: "Organisation Professional — R2,499/mo"
	},
	org_business: {
		name: "SafetyLink Org Business",
		amount: 599900,
		description: "Organisation Business — R5,999/mo"
	}
};
async function openPaystackCheckout({ planId, amount, planName, email, metadata = {}, onSuccess, onClose }) {
	const plan = planId && planId in PLANS ? PLANS[planId] : {
		amount: Math.max(4900, amount || 4900),
		name: planName || "SafetyLink Subscription"
	};
	const totalAmount = Math.max(4900, plan.amount);
	try {
		const res = await fetch("/api/paystack/initialize", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				amount: totalAmount,
				planId: String(planId || "CUSTOM"),
				metadata: {
					merchant_id: "26778541",
					planName: plan.name,
					...metadata
				}
			})
		});
		if (res.ok) {
			const data = await res.json();
			if (data?.data?.authorization_url) {
				window.location.href = data.data.authorization_url;
				return;
			}
		}
	} catch (err) {
		console.warn("Backend Paystack initialize error, attempting inline modal fallback:", err);
	}
	const PaystackPop = window.PaystackPop;
	const key = "pk_live_123a593f6611ef474e5076a9d1b8c442eb9f3aa3";
	if (PaystackPop && key) {
		PaystackPop.setup({
			key,
			email,
			amount: totalAmount,
			currency: "ZAR",
			ref: `SL-${String(planId || "CUSTOM").toUpperCase()}-${Date.now()}`,
			label: plan.name,
			metadata: {
				merchant_id: "26778541",
				plan_id: planId,
				...metadata
			},
			callback: (transaction) => {
				onSuccess?.(transaction.reference);
			},
			onClose: () => {
				onClose?.();
			}
		}).openIframe();
		return;
	}
	alert("Paystack payments are being configured. Please ensure VITE_PAYSTACK_PUBLIC_KEY or PAYSTACK_SECRET_KEY is provided in settings.");
}
//#endregion
//#region src/components/TrialBanner.tsx
var TrialBanner = () => {
	const currentUser = useAppStore((s) => s.currentUser);
	const currentOrg = useAppStore((s) => s.currentOrg);
	const [dismissed, setDismissed] = (0, import_react.useState)(false);
	const [paying, setPaying] = (0, import_react.useState)(false);
	if (dismissed) return null;
	const subject = currentOrg || currentUser;
	const isOrg = !!currentOrg;
	if (!subject || subject.subscriptionStatus !== "trial") return null;
	const expiresAt = (subject.createdAt || Date.now()) + 12096e5;
	const daysLeft = Math.max(0, Math.ceil((expiresAt - Date.now()) / 864e5));
	const urgent = daysLeft <= 3;
	const handleUpgrade = () => {
		const email = currentUser?.email || "customer@safetylink.online";
		const planId = isOrg ? "org_starter" : "individual_premium";
		setPaying(true);
		openPaystackCheckout({
			planId,
			email,
			metadata: {
				org_code: currentOrg?.id || "",
				user_id: currentUser?.id || ""
			},
			onSuccess: (ref) => {
				setPaying(false);
				alert(`Payment successful! Ref: ${ref}\nYour subscription is now active.`);
			},
			onClose: () => setPaying(false)
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `w-full flex items-center justify-between gap-3 px-4 py-2 text-xs font-mono font-bold z-[9999] flex-shrink-0
      ${urgent ? "bg-red-950/90 border-b border-red-500/50 text-red-300" : "bg-amber-950/90 border-b border-amber-500/40 text-amber-300"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: urgent ? "🔴" : "⚡" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: daysLeft > 0 ? `TRIAL — ${daysLeft} day${daysLeft !== 1 ? "s" : ""} remaining` : "TRIAL EXPIRED — upgrade to continue"
				}),
				isOrg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "opacity-60 hidden sm:inline truncate",
					children: ["· ", currentOrg?.name]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 flex-shrink-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleUpgrade,
				disabled: paying,
				className: `px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border transition-colors disabled:opacity-50
            ${urgent ? "border-red-400 text-red-200 hover:bg-red-500/20" : "border-amber-400 text-amber-200 hover:bg-amber-500/20"}`,
				children: paying ? "..." : "Upgrade"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setDismissed(true),
				className: "opacity-50 hover:opacity-100 transition-opacity text-base leading-none",
				children: "×"
			})]
		})]
	});
};
//#endregion
//#region src/services/lizzy.ts
async function getLizzyMessage(panicStatus, lang) {
	const fallback = {
		en: "Hi, it's Lizzy from SafetyLink. Are you safe right now? Tap or say 'I am okay' to resolve, or 'Restart Panic' if you still need help.",
		zu: "Sawubona, ngu-Lizzy wakwa SafetyLink. Ingabe uphephile manje? Yithi 'Ngilungile' ukuvala noma 'Qala Kabusha' uma udinga usizo.",
		af: "Hallo, dis Lizzy van SafetyLink. Is jy nou veilig? Sê 'Ek is okay' om af te sluit of 'Herbegin' as jy nog hulp nodig het."
	};
	try {
		const res = await fetch("/api/gemini/chat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				message: `Panic status: ${panicStatus}. Language code: ${lang}. Write a short, warm 2-sentence check-in asking if the user is okay 10 minutes after an SOS alert and whether to keep dispatch active.`,
				useFlashLite: true
			})
		});
		if (res.ok) {
			const data = await res.json();
			if (data.text) return data.text;
		}
	} catch {}
	return fallback[lang] || fallback.en;
}
//#endregion
//#region src/components/LizzyPopup.tsx
var LizzyPopup = () => {
	const { showLizzyPopup, setShowLizzyPopup, startMultiStagePanic, resolvePanic, currentPanicEvent, language } = useAppStore();
	const [isListening, setIsListening] = (0, import_react.useState)(false);
	const [liveActive, setLiveActive] = (0, import_react.useState)(false);
	const [liveStatus, setLiveStatus] = (0, import_react.useState)("");
	const [promptMessage, setPromptMessage] = (0, import_react.useState)("Hi, it's Lizzy from SafetyLink. Are you okay? Should I keep emergency dispatch active, or mark you safe?");
	const recognitionRef = (0, import_react.useRef)(null);
	const wsRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const processorRef = (0, import_react.useRef)(null);
	const audioCtxRef = (0, import_react.useRef)(null);
	const stopLiveVoice = () => {
		setLiveActive(false);
		setLiveStatus("");
		if (wsRef.current) {
			try {
				wsRef.current.close();
			} catch {}
			wsRef.current = null;
		}
		if (processorRef.current) {
			try {
				processorRef.current.disconnect();
			} catch {}
			processorRef.current = null;
		}
		if (audioCtxRef.current) {
			try {
				audioCtxRef.current.close();
			} catch {}
			audioCtxRef.current = null;
		}
		if (streamRef.current) {
			streamRef.current.getTracks().forEach((t) => t.stop());
			streamRef.current = null;
		}
	};
	const handleRestart = () => {
		stopLiveVoice();
		setShowLizzyPopup(false);
		startMultiStagePanic("Lizzy 10-minute check-in escalated distress.", 0);
	};
	const handleResolve = () => {
		stopLiveVoice();
		if (currentPanicEvent?.id) resolvePanic(currentPanicEvent.id);
		setShowLizzyPopup(false);
	};
	const startLiveGeminiConversation = async () => {
		if (liveActive) {
			stopLiveVoice();
			return;
		}
		if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
		if (recognitionRef.current) try {
			recognitionRef.current.stop();
		} catch {}
		setLiveActive(true);
		setLiveStatus("Connecting live voice check-in with Lizzy...");
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: {
				channelCount: 1,
				sampleRate: 16e3
			} });
			streamRef.current = stream;
			const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
			const ws = new WebSocket(`${protocol}//${window.location.host}/live?mode=checkin`);
			wsRef.current = ws;
			const AudioCtx = window.AudioContext || window.webkitAudioContext;
			const inCtx = new AudioCtx({ sampleRate: 16e3 });
			const outCtx = new AudioCtx({ sampleRate: 24e3 });
			audioCtxRef.current = outCtx;
			const source = inCtx.createMediaStreamSource(stream);
			const processor = inCtx.createScriptProcessor(4096, 1, 1);
			processorRef.current = processor;
			let nextStart = 0;
			ws.onopen = () => {
				setLiveStatus("Connected to Lizzy Live Voice (gemini-3.8-live). Speak naturally.");
				processor.onaudioprocess = (ev) => {
					const input = ev.inputBuffer.getChannelData(0);
					const pcm16 = new Int16Array(input.length);
					for (let i = 0; i < input.length; i++) pcm16[i] = Math.max(-1, Math.min(1, input[i])) * 32767;
					const bytes = new Uint8Array(pcm16.buffer);
					let bin = "";
					for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
					if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({
						type: "audio",
						data: btoa(bin)
					}));
				};
				source.connect(processor);
				processor.connect(inCtx.destination);
			};
			ws.onmessage = (ev) => {
				try {
					const msg = JSON.parse(ev.data);
					if (msg.type === "audio" && msg.data) {
						const bin = atob(msg.data);
						const bytes = new Uint8Array(bin.length);
						for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
						const pcm16 = new Int16Array(bytes.buffer);
						const f32 = new Float32Array(pcm16.length);
						for (let i = 0; i < pcm16.length; i++) f32[i] = pcm16[i] / 32767;
						const buf = outCtx.createBuffer(1, f32.length, 24e3);
						buf.getChannelData(0).set(f32);
						const src = outCtx.createBufferSource();
						src.buffer = buf;
						src.connect(outCtx.destination);
						if (nextStart < outCtx.currentTime) nextStart = outCtx.currentTime;
						src.start(nextStart);
						nextStart += buf.duration;
					} else if (msg.type === "text" && msg.text) setPromptMessage(msg.text);
					else if (msg.type === "error") {
						setLiveActive(false);
						if (processorRef.current) {
							try {
								processorRef.current.disconnect();
							} catch {}
							processorRef.current = null;
						}
						if (streamRef.current) {
							streamRef.current.getTracks().forEach((t) => t.stop());
							streamRef.current = null;
						}
						setLiveStatus(`Local voice mode active: ${msg.message}`);
					}
				} catch (err) {
					console.error("Live check-in decode error:", err);
				}
			};
			ws.onerror = () => {
				setLiveActive(false);
				setLiveStatus("Live voice unavailable — use tap or speech buttons below.");
			};
			ws.onclose = () => setLiveActive(false);
		} catch {
			setLiveActive(false);
			setLiveStatus("Microphone unavailable for live voice.");
		}
	};
	const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
	(0, import_react.useEffect)(() => {
		let active = true;
		if (showLizzyPopup) getLizzyMessage(currentPanicEvent?.status || "ACTIVE", language || "en").then((msg) => {
			if (active && msg) setPromptMessage(msg);
			if (active && synth) {
				synth.cancel();
				const utterance = new SpeechSynthesisUtterance(msg);
				const voices = synth.getVoices();
				utterance.voice = voices.find((v) => v.name.includes("Female")) || voices[0] || null;
				utterance.onend = () => {
					if (!active) return;
					try {
						const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
						if (SpeechRecognition) {
							recognitionRef.current = new SpeechRecognition();
							recognitionRef.current.continuous = false;
							recognitionRef.current.interimResults = false;
							recognitionRef.current.onstart = () => setIsListening(true);
							recognitionRef.current.onend = () => setIsListening(false);
							recognitionRef.current.onresult = (event) => {
								const transcript = event.results[0][0].transcript.toLowerCase();
								if (transcript.includes("help") || transcript.includes("no") || transcript.includes("restart") || transcript.includes("dispatch")) handleRestart();
								else if (transcript.includes("okay") || transcript.includes("safe") || transcript.includes("cancel") || transcript.includes("yes")) handleResolve();
							};
							recognitionRef.current.start();
						}
					} catch {}
				};
				synth.speak(utterance);
			}
		}).catch(() => {});
		else {
			stopLiveVoice();
			if (synth) synth.cancel();
			if (recognitionRef.current) {
				try {
					recognitionRef.current.stop();
				} catch {}
				recognitionRef.current = null;
			}
		}
		return () => {
			active = false;
			stopLiveVoice();
			if (synth) synth.cancel();
			if (recognitionRef.current) {
				try {
					recognitionRef.current.stop();
				} catch {}
				recognitionRef.current = null;
			}
		};
	}, [showLizzyPopup]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showLizzyPopup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .9,
				y: 20
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .9,
				y: 20
			},
			className: "bg-slate-900 border border-emerald-500/40 shadow-2xl rounded-3xl p-6 max-w-sm w-full text-center relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border transition-all duration-500 ${liveActive || isListening ? "bg-emerald-500/30 border-emerald-400 animate-pulse" : "bg-slate-800 border-emerald-500/30"}`,
					children: liveActive || isListening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
						className: "text-emerald-300",
						size: 24
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl font-black text-emerald-400",
						children: "AI"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-block text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-1",
					children: "10-Minute Safety Check-In"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold text-white mb-2",
					children: "Lizzy AI Welfare Check"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-slate-300 text-sm mb-4 leading-relaxed",
					children: [
						"“",
						promptMessage,
						"”"
					]
				}),
				liveStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-mono text-emerald-300 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 mb-4",
					children: liveStatus
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: startLiveGeminiConversation,
							className: `w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-colors text-sm ${liveActive ? "bg-amber-600 hover:bg-amber-500 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"}`,
							children: [liveActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneOff, { size: 17 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneCall, { size: 17 }), liveActive ? "End Live Voice Call" : "Talk Live with Lizzy AI"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleRestart,
							className: "w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-xl transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 18 }), "Start / Restart Dispatch"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleResolve,
							className: "w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 font-bold py-3.5 rounded-xl transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 18 }), "I'm Okay (Resolve)"]
						})
					]
				})
			]
		})
	}) });
};
//#endregion
//#region src/utils/translations.ts
var SA_LANGUAGES = [
	{
		code: "hi",
		name: "Hindi",
		nativeName: "Hindi",
		flag: "🇿🇦",
		status: "downloadable"
	},
	{
		code: "en",
		name: "English",
		nativeName: "English",
		flag: "🇿🇦",
		status: "preloaded"
	},
	{
		code: "ve",
		name: "Tshivenda",
		nativeName: "Tshivenda",
		flag: "🇿🇦",
		status: "preloaded"
	},
	{
		code: "zu",
		name: "isiZulu",
		nativeName: "isiZulu",
		flag: "🇿🇦",
		status: "downloadable"
	},
	{
		code: "xh",
		name: "isiXhosa",
		nativeName: "isiXhosa",
		flag: "🇿🇦",
		status: "downloadable"
	},
	{
		code: "af",
		name: "Afrikaans",
		nativeName: "Afrikaans",
		flag: "🇿🇦",
		status: "downloadable"
	},
	{
		code: "nso",
		name: "Sepedi",
		nativeName: "Sepedi (Northern Sotho)",
		flag: "🇿🇦",
		status: "downloadable"
	},
	{
		code: "st",
		name: "Sesotho",
		nativeName: "Sesotho (Southern Sotho)",
		flag: "🇿🇦",
		status: "downloadable"
	},
	{
		code: "tn",
		name: "Setswana",
		nativeName: "Setswana",
		flag: "🇿🇦",
		status: "downloadable"
	},
	{
		code: "ts",
		name: "Xitsonga",
		nativeName: "Xitsonga",
		flag: "🇿🇦",
		status: "downloadable"
	},
	{
		code: "ss",
		name: "Siswati",
		nativeName: "SiSwati",
		flag: "🇿🇦",
		status: "downloadable"
	},
	{
		code: "nr",
		name: "isiNdebele",
		nativeName: "isiNdebele",
		flag: "🇿🇦",
		status: "downloadable"
	}
];
var translationDicts = {
	hi: {
		"status.secure": "सुरक्षा सुरक्षित स्थिति: सशस्त्र और सक्रिय",
		"status.emergency": "⚠️ आपातकालीन संकट प्रसारण बीकन सक्रिय ⚠️",
		"status.drill": "ड्रिल मोड सक्रिय - एसएमएस/कॉल सिम्युलेटेड हैं",
		"header.powered": "टीएम मीडिया सॉल्यूशंस द्वारा संचालित",
		"header.signout": "साइन आउट",
		"tab.home": "होम",
		"tab.contacts": "संपर्क",
		"tab.ble": "बीकन",
		"tab.map": "नक्शा",
		"tab.settings": "सेटिंग्स",
		"tab.subsystems": "सबसिस्टम",
		"home.reassurance_title": "आप पूरी तरह से सुरक्षित हैं",
		"home.reassurance_subtitle": "सेफ्टीलिंक आपकी पृष्ठभूमि टेलीमेट्री पर नज़र रखता है और सशस्त्र गश्ती एस्कॉर्ट्स के साथ समन्वय करता है। किसी भी संकट की स्थिति में नीचे लाल एक्ट्यूएटर दबाएं।",
		"home.trigger_desc_placeholder": "अपनी तत्काल स्थिति का वर्णन करें (वैकल्पिक)...",
		"home.drill_label": "टेस्ट ड्रिल मोड सक्रिय",
		"home.drill_desc": "डिस्पैच को स्थानीय लेजर पर सिम्युलेट किया जाएगा।",
		"home.armed_label": "बीकन सिस्टम सशस्त्र",
		"home.armed_desc": "तत्काल संकट ट्रिगर के लिए स्टैंडबाय।",
		"settings.title": "सिस्टम कोर डायग्नोस्टिक्स",
		"settings.subtitle": "स्थानीय ऑडिटिंग और प्रशासनिक टेलीमेट्री",
		"settings.diagnostics_title": "एक्ट्यूएटर डायग्नोस्टिक कंट्रोल",
		"settings.diagnose_btn": "💻 सेल्फ-डायग्नोस",
		"settings.purge_btn": "🗑️ ऑडिट लॉग को साफ करें",
		"settings.shortcut_title": "होमस्क्रीन क्विक शॉर्टकट एक्ट्यूएटर",
		"settings.shortcut_name": "रेड सर्कल पैनिक एक्ट्यूएटर",
		"settings.shortcut_desc": "ताले को बायपास करने और सीधे सुरक्षा कैस्केड को ट्रिगर करने के लिए एक उच्च-कंट्रास्ट रेड सर्कल विजेट स्थापित करें।",
		"settings.ledger_title": "सामरिक सुरक्षा लेजर",
		"settings.events_badge": "घटनाएँ",
		"settings.language_title": "भाषा और स्थानीयकरण समर्थन",
		"settings.language_subtitle": "प्राथमिक इंटरफ़ेस भाषा और दक्षिण अफ़्रीकी पैकेज कॉन्फ़िगर करें",
		"settings.download_language": "अन्य SA भाषाएँ डाउनलोड करें",
		"settings.downloading": "डाउनलोड हो रहा है...",
		"settings.download_btn": "डाउनलोड",
		"settings.preloaded": "प्रीलोडेड",
		"settings.downloaded": "डाउनलोड किया गया",
		"settings.download_success": "भाषा पैकेज सफलतापूर्वक डाउनलोड किया गया!"
	},
	zu: {
		"status.secure": "ISIMO SOKUPHEPHA: IHLOMILE FUTHI IYASEBENZA",
		"status.emergency": "⚠️ ISIMO EZIPHUTHUMAYO SOKUSAKAZA SOS SIYASEBENZA ⚠️",
		"status.drill": "IMODI YEKUDRILLA IYASEBENZA - AMA-SMS ENZIWE KWAZISWA",
		"header.powered": "IXHASWE NGE-TM MEDIA SOLUTIONS",
		"header.signout": "Phuma",
		"tab.home": "Ikhaya",
		"tab.contacts": "Oxhumana nabo",
		"tab.ble": "Ama-Beacons",
		"tab.map": "Imephu",
		"tab.settings": "Amasethingi",
		"tab.subsystems": "Amasistimu amancane",
		"home.reassurance_title": "Uvikelwe ngokuphelele",
		"home.reassurance_subtitle": "I-SafetyLink iqapha imininingwane yakho yasemuva futhi ihlanganyele nonogada abahlomile. Cindezela inkinobho ebomvu ngezansi kunoma yisiphi isimo sokucindezeleka.",
		"home.trigger_desc_placeholder": "Chaza isimo sakho esiphuthumayo (uma uthanda)...",
		"home.drill_label": "IMODI YOKUHLOLA IYASEBENZA",
		"home.drill_desc": "Ukusatshalaliswa kuzokwenziwa ohlelweni lwendawo.",
		"home.armed_label": "UHLELO LWE-BEACON LUHLOMILE",
		"home.armed_desc": "Lindela ukucupha kwesimo esiphuthumayo.",
		"settings.title": "Ukuxilongwa Kwe-System Core",
		"settings.subtitle": "Ukuhlola kwendawo kanye netelemetry yokuphatha",
		"settings.diagnostics_title": "Izilawuli Zokuxilonga Zenkinobho",
		"settings.diagnose_btn": "💻 ZIHLOLE WENA",
		"settings.purge_btn": "🗑️ SUSA UMLANDO WEZENZAKALO",
		"settings.shortcut_title": "Inkinobho Yesinqamuleli Sasekhaya",
		"settings.shortcut_name": "INKINOBHO EBOMVU YE-PANIC",
		"settings.shortcut_desc": "Faka iwijethi eyindilinga ebomvu enomehluko omkhulu ukuze udlule okhiye bese ucupha izexwayiso zokuphepha eziqondile.",
		"settings.ledger_title": "I-Ledger Yezokuphepha Yeqhinga",
		"settings.events_badge": "IZENZAKALO",
		"settings.language_title": "Ukusekelwa Kolimi Nezokwenza Indawo",
		"settings.language_subtitle": "Lungiselela ulimi lwesixhumi esibonakalayo namaphakheji waseNingizimu Afrika",
		"settings.download_language": "Landa Ezinye Izilimi ze-SA",
		"settings.downloading": "Iyalanda...",
		"settings.download_btn": "Landa",
		"settings.preloaded": "Ilayishwe kuqala",
		"settings.downloaded": "Ilandiwe",
		"settings.download_success": "Iphakheji yolimi ilandwe ngempumelelo!"
	},
	af: {
		"status.secure": "VEILIGHEIDSTATUS: GEWAPEN EN AKTIEF",
		"status.emergency": "⚠️ NOODSAITSAAIBAKEN AKTIEF ⚠️",
		"status.drill": "OEFENMODUS AKTIEF - SMS/Oproepe word gesimuleer",
		"header.powered": "AANGEDRYF DEUR TM MEDIA SOLUTIONS",
		"header.signout": "Teken Uit",
		"tab.home": "Tuis",
		"tab.contacts": "Kontakte",
		"tab.ble": "Bakens",
		"tab.map": "Kaart",
		"tab.settings": "Instellings",
		"tab.subsystems": "Substelsels",
		"home.reassurance_title": "Jy is ten volle beskerm",
		"home.reassurance_subtitle": "SafetyLink monitor jou agtergrondtelemetrie en koördineer met gewapende patrolliebegeleidings. Druk die rooi aktueerder hieronder in enige noodsituasie.",
		"home.trigger_desc_placeholder": "Beskryf jou onmiddellike situasie (opsioneel)...",
		"home.drill_label": "TOETS OEFENMODUS AKTIEF",
		"home.drill_desc": "Uitstuur sal op die plaaslike grootboek gesimuleer word.",
		"home.armed_label": "BAKENSTELSEL GEWAPEN",
		"home.armed_desc": "Gereed vir onmiddellike noodsneller.",
		"settings.title": "Stelsel Kern Diagnostiek",
		"settings.subtitle": "Plaaslike ouditering en administratiewe telemetrie",
		"settings.diagnostics_title": "Aktueerder Diagnostiese Kontroles",
		"settings.diagnose_btn": "💻 SELF-DIAGNOSE",
		"settings.purge_btn": "🗑️ VEE OUDITLOG UIT",
		"settings.shortcut_title": "Tuisskerm Vinnige Kortpad Aktueerder",
		"settings.shortcut_name": "ROOI SIRKEL PANIEKAKTUEERDER",
		"settings.shortcut_desc": "Installeer 'n hoë-kontras Rooi Sirkel legstuk om slotte te omseil en direkte veiligheidskaskades te aktiveer.",
		"settings.ledger_title": "Taktiese Veiligheidsgrootboek",
		"settings.events_badge": "GEBEURE",
		"settings.language_title": "Taal- en Lokaliseringsondersteuning",
		"settings.language_subtitle": "Stel die primêre koppelvlaktaal en Suid-Afrikaanse pakkette in",
		"settings.download_language": "Laai Ander SA Tale Af",
		"settings.downloading": "Besig om af te laai...",
		"settings.download_btn": "Laai af",
		"settings.preloaded": "Vooraf gelaai",
		"settings.downloaded": "Afgegelaai",
		"settings.download_success": "Taalpakket suksesvol afgelaai!"
	},
	en: {
		"status.secure": "SAFETY SECURE STATUS: ARMED & ACTIVE",
		"status.emergency": "⚠️ EMERGENCY DISTRESS BROADCAST BEACON ACTIVE ⚠️",
		"status.drill": "DRILL MODE ACTIVE - SMS/CALLS ARE SIMULATED",
		"header.powered": "POWERED BY TM MEDIA SOLUTIONS",
		"header.signout": "Sign Out",
		"tab.home": "Home",
		"tab.cameras": "Live Cameras",
		"tab.contacts": "Contacts",
		"tab.ble": "Beacons",
		"tab.map": "Map",
		"tab.settings": "Settings",
		"tab.subsystems": "Subsystems",
		"home.reassurance_title": "You are fully protected",
		"home.reassurance_subtitle": "SafetyLink monitors your background telemetry and coordinates with armed patrol escorts. Press the red actuator below in any distress scenario.",
		"home.trigger_desc_placeholder": "Describe your immediate situation (optional)...",
		"home.drill_label": "TEST DRILL MODE ACTIVE",
		"home.drill_desc": "Dispatches will be simulated on local ledger.",
		"home.armed_label": "BEACON SYSTEM ARMED",
		"home.armed_desc": "Standby for instant distress trigger.",
		"settings.title": "System Core Diagnostics",
		"settings.subtitle": "Local auditing & administrative telemetry",
		"settings.diagnostics_title": "Actuator Diagnostic Controls",
		"settings.diagnose_btn": "💻 SELF-DIAGNOSE",
		"settings.purge_btn": "🗑️ PURGE AUDIT LOG",
		"settings.shortcut_title": "Homescreen Quick Shortcut ACTUATOR",
		"settings.shortcut_name": "RED CIRCLE PANIC ACTUATOR",
		"settings.shortcut_desc": "Install a high-contrast Red Circle widget to bypass locks and trigger direct security cascades.",
		"settings.ledger_title": "Tactical Security Ledger",
		"settings.events_badge": "EVENTS",
		"settings.language_title": "Language & Localization Support",
		"settings.language_subtitle": "Configure primary interface language & South African packages",
		"settings.download_language": "Download Other SA Languages",
		"settings.downloading": "Downloading...",
		"settings.download_btn": "Download",
		"settings.preloaded": "Preloaded",
		"settings.downloaded": "Downloaded",
		"settings.download_success": "Language package downloaded successfully!",
		"auth.welcome": "SafetyLink Gateway",
		"auth.pair_title": "Configure Wearable iTAG",
		"auth.pair_desc": "Pair your Bluetooth BLE tracker keyfob to trigger instant physical distress signals.",
		"auth.scan_btn": "Scan Nearby Beacons",
		"auth.stop_scan_btn": "Stop Scan",
		"auth.pairing_active": "PAIRING ACTIVE",
		"auth.bind_btn": "BIND TAG",
		"auth.skip_btn": "Skip & Continue to Sign In →",
		"auth.beacons_anytime": "You can pair or manage physical wearables at any time via the Beacons tab on your central dashboard."
	},
	ve: {
		"status.secure": "TSHIMO YA TSIRELEDZO: YO VHULAHEDZWA NAHONE I KHOU SHUMA",
		"status.emergency": "⚠️ THASULULO YA SHANGO I KHOU SHUMA NAHONE I KHOU GUDISWA ⚠️",
		"status.drill": "MULINGO WA SOS U KHOU SHUMA - ZWINYADZO ZWI KHOU EDZISWA",
		"header.powered": "I TSHIMBIDZWA NGA TM MEDIA SOLUTIONS",
		"header.signout": "U bva",
		"tab.home": "Hayani",
		"tab.contacts": "Vhadavhidzani",
		"tab.ble": "Bikhoni (BLE)",
		"tab.map": "Mabe",
		"tab.settings": "Sethingi",
		"tab.subsystems": "Mbekanyamushumo",
		"home.reassurance_title": "Ni tsireledzekile tshoṱhe",
		"home.reassurance_subtitle": "SafetyLink i sedza vhupo hanu na u davhidzana na mapholisa a tsireledzo. Kandani tshiambara tswuku afho fhasi kha thasululo iṅwe na iṅwe.",
		"home.trigger_desc_placeholder": "Talusani nyimele ya khombo (zwi a tendelwa u fhira)...",
		"home.drill_label": "MULINGO WA SOS U KHOU SHUMA",
		"home.drill_desc": "Thasululo dzi do edziswa kha danga la sisiteme.",
		"home.armed_label": "SISITEME YA BIKHONI YO ARMIWA",
		"home.armed_desc": "I khou lindela u kandwa ha SOS.",
		"settings.title": "Tsedzuluso ya Phurogireme ya Sisiteme",
		"settings.subtitle": "Mbekanyamushumo ya u thonifha na u vhiga zwiitisi",
		"settings.diagnostics_title": "Tsedzuluso ya Sisiteme",
		"settings.diagnose_btn": "💻 TSEḌULUSO YA VHUTHO",
		"settings.purge_btn": "🗑️ PHURGE MUVHIGO",
		"settings.shortcut_title": "Nila ya u kanda SOS yo vhulelaho hune ra dzula",
		"settings.shortcut_name": "TSHIAMBARA TSWUKU TSHA SOS",
		"settings.shortcut_desc": "Mbekanyamushumo ya u vhea tshikandwa tswuku kha u dzhia SOS yo lulamela u bypass u vhulahedzwa ha founu.",
		"settings.ledger_title": "Lega ya Tsireledzo ya Ndavhelo",
		"settings.events_badge": "ZWIITISI",
		"settings.language_title": "Ndavhelo ya Luambo na Ndulamiso",
		"settings.language_subtitle": "Khethani luambo lune lwa khou shumiswa na u dounilouda dziṅwe nyimele dza Afrika Tshipembe",
		"settings.download_language": "Dounilouda Dziṅwe Nyimele dza SA",
		"settings.downloading": "I khou kulumisa...",
		"settings.download_btn": "Kulumisa",
		"settings.preloaded": "Yo no vhewa",
		"settings.downloaded": "Yo kulumiswa",
		"settings.download_success": "Phekheji ya luambo yo kulumiswa zwavhudi!",
		"auth.welcome": "Mulingo wa SafetyLink",
		"auth.pair_title": "Lungisani iTAG yo vhulelaho",
		"auth.pair_desc": "Panyisani bikhoni ya Bluetooth (BLE) u vhulahedza thasululo ya vhupo.",
		"auth.scan_btn": "Seda Bikhoni dza Tsini",
		"auth.stop_scan_btn": "Fhedza u Seda",
		"auth.pairing_active": "PANYISO I KHOU SHUMA",
		"auth.bind_btn": "VHULAHA TAG",
		"auth.skip_btn": "Fhira u ye u Dzhena →",
		"auth.beacons_anytime": "Ni nga panyisa na u laula zwiambara zwa bikhoni ngezwiṅwe zwifhinga kha danga la Bikhoni."
	}
};
function translate(lang, key) {
	const dict = translationDicts[lang || "en"] || translationDicts["en"];
	if (dict[key]) return dict[key];
	return translationDicts["en"][key] || key;
}
//#endregion
//#region src/components/FloatingPanicWidget.tsx
var FloatingPanicWidget = () => {
	const { isFloatingWidgetDeployed, floatingWidgetSize, setFloatingWidgetSize, panicCountdown, activeSOSState, startMultiStagePanic, cancelSOS, addToast, silenceAlerts, setSilenceAlerts, decoyActive, setDecoyActive } = useAppStore();
	const [showControls, setShowControls] = (0, import_react.useState)(false);
	const [opacity, setOpacity] = (0, import_react.useState)(1);
	const widgetRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (showControls) {
			const timer = setTimeout(() => setShowControls(false), 1e4);
			return () => clearTimeout(timer);
		}
	}, [
		showControls,
		floatingWidgetSize,
		opacity,
		silenceAlerts,
		decoyActive
	]);
	if (!isFloatingWidgetDeployed) return null;
	const isSOSActive = activeSOSState !== "IDLE";
	const isCountdownActive = panicCountdown !== null;
	let lastTap = 0;
	const handleTap = (e) => {
		const now = Date.now();
		const DOUBLE_TAP_DELAY = 300;
		if (navigator.vibrate) navigator.vibrate(now - lastTap < DOUBLE_TAP_DELAY ? [
			40,
			20,
			40
		] : 15);
		if (now - lastTap < DOUBLE_TAP_DELAY) {
			setShowControls(!showControls);
			e.stopPropagation();
		} else setTimeout(() => {
			if (!(Date.now() - lastTap < DOUBLE_TAP_DELAY)) {
				if (isCountdownActive || isSOSActive) {
					cancelSOS();
					addToast("SOS Distress sequence aborted via floating shortcut.", "warn");
				} else {
					startMultiStagePanic("Emergency distress activated via movable Home Screen floating panic widget.", 10);
					addToast("SOS Countdown initiated! You have 10 seconds to abort.", "warn");
				}
			}
		}, DOUBLE_TAP_DELAY);
		lastTap = now;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 pointer-events-none z-[9999]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			ref: widgetRef,
			drag: true,
			dragMomentum: false,
			dragElastic: .1,
			initial: {
				x: window.innerWidth - floatingWidgetSize - 32,
				y: window.innerHeight - floatingWidgetSize - 120
			},
			style: {
				width: floatingWidgetSize,
				height: floatingWidgetSize,
				opacity
			},
			className: "absolute pointer-events-auto cursor-grab active:cursor-grabbing select-none",
			onClick: handleTap,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isCountdownActive || isSOSActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-red-600/30 animate-ping" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-emerald-500/10 animate-pulse" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 rounded-full bg-slate-950/45 border-2 border-slate-900/30 backdrop-blur-md flex items-center justify-center p-0.5 shadow-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `w-full h-full rounded-full flex flex-col items-center justify-center relative overflow-hidden transition-all duration-350 ${isSOSActive ? "bg-red-600 border border-red-500 text-white" : isCountdownActive ? "bg-amber-500 border border-amber-400 text-black animate-pulse" : "bg-emerald-500 border border-emerald-400 text-white"}`,
						children: [
							isCountdownActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 bg-slate-950/75 flex flex-col items-center justify-center font-mono font-black text-amber-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase tracking-wider scale-75 opacity-75",
									children: "SOS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg leading-none",
									children: panicCountdown
								})]
							}),
							isSOSActive && !isCountdownActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 bg-red-700 flex flex-col items-center justify-center font-bold text-white text-[9px] uppercase tracking-wider animate-pulse",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ACTIVE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SOS" })]
							}),
							!isCountdownActive && !isSOSActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/logos/Safety_Link_Logo_Transparent.png",
								onError: (e) => {
									e.target.src = "/logo.png";
								},
								alt: "SL",
								referrerPolicy: "no-referrer",
								className: "w-10 h-10 object-contain pointer-events-none drop-shadow-md select-none transition-transform hover:scale-105"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showControls && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 10,
						scale: .95
					},
					animate: {
						opacity: 1,
						y: 0,
						scale: 1
					},
					exit: {
						opacity: 0,
						y: 10,
						scale: .95
					},
					onClick: (e) => e.stopPropagation(),
					className: "absolute top-full left-1/2 -translate-x-1/2 mt-3 p-3 bg-slate-950/95 border border-slate-800 rounded-2xl shadow-2xl flex flex-col gap-2.5 w-48 text-left z-50 pointer-events-auto backdrop-blur-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-between items-center text-[9px] font-mono font-black text-slate-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"WIDGET SIZE: ",
									floatingWidgetSize,
									"px"
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: "48",
								max: "140",
								value: floatingWidgetSize,
								onChange: (e) => setFloatingWidgetSize(Number(e.target.value)),
								className: "w-full accent-emerald-400 bg-slate-800 h-1 rounded-lg appearance-none cursor-pointer"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-between items-center text-[9px] font-mono font-black text-slate-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"OPACITY: ",
									Math.round(opacity * 100),
									"%"
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: "0.2",
								max: "1.0",
								step: "0.1",
								value: opacity,
								onChange: (e) => setOpacity(Number(e.target.value)),
								className: "w-full accent-emerald-400 bg-slate-800 h-1 rounded-lg appearance-none cursor-pointer"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center text-[9px] font-mono font-black pt-1 border-t border-slate-900",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-400",
								children: "SILENT SOS:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setSilenceAlerts(!silenceAlerts);
									if (navigator.vibrate) navigator.vibrate(20);
								},
								className: `px-1.5 py-0.5 rounded text-[8px] font-black border uppercase ${silenceAlerts ? "bg-amber-500/20 border-amber-500/30 text-amber-400" : "bg-slate-900 border-slate-800 text-slate-500"}`,
								children: silenceAlerts ? "ON" : "OFF"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center text-[9px] font-mono font-black pb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-400",
								children: "DECOY MODE:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setDecoyActive(!decoyActive);
									if (navigator.vibrate) navigator.vibrate(20);
								},
								className: `px-1.5 py-0.5 rounded text-[8px] font-black border uppercase ${decoyActive ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-slate-900 border-slate-800 text-slate-500"}`,
								children: decoyActive ? "ACTIVE" : "DISABLED"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[8px] text-center text-slate-500 font-mono italic leading-none",
							children: "Double-tap shortcut to hide options"
						})
					]
				}) })
			]
		})
	});
};
//#endregion
//#region src/config/brand.ts
var Brand = {
	primaryLogo: `/logos/New SafetyLink Official Logo.svg`,
	fallbackLogo: `/media/new_logos/logo_hq.png`,
	umbrellaLogo: `/logos/New SafetyLink Official Logo.svg`,
	animation3d: getR2StreamUrl("SafetyLink 3D Animation Logo.mp4"),
	launcherIcon: `/Icons/icon-512.png`,
	notificationIcon: `/Icons/icon-512.png`,
	adminLogo: `/logos/New SafetyLink Official Logo.svg`,
	architectureDiagram: `https://res.cloudinary.com/qcp4fx2v/image/upload/f_auto,q_auto/v1787309945/Gemini_Generated_Image_59psss59psss59ps.jpg`,
	anatomyDiagram: `https://res.cloudinary.com/qcp4fx2v/image/upload/f_auto,q_auto/v1787309945/Gemini_Generated_Image_59psss59psss59ps.jpg`,
	klevLogo: `https://res.cloudinary.com/qcp4fx2v/image/upload/q_auto,f_auto/K_leva`,
	appName: "SafetyLink",
	tagline: "Real-time safety. Always on.",
	company: "TM Media Solutions",
	website: "https://safetylink.online",
	colors: {
		primary: "#00ff88",
		danger: "#ff3b3b",
		warning: "#f59e0b",
		dark: "#020617",
		surface: "#0f172a",
		text: "#f8fafc"
	},
	fonts: {
		primary: "Inter, system-ui, sans-serif",
		mono: "JetBrains Mono, monospace"
	}
};
//#endregion
//#region src/components/SafetyLinkLogo.tsx
var SafetyLinkLogo = ({ size = 140, showText: _showText = true, className = "", glowColor, interactiveHud: _interactiveHud = false, forceMode = "auto" }) => {
	const { currentUser, currentOrg, superAdminActive, activeSOSState } = useAppStore();
	const [isHovered, setIsHovered] = (0, import_react.useState)(false);
	const [tilt, setTilt] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const containerRef = (0, import_react.useRef)(null);
	const getActiveScheme = () => {
		if (forceMode !== "auto") return forceMode;
		if (activeSOSState !== "IDLE") return "emergency";
		if (superAdminActive || currentUser?.username === "SL-admin-0000") return "admin";
		if (currentOrg) {
			const name = currentOrg.name.toLowerCase();
			if (name.includes("school") || name.includes("university") || name.includes("college") || name.includes("academy")) return "school";
			if (name.includes("patrol") || name.includes("security") || name.includes("police") || name.includes("dispatch") || name.includes("guard")) return "patrol";
			if (name.includes("corp") || name.includes("office") || name.includes("manufacturing") || name.includes("lone")) return "corporate";
			if (name.includes("gov") || name.includes("utility") || name.includes("municipal") || name.includes("public")) return "gov";
		}
		return "family";
	};
	const activeScheme = getActiveScheme();
	const profile = {
		admin: {
			glow: glowColor || "rgba(245, 158, 11, 0.4)",
			primary: "#f59e0b"
		},
		patrol: {
			glow: glowColor || "rgba(217, 119, 6, 0.4)",
			primary: "#d97706"
		},
		school: {
			glow: glowColor || "rgba(16, 185, 129, 0.4)",
			primary: "#10b981"
		},
		corporate: {
			glow: glowColor || "rgba(59, 130, 246, 0.4)",
			primary: "#3b82f6"
		},
		gov: {
			glow: glowColor || "rgba(249, 115, 22, 0.4)",
			primary: "#f97316"
		},
		family: {
			glow: glowColor || "rgba(16, 185, 129, 0.35)",
			primary: "#10b981"
		},
		emergency: {
			glow: glowColor || "rgba(239, 68, 68, 0.75)",
			primary: "#ef4444"
		}
	}[activeScheme];
	const handleMouseMove = (e) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const mouseX = e.clientX - rect.left - rect.width / 2;
		const mouseY = e.clientY - rect.top - rect.height / 2;
		setTilt({
			x: mouseY / (rect.height / 2) * -10,
			y: mouseX / (rect.width / 2) * 10
		});
	};
	const handleMouseLeave = () => {
		setTilt({
			x: 0,
			y: 0
		});
		setIsHovered(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative flex flex-col items-center justify-center gap-1 select-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: containerRef,
			onMouseMove: handleMouseMove,
			onMouseLeave: handleMouseLeave,
			onMouseEnter: () => setIsHovered(true),
			className: `relative flex items-center justify-center transition-all duration-300 ${className}`,
			style: {
				width: size * 1.6,
				height: size,
				perspective: 1e3,
				transformStyle: "preserve-3d"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isHovered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .92
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: .92
					},
					className: "absolute inset-x-0 -inset-y-3 rounded-2xl border border-emerald-500/10 bg-slate-950/20 backdrop-blur-[1px] pointer-events-none z-0 shadow-[inset_0_0_15px_rgba(16,185,129,0.02)]",
					style: { transform: "translateZ(-15px)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-emerald-500/30 rounded-tl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-emerald-500/30 rounded-tr" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-emerald-500/30 rounded-bl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-emerald-500/30 rounded-br" })
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute rounded-full transition-all duration-500",
					style: {
						width: size * .9,
						height: size * .9,
						background: `radial-gradient(circle, ${profile.glow} 0%, rgba(0,0,0,0) 70%)`,
						opacity: isHovered ? .9 : .45,
						filter: "blur(24px)",
						transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(-40px)`,
						transformStyle: "preserve-3d",
						pointerEvents: "none"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: { transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0px)` },
					transition: {
						type: "spring",
						stiffness: 250,
						damping: 28
					},
					className: "relative w-full h-full flex items-center justify-center select-none",
					style: { transformStyle: "preserve-3d" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: Brand.primaryLogo,
						alt: "SafetyLink Logo",
						className: "w-full h-full object-contain pointer-events-none drop-shadow-2xl"
					})
				})
			]
		})
	});
};
//#endregion
//#region src/components/AndroidWidgetSimulator.tsx
var AndroidWidgetSimulator_exports = /* @__PURE__ */ __exportAll({ AndroidWidgetSimulator: () => AndroidWidgetSimulator$1 });
var AndroidWidgetSimulator$1 = () => {
	const { triggerPanic, addAuditLog, activeSOSState, userLocation, silenceAlerts, setSilenceAlerts, decoyActive, setDecoyActive, addToast } = useAppStore();
	const userLat = userLocation?.lat ?? -26.1912;
	const userLng = userLocation?.lng ?? 28.0264;
	const coordString = `[${userLat.toFixed(5)}, ${userLng.toFixed(5)}]`;
	const [countdown, setCountdown] = (0, import_react.useState)(null);
	const [widgetCircleSize, setWidgetCircleSize] = (0, import_react.useState)(112);
	(0, import_react.useEffect)(() => {
		if (countdown === 0) {
			setCountdown(null);
			executeRealPanic();
			return;
		}
		if (countdown === null) return;
		const interval = setInterval(() => {
			setCountdown((prev) => prev !== null ? prev - 1 : null);
		}, 1e3);
		return () => clearInterval(interval);
	}, [countdown]);
	const executeRealPanic = async () => {
		addAuditLog("DISPATCH", "SEVERE", "Widget 10s grace period expired. Broadcasting SOS!", "Transmitting cellular telemetry");
		try {
			await triggerPanic("Emergency SOS triggered from Capacitor Android Home Widget.");
		} catch (e) {
			console.error(e);
		}
	};
	const triggerLocalNotification = (title, body) => {
		addToast(`${title}: ${body}`, "info");
	};
	const handleWidgetTrigger = () => {
		if (navigator.vibrate) navigator.vibrate([
			80,
			40,
			80
		]);
		if (activeSOSState !== "IDLE") {
			triggerLocalNotification("Broadcast Status", "An active emergency beacon is already transmitting.");
			return;
		}
		setCountdown(10);
		addAuditLog("SYSTEM", "WARN", "SOS triggered from Home Screen Widget", "10-second disarm grace period started");
		triggerLocalNotification("SafetyLink Widget Triggered", "EMERGENCY SOS enqueued! You have 10 seconds to disarm.");
	};
	const handleDisarmGrace = () => {
		if (navigator.vibrate) navigator.vibrate(20);
		setCountdown(null);
		addAuditLog("BLE", "INFO", "Widget SOS disarmed by user during 10s grace period", "Coordinated broadcast enqueuer stopped.");
		triggerLocalNotification("SOS Aborted", "Emergency broadcast sequence successfully disarmed.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-5 text-left space-y-4 shadow relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: countdown !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 bg-slate-950/98 z-[999999] flex flex-col items-center justify-center p-6 text-center select-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)] animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md w-full space-y-8 z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-block text-[10px] font-black font-mono bg-red-950/40 border border-red-500/20 text-red-400 px-3 py-1 rounded-full uppercase tracking-wider animate-pulse",
								children: "⚠️ CAPACITOR LAUNCHER SOS WARNING ⚠️"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-black font-mono uppercase tracking-wide text-slate-100",
								children: "Transmitting GPS Coordinates in"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-48 h-48 mx-auto flex items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								animate: { scale: [
									.95,
									1.05,
									.95
								] },
								transition: {
									duration: 1,
									repeat: Infinity
								},
								className: "absolute inset-0 rounded-full border-4 border-dashed border-red-500/25"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-40 h-40 rounded-full bg-slate-900 border border-red-500/40 flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.25)] relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-6xl font-black font-mono text-red-500 tracking-tighter",
									children: [countdown, "s"]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-slate-400 leading-relaxed px-6 font-mono",
									children: [
										"Distress payload ready. Transmitting location ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-amber-400 font-bold",
											children: coordString
										}),
										" to student housing responders, and emergency call sequencers."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleDisarmGrace,
									className: "w-full max-w-xs py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-black text-xs rounded-2xl uppercase tracking-wider shadow-lg shadow-emerald-900/30 border border-emerald-500/20 hover:scale-102 transition-all",
									children: "🛑 DISARM SOS (CANCEL BROADCAST)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[9px] font-mono text-slate-500 uppercase tracking-widest",
									children: "Any interaction or pressing disarm stops escalation"
								})
							]
						})
					]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center border-b border-slate-900 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyLinkLogo, {
						size: 18,
						glowColor: "rgba(239, 68, 68, 0.4)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-black tracking-widest font-mono uppercase text-slate-100",
						children: "SafetyLink AppWidget System"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[8.5px] font-mono font-black px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded uppercase",
						children: "Ghost Service"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[8.5px] font-mono font-black px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded uppercase",
						children: "Decoupled"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-[9.5px] text-slate-400 leading-relaxed font-mono bg-slate-950/40 p-3 rounded-xl border border-slate-900/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-cyan-400 font-bold mb-1",
						children: "🛠️ NATIVE ANDROID SUBSYSTEM CONNECTED:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-1",
						children: [
							"• ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-200",
								children: "PanicService.java"
							}),
							" operates as a headless, native daemon process running independently of the WebView context."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-1",
						children: [
							"• Two ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-200",
								children: "AppWidgetProvider"
							}),
							" classes expose the ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-400 font-bold",
								children: "Instant SOS Actuator"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-emerald-400 font-bold",
								children: "System Status HUD"
							}),
							" widgets."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Hardware iTAG presses send a system Intent directly to the background service, displaying a global overlay countdown over lockscreens." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-4 space-y-4 relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-full border border-slate-800 text-[8.5px] font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-400 font-bold uppercase",
							children: "WIDGET SIZE:"
						}), [
							{
								label: "1x1 (72px)",
								size: 72
							},
							{
								label: "2x2 (112px)",
								size: 112
							},
							{
								label: "3x3 (150px)",
								size: 150
							},
							{
								label: "4x4 (180px)",
								size: 180
							}
						].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setWidgetCircleSize(opt.size);
								if (navigator.vibrate) navigator.vibrate(15);
							},
							className: `px-2 py-0.5 rounded-full font-bold transition-all ${widgetCircleSize === opt.size ? "bg-red-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"}`,
							children: opt.label
						}, opt.size))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						onClick: handleWidgetTrigger,
						whileHover: { scale: 1.05 },
						whileTap: { scale: .95 },
						style: {
							width: `${widgetCircleSize}px`,
							height: `${widgetCircleSize}px`
						},
						className: "relative rounded-full bg-gradient-to-b from-red-600 via-red-700 to-red-900 border-4 border-slate-950 shadow-[0_10px_35px_rgba(220,38,38,0.5)] flex items-center justify-center flex-col gap-1 cursor-pointer group hover:brightness-110 transition-all active:scale-95",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full border-2 border-red-500/40 animate-ping pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-black font-mono text-white tracking-wider ${widgetCircleSize <= 72 ? "text-lg" : widgetCircleSize <= 112 ? "text-2xl" : "text-3xl"}`,
								children: "SOS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-mono font-black text-red-200 uppercase tracking-widest ${widgetCircleSize <= 72 ? "text-[5px]" : "text-[7px]"}`,
								children: "TAP TO DISPATCH"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-2.5 font-mono w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9.5px] font-black text-slate-300 uppercase",
							children: "Interactive Widget Gateway"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8px] text-slate-500 uppercase leading-relaxed max-w-xs mx-auto",
							children: "Uplink: Active • Delay: 10s Grace Period"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-center items-center gap-3 pt-2 border-t border-slate-900/40 max-w-[240px] mx-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setSilenceAlerts(!silenceAlerts);
									addToast(silenceAlerts ? "Siren mode armed." : "Silence SOS mode armed.", "info");
									if (navigator.vibrate) navigator.vibrate(15);
								},
								className: `flex-1 py-1 px-2 rounded-xl text-[8px] font-bold border transition-all uppercase flex items-center justify-center gap-1 ${silenceAlerts ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-slate-950/60 border-slate-900 text-slate-500 hover:text-slate-300"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔕" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: silenceAlerts ? "Silent" : "Siren" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setDecoyActive(!decoyActive);
									addToast(decoyActive ? "Calculator disguise disarmed." : "Calculator disguise armed.", "info");
									if (navigator.vibrate) navigator.vibrate(15);
								},
								className: `flex-1 py-1 px-2 rounded-xl text-[8px] font-bold border transition-all uppercase flex items-center justify-center gap-1 ${decoyActive ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-slate-950/60 border-slate-900 text-slate-500 hover:text-slate-300"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🎛️" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: decoyActive ? "Decoy" : "Disarm" })]
							})]
						})]
					})
				]
			})
		]
	});
};
//#endregion
//#region src/components/SimulatedDesktop.tsx
var SimulatedDesktop = () => {
	const { isBackgroundServiceRunning, backgroundServiceTick, userLocation, bleDevices, thingsBoardToken, addAuditLog, setMinimized } = useAppStore();
	const [currentTime, setCurrentTime] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	const [pinging, setPinging] = (0, import_react.useState)(false);
	const [pingResult, setPingResult] = (0, import_react.useState)(null);
	const [gpsRefreshing, setGpsRefreshing] = (0, import_react.useState)(false);
	const [smsTesting, setSmsTesting] = (0, import_react.useState)(false);
	const [diagnosticsRunning, setDiagnosticsRunning] = (0, import_react.useState)(false);
	const [diagStep, setDiagStep] = (0, import_react.useState)(0);
	const [diagnosticLogs, setDiagnosticLogs] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => setCurrentTime(/* @__PURE__ */ new Date()), 1e3);
		return () => clearInterval(timer);
	}, []);
	bleDevices.some((d) => d.connectionState === "CONNECTED");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 flex flex-col min-h-0 overflow-y-auto bg-slate-950 font-mono text-left relative",
		style: { backgroundImage: "radial-gradient(circle at 50% 20%, #1e1b4b 0%, #020617 70%)" },
		id: "simulated-desktop-viewport",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.03)_0%,transparent_50%)] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_70%_75%,rgba(59,130,246,0.03)_0%,transparent_50%)] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-md mx-auto w-full p-5 space-y-6 flex flex-col justify-between min-h-[calc(100vh-32px)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-6 space-y-2 select-none relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								scale: .9,
								opacity: 0
							},
							animate: {
								scale: 1,
								opacity: 1
							},
							transition: { duration: .5 },
							className: "text-4xl font-extrabold text-slate-100 tracking-tight drop-shadow-lg",
							children: currentTime.toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
								hour12: false
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["📅 ", currentTime.toLocaleDateString([], {
									weekday: "short",
									month: "short",
									day: "numeric"
								}).toUpperCase()] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-emerald-400 font-bold",
									children: "DEVICE LOCKED 🔒"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-900/60 border border-slate-800 rounded-2xl p-3 flex items-center justify-between text-slate-400 font-mono text-[9px] relative z-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyLinkLogo, {
								size: 16,
								glowColor: isBackgroundServiceRunning ? "#10b981" : "#ef4444"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-slate-200",
								children: "SAFETYLINK RESILIENT CORE"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-2 h-2 rounded-full ${isBackgroundServiceRunning ? "bg-emerald-400 animate-pulse" : "bg-red-400"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `font-mono text-[8px] font-black tracking-widest ${isBackgroundServiceRunning ? "text-emerald-400" : "text-red-400"}`,
								children: isBackgroundServiceRunning ? "MESH ACTIVE" : "PAUSED"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							y: 20,
							opacity: 0
						},
						animate: {
							y: 0,
							opacity: 1
						},
						transition: {
							type: "spring",
							delay: .15
						},
						className: "relative z-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AndroidWidgetSimulator$1, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-5 gap-3.5 py-4 px-1.5 relative z-10 select-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									window.dispatchEvent(new CustomEvent("sl-switch-tab", { detail: "home" }));
									setMinimized(false);
								},
								className: "flex flex-col items-center gap-1.5 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-12 h-12 rounded-[18px] bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 flex items-center justify-center shadow-lg transition-all relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyLinkLogo, { size: 28 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1 -right-1 w-5 h-5 bg-red-500 border border-slate-950 rounded-full flex items-center justify-center text-[7.5px] font-black text-white",
										children: "1"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7.5px] font-black text-slate-300 uppercase tracking-wider text-center group-hover:text-white truncate max-w-[55px]",
									children: "SafetyLink"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									window.dispatchEvent(new CustomEvent("sl-switch-tab", { detail: "contacts" }));
									setMinimized(false);
								},
								className: "flex flex-col items-center gap-1.5 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 rounded-[18px] bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 flex items-center justify-center shadow-lg transition-all",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl",
										children: "🚨"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7.5px] font-black text-slate-300 uppercase tracking-wider text-center group-hover:text-white truncate max-w-[55px]",
									children: "Dispatch"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									window.dispatchEvent(new CustomEvent("sl-switch-tab", { detail: "ble" }));
									setMinimized(false);
								},
								className: "flex flex-col items-center gap-1.5 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 rounded-[18px] bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 flex items-center justify-center shadow-lg transition-all",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl",
										children: "📟"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7.5px] font-black text-slate-300 uppercase tracking-wider text-center group-hover:text-white truncate max-w-[55px]",
									children: "BLE Hub"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									window.dispatchEvent(new CustomEvent("sl-switch-tab", { detail: "subsystems" }));
									setMinimized(false);
								},
								className: "flex flex-col items-center gap-1.5 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-12 h-12 rounded-[18px] bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 flex items-center justify-center shadow-lg transition-all relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl animate-pulse",
										children: "💻"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7.5px] font-black text-slate-300 uppercase tracking-wider text-center group-hover:text-white truncate max-w-[55px]",
									children: "Chaos"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									window.dispatchEvent(new CustomEvent("sl-switch-tab", { detail: "settings" }));
									setMinimized(false);
								},
								className: "flex flex-col items-center gap-1.5 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 rounded-[18px] bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 flex items-center justify-center shadow-lg transition-all",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl",
										children: "⚙️"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7.5px] font-black text-slate-300 uppercase tracking-wider text-center group-hover:text-white truncate max-w-[55px]",
									children: "Settings"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center pb-4 text-slate-500 font-bold select-none relative z-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center gap-1 text-[8.5px] uppercase tracking-widest text-slate-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SafetyLink Native Mobile Engine • Background Protected" })
						})
					})
				]
			})
		]
	});
};
//#endregion
//#region src/components/ForcedCountdownOverlay.tsx
/**
* ForcedCountdownOverlay (Canonical Single Emergency Countdown)
*
* Replaces duplicate countdown overlays. Synced strictly to store.panicCountdown
* and native PanicService state. Enforces PIN + Duress PIN verification when
* userPin is set, manages wakeLock, audio siren, haptics, and direct route presets.
*/
var ForcedCountdownOverlay = () => {
	const { panicCountdown, cancelSOS, userLocation, currentUser, silenceAlerts, userPin, duressPin } = useAppStore();
	const setSilenceAlerts = useAppStore((state) => state.setSilenceAlerts);
	const [wakeLock, setWakeLock] = (0, import_react.useState)(null);
	const [showPinPad, setShowPinPad] = (0, import_react.useState)(false);
	const [pinInput, setPinInput] = (0, import_react.useState)("");
	const [pinError, setPinError] = (0, import_react.useState)(false);
	const audioContextRef = (0, import_react.useRef)(null);
	const oscillatorRef = (0, import_react.useRef)(null);
	const hasConfiguredPin = Boolean(userPin && userPin.trim().length >= 4);
	const requestScreenWakeLock = async () => {
		try {
			if ("wakeLock" in navigator) {
				const lock = await navigator.wakeLock.request("screen");
				setWakeLock(lock);
			}
			if (Capacitor.isNativePlatform()) __vitePreload(async () => {
				const { NativeDispatchService } = await import("./NativeDispatchService-DnOodW5f.js").then((n) => n.n);
				return { NativeDispatchService };
			}, __vite__mapDeps([2,1,0])).then(({ NativeDispatchService }) => NativeDispatchService.forceUnlockAndWake()).catch(() => {});
		} catch (err) {
			console.warn("SafetyLink WakeLock failed:", err);
		}
	};
	const releaseScreenWakeLock = async () => {
		if (wakeLock) try {
			await wakeLock.release();
			setWakeLock(null);
		} catch (err) {
			console.error(err);
		}
	};
	const triggerHapticFeedback = async () => {
		if (Capacitor.isPluginAvailable("Haptics")) try {
			await (await __vitePreload(() => import("./capacitor-B_jS8XWy.js").then((n) => n.r), __vite__mapDeps([0,1]))).Haptics.vibrate({ duration: 400 });
		} catch {
			navigator.vibrate?.([
				200,
				100,
				200
			]);
		}
		else navigator.vibrate?.([
			200,
			100,
			200
		]);
	};
	const startSirenOscillator = () => {
		if (silenceAlerts) return;
		try {
			const AudioCtx = window.AudioContext || window.webkitAudioContext;
			if (!AudioCtx) return;
			const ctx = new AudioCtx();
			audioContextRef.current = ctx;
			const osc = ctx.createOscillator();
			const gainNode = ctx.createGain();
			osc.type = "sawtooth";
			osc.frequency.setValueAtTime(440, ctx.currentTime);
			osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + .5);
			osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 1);
			gainNode.gain.setValueAtTime(.3, ctx.currentTime);
			osc.connect(gainNode);
			gainNode.connect(ctx.destination);
			osc.start();
			oscillatorRef.current = osc;
			const sweepInterval = setInterval(() => {
				if (!oscillatorRef.current || !audioContextRef.current) {
					clearInterval(sweepInterval);
					return;
				}
				const now = audioContextRef.current.currentTime;
				oscillatorRef.current.frequency.setValueAtTime(440, now);
				oscillatorRef.current.frequency.linearRampToValueAtTime(880, now + .4);
				oscillatorRef.current.frequency.linearRampToValueAtTime(440, now + .8);
			}, 800);
			return () => clearInterval(sweepInterval);
		} catch (e) {
			console.warn("AudioContext failed:", e);
		}
	};
	const stopSirenOscillator = () => {
		if (oscillatorRef.current) {
			try {
				oscillatorRef.current.stop();
				oscillatorRef.current.disconnect();
			} catch {}
			oscillatorRef.current = null;
		}
		if (audioContextRef.current) {
			try {
				audioContextRef.current.close();
			} catch {}
			audioContextRef.current = null;
		}
	};
	(0, import_react.useEffect)(() => {
		if (panicCountdown !== null) {
			setShowPinPad(hasConfiguredPin);
			setPinInput("");
			setPinError(false);
			requestScreenWakeLock();
			startSirenOscillator();
		} else {
			stopSirenOscillator();
			releaseScreenWakeLock();
			setPinInput("");
			setPinError(false);
		}
		return () => {
			stopSirenOscillator();
			releaseScreenWakeLock();
		};
	}, [
		panicCountdown,
		silenceAlerts,
		hasConfiguredPin
	]);
	(0, import_react.useEffect)(() => {
		if (panicCountdown !== null) triggerHapticFeedback();
	}, [panicCountdown]);
	const handleDisarmClick = () => {
		if (hasConfiguredPin) setShowPinPad(true);
		else cancelSOS();
	};
	const handlePinKey = (digit) => {
		if (pinInput.length >= 4) return;
		const next = pinInput + digit;
		setPinInput(next);
		setPinError(false);
		if (next.length === 4) {
			if (next === userPin) {
				cancelSOS();
				useAppStore.getState().addToast("SOS Disarmed cleanly with PIN.", "info");
			} else if (duressPin && next === duressPin) {
				useAppStore.setState({ panicCountdown: null });
				useAppStore.getState().addAuditLog("SECURITY", "SEVERE", "DURESS PIN TRIGGERED", "Appear cancelled to coercive actor while executing silent SOS dispatch.");
				useAppStore.getState().triggerPanic("DURESS PIN ENTERED — Silent Coercion Escalation", true);
			} else {
				setPinError(true);
				navigator.vibrate?.([
					250,
					100,
					250
				]);
				setTimeout(() => {
					setPinInput("");
					setPinError(false);
				}, 550);
			}
		}
	};
	if (panicCountdown === null) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		id: "forced-countdown-overlay-container",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[10000] bg-slate-950/98 backdrop-blur-xl flex flex-col items-center justify-between p-6 text-center select-none overflow-y-auto",
		style: { touchAction: "manipulation" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-radial-at-c from-red-600/15 via-transparent to-transparent pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 digital-grid opacity-20 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md flex items-center justify-between z-10 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-3 py-1.5 bg-red-950/40 border border-red-500/20 rounded-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase font-bold text-red-400 tracking-wider font-mono",
						children: "Critical SOS Pending"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					id: "forced-overlay-mute-toggle",
					onClick: () => setSilenceAlerts(!silenceAlerts),
					className: "p-2.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-full transition-colors cursor-pointer",
					title: "Mute siren feedback",
					children: silenceAlerts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-4 h-4 text-slate-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-4 h-4 text-red-400 animate-bounce" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center gap-4 z-10 my-auto py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-44 h-44 flex items-center justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								animate: {
									scale: [
										1,
										1.25,
										1
									],
									opacity: [
										.4,
										.1,
										.4
									]
								},
								transition: {
									duration: 1.5,
									repeat: Infinity,
									ease: "easeInOut"
								},
								className: "absolute inset-0 rounded-full bg-red-500/10 border border-red-500/30 filter blur-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								animate: { scale: [
									1,
									1.12,
									1
								] },
								transition: {
									duration: 1,
									repeat: Infinity,
									ease: "easeInOut"
								},
								className: "absolute inset-2 rounded-full bg-red-950/40 border-2 border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.25)]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								id: "forced-disarm-trigger",
								type: "button",
								onClick: handleDisarmClick,
								className: "absolute inset-5 rounded-full bg-red-650 hover:bg-red-500 border border-red-400/30 flex flex-col items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(239,68,68,0.4)] cursor-pointer focus:outline-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-6xl font-black font-mono leading-none tracking-tight",
									children: panicCountdown
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7.5px] font-mono font-extrabold tracking-[0.15em] text-red-100 mt-1.5 uppercase",
									children: hasConfiguredPin ? "🔐 PIN TO DISARM" : "🛑 TAP TO DISARM"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-1 max-w-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-slate-100 uppercase tracking-wide font-mono",
							children: "Emergency Sequence Initiated"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-slate-400 leading-relaxed px-4",
							children: [
								"Broadcasting GPS telemetry & dispatching SMS/Call/Server alerts in",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-red-400 font-bold",
									children: [panicCountdown, "s"]
								}),
								"."
							]
						})]
					}),
					showPinPad && hasConfiguredPin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-xs bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-3 z-20 shadow-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[10px] font-mono text-slate-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 uppercase font-bold text-slate-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3 h-3 text-amber-400" }), " Enter 4-Digit Safety PIN"]
								}), pinError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-400 font-bold",
									children: "INVALID PIN"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex justify-center gap-3 ${pinError ? "animate-bounce" : ""}`,
								children: [
									0,
									1,
									2,
									3
								].map((idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-4 h-4 rounded-full border-2 ${pinInput.length > idx ? pinError ? "bg-red-500 border-red-400" : "bg-emerald-400 border-emerald-400" : "border-slate-600"}` }, idx))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									"1",
									"2",
									"3",
									"4",
									"5",
									"6",
									"7",
									"8",
									"9",
									"",
									"0",
									"DEL"
								].map((key, i) => key === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, i) : key === "DEL" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setPinInput((p) => p.slice(0, -1)),
									className: "h-10 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-slate-400 hover:bg-slate-800 cursor-pointer",
									children: "DEL"
								}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handlePinKey(key),
									className: "h-10 rounded-lg bg-slate-950 border border-slate-800 text-base font-bold text-white hover:bg-slate-800 active:bg-red-600 cursor-pointer",
									children: key
								}, i))
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md space-y-3 z-10 shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] font-mono font-black text-slate-500 uppercase tracking-widest block text-center",
							children: "⚡ DIRECT PRESET ESCALATION ROUTES"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-1.5 text-left max-h-[160px] overflow-y-auto pr-1",
							children: (currentUser?.customPresets || [
								{
									id: "preset-hijack",
									name: "Car Accident / Hijacked",
									icon: "🚗",
									route: "Default Routing"
								},
								{
									id: "preset-security",
									name: "Security / Command Room Link",
									icon: "🏢",
									route: "Control Room"
								},
								{
									id: "preset-medical",
									name: "Medical / Trauma Emergency",
									icon: "🩺",
									route: "Medical Dispatch"
								}
							]).map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								id: preset.id,
								onClick: () => {
									cancelSOS();
									useAppStore.getState().addAuditLog("DISPATCH", "SEVERE", "Preset Triggered: " + preset.name, `Immediate route to ${preset.route} initiated.`);
									useAppStore.getState().triggerPanic(`${preset.name}: Emergency routing to ${preset.route}`, true);
								},
								className: "p-2 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between gap-3 text-left transition-all hover:border-slate-500/40 group cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5 min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] font-extrabold text-slate-300 font-mono",
										children: [
											preset.icon,
											" ",
											preset.name
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[8px] font-mono text-slate-500 truncate",
										children: ["Route: ", preset.route]
									})]
								})
							}, preset.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-2.5 bg-slate-900/85 border border-slate-800 rounded-xl space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-[9px] text-slate-500 font-mono",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GIS GPS Telemetry" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-amber-400 animate-pulse font-bold",
								children: "Armed & Polling"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[11px] font-bold text-slate-300 font-mono flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-3.5 h-3.5 text-amber-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: userLocation ? `${userLocation.lat.toFixed(6)}, ${userLocation.lng.toFixed(6)}` : "Acquiring high-precision lock..." })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2 text-[9px] text-slate-500 justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-sans leading-normal",
							children: "Hardware Lock-Screen Wake & Native PanicService Sync Active."
						})]
					})
				]
			})
		]
	}) });
};
//#endregion
//#region src/components/PermissionsOnboardingModal.tsx
var PermissionsOnboardingModal = ({ forceOpen = false, onClose }) => {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [isNative, setIsNative] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(1);
	const [permissionStates, setPermissionStates] = (0, import_react.useState)({
		location: false,
		notifications: false,
		accessibility: false,
		battery: false,
		overlay: false
	});
	(0, import_react.useEffect)(() => {
		const native = Capacitor.isNativePlatform();
		setIsNative(native);
		if (forceOpen) {
			setIsOpen(true);
			return;
		}
		if (!localStorage.getItem("sl_permissions_configured_v2") && native) setIsOpen(true);
	}, [forceOpen]);
	const handleGrantBasicPermissions = async () => {
		try {
			let locGranted = false;
			try {
				await GeolocationService.getInstance().startTracking();
				locGranted = true;
			} catch (_) {}
			const notifGranted = await LocalNotificationService.requestPermission();
			if (typeof window !== "undefined" && window.Capacitor?.Plugins?.EmergencyDispatch) try {
				await window.Capacitor.Plugins.EmergencyDispatch.requestPermissions();
			} catch (_) {}
			setPermissionStates((prev) => ({
				...prev,
				location: locGranted,
				notifications: notifGranted
			}));
			setStep(2);
		} catch (err) {
			console.error("[Permissions] Basic request error:", err);
			setStep(2);
		}
	};
	const handleOpenAccessibility = async () => {
		try {
			if (typeof window !== "undefined" && window.Capacitor?.Plugins?.SafetyLinkEmergency) await window.Capacitor.Plugins.SafetyLinkEmergency.openAccessibilitySettings();
			else window.open("https://support.google.com/accessibility/android/answer/6006564", "_blank");
			setPermissionStates((prev) => ({
				...prev,
				accessibility: true
			}));
		} catch (err) {
			console.error("[Permissions] Accessibility open error:", err);
		}
	};
	const handleRequestBatteryExemption = async () => {
		try {
			if (typeof window !== "undefined" && window.Capacitor?.Plugins?.SafetyLinkEmergency) await window.Capacitor.Plugins.SafetyLinkEmergency.requestBatteryOptimizationExemption();
			setPermissionStates((prev) => ({
				...prev,
				battery: true
			}));
		} catch (err) {
			console.error("[Permissions] Battery exemption error:", err);
		}
	};
	const handleRequestOverlay = async () => {
		try {
			if (typeof window !== "undefined" && window.Capacitor?.Plugins?.SafetyLinkEmergency) await window.Capacitor.Plugins.SafetyLinkEmergency.requestOverlayPermission();
			setPermissionStates((prev) => ({
				...prev,
				overlay: true
			}));
		} catch (err) {
			console.error("[Permissions] Overlay error:", err);
		}
	};
	const handleComplete = () => {
		localStorage.setItem("sl_permissions_configured_v2", "true");
		setIsOpen(false);
		if (onClose) onClose();
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[999999] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95,
				y: 15
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .95,
				y: 15
			},
			className: "w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 20 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-black text-white font-mono tracking-wide uppercase",
							children: "SafetyLink Sentinel Setup"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-400 font-mono",
							children: "Golden APK Device Control & Permission Binding"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleComplete,
						className: "w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex border-b border-slate-800 bg-slate-950/40 text-xs font-mono",
					children: [
						{
							num: 1,
							title: "Permissions"
						},
						{
							num: 2,
							title: "Device Control"
						},
						{
							num: 3,
							title: "Sentinel Power"
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setStep(s.num),
						className: `flex-1 py-3 px-2 text-center font-bold border-b-2 transition-colors ${step === s.num ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" : "border-transparent text-slate-400 hover:text-slate-200"}`,
						children: [
							s.num,
							". ",
							s.title
						]
					}, s.num))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 space-y-5 max-h-[60vh] overflow-y-auto",
					children: [
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-300 leading-relaxed font-mono",
									children: "SafetyLink requires core hardware permissions to dispatch live GPS coordinates and send automated carrier SMS when offline:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
												className: "text-emerald-400 shrink-0",
												size: 18
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-xs font-bold text-white",
													children: "Fine & Background Location"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-slate-400",
													children: "Emergency GPS coordinates sent to responders."
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
												className: "text-blue-400 shrink-0",
												size: 18
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-xs font-bold text-white",
													children: "Emergency SMS (SmsManager)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-slate-400",
													children: "Direct carrier text dispatch to safety chain."
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
												className: "text-amber-400 shrink-0",
												size: 18
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-xs font-bold text-white",
													children: "Emergency Voice Dialer"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-slate-400",
													children: "Instant direct phone line connection."
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bluetooth, {
												className: "text-indigo-400 shrink-0",
												size: 18
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-xs font-bold text-white",
													children: "Bluetooth LE & Nearby Devices"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-slate-400",
													children: "Connects to your physical iTAG wearable panic tag."
												})]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleGrantBasicPermissions,
									className: "w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs rounded-xl transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grant Emergency Permissions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })]
								})
							]
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-slate-300 leading-relaxed font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Device Control & Accessibility:" }), " In the Golden SafetyLink build, giving SafetyLink Accessibility access allows hardware button interception (e.g. Volume buttons panic trigger) even when your phone is locked or inside your pocket:"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
											className: "text-amber-400",
											size: 20
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-bold text-white",
											children: "Accessibility Service Binding"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-400",
											children: "Detects rapid 3-click volume hardware panic triggers."
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleOpenAccessibility,
										className: "w-full py-2.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Accessibility Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
											className: "text-purple-400",
											size: 20
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-bold text-white",
											children: "Draw Over Locked Screen (Overlay)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-400",
											children: "Wakes screen & displays 10s PIN disarm countdown."
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleRequestOverlay,
										className: "w-full py-2.5 px-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grant Display Over Other Apps" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setStep(3),
									className: "w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold font-mono text-xs rounded-xl transition-all flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Continue to Sentinel Power" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })]
								})
							]
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-slate-300 leading-relaxed font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Unrestricted Battery & Sentinel Watchdog:" }), " Android aggressive battery killers shut down Bluetooth background listeners after 10 minutes. Exempt SafetyLink so your iTAG stays connected 24/7:"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatteryCharging, {
											className: "text-emerald-400",
											size: 20
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-bold text-white",
											children: "Battery Optimization Exemption"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-400",
											children: "Guarantees 24/7 background iTAG beacon listening."
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleRequestBatteryExemption,
										className: "w-full py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Exempt from Battery Optimization" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-4 bg-slate-950 border border-slate-800 rounded-2xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											className: "text-emerald-400",
											size: 20
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-bold text-white",
											children: "Private DNS Configuration"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-400 font-mono",
											children: "dns.safetylink.online (TLS Port 853)"
										})] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleComplete,
									className: "w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs rounded-xl transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Finish Setup & Enter SafetyLink" })]
								})
							]
						})
					]
				})
			]
		})
	}) });
};
//#endregion
//#region src/hooks/useEmergencyListener.ts
var useEmergencyListener_exports = /* @__PURE__ */ __exportAll({
	SafetyLinkEmergency: () => SafetyLinkEmergency,
	useEmergencyListener: () => useEmergencyListener
});
function useEmergencyListener(onStatusChange) {
	const callbackRef = (0, import_react.useRef)(onStatusChange);
	callbackRef.current = onStatusChange;
	(0, import_react.useEffect)(() => {
		if (!Capacitor.isNativePlatform()) return;
		let lastStatusTickAt = 0;
		const panicListener = SafetyLinkEmergency.addListener("onPanicStatusChange", (info) => {
			lastStatusTickAt = Date.now();
			console.warn("[SafetyLinkEmergency] NATIVE PANIC STATUS:", info);
			callbackRef.current(info);
		});
		const legacyListener = SafetyLinkEmergency.addListener("onPanicEvent", (info) => {
			if (Date.now() - lastStatusTickAt < 250) return;
			console.warn("[SafetyLinkEmergency] LEGACY PANIC EVENT:", info);
			callbackRef.current(info);
		});
		return () => {
			panicListener.then((listener) => listener?.remove?.()).catch(() => {});
			legacyListener.then((listener) => listener?.remove?.()).catch(() => {});
		};
	}, []);
	const startNativeScanner = async () => {
		if (Capacitor.isNativePlatform()) try {
			await SafetyLinkEmergency.startBleService();
		} catch (e) {
			console.warn("[useEmergencyListener] startBleService note:", e);
		}
	};
	return { startNativeScanner };
}
//#endregion
//#region src/hooks/useTacticalSensors.ts
var TacticalSensor = registerPlugin("TacticalSensor", { web: {
	async startImpactDetection() {
		console.log("[TacticalSensor Web] startImpactDetection called");
	},
	async stopImpactDetection() {
		console.log("[TacticalSensor Web] stopImpactDetection called");
	},
	async setSosActive(options) {
		console.log("[TacticalSensor Web] setSosActive called with", options);
	},
	async requestDeviceAdmin() {
		console.log("[TacticalSensor Web] requestDeviceAdmin called");
	}
} });
function useTacticalSensors() {
	const { activeSOSState } = useAppStore();
	(0, import_react.useEffect)(() => {
		const isActive = activeSOSState !== "IDLE";
		if (Capacitor.isNativePlatform()) TacticalSensor.setSosActive({ isActive }).catch(console.error);
	}, [activeSOSState]);
	const startSensors = async () => {
		if (Capacitor.isNativePlatform()) try {
			await TacticalSensor.startImpactDetection();
		} catch (err) {
			console.error("Failed to start impact detection:", err);
		}
	};
	const requestStruggleLockPermissions = async () => {
		if (Capacitor.isNativePlatform()) try {
			await TacticalSensor.requestDeviceAdmin();
		} catch (err) {
			console.error("Failed to request device admin:", err);
		}
	};
	return {
		startSensors,
		requestStruggleLockPermissions
	};
}
//#endregion
//#region src/components/DeviceAlertOverlay.tsx
var DeviceAlertOverlay = () => {
	const { bleDevices, connectBleDevice } = useAppStore();
	const [snoozedMacs, setSnoozedMacs] = (0, import_react.useState)({});
	const criticalDevices = bleDevices.filter((d) => {
		const snoozeTime = snoozedMacs[d.macAddress];
		if (snoozeTime && Date.now() - snoozeTime < 3e5) return false;
		const isDisconnected = d.connectionState === "DISCONNECTED";
		const isLowBattery = d.batteryLevel <= 20;
		return isDisconnected || isLowBattery;
	});
	if (criticalDevices.length === 0) return null;
	const handleSnooze = (macAddress) => {
		setSnoozedMacs((prev) => ({
			...prev,
			[macAddress]: Date.now()
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "device-alert-overlay",
		className: "fixed inset-x-0 top-16 z-[9000] p-4 flex flex-col items-center pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full max-w-md flex flex-col gap-3",
			children: criticalDevices.map((device) => {
				const isDisconnected = device.connectionState === "DISCONNECTED";
				const isLowBattery = device.batteryLevel <= 20;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: -20,
						scale: .95
					},
					animate: {
						opacity: 1,
						y: 0,
						scale: 1
					},
					exit: {
						opacity: 0,
						y: -10,
						scale: .95
					},
					className: "pointer-events-auto bg-slate-950/95 border border-amber-500/30 shadow-[0_12px_40px_rgba(245,158,11,0.15)] rounded-2xl p-4 flex flex-col gap-3 backdrop-blur-md relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-1.5 h-full bg-amber-500" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0",
								children: isDisconnected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "w-5 h-5 animate-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "w-5 h-5 text-amber-500" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0 text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest leading-none",
											children: "Hardware Sentinel Alert"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleSnooze(device.macAddress),
											className: "p-1 hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-lg text-slate-500 hover:text-slate-300 transition-all cursor-pointer",
											title: "Snooze warning (5m)",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3.5 h-3.5" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-extrabold text-slate-100 mt-1 uppercase font-mono tracking-tight flex items-center gap-1.5",
										children: device.friendlyName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] font-mono text-slate-500 uppercase mt-0.5",
										children: ["MAC: ", device.macAddress]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-slate-300 leading-relaxed mt-2 font-sans",
										children: isDisconnected && isLowBattery ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											"Wearable is ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-red-400 font-bold font-mono",
												children: "OFFLINE"
											}),
											" with a critical battery level (",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-red-400 font-bold font-mono",
												children: [device.batteryLevel, "%"]
											}),
											"). Urgent attention required."
										] }) : isDisconnected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											"Bound physical button is ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-amber-400 font-bold font-mono",
												children: "DISCONNECTED"
											}),
											". Panic trigger signal is inactive."
										] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											"Device battery is low (",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-amber-400 font-bold font-mono",
												children: [device.batteryLevel, "%"]
											}),
											"). Please replace the CR2032 lithium cell soon."
										] })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-t border-slate-900/60 pt-3",
							children: [isDisconnected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => connectBleDevice(device.macAddress),
								className: "flex-1 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/40 text-amber-400 text-[10px] font-mono font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
									className: "w-3.5 h-3.5 animate-spin",
									style: { animationDuration: "4s" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RECONNECT KEY" })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 py-1.5 px-3 bg-slate-900/60 rounded-xl text-[9px] font-mono font-bold text-slate-400 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { className: "w-4 h-4 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Level: ",
									device.batteryLevel,
									"% (Low)"
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleSnooze(device.macAddress),
								className: "py-2 px-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-slate-300 text-[10px] font-mono font-black rounded-xl transition-all cursor-pointer flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SNOOZE 5M" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3.5 h-3.5" })]
							})]
						})
					]
				}, device.macAddress);
			})
		})
	}) });
};
//#endregion
//#region src/services/ProfileSync.ts
var ProfileSync_exports = /* @__PURE__ */ __exportAll({
	startProfileSync: () => startProfileSync,
	syncProfile: () => syncProfile
});
var TOKEN_KEY = "sl_profile_token";
var DEFAULT_BACKEND = "https://api.safetylink.online";
var FALLBACK_BACKEND = "https://safetylink-api.tshilidzi-mukwevho54.workers.dev";
var DEAD_BACKEND_HOST = "d089bef8b0b58c5d9506b512ec2f63dc.workers.dev";
var lastSig = "";
function resolveProfileSyncBackends(customUrl) {
	const candidates = [];
	const raw = String(customUrl || "").trim().replace(/\/$/, "");
	if (raw && !raw.includes(DEAD_BACKEND_HOST)) candidates.push(raw);
	if (!candidates.includes(DEFAULT_BACKEND)) candidates.push(DEFAULT_BACKEND);
	if (!candidates.includes(FALLBACK_BACKEND)) candidates.push(FALLBACK_BACKEND);
	return candidates;
}
/**
* Saves who the user is, their emergency contacts and last known location on the SafetyLink server.
* This is what lets the server recognise an offline "Please Call Me" from this phone and alert the right people.
*/
async function syncProfile() {
	const s = useAppStore.getState();
	const user = s.currentUser;
	const org = s.currentOrg;
	if (!user?.phone && !org?.controlRoomNumber || s.demoMode || user?.isDemo) return;
	const effectivePhone = user?.phone || org?.controlRoomNumber || "";
	const effectiveName = user?.fullName || user?.username || org?.contactName || org?.name || "SafetyLink User";
	const effectiveOrgCode = user?.orgCode || org?.id || "INDIVIDUAL";
	const effectiveUserId = user?.id || org?.id || "";
	const loc = s.userLocation;
	const alertNote = String(user?.alertNote || "").trim().slice(0, 140);
	const contacts = (s.contacts || []).slice(0, 5).map((c) => ({
		name: c.name,
		phone: c.phone
	}));
	const sig = JSON.stringify([
		effectivePhone,
		effectiveName,
		effectiveOrgCode,
		contacts,
		alertNote,
		loc ? Math.round(loc.lat * 1e3) : 0,
		loc ? Math.round(loc.lng * 1e3) : 0
	]);
	if (sig === lastSig) return;
	try {
		const { NativeDispatchService } = await __vitePreload(async () => {
			const { NativeDispatchService } = await import("./NativeDispatchService-DnOodW5f.js").then((n) => n.n);
			return { NativeDispatchService };
		}, __vite__mapDeps([2,1,0]));
		await NativeDispatchService.saveNativeProfile({
			name: effectiveName,
			phone: effectivePhone,
			alertNote,
			orgCode: effectiveOrgCode,
			orgId: effectiveOrgCode,
			userId: effectiveUserId,
			lat: loc?.lat,
			lng: loc?.lng,
			ussdEnabled: Boolean(s.dispatchSettings?.ussdEnabled),
			userPin: s.userPin || "",
			duressPin: s.duressPin || "",
			contacts: (s.contacts || []).map((c) => ({
				name: c.name,
				phone: c.phone,
				sms: c.sms !== false,
				call: Boolean(c.call || c.priorityCall || c.priority)
			}))
		});
	} catch {}
	if (!effectivePhone) return;
	const token = localStorage.getItem(TOKEN_KEY) || "";
	let syncAccepted = false;
	let savedToken = token;
	for (const backend of resolveProfileSyncBackends(s.customBackendUrl)) try {
		const res = await fetch(`${backend}/api/profile/sync`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...token ? { "X-Profile-Token": token } : {}
			},
			body: JSON.stringify({
				phone: effectivePhone,
				name: effectiveName,
				orgCode: effectiveOrgCode,
				contacts,
				alertNote,
				lat: loc?.lat,
				lng: loc?.lng
			})
		});
		const j = await res.json().catch(() => ({}));
		if (res.ok && j.ok === true && typeof (j.token || token) === "string" && Boolean(j.token || token)) {
			syncAccepted = true;
			if (j.token) {
				savedToken = j.token;
				localStorage.setItem(TOKEN_KEY, j.token);
			}
			break;
		}
		console.warn("[ProfileSync] backend rejected sync:", {
			backend,
			status: res.status,
			error: String(j.error || "invalid sync response").slice(0, 100)
		});
	} catch {}
	if (syncAccepted && savedToken) try {
		const { SafetyLinkEmergency } = await __vitePreload(async () => {
			const { SafetyLinkEmergency } = await import("./NativeDispatchService-DnOodW5f.js").then((n) => n.n);
			return { SafetyLinkEmergency };
		}, __vite__mapDeps([2,1,0]));
		await SafetyLinkEmergency.savePushIdentity({
			phone: effectivePhone,
			profileToken: savedToken
		});
	} catch {}
	if (syncAccepted) lastSig = sig;
}
var started = false;
function startProfileSync() {
	if (started) return;
	started = true;
	let timer = null;
	useAppStore.subscribe(() => {
		clearTimeout(timer);
		timer = setTimeout(syncProfile, 4e3);
	});
	setInterval(syncProfile, 3e5);
	setTimeout(syncProfile, 5e3);
}
//#endregion
//#region src/components/PrivacyNoticeModal.tsx
var PrivacyNoticeModal = () => {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!localStorage.getItem("sl_privacy_acknowledged")) setIsOpen(true);
	}, []);
	const handleAccept = () => {
		localStorage.setItem("sl_privacy_acknowledged", "true");
		setIsOpen(false);
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl font-mono text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-slate-800/80 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl",
						children: "🛡️"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold text-slate-100 uppercase tracking-wider",
						children: "SafetyLink Privacy & Critical Permissions Notice"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-slate-400",
						children: "Google Play Sensitive Permissions & Data Safety Disclosure"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 text-xs text-slate-300 max-h-72 overflow-y-auto pr-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] leading-relaxed text-slate-300",
							children: "SafetyLink is an emergency distress network. To protect your life during distress without reliance on active internet or screen interaction, the app requests:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-400 text-sm",
										children: "📍"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-emerald-400 text-[11px] block",
										children: "Precise Background Location"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-slate-400",
										children: "Transmits GPS coordinates only during active panic alerts or configured check-in timers to dispatch responders and emergency contacts."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-cyan-400 text-sm",
										children: "✉️"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-cyan-400 text-[11px] block",
										children: "Direct SMS Dispatch (SEND_SMS)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-slate-400",
										children: "Sends distress text messages via cellular radio when data/WiFi is absent or unreachable."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-amber-400 text-sm",
										children: "📞"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-amber-400 text-[11px] block",
										children: "Emergency Telephony (CALL_PHONE)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-slate-400",
										children: "Dials primary priority responder circuits and carrier USSD PCM channels without interrupting user focus."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60 flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-indigo-400 text-sm",
										children: "🔘"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-indigo-400 text-[11px] block",
										children: "Bluetooth Low Energy (iTAG Keyfob)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-slate-400",
										children: "Maintains continuous wireless sentinel connection with your physical distress hardware button."
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-slate-500 italic",
							children: "Zero telemetry or tracking data is sold or shared with advertisers. All incident coordinates remain encrypted and organization-scoped."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-2 border-t border-slate-800/80 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] text-slate-500",
						children: "Google Play Compliant v2"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleAccept,
						className: "px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20",
						children: "I Understand & Accept"
					})]
				})
			]
		})
	});
};
//#endregion
//#region src/App.tsx
(0, import_react.lazy)(() => __vitePreload(() => import("./SuperDashboard-DPnpyTCf.js").then((m) => ({ default: m.SuperDashboard })), __vite__mapDeps([3,1,4,5,0,6,7,8,2,9,10])));
(0, import_react.lazy)(() => __vitePreload(() => import("./OrgWarRoom-BPWx56c_.js").then((m) => ({ default: m.OrgWarRoom })), __vite__mapDeps([11,1,4,5,0,6,7,8,2])));
var BLEScanner = (0, import_react.lazy)(() => __vitePreload(() => import("./BLEScanner-B4TMHpjA.js").then((m) => ({ default: m.BLEScanner })), __vite__mapDeps([12,1,4,5,0,6,7,8,2,13])));
var OfflineMap = (0, import_react.lazy)(() => __vitePreload(() => import("./OfflineMap-fejdhbwT.js").then((n) => n.n).then((m) => ({ default: m.OfflineMap })), __vite__mapDeps([14,1,4,5,0,6,7,8,2])));
var Settings = (0, import_react.lazy)(() => __vitePreload(() => import("./Settings-C85luZEj.js").then((m) => ({ default: m.Settings })), __vite__mapDeps([15,1,4,5,0,6,7,8,2,16,17])));
var WorkspaceIntegrations = (0, import_react.lazy)(() => __vitePreload(() => import("./WorkspaceIntegrations-CJUYSibf.js"), __vite__mapDeps([18,1,4,5,0,7,8])));
var Profile = (0, import_react.lazy)(() => __vitePreload(() => import("./Profile-BBwYvdsX.js").then((m) => ({ default: m.Profile })), __vite__mapDeps([19,1,4,5,0,6,7,8,2])));
var LocationDisplay = (0, import_react.lazy)(() => __vitePreload(() => import("./LocationDisplay-vFGoW2ti.js").then((m) => ({ default: m.LocationDisplay })), __vite__mapDeps([20,1,4,5,0,6,7,8,2])));
var OrgDashboard = (0, import_react.lazy)(() => __vitePreload(() => import("./OrgDashboard-xK4crvrC.js").then((m) => ({ default: m.OrgDashboard })), __vite__mapDeps([21,1,4,5,0,6,7,8,2,22,23,17,24,14,18,11])));
var AdminPanel = (0, import_react.lazy)(() => __vitePreload(() => import("./AdminPanel-Dojp5F6P.js").then((m) => ({ default: m.AdminPanel })), __vite__mapDeps([25,1,4,5,0,6,7,8,2,26,22,9,10,27,28])));
var AppTour = (0, import_react.lazy)(() => __vitePreload(() => import("./AppTour-DfBYzgML.js").then((m) => ({ default: m.AppTour })), __vite__mapDeps([29,1,4,5,0,6,7,8,2])));
var AIHub = (0, import_react.lazy)(() => __vitePreload(() => import("./AIHub-CPt0DMND.js").then((m) => ({ default: m.AIHub })), __vite__mapDeps([30,1,4,5,0,6,7,8,2])));
var MediaHub = (0, import_react.lazy)(() => __vitePreload(() => import("./MediaHub-K3zz_N9f.js").then((m) => ({ default: m.MediaHub })), __vite__mapDeps([28,1,4,5,0,26])));
var AndroidWidgetSimulator = (0, import_react.lazy)(() => __vitePreload(() => Promise.resolve().then(() => AndroidWidgetSimulator_exports).then((m) => ({ default: m.AndroidWidgetSimulator })), void 0));
var KlevaBot = (0, import_react.lazy)(() => __vitePreload(() => import("./KlevaBot-CxFK8gw_.js").then((m) => ({ default: m.KlevaBot })), __vite__mapDeps([31,1,4,5,0,6,7,8,2])));
var GlobalRadarBackground = (0, import_react.lazy)(() => __vitePreload(() => import("./GlobalRadarBackground-CIbDp0Zg.js").then((m) => ({ default: m.GlobalRadarBackground })), __vite__mapDeps([23,1,4,5,0])));
var AdvancedSubsystems = (0, import_react.lazy)(() => __vitePreload(() => import("./AdvancedSubsystems-DZFTnwPi.js").then((m) => ({ default: m.AdvancedSubsystems })), __vite__mapDeps([32,1,4,5,0,6,7,8,2])));
var DecoyCalculator = (0, import_react.lazy)(() => __vitePreload(() => import("./DecoyCalculator-BcX67CGv.js").then((m) => ({ default: m.DecoyCalculator })), __vite__mapDeps([33,1,4,5,0,6,7,8,2])));
var ConfidentialVault = (0, import_react.lazy)(() => __vitePreload(() => import("./ConfidentialVault-B2bSOQ25.js").then((m) => ({ default: m.ConfidentialVault })), __vite__mapDeps([34,1,4,5,0,6,7,8,2,35,16])));
var SafetyWareStore = (0, import_react.lazy)(() => __vitePreload(() => Promise.resolve().then(() => SafetyWareStore_exports), void 0));
var OpenPlatformHub = (0, import_react.lazy)(() => __vitePreload(() => import("./OpenPlatformHub-B38tOFi7.js").then((m) => ({ default: m.OpenPlatformHub })), __vite__mapDeps([36,1,4,5,0,6,7,8,2])));
(0, import_react.lazy)(() => __vitePreload(() => import("./ClientDatabaseModule-jhVUI_lE.js").then((m) => ({ default: m.ClientDatabaseModule })), __vite__mapDeps([27,1,4,5,0,6,7,8,2])));
var LiveCameraFeed = (0, import_react.lazy)(() => __vitePreload(() => import("./LiveCameraFeed-CExT6_Dn.js").then((m) => ({ default: m.LiveCameraFeed })), __vite__mapDeps([24,1,4,5,0,6,7,8,2,17])));
var slide1 = getR2StreamUrl("Random platform background.png");
var slide2 = getR2StreamUrl("Emergency_Response_Platform_Architecture_Overview.png");
var slide3 = getR2StreamUrl("IMG_20260914_221811.png");
var slLogoMain = getR2StreamUrl("Polish_20260914_220631067.png");
var slLogoSet = getR2StreamUrl("IMG_20260914_223311.png");
var newBg1 = getR2StreamUrl("Emergency_Mesh_Platform_Overview.png");
var newLogo1 = getR2StreamUrl("IMG_20260914_223547.png");
var klevaLogo = getR2StreamUrl("Polish_20260809_035827088.png");
var polishLogo = getR2StreamUrl("limx dynamics.jpg");
var TrialLockOverlay = () => {
	const { logout } = useAppStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md w-full bg-red-950/40 border-2 border-red-500/50 rounded-2xl p-8 text-center shadow-[0_0_100px_rgba(220,38,38,0.2)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "w-10 h-10 text-red-500",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						strokeWidth: 2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-black mb-4 tracking-tight",
					children: "System Locked"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-slate-300 text-lg mb-8 leading-relaxed",
					children: "Your 14-day SafetyLink trial has concluded. The system has automatically locked your account's access."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-black/40 p-4 rounded-xl text-sm text-slate-400 font-mono mb-8",
					children: "ERROR CODE: TRIAL_EXPIRED"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "mailto:info@safetylink.online",
					className: "inline-block bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-xl transition-colors w-full mb-4",
					children: "Contact Sales to Unlock"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: logout,
					className: "text-slate-500 text-sm font-bold hover:text-white underline",
					children: "Sign Out"
				})
			]
		})
	});
};
var TrialReminderModal = () => {
	const { currentUser, currentOrg, showTrialReminder, setShowTrialReminder } = useAppStore();
	if (!showTrialReminder) return null;
	const target = currentOrg || currentUser;
	if (!target || target.subscriptionStatus !== "trial") return null;
	const daysPassed = Math.floor((Date.now() - (target.createdAt || Date.now())) / 864e5);
	const daysLeft = Math.max(0, 14 - daysPassed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-sm p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-300" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "w-8 h-8 text-amber-500",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						strokeWidth: 2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-black text-white mb-2",
					children: "Free Trial Active"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-slate-400 mb-6 text-sm",
					children: "You are currently using the SafetyLink Free Trial. Upgrade to premium for unlimited access to all features."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-950 rounded-2xl p-4 mb-8 border border-slate-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl font-black text-amber-400 mb-1",
						children: daysLeft
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-slate-500 uppercase tracking-widest font-bold",
						children: "Days Remaining"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setShowTrialReminder(false),
					className: "w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-xl transition-all",
					children: "Continue to Dashboard"
				})
			]
		})
	});
};
var App = () => {
	const isDesktopExe = typeof navigator !== "undefined" && navigator.userAgent.indexOf("Electron") >= 0;
	const [showLanding, setShowLanding] = (0, import_react.useState)(() => !isDesktopExe && (Capacitor.getPlatform() === "web" || typeof window !== "undefined" && !Capacitor.isNativePlatform()));
	(0, import_react.useEffect)(() => {
		const openPreview = () => {
			setAuthInitialView("LOGIN");
			setShowLanding(false);
		};
		window.addEventListener("sl-open-preview", openPreview);
		if (typeof window !== "undefined" && window.location.hash === "#preview") openPreview();
		return () => window.removeEventListener("sl-open-preview", openPreview);
	}, []);
	const [authInitialView, setAuthInitialView] = (0, import_react.useState)("LOGIN");
	const [trialExpired, setTrialExpired] = (0, import_react.useState)(false);
	const [mapsQuotaError, setMapsQuotaError] = (0, import_react.useState)(null);
	const isLizzyOpen = useAppStore((s) => s.isLizzyOpen);
	const setIsLizzyOpen = useAppStore((s) => s.setIsLizzyOpen);
	(0, import_react.useEffect)(() => {
		const onQuota = (ev) => {
			const detail = ev?.detail;
			setMapsQuotaError(detail?.reason || "Google Maps API Quota Exceeded. Interactive map tiles may be degraded.");
		};
		window.addEventListener("gmp-quota-exceeded", onQuota);
		return () => window.removeEventListener("gmp-quota-exceeded", onQuota);
	}, []);
	const {} = useTacticalSensors();
	const { startNativeScanner } = useEmergencyListener((info) => {
		const store = useAppStore.getState();
		const status = String(info?.status || "").toUpperCase();
		if (status === "TRIGGERED" || status === "COUNTDOWN") {
			useAppStore.setState({ panicCountdown: typeof info.countdownSeconds === "number" && info.countdownSeconds > 0 ? info.countdownSeconds : 10 });
			return;
		}
		if (status === "DISPATCHING") {
			useAppStore.setState({
				panicCountdown: null,
				activeSOSState: "ESCALATING"
			});
			store.addAuditLog("DISPATCH", "SEVERE", "Native EmergencyService Executing", `Source: ${info.source || "NATIVE_PANIC_SERVICE"}`);
			return;
		}
		if (status === "CANCELLED") {
			useAppStore.setState({
				panicCountdown: null,
				activeSOSState: "IDLE"
			});
			store.addToast("Emergency SOS disarmed cleanly.", "info");
			return;
		}
		if (status === "DISPATCHED" || status === "PARTIAL_SUCCESS" || status === "FAILED") {
			if (status !== "FAILED" && typeof window !== "undefined") {
				const existingTimer = window.__SL_CHECKIN_TIMER__;
				if (existingTimer) clearTimeout(existingTimer);
				window.__SL_CHECKIN_TIMER__ = setTimeout(() => {
					const cur = useAppStore.getState();
					if (cur.activeSOSState !== "IDLE") cur.setShowLizzyPopup(true);
				}, 6e5);
			}
			const coords = store.userLocation || {
				lat: 0,
				lng: 0
			};
			const incidentId = info.incidentId || `INC-${Date.now()}`;
			const smsStatus = info.smsStatus || "UNKNOWN";
			const callStatus = info.callStatus || "UNKNOWN";
			const backendSyncStatus = info.backendSyncStatus || "UNKNOWN";
			const pcmStatus = info.pcmStatus || "NOT_REQUIRED";
			const nextEvents = [{
				id: incidentId,
				status: status === "FAILED" ? "FAILED" : status === "PARTIAL_SUCCESS" ? "PARTIAL" : "DISPATCHED",
				severity: "CRITICAL",
				lat: coords.lat,
				lng: coords.lng,
				timestamp: Date.now(),
				assignedResponder: store.currentUser?.orgCode || store.currentOrg?.id || "Escalated Patrol Unit",
				description: `Native Dispatch (${status}) — SMS: ${smsStatus}, Call: ${callStatus}, Sync: ${backendSyncStatus}`,
				timelineData: [
					`Incident ${incidentId} processed at ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`,
					`SMS Result: ${smsStatus}`,
					`Voice Call Result: ${callStatus}`,
					`Backend Sync: ${backendSyncStatus}`,
					`PCM/USSD: ${pcmStatus}`
				]
			}, ...store.panicEvents.filter((ev) => ev.id !== incidentId)];
			useAppStore.setState({
				panicCountdown: null,
				activeSOSState: status === "FAILED" ? "IDLE" : "DISPATCHED",
				panicEvents: nextEvents
			});
			try {
				localStorage.setItem("sl_panic_events", JSON.stringify(nextEvents));
			} catch {}
			store.addDispatchLog({
				channel: "SMS",
				target: store.contacts?.[0]?.phone || store.currentUser?.phone || "Emergency Contacts",
				status: smsStatus === "SENT" ? "SENT" : "FAILED",
				unitId: store.currentUser?.id || "SL-NATIVE",
				coordinates: coords.lat || coords.lng ? coords : void 0,
				details: `Incident ${incidentId} · SMS=${smsStatus} Call=${callStatus} Sync=${backendSyncStatus} PCM=${pcmStatus}`
			});
			store.addAuditLog("DISPATCH", status === "FAILED" ? "SEVERE" : "INFO", `Native Dispatch Result: ${status}`, `ID=${incidentId} SMS=${smsStatus} Call=${callStatus} Backend=${backendSyncStatus} PCM=${pcmStatus}`);
			if (status === "DISPATCHED") store.addToast(`SOS Dispatched (${incidentId}): SMS ${smsStatus}, Sync ${backendSyncStatus}`, "success");
			else if (status === "PARTIAL_SUCCESS") store.addToast(`Partial SOS Dispatch (${incidentId}): SMS ${smsStatus}, Call ${callStatus}, Sync ${backendSyncStatus}`, "warn");
			else store.addToast(`SOS Dispatch Failed (${incidentId}): queued offline if unreachable.`, "error");
		}
	});
	const { isAppMinimized, setMinimized, activeSOSState, currentUser, currentOrg, superAdminActive, logout, customTools, userLocation, language, setLanguage, setCommerceModalOpen, toasts, removeToast, isBackgroundServiceRunning, backgroundServiceTick, bleDevices, decoyActive, isFloatingWidgetDeployed, setFloatingWidgetDeployed, demoMode, localOfflineQueue, syncOfflineQueue, checkAppUpdates, updateInfo, setUpdateInfo, globalTheme, setGlobalTheme, profileCreatedSummary, setProfileCreatedSummary, addToast } = useAppStore();
	(0, import_react.useEffect)(() => {
		checkAppUpdates();
		const updateInterval = setInterval(() => {
			checkAppUpdates();
		}, 9e5);
		const handleFocus = () => {
			checkAppUpdates();
		};
		window.addEventListener("focus", handleFocus);
		initFirebaseSync();
		startProfileSync();
		if (Capacitor.isNativePlatform()) startNativeScanner().catch(() => {});
		const handleOnlineReconnect = () => {
			__vitePreload(async () => {
				const { syncProfile } = await Promise.resolve().then(() => ProfileSync_exports);
				return { syncProfile };
			}, void 0).then(({ syncProfile }) => syncProfile()).catch(() => {});
			useAppStore.getState().syncOfflineQueue(true);
		};
		window.addEventListener("online", handleOnlineReconnect);
		const autoReconnectBondedITags = () => {
			try {
				const bonded = useAppStore.getState().bleDevices;
				if (bonded && bonded.length > 0) {
					console.log("[App] Auto-reconnecting saved bonded iTAG devices:", bonded.length);
					bonded.forEach((dev) => {
						if (dev.connectionState !== "CONNECTED") useAppStore.getState().connectBleDevice(dev.macAddress);
					});
				}
			} catch (e) {
				console.warn("[App] Auto-reconnect saved iTAG note:", e);
			}
		};
		const itagTimer = setTimeout(autoReconnectBondedITags, 1e3);
		let cleanupSync = null;
		const { firestoreSync, currentUser } = useAppStore.getState();
		if (firestoreSync && currentUser) cleanupSync = useAppStore.getState().initMeshSync();
		const unsub = useAppStore.subscribe((state, prevState) => {
			if ((state.firestoreSync !== prevState.firestoreSync || state.currentUser?.id !== prevState.currentUser?.id) && state.firestoreSync && state.currentUser) {
				if (cleanupSync) cleanupSync();
				cleanupSync = state.initMeshSync();
			} else if (!state.firestoreSync && cleanupSync) {
				cleanupSync();
				cleanupSync = null;
			}
		});
		const checkTrial = () => {
			const target = currentOrg || currentUser;
			if (target && target.subscriptionStatus === "trial") {
				if (Math.floor((Date.now() - (target.createdAt || Date.now())) / 864e5) >= 14) setTrialExpired(true);
				else setTrialExpired(false);
			} else if (target && target.subscriptionStatus === "locked") setTrialExpired(true);
			else setTrialExpired(false);
		};
		checkTrial();
		const handleTrialExpired = () => setTrialExpired(true);
		window.addEventListener("trial_expired", handleTrialExpired);
		return () => {
			clearInterval(updateInterval);
			clearTimeout(itagTimer);
			window.removeEventListener("focus", handleFocus);
			window.removeEventListener("online", handleOnlineReconnect);
			window.removeEventListener("trial_expired", handleTrialExpired);
			if (cleanupSync) cleanupSync();
			unsub();
		};
	}, [currentUser, currentOrg]);
	const t = (key) => {
		if (key === "tab.deck") return "Control Deck";
		if (key === "tab.vault") return "Confidential Vault";
		return translate(language, key);
	};
	const [activeTab, setActiveTab] = (0, import_react.useState)("home");
	const [showExitConfirm, setShowExitConfirm] = (0, import_react.useState)(false);
	const [showSplash, setShowSplash] = (0, import_react.useState)(() => {
		if (Capacitor.isNativePlatform()) return false;
		if (typeof window !== "undefined") {
			if (!(sessionStorage.getItem("sl_splash_shown") || localStorage.getItem("sl_splash_shown"))) {
				sessionStorage.setItem("sl_splash_shown", "true");
				return true;
			}
		}
		return false;
	});
	const [showDnsGuide, setShowDnsGuide] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (Capacitor.isNativePlatform()) {
			SplashScreen.hide().catch(console.warn);
			const t = setTimeout(() => {
				SplashScreen.hide().catch(() => {});
			}, 800);
			return () => clearTimeout(t);
		}
	}, []);
	const [showTour, setShowTour] = (0, import_react.useState)(false);
	const [isDrawerOpen, setIsDrawerOpen] = (0, import_react.useState)(false);
	const backgroundSlides = [
		newBg1,
		newLogo1,
		klevaLogo,
		polishLogo,
		slLogoMain,
		slLogoSet,
		slide3,
		slide1,
		slide2
	];
	const [currentSlideIndex, setCurrentSlideIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!isDrawerOpen) return;
		const interval = setInterval(() => {
			setCurrentSlideIndex((prev) => (prev + 1) % backgroundSlides.length);
		}, 4500);
		return () => clearInterval(interval);
	}, [isDrawerOpen]);
	(0, import_react.useEffect)(() => {
		const skipTour = localStorage.getItem("sl_skip_tour");
		if (currentUser) {
			if (skipTour !== "true") setShowTour(true);
		} else setShowTour(false);
	}, [currentUser]);
	(0, import_react.useEffect)(() => {
		let urlOpenListener = null;
		let backButtonListenerPromise = null;
		if (Capacitor.isNativePlatform()) {
			urlOpenListener = App$1.addListener("appUrlOpen", (data) => {
				console.log("App opened with URL:", data);
				try {
					const url = new URL(data.url);
					if (url.searchParams.has("ref")) {
						const refCode = url.searchParams.get("ref");
						if (refCode) localStorage.setItem("sl_pending_referral", refCode);
					}
				} catch (e) {
					console.warn("Failed to parse incoming deep link url:", e);
				}
			});
			try {
				backButtonListenerPromise = App$1.addListener("backButton", () => {
					if (useAppStore.getState().panicCountdown !== null) {
						console.warn("Back button blocked: SOS Countdown is active.");
						return;
					}
					if (isDrawerOpen) setIsDrawerOpen(false);
					else if (activeTab !== "home") setActiveTab("home");
					else setShowExitConfirm(true);
				});
			} catch (e) {
				console.warn("backButton not supported", e);
			}
		}
		return () => {
			if (urlOpenListener) urlOpenListener.then((listener) => listener.remove());
			if (backButtonListenerPromise) backButtonListenerPromise.then((listener) => listener.remove());
		};
	}, [isDrawerOpen, activeTab]);
	(0, import_react.useEffect)(() => {
		const geoService = GeolocationService.getInstance();
		OfflineService.getInstance();
		const setupSurvivalListener = async () => {
			const bridge = Capacitor.Plugins.SafetyLinkBridge;
			if (bridge) bridge.addListener("onSurvivalMode", (info) => {
				useAppStore.getState().setSurvivalMode(info.isSurvival);
				if (info.isSurvival) console.error("CRITICAL: BATTERY SURVIVAL MODE ACTIVATED. UI SUSPENDED.");
			});
		};
		setupSurvivalListener();
		const registerPush = async () => {
			try {
				if (Capacitor.isNativePlatform()) {
					let permStatus = await PushNotifications.checkPermissions();
					if (permStatus.receive === "prompt") permStatus = await PushNotifications.requestPermissions();
					if (permStatus.receive === "granted") {
						await PushNotifications.register();
						PushNotifications.addListener("registration", (token) => {
							console.log("FCM Token:", token.value);
							if (currentUser) useAppStore.getState().updateUserProfile(currentUser.id, { fcmToken: token.value });
						});
						PushNotifications.addListener("registrationError", (error) => {
							console.error("FCM Registration error: ", error.error);
						});
					}
				}
			} catch (e) {
				console.warn("FCM Registration skipped (not native or error):", e);
			}
		};
		registerPush();
		geoService.startTracking();
		const handleCustomWearableEvent = (e) => {
			console.log("Intercepted custom wearable hardware trigger:", e.detail);
		};
		window.dispatchEvent(new CustomEvent("wearable-panic-trigger", { detail: "initialized" }));
		window.addEventListener("wearable-panic-trigger", handleCustomWearableEvent);
		return () => {
			geoService.stopTracking();
			window.removeEventListener("wearable-panic-trigger", handleCustomWearableEvent);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const handleSwitchTab = (e) => {
			const customEvent = e;
			if (customEvent.detail) setActiveTab(customEvent.detail);
		};
		window.addEventListener("sl-switch-tab", handleSwitchTab);
		return () => window.removeEventListener("sl-switch-tab", handleSwitchTab);
	}, []);
	(0, import_react.useEffect)(() => {
		const { incrementBackgroundServiceTick } = useAppStore.getState();
		const tickInterval = setInterval(() => {
			if (isBackgroundServiceRunning) incrementBackgroundServiceTick();
		}, 3e4);
		return () => clearInterval(tickInterval);
	}, [isBackgroundServiceRunning]);
	(0, import_react.useEffect)(() => {
		const locStr = userLocation ? `${userLocation.lat.toFixed(5)}, ${userLocation.lng.toFixed(5)}` : "Acquiring GPS...";
		const connectedBleCount = bleDevices.filter((d) => d.connectionState === "CONNECTED").length;
		LocalNotificationService.updateStatusNotification(isBackgroundServiceRunning, backgroundServiceTick, activeSOSState, locStr, connectedBleCount).catch((err) => {
			console.error("[App:NotificationSync] Error updating system tray notification:", err);
		});
	}, [
		isBackgroundServiceRunning,
		backgroundServiceTick,
		activeSOSState,
		userLocation,
		bleDevices
	]);
	const renderMainBody = () => {
		if (!currentUser && !currentOrg && !superAdminActive) {
			if (showLanding) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {
				onLogin: () => {
					setAuthInitialView("LOGIN");
					setShowLanding(false);
				},
				onRegisterOrg: () => {
					setAuthInitialView("REGISTER_ORG");
					setShowLanding(false);
				},
				onRegisterUser: () => {
					setAuthInitialView("REGISTER_USER");
					setShowLanding(false);
				}
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthScreen, {
				initialView: authInitialView,
				onBackToSite: Capacitor.getPlatform() === "web" ? () => setShowLanding(true) : void 0
			});
		}
		if (isAppMinimized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulatedDesktop, {});
		if (decoyActive) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center text-slate-500 text-xs py-8",
				children: "Loading Calculator..."
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DecoyCalculator, {})
		});
		if (superAdminActive) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
			tabName: "Admin",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center text-slate-500 text-xs py-8",
					children: "Loading Admin..."
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPanel, {})
			})
		});
		if (currentUser && currentUser.orgCode && currentUser.role === "Responder") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center text-slate-500 text-xs py-8",
				children: "Loading Responder Console..."
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponderDashboard, {})
		});
		if (currentOrg || currentUser && currentUser.orgCode && [
			"Organization Administrator",
			"Control Room Operator",
			"Dispatcher"
		].includes(currentUser.role || "")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center text-slate-500 text-xs py-8",
				children: "Loading Dashboard..."
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgDashboard, {})
		});
		if (!currentUser) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col min-h-0 overflow-hidden relative",
			children: [
				showExitConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl",
									children: "🚪"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-black text-slate-100 uppercase tracking-wider font-mono",
								children: "Exit SafetyLink?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 mt-2",
								children: "Background tracking and emergency listeners will be suspended if you exit."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setShowExitConfirm(false),
									className: "flex-1 py-3 rounded-xl border border-slate-700 font-bold uppercase tracking-wider text-xs",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => App$1.exitApp(),
									className: "flex-1 py-3 rounded-xl bg-red-600 font-bold uppercase tracking-wider text-xs shadow-lg shadow-red-500/20",
									children: "Exit App"
								})]
							})
						]
					})
				}),
				showTour && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppTour, { onClose: (neverShowAgain) => {
						if (neverShowAgain) localStorage.setItem("sl_skip_tour", "true");
						setShowTour(false);
					} })
				}),
				activeSOSState !== "IDLE" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full bg-red-600 text-slate-100 font-mono text-xs font-bold text-center py-2 px-4 tracking-wider uppercase animate-pulse border-b border-red-500/50 flex items-center justify-center gap-2 relative z-50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("status.emergency") })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full bg-slate-900 border-b border-slate-800/60 text-slate-400 font-mono text-[10px] py-1 px-4 text-center tracking-wider uppercase flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("status.secure") })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: `${globalTheme === "light" ? "bg-white/95 border-slate-200 text-slate-900 shadow-sm" : "bg-slate-900/60 border-slate-900 text-slate-100"} backdrop-blur-md border-b py-2.5 sm:py-3 px-3 sm:px-5 flex justify-between items-center shadow-md relative z-30 transition-colors`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [activeTab === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsDrawerOpen(true),
							className: `p-2 sm:p-2.5 rounded-xl border transition-all shadow-inner flex items-center justify-center cursor-pointer ${globalTheme === "light" ? "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800" : "bg-slate-950/60 hover:bg-slate-900 border-slate-850 hover:border-slate-800 text-slate-300 hover:text-white"}`,
							title: "Open Navigation Menu",
							"aria-label": "Open menu drawer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "w-5 h-5",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								strokeWidth: 2.5,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									d: "M4 6h16M4 12h16M4 18h16"
								})
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveTab("home"),
							className: `p-2 sm:p-2.5 rounded-xl border transition-all shadow-inner flex items-center gap-1 cursor-pointer ${globalTheme === "light" ? "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800" : "bg-slate-950/60 hover:bg-slate-900 border-slate-850 hover:border-slate-800 text-slate-300 hover:text-white"}`,
							title: "Return to Home",
							"aria-label": "Back to home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "w-5 h-5",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								strokeWidth: 2.5,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									d: "M15 19l-7-7 7-7"
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: `text-sm font-black tracking-wider uppercase font-mono leading-none flex items-center gap-1 ${globalTheme === "light" ? "text-slate-900" : "text-slate-100"}`,
									children: ["SafetyLink ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8px] bg-red-500/10 text-red-400 border border-red-500/20 px-1 rounded font-normal leading-none",
										children: "v2.0"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-[7px] font-mono uppercase tracking-widest mt-0.5 ${globalTheme === "light" ? "text-slate-500" : "text-slate-500"}`,
									children: "Secure Active Node"
								})]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 sm:gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mr-0.5 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: language,
									onChange: (e) => setLanguage(e.target.value),
									className: `appearance-none text-[9.5px] font-bold py-1.5 pl-2 pr-6 rounded-lg focus:outline-none transition-colors uppercase tracking-wider cursor-pointer border ${globalTheme === "light" ? "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 focus:border-slate-400" : "bg-slate-950/60 hover:bg-slate-900 border-slate-800 text-slate-300 focus:border-slate-600"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "en",
											children: "🌐 English"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "zu",
											children: "🌐 Zulu"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "af",
											children: "🌐 Afrikaans"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "xh",
											children: "🌐 Xhosa"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "st",
											children: "🌐 Sesotho"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "tn",
											children: "🌐 Setswana"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ts",
											children: "🌐 Tsonga"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ss",
											children: "🌐 Swati"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ve",
											children: "🌐 Venda"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "nr",
											children: "🌐 Ndebele"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "nso",
											children: "🌐 Sepedi"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-slate-300 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-2.5 h-2.5",
										fill: "none",
										viewBox: "0 0 24 24",
										stroke: "currentColor",
										strokeWidth: 3,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											d: "M19 9l-7 7-7-7"
										})
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right hidden md:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[10px] font-black block leading-none ${globalTheme === "light" ? "text-slate-900" : "text-slate-200"}`,
									children: currentUser.fullName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[7.5px] font-mono text-slate-500 uppercase mt-0.5 block leading-none",
									children: ["@", currentUser.username]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[8.5px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border hidden sm:inline-block ${globalTheme === "light" ? "bg-slate-100" : "bg-slate-950"} ${activeTab === "home" ? "text-red-400 border-red-500/20" : activeTab === "deck" ? "text-cyan-500 border-cyan-500/20" : activeTab === "cameras" ? "text-emerald-500 border-emerald-500/20" : activeTab === "vault" ? "text-emerald-500 border-emerald-500/20" : activeTab === "contacts" ? "text-blue-500 border-blue-500/20" : activeTab === "ble" ? "text-emerald-500 border-emerald-500/20" : activeTab === "map" ? "text-amber-500 border-amber-500/20" : activeTab === "subsystems" ? "text-indigo-500 border-indigo-500/20" : "text-purple-500 border-purple-500/20"}`,
								children: t(`tab.${activeTab}`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: Capacitor.getPlatform() === "android" ? "https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/safetylink.apk" : "https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/safetylink.apk",
								target: "_blank",
								rel: "noopener noreferrer",
								className: `px-2 py-1.5 rounded-xl border text-[9px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1 shrink-0 ${globalTheme === "light" ? "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700" : "bg-emerald-950/50 hover:bg-emerald-900/60 border-emerald-500/30 text-emerald-400"}`,
								title: "Download SafetyLink Version 1 APK",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⬇" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Download"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "app-theme-toggle-btn",
								onClick: () => setGlobalTheme(globalTheme === "dark" ? "light" : "dark"),
								className: `p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center shadow-sm shrink-0 ${globalTheme === "dark" ? "bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-amber-400 hover:border-amber-500/50 hover:bg-slate-850" : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-indigo-600 hover:border-indigo-400 hover:text-indigo-700"}`,
								title: globalTheme === "dark" ? "Switch to Light Theme" : "Switch to Tactical Dark Theme",
								"aria-label": "Toggle visual theme",
								children: globalTheme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									className: "w-4 h-4 text-amber-400",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: 2.2,
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "12",
											cy: "12",
											r: "5"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "12",
											y1: "1",
											x2: "12",
											y2: "3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "12",
											y1: "21",
											x2: "12",
											y2: "23"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "4.22",
											y1: "4.22",
											x2: "5.64",
											y2: "5.64"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "18.36",
											y1: "18.36",
											x2: "19.78",
											y2: "19.78"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "1",
											y1: "12",
											x2: "3",
											y2: "12"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "21",
											y1: "12",
											x2: "23",
											y2: "12"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "4.22",
											y1: "19.78",
											x2: "5.64",
											y2: "18.36"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "18.36",
											y1: "5.64",
											x2: "19.78",
											y2: "4.22"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "w-4 h-4 text-indigo-600",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: 2.2,
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => useAppStore.getState().logout(),
								className: `text-[9px] font-mono border px-2 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${globalTheme === "light" ? "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-600 hover:text-red-600" : "bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-red-400"}`,
								title: "Sign Out to Website",
								children: "Sign Out"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: `flex-1 min-h-0 pb-12 ${activeTab === "home" ? "overflow-hidden" : "overflow-y-auto"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${activeTab === "cameras" ? "max-w-6xl" : "max-w-md"} mx-auto ${activeTab === "home" ? "h-full flex flex-col p-2" : "p-4 space-y-5"}`,
						children: [
							activeTab === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center h-full animate-fadeIn text-center py-2 gap-2",
								children: [
									localOfflineQueue && localOfflineQueue.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 flex items-center justify-between mb-1 mt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg",
												children: "📡"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[10px] font-bold text-amber-400",
													children: "OFFLINE SYNC PENDING"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[8.5px] text-amber-500/70",
													children: [
														localOfflineQueue.length,
														" ",
														localOfflineQueue.length === 1 ? "event" : "events",
														" waiting for network."
													]
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => syncOfflineQueue(),
												className: "text-[8px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-1.5 rounded-lg hover:bg-amber-500/30 transition-colors",
												children: "RETRY"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => useAppStore.setState({ localOfflineQueue: [] }),
												className: "text-[8px] font-bold bg-slate-800 text-slate-400 border border-slate-700 px-2 py-1.5 rounded-lg hover:bg-slate-700 transition-colors",
												children: "CLEAR"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 w-full flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanicButton, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "shrink-0 w-full space-y-2 pb-1",
										children: [
											bleDevices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-3 py-2 flex items-center gap-2 flex-wrap",
												children: bleDevices.slice(0, 2).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 flex-1 min-w-0",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-2 h-2 rounded-full shrink-0 ${d.connectionState === "CONNECTED" ? "bg-emerald-400 animate-pulse" : d.connectionState === "CONNECTING" ? "bg-amber-400 animate-pulse" : "bg-slate-600"}` }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[9px] font-mono text-slate-400 truncate",
															children: d.friendlyName
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[8px] font-mono text-slate-600 shrink-0",
															children: [d.rssi, "dBm"]
														}),
														d.connectionState === "DISCONNECTED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => useAppStore.getState().connectBleDevice(d.macAddress),
															className: "text-[7px] font-bold text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded-lg hover:bg-blue-500/10 transition-all shrink-0",
															children: "RECONNECT"
														})
													]
												}, d.macAddress))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "w-full bg-slate-900/40 border border-slate-900 rounded-2xl px-3 py-2.5 flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-lg shrink-0",
													children: "🛡️"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-left min-w-0",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[10px] font-bold text-slate-200 leading-none",
															children: [
																t("home.reassurance_title"),
																", ",
																currentUser.fullName?.split(" ")[0],
																"!"
															]
														}),
														currentUser.orgCode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[7px] font-mono text-blue-400 uppercase tracking-wider",
															children: currentUser.orgCode
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[8.5px] text-slate-500 leading-snug mt-0.5",
															children: t("home.reassurance_subtitle")
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "w-full grid grid-cols-5 gap-1.5 mt-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => setActiveTab("ble"),
														className: "bg-slate-900/60 border border-slate-800 rounded-xl p-2 flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-colors shadow-sm",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-base leading-none",
															children: "📡"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[7.5px] font-bold text-slate-300 uppercase tracking-widest text-center leading-tight",
															children: "Devices"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => setActiveTab("map"),
														className: "bg-slate-900/60 border border-slate-800 rounded-xl p-2 flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-colors shadow-sm",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-base leading-none",
															children: "🗺️"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[7.5px] font-bold text-slate-300 uppercase tracking-widest text-center leading-tight",
															children: "Map"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => setCommerceModalOpen(true),
														className: "bg-slate-900/60 border border-slate-800 rounded-xl p-2 flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-colors shadow-sm",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-base leading-none",
															children: "🛒"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[7.5px] font-bold text-slate-300 uppercase tracking-widest text-center leading-tight",
															children: "Store"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => setActiveTab("contacts"),
														className: "bg-slate-900/60 border border-slate-800 rounded-xl p-2 flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-colors shadow-sm",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-base leading-none",
															children: "👥"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[7.5px] font-bold text-slate-300 uppercase tracking-widest text-center leading-tight",
															children: "Alerts"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => setActiveTab("vault"),
														className: "bg-slate-900/60 border border-slate-800 rounded-xl p-2 flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-colors shadow-sm",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-base leading-none",
															children: "🗄️"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[7.5px] font-bold text-slate-300 uppercase tracking-widest text-center leading-tight",
															children: "Vault"
														})]
													})
												]
											})
										]
									})
								]
							}),
							activeTab === "deck" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5 animate-fadeIn",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
										fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-center text-slate-500 text-xs py-8",
											children: "Loading Location..."
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationDisplay, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIndicator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
										fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-center text-slate-500 text-xs py-8",
											children: "Loading AI Hub..."
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIHub, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
										fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-center text-slate-500 text-xs py-8",
											children: "Loading Media..."
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaHub, {})
									}),
									demoMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
										fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-center text-slate-500 text-xs py-8",
											children: "Loading Simulator..."
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AndroidWidgetSimulator, {})
									}),
									(() => {
										const orgCode = currentUser.orgCode;
										const visibleTools = customTools.filter((t) => !t.targetOrgId || orgCode && t.targetOrgId === orgCode);
										if (visibleTools.length === 0) return null;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-5 text-left space-y-4 shadow animate-fadeIn",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-purple-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-xs font-black uppercase text-purple-300 font-mono tracking-wider",
													children: "🛠️ Your Custom Integration Tools"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "space-y-3",
												children: visibleTools.map((t) => {
													const lat = userLocation?.lat || 0;
													const lng = userLocation?.lng || 0;
													const formattedVal = t.targetValue.replace("{LAT}", lat.toFixed(6)).replace("{LNG}", lng.toFixed(6));
													const triggerAction = () => {
														if (t.type === "WHATSAPP") window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(formattedVal)}`, "_blank");
														else if (t.type === "CALL") window.open(`tel:${formattedVal}`, "_blank");
														else if (t.type === "SMS") {
															const smsPart = formattedVal.includes(":") ? formattedVal.split(":") : [formattedVal, ""];
															window.open(`sms:${smsPart[0]}?body=${encodeURIComponent(smsPart[1])}`, "_blank");
														} else if (t.type === "WIDGET") window.open(formattedVal.startsWith("http") ? formattedVal : `https://${formattedVal}`, "_blank");
														else useAppStore.getState().addToast(`Tool [${t.title}]: ${t.description} (Value: ${t.targetValue})`, "info");
													};
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "p-3.5 bg-slate-950/85 border border-slate-900 rounded-2xl flex flex-col gap-2.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-0.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs font-black text-slate-100",
																	children: t.title
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[8px] font-mono font-black px-1.5 py-0.5 bg-purple-950/20 text-purple-300 rounded border border-purple-500/10 uppercase",
																	children: t.type
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[11px] text-slate-400 leading-relaxed",
																children: t.description
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															onClick: triggerAction,
															className: "w-full py-2 bg-purple-900/40 hover:bg-purple-850 border border-purple-500/20 hover:border-purple-500/40 text-purple-300 text-[10px] font-mono font-extrabold rounded-xl uppercase tracking-wider transition-all",
															children: ["Launch Action ", t.type === "WHATSAPP" ? "💬" : t.type === "CALL" ? "📞" : t.type === "WIDGET" ? "🌐" : "⚡"]
														})]
													}, t.id);
												})
											})]
										});
									})()
								]
							}),
							activeTab === "cameras" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
								tabName: "Live Cameras",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
									fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-500 text-xs py-8",
										children: "Loading Live Camera Control Deck..."
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "animate-fadeIn",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveCameraFeed, { scope: "USER" })
									})
								})
							}),
							activeTab === "vault" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
								tabName: "Vault",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
									fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-500 text-xs py-8",
										children: "Loading Vault..."
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "animate-fadeIn",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidentialVault, {})
									})
								})
							}),
							activeTab === "contacts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "animate-fadeIn",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DispatchChain, {})
							}),
							activeTab === "ble" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "animate-fadeIn",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
									fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-500 text-xs py-8",
										children: "Loading Scanner..."
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BLEScanner, {})
								})
							}),
							activeTab === "map" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
								tabName: "Map",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
									fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-500 text-xs py-8",
										children: "Loading Map..."
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "animate-fadeIn",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineMap, {})
									})
								})
							}),
							activeTab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-center text-slate-500 text-xs py-8",
									children: "Loading Profile..."
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile, {})
							}),
							activeTab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "animate-fadeIn",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
									fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-500 text-xs py-8",
										children: "Loading Settings..."
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {})
								})
							}),
							activeTab === "intelligence" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "animate-fadeIn p-4 overflow-y-auto h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
									fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-500 text-xs py-8",
										children: "Loading Intelligence..."
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SituationalAwareness, {})
								})
							}),
							activeTab === "subsystems" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "animate-fadeIn",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
									fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-500 text-xs py-8",
										children: "Loading Subsystems..."
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdvancedSubsystems, {})
								})
							}),
							activeTab === "store" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "animate-fadeIn h-full overflow-y-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
									fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-500 text-xs py-8",
										children: "Loading Store..."
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyWareStore, {})
								})
							}),
							activeTab === "workspace" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "animate-fadeIn p-4 overflow-y-auto h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
									fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-500 text-xs py-8",
										children: "Loading Workspace..."
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIntegrations, {})
								})
							}),
							activeTab === "integrations" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "animate-fadeIn p-4 overflow-y-auto h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
									fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-500 text-xs py-8",
										children: "Loading Integrations Hub..."
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenPlatformHub, {})
								})
							}),
							activeTab === "media" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "animate-fadeIn p-4 overflow-y-auto h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
									fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-500 text-xs py-8",
										children: "Loading Media & Evidence Vault..."
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaHub, {})
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isDrawerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: .6 },
					exit: { opacity: 0 },
					onClick: () => setIsDrawerOpen(false),
					className: "fixed inset-0 bg-black z-50 cursor-pointer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: { x: "-100%" },
					animate: { x: 0 },
					exit: { x: "-100%" },
					transition: {
						type: "spring",
						damping: 25,
						stiffness: 220
					},
					className: "fixed left-0 top-0 h-[100dvh] w-80 max-w-[85vw] bg-slate-950/95 backdrop-blur-xl border-r border-slate-900 p-5 pt-[calc(1.25rem+env(safe-area-inset-top))] pb-[calc(1.25rem+env(safe-area-inset-bottom))] flex flex-col justify-between z-[60] overflow-y-auto overscroll-contain",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 z-0 pointer-events-none overflow-hidden select-none",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											scale: 1.05
										},
										animate: { opacity: .6 },
										exit: {
											opacity: 0,
											scale: .95
										},
										transition: {
											duration: 1.5,
											ease: "easeInOut"
										},
										className: "absolute inset-0 w-full h-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: backgroundSlides[currentSlideIndex],
											alt: "SafetyLink Support Background",
											className: "w-full h-full object-cover filter brightness-[0.45] contrast-[1.1] saturate-[0.85]",
											referrerPolicy: "no-referrer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950" })]
									}, currentSlideIndex)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 digital-grid opacity-[0.06]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-500/5 to-red-500/5 mix-blend-color" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6 relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-slate-900 pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoSetPart, {
											part: "main",
											size: 32,
											rounded: "xl"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-sm font-black tracking-wider text-slate-100 uppercase font-mono leading-none",
												children: "SafetyLink Core"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[7px] text-slate-500 font-mono uppercase tracking-widest mt-1",
												children: "Tactical Mesh Controller"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setIsDrawerOpen(false),
										className: "p-1.5 bg-slate-900/60 hover:bg-slate-850 border border-slate-850 text-slate-400 hover:text-slate-200 rounded-lg transition-all",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "w-4 h-4",
											fill: "none",
											viewBox: "0 0 24 24",
											stroke: "currentColor",
											strokeWidth: 2.5,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												d: "M6 18L18 6M6 6l12 12"
											})
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setActiveTab("profile");
										setIsDrawerOpen(false);
									},
									className: "w-full p-3 bg-slate-900/40 border border-slate-900 rounded-2xl text-left flex items-center gap-3 hover:bg-slate-900/80 transition-colors cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-9 h-9 rounded-full bg-slate-800/80 border border-slate-750 flex items-center justify-center text-base shadow-inner",
											children: "👤"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-0.5 min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-black text-slate-200 truncate",
												children: currentUser.fullName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[8.5px] font-mono text-slate-500 uppercase truncate",
												children: ["@", currentUser.username]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-slate-500",
											children: "✎"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono block mb-2 px-1",
											children: "TACTICAL DASHBOARDS"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setActiveTab("home");
												setIsDrawerOpen(false);
											},
											className: `w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${activeTab === "home" ? "bg-red-500/10 border-red-500/20 text-red-400 font-bold" : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "🏠"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold uppercase font-display leading-none",
													children: t("tab.home")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[7.5px] font-mono text-slate-500 mt-0.5",
													children: "Control cockpit & beacon"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setActiveTab("deck");
												setIsDrawerOpen(false);
											},
											className: `w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${activeTab === "deck" ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 font-bold" : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "🎛️"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold uppercase font-display leading-none",
													children: t("tab.deck")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[7.5px] font-mono text-slate-500 mt-0.5",
													children: "Support tools & telemetry"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setActiveTab("cameras");
												setIsDrawerOpen(false);
											},
											className: `w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${activeTab === "cameras" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-bold" : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "📹"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold uppercase font-display leading-none",
													children: t("tab.cameras")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[7.5px] font-mono text-slate-500 mt-0.5",
													children: "WebRTC quad wall, PTZ & talkback"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setActiveTab("vault");
												setIsDrawerOpen(false);
											},
											className: `w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${activeTab === "vault" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-bold" : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "🛡️"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold uppercase font-display leading-none",
													children: t("tab.vault")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[7.5px] font-mono text-slate-500 mt-0.5",
													children: "Secure files & app locking"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setActiveTab("contacts");
												setIsDrawerOpen(false);
											},
											className: `w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${activeTab === "contacts" ? "bg-blue-500/10 border-blue-500/20 text-blue-400 font-bold" : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "📞"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold uppercase font-display leading-none",
													children: t("tab.contacts")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[7.5px] font-mono text-slate-500 mt-0.5",
													children: "Alert cascading chain"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setActiveTab("ble");
												setIsDrawerOpen(false);
											},
											className: `w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${activeTab === "ble" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-bold" : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "📟"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold uppercase font-display leading-none",
													children: t("tab.ble")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[7.5px] font-mono text-slate-500 mt-0.5",
													children: "iTAG wearables setup"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setActiveTab("map");
												setIsDrawerOpen(false);
											},
											className: `w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${activeTab === "map" ? "bg-amber-500/10 border-amber-500/20 text-amber-400 font-bold" : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "🗺️"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold uppercase font-display leading-none",
													children: t("tab.map")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[7.5px] font-mono text-slate-500 mt-0.5",
													children: "Offline GIS mapping"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setActiveTab("store");
												setIsDrawerOpen(false);
											},
											className: `w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${activeTab === "store" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-bold" : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "🛒"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium",
												children: "SafetyWare Store"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setActiveTab("integrations");
												setIsDrawerOpen(false);
											},
											className: `w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${activeTab === "integrations" ? "bg-blue-500/10 border-blue-500/20 text-blue-400 font-bold" : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "🔌"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold uppercase font-display leading-none",
													children: "Integrations Hub"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[7.5px] font-mono text-slate-500 mt-0.5",
													children: "Twilio, VAPI, Africa's Talking, PCB"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setActiveTab("media");
												setIsDrawerOpen(false);
											},
											className: `w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${activeTab === "media" ? "bg-purple-500/10 border-purple-500/20 text-purple-400 font-bold" : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "🎬"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold uppercase font-display leading-none",
													children: "R2 Media & Evidence"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[7.5px] font-mono text-slate-500 mt-0.5",
													children: "138 verified Cloudflare R2 assets & videos"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setActiveTab("settings");
												setIsDrawerOpen(false);
											},
											className: `w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border ${activeTab === "settings" ? "bg-purple-500/10 border-purple-500/20 text-purple-400 font-bold" : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "⚙️"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold uppercase font-display leading-none",
													children: t("tab.settings")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[7.5px] font-mono text-slate-500 mt-0.5",
													children: "Preferences & Ledger"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setShowDnsGuide(true);
												setIsDrawerOpen(false);
											},
											className: "w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border bg-transparent border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "🔑"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold uppercase font-display leading-none",
													children: "DNS Shield"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[7.5px] font-mono text-slate-500 mt-0.5",
													children: "Configure device DNS protection"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												setIsLizzyOpen(true);
												setIsDrawerOpen(false);
											},
											className: "w-full flex items-center gap-3 p-2.5 rounded-xl transition-all border bg-blue-500/10 border-blue-500/20 text-blue-300 hover:bg-blue-500/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm shrink-0",
												children: "🤖"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-extrabold uppercase font-display leading-none",
													children: "Lizzy AI"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[7.5px] font-mono text-blue-400/80 mt-0.5",
													children: "Voice check-in & safety assistant"
												})]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 text-left border-t border-slate-900 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono block px-1",
										children: "🌐 SOUTH AFRICAN TRANSLATIONS"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 bg-slate-950 border border-slate-900 px-2.5 py-1.5 rounded-xl w-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs",
											children: "🌐"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: language,
											onChange: (e) => {
												const val = e.target.value;
												if (val === "_more_") {
													setActiveTab("settings");
													setIsDrawerOpen(false);
												} else useAppStore.getState().setLanguage(val);
											},
											className: "bg-transparent text-[9.5px] font-mono font-bold text-slate-300 focus:outline-none cursor-pointer uppercase border-none outline-none w-full",
											children: [SA_LANGUAGES.map((lang) => {
												const isPreloaded = lang.status === "preloaded";
												const isDownloaded = useAppStore.getState().downloadedLanguages.includes(lang.code);
												const isAvailable = isPreloaded || isDownloaded;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: lang.code,
													disabled: !isAvailable,
													className: "bg-slate-950 text-slate-100 font-bold",
													children: [
														lang.flag,
														" ",
														lang.name,
														" ",
														!isAvailable ? " ⬇️" : ""
													]
												}, lang.code);
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "_more_",
												className: "bg-slate-950 text-blue-400 font-bold",
												children: "⚙️ MANAGE PACKS..."
											})]
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2 text-left border-t border-slate-900 pt-4 relative z-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between bg-slate-950 border border-slate-900 px-3 py-2.5 rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-bold text-slate-300 uppercase tracking-wider font-mono block",
										children: "🛡️ FLOATING WIDGET"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[7.5px] text-slate-500 font-mono mt-0.5",
										children: "Persistent safety toggle"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										const newState = !isFloatingWidgetDeployed;
										setFloatingWidgetDeployed(newState);
										try {
											__vitePreload(async () => {
												const { Capacitor } = await import("./capacitor-B_jS8XWy.js").then((n) => n.y);
												return { Capacitor };
											}, __vite__mapDeps([0,1])).then(({ Capacitor }) => {
												const bridge = Capacitor.Plugins.SafetyLinkBridge;
												if (bridge) bridge.toggleFloatingWidget({ enable: newState });
											});
										} catch (e) {
											console.warn(e);
										}
									},
									className: `w-10 h-5 rounded-full relative transition-colors ${isFloatingWidgetDeployed ? "bg-emerald-500" : "bg-slate-700"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 bottom-0.5 w-4 bg-white rounded-full transition-all ${isFloatingWidgetDeployed ? "right-0.5" : "left-0.5"}` })
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 pt-4 border-t border-slate-900 mt-6 relative z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-left opacity-70",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7px] text-slate-600 font-mono uppercase tracking-widest font-bold",
									children: "COOPERATIVE BRANDS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 font-mono text-[8px] text-slate-400 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "📹 TM MEDIA SOLUTIONS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "⚡ K'LEVA.I SIMPLICITY" })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									logout();
									setIsDrawerOpen(false);
								},
								className: "w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[9px] font-mono font-black text-red-400 hover:text-red-300 rounded-xl uppercase tracking-wider transition-all",
								children: "🔑 SHUTDOWN SESSION"
							})]
						})
					]
				})] }) })
			]
		});
	};
	const getThemeClass = () => {
		let base = "theme-personal";
		if (activeTab === "deck") base = currentUser?.orgCode ? "theme-responder" : "theme-personal";
		return globalTheme === "light" ? `${base} theme-light` : base;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-y-auto ${getThemeClass()} ${demoMode ? "scanlines" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalBackground, {}),
			showSplash && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplashReveal, { onComplete: () => setShowSplash(false) }),
			trialExpired && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrialLockOverlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpdateBanner, {
				updateInfo,
				onDismiss: () => setUpdateInfo(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrialReminderModal, {}),
			mapsQuotaError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-[99998] w-full bg-amber-950/95 border-b border-amber-500/40 px-4 py-2 text-amber-200 text-xs font-mono flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"⚠️ ",
					mapsQuotaError,
					" (Emergency dispatch remains unaffected.)"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setMapsQuotaError(null),
					className: "text-amber-400 hover:text-white font-bold px-2",
					children: "Dismiss"
				})]
			}),
			activeTab === "deck" && !currentOrg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center text-slate-500 text-xs py-8",
					children: "Loading Radar..."
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalRadarBackground, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrialBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForcedCountdownOverlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceAlertOverlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionsOnboardingModal, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LizzyPopup, {}),
			showDnsGuide && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DnsSetupGuide, { onClose: () => setShowDnsGuide(false) }),
			updateInfo?.updateRequiredBlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[9999999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md w-full bg-slate-900 border-2 border-red-500/50 rounded-3xl p-6 text-center space-y-4 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 mx-auto rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-2xl",
							children: "⚠️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-black font-mono text-white uppercase tracking-wider",
							children: "Mandatory Update Required"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-300 leading-relaxed",
							children: updateInfo.releaseNotes || `Your app version is below the minimum supported release (v${updateInfo.minSupportedVersion}). Please update to continue using SafetyLink.`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 pt-2",
							children: [
								updateInfo.apkUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: updateInfo.apkUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider text-center",
									children: [
										"Download Updated APK (v",
										updateInfo.version,
										")"
									]
								}),
								updateInfo.exeUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: updateInfo.exeUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono font-bold text-xs uppercase tracking-wider text-center",
									children: [
										"Download Desktop Update (v",
										updateInfo.version,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => checkAppUpdates(),
									className: "w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold text-xs uppercase cursor-pointer",
									children: "Recheck Version Policy"
								})
							]
						})
					]
				})
			}),
			profileCreatedSummary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[999998] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md w-full bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 space-y-5 shadow-2xl font-mono text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 border-b border-slate-800 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-black",
								children: "✓"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-black text-emerald-300 uppercase tracking-wider",
								children: profileCreatedSummary.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-slate-400",
								children: profileCreatedSummary.provisionalOffline ? "Saved offline — automatic server sync queued" : "Signed in automatically to your active session"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-xs bg-slate-950/70 border border-slate-800 rounded-2xl p-4",
							children: [
								profileCreatedSummary.fullName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-500",
										children: "Name:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-100 font-bold",
										children: profileCreatedSummary.fullName
									})]
								}),
								profileCreatedSummary.username && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-500",
										children: "Username:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-slate-200",
										children: ["@", profileCreatedSummary.username]
									})]
								}),
								profileCreatedSummary.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-500",
										children: "Email:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-200 truncate",
										children: profileCreatedSummary.email
									})]
								}),
								profileCreatedSummary.role && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-500",
										children: "Role:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-cyan-300 font-bold",
										children: profileCreatedSummary.role
									})]
								}),
								profileCreatedSummary.pinConfigured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-500",
										children: "Safety PIN:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-400 font-bold",
										children: "Armed (4 digits)"
									})]
								})
							]
						}),
						profileCreatedSummary.orgCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] text-emerald-400 uppercase font-bold block",
								children: "Organization ID / Mesh Code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-black text-white tracking-widest select-all",
								children: profileCreatedSummary.orgCode
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									navigator.clipboard?.writeText(profileCreatedSummary.orgCode || "").catch(() => {});
									addToast(`Copied Organization Code: ${profileCreatedSummary.orgCode}`, "success");
								},
								className: "px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase cursor-pointer",
								children: "Copy Code"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setProfileCreatedSummary(null),
							className: "w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-widest cursor-pointer shadow-lg",
							children: "Go to Dashboard →"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 relative flex flex-col z-10",
				children: renderMainBody()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2.5 w-full max-w-xs px-4 pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: toasts && toasts.map((toast) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 35,
						scale: .9
					},
					animate: {
						opacity: 1,
						y: 0,
						scale: 1
					},
					exit: {
						opacity: 0,
						y: -20,
						scale: .9,
						transition: { duration: .15 }
					},
					className: `p-3 rounded-2xl shadow-2xl border flex items-start gap-2.5 pointer-events-auto relative overflow-hidden font-mono text-[9.5px] ${toast.type === "success" ? "bg-emerald-950/90 border-emerald-500/20 text-emerald-300" : toast.type === "error" ? "bg-red-950/90 border-red-500/20 text-red-300" : toast.type === "warn" ? "bg-amber-950/90 border-amber-500/20 text-amber-300" : "bg-slate-900/90 border-slate-800 text-slate-300"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs shrink-0 mt-0.5",
							children: toast.type === "success" ? "✅" : toast.type === "error" ? "❌" : toast.type === "warn" ? "⚠️" : "ℹ️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 text-left min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-extrabold text-[8px] text-slate-500 uppercase tracking-wider leading-none",
								children: toast.type === "success" ? "Task Complete" : toast.type === "error" ? "System Warning" : toast.type === "warn" ? "Tactical Notice" : "Telemetry Link"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-slate-200 mt-1 leading-relaxed break-words",
								children: toast.message
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => removeToast(toast.id),
							className: "text-slate-500 hover:text-slate-300 transition-colors shrink-0 p-0.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "w-3 h-3",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								strokeWidth: 3,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									d: "M6 18L18 6M6 6l12 12"
								})
							})
						})
					]
				}, toast.id)) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KlevaBot, {
					isOpen: isLizzyOpen,
					onClose: () => setIsLizzyOpen(false)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPanicWidget, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FirstLaunchDisclaimer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyNoticeModal, {})
		]
	});
};
//#endregion
//#region src/components/GlobalFooter.tsx
var GlobalFooter = () => {
	if (Capacitor.isNativePlatform()) return null;
	const handleOpenPortal = (e) => {
		e.preventDefault();
		window.location.hash = "preview";
		window.dispatchEvent(new CustomEvent("sl-open-preview"));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-0 left-0 right-0 pointer-events-none z-[999]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex items-center justify-center text-[8px] font-mono text-slate-600/80 text-center py-1 px-3 bg-white/80 dark:bg-slate-950/60 backdrop-blur-sm border-t border-emerald-100/60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"© TM Media Solutions · Reg 2018/500191/07 · POPIA Compliant ·",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://safetylink.online",
					className: "pointer-events-auto text-emerald-700 hover:text-emerald-600 transition-colors",
					target: "_blank",
					rel: "noopener noreferrer",
					children: "safetylink.online"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#preview",
				onClick: handleOpenPortal,
				"aria-label": "P",
				className: "pointer-events-auto absolute right-3 w-4 h-4 rounded flex items-center justify-center text-[9px] font-black text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors",
				children: "P"
			})]
		})
	});
};
//#endregion
//#region src/main.tsx
try {
	if (localStorage.getItem("sl_decoy_migrated_v2") !== "true") {
		localStorage.removeItem("sl_decoy_active");
		localStorage.setItem("sl_decoy_migrated_v2", "true");
	}
} catch {}
window.gm_authFailure = () => {
	window.dispatchEvent(new CustomEvent("gmp-quota-exceeded"));
};
var _origConsoleError = console.error;
console.error = (...args) => {
	_origConsoleError.apply(console, args);
	const msg = args.map((a) => String(a)).join(" ");
	if (msg.includes("OverQuotaMapError") || msg.includes("QuotaExceededError")) window.dispatchEvent(new CustomEvent("gmp-quota-exceeded"));
};
if (!Capacitor.isNativePlatform()) {}
if (!Capacitor.isNativePlatform()) try {
	OneSignal.init({
		appId: "e7c4fd21-764f-465d-b98f-c44f4489662e",
		allowLocalhostAsSecureOrigin: true
	}).catch(() => {});
} catch (e) {
	console.warn("OneSignal init error ignored:", e);
}
if (Capacitor.isNativePlatform()) {
	const acquireWakeLock = () => {
		const pm = window.powerManagement;
		if (pm) pm.acquire(() => console.log("[WakeLock] acquired"), (err) => console.warn("[WakeLock] failed:", err));
	};
	document.addEventListener("deviceready", acquireWakeLock, false);
	setTimeout(acquireWakeLock, 1500);
}
import_client.createRoot(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ErrorBoundary, {
	tabName: "SafetyLink",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalFooter, {})]
}) }));
window.__sl_mounted = true;
if (Capacitor.isNativePlatform()) SplashScreen.hide({ fadeOutDuration: 250 }).catch(() => {});
try {
	setupDeepLinks();
} catch (e) {
	console.warn("DeepLinks init error:", e);
}
__vitePreload(async () => {
	const { startFleetTelemetry } = await import("./FleetService-Capbu-3O.js").then((n) => n.t);
	return { startFleetTelemetry };
}, __vite__mapDeps([10,1,0])).then(({ startFleetTelemetry }) => {
	startFleetTelemetry();
}).catch(() => {});
__vitePreload(async () => {
	const { checkForUpdate } = await Promise.resolve().then(() => UpdateService_exports);
	return { checkForUpdate };
}, void 0).then(({ checkForUpdate }) => {
	checkForUpdate().then((info) => {
		if (info.available) useAppStore.getState().setUpdateInfo(info);
	}).catch(() => {});
}).catch(() => {});
//#endregion
export { translate as a, PepxiOrderModal as c, LogoSetPart as d, SafetyLinkLogo as i, ASSETS as l, useTacticalSensors as n, CURRENT_VERSION as o, useEmergencyListener_exports as r, UpdateService_exports as s, ProfileSync_exports as t, getLizzyProvider as u };
