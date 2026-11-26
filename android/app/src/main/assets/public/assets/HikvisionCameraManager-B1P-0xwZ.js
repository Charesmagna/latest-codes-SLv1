const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/capacitor-B_jS8XWy.js","assets/rolldown-runtime-7_rZTKki.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { Ct as Camera, M as Plus, O as RefreshCw, S as ShieldAlert, St as ChevronDown, a as Wifi, h as Trash2, j as QrCode, kt as require_react, l as Video, lt as ExternalLink, ot as Globe, pt as Copy, yt as ChevronUp } from "./icons-B-I2x5TV.js";
import { w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { _ as Capacitor, g as __vitePreload } from "./capacitor-B_jS8XWy.js";
import { i as useAppStore } from "./store-DQZ7ziRL.js";
//#region src/components/HikvisionCameraManager.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function parseHikvisionQrPayload(raw) {
	const trimmed = raw.trim();
	if (!trimmed) return {};
	try {
		if (trimmed.startsWith("{")) {
			const json = JSON.parse(trimmed);
			const sn = json.serial || json.serialNo || json.sn || json.deviceSerial;
			const code = json.verifyCode || json.verificationCode || json.code || json.vc;
			return {
				serialNumber: sn ? String(sn).toUpperCase() : void 0,
				verificationCode: code ? String(code).toUpperCase() : void 0
			};
		}
	} catch {}
	const tokens = trimmed.split(/[\s,;|/\n\r]+/).filter(Boolean);
	const serialMatch = tokens.find((t) => /^[A-Z0-9]{9,24}$/i.test(t) && /\d/.test(t));
	const codeMatch = tokens.find((t) => t !== serialMatch && /^[A-Z]{6}$/i.test(t));
	if (serialMatch || codeMatch) return {
		serialNumber: serialMatch?.toUpperCase(),
		verificationCode: codeMatch?.toUpperCase()
	};
	return { serialNumber: trimmed.slice(0, 32).toUpperCase() };
}
var HikvisionCameraManager = ({ scope = "USER", compact = false }) => {
	const { cameras, currentOrg, currentUser, addCamera, updateCamera, removeCamera, probeCamera, addToast } = useAppStore();
	const activeOrgId = scope === "ORG" ? currentOrg?.id || currentUser?.orgCode || "ORG" : currentUser?.orgCode || currentOrg?.id || "INDIVIDUAL";
	const scopedCameras = (0, import_react.useMemo)(() => {
		if (scope === "ORG" && currentOrg?.id) return cameras.filter((c) => c.orgId === currentOrg.id);
		return cameras;
	}, [
		cameras,
		scope,
		currentOrg?.id
	]);
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(scopedCameras.length === 0);
	const [showGuide, setShowGuide] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [modeFilter, setModeFilter] = (0, import_react.useState)("ALL");
	const [probingId, setProbingId] = (0, import_react.useState)(null);
	const [previewCamId, setPreviewCamId] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [brand, setBrand] = (0, import_react.useState)("HIKVISION");
	const [mode, setMode] = (0, import_react.useState)("HIK_CONNECT_P2P");
	const [serialNumber, setSerialNumber] = (0, import_react.useState)("");
	const [verificationCode, setVerificationCode] = (0, import_react.useState)("");
	const [host, setHost] = (0, import_react.useState)("192.168.1.64");
	const [httpPort, setHttpPort] = (0, import_react.useState)(80);
	const [rtspPort, setRtspPort] = (0, import_react.useState)(554);
	const [channel, setChannel] = (0, import_react.useState)(102);
	const [username, setUsername] = (0, import_react.useState)("admin");
	const [password, setPassword] = (0, import_react.useState)("");
	const [relayUrl, setRelayUrl] = (0, import_react.useState)("");
	const [softIoTriggerId, setSoftIoTriggerId] = (0, import_react.useState)(1);
	const [triggerOnPanic, setTriggerOnPanic] = (0, import_react.useState)(true);
	const [qrPasteText, setQrPasteText] = (0, import_react.useState)("");
	const filteredCameras = (0, import_react.useMemo)(() => {
		return scopedCameras.filter((cam) => {
			const matchesMode = modeFilter === "ALL" || cam.mode === modeFilter;
			const q = searchQuery.trim().toLowerCase();
			const matchesQuery = !q || cam.name.toLowerCase().includes(q) || (cam.serialNumber || "").toLowerCase().includes(q) || (cam.host || "").toLowerCase().includes(q);
			return matchesMode && matchesQuery;
		});
	}, [
		scopedCameras,
		modeFilter,
		searchQuery
	]);
	const handleScanStickerQr = async () => {
		if (Capacitor.isNativePlatform()) {
			try {
				const mod = await __vitePreload(() => import("./capacitor-B_jS8XWy.js").then((n) => n.c), __vite__mapDeps([0,1]));
				const perm = await mod.BarcodeScanner.requestPermissions();
				if (perm.camera !== "granted" && perm.camera !== "limited") {
					addToast("Camera permission needed to scan the Hikvision NVR/camera sticker QR.", "warn");
					return;
				}
				const { barcodes } = await mod.BarcodeScanner.scan();
				const raw = barcodes?.[0]?.rawValue;
				if (!raw) {
					addToast("No barcode detected. Try entering the 9-digit serial manually.", "info");
					return;
				}
				const parsed = parseHikvisionQrPayload(raw);
				if (parsed.serialNumber) setSerialNumber(parsed.serialNumber);
				if (parsed.verificationCode) setVerificationCode(parsed.verificationCode);
				setMode("HIK_CONNECT_P2P");
				addToast(`Scanned Hikvision serial: ${parsed.serialNumber || "Detected"}`, "success");
			} catch (err) {
				addToast(err?.message || "QR scanner unavailable; paste sticker text or serial below.", "warn");
			}
			return;
		}
		if (qrPasteText.trim()) {
			const parsed = parseHikvisionQrPayload(qrPasteText);
			if (parsed.serialNumber) setSerialNumber(parsed.serialNumber);
			if (parsed.verificationCode) setVerificationCode(parsed.verificationCode);
			addToast(`Parsed sticker data (${parsed.serialNumber || "OK"})`, "success");
		} else addToast("On web preview, paste the camera sticker text or enter Serial + Verification Code below. On Android APK, taps open the camera QR scanner.", "info");
	};
	const handleDeployCamera = async (e) => {
		e.preventDefault();
		const cleanName = name.trim() || `${brand} Cam ${scopedCameras.length + 1}`;
		if (mode === "HIK_CONNECT_P2P" && !serialNumber.trim()) {
			addToast("Enter the 9-character Hikvision Serial Number from the NVR/camera sticker.", "warn");
			return;
		}
		if (mode === "LAN_ISAPI" && !host.trim()) {
			addToast("Enter the local LAN IP address (e.g. 192.168.1.64).", "warn");
			return;
		}
		if (mode === "WHEP_HLS_RELAY" && !relayUrl.trim()) {
			addToast("Enter your HTTPS WebRTC/WHEP/HLS mobile relay URL.", "warn");
			return;
		}
		const created = addCamera({
			name: cleanName,
			brand,
			mode,
			orgId: activeOrgId,
			serialNumber: serialNumber.trim().toUpperCase() || void 0,
			host: host.trim() || void 0,
			httpPort: Number(httpPort) || 80,
			rtspPort: Number(rtspPort) || 554,
			channel: Number(channel) || 102,
			relayUrl: relayUrl.trim() || void 0,
			softIoTriggerId: Number(softIoTriggerId) || 1,
			triggerOnPanic,
			username: username.trim() || "admin",
			password: verificationCode.trim() || password
		});
		setName("");
		setSerialNumber("");
		setVerificationCode("");
		setPassword("");
		setRelayUrl("");
		setQrPasteText("");
		setShowAddForm(false);
		addToast(`Camera "${created.name}" registered under ${activeOrgId}.`, "success");
		if (mode !== "HIK_CONNECT_P2P") {
			setProbingId(created.id);
			const res = await probeCamera(created.id);
			setProbingId(null);
			addToast(res.diagnostics, res.reachable ? "success" : "info");
		}
	};
	const handleProbe = async (cam) => {
		setProbingId(cam.id);
		const res = await probeCamera(cam.id);
		setProbingId(null);
		addToast(res.diagnostics, res.reachable ? "success" : "warn");
	};
	const buildRtspPreview = (cam) => {
		return `rtsp://admin:<PASSWORD>@${cam.host || "<CAMERA_LAN_IP>"}:${cam.rtspPort || 554}/Streaming/Channels/${cam.channel || 102}`;
	};
	const buildGo2RtcYaml = (cam) => {
		return `streams:\n  ${cam.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "hik_cam"}:\n    - ${buildRtspPreview(cam)}`;
	};
	const statusLabel = (s) => {
		if (s === "ONLINE") return {
			text: "ONLINE",
			cls: "text-emerald-600 dark:text-emerald-400"
		};
		if (s === "OFFLINE") return {
			text: "OFFLINE",
			cls: "text-amber-600 dark:text-amber-400"
		};
		if (s === "ERROR") return {
			text: "ERROR",
			cls: "text-red-600 dark:text-red-400"
		};
		return {
			text: "READY / UNPROBED",
			cls: "text-slate-600 dark:text-slate-400"
		};
	};
	const activePreviewCam = scopedCameras.find((c) => c.id === previewCamId) || null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-4 text-left ${compact ? "text-slate-900 dark:text-slate-100" : "text-slate-100"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-sm font-semibold tracking-tight flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-4 h-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hikvision & ONVIF Mobile Camera Deployment" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums",
					children: [
						"Scope: ",
						activeOrgId,
						" · ",
						scopedCameras.length,
						" ",
						scopedCameras.length === 1 ? "camera" : "cameras",
						" linked"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setShowGuide((v) => !v),
						className: "px-3 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Field Playbook" }), showGuide ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-3.5 h-3.5" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setShowAddForm((v) => !v),
						className: "px-3.5 py-2 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showAddForm ? "Close Form" : "Deploy Camera" })]
					})]
				})]
			}),
			showGuide && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 space-y-2.5 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-slate-800 dark:text-slate-200",
					children: "Zero-IT Phone Deployment Strategy (Customer & Installer Flow)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "list-decimal pl-4 space-y-1.5 text-slate-600 dark:text-slate-400 leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Power & Connect NVR/Camera to Wi-Fi or SIM Router" }), ": Plug the Hikvision camera or NVR into the site router via Ethernet or 2.4 GHz Wi-Fi. Do not waste time opening router ports."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Fastest Path — Hik-Connect P2P (CG-NAT Safe)" }), ": Scan the QR code sticker underneath the camera/NVR (9-char Serial + 6-letter Verification Code). Works over Rain/MTN/Vodacom LTE SIMs immediately."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "On-Site Zero-Data Path — LAN ISAPI" }),
							": Connect your phone to the same site Wi-Fi, choose ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "On-Site Wi-Fi / LAN" }),
							", pick sub-stream channel ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: "102"
							}),
							" (saves mobile data), and enable ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Soft-IO Alarm Trigger on SOS" }),
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Live In-App Viewing — go2rtc / MediaMTX Relay" }),
							": For multi-guard control room streaming right inside SafetyLink, point a lightweight ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: "go2rtc"
							}),
							" relay (copied from each camera card) via HTTPS / Cloudflare Tunnel and paste its URL here."
						] })
					]
				})]
			}),
			showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleDeployCamera,
				className: "p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold",
							children: "1. Choose Phone Onboarding Mode"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleScanStickerQr,
							className: "px-3 py-1.5 text-xs font-medium rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/20 flex items-center gap-1.5 whitespace-nowrap shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Capacitor.isNativePlatform() ? "Scan Hikvision Sticker QR" : "Parse Sticker / QR Text" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-3 gap-2",
						children: [
							{
								id: "HIK_CONNECT_P2P",
								label: "Hik-Connect P2P",
								sub: "QR / Serial (No router setup)",
								icon: Globe
							},
							{
								id: "LAN_ISAPI",
								label: "On-Site Wi-Fi / LAN",
								sub: "Direct ISAPI + SOS Trigger",
								icon: Wifi
							},
							{
								id: "WHEP_HLS_RELAY",
								label: "WebRTC / HLS Relay",
								sub: "go2rtc / MediaMTX live feed",
								icon: Video
							}
						].map((item) => {
							const Icon = item.icon;
							const active = mode === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setMode(item.id),
								className: `p-3 rounded-lg border text-left transition-colors ${active ? "border-emerald-500 bg-emerald-500/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `w-3.5 h-3.5 ${active ? "text-emerald-500" : "text-slate-400"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-slate-500 dark:text-slate-400 mt-1",
									children: item.sub
								})]
							}, item.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1",
							children: "Camera / Gate Label"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "e.g. Main Gate Bullet Cam",
							maxLength: 100,
							className: "w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1",
							children: "Hardware Brand"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: brand,
							onChange: (e) => setBrand(e.target.value),
							className: "w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:border-emerald-500",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "HIKVISION",
									children: "Hikvision (DS-Series / NVR)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "HILOOK",
									children: "HiLook by Hikvision"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ONVIF_GENERIC",
									children: "ONVIF Profile S/G Camera"
								})
							]
						})] })]
					}),
					mode === "HIK_CONNECT_P2P" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1",
								children: "Device Serial Number (9 chars on sticker)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: serialNumber,
								onChange: (e) => setSerialNumber(e.target.value.toUpperCase()),
								placeholder: "e.g. K12345678",
								maxLength: 64,
								className: "w-full px-3 py-2 text-xs font-mono uppercase rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1",
								children: "Verification Code (kept local on phone only)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: verificationCode,
								onChange: (e) => setVerificationCode(e.target.value.toUpperCase()),
								placeholder: "e.g. ABCDEF",
								className: "w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
							})] }),
							!Capacitor.isNativePlatform() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1",
									children: "Paste QR Sticker Text (optional auto-fill)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: qrPasteText,
									onChange: (e) => setQrPasteText(e.target.value),
									placeholder: "Paste scanned QR content e.g. K12345678 ABCDEF",
									className: "w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
								})]
							})
						]
					}),
					mode === "LAN_ISAPI" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1",
								children: "Local IP / Hostname"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: host,
								onChange: (e) => setHost(e.target.value),
								placeholder: "192.168.1.64",
								maxLength: 128,
								className: "w-full px-3 py-2 text-xs font-mono tabular-nums rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:border-emerald-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1",
								children: "HTTP / RTSP Ports"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: httpPort,
									onChange: (e) => setHttpPort(Number(e.target.value)),
									className: "w-1/2 px-2.5 py-2 text-xs font-mono tabular-nums rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent",
									title: "HTTP ISAPI Port"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: rtspPort,
									onChange: (e) => setRtspPort(Number(e.target.value)),
									className: "w-1/2 px-2.5 py-2 text-xs font-mono tabular-nums rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent",
									title: "RTSP Port"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1",
								children: "Stream Channel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: channel,
								onChange: (e) => setChannel(Number(e.target.value)),
								className: "w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 102,
										children: "102 (Sub-stream · Low Mobile Data)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 101,
										children: "101 (Main HD Stream)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 202,
										children: "202 (NVR Ch 2 Sub-stream)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 302,
										children: "302 (NVR Ch 3 Sub-stream)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 402,
										children: "402 (NVR Ch 4 Sub-stream)"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1",
								children: "Device Username (Local Only)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: username,
								onChange: (e) => setUsername(e.target.value),
								className: "w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1",
									children: "Camera / NVR Password (stored on phone only, never synced to cloud)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "Camera admin password",
									className: "w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent"
								})]
							})
						]
					}),
					mode === "WHEP_HLS_RELAY" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1",
								children: "HTTPS Relay Stream URL (go2rtc / MediaMTX / Cloudflare Tunnel)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "url",
								value: relayUrl,
								onChange: (e) => setRelayUrl(e.target.value),
								placeholder: "https://cctv.yourdomain.online/api/stream.mp4?src=gate",
								className: "w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1",
							children: "Target Channel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: channel,
							onChange: (e) => setChannel(Number(e.target.value)),
							className: "w-full px-3 py-2 text-xs font-mono tabular-nums rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-xs cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: triggerOnPanic,
								onChange: (e) => setTriggerOnPanic(e.target.checked),
								className: "rounded border-slate-400 text-emerald-600 focus:ring-emerald-500"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Trigger Hikvision Soft-IO / Snapshot capture automatically on SOS Panic" })]
						}), triggerOnPanic && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500",
								children: "SoftIO ID:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 1,
								max: 64,
								value: softIoTriggerId,
								onChange: (e) => setSoftIoTriggerId(Number(e.target.value)),
								className: "w-16 px-2 py-1 text-xs font-mono tabular-nums rounded border border-slate-300 dark:border-slate-700 bg-transparent"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowAddForm(false),
							className: "px-4 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "px-4 py-2 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white",
							children: "Save & Deploy Camera"
						})]
					})
				]
			}),
			scopedCameras.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					value: searchQuery,
					onChange: (e) => setSearchQuery(e.target.value),
					placeholder: "Search cameras by label, serial, or IP...",
					className: "flex-1 min-w-[200px] px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:border-emerald-500"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
					children: [
						{
							id: "ALL",
							label: "All"
						},
						{
							id: "HIK_CONNECT_P2P",
							label: "Hik-Connect"
						},
						{
							id: "LAN_ISAPI",
							label: "LAN ISAPI"
						},
						{
							id: "WHEP_HLS_RELAY",
							label: "Relay"
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setModeFilter(f.id),
						className: `px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${modeFilter === f.id ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"}`,
						children: f.label
					}, f.id))
				})]
			}),
			activePreviewCam && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-white space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold",
						children: [activePreviewCam.name, " · Live Stream / Frame"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPreviewCamId(null),
						className: "px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs",
						children: "Close Preview"
					})]
				}), activePreviewCam.relayUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: activePreviewCam.relayUrl,
					controls: true,
					autoPlay: true,
					muted: true,
					playsInline: true,
					className: "w-full max-h-72 rounded-lg bg-black object-contain"
				}) : activePreviewCam.lastSnapshotBase64 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: activePreviewCam.lastSnapshotBase64,
					alt: `${activePreviewCam.name} latest ISAPI snapshot`,
					className: "w-full max-h-72 rounded-lg object-contain bg-black"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 text-center text-xs text-slate-400 border border-slate-800 rounded-lg",
					children: [
						"No HTTPS relay URL or captured snapshot yet. Run ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Test Connection" }),
						" on LAN ISAPI or launch Hik-Connect on your phone."
					]
				})]
			}),
			filteredCameras.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-slate-700 dark:text-slate-300",
						children: scopedCameras.length === 0 ? "No Hikvision or ONVIF cameras deployed yet." : "No cameras match your current filter."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-slate-500 dark:text-slate-400",
						children: "Deploy a camera from your phone in under 60 seconds using the sticker serial number or site Wi-Fi IP."
					}),
					!showAddForm && scopedCameras.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setShowAddForm(true),
						className: "mt-2 px-4 py-2 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white",
						children: "Deploy First Camera"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2.5",
				children: filteredCameras.map((cam) => {
					const st = statusLabel(cam.status);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 space-y-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs font-semibold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cam.name }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400",
											"aria-hidden": "true",
											children: "·"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `font-mono text-[11px] ${st.cls}`,
											children: st.text
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-slate-500 dark:text-slate-400 font-mono tabular-nums mt-0.5",
									children: [
										cam.brand,
										" · ",
										cam.mode,
										" · Ch ",
										cam.channel,
										cam.serialNumber ? ` · SN ${cam.serialNumber}` : "",
										cam.host ? ` · ${cam.host}:${cam.httpPort || 80}` : ""
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-1.5",
									children: [
										cam.mode === "HIK_CONNECT_P2P" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "hikconnect://",
											onClick: () => addToast("Opening Hik-Connect mobile app (install from Play Store if not yet installed).", "info"),
											className: "px-2.5 py-1.5 text-[11px] font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 whitespace-nowrap",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open App" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleProbe(cam),
											disabled: probingId === cam.id,
											className: "px-2.5 py-1.5 text-[11px] font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 whitespace-nowrap disabled:opacity-50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-3 h-3 ${probingId === cam.id ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: probingId === cam.id ? "Probing..." : "Test" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setPreviewCamId(previewCamId === cam.id ? null : cam.id),
											className: "px-2.5 py-1.5 text-[11px] font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 whitespace-nowrap",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => removeCamera(cam.id),
											className: "p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg",
											title: "Remove camera",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
										})
									]
								})]
							}),
							cam.lastError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-amber-600 dark:text-amber-400 leading-snug",
								children: cam.lastError
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-300",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: cam.triggerOnPanic,
											onChange: (e) => updateCamera(cam.id, { triggerOnPanic: e.target.checked }),
											className: "rounded border-slate-400 text-emerald-600"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-3.5 h-3.5 text-amber-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["SOS Soft-IO Trigger #", cam.softIoTriggerId] })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											navigator.clipboard?.writeText(buildRtspPreview(cam)).catch(() => {});
											addToast("Copied RTSP template URI.", "success");
										},
										className: "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copy RTSP" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											navigator.clipboard?.writeText(buildGo2RtcYaml(cam)).catch(() => {});
											addToast("Copied go2rtc.yaml mobile relay snippet.", "success");
										},
										className: "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copy go2rtc" })]
									})]
								})]
							})
						]
					}, cam.id);
				})
			})
		]
	});
};
//#endregion
export { HikvisionCameraManager as t };
