import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { kt as require_react } from "./icons-B-I2x5TV.js";
import { b as motion, w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-DQZ7ziRL.js";
//#region src/components/LocationDisplay.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var LocationDisplay = () => {
	const { userLocation, gpsAccuracy } = useAppStore();
	const [satelliteCount, setSatelliteCount] = (0, import_react.useState)(12);
	(0, import_react.useEffect)(() => {
		const interval = setInterval(() => {
			setSatelliteCount((prev) => {
				const next = prev + (Math.random() > .5 ? 1 : -1);
				return next >= 8 && next <= 16 ? next : prev;
			});
		}, 4e3);
		return () => clearInterval(interval);
	}, []);
	const latStr = userLocation ? userLocation.lat.toFixed(6) : "0.000000";
	const lngStr = userLocation ? userLocation.lng.toFixed(6) : "0.000000";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "glass-panel rounded-2xl p-4 w-full max-w-md mx-auto flex items-center justify-between font-mono text-xs relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 via-teal-400 to-emerald-500 opacity-80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5 text-left relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] font-display flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" }), "Live Space-Segment Telemetry"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-0.5 font-bold font-mono text-[13px] text-slate-100 tracking-wide",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-500 text-[10px]",
							children: "LAT:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-blue-400",
							children: latStr
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-500 text-[10px]",
							children: "LNG:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-teal-400",
							children: lngStr
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-end justify-between h-full gap-2 text-right relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-block text-[8px] font-black text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(52,211,153,0.15)]",
						children: "GNSS LOCK"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] text-slate-400 font-bold flex items-center justify-end gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-500 text-[8px] uppercase",
							children: "Sats:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [satelliteCount, " active"] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[9px] text-slate-500 flex items-center justify-end gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Acc:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-emerald-400 font-bold",
							children: gpsAccuracy
						})]
					})]
				})]
			})
		]
	});
};
//#endregion
export { LocationDisplay };
