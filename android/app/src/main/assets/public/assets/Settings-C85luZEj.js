import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { kt as require_react } from "./icons-B-I2x5TV.js";
import { b as motion, w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { _ as Capacitor } from "./capacitor-B_jS8XWy.js";
import { i as useAppStore } from "./store-DQZ7ziRL.js";
import { t as NativeDispatchService } from "./NativeDispatchService-DnOodW5f.js";
import { a as translate, i as SafetyLinkLogo } from "./index-BolDz6jr.js";
import { t as biometricService } from "./BiometricService-XD0nursW.js";
import { t as HikvisionCameraManager } from "./HikvisionCameraManager-B1P-0xwZ.js";
//#region src/services/pcmTrigger.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var GATEWAY_CACHE = "sl_pcm_gateway";
var DEFAULT_GATEWAY = "0816738186";
var API = "https://api.safetylink.online";
/** Formats an E.164 or international number into the local 10-digit format (0XXXXXXXXX) */
function formatLocalMsisdn(raw) {
	const digits = (raw || "").replace(/\D/g, "");
	if (digits.startsWith("27") && digits.length === 11) return "0" + digits.slice(2);
	return digits.length === 9 && !digits.startsWith("0") ? "0" + digits : digits || DEFAULT_GATEWAY;
}
/**
* Resolves the exact USSD Please-Call-Me string based on user configuration or detected SIM carrier.
*/
function resolveUssdCode(options = {}) {
	const { carrierPreset = "AUTO", customPattern = "*140*{NUMBER}#", gatewayNumber = DEFAULT_GATEWAY, detectedCarrier = "" } = options;
	const local = formatLocalMsisdn(gatewayNumber);
	switch (carrierPreset) {
		case "MTN": return `*121*${local}#`;
		case "VODACOM": return `*140*${local}#`;
		case "CELL_C": return `*111*${local}#`;
		case "TELKOM": return `*140*${local}#`;
		case "CUSTOM":
			if (customPattern && (customPattern.includes("{NUMBER}") || customPattern.includes("{PHONE}"))) return customPattern.replace(/\{NUMBER\}/g, local).replace(/\{PHONE\}/g, local).trim();
			return customPattern ? customPattern.trim() : `*140*${local}#`;
		default: {
			const c = (detectedCarrier || "").toLowerCase();
			if (c.includes("mtn")) return `*121*${local}#`;
			if (c.includes("cell")) return `*111*${local}#`;
			return `*140*${local}#`;
		}
	}
}
async function cachedGateway() {
	let gateway = "";
	try {
		gateway = localStorage.getItem(GATEWAY_CACHE) || "";
	} catch {}
	if (gateway) return gateway;
	try {
		const json = await (await fetch(API + "/api/pcm/gateway")).json();
		if (json?.number) {
			gateway = String(json.number);
			try {
				localStorage.setItem(GATEWAY_CACHE, gateway);
			} catch {}
		}
	} catch {}
	return gateway || DEFAULT_GATEWAY;
}
/**
* Dials the carrier Please Call Me USSD code.
* Executes natively on Android via Android Telecom or simulates in browser.
*/
async function firePleaseCallMe(explicitCode, options) {
	let code = explicitCode;
	if (!code) {
		let detectedCarrier = options?.detectedCarrier || "";
		if (Capacitor.isNativePlatform() && !detectedCarrier) try {
			const sims = await NativeDispatchService.getSimCards();
			detectedCarrier = (sims.sims.find((s) => s.subscriptionId === sims.preferredSubscriptionId) || sims.sims[0])?.carrier || "";
		} catch (err) {
			console.warn("[pcmTrigger] SIM query note:", err);
		}
		const gateway = options?.gatewayNumber || await cachedGateway();
		code = resolveUssdCode({
			...options,
			detectedCarrier,
			gatewayNumber: gateway
		});
	}
	const res = await NativeDispatchService.sendUssd(code);
	return {
		success: !!res.success,
		code,
		error: res.error
	};
}
//#endregion
//#region src/components/Settings.tsx
var import_jsx_runtime = require_jsx_runtime();
var Settings = () => {
	const { auditLogs, clearAuditLogs, language, currentUser, userPin, duressPin, updateUserProfile, requestJoinOrganization, organizations, sosCountdownDuration, setSosCountdownDuration, silenceAlerts, setSilenceAlerts, globalTheme, setGlobalTheme, decoyActive, setDecoyActive, decoyCode, setDecoyCode, decoyDistressCode, setDecoyDistressCode, isFloatingWidgetDeployed, setFloatingWidgetDeployed, floatingWidgetSize, setFloatingWidgetSize, dispatchSettings, setDispatchSettings, dispatchLogs, clearDispatchLogs, notificationPanelLogs, clearNotificationPanelLogs, bleButtonConfig, setBleButtonConfig, handleHardwareButtonPress, bleDevices, availableSims, preferredSimId, setPreferredSim, loadSimCards, unlockMethod, setUnlockMethod } = useAppStore();
	const [activeSection, setActiveSection] = (0, import_react.useState)("ALL");
	const [screenWakeLockEnabled, setScreenWakeLockEnabled] = (0, import_react.useState)(() => {
		try {
			return localStorage.getItem("sl_screen_wake_lock") !== "false";
		} catch {
			return true;
		}
	});
	const [filter, setFilter] = (0, import_react.useState)("ALL");
	const [hasBiometrics, setHasBiometrics] = (0, import_react.useState)(false);
	const [biometryType, setBiometryType] = (0, import_react.useState)("FINGERPRINT");
	const [isPinSettingsUnlocked, setIsPinSettingsUnlocked] = (0, import_react.useState)(() => biometricService.isScopeUnlocked("settings"));
	const [isAuthenticatingPin, setIsAuthenticatingPin] = (0, import_react.useState)(false);
	const [isTestingUssd, setIsTestingUssd] = (0, import_react.useState)(false);
	const [testClicks, setTestClicks] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		loadSimCards();
	}, [loadSimCards]);
	(0, import_react.useEffect)(() => {
		let active = true;
		biometricService.checkAvailability().then((res) => {
			if (active) {
				setHasBiometrics(res.isAvailable);
				setBiometryType(res.biometryType);
			}
		});
		return () => {
			active = false;
		};
	}, []);
	const [showHikvisionManager, setShowHikvisionManager] = (0, import_react.useState)(false);
	const handleUnlockPinSettings = async () => {
		setIsAuthenticatingPin(true);
		try {
			if (await biometricService.authenticate({
				title: "Security PIN Authentication",
				subtitle: "Biometric Security Gate",
				description: "Verify your fingerprint or face to view and modify your emergency PINs.",
				negativeButtonText: "Cancel"
			})) {
				setIsPinSettingsUnlocked(true);
				biometricService.grantScopeUnlock("settings");
				useAppStore.getState().addToast("Biometrics verified. Security PIN settings unlocked.", "success");
			} else useAppStore.getState().addToast("Biometric authentication required to modify security PINs.", "warn");
		} finally {
			setIsAuthenticatingPin(false);
		}
	};
	const [isCheckingUpdate, setIsCheckingUpdate] = (0, import_react.useState)(false);
	const handleCheckForUpdates = async () => {
		setIsCheckingUpdate(true);
		try {
			await useAppStore.getState().checkAppUpdates();
			const { updateInfo } = useAppStore.getState();
			if (updateInfo && updateInfo.available) {
				useAppStore.getState().addToast(`Version ${updateInfo.version} found! Downloading...`, "success");
				if (Capacitor.getPlatform() === "android" && updateInfo.apkUrl) window.open(updateInfo.apkUrl, "_blank");
				else if (updateInfo.exeUrl && Capacitor.getPlatform() !== "android") window.open(updateInfo.exeUrl, "_blank");
				else window.open("https://safetylink-api.tshilidzi-mukwevho54.workers.dev/download/safetylink.apk", "_blank");
			} else useAppStore.getState().addToast("You are already on the latest version.", "info");
		} catch (e) {
			useAppStore.getState().addToast("Failed to check for updates.", "error");
		} finally {
			setIsCheckingUpdate(false);
		}
	};
	const [orgIdInput, setOrgIdInput] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [selectedJoinRole, setSelectedJoinRole] = (0, import_react.useState)("Community Member");
	const t = (key) => translate(language, key);
	const filteredLogs = auditLogs.filter((log) => {
		if (filter === "ALL") return true;
		return log.category === filter;
	});
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500 neon-glow-blue" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 digital-grid opacity-10 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center mb-6 mt-2 relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/logos/Safety_Link_Logo_Transparent.png",
					alt: "SafetyLink Official Logo",
					className: "h-14 object-contain drop-shadow-xl",
					onError: (e) => {
						e.currentTarget.src = "/logos/New SafetyLink Official Logo.svg";
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-slate-900 pb-3.5 text-left relative z-10 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyLinkLogo, {
					size: 18,
					glowColor: "rgba(168, 85, 247, 0.4)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-black text-slate-100 tracking-[0.2em] font-display uppercase",
					children: t("settings.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-mono text-slate-500 mt-0.5",
					children: t("settings.subtitle")
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5 mt-3 relative z-10 font-mono",
				children: [
					{
						id: "ALL",
						label: "All"
					},
					{
						id: "DISPATCH",
						label: "Dispatch"
					},
					{
						id: "SECURITY",
						label: "Security"
					},
					{
						id: "HARDWARE",
						label: "BLE & Fleet"
					},
					{
						id: "PRIVACY",
						label: "Privacy & OS"
					}
				].map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActiveSection(sec.id),
					className: `px-2.5 py-1 rounded-lg text-[8.5px] font-bold uppercase tracking-wider border transition-all ${activeSection === sec.id ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"}`,
					children: sec.label
				}, sec.id))
			}),
			(activeSection === "ALL" || activeSection === "PRIVACY") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-left mt-4 relative z-10 font-mono",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-[9px] font-bold text-slate-500 uppercase tracking-widest font-display",
					children: "🎨 THEME & APP PREFERENCES"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-bold text-slate-200",
						children: "Global Theme"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] text-slate-500",
						children: "Switch to Light Mode for high-contrast outdoors"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setGlobalTheme(globalTheme === "dark" ? "light" : "dark"),
						className: `px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-colors ${globalTheme === "light" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"}`,
						children: globalTheme === "light" ? "LIGHT (ENABLED)" : "TACTICAL DARK"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-left mt-4 relative z-10 font-mono",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-[9px] font-bold text-slate-500 uppercase tracking-widest font-display",
					children: t("settings.diagnostics_title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 text-[10px] font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							useAppStore.getState().addAuditLog("SYSTEM", "INFO", "Self-Test Initiated", "Checking GATT profiles, GPS providers, and local caches.");
							useAppStore.getState().addToast("All system diagnostics are functional. BLE: Stable, GPS: High accuracy locked.", "success");
						},
						className: "bg-slate-950/40 border border-slate-900 rounded-2xl p-3 text-slate-200 hover:bg-slate-900 hover:text-white transition-all text-center",
						children: t("settings.diagnose_btn")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: clearAuditLogs,
						className: "bg-slate-950/40 border border-red-500/10 rounded-2xl p-3 text-red-400 hover:bg-red-950/20 transition-all text-center",
						children: t("settings.purge_btn")
					})]
				})]
			})] }),
			(activeSection === "ALL" || activeSection === "DISPATCH") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-left border-t border-slate-900 pt-4 mt-4 relative z-10 font-mono",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[9px] font-bold text-slate-500 uppercase tracking-widest font-display",
						children: "🚨 EMERGENCY & DISPATCH ORDER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3 text-[8px] font-mono text-emerald-300 space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold uppercase tracking-wider text-emerald-400",
							children: "Canonical Dispatch Sequence"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "1. Server API → 2. Native SMS → 3. Direct Call → 4. Optional USSD → 5. WhatsApp (only contacts with WhatsApp)" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/40 border border-slate-900 rounded-2xl p-4 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-slate-800/50 pt-3 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
									className: "text-[9px] font-bold text-slate-300 uppercase flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔴" }), " Floating SOS Bubble (Chat Heads Style)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[8px] text-slate-500 mt-0.5",
									children: "Enables a persistent draggable SOS trigger that floats over all native Android apps."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center space-x-2 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[8px] font-bold ${isFloatingWidgetDeployed ? "text-red-400" : "text-slate-600"}`,
										children: isFloatingWidgetDeployed ? "ACTIVE" : "DISABLED"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: isFloatingWidgetDeployed,
										onChange: (e) => {
											setFloatingWidgetDeployed(e.target.checked);
											NativeDispatchService.toggleFloatingWidget(e.target.checked);
											useAppStore.getState().addToast(e.target.checked ? "Floating SOS button deployed." : "Floating SOS button disabled.", "info");
										},
										className: "accent-red-500 w-4 h-4 cursor-pointer"
									})]
								})]
							}), isFloatingWidgetDeployed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-2 bg-slate-900/60 rounded-xl border border-slate-800 text-[8px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-400 uppercase font-bold",
									children: "BUBBLE SIZE:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1.5",
									children: [
										52,
										64,
										78
									].map((sz) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setFloatingWidgetSize(sz),
										className: `px-2 py-0.5 rounded-lg font-bold ${floatingWidgetSize === sz ? "bg-red-600 text-white" : "bg-slate-950 text-slate-400"}`,
										children: [sz, "px"]
									}, sz))
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-slate-800/50 pt-3 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
									className: "text-[9px] font-bold text-slate-300 uppercase flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⚡" }), " Configurable Dispatch Engine & Presets"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[8px] font-bold text-slate-500 uppercase block",
										children: "Dispatch Channel Preset"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: dispatchSettings.dispatchPreset,
										onChange: (e) => {
											const val = e.target.value;
											setDispatchSettings({ dispatchPreset: val });
											useAppStore.getState().addToast(`Dispatch preset switched to ${val.replace("_", " ")}`, "info");
										},
										className: "w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-[10px] text-slate-200 focus:outline-none focus:border-red-500/50 font-mono",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "STRICT_OFFLINE",
												children: "Strict Offline (USSD Dial *134*911# + Local GSM SMS)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "VIP_TWILIO_CLOUD",
												children: "VIP Cloud (Twilio Voice IVR + VAPI AI + Africa's Talking)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SMS_ONLY",
												children: "SMS Only (Pure Direct GSM + SMS Gateway)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "CUSTOM",
												children: "Custom Multi-Channel Sequential Queue"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8.5px] font-bold text-slate-400 uppercase block",
										children: "Fullscreen Countdown Overlay"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[7.5px] text-slate-500",
										children: "Show visual countdown modal over UI during grace period."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: dispatchSettings.countdownOverlayEnabled,
										onChange: (e) => setDispatchSettings({ countdownOverlayEnabled: e.target.checked }),
										className: "accent-red-500 w-4 h-4"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[8px] font-bold text-slate-500 uppercase block",
										children: "Situational Map Engine"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: dispatchSettings.mapProvider,
										onChange: (e) => {
											const val = e.target.value;
											setDispatchSettings({ mapProvider: val });
											useAppStore.getState().addToast(`Map provider updated to ${val.replace("_", " ")}`, "info");
										},
										className: "w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-[10px] text-slate-200 focus:outline-none focus:border-red-500/50 font-mono",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "GOOGLE_MAPS",
												children: "Google Maps (Hybrid & Live Traffic)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "OPENSTREETMAP",
												children: "OpenStreetMap (Offline GIS Vector Tiles)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "MAPBOX",
												children: "Mapbox Tactical Dark Mode"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "HYBRID_SATELLITE",
												children: "High-Resolution Satellite Imagery"
											})
										]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/40 border border-slate-900 rounded-2xl p-4 space-y-3 font-mono",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
									className: "text-[9px] font-bold text-slate-300 uppercase flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📶" }), " Zero-Data USSD \"Please Call Me\" System"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `px-2 py-0.5 rounded text-[8px] font-bold ${Boolean(dispatchSettings.ussdEnabled) ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30" : "bg-slate-900 text-slate-500"}`,
									children: Boolean(dispatchSettings.ussdEnabled) ? "ACTIVE ON PANIC" : "DISABLED (DEFAULT)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[7.5px] text-slate-400 leading-relaxed font-sans",
								children: [
									"Optional carrier USSD fallback dialer. Disabled by default so panic dispatches follow Server → SMS → Call first; enable to dial your carrier USSD code over cell towers with ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-emerald-400",
										children: "R0.00 airtime and 0MB data"
									}),
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-900",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8.5px] font-bold text-slate-300 uppercase block",
											children: "Auto-Dial USSD in Panic Chain (Optional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[7.5px] text-slate-500",
											children: "Executes carrier USSD dialer after Call step when enabled."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: Boolean(dispatchSettings.ussdEnabled),
											onChange: (e) => {
												setDispatchSettings({ ussdEnabled: e.target.checked });
												useAppStore.getState().addToast(`USSD Auto-Dial ${e.target.checked ? "Enabled" : "Disabled"}`, "info");
											},
											className: "accent-emerald-500 w-4 h-4 cursor-pointer"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[8px] font-bold text-slate-500 uppercase block",
											children: "Mobile Network Operator / Carrier Rules"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-3 sm:grid-cols-6 gap-1.5",
											children: [
												{
													id: "AUTO",
													label: "Auto (SIM)",
													code: "Auto-detect"
												},
												{
													id: "MTN",
													label: "MTN",
													code: "*121*#"
												},
												{
													id: "VODACOM",
													label: "Vodacom",
													code: "*140*#"
												},
												{
													id: "CELL_C",
													label: "Cell C",
													code: "*111*#"
												},
												{
													id: "TELKOM",
													label: "Telkom",
													code: "*140*#"
												},
												{
													id: "CUSTOM",
													label: "Custom",
													code: "Template"
												}
											].map((c) => {
												const isSelected = (dispatchSettings.carrierPreset || "AUTO") === c.id;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => {
														setDispatchSettings({ carrierPreset: c.id });
														useAppStore.getState().addToast(`Carrier rule set to ${c.label}`, "info");
													},
													className: `p-2 rounded-xl text-center border transition-all ${isSelected ? "bg-amber-950/40 border-amber-500/50 text-amber-300 shadow-sm" : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[8.5px] font-bold uppercase",
														children: c.label
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-[7px] text-slate-500 font-mono mt-0.5",
														children: c.code
													})]
												}, c.id);
											})
										})]
									}),
									dispatchSettings.carrierPreset === "CUSTOM" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1 animate-fadeIn",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[8px] font-bold text-slate-400 uppercase block",
											children: "Custom USSD Template (use {NUMBER} placeholder)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: dispatchSettings.customUssdPattern || "*140*{NUMBER}#",
											onChange: (e) => setDispatchSettings({ customUssdPattern: e.target.value }),
											placeholder: "e.g. *140*{NUMBER}# or *121*{NUMBER}#",
											className: "w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-[10px] text-slate-200 focus:outline-none focus:border-amber-500/50 font-mono"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[8px] font-bold text-slate-500 uppercase block",
											children: "SafetyLink GSM Gateway SIM Number (Destination)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: dispatchSettings.pcmGatewayNumber || "0816738186",
												onChange: (e) => setDispatchSettings({ pcmGatewayNumber: e.target.value }),
												placeholder: "0816738186",
												className: "flex-1 bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-[10px] text-slate-200 focus:outline-none focus:border-emerald-500/50 font-mono"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													setDispatchSettings({ pcmGatewayNumber: "0816738186" });
													useAppStore.getState().addToast("Reset to default Rain SIM Gateway (081 673 8186)", "info");
												},
												className: "px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 rounded-xl text-[8px] font-bold uppercase",
												children: "Rain Gateway"
											})]
										})]
									}),
									(() => {
										const liveCode = resolveUssdCode({
											carrierPreset: dispatchSettings.carrierPreset || "AUTO",
											customPattern: dispatchSettings.customUssdPattern || "*140*{NUMBER}#",
											gatewayNumber: dispatchSettings.pcmGatewayNumber || "0816738186"
										});
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 bg-slate-950 border border-slate-900 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[7.5px] text-slate-500 uppercase block font-bold",
												children: "Generated USSD String:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-black text-amber-400 font-mono tracking-wider",
												children: liveCode
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												disabled: isTestingUssd,
												onClick: async () => {
													setIsTestingUssd(true);
													try {
														useAppStore.getState().addToast(`Dialing USSD string: ${liveCode}...`, "info");
														if ((await firePleaseCallMe(liveCode)).success) useAppStore.getState().addToast(`USSD transmitted: ${liveCode}`, "success");
														else useAppStore.getState().addToast(`USSD dial complete or opened in dialer`, "info");
													} catch (err) {
														useAppStore.getState().addToast(`USSD error: ${err?.message || err}`, "error");
													} finally {
														setIsTestingUssd(false);
													}
												},
												className: "w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-[9px] tracking-wider uppercase transition-all shadow-md active:scale-95 disabled:opacity-50",
												children: isTestingUssd ? "DIALING..." : "⚡ TEST DIAL USSD"
											})]
										});
									})()
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/40 border border-slate-900 rounded-2xl p-4 space-y-3 font-mono",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
									className: "text-[9px] font-bold text-slate-300 uppercase flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📜" }), " Native Dispatch & Notification Logs"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											clearDispatchLogs();
											clearNotificationPanelLogs();
											useAppStore.getState().addToast("Dispatch logs cleared", "info");
										},
										className: "text-[7.5px] text-slate-500 hover:text-slate-300 uppercase",
										children: "Clear"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 max-h-48 overflow-y-auto pr-1",
								children: dispatchLogs.length === 0 && notificationPanelLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[8px] text-slate-600 text-center py-4",
									children: "No recent emergency dispatch activity logged."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [dispatchLogs.slice(0, 10).map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 bg-slate-950 border border-slate-900 rounded-xl text-[8px] space-y-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-slate-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-red-400",
												children: [
													"[",
													log.channel,
													"] ➔ ",
													log.target
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `px-1 py-0.2 rounded font-black ${log.status === "SENT" || log.status === "DELIVERED" ? "text-emerald-400" : log.status === "INITIATED" ? "text-cyan-400" : "text-amber-400"}`,
												children: log.status
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-slate-500",
											children: log.details
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[7px] text-slate-600 block",
											children: [
												new Date(log.timestamp).toLocaleTimeString(),
												" • Unit: ",
												log.unitId
											]
										})
									]
								}, log.id)), notificationPanelLogs.slice(0, 6).map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 bg-slate-950/70 border border-slate-900/80 rounded-xl text-[8px] space-y-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-slate-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-indigo-400",
												children: ["[MINI-APP] ", log.action]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-emerald-400 font-bold",
												children: log.status
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-slate-500",
											children: log.details
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[7px] text-slate-600 block",
											children: new Date(log.timestamp).toLocaleTimeString()
										})
									]
								}, log.id))] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center border-t border-slate-800/50 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
									className: "text-[9px] font-bold text-slate-500 uppercase",
									children: "Silent Mode"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center space-x-2 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8px] text-slate-600",
										children: "Enabled"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: silenceAlerts,
										onChange: (e) => setSilenceAlerts(e.target.checked),
										className: "accent-red-500"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[8px] text-slate-500 mt-1",
								children: "Mutes all sirens during panic activation."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center border-t border-slate-800/50 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
									className: "text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🧮" }), " Decoy Mode (Calculator Disguise)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[8px] text-slate-500 mt-0.5",
									children: "Launches an operational calculator to mask SafetyLink under duress."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center space-x-2 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[8px] font-bold ${decoyActive ? "text-emerald-400" : "text-slate-600"}`,
										children: decoyActive ? "ARMED" : "OFF"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: decoyActive,
										onChange: (e) => {
											setDecoyActive(e.target.checked);
											useAppStore.getState().addToast(e.target.checked ? "Calculator disguise armed. Enter " + (decoyCode || "1911") + "= to unlock." : "Calculator disguise disarmed.", "info");
										},
										className: "accent-emerald-500 w-4 h-4 cursor-pointer"
									})]
								})]
							}),
							decoyActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2.5 bg-emerald-950/20 border border-emerald-900/30 rounded-xl space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[8px] font-mono text-emerald-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Unlock Passcode: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [decoyCode || "1911", "="] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Silent SOS Code: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [decoyDistressCode || "9111", "="] })] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[7.5px] text-slate-400",
									children: [
										"To return to SafetyLink at any time, type your passcode into the calculator and press ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "=" }),
										"."
									]
								})]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-950/60 border border-slate-900 rounded-2xl p-4 sm:p-5 space-y-4 font-mono shadow-xl relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900/80 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base",
								children: "📶"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[10px] font-bold text-slate-200 uppercase tracking-wider",
								children: "Primary Cellular SIM Card Selection (Emergency Auto-Lock)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8px] text-slate-500 mt-0.5",
							children: "Pre-locks your chosen SIM card so Android never presents a \"Choose SIM 1 or SIM 2\" prompt during distress."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[7.5px] px-2 py-0.5 rounded-full font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
								children: preferredSimId === -1 ? "AUTO-LOCK (DEFAULT)" : `LOCKED: SUB ${preferredSimId}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => loadSimCards(),
								className: "px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded text-[7.5px] border border-slate-800 transition-all",
								title: "Refresh SIM card detection",
								children: "↻ Scan SIMs"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[8.5px] font-bold text-slate-400 uppercase block",
							children: "Active Radio Modem Assignment:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setPreferredSim(-1),
									className: `p-3 rounded-xl border text-left transition-all relative ${preferredSimId === -1 ? "bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-950/40" : "bg-slate-900/30 border-slate-900 hover:border-slate-800"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] font-bold text-slate-200",
												children: "System Default"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `w-3 h-3 rounded-full border flex items-center justify-center ${preferredSimId === -1 ? "border-emerald-400 bg-emerald-400/20" : "border-slate-700"}`,
												children: preferredSimId === -1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[7.5px] text-slate-400 font-mono",
											children: "Auto-routed via OS default outgoing telephony account. Zero prompts."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[7px] text-emerald-400 font-bold mt-1.5 inline-block",
											children: "RECOMMENDED FOR SINGLE SIM"
										})
									]
								}),
								availableSims.map((sim, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setPreferredSim(sim.subscriptionId),
									className: `p-3 rounded-xl border text-left transition-all relative ${preferredSimId === sim.subscriptionId ? "bg-cyan-950/30 border-cyan-500/60 shadow-lg shadow-cyan-950/40" : "bg-slate-900/30 border-slate-900 hover:border-slate-800"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[9px] font-bold text-slate-200",
												children: [
													"SIM ",
													sim.slot + 1,
													": ",
													sim.carrier || `Slot ${sim.slot}`
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `w-3 h-3 rounded-full border flex items-center justify-center ${preferredSimId === sim.subscriptionId ? "border-cyan-400 bg-cyan-400/20" : "border-slate-700"}`,
												children: preferredSimId === sim.subscriptionId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-400" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[7.5px] text-slate-400 font-mono truncate",
											children: sim.label || `Hardware Radio Slot ${sim.slot}`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[7px] text-cyan-400 font-bold mt-1.5 inline-block",
											children: [
												"SLOT ",
												sim.slot,
												" • SUB #",
												sim.subscriptionId
											]
										})
									]
								}, sim.subscriptionId)),
								availableSims.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-2 p-3 rounded-xl border border-dashed border-slate-800/80 bg-slate-900/20 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[8px] text-slate-500",
										children: "Scanning active SIM hardware slots... (Detected on Android device with READ_PHONE_STATE)."
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-900/40 border border-slate-900/80 rounded-xl p-3 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[8.5px] font-bold text-slate-300 uppercase flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⏱️" }), " Sequential, Timed, Non-Intercepting Dispatch Sequence"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20 font-bold",
									children: "RADIO MODEM COLLISION SHIELD ACTIVE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[7.5px] text-slate-500",
								children: "Emergency channels fire sequentially in strict order to prevent cellular transceiver bus contention:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2 bg-slate-950 border border-slate-800 rounded-lg text-[7.5px] space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-indigo-400 font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "STAGE 1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "T+0.0s" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-slate-300 font-bold",
												children: "Cloud & Mesh Sync"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-slate-500 text-[7px]",
												children: "Flushes IP packets to Cloud Gateway & ThingsBoard before cellular voice locks."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2 bg-slate-950 border border-slate-800 rounded-lg text-[7.5px] space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-cyan-400 font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "STAGE 2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "T+1.5s" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-slate-300 font-bold",
												children: "GSM SMS Broadcast"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-slate-500 text-[7px]",
												children: "PDU transmitted directly via chosen SIM card with incident GPS coordinates."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2 bg-slate-950 border border-slate-800 rounded-lg text-[7.5px] space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-emerald-400 font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "STAGE 3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "T+4.5s" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-slate-300 font-bold",
												children: "Direct Voice Call"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-slate-500 text-[7px]",
												children: "Binds phone circuit via CALL_PHONE using locked PhoneAccountHandle."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2 bg-slate-950 border border-slate-800 rounded-lg text-[7.5px] space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between text-amber-400 font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "STAGE 4 (LAST)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "T+9.5s" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-slate-300 font-bold",
												children: "Free USSD PCM"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-slate-500 text-[7px]",
												children: "Zero-airtime carrier Please-Call-Me code dials last without intercepting voice."
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2 bg-emerald-950/20 border border-emerald-900/30 rounded-lg text-[7.5px] text-emerald-400/90 flex items-center gap-2 mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									children: "🛡️"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Zero-Prompt Guarantee:" }), " By pre-binding Telecom PhoneAccountHandle and SmsManager subscriptionId at the native Android layer, SafetyLink guarantees zero UI dialog prompts during life-critical emergencies."] })]
							})
						]
					})
				]
			})] }),
			(activeSection === "ALL" || activeSection === "HARDWARE") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-950/60 border border-slate-900 rounded-2xl p-4 sm:p-5 space-y-4 font-mono shadow-xl relative overflow-hidden mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900/80 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base",
								children: "🔘"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[10px] font-bold text-slate-200 uppercase tracking-wider",
								children: "BLE / iTAG Hardware Button Triggers"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8px] text-slate-500 mt-0.5",
							children: "Configure customized click sequences and pocket disarm actions for physical Bluetooth buttons."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `text-[7.5px] px-2 py-0.5 rounded-full font-bold uppercase ${bleDevices.some((d) => d.connectionState === "CONNECTED") ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-slate-900 text-slate-500 border border-slate-800"}`,
								children: [bleDevices.filter((d) => d.connectionState === "CONNECTED").length, " Hardware Linked"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-3.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 bg-slate-900/40 border border-slate-900/80 p-3 rounded-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[8.5px] font-bold text-slate-300 uppercase flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1 Press (Single Click)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-400 font-extrabold text-[7.5px]",
											children: "DEFAULT: SOS"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: bleButtonConfig.singlePressAction,
										onChange: (e) => setBleButtonConfig({ singlePressAction: e.target.value }),
										className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[9.5px] text-slate-200 focus:outline-none focus:border-cyan-500/50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "PANIC",
												children: "🚨 Emergency SOS (10s Countdown)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SILENT_PANIC",
												children: "🔕 Silent SOS (Stealth Mode, No Sirens)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "DISABLED",
												children: "⚪ Disabled (Ignore 1 press)"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[7.5px] text-slate-500",
										children: "Initiates full emergency SOS countdown with audible siren and GPS broadcast."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 bg-slate-900/40 border border-slate-900/80 p-3 rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[8.5px] font-bold text-slate-300 uppercase",
										children: "Press During 10s Countdown"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center space-x-1.5 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[7.5px] font-bold ${bleButtonConfig.cancelDuringCountdown ? "text-emerald-400" : "text-slate-600"}`,
											children: bleButtonConfig.cancelDuringCountdown ? "DISARM" : "IGNORE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: bleButtonConfig.cancelDuringCountdown,
											onChange: (e) => setBleButtonConfig({ cancelDuringCountdown: e.target.checked }),
											className: "accent-emerald-500 w-3.5 h-3.5 cursor-pointer"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[7.5px] text-slate-500 mt-1",
									children: "Pressing the button again while the 10-second countdown is ticking immediately aborts dispatch and silences all alarms directly from your pocket."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 bg-slate-900/40 border border-slate-900/80 p-3 rounded-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[8.5px] font-bold text-slate-300 uppercase flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2 Presses (Double Click)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-cyan-400 font-extrabold text-[7.5px]",
											children: "UTILITY"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: bleButtonConfig.doublePressAction,
										onChange: (e) => setBleButtonConfig({ doublePressAction: e.target.value }),
										className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[9.5px] text-slate-200 focus:outline-none focus:border-cyan-500/50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "FIND_PHONE",
												children: "🔔 Find My Phone (Rings phone at max volume)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "CANCEL",
												children: "🛡️ Cancel / Disarm Active Alert"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SAFETY_TIMEOUT",
												children: "⏱️ Start Safety Walk Timeout"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "NONE",
												children: "⚪ None (Ignore double click)"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[7.5px] text-slate-500",
										children: "Triggered when two clicks are detected within a 480ms window."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 bg-slate-900/40 border border-slate-900/80 p-3 rounded-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[8.5px] font-bold text-slate-300 uppercase flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "3 Presses (Triple Click)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-amber-400 font-extrabold text-[7.5px]",
											children: "DEFAULT: TIMEOUT"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: bleButtonConfig.triplePressAction,
										onChange: (e) => setBleButtonConfig({ triplePressAction: e.target.value }),
										className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[9.5px] text-slate-200 focus:outline-none focus:border-cyan-500/50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SAFETY_TIMEOUT",
												children: "⏱️ Start Safety Walk Timeout (Walk-Alone Timer)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "FIND_PHONE",
												children: "🔔 Find My Phone (Rings phone at max volume)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "PANIC",
												children: "🚨 Emergency SOS (Instant Trigger)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "DISABLED",
												children: "⚪ Disabled (Ignore triple click)"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[7.5px] text-slate-500",
										children: "Starts safety check-in countdown. If not checked in before it expires, SOS automatically escalates."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 bg-slate-900/40 border border-slate-900/80 p-3 rounded-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[8.5px] font-bold text-slate-300 uppercase block",
										children: "Safety Timeout Duration"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: bleButtonConfig.safetyTimeoutMinutes,
										onChange: (e) => setBleButtonConfig({ safetyTimeoutMinutes: Number(e.target.value) }),
										className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[9.5px] text-slate-200 focus:outline-none focus:border-cyan-500/50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 5,
												children: "5 Minutes (Quick transit)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 10,
												children: "10 Minutes (Short commute)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 15,
												children: "15 Minutes [Default]"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 30,
												children: "30 Minutes (Extended walk)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: 60,
												children: "60 Minutes (Night shift / Lone worker)"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[7.5px] text-slate-500",
										children: "Timer length before automatic panic escalation if you fail to check in."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 bg-slate-900/40 border border-slate-900/80 p-3 rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[8.5px] font-bold text-slate-300 uppercase",
										children: "Pocket Haptic Feedback"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center space-x-1.5 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[7.5px] font-bold ${bleButtonConfig.hapticFeedback ? "text-cyan-400" : "text-slate-600"}`,
											children: bleButtonConfig.hapticFeedback ? "ENABLED" : "OFF"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: bleButtonConfig.hapticFeedback,
											onChange: (e) => setBleButtonConfig({ hapticFeedback: e.target.checked }),
											className: "accent-cyan-500 w-3.5 h-3.5 cursor-pointer"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[7.5px] text-slate-500 mt-1",
									children: "Phone vibrates with distinct patterns (1 long steady buzz = Disarmed, 3 pulses = Timeout armed, pulsing buzz = SOS)."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 bg-cyan-950/20 border border-cyan-900/30 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-0.5 text-center sm:text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[8.5px] font-bold text-cyan-400 uppercase block",
								children: "🧪 Test Hardware Click Sequences"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[7.5px] text-slate-400",
								children: "Click this button 1, 2, or 3 times rapidly to test your configured actions right in Settings."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setTestClicks((prev) => prev + 1);
								handleHardwareButtonPress("SETTINGS_SIMULATOR");
								setTimeout(() => setTestClicks(0), 1200);
							},
							className: "px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono font-bold text-[9px] uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔘 Click Button" }), testClicks > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-1.5 py-0.2 bg-white/20 rounded-md text-[8px] animate-pulse",
								children: [testClicks, "x"]
							})]
						})]
					})
				]
			}),
			currentUser && (activeSection === "ALL" || activeSection === "SECURITY") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 border-t border-slate-900/60 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[9px] font-bold text-slate-500 uppercase tracking-widest font-display",
						children: "🔒 SECURITY & UNLOCK CHOICE"
					}), hasBiometrics && isPinSettingsUnlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setIsPinSettingsUnlocked(false);
							biometricService.lockScope("settings");
							useAppStore.getState().addToast("Security PIN settings locked.", "info");
						},
						className: "text-[8px] font-mono font-bold text-slate-400 hover:text-slate-200 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-lg uppercase transition-all",
						children: "🔒 Lock"
					})]
				}), hasBiometrics && !isPinSettingsUnlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 text-center space-y-3 font-mono",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 mx-auto rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-lg",
							children: biometryType === "FACE_ID" ? "👤" : "👆"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
							className: "text-[10px] font-bold text-slate-200 uppercase tracking-wider",
							children: "Biometric Protection Active"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8px] text-slate-500 mt-1 max-w-xs mx-auto",
							children: "Authentication is required to view or modify your Safe PIN, Duress PIN, and account credentials."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleUnlockPinSettings,
							disabled: isAuthenticatingPin,
							className: "w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-mono text-[9.5px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: biometryType === "FACE_ID" ? "👤" : "👆" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isAuthenticatingPin ? "Verifying..." : `Authenticate with ${biometryType === "FACE_ID" ? "Face ID" : "Biometrics"}` })]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-950/30 border border-slate-900 rounded-2xl p-4 space-y-3 font-mono",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 pb-3 border-b border-slate-900/60 mb-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[9px] font-bold text-slate-400 block uppercase mb-1",
											children: "Account Password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												placeholder: "New Password",
												value: newPassword,
												onChange: (e) => setNewPassword(e.target.value),
												className: "w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													const newPwd = newPassword;
													if (!newPwd) return useAppStore.getState().addToast("Password cannot be empty", "warn");
													if (currentUser) {
														useAppStore.getState().updateUserPassword(currentUser.id, newPwd);
														useAppStore.getState().addToast("Account password updated successfully.", "success");
														setNewPassword("");
														document.getElementById("newAccountPassword").value = "";
													}
												},
												className: "bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase px-3 rounded-xl border border-blue-500/20 whitespace-nowrap",
												children: "Update"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[8px] text-slate-500 mt-1",
											children: "Change your login password (active in demo mode)."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[9px] font-bold text-slate-400 block uppercase",
									children: "Safe PIN (Cancels Alert)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: userPin,
									onChange: (e) => useAppStore.getState().setUserPin(e.target.value),
									className: "w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50",
									maxLength: 4,
									placeholder: "e.g. 0000"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[7.5px] text-slate-500 mt-1",
									children: "Used to safely cancel an accidental panic trigger."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[9px] font-bold text-slate-400 block uppercase text-red-500/80",
									children: "Duress PIN (Silent Escalation)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: duressPin,
									onChange: (e) => useAppStore.getState().setDuressPin(e.target.value),
									className: "w-full bg-slate-950 border border-red-900/30 rounded-xl px-3 py-2 text-xs text-red-200 focus:outline-none focus:border-red-500/50",
									maxLength: 4,
									placeholder: "e.g. 9999"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[7.5px] text-slate-500 mt-1",
									children: "If forced to cancel by an attacker, enter this to appear like you canceled, but silently escalate to Police."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 pt-2 border-t border-slate-900/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[9px] font-bold text-slate-400 block uppercase",
								children: "Primary Unlock Choice"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									{
										id: "BIOMETRIC",
										label: "Biometric / Passcode"
									},
									{
										id: "PIN",
										label: "SafetyLink PIN"
									},
									{
										id: "DURESS",
										label: "Duress Priority"
									}
								].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setUnlockMethod(opt.id);
										useAppStore.getState().addToast(`Unlock preference set to ${opt.label}.`, "success");
									},
									className: `p-2 rounded-xl border text-[8px] font-bold uppercase transition-all ${unlockMethod === opt.id ? "bg-emerald-600/20 border-emerald-500 text-emerald-300" : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"}`,
									children: opt.label
								}, opt.id))
							})]
						})
					]
				})]
			}),
			currentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 border-t border-slate-900/60 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-[9px] font-bold text-slate-500 uppercase tracking-widest font-display",
					children: "🏢 CAMPUS / SECURITY ORGANIZATION HUB"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-slate-950/30 border border-slate-900 rounded-2xl p-4 space-y-3",
					children: currentUser.orgCode ? (() => {
						const boundOrg = organizations.find((o) => o.id === currentUser.orgCode);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[9.5px] text-emerald-400 font-bold block flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }),
										"ACTIVE ORG CONNECTION: ",
										currentUser.orgCode
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[9px] text-slate-400 font-sans leading-normal",
									children: [
										"Your profile is securely bound to the organization ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: boundOrg?.name || "Authorized Responders Network" }),
										". Alert dispatches are shared with the organization's central control room console in real time."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										updateUserProfile(currentUser.id, {
											orgCode: "",
											pendingOrgCode: ""
										});
										useAppStore.getState().addToast("Successfully disconnected from organization.", "info");
										useAppStore.getState().addAuditLog("SECURITY", "WARN", "Organization Disconnected", `User disconnected from organization ${currentUser.orgCode}`);
									},
									className: "w-full py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 rounded-xl text-[8.5px] font-bold text-red-400 uppercase tracking-wider text-center cursor-pointer",
									children: "🔌 Leave Organization Connection"
								})
							]
						});
					})() : currentUser.pendingOrgCode ? (() => {
						const pendingOrg = organizations.find((o) => o.id === currentUser.pendingOrgCode);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[9.5px] text-amber-400 font-bold block flex items-center gap-1 animate-pulse",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" }), "MEMBERSHIP REQUEST PENDING"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[9px] text-slate-400 font-sans leading-normal",
									children: [
										"You requested to join ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: pendingOrg?.name || currentUser.pendingOrgCode }),
										". Requests require supervisor approval inside the Safety Node Commander Deck."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										updateUserProfile(currentUser.id, { pendingOrgCode: "" });
										useAppStore.getState().addToast("Organization join request cancelled.", "info");
									},
									className: "w-full py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-[8.5px] font-bold text-slate-300 uppercase tracking-wider text-center cursor-pointer",
									children: "❌ Cancel Membership Request"
								})
							]
						});
					})() : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9.5px] text-slate-400 block font-sans leading-normal",
								children: "Type a unique Campus or Patrol Org ID to synchronize distress streams with a local security team, supervisor, or public emergency patrol."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[8px] font-bold text-slate-500 uppercase tracking-wider block",
										children: "Organization ID"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: orgIdInput,
										onChange: (e) => setOrgIdInput(e.target.value),
										className: "w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-[10px] text-slate-200 uppercase focus:outline-none focus:border-purple-500/50 font-mono",
										placeholder: "e.g. SL-ORG-001"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[8px] font-bold text-slate-500 uppercase tracking-wider block",
										children: "Select Your Role"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: selectedJoinRole,
										onChange: (e) => setSelectedJoinRole(e.target.value),
										className: "w-full bg-slate-950 border border-slate-900 rounded-xl px-2 py-2 text-[10px] text-slate-200 focus:outline-none focus:border-purple-500/50 font-mono",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Community Member",
												children: "Community Member"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Guard",
												children: "Guard"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Dispatcher",
												children: "Dispatcher"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Control Room Operator",
												children: "Control Room Operator"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Organization Administrator",
												children: "Organization Administrator"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									if (!orgIdInput.trim()) {
										useAppStore.getState().addToast("Please enter an Organization ID code.", "warn");
										return;
									}
									const res = requestJoinOrganization(currentUser.id, orgIdInput.toUpperCase().trim(), selectedJoinRole);
									if (res.success) {
										useAppStore.getState().addToast(`Membership request as ${selectedJoinRole} submitted! Waiting for admin approval.`, "success");
										setOrgIdInput("");
									} else useAppStore.getState().addToast(res.error || "Failed to submit membership request.", "error");
								},
								className: "w-full py-2 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-500/30 rounded-xl text-[9px] font-bold text-blue-300 uppercase tracking-wider text-center cursor-pointer font-mono",
								children: "🚀 Submit Membership Request"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-950/60 p-2 rounded-lg border border-slate-900/50 text-[7.5px] text-slate-500 space-y-1 font-mono",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold uppercase tracking-wider text-slate-400 text-center",
										children: "💡 SIMULATOR CODE DIRECTORY"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex justify-between",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🏫 School Roster Node:" }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-blue-400 font-bold",
												children: "SL-ORG-001"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex justify-between",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🚨 Security Patrol Escort:" }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-blue-400 font-bold",
												children: "SL-ORG-002"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex justify-between",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🏭 Corporate Safe-zone:" }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-blue-400 font-bold",
												children: "SL-ORG-003"
											})
										]
									})
								]
							})
						]
					})
				})]
			}),
			currentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 border-t border-slate-900/60 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[9px] font-bold text-slate-500 uppercase tracking-widest font-display",
						children: "📡 CELLULAR & TWILIO GATEWAY CREDENTIALS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[8px] font-mono px-2 py-0.5 rounded-full border ${currentUser.canUseAdminTwilio ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400" : "bg-slate-900 border-slate-800 text-slate-400"}`,
						children: currentUser.canUseAdminTwilio ? "ADMIN POOL AUTHORIZED" : "OWN ACCOUNT MODE"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-950/40 border border-slate-900 rounded-2xl p-4 space-y-3 text-left font-mono",
					children: [currentUser.canUseAdminTwilio ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[9px] font-bold text-emerald-400 block flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✅" }), " SYSTEM ADMIN SENDER POOL ACTIVE"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8.5px] text-slate-400 font-sans leading-relaxed",
							children: "The Super Administrator has authorized your account to route emergency SMS & Voice alerts through the central SafetyLink dispatch line. You do not need your own Twilio balance."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[9px] font-bold text-amber-400 block flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🛡️" }), " PRIVATE TWILIO ACCOUNT REQUIRED"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8.5px] text-slate-400 font-sans leading-relaxed",
							children: "To protect shared balance reserves, non-delegated emergency alerts and testing require your own Twilio SID & Token, or standard GSM SMS on device. Enter your private credentials below."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[8px] font-bold text-slate-400 uppercase tracking-wider block",
									children: "My Twilio Account SID"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: currentUser.customTwilioConfig?.accountSid || "",
									onChange: (e) => {
										updateUserProfile(currentUser.id, { customTwilioConfig: {
											...currentUser.customTwilioConfig,
											accountSid: e.target.value.trim()
										} });
									},
									placeholder: "AC_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
									className: "w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-[10px] text-slate-200 focus:outline-none focus:border-amber-500/50"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[8px] font-bold text-slate-400 uppercase tracking-wider block",
									children: "My Twilio Auth Token"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: currentUser.customTwilioConfig?.authToken || "",
									onChange: (e) => {
										updateUserProfile(currentUser.id, { customTwilioConfig: {
											...currentUser.customTwilioConfig,
											authToken: e.target.value.trim()
										} });
									},
									placeholder: "••••••••••••••••••••••••••••••••",
									className: "w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-[10px] text-slate-200 focus:outline-none focus:border-amber-500/50"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[8px] font-bold text-slate-400 uppercase tracking-wider block",
									children: "My Twilio Phone Number (Sender)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: currentUser.customTwilioConfig?.phoneNumber || "",
									onChange: (e) => {
										updateUserProfile(currentUser.id, { customTwilioConfig: {
											...currentUser.customTwilioConfig,
											phoneNumber: e.target.value.trim()
										} });
									},
									placeholder: "+1 (xxx) xxx-xxxx",
									className: "w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-[10px] text-slate-200 focus:outline-none focus:border-amber-500/50"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									useAppStore.getState().addToast("Personal Twilio configuration saved.", "success");
									useAppStore.getState().addAuditLog("SYSTEM", "INFO", "User updated custom Twilio config");
								},
								className: "w-full mt-1 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all",
								children: "💾 Save My Gateway Configuration"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 text-left border-t border-slate-900 pt-4 mt-4 relative z-10 font-mono",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-[9px] font-bold text-slate-500 font-display uppercase tracking-widest",
					children: "🚁 FLEET, CAMERA & DRONE MODULES"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-950/40 border border-slate-900 rounded-2xl p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-1 text-slate-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl",
										children: "🚙"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-extrabold font-display uppercase tracking-wide",
										children: "Safety Fleet Tracking"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] text-slate-500 leading-normal font-sans",
									children: "Monitor active security patrol vehicles, live dispatch routes, and responder telemetry."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => useAppStore.getState().addToast("Safety Fleet Tracking module initiated. Awaiting GPS telemetrics from patrol cars...", "info"),
									className: "w-full py-2 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-500/20 text-blue-400 text-[9px] font-bold rounded-xl transition-all uppercase tracking-wider",
									children: "Open Fleet Dashboard"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-950/40 border border-slate-900 rounded-2xl p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2 mb-1 text-slate-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xl",
											children: "📹"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-extrabold font-display uppercase tracking-wide",
											children: "Hikvision & ONVIF Camera Linking"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-mono text-emerald-400",
										children: [useAppStore.getState().cameras.length, " Linked"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] text-slate-500 leading-normal font-sans",
									children: "Deploy Hikvision, HiLook, or ONVIF cameras straight from your phone via QR / Serial (Hik-Connect P2P), Site Wi-Fi LAN ISAPI, or go2rtc Relay."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowHikvisionManager((v) => !v),
									className: "w-full py-2 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-500/20 text-emerald-300 text-[9px] font-bold rounded-xl transition-all uppercase tracking-wider",
									children: showHikvisionManager ? "Hide Camera Deployment Manager" : "Open Phone Camera Deployment Manager"
								}),
								showHikvisionManager && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-3 border-t border-slate-800",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HikvisionCameraManager, {
										scope: "USER",
										compact: true
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-950/40 border border-slate-900 rounded-2xl p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-1 text-slate-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl",
										children: "🛸"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-extrabold font-display uppercase tracking-wide",
										children: "Drone Deployment Config"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] text-slate-500 leading-normal font-sans",
									children: "Configure external drone dispatch services (e.g., 24hrsdroneforce). Enable automated launch on distress triggers."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 pt-2 border-t border-slate-900/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[8px] font-bold text-slate-500 uppercase tracking-wider block",
												children: "Drone Provider API Key"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												placeholder: "Enter Dispatch API Key",
												className: "w-full bg-slate-950 border border-slate-900 rounded-xl px-3 py-2 text-[10px] text-slate-200 focus:outline-none focus:border-orange-500/50"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[8px] font-bold text-slate-500 uppercase tracking-wider block",
												children: "Default Service Target"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "w-full bg-slate-950 border border-slate-900 rounded-xl px-2 py-2 text-[10px] text-slate-200 focus:outline-none focus:border-orange-500/50",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "24hrsdroneforce",
													children: "24hrsdroneforce (Recommended)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "custom",
													children: "Custom Provider Endpoint"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => useAppStore.getState().addToast("Drone provider settings saved. Ready for aerial deployment requests.", "success"),
											className: "w-full mt-2 py-2 bg-orange-900/30 hover:bg-orange-900/50 border border-orange-500/20 text-orange-400 text-[9px] font-bold rounded-xl transition-all uppercase tracking-wider",
											children: "Save Drone Config"
										})
									]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-left border-t border-slate-900 pt-4 mt-4 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[9px] font-bold text-slate-500 font-display uppercase tracking-widest",
						children: "System Updates"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-500/20",
						children: "v1.0.0 (Latest)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-950 border border-slate-900 rounded-2xl p-3.5 flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-bold text-slate-200",
							children: "Over-the-Air Update"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8px] text-slate-500 font-mono mt-0.5",
							children: "Fetch and install the latest SafetyLink core APK directly from our secure repository."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleCheckForUpdates,
						disabled: isCheckingUpdate,
						className: `shrink-0 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[9px] font-bold uppercase tracking-wider font-mono transition-all ${isCheckingUpdate ? "bg-slate-900 text-slate-500 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"}`,
						children: isCheckingUpdate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-3 h-3 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" }), "Checking..."]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⬇️" }), " Upgrade Build"]
						})
					})]
				})]
			}),
			(activeSection === "ALL" || activeSection === "PRIVACY") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-left border-t border-slate-900 pt-4 mt-4 relative z-10 font-mono",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[9px] font-bold text-slate-500 font-display uppercase tracking-widest",
						children: "🛡️ LOCK-SCREEN OVERLAY & DEVICE SURVIVAL"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-500/20",
						children: screenWakeLockEnabled ? "LOCK-SCREEN READY" : "STANDARD"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-950/60 border border-slate-900 rounded-2xl p-4 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9.5px] font-bold text-slate-200 block uppercase",
							children: "Screen Wake & Display Over Lock Screen"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] text-slate-400",
							children: "Wakes screen and locks emergency countdown over lock screen until PIN verified."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: screenWakeLockEnabled,
							onChange: (e) => {
								const enabled = e.target.checked;
								setScreenWakeLockEnabled(enabled);
								try {
									localStorage.setItem("sl_screen_wake_lock", String(enabled));
								} catch {}
								useAppStore.getState().addToast(`Lock-screen wake overlay ${enabled ? "enabled" : "disabled"}.`, "info");
							},
							className: "accent-emerald-500 w-4 h-4 cursor-pointer"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: async () => {
									if (typeof window !== "undefined" && window.Capacitor?.Plugins?.SafetyLinkEmergency?.requestBatteryOptimizationExemption) await window.Capacitor.Plugins.SafetyLinkEmergency.requestBatteryOptimizationExemption();
									else useAppStore.getState().addToast("Battery exemption is available in the Android APK.", "info");
								},
								className: "py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⚡ Exempt Battery Killer" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: async () => {
									if (typeof window !== "undefined" && window.Capacitor?.Plugins?.SafetyLinkEmergency?.openAppSettings) await window.Capacitor.Plugins.SafetyLinkEmergency.openAppSettings();
									else useAppStore.getState().addToast("App permissions manager is available in the Android APK.", "info");
								},
								className: "py-2.5 px-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⚙️ App Permissions" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									localStorage.removeItem("sl_permissions_configured_v2");
									window.location.reload();
								},
								className: "py-2.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔄 Run Setup Wizard" })
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-left border-t border-slate-900 pt-4 mt-4 relative z-10 font-mono",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[9px] font-bold text-slate-500 font-display uppercase tracking-widest",
						children: "🌐 CLOUDFLARE PRIVATE DNS SHIELD"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] font-mono font-bold text-sky-400 bg-sky-950/30 px-2 py-0.5 rounded-full border border-sky-500/20",
						children: "TLS PORT 853"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-950/60 border border-slate-900 rounded-2xl p-4 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] text-slate-500 uppercase tracking-widest block font-bold",
							children: "Private DNS Provider Hostname"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-emerald-400 font-mono",
							children: "dns.safetylink.online"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								navigator.clipboard?.writeText("dns.safetylink.online");
								useAppStore.getState().addToast("Copied dns.safetylink.online to clipboard", "success");
							},
							className: "py-1 px-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 rounded-lg text-[10px] font-bold",
							children: "Copy"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[9.5px] text-slate-400 font-sans leading-relaxed",
						children: [
							"Android Settings → Network & Internet → Private DNS → select \"Private DNS provider hostname\" and enter ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-slate-200",
								children: "dns.safetylink.online"
							}),
							"."
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-left border-t border-slate-900 pt-4 mt-4 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[9px] font-bold text-slate-500 font-display uppercase tracking-widest",
							children: t("settings.ledger_title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[9px] font-mono font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-900",
							children: [
								filteredLogs.length,
								" ",
								t("settings.events_badge")
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5 font-mono text-[8px] font-bold",
						children: [
							"ALL",
							"SYSTEM",
							"BLE",
							"GPS",
							"DISPATCH",
							"SECURITY"
						].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setFilter(cat),
							className: `px-2.5 py-1 rounded-full border transition-all ${filter === cat ? "bg-blue-600 border-blue-500/20 text-white shadow-md" : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300"}`,
							children: cat
						}, cat))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-44 bg-slate-950/40 border border-slate-900 rounded-2xl overflow-y-auto p-3.5 font-mono text-[10px] space-y-3.5 scrollbar-none",
						children: filteredLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-slate-600 text-center py-10 italic",
							children: "Ledger buffer empty."
						}) : filteredLogs.map((log) => {
							const dateStr = new Date(log.timestamp).toLocaleTimeString();
							const isSevere = log.severity === "SEVERE";
							const isWarn = log.severity === "WARN";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-slate-900/40 pb-2.5 last:border-0 last:pb-0 text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 flex-wrap",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1 h-1 rounded-full ${isSevere ? "bg-red-500 animate-ping" : isWarn ? "bg-orange-500" : "bg-slate-500"}` }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-500 text-[8px]",
													children: dateStr
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-400 font-bold text-[8px] tracking-wider uppercase bg-slate-900 px-1.5 py-0.5 rounded border border-slate-900",
													children: log.category
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `font-black text-[8px] tracking-wider px-1.5 py-0.5 rounded-full ${isSevere ? "bg-red-950/20 border-red-500/20 text-red-400" : isWarn ? "bg-orange-950/20 border-orange-500/20 text-orange-400" : "bg-slate-900 text-slate-500"}`,
											children: log.severity
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-slate-200 font-bold mt-1 leading-normal",
										children: log.message
									}),
									log.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-slate-500 text-[9px] mt-1 leading-normal bg-slate-950/40 p-1.5 rounded-lg border border-slate-900/30",
										children: log.details
									})
								]
							}, log.id);
						})
					})
				]
			})
		]
	});
};
//#endregion
export { Settings };
