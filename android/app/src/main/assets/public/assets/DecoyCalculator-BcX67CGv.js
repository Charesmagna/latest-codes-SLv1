import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { kt as require_react } from "./icons-B-I2x5TV.js";
import { b as motion, w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-DQZ7ziRL.js";
//#region src/components/DecoyCalculator.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var DecoyCalculator = () => {
	const { decoyCode, decoyDistressCode, triggerPanic, addToast, logout } = useAppStore();
	const [display, setDisplay] = (0, import_react.useState)("0");
	const [equation, setEquation] = (0, import_react.useState)("");
	const [history, setHistory] = (0, import_react.useState)([]);
	const handleKeyPress = (val) => {
		if (navigator.vibrate) navigator.vibrate(12);
		if (val === "C" || val === "CE") {
			setDisplay("0");
			setEquation("");
			return;
		}
		if (val === "⌫") {
			if (display.length > 1) setDisplay(display.slice(0, -1));
			else setDisplay("0");
			return;
		}
		if (val === "=") {
			const codeTyped = display.trim();
			if (codeTyped === decoyCode) {
				useAppStore.setState({ decoyActive: false });
				addToast("Decoy disguise deactivated. Workspace verified.", "success");
				return;
			}
			if (codeTyped === decoyDistressCode) {
				triggerPanic("Covert distress activated via Decoy Calculator.");
				addToast("Secure connection established (Covert Mode).", "success");
				setDisplay("0");
				setEquation("");
				return;
			}
			try {
				const sanitized = equation + display;
				const result = eval(sanitized.replace(/×/g, "*").replace(/÷/g, "/"));
				setHistory((prev) => [...prev, `${sanitized} = ${result}`].slice(-4));
				setDisplay(String(result));
				setEquation("");
			} catch {
				setDisplay("Error");
			}
			return;
		}
		if ([
			"+",
			"-",
			"×",
			"÷"
		].includes(val)) {
			setEquation(display + " " + val + " ");
			setDisplay("0");
			return;
		}
		if (display === "0" || display === "Error") setDisplay(val);
		else setDisplay(display + val);
	};
	const buttons = [
		[
			"C",
			"⌫",
			"÷",
			"×"
		],
		[
			"7",
			"8",
			"9",
			"-"
		],
		[
			"4",
			"5",
			"6",
			"+"
		],
		[
			"1",
			"2",
			"3",
			"="
		],
		["0", "."]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden scanlines",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 digital-grid opacity-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm midnight-glass p-6 space-y-6 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center border-b border-slate-900 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl",
								children: "🎛️"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs font-mono font-bold tracking-wider text-slate-400 uppercase",
								children: "Operational Calculator"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[8px] font-mono text-slate-600",
								children: "Standard Desk Disguise Utility"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									useAppStore.setState({ decoyActive: false });
									addToast("Returned to SafetyLink Portal.", "info");
								},
								className: "text-[9px] font-mono px-2.5 py-1 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 hover:text-emerald-300 rounded border border-emerald-800/40 transition-colors",
								title: "Exit disguise",
								children: "Exit Disguise"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									useAppStore.setState({ decoyActive: false });
									logout();
									addToast("Calculator session terminated.", "info");
								},
								className: "text-[9px] font-mono px-2 py-1 bg-slate-900/60 hover:bg-slate-850 rounded text-slate-500 hover:text-slate-300 border border-slate-900 transition-colors",
								children: "Shutdown"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-950/80 border border-slate-900/60 rounded-2xl p-4 text-right font-mono space-y-1 shadow-inner relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-[1px] bg-white/5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 text-[10px] text-slate-600 overflow-y-auto pr-1 flex flex-col justify-end",
								children: history.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "opacity-60",
									children: h
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-emerald-500/60 min-h-[14px]",
								children: equation
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-black text-slate-100 truncate tracking-wide",
								children: display
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-3 font-mono",
						children: buttons.map((row, rIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: row.map((btn) => {
							const isOperator = [
								"÷",
								"×",
								"-",
								"+",
								"="
							].includes(btn);
							const isClear = ["C", "⌫"].includes(btn);
							const isEquals = btn === "=";
							const isZero = btn === "0";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
								whileTap: { scale: .95 },
								onClick: () => handleKeyPress(btn),
								className: `h-14 rounded-xl flex items-center justify-center font-bold transition-all text-xs border ${isEquals ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 neon-glow-emerald col-span-1" : isZero ? "col-span-2 bg-slate-900/40 border-slate-850 text-slate-300 hover:bg-slate-800/40" : isOperator ? "bg-slate-900/60 border-slate-850 text-cyan-400 hover:bg-slate-800/60" : isClear ? "bg-slate-950/80 border-red-500/10 text-red-400 hover:bg-red-500/10" : "bg-slate-900/30 border-slate-900/60 text-slate-300 hover:bg-slate-900/60 hover:border-slate-800"}`,
								children: btn
							}, btn);
						}) }, rIdx))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[8px] font-mono text-slate-700 text-center uppercase tracking-widest pt-2",
						children: "Secure active matrix · offline crypt block"
					})
				]
			})
		]
	});
};
//#endregion
export { DecoyCalculator };
