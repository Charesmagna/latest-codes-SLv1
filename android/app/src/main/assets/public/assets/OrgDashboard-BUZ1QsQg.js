import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { A as Radio, N as Play, O as RefreshCw, Ot as Activity, Q as Map, R as Network, b as Shield, ct as FileText, d as UserPlus, dt as Database, ft as Cpu, kt as require_react, m as TriangleAlert, x as ShieldCheck } from "./icons-B-I2x5TV.js";
import { a as MapContainer, b as motion, c as marker_icon_default, i as Marker, l as marker_icon_2x_default, n as Popup, o as CircleMarker, r as Polyline, s as marker_shadow_default, t as TileLayer, u as require_leaflet_src, w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { _ as Capacitor, a as Directory, n as Filesystem, t as Share } from "./capacitor-B_jS8XWy.js";
import { i as useAppStore, n as FALLBACK_BACKEND_URL, r as PRIMARY_BACKEND_URL } from "./store-CoihKo_w.js";
import { f as LogoSetPart } from "./index-CRyeGhgM.js";
import { t as EvidenceLedger } from "./EvidenceLedger-DFto8fWT.js";
import { GlobalRadarBackground } from "./GlobalRadarBackground-CIbDp0Zg.js";
import { t as HikvisionCameraManager } from "./HikvisionCameraManager-BbFPfcLU.js";
import { LiveCameraFeed } from "./LiveCameraFeed-rmBrQMis.js";
import { t as OfflineMap } from "./OfflineMap-BP_Yz9iX.js";
import WorkspaceIntegrations from "./WorkspaceIntegrations-CJUYSibf.js";
import { OrgWarRoom } from "./OrgWarRoom-DGCdAipC.js";
//#region src/components/GlowingHeartBackground.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var GlowingHeartBackground = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-0 bg-[#020204] overflow-hidden select-none pointer-events-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#020204] via-[#05060b] to-[#010102]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden opacity-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-[200%] h-[200%] -left-1/2 absolute border-t border-slate-800",
					style: {
						backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
						backgroundSize: "40px 40px",
						transform: "perspective(500px) rotateX(75deg) translateY(-50px)",
						transformOrigin: "top center"
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black via-transparent to-transparent opacity-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-blue-500/0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-24 top-0 bottom-0 w-[1px] bg-gradient-to-b from-emerald-500/0 via-emerald-500/5 to-emerald-500/0" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black via-transparent to-transparent opacity-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-blue-500/0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-24 top-0 bottom-0 w-[1px] bg-gradient-to-b from-emerald-500/0 via-emerald-500/5 to-emerald-500/0" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-0 left-1/2 -translate-x-1/2 flex gap-20 opacity-30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-1 bg-red-500/50 rounded-full blur-[2px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-1 bg-blue-500/50 rounded-full blur-[2px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-1 bg-emerald-500/50 rounded-full blur-[2px]" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				children: [...Array(12)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						x: Math.random() * 100 + "%",
						y: Math.random() * 100 + "%",
						scale: Math.random() * .5 + .5,
						opacity: Math.random() * .2 + .1
					},
					animate: {
						y: [
							"0%",
							"-30%",
							"0%"
						],
						x: [
							"0%",
							"10%",
							"0%"
						],
						opacity: [
							.1,
							.3,
							.1
						]
					},
					transition: {
						duration: 8 + Math.random() * 10,
						repeat: Infinity,
						ease: "easeInOut",
						delay: Math.random() * 5
					},
					className: "absolute w-1.5 h-1.5 rounded-full bg-red-500/40 blur-[1px]"
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center opacity-30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "w-full h-48 text-emerald-500/40",
					viewBox: "0 0 1000 200",
					preserveAspectRatio: "none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "ecg-glow",
						x1: "0%",
						y1: "0%",
						x2: "100%",
						y2: "0%",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "rgba(16,185,129,0)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "50%",
								stopColor: "rgba(16,185,129,1)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "rgba(16,185,129,0)"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
						d: "M 0 100 L 250 100 L 270 60 L 290 140 L 310 100 L 450 100 L 470 120 L 490 20 L 510 180 L 530 100 L 550 110 L 570 100 L 750 100 L 770 70 L 790 130 L 810 100 L 1000 100",
						fill: "none",
						stroke: "url(#ecg-glow)",
						strokeWidth: "3.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						initial: {
							strokeDasharray: 1200,
							strokeDashoffset: 1200
						},
						animate: { strokeDashoffset: [1200, -1200] },
						transition: {
							duration: 6,
							repeat: Infinity,
							ease: "linear"
						}
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: {
						scale: [
							1,
							1.15,
							1.05,
							1.25,
							1
						],
						opacity: [
							.6,
							.9,
							.7,
							1,
							.6
						]
					},
					transition: {
						duration: 1.2,
						repeat: Infinity,
						repeatType: "reverse",
						ease: [
							.4,
							0,
							.2,
							1
						],
						times: [
							0,
							.15,
							.25,
							.45,
							1
						]
					},
					className: "absolute w-80 h-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.25)_0%,rgba(239,68,68,0.06)_45%,transparent_70%)] blur-2xl"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: {
						scale: [
							1,
							1.12,
							1.05,
							1.22,
							1
						],
						rotate: [
							0,
							-1,
							1,
							-1,
							0
						]
					},
					transition: {
						duration: 1.2,
						repeat: Infinity,
						ease: [
							.4,
							0,
							.2,
							1
						],
						times: [
							0,
							.15,
							.25,
							.45,
							1
						]
					},
					className: "relative w-48 h-48 drop-shadow-[0_0_35px_rgba(239,68,68,0.6)] flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 100 100",
						className: "w-full h-full",
						style: { filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.8))" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
									id: "heart3d",
									cx: "40%",
									cy: "35%",
									r: "60%",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#ff4d4d"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "35%",
											stopColor: "#e60000"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "70%",
											stopColor: "#990000"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "#4a0000"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "arteryGlow",
									x1: "0%",
									y1: "0%",
									x2: "100%",
									y2: "100%",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#ff6666"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "50%",
											stopColor: "#b30000"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "#330000"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "pulmonaryBlue",
									x1: "0%",
									y1: "0%",
									x2: "100%",
									y2: "100%",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#3b82f6"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "50%",
											stopColor: "#1d4ed8"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "#1e3a8a"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
									id: "specular-highlight",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feSpecularLighting", {
										result: "specOut",
										specularExponent: "20",
										lightingColor: "#ffffff",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("fePointLight", {
											x: "40",
											y: "30",
											z: "80"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feComposite", {
										in: "SourceGraphic",
										in2: "specOut",
										operator: "arithmetic",
										k1: "0",
										k2: "1",
										k3: "1",
										k4: "0"
									})]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 46,24 C 44,14 55,14 53,24 Z",
								fill: "url(#pulmonaryBlue)",
								stroke: "#1e3a8a",
								strokeWidth: "0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 52,24 C 50,15 59,16 57,25 Z",
								fill: "url(#pulmonaryBlue)",
								stroke: "#1e3a8a",
								strokeWidth: "0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 38,28 C 34,10 52,8 50,22",
								fill: "none",
								stroke: "url(#arteryGlow)",
								strokeWidth: "6",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 42,12 L 42,6",
								fill: "none",
								stroke: "url(#arteryGlow)",
								strokeWidth: "2.5",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 47,13 L 49,7",
								fill: "none",
								stroke: "url(#arteryGlow)",
								strokeWidth: "2.2",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 64,28 C 64,18 70,18 70,35",
								fill: "none",
								stroke: "url(#pulmonaryBlue)",
								strokeWidth: "4",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 50,30 \n                 C 20,24 14,48 30,68 \n                 C 40,78 48,88 50,90 \n                 C 52,88 60,78 70,68 \n                 C 86,48 80,24 50,30 Z",
								fill: "url(#heart3d)",
								stroke: "#4a0000",
								strokeWidth: "1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 32,38 C 24,44 22,54 30,62",
								fill: "none",
								stroke: "#ffffff",
								strokeWidth: "1.5",
								strokeLinecap: "round",
								opacity: "0.35",
								style: { filter: "blur(1px)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 66,38 C 72,44 74,54 68,62",
								fill: "none",
								stroke: "#ffffff",
								strokeWidth: "1",
								strokeLinecap: "round",
								opacity: "0.2",
								style: { filter: "blur(1px)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 50,30 Q 44,45 36,54",
								fill: "none",
								stroke: "#ff9999",
								strokeWidth: "0.8",
								opacity: "0.4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 50,30 Q 56,48 64,58",
								fill: "none",
								stroke: "#ff9999",
								strokeWidth: "0.8",
								opacity: "0.3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 36,54 Q 38,62 44,72",
								fill: "none",
								stroke: "#990000",
								strokeWidth: "0.6",
								opacity: "0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M 50,52 Q 46,65 50,80",
								fill: "none",
								stroke: "#ff6666",
								strokeWidth: "0.5",
								opacity: "0.4"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 mix-blend-overlay" })
		]
	});
};
//#endregion
//#region src/components/MphakatiOverwatch.tsx
var INITIAL_STATE = {
	organization: {
		id: "SL-LAPE-3027",
		name: "Lenasia South Mphakati Overwatch"
	},
	financialEngine: {
		iTagProvisionFee: 145,
		donorMonthlySub: 55,
		gatewayBaseFee: 2,
		gatewayPercentage: 3,
		volunteerStipendSplit: 49,
		platformMaintenanceSplit: 1
	},
	watchers: [{
		id: "W-001",
		name: "Sipho Ndlovu",
		idNumber: "8501015000000",
		beat: "Sector 1 - North",
		status: "CLEARED"
	}, {
		id: "W-002",
		name: "Thabo Mbeki",
		idNumber: "9202026000000",
		beat: "Sector 2 - East",
		status: "PENDING"
	}],
	abahlali: [
		{
			id: "H-001",
			address: "42 Protea Glen",
			beat: "Sector 1 - North",
			assignedITag: "AA:BB:CC:DD:EE:01",
			isActive: true
		},
		{
			id: "H-002",
			address: "18 Mandela Ave",
			beat: "Sector 2 - East",
			assignedITag: "AA:BB:CC:DD:EE:02",
			isActive: true
		},
		{
			id: "H-003",
			address: "99 Sisulu St",
			beat: "Sector 1 - North",
			assignedITag: "AA:BB:CC:DD:EE:03",
			isActive: true
		}
	]
};
var SECTORS = [
	"Sector 1 - North",
	"Sector 2 - East",
	"Sector 3 - South",
	"Sector 4 - West"
];
function MphakatiOverwatch() {
	const [state, setState] = (0, import_react.useState)(INITIAL_STATE);
	const [newWatcherName, setNewWatcherName] = (0, import_react.useState)("");
	const [newWatcherId, setNewWatcherId] = (0, import_react.useState)("");
	const [newWatcherBeat, setNewWatcherBeat] = (0, import_react.useState)(SECTORS[0]);
	const [newAbahlaliAddress, setNewAbahlaliAddress] = (0, import_react.useState)("");
	const [newAbahlaliBeat, setNewAbahlaliBeat] = (0, import_react.useState)(SECTORS[0]);
	const [newAbahlaliMac, setNewAbahlaliMac] = (0, import_react.useState)("");
	const activeAbahlali = state.abahlali.filter((a) => a.isActive).length;
	const { donorMonthlySub, gatewayBaseFee, gatewayPercentage, volunteerStipendSplit, platformMaintenanceSplit } = state.financialEngine;
	const grossRevenue = donorMonthlySub * activeAbahlali;
	const gatewayAttrition = (donorMonthlySub * (gatewayPercentage / 100) + gatewayBaseFee) * activeAbahlali;
	const netOperationalPool = grossRevenue - gatewayAttrition;
	const totalWatcherStipends = activeAbahlali * volunteerStipendSplit;
	const platformOverhead = activeAbahlali * platformMaintenanceSplit;
	const isCodeRed = netOperationalPool < totalWatcherStipends + platformOverhead;
	const handleUpdateSub = (val) => {
		setState((s) => ({
			...s,
			financialEngine: {
				...s.financialEngine,
				donorMonthlySub: val
			}
		}));
	};
	const toggleWatcherStatus = (id) => {
		setState((s) => ({
			...s,
			watchers: s.watchers.map((w) => w.id === id ? {
				...w,
				status: w.status === "CLEARED" ? "PENDING" : "CLEARED"
			} : w)
		}));
	};
	const handleAddWatcher = (e) => {
		e.preventDefault();
		if (!newWatcherName || !newWatcherId) return;
		const newWatcher = {
			id: `W-${Math.floor(1e3 + Math.random() * 9e3)}`,
			name: newWatcherName,
			idNumber: newWatcherId,
			beat: newWatcherBeat,
			status: "PENDING"
		};
		setState((s) => ({
			...s,
			watchers: [...s.watchers, newWatcher]
		}));
		setNewWatcherName("");
		setNewWatcherId("");
	};
	const handleAddAbahlali = (e) => {
		e.preventDefault();
		if (!newAbahlaliAddress || !newAbahlaliMac) return;
		const newAba = {
			id: `H-${Math.floor(1e3 + Math.random() * 9e3)}`,
			address: newAbahlaliAddress,
			beat: newAbahlaliBeat,
			assignedITag: newAbahlaliMac,
			isActive: true
		};
		setState((s) => ({
			...s,
			abahlali: [...s.abahlali, newAba]
		}));
		setNewAbahlaliAddress("");
		setNewAbahlaliMac("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-black min-h-screen text-slate-300 font-mono p-4 sm:p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-6 h-6 text-emerald-500" }), state.organization.name]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] text-slate-500 uppercase tracking-widest mt-1",
						children: ["Sector Induna Control Room • Terminal ID: ", state.organization.id]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 md:mt-0 flex items-center gap-4 text-xs font-bold bg-slate-900 px-4 py-2 rounded-sm border border-slate-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-400",
							children: "STATUS:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-emerald-500 flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), " ONLINE"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-black text-slate-100 uppercase tracking-widest border-l-4 border-emerald-500 pl-2",
						children: "Module A: Tactical Operations Math (Stipend Drop)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-900 border border-slate-800 p-4 rounded-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] uppercase tracking-widest text-slate-400 block mb-2",
										children: "Adjust Donor Monthly Sub (ZAR)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											min: "20",
											max: "200",
											step: "5",
											value: donorMonthlySub,
											onChange: (e) => handleUpdateSub(parseFloat(e.target.value)),
											className: "w-full max-w-md accent-emerald-500"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-emerald-400 font-bold text-lg border-b border-emerald-900 px-2",
											children: ["R ", donorMonthlySub.toFixed(2)]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-950 px-4 py-2 border border-slate-800 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase text-slate-500 mb-1",
										children: "Active Abahlali"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-black text-white",
										children: activeAbahlali
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-950 p-3 border border-slate-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[9px] uppercase text-slate-500 mb-1",
											children: "Gross Revenue"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-emerald-500 font-bold",
											children: ["R ", grossRevenue.toFixed(2)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-950 p-3 border border-slate-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[9px] uppercase text-slate-500 mb-1",
											children: "Gateway Attrition"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-rose-500 font-bold",
											children: ["R ", gatewayAttrition.toFixed(2)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-950 p-3 border border-slate-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[9px] uppercase text-slate-500 mb-1",
											children: "Net Ops Pool"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-cyan-400 font-bold",
											children: ["R ", netOperationalPool.toFixed(2)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-950 p-3 border border-slate-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[9px] uppercase text-slate-500 mb-1",
											children: "Total Stipends"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-amber-400 font-bold",
											children: ["R ", totalWatcherStipends.toFixed(2)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-950 p-3 border border-slate-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[9px] uppercase text-slate-500 mb-1",
											children: "Platform Overhead"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-slate-300 font-bold",
											children: ["R ", platformOverhead.toFixed(2)]
										})]
									})
								]
							}),
							isCodeRed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-rose-950/40 border border-rose-500/50 p-3 flex items-start gap-3 animate-pulse",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-5 h-5 text-rose-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-black text-rose-500 uppercase",
									children: "CODE RED: GATEWAY ATTRITION EXCEEDS STIPEND TARGETS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-rose-400 uppercase mt-1",
									children: "Adjust Subscription Tier to ensure Ivolontiya receive full compensation."
								})] })]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-black text-slate-100 uppercase tracking-widest border-l-4 border-amber-500 pl-2",
							children: "Module B: Ivolontiya Matrix"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-900 border border-slate-800 rounded-sm overflow-hidden flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 border-b border-slate-800 bg-slate-950",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-[10px] font-bold uppercase text-slate-400 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-3 h-3" }), " Enlist New Block Watcher"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleAddWatcher,
									className: "mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Full Name",
											value: newWatcherName,
											onChange: (e) => setNewWatcherName(e.target.value),
											required: true,
											className: "bg-black border border-slate-800 p-2 text-xs text-white outline-none focus:border-amber-500"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "ID Number",
											value: newWatcherId,
											onChange: (e) => setNewWatcherId(e.target.value),
											required: true,
											className: "bg-black border border-slate-800 p-2 text-xs text-white outline-none focus:border-amber-500"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: newWatcherBeat,
											onChange: (e) => setNewWatcherBeat(e.target.value),
											className: "bg-black border border-slate-800 p-2 text-xs text-white outline-none focus:border-amber-500",
											children: SECTORS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: s,
												children: s
											}, s))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											className: "bg-amber-600 hover:bg-amber-500 text-black font-black uppercase text-[10px] p-2 transition-colors",
											children: "Enlist"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-slate-950 text-[9px] uppercase tracking-widest text-slate-500 border-b border-slate-800",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Watcher Name"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "ID Number"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Beat"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3 text-right",
												children: "Clearance"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-slate-800/50",
										children: state.watchers.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-slate-800/20 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 font-bold text-slate-200",
													children: w.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 text-slate-400",
													children: w.idNumber
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 text-slate-400",
													children: w.beat
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 text-right",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => toggleWatcherStatus(w.id),
														className: `inline-flex items-center gap-1 px-2 py-1 text-[9px] uppercase font-bold border rounded-sm transition-colors ${w.status === "CLEARED" ? "bg-emerald-950/30 text-emerald-400 border-emerald-500/30 hover:bg-emerald-900/50" : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"}`,
														children: [w.status === "CLEARED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3 h-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-3 h-3" }), w.status]
													})
												})
											]
										}, w.id))
									})]
								})
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-black text-slate-100 uppercase tracking-widest border-l-4 border-cyan-500 pl-2",
								children: "Module C: ITag Provisioning"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-900 border border-slate-800 p-4 rounded-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-[10px] font-bold uppercase text-slate-400 flex items-center gap-2 mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-3 h-3" }), " Provision ITag to Abahlali"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleAddAbahlali,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[9px] uppercase text-slate-500 block mb-1",
											children: "Street Address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "e.g. 102 Vilikazi St",
											value: newAbahlaliAddress,
											onChange: (e) => setNewAbahlaliAddress(e.target.value),
											required: true,
											className: "w-full bg-black border border-slate-800 p-2 text-xs text-white outline-none focus:border-cyan-500"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[9px] uppercase text-slate-500 block mb-1",
											children: "Assigned Beat"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: newAbahlaliBeat,
											onChange: (e) => setNewAbahlaliBeat(e.target.value),
											className: "w-full bg-black border border-slate-800 p-2 text-xs text-white outline-none focus:border-cyan-500",
											children: SECTORS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: s,
												children: s
											}, s))
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-950 p-3 border border-slate-800",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[9px] uppercase text-cyan-500 font-bold block mb-1",
													children: "Scan/Enter iTag BLE MAC"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													placeholder: "AA:BB:CC:DD:EE:FF",
													value: newAbahlaliMac,
													onChange: (e) => setNewAbahlaliMac(e.target.value.toUpperCase()),
													required: true,
													className: "w-full bg-black border border-slate-800 p-2 text-xs font-mono text-cyan-400 outline-none focus:border-cyan-500"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[9px] text-slate-500 mt-2 uppercase tracking-wider text-right",
													children: ["Provisioning Fee: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-cyan-400",
														children: ["R ", state.financialEngine.iTagProvisionFee.toFixed(2)]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											className: "w-full bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase text-[10px] p-3 transition-colors flex justify-center items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-4 h-4" }), " Commit to Ledger"]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-900 border border-slate-800 p-4 rounded-sm max-h-[250px] overflow-y-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-[10px] font-bold uppercase text-slate-400 mb-2",
									children: "Abahlali Ledger"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: state.abahlali.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-[10px] bg-slate-950 p-2 border border-slate-800/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-slate-300 font-bold",
											children: a.address
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-slate-500",
											children: a.beat
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-cyan-500 font-mono",
												children: a.assignedITag
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-emerald-500 uppercase",
												children: "Active"
											})]
										})]
									}, a.id))
								})]
							})
						]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/NodeMeshOrchestration.tsx
