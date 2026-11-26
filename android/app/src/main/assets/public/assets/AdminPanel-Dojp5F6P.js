import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { kt as require_react } from "./icons-B-I2x5TV.js";
import { S as create, b as motion, w as require_jsx_runtime, x as AnimatePresence } from "./vendor-DZX22qT5.js";
import { i as useAppStore, t as ADMIN_ORG_CODE } from "./store-DQZ7ziRL.js";
import { i as getR2StreamUrl } from "./r2Assets--dTIOP7L.js";
import { d as LogoSetPart, l as ASSETS } from "./index-BolDz6jr.js";
import { t as EvidenceLedger } from "./EvidenceLedger-Dm9G70aq.js";
import { t as FleetMonitor } from "./FleetMonitor-B8wJASt4.js";
import { ClientDatabaseModule } from "./ClientDatabaseModule-jhVUI_lE.js";
import { MediaHub } from "./MediaHub-K3zz_N9f.js";
//#region src/services/ThingsBoardService.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var sendTestEvent = async (code) => {
	console.log("Mock sendTestEvent", code);
	return true;
};
//#endregion
//#region src/utils/editorialStore.ts
var defaultWeb = {
	heroBadge: "SEQUENTIAL EMERGENCY ALERT NETWORK",
	heroTitle1: "ARMOURING",
	heroTitle2: "COMMUNITIES.",
	heroSubtitle: "Emergency response platform designed for mission-critical safety in South Africa.",
	heroCtaPrimary: "START PROTECTION →",
	heroCtaSecondary: "LEARN MORE",
	statusTickerItems: [
		"BLE GATEWAY ● LIVE",
		"WHATSAPP RELAY ● LIVE",
		"SMS GATEWAY ● LIVE",
		"VAPI VOICE ● LIVE"
	],
	armourTitle: "ARMOURING COMMUNITIES.",
	armourSubtitle: "From 2-second panic alerts to advanced AI dispatch, we secure your community.",
	features: [
		{
			icon: "⚡",
			title: "2-Second Hold Panic",
			desc: "Instantly trigger emergency alerts via BLE keyfob or on-screen SOS."
		},
		{
			icon: "📡",
			title: "Multi-Channel Dispatch",
			desc: "Sequential WhatsApp -> SMS -> Voice -> USSD."
		},
		{
			icon: "🧠",
			title: "VAPI AI Voice Follow-Up",
			desc: "AI voice agent calls every contact in sequence."
		},
		{
			icon: "🔒",
			title: "AES-256-GCM Encryption",
			desc: "Every data point secured end-to-end."
		}
	],
	pricingTiers: [
		{
			name: "Individual",
			monthly: "R49",
			onceOff: "R149",
			planCode: "IND_01",
			features: [
				"BLE panic binding",
				"5 Emergency contacts",
				"Offline map"
			]
		},
		{
			name: "Family Mesh",
			monthly: "R129",
			onceOff: "R399",
			planCode: "FAM_01",
			popular: true,
			features: [
				"Up to 5 family members",
				"Watch-Me proactive timer",
				"Live guard routing"
			]
		},
		{
			name: "Estate / Business",
			monthly: "R999",
			onceOff: "Custom",
			planCode: "EST_01",
			features: [
				"Unlimited members",
				"Guard patrol telemetry",
				"Dedicated control desk"
			]
		}
	],
	hotlinePhone: "+27 68 009 911",
	hotlineEmail: "info@safetylink.online",
	logoImage: "/logos/Safety_Link_Logo_Transparent.png",
	heroPosterImage: "/media/Safetylink_Visual_Overview_Deck.png",
	primaryColor: "#10b981",
	showLiveLog: true
};
var defaultApk = {
	appName: "SafetyLink Mobile",
	statusTag: "ACTIVE DEFENSE MATRIX",
	sosButtonText: "HOLD FOR SOS",
	sosHoldText: "TRANSMITTING DISTRESS IN 2 SEC...",
	duressCodePrompt: "Enter Duress Safe Code",
	bleStatusText: "iTAG HARDWARE PERIMETER",
	keyfobPairedText: "BLE Beacon Linked (UUID: FFE0)",
	offlineFallbackNotice: "SMS + USSD Carrier Standby Active",
	emergencyContactsTitle: "Rapid Escalation Chain",
	hudThemeColor: "#ef4444",
	shieldIconUrl: "/logos/Safety_Link_Logo_Transparent.png",
	enableVibration: true,
	holdDurationSeconds: 2
};
var defaultExe = {
	windowTitle: "SafetyLink War Room Command",
	dispatchHeader: "NATIONAL COMMAND NETWORK",
	warRoomSubtitle: "Tactical telemetry and responder dispatch control",
	threatLevelLabel: "DEFCON 3 - ELEVATED MONITORING",
	satelliteFeedStatus: "ORBITAL GIS FEED ACTIVE",
	evidenceLedgerTitle: "Tamper-Evident Evidence Vault",
	primaryTheme: "slate",
	multiMonitorEnabled: true,
	commandHotline: "+27 68 009 911"
};
var defaultSections = {
	web: [
		{
			id: "hero",
			name: "Hero Banner",
			category: "hero",
			icon: "🌟",
			visible: true,
			order: 0
		},
		{
			id: "status",
			name: "Live Ticker",
			category: "status",
			icon: "📡",
			visible: true,
			order: 1
		},
		{
			id: "armour",
			name: "Armouring Communities",
			category: "features",
			icon: "🛡️",
			visible: true,
			order: 2
		},
		{
			id: "explore",
			name: "Explore Cards",
			category: "features",
			icon: "📱",
			visible: true,
			order: 3
		},
		{
			id: "downloads",
			name: "Download Hub",
			category: "system",
			icon: "⬇️",
			visible: true,
			order: 4
		}
	],
	apk: [
		{
			id: "hero",
			name: "SOS Action Hub",
			category: "hero",
			icon: "🚨",
			visible: true,
			order: 0
		},
		{
			id: "status",
			name: "Hardware BLE Sensor",
			category: "status",
			icon: "📡",
			visible: true,
			order: 1
		},
		{
			id: "features",
			name: "Emergency Chain",
			category: "contacts",
			icon: "👥",
			visible: true,
			order: 2
		}
	],
	exe: [
		{
			id: "hero",
			name: "Command Deck",
			category: "hero",
			icon: "🖥️",
			visible: true,
			order: 0
		},
		{
			id: "status",
			name: "GIS Fleet Map",
			category: "system",
			icon: "🗺️",
			visible: true,
			order: 1
		},
		{
			id: "features",
			name: "Incident Logs",
			category: "features",
			icon: "📋",
			visible: true,
			order: 2
		}
	]
};
var useEditorialStore = create((set, get) => ({
	version: "1.1.906",
	activePlatform: "web",
	sections: defaultSections,
	web: defaultWeb,
	apk: defaultApk,
	exe: defaultExe,
	isSaving: false,
	isPublishing: false,
	isAiGenerating: false,
	setPlatform: (p) => set({ activePlatform: p }),
	updateField: (platform, key, value) => {
		set((state) => {
			if (platform === "web") return { web: {
				...state.web,
				[key]: value
			} };
			if (platform === "apk") return { apk: {
				...state.apk,
				[key]: value
			} };
			if (platform === "exe") return { exe: {
				...state.exe,
				[key]: value
			} };
			return state;
		});
	},
	reorderSection: (platform, from, to) => {
		set((state) => {
			const copy = [...state.sections[platform]];
			const [moved] = copy.splice(from, 1);
			copy.splice(to, 0, moved);
			return { sections: {
				...state.sections,
				[platform]: copy.map((s, idx) => ({
					...s,
					order: idx
				}))
			} };
		});
	},
	toggleSectionVisibility: (platform, id) => {
		set((state) => ({ sections: {
			...state.sections,
			[platform]: state.sections[platform].map((s) => s.id === id ? {
				...s,
				visible: !s.visible
			} : s)
		} }));
	},
	saveDraft: async () => {
		set({ isSaving: true });
		try {
			const state = get();
			await fetch("/api/editorial/save", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(state)
			});
			return true;
		} catch {
			return true;
		} finally {
			set({ isSaving: false });
		}
	},
	publishLive: async (notes) => {
		set({ isPublishing: true });
		try {
			const state = get();
			const data = await (await fetch("/api/editorial/publish", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					version: state.version,
					releaseNotes: notes,
					state
				})
			})).json();
			return {
				success: true,
				version: data.version || state.version,
				message: data.message
			};
		} catch {
			return {
				success: true,
				version: get().version,
				message: "Published locally."
			};
		} finally {
			set({ isPublishing: false });
		}
	},
	resetToDefaults: (platform) => {
		if (platform) set((state) => ({ sections: {
			...state.sections,
			[platform]: defaultSections[platform]
		} }));
		else set({
			web: defaultWeb,
			apk: defaultApk,
			exe: defaultExe,
			sections: defaultSections
		});
	},
	requestAiCopy: async (promptOrParams) => {
		set({ isAiGenerating: true });
		try {
			const payload = typeof promptOrParams === "string" ? { prompt: promptOrParams } : {
				field: promptOrParams?.field || "General Copy",
				prompt: promptOrParams?.prompt || "Refine emergency dispatch text",
				currentValue: promptOrParams?.currentValue || "",
				platform: promptOrParams?.platform || "web"
			};
			const data = await (await fetch("/api/editorial/ai-assist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			})).json();
			if (Array.isArray(data.suggestions) && data.suggestions.length > 0) return data.suggestions;
			const result = data.result || "ARMOURING COMMUNITIES ACROSS SOUTH AFRICA.";
			return [
				result,
				result.toLowerCase(),
				`URGENT: ${result}`
			];
		} catch {
			return [
				"ARMOURING COMMUNITIES ACROSS SOUTH AFRICA",
				"Next-Gen Sequential Rapid Emergency Alert Network",
				"Instant multi-channel distress dispatch & guard response"
			];
		} finally {
			set({ isAiGenerating: false });
		}
	},
	fetchRemoteState: async () => {
		try {
			const res = await fetch("/api/editorial/state");
			if (res.ok) {
				const data = await res.json();
				if (data.web) set({ web: data.web });
				if (data.apk) set({ apk: data.apk });
				if (data.exe) set({ exe: data.exe });
				if (data.sections) set({ sections: data.sections });
			}
		} catch {}
	}
}));
//#endregion
//#region src/components/editorial/EditorialStudio.tsx
var import_jsx_runtime = require_jsx_runtime();
var EditorialStudio = ({ onClose }) => {
	const { version, activePlatform, setPlatform, sections, web, apk, exe, updateField, reorderSection, toggleSectionVisibility, saveDraft, publishLive, resetToDefaults, requestAiCopy, isSaving, isPublishing, isAiGenerating } = useEditorialStore();
	const [platformPickerOpen, setPlatformPickerOpen] = (0, import_react.useState)(false);
	const [selectedField, setSelectedField] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("sections");
	const [previewMode, setPreviewMode] = (0, import_react.useState)(false);
	const [zoomLevel, setZoomLevel] = (0, import_react.useState)(100);
	const [publishModalOpen, setPublishModalOpen] = (0, import_react.useState)(false);
	const [releaseNotes, setReleaseNotes] = (0, import_react.useState)("");
	const [publishResult, setPublishResult] = (0, import_react.useState)(null);
	const [aiPrompt, setAiPrompt] = (0, import_react.useState)("");
	const [aiSuggestions, setAiSuggestions] = (0, import_react.useState)([]);
	const [toastMessage, setToastMessage] = (0, import_react.useState)(null);
	const showToast = (msg) => {
		setToastMessage(msg);
		setTimeout(() => setToastMessage(null), 4e3);
	};
	(0, import_react.useEffect)(() => {
		useEditorialStore.getState().fetchRemoteState();
	}, []);
	const handleSelectField = (key, label, type, value) => {
		if (previewMode) return;
		setSelectedField({
			key,
			label,
			type,
			value,
			platform: activePlatform
		});
		setAiSuggestions([]);
	};
	const handleFieldValueChange = (val) => {
		if (!selectedField) return;
		setSelectedField((prev) => prev ? {
			...prev,
			value: val
		} : null);
		updateField(selectedField.platform, selectedField.key, val);
	};
	const handleAiGenerate = async () => {
		if (!selectedField) return;
		const suggestions = await requestAiCopy({
			field: selectedField.label,
			prompt: aiPrompt || "Authoritative South African emergency dispatch copy",
			currentValue: selectedField.value,
			platform: selectedField.platform
		});
		setAiSuggestions(suggestions);
	};
	const handleApplyAiSuggestion = (text) => {
		if (!selectedField) return;
		handleFieldValueChange(text);
		showToast(`Applied: "${text.substring(0, 30)}..."`);
	};
	const handleSave = async () => {
		if (await saveDraft()) showToast("Draft saved successfully");
	};
	const handlePublish = async () => {
		const res = await publishLive(releaseNotes || `Editorial update for ${activePlatform.toUpperCase()}`);
		setPublishResult(res);
		if (res.success) showToast(`Published live! Platform updated to v${res.version}`);
	};
	const MEDIA_PRESETS = [
		{
			name: "Official SafetyLink Logo",
			url: ASSETS.logo,
			category: "Logo"
		},
		{
			name: "3D Gold Shield Watermark",
			url: ASSETS.logo3d,
			category: "Branding"
		},
		{
			name: "Emergency App Login Poster",
			url: ASSETS.appLogin,
			category: "Mockup"
		},
		{
			name: "iTAG BLE Wearable Keyfobs",
			url: ASSETS.itagAll,
			category: "Hardware"
		},
		{
			name: "Single iTAG Keyfob Unit",
			url: ASSETS.itagSingle,
			category: "Hardware"
		},
		{
			name: "SOS Panic Button Hardware",
			url: "/panic-button.png",
			category: "Hardware"
		},
		{
			name: "Tactical Shield Badge",
			url: "/safetylink-shield.jpg",
			category: "Branding"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[99999] bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden animate-fadeIn",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-20 shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-mono font-black tracking-widest text-white uppercase",
										children: "SafetyLink Studio"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-mono px-2 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/40",
										children: ["v", version]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-[1px] bg-slate-800" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setPlatformPickerOpen(true),
								className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-200 border border-slate-700 transition-all",
								title: "Switch Target Environment",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									activePlatform === "web" && "🌐 SafetyLink.online (Web)",
									activePlatform === "apk" && "📱 SafetyLink APK (Android)",
									activePlatform === "exe" && "💻 SafetyLink EXE (Desktop)"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-slate-400",
									children: "▼"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden md:flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-[11px] font-mono",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setZoomLevel((z) => Math.max(60, z - 10)),
									className: "px-1.5 py-0.5 hover:text-white text-slate-400",
									title: "Zoom out",
									children: "−"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "w-10 text-center text-slate-300",
									children: [zoomLevel, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setZoomLevel((z) => Math.min(130, z + 10)),
									className: "px-1.5 py-0.5 hover:text-white text-slate-400",
									title: "Zoom in",
									children: "+"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setZoomLevel(100),
									className: "text-[9px] px-1 text-slate-500 hover:text-slate-300",
									children: "RESET"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setPreviewMode((p) => !p);
								setSelectedField(null);
							},
							className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${previewMode ? "bg-amber-500/20 text-amber-300 border-amber-500/50" : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: previewMode ? "👁️ Live Preview Mode" : "✏️ Edit Mode" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleSave,
								disabled: isSaving,
								className: "px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-mono font-bold transition-all",
								children: isSaving ? "Saving..." : "💾 Save Draft"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setPublishModalOpen(true),
								disabled: isPublishing,
								className: "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-bold text-xs shadow-lg shadow-red-950/40 transition-all",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🚀 Publish Live (OTA)" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-[1px] bg-slate-800" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onClose,
								className: "p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/50 text-slate-400 hover:text-red-300 border border-slate-700 text-xs font-mono transition-all",
								title: "Exit Studio",
								children: "✕"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex overflow-hidden relative",
				children: [
					!previewMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "w-72 bg-slate-900/95 border-r border-slate-800 flex flex-col z-10 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex border-b border-slate-800 bg-slate-950",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveTab("sections"),
									className: `flex-1 py-2.5 text-[11px] font-mono font-bold uppercase tracking-wider text-center transition-all ${activeTab === "sections" ? "text-amber-400 border-b-2 border-amber-500 bg-slate-900/50" : "text-slate-400 hover:text-slate-200"}`,
									children: "📑 Sections"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveTab("assets"),
									className: `flex-1 py-2.5 text-[11px] font-mono font-bold uppercase tracking-wider text-center transition-all ${activeTab === "assets" ? "text-amber-400 border-b-2 border-amber-500 bg-slate-900/50" : "text-slate-400 hover:text-slate-200"}`,
									children: "🖼️ Media"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveTab("theme"),
									className: `flex-1 py-2.5 text-[11px] font-mono font-bold uppercase tracking-wider text-center transition-all ${activeTab === "theme" ? "text-amber-400 border-b-2 border-amber-500 bg-slate-900/50" : "text-slate-400 hover:text-slate-200"}`,
									children: "🎨 Theme"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 overflow-y-auto p-3 space-y-3",
							children: [
								activeTab === "sections" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider",
											children: "Re-order & Toggle Structure"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => resetToDefaults(activePlatform),
											className: "text-[9px] font-mono text-slate-500 hover:text-red-400",
											children: "Reset Order"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5",
										children: sections[activePlatform].map((sec, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all ${sec.visible ? "bg-slate-800/80 border-slate-700 text-slate-200" : "bg-slate-950/60 border-slate-800/60 text-slate-500 line-through"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm",
													children: sec.icon
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate font-semibold text-[11px]",
													children: sec.name
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1 shrink-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														disabled: idx === 0,
														onClick: () => reorderSection(activePlatform, idx, idx - 1),
														className: "p-1 hover:bg-slate-700 rounded text-slate-400 disabled:opacity-20",
														title: "Move Up",
														children: "▲"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														disabled: idx === sections[activePlatform].length - 1,
														onClick: () => reorderSection(activePlatform, idx, idx + 1),
														className: "p-1 hover:bg-slate-700 rounded text-slate-400 disabled:opacity-20",
														title: "Move Down",
														children: "▼"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => toggleSectionVisibility(activePlatform, sec.id),
														className: `p-1 hover:bg-slate-700 rounded ${sec.visible ? "text-emerald-400" : "text-slate-600"}`,
														title: sec.visible ? "Hide section" : "Show section",
														children: sec.visible ? "👁️" : "🕶️"
													})
												]
											})]
										}, sec.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-300 font-mono",
										children: [
											"💡 ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pro Tip:" }),
											" Click any element in the live canvas on the right to edit its wording, image, or action directly!"
										]
									})
								] }),
								activeTab === "assets" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block",
										children: "SafetyLink Asset Library"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-2",
										children: MEDIA_PRESETS.map((asset, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => {
												if (selectedField?.type === "image") {
													handleFieldValueChange(asset.url);
													showToast(`Updated image to: ${asset.name}`);
												} else {
													updateField(activePlatform, activePlatform === "web" ? "logoImage" : "shieldIconUrl", asset.url);
													showToast(`Selected: ${asset.name}`);
												}
											},
											className: "p-2 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-amber-500 cursor-pointer transition-all group flex flex-col items-center text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-16 h-16 rounded bg-black/40 flex items-center justify-center p-1 mb-1.5 overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: asset.url,
													alt: asset.name,
													className: "max-w-full max-h-full object-contain"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-slate-300 group-hover:text-amber-400 leading-tight",
												children: asset.name
											})]
										}, i))
									})]
								}),
								activeTab === "theme" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block",
										children: "Primary Tactical Accent"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-2",
										children: [
											{
												name: "Tactical Red",
												color: "#e8321e"
											},
											{
												name: "Armed Emerald",
												color: "#10b981"
											},
											{
												name: "Warning Amber",
												color: "#f59e0b"
											},
											{
												name: "Cyber Blue",
												color: "#0ea5e9"
											}
										].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												if (activePlatform === "web") updateField("web", "primaryColor", t.color);
												if (activePlatform === "apk") updateField("apk", "hudThemeColor", t.color);
												showToast(`Accent set to ${t.name}`);
											},
											className: "p-3 rounded-lg bg-slate-800 border border-slate-700 flex items-center gap-2 text-xs font-mono text-left hover:border-slate-500 transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-4 h-4 rounded-full",
												style: { backgroundColor: t.color }
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-200",
												children: t.name
											})]
										}, t.color))
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 bg-slate-950/90 overflow-auto flex items-center justify-center p-6 relative",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								transform: `scale(${zoomLevel / 100})`,
								transformOrigin: "top center",
								transition: "transform 0.15s ease"
							},
							className: "w-full max-w-5xl flex justify-center py-6",
							children: [
								activePlatform === "web" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden text-slate-100 font-sans",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-3 h-3 rounded-full bg-red-500/80 inline-block" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-3 h-3 rounded-full bg-amber-500/80 inline-block" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-3 h-3 rounded-full bg-emerald-500/80 inline-block" })
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-emerald-400",
														children: "🔒"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "https://safetylink.online" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-mono text-slate-500",
													children: "LIVE PRODUCTION WEB"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-slate-950/80 border-b border-slate-800/60 px-6 py-3 flex items-center justify-between backdrop-blur",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												onClick: () => handleSelectField("logoImage", "Brand Logo URL", "image", web.logoImage),
												className: `flex items-center gap-2.5 cursor-pointer p-1 rounded transition-all ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: web.logoImage,
													alt: "Logo",
													className: "h-8 w-16 object-contain"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-black text-white tracking-wider text-sm uppercase font-mono",
													children: "SafetyLink"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleSelectField("heroCtaSecondary", "Sign In Button Label", "text", web.heroCtaSecondary),
													className: `text-xs font-mono text-slate-400 hover:text-white p-1 rounded ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
													children: web.heroCtaSecondary
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleSelectField("heroCtaPrimary", "Primary Action Button Label", "text", web.heroCtaPrimary),
													className: `px-4 py-2 rounded-xl text-xs font-mono font-bold text-white uppercase transition-all ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
													style: { backgroundColor: web.primaryColor },
													children: web.heroCtaPrimary
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-8 space-y-12",
											children: [
												sections.web.find((s) => s.id === "hero")?.visible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative text-center max-w-3xl mx-auto py-10",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															onClick: () => handleSelectField("heroBadge", "Hero Eyebrow Badge", "text", web.heroBadge),
															className: `inline-block mb-3 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-red-400 bg-red-950/40 border border-red-500/30 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
															children: web.heroBadge
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
															onClick: () => handleSelectField("heroTitle1", "Hero Headline Line 1", "text", web.heroTitle1),
															className: `text-4xl md:text-5xl font-black tracking-tight cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
															children: web.heroTitle1
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
															onClick: () => handleSelectField("heroTitle2", "Hero Headline Line 2", "text", web.heroTitle2),
															className: `text-4xl md:text-5xl font-black tracking-tight text-slate-400 mb-6 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
															children: web.heroTitle2
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															onClick: () => handleSelectField("heroSubtitle", "Hero Descriptive Subtitle", "textarea", web.heroSubtitle),
															className: `text-base text-slate-300 leading-relaxed max-w-xl mx-auto mb-8 cursor-pointer p-2 rounded ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
															children: web.heroSubtitle
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex justify-center gap-4",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => handleSelectField("heroCtaPrimary", "Primary Action Button Label", "text", web.heroCtaPrimary),
																className: `px-6 py-3 rounded-xl font-mono font-black text-xs uppercase tracking-wider text-white shadow-xl ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
																style: { backgroundColor: web.primaryColor },
																children: web.heroCtaPrimary
															})
														})
													]
												}),
												sections.web.find((s) => s.id === "ticker")?.visible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex items-center gap-4 overflow-hidden",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-mono text-red-500 font-bold shrink-0",
														children: "● OPERATIONAL STATUS:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex gap-4 text-[11px] font-mono text-slate-400",
														children: web.statusTickerItems.slice(0, 4).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "whitespace-nowrap",
															children: item
														}, i))
													})]
												}),
												sections.web.find((s) => s.id === "armour")?.visible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														onClick: () => handleSelectField("armourTitle", "Capabilities Title", "text", web.armourTitle),
														className: `text-2xl font-black uppercase tracking-tight mb-2 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
														children: web.armourTitle
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														onClick: () => handleSelectField("armourSubtitle", "Capabilities Subtitle", "textarea", web.armourSubtitle),
														className: `text-xs text-slate-400 mb-6 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
														children: web.armourSubtitle
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid grid-cols-1 md:grid-cols-2 gap-4",
														children: web.features.map((f, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															onClick: () => handleSelectField(`features[${idx}].title`, `Feature ${idx + 1} Title`, "text", f.title),
															className: `p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex gap-3 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-2xl",
																children: f.icon
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "font-bold text-sm text-white",
																children: f.title
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-xs text-slate-400",
																children: f.desc
															})] })]
														}, idx))
													})
												] }),
												sections.web.find((s) => s.id === "pricing")?.visible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "pt-6",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-xl font-black uppercase tracking-tight mb-4 text-center",
														children: "Simple Pricing & Subscriptions"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid grid-cols-1 md:grid-cols-3 gap-4",
														children: web.pricingTiers.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: `p-5 rounded-xl border flex flex-col justify-between ${p.popular ? "bg-slate-900 border-emerald-500/50" : "bg-slate-900/40 border-slate-800"}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "text-[10px] font-mono text-slate-400 uppercase",
																	children: p.name
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "text-3xl font-black my-1 text-white",
																	children: p.monthly
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "text-[10px] text-amber-400 mb-3",
																	children: p.onceOff
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
																	className: "text-xs space-y-1 text-slate-300",
																	children: p.features.map((ft, fi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["✓ ", ft] }, fi))
																})
															] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																className: "w-full mt-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold",
																children: ["Subscribe ", p.monthly]
															})]
														}, p.name))
													})]
												})
											]
										})
									]
								}),
								activePlatform === "apk" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-[380px] bg-slate-950 rounded-[44px] border-[10px] border-slate-800 shadow-2xl overflow-hidden relative flex flex-col font-sans",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "h-7 bg-black flex items-center justify-between px-6 text-[10px] font-mono text-slate-400",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "07:46" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-20 h-4 bg-slate-900 rounded-full mx-auto" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "5G ● 98%" })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												onClick: () => handleSelectField("appName", "Mobile App Name", "text", apk.appName),
												className: `flex items-center gap-2 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: apk.shieldIconUrl,
													alt: "Shield",
													className: "w-6 h-6 object-contain"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono font-black text-xs uppercase text-white",
													children: apk.appName
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												onClick: () => handleSelectField("statusTag", "Tactical Status Tag", "text", apk.statusTag),
												className: `text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
												children: apk.statusTag
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-5 flex-1 flex flex-col justify-between space-y-6",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col items-center justify-center my-6",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														onClick: () => handleSelectField("sosButtonText", "Main SOS Button Label", "text", apk.sosButtonText),
														className: `w-48 h-48 rounded-full flex flex-col items-center justify-center text-center p-4 cursor-pointer shadow-2xl transition-all ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
														style: {
															background: `radial-gradient(circle, ${apk.hudThemeColor} 0%, #7f1d1d 100%)`,
															boxShadow: `0 0 40px ${apk.hudThemeColor}60`
														},
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-3xl mb-1",
															children: "🚨"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-black text-lg tracking-wider text-white uppercase font-mono",
															children: apk.sosButtonText
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														onClick: () => handleSelectField("sosHoldText", "SOS Press & Hold Prompt", "text", apk.sosHoldText),
														className: `mt-4 text-[10px] font-mono text-slate-400 uppercase tracking-wider text-center cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
														children: apk.sosHoldText
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													onClick: () => handleSelectField("bleStatusText", "BLE Telemetry Status Text", "text", apk.bleStatusText),
													className: `p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-lg",
															children: "🔑"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-[11px] font-bold text-white",
															children: "iTAG Beacon Active"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-[9px] font-mono text-slate-400",
															children: apk.bleStatusText
														})] })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													onClick: () => handleSelectField("offlineFallbackNotice", "Offline Fallback Notice", "text", apk.offlineFallbackNotice),
													className: `p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center text-[10px] font-mono text-slate-400 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
													children: ["📡 ", apk.offlineFallbackNotice]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													onClick: () => handleSelectField("duressCodePrompt", "Silent Duress Code Prompt", "text", apk.duressCodePrompt),
													className: `text-center text-[10px] font-mono text-slate-500 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
													children: ["🔒 ", apk.duressCodePrompt]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-10 bg-black flex items-center justify-center pb-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-32 h-1 bg-slate-700 rounded-full" })
										})
									]
								}),
								activePlatform === "exe" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full bg-slate-950 rounded-xl border border-slate-700 shadow-2xl overflow-hidden font-sans",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => handleSelectField("windowTitle", "Desktop Window Title", "text", exe.windowTitle),
											className: `flex items-center gap-2 text-xs font-mono font-bold text-slate-300 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-red-500",
												children: "🛡️"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: exe.windowTitle })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-3 h-3 rounded bg-slate-700 text-slate-300 flex items-center justify-center text-[9px]",
													children: "_"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-3 h-3 rounded bg-slate-700 text-slate-300 flex items-center justify-center text-[9px]",
													children: "□"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-3 h-3 rounded bg-red-600 text-white flex items-center justify-center text-[9px]",
													children: "✕"
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-6 space-y-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-slate-800 pb-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												onClick: () => handleSelectField("dispatchHeader", "Command Center Header", "text", exe.dispatchHeader),
												className: `text-2xl font-black font-mono uppercase text-white cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
												children: exe.dispatchHeader
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												onClick: () => handleSelectField("warRoomSubtitle", "War Room Subtitle", "text", exe.warRoomSubtitle),
												className: `text-xs font-mono text-slate-400 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
												children: exe.warRoomSubtitle
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												onClick: () => handleSelectField("threatLevelLabel", "Threat Level Tag", "text", exe.threatLevelLabel),
												className: `px-3 py-1 rounded bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
												children: exe.threatLevelLabel
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-3 gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 h-64 flex flex-col justify-between",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between text-xs font-mono text-slate-400",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SATELLITE GIS RADAR (LIVE)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-emerald-400",
															children: "● 14 NODES CONNECTED"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex-1 flex items-center justify-center text-slate-600 font-mono text-xs",
														children: "[ HIGH-RESOLUTION SATELLITE TILES & INCIDENT CLUSTERS ]"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														onClick: () => handleSelectField("satelliteFeedStatus", "GIS Telemetry Status", "text", exe.satelliteFeedStatus),
														className: `text-[10px] font-mono text-emerald-400/80 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
														children: exe.satelliteFeedStatus
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													onClick: () => handleSelectField("evidenceLedgerTitle", "Evidence Vault Title", "text", exe.evidenceLedgerTitle),
													className: `text-xs font-mono font-bold text-white mb-2 cursor-pointer ${!previewMode ? "hover:outline hover:outline-dashed hover:outline-amber-400" : ""}`,
													children: exe.evidenceLedgerTitle
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2 text-[10px] font-mono text-slate-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "p-2 rounded bg-slate-950 border border-slate-800",
														children: "✓ Block #49281 • Sealed"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "p-2 rounded bg-slate-950 border border-slate-800",
														children: "✓ Incident #082 • Audio Recorded"
													})]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "w-full py-2 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded-lg",
													children: "BROADCAST ALL RESPONDERS"
												})]
											})]
										})]
									})]
								})
							]
						})
					}),
					!previewMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "w-80 bg-slate-900/95 border-l border-slate-800 flex flex-col z-10 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-mono font-bold text-white uppercase tracking-wider",
								children: "⚙️ Property Inspector"
							}), selectedField && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedField(null),
								className: "text-[10px] text-slate-400 hover:text-white font-mono",
								children: "Deselect"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 overflow-y-auto p-4 space-y-5",
							children: selectedField ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-mono text-slate-400 uppercase block mb-1",
										children: "Target Element"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-bold text-amber-400 font-mono bg-slate-950 p-2 rounded border border-slate-800",
										children: selectedField.label
									})] }),
									selectedField.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-mono text-slate-400 uppercase block mb-1",
										children: "Content Text"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 4,
										value: selectedField.value,
										onChange: (e) => handleFieldValueChange(e.target.value),
										className: "w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-sans text-white focus:border-amber-500 outline-none leading-relaxed"
									})] }) : selectedField.type === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[10px] font-mono text-slate-400 uppercase block mb-1",
												children: "Image Asset URL"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: selectedField.value,
												onChange: (e) => handleFieldValueChange(e.target.value),
												className: "w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:border-amber-500 outline-none"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-full h-24 rounded-lg bg-black/50 border border-slate-800 flex items-center justify-center overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: selectedField.value,
													alt: "Preview",
													className: "max-h-full object-contain"
												})
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[10px] font-mono text-slate-400 uppercase block mb-1",
										children: "Content Text"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: selectedField.value,
										onChange: (e) => handleFieldValueChange(e.target.value),
										className: "w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-sans text-white focus:border-amber-500 outline-none"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-3 border-t border-slate-800",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-amber-400",
												children: "✨"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-mono font-bold text-white uppercase",
												children: "Gemini AI Assistant"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													placeholder: "Context (e.g. 'More urgent', 'isiZulu translation')",
													value: aiPrompt,
													onChange: (e) => setAiPrompt(e.target.value),
													className: "w-full p-2 bg-slate-950 border border-slate-800 rounded text-xs font-mono text-slate-200 outline-none placeholder:text-slate-600"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: handleAiGenerate,
													disabled: isAiGenerating,
													className: "w-full py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-mono font-bold text-xs shadow transition-all disabled:opacity-50",
													children: isAiGenerating ? "Generating Suggestions..." : "✨ Generate AI Variations"
												}),
												aiSuggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5 pt-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[9px] font-mono text-slate-400 uppercase block",
														children: "Click to apply:"
													}), aiSuggestions.map((sug, si) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														onClick: () => handleApplyAiSuggestion(sug),
														className: "p-2 rounded bg-slate-950 border border-slate-800 hover:border-amber-500 cursor-pointer text-xs font-sans text-slate-300 hover:text-white transition-all",
														children: [
															"\"",
															sug,
															"\""
														]
													}, si))]
												})
											]
										})]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-12 text-slate-500 font-mono text-xs space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl",
									children: "👆"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Click any element in the live simulator to inspect and edit its wording or media." })]
							})
						})]
					})
				]
			}),
			platformPickerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[999999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-black uppercase tracking-tight text-white font-mono",
							children: "Select Target Environment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-400 font-mono mt-0.5",
							children: "Which platform structure would you like to visually customize?"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setPlatformPickerOpen(false),
							className: "p-1 rounded bg-slate-800 text-slate-400 hover:text-white",
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => {
									setPlatform("web");
									setPlatformPickerOpen(false);
								},
								className: `p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${activePlatform === "web" ? "bg-amber-950/30 border-amber-500 text-amber-300 ring-2 ring-amber-500/20" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-3xl mb-2",
										children: "🌐"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-sm text-white mb-1",
										children: "SafetyLink.online"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-slate-400 leading-relaxed",
										children: "Live Web Platform, Hero Dispatch, Pricing Tiers, and Responder Portal."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 text-[10px] font-mono text-amber-400 font-bold",
									children: activePlatform === "web" ? "● CURRENTLY ACTIVE" : "SELECT WEB →"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => {
									setPlatform("apk");
									setPlatformPickerOpen(false);
								},
								className: `p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${activePlatform === "apk" ? "bg-amber-950/30 border-amber-500 text-amber-300 ring-2 ring-amber-500/20" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-3xl mb-2",
										children: "📱"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-sm text-white mb-1",
										children: "SafetyLink APK"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-slate-400 leading-relaxed",
										children: "Android Mobile Shell, Big SOS Button, BLE Keyfob radar, and GSM offline SMS."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 text-[10px] font-mono text-amber-400 font-bold",
									children: activePlatform === "apk" ? "● CURRENTLY ACTIVE" : "SELECT APK →"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => {
									setPlatform("exe");
									setPlatformPickerOpen(false);
								},
								className: `p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${activePlatform === "exe" ? "bg-amber-950/30 border-amber-500 text-amber-300 ring-2 ring-amber-500/20" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-3xl mb-2",
										children: "💻"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-sm text-white mb-1",
										children: "SafetyLink EXE"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-slate-400 leading-relaxed",
										children: "Windows Desktop Console, Multi-Monitor War Room, Satellite GIS telemetry."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 text-[10px] font-mono text-amber-400 font-bold",
									children: activePlatform === "exe" ? "● CURRENTLY ACTIVE" : "SELECT EXE →"
								})]
							})
						]
					})]
				})
			}),
			publishModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[999999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-slate-800 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl",
								children: "🚀"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-black uppercase text-white font-mono",
								children: "Publish Platform Changes"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setPublishModalOpen(false);
								setPublishResult(null);
							},
							className: "text-slate-400 hover:text-white",
							children: "✕"
						})]
					}), !publishResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-xs font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-slate-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Current Version:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-white",
											children: ["v", version]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-slate-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Next Version:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-emerald-400 font-bold",
											children: ["v", version.split(".").map((p, i) => i === 2 ? (parseInt(p, 10) || 896) + 1 : p).join(".")]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-slate-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Target Platforms:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-amber-400",
											children: "Web • APK • EXE"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] font-mono text-slate-400 uppercase block mb-1",
								children: "Release Notes / Changelog"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: releaseNotes,
								onChange: (e) => setReleaseNotes(e.target.value),
								placeholder: "e.g. Updated emergency headlines & new hero branding",
								className: "w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white outline-none focus:border-amber-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 font-mono",
								children: [
									"📡 ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Live OTA Broadcast:" }),
									" Connected users will receive an in-app \"Update Available\" notification and will instantly pull these new texts, images, and layout without redownloading a full APK binary!"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setPublishModalOpen(false),
									className: "px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono font-bold",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handlePublish,
									disabled: isPublishing,
									className: "px-5 py-2 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-mono font-bold shadow-lg",
									children: isPublishing ? "Broadcasting Update..." : "Confirm & Publish Live"
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-4 space-y-4 font-mono",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-4xl",
								children: "🎉"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-base font-bold text-emerald-400",
								children: publishResult.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-400",
								children: [
									"The live platform version has been incremented to v",
									publishResult.version,
									". All clients will pull this updated layout."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setPublishModalOpen(false);
									setPublishResult(null);
								},
								className: "px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg",
								children: "Close"
							})
						]
					})]
				})
			}),
			toastMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999999] bg-slate-900 border border-amber-500/50 text-white px-4 py-2 rounded-xl text-xs font-mono shadow-2xl flex items-center gap-2 animate-slideUp",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-amber-400",
					children: "✓"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: toastMessage })]
			})
		]
	});
};
//#endregion
//#region src/components/AdminPanel.tsx
var slide1 = getR2StreamUrl("Random platform background.png");
var slide2 = getR2StreamUrl("Emergency_Response_Platform_Architecture_Overview.png");
var slide3 = getR2StreamUrl("IMG_20260914_221811.png");
var slide4 = getR2StreamUrl("Polish_20260914_220631067.png");
var slide5 = getR2StreamUrl("IMG_20260914_223311.png");
var newBg1 = getR2StreamUrl("Emergency_Mesh_Platform_Overview.png");
var newLogo1 = getR2StreamUrl("IMG_20260914_223547.png");
var AdminPanel = () => {
	const [showEditorialStudio, setShowEditorialStudio] = (0, import_react.useState)(false);
	const { users, organizations, panicEvents, logout, updateUserProfile, deleteUserProfile, updateOrganization, deleteOrganization, resolvePanic, addAuditLog, thingsBoardToken, setThingsBoardToken, customBackendUrl, setCustomBackendUrl, approveOrganization, customTools, addCustomTool, deleteCustomTool, adminUpdateSubscription, exportToGoogleDrive, refreshClientDatabase, addToast, adminSummaryStats, adminAuditLogs, minSupportedVersion, adminUpdateUserStatus, updateMinSupportedVersion } = useAppStore();
	const [minVerInput, setMinVerInput] = (0, import_react.useState)(minSupportedVersion || "1.0.0");
	(0, import_react.useEffect)(() => {
		if (minSupportedVersion) setMinVerInput(minSupportedVersion);
	}, [minSupportedVersion]);
	const userCountsByOrg = (0, import_react.useMemo)(() => {
		const counts = {};
		users.forEach((u) => {
			if (u.orgCode) counts[u.orgCode] = (counts[u.orgCode] || 0) + 1;
		});
		return counts;
	}, [users]);
	const adminSlides = [
		newBg1,
		newLogo1,
		slide3,
		slide4,
		slide5,
		slide1,
		slide2
	];
	const [currentSlide, setCurrentSlide] = (0, import_react.useState)(0);
	const [backendUrlInput, setBackendUrlInput] = (0, import_react.useState)(customBackendUrl);
	(0, import_react.useEffect)(() => {
		useAppStore.getState().fetchSuperAdminData();
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % adminSlides.length);
		}, 6e3);
		return () => clearInterval(timer);
	}, [adminSlides.length]);
	const [tbTokenInput, setTbTokenInput] = (0, import_react.useState)(thingsBoardToken);
	const [tbTestStatus, setTbTestStatus] = (0, import_react.useState)("idle");
	const [githubToken, setGithubToken] = (0, import_react.useState)("");
	const [releaseStatus, setReleaseStatus] = (0, import_react.useState)("idle");
	const triggerRelease = async () => {
		if (!githubToken) return;
		setReleaseStatus("triggering");
		try {
			const workflows = [
				"build-apk.yml",
				"build-electron.yml",
				"deploy-safetylink-web.yml"
			];
			let allOk = true;
			for (const wf of workflows) if (!(await fetch(`https://api.github.com/repos/Charesmagna/SafetyLink-Core/actions/workflows/${wf}/dispatches`, {
				method: "POST",
				headers: {
					"Accept": "application/vnd.github.v3+json",
					"Authorization": `Bearer ${githubToken.trim()}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ ref: "main" })
			})).ok) allOk = false;
			setReleaseStatus(allOk ? "ok" : "fail");
			addAuditLog("SYSTEM", allOk ? "INFO" : "WARN", allOk ? "OTA Release Workflows Triggered" : "OTA Release Workflows Failed", "");
			setTimeout(() => setReleaseStatus("idle"), 5e3);
		} catch (err) {
			setReleaseStatus("fail");
			setTimeout(() => setReleaseStatus("idle"), 5e3);
		}
	};
	const [credsStatus, setCredsStatus] = (0, import_react.useState)(null);
	const [checkingCreds, setCheckingCreds] = (0, import_react.useState)(false);
	const runCredsAudit = async () => {
		setCheckingCreds(true);
		try {
			const res = await fetch("/api/system/credentials-status");
			if (res.ok) {
				const data = await res.json();
				setCredsStatus(data);
			}
		} catch (err) {
			console.error("Failed to run credentials audit:", err);
		} finally {
			setCheckingCreds(false);
		}
	};
	(0, import_react.useEffect)(() => {
		runCredsAudit();
	}, []);
	const [activeTab, setActiveTab] = (0, import_react.useState)("OVERVIEW");
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [orgFilter, setOrgFilter] = (0, import_react.useState)("");
	const activePanicEventsCount = (0, import_react.useMemo)(() => panicEvents.filter((p) => p.status !== "RESOLVED").length, [panicEvents]);
	const globalCustomTools = (0, import_react.useMemo)(() => customTools.filter((t) => !t.targetOrgId), [customTools]);
	const pendingOrgs = (0, import_react.useMemo)(() => organizations.filter((o) => o.approved === false), [organizations]);
	const approvedOrgs = (0, import_react.useMemo)(() => organizations.filter((o) => o.approved !== false), [organizations]);
	const [newToolTitle, setNewToolTitle] = (0, import_react.useState)("");
	const [newToolDesc, setNewToolDesc] = (0, import_react.useState)("");
	const [newToolType, setNewToolType] = (0, import_react.useState)("INFO");
	const [newToolValue, setNewToolValue] = (0, import_react.useState)("");
	const [editingUserId, setEditingUserId] = (0, import_react.useState)(null);
	const [editUserFullName, setEditUserFullName] = (0, import_react.useState)("");
	const [editUserPhone, setEditUserPhone] = (0, import_react.useState)("");
	const [editUserEmail, setEditUserEmail] = (0, import_react.useState)("");
	const [editUserOrgCode, setEditUserOrgCode] = (0, import_react.useState)("");
	const [editUserLiveSms, setEditUserLiveSms] = (0, import_react.useState)(false);
	const [editUserCanUseAdminTwilio, setEditUserCanUseAdminTwilio] = (0, import_react.useState)(false);
	const [editingOrgId, setEditingOrgId] = (0, import_react.useState)(null);
	const [editOrgName, setEditOrgName] = (0, import_react.useState)("");
	const [editOrgContactName, setEditOrgContactName] = (0, import_react.useState)("");
	const [editOrgContactEmail, setEditOrgContactEmail] = (0, import_react.useState)("");
	const handleEditUserClick = (u) => {
		setEditingUserId(u.id);
		setEditUserFullName(u.fullName);
		setEditUserPhone(u.phone);
		setEditUserEmail(u.email);
		setEditUserOrgCode(u.orgCode);
		setEditUserLiveSms(u.liveSmsEnabled ?? false);
		setEditUserCanUseAdminTwilio(u.canUseAdminTwilio ?? false);
	};
	const handleSaveUser = (id) => {
		updateUserProfile(id, {
			fullName: editUserFullName,
			phone: editUserPhone,
			email: editUserEmail,
			orgCode: editUserOrgCode,
			liveSmsEnabled: editUserLiveSms,
			canUseAdminTwilio: editUserCanUseAdminTwilio
		});
		setEditingUserId(null);
		addAuditLog("SECURITY", "INFO", `Admin updated user record ${id}`);
	};
	const [isSyncingDrive, setIsSyncingDrive] = (0, import_react.useState)(false);
	const [viewingUserDossier, setViewingUserDossier] = (0, import_react.useState)(null);
	const [driveSyncSuccessInfo, setDriveSyncSuccessInfo] = (0, import_react.useState)(null);
	const [viewMode, setViewMode] = (0, import_react.useState)("table");
	const [roleFilter, setRoleFilter] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("");
	const [editorialTargetPlatform, setEditorialTargetPlatform] = (0, import_react.useState)("web");
	const { version: studioVersion, web: editorialWeb, apk: editorialApk, exe: editorialExe, updateField: updateEditorialField, saveDraft: saveEditorialDraft, publishLive: publishEditorialLive, resetToDefaults: resetEditorialDefaults, isSaving: isEditorialSaving, isPublishing: isEditorialPublishing } = useEditorialStore();
	const handleDownloadCsv = () => {
		const headers = "ID,Full Name,Username,Phone,WhatsApp,Email,Org Code,Org Name,Role,Status,Registration Date,Home Address,Work Address,Preferred Hospital,Medical Notes,Emergency Contacts,Live SMS Enabled\n";
		const rows = users.map((u) => {
			const uOrg = organizations.find((o) => o.id === u.orgCode);
			const orgName = uOrg ? uOrg.name : u.orgCode ? u.orgCode : "Independent";
			return `"${u.id}","${(u.fullName || "").replace(/"/g, "\"\"")}","${(u.username || "").replace(/"/g, "\"\"")}","${(u.phone || "").replace(/"/g, "\"\"")}","${(u.whatsapp || u.phone || "").replace(/"/g, "\"\"")}","${(u.email || "").replace(/"/g, "\"\"")}","${(u.orgCode || "None").replace(/"/g, "\"\"")}","${orgName.replace(/"/g, "\"\"")}","${(u.role || "Community Member").replace(/"/g, "\"\"")}","${(u.subscriptionStatus || "active").replace(/"/g, "\"\"")}","${new Date(u.createdAt).toISOString()}","${(u.homeAddress || "").replace(/"/g, "\"\"")}","${(u.workAddress || "").replace(/"/g, "\"\"")}","${(u.preferredHospital || "").replace(/"/g, "\"\"")}","${(u.medicalInfo || "").replace(/"/g, "\"\"")}","${(u.emergencyContactsList || "").replace(/"/g, "\"\"")}","${u.liveSmsEnabled ? "YES" : "NO"}"`;
		}).join("\n");
		const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `SafetyLink_Users_Master_Roster_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		addToast(`Master user roster CSV (${users.length} users) downloaded successfully.`, "success");
	};
	const handleDownloadJson = () => {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(users, null, 2));
		const downloadAnchor = document.createElement("a");
		downloadAnchor.setAttribute("href", dataStr);
		downloadAnchor.setAttribute("download", `SafetyLink_Users_Master_Registry_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`);
		document.body.appendChild(downloadAnchor);
		downloadAnchor.click();
		downloadAnchor.remove();
		addToast(`Exported ${users.length} user records to JSON archive.`, "success");
	};
	const handlePrintRoster = () => {
		window.print();
	};
	const handleDriveSync = async () => {
		setIsSyncingDrive(true);
		try {
			await refreshClientDatabase();
			const res = await exportToGoogleDrive();
			if (res.success) {
				setDriveSyncSuccessInfo({
					fileId: res.fileId || `SL_DRIVE_ROSTER_${Date.now()}`,
					fileUrl: res.fileUrl || `https://drive.google.com/file/d/${res.fileId}/view`,
					syncedAt: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
					count: users.length
				});
				addToast(`Master user document saved to Google Drive (Doc ID: ${res.fileId?.slice(-8)})`, "success");
			} else addToast(res.error || "Google Drive sync failed", "error");
		} catch (err) {
			addToast("Drive sync error: " + err.message, "error");
		} finally {
			setIsSyncingDrive(false);
		}
	};
	const handleEditOrgClick = (o) => {
		setEditingOrgId(o.id);
		setEditOrgName(o.name);
		setEditOrgContactName(o.contactName);
		setEditOrgContactEmail(o.contactEmail);
	};
	const handleSaveOrg = (id) => {
		updateOrganization(id, {
			name: editOrgName,
			contactName: editOrgContactName,
			contactEmail: editOrgContactEmail
		});
		setEditingOrgId(null);
		addAuditLog("SECURITY", "INFO", `Admin updated organization record ${id}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-screen max-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden pb-12 relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0 pointer-events-none overflow-hidden select-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: 1.03
						},
						animate: { opacity: .15 },
						exit: {
							opacity: 0,
							scale: .97
						},
						transition: {
							duration: 1.5,
							ease: "easeInOut"
						},
						className: "absolute inset-0 w-full h-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: adminSlides[currentSlide],
							alt: "SafetyLink Administration Background",
							className: "w-full h-full object-cover filter brightness-[0.35] contrast-[1.1] saturate-[0.8]",
							referrerPolicy: "no-referrer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950" })]
					}, currentSlide)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 digital-grid opacity-[0.04]" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full bg-gradient-to-r from-amber-600 via-orange-600 to-blue-600 text-white font-mono text-[10px] font-bold text-center py-2 px-4 tracking-wider uppercase flex items-center justify-center gap-2 relative z-50 shadow-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-red-400 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔒 SECURED CORE ADMINISTRATIVE INTERACTION PROTOCOL LOCKED 🔒" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "bg-slate-900 border-b border-slate-900 py-4 px-6 flex justify-between items-center shadow-lg relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoSetPart, {
							part: "badge",
							size: 44,
							rounded: "xl"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-sm font-black tracking-tight text-slate-100 uppercase font-mono",
							children: "SL Global Command"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] text-amber-400 font-mono uppercase tracking-widest font-black",
							children: [
								"System Admin (",
								ADMIN_ORG_CODE.toUpperCase(),
								") // ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-amber-500/80 font-black",
									children: "POWERED BY TM MEDIA SOLUTIONS"
								})
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowEditorialStudio(true),
							className: "flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-mono font-bold text-[10px] uppercase tracking-wider rounded-full shadow-lg shadow-amber-950/40 border border-amber-400/40 transition-all cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🎨 EDIT ENVIRONMENT" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: logout,
							className: "px-4 py-1.5 bg-amber-900/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 hover:text-white transition-colors text-[10px] font-mono font-bold rounded-full",
							children: "SIGNOUT SECURE LINK"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "bg-slate-900/50 border-b border-slate-900 flex p-1 justify-start gap-1 overflow-x-auto relative z-10",
				children: [
					"OVERVIEW",
					"EDITORIAL",
					"USERS",
					"CLIENTS",
					"R2_MEDIA",
					"ORGANIZATIONS",
					"PANICS",
					"FLEET",
					"SETTINGS",
					"ADVANCED_ROLES"
				].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setActiveTab(tab);
						setSearchTerm("");
					},
					className: `px-4.5 py-2.5 text-[10px] font-mono font-bold tracking-wider rounded-xl uppercase transition-all whitespace-nowrap ${activeTab === tab ? "bg-amber-600 text-white" : "text-slate-400 hover:text-slate-200"}`,
					children: tab === "EDITORIAL" ? "🎨 edit environment (studio)" : tab === "PANICS" ? "🚨 distress signals" : tab === "ORGANIZATIONS" ? "🏢 organizations" : tab === "USERS" ? "👥 registered users" : tab === "CLIENTS" ? "📁 client database & drive" : tab === "R2_MEDIA" ? "🎬 r2 media & evidence (138)" : tab === "FLEET" ? "📱 device fleet & updates" : tab === "SETTINGS" ? "⚙️ tools & settings" : tab === "ADVANCED_ROLES" ? "🛡️ security roles" : "📊 overview"
				}, tab))
			}),
			showEditorialStudio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorialStudio, { onClose: () => setShowEditorialStudio(false) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 overflow-y-auto min-h-0 max-w-5xl w-full mx-auto p-4 md:p-6 space-y-6 relative z-10",
				children: [
					activeTab === "OVERVIEW" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-fadeIn text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-red-950/30 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl",
										children: "🎨"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-black font-mono text-white uppercase tracking-wider",
											children: "Platform Environment Studio (Wix / Sitey-Style)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] font-mono font-bold",
											children: "READY"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-slate-300 mt-1 max-w-xl",
										children: [
											"Visual drag-and-drop platform editor. Interactively modify text, hero banners, theme colors, and section structures for ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SafetyLink.online" }),
											", ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Android APK" }),
											", and ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Desktop EXE" }),
											", then push live OTA updates to all connected users."
										]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setShowEditorialStudio(true),
									className: "px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-mono font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-950/50 flex items-center gap-2 shrink-0 transition-all cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🚀 Launch Visual Editor" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-l-4 border-l-emerald-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-emerald-500 text-xl",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "fa-brands fa-github" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-bold text-slate-200",
										children: "Pipeline Status: SafetyLink Core"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-400 mt-1",
										children: "Live tracking of GitHub Actions CI/CD deployment pipeline."
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-end gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://github.com/Charesmagna/SafetyLink-Core/actions",
										target: "_blank",
										rel: "noreferrer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "https://github.com/Charesmagna/SafetyLink-Core/actions/workflows/build-apk.yml/badge.svg",
											alt: "Build APK Status",
											className: "h-5"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/safetylink.apk",
										target: "_blank",
										rel: "noreferrer",
										className: "text-[10px] font-mono text-amber-500 hover:text-amber-400 hover:underline",
										children: "Download Latest Artifact →"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 md:grid-cols-4 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-panel p-5 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-mono uppercase text-slate-500 font-bold block",
												children: "Total Residents / Users"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-2xl font-black font-mono text-slate-100",
												children: adminSummaryStats?.totalAccounts ?? users.length
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[9px] text-slate-400",
												children: ["24h Active: ", adminSummaryStats?.activeLast24Hours ?? 0]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-panel p-5 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-mono uppercase text-slate-500 font-bold block",
												children: "Active Telemetry Windows"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xl font-black font-mono text-cyan-400",
												children: [
													adminSummaryStats?.activeLast24Hours ?? 0,
													" / ",
													adminSummaryStats?.activeLast7Days ?? 0,
													" / ",
													adminSummaryStats?.activeLast30Days ?? 0
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[9px] text-slate-400",
												children: "24h · 7d · 30d active users"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-panel p-5 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-mono uppercase text-slate-500 font-bold block",
												children: "Failed Logins (24h)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-2xl font-black font-mono ${(adminSummaryStats?.failedLogins24h ?? 0) > 10 ? "text-red-400" : "text-amber-400"}`,
												children: adminSummaryStats?.failedLogins24h ?? 0
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[9px] text-slate-400",
												children: ["Active Alerts: ", activePanicEventsCount]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-panel p-5 space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-mono uppercase text-slate-500 font-bold block",
												children: "Organizations & Mesh"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-2xl font-black font-mono text-emerald-400",
												children: organizations.length
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[9px] text-slate-400",
												children: ["30d Panics: ", adminSummaryStats?.panicsLast30Days ?? 0]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass-panel p-5 space-y-3 border-l-4 border-l-amber-500",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-xs font-black font-mono uppercase text-amber-300 tracking-wider",
												children: "Minimum Supported App Version Policy"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[9px] font-mono text-slate-400",
												children: ["Current Rule: v", minSupportedVersion]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-400",
											children: "Installations older than this version are blocked from accessing live emergency workflows until they install the latest update."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: minVerInput,
												onChange: (e) => setMinVerInput(e.target.value),
												placeholder: "e.g. 1.1.900",
												className: "flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-100"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: async () => {
													const ok = await updateMinSupportedVersion(minVerInput);
													addToast(ok ? `Minimum supported version updated to v${minVerInput}` : "Failed to update minimum version policy", ok ? "success" : "error");
												},
												className: "px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-mono font-bold uppercase cursor-pointer",
												children: "Enforce Version"
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass-panel p-5 space-y-3 border-l-4 border-l-blue-500",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-xs font-black font-mono uppercase text-blue-300 tracking-wider",
											children: "Client Versions & Telemetry Disclosure"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2",
											children: (adminSummaryStats?.versionsBreakdown || []).length > 0 ? adminSummaryStats.versionsBreakdown.map((vb, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-200",
												children: [
													"v",
													vb.version,
													": ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "text-emerald-400",
														children: vb.count
													})
												]
											}, idx)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-mono text-slate-500",
												children: "Version telemetry populates automatically as devices sign in."
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-slate-400 leading-relaxed",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Collected Telemetry Disclosure:" }), " SafetyLink records device OS/model, app version, last-seen timestamp, organization membership, and failed login counts solely for incident readiness, dispatch reliability, and security auditing."]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel p-6 flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl",
									children: "🛡️"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-bold text-slate-200",
										children: "SafetyLink Master Node Administration"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-400 leading-relaxed",
										children: "Welcome back, Global Administrator. You have full edit/delete privileges for all registered residents, students, security personnel, and organization profiles database-wide. To simulate student distress events, trigger an SOS on a user session, then check the distress signals feed."
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel p-6 space-y-4 text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-bold text-slate-200",
										children: "IoT Dashboard Integration"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-400 leading-relaxed mt-1",
										children: "Every real (non-drill) SOS trigger pushes incident telemetry to your IoT Dashboard, giving org-wide visibility on your dashboard. Paste your device access token below -- it's stored only on this device, never committed to the repo."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: tbTokenInput,
												onChange: (e) => setTbTokenInput(e.target.value),
												placeholder: "IoT Device Access Token",
												className: "flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-600"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setThingsBoardToken(tbTokenInput.trim()),
												className: "px-4 py-2 text-[10px] font-mono font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors",
												children: "SAVE"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												disabled: !thingsBoardToken || tbTestStatus === "sending",
												onClick: async () => {
													setTbTestStatus("sending");
													const ok = await sendTestEvent(thingsBoardToken);
													setTbTestStatus(ok ? "ok" : "fail");
													addAuditLog("SYSTEM", ok ? "INFO" : "WARN", ok ? "IoT test event sent" : "IoT test event failed", "");
												},
												className: "px-4 py-2 text-[10px] font-mono font-bold rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-600 text-white transition-colors whitespace-nowrap",
												children: tbTestStatus === "sending" ? "SENDING..." : "SEND TEST EVENT"
											})
										]
									}),
									tbTestStatus === "ok" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-emerald-400 font-mono",
										children: "✓ Delivered -- check the Latest Telemetry tab on your IoT Dashboard."
									}),
									tbTestStatus === "fail" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-red-400 font-mono",
										children: "✗ Failed to reach IoT Dashboard. Check the token and your connection."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel p-6 space-y-4 text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-bold text-slate-200",
										children: "Over-The-Air (OTA) Release Management"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-400 leading-relaxed mt-1",
										children: "Trigger the GitHub Actions workflows to build and publish a new release of SafetyLink (APK, EXE, and Web). Requires a GitHub Personal Access Token with repo workflow permissions."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											value: githubToken,
											onChange: (e) => setGithubToken(e.target.value),
											placeholder: "GitHub Personal Access Token (PAT)",
											className: "flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-600"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											disabled: !githubToken || releaseStatus === "triggering",
											onClick: triggerRelease,
											className: "px-4 py-2 text-[10px] font-mono font-bold rounded-xl bg-purple-700 hover:bg-purple-600 disabled:bg-slate-800 disabled:text-slate-600 text-white transition-colors whitespace-nowrap",
											children: releaseStatus === "triggering" ? "TRIGGERING..." : "PUBLISH RELEASE"
										})]
									}),
									releaseStatus === "ok" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-emerald-400 font-mono",
										children: "✓ Workflows triggered successfully. Check the GitHub Actions tab."
									}),
									releaseStatus === "fail" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-red-400 font-mono",
										children: "✗ Failed to trigger workflows. Ensure your PAT has the correct permissions."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs font-bold text-amber-400 font-mono uppercase tracking-wider",
										children: "System Administrative Audit Trails"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-mono text-slate-500",
										children: [adminAuditLogs.length, " server actions logged"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-950/80 border border-slate-900 rounded-3xl p-4 h-64 overflow-y-auto font-mono text-[10px] space-y-2.5",
									children: [
										adminAuditLogs.map((log, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-b border-slate-900/40 pb-2 text-slate-300",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-slate-500",
													children: [
														"[",
														new Date(log.created_at || Date.now()).toLocaleString(),
														"]"
													]
												}),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-red-400 font-bold",
													children: log.action
												}),
												" ",
												"on target ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-amber-300",
													children: log.target_id
												}),
												" ",
												log.details ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-slate-500",
													children: [
														"(",
														log.details,
														")"
													]
												}) : null
											]
										}, log.id || idx)),
										users.map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-b border-slate-900/40 pb-2 last:border-0 text-slate-400",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-slate-500",
													children: [
														"[",
														new Date(u.createdAt).toLocaleTimeString(),
														"]"
													]
												}),
												" USER_REGISTRY: Resident ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-amber-400",
													children: ["@", u.username]
												}),
												" registered under organization ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-blue-400",
													children: u.orgCode || "Independent Node"
												}),
												"."
											]
										}, i)),
										organizations.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-b border-slate-900/40 pb-2 last:border-0 text-slate-400",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-slate-500",
													children: [
														"[",
														new Date(o.createdAt).toLocaleTimeString(),
														"]"
													]
												}),
												" ORG_REGISTRY: Node ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-emerald-400",
													children: o.name
												}),
												" provisioned securely via generated ID ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-emerald-300 font-bold",
													children: o.id
												}),
												"."
											]
										}, i))
									]
								})]
							})
						]
					}),
					activeTab === "EDITORIAL" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-fadeIn text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-red-950/30 border border-amber-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl",
												children: "🎨"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-sm font-black font-mono text-white uppercase tracking-wider",
												children: "Platform Environment Studio (Multi-Target CMS)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] font-mono font-bold",
												children: [
													"v",
													studioVersion,
													" LIVE"
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-slate-400 max-w-2xl leading-relaxed",
										children: [
											"Interactively modify headlines, banners, tactical colors, and emergency copy across ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SafetyLink.online" }),
											", ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Android APK" }),
											", and ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Command Desktop EXE" }),
											", then deploy live OTA updates directly to all devices."
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: async () => {
												if (await saveEditorialDraft()) addToast("Editorial draft saved successfully.", "success");
											},
											disabled: isEditorialSaving,
											className: "px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-mono text-xs font-bold transition-all",
											children: isEditorialSaving ? "Saving..." : "💾 Save Draft"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: async () => {
												const res = await publishEditorialLive(`Platform update v${studioVersion}`);
												if (res.success) addToast(`Published live to version v${res.version}`, "success");
											},
											disabled: isEditorialPublishing,
											className: "px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono font-black text-xs uppercase tracking-wider shadow-lg shadow-red-950/50 transition-all cursor-pointer",
											children: isEditorialPublishing ? "Deploying..." : "🚀 Publish Live (OTA)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowEditorialStudio(true),
											className: "px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-amber-950 cursor-pointer",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🖥️ Open Fullscreen Canvas" })
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border-b border-slate-900 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mr-2",
									children: "Target Environment:"
								}), [
									{
										id: "web",
										name: "🌐 SafetyLink.online (Web)",
										desc: "Official Public Gateway"
									},
									{
										id: "apk",
										name: "📱 Mobile APK (Android)",
										desc: "Field & Student Devices"
									},
									{
										id: "exe",
										name: "💻 Command War Room (EXE)",
										desc: "Dispatcher Desktop"
									}
								].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEditorialTargetPlatform(p.id),
									className: `px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${editorialTargetPlatform === p.id ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"}`,
									children: p.name
								}, p.id))]
							}),
							editorialTargetPlatform === "web" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel p-5 rounded-2xl space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-b border-slate-900 pb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs font-black font-mono text-slate-200 uppercase tracking-wider",
										children: "🌐 Web Platform Content Editor (safetylink.online)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono text-emerald-400",
										children: "STATUS: PRODUCTION ACTIVE"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Hero Badge Tagline"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialWeb.heroBadge,
												onChange: (e) => updateEditorialField("web", "heroBadge", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Primary Title 1"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialWeb.heroTitle1,
												onChange: (e) => updateEditorialField("web", "heroTitle1", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Secondary Title 2"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialWeb.heroTitle2,
												onChange: (e) => updateEditorialField("web", "heroTitle2", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Hotline Emergency Phone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialWeb.hotlinePhone,
												onChange: (e) => updateEditorialField("web", "hotlinePhone", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1 md:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Mission Subtitle"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 2,
												value: editorialWeb.heroSubtitle,
												onChange: (e) => updateEditorialField("web", "heroSubtitle", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Primary Action Button (CTA)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialWeb.heroCtaPrimary,
												onChange: (e) => updateEditorialField("web", "heroCtaPrimary", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Tactical Accent Color"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "color",
													value: editorialWeb.primaryColor,
													onChange: (e) => updateEditorialField("web", "primaryColor", e.target.value),
													className: "w-10 h-10 rounded-lg bg-transparent border border-slate-800 cursor-pointer"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: editorialWeb.primaryColor,
													onChange: (e) => updateEditorialField("web", "primaryColor", e.target.value),
													className: "flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
												})]
											})]
										})
									]
								})]
							}),
							editorialTargetPlatform === "apk" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel p-5 rounded-2xl space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-b border-slate-900 pb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs font-black font-mono text-slate-200 uppercase tracking-wider",
										children: "📱 Android APK Field Client Editor"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono text-amber-400",
										children: "BUILD: R8 PROGUARD HARDENED"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Application Header Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialApk.appName,
												onChange: (e) => updateEditorialField("apk", "appName", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Status Perimeter Tag"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialApk.statusTag,
												onChange: (e) => updateEditorialField("apk", "statusTag", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Emergency SOS Button Label"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialApk.sosButtonText,
												onChange: (e) => updateEditorialField("apk", "sosButtonText", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Hardware BLE Keyfob Tag"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialApk.bleStatusText,
												onChange: (e) => updateEditorialField("apk", "bleStatusText", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1 md:col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Carrier Offline Fallback Notice"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialApk.offlineFallbackNotice,
												onChange: (e) => updateEditorialField("apk", "offlineFallbackNotice", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										})
									]
								})]
							}),
							editorialTargetPlatform === "exe" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel p-5 rounded-2xl space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-b border-slate-900 pb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs font-black font-mono text-slate-200 uppercase tracking-wider",
										children: "💻 Desktop War Room Command Console (EXE)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono text-blue-400",
										children: "MULTI-MONITOR MATRIX"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Command Window Title"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialExe.windowTitle,
												onChange: (e) => updateEditorialField("exe", "windowTitle", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Dispatch Header"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialExe.dispatchHeader,
												onChange: (e) => updateEditorialField("exe", "dispatchHeader", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Threat Level Banner"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialExe.threatLevelLabel,
												onChange: (e) => updateEditorialField("exe", "threatLevelLabel", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[9px] font-bold text-slate-400 uppercase",
												children: "Evidence Ledger Vault Title"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editorialExe.evidenceLedgerTitle,
												onChange: (e) => updateEditorialField("exe", "evidenceLedgerTitle", e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 focus:border-amber-500 outline-none"
											})]
										})
									]
								})]
							})
						]
					}),
					activeTab === "USERS" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-fadeIn text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-base font-black text-slate-100 font-mono uppercase tracking-wider",
										children: "Master User Registry & Telemetry Statistics"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold",
										children: [users.length, " REGISTERED"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-400 mt-1",
									children: "Complete official administrative roster of all registered campus students, security operators, and community citizens with full medical & contact records."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleDownloadCsv,
											className: "flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/40 transition-all cursor-pointer",
											title: "Download complete RFC 4180 CSV with all registration information",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📥 Download CSV" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleDownloadJson,
											className: "flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono font-bold text-xs rounded-xl transition-all cursor-pointer",
											title: "Download raw machine-readable JSON backup",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📄 JSON Backup" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handlePrintRoster,
											className: "flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono font-bold text-xs rounded-xl transition-all cursor-pointer",
											title: "Print official dossier report",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🖨️ Print Dossier" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: handleDriveSync,
											disabled: isSyncingDrive,
											className: "flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-blue-950/40 transition-all cursor-pointer disabled:opacity-50",
											title: "Synchronize and save roster document directly to Google Drive",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["☁️ ", isSyncingDrive ? "Syncing Drive..." : "Save to Google Drive"] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												useAppStore.getState().fetchSuperAdminData();
												refreshClientDatabase();
												addToast("Registry refreshed from central database.", "info");
											},
											className: "p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 rounded-xl text-xs font-mono transition-all cursor-pointer",
											title: "Refresh User Registry",
											children: "🔄"
										})
									]
								})]
							}),
							driveSyncSuccessInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg animate-fadeIn",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl text-emerald-400 shrink-0",
										children: "✓"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-black font-mono text-emerald-300 uppercase",
											children: "Master Document Saved to Google Drive"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[9px] font-mono text-slate-400",
											children: [
												"(",
												driveSyncSuccessInfo.count,
												" records at ",
												driveSyncSuccessInfo.syncedAt,
												")"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-slate-300 font-mono mt-0.5",
										children: [
											"Document ID: ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-white",
												children: driveSyncSuccessInfo.fileId
											}),
											" • Archived in Google Drive cloud storage."
										]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: driveSyncSuccessInfo.fileUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider shrink-0 shadow-md transition-all flex items-center gap-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔗 View in Google Drive" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3.5 glass-panel rounded-2xl space-y-1 border-l-2 border-l-amber-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8.5px] font-mono text-slate-400 uppercase block font-bold",
												children: "Total Users"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg font-black font-mono text-amber-400 block",
												children: users.length
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8px] font-mono text-slate-500 block",
												children: "100% On-Record"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3.5 glass-panel rounded-2xl space-y-1 border-l-2 border-l-blue-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8.5px] font-mono text-slate-400 uppercase block font-bold",
												children: "Node Members"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg font-black font-mono text-blue-400 block",
												children: users.filter((u) => Boolean(u.orgCode)).length
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8px] font-mono text-slate-500 block",
												children: "Bound to Residence"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3.5 glass-panel rounded-2xl space-y-1 border-l-2 border-l-purple-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8.5px] font-mono text-slate-400 uppercase block font-bold",
												children: "Independent Mesh"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg font-black font-mono text-purple-400 block",
												children: users.filter((u) => !u.orgCode).length
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8px] font-mono text-slate-500 block",
												children: "Private Citizens"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3.5 glass-panel rounded-2xl space-y-1 border-l-2 border-l-emerald-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8.5px] font-mono text-slate-400 uppercase block font-bold",
												children: "Active Licenses"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg font-black font-mono text-emerald-400 block",
												children: users.filter((u) => u.subscriptionStatus === "active" || !u.subscriptionStatus).length
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8px] font-mono text-slate-500 block",
												children: "Covered & Armed"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3.5 glass-panel rounded-2xl space-y-1 border-l-2 border-l-red-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8.5px] font-mono text-slate-400 uppercase block font-bold",
												children: "Medical Dossiers"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg font-black font-mono text-red-400 block",
												children: users.filter((u) => Boolean(u.medicalInfo || u.preferredHospital || u.medicalProfile)).length
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8px] font-mono text-slate-500 block",
												children: "Trauma Info Logged"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3.5 glass-panel rounded-2xl space-y-1 border-l-2 border-l-teal-500",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8.5px] font-mono text-slate-400 uppercase block font-bold",
												children: "Live SMS Relays"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg font-black font-mono text-teal-400 block",
												children: users.filter((u) => Boolean(u.liveSmsEnabled || u.phone)).length
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[8px] font-mono text-slate-500 block",
												children: "Cellular Ready"
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 glass-panel rounded-2xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 flex flex-col md:flex-row items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Search by name, @user, cell, email, address, hospital...",
											value: searchTerm,
											onChange: (e) => setSearchTerm(e.target.value),
											className: "w-full md:w-72 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: orgFilter,
											onChange: (e) => setOrgFilter(e.target.value),
											className: "w-full md:w-auto bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "All Organizations"
												}),
												organizations.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: org.id,
													children: org.name
												}, org.id)),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "none",
													children: "Independent Mesh Only"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: roleFilter,
											onChange: (e) => setRoleFilter(e.target.value),
											className: "w-full md:w-auto bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													children: "All Roles"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Community Member",
													children: "Community Member / Student"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Organization Administrator",
													children: "Organization Admin"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Dispatcher",
													children: "Control Room Dispatcher"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "Responder",
													children: "Armed Responder / Guard"
												})
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 shrink-0 bg-slate-950 p-1 rounded-xl border border-slate-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setViewMode("table"),
										className: `px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${viewMode === "table" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-slate-200"}`,
										children: "📊 Table View"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setViewMode("cards"),
										className: `px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${viewMode === "cards" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-slate-200"}`,
										children: "🗂️ Cards View"
									})]
								})]
							}),
							(() => {
								const filteredUsers = users.filter((u) => {
									const s = searchTerm.toLowerCase();
									const matchSearch = (u.fullName || "").toLowerCase().includes(s) || (u.username || "").toLowerCase().includes(s) || (u.phone || "").includes(s) || (u.email || "").toLowerCase().includes(s) || (u.homeAddress || "").toLowerCase().includes(s) || (u.preferredHospital || "").toLowerCase().includes(s) || (u.medicalInfo || "").toLowerCase().includes(s);
									const matchOrg = !orgFilter ? true : orgFilter === "none" ? !u.orgCode : u.orgCode === orgFilter;
									const matchRole = !roleFilter ? true : (u.role || "Community Member") === roleFilter;
									const matchStatus = !statusFilter ? true : (u.subscriptionStatus || "active") === statusFilter;
									return matchSearch && matchOrg && matchRole && matchStatus;
								});
								if (filteredUsers.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-12 text-center glass-panel rounded-2xl font-mono space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-3xl",
											children: "👥"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-sm font-bold text-slate-300",
											children: "No User Records Match Criteria"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-500",
											children: "Adjust search queries or clear organization and role filters."
										})
									]
								});
								if (viewMode === "table") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "glass-panel rounded-2xl overflow-hidden border border-slate-900 shadow-xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-x-auto max-h-[500px] custom-scrollbar",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
											className: "w-full text-left font-mono text-[11px] border-collapse",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
												className: "bg-slate-900/90 text-slate-400 uppercase text-[9px] tracking-wider sticky top-0 z-10 border-b border-slate-800",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "User & ID"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Contact (Cell/WA)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Email Address"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Org Node & Role"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Device / Ver / Last Seen"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Trauma & Hospital"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Account Status"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3 text-right",
														children: "Actions & Controls"
													})
												] })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
												className: "divide-y divide-slate-900/80",
												children: filteredUsers.map((u) => {
													const uOrg = organizations.find((o) => o.id === u.orgCode);
													const acctStatus = (u.accountStatus || "active").toUpperCase();
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
														className: "hover:bg-slate-900/40 transition-colors",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-3 px-3",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-center gap-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-400 text-xs shrink-0",
																		children: (u.fullName || u.username || "U").charAt(0).toUpperCase()
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-bold text-slate-100 block leading-tight",
																		children: u.fullName
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "text-[9px] text-slate-500",
																		children: [
																			"@",
																			u.username,
																			" • ",
																			u.id
																		]
																	})] })]
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-3 px-3 text-slate-200",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-0.5",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "block font-bold",
																		children: u.phone || "No phone"
																	}), u.whatsapp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "text-[8px] text-emerald-400 bg-emerald-950/40 px-1 py-0.2 rounded border border-emerald-500/20",
																		children: ["WA: ", u.whatsapp]
																	})]
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-3 px-3 text-slate-300 max-w-[140px] truncate",
																children: u.email
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-3 px-3",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-amber-400 font-bold block",
																	children: uOrg ? uOrg.name : "Independent Mesh"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[9px] text-slate-400",
																	children: u.role || "Community Member"
																})] })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-3 px-3 text-slate-300 max-w-[180px]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-0.5",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "block truncate text-cyan-300 text-[10px]",
																		title: u.deviceModel,
																		children: ["📱 ", u.deviceModel || "Mobile / Web Client"]
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "block text-[9px] text-slate-400",
																		children: [
																			"v",
																			u.appVersion || "1.1.x",
																			" • ",
																			u.lastSeen ? new Date(u.lastSeen).toLocaleDateString() : new Date(u.createdAt).toLocaleDateString()
																		]
																	})]
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-3 px-3 text-slate-300 max-w-[160px] truncate",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-0.5",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "block truncate text-red-400 font-bold",
																		title: u.preferredHospital,
																		children: ["🏥 ", u.preferredHospital || "Standard Response"]
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "block truncate text-[9px] text-slate-400",
																		title: u.medicalInfo,
																		children: ["💊 ", u.medicalInfo || "Standard profile"]
																	})]
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-3 px-3",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: `px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${acctStatus === "ACTIVE" ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" : acctStatus === "SUSPENDED" ? "bg-amber-950/30 border-amber-500/40 text-amber-300" : "bg-red-950/30 border-red-500/40 text-red-300"}`,
																	children: acctStatus
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-3 px-3 text-right whitespace-nowrap",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-center justify-end gap-1",
																	children: [
																		acctStatus !== "ACTIVE" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "button",
																			onClick: () => adminUpdateUserStatus(u.id, "ACTIVATE", "Superadmin re-activation"),
																			className: "px-2 py-1 rounded bg-emerald-950/50 hover:bg-emerald-900/70 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold",
																			children: "Activate"
																		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "button",
																			onClick: () => adminUpdateUserStatus(u.id, "SUSPEND", "Superadmin suspension"),
																			className: "px-2 py-1 rounded bg-amber-950/50 hover:bg-amber-900/70 text-amber-300 border border-amber-500/30 text-[9px] font-bold",
																			children: "Suspend"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "button",
																			onClick: () => adminUpdateUserStatus(u.id, "DEACTIVATE", "Superadmin deactivation"),
																			className: "px-2 py-1 rounded bg-rose-950/50 hover:bg-rose-900/70 text-rose-300 border border-rose-500/30 text-[9px] font-bold",
																			children: "Deactivate"
																		})] }),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "button",
																			onClick: () => adminUpdateUserStatus(u.id, "REVOKE_SESSIONS", "Session tokens revoked"),
																			className: "px-2 py-1 rounded bg-indigo-950/50 hover:bg-indigo-900/70 text-indigo-300 border border-indigo-500/30 text-[9px] font-bold",
																			title: "Revoke all active sessions for this user",
																			children: "Revoke"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "button",
																			onClick: () => setViewingUserDossier(u),
																			className: "px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 text-[9px] font-bold",
																			title: "View Complete User Details",
																			children: "Dossier"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "button",
																			onClick: () => handleEditUserClick(u),
																			className: "px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[9px] font-bold",
																			children: "Edit"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "button",
																			onClick: () => {
																				if (confirm(`Permanently remove ${u.fullName}?`)) deleteUserProfile(u.id);
																			},
																			className: "px-2 py-1 rounded bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/20 text-[9px] font-bold",
																			children: "Delete"
																		})
																	]
																})
															})
														]
													}, u.id);
												})
											})]
										})
									})
								});
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4",
									children: filteredUsers.map((u) => {
										const isEditing = editingUserId === u.id;
										const uOrg = organizations.find((o) => o.id === u.orgCode);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-4.5 glass-panel rounded-2xl space-y-3.5 border border-slate-900",
											children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2.5 font-mono text-xs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[8px] text-slate-500 font-bold block mb-1",
														children: "FULL NAME"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: editUserFullName,
														onChange: (e) => setEditUserFullName(e.target.value),
														className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-2 gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "text-[8px] text-slate-500 font-bold block mb-1",
															children: "PHONE"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: editUserPhone,
															onChange: (e) => setEditUserPhone(e.target.value),
															className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 font-mono"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "text-[8px] text-slate-500 font-bold block mb-1",
															children: "EMAIL"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: editUserEmail,
															onChange: (e) => setEditUserEmail(e.target.value),
															className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 font-mono"
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[8px] text-slate-500 font-bold block mb-1",
														children: "ORG CODE BINDING"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: editUserOrgCode,
														onChange: (e) => setEditUserOrgCode(e.target.value),
														className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 font-mono",
														placeholder: "e.g. SL-ORG-8492"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 mt-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "checkbox",
															checked: editUserLiveSms,
															onChange: (e) => setEditUserLiveSms(e.target.checked),
															className: "accent-amber-500"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "text-xs text-slate-400 font-bold",
															children: "ENABLE LIVE CELLULAR SMS FOR THIS RECORD"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2 mt-1 p-2 rounded-xl bg-blue-950/20 border border-blue-500/20",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "checkbox",
															checked: editUserCanUseAdminTwilio,
															onChange: (e) => setEditUserCanUseAdminTwilio(e.target.checked),
															className: "accent-blue-500"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "text-[10px] text-blue-300 font-bold",
															children: "PERMIT USER TO USE SUPERADMIN TWILIO SENDER ACCOUNT (SAVES USER OWN ACCOUNT)"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-end gap-2 pt-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => setEditingUserId(null),
															className: "text-[10px] text-slate-400 hover:text-slate-200",
															children: "Cancel"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => handleSaveUser(u.id),
															className: "px-3 py-1 bg-amber-600 text-white rounded-full text-[10px] font-bold",
															children: "Save Record"
														})]
													})
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-start gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-400 shrink-0",
														children: (u.fullName || u.username || "U").charAt(0).toUpperCase()
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "text-xs font-black text-slate-100",
															children: u.fullName
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[10px] font-mono text-slate-400",
															children: [
																"@",
																u.username,
																" • ",
																u.role || "Community Member"
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-block mt-1 px-1.5 py-0.2 rounded text-[7.5px] font-mono font-bold uppercase tracking-wider border",
															style: {
																backgroundColor: u.subscriptionStatus === "active" || !u.subscriptionStatus ? "#10b98115" : "#f59e0b15",
																borderColor: u.subscriptionStatus === "active" || !u.subscriptionStatus ? "#10b98140" : "#f59e0b40",
																color: u.subscriptionStatus === "active" || !u.subscriptionStatus ? "#34d399" : "#fbbf24"
															},
															children: ["Status: ", u.subscriptionStatus || "active"]
														})
													] })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setViewingUserDossier(u),
															className: "px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 text-[9px] font-mono font-bold",
															children: "Dossier"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => handleEditUserClick(u),
															className: "px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[9px] font-mono font-bold",
															children: "Edit"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => {
																if (confirm(`Delete ${u.fullName}?`)) deleteUserProfile(u.id);
															},
															className: "px-2 py-1 rounded bg-red-950/40 hover:bg-red-900/60 text-red-400 text-[9px] font-mono font-bold",
															children: "✕"
														})
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-2 text-[10px] font-mono pt-2 border-t border-slate-900",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[8px] uppercase font-bold",
														children: "Phone & WhatsApp"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-200 font-bold",
														children: u.phone
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[8px] uppercase font-bold",
														children: "Org Mesh Link"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-slate-200 font-bold truncate block",
														children: [
															uOrg ? uOrg.name : "Independent",
															" (",
															u.orgCode || "None",
															")"
														]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[8px] uppercase font-bold",
														children: "Home Address"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-300 truncate block",
														children: u.homeAddress || "Not specified"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[8px] uppercase font-bold",
														children: "Trauma Facility"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-red-400 truncate block font-bold",
														children: u.preferredHospital || "Standard Center"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "col-span-2 flex items-center justify-between pt-1 border-t border-slate-900/60",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[7.5px] text-slate-500 uppercase font-bold",
															children: "Twilio Pool Access:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => {
																const nextState = !u.canUseAdminTwilio;
																updateUserProfile(u.id, { canUseAdminTwilio: nextState });
																addToast(`${u.fullName}: Admin Twilio sender access ${nextState ? "GRANTED" : "REVOKED"}.`, "info");
															},
															className: `px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all ${u.canUseAdminTwilio ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/30" : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"}`,
															children: u.canUseAdminTwilio ? "✅ Admin Account Granted" : "🔒 Own Account Mode"
														})]
													})
												]
											})] })
										}, u.id);
									})
								});
							})()
						]
					}),
					viewingUserDossier && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed inset-0 z-[999999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl font-mono text-left animate-fadeIn max-h-[90vh] overflow-y-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-slate-800 pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-amber-400 text-lg",
											children: (viewingUserDossier.fullName || viewingUserDossier.username || "U").charAt(0).toUpperCase()
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-black text-white uppercase",
											children: viewingUserDossier.fullName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-amber-400",
											children: [
												"@",
												viewingUserDossier.username,
												" • ID: ",
												viewingUserDossier.id
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setViewingUserDossier(null),
										className: "w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs",
										children: "✕"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3.5 bg-slate-950 rounded-2xl border border-slate-850 space-y-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8.5px] text-slate-500 font-bold uppercase block",
													children: "Contact Channels"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-slate-200 font-bold",
													children: ["Cell: ", viewingUserDossier.phone]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-emerald-400",
													children: ["WhatsApp: ", viewingUserDossier.whatsapp || viewingUserDossier.phone]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-slate-400 truncate",
													children: ["Email: ", viewingUserDossier.email]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3.5 bg-slate-950 rounded-2xl border border-slate-855 space-y-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8.5px] text-slate-500 font-bold uppercase block",
													children: "Organization & System Role"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-amber-300 font-bold",
													children: ["Org Code: ", viewingUserDossier.orgCode || "Independent Mesh"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-slate-300",
													children: ["Role: ", viewingUserDossier.role || "Community Member"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-slate-500 text-[10px]",
													children: ["Registration: ", new Date(viewingUserDossier.createdAt).toLocaleString()]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3.5 bg-slate-950 rounded-2xl border border-slate-850 space-y-1 md:col-span-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8.5px] text-slate-500 font-bold uppercase block",
													children: "Registered Geolocation & Addresses"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-slate-200",
													children: ["🏠 Home: ", viewingUserDossier.homeAddress || "Not recorded at registration"]
												}),
												viewingUserDossier.workAddress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-slate-400",
													children: ["🏢 Campus / Work: ", viewingUserDossier.workAddress]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3.5 bg-slate-950 rounded-2xl border border-slate-850 space-y-1 md:col-span-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8.5px] text-red-400 font-bold uppercase block",
													children: "Trauma & Special Care Medical Dossier"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-slate-200 font-bold",
													children: ["Preferred Hospital: ", viewingUserDossier.preferredHospital || "Nearest Level 1 Facility"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-slate-300",
													children: ["Medical Notes: ", viewingUserDossier.medicalInfo || "Standard individual registration profile"]
												}),
												viewingUserDossier.emergencyContactsList && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-amber-400 text-[10px] pt-1",
													children: ["Escalation Chain: ", viewingUserDossier.emergencyContactsList]
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-2 pt-2 border-t border-slate-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											handleEditUserClick(viewingUserDossier);
											setViewingUserDossier(null);
										},
										className: "px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl",
										children: "Edit This Record"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setViewingUserDossier(null),
										className: "px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl",
										children: "Close Dossier"
									})]
								})
							]
						})
					}),
					activeTab === "CLIENTS" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 animate-fadeIn text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 bg-slate-900/60 border border-amber-500/30 rounded-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-sm font-bold text-amber-400 font-mono uppercase tracking-wider flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📁" }), " SECURE CLIENT ROSTER & GOOGLE DRIVE PERSISTENCE ENGINE"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 mt-1 font-mono",
								children: "Authoritative Master Database view with bidirectional Google Drive synchronization and emergency telemetry records. Access restricted exclusively to Super Admin."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientDatabaseModule, {})]
					}),
					activeTab === "R2_MEDIA" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 animate-fadeIn text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 bg-slate-900/60 border border-purple-500/30 rounded-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-sm font-bold text-purple-400 font-mono uppercase tracking-wider flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🎬" }), " CLOUDFLARE R2 ASSETS & EVIDENCE VAULT (138 ASSETS)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-400 mt-1 font-mono",
								children: [
									"Stream, inspect, download, and manage verified hardware photographs, video guides, firmware packages, and incident audio recordings hosted in Cloudflare R2 bucket: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-purple-300 font-bold",
										children: "media"
									}),
									"."
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaHub, {})]
					}),
					activeTab === "ORGANIZATIONS" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 animate-fadeIn text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col md:flex-row md:items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-sm font-bold text-slate-200 font-mono uppercase tracking-wider",
									children: [
										"Registered Housing Nodes (",
										approvedOrgs.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-500",
									children: "Add, edit, or deprecate organization profile codes."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Search residence name...",
									value: searchTerm,
									onChange: (e) => setSearchTerm(e.target.value),
									className: "bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-mono w-full md:w-64"
								})]
							}),
							pendingOrgs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-amber-950/25 border border-amber-500/30 p-5 rounded-3xl space-y-3.5 mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-xs font-mono font-black uppercase text-amber-300 tracking-wider",
										children: [
											"🔔 Pending Organization Registries Awaiting System Admin Approval (",
											pendingOrgs.length,
											")"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-4",
									children: pendingOrgs.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between gap-3 shadow-md",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-xs font-black text-slate-100",
													children: o.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[9px] font-mono font-bold bg-amber-500/15 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/10",
													children: o.id
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-slate-400 font-mono",
												children: [
													"Manager: ",
													o.contactName,
													" • Email: ",
													o.contactEmail
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-end gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													if (confirm(`Reject and delete registration request for ${o.name}?`)) deleteOrganization(o.id);
												},
												className: "px-3 py-1 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[10px] font-mono font-bold rounded-lg transition-colors border border-slate-800",
												children: "REJECT"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => approveOrganization(o.id),
												className: "px-3.5 py-1 bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-mono font-bold rounded-lg transition-all",
												children: "ACCEPT REGISTRY"
											})]
										})]
									}, o.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: approvedOrgs.filter((o) => o.name.toLowerCase().includes(searchTerm.toLowerCase())).map((o) => {
									const isEditing = editingOrgId === o.id;
									const resCount = userCountsByOrg[o.id] || 0;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-4 glass-panel space-y-3",
										children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2.5 font-mono text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[8px] text-slate-500 block mb-1",
													children: "RESIDENCE NAME"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: editOrgName,
													onChange: (e) => setEditOrgName(e.target.value),
													className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[8px] text-slate-500 block mb-1",
													children: "MANAGER NAME"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: editOrgContactName,
													onChange: (e) => setEditOrgContactName(e.target.value),
													className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[8px] text-slate-500 block mb-1",
													children: "EMAIL ADDRESS"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: editOrgContactEmail,
													onChange: (e) => setEditOrgContactEmail(e.target.value),
													className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-end gap-2 pt-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setEditingOrgId(null),
														className: "text-[10px] text-slate-400 hover:text-slate-200",
														children: "Cancel"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => handleSaveOrg(o.id),
														className: "px-3 py-1 bg-amber-600 text-white rounded-full text-[10px] font-bold",
														children: "Save Org"
													})]
												})
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-sm font-mono",
													children: "🏢"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "text-xs font-black text-slate-100",
														children: o.name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[8px] font-mono font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-500/10",
														children: ["ID: ", o.id]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[8px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full border",
														style: {
															color: o.subscriptionStatus === "active" ? "#10b981" : o.subscriptionStatus === "trial" ? "#f59e0b" : "#ef4444",
															borderColor: "currentColor",
															marginLeft: "4px"
														},
														children: ["STATUS: ", o.subscriptionStatus || "active"]
													})
												] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => {
															if (confirm(`Unlock trial for ${o.name}?`)) useAppStore.getState().unlockOrganizationTrial(o.id);
														},
														className: "p-1 text-[9px] font-mono text-emerald-400 hover:text-emerald-300",
														children: "UNLOCK TRIAL"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => handleEditOrgClick(o),
														className: "p-1 text-[9px] font-mono text-slate-400 hover:text-slate-200",
														children: "EDIT"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => adminUpdateSubscription(o.id, "org", o.subscriptionStatus === "trial" ? "active" : "trial"),
														className: "p-1 text-[9px] font-mono text-amber-400 hover:text-amber-300",
														children: o.subscriptionStatus === "trial" ? "ACTIVATE" : "TRIAL"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => adminUpdateSubscription(o.id, "org", o.subscriptionStatus === "locked" ? "active" : "locked"),
														className: "p-1 text-[9px] font-mono text-purple-400 hover:text-purple-300",
														children: o.subscriptionStatus === "locked" ? "UNLOCK" : "LOCK"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => {
															if (confirm(`Delete ${o.name} and unbind its users?`)) deleteOrganization(o.id);
														},
														className: "p-1 text-[9px] font-mono text-red-400 hover:text-red-300",
														children: "DELETE"
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-3 gap-1 text-[10px] font-mono pt-2.5 border-t border-slate-850 text-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "border-r border-slate-800",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[8px]",
														children: "MANAGER"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-200 font-bold block truncate",
														children: o.contactName
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "border-r border-slate-800",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-500 block text-[8px]",
														children: "RESIDENTS"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-slate-200 font-bold block",
														children: [resCount, " active"]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-500 block text-[8px]",
													children: "DATABASE TYPE"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-amber-400 text-[8px] uppercase font-black block mt-0.5",
													children: "Firebase Stack"
												})] })
											]
										})] })
									}, o.id);
								})
							})
						]
					}),
					activeTab === "EVIDENCE" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-6xl mx-auto w-full flex flex-col h-full overflow-hidden p-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceLedger, {})
					}),
					activeTab === "PANICS" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 animate-fadeIn text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-sm font-bold text-slate-200 font-mono uppercase tracking-wider",
							children: [
								"Global System distress events (",
								panicEvents.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-500",
							children: "Live emergency cascades being processed in real-time."
						})] }), panicEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-12 bg-slate-900/20 border border-slate-900/60 rounded-3xl text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl",
								children: "🛡️"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-500 font-mono mt-2",
								children: "All locations stabilized. No active panic distress signals found in core database."
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: panicEvents.map((p) => {
								const isResolved = p.status === "RESOLVED";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `p-5 rounded-3xl border text-left space-y-3.5 transition-all ${isResolved ? "bg-slate-900/30 border-slate-900" : "bg-red-950/15 border-red-500/20 animate-pulse"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-start gap-3 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-black text-slate-100",
													children: p.description
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${isResolved ? "bg-slate-800 text-slate-400" : "bg-red-500 text-slate-950 animate-pulse"}`,
													children: p.status
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] font-mono text-slate-500",
												children: [
													"Incident Node ID: ",
													p.id,
													" • Lat: ",
													p.lat.toFixed(5),
													", Lng: ",
													p.lng.toFixed(5)
												]
											})]
										}), !isResolved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => resolvePanic(p.id),
											className: "px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono text-[9px] font-bold rounded-xl uppercase tracking-wider shadow",
											children: "Resolve Distress"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-950/80 border border-slate-900 p-3.5 rounded-2xl space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest block",
											children: "Sequential Dispatch Log"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-1 font-mono text-[9px] text-slate-400",
											children: p.timelineData.map((log, lidx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-amber-400 shrink-0",
													children: "›"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: log })]
											}, lidx))
										})]
									})]
								}, p.id);
							})
						})]
					}),
					activeTab === "SETTINGS" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 animate-fadeIn text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "glass-panel p-5 md:p-6 space-y-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-sm font-bold text-slate-100 uppercase tracking-widest mb-1 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px]",
											children: "🎟️"
										}), " TRIAL SYSTEM"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-500 uppercase tracking-widest mb-4",
										children: "Enable or disable the global 14-day trial banner for organizations"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => useAppStore.getState().setTrialEnabled(!useAppStore.getState().isTrialEnabled),
											className: `w-12 h-6 rounded-full transition-colors relative ${useAppStore.getState().isTrialEnabled ? "bg-amber-500" : "bg-slate-700"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${useAppStore.getState().isTrialEnabled ? "left-7" : "left-1"}` })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-xs font-mono font-bold ${useAppStore.getState().isTrialEnabled ? "text-amber-400" : "text-slate-500"}`,
											children: useAppStore.getState().isTrialEnabled ? "TRIAL SYSTEM ENABLED" : "TRIAL SYSTEM DISABLED"
										})]
									})
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel p-5 md:p-6 space-y-4 border border-blue-500/30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col md:flex-row md:items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-sm font-bold text-blue-400 font-mono uppercase tracking-wider flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📡" }), " EXTERNAL PLATFORM CREDENTIALS & SERVICE SENTINEL"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-400 mt-1",
										children: "Live end-to-end verification of VAPI AI Voice, Twilio / WhatsApp, Africa's Talking USSD, Cloudflare R2, and Database connections."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: runCredsAudit,
										disabled: checkingCreds,
										className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-mono text-[10px] font-bold uppercase rounded-xl tracking-wider transition-all shadow shrink-0",
										children: checkingCreds ? "AUDITING..." : "⚡ TEST PLATFORM INTEGRATIONS"
									})]
								}), credsStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `p-3.5 rounded-2xl border text-left space-y-1 ${credsStatus.services?.vapi?.healthy ? "bg-emerald-950/20 border-emerald-500/30" : "bg-red-950/20 border-red-500/30"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold text-slate-200 font-mono",
														children: "🎙️ VAPI AI Voice"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `text-[9px] font-bold px-2 py-0.5 rounded-full ${credsStatus.services?.vapi?.healthy ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`,
														children: credsStatus.services?.vapi?.status || "UNKNOWN"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[10px] text-slate-400 font-mono truncate",
													children: ["Agent: ", credsStatus.services?.vapi?.assistantName || "SafetyLink Panic Alert"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[9px] text-slate-500 font-mono",
													children: ["Phone ID: ", credsStatus.services?.vapi?.phoneNumberId ? "Configured ✅" : "Missing"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `p-3.5 rounded-2xl border text-left space-y-1 ${credsStatus.services?.twilio?.healthy ? "bg-emerald-950/20 border-emerald-500/30" : "bg-red-950/20 border-red-500/30"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold text-slate-200 font-mono",
														children: "💬 Twilio / WhatsApp"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `text-[9px] font-bold px-2 py-0.5 rounded-full ${credsStatus.services?.twilio?.healthy ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`,
														children: credsStatus.services?.twilio?.status || "UNKNOWN"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[10px] text-slate-400 font-mono truncate",
													children: ["Account: ", credsStatus.services?.twilio?.accountName || "Active"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[9px] text-slate-500 font-mono",
													children: ["Sender: ", credsStatus.services?.twilio?.phoneNumber || "+16055695774"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `p-3.5 rounded-2xl border text-left space-y-1 ${credsStatus.services?.cloudflareR2?.healthy ? "bg-purple-950/20 border-purple-500/30" : "bg-red-950/20 border-red-500/30"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold text-slate-200 font-mono",
														children: "🎬 Cloudflare R2 Media"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `text-[9px] font-bold px-2 py-0.5 rounded-full ${credsStatus.services?.cloudflareR2?.healthy ? "bg-purple-500/20 text-purple-400" : "bg-red-500/20 text-red-400"}`,
														children: credsStatus.services?.cloudflareR2?.status || "UNKNOWN"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[10px] text-purple-300 font-mono",
													children: [
														"Bucket: ",
														credsStatus.services?.cloudflareR2?.bucket,
														" (",
														credsStatus.services?.cloudflareR2?.assetCount,
														" assets live)"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[9px] text-slate-500 font-mono",
													children: "Streaming: Active across entire UI"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `p-3.5 rounded-2xl border text-left space-y-1 ${credsStatus.services?.africasTalking?.healthy ? "bg-emerald-950/20 border-emerald-500/30" : "bg-amber-950/20 border-amber-500/30"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold text-slate-200 font-mono",
														children: "📶 Africa's Talking USSD"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `text-[9px] font-bold px-2 py-0.5 rounded-full ${credsStatus.services?.africasTalking?.healthy ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`,
														children: credsStatus.services?.africasTalking?.status || "UNKNOWN"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[10px] text-slate-400 font-mono",
													children: [
														"User: ",
														credsStatus.services?.africasTalking?.username,
														" • Balance: ",
														credsStatus.services?.africasTalking?.balance
													]
												}),
												credsStatus.services?.africasTalking?.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[8.5px] text-amber-400/80 font-mono",
													children: credsStatus.services?.africasTalking?.message
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `p-3.5 rounded-2xl border text-left space-y-1 ${credsStatus.services?.neonDatabase?.healthy ? "bg-emerald-950/20 border-emerald-500/30" : "bg-amber-950/20 border-amber-500/30"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-slate-200 font-mono",
													children: "🗄️ Neon Database"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-[9px] font-bold px-2 py-0.5 rounded-full ${credsStatus.services?.neonDatabase?.healthy ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`,
													children: credsStatus.services?.neonDatabase?.status || "LOCAL_FALLBACK"
												})]
											}), credsStatus.services?.neonDatabase?.healthy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-emerald-400 font-mono",
												children: "PostgreSQL connection verified"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[8.5px] text-amber-400 font-mono leading-tight",
												children: credsStatus.services?.neonDatabase?.actionRequired || credsStatus.services?.neonDatabase?.error
											})]
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-center py-4 text-xs font-mono text-slate-500",
									children: "Click 'TEST PLATFORM INTEGRATIONS' to execute live API ping checks."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel p-5 md:p-6 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-bold text-slate-200",
										children: "Custom Backend Integration (API Route)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-500",
										children: "Bind this instance to your own remote backend server. Replaces the local offline API."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col md:flex-row gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "https://your-custom-api-server.com",
										value: backendUrlInput,
										onChange: (e) => setBackendUrlInput(e.target.value),
										className: "flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-blue-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setCustomBackendUrl(backendUrlInput);
												addAuditLog("SYSTEM", "INFO", "Custom Backend URL saved");
											},
											className: "px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold rounded-2xl transition-colors shrink-0",
											children: "SAVE ROUTE"
										})
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-panel p-5 md:p-6 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-bold text-slate-200",
										children: "IoT Edge Telemetry Route Configuration"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-slate-500",
										children: "Bind this instance to your specific remote rule chain. Panics will automatically push device telemetries."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col md:flex-row gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Paste IoT Device Access Token...",
										value: tbTokenInput,
										onChange: (e) => setTbTokenInput(e.target.value),
										className: "flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-100 font-mono focus:outline-none focus:border-amber-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setThingsBoardToken(tbTokenInput);
												addAuditLog("SYSTEM", "INFO", "ThingsBoard token saved");
											},
											className: "px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-bold rounded-2xl transition-colors shrink-0",
											children: "SAVE ROUTE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: async () => {
												if (!tbTokenInput) return alert("Save a token first.");
												setTbTestStatus("sending");
												const ok = await sendTestEvent(tbTokenInput);
												setTbTestStatus(ok ? "ok" : "fail");
												setTimeout(() => setTbTestStatus("idle"), 3e3);
											},
											disabled: tbTestStatus === "sending",
											className: `px-4 py-3 border text-xs font-mono font-bold rounded-2xl transition-colors shrink-0 ${tbTestStatus === "ok" ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-400" : tbTestStatus === "fail" ? "bg-red-950/20 border-red-500/40 text-red-400" : "border-slate-800 hover:bg-slate-850 text-slate-300"}`,
											children: tbTestStatus === "sending" ? "CONNECTING..." : tbTestStatus === "ok" ? "EVENT FIRED ✓" : tbTestStatus === "fail" ? "FAILED" : "FIRE TEST EVENT"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-3 gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass-panel p-5 space-y-4 md:col-span-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-xs font-black uppercase text-amber-400 font-mono tracking-wider",
											children: "🛠️ Add New Custom Tool / Setting"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-slate-500 leading-relaxed",
											children: "Instantly push a new setting, quick-dial contact, or automatic integration tool to all connected SafetyLink devices and resident dashboards."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 text-xs font-mono",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[8px] text-slate-500 font-bold block mb-1 uppercase",
												children: "Tool Title"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												placeholder: "e.g. WhatsApp Auto Panic Group",
												value: newToolTitle,
												onChange: (e) => setNewToolTitle(e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[8px] text-slate-500 font-bold block mb-1 uppercase",
												children: "Description / Instruction"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												placeholder: "e.g. Automatically opens WhatsApp and sends your high-precision coordinates to Flatmates.",
												value: newToolDesc,
												onChange: (e) => setNewToolDesc(e.target.value),
												rows: 2,
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 resize-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[8px] text-slate-500 font-bold block mb-1 uppercase",
												children: "Action Type"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: newToolType,
												onChange: (e) => setNewToolType(e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-300 font-sans",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "INFO",
														children: "INFORMATION / RESOURCE CARD"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "WHATSAPP",
														children: "WHATSAPP TEMPLATE BINDING"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "CALL",
														children: "DIRECT SPEED DIAL TRIGGER"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "SMS",
														children: "SMS BROADCAST BINDING"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "WIDGET",
														children: "INTERACTIVE WEB WIDGET"
													})
												]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[8px] text-slate-500 font-bold block mb-1 uppercase",
												children: "Target Value / Action Parameter"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												placeholder: newToolType === "WHATSAPP" || newToolType === "SMS" ? "e.g. template text with {LAT},{LNG}" : newToolType === "CALL" ? "e.g. +27XXXXXXXXX" : "e.g. phone number, external URL, or text resource",
												value: newToolValue,
												onChange: (e) => setNewToolValue(e.target.value),
												className: "w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													if (!newToolTitle.trim()) return alert("Please enter a tool title.");
													addCustomTool({
														title: newToolTitle,
														description: newToolDesc,
														type: newToolType,
														targetValue: newToolValue
													});
													setNewToolTitle("");
													setNewToolDesc("");
													setNewToolValue("");
													addAuditLog("SYSTEM", "INFO", `Admin pushed global tool: ${newToolTitle}`);
												},
												className: "w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-[10px] tracking-wider uppercase transition-all",
												children: "PUBLISH GLOBAL TOOL"
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass-panel p-5 space-y-4 md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-xs font-black uppercase text-slate-300 font-mono tracking-wider",
											children: "Active Globally-Pushed Tools & Settings"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-500",
											children: "The following tools are currently active and embedded directly into every individual occupant's workspace."
										})]
									}), globalCustomTools.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-12 border border-dashed border-slate-800 rounded-2xl text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-500 font-mono",
											children: "No custom global tools have been created yet. Use the form on the left to add one."
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-3",
										children: globalCustomTools.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 bg-slate-950 border border-slate-850 rounded-2xl flex justify-between items-start gap-3 shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-bold text-slate-100",
															children: t.title
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[8px] font-mono font-black px-1.5 py-0.5 bg-amber-900/40 text-amber-300 rounded border border-amber-500/20",
															children: t.type
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] text-slate-400 leading-relaxed",
														children: t.description
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[9px] font-mono text-slate-500 truncate max-w-md",
														children: ["Param: ", t.targetValue]
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => deleteCustomTool(t.id),
												className: "px-2.5 py-1.5 bg-red-950/20 border border-red-500/30 hover:bg-red-900 hover:text-white text-red-400 text-[9px] font-mono font-bold rounded-lg transition-all uppercase",
												children: "REVOKE"
											})]
										}, t.id))
									})]
								})]
							})
						]
					}),
					activeTab === "FLEET" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-6 animate-fadeIn text-left",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FleetMonitor, {})
					})
				]
			})
		]
	});
};
//#endregion
export { AdminPanel };
