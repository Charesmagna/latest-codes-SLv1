import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { kt as require_react } from "./icons-B-I2x5TV.js";
import { b as motion, w as require_jsx_runtime, x as AnimatePresence } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-DQZ7ziRL.js";
//#region src/components/OpenPlatformHub.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var OpenPlatformHub = () => {
	const { platformIntegrations, savePlatformIntegration, deployPlatformIntegration, removePlatformIntegration, addToast, addAuditLog } = useAppStore();
	const [selectedPlatform, setSelectedPlatform] = (0, import_react.useState)(null);
	const [isDeploying, setIsDeploying] = (0, import_react.useState)(null);
	const [apiKey, setApiKey] = (0, import_react.useState)("");
	const [apiSecret, setApiSecret] = (0, import_react.useState)("");
	const [accountSid, setAccountSid] = (0, import_react.useState)("");
	const [phoneOrLine, setPhoneOrLine] = (0, import_react.useState)("");
	const [endpointUrl, setEndpointUrl] = (0, import_react.useState)("");
	const [pcbSerial, setPcbSerial] = (0, import_react.useState)("");
	const [senderId, setSenderId] = (0, import_react.useState)("");
	const openConfigure = (platform) => {
		setSelectedPlatform(platform);
		setApiKey(platform.apiKey || "");
		setApiSecret(platform.apiSecret || "");
		setAccountSid(platform.accountSid || "");
		setPhoneOrLine(platform.phoneOrLine || "");
		setEndpointUrl(platform.endpointUrl || "");
		setPcbSerial(platform.pcbSerial || "");
		setSenderId(platform.senderId || "");
	};
	const handleSaveAndDeploy = async (e) => {
		e.preventDefault();
		if (!selectedPlatform) return;
		setIsDeploying(selectedPlatform.id);
		const updated = {
			...selectedPlatform,
			apiKey: apiKey.trim() || void 0,
			apiSecret: apiSecret.trim() || void 0,
			accountSid: accountSid.trim() || void 0,
			phoneOrLine: phoneOrLine.trim() || void 0,
			endpointUrl: endpointUrl.trim() || void 0,
			pcbSerial: pcbSerial.trim() || void 0,
			senderId: senderId.trim() || void 0,
			status: "CONFIGURED"
		};
		savePlatformIntegration(updated);
		addAuditLog("SYSTEM", "INFO", `Configured Platform: ${selectedPlatform.name}`, "Lodging API credentials into dispatch layer.");
		await new Promise((r) => setTimeout(r, 600));
		const deployRes = await deployPlatformIntegration(selectedPlatform.id);
		setIsDeploying(null);
		setSelectedPlatform(null);
		if (deployRes.success) addToast(`🚀 ${selectedPlatform.name} deployed & active in dispatch chain!`, "success");
		else addToast(`Configured ${selectedPlatform.name}.`, "info");
	};
	const getStatusBadge = (status) => {
		switch (status) {
			case "DEPLOYED": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "px-2 py-0.5 rounded-full text-[8px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse",
				children: "● DEPLOYED & ACTIVE"
			});
			case "CONFIGURED": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "px-2 py-0.5 rounded-full text-[8px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
				children: "READY TO DEPLOY"
			});
			case "ERROR": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "px-2 py-0.5 rounded-full text-[8px] font-black bg-red-500/10 text-red-400 border border-red-500/30",
				children: "ERROR"
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "px-2 py-0.5 rounded-full text-[8px] font-black bg-slate-800 text-slate-400 border border-slate-700",
				children: "STANDBY"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 font-mono text-left max-w-md mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center border-b border-slate-900 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-black text-slate-100 uppercase tracking-widest font-display",
					children: "🔌 Open Platform Integrations Hub"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[9px] text-slate-500 mt-0.5",
					children: "Self-serve gateway for external telcos, voice AI, payments, & PCB hardware lines"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[8px] font-bold px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full",
					children: "AUTO-DEPLOY"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-2.5",
				children: platformIntegrations.map((platform) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3.5 bg-slate-950/70 border border-slate-900 hover:border-slate-800 rounded-2xl transition-all shadow-md space-y-2 relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-[10px] font-black text-slate-200 uppercase tracking-wider",
								children: platform.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[8px] text-slate-500 block",
								children: ["Category: ", platform.category]
							})] }), getStatusBadge(platform.status)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[8px] text-slate-400 bg-slate-900/60 p-2 rounded-xl border border-slate-850 space-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LINE / IDENTITY:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-200 font-bold",
									children: platform.phoneOrLine || platform.pcbSerial || platform.accountSid || "Not Lodged"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GATEWAY HEALTH:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-emerald-400 font-bold",
									children: platform.lastPingStatus || "Offline"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => openConfigure(platform),
								className: "flex-1 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-[8.5px] font-bold uppercase transition-all text-center",
								children: "⚙️ Configure API"
							}), platform.status !== "DEPLOYED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => deployPlatformIntegration(platform.id),
								disabled: isDeploying === platform.id,
								className: "px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[8.5px] font-black uppercase transition-all shadow-md",
								children: isDeploying === platform.id ? "Deploying..." : "Deploy"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									savePlatformIntegration({
										...platform,
										status: "CONFIGURED"
									});
									addToast(`De-escalated ${platform.name} from active pipeline.`, "info");
								},
								className: "px-3 py-1.5 bg-slate-950 text-slate-500 hover:text-slate-300 rounded-xl text-[8.5px] font-bold uppercase",
								children: "Pause"
							})]
						})
					]
				}, platform.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: selectedPlatform && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						scale: .95,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					exit: {
						scale: .95,
						opacity: 0
					},
					className: "bg-slate-950 border border-slate-800 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center border-b border-slate-850 pb-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-[11px] font-black text-slate-100 uppercase font-mono",
							children: ["Lodging: ", selectedPlatform.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] text-slate-500",
							children: "Auto-detects credentials & activates in dispatch cascade"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedPlatform(null),
							className: "text-slate-500 hover:text-slate-300 text-sm font-bold",
							children: "✕"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveAndDeploy,
						className: "space-y-3 font-mono text-[9px]",
						children: [
							selectedPlatform.platformId === "twilio" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-slate-400 font-bold uppercase block",
										children: "Twilio Account SID"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: accountSid,
										onChange: (e) => setAccountSid(e.target.value),
										placeholder: "AC_xxxxxxxxxxxxxxxx",
										className: "w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-slate-400 font-bold uppercase block",
										children: "Twilio Auth Token / Secret"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										value: apiSecret,
										onChange: (e) => setApiSecret(e.target.value),
										placeholder: "••••••••••••••••••••",
										className: "w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-slate-400 font-bold uppercase block",
										children: "Twilio Sender Phone Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: phoneOrLine,
										onChange: (e) => setPhoneOrLine(e.target.value),
										placeholder: "+1 (xxx) xxx-xxxx",
										className: "w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
									})]
								})
							] }),
							selectedPlatform.platformId === "hardware_pcb" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-slate-400 font-bold uppercase block",
										children: "PCB Board Serial Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: pcbSerial,
										onChange: (e) => setPcbSerial(e.target.value),
										placeholder: "SL-PCB-REV4-98124",
										className: "w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-slate-400 font-bold uppercase block",
										children: "SIM Phone Number Line (GSM Module)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: phoneOrLine,
										onChange: (e) => setPhoneOrLine(e.target.value),
										placeholder: "+27600987654",
										className: "w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-slate-400 font-bold uppercase block",
										children: "Serial COM Port / Webhook Gateway"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: endpointUrl,
										onChange: (e) => setEndpointUrl(e.target.value),
										placeholder: "/dev/ttyUSB0 (9600 baud)",
										className: "w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
									})]
								})
							] }),
							selectedPlatform.platformId !== "twilio" && selectedPlatform.platformId !== "hardware_pcb" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-slate-400 font-bold uppercase block",
										children: "API Key / Token"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										value: apiKey,
										onChange: (e) => setApiKey(e.target.value),
										placeholder: "Enter API Key / Token",
										className: "w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-slate-400 font-bold uppercase block",
										children: "Phone / Sender ID / Line"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: phoneOrLine,
										onChange: (e) => setPhoneOrLine(e.target.value),
										placeholder: "+27... or SAFETYLINK",
										className: "w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-slate-400 font-bold uppercase block",
										children: "Custom Webhook / Base URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: endpointUrl,
										onChange: (e) => setEndpointUrl(e.target.value),
										placeholder: "https://api...",
										className: "w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
									})]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSelectedPlatform(null),
									className: "flex-1 py-2 bg-slate-900 text-slate-400 rounded-xl uppercase font-bold",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: isDeploying !== null,
									className: "flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl uppercase shadow-lg shadow-blue-950/40",
									children: "Save & Deploy"
								})]
							})
						]
					})]
				})
			}) })
		]
	});
};
//#endregion
export { OpenPlatformHub };