var import_leaflet_src = /* @__PURE__ */ __toESM(require_leaflet_src(), 1);
delete import_leaflet_src.default.Icon.Default.prototype._getIconUrl;
import_leaflet_src.default.Icon.Default.mergeOptions({
	iconUrl: marker_icon_default,
	iconRetinaUrl: marker_icon_2x_default,
	shadowUrl: marker_shadow_default
});
var NodeMeshOrchestration = () => {
	const [isScanning, setIsScanning] = (0, import_react.useState)(false);
	const [connectedNodes, setConnectedNodes] = (0, import_react.useState)([]);
	const [viewMode, setViewMode] = (0, import_react.useState)("map");
	const baseLat = -26.2041;
	const baseLng = 28.0473;
	const handleScanMesh = () => {
		setIsScanning(true);
		setTimeout(() => {
			setConnectedNodes([
				{
					id: "node-primary",
					name: "Primary Sector Relay (Base)",
					status: "active",
					strength: 100,
					type: "BaseStation",
					lat: baseLat,
					lng: baseLng
				},
				{
					id: "node-02",
					name: "Vehicle Node 2",
					status: "active",
					strength: 75,
					type: "VehicleRelay",
					lat: -26.2061,
					lng: 28.0503
				},
				{
					id: "node-03",
					name: "Sector 3 Personnel",
					status: "intermittent",
					strength: 45,
					type: "Wearable",
					lat: -26.2026,
					lng: 28.0453
				},
				{
					id: "node-delta",
					name: "Delta Forward Beacon",
					status: "active",
					strength: 82,
					type: "Repeater",
					lat: -26.2046,
					lng: 28.0523
				},
				{
					id: "node-echo",
					name: "Echo Response Unit",
					status: "offline",
					strength: 0,
					type: "VehicleRelay",
					lat: -26.2011,
					lng: 28.0483
				}
			]);
			setIsScanning(false);
		}, 1500);
	};
	const getCustomIcon = (status, _type) => {
		let color = status === "active" ? "#10b981" : status === "intermittent" ? "#f59e0b" : "#ef4444";
		return import_leaflet_src.default.divIcon({
			className: "bg-transparent",
			html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color};"></div>`,
			iconSize: [14, 14],
			iconAnchor: [7, 7]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6 animate-fadeIn",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-slate-900/50 p-6 rounded-xl border border-slate-800",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-lg font-black text-slate-200 font-mono uppercase tracking-wider mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { className: "w-5 h-5 text-emerald-400" }), "Active Node Mesh Orchestration"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-400 mb-6",
					children: "Deploy, orchestrate, and monitor decentralized peer-to-peer mesh networks across local BLE/LoRa hardware nodes."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row justify-between gap-4 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleScanMesh,
							disabled: isScanning,
							className: `px-4 py-2 font-bold font-mono text-xs uppercase tracking-wider rounded-lg transition-all ${isScanning ? "bg-emerald-900/50 text-emerald-500 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"}`,
							children: isScanning ? "Scanning Network..." : "Ping Mesh Network"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold font-mono text-xs uppercase tracking-wider rounded-lg border border-slate-700 transition-all",
							children: "Deploy Configuration"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex bg-slate-950 p-1 rounded-lg border border-slate-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setViewMode("map"),
							className: `px-3 py-1 text-xs font-mono font-bold uppercase rounded ${viewMode === "map" ? "bg-slate-800 text-emerald-400" : "text-slate-500 hover:text-slate-300"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "w-4 h-4 inline-block mr-1" }), " Map View"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setViewMode("grid"),
							className: `px-3 py-1 text-xs font-mono font-bold uppercase rounded ${viewMode === "grid" ? "bg-slate-800 text-emerald-400" : "text-slate-500 hover:text-slate-300"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-4 h-4 inline-block mr-1" }), " Status Grid"]
						})]
					})]
				}),
				connectedNodes.length === 0 && !isScanning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-16 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-xl bg-slate-950",
					children: "No active mesh nodes detected. Ping network to discover nearby LoRa/BLE topography."
				}),
				isScanning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-16 text-center text-emerald-500 font-mono text-xs border border-dashed border-emerald-900/50 rounded-xl bg-emerald-950/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-pulse flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { className: "w-5 h-5 animate-spin-slow" }), "Triangulating node telemetrics..."]
					})
				}),
				connectedNodes.length > 0 && !isScanning && viewMode === "grid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
					children: connectedNodes.map((node, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: `w-4 h-4 ${node.status === "offline" ? "text-red-400" : "text-blue-400"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `font-mono text-xs font-bold uppercase ${node.status === "offline" ? "text-red-400" : "text-slate-300"}`,
									children: node.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-2 h-2 rounded-full ${node.status === "active" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : node.status === "intermittent" ? "bg-amber-500 animate-pulse" : "bg-red-500"}` })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center text-[10px] text-slate-500 font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: node.type
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center text-[10px] text-slate-500 font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Signal Strength" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `h-full ${node.status === "offline" ? "bg-red-500" : "bg-emerald-500"}`,
												style: { width: `${node.strength}%` }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: node.status === "offline" ? "text-red-400" : "text-emerald-400",
											children: [node.strength, "%"]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center text-[10px] text-slate-500 font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Coordinates" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-slate-400",
										children: [
											node.lat.toFixed(4),
											", ",
											node.lng.toFixed(4)
										]
									})]
								})
							]
						})]
					}, i))
				}),
				connectedNodes.length > 0 && !isScanning && viewMode === "map" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-[400px] rounded-xl overflow-hidden border border-slate-800 relative z-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapContainer, {
						center: [baseLat, baseLng],
						zoom: 15,
						style: {
							height: "100%",
							width: "100%"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileLayer, {
								url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
								attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors © <a href=\"https://carto.com/attributions\">CARTO</a>"
							}),
							connectedNodes.map((node) => {
								if (node.id === "node-primary") return null;
								const baseNode = connectedNodes.find((n) => n.id === "node-primary");
								if (!baseNode) return null;
								const isOffline = node.status === "offline";
								const color = isOffline ? "#ef4444" : "#10b981";
								const dashArray = isOffline ? "5, 10" : node.status === "intermittent" ? "10, 10" : void 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Polyline, {
									positions: [[baseNode.lat, baseNode.lng], [node.lat, node.lng]],
									pathOptions: {
										color,
										weight: 2,
										dashArray,
										opacity: .6
									}
								}, `link-${node.id}`);
							}),
							connectedNodes.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marker, {
								position: [node.lat, node.lng],
								icon: getCustomIcon(node.status, node.type),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popup, {
									className: "custom-popup",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-mono text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-slate-800 block mb-1",
												children: node.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Type: ", node.type] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Status: ", node.status.toUpperCase()] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												"Signal: ",
												node.strength,
												"%"
											] })
										]
									})
								})
							}, node.id))
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-4 left-4 z-[400] bg-slate-950/80 p-3 rounded-lg border border-slate-800 backdrop-blur font-mono text-[10px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-slate-300 mb-2 uppercase tracking-wider",
							children: "Topology Legend"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "Active Node"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "Intermittent Link"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "Offline Node"
									})]
								})
							]
						})]
					})]
				})
			]
		})
	});
};
//#endregion
//#region src/components/IncidentReportingTemplates.tsx
var IncidentReportingTemplates = () => {
	const [, setActiveTemplate] = (0, import_react.useState)(null);
	const { addToast } = useAppStore();
	const templates = [
		{
			id: "t-1",
			name: "Post-Dispatch Debrief",
			description: "Automated logging of responder dispatch details, timelines, and resolution.",
			color: "blue"
		},
		{
			id: "t-2",
			name: "Hardware Failure Report",
			description: "Template for reporting mesh node disconnections and hardware telemetry failures.",
			color: "amber"
		},
		{
			id: "t-3",
			name: "Severe Security Breach",
			description: "High-priority template for verified physical security breaches.",
			color: "red"
		}
	];
	const handleRunTemplate = (_id) => {
		addToast("Executing automated report generation...", "info");
		setTimeout(() => {
			addToast("Report template populated from telemetry logs.", "success");
			setActiveTemplate(null);
		}, 1500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6 animate-fadeIn",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-slate-900/50 p-6 rounded-xl border border-slate-800",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-lg font-black text-slate-200 font-mono uppercase tracking-wider mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-5 h-5 text-indigo-400" }), "Automated Incident Reporting Templates"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-400 mb-6",
					children: "Standardize incident documentation. Templates automatically inject telemetry, timeline data, and responder metrics."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
					children: templates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-bold text-slate-200 mb-2",
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-slate-400 leading-relaxed mb-4",
							children: t.description
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleRunTemplate(t.id),
							className: `w-full py-2 flex items-center justify-center gap-2 text-xs font-bold font-mono uppercase tracking-wider rounded-lg transition-colors
                  ${t.color === "blue" ? "bg-blue-900/30 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/20" : ""}
                  ${t.color === "amber" ? "bg-amber-900/30 text-amber-400 hover:bg-amber-600 hover:text-white border border-amber-500/20" : ""}
                  ${t.color === "red" ? "bg-red-900/30 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/20" : ""}
                `,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-3 h-3" }), " Execute"]
						})]
					}, t.id))
				})
			]
		})
	});
};
//#endregion
//#region src/components/AdvancedOfflineSyncManager.tsx
var AdvancedOfflineSyncManager = () => {
	const { localOfflineQueue, syncOfflineQueue, addToast, syncStrategy, setSyncStrategy } = useAppStore();
	const [isSyncing, setIsSyncing] = (0, import_react.useState)(false);
	const handleManualSync = () => {
		setIsSyncing(true);
		addToast("Initiating secure offline payload synchronization...", "info");
		setTimeout(() => {
			syncOfflineQueue(false);
			setIsSyncing(false);
		}, 2500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6 animate-fadeIn",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-slate-900/50 p-6 rounded-xl border border-slate-800",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-lg font-black text-slate-200 font-mono uppercase tracking-wider mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-5 h-5 text-blue-400" }), "Offline Mobile Sync Mechanisms"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-400 mb-6",
					children: "Manage robust non-volatile caching and secure synchronization of critical telemetry and incident reports collected during prolonged network outages."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center border-b border-slate-900 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-mono font-bold text-slate-400 uppercase tracking-widest",
									children: "Local Queue Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-2 h-2 rounded-full ${localOfflineQueue.length > 0 ? "bg-amber-500 animate-pulse" : "bg-emerald-500"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-mono text-slate-300",
										children: [localOfflineQueue.length, " Pending"]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 max-h-32 overflow-y-auto pr-2",
								children: localOfflineQueue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-slate-600 font-mono italic text-center py-4",
									children: "Queue is empty. All telemetry synchronized."
								}) : localOfflineQueue.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 bg-slate-900 rounded border border-slate-800 flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono text-slate-400 truncate w-3/4",
										children: item.description
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-mono text-slate-500",
										children: new Date(item.timestamp).toLocaleTimeString()
									})]
								}, item.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleManualSync,
									disabled: isSyncing || localOfflineQueue.length === 0,
									className: `flex-1 py-2 flex items-center justify-center gap-2 text-xs font-bold font-mono uppercase tracking-wider rounded-lg transition-colors
                  ${isSyncing ? "bg-blue-900/50 text-blue-500 cursor-wait" : localOfflineQueue.length > 0 ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-slate-800 text-slate-500 cursor-not-allowed"}
                `,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-3 h-3 ${isSyncing ? "animate-spin" : ""}` }), isSyncing ? "Synchronizing..." : "Force Manual Sync"]
								}), localOfflineQueue.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => useAppStore.setState({ localOfflineQueue: [] }),
									className: "px-4 py-2 flex items-center justify-center text-xs font-bold font-mono uppercase tracking-wider rounded-lg bg-red-900/30 text-red-500 hover:bg-red-900/50 hover:text-red-400 transition-colors border border-red-900/50",
									title: "Clear Offline Queue",
									children: "CLEAR"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-2",
							children: "Sync Strategy Configuration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "syncStrategy",
										value: "batch",
										checked: syncStrategy === "batch",
										onChange: () => setSyncStrategy("batch"),
										className: "mt-1"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold text-slate-200 block uppercase tracking-wider mb-0.5",
										children: "Optimized Batch Sync (Recommended)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-slate-500 leading-tight block",
										children: "Groups payloads to conserve battery and minimize network overhead. Syncs every 15 minutes or when buffer exceeds 5MB."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "syncStrategy",
										value: "immediate",
										checked: syncStrategy === "immediate",
										onChange: () => setSyncStrategy("immediate"),
										className: "mt-1"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold text-slate-200 block uppercase tracking-wider mb-0.5",
										children: "Aggressive Immediate Sync"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-slate-500 leading-tight block",
										children: "Attempts to flush payload immediately upon connection restablishment. High battery impact."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "syncStrategy",
										value: "wifi-only",
										checked: syncStrategy === "wifi-only",
										onChange: () => setSyncStrategy("wifi-only"),
										className: "mt-1"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold text-slate-200 block uppercase tracking-wider mb-0.5",
										children: "Wi-Fi Only Sync"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-slate-500 leading-tight block",
										children: "Defers synchronization of non-critical media and telemetry until a secure Wi-Fi connection is available."
									})] })]
								})
							]
						})]
					})]
				})
			]
		})
	});
};
//#endregion
//#region src/components/MotherboardConsole.tsx
var MotherboardConsole = () => {
	const { currentOrg: storeOrg, currentUser, organizations, users, panicEvents, resolvePanic } = useAppStore();
	const isDownloading = false;
	const currentOrg = storeOrg || (currentUser?.orgCode ? organizations.find((o) => o.id === currentUser.orgCode) : null);
	if (!currentOrg) return null;
	const registeredStudents = users.filter((u) => u.orgCode === currentOrg.id);
	const orgUserIds = new Set(registeredStudents.map((s) => s.username.toLowerCase()));
	const activeOrgPanics = panicEvents.filter((p) => p.status !== "RESOLVED" && (p.description.toLowerCase().includes(currentOrg.name.toLowerCase()) || orgUserIds.has(p.description.split(" ").pop()?.toLowerCase() || "")));
	const prevPanicsRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (activeOrgPanics.length > prevPanicsRef.current) {
			const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
			const oscillator = audioCtx.createOscillator();
			const gainNode = audioCtx.createGain();
			oscillator.type = "square";
			oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
			oscillator.frequency.setValueAtTime(1108.73, audioCtx.currentTime + .3);
			oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + .6);
			oscillator.frequency.setValueAtTime(1108.73, audioCtx.currentTime + .9);
			gainNode.gain.setValueAtTime(.1, audioCtx.currentTime);
			gainNode.gain.exponentialRampToValueAtTime(.001, audioCtx.currentTime + 1.2);
			oscillator.connect(gainNode);
			gainNode.connect(audioCtx.destination);
			oscillator.start();
			oscillator.stop(audioCtx.currentTime + 1.2);
		}
		prevPanicsRef.current = activeOrgPanics.length;
	}, [activeOrgPanics.length]);
	const mapCenter = activeOrgPanics.length > 0 ? [activeOrgPanics[0].lat, activeOrgPanics[0].lng] : [0, 0];
	const handleDownloadClick = async () => {
		try {
			const response = await fetch("https://safetylink-api.tshilidzi-mukwevho54.workers.dev/api/app/latest");
			if (!response.ok) throw new Error("Failed to fetch latest release");
			const exeAsset = (await response.json()).assets.find((asset) => asset.name.endsWith(".exe"));
			if (exeAsset) window.open(exeAsset.browser_download_url, "_blank");
			else {
				alert("No executable found in the latest release. Please check GitHub Releases.");
				window.open("https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/safetylink.apk", "_blank");
			}
		} catch (err) {
			console.error(err);
			alert("Error finding latest executable: " + err.message);
			window.open("https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/safetylink.apk", "_blank");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-[#020617] border border-slate-800 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-y-auto flex flex-col min-h-[calc(100vh-140px)] w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-xl font-black text-slate-200 tracking-widest font-mono",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-blue-500 mr-2",
					children: "🛡️"
				}), "MOTHERBOARD RESPONSE CONSOLE"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-4 font-mono text-[10px] font-bold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleDownloadClick,
						disabled: isDownloading,
						className: "flex items-center gap-2 bg-blue-900/40 hover:bg-blue-800/60 disabled:opacity-50 px-4 py-1.5 rounded-lg border border-blue-500/50 transition-colors text-blue-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "⬇️"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DOWNLOAD DESKTOP CLIENT (.EXE)" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 bg-[#0E1525] px-3 py-1.5 rounded-lg border border-slate-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-blue-400",
							children: "Ocean Blue #0EASE9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 bg-[#020617] px-3 py-1.5 rounded-lg border border-slate-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 bg-slate-500 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-400",
							children: "Tactical Jet Dark #020617"
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6 min-h-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-12 lg:col-span-4 flex flex-col bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden min-h-[350px] lg:min-h-0 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-3 border-b border-slate-800 bg-slate-950/80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-bold text-slate-300 font-mono tracking-widest uppercase",
							children: "GPS Map"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 relative bg-slate-950 z-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapContainer, {
								center: mapCenter,
								zoom: 13,
								style: {
									height: "100%",
									width: "100%"
								},
								zoomControl: false,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileLayer, {
									url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
									attribution: "© <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors © <a href=\"https://carto.com/attributions\">CARTO</a>"
								}), activeOrgPanics.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleMarker, {
									center: [p.lat, p.lng],
									radius: 12,
									pathOptions: {
										color: "#ef4444",
										fillColor: "#ef4444",
										fillOpacity: .5
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popup, {
										className: "font-mono text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-red-600 block",
												children: p.description
											}),
											"ID: ",
											p.id
										]
									})
								}, p.id))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-2 right-2 bg-slate-950/90 border border-slate-800 p-2 rounded-xl backdrop-blur-md z-[1000] flex flex-col gap-1 text-[9px] font-mono shadow-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-slate-300",
											children: [
												"Clients (",
												registeredStudents.filter((u) => u.role === "Community Member" || !u.role).length,
												")"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-slate-300",
											children: [
												"Responders (",
												registeredStudents.filter((u) => u.role === "Responder" || u.role === "Guard").length,
												")"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-slate-300",
											children: [
												"In Distress (",
												activeOrgPanics.length,
												")"
											]
										})]
									})
								]
							}),
							activeOrgPanics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-slate-800 p-3 rounded-xl backdrop-blur-md z-[1000]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-slate-200 text-xs font-bold font-mono uppercase mb-1",
									children: "Active Vector"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-slate-400 font-mono break-all",
									children: [
										"Telemetry coords: ",
										activeOrgPanics[0].lat.toFixed(5),
										", ",
										activeOrgPanics[0].lng.toFixed(5)
									]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-12 lg:col-span-3 flex flex-col min-h-[350px] lg:min-h-0 shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/80 border border-slate-800 rounded-2xl flex-1 flex flex-col overflow-hidden relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-3 border-b border-slate-800 bg-slate-950",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold text-slate-300 font-mono tracking-widest uppercase",
									children: "Active Threat Queue"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 p-6 relative overflow-y-auto overflow-x-hidden",
								children: activeOrgPanics.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative w-full max-w-sm mx-auto mt-4",
									children: activeOrgPanics.slice(0, 4).map((p, index) => {
										const isTop = index === 0;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `absolute w-full bg-gradient-to-br from-red-950 to-[#2c0505] border border-red-500 rounded-xl p-5 shadow-2xl transition-all duration-300 ${isTop ? "z-40 relative shadow-[0_0_30px_rgba(239,68,68,0.3)]" : "z-30 opacity-80"}`,
											style: {
												transform: isTop ? "none" : `translateY(-${index * 12}px) scale(${1 - index * .04})`,
												top: isTop ? "0" : `${index * -20}px`
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 mb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-red-500 animate-pulse text-lg",
													children: "⚠️"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white font-black uppercase text-[11px] tracking-widest drop-shadow-md",
													children: "EXTREME ALERT"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1 text-left font-mono text-[10px]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-slate-300",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-red-400",
															children: "Identity:"
														}),
														" ",
														p.description.split(" by ")[1] || "Unknown"
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-slate-300 truncate",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-red-400",
															children: "Address:"
														}),
														" ",
														p.description.split(" by ")[0] || "Unknown"
													]
												})]
											})]
										}, p.id);
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-center h-full text-slate-500 font-mono text-xs uppercase tracking-widest text-center px-4",
									children: "No Active Threats"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 bg-slate-900/50 border-t border-slate-800 grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono font-bold text-[9px] uppercase tracking-widest rounded-xl transition-colors border border-slate-700 flex items-center justify-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📍" }), " NAV"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 font-mono font-bold text-[9px] uppercase tracking-widest rounded-xl transition-colors border border-slate-700 flex items-center justify-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📞" }), " CALL VICTIM"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => activeOrgPanics.length > 0 && resolvePanic(activeOrgPanics[0].id),
										className: `py-2 font-mono font-bold text-[9px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1 shadow-lg border ${activeOrgPanics.length > 0 ? "bg-emerald-600/90 hover:bg-emerald-500 text-white border-emerald-500" : "bg-slate-800 text-slate-600 border-slate-700 opacity-50 cursor-not-allowed"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✕" }), " CLEAR"]
									})
								]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-12 lg:col-span-3 flex flex-col bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden min-h-[300px] lg:min-h-0 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 border-b border-slate-800 bg-slate-950 flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-bold text-slate-300 font-mono tracking-widest uppercase",
							children: "Field Units"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] font-mono font-bold bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30",
							children: "3 ONLINE"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 flex-1 overflow-y-auto space-y-3",
						children: [
							{
								id: "U-01",
								name: "Unit 1",
								status: "PATROL",
								color: "text-blue-400",
								bg: "bg-blue-400"
							},
							{
								id: "U-02",
								name: "Unit 2 Intercept",
								status: "RESPONDING",
								color: "text-red-400",
								bg: "bg-red-400"
							},
							{
								id: "U-Delta",
								name: "Delta Overwatch",
								status: "STATIONARY",
								color: "text-emerald-400",
								bg: "bg-emerald-400"
							}
						].map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] font-bold text-slate-200 font-mono",
								children: unit.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[9px] text-slate-500 font-mono mt-1",
								children: ["ID: ", unit.id]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `flex items-center gap-1.5 text-[9px] font-mono font-bold ${unit.color}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${unit.bg} animate-pulse` }), unit.status]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[8px] text-slate-600 font-mono mt-1",
									children: "GPS LINK SECURE"
								})]
							})]
						}, unit.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-12 lg:col-span-2 flex flex-col bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden min-h-[300px] lg:min-h-0 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 border-b border-slate-800 bg-slate-950",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-bold text-slate-300 font-mono tracking-widest uppercase",
								children: "System Status"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 space-y-6 flex-1 overflow-y-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-[9px] font-mono font-bold text-cyan-500 uppercase tracking-wider",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Data Throughput" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "30%" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-1.5 bg-slate-800 rounded-full overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full bg-cyan-500 w-[30%]" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-[9px] font-mono font-bold text-cyan-500 uppercase tracking-wider",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Data Throughput" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-400",
													children: "3868 / 1000/s"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-1.5 bg-slate-800 rounded-full overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full bg-cyan-500 w-[75%]" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-[9px] font-mono font-bold text-cyan-500 uppercase tracking-wider",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Data Throughput" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-400",
													children: "5046 / 1500/s"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-1.5 bg-slate-800 rounded-full overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full bg-cyan-500 w-[45%]" })
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 pt-4 border-t border-slate-800",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest",
											children: "Global Actions"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => alert("Initiating Global Lockdown protocol..."),
											className: "w-full py-2 bg-red-900/50 hover:bg-red-800/80 border border-red-500/50 text-red-400 text-[9px] font-bold font-mono tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2",
											children: "⚠️ INITIATE LOCKDOWN"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => alert("Broadcasting alert to all nodes..."),
											className: "w-full py-2 bg-amber-900/50 hover:bg-amber-800/80 border border-amber-500/50 text-amber-400 text-[9px] font-bold font-mono tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2",
											children: "📢 BROADCAST ALERT"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 pt-4 border-t border-slate-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest",
										children: "System Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-[10px] font-mono text-slate-500",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" }), "Core Telemetry"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-500 font-bold",
											children: "ONLINE"
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 bg-slate-900 border-t border-slate-800 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[8px] font-mono font-bold text-slate-500 tracking-widest uppercase",
								children: "NASA-GRADE UDP SERVER"
							})
						})
					]
				})
			]
		})]
	});
};
//#endregion
//#region src/components/GeospatialAnalytics.tsx
var GeospatialAnalytics = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-bold text-white font-mono uppercase tracking-wider",
				children: "// Geospatial Telemetry & Analytics"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate-400",
				children: "Live spatial triangulation and regional incident cluster heatmaps"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
				children: "MESH ACTIVE"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl overflow-hidden border border-slate-800 min-h-[360px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineMap, {})
		})]
	});
};
//#endregion
//#region src/components/OrgDashboard.tsx
var OrgDashboard = () => {
	const { currentOrg: storeOrg, currentUser, organizations, users, logout, updateUserProfile, deleteUserProfile, panicEvents, customTools, addCustomTool, deleteCustomTool, updateOrgBranding, updateClientProfile, localOfflineQueue, syncOfflineQueue, approvePendingUser, rejectPendingUser, generateReferralCode, isTrialEnabled } = useAppStore();
	const [cctvViewMode, setCctvViewMode] = (0, import_react.useState)("LIVE");
	const currentOrg = storeOrg || (currentUser?.orgCode ? organizations.find((o) => o.id === currentUser.orgCode) : null);
	const isResponder = currentUser?.role === "Responder";
	const [orgReferralCode, setOrgReferralCode] = (0, import_react.useState)(currentOrg?.referralCode || "");
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [activeSubTab, setActiveSubTab] = (0, import_react.useState)("dispatch");
	const [copiedOrgCode, setCopiedOrgCode] = (0, import_react.useState)(false);
	const [serverJoinRequests, setServerJoinRequests] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const orgId = currentOrg?.id;
		const token = useAppStore.getState().token;
		const customUrl = useAppStore.getState().customBackendUrl;
		if (!orgId || !token || isResponder) return;
		const bases = [
			customUrl,
			PRIMARY_BACKEND_URL,
			FALLBACK_BACKEND_URL
		].filter(Boolean);
		(async () => {
			for (const base of bases) try {
				const res = await fetch(`${base.replace(/\/$/, "")}/api/org/${encodeURIComponent(orgId)}/join-requests`, { headers: { Authorization: `Bearer ${token}` } });
				if (res.ok) {
					const data = await res.json();
					setServerJoinRequests(Array.isArray(data?.requests) ? data.requests : []);
					break;
				}
			} catch {}
		})();
	}, [
		currentOrg?.id,
		activeSubTab,
		isResponder
	]);
	const [editingUserId, setEditingUserId] = (0, import_react.useState)(null);
	const [editFullName, setEditFullName] = (0, import_react.useState)("");
	const [editPhone, setEditPhone] = (0, import_react.useState)("");
	const [editEmail, setEditEmail] = (0, import_react.useState)("");
	const [editAccountNumber, setEditAccountNumber] = (0, import_react.useState)("");
	const [editMedicalInfo, setEditMedicalInfo] = (0, import_react.useState)("");
	const [editRiskNotes, setEditRiskNotes] = (0, import_react.useState)("");
	const [editOfficer, setEditOfficer] = (0, import_react.useState)("");
	const [editHospital, setEditHospital] = (0, import_react.useState)("");
	const [editAddress, setEditAddress] = (0, import_react.useState)("");
	const [editContactsList, setEditContactsList] = (0, import_react.useState)("");
	const [brandLogoUrl, setBrandLogoUrl] = (0, import_react.useState)(currentOrg?.logoUrl || "https://res.cloudinary.com/qcp4fx2v/image/upload/f_auto,q_auto/v1787313194/Safety_Link_Logo_Black_1.png");
	const [brandPrimaryColor, setBrandPrimaryColor] = (0, import_react.useState)(currentOrg?.primaryColor || "#10b981");
	const [brandSecondaryColor, setBrandSecondaryColor] = (0, import_react.useState)(currentOrg?.secondaryColor || "#06b6d4");
	const [brandControlRoomNumber, setBrandControlRoomNumber] = (0, import_react.useState)(currentOrg?.controlRoomNumber || "+27829110000");
	const [brandEscalationPolicy, setBrandEscalationPolicy] = (0, import_react.useState)(currentOrg?.escalationPolicy || "Multi-stage fallback SMS alert sequence -> Dedicated Sector Response dispatch -> Escalation to Municipal SAPS.");
	const [newToolTitle, setNewToolTitle] = (0, import_react.useState)("");
	const [newToolDesc, setNewToolDesc] = (0, import_react.useState)("");
	const [newToolType, setNewToolType] = (0, import_react.useState)("INFO");
	const [newToolValue, setNewToolValue] = (0, import_react.useState)("");
	const [ntfyTopic, setNtfyTopic] = (0, import_react.useState)(currentOrg?.ntfy?.topic || "");
	const [ntfyServerUrl, setNtfyServerUrl] = (0, import_react.useState)(currentOrg?.ntfy?.serverUrl || "");
	const [ownCloudServerUrl, setOwnCloudServerUrl] = (0, import_react.useState)(currentOrg?.ownCloud?.serverUrl || "");
	const [ownCloudUsername, setOwnCloudUsername] = (0, import_react.useState)(currentOrg?.ownCloud?.username || "");
	const [ownCloudToken, setOwnCloudToken] = (0, import_react.useState)(currentOrg?.ownCloud?.token || "");
	const [ownCloudFolder, setOwnCloudFolder] = (0, import_react.useState)(currentOrg?.ownCloud?.folder || "safetylink-evidence");
	const [ssUdpHost, setSsUdpHost] = (0, import_react.useState)(currentOrg?.sensorStream?.udpHost || "192.168.1.100");
	const [ssUdpPort, setSsUdpPort] = (0, import_react.useState)(currentOrg?.sensorStream?.udpPort ? currentOrg?.sensorStream?.udpPort.toString() : "5005");
	const [ssEnabled, setSsEnabled] = (0, import_react.useState)(currentOrg?.sensorStream?.enabled || false);
	const registeredStudents = (0, import_react.useMemo)(() => users.filter((u) => u.orgCode === currentOrg?.id), [users, currentOrg?.id]);
	const filteredStudents = (0, import_react.useMemo)(() => registeredStudents.filter((u) => u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || u.username.toLowerCase().includes(searchTerm.toLowerCase()) || u.phone.includes(searchTerm)), [registeredStudents, searchTerm]);
	const activeReferralCode = currentOrg?.referralCode || orgReferralCode;
	const referredUsers = (0, import_react.useMemo)(() => {
		if (!activeReferralCode) return [];
		const upperCode = activeReferralCode.toUpperCase();
		return users.filter((u) => u.referredByCode?.toUpperCase() === upperCode);
	}, [users, activeReferralCode]);
	const activeOrgPanics = (0, import_react.useMemo)(() => {
		if (!currentOrg) return [];
		const orgUserIds = new Set(registeredStudents.map((s) => s.username.toLowerCase()));
		return panicEvents.filter((p) => p.status !== "RESOLVED" && (p.description.toLowerCase().includes(currentOrg.name.toLowerCase()) || orgUserIds.has(p.description.split(" ").pop()?.toLowerCase() || "")));
	}, [
		panicEvents,
		currentOrg?.name,
		registeredStudents
	]);
	if (!currentOrg) return null;
	const handleEditClick = (student) => {
		setEditingUserId(student.id);
		setEditFullName(student.fullName);
		setEditPhone(student.phone);
		setEditEmail(student.email);
		setEditAccountNumber(student.accountNumber || `SL-ACC-${Math.floor(1e4 + Math.random() * 9e4)}`);
		setEditMedicalInfo(student.medicalInfo || "No chronic conditions logged.");
		setEditRiskNotes(student.riskNotes || "Standard perimeter monitoring.");
		setEditOfficer(student.assignedResponseOfficer || "Unassigned");
		setEditHospital(student.preferredHospital || "Netcare Milpark Hospital");
		setEditAddress(student.homeAddress || "Not specified");
		setEditContactsList(student.emergencyContactsList || "+27839110000, +27117171000");
	};
	const handleSaveEdit = (id) => {
		updateUserProfile(id, {
			fullName: editFullName,
			phone: editPhone,
			email: editEmail
		});
		updateClientProfile(id, {
			accountNumber: editAccountNumber,
			medicalInfo: editMedicalInfo,
			riskNotes: editRiskNotes,
			assignedResponseOfficer: editOfficer,
			preferredHospital: editHospital,
			homeAddress: editAddress,
			emergencyContactsList: editContactsList
		});
		setEditingUserId(null);
	};
	const handleSaveBranding = (e) => {
		e.preventDefault();
		updateOrgBranding({
			logoUrl: brandLogoUrl,
			primaryColor: brandPrimaryColor,
			secondaryColor: brandSecondaryColor,
			controlRoomNumber: brandControlRoomNumber,
			escalationPolicy: brandEscalationPolicy
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-screen max-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden pb-4 relative",
		children: [
			activeSubTab === "dispatch" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalRadarBackground, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				autoPlay: true,
				muted: true,
				loop: true,
				playsInline: true,
				className: "absolute inset-0 w-full h-full object-cover z-0 pointer-events-none brightness-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					src: "https://res.cloudinary.com/qcp4fx2v/video/upload/f_auto,q_auto/v1787310204/Now_let_s_show_how_kids_would.mp4",
					type: "video/mp4"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0 pointer-events-none overflow-hidden select-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowingHeartBackground, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]" })]
			}),
			activeOrgPanics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full bg-red-600 text-white font-mono text-xs font-bold text-center py-2.5 px-4 tracking-wider uppercase animate-pulse flex items-center justify-center gap-2 relative z-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🚨 ALERT: CRITICAL SOS SIGNAL DETECTED FROM ASSIGNED SUBSCRIBER NODE 🚨" })
			}),
			isTrialEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full bg-amber-600/90 text-white font-mono text-[10px] font-bold text-center py-1.5 px-4 tracking-wider uppercase flex items-center justify-center gap-2 relative z-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⚠️ 14-DAY ORGANIZATION TRIAL ACTIVE — YOU HAVE 14 DAYS LEFT ⚠️" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "bg-white/20 hover:bg-white/30 px-3 py-0.5 rounded ml-2 transition-colors",
					children: "UPGRADE TO PRO"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "bg-slate-900 border-b border-slate-900/80 py-4 px-6 flex flex-col sm:flex-row justify-between items-center shadow-lg relative gap-3 z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-0 left-0 right-0 h-1",
						style: { backgroundImage: `linear-gradient(to right, ${brandPrimaryColor}, ${brandSecondaryColor})` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 text-left",
						children: [brandLogoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: brandLogoUrl,
							alt: "Org Logo",
							className: "w-16 h-16 rounded-2xl border object-cover border-slate-700 shadow-md",
							onError: () => setBrandLogoUrl("")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoSetPart, {
							part: "accent",
							size: 68,
							rounded: "2xl"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-sm font-black tracking-wider text-slate-100 uppercase font-mono flex flex-wrap items-center gap-2",
							children: [
								currentOrg.name,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8.5px] px-2 py-0.5 rounded-full text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 font-bold font-mono",
									children: "ACTIVE COMMAND NODE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										navigator.clipboard?.writeText(currentOrg.id).catch(() => {});
										setCopiedOrgCode(true);
										useAppStore.getState().addToast(`Copied Organization Code: ${currentOrg.id}`, "success");
										setTimeout(() => setCopiedOrgCode(false), 2e3);
									},
									className: "text-[9px] px-2.5 py-0.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-mono font-black tracking-wider cursor-pointer transition-colors",
									title: "Copy Organization Code to share with members",
									children: [
										currentOrg.id,
										" · ",
										copiedOrgCode ? "COPIED ✓" : "COPY CODE"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[9px] text-slate-400 font-mono uppercase tracking-widest mt-0.5",
							children: ["Secure Safety Link Dispatcher Deck // ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-amber-500/80 font-black",
								children: "POWERED BY TM MEDIA SOLUTIONS"
							})]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-850",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveSubTab("dispatch"),
								className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all ${activeSubTab === "dispatch" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"}`,
								children: "🛰️ Dispatch Control"
							}),
							!isResponder && (() => {
								const pendingCount = users.filter((u) => u.pendingOrgCode === currentOrg?.id).length + serverJoinRequests.filter((sr) => !users.some((u) => u.pendingOrgCode === currentOrg?.id && (u.id === sr.user_id || u.username === sr.username))).length;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setActiveSubTab("roster"),
									className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all flex items-center gap-1.5 ${activeSubTab === "roster" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "👥 Clients / Profiles" }), pendingCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[8px] font-black",
										children: pendingCount
									})]
								});
							})(),
							!isResponder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveSubTab("branding"),
								className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all ${activeSubTab === "branding" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"}`,
								children: "🎨 branding & SLA"
							}),
							!isResponder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveSubTab("workspace"),
								className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all ${activeSubTab === "workspace" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"}`,
								children: "🏢 Google Workspace"
							}),
							!isResponder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveSubTab("open-platforms"),
								className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all ${activeSubTab === "open-platforms" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"}`,
								children: "🔌 Open Platforms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveSubTab("cctv"),
								className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all ${activeSubTab === "cctv" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"}`,
								children: "📷 CCTV / Hikvision"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveSubTab("live-gis"),
								className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all ${activeSubTab === "live-gis" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"}`,
								children: "🗺️ Live GIS Map"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveSubTab("mphakati-overwatch"),
								className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all ${activeSubTab === "mphakati-overwatch" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"}`,
								children: "🛡️ Mphakati Overwatch"
							}),
							!isResponder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveSubTab("mesh-orchestration"),
								className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all ${activeSubTab === "mesh-orchestration" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"}`,
								children: "📡 Mesh Orchestration"
							}),
							!isResponder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveSubTab("incident-reporting"),
								className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all ${activeSubTab === "incident-reporting" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"}`,
								children: "📄 Incident Templates"
							}),
							!isResponder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveSubTab("offline-sync"),
								className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all ${activeSubTab === "offline-sync" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"}`,
								children: "🔄 Offline Sync"
							}),
							!isResponder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveSubTab("analytics"),
								className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all ${activeSubTab === "analytics" ? "bg-slate-900 text-white border border-slate-800" : "text-slate-500 hover:text-slate-300"}`,
								children: "📈 Operations Analytics"
							}),
							!isResponder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveSubTab("referrals"),
								className: `px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded-lg transition-all ${activeSubTab === "referrals" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "text-slate-500 hover:text-amber-300"}`,
								children: "🎟️ Referrals"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: logout,
						className: "px-3.5 py-1.5 bg-slate-850 hover:bg-slate-850 hover:text-red-400 text-slate-400 transition-colors text-[9px] font-mono font-black rounded-lg border border-slate-800 uppercase",
						children: "Exit Session"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 overflow-y-auto min-h-0 max-w-5xl w-full mx-auto p-4 space-y-5 relative z-10",
				children: [
					localOfflineQueue.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 bg-amber-950/20 border border-amber-500/20 rounded-2xl flex justify-between items-center gap-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-xs font-bold text-amber-400 uppercase font-mono",
							children: [
								"⚠️ Local Offline Alerts Pending Sync (",
								localOfflineQueue.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-slate-400 mt-0.5",
							children: "Simulated localized alerts queued in local cache. Force synchronization to dump events into control deck telemetry maps."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => syncOfflineQueue(),
							className: "px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-mono font-black text-[9px] rounded-lg transition-all uppercase",
							children: "Sync Offline Queue"
						})]
					}),
					activeSubTab === "dispatch" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-fadeIn",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotherboardConsole, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 pt-4 border-t border-slate-900/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-black text-slate-300 font-mono uppercase tracking-wider",
									children: "🛠️ Subscriber Tools Customization"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10.5px] text-slate-500 mt-0.5",
									children: "Inject quick-trigger icons, speed dial numbers, or regional guidance directly into your clients' mobile apps."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-900/20 border border-slate-900 rounded-2xl p-4 space-y-3.5 md:col-span-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-mono font-black uppercase text-cyan-400 block tracking-wider",
										children: "Push New Client Tool"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2.5 text-xs font-mono",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[8px] text-slate-500 font-bold block mb-1",
												children: "TOOL TITLE"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												placeholder: "e.g. Campus Police Line",
												value: newToolTitle,
												onChange: (e) => setNewToolTitle(e.target.value),
												className: "w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-200"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[8px] text-slate-500 font-bold block mb-1",
												children: "DESCRIPTION"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												placeholder: "e.g. Directly connects to our 24/7 sector patrol dispatch room.",
												value: newToolDesc,
												onChange: (e) => setNewToolDesc(e.target.value),
												rows: 2,
												className: "w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-200 resize-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[8px] text-slate-500 font-bold block mb-1",
												children: "ACTION TYPE"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: newToolType,
												onChange: (e) => setNewToolType(e.target.value),
												className: "w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-300 font-sans",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "INFO",
														children: "INFORMATION CARD"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "WHATSAPP",
														children: "WHATSAPP BROADCAST"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "CALL",
														children: "SPEED DIAL DIALER"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "SMS",
														children: "SMS BINDING"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "WIDGET",
														children: "WEB PORTAL MODULAR"
													})
												]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[8px] text-slate-500 font-bold block mb-1",
												children: "ACTION VALUE / PARAMETER"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												placeholder: newToolType === "WHATSAPP" || newToolType === "SMS" ? "e.g. Distress at GPS: {LAT},{LNG}" : newToolType === "CALL" ? "e.g. +27711234567" : "e.g. Action parameter value",
												value: newToolValue,
												onChange: (e) => setNewToolValue(e.target.value),
												className: "w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-200"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													if (!newToolTitle.trim()) return alert("Please write a title.");
													addCustomTool({
														title: newToolTitle,
														description: newToolDesc,
														type: newToolType,
														targetValue: newToolValue,
														targetOrgId: currentOrg.id
													});
													setNewToolTitle("");
													setNewToolDesc("");
													setNewToolValue("");
												},
												className: "w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-[9px] tracking-wider uppercase transition-all font-mono",
												children: "Publish Custom Tool"
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-900/20 border border-slate-900 rounded-2xl p-4 space-y-4 md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-mono font-black uppercase text-slate-400 block tracking-wider",
										children: "Published Active Tools"
									}), customTools.filter((t) => t.targetOrgId === currentOrg.id).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-10 border border-dashed border-slate-850 rounded-xl text-center flex flex-col items-center justify-center h-[200px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10.5px] text-slate-500 font-mono",
											children: "No active custom tools configured for your subscribers."
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-3 max-h-[300px] overflow-y-auto pr-1",
										children: customTools.filter((t) => t.targetOrgId === currentOrg.id).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 bg-slate-950 border border-slate-900 rounded-xl flex justify-between items-start gap-3 shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1 text-left",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-bold text-slate-100",
															children: t.title
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[8px] font-mono font-black px-1.5 py-0.5 bg-cyan-950/20 text-cyan-400 rounded border border-cyan-500/10",
															children: t.type
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-slate-400 leading-relaxed",
														children: t.description
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[8.5px] font-mono text-slate-500 truncate",
														children: ["Value: ", t.targetValue]
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => deleteCustomTool(t.id),
												className: "px-2 py-1 bg-red-950/20 border border-red-500/20 hover:bg-red-900 hover:text-white text-red-400 text-[8px] font-mono font-bold rounded transition-all uppercase shrink-0",
												children: "Revoke"
											})]
										}, t.id))
									})]
								})]
							})]
						})]
					}),
					activeSubTab === "evidence" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-6xl mx-auto w-full flex flex-col h-full overflow-hidden p-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceLedger, {})
					}),
					activeSubTab === "roster" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 animate-fadeIn",
						children: [
							(() => {
								const mergedPending = [...users.filter((u) => u.pendingOrgCode === currentOrg?.id)];
								for (const sr of serverJoinRequests) if (!mergedPending.some((p) => p.id === sr.user_id || p.username === sr.username)) mergedPending.push({
									id: sr.user_id || sr.id,
									requestId: sr.id,
									fullName: sr.full_name || sr.username || "Applicant",
									username: sr.username || sr.email || sr.user_id,
									phone: sr.phone || "",
									email: sr.email || "",
									pendingRole: sr.requested_role || "Community Member",
									pendingOrgCode: currentOrg?.id
								});
								if (mergedPending.length === 0) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 bg-amber-950/10 border border-amber-500/20 rounded-2xl text-left space-y-3.5 shadow-md font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center border-b border-amber-500/10 pb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-amber-400 font-black uppercase text-[10px] tracking-widest block font-display",
												children: [
													"⏳ MEMBERSHIP APPROVAL REQUESTS (",
													mergedPending.length,
													")"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[9.5px] text-slate-500 font-sans leading-normal",
												children: [
													"Subscribers listed below have entered your Organization ID (",
													currentOrg.id,
													") and are awaiting clearance."
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-5 w-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono text-[10px] font-bold",
											children: mergedPending.length
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
										children: mergedPending.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 bg-slate-950/60 rounded-xl border border-slate-900 flex flex-col justify-between gap-3 text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1 text-xs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "font-extrabold text-slate-200",
														children: [
															user.fullName,
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-[9px] font-mono text-slate-500",
																children: [
																	"(@",
																	user.username,
																	")"
																]
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[9px] font-mono text-slate-400 flex justify-between",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Requested Role:" }),
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-bold text-amber-400 uppercase",
																children: user.pendingRole || "Community Member"
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[9px] font-mono text-slate-400 flex justify-between",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Phone:" }),
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-bold text-slate-300",
																children: user.phone || "—"
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[9px] font-mono text-slate-400 flex justify-between",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email:" }),
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-slate-300",
																children: user.email || "—"
															})
														]
													}),
													user.medicalInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[8px] font-mono text-amber-400 bg-amber-950/10 border border-amber-500/10 p-1.5 rounded mt-1",
														children: ["🩺 Med notes: ", user.medicalInfo]
													}),
													(user.homeAddress || user.workAddress) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[8px] font-mono text-slate-500",
														children: ["🏠 ", user.homeAddress || user.workAddress]
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2 font-mono text-[9px] font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														approvePendingUser(user.id, user.requestId);
														setServerJoinRequests((prev) => prev.filter((r) => r.id !== user.requestId && r.user_id !== user.id));
														useAppStore.getState().addToast(`Approved membership for ${user.fullName}!`, "success");
													},
													className: "flex-1 py-1.5 bg-cyan-600/20 hover:bg-cyan-600/35 text-cyan-400 border border-cyan-500/20 rounded-lg text-center uppercase tracking-wider cursor-pointer",
													children: "✓ Approve"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														rejectPendingUser(user.id, user.requestId);
														setServerJoinRequests((prev) => prev.filter((r) => r.id !== user.requestId && r.user_id !== user.id));
														useAppStore.getState().addToast(`Rejected join request from ${user.fullName}.`, "info");
													},
													className: "flex-1 py-1.5 bg-red-950/25 hover:bg-red-950/45 text-red-400 border border-red-500/10 rounded-lg text-center uppercase tracking-wider cursor-pointer",
													children: "✕ Reject"
												})]
											})]
										}, user.requestId || user.id))
									})]
								});
							})(),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col md:flex-row md:items-center justify-between gap-3 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-xs font-black text-slate-300 font-mono uppercase tracking-wider",
									children: [
										"Active Subscriber & Client Accounts (",
										filteredStudents.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10.5px] text-slate-500 mt-0.5",
									children: "Detailed registry containing patient medical conditions, dispatch SLA policies, and risk profiling."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Search subscribers...",
										value: searchTerm,
										onChange: (e) => setSearchTerm(e.target.value),
										className: "bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 w-full md:w-64 font-mono"
									})
								})]
							}),
							filteredStudents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-10 bg-slate-900/10 border border-slate-900 rounded-2xl text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl",
									children: "👥"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-slate-500 font-mono mt-2",
									children: [
										"No subscribers matching your filters. Provide your code ",
										currentOrg.id,
										" to register new clients!"
									]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: filteredStudents.map((student) => {
									const isEditing = editingUserId === student.id;
									const accNum = student.accountNumber || `SL-ACC-${Math.floor(1e4 + Math.random() * 9e4)}`;
									const medInfo = student.medicalInfo || "No recorded allergies or severe chronic conditions.";
									const riskNotes = student.riskNotes || "Standard estate perimeter; BLE keyfob bound.";
									const officer = student.assignedResponseOfficer || "Unassigned";
									const hospital = student.preferredHospital || "Netcare Milpark Private Hospital";
									const address = student.homeAddress || "Not specified";
									const contactsList = student.emergencyContactsList || "+27839110000, +27117171000";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-4 bg-slate-900/30 border border-slate-900 hover:border-slate-800 rounded-2xl transition-all text-left space-y-4 shadow-sm",
										children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3 font-mono text-[10px] grid grid-cols-1 sm:grid-cols-2 gap-3 p-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "sm:col-span-2 flex justify-between items-center border-b border-slate-800 pb-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-cyan-400 font-black uppercase text-[9px]",
														children: "Edit Client Profile"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-slate-500",
														children: ["ID: ", student.id]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[8px] font-bold text-slate-500 uppercase",
														children: "Full Name"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: editFullName,
														onChange: (e) => setEditFullName(e.target.value),
														className: "bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-100 w-full"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[8px] font-bold text-slate-500 uppercase",
														children: "Account Number"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: editAccountNumber,
														onChange: (e) => setEditAccountNumber(e.target.value),
														className: "bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-100 w-full"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[8px] font-bold text-slate-500 uppercase",
														children: "Phone Number"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: editPhone,
														onChange: (e) => setEditPhone(e.target.value),
														className: "bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-100 w-full"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[8px] font-bold text-slate-500 uppercase",
														children: "Email Address"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "email",
														value: editEmail,
														onChange: (e) => setEditEmail(e.target.value),
														className: "bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-100 w-full"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[8px] font-bold text-slate-500 uppercase",
														children: "Assigned Response Officer"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: editOfficer,
														onChange: (e) => setEditOfficer(e.target.value),
														className: "bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-100 w-full"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[8px] font-bold text-slate-500 uppercase",
														children: "Preferred Hospital"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: editHospital,
														onChange: (e) => setEditHospital(e.target.value),
														className: "bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-100 w-full"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "sm:col-span-2 space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[8px] font-bold text-slate-500 uppercase",
														children: "Home Address"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: editAddress,
														onChange: (e) => setEditAddress(e.target.value),
														className: "bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-100 w-full"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "sm:col-span-2 space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[8px] font-bold text-slate-500 uppercase",
														children: "Emergency Contacts List (Comma separated)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: editContactsList,
														onChange: (e) => setEditContactsList(e.target.value),
														className: "bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-100 w-full"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "sm:col-span-2 space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[8px] font-bold text-slate-500 uppercase",
														children: "Chronic Medical Info"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
														value: editMedicalInfo,
														onChange: (e) => setEditMedicalInfo(e.target.value),
														rows: 2,
														className: "bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-100 w-full resize-none font-mono"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "sm:col-span-2 space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[8px] font-bold text-slate-500 uppercase",
														children: "Risk Assessment & Guard Notes"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
														value: editRiskNotes,
														onChange: (e) => setEditRiskNotes(e.target.value),
														rows: 2,
														className: "bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-slate-100 w-full resize-none font-mono"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-slate-900",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setEditingUserId(null),
														className: "px-3 py-1.5 text-[10px] text-slate-400 hover:text-slate-200",
														children: "Abort"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => handleSaveEdit(student.id),
														className: "px-4 py-1.5 bg-cyan-600 text-white text-[10px] font-black rounded-lg hover:bg-cyan-500 font-mono uppercase",
														children: "Commit Changes"
													})]
												})
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-10 h-10 rounded-xl flex items-center justify-center text-slate-100 font-bold font-mono",
													style: { backgroundColor: brandPrimaryColor },
													children: student.fullName.charAt(0).toUpperCase()
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-0.5 text-left",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
														className: "text-sm font-black text-slate-100 flex items-center gap-1.5",
														children: [student.fullName, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[8.5px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-normal",
															children: accNum
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[10px] font-mono text-slate-400",
														children: [
															"@",
															student.username,
															" • ",
															address
														]
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleEditClick(student),
													className: "px-2 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-md text-[9px] font-mono font-black text-cyan-400 hover:text-cyan-300 transition-colors uppercase",
													children: "Edit Profile"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														if (confirm(`Revoke subscriber access for ${student.fullName}?`)) deleteUserProfile(student.id);
													},
													className: "px-2 py-1 bg-red-950/20 border border-red-500/20 hover:bg-red-900 hover:text-white rounded-md text-[9px] font-mono font-black text-red-400 transition-colors uppercase",
													children: "Delete"
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-900 font-mono text-[10px] text-left",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-slate-950/50 p-2 rounded-lg border border-slate-900",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[7.5px] uppercase font-black",
														children: "Contact Cellular"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-200 font-bold",
														children: student.phone
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-slate-950/50 p-2 rounded-lg border border-slate-900",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[7.5px] uppercase font-black",
														children: "Email Link"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-200 truncate block",
														children: student.email
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-slate-950/50 p-2 rounded-lg border border-slate-900",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[7.5px] uppercase font-black",
														children: "Response Officer"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-blue-400 block font-bold",
														children: officer
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-slate-950/50 p-2 rounded-lg border border-slate-900",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[7.5px] uppercase font-black",
														children: "Preferred Hospital"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-300 block",
														children: hospital
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "sm:col-span-2 bg-slate-950/50 p-2 rounded-lg border border-slate-900 space-y-0.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[7.5px] uppercase font-black",
														children: "Critical Medical Notes"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-red-400/90 leading-relaxed text-[9px]",
														children: medInfo
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "sm:col-span-2 bg-slate-950/50 p-2 rounded-lg border border-slate-900 space-y-0.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[7.5px] uppercase font-black",
														children: "Risk & Dispatch Instructions"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-amber-400/90 leading-relaxed text-[9px]",
														children: riskNotes
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "sm:col-span-2 bg-slate-950/50 p-2 rounded-lg border border-slate-900 space-y-0.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[7.5px] uppercase font-black",
														children: "Family Emergency Escalation Chain"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-indigo-400/90 leading-relaxed text-[9px]",
														children: contactsList
													})]
												})
											]
										})] })
									}, student.id);
								})
							})
						]
					}),
					activeSubTab === "branding" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveBranding,
						className: "space-y-5 text-left animate-fadeIn max-w-2xl mx-auto glass-panel rounded-3xl p-6 shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-black text-slate-200 font-mono uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🎨 Configure Control Room Branding & SLA Escalations" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[8.5px] text-slate-500 font-black block",
											children: "PRIMARY ACCENT COLOR (HEX)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "color",
												value: brandPrimaryColor,
												onChange: (e) => setBrandPrimaryColor(e.target.value),
												className: "w-10 h-8 rounded border border-slate-800 bg-transparent cursor-pointer"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: brandPrimaryColor,
												onChange: (e) => setBrandPrimaryColor(e.target.value),
												className: "flex-1 bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-100 uppercase"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[8.5px] text-slate-500 font-black block",
											children: "SECONDARY ACCENT COLOR (HEX)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "color",
												value: brandSecondaryColor,
												onChange: (e) => setBrandSecondaryColor(e.target.value),
												className: "w-10 h-8 rounded border border-slate-800 bg-transparent cursor-pointer"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: brandSecondaryColor,
												onChange: (e) => setBrandSecondaryColor(e.target.value),
												className: "flex-1 bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-100 uppercase"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2 space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[8.5px] text-slate-500 font-black block",
											children: "CORPORATE BRAND LOGO URL"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "e.g. https://domain.com/assets/logo.png",
											value: brandLogoUrl,
											onChange: (e) => setBrandLogoUrl(e.target.value),
											className: "w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-200"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2 space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[8.5px] text-slate-500 font-black block",
											children: "24/7 PATROL EMERGENCY HELPLINE NUMBER"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: brandControlRoomNumber,
											onChange: (e) => setBrandControlRoomNumber(e.target.value),
											className: "w-full bg-slate-950 border border-slate-850 rounded-lg p-2 text-slate-200"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2 space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[8.5px] text-slate-500 font-black block",
											children: "AUTOMATED ESCALATION SLA RULES & RESPONSE POLICY"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											value: brandEscalationPolicy,
											onChange: (e) => setBrandEscalationPolicy(e.target.value),
											rows: 4,
											className: "w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 resize-none font-mono text-[11px]"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end gap-3 pt-3 border-t border-slate-900",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-black text-[10px] rounded-lg tracking-wider uppercase transition-all shadow",
									children: "Save Branding Settings"
								})
							})
						]
					}),
					activeSubTab === "workspace" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceIntegrations, {}),
					activeSubTab === "open-platforms" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-6 animate-fadeIn",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-900/50 p-6 rounded-xl border border-slate-800",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-emerald-400 font-mono font-bold uppercase tracking-wider mb-2",
									children: "🔌 Open Platforms Integrations"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-slate-400 text-xs mb-6 max-w-2xl leading-relaxed",
									children: "Wire third-party open-source platforms into the SafetyLink dispatch chain. Connect Ntfy for private push notifications, ownCloud for secure evidence backups, and SensorStream for raw UDP telemetry feeds."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 gap-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-950 p-4 rounded-lg border border-slate-800",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-slate-300 font-mono font-bold text-xs uppercase mb-4",
												children: "Ntfy (Push Notifications)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 md:grid-cols-2 gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1",
													children: "Server URL"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													placeholder: "https://ntfy.sh",
													value: ntfyServerUrl,
													onChange: (e) => setNtfyServerUrl(e.target.value),
													className: "w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 font-mono focus:border-cyan-500 outline-none"
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1",
													children: "Topic Name"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													placeholder: "safetylink-alerts-123",
													value: ntfyTopic,
													onChange: (e) => setNtfyTopic(e.target.value),
													className: "w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 font-mono focus:border-cyan-500 outline-none"
												})] })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-950 p-4 rounded-lg border border-slate-800",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-row justify-between items-center mb-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-slate-300 font-mono font-bold text-xs uppercase",
													children: "ownCloud (Evidence Backup)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: async () => {
														const code = currentOrg?.id || "";
														const zipUrl = `${ownCloudServerUrl || "http://localhost:8080"}/index.php/apps/files/ajax/download.php?files=&dir=/safetylink/ORGANIZATION/${code}`;
														if (Capacitor.isNativePlatform()) try {
															const fileName = `${code}_evidence.zip`;
															const result = await Filesystem.downloadFile({
																url: zipUrl,
																path: fileName,
																directory: Directory.Documents
															});
															await Share.share({
																title: "Evidence ZIP",
																text: "Here is the evidence package.",
																url: result.path,
																dialogTitle: "Share Evidence"
															});
														} catch (e) {
															console.error("Download/Share failed", e);
															window.open(zipUrl, "_blank");
														}
														else window.open(zipUrl, "_blank");
													},
													className: "bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-[10px] px-3 py-1.5 rounded uppercase tracking-wider transition-colors flex gap-2 items-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📥 Download All Evidence ZIP" })
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1",
														children: "Server URL"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														placeholder: "https://cloud.example.com",
														value: ownCloudServerUrl,
														onChange: (e) => setOwnCloudServerUrl(e.target.value),
														className: "w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 font-mono focus:border-cyan-500 outline-none"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1",
														children: "Username"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														placeholder: "admin",
														value: ownCloudUsername,
														onChange: (e) => setOwnCloudUsername(e.target.value),
														className: "w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 font-mono focus:border-cyan-500 outline-none"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1",
														children: "App Token"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "password",
														placeholder: "••••••••••••",
														value: ownCloudToken,
														onChange: (e) => setOwnCloudToken(e.target.value),
														className: "w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 font-mono focus:border-cyan-500 outline-none"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1",
														children: "Target Folder"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														placeholder: "safetylink-evidence",
														value: ownCloudFolder,
														onChange: (e) => setOwnCloudFolder(e.target.value),
														className: "w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 font-mono focus:border-cyan-500 outline-none"
													})] })
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-950 p-4 rounded-lg border border-slate-800",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-slate-300 font-mono font-bold text-xs uppercase mb-4",
												children: "SensorStream (UDP Telemetry)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 md:grid-cols-3 gap-4 items-end",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1",
														children: "UDP Host IP"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														placeholder: "192.168.1.100",
														value: ssUdpHost,
														onChange: (e) => setSsUdpHost(e.target.value),
														className: "w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 font-mono focus:border-cyan-500 outline-none"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1",
														children: "UDP Port"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														placeholder: "5005",
														value: ssUdpPort,
														onChange: (e) => setSsUdpPort(e.target.value),
														className: "w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 font-mono focus:border-cyan-500 outline-none"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 mb-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "checkbox",
															id: "ss-enable",
															checked: ssEnabled,
															onChange: (e) => setSsEnabled(e.target.checked),
															className: "rounded bg-slate-900 border-slate-700 text-cyan-600 focus:ring-cyan-600"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															htmlFor: "ss-enable",
															className: "text-xs font-mono text-slate-300",
															children: "Enable Live UDP Streaming"
														})]
													})
												]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8 flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											updateOrgBranding({
												ntfy: {
													topic: ntfyTopic,
													serverUrl: ntfyServerUrl
												},
												ownCloud: {
													serverUrl: ownCloudServerUrl,
													username: ownCloudUsername,
													token: ownCloudToken,
													folder: ownCloudFolder
												},
												sensorStream: {
													udpHost: ssUdpHost,
													udpPort: parseInt(ssUdpPort) || 5005,
													enabled: ssEnabled
												}
											});
											alert("Open Platforms configuration saved successfully.");
										},
										className: "px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-mono font-black text-[10px] rounded-lg tracking-wider uppercase transition-all shadow",
										children: "Save Platform Integrations"
									})
								})
							]
						})
					}),
					activeSubTab === "analytics" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GeospatialAnalytics, {}),
					activeSubTab === "live-gis" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "animate-fadeIn mt-4 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden h-[600px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgWarRoom, {})
					}),
					activeSubTab === "mphakati-overwatch" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "animate-fadeIn -mx-4 sm:-mx-8 lg:-mx-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MphakatiOverwatch, {})
					}),
					activeSubTab === "mesh-orchestration" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeMeshOrchestration, {}),
					activeSubTab === "incident-reporting" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentReportingTemplates, {}),
					activeSubTab === "offline-sync" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdvancedOfflineSyncManager, {}),
					activeSubTab === "cctv" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-panel rounded-2xl p-5 animate-fadeIn space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/70 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-black uppercase tracking-wider font-mono text-emerald-400",
								children: "Organization CCTV Command & Hikvision Deployment"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-slate-400 mt-0.5",
								children: "Switch between the live WebRTC quad wall (PTZ, talkback, snapshots) and zero-IT camera onboarding."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center p-1 rounded-lg bg-slate-950 border border-slate-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCctvViewMode("LIVE"),
									className: `px-3 py-1.5 text-[10px] font-mono font-bold uppercase rounded-md transition-colors ${cctvViewMode === "LIVE" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`,
									children: "Live WebRTC Wall"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCctvViewMode("ONBOARD"),
									className: `px-3 py-1.5 text-[10px] font-mono font-bold uppercase rounded-md transition-colors ${cctvViewMode === "ONBOARD" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`,
									children: "Fleet & Onboarding"
								})]
							})]
						}), cctvViewMode === "LIVE" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveCameraFeed, { scope: "ORG" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HikvisionCameraManager, { scope: "ORG" })]
					}),
					activeSubTab === "referrals" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-fadeIn",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-panel rounded-2xl p-5 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-b border-slate-900 pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs font-black text-amber-400 uppercase tracking-widest font-mono",
										children: "Agent Referral Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-500 mt-1",
										children: "Generate a code to give to your agents. Every client that signs up using this code is tracked below."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 flex-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											if (currentOrg) {
												const code = generateReferralCode(currentOrg.id);
												setOrgReferralCode(code);
											}
										},
										className: "px-4 py-2.5 bg-amber-600 hover:bg-amber-500 border border-amber-500/10 transition-colors text-white font-mono text-[10px] font-bold rounded-xl uppercase tracking-wider",
										children: orgReferralCode ? "🔄 Regenerate Code" : "🎟️ Generate Referral Code"
									}), (orgReferralCode || currentOrg?.referralCode) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 min-w-[180px] bg-slate-950 border border-amber-500/30 px-4 py-2.5 rounded-xl font-mono font-black text-sm text-amber-300 tracking-widest select-text text-center",
										children: orgReferralCode || currentOrg?.referralCode
									})]
								}),
								(orgReferralCode || currentOrg?.referralCode) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[9px] text-amber-400/80 font-mono leading-relaxed",
										children: [
											"📋 Share this code with your agents. Clients enter it in the ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "\"Have a Referral Code?\"" }),
											" section on the login screen. Total referrals tracked: ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-amber-300",
												children: currentOrg?.referralCount ?? 0
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between p-2 bg-black/30 border border-amber-500/20 rounded-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[9px] font-mono text-amber-200/50 truncate pr-2 select-all",
											children: ["safetylink://join?ref=", orgReferralCode || currentOrg?.referralCode]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => navigator.clipboard.writeText(`safetylink://join?ref=${orgReferralCode || currentOrg?.referralCode}`),
											className: "shrink-0 text-[8px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded hover:bg-amber-500/30 transition-colors uppercase font-bold tracking-wider",
											children: "Copy Link"
										})]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-panel rounded-2xl p-5 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-slate-900 pb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-black text-slate-100 uppercase tracking-widest font-mono",
									children: "Referred Clients & Earnings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500 mt-1",
									children: "20% commission per active subscriber (Estimated $2.00/mo)."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1.5 items-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 font-mono font-black text-xs text-center w-full",
										children: [referredUsers.length, " clients"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-mono font-black text-xs text-center w-full",
										children: [
											"$",
											(referredUsers.length * 2).toFixed(2),
											"/mo"
										]
									})]
								})]
							}), (() => {
								const code = activeReferralCode;
								const referred = referredUsers;
								if (!code) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500 font-mono text-center py-6",
									children: "Generate a referral code above to start tracking clients."
								});
								if (referred.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500 font-mono text-center py-6",
									children: "No clients have used your referral code yet. Share it with your agents!"
								});
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: referred.map((u, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 p-3 bg-slate-950/40 border border-slate-900 rounded-xl",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 overflow-hidden",
												children: u.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: u.avatarUrl,
													alt: "",
													className: "w-full h-full object-cover"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm",
													children: "👤"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] font-bold text-slate-200 block truncate",
													children: u.fullName || u.username
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[9px] text-slate-500 font-mono block",
													children: [
														u.email,
														" · ",
														u.phone
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-right shrink-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[8px] font-mono text-slate-500 block",
													children: ["#", idx + 1]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] font-mono text-emerald-400 block",
													children: u.role || "Member"
												})]
											})
										]
									}, u.id))
								});
							})()]
						})]
					})
				]
			})
		]
	});
};
//#endregion
export { OrgDashboard };
