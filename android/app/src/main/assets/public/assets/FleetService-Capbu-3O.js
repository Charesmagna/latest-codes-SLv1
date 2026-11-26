import { r as __exportAll } from "./rolldown-runtime-7_rZTKki.js";
import { _ as Capacitor } from "./capacitor-B_jS8XWy.js";
import { o as CURRENT_VERSION } from "./index-BolDz6jr.js";
//#region src/services/FleetService.ts
var FleetService_exports = /* @__PURE__ */ __exportAll({
	getDeviceFleetSnapshot: () => getDeviceFleetSnapshot,
	getFirstInstallTimestamp: () => getFirstInstallTimestamp,
	getOrCreateDeviceNodeKey: () => getOrCreateDeviceNodeKey,
	getRuntimePlatform: () => getRuntimePlatform,
	registerDeviceWithServer: () => registerDeviceWithServer,
	sendFleetHeartbeat: () => sendFleetHeartbeat,
	startFleetTelemetry: () => startFleetTelemetry
});
var STORAGE_KEY_NODE = "sl_fleet_node_key";
var STORAGE_KEY_INSTALL_DATE = "sl_fleet_first_install";
var API_BASE = "";
/**
* Generates or retrieves the unique, immutable installation key for this client.
* This key identifies the device installation across updates.
*/
function getOrCreateDeviceNodeKey() {
	let key = localStorage.getItem(STORAGE_KEY_NODE);
	if (!key) {
		key = `SL-NODE-${Array.from(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4))).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
		localStorage.setItem(STORAGE_KEY_NODE, key);
	}
	return key;
}
/**
* Detects current runtime platform: Android APK, Windows Desktop EXE, or Web PWA.
*/
function getRuntimePlatform() {
	const capPlatform = Capacitor.getPlatform();
	if (capPlatform === "android") return "android_apk";
	if (capPlatform === "ios") return "ios_app";
	if (navigator.userAgent.includes("Electron")) return "windows_exe";
	return "web_pwa";
}
/**
* Gets or sets the original installation timestamp.
*/
function getFirstInstallTimestamp() {
	let date = localStorage.getItem(STORAGE_KEY_INSTALL_DATE);
	if (!date) {
		date = (/* @__PURE__ */ new Date()).toISOString();
		localStorage.setItem(STORAGE_KEY_INSTALL_DATE, date);
	}
	return date;
}
/**
* Returns complete device identity object.
*/
function getDeviceFleetSnapshot() {
	return {
		nodeKey: getOrCreateDeviceNodeKey(),
		platform: getRuntimePlatform(),
		appVersion: CURRENT_VERSION,
		firstInstalledAt: getFirstInstallTimestamp(),
		lastHeartbeat: (/* @__PURE__ */ new Date()).toISOString(),
		userAgent: navigator.userAgent,
		customerEmail: localStorage.getItem("sl_user_email") || void 0,
		customerName: localStorage.getItem("sl_user_name") || void 0,
		orgCode: localStorage.getItem("sl_org_code") || void 0,
		isRegistered: localStorage.getItem("sl_fleet_registered") === "true"
	};
}
/**
* Alerts the server about a new installation or application open.
*/
async function registerDeviceWithServer(customerOverride) {
	try {
		const info = getDeviceFleetSnapshot();
		if (customerOverride?.email) info.customerEmail = customerOverride.email;
		if (customerOverride?.name) info.customerName = customerOverride.name;
		if (customerOverride?.orgCode) info.orgCode = customerOverride.orgCode;
		if ((await fetch(`${API_BASE}/api/fleet/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(info)
		})).ok) {
			localStorage.setItem("sl_fleet_registered", "true");
			console.log(`[FleetService] Device ${info.nodeKey} registered successfully with server.`);
		}
	} catch (err) {
		console.warn("[FleetService] Registration ping deferred (offline mode):", err);
	}
}
/**
* Sends periodic heartbeat ping to the server to maintain presence and telemetry.
*/
async function sendFleetHeartbeat() {
	try {
		const nodeKey = getOrCreateDeviceNodeKey();
		await fetch(`${API_BASE}/api/fleet/heartbeat`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				nodeKey,
				appVersion: CURRENT_VERSION,
				timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				customerEmail: localStorage.getItem("sl_user_email") || void 0
			})
		});
	} catch {}
}
var heartbeatInterval = null;
/**
* Initializes telemetry tracking upon app launch.
*/
function startFleetTelemetry() {
	registerDeviceWithServer();
	if (!heartbeatInterval) heartbeatInterval = setInterval(sendFleetHeartbeat, 3e5);
}
//#endregion
export { getOrCreateDeviceNodeKey as n, getRuntimePlatform as r, FleetService_exports as t };
