import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { kt as require_react } from "./icons-B-I2x5TV.js";
import { _ as Map$1, g as AdvancedMarker, h as APIProvider, v as Pin, w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-CoihKo_w.js";
//#region src/components/OrgWarRoom.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var OrgWarRoom = () => {
	const { meshNodes, panicEvents } = useAppStore();
	const liveSOSStream = (panicEvents || []).map((p) => ({
		id: p.id,
		lat: p.lat,
		lng: p.lng,
		status: p.status
	}));
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [mapTypeId, setMapTypeId] = (0, import_react.useState)("hybrid");
	const activeIncident = liveSOSStream.find((s) => s.lat && s.lng && s.status !== "RESOLVED") || liveSOSStream[0];
	const targetLat = activeIncident?.lat || -26.3085;
	const targetLng = activeIncident?.lng || 27.8344;
	(0, import_react.useEffect)(() => {
		const eventSource = new EventSource("https://ntfy.sh/safetylink_warroom/sse");
		eventSource.onmessage = (e) => {
			setMessages((prev) => [...prev, e.data]);
		};
		return () => eventSource.close();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-[#020617] h-screen text-slate-200 flex flex-col font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 bg-slate-950 border-b border-slate-900 flex flex-wrap justify-between items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold text-slate-100 tracking-widest uppercase",
				children: "Live GIS Map — Commander Deck"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMapTypeId((prev) => prev === "hybrid" ? "roadmap" : prev === "roadmap" ? "satellite" : "hybrid"),
						className: "text-[10px] px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-md hover:bg-slate-700 font-bold uppercase tracking-wider",
						children: ["View: ", mapTypeId]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${targetLat},${targetLng}`,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-[10px] px-3 py-1.5 bg-indigo-600 rounded-md hover:bg-indigo-700 font-bold uppercase tracking-wider",
						children: "Street View"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `https://www.google.com/maps/dir/?api=1&destination=${targetLat},${targetLng}`,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-[10px] px-3 py-1.5 bg-blue-600 rounded-md hover:bg-blue-700 font-bold uppercase tracking-wider",
						children: "Navigate"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col lg:flex-row relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 relative bg-slate-900 min-h-[400px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(APIProvider, {
					apiKey: "AIzaSyBPpINHL8NBGrjNA6IOiX6PhHK8IENUBNs",
					language: "en",
					region: "ZA",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Map$1, {
						mapId: "DEMO_MAP_ID",
						internalUsageAttributionIds: ["gmp_mcp_codeassist_v1_aistudio"],
						mapTypeId,
						defaultZoom: 12,
						defaultCenter: {
							lat: targetLat,
							lng: targetLng
						},
						disableDefaultUI: false,
						gestureHandling: "greedy",
						children: [meshNodes.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdvancedMarker, {
							position: {
								lat: node.lat,
								lng: node.lng
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, {
								background: node.status === "ACTIVE" ? "#ef4444" : "#3b82f6",
								borderColor: "#fff",
								glyphColor: "#fff"
							})
						}, node.id)), liveSOSStream.map((sos) => sos.lat && sos.lng ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdvancedMarker, {
							position: {
								lat: sos.lat,
								lng: sos.lng
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, {
								background: "#ef4444",
								borderColor: "#fff",
								glyphColor: "#fff"
							})
						}, sos.id) : null)]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full lg:w-80 bg-slate-950 border-l border-slate-900 flex flex-col max-h-[300px] lg:max-h-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3 border-b border-slate-900",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-bold text-emerald-400 uppercase tracking-widest",
						children: "Live Event Stream"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-auto p-3 space-y-2",
					children: [messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[9px] text-slate-500 font-mono text-center mt-4",
						children: "Waiting for telemetry..."
					}), messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[9px] font-mono text-slate-300 border-b border-slate-900/50 pb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-emerald-500",
								children: [
									"[",
									(/* @__PURE__ */ new Date()).toLocaleTimeString(),
									"]"
								]
							}),
							" ",
							m
						]
					}, i))]
				})]
			})]
		})]
	});
};
//#endregion
export { OrgWarRoom, OrgWarRoom as default };
