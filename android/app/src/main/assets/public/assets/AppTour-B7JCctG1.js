import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { kt as require_react } from "./icons-B-I2x5TV.js";
import { b as motion, w as require_jsx_runtime, x as AnimatePresence } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-CoihKo_w.js";
import { i as SafetyLinkLogo } from "./index-CRyeGhgM.js";
//#region src/components/AppTour.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AppTour = ({ onClose }) => {
	const [currentStep, setCurrentStep] = (0, import_react.useState)(0);
	const [neverShowAgain, setNeverShowAgain] = (0, import_react.useState)(false);
	const { drillMode, toggleDrillMode, contacts, updateContact, addToast, registerDiscoveredDevice } = useAppStore();
	const [primaryPhone, setPrimaryPhone] = (0, import_react.useState)("");
	const [botAnswer, setBotAnswer] = (0, import_react.useState)(null);
	const [botLoading, setBotLoading] = (0, import_react.useState)(false);
	const [fobsDiscovered, setFobsDiscovered] = (0, import_react.useState)(false);
	const [fobPaired, setFobPaired] = (0, import_react.useState)(false);
	const [countdownDelay, setCountdownDelay] = (0, import_react.useState)(10);
	(0, import_react.useEffect)(() => {
		const primaryContact = contacts.find((c) => c.id === "1");
		if (primaryContact) setPrimaryPhone(primaryContact.phone);
	}, [contacts]);
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("sl_widget_countdown_delay");
		if (saved) setCountdownDelay(parseInt(saved, 10));
	}, []);
	const handlePhoneChange = (newVal) => {
		setPrimaryPhone(newVal);
		updateContact("1", { phone: newVal });
	};
	const handleCountdownSelect = (sec) => {
		setCountdownDelay(sec);
		localStorage.setItem("sl_widget_countdown_delay", sec.toString());
		addToast(`SOS countdown set to ${sec}s for widgets`, "success");
	};
	const handlePairFobSim = () => {
		setFobPaired(true);
		registerDiscoveredDevice("00:1A:7D:DA:71:11", "iTAG Distress Fob (Tour Demo)", "iTAG");
		addToast("Simulated BLE Keyfob successfully paired!", "success");
	};
	const handleBotQuery = (queryType) => {
		setBotLoading(true);
		setBotAnswer(null);
		setTimeout(() => {
			setBotLoading(false);
			if (queryType === "STATUS") setBotAnswer("🤖 K'leva: SafetyLink is operating securely in " + (drillMode ? "DRILL SIMULATION" : "LIVE SATELLITE DISPATCH") + " mode. Location is locked.");
			else if (queryType === "GPS") setBotAnswer("🤖 K'leva: Your current coordinates translate to Wits Campus Sector, Johannesburg. Cellular mast signal is optimal.");
			else if (queryType === "DISARM") setBotAnswer("🤖 K'leva: To disarm a running SOS panic sequence, double-tap the main red trigger button or click 'CANCEL BROADCAST' in the dashboard.");
		}, 1200);
	};
	const steps = [
		{
			emoji: "🛡️",
			badge: "Step 1: Network Configuration",
			title: "Active Operating Mode",
			description: "Choose your desired operating profile. In Drill Mode, emergency dispatch is fully simulated safely. Live Mode connects to physical cellular gateways."
		},
		{
			emoji: "📞",
			badge: "Step 2: Emergency Routing",
			title: "Configure Main Dispatch Channel",
			description: "Your primary sequential dispatcher is enqueued first. Ensure your distress contact phone is valid for direct voice/SMS dispatch routing."
		},
		{
			emoji: "🤖",
			badge: "Step 3: AI Assistant Sandbox",
			title: "Interactive K'leva.info Bot",
			description: "Experience South Africa’s local safety copilot. Test a fast query to see how immediate situational advice is delivered in distressing situations."
		},
		{
			emoji: "📡",
			badge: "Step 4: Wearable Setup",
			title: "Register BLE Hardware Keyfob",
			description: "Scan and bind inexpensive physical Bluetooth alert keyfobs. Our customized background GATT scanner reads signal presses instantly."
		},
		{
			emoji: "📲",
			badge: "Step 5: Android Ergonomics",
			title: "Launcher Widget Countdown",
			description: "SafetyLink provides high-impact Android widgets with dynamic safety windows. Configure your desired visual countdown delay below."
		}
	];
	const handleNext = () => {
		if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
		else onClose(neverShowAgain);
	};
	const handlePrev = () => {
		if (currentStep > 0) setCurrentStep(currentStep - 1);
	};
	const step = steps[currentStep];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[99999] flex items-center justify-center p-4 overflow-y-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .93,
				y: 15
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .93,
				y: 15
			},
			transition: {
				duration: .35,
				ease: "easeOut"
			},
			className: "w-full max-w-md carbon-panel rounded-3xl p-6.5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[500px] lens-flare-overlay my-auto animate-fade-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-red-500 opacity-80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-slate-900 pb-4 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "scale-75 origin-left",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyLinkLogo, {
							size: 32,
							showText: false
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 font-mono text-[8.5px] font-black tracking-widest text-slate-500 uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Setup Wizard" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								currentStep + 1,
								" of ",
								steps.length
							] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex flex-col items-center justify-center text-center space-y-4 my-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								scale: .7,
								rotate: -15,
								opacity: 0
							},
							animate: {
								scale: 1,
								rotate: 0,
								opacity: 1
							},
							transition: {
								type: "spring",
								damping: 12,
								stiffness: 100
							},
							className: "w-18 h-18 rounded-2xl bg-slate-950 border border-slate-900 flex items-center justify-center text-3xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-2xl animate-pulse" }), step.emoji]
						}, `emoji-${currentStep}`),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [step.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[8.5px] font-black font-mono bg-blue-950/40 border border-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider",
								children: step.badge
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-black tracking-tight text-slate-100 font-mono pt-1.5",
								children: step.title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11.5px] text-slate-400 leading-relaxed max-w-sm px-2",
							children: step.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full pt-2 px-1 relative z-10",
							children: [
								currentStep === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 p-3 bg-slate-950/80 border border-slate-900 rounded-2xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest",
											children: "ACTIVE OPERATIONAL PROFILE"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => {
													if (!drillMode) toggleDrillMode();
													addToast("Drill (Simulated) Mode enabled", "info");
												},
												className: `py-2 px-3 rounded-xl text-[10px] font-mono font-bold border transition-all flex flex-col items-center gap-1 ${drillMode ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]" : "bg-slate-900/40 border-slate-800 text-slate-500 hover:text-slate-300"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs",
													children: "🛡️ DRILL MODE"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[7.5px] opacity-80 uppercase font-black",
													children: "Simulated Alerts"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => {
													if (drillMode) toggleDrillMode();
													addToast("LIVE GATEWAY DISPATCH ENFORCED", "warn");
												},
												className: `py-2 px-3 rounded-xl text-[10px] font-mono font-bold border transition-all flex flex-col items-center gap-1 ${!drillMode ? "bg-red-950/30 border-red-500/40 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.15)]" : "bg-slate-900/40 border-slate-800 text-slate-500 hover:text-slate-300"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs",
													children: "🚨 LIVE MODE"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[7.5px] opacity-80 uppercase font-black",
													children: "Real Voice/SMS"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[7.5px] text-slate-500 leading-normal font-mono",
											children: [
												"*We strongly recommend starting in ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-emerald-400 font-bold",
													children: "DRILL MODE"
												}),
												" for offline sandbox walkthroughs."
											]
										})
									]
								}),
								currentStep === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 p-3 bg-slate-950/80 border border-slate-900 rounded-2xl text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-0.5",
											children: "1st Priority Voice Dispatch Number"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: primaryPhone,
												onChange: (e) => handlePhoneChange(e.target.value),
												placeholder: "+27...",
												className: "flex-1 bg-slate-950 border border-slate-850 focus:border-blue-500/50 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 placeholder-slate-700 focus:outline-none"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													addToast("Primary Contact successfully saved!", "success");
												},
												className: "px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-mono font-bold uppercase transition-colors",
												children: "SAVE"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[7.5px] text-slate-500 leading-normal font-mono",
											children: "*South African emergency dispatch standards prefer numbers utilizing +27 prefix layout."
										})
									]
								}),
								currentStep === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 p-3 bg-slate-950/80 border border-slate-900 rounded-2xl text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest block",
											children: "Fast Sandbox AI Test Triggers"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-1.5 pt-0.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleBotQuery("STATUS"),
													disabled: botLoading,
													className: "px-2 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-[8.5px] font-mono rounded",
													children: "📡 Check Security Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleBotQuery("GPS"),
													disabled: botLoading,
													className: "px-2 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-[8.5px] font-mono rounded",
													children: "📍 Translate GPS Location"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleBotQuery("DISARM"),
													disabled: botLoading,
													className: "px-2 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-[8.5px] font-mono rounded",
													children: "🛑 SOS Disarm Guide"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "min-h-[50px] bg-slate-950/90 border border-slate-900/60 rounded-xl p-2.5 mt-1 font-mono text-[9px] flex items-center justify-center",
											children: botLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 text-slate-500 uppercase tracking-wider animate-pulse font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" }), "Analyzing situation..."]
											}) : botAnswer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-slate-300 leading-normal",
												children: botAnswer
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-600 uppercase text-center text-[8.5px]",
												children: "Select a fast sandbox query above"
											})
										})
									]
								}),
								currentStep === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 p-3 bg-slate-950/80 border border-slate-900 rounded-2xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest text-left block",
											children: "GATT Beacon Discovery"
										}),
										!fobsDiscovered && !fobPaired && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setBotLoading(true);
												setTimeout(() => {
													setBotLoading(false);
													setFobsDiscovered(true);
												}, 1200);
											},
											className: "w-full py-2 bg-blue-950/20 hover:bg-blue-950/30 border border-blue-500/30 hover:border-blue-500/50 text-blue-400 text-[10px] font-mono font-bold rounded-xl uppercase transition-all tracking-wider flex items-center justify-center gap-1.5",
											children: botLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" }), "ARMING GATT SCANNER..."] }) : "🔍 ARM BLE DISCOVERY SCANNER"
										}),
										fobsDiscovered && !fobPaired && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between p-2.5 bg-slate-900/70 border border-slate-800 rounded-xl text-left animate-pulse",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-slate-200 text-[10px] font-bold",
													children: "Distress Fob 01 (iTAG)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[8px] text-slate-500 font-mono",
													children: "MAC: 00:1A:7D:DA:71:11 · -58dBm"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: handlePairFobSim,
												className: "px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[9px] font-mono font-bold uppercase transition-colors",
												children: "PAIR DEVICE"
											})]
										}),
										fobPaired && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-2.5 bg-emerald-950/20 border border-emerald-500/25 rounded-xl text-center text-[10px] font-mono font-bold text-emerald-400 flex items-center justify-center gap-1.5",
											children: "✓ ITAG BEACON BONDED SUCCESSFULLY"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[7.5px] text-slate-500 leading-normal text-left font-mono",
											children: "*Successfully paired keyfobs will appear in the main BleScanner board dashboard."
										})
									]
								}),
								currentStep === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 p-3 bg-slate-950/80 border border-slate-900 rounded-2xl text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest block",
											children: "Launcher Widget Countdown Timer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-3 gap-1.5 mt-0.5",
											children: [
												5,
												10,
												15
											].map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleCountdownSelect(sec),
												className: `py-2 px-1 rounded-xl text-center font-mono transition-all border ${countdownDelay === sec ? "bg-blue-600 border-blue-500 text-white shadow-md" : "bg-slate-900/60 border-slate-850 text-slate-400 hover:text-slate-200"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "block text-xs font-black",
													children: [sec, "s"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-[6.5px] uppercase opacity-75",
													children: "Delay"
												})]
											}, sec))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[7.5px] text-slate-500 leading-normal font-mono",
											children: [
												"*Gives you exactly ",
												countdownDelay,
												" seconds to abort or disarm a trigger sequence before automatic sequentially broadcasts are fired."
											]
										})
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 border-t border-slate-900 pt-4 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 cursor-pointer select-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: neverShowAgain,
								onChange: (e) => setNeverShowAgain(e.target.checked),
								className: "rounded border-slate-900 bg-slate-950 text-blue-500 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9.5px] font-mono text-slate-400 uppercase tracking-wide font-bold hover:text-slate-200",
								children: "Never show again"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-1.5",
							children: steps.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? "w-4 bg-blue-500" : "w-1.5 bg-slate-900"}` }, idx))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 pt-1",
						children: [currentStep > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handlePrev,
							className: "flex-1 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-900 text-slate-300 text-xs font-mono font-bold rounded-xl uppercase transition-colors",
							children: "Previous"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onClose(neverShowAgain),
							className: "flex-1 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-900 text-slate-500 text-xs font-mono font-bold rounded-xl uppercase transition-colors",
							children: "Skip Tour"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleNext,
							className: "flex-1 py-2.5 bg-blue-650 hover:bg-blue-650/90 text-white text-xs font-mono font-extrabold rounded-xl uppercase transition-all tracking-wide shadow-lg shadow-blue-950/40",
							children: currentStep === steps.length - 1 ? "Finish Tour" : "Next Step"
						})]
					})]
				})
			]
		})
	}) });
};
//#endregion
export { AppTour };
