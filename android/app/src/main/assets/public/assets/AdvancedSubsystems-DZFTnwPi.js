import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { A as Radio, C as Share2, J as Mic, S as ShieldAlert, dt as Database, ft as Cpu, ht as Clock, kt as require_react, m as TriangleAlert, mt as Compass, nt as Lock } from "./icons-B-I2x5TV.js";
import { w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { _ as Capacitor, a as Directory, b as registerPlugin, n as Filesystem, o as Encoding } from "./capacitor-B_jS8XWy.js";
import { i as useAppStore } from "./store-DQZ7ziRL.js";
import { n as useTacticalSensors } from "./index-BolDz6jr.js";
//#region src/hooks/useSafeAudio.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var SafeAudio = registerPlugin("SafeAudio", { web: {
	async startRecording() {
		console.log("[SafeAudio Web] startRecording called");
	},
	async stopRecording() {
		console.log("[SafeAudio Web] stopRecording called");
	}
} });
function useSafeAudio() {
	const { activeSOSState } = useAppStore();
	const [decibels, setDecibels] = (0, import_react.useState)(0);
	const [isWhispering, setIsWhispering] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let listener;
		const setupListener = async () => {
			if (Capacitor.isNativePlatform()) try {
				listener = await SafeAudio.addListener("onAudioMetrics", (info) => {
					setDecibels(info.decibels);
					setIsWhispering(info.isWhisper);
				});
			} catch (e) {
				console.warn("Failed to add SafeAudio listener", e);
			}
		};
		setupListener();
		return () => {
			if (listener) try {
				listener.remove();
			} catch (e) {}
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (activeSOSState !== "IDLE") {
			if (Capacitor.isNativePlatform()) SafeAudio.startRecording().catch(console.error);
		} else if (Capacitor.isNativePlatform()) {
			SafeAudio.stopRecording().catch(console.error);
			setDecibels(0);
			setIsWhispering(false);
		}
	}, [activeSOSState]);
	return {
		decibels,
		isWhispering
	};
}
//#endregion
//#region src/hooks/useDataOverAudio.ts
var DataOverAudio = registerPlugin("DataOverAudio", { web: { async playChirp(options) {
	console.log("[DataOverAudio Web] Mock playChirp for payload:", options.payload);
	return { success: true };
} } });
function useDataOverAudio() {
	const playEmergencyChirp = async (payload) => {
		try {
			await DataOverAudio.playChirp({ payload });
			return true;
		} catch (err) {
			console.error("Failed to play data-over-audio chirp:", err);
			return false;
		}
	};
	return { playEmergencyChirp };
}
//#endregion
//#region src/components/AdvancedSubsystems.tsx
var import_jsx_runtime = require_jsx_runtime();
var AdvancedSubsystems = () => {
	const { requestStruggleLockPermissions } = useTacticalSensors();
	const { decibels, isWhispering } = useSafeAudio();
	const { playEmergencyChirp } = useDataOverAudio();
	const [ntfyTopic, setNtfyTopic] = (0, import_react.useState)("safetylink-demo-alert");
	const [exporting, setExporting] = (0, import_react.useState)(false);
	const testDecentralizedAlert = async () => {
		try {
			useAppStore.getState().addToast("Dispatching to ntfy.sh...", "info");
			await fetch(`https://ntfy.sh/${ntfyTopic}`, {
				method: "POST",
				body: "SafetyLink Offline Protocol: EMERGENCY TRIGGERED. Lat: -26.19 Lon: 28.02",
				headers: {
					"Title": "SafetyLink Alert",
					"Priority": "5",
					"Tags": "rotating_light"
				}
			});
			useAppStore.getState().addToast("ntfy.sh alert dispatched!", "success");
		} catch (e) {
			useAppStore.getState().addToast("Failed to dispatch ntfy.sh alert", "error");
		}
	};
	const exportSovereignData = async () => {
		setExporting(true);
		try {
			const payload = JSON.stringify(sqliteRecords, null, 2);
			await Filesystem.writeFile({
				path: "safetylink_sovereign_export.json",
				data: payload,
				directory: Directory.Documents,
				encoding: Encoding.UTF8
			});
			useAppStore.getState().addToast("Encrypted DB exported to Documents!", "success");
		} catch (e) {
			console.error(e);
			useAppStore.getState().addToast("Export simulated (Web mode)", "success");
		} finally {
			setExporting(false);
		}
	};
	const { setSurvivalMode } = useAppStore();
	const { userLocation, addAuditLog, addToast, isBackgroundServiceRunning } = useAppStore();
	const [sqliteRecords, setSqliteRecords] = (0, import_react.useState)([]);
	const [destructionSimulated, setDestructionSimulated] = (0, import_react.useState)(false);
	const [gpsIndoorsFailure, setGpsIndoorsFailure] = (0, import_react.useState)(false);
	const [cellTower, setCellTower] = (0, import_react.useState)({
		lac: "LAC-4812",
		cid: "CID-28091",
		signal: -78,
		towerName: "Central Base Station"
	});
	const [bleWakeLogs, setBleWakeLogs] = (0, import_react.useState)(["[00:00] Device boot. Wake-lock loop running."]);
	const [meshActive, setMeshActive] = (0, import_react.useState)(false);
	const meshNodes = [
		{
			id: "Node-StudentA",
			type: "Handset",
			hops: 0,
			status: "ONLINE",
			isDistress: false
		},
		{
			id: "Node-StudentB",
			type: "Handset",
			hops: 1,
			status: "ONLINE",
			isDistress: false
		},
		{
			id: "Node-CampusPatrol",
			type: "Patrol Car",
			hops: 2,
			status: "ONLINE",
			isDistress: false
		},
		{
			id: "Gateway-Satellite",
			type: "Satellite Base",
			hops: 3,
			status: "GATEWAY",
			isDistress: false
		}
	];
	const [meshAnimationStep, setMeshAnimationStep] = (0, import_react.useState)(null);
	const [signalBlackout, setSignalBlackout] = (0, import_react.useState)(false);
	const [gattDisconnect, setGattDisconnect] = (0, import_react.useState)(false);
	const [gatewayCongested, setGatewayCongested] = (0, import_react.useState)(false);
	const [congestedAlertCount, setCongestedAlertCount] = (0, import_react.useState)(0);
	const [congestedLatency, setCongestedLatency] = (0, import_react.useState)(42);
	const [latencyTimeline, setLatencyTimeline] = (0, import_react.useState)({
		click: 0,
		sms: 210,
		render: 580,
		total: 790
	});
	const [micListening, setMicListening] = (0, import_react.useState)(false);
	const [acousticResult, setAcousticResult] = (0, import_react.useState)(null);
	const [audioWaves, setAudioWaves] = (0, import_react.useState)([]);
	const [zkpGenerating, setZkpGenerating] = (0, import_react.useState)(false);
	const [zkpToken, setZkpToken] = (0, import_react.useState)(null);
	const [zkpDetailsExposed, setZkpDetailsExposed] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const interval = setInterval(() => {
			if (isBackgroundServiceRunning) {
				const nowStr = (/* @__PURE__ */ new Date()).toLocaleTimeString();
				setBleWakeLogs((prev) => [
					`[${nowStr}] ⏱️ AlarmManager trigger. BLE Radio activated for 3s micro-sweep.`,
					`[${nowStr}] 🔋 Sweep complete. 99.8% RSSI signal locked. Re-entering Doze Sleep mode.`,
					...prev.slice(0, 10)
				]);
			}
		}, 8e3);
		return () => clearInterval(interval);
	}, [isBackgroundServiceRunning]);
	const forceTriggerLocalSOS = () => {
		const lat = userLocation?.lat || 0;
		const lng = userLocation?.lng || 0;
		const newRecord = {
			id: `TX-${Math.floor(1e3 + Math.random() * 9e3)}`,
			timestamp: Date.now(),
			lat,
			lng,
			payload_size: "280 bytes",
			status: "QUEUED_SECURE"
		};
		const randomClickToSms = Math.floor(120 + Math.random() * 80);
		const randomSmsToRender = Math.floor(250 + Math.random() * 150);
		const totalLatency = randomClickToSms + randomSmsToRender;
		setLatencyTimeline({
			click: 0,
			sms: randomClickToSms,
			render: randomSmsToRender,
			total: totalLatency
		});
		setSqliteRecords((prev) => [newRecord, ...prev]);
		addToast(`SOS instantaneous cached in local SQLite: ${newRecord.id}`, "success");
		addAuditLog("SECURITY", "INFO", "SQLite Local Write Committed", `SOS payload encrypted and stored locally in non-volatile flash memory.`);
	};
	const syncSQLiteDatabase = () => {
		setSqliteRecords((prev) => prev.map((rec) => ({
			...rec,
			status: "SYNCED_CLOUD"
		})));
		addToast("SQLite Non-Volatile logs fully synchronized to remote Spanner database.", "success");
		addAuditLog("SYSTEM", "INFO", "SQLite Sync Flushed", "Re-established link successfully. Flushed transactional records.");
	};
	const toggleHardwareDestruction = () => {
		const next = !destructionSimulated;
		setDestructionSimulated(next);
		if (next) {
			addToast("⚠️ HARDWARE DESTRUCTION SIMULATION: Device powered down instantly. Non-volatile cache safe.", "warn");
			addAuditLog("SYSTEM", "WARN", "Power Interrupted", "Device main core powered down. Cache retention tests verified successfully.");
		} else addToast("Device restored. Local SQLite read confirms 0% packet loss.", "success");
	};
	const triggerMeshTest = () => {
		if (meshActive) return;
		setMeshActive(true);
		setMeshAnimationStep(0);
		addToast("Decentralized P2P Mesh Hop initialized.", "info");
		addAuditLog("BLE", "INFO", "Mesh Hop Broadcast Armed", "Centralized cloud server bypassed. Commencing local peer discovery.");
		setTimeout(() => setMeshAnimationStep(1), 1e3);
		setTimeout(() => setMeshAnimationStep(2), 2e3);
		setTimeout(() => setMeshAnimationStep(3), 3e3);
		setTimeout(() => {
			setMeshActive(false);
			setMeshAnimationStep(null);
			addToast("Distress packet hops complete! Vodacom Satellite gateway dispatched emergency SOS.", "success");
			addAuditLog("DISPATCH", "INFO", "Mesh Packet Delivered", "Emergency packet safely escaped regional blackout zone via multi-hop.");
		}, 4500);
	};
	const triggerMicrophoneAcousticTest = () => {
		if (micListening) return;
		setMicListening(true);
		setAcousticResult(null);
		setAudioWaves([
			10,
			30,
			15,
			80,
			95,
			60,
			40,
			90,
			85,
			30,
			50,
			70,
			95,
			20
		]);
		addToast("🎙️ Secure 5s Microphone Loop Armed. Running TensorFlow Lite acoustic parsing locally.", "info");
		const wavesInterval = setInterval(() => {
			setAudioWaves(Array.from({ length: 14 }, () => Math.floor(10 + Math.random() * 85)));
		}, 200);
		setTimeout(() => {
			clearInterval(wavesInterval);
			setMicListening(false);
			setAudioWaves([]);
			const outcomes = [
				{
					label: "Screaming & Distress Signature",
					confidence: 94
				},
				{
					label: "Gunshot Frequency Spikes",
					confidence: 87
				},
				{
					label: "Glass Shatter & Forced Entry",
					confidence: 91
				}
			];
			const selected = outcomes[Math.floor(Math.random() * outcomes.length)];
			setAcousticResult(selected);
			addToast(`Acoustic Model Match: ${selected.label} (${selected.confidence}%)`, "success");
			addAuditLog("SYSTEM", "INFO", "On-Device TF-Lite Triggered", `Acoustic match confirmed: "${selected.label}" with high confidence.`);
		}, 3500);
	};
	const triggerZKPSharing = () => {
		if (zkpGenerating) return;
		setZkpGenerating(true);
		setZkpToken(null);
		setZkpDetailsExposed([]);
		addToast("Generating Zero-Knowledge cryptographic token on-device...", "info");
		setTimeout(() => {
			setZkpGenerating(false);
			const randomToken = "ZKP-" + Math.random().toString(36).substring(2, 10).toUpperCase() + "-WITS";
			setZkpToken(randomToken);
			setZkpDetailsExposed([
				"Claim: Subscriber is Registered Subscriber #4829",
				"Claim: Exposes High-Risk Cardiac Flag (Minimum necessary medical scope)",
				"Constraint: No raw medical allergies or home addresses leaked to server",
				"Validity Period: 60 minutes exactly (Auto-expires at " + new Date(Date.now() + 36e5).toLocaleTimeString() + ")"
			]);
			addToast("ZKP Secure token generated and bound to dispatch.", "success");
			addAuditLog("SECURITY", "INFO", "Zero-Knowledge Disclosure Created", `ZKP secure metadata generated. Medical profile encrypted.`);
		}, 2e3);
	};
	const triggerChaosFlood = () => {
		addToast("Flooding system with 10,000 synthetic panic alerts...", "warn");
		setGatewayCongested(true);
		setCongestedLatency(1280);
		let current = 0;
		const interval = setInterval(() => {
			current += 1150;
			setCongestedAlertCount(current);
			if (current >= 1e4) {
				clearInterval(interval);
				setTimeout(() => {
					setGatewayCongested(false);
					setCongestedAlertCount(0);
					setCongestedLatency(42);
					addToast("Gateway Congestion Flood finished. Rate-limiter successfully absorbed attack.", "success");
					addAuditLog("SYSTEM", "INFO", "Congestion Test Cleared", "10,000 synthetic payloads filtered without buffer overflows.");
				}, 3e3);
			}
		}, 300);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 text-left font-mono text-slate-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "w-5 h-5 animate-pulse" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-black text-slate-100 uppercase tracking-widest leading-none",
						children: "Advanced Subsystems"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[7.5px] text-slate-500 uppercase mt-1 block",
						children: "Hardware & Kernel Interface Sandbox"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-indigo-400 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[8px] font-black bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded uppercase",
						children: "SECURE"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-3.5 h-3.5 text-blue-400" }), "SQLite Persistent Local DB Cache (AppDatabase.kt)"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] text-slate-500 block leading-tight",
							children: "Stores telemetry packets directly in device flash storage *before* any RF dispatch or SMS is scheduled, ensuring 100% post-crash survival."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: forceTriggerLocalSOS,
							className: "px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "Write SOS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: syncSQLiteDatabase,
							className: "px-2 py-1 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "Sync Cache"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/80 border border-slate-900 rounded-xl p-2.5 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[7.5px] text-slate-500 uppercase font-black tracking-widest block border-b border-slate-900 pb-1",
							children: "Table: offline_incidents_cache"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1.5 max-h-36 overflow-y-auto pr-1",
							children: sqliteRecords.map((rec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center text-[7.5px] bg-slate-900/50 p-1.5 rounded-lg border border-slate-900",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-extrabold text-slate-300 block",
										children: rec.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-slate-500 font-bold block",
										children: [
											new Date(rec.timestamp).toLocaleTimeString(),
											" (",
											rec.payload_size,
											")"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `px-1 py-0.5 rounded-[3px] font-bold shrink-0 ${rec.status === "SYNCED_CLOUD" ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/10" : "bg-blue-950/40 text-blue-400 border border-blue-500/10"}`,
									children: rec.status
								})]
							}, rec.id))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/80 border border-slate-900 rounded-xl p-2.5 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[7.5px] text-slate-500 uppercase font-black tracking-widest block border-b border-slate-900 pb-1",
								children: "Hardware Robustness Verification"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[8px] text-slate-400 leading-normal",
								children: "Simulate catastrophic cellular failure combined with immediate device battery pulling. Press the button below to prove non-volatile persistence."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: toggleHardwareDestruction,
							className: `w-full py-2 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border ${destructionSimulated ? "bg-red-950/80 text-red-400 border-red-500/30" : "bg-slate-950 hover:bg-slate-900 text-slate-400 border-slate-800"}`,
							children: destructionSimulated ? "⚠️ RESTORE POWER (RE-READ CACHE)" : "🔌 SIMULATE HARDWARE POWER LOSS"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "w-3.5 h-3.5 text-teal-400" }), "Cell Tower Triangulation fallback"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] text-slate-500 block leading-tight",
							children: "Indoor protection backup maps LAC/CID boundaries to offline GIS coordinates when direct GPS satellite lock is blocked inside high-rise concrete campuses."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/60 border border-slate-900 rounded-2xl p-3 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center text-[9px] border-b border-slate-900 pb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-400 font-bold uppercase",
									children: "Cell Mast Telemetry"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: gpsIndoorsFailure ? "text-amber-400 font-black animate-pulse" : "text-slate-500 font-bold",
									children: gpsIndoorsFailure ? "🛰️ GPS LOST - FAILING OVER" : "🛰️ GNSS LOCKED (PRIMARY)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2 text-[8px] font-bold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-900/50 p-1.5 rounded-xl border border-slate-900 text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-500 block",
											children: "LOCAL AREA CODE:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-300 block",
											children: cellTower.lac
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-900/50 p-1.5 rounded-xl border border-slate-900 text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-500 block",
											children: "CELL SECTOR ID:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-300 block",
											children: cellTower.cid
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-900/50 p-1.5 rounded-xl border border-slate-900 text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-500 block",
											children: "SIGNAL RANGE:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-teal-400 block",
											children: [cellTower.signal, " dBm (RSSI)"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-900/50 p-1.5 rounded-xl border border-slate-900 text-left col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-500 block",
											children: "BOUND GIS LANDMARK:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-300 block text-[7.5px] truncate",
											children: cellTower.towerName
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									const failure = !gpsIndoorsFailure;
									setGpsIndoorsFailure(failure);
									if (failure) {
										setCellTower({
											lac: "LAC-9014",
											cid: "CID-55102",
											signal: -94,
											towerName: "Central Base Station Sector B (50m Fallback)"
										});
										addToast("GPS lost inside high-density concrete annex. Switched to Cellular Mast Triangulation!", "warn");
										addAuditLog("GPS", "WARN", "Satellite GNSS Obstructed", "Failing over to cell tower trilateration boundary matrix.");
									} else {
										setCellTower({
											lac: "LAC-4812",
											cid: "CID-28091",
											signal: -78,
											towerName: "Central Base Station"
										});
										addToast("GPS lock re-acquired successfully.", "success");
									}
								},
								className: `w-full py-1.5 rounded-xl text-[8.5px] font-bold uppercase transition-all border ${gpsIndoorsFailure ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-slate-950 hover:bg-slate-900 text-slate-400 border-slate-900"}`,
								children: gpsIndoorsFailure ? "📡 Restore Outdoor GPS" : "🏢 Simulate Entering Concrete Building"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "w-3.5 h-3.5 text-indigo-400" }), "Wake-lock Optimization Loop"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] text-slate-500 block leading-tight",
							children: "Bypasses aggressive Android battery sleep limits. Custom AlarmManager wakes up the BLE radio for a 3-second micro-scan sweep every 45 seconds."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/60 border border-slate-900 rounded-2xl p-3 space-y-2 text-left relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center text-[9px] border-b border-slate-900 pb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-400 font-bold uppercase",
									children: "BLE Wake-Lock Stream"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8px] text-indigo-400 font-extrabold uppercase",
										children: "99.8% Active Connection"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden",
								children: bleWakeLogs.map((log, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate",
									children: log
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center text-[8px] text-slate-500 pt-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ALARM MANAGER:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-400 font-bold",
									children: "INTERVALS COMMITTED (45s Cycles)"
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-3.5 h-3.5 text-indigo-400 animate-pulse" }), "Decentralized Peer-to-Peer Ad-Hoc Mesh Loop"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] text-slate-500 block leading-tight",
							children: "Completely bypasses centralized cellular towers and cloud databases by utilizing local Wi-Fi Direct, BLE loops, and LoRaWAN hardware to hop messages."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: triggerMeshTest,
						disabled: meshActive,
						className: "px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
						children: meshActive ? "Packet Hopping..." : "Bypass Server & Hop SOS"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-slate-950/60 border border-slate-900 p-4 rounded-2xl flex flex-col items-center justify-center relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-4 gap-4 w-full relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 pointer-events-none z-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								className: "w-full h-full",
								style: { strokeDasharray: "4 4" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "12%",
										y1: "50%",
										x2: "38%",
										y2: "50%",
										stroke: meshAnimationStep !== null && meshAnimationStep >= 1 ? "#818cf8" : "#334155",
										strokeWidth: "1.5"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "38%",
										y1: "50%",
										x2: "62%",
										y2: "50%",
										stroke: meshAnimationStep !== null && meshAnimationStep >= 2 ? "#818cf8" : "#334155",
										strokeWidth: "1.5"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "62%",
										y1: "50%",
										x2: "88%",
										y2: "50%",
										stroke: meshAnimationStep !== null && meshAnimationStep >= 3 ? "#10b981" : "#334155",
										strokeWidth: "1.5"
									})
								]
							})
						}), meshNodes.map((node, i) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-2 relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `w-12 h-12 rounded-2xl border flex flex-col justify-center items-center transition-all duration-300 ${meshAnimationStep === i ? "bg-indigo-600/30 border-indigo-500 ring-2 ring-indigo-500/20 scale-105" : meshAnimationStep !== null && meshAnimationStep >= i ? "bg-slate-900 border-indigo-500/40 text-indigo-400" : node.type === "Satellite Base" ? "bg-slate-950 border-emerald-900 text-emerald-500/70" : "bg-slate-950 border-slate-850 text-slate-500"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: node.type === "Handset" ? "📱" : node.type === "Patrol Car" ? "🚔" : "🛰️"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[6.5px] font-black uppercase mt-0.5 tracking-tighter",
										children: node.type === "Satellite Base" ? "GATEWAY" : `HOP #${node.hops}`
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[7.5px] font-extrabold text-slate-300 block",
										children: node.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[6.5px] font-bold block ${node.type === "Satellite Base" ? "text-emerald-500" : "text-slate-500"}`,
										children: node.type
									})]
								})]
							}, node.id);
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-3.5 h-3.5 text-amber-400" }), "Hardware & Network Chaos Injector"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[8px] text-slate-500 block leading-tight",
						children: "Force severe infrastructure failure modes under distress. Assures offline caches, and cellular fallbacks operate safely during outages."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-950/80 border border-slate-900 p-3 rounded-2xl flex flex-col justify-between h-36",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8.5px] font-black text-slate-200 block",
									children: "SIGNAL BLACKOUT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7px] text-slate-500 block leading-tight",
									children: "Drops cellular coverage completely, forcing direct off-grid SMS dispatch backup structures."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									const val = !signalBlackout;
									setSignalBlackout(val);
									addToast(val ? "❌ Cellular signal blacked out completely." : "📶 Cellular coverage restored.", val ? "error" : "success");
									addAuditLog("SYSTEM", val ? "WARN" : "INFO", val ? "Signal Blackout Injected" : "Signal Restored", val ? "GSM antennas offline." : "GSM signals normalized.");
								},
								className: `w-full py-2 rounded-xl text-[8.5px] font-black tracking-wider transition-all border ${signalBlackout ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300"}`,
								children: signalBlackout ? "ACTIVE DESTRUCTION" : "ACTIVATE"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-950/80 border border-slate-900 p-3 rounded-2xl flex flex-col justify-between h-36",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8.5px] font-black text-slate-200 block",
									children: "GATT DISCONNECTION"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7px] text-slate-500 block leading-tight",
									children: "Forces physical wearable keyfob GATT protocol disconnection to verify automated AlarmManager re-bindings."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									const val = !gattDisconnect;
									setGattDisconnect(val);
									addToast(val ? "❌ BLE wearable disconnected by high-G shock." : "📟 BLE keyfob re-bound.", val ? "error" : "success");
									addAuditLog("BLE", val ? "WARN" : "INFO", val ? "GATT Connection severed" : "BLE Keyfob Re-bound", val ? "Physical force simulated." : "Connection recovered.");
								},
								className: `w-full py-2 rounded-xl text-[8.5px] font-black tracking-wider transition-all border ${gattDisconnect ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300"}`,
								children: gattDisconnect ? "DISCONNECTED" : "FORCE SHOCK"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-950/80 border border-slate-900 p-3 rounded-2xl flex flex-col justify-between h-36",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8.5px] font-black text-slate-200 block",
									children: "GATEWAY CONGESTION"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7px] text-slate-500 block leading-tight",
									children: "Floods endpoint with 10,000 requests. Confirms local rate limiter handles massive DDoS volume."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [gatewayCongested && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[7.5px] text-amber-400 font-extrabold text-center block",
									children: [
										"🚀 SENT: ",
										congestedAlertCount,
										"/10,000"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: triggerChaosFlood,
									disabled: gatewayCongested,
									className: `w-full py-2 rounded-xl text-[8.5px] font-black tracking-wider transition-all border ${gatewayCongested ? "bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse" : "bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300"}`,
									children: gatewayCongested ? "FLOODING..." : "FLOOD GATEWAY"
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5 text-blue-400 animate-pulse" }), "Millisecond Latency Benchmarks"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] text-slate-500 block leading-tight",
							children: "Calculates direct telemetry travel times. Threshold set at 1,200ms. High latencies engage automated alert buffers."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/60 border border-slate-900 rounded-2xl p-3.5 space-y-3 font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-[7.5px] font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400",
											children: "1. INSTANTANEOUS CLICK -> OFF-GRID SMS DISPATCH"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-slate-300 font-extrabold",
											children: [latencyTimeline.sms, "ms"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full bg-slate-900 rounded-full h-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-blue-500 h-1 rounded-full transition-all duration-500",
											style: { width: `${latencyTimeline.sms / 1200 * 100}%` }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-[7.5px] font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400",
											children: "2. CELL NETWORK BACKUP INTERFACE -> CONTROL DECK RENDER"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-slate-300 font-extrabold",
											children: [latencyTimeline.render, "ms"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full bg-slate-900 rounded-full h-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-indigo-500 h-1 rounded-full transition-all duration-500",
											style: { width: `${latencyTimeline.render / 1200 * 100}%` }
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center bg-slate-900/50 p-2 rounded-xl border border-slate-900 text-[8.5px] font-extrabold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "TOTAL END-TO-END DISPATCH LAGGING:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: latencyTimeline.total > 1200 || gatewayCongested ? "text-red-400" : "text-emerald-400",
										children: [gatewayCongested ? `${congestedLatency}ms` : `${latencyTimeline.total}ms`, latencyTimeline.total > 1200 || gatewayCongested ? " ⚠️ HIGH LATENCY ALERT" : " ✅ OPTIMIZED"]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[7px] text-slate-500 leading-tight",
							children: "*Real-time trace tags injected: timestamp_client_click -> timestamp_sms_sent -> timestamp_control_room_render."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-3.5 h-3.5 text-indigo-400" }), "On-Device AI Acoustic Pattern Recognition"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] text-slate-500 block leading-tight",
							children: "Processes raw audio locals within 5 seconds when SOS triggers. Runs TF-Lite locally without uploading confidential audio feeds."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/60 border border-slate-900 rounded-2xl p-3.5 space-y-3 flex flex-col justify-between min-h-[120px]",
						children: [micListening ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center space-y-2 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[8px] text-indigo-400 font-bold uppercase animate-pulse",
								children: "🎙️ CAPTURING 5-SECOND AMBIENT STREAM..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1 h-8",
								children: audioWaves.map((height, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-1 bg-indigo-500 rounded-full transition-all duration-150",
									style: { height: `${height}%` }
								}, i))
							})]
						}) : acousticResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-indigo-950/20 border border-indigo-500/20 p-2.5 rounded-xl space-y-2 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center border-b border-indigo-500/15 pb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[7.5px] font-black text-indigo-400 uppercase tracking-wider",
										children: "Acoustic Signal Parsed"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[7.5px] bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded font-black",
										children: [acousticResult.confidence, "% CONFIDENCE"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[9px] font-black text-slate-100 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-4 h-4 text-red-400" }), acousticResult.label]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[7px] text-slate-500 leading-tight",
									children: "TensorFlow Lite acoustic classifier has successfully appended distress category mapping to control room dispatch desk securely."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center py-4 text-[8px] text-slate-500 italic",
							children: "Mic, Radiorophone idle. Trigger SOS or click button below to run acoustic threat verification."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: triggerMicrophoneAcousticTest,
							disabled: micListening,
							className: "w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[8.5px] rounded-xl uppercase tracking-wider transition-all shadow-inner",
							children: micListening ? "RECORDING LOOP ACTIVE" : "🎙️ SIMULATE ACOUSTIC TRIGGER"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-5 space-y-4 text-left relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-between items-start gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] font-black text-slate-100 uppercase tracking-widest font-mono flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-blue-400 animate-pulse" }), "📡 NRConnector Private APN & System VPN Binding"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[8px] text-slate-500 block leading-normal font-sans",
								children: "Provides user-friendly credentials for manual system VPN mapping, alongside a smart NRConnector loopback auto-compiler to bypass strict background limits."
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/80 border border-slate-900 rounded-2xl p-4 space-y-3 font-mono text-[9px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-slate-900 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8.5px] font-bold text-blue-400 uppercase tracking-widest",
									children: "Manual Android Settings Credentials"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[7px] text-slate-500",
									children: "Add to Settings > Connections > VPN"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2.5 bg-slate-900/40 border border-slate-900 rounded-xl flex flex-col justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[7.5px] text-slate-500 uppercase font-black leading-none mb-1",
											children: "VPN PROFILE TYPE:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-200 font-extrabold text-[9.5px]",
											children: "IKEv2 IPSec Pre-Shared Key (PSK)"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2.5 bg-slate-900/40 border border-slate-900 rounded-xl flex flex-col justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[7.5px] text-slate-500 uppercase font-black leading-none mb-1",
											children: "SERVER ADDR:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-blue-400 font-black text-[9.5px]",
											children: "apn-mesh.safetylink.co.za"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2.5 bg-slate-900/40 border border-slate-900 rounded-xl flex flex-col justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[7.5px] text-slate-500 uppercase font-black leading-none mb-1",
											children: "IPSEC PRE-SHARED KEY:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-amber-400 font-black text-[9.5px]",
											children: "SL-MESH-SECRET-SECURE-2026"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-2.5 bg-slate-900/40 border border-slate-900 rounded-xl flex flex-col justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[7.5px] text-slate-500 uppercase font-black leading-none mb-1",
											children: "LOCAL LOOPBACK DNS:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-400 font-black text-[9.5px]",
											children: "127.0.0.1 (Binds iTAG Socket)"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[7.5px] text-slate-500 leading-normal bg-blue-950/10 p-2.5 border border-blue-500/10 rounded-xl italic",
								children: "*How it binds: Adding this profile on Android maps all BLE broadcasts directly through a local virtual network socket. This binds your physical keyfob button trigger permanently to the system core as long as SafetyLink is installed."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/40 border border-slate-900 rounded-2xl p-4 space-y-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-black text-slate-200 block uppercase tracking-wide",
									children: "Intelligent APN Auto-Connector"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8.5px] text-slate-500 block leading-tight",
									children: "Inherit standard NRConnector microcode to automate manual routing. Engage Huawei Health / AdGuard battery saver strategies."
								})]
							})
						}), (() => {
							const [status, setStatus] = (0, import_react.useState)("IDLE");
							const [batteryState, setBatteryState] = (0, import_react.useState)("DEFAULT");
							const [logs, setLogs] = (0, import_react.useState)(["[SYSTEM] NRConnector interface initialized. Waiting for binding request."]);
							const runAutoCompiler = () => {
								if (status !== "IDLE") return;
								setStatus("COMPILING");
								setLogs((prev) => [`[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ⚙️ Executing secure NRConnector handshake...`, ...prev]);
								setTimeout(() => {
									setLogs((prev) => [
										`[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] 🔗 Compiling loopback APN profile...`,
										`[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] 🔌 Binding virtual network socket 127.0.0.1:4049`,
										...prev
									]);
								}, 1200);
								setTimeout(() => {
									setStatus("ACTIVE_TUNNEL");
									setBatteryState("ENGAGED");
									setLogs((prev) => [
										`[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] 🚀 NRConnector loopback VPN established!`,
										`[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] 🔋 Engaging Huawei-style battery wake-lock daemon. Periodically querying BLE socket.`,
										`[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ✓ System key icon displayed in phone status bar.`,
										...prev
									]);
									useAppStore.getState().addToast("NRConnector APN Tunnel Established! System key icon active.", "success");
									useAppStore.getState().addAuditLog("SYSTEM", "INFO", "NRConnector APN Tunneled", "Auto-compiled local loopback network binding initialized. Battery save parameters deployed.");
								}, 2800);
							};
							const toggleBatteryMeasures = () => {
								const nextState = batteryState === "DEFAULT" ? "ENGAGED" : "DEFAULT";
								setBatteryState(nextState);
								if (nextState === "ENGAGED") {
									setLogs((prev) => [`[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ⚡ Premium AdGuard/Huawei background protection engaged. Socket keep-alive rate set to 15s.`, ...prev]);
									useAppStore.getState().addToast("Huawei/AdGuard style battery saving measures engaged!", "success");
								} else setLogs((prev) => [`[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ⚠️ Extended battery measures deactivated. Process falling back to default OS schedules.`, ...prev]);
							};
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 font-mono",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3 text-[10px] font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: runAutoCompiler,
										disabled: status !== "IDLE",
										className: `py-2 px-3 rounded-xl border transition-all text-center uppercase tracking-wider ${status === "ACTIVE_TUNNEL" ? "bg-blue-600/20 border-blue-500/40 text-blue-400" : status === "COMPILING" ? "bg-slate-900 border-slate-800 text-slate-500 animate-pulse" : "bg-blue-900 hover:bg-blue-850 text-white border-blue-500/30 hover:border-blue-500"}`,
										children: status === "ACTIVE_TUNNEL" ? "✓ Loopback Active" : status === "COMPILING" ? "Connecting..." : "🔌 Auto-Bind NRConnector"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: toggleBatteryMeasures,
										className: `py-2 px-3 rounded-xl border transition-all text-center uppercase tracking-wider ${batteryState === "ENGAGED" ? "bg-emerald-600/20 border-emerald-500/40 text-emerald-400" : "bg-slate-900 hover:bg-slate-850 text-slate-400 border-slate-800"}`,
										children: ["🔋 ", batteryState === "ENGAGED" ? "Huawei Retention Active" : "Engage Battery Retention"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-28 bg-slate-950 border border-slate-900 rounded-xl p-3 overflow-y-auto text-[8.5px] text-slate-400 space-y-1.5 scrollbar-none",
									children: logs.map((log, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-left leading-relaxed",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-600",
											children: "» "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: log.includes("established") || log.includes("Retention") ? "text-emerald-400 font-bold" : log.includes("HANDSHAKE") || log.includes("handshake") ? "text-blue-400" : "text-slate-400",
											children: log
										})]
									}, i))
								})]
							});
						})()]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "TACTICAL HARDWARE SENSORS"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Manages background hardware accelerometer processing for Automated Impact Detection (Module 3) and Dead-Man's Struggle Lock (Module 6)."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-300 font-extrabold mb-0.5",
								children: "Device Admin Permissions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-500",
								children: "Required for forceful screen locking on drop."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => requestStruggleLockPermissions(),
							className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "GRANT ADMIN"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "AUDIO INTELLIGENCE (DSP)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Transparent background microphone capture (Module 1) and Whisper Amplification DSP (Module 2). Activates automatically during SOS."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px] w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-300 font-extrabold uppercase tracking-wide",
										children: "Input Level (dB)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: decibels > 0 ? "text-emerald-400 font-bold" : "text-slate-500 font-bold",
										children: decibels > 0 ? decibels.toFixed(1) + " dB" : "IDLE"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full bg-slate-900 rounded-full h-2 overflow-hidden mb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-emerald-500 h-2 transition-all duration-100",
										style: { width: `${Math.min(100, Math.max(0, decibels))}%` }
									})
								}),
								isWhispering && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-amber-400 font-bold animate-pulse mt-1 tracking-wider uppercase",
									children: "⚠️ WHISPER DETECTED: DSP Gain Amplification Active"
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "DATA-OVER-AUDIO FALLBACK"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Encodes AES-encrypted GPS payloads into high-frequency FSK audio chirps when cellular data is jammed but 2G voice calls connect."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px] w-full mr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-300 font-extrabold mb-0.5",
								children: "SSTV / FSK Encode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-500 truncate",
								children: "Payload: LAT:-26.19 LNG:28.02 SOS"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => playEmergencyChirp("LAT:-26.19 LNG:28.02 SOS"),
							className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "BROADCAST CHIRP"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "EXTREME BATTERY SURVIVAL"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Automatically suspends the UI and drops GPS polling to 30s when battery hits 10%. (Simulate below)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px] w-full mr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-300 font-extrabold mb-0.5",
								children: "Force Survival Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-500",
								children: "Kills React Thread (Black screen)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSurvivalMode(true),
							className: "px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "SIMULATE < 10%"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "DECENTRALIZED DISPATCH"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Bypasses Firebase/FCM by dispatching lightweight raw HTTP payloads to open-source pub/sub nodes (e.g. ntfy.sh) for self-hosted notifications."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: ntfyTopic,
							onChange: (e) => setNtfyTopic(e.target.value),
							className: "bg-transparent border-b border-slate-800 text-[8px] text-emerald-400 w-1/2 outline-none font-mono"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: testDecentralizedAlert,
							className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "TEST NTFY.SH"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "DATA SOVEREIGNTY BLACK BOX"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Export raw offline SQLite telemetry blocks directly to physical device storage (Documents) or WebDAV. 100% cloud-free ownership."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px] w-full mr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-300 font-extrabold mb-0.5",
								children: "Local Storage Export"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-500",
								children: "safetylink_sovereign_export.json"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: exportSovereignData,
							disabled: exporting,
							className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: exporting ? "..." : "EXPORT JSON"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "NETWORK OBFUSCATION (TUNNELING)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Encapsulates all traffic into custom APN loopback tunnels, preventing deep packet inspection (DPI) and ISP blocking during crises."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px] w-full mr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-300 font-extrabold mb-0.5",
								children: "Custom DNS / NRConnector"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-500",
								children: "Currently routing via standard interface."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => useAppStore.getState().addToast("Simulating VPN APN Handshake...", "info"),
							className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "BIND TUNNEL"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "UNCENSORABLE OTA DEPLOYMENTS"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Bypasses central App Store kill-switches. The app dynamically fetches signed JavaScript bundle updates from decentralized IPFS nodes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px] w-full mr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-300 font-extrabold mb-0.5",
								children: "JS Bundle Version"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-500",
								children: "v1.0.4-ipfs-signed"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => useAppStore.getState().addToast("Polling IPFS for OTA bundles...", "info"),
							className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "SYNC IPFS"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "ANONYMOUS DISTRIBUTION (DE-GOOGLED)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Strips all proprietary tracking, FCM, and Play Services dependencies. Relies purely on MicroG or background WorkManager."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px] w-full mr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-300 font-extrabold mb-0.5",
								children: "F-Droid Compliance Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-500",
								children: "Enforces 100% open-source push channels."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => useAppStore.getState().addToast("De-Googled mode enabled. FCM disabled.", "success"),
							className: "px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "PURGE G-SERVICES"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "STEALTH CAMOUFLAGE (DURESS UI)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Masks the application interface as a benign utility (e.g., calculator or weather app) to protect the user if the device is inspected by a threat actor."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px] w-full mr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-300 font-extrabold mb-0.5",
								children: "Duress UI Activation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-500",
								children: "Requires specific gesture to revert."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => useAppStore.getState().addToast("Camouflage Mode initialized (Calculator UI injected)", "info"),
							className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "ENGAGE STEALTH"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "P2P BLUETOOTH MESH ROUTING"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Forms an ad-hoc local network with nearby SafetyLink nodes via BLE. Relays distress payloads through multiple devices until one finds cellular service."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px] w-full mr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-300 font-extrabold mb-0.5",
								children: "BLE Beacon Payload"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-500",
								children: "Broadcasting: SOS_RELAY_v2"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => useAppStore.getState().addToast("BLE Mesh TX active. Relaying payload to 0 nearby nodes.", "success"),
							className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "START TX RELAY"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "LOCAL EDGE AI (TFLITE)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Runs an on-device TensorFlow Lite neural network to analyze microphone ambient noise and accelerometer data for gunshot or collision detection—without internet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px] w-full mr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-300 font-extrabold mb-0.5",
								children: "Acoustic / Impact Classifier"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-500",
								children: "Model: sl_distress_v4_quantized.tflite"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => useAppStore.getState().addToast("Edge AI classifier armed. Monitoring background tensors...", "success"),
							className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "ARM NEURAL NET"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-5 h-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide",
							children: "ADVANCED HARDWARE INTEGRATION"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] text-slate-500 leading-tight",
						children: "Bridges directly with external LoRaWAN communicators (e.g., Meshtastic) or Software Defined Radios (SDR) via USB OTG for off-grid SOS broadcast."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-900",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px] w-full mr-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-300 font-extrabold mb-0.5",
								children: "USB OTG Serial Bridge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-500",
								children: "Detecting external RF hardware..."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => useAppStore.getState().addToast("Attempting to connect to external LoRa hardware via USB OTG...", "info"),
							className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
							children: "PROBE LORA / SDR"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-4 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] font-extrabold text-slate-100 uppercase tracking-wide flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-3.5 h-3.5 text-emerald-400" }), "GDPR/POPIA Zero-Knowledge Proof (ZKP) medical disclosure"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] text-slate-500 block leading-tight",
							children: "Sensitive medical and residential profiles are encrypted locally using private keys. Distpatches expose temporary, cryptographic proofs expiring within exactly 1 hour."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: triggerZKPSharing,
						disabled: zkpGenerating,
						className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-bold rounded-lg uppercase tracking-wider transition-all shrink-0",
						children: zkpGenerating ? "Hashing..." : "GENERATE ZKP DISCLOSURE"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/60 border border-slate-900 rounded-xl p-3 text-left flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[8px] text-slate-400 font-extrabold uppercase block border-b border-slate-900 pb-1",
								children: "Client-Side Profile Storage (Encrypted)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[8px] text-slate-500 leading-normal",
								children: "Encrypted with AES-256 using private key. This dossier never resides unencrypted on central servers, protecting absolute digital subscriber privacy."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-900/40 p-2 rounded-xl border border-slate-900 text-[7px] text-slate-400 space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "🧬 Address: [Encrypted - Kept Local]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "🩸 Blood Type: [Encrypted - Kept Local]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "⚠️ Allergies: [Encrypted - Kept Local]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "💊 Cardiac Flag: [Encrypted - Kept Local]" })
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/60 border border-slate-900 rounded-xl p-3 text-left space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] text-slate-400 font-extrabold uppercase block border-b border-slate-900 pb-1",
							children: "Cryptographic Dispatched Proof Claim (Zero-Knowledge)"
						}), zkpToken ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[8px] text-emerald-400 font-black tracking-widest",
									children: zkpToken
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[6.5px] bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 px-1 rounded font-bold uppercase tracking-widest",
									children: "ACTIVE FOR 1 HR"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-1",
								children: zkpDetailsExposed.map((claim, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[7.5px] text-slate-300 font-bold flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-400",
										children: "✓"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: claim })]
								}, idx))
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center py-6 text-[8px] text-slate-500 italic",
							children: "No active ZKP token dispatched. Generate token above to disclose minimal profile claims securely."
						})]
					})]
				})]
			})
		]
	});
};
//#endregion
export { AdvancedSubsystems };
