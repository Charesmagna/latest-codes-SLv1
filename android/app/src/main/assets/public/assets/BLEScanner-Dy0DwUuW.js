import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { Ct as Camera, _ as Sparkles, i as X, kt as require_react, p as Truck } from "./icons-B-I2x5TV.js";
import { b as motion, w as require_jsx_runtime, x as AnimatePresence } from "./vendor-DZX22qT5.js";
import { _ as Capacitor, l as BarcodeFormat, s as BarcodeScanner } from "./capacitor-B_jS8XWy.js";
import { i as useAppStore } from "./store-CoihKo_w.js";
import { c as PepxiOrderModal } from "./index-CRyeGhgM.js";
import { ITagPluginService } from "./ITagPluginService-Bw1X7OEl.js";
//#region src/components/DeviceScanner.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var DeviceScanner = ({ onScanComplete, onCancel }) => {
	const [isScanning, setIsScanning] = (0, import_react.useState)(false);
	const [hasPermission, setHasPermission] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const checkPermissions = async () => {
			if (Capacitor.isNativePlatform()) try {
				if ((await BarcodeScanner.checkPermissions()).camera !== "granted") {
					const request = await BarcodeScanner.requestPermissions();
					setHasPermission(request.camera === "granted");
				} else setHasPermission(true);
			} catch (e) {
				console.error("Camera permissions check failed", e);
			}
			else {
				console.log("Not native, simulating permission");
				setHasPermission(true);
			}
		};
		checkPermissions();
		return () => {
			stopScan();
		};
	}, []);
	const startScan = async () => {
		if (!hasPermission) {
			alert("Camera permission denied.");
			return;
		}
		if (!Capacitor.isNativePlatform()) {
			const mockUid = `MOCK-DEVICE-${Math.floor(Math.random() * 1e4)}`;
			alert(`Web Simulation: Scanned ${mockUid}`);
			onScanComplete(mockUid);
			return;
		}
		setIsScanning(true);
		document.body.classList.add("barcode-scanner-active");
		try {
			const { barcodes } = await BarcodeScanner.scan({ formats: [BarcodeFormat.QrCode, BarcodeFormat.Code128] });
			if (barcodes.length > 0) onScanComplete(barcodes[0].rawValue);
		} catch (error) {
			console.error("Scanning failed", error);
		} finally {
			stopScan();
		}
	};
	const stopScan = () => {
		setIsScanning(false);
		document.body.classList.remove("barcode-scanner-active");
		if (Capacitor.isNativePlatform()) BarcodeScanner.removeAllListeners();
	};
	if (isScanning) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[9999] bg-black/40 flex flex-col justify-center items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[250px] h-[250px] border-4 border-emerald-500 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.5)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => {
				stopScan();
				onCancel();
			},
			className: "mt-10 px-8 py-3 bg-red-500 text-white font-bold rounded-xl flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" }), " Cancel Scan"]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-3 bg-emerald-500/20 rounded-full mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-6 h-6 text-emerald-400" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-slate-200 font-bold mb-1",
				children: "Scan Hardware QR"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] text-slate-500 mb-4 px-4",
				children: "Scan the QR code printed on your camera box, smart lock, or beacon."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: startScan,
				className: "w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold font-mono text-[11px] tracking-wider uppercase transition-colors",
				children: "Open Scanner"
			})
		]
	});
};
//#endregion
//#region src/components/BLEScanner.tsx
var BLEScanner = () => {
	const { bleDevices, discoveredDevices, isScanning, pairingProgress, startBleScan, disconnectBleDevice, connectBleDevice, removeDevice, registerDiscoveredDevice, demoMode, isBackgroundServiceRunning } = useAppStore();
	const [nativePluginInitialized, setNativePluginInitialized] = import_react.useState(false);
	const [nativeScanning, setNativeScanning] = import_react.useState(false);
	const [nativeDevices, setNativeDevices] = import_react.useState([]);
	const [nativeConnectedMap, setNativeConnectedMap] = import_react.useState({});
	const [locationWarning, setLocationWarning] = import_react.useState(false);
	const [showManualPair, setShowManualPair] = import_react.useState(false);
	const [manualMacAddress, setManualMacAddress] = import_react.useState("");
	const [manualFriendlyName, setManualFriendlyName] = import_react.useState("");
	const [manualDeviceType, setManualDeviceType] = import_react.useState("GENERIC_BLE_BUTTON");
	const [manualFormError, setManualFormError] = import_react.useState("");
	const [isDeviceScannerOpen, setIsDeviceScannerOpen] = import_react.useState(false);
	const [showUpgradeGate, setShowUpgradeGate] = import_react.useState(false);
	const [showPepxiModal, setShowPepxiModal] = import_react.useState(false);
	const { currentUser } = useAppStore();
	const isTrial = currentUser?.subscriptionStatus === "trial";
	const trialDaysRemaining = import_react.useMemo(() => {
		if (!isTrial) return 0;
		const startTime = currentUser?.trialStartedAt || currentUser?.createdAt || Date.now();
		const elapsedMs = Date.now() - startTime;
		return Math.max(1, Math.ceil((12096e5 - elapsedMs) / 864e5));
	}, [currentUser, isTrial]);
	const handleStartFreeTrial = () => {
		if (currentUser) {
			const updatedUser = {
				...currentUser,
				subscriptionStatus: "trial",
				trialStartedAt: Date.now()
			};
			useAppStore.getState().updateUserProfile(currentUser.id, updatedUser);
		}
		setShowUpgradeGate(false);
		useAppStore.getState().addToast("14-Day Free iTAG Trial Activated! Pairing unlocked.", "success");
		useAppStore.getState().addAuditLog("BLE", "INFO", "14-Day iTAG Trial Activated", "Hardware panic button pairing enabled for 14-day trial period.");
		startBleScan();
	};
	const [editingMac, setEditingMac] = import_react.useState(null);
	const [editingName, setEditingName] = import_react.useState("");
	import_react.useEffect(() => {
		const autoInit = async () => {
			try {
				const granted = await ITagPluginService.init();
				setNativePluginInitialized(granted);
				if (granted) useAppStore.getState().addAuditLog("BLE", "INFO", "Native ITagPlugin Auto-Init", "Permissions automatically verified on mount.");
			} catch (e) {
				console.warn("Auto init failed:", e);
			}
		};
		autoInit();
	}, []);
	const handleBluetoothPairingRequest = (action) => {
		if (currentUser?.subscriptionStatus !== "active" && currentUser?.subscriptionStatus !== "trial") setShowUpgradeGate(true);
		else if (action === "scan") startBleScan();
		else {
			setShowManualPair(!showManualPair);
			setManualFormError("");
		}
	};
	const handleInitNativePlugin = async () => {
		const granted = await ITagPluginService.init();
		setNativePluginInitialized(granted);
		if (granted) useAppStore.getState().addAuditLog("BLE", "INFO", "Native ITagPlugin Init Success", "Bluetooth permissions acquired successfully.");
		else useAppStore.getState().addAuditLog("BLE", "SEVERE", "Native ITagPlugin Init Failed", "Permissions denied.");
		return granted;
	};
	const handleStartNativeScan = async () => {
		if (currentUser?.subscriptionStatus !== "active" && currentUser?.subscriptionStatus !== "trial") {
			setShowUpgradeGate(true);
			return;
		}
		setLocationWarning(false);
		let initialized = nativePluginInitialized;
		if (!initialized) {
			initialized = await handleInitNativePlugin();
			if (!initialized) return;
		}
		setNativeScanning(true);
		setNativeDevices([]);
		useAppStore.getState().addAuditLog("BLE", "INFO", "Native iTAG Plugin Scan Started", "Scanning for BLE devices via custom plugin...");
		try {
			await ITagPluginService.startScanning((device) => {
				setNativeDevices((prev) => {
					if (prev.some((d) => d.address === device.address)) return prev;
					return [...prev, device];
				});
			}, (warning) => {
				if (warning === "LOCATION_SERVICES_DISABLED") {
					setLocationWarning(true);
					useAppStore.getState().addAuditLog("BLE", "WARN", "GPS Disabled", "Location services must be enabled in device settings for BLE results.");
				}
			});
			setTimeout(() => {
				handleStopNativeScan();
			}, 15e3);
		} catch (err) {
			setNativeScanning(false);
			useAppStore.getState().addAuditLog("BLE", "SEVERE", "Native Scan Error", err.message || "Error occurred");
		}
	};
	const handleStopNativeScan = async () => {
		await ITagPluginService.stopScanning();
		setNativeScanning(false);
		useAppStore.getState().addAuditLog("BLE", "INFO", "Native iTAG Plugin Scan Stopped", "Scanning complete.");
	};
	const handleConnectNativeDevice = async (address) => {
		setNativeConnectedMap((prev) => ({
			...prev,
			[address]: "connecting"
		}));
		useAppStore.getState().addAuditLog("BLE", "INFO", "Native GATT Connecting", `Address: ${address}`);
		if (await ITagPluginService.connectDevice(address, (status) => {
			setNativeConnectedMap((prev) => ({
				...prev,
				[address]: status
			}));
			useAppStore.getState().addAuditLog("BLE", status === "connected" ? "INFO" : "SEVERE", `Native Device ${status === "connected" ? "Connected" : "Disconnected"}`, `MAC: ${address}`);
			if (status === "connected") {
				if (!useAppStore.getState().bleDevices.find((d) => d.macAddress === address)) useAppStore.getState().registerDiscoveredDevice(address, "Native iTAG Keyfob");
				useAppStore.setState((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === address ? {
					...d,
					connectionState: "CONNECTED",
					rssi: -50
				} : d) }));
			} else useAppStore.setState((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === address ? {
				...d,
				connectionState: "DISCONNECTED",
				rssi: -100
			} : d) }));
		}, (val) => {
			useAppStore.getState().addAuditLog("BLE", "SEVERE", "NATIVE PHYSICAL BUTTON PRESS", `Signal byte 0x${val.toString(16)} received from ${address} (Click Code: ${val})`);
			if (navigator.vibrate) try {
				navigator.vibrate(120);
			} catch (e) {}
		}, (battery) => {
			useAppStore.setState((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === address ? {
				...d,
				batteryLevel: battery
			} : d) }));
			setNativeDevices((prev) => prev.map((d) => d.address === address ? {
				...d,
				batteryLevel: battery
			} : d));
			useAppStore.getState().addAuditLog("BLE", "INFO", "Battery Level Update", `Device ${address} reported battery level: ${battery}%`);
		}, (rssi) => {
			useAppStore.setState((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === address ? {
				...d,
				rssi
			} : d) }));
			setNativeDevices((prev) => prev.map((d) => d.address === address ? {
				...d,
				rssi
			} : d));
		})) setNativeConnectedMap((prev) => ({
			...prev,
			[address]: "connected"
		}));
		else setNativeConnectedMap((prev) => ({
			...prev,
			[address]: "disconnected"
		}));
	};
	const handleDisconnectNativeDevice = async (address) => {
		await ITagPluginService.disconnectDevice(address);
		setNativeConnectedMap((prev) => ({
			...prev,
			[address]: "disconnected"
		}));
		useAppStore.setState((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === address ? {
			...d,
			connectionState: "DISCONNECTED",
			rssi: -100
		} : d) }));
	};
	const handleRingNativeDevice = async (address) => {
		if (await ITagPluginService.ringDevice(address, 2)) useAppStore.getState().addAuditLog("BLE", "INFO", "Triggered iTAG Alarm Siren", `Beep sent to ${address}`);
		else useAppStore.getState().addAuditLog("BLE", "WARN", "Siren Trigger Failed", `Failed to send beep to ${address}`);
	};
	const handleManualPairSubmit = (e) => {
		e.preventDefault();
		setManualFormError("");
		if (!manualMacAddress.trim()) {
			setManualFormError("Bluetooth MAC Address or Device ID is required.");
			return;
		}
		const formattedMac = manualMacAddress.trim().toUpperCase();
		if (bleDevices.some((d) => d.macAddress.toUpperCase() === formattedMac)) {
			setManualFormError("This device is already paired.");
			return;
		}
		if (bleDevices.length >= 5) {
			setManualFormError("Maximum limit of 5 paired buttons reached.");
			return;
		}
		registerDiscoveredDevice(formattedMac, manualFriendlyName.trim() || "Manual Panic Button", manualDeviceType);
		useAppStore.getState().addAuditLog("BLE", "INFO", "Manual Button ID Paired", `MAC: ${formattedMac}, Nickname: ${manualFriendlyName || "Manual Panic Button"}`);
		setManualMacAddress("");
		setManualFriendlyName("");
		setManualDeviceType("GENERIC_BLE_BUTTON");
		setShowManualPair(false);
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 neon-glow-emerald" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 digital-grid opacity-10 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 w-full mb-3 flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[14px]",
						children: "🔄"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-left font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[9px] font-bold text-slate-200",
							children: "OS KEEPALIVE SERVICE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[7.5px] text-slate-500",
							children: "BleReconnectWorker"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `px-2 py-0.5 border rounded flex items-center gap-1.5 ${isBackgroundServiceRunning ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-1.5 h-1.5 rounded-full ${isBackgroundServiceRunning ? "bg-emerald-400 animate-pulse" : "bg-red-500"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[7.5px] font-bold uppercase tracking-wider",
						children: isBackgroundServiceRunning ? "ACTIVE" : "STOPPED"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 w-full mb-3 bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/25 rounded-2xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider",
							children: currentUser?.subscriptionStatus === "active" ? "PREMIUM HARDWARE LINK ACTIVE" : isTrial ? `FREE 14-DAY iTAG TRIAL (${trialDaysRemaining} DAYS REMAINING)` : "FREE TO USE · 14-DAY iTAG TRIAL AVAILABLE"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8.5px] font-mono text-slate-400 mt-0.5",
						children: "SafetyLink is 100% free forever · Pair physical iTAGs with 14-day trial"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setShowPepxiModal(true),
					className: "shrink-0 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[8.5px] font-mono font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "w-3 h-3 text-amber-400" }), "Order Tag via Pepxi (R100)"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center border-b border-slate-900 pb-3.5 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-black text-slate-100 tracking-[0.2em] font-display uppercase",
						children: "BLE Personal Panic Nodes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] font-mono text-slate-500 mt-0.5",
						children: [
							"Wearable beacon devices · ",
							bleDevices.length,
							"/5 bonded"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => handleBluetoothPairingRequest("manual"),
						className: `px-3 py-1.5 text-[9px] font-mono font-bold rounded-full border transition-all uppercase ${showManualPair ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-slate-900 border-slate-850 hover:bg-slate-800 text-slate-300"}`,
						children: showManualPair ? "CANCEL" : "+ PAIR ID"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => handleBluetoothPairingRequest("scan"),
						disabled: isScanning,
						className: `px-3.5 py-1.5 text-[9px] font-mono font-bold rounded-full border transition-all uppercase ${isScanning ? "bg-slate-950 text-slate-600 border-slate-900 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 border-emerald-500/20 text-white shadow-lg shadow-emerald-950/40"}`,
						children: isScanning ? "SCANNING..." : "SCAN MESH"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showManualPair && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
				onSubmit: handleManualPairSubmit,
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
				className: "p-3.5 bg-slate-950/90 border border-slate-800 rounded-2xl space-y-3 font-mono text-[10px] text-left mt-3.5 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] font-black text-emerald-400 uppercase tracking-wider block",
						children: "✍️ PAIR HARDWARE BUTTON BY ID"
					}),
					manualFormError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "p-2 bg-red-950/30 border border-red-500/20 text-red-400 rounded-lg text-[9px] leading-snug",
						children: ["⚠️ ", manualFormError]
					}),
					isDeviceScannerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceScanner, {
							onScanComplete: (uid) => {
								setManualMacAddress(uid);
								setIsDeviceScannerOpen(false);
							},
							onCancel: () => setIsDeviceScannerOpen(false)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[8px] text-slate-500 uppercase font-bold",
										children: "Hardware Bluetooth MAC / ID Address"
									}), !isDeviceScannerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setIsDeviceScannerOpen(true),
										className: "text-[8px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-md hover:bg-emerald-900 transition-colors",
										children: "📷 SCAN QR"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: manualMacAddress,
									onChange: (e) => setManualMacAddress(e.target.value),
									placeholder: "e.g. AA:BB:CC:DD:EE:FF or FFE0-iTAG-1",
									className: "bg-slate-900 border border-slate-850 rounded-xl p-2 text-[10px] text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-all font-mono"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[8px] text-slate-500 uppercase font-bold mb-1",
									children: "Friendly Nickname / Device Owner"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: manualFriendlyName,
									onChange: (e) => setManualFriendlyName(e.target.value),
									placeholder: "e.g. Grandma's Necklace, Duty Officer Keyfob",
									className: "bg-slate-900 border border-slate-850 rounded-xl p-2 text-[10px] text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-all font-mono"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[8px] text-slate-500 uppercase font-bold mb-1",
									children: "Device / Beacon Chipset Profile"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: manualDeviceType,
									onChange: (e) => setManualDeviceType(e.target.value),
									className: "bg-slate-900 border border-slate-850 rounded-xl p-2 text-[10px] text-slate-100 focus:outline-none focus:border-emerald-500 transition-all font-mono",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "GENERIC_BLE_BUTTON",
											children: "Generic BLE Smart Button"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "iTAG",
											children: "iTAG Anti-Loss Wearable (FFE0/FFE1 GATT)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "RFD_Beacon",
											children: "RFD Long-Range Safety Beacon"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "WATCH",
											children: "Smart Watch"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "CCTV",
											children: "CCTV Camera / DVR"
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[9px] uppercase rounded-xl transition-all",
						children: "SAVE & REGISTER NODE"
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-3.5 bg-emerald-950/5 border border-emerald-500/20 rounded-2xl space-y-3 mt-4 relative z-10 text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-bold text-emerald-400 font-display uppercase tracking-wider",
							children: "Native iTAG Plugin Bridge"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[9px] text-slate-400 font-mono mt-0.5 leading-normal",
							children: "Direct connection to hardware via native stack"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `px-1.5 py-0.5 text-[7px] font-mono font-bold rounded ${nativePluginInitialized ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-900 text-slate-500 border border-slate-800"}`,
							children: nativePluginInitialized ? "ACTIVE" : "INACTIVE"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: nativeScanning ? handleStopNativeScan : handleStartNativeScan,
							className: `col-span-2 py-1.5 text-[9px] font-mono font-bold rounded-xl border transition-all text-center ${nativeScanning ? "bg-red-950/30 border-red-500/30 text-red-300 hover:bg-red-900/40" : "bg-teal-600/20 border-teal-500/30 text-teal-300 hover:bg-teal-600"}`,
							children: nativeScanning ? "STOP SCANNING" : "SCAN NATIVE iTAGS"
						})
					}),
					locationWarning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-2.5 bg-amber-950/20 border border-amber-500/20 text-amber-400 rounded-xl text-[9px] font-mono leading-normal",
						children: [
							"⚠️ ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "GPS/Location turned off" }),
							": Android requires Location services (GPS) to be active in your system settings to receive BLE scan results. Please enable GPS and try again!"
						]
					}),
					nativeDevices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 mt-2 pt-2 border-t border-slate-900/60 font-mono text-[9px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[8px] font-bold text-slate-500 tracking-wider",
							children: [
								"FOUND DEVICES (",
								nativeDevices.length,
								")"
							]
						}), nativeDevices.map((d) => {
							const status = nativeConnectedMap[d.address] || "disconnected";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center p-2 bg-slate-950/50 border border-slate-900/60 rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold text-slate-200",
										children: d.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[8px] text-slate-500",
										children: [
											d.address,
											" · ",
											d.rssi,
											" dBm"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1.5",
									children: status === "connected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleRingNativeDevice(d.address),
										className: "px-2 py-1 rounded bg-amber-600/20 border border-amber-500/20 text-amber-400 font-bold hover:bg-amber-600 hover:text-white transition-all text-[8px]",
										children: "BEEP TAG"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleDisconnectNativeDevice(d.address),
										className: "px-2 py-1 rounded bg-red-900/20 border border-red-500/20 text-red-400 font-bold hover:bg-red-600 hover:text-white transition-all text-[8px]",
										children: "CLOSE"
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleConnectNativeDevice(d.address),
										disabled: status === "connecting",
										className: "px-2.5 py-1 rounded bg-emerald-600/20 border border-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-600 hover:text-white transition-all text-[8px]",
										children: status === "connecting" ? "PAIRING..." : "CONNECT"
									})
								})]
							}, d.address);
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showUpgradeGate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm",
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
					className: "bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl max-w-sm w-full relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-6 h-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowUpgradeGate(false),
								className: "text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800",
								children: "✕"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-block bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2",
							children: "14-Day Free Trial"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold text-white mb-1.5",
							children: "Pair Physical Panic Buttons"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-300 mb-4 leading-relaxed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SafetyLink is 100% free to use." }),
								" When you pair an iTAG or wearable beacon to trigger silent distress alerts from your pocket, you receive a complimentary ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "14-day free trial" }),
								". Zero credit card required upfront."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-slate-950 rounded-2xl p-3.5 mb-5 border border-slate-800 text-left",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-2 text-xs text-slate-300",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-400 font-bold",
											children: "✓"
										}), " SafetyLink digital SOS & dispatch is 100% free forever"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-400 font-bold",
											children: "✓"
										}), " 14-day free hardware trial to pair any iTAG keyfob"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-400 font-bold",
											children: "✓"
										}), " Silent pocket triggering with screen locked & app backgrounded"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-emerald-400 font-bold",
											children: "✓"
										}), " Connect up to 5 physical iTAG buttons"]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleStartFreeTrial,
									className: "w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4" }), " Start Free 14-Day iTAG Trial"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setShowUpgradeGate(false);
										setShowPepxiModal(true);
									},
									className: "w-full py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs transition-all flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "w-4 h-4 text-amber-400" }), " Order Tag via Pepxi (R100 Nationwide)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setShowUpgradeGate(false),
									className: "w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold text-xs transition-all",
									children: "Continue with Free Digital SOS"
								})
							]
						})
					]
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: pairingProgress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
				className: "p-3.5 bg-slate-950/80 border border-emerald-500/20 rounded-2xl space-y-2 font-mono text-[10px] text-left mt-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-emerald-400 font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PAIRING SEQUENCER" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "animate-pulse",
							children: "ACTIVE"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-400",
						children: pairingProgress
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full h-1 bg-slate-900 rounded-full overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full bg-emerald-500 animate-pulse w-2/3" })
					})
				]
			}) }),
			discoveredDevices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 text-left mt-4 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[8px] font-bold text-slate-500 uppercase tracking-widest block font-mono",
					children: [
						"DISCOVERED NEARBY (",
						discoveredDevices.length,
						")"
					]
				}), discoveredDevices.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-3 bg-slate-950/40 border border-slate-900 rounded-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-slate-100",
						children: d.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[9px] font-mono text-slate-500",
						children: [
							d.deviceId,
							" · 📶 ",
							d.rssi,
							" dBm"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => registerDiscoveredDevice(d.deviceId, d.name),
						disabled: bleDevices.length >= 5,
						className: "px-3 py-1.5 text-[9px] font-mono font-bold rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/20 transition-all",
						children: bleDevices.length >= 5 ? "LIMIT" : "ADD BUTTON"
					})]
				}, d.deviceId))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 text-left mt-4 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[8px] font-bold text-slate-500 uppercase tracking-widest block font-mono",
					children: [
						"BONDED PANEL NODES (",
						bleDevices.length,
						"/5)"
					]
				}), bleDevices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 text-center border border-dashed border-slate-800/80 rounded-2xl bg-slate-950/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl block mb-1",
							children: "🔑"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-mono text-slate-500",
							children: "No physical buttons bonded yet."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[9px] font-mono text-slate-600 mt-1 leading-relaxed",
							children: "Use SCAN MESH or SCAN NATIVE to search nearby peripherals, or click + PAIR ID to bind a hardware serial address directly."
						})
					]
				}) : bleDevices.map((device) => {
					const isConnected = device.connectionState === "CONNECTED";
					const isConnecting = device.connectionState === "CONNECTING";
					const rssi = device.rssi;
					let signalBars = 0;
					let signalLabel = "No Link";
					let signalColor = "text-slate-500";
					if (isConnected) {
						if (rssi > -60) {
							signalBars = 4;
							signalLabel = "Excellent";
							signalColor = "text-emerald-400";
						} else if (rssi > -75) {
							signalBars = 3;
							signalLabel = "Good";
							signalColor = "text-teal-400";
						} else if (rssi > -90) {
							signalBars = 2;
							signalLabel = "Fair";
							signalColor = "text-amber-400";
						} else {
							signalBars = 1;
							signalLabel = "Weak";
							signalColor = "text-red-400";
						}
					}
					const isEditingThis = editingMac === device.macAddress;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 bg-slate-950/20 rounded-2xl border border-slate-900/80 space-y-3.5 transition-all hover:border-slate-800/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 flex-1 pr-2",
									children: [isEditingThis ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: editingName,
												onChange: (e) => setEditingName(e.target.value),
												className: "bg-slate-950 border border-slate-900 rounded-lg px-2.5 py-1 text-[10.5px] text-slate-100 focus:outline-none focus:border-emerald-500/50 font-mono w-32"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													useAppStore.getState().renameBleDevice(device.macAddress, editingName.trim());
													setEditingMac(null);
													useAppStore.getState().addToast("iTAG device renamed successfully!", "success");
												},
												className: "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-bold px-2 py-1 rounded-lg text-[8.5px] border border-emerald-500/20 uppercase cursor-pointer",
												children: "SAVE"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setEditingMac(null),
												className: "bg-slate-900 hover:bg-slate-800 text-slate-400 px-2 py-1 rounded-lg text-[8.5px] uppercase cursor-pointer",
												children: "Cancel"
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-xs font-extrabold text-slate-100 font-display flex items-center gap-1.5 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: device.friendlyName }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													setEditingMac(device.macAddress);
													setEditingName(device.friendlyName);
												},
												className: "text-[9px] text-slate-500 hover:text-purple-400 cursor-pointer",
												title: "Rename Device",
												children: "✏️"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[7px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide",
												children: device.deviceType
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] font-mono text-slate-500",
										children: device.macAddress
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `w-1.5 h-1.5 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse neon-glow-emerald" : isConnecting ? "bg-amber-400 animate-pulse" : "bg-red-500"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[9px] font-mono font-bold ${isConnected ? "text-emerald-400" : isConnecting ? "text-amber-400" : "text-slate-500"}`,
										children: device.connectionState
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2 bg-slate-950/60 p-2.5 rounded-xl text-center font-mono text-[9px] border border-slate-900",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-r border-slate-900/80 flex flex-col items-center justify-center py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-500 block text-[8px] uppercase tracking-wider mb-1",
										children: "Battery Level"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `font-bold text-[11px] flex items-center gap-1 ${device.batteryLevel < 20 ? "text-red-500 animate-pulse" : "text-slate-300"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔋" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isConnected ? `${device.batteryLevel}%` : "--" })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center justify-center py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-500 block text-[8px] uppercase tracking-wider mb-1",
										children: "Signal Strength"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-end gap-[2px] h-3.5",
											children: [
												1,
												2,
												3,
												4
											].map((bar) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `w-[3px] rounded-full transition-all ${bar <= signalBars ? isConnected ? rssi > -60 ? "bg-emerald-400" : rssi > -75 ? "bg-teal-400" : rssi > -90 ? "bg-amber-400" : "bg-red-400" : "bg-slate-700" : "bg-slate-800"}`,
												style: { height: `${bar * 25}%` }
											}, bar))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `font-bold text-[11px] ${signalColor}`,
											children: isConnected ? `${rssi} dBm (${signalLabel})` : "--"
										})]
									})]
								})]
							}),
							demoMode && isConnected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-950/40 p-2 rounded-xl border border-slate-900 flex items-center justify-between gap-1.5 text-[8.5px] font-mono mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-500 font-bold uppercase tracking-wider",
									children: "Simulate Click:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										const store = useAppStore.getState();
										store.addAuditLog("BLE", "SEVERE", "iTAG Simulated Press", `Simulated physical button press for ${device.macAddress}`);
										store.startMultiStagePanic("SOS triggered via simulated iTAG button", 10);
										useAppStore.getState().addToast("Simulated press: 10s countdown initiated.", "warn");
									},
									className: "px-3 py-1 bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-900/30 rounded font-bold uppercase tracking-wide cursor-pointer",
									children: "Simulate Press"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center text-[9px] pt-1 border-t border-slate-900/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => isConnected ? disconnectBleDevice(device.macAddress) : connectBleDevice(device.macAddress),
									className: "text-slate-400 hover:text-slate-200 font-bold transition-colors uppercase font-mono",
									children: isConnected ? "DISCONNECT LINK" : "ESTABLISH LINK"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => removeDevice(device.macAddress),
									className: "text-red-500/80 hover:text-red-500 font-bold transition-colors uppercase font-mono",
									children: "UNPAIR / FORGET"
								})]
							})
						]
					}, device.macAddress);
				})]
			}),
			demoMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 p-4 bg-slate-950/60 border border-slate-900 rounded-2xl text-left font-mono relative z-10 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px]",
								children: "🔑"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-black text-slate-100 uppercase tracking-wider",
								children: "Status Bar 'Key' Icon & Awake Protocols"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[7.5px] font-mono bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded uppercase font-bold",
							children: "OS KEEPALIVE"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-900/80 border border-slate-850 p-2 rounded-xl flex items-center justify-between font-mono text-[8.5px] text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "05:31 PM" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-600",
									children: "|"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-1 py-0.5 rounded text-[7px] font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔑" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SAFETYLINK VPN ACTIVE" })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-shrink-0 flex items-center gap-1.5 text-[8px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📶 LTE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🔋 98%" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[9px] text-slate-400 leading-relaxed space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Why does Active Connection show a Key Icon?" }),
							" When you activate the Active Connection background persistence service, Android can establish a local loopback VPN configuration. This creates a secure, sandbox tunnel to monitor the BLE stack and displays the native ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "System Key Icon" }),
							" in your status bar."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "What we do for iTag Clicks:" }),
							" To prevent Android or iOS from putting the Bluetooth stack to sleep when you press the home button, SafetyLink boots a standard ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Persistent Foreground Service" }),
							". In native builds, this binds to a local loopback protocol (similar to the VPN system) or a pinned system tray notification. This acts as a constant handshake keep-alive, forcing the phone’s CPU to remain awake to catch your iTag clicks immediately."
						] })]
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PepxiOrderModal, {
				isOpen: showPepxiModal,
				onClose: () => setShowPepxiModal(false),
				onStartTrial: handleStartFreeTrial
			})
		]
	});
};
//#endregion
export { BLEScanner };
