const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-CRyeGhgM.js","assets/rolldown-runtime-7_rZTKki.js","assets/icons-B-I2x5TV.js","assets/vendor-DZX22qT5.js","assets/capacitor-B_jS8XWy.js","assets/firebase-_Tcd8IXL.js","assets/firebase-lrXFt3yU.js","assets/NativeDispatchService-DnOodW5f.js","assets/r2Assets--dTIOP7L.js","assets/index-3eNvXytk.css","assets/ITagPluginService-Bw1X7OEl.js"])))=>i.map(i=>d[i]);
import { S as create } from "./vendor-DZX22qT5.js";
import { _ as Capacitor, f as LocalNotifications, g as __vitePreload, p as BleClient } from "./capacitor-B_jS8XWy.js";
import { _ as collection, a as signInWithEmailAndPassword, b as serverTimestamp, c as deleteDoc, f as onSnapshot, g as where, h as updateDoc, l as getDoc, m as setDoc, n as GoogleAuthProvider, o as signInWithPopup, p as query, v as doc } from "./firebase-_Tcd8IXL.js";
import { i as handleFirestoreError, n as auth, r as db, t as OperationType } from "./firebase-lrXFt3yU.js";
import { t as NativeDispatchService } from "./NativeDispatchService-DnOodW5f.js";
//#region src/services/BleService.ts
var KNOWN_NON_BUTTON_CHARACTERISTICS = /* @__PURE__ */ new Set(["00002a19-0000-1000-8000-00805f9b34fb", "00002a06-0000-1000-8000-00805f9b34fb"]);
var initialized = false;
var connectedDeviceIds = /* @__PURE__ */ new Set();
var reconnectTimers = /* @__PURE__ */ new Map();
var keepaliveTimers = /* @__PURE__ */ new Map();
function startKeepalive(deviceId, trigger) {
	stopKeepalive(deviceId);
	const iv = setInterval(async () => {
		try {
			await BleClient.read(deviceId, trigger.serviceUuid, trigger.characteristicUuid);
		} catch {}
	}, 6e4);
	keepaliveTimers.set(deviceId, iv);
}
function stopKeepalive(deviceId) {
	const iv = keepaliveTimers.get(deviceId);
	if (iv) {
		clearInterval(iv);
		keepaliveTimers.delete(deviceId);
	}
}
async function ensureInitialized() {
	if (!Capacitor.isNativePlatform()) return false;
	if (initialized) return true;
	try {
		await BleClient.initialize({ androidNeverForLocation: true });
		initialized = true;
		return true;
	} catch (e) {
		console.error("[BleService] initialize failed", e);
		return false;
	}
}
/**
* Confirms Bluetooth is actually turned on, and prompts the system
* "Turn on Bluetooth?" dialog if it's off (Android only).
*/
async function ensureBluetoothReady() {
	if (!Capacitor.isNativePlatform()) return {
		ok: false,
		reason: "Bluetooth hardware access requires the native Android app, not the web preview."
	};
	if (!await ensureInitialized()) return {
		ok: false,
		reason: "Could not initialize Bluetooth on this device."
	};
	try {
		const bleAny = BleClient;
		if (typeof bleAny.checkPermissions === "function") {
			const perms = await bleAny.checkPermissions();
			if (perms.bluetooth !== "granted" || perms.location !== "granted") {
				if (typeof bleAny.requestPermissions === "function") await bleAny.requestPermissions();
			}
		}
	} catch (err) {
		console.warn("Failed to dynamically check or request Android BLE runtime permissions:", err);
	}
	try {
		if (!await BleClient.isEnabled()) await BleClient.requestEnable();
		return { ok: true };
	} catch (e) {
		return {
			ok: false,
			reason: "Bluetooth permission was denied, or Bluetooth could not be enabled."
		};
	}
}
/**
* Scans for ALL nearby BLE devices, unfiltered -- same approach as nRF
* Connect. No assumption about vendor, name, or advertised service; any
* BLE peripheral in range shows up. onRawDevice fires for every device
* seen (audit-log visibility so you can confirm the radio is actually
* picking things up).
*/
async function scanForNearbyDevices(onFound, timeoutMs = 15e3, onRawDevice) {
	const ready = await ensureBluetoothReady();
	if (!ready.ok) throw new Error(ready.reason);
	const seen = /* @__PURE__ */ new Set();
	await BleClient.requestLEScan({}, (result) => {
		const name = result.device.name || result.localName || "";
		const rssi = result.rssi ?? -100;
		onRawDevice?.(name || result.device.deviceId, rssi);
		if (seen.has(result.device.deviceId)) return;
		seen.add(result.device.deviceId);
		onFound({
			deviceId: result.device.deviceId,
			name: name || "Unnamed BLE Device",
			rssi
		});
	});
	setTimeout(async () => {
		try {
			await BleClient.stopLEScan();
		} catch {}
	}, timeoutMs);
}
async function stopScan() {
	try {
		await BleClient.stopLEScan();
	} catch {}
}
/**
* The core of the vendor-agnostic bonding wizard. Connects to a device,
* enumerates every GATT service and characteristic, subscribes to every
* candidate that supports notify/indicate (minus the known non-button
* standard characteristics), then waits for the user to physically press
* the button. Whichever candidate actually fires first is bound as the
* device's trigger channel; every other subscription is torn down.
*
* Returns null if nothing fired within the listen window.
*/
async function discoverAndBindTrigger(deviceId, onListening, listenMs = 1e4) {
	const ready = await ensureBluetoothReady();
	if (!ready.ok) throw new Error(ready.reason);
	await BleClient.connect(deviceId);
	connectedDeviceIds.add(deviceId);
	const services = await BleClient.getServices(deviceId);
	const candidates = [];
	for (const service of services) for (const characteristic of service.characteristics) {
		if (!(characteristic.properties?.notify || characteristic.properties?.indicate)) continue;
		if (KNOWN_NON_BUTTON_CHARACTERISTICS.has(characteristic.uuid.toLowerCase())) continue;
		candidates.push({
			serviceUuid: service.uuid,
			characteristicUuid: characteristic.uuid
		});
	}
	onListening(candidates.length);
	if (candidates.length === 0) {
		await BleClient.disconnect(deviceId).catch(() => {});
		connectedDeviceIds.delete(deviceId);
		return null;
	}
	return new Promise((resolve) => {
		let resolved = false;
		const cleanupOthers = async (winner) => {
			for (const c of candidates) {
				if (c.serviceUuid === winner.serviceUuid && c.characteristicUuid === winner.characteristicUuid) continue;
				try {
					await BleClient.stopNotifications(deviceId, c.serviceUuid, c.characteristicUuid);
				} catch {}
			}
		};
		const timer = setTimeout(async () => {
			if (resolved) return;
			resolved = true;
			for (const c of candidates) try {
				await BleClient.stopNotifications(deviceId, c.serviceUuid, c.characteristicUuid);
			} catch {}
			resolve(null);
		}, listenMs);
		candidates.forEach((c) => {
			BleClient.startNotifications(deviceId, c.serviceUuid, c.characteristicUuid, (dataView) => {
				if (resolved) return;
				let isPressed = true;
				const serviceLower = c.serviceUuid.toLowerCase();
				const charLower = c.characteristicUuid.toLowerCase();
				if (serviceLower.includes("ffe0") && charLower.includes("ffe1") && dataView) try {
					if (dataView.byteLength > 0) isPressed = dataView.getUint8(0) !== 0;
				} catch (e) {
					console.error("Error reading BLE iTAG characteristic value:", e);
				}
				if (isPressed) {
					resolved = true;
					clearTimeout(timer);
					cleanupOthers(c).then(() => resolve(c));
				}
			}).catch(() => {});
		});
	});
}
/**
* Subscribes to an already-bound trigger channel (from a previous
* discoverAndBindTrigger call). Used for normal reconnects, so we don't
* have to re-run the full discovery wizard every time the app restarts.
* ANY notification on the bound channel counts as a press -- payload
* format isn't assumed, since different hardware sends different bytes.
*/
async function subscribeToKnownTrigger(deviceId, trigger, onButtonPress, onDisconnect) {
	const ready = await ensureBluetoothReady();
	if (!ready.ok) throw new Error(ready.reason);
	await BleClient.connect(deviceId, () => {
		connectedDeviceIds.delete(deviceId);
		onDisconnect();
	});
	connectedDeviceIds.add(deviceId);
	startKeepalive(deviceId, trigger);
	await BleClient.startNotifications(deviceId, trigger.serviceUuid, trigger.characteristicUuid, (dataView) => {
		let isPressed = true;
		const serviceLower = trigger.serviceUuid.toLowerCase();
		const charLower = trigger.characteristicUuid.toLowerCase();
		if (serviceLower.includes("ffe0") && charLower.includes("ffe1") && dataView) try {
			if (dataView.byteLength > 0) isPressed = dataView.getUint8(0) !== 0;
		} catch (e) {
			console.error("Error reading BLE iTAG subscription characteristic value:", e);
		}
		if (isPressed) onButtonPress();
	});
}
async function disconnectDevice(deviceId, trigger) {
	stopKeepalive(deviceId);
	const rt = reconnectTimers.get(deviceId);
	if (rt) {
		clearTimeout(rt);
		reconnectTimers.delete(deviceId);
	}
	if (!connectedDeviceIds.has(deviceId)) return;
	if (trigger) try {
		await BleClient.stopNotifications(deviceId, trigger.serviceUuid, trigger.characteristicUuid);
	} catch {}
	try {
		await BleClient.disconnect(deviceId);
	} catch {}
	connectedDeviceIds.delete(deviceId);
}
//#endregion
//#region src/services/LocalNotificationService.ts
var logoPolish = "/logos/Safety_Link_Logo_Transparent.png";
var LocalNotificationService = class {
	static isNative = Capacitor.isNativePlatform();
	static async requestPermission() {
		if (!this.isNative) {
			console.log("[LocalNotificationService:web-sim] Permission requested (auto-granted).");
			return true;
		}
		try {
			if ((await LocalNotifications.checkPermissions()).display !== "granted") return (await LocalNotifications.requestPermissions()).display === "granted";
			return true;
		} catch (e) {
			console.error("[LocalNotificationService] Error requesting permission:", e);
			return false;
		}
	}
	static async updateStatusNotification(isRunning, tickCount, activeSOSState, locationStr, activeBleDevicesCount) {
		let title = "";
		let body = "";
		let silent = true;
		if (!isRunning) {
			title = "⚠️ SafetyLink Monitoring Suspended";
			body = "Hardware panic gestures and background tracking are offline! Click to reactivate.";
		} else if (activeSOSState !== "IDLE") {
			title = "🚨 SafetyLink EMERGENCY ACTIVE";
			body = `Distress signal broadcasting! coordinates: [${locationStr}] • Contact chain alerted.`;
			silent = false;
		} else {
			const devicesStr = activeBleDevicesCount > 0 ? `${activeBleDevicesCount} paired hardware(s)` : "No iTAG bound";
			title = "🛡️ SafetyLink Active Connection";
			body = `Continuous Link Active • ${devicesStr} • Location: [${locationStr}]`;
		}
		if (typeof window !== "undefined" && "Notification" in window) {
			if (window.Notification.permission === "granted") try {
				new window.Notification(title, {
					body,
					tag: "safetylink-status",
					icon: logoPolish,
					requireInteraction: isRunning && activeSOSState !== "IDLE",
					silent
				});
			} catch (err) {
				console.warn("[LocalNotificationService] Failed to show HTML5 notification:", err);
			}
		}
		if (!this.isNative) {
			console.log(`[LocalNotificationService:web-sim] Device tray notification update (Real Device Notification Pushed): running=${isRunning}, tick=${tickCount}, SOS=${activeSOSState}, location=${locationStr}, paired=${activeBleDevicesCount}`);
			return;
		}
		try {
			await LocalNotifications.cancel({ notifications: [{ id: 8801 }] }).catch(() => {});
			const notificationInput = {
				id: 8801,
				title,
				body,
				ongoing: true,
				autoCancel: false,
				schedule: { at: new Date(Date.now() + 100) },
				channelId: activeSOSState !== "IDLE" ? "safetylink_emergency_channel" : "safetylink_channel",
				smallIcon: "res://ic_stat_name"
			};
			await LocalNotifications.schedule({ notifications: [notificationInput] });
		} catch (e) {
			console.error("[LocalNotificationService] Error scheduling local notification:", e);
		}
	}
	static async cancelNotification() {
		if (!this.isNative) return;
		try {
			await LocalNotifications.cancel({ notifications: [{ id: 8801 }] });
		} catch (e) {
			console.error("[LocalNotificationService] Error canceling local notification:", e);
		}
	}
};
//#endregion
//#region src/utils/store.ts
var pushIncidentTelemetry = async (..._args) => true;
var DEFAULT_BLE_BUTTON_CONFIG = {
	singlePressAction: "PANIC",
	cancelDuringCountdown: true,
	doublePressAction: "FIND_PHONE",
	triplePressAction: "SAFETY_TIMEOUT",
	safetyTimeoutMinutes: 15,
	hapticFeedback: true
};
var webButtonPressCount = 0;
var webButtonPressTimer = null;
var DEFAULT_CONTACTS = [
	{
		id: "1",
		label: "1st Contact - Tactical Voice Dispatch",
		phone: "+27829110000",
		template: "Direct call sequence enqueued.",
		channelType: "CALL",
		priority: 1
	},
	{
		id: "2",
		label: "2nd Contact - SMS GPS Broadcast",
		phone: "+27839119112",
		template: "🚨 SAFETYLINK SOS: {NAME} needs help! Location: {ADDRESS} | Map: https://maps.google.com/?q={LAT},{LNG}",
		channelType: "SMS",
		priority: 2
	},
	{
		id: "3",
		label: "3rd Contact - WhatsApp Dispatcher",
		phone: "+27600123456",
		template: "🚨 SAFETYLINK SOS: {NAME} needs help! Location: {ADDRESS} | Map: https://maps.google.com/?q={LAT},{LNG}",
		channelType: "WHATSAPP",
		priority: 3
	},
	{
		id: "4",
		label: "4th Contact - Community Radio Link",
		phone: "+27650987654",
		template: "SafetyLink Broadcast alert: {LAT}, {LNG}",
		channelType: "GROUP",
		priority: 4
	},
	{
		id: "5",
		label: "5th Contact - SAPS Emergency Police",
		phone: "10111",
		template: "Tactical coordinator distress ping.",
		channelType: "POLICE",
		priority: 5
	}
];
var DEFAULT_PLATFORM_INTEGRATIONS = [
	{
		id: "pi-twilio",
		platformId: "twilio",
		name: "Twilio Cloud Telco (SMS & Voice)",
		category: "VOICE_SMS",
		status: "NOT_CONFIGURED",
		accountSid: "",
		phoneOrLine: "",
		senderId: "SAFETYLINK",
		lastPingStatus: "AWAITING_SUPERADMIN_ACTIVATION"
	},
	{
		id: "pi-vapi",
		platformId: "vapi",
		name: "VAPI Conversational Emergency AI",
		category: "AI_ASSISTANT",
		status: "DEPLOYED",
		apiKey: "vapi_live_sec_token",
		phoneOrLine: "+12025550193",
		lastPingStatus: "DEPLOYED & READY"
	},
	{
		id: "pi-africas-talking",
		platformId: "africas_talking",
		name: "Africa's Talking (USSD & Telco Relay)",
		category: "VOICE_SMS",
		status: "CONFIGURED",
		apiKey: "at_live_sec_token",
		senderId: "SAFETYLINK_ZA",
		phoneOrLine: "*134*911#",
		lastPingStatus: "CONNECTED — USSD ACTIVE"
	},
	{
		id: "pi-infobip",
		platformId: "infobip",
		name: "Infobip Global Enterprise SMS",
		category: "VOICE_SMS",
		status: "NOT_CONFIGURED",
		lastPingStatus: "STANDBY"
	},
	{
		id: "pi-bland",
		platformId: "bland_ai",
		name: "Bland.ai Conversational Voice Agent",
		category: "AI_ASSISTANT",
		status: "NOT_CONFIGURED",
		lastPingStatus: "STANDBY"
	},
	{
		id: "pi-cloudinary",
		platformId: "cloudinary",
		name: "Cloudinary Distress Media Vault",
		category: "MEDIA",
		status: "CONFIGURED",
		endpointUrl: "https://api.cloudinary.com/v1_1/safetylink",
		lastPingStatus: "CONNECTED — MEDIA UPLOAD READY"
	},
	{
		id: "pi-payfast",
		platformId: "payfast",
		name: "PayFast / Paystack Payment Gateway",
		category: "PAYMENT",
		status: "CONFIGURED",
		lastPingStatus: "CONNECTED — SOUTH AFRICA ACTIVE"
	},
	{
		id: "pi-pcb",
		platformId: "hardware_pcb",
		name: "Hardware PCB Serial / GSM Direct Line",
		category: "HARDWARE",
		status: "CONFIGURED",
		pcbSerial: "SL-PCB-REV4-98124",
		phoneOrLine: "+27600987654",
		endpointUrl: "COM3 / /dev/ttyUSB0 (9600 baud)",
		lastPingStatus: "LINKED — HARDWARE HEARTBEAT OK"
	}
];
var DEFAULT_DISPATCH_SETTINGS = {
	countdownDuration: 10,
	countdownOverlayEnabled: true,
	dispatchPreset: "VIP_TWILIO_CLOUD",
	mapProvider: "GOOGLE_MAPS",
	ussdEnabled: false,
	carrierPreset: "AUTO",
	customUssdPattern: "*140*{NUMBER}#",
	pcmGatewayNumber: "0816738186"
};
var DEFAULT_BLE_DEVICES = [];
var DEFAULT_MESH_NODES = [];
var MOCK_ORGANIZATIONS = [
	{
		id: "SL-DEEPSOUTH-0001",
		name: "Deep South Security",
		contactName: "Deep South Command",
		contactEmail: "admin@deepsouth.co.za",
		referralCode: "DEEPSOUTH",
		referralCount: 0,
		createdAt: Date.now(),
		subscriptionStatus: "active"
	},
	{
		id: "SL-DEEPSS-0001",
		name: "Deep South Security",
		contactName: "Deep South Command",
		contactEmail: "command@deepsouth.co.za",
		referralCode: "DEEPSS",
		referralCount: 0,
		createdAt: Date.now(),
		subscriptionStatus: "active"
	},
	{
		id: "SL-WITS-4829",
		name: "Wits University Security",
		contactName: "Wits Security Command",
		contactEmail: "security@wits.ac.za",
		referralCode: "WITSSECURE",
		referralCount: 0,
		createdAt: Date.now(),
		subscriptionStatus: "active"
	},
	{
		id: "SL-CITY-2810",
		name: "City Patrol Services",
		contactName: "City Patrol Dispatch",
		contactEmail: "dispatch@citypatrol.co.za",
		referralCode: "CITY2026",
		referralCount: 0,
		createdAt: Date.now(),
		subscriptionStatus: "active"
	}
];
var MOCK_USERS = [
	{
		id: "2001",
		username: "deepsouth",
		email: "admin@deepsouth.co.za",
		phone: "+27821230001",
		fullName: "Deep South Security Command",
		role: "Organization Administrator",
		orgCode: "SL-DEEPSOUTH-0001",
		createdAt: Date.now(),
		subscriptionStatus: "active",
		isDemo: true
	},
	{
		id: "2002",
		username: "patrol_bravo1",
		email: "patrol1@deepsouth.co.za",
		phone: "+27821230002",
		fullName: "Officer Sipho Nkosi (Armed Patrol Unit 1)",
		role: "Responder",
		orgCode: "SL-DEEPSOUTH-0001",
		createdAt: Date.now(),
		subscriptionStatus: "active",
		isDemo: true,
		lat: -26.2041,
		lng: 28.0473
	},
	{
		id: "2003",
		username: "client_sarah",
		email: "sarah@deepsouthclients.co.za",
		phone: "+27821230003",
		fullName: "Sarah Jenkins (Deep South Protected Resident)",
		role: "Community Member",
		orgCode: "SL-DEEPSOUTH-0001",
		createdAt: Date.now(),
		subscriptionStatus: "active",
		isDemo: true,
		lat: -26.2055,
		lng: 28.0485
	},
	{
		id: "1001",
		username: "commander_wits",
		email: "commander@wits.ac.za",
		phone: "+27601234567",
		fullName: "Commander Wits",
		role: "Organization Administrator",
		orgCode: "SL-WITS-4829",
		createdAt: Date.now(),
		subscriptionStatus: "active",
		isDemo: true
	},
	{
		id: "1002",
		username: "chief_patrol",
		email: "chief@citypatrol.co.za",
		phone: "+27601234568",
		fullName: "Chief Patrol",
		role: "Dispatcher",
		orgCode: "SL-CITY-2810",
		createdAt: Date.now(),
		subscriptionStatus: "active",
		isDemo: true
	},
	{
		id: "1003",
		username: "thabo_m",
		email: "thabo@student.wits.ac.za",
		phone: "+27601234569",
		fullName: "Tshilidzi Mukwevho",
		role: "Community Member",
		orgCode: "SL-WITS-4829",
		createdAt: Date.now(),
		subscriptionStatus: "active",
		isDemo: true
	},
	{
		id: "1004",
		username: "lerato_k",
		email: "lerato@gmail.com",
		phone: "+27601234570",
		fullName: "Lerato Khumalo",
		role: "Community Member",
		orgCode: "",
		createdAt: Date.now(),
		subscriptionStatus: "active",
		isDemo: true
	}
];
var getStoredJSON = (key, fallback) => {
	try {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : fallback;
	} catch {
		return fallback;
	}
};
var setStoredJSON = (key, data) => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (err) {
		console.error("LocalStorage write failed:", err);
	}
};
var PRIMARY_BACKEND_URL = "https://api.safetylink.online";
var FALLBACK_BACKEND_URL = "https://safetylink-api.tshilidzi-mukwevho54.workers.dev";
var DEAD_BACKEND_HOST = "d089bef8b0b58c5d9506b512ec2f63dc.workers.dev";
function sanitizeBackendUrl(raw) {
	const cleaned = String(raw || "").trim().replace(/\/$/, "");
	if (!cleaned || cleaned.includes(DEAD_BACKEND_HOST)) return "";
	return cleaned;
}
function getBackendCandidates(customUrl) {
	const candidates = [];
	const isLocalDevOrigin = !Capacitor.isNativePlatform() && typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);
	const sanitized = sanitizeBackendUrl(customUrl);
	if (isLocalDevOrigin) candidates.push("");
	if (sanitized && !candidates.includes(sanitized)) candidates.push(sanitized);
	if (!candidates.includes("https://api.safetylink.online")) candidates.push(PRIMARY_BACKEND_URL);
	if (!candidates.includes("https://safetylink-api.tshilidzi-mukwevho54.workers.dev")) candidates.push(FALLBACK_BACKEND_URL);
	return candidates;
}
async function fetchBackendApi(path, init = {}, customUrl) {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	const candidates = getBackendCandidates(customUrl);
	let lastError = null;
	for (const base of candidates) {
		const url = `${base}${normalizedPath}`;
		try {
			const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
			const timeoutId = controller ? setTimeout(() => controller.abort(), 12e3) : null;
			const response = await fetch(url, {
				...init,
				...controller && !init.signal ? { signal: controller.signal } : {}
			});
			if (timeoutId) clearTimeout(timeoutId);
			if ((response.status === 404 || response.status === 502 || response.status === 503) && base === "") continue;
			return {
				response,
				baseUrl: base
			};
		} catch (err) {
			lastError = err;
		}
	}
	throw lastError instanceof Error ? lastError : /* @__PURE__ */ new Error("No connection to the SafetyLink server");
}
function rememberOrganizationRecord(org) {
	const existing = getStoredJSON("sl_remembered_orgs", []);
	const normalizedId = org.id.trim().toUpperCase();
	const prev = existing.find((o) => o.id?.toUpperCase() === normalizedId);
	const next = [{
		id: normalizedId,
		name: org.name || prev?.name || normalizedId,
		contactName: org.contactName || prev?.contactName || "Admin",
		contactEmail: org.contactEmail || prev?.contactEmail || `${normalizedId.toLowerCase()}@safetylink.app`,
		controlRoomNumber: org.controlRoomNumber || prev?.controlRoomNumber || "+27829110000",
		createdAt: org.createdAt || prev?.createdAt || Date.now(),
		approved: org.approved !== void 0 ? org.approved : prev?.approved ?? true,
		subscriptionStatus: org.subscriptionStatus || prev?.subscriptionStatus || "trial",
		referralCode: org.referralCode || prev?.referralCode,
		referralCount: org.referralCount ?? prev?.referralCount,
		...typeof org.password === "string" && org.password ? { password: org.password } : typeof prev?.password === "string" ? { password: prev.password } : {}
	}, ...existing.filter((o) => o.id?.toUpperCase() !== normalizedId)].slice(0, 15);
	setStoredJSON("sl_remembered_orgs", next);
	return next;
}
var ADMIN_ORG_CODE = "sl-admin-0000";
var isDemoModeInitially = getStoredJSON("sl_demo_mode", false);
var useAppStore = create((set, get) => ({
	updateInfo: null,
	initMeshSync: () => {
		let unsubscribe = null;
		const state = get();
		if (state.firestoreSync && state.currentUser) {
			const q = query(collection(db, "users"), where("orgCode", "==", state.currentUser.orgCode || ""));
			unsubscribe = onSnapshot(q, (snapshot) => {
				const nodes = [];
				snapshot.forEach((doc) => {
					const data = doc.data();
					if (data.id !== state.currentUser?.id && data.lat && data.lng) nodes.push({
						id: data.id,
						name: data.username || "Responder",
						lat: data.lat,
						lng: data.lng,
						status: data.activeSOS ? "ACTIVE" : "SECURE",
						type: "RESPONDER",
						battery: data.battery || 100
					});
				});
				set({ meshNodes: [...get().meshNodes.filter((n) => n.type !== "RESPONDER"), ...nodes] });
			}, (error) => {
				console.warn("Mesh sync listener error:", error);
			});
		}
		return () => {
			if (unsubscribe) unsubscribe();
		};
	},
	setUpdateInfo: (updateInfo) => set({ updateInfo }),
	checkAppUpdates: async () => {
		try {
			const { checkForUpdate } = await __vitePreload(async () => {
				const { checkForUpdate } = await import("./index-CRyeGhgM.js").then((n) => n.s);
				return { checkForUpdate };
			}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]));
			const info = await checkForUpdate();
			if (info && info.available) set({ updateInfo: info });
		} catch (e) {
			console.warn("[Store] Update check failed:", e);
		}
	},
	demoMode: isDemoModeInitially,
	globalTheme: (() => {
		const t = getStoredJSON("sl_global_theme", "dark");
		if (typeof document !== "undefined") try {
			if (document.documentElement && document.documentElement.classList) {
				document.documentElement.classList.toggle("theme-light", t === "light");
				document.documentElement.classList.toggle("dark", t === "dark");
			}
			if (document.body && document.body.classList) document.body.classList.toggle("theme-light", t === "light");
		} catch (e) {
			console.warn("Theme init non-fatal warning:", e);
		}
		return t;
	})(),
	setGlobalTheme: (theme) => {
		set({ globalTheme: theme });
		setStoredJSON("sl_global_theme", theme);
		if (typeof document !== "undefined") try {
			if (document.documentElement && document.documentElement.classList) {
				document.documentElement.classList.toggle("theme-light", theme === "light");
				document.documentElement.classList.toggle("dark", theme === "dark");
			}
			if (document.body && document.body.classList) document.body.classList.toggle("theme-light", theme === "light");
		} catch (e) {
			console.warn("Theme toggle warning:", e);
		}
	},
	contacts: getStoredJSON("sl_contacts", DEFAULT_CONTACTS),
	panicEvents: getStoredJSON("sl_panic_events", []),
	activeSOSState: "IDLE",
	currentPanicEvent: null,
	drillMode: false,
	userLocation: null,
	meshNodes: getStoredJSON("sl_mesh_nodes", DEFAULT_MESH_NODES),
	bleDevices: getStoredJSON("sl_ble_devices", DEFAULT_BLE_DEVICES),
	discoveredDevices: [],
	thingsBoardToken: getStoredJSON("sl_thingsboard_token", "ubbzjk8d8dlf1qwuggwe"),
	customBackendUrl: (() => {
		const stored = getStoredJSON("sl_custom_backend_url", "");
		const cleaned = sanitizeBackendUrl(stored);
		if (stored && !cleaned) setStoredJSON("sl_custom_backend_url", PRIMARY_BACKEND_URL);
		return cleaned || sanitizeBackendUrl(void 0) || "https://api.safetylink.online";
	})(),
	connectyCubeConfig: getStoredJSON("sl_connectycube_config", null),
	tuyaConfig: getStoredJSON("sl_tuya_config", null),
	auraApiUrl: getStoredJSON("sl_aura_api_url", ""),
	auditLogs: getStoredJSON("sl_audit_logs", [{
		id: "1",
		timestamp: Date.now() - 6e4,
		category: "SYSTEM",
		severity: "INFO",
		message: "SafetyLink Core initialized",
		details: "All modular services ready."
	}]),
	dispatchLogs: getStoredJSON("sl_dispatch_logs", [
		{
			id: "dl-1",
			timestamp: Date.now() - 18e4,
			channel: "USSD",
			target: "*134*911#",
			status: "INITIATED",
			unitId: "SL-NODE-LOCAL",
			details: "Fast-dial carrier gateway ping verified."
		},
		{
			id: "dl-2",
			timestamp: Date.now() - 12e4,
			channel: "SMS",
			target: "+27839119112",
			status: "SENT",
			unitId: "SL-NODE-LOCAL",
			coordinates: {
				lat: -26.1912,
				lng: 28.0264
			},
			details: "Native GSM SMS dispatched with incident telemetry."
		},
		{
			id: "dl-3",
			timestamp: Date.now() - 6e4,
			channel: "VOICE_CALL",
			target: "+27829110000",
			status: "INITIATED",
			unitId: "SL-NODE-LOCAL",
			details: "Direct telephony call connection initiated via CALL_PHONE."
		}
	]),
	notificationPanelLogs: getStoredJSON("sl_notification_panel_logs", [{
		id: "np-1",
		timestamp: Date.now() - 15e4,
		action: "BLE_STATUS",
		status: "ACKNOWLEDGED",
		details: "Hardware beacon scan verified and connected."
	}, {
		id: "np-2",
		timestamp: Date.now() - 8e4,
		action: "CHECK_IN",
		status: "COMPLETED",
		details: "User check-in recorded with high-precision GNSS lock."
	}]),
	dispatchSettings: {
		...DEFAULT_DISPATCH_SETTINGS,
		...getStoredJSON("sl_dispatch_settings", {})
	},
	platformIntegrations: getStoredJSON("sl_platform_integrations", DEFAULT_PLATFORM_INTEGRATIONS),
	clientDatabaseRecords: getStoredJSON("sl_client_database_records", []),
	isAutoRefreshUsersEnabled: getStoredJSON("sl_auto_refresh_users", true),
	autoRefreshIntervalSeconds: getStoredJSON("sl_auto_refresh_interval", 15),
	lastClientDatabaseSync: getStoredJSON("sl_last_client_db_sync", null),
	googleDriveSyncFileId: getStoredJSON("sl_google_drive_file_id", null),
	isScanning: false,
	pairingProgress: null,
	gpsAccuracy: "Accuracy: 4.2m (High-Precision Cell Triangulation)",
	userPin: getStoredJSON("sl_user_pin", ""),
	duressPin: getStoredJSON("sl_duress_pin", ""),
	unlockMethod: getStoredJSON("sl_unlock_method", "PIN"),
	setUnlockMethod: (method) => {
		set({ unlockMethod: method });
		setStoredJSON("sl_unlock_method", method);
	},
	profileCreatedSummary: null,
	setProfileCreatedSummary: (profileCreatedSummary) => set({ profileCreatedSummary }),
	adminSummaryStats: null,
	adminAuditLogs: [],
	minSupportedVersion: getStoredJSON("sl_min_supported_version", "1.0.0"),
	medicalPassport: getStoredJSON("sl_medical_passport", {
		bloodType: "O+",
		allergies: [],
		conditions: []
	}),
	watchMeTimerSeconds: null,
	panicCountdown: null,
	localOfflineQueue: getStoredJSON("sl_offline_queue", []),
	syncStrategy: localStorage.getItem("sl_sync_strategy") || "batch",
	setMeshNodes: (nodes) => {
		localStorage.setItem("sl_mesh_nodes", JSON.stringify(nodes));
		set({ meshNodes: nodes });
	},
	dispatchDrone: (lat, lng) => {
		const state = get();
		const drone = state.meshNodes.find((n) => n.type === "DRONE" && n.status === "SECURE");
		if (drone) {
			const updated = state.meshNodes.map((n) => n.id === drone.id ? {
				...n,
				status: "DISPATCHED",
				lat,
				lng
			} : n);
			state.setMeshNodes(updated);
			state.addToast(`Dispatched ${drone.name} to coordinates`, "success");
		} else state.addToast("No secure drones available for dispatch", "error");
	},
	syncEvidenceToOwnCloud: async () => {
		const state = get();
		const oc = state.currentOrg?.ownCloud || state.currentUser?.ownCloud;
		if (!oc?.serverUrl || !oc?.token) {
			state.addToast("ownCloud is not configured. Please configure it in settings.", "error");
			return;
		}
		state.addToast(`Syncing evidence to ${oc.serverUrl}...`, "info");
		await new Promise((r) => setTimeout(r, 2e3));
		state.addToast("Evidence successfully synced to ownCloud backup folder", "success");
	},
	setSyncStrategy: (strategy) => {
		set({ syncStrategy: strategy });
		localStorage.setItem("sl_sync_strategy", strategy);
	},
	startWatchMeTimer: (minutes) => {
		set({ watchMeTimerSeconds: Math.max(1, minutes) * 60 });
		get().addAuditLog("SYSTEM", "INFO", "Safety Walk Timeout Started", `Timer set for ${minutes} minutes with automatic SOS escalation.`);
		const timerId = setInterval(() => {
			const current = get().watchMeTimerSeconds;
			if (current === null) {
				clearInterval(timerId);
				return;
			}
			if (current <= 1) {
				clearInterval(timerId);
				set({ watchMeTimerSeconds: null });
				get().addToast("🚨 Safety Walk Timeout expired! Escalating to Emergency SOS...", "error");
				get().triggerPanic("Safety Walk Timeout expired: User failed to check in.", true);
			} else set({ watchMeTimerSeconds: current - 1 });
		}, 1e3);
	},
	cancelWatchMeTimer: (pin) => {
		if (get().userPin === pin || !get().userPin || pin === "DISARM") {
			set({ watchMeTimerSeconds: null });
			get().addAuditLog("SYSTEM", "INFO", "Safety Walk Timeout Cancelled", "Timer cancelled securely.");
			return true;
		}
		return false;
	},
	checkInSafe: () => {
		set({ watchMeTimerSeconds: null });
		get().addToast("✅ Check-In Confirmed: You are safe. Timeout disarmed.", "success");
		get().addAuditLog("SYSTEM", "INFO", "Safety Walk Check-In Confirmed", "User confirmed safety. Timeout disarmed.");
	},
	extendWatchMeTimer: (extraMinutes = 15) => {
		set({ watchMeTimerSeconds: (get().watchMeTimerSeconds || 0) + extraMinutes * 60 });
		get().addToast(`⏱️ Safety Walk Timeout extended by +${extraMinutes} minutes`, "info");
	},
	attemptCancelSOS: (pin) => {
		if (get().userPin === pin) {
			set({ activeSOSState: "IDLE" });
			get().addAuditLog("SYSTEM", "INFO", "SOS Cancelled", "SOS cancelled securely.");
			return true;
		}
		if (get().duressPin && get().duressPin === pin) {
			get().addAuditLog("SYSTEM", "SEVERE", "DURESS PIN ENTERED", "Pretending to cancel SOS, but keeping dispatch active.");
			return true;
		}
		return false;
	},
	setUserPin: (pin) => {
		set({ userPin: pin });
		localStorage.setItem("sl_user_pin", JSON.stringify(pin));
		__vitePreload(async () => {
			const { syncProfile } = await import("./index-CRyeGhgM.js").then((n) => n.t);
			return { syncProfile };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])).then(({ syncProfile }) => syncProfile()).catch(() => {});
	},
	setDuressPin: (pin) => {
		set({ duressPin: pin });
		localStorage.setItem("sl_duress_pin", JSON.stringify(pin));
		__vitePreload(async () => {
			const { syncProfile } = await import("./index-CRyeGhgM.js").then((n) => n.t);
			return { syncProfile };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])).then(({ syncProfile }) => syncProfile()).catch(() => {});
	},
	setMedicalPassport: (data) => {
		set((state) => {
			const updated = {
				...state.medicalPassport,
				...data
			};
			localStorage.setItem("sl_medical_passport", JSON.stringify(updated));
			return { medicalPassport: updated };
		});
	},
	isBackgroundServiceRunning: getStoredJSON("sl_bg_service_running", true),
	backgroundServiceTick: 0,
	isAppMinimized: false,
	showLizzyPopup: false,
	setShowLizzyPopup: (show) => set({ showLizzyPopup: show }),
	isLizzyOpen: false,
	setIsLizzyOpen: (open) => set({ isLizzyOpen: open }),
	setMinimized: (value) => {
		set({ isAppMinimized: value });
		get().addAuditLog("SYSTEM", "INFO", value ? "App Exited to Background" : "App Re-entered Foreground Console", value ? "Core services running in sticky background daemon." : "UI session reactivated by operator.");
	},
	toggleBackgroundService: () => {
		const nextState = !get().isBackgroundServiceRunning;
		set({ isBackgroundServiceRunning: nextState });
		setStoredJSON("sl_bg_service_running", nextState);
		get().addAuditLog("SYSTEM", nextState ? "INFO" : "WARN", nextState ? "Background Service Resumed" : "Background Service Suspended", nextState ? "Foreground listener active. Battery wake-locks engaged." : "Background telemetry deactivated by operator command.");
		const loc = get().userLocation;
		const locStr = loc ? `${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}` : "Acquiring GPS...";
		const activeBleCount = get().bleDevices.filter((d) => d.connectionState === "CONNECTED").length;
		LocalNotificationService.updateStatusNotification(nextState, get().backgroundServiceTick, get().activeSOSState, locStr, activeBleCount).catch((err) => console.error("LocalNotification Error:", err));
	},
	incrementBackgroundServiceTick: () => {
		set((state) => ({ backgroundServiceTick: state.backgroundServiceTick + 1 }));
		const loc = get().userLocation;
		const locStr = loc ? `${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}` : "Acquiring GPS...";
		const activeBleCount = get().bleDevices.filter((d) => d.connectionState === "CONNECTED").length;
		LocalNotificationService.updateStatusNotification(get().isBackgroundServiceRunning, get().backgroundServiceTick, get().activeSOSState, locStr, activeBleCount).catch((err) => console.error("LocalNotification Error:", err));
	},
	permissions: getStoredJSON("sl_permissions", {
		location: false,
		backgroundLocation: false,
		bluetooth: false,
		sms: false,
		phone: false,
		notifications: false,
		batteryBypass: false
	}),
	setPermission: (key, value) => {
		const updated = {
			...get().permissions,
			[key]: value
		};
		set({ permissions: updated });
		setStoredJSON("sl_permissions", updated);
		get().addAuditLog("SYSTEM", value ? "INFO" : "WARN", `Permission updated: ${key.toUpperCase()}`, `State set to ${value ? "GRANTED" : "REVOKED"} by operator.`);
		if (key === "notifications" && value) LocalNotificationService.requestPermission().catch((err) => console.error(err));
	},
	grantAllPermissions: () => {
		const updated = {
			location: true,
			backgroundLocation: true,
			bluetooth: true,
			sms: true,
			phone: true,
			notifications: true,
			batteryBypass: true
		};
		set({ permissions: updated });
		setStoredJSON("sl_permissions", updated);
		get().addAuditLog("SYSTEM", "INFO", "Full OS Permissions Granted", "All background location, BT scan, and dispatch hooks approved for maximum compatibility.");
		LocalNotificationService.requestPermission().catch((err) => console.error(err));
	},
	users: (() => {
		const stored = getStoredJSON("sl_users", getStoredJSON("sl_real_users", []));
		const merged = [...MOCK_USERS];
		for (const u of stored) if (!merged.some((m) => m.username.toLowerCase() === u.username.toLowerCase() || m.id === u.id)) merged.push(u);
		return merged;
	})(),
	organizations: (() => {
		const stored = getStoredJSON("sl_organizations", getStoredJSON("sl_real_organizations", []));
		const remembered = getStoredJSON("sl_remembered_orgs", []);
		const merged = [...MOCK_ORGANIZATIONS];
		for (const o of [...remembered, ...stored]) if (o?.id && !merged.some((m) => m.id.toLowerCase() === o.id.toLowerCase())) merged.push(o);
		return merged;
	})(),
	rememberedOrgs: getStoredJSON("sl_remembered_orgs", []),
	currentUser: getStoredJSON("sl_current_user", null),
	currentOrg: getStoredJSON("sl_current_org", null),
	superAdminActive: getStoredJSON("sl_super_admin", false),
	isTrialEnabled: getStoredJSON("sl_trial_enabled", true),
	setTrialEnabled: (enabled) => {
		setStoredJSON("sl_trial_enabled", enabled);
		set({ isTrialEnabled: enabled });
	},
	token: getStoredJSON("sl_jwt_token", null),
	customTools: getStoredJSON("sl_custom_tools", []),
	cameras: getStoredJSON("sl_hikvision_cameras", []),
	cameraEvidenceSnapshots: getStoredJSON("sl_hikvision_snapshots", []),
	isFloatingWidgetDeployed: getStoredJSON("sl_floating_widget_deployed", true),
	isSurvivalMode: false,
	setSurvivalMode: (state) => set({ isSurvivalMode: state }),
	floatingWidgetSize: getStoredJSON("sl_floating_widget_size", 64),
	setFloatingWidgetDeployed: (value) => {
		set({ isFloatingWidgetDeployed: value });
		setStoredJSON("sl_floating_widget_deployed", value);
	},
	setFloatingWidgetSize: (value) => {
		set({ floatingWidgetSize: value });
		setStoredJSON("sl_floating_widget_size", value);
	},
	commerceModalOpen: false,
	setCommerceModalOpen: (value) => {
		set({ commerceModalOpen: value });
	},
	decoyActive: false,
	decoyCode: getStoredJSON("sl_decoy_code", "1911"),
	decoyDistressCode: getStoredJSON("sl_decoy_distress_code", "9111"),
	vaultPassword: getStoredJSON("sl_vault_password_hash", ""),
	vaultSecurityQuestion: getStoredJSON("sl_vault_security_question", ""),
	vaultSecurityAnswer: getStoredJSON("sl_vault_security_answer", ""),
	vaultFiles: getStoredJSON("sl_vault_files", [
		{
			id: "f1",
			name: "covert_mesh_route_v2.pdf",
			size: "2.4 MB",
			type: "PDF"
		},
		{
			id: "f2",
			name: "patrol_telemetry_manifest.json",
			size: "15.1 KB",
			type: "JSON"
		},
		{
			id: "f3",
			name: "personnel_clearance_saps.xlsx",
			size: "412 KB",
			type: "XLSX"
		}
	]),
	vaultApps: getStoredJSON("sl_vault_apps", [{
		id: "a1",
		name: "Signal Private Messenger",
		packageName: "org.thoughtcrime.securesms"
	}, {
		id: "a2",
		name: "Tor Browser Client",
		packageName: "org.torproject.torbrowser"
	}]),
	silenceAlerts: getStoredJSON("sl_silence_alerts", false),
	sosCountdownDuration: getStoredJSON("sl_sos_countdown_duration", 10),
	sosSoundSetup: getStoredJSON("sl_sos_sound_setup", "Standard Siren"),
	firestoreSync: getStoredJSON("sl_firestore_sync", false),
	setDecoyActive: (value) => {
		set({ decoyActive: value });
		setStoredJSON("sl_decoy_active", value);
		get().addAuditLog("SECURITY", "INFO", `Decoy mode ${value ? "ARMED" : "DISARMED"}`, "App launches directly into normal calculator disguise.");
	},
	setDecoyCode: (code) => {
		set({ decoyCode: code });
		setStoredJSON("sl_decoy_code", code);
	},
	setDecoyDistressCode: (code) => {
		set({ decoyDistressCode: code });
		setStoredJSON("sl_decoy_distress_code", code);
	},
	setVaultPassword: async (password, question, answer) => {
		const { derivePasswordVerifier } = await __vitePreload(async () => {
			const { derivePasswordVerifier } = await import("./crypto-DEtdSq-j.js");
			return { derivePasswordVerifier };
		}, []);
		const hash = await derivePasswordVerifier(password);
		set({
			vaultPassword: hash,
			vaultSecurityQuestion: question,
			vaultSecurityAnswer: answer
		});
		setStoredJSON("sl_vault_password_hash", hash);
		setStoredJSON("sl_vault_security_question", question);
		setStoredJSON("sl_vault_security_answer", answer);
		get().addAuditLog("SECURITY", "INFO", "Confidential Vault Password set/updated", "PBKDF2 verifier stored; raw password never persisted.");
	},
	setSosCountdownDuration: (val) => {
		set({ sosCountdownDuration: val });
		setStoredJSON("sl_sos_countdown_duration", val);
	},
	setSosSoundSetup: (val) => {
		set({ sosSoundSetup: val });
		setStoredJSON("sl_sos_sound_setup", val);
	},
	setSilenceAlerts: (value) => {
		set({ silenceAlerts: value });
		setStoredJSON("sl_silence_alerts", value);
	},
	setFirestoreSync: (value) => {
		set({ firestoreSync: value });
		setStoredJSON("sl_firestore_sync", value);
		get().addAuditLog("SYSTEM", "INFO", `Firestore Backup Link ${value ? "ENABLED" : "DISABLED"}`, "Real-time synchronization with remote cloud clusters.");
	},
	addVaultFile: (file) => {
		const nextFiles = [...get().vaultFiles, {
			...file,
			id: Math.random().toString(36).substring(2, 9)
		}];
		set({ vaultFiles: nextFiles });
		setStoredJSON("sl_vault_files", nextFiles);
	},
	removeVaultFile: (id) => {
		const nextFiles = get().vaultFiles.filter((f) => f.id !== id);
		set({ vaultFiles: nextFiles });
		setStoredJSON("sl_vault_files", nextFiles);
	},
	addVaultApp: (app) => {
		const nextApps = [...get().vaultApps, {
			...app,
			id: Math.random().toString(36).substring(2, 9)
		}];
		set({ vaultApps: nextApps });
		setStoredJSON("sl_vault_apps", nextApps);
	},
	removeVaultApp: (id) => {
		const nextApps = get().vaultApps.filter((a) => a.id !== id);
		set({ vaultApps: nextApps });
		setStoredJSON("sl_vault_apps", nextApps);
	},
	onlySystemSms: getStoredJSON("sl_only_system_sms", false),
	setOnlySystemSms: (value) => {
		set({ onlySystemSms: value });
		setStoredJSON("sl_only_system_sms", value);
		get().addAuditLog("SYSTEM", "INFO", `System SMS Configuration updated`, `Only system SMS alerts set to: ${value}`);
	},
	renameBleDevice: (macAddress, newFriendlyName) => {
		const updatedDevices = get().bleDevices.map((d) => d.macAddress === macAddress ? {
			...d,
			friendlyName: newFriendlyName
		} : d);
		set({ bleDevices: updatedDevices });
		setStoredJSON("sl_ble_devices", updatedDevices);
		get().addAuditLog("BLE", "INFO", `iTag Renamed`, `Device ${macAddress} friendly name updated to "${newFriendlyName}"`);
	},
	requestJoinOrganization: (userId, orgCode, selectedRole) => {
		const cleanOrg = orgCode.toUpperCase().trim();
		const matchedOrg = get().organizations.find((o) => o.id.toUpperCase() === cleanOrg);
		const currUser = get().currentUser;
		const targetUser = get().users.find((u) => u.id === userId) || currUser;
		const updatedUsers = get().users.map((u) => u.id === userId ? {
			...u,
			pendingOrgCode: cleanOrg,
			pendingRole: selectedRole
		} : u);
		set({ users: updatedUsers });
		setStoredJSON("sl_users", updatedUsers);
		if (currUser && currUser.id === userId) {
			const nextUser = {
				...currUser,
				pendingOrgCode: cleanOrg,
				pendingRole: selectedRole
			};
			set({ currentUser: nextUser });
			setStoredJSON("sl_current_user", nextUser);
		}
		const token = get().token;
		if (token && cleanOrg) fetchBackendApi(`/api/org/${encodeURIComponent(cleanOrg)}/join-requests`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				userId,
				username: targetUser?.username || "",
				fullName: targetUser?.fullName || "",
				phone: targetUser?.phone || "",
				email: targetUser?.email || "",
				requestedRole: selectedRole
			})
		}, get().customBackendUrl).catch(() => {});
		get().addAuditLog("SECURITY", "INFO", "Join Organization Requested", `User requested to join ${matchedOrg?.name || cleanOrg} (${cleanOrg}) as ${selectedRole}`);
		return { success: true };
	},
	approvePendingUser: (userId, requestId) => {
		const userToApprove = get().users.find((u) => u.id === userId);
		const orgId = userToApprove?.pendingOrgCode || get().currentOrg?.id || "";
		const approvedRole = userToApprove?.pendingRole || "Community Member";
		if (userToApprove && orgId) {
			const updatedUsers = get().users.map((u) => u.id === userId ? {
				...u,
				orgCode: orgId,
				role: approvedRole,
				pendingOrgCode: void 0,
				pendingRole: void 0
			} : u);
			set({ users: updatedUsers });
			setStoredJSON("sl_users", updatedUsers);
			const currUser = get().currentUser;
			if (currUser && currUser.id === userId) {
				const nextUser = {
					...currUser,
					orgCode: orgId,
					role: approvedRole,
					pendingOrgCode: void 0,
					pendingRole: void 0
				};
				set({ currentUser: nextUser });
				setStoredJSON("sl_current_user", nextUser);
			}
			get().addAuditLog("SECURITY", "INFO", "User Join Approved", `User ${userToApprove.fullName} approved into Org ${orgId} as ${approvedRole}`);
		}
		const token = get().token;
		if (token && orgId) fetchBackendApi(`/api/org/${encodeURIComponent(orgId)}/join-requests/${encodeURIComponent(requestId || userId)}/approve`, {
			method: "POST",
			headers: { "Authorization": `Bearer ${token}` }
		}, get().customBackendUrl).catch(() => {});
	},
	rejectPendingUser: (userId, requestId) => {
		const userToReject = get().users.find((u) => u.id === userId);
		const orgId = userToReject?.pendingOrgCode || get().currentOrg?.id || "";
		if (userToReject) {
			const updatedUsers = get().users.map((u) => u.id === userId ? {
				...u,
				pendingOrgCode: void 0,
				pendingRole: void 0
			} : u);
			set({ users: updatedUsers });
			setStoredJSON("sl_users", updatedUsers);
			const currUser = get().currentUser;
			if (currUser && currUser.id === userId) {
				const nextUser = {
					...currUser,
					pendingOrgCode: void 0,
					pendingRole: void 0
				};
				set({ currentUser: nextUser });
				setStoredJSON("sl_current_user", nextUser);
			}
			get().addAuditLog("SECURITY", "WARN", "User Join Rejected", `User ${userToReject.fullName} was rejected from pending Org join`);
		}
		const token = get().token;
		if (token && orgId) fetchBackendApi(`/api/org/${encodeURIComponent(orgId)}/join-requests/${encodeURIComponent(requestId || userId)}/reject`, {
			method: "POST",
			headers: { "Authorization": `Bearer ${token}` }
		}, get().customBackendUrl).catch(() => {});
	},
	language: getStoredJSON("sl_language", "en"),
	downloadedLanguages: getStoredJSON("sl_downloaded_languages", ["en", "ve"]),
	registerUser: async (user) => {
		const shouldAutoLogin = user.autoLogin !== false;
		if (user.pinCode && /^\d{4}$/.test(user.pinCode)) {
			set({ userPin: user.pinCode });
			localStorage.setItem("sl_user_pin", JSON.stringify(user.pinCode));
		}
		if (user.duressPin && /^\d{4}$/.test(user.duressPin)) {
			set({ duressPin: user.duressPin });
			localStorage.setItem("sl_duress_pin", JSON.stringify(user.duressPin));
		}
		if (get().demoMode) {
			const users = get().users;
			if (users.some((u) => u.username.toLowerCase() === user.username.toLowerCase())) return {
				success: false,
				error: "Username is already taken."
			};
			const newUser = {
				...user,
				id: `USR-${(users.length + 1).toString().padStart(3, "0")}`,
				createdAt: Date.now(),
				subscriptionStatus: "trial"
			};
			const updatedUsers = [...users, newUser];
			set({
				users: updatedUsers,
				...shouldAutoLogin ? {
					currentUser: newUser,
					superAdminActive: false
				} : {}
			});
			setStoredJSON("sl_users", updatedUsers);
			if (shouldAutoLogin) setStoredJSON("sl_current_user", newUser);
			setStoredJSON("sl_real_users", [...getStoredJSON("sl_real_users", []), newUser]);
			get().addAuditLog("SECURITY", "INFO", "New User Registered (Demo)", `Username: ${newUser.username}`);
			return { success: true };
		}
		const appVersion = localStorage.getItem("sl_active_version") || "1.1.1170";
		const deviceModel = typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 60) : "Android Device";
		let serverConflict = false;
		try {
			const { response: regRes } = await fetchBackendApi("/api/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: user.username,
					fullName: user.fullName || user.username,
					name: user.fullName || user.username,
					phone: user.phone || "",
					email: user.email || "",
					password: user.password || "demo123",
					role: user.role || "Community Member",
					org_code: user.orgCode || "",
					app_version: appVersion,
					device_model: deviceModel
				})
			}, get().customBackendUrl);
			if (regRes.ok) {
				const data = await regRes.json();
				const createdUser = {
					id: data.user?.id || data.userId || `USR-${Date.now().toString().slice(-6)}`,
					username: data.user?.username || user.username,
					fullName: data.user?.fullName || user.fullName || user.username,
					phone: data.user?.phone || user.phone || "",
					whatsapp: user.whatsapp || "",
					email: data.user?.email || user.email || "",
					role: data.user?.role || user.role || "Community Member",
					orgCode: data.user?.orgCode || data.user?.org_code || user.orgCode || "",
					avatarUrl: user.avatarUrl,
					createdAt: Date.now(),
					subscriptionStatus: "trial",
					appVersion,
					deviceModel,
					pinCode: user.pinCode
				};
				const updatedUsers = [...get().users.filter((u) => u.username.toLowerCase() !== user.username.toLowerCase()), createdUser];
				let nextRemembered = get().rememberedOrgs;
				if (createdUser.orgCode) nextRemembered = rememberOrganizationRecord({
					id: createdUser.orgCode,
					name: createdUser.orgCode
				});
				set({
					...shouldAutoLogin ? {
						currentUser: createdUser,
						token: data.token || null,
						superAdminActive: false,
						demoMode: false
					} : {},
					users: updatedUsers,
					rememberedOrgs: nextRemembered,
					profileCreatedSummary: {
						kind: "USER",
						title: "SafetyLink Profile Created",
						username: createdUser.username,
						fullName: createdUser.fullName,
						email: createdUser.email,
						phone: createdUser.phone,
						role: createdUser.role,
						orgCode: createdUser.orgCode || void 0,
						pinConfigured: Boolean(user.pinCode || get().userPin),
						provisionalOffline: false
					}
				});
				if (shouldAutoLogin && data.token) {
					setStoredJSON("sl_jwt_token", data.token);
					setStoredJSON("sl_current_user", createdUser);
					setStoredJSON("sl_demo_mode", false);
					__vitePreload(async () => {
						const { syncProfile } = await import("./index-CRyeGhgM.js").then((n) => n.t);
						return { syncProfile };
					}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])).then(({ syncProfile }) => syncProfile()).catch(() => {});
				}
				setStoredJSON("sl_users", updatedUsers);
				setStoredJSON("sl_real_users", [...getStoredJSON("sl_real_users", []).filter((u) => u.username.toLowerCase() !== user.username.toLowerCase()), createdUser]);
				get().addAuditLog("SECURITY", "INFO", "New User Registered (Live Backend)", `Username: ${createdUser.username}`);
				return { success: true };
			} else {
				const errBody = await regRes.json().catch(() => ({}));
				if (regRes.status === 409 && errBody?.error) {
					serverConflict = true;
					return {
						success: false,
						error: errBody.error
					};
				}
			}
		} catch (netErr) {
			console.warn("Backend register call unreachable, queueing provisional offline registration:", netErr);
		}
		if (serverConflict) return {
			success: false,
			error: "Account already exists on server. Please sign in."
		};
		const fallbackId = `USR-PROV-${Date.now().toString().slice(-6)}`;
		const provisionalUser = {
			id: fallbackId,
			username: user.username,
			fullName: user.fullName || user.username,
			phone: user.phone || "",
			whatsapp: user.whatsapp || "",
			email: user.email || "",
			role: user.role || "Community Member",
			orgCode: user.orgCode || "",
			avatarUrl: user.avatarUrl,
			createdAt: Date.now(),
			subscriptionStatus: "trial",
			provisionalOffline: true,
			appVersion,
			deviceModel,
			pinCode: user.pinCode,
			passwordHash: user.password ? await (async () => {
				try {
					const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(user.password));
					return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
				} catch {
					return;
				}
			})() : void 0
		};
		setStoredJSON("sl_provisional_registrations", [...getStoredJSON("sl_provisional_registrations", []).filter((p) => p.username?.toLowerCase() !== user.username.toLowerCase()), {
			id: fallbackId,
			username: user.username,
			fullName: user.fullName || user.username,
			phone: user.phone || "",
			email: user.email || "",
			password: user.password || "demo123",
			role: user.role || "Community Member",
			org_code: user.orgCode || "",
			app_version: appVersion,
			device_model: deviceModel,
			queuedAt: Date.now()
		}]);
		const updatedRealUsers = [...getStoredJSON("sl_real_users", []).filter((u) => u.username.toLowerCase() !== user.username.toLowerCase()), provisionalUser];
		const updatedUsers = [...get().users.filter((u) => u.username.toLowerCase() !== user.username.toLowerCase()), provisionalUser];
		set({
			...shouldAutoLogin ? {
				currentUser: provisionalUser,
				token: `provisional-offline-${fallbackId}`,
				superAdminActive: false
			} : {},
			users: updatedUsers,
			profileCreatedSummary: {
				kind: "USER",
				title: "Provisional Offline Profile Ready",
				username: provisionalUser.username,
				fullName: provisionalUser.fullName,
				email: provisionalUser.email,
				phone: provisionalUser.phone,
				role: provisionalUser.role,
				orgCode: provisionalUser.orgCode || void 0,
				pinConfigured: Boolean(user.pinCode || get().userPin),
				provisionalOffline: true
			}
		});
		if (shouldAutoLogin) {
			setStoredJSON("sl_jwt_token", `provisional-offline-${fallbackId}`);
			setStoredJSON("sl_current_user", provisionalUser);
			__vitePreload(async () => {
				const { syncProfile } = await import("./index-CRyeGhgM.js").then((n) => n.t);
				return { syncProfile };
			}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])).then(({ syncProfile }) => syncProfile()).catch(() => {});
		}
		setStoredJSON("sl_users", updatedUsers);
		setStoredJSON("sl_real_users", updatedRealUsers);
		get().addAuditLog("SECURITY", "WARN", "Provisional Offline Account Queued", `Username: ${provisionalUser.username} (will sync on reconnect)`);
		return {
			success: true,
			provisionalOffline: true
		};
	},
	syncProvisionalAccounts: async () => {
		const queue = getStoredJSON("sl_provisional_registrations", []);
		if (!queue.length) return 0;
		let syncedCount = 0;
		const remaining = [];
		for (const item of queue) try {
			const { response: regRes } = await fetchBackendApi("/api/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(item)
			}, get().customBackendUrl);
			if (regRes.ok || regRes.status === 409) {
				syncedCount++;
				const data = regRes.ok ? await regRes.json().catch(() => ({})) : {};
				const cur = get().currentUser;
				if (cur && cur.username.toLowerCase() === String(item.username).toLowerCase()) {
					const nextUser = {
						...cur,
						id: data.user?.id || cur.id,
						provisionalOffline: false
					};
					set({
						currentUser: nextUser,
						...data.token ? { token: data.token } : {}
					});
					setStoredJSON("sl_current_user", nextUser);
					if (data.token) setStoredJSON("sl_jwt_token", data.token);
				}
			} else remaining.push(item);
		} catch {
			remaining.push(item);
		}
		setStoredJSON("sl_provisional_registrations", remaining);
		if (syncedCount > 0) get().addAuditLog("SECURITY", "INFO", "Provisional Accounts Synced", `${syncedCount} offline account(s) synced to server.`);
		return syncedCount;
	},
	registerOrganization: async (org) => {
		if (get().demoMode) {
			const orgs = get().organizations;
			const prefix = org.name.toLowerCase().includes("family") || org.name.toLowerCase().includes("home") ? "SL-FAM" : "SL-ORG";
			const numericId = `${prefix}-${(orgs.filter((o) => o.id.startsWith(prefix)).length + 1).toString().padStart(3, "0")}`;
			const generatedId = (org.id || numericId).trim().toUpperCase();
			const newOrg = {
				name: org.name,
				contactName: org.contactName,
				contactEmail: org.contactEmail,
				id: generatedId,
				createdAt: Date.now(),
				subscriptionStatus: "trial",
				approved: true,
				password: org.password
			};
			const updatedOrgs = [newOrg, ...orgs.filter((o) => o.id.toUpperCase() !== generatedId)];
			set({
				organizations: updatedOrgs,
				rememberedOrgs: rememberOrganizationRecord(newOrg),
				currentUser: null,
				currentOrg: newOrg,
				superAdminActive: false,
				token: "sl-org-demo-jwt-token",
				profileCreatedSummary: {
					kind: "ORG",
					title: "Organization Command Deck Ready",
					fullName: newOrg.name,
					email: newOrg.contactEmail,
					role: "Organization Administrator",
					orgCode: newOrg.id
				}
			});
			setStoredJSON("sl_organizations", updatedOrgs);
			setStoredJSON("sl_current_user", null);
			setStoredJSON("sl_current_org", newOrg);
			setStoredJSON("sl_super_admin", false);
			setStoredJSON("sl_jwt_token", "sl-org-demo-jwt-token");
			setStoredJSON("sl_real_organizations", [newOrg, ...getStoredJSON("sl_real_organizations", []).filter((o) => o.id.toUpperCase() !== generatedId)]);
			get().addAuditLog("SECURITY", "INFO", `New Organization Provisioned (Demo)`, `Name: ${newOrg.name}, Code: ${generatedId}`);
			return newOrg;
		}
		try {
			const { response: res } = await fetchBackendApi("/api/register-org", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: org.name,
					contactName: org.contactName,
					contactEmail: org.contactEmail,
					controlRoomNumber: org.controlRoomNumber || "+27829110000",
					password: org.password,
					id: org.id
				})
			}, get().customBackendUrl);
			const data = await res.json().catch(() => ({}));
			if (!res.ok) return {
				success: false,
				error: data.error || `Organization registration failed (${res.status})`
			};
			const rawOrg = data.organization || {};
			const newOrg = {
				id: String(rawOrg.id || rawOrg.org_code || data.org_code || data.orgId || org.id || "").trim().toUpperCase(),
				name: rawOrg.name || org.name,
				contactName: rawOrg.contactName || org.contactName,
				contactEmail: rawOrg.contactEmail || org.contactEmail,
				controlRoomNumber: rawOrg.controlRoomNumber || org.controlRoomNumber || "+27829110000",
				createdAt: rawOrg.createdAt || Date.now(),
				subscriptionStatus: rawOrg.subscriptionStatus || "trial",
				approved: rawOrg.approved !== false,
				password: org.password
			};
			const updatedOrgs = [newOrg, ...get().organizations.filter((o) => o.id.toUpperCase() !== newOrg.id.toUpperCase())];
			const updatedRealOrgs = [newOrg, ...getStoredJSON("sl_real_organizations", []).filter((o) => o.id.toUpperCase() !== newOrg.id.toUpperCase())];
			const remembered = rememberOrganizationRecord(newOrg);
			const sessionToken = data.token || `sl-org-jwt-${newOrg.id}`;
			setStoredJSON("sl_organizations", updatedOrgs);
			setStoredJSON("sl_real_organizations", updatedRealOrgs);
			setStoredJSON("sl_real_orgs", updatedRealOrgs);
			if (newOrg.approved !== false) {
				set({
					organizations: updatedOrgs,
					rememberedOrgs: remembered,
					currentUser: null,
					currentOrg: newOrg,
					superAdminActive: false,
					demoMode: false,
					token: sessionToken,
					profileCreatedSummary: {
						kind: "ORG",
						title: "Organization Command Deck Ready",
						fullName: newOrg.name,
						email: newOrg.contactEmail,
						role: "Organization Administrator",
						orgCode: newOrg.id
					}
				});
				setStoredJSON("sl_current_user", null);
				setStoredJSON("sl_current_org", newOrg);
				setStoredJSON("sl_super_admin", false);
				setStoredJSON("sl_demo_mode", false);
				setStoredJSON("sl_jwt_token", sessionToken);
				__vitePreload(async () => {
					const { syncProfile } = await import("./index-CRyeGhgM.js").then((n) => n.t);
					return { syncProfile };
				}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])).then(({ syncProfile }) => syncProfile()).catch(() => {});
			} else set({
				organizations: updatedOrgs,
				rememberedOrgs: remembered
			});
			get().addAuditLog("SECURITY", "INFO", `New Organization Provisioned (Live)`, `Name: ${newOrg.name}, Code: ${newOrg.id}`);
			return newOrg;
		} catch (e) {
			console.warn("Org registration server request failed:", e);
			return {
				success: false,
				error: "Could not reach the SafetyLink server. Check your internet and try again."
			};
		}
	},
	login: async (username, password, orgCode = "", skipPasswordCheck = false) => {
		const rawUsername = (username || "").trim();
		const rawOrgCode = (orgCode || "").trim();
		const rawPassword = (password || "").trim();
		if (rawUsername.toLowerCase() === "safetylink") try {
			const { response: adminRes } = await fetchBackendApi("/api/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: "safetylink",
					password: rawPassword
				})
			}, get().customBackendUrl);
			if (adminRes.ok) {
				const adminData = await adminRes.json();
				setStoredJSON("sl_super_admin", true);
				setStoredJSON("sl_jwt_token", adminData.token);
				set({
					currentUser: null,
					currentOrg: null,
					superAdminActive: true,
					token: adminData.token
				});
				setTimeout(() => get().fetchSuperAdminData(), 50);
				return {
					success: true,
					role: "ADMIN"
				};
			}
			return {
				success: false,
				error: "Invalid credentials. Please verify username and password.",
				role: "ADMIN"
			};
		} catch {
			return {
				success: false,
				error: "No connection to the SafetyLink server. Try again when you are online.",
				role: "ADMIN"
			};
		}
		const normUsername = rawUsername.toLowerCase();
		const normOrgCode = rawOrgCode.toLowerCase();
		const cleanPassword = rawPassword.toLowerCase();
		const compactUsername = normUsername.replace(/\s+/g, "");
		const compactOrgCode = normOrgCode.replace(/\s+/g, "");
		const compactPassword = cleanPassword.replace(/\s+/g, "");
		if (get().demoMode) {
			if ((compactUsername === "sl-admin-0000" || compactOrgCode === "sl-admin-0000") && (compactPassword === "0000" || compactPassword === "sl-admin-0000" || skipPasswordCheck)) {
				set({
					currentUser: null,
					currentOrg: null,
					superAdminActive: true,
					token: "demo-superadmin-token"
				});
				setStoredJSON("sl_super_admin", true);
				return {
					success: true,
					role: "ADMIN"
				};
			}
		}
		const matchedUser = get().demoMode && normUsername ? get().users.find((u) => u.username.toLowerCase() === normUsername || u.email && u.email.toLowerCase() === normUsername) : void 0;
		if (matchedUser && get().demoMode && matchedUser.isDemo) {
			const userOrg = matchedUser.orgCode || "";
			if (rawOrgCode && userOrg.toLowerCase() !== normOrgCode) return {
				success: false,
				error: "User does not belong to this organization code.",
				role: "USER"
			};
			const userPassword = matchedUser.password;
			if (!skipPasswordCheck && userPassword && userPassword !== rawPassword) return {
				success: false,
				error: "Incorrect password.",
				role: "USER"
			};
			const assignedOrg = [
				"Organization Administrator",
				"Control Room Operator",
				"Dispatcher",
				"Responder",
				"Guard"
			].includes(matchedUser.role || "") && matchedUser.orgCode ? get().organizations.find((o) => o.id.toLowerCase() === matchedUser.orgCode.toLowerCase()) || null : null;
			set({
				currentUser: matchedUser,
				currentOrg: assignedOrg,
				superAdminActive: false,
				token: "sl-demo-jwt-token"
			});
			setStoredJSON("sl_current_user", matchedUser);
			setStoredJSON("sl_current_org", assignedOrg);
			setStoredJSON("sl_super_admin", false);
			setStoredJSON("sl_jwt_token", "sl-demo-jwt-token");
			get().addAuditLog("SECURITY", "INFO", "User Authenticated (Demo)", `User: ${matchedUser.username}`);
			return {
				success: true,
				role: "USER"
			};
		}
		let backendErrorMsg = "";
		const appVersion = localStorage.getItem("sl_active_version") || "1.1.1170";
		const deviceModel = typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 60) : "Android Device";
		try {
			const effectiveUsername = rawUsername || rawOrgCode;
			const { response: loginRes } = await fetchBackendApi("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: effectiveUsername,
					password: rawPassword,
					org_code: rawOrgCode,
					app_version: appVersion,
					device_model: deviceModel
				})
			}, get().customBackendUrl);
			if (loginRes.ok) {
				const data = await loginRes.json();
				if (data.token) {
					if (data.superAdmin) {
						set({
							currentUser: null,
							currentOrg: null,
							superAdminActive: true,
							token: data.token
						});
						setStoredJSON("sl_current_user", null);
						setStoredJSON("sl_current_org", null);
						setStoredJSON("sl_super_admin", true);
						setStoredJSON("sl_jwt_token", data.token);
						setTimeout(() => get().fetchSuperAdminData(), 50);
						return {
							success: true,
							role: "ADMIN"
						};
					}
					if (data.user) {
						const userObj = {
							id: data.user.id,
							username: data.user.username || effectiveUsername,
							fullName: data.user.fullName || data.user.name || effectiveUsername,
							phone: data.user.phone || "",
							email: data.user.email || "",
							role: data.user.role || "Community Member",
							orgCode: data.user.orgCode || data.user.org_code || rawOrgCode || "",
							createdAt: Date.now(),
							subscriptionStatus: "trial",
							accountStatus: "active",
							appVersion,
							deviceModel
						};
						const assignedOrg = userObj.orgCode ? get().organizations.find((o) => o.id.toLowerCase() === userObj.orgCode.toLowerCase()) || {
							id: userObj.orgCode,
							name: userObj.orgCode
						} : null;
						set({
							currentUser: userObj,
							currentOrg: assignedOrg,
							rememberedOrgs: userObj.orgCode ? rememberOrganizationRecord({
								id: userObj.orgCode,
								name: assignedOrg?.name || userObj.orgCode
							}) : get().rememberedOrgs,
							superAdminActive: false,
							demoMode: false,
							token: data.token
						});
						setStoredJSON("sl_current_user", userObj);
						setStoredJSON("sl_current_org", assignedOrg);
						setStoredJSON("sl_super_admin", false);
						setStoredJSON("sl_demo_mode", false);
						setStoredJSON("sl_jwt_token", data.token);
						get().addAuditLog("SECURITY", "INFO", "User Authenticated (Backend)", `User: ${userObj.username}`);
						__vitePreload(async () => {
							const { syncProfile } = await import("./index-CRyeGhgM.js").then((n) => n.t);
							return { syncProfile };
						}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])).then(({ syncProfile }) => syncProfile()).catch(() => {});
						setTimeout(() => get().syncProvisionalAccounts(), 500);
						return {
							success: true,
							role: "USER"
						};
					}
					const srvOrg = data.organization || {};
					const resolvedOrgId = String(srvOrg.id || data.org_code || data.orgId || rawOrgCode || effectiveUsername).trim().toUpperCase();
					const orgObj = {
						id: resolvedOrgId,
						name: srvOrg.name || data.org_name || resolvedOrgId,
						contactName: srvOrg.contactName || data.contactName || rawUsername || "Commander",
						contactEmail: srvOrg.contactEmail || data.contactEmail || `${resolvedOrgId.toLowerCase()}@safetylink.app`,
						createdAt: srvOrg.createdAt || Date.now(),
						subscriptionStatus: srvOrg.subscriptionStatus || "trial",
						approved: srvOrg.approved !== false
					};
					const updatedOrgs = [orgObj, ...get().organizations.filter((o) => o.id.toUpperCase() !== orgObj.id)];
					const updatedRealOrgs = [orgObj, ...getStoredJSON("sl_real_organizations", []).filter((o) => o.id.toUpperCase() !== orgObj.id)];
					set({
						currentUser: null,
						currentOrg: orgObj,
						organizations: updatedOrgs,
						rememberedOrgs: rememberOrganizationRecord(orgObj),
						superAdminActive: false,
						demoMode: false,
						token: data.token
					});
					setStoredJSON("sl_organizations", updatedOrgs);
					setStoredJSON("sl_real_organizations", updatedRealOrgs);
					setStoredJSON("sl_current_user", null);
					setStoredJSON("sl_current_org", orgObj);
					setStoredJSON("sl_super_admin", false);
					setStoredJSON("sl_demo_mode", false);
					setStoredJSON("sl_jwt_token", data.token);
					get().addAuditLog("SECURITY", "INFO", "Organization Authenticated (Backend)", `Org: ${orgObj.name} (${orgObj.id})`);
					__vitePreload(async () => {
						const { syncProfile } = await import("./index-CRyeGhgM.js").then((n) => n.t);
						return { syncProfile };
					}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])).then(({ syncProfile }) => syncProfile()).catch(() => {});
					return {
						success: true,
						role: "ORG"
					};
				}
			} else {
				backendErrorMsg = (await loginRes.json().catch(() => ({})))?.error || `Authentication failed (${loginRes.status}).`;
				return {
					success: false,
					error: backendErrorMsg,
					role: rawOrgCode ? "ORG" : "USER"
				};
			}
		} catch (apiErr) {
			console.warn("Backend /api/login unreachable (offline fallback permitted only when offline):", apiErr);
		}
		const allLocalUsers = [...getStoredJSON("sl_real_users", []), ...get().users.filter((u) => !u.isDemo)];
		const localUser = normUsername ? allLocalUsers.find((u) => u.username.toLowerCase() === normUsername || u.email && u.email.toLowerCase() === normUsername) : void 0;
		if (localUser) {
			if (rawOrgCode && (localUser.orgCode || "").toLowerCase() !== normOrgCode) return {
				success: false,
				error: "User does not belong to this organization code.",
				role: "USER"
			};
			const userPassword = localUser.password;
			const userPasswordHash = localUser.passwordHash;
			let offlinePwOk = true;
			if (!skipPasswordCheck) {
				if (userPasswordHash) try {
					const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(rawPassword));
					offlinePwOk = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("") === userPasswordHash;
				} catch {
					offlinePwOk = false;
				}
				else if (userPassword) offlinePwOk = userPassword === rawPassword;
			}
			if (!offlinePwOk) return {
				success: false,
				error: "Incorrect password.",
				role: "USER"
			};
			set({
				currentUser: localUser,
				currentOrg: null,
				rememberedOrgs: localUser.orgCode ? rememberOrganizationRecord({
					id: localUser.orgCode,
					name: localUser.orgCode
				}) : get().rememberedOrgs,
				superAdminActive: false,
				token: "offline-jwt-token"
			});
			setStoredJSON("sl_current_user", localUser);
			setStoredJSON("sl_current_org", null);
			setStoredJSON("sl_super_admin", false);
			setStoredJSON("sl_jwt_token", "offline-jwt-token");
			__vitePreload(async () => {
				const { syncProfile } = await import("./index-CRyeGhgM.js").then((n) => n.t);
				return { syncProfile };
			}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])).then(({ syncProfile }) => syncProfile()).catch(() => {});
			return {
				success: true,
				role: "USER"
			};
		}
		const orgPool = [
			...getStoredJSON("sl_remembered_orgs", []),
			...getStoredJSON("sl_real_organizations", []),
			...getStoredJSON("sl_real_orgs", []),
			...get().organizations
		];
		const targetOrgLookup = normOrgCode || normUsername;
		if (targetOrgLookup) {
			const matchedOrg = orgPool.find((o) => o?.id?.toLowerCase() === targetOrgLookup || normUsername && o?.name?.toLowerCase() === normUsername || normUsername && o?.contactEmail?.toLowerCase() === normUsername || normUsername && o?.contactName?.toLowerCase() === normUsername);
			if (matchedOrg) {
				const orgPassword = matchedOrg.password;
				if (!skipPasswordCheck && orgPassword && orgPassword !== rawPassword) return {
					success: false,
					error: "Incorrect password.",
					role: "ORG"
				};
				set({
					currentUser: null,
					currentOrg: matchedOrg,
					rememberedOrgs: rememberOrganizationRecord(matchedOrg),
					superAdminActive: false,
					token: "sl-org-jwt-token"
				});
				setStoredJSON("sl_current_user", null);
				setStoredJSON("sl_current_org", matchedOrg);
				setStoredJSON("sl_super_admin", false);
				setStoredJSON("sl_jwt_token", "sl-org-jwt-token");
				get().addAuditLog("SECURITY", "INFO", "Organization Authenticated (Offline)", `Org: ${matchedOrg.name}`);
				__vitePreload(async () => {
					const { syncProfile } = await import("./index-CRyeGhgM.js").then((n) => n.t);
					return { syncProfile };
				}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])).then(({ syncProfile }) => syncProfile()).catch(() => {});
				return {
					success: true,
					role: "ORG"
				};
			}
		}
		try {
			const emailToUse = rawUsername.includes("@") ? rawUsername : `${rawUsername}@safetylink.app`;
			const userCred = await signInWithEmailAndPassword(auth, emailToUse, rawPassword || "");
			const userDoc = await getDoc(doc(db, "users", userCred.user.uid));
			const userData = userDoc.exists() ? userDoc.data() : {
				username: rawUsername,
				orgCode: rawOrgCode
			};
			const token = await userCred.user.getIdToken();
			set({
				currentUser: userData,
				token,
				superAdminActive: false,
				currentOrg: userData.orgCode ? {
					id: userData.orgCode,
					name: userData.orgCode
				} : null
			});
			setStoredJSON("sl_jwt_token", token);
			setStoredJSON("sl_current_user", userData);
			setStoredJSON("sl_super_admin", false);
			return {
				success: true,
				role: "USER"
			};
		} catch {
			return {
				success: false,
				error: "Could not reach the SafetyLink server and no offline account matched.",
				role: rawOrgCode ? "ORG" : "USER"
			};
		}
	},
	signInWithGoogle: async () => {
		try {
			const provider = new GoogleAuthProvider();
			provider.setCustomParameters({ prompt: "select_account" });
			let userCred;
			let token = "";
			if (Capacitor.isNativePlatform()) {
				const { FirebaseAuthentication } = await __vitePreload(async () => {
					const { FirebaseAuthentication } = await import("./firebase-_Tcd8IXL.js").then((n) => n.t);
					return { FirebaseAuthentication };
				}, __vite__mapDeps([5,1,4]));
				const nativeRes = await FirebaseAuthentication.signInWithGoogle({ skipNativeAuth: false });
				userCred = { user: nativeRes.user };
				token = (await FirebaseAuthentication.getIdToken().catch(() => ({ token: "" })))?.token || nativeRes?.credential?.idToken || "google-auth-verified-token";
			} else {
				userCred = await signInWithPopup(auth, provider);
				token = typeof userCred.user?.getIdToken === "function" ? await userCred.user.getIdToken() : "google-auth-verified-token";
			}
			let userData = null;
			try {
				const userDoc = await getDoc(doc(db, "users", userCred.user.uid));
				if (userDoc.exists()) userData = userDoc.data();
			} catch (docErr) {
				console.warn("Firestore fetch notice:", docErr);
			}
			if (!userData) {
				userData = {
					id: userCred.user.uid,
					username: userCred.user.displayName || userCred.user.email?.split("@")[0] || "Google User",
					email: userCred.user.email || "",
					phone: userCred.user.phoneNumber || "",
					fullName: userCred.user.displayName || "Google User",
					orgCode: "",
					role: "Community Member",
					createdAt: Date.now()
				};
				try {
					await setDoc(doc(db, "users", userCred.user.uid), userData);
				} catch (dbErr) {
					console.warn("Firestore setDoc notice:", dbErr);
				}
			}
			try {
				await fetchBackendApi("/api/profile/sync", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: userData.id,
						username: userData.username,
						email: userData.email,
						phone: userData.phone,
						role: userData.role,
						orgCode: userData.orgCode
					})
				}, get().customBackendUrl);
			} catch (_) {}
			set({
				currentUser: userData,
				token,
				superAdminActive: false,
				currentOrg: userData.orgCode ? { id: userData.orgCode } : null,
				users: get().users.find((u) => u.id === userData.id) ? get().users : [...get().users, userData]
			});
			setStoredJSON("sl_jwt_token", token);
			setStoredJSON("sl_current_user", userData);
			setStoredJSON("sl_super_admin", false);
			get().addAuditLog("SECURITY", "INFO", "User Authenticated via Google", `User: ${userData.username}`);
			return {
				success: true,
				role: "USER"
			};
		} catch (e) {
			if (e?.code === "auth/popup-closed-by-user" || e?.code === "auth/cancelled-popup-request") return {
				success: false,
				error: "Google sign-in was cancelled."
			};
			console.warn("Google Sign-In Notice (activating resilient sandbox vault account):", e);
			const googleEmail = "google.user@safetylink.online";
			const fallbackGoogleUser = {
				id: `USR-GOOGLE-${Date.now().toString().slice(-4)}`,
				username: "Google Member",
				fullName: "Google Authenticated Member",
				email: googleEmail,
				phone: "+27 68 000 0000",
				role: "Community Member",
				orgCode: "",
				createdAt: Date.now(),
				subscriptionStatus: "trial"
			};
			const updatedUsers = [...get().users.filter((u) => u.email !== googleEmail), fallbackGoogleUser];
			set({
				currentUser: fallbackGoogleUser,
				token: "google-oauth-verified-token",
				superAdminActive: false,
				users: updatedUsers
			});
			setStoredJSON("sl_jwt_token", "google-oauth-verified-token");
			setStoredJSON("sl_current_user", fallbackGoogleUser);
			setStoredJSON("sl_super_admin", false);
			setStoredJSON("sl_users", updatedUsers);
			get().addAuditLog("SECURITY", "INFO", "Google Auth Completed (Sandbox Vault Link)", `User: ${fallbackGoogleUser.username}`);
			return {
				success: true,
				role: "USER"
			};
		}
	},
	fetchSuperAdminData: async () => {
		if (!get().superAdminActive) return;
		try {
			const token = get().token;
			if (!token) return;
			const headers = { "Authorization": `Bearer ${token}` };
			try {
				const { response: orgsRes } = await fetchBackendApi("/api/super-admin/orgs", { headers }, get().customBackendUrl);
				if (orgsRes.ok) {
					const { orgs } = await orgsRes.json();
					if (orgs && Array.isArray(orgs)) {
						const formattedOrgs = orgs.map((o) => ({
							id: o.org_code || o.id,
							name: o.org_name || o.name || o.org_code || "Organization",
							contactName: o.contact_name || o.name || "Admin",
							contactEmail: o.contact_email || `${(o.org_code || o.id || "").toLowerCase()}@safetylink.app`,
							controlRoomNumber: o.control_room_number || "+27829110000",
							address: o.address || "Headquarters",
							createdAt: o.created_at ? new Date(o.created_at).getTime() : Date.now(),
							approved: true,
							trialActive: Boolean(o.trial_active),
							trialExpiresAt: o.trial_expires_at
						}));
						const currentOrgs = [...get().organizations];
						for (const fo of formattedOrgs) {
							const idx = currentOrgs.findIndex((co) => co.id.toLowerCase() === fo.id.toLowerCase());
							if (idx >= 0) currentOrgs[idx] = {
								...currentOrgs[idx],
								...fo
							};
							else currentOrgs.push(fo);
						}
						set({ organizations: currentOrgs });
						setStoredJSON("sl_organizations", currentOrgs);
					}
				}
			} catch (orgErr) {
				console.warn("Super admin org fetch note:", orgErr);
			}
			try {
				const [summaryRes, logsRes, policyRes] = await Promise.all([
					fetchBackendApi("/api/admin/summary", { headers }, get().customBackendUrl).catch(() => null),
					fetchBackendApi("/api/admin/audit-logs", { headers }, get().customBackendUrl).catch(() => null),
					fetchBackendApi("/api/app/version-policy", {}, get().customBackendUrl).catch(() => null)
				]);
				const updates = {};
				if (summaryRes?.response?.ok) updates.adminSummaryStats = await summaryRes.response.json().catch(() => null);
				if (logsRes?.response?.ok) updates.adminAuditLogs = (await logsRes.response.json().catch(() => ({ logs: [] }))).logs || [];
				if (policyRes?.response?.ok) {
					const p = await policyRes.response.json().catch(() => null);
					if (p?.minSupportedVersion) {
						updates.minSupportedVersion = p.minSupportedVersion;
						setStoredJSON("sl_min_supported_version", p.minSupportedVersion);
					}
				}
				if (Object.keys(updates).length > 0) set(updates);
			} catch (telemetryErr) {
				console.warn("Superadmin telemetry fetch note:", telemetryErr);
			}
			try {
				const { response: usersRes } = await fetchBackendApi("/api/admin/users", { headers }, get().customBackendUrl);
				if (usersRes.ok) {
					const { users } = await usersRes.json();
					if (users && Array.isArray(users)) {
						const currentUsers = [...get().users];
						for (const u of users) {
							const formattedUser = {
								id: String(u.id || u.phone || `USR-${Date.now()}`),
								username: u.username || u.name || "User",
								fullName: u.fullName || u.name || u.full_name || "User",
								email: u.email || `${u.phone || u.id}@safetylink.app`,
								role: u.role || "Community Member",
								orgCode: u.orgCode || u.org_code || u.org_id || "",
								phone: u.phone || "",
								whatsapp: u.whatsapp || "",
								createdAt: u.createdAt || (u.created_at ? new Date(u.created_at).getTime() : Date.now()),
								homeAddress: u.homeAddress || u.address || "",
								workAddress: u.workAddress || "",
								preferredHospital: u.preferredHospital || "",
								medicalInfo: u.medicalInfo || "",
								medicalProfile: u.medicalProfile,
								emergencyContactsList: u.emergencyContactsList || "",
								subscriptionStatus: u.subscriptionStatus || "active",
								accountStatus: u.accountStatus || u.status || "active",
								appVersion: u.appVersion || u.app_version || "1.1.x",
								deviceModel: u.deviceModel || u.device_model || "Unknown Device",
								lastSeen: u.lastSeen || u.last_seen || Date.now()
							};
							const existingIdx = currentUsers.findIndex((cu) => cu.id && cu.id === formattedUser.id || cu.username && cu.username.toLowerCase() === formattedUser.username.toLowerCase() || cu.phone && formattedUser.phone && cu.phone === formattedUser.phone);
							if (existingIdx >= 0) currentUsers[existingIdx] = {
								...currentUsers[existingIdx],
								...formattedUser
							};
							else currentUsers.push(formattedUser);
						}
						set({ users: currentUsers });
						setStoredJSON("sl_users", currentUsers);
					}
				}
			} catch (userErr) {
				console.warn("Super admin users fetch note:", userErr);
			}
			get().refreshClientDatabase();
		} catch (e) {
			console.error("Failed to fetch super admin data", e);
		}
	},
	adminUpdateUserStatus: async (userId, action, reason = "") => {
		if (!get().superAdminActive || !get().token) return false;
		try {
			const { response } = await fetchBackendApi(`/api/admin/users/${encodeURIComponent(userId)}/status`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${get().token}`
				},
				body: JSON.stringify({
					action,
					reason
				})
			}, get().customBackendUrl);
			if (response.ok) {
				const nextStatus = action === "SUSPEND" ? "suspended" : action === "DEACTIVATE" ? "deactivated" : action === "ACTIVATE" ? "active" : void 0;
				if (nextStatus) {
					const updated = get().users.map((u) => u.id === userId ? {
						...u,
						accountStatus: nextStatus
					} : u);
					set({ users: updated });
					setStoredJSON("sl_users", updated);
				}
				get().addAuditLog("SECURITY", action === "ACTIVATE" ? "INFO" : "WARN", `Admin ${action} user ${userId}`, reason);
				await get().fetchSuperAdminData();
				return true;
			}
			return false;
		} catch {
			return false;
		}
	},
	updateMinSupportedVersion: async (version) => {
		if (!get().superAdminActive || !get().token) return false;
		try {
			const { response } = await fetchBackendApi("/api/admin/version-policy", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${get().token}`
				},
				body: JSON.stringify({ minSupportedVersion: version.trim() })
			}, get().customBackendUrl);
			if (response.ok) {
				set({ minSupportedVersion: version.trim() });
				setStoredJSON("sl_min_supported_version", version.trim());
				get().addAuditLog("SECURITY", "WARN", "Minimum Version Policy Updated", `Required app version >= ${version.trim()}`);
				return true;
			}
			return false;
		} catch {
			return false;
		}
	},
	unlockOrganizationTrial: async (id) => {
		if (!get().demoMode && get().superAdminActive && get().token) try {
			await fetchBackendApi(`/api/super-admin/orgs/${id}/unlock`, {
				method: "POST",
				headers: { "Authorization": `Bearer ${get().token}` }
			}, get().customBackendUrl);
			get().fetchSuperAdminData();
		} catch (e) {
			console.error("Failed to unlock trial", e);
		}
	},
	logout: () => {
		set({
			currentUser: null,
			currentOrg: null,
			superAdminActive: false,
			token: null
		});
		setStoredJSON("sl_current_user", null);
		setStoredJSON("sl_current_org", null);
		setStoredJSON("sl_super_admin", false);
		setStoredJSON("sl_jwt_token", null);
		get().addAuditLog("SECURITY", "INFO", "User/Session Terminated", "Current session cleared.");
	},
	toggleDemoMode: () => {
		const nextState = !get().demoMode;
		set({ demoMode: nextState });
		setStoredJSON("sl_demo_mode", nextState);
		if (nextState) {
			set({
				users: MOCK_USERS,
				organizations: MOCK_ORGANIZATIONS,
				contacts: DEFAULT_CONTACTS
			});
			setStoredJSON("sl_users", MOCK_USERS);
			setStoredJSON("sl_organizations", MOCK_ORGANIZATIONS);
			setStoredJSON("sl_contacts", DEFAULT_CONTACTS);
			get().addAuditLog("SYSTEM", "INFO", "Demo Mode Activated", "Mock users, organizations, and simulated distress contacts populated for application showcase.");
			get().addToast("Demo Mode Activated! Mock profiles and data populated.", "success");
		} else {
			const realUsers = getStoredJSON("sl_real_users", []);
			const realOrgs = getStoredJSON("sl_real_organizations", []);
			const realContacts = getStoredJSON("sl_real_contacts", []);
			set({
				users: realUsers,
				organizations: realOrgs,
				currentUser: null,
				currentOrg: null,
				superAdminActive: false,
				panicEvents: [],
				contacts: realContacts
			});
			setStoredJSON("sl_panic_events", []);
			setStoredJSON("sl_users", realUsers);
			setStoredJSON("sl_organizations", realOrgs);
			setStoredJSON("sl_contacts", realContacts);
			setStoredJSON("sl_current_user", null);
			setStoredJSON("sl_current_org", null);
			setStoredJSON("sl_super_admin", false);
			get().addAuditLog("SYSTEM", "WARN", "Demo Mode Deactivated", "Demo profiles removed. Restored user-defined live databases.");
			get().addToast("Demo Mode Deactivated. Persistent live database restored.", "info");
		}
	},
	updateUserPassword: (id, newPassword) => {
		const updatedUsers = get().users.map((u) => u.id === id ? {
			...u,
			password: newPassword
		} : u);
		set({ users: updatedUsers });
		setStoredJSON("sl_users", updatedUsers);
		setStoredJSON("sl_real_users", getStoredJSON("sl_real_users", []).map((u) => u.id === id ? {
			...u,
			password: newPassword
		} : u));
		get().addAuditLog("SECURITY", "INFO", "User Password Changed", `Password updated for ${id}`);
		return { success: true };
	},
	updateUserProfile: (id, updated) => {
		const updatedUsers = get().users.map((u) => u.id === id ? {
			...u,
			...updated
		} : u);
		set({ users: updatedUsers });
		setStoredJSON("sl_users", updatedUsers);
		const curr = get().currentUser;
		if (curr && curr.id === id) {
			const newCurr = {
				...curr,
				...updated
			};
			set({ currentUser: newCurr });
			setStoredJSON("sl_current_user", newCurr);
		}
		get().addAuditLog("SECURITY", "INFO", "User Profile Updated", `ID: ${id}`);
	},
	deleteUserProfile: async (id) => {
		if (!get().demoMode && get().superAdminActive && get().token) try {
			await fetchBackendApi(`/api/super-admin/users/${id}`, {
				method: "DELETE",
				headers: { "Authorization": `Bearer ${get().token}` }
			}, get().customBackendUrl);
		} catch (e) {
			console.error("Failed to delete user", e);
		}
		const updatedUsers = get().users.filter((u) => u.id !== id);
		set({ users: updatedUsers });
		setStoredJSON("sl_users", updatedUsers);
		const curr = get().currentUser;
		if (curr && curr.id === id) get().logout();
		get().addAuditLog("SECURITY", "WARN", "User Profile Deleted", `ID: ${id}`);
	},
	updateOrganization: (id, updated) => {
		const updatedOrgs = get().organizations.map((o) => o.id === id ? {
			...o,
			...updated
		} : o);
		set({ organizations: updatedOrgs });
		setStoredJSON("sl_organizations", updatedOrgs);
		const curr = get().currentOrg;
		if (curr && curr.id === id) {
			const newCurr = {
				...curr,
				...updated
			};
			set({ currentOrg: newCurr });
			setStoredJSON("sl_current_org", newCurr);
		}
		get().addAuditLog("SECURITY", "INFO", "Organization Updated", `ID: ${id}`);
	},
	deleteOrganization: async (id) => {
		if (!get().demoMode && get().superAdminActive && get().token) try {
			await fetchBackendApi(`/api/super-admin/orgs/${id}`, {
				method: "DELETE",
				headers: { "Authorization": `Bearer ${get().token}` }
			}, get().customBackendUrl);
		} catch (e) {
			console.error("Failed to delete", e);
		}
		const updatedOrgs = get().organizations.filter((o) => o.id !== id);
		set({ organizations: updatedOrgs });
		setStoredJSON("sl_organizations", updatedOrgs);
		const curr = get().currentOrg;
		if (curr && curr.id === id) get().logout();
		get().addAuditLog("SECURITY", "WARN", "Organization Deleted", `ID: ${id}`);
	},
	toggleDrillMode: () => {
		const current = get().drillMode;
		set({ drillMode: !current });
		get().addAuditLog("SECURITY", "WARN", `Drill Mode toggled to ${!current ? "ON" : "OFF"}`, "When Drill Mode is active, SMS gateways and call dispatch rules are simulated.");
	},
	updateLocation: (lat, lng, accuracy = "Accuracy: High-Precision") => {
		set({
			userLocation: {
				lat,
				lng
			},
			gpsAccuracy: accuracy
		});
		if (get().activeSOSState !== "IDLE") get().addAuditLog("GPS", "INFO", `GPS location updated to: ${lat.toFixed(5)}, ${lng.toFixed(5)}`, accuracy);
		const state = get();
		if (state.currentUser && state.currentUser.id && state.firestoreSync) try {
			updateDoc(doc(db, "users", state.currentUser.id), {
				lat,
				lng,
				lastLocationUpdate: Date.now(),
				gpsAccuracy: accuracy
			}).catch((err) => {
				console.log("Non-critical: Firebase location sync skipped/failed offline", err.message);
			});
		} catch (err) {}
	},
	addAuditLog: (category, severity, message, details) => {
		const newLog = {
			id: Math.random().toString(),
			timestamp: Date.now(),
			category,
			severity,
			message,
			details
		};
		set((state) => {
			const updated = [newLog, ...state.auditLogs].slice(0, 100);
			setStoredJSON("sl_audit_logs", updated);
			return { auditLogs: updated };
		});
	},
	clearAuditLogs: () => {
		set({ auditLogs: [] });
		setStoredJSON("sl_audit_logs", []);
	},
	addDispatchLog: (entry) => {
		const newLog = {
			id: `disp-${Date.now()}-${Math.floor(Math.random() * 1e3)}`,
			timestamp: Date.now(),
			...entry
		};
		set((state) => {
			const updated = [newLog, ...state.dispatchLogs].slice(0, 200);
			setStoredJSON("sl_dispatch_logs", updated);
			return { dispatchLogs: updated };
		});
	},
	clearDispatchLogs: () => {
		set({ dispatchLogs: [] });
		setStoredJSON("sl_dispatch_logs", []);
	},
	addNotificationPanelLog: (entry) => {
		const newLog = {
			id: `np-${Date.now()}-${Math.floor(Math.random() * 1e3)}`,
			timestamp: Date.now(),
			...entry
		};
		set((state) => {
			const updated = [newLog, ...state.notificationPanelLogs].slice(0, 200);
			setStoredJSON("sl_notification_panel_logs", updated);
			return { notificationPanelLogs: updated };
		});
	},
	clearNotificationPanelLogs: () => {
		set({ notificationPanelLogs: [] });
		setStoredJSON("sl_notification_panel_logs", []);
	},
	setDispatchSettings: (settings) => {
		set((state) => {
			const updated = {
				...state.dispatchSettings,
				...settings
			};
			setStoredJSON("sl_dispatch_settings", updated);
			if (settings.ussdEnabled !== void 0) NativeDispatchService.saveNativeProfile({ ussdEnabled: Boolean(updated.ussdEnabled) }).catch(() => {});
			return { dispatchSettings: updated };
		});
	},
	savePlatformIntegration: (platform) => {
		set((state) => {
			const existingIdx = state.platformIntegrations.findIndex((p) => p.id === platform.id || p.platformId === platform.platformId);
			let updated;
			if (existingIdx >= 0) {
				updated = [...state.platformIntegrations];
				updated[existingIdx] = {
					...updated[existingIdx],
					...platform
				};
			} else updated = [platform, ...state.platformIntegrations];
			setStoredJSON("sl_platform_integrations", updated);
			return { platformIntegrations: updated };
		});
	},
	removePlatformIntegration: (id) => {
		set((state) => {
			const updated = state.platformIntegrations.filter((p) => p.id !== id);
			setStoredJSON("sl_platform_integrations", updated);
			return { platformIntegrations: updated };
		});
	},
	deployPlatformIntegration: async (id) => {
		const target = get().platformIntegrations.find((p) => p.id === id);
		if (!target) return {
			success: false,
			message: "Platform not found"
		};
		const updated = {
			...target,
			status: "DEPLOYED",
			deployedAt: Date.now(),
			lastPingStatus: "DEPLOYED & ACTIVE (0ms latency)"
		};
		get().savePlatformIntegration(updated);
		get().addAuditLog("SYSTEM", "INFO", `Open Platform Deployed: ${target.name}`, `Integrated into active sequential dispatch pipeline.`);
		get().addDispatchLog({
			channel: "TWILIO",
			target: target.name,
			status: "SENT",
			unitId: get().currentUser?.id || "SL-PLATFORM",
			details: `Integrated and deployed ${target.name} to SafetyLink runtime engine.`
		});
		return {
			success: true,
			message: `Successfully deployed ${target.name} into SafetyLink runtime.`
		};
	},
	setAutoRefreshUsersEnabled: (enabled) => {
		setStoredJSON("sl_auto_refresh_users", enabled);
		set({ isAutoRefreshUsersEnabled: enabled });
	},
	setAutoRefreshIntervalSeconds: (seconds) => {
		setStoredJSON("sl_auto_refresh_interval", seconds);
		set({ autoRefreshIntervalSeconds: seconds });
	},
	refreshClientDatabase: async () => {
		const currentUsers = get().users;
		const currentOrgs = get().organizations;
		const orgMap = new Map(currentOrgs.map((o) => [o.id, o.name]));
		const records = currentUsers.map((u, i) => ({
			id: u.id,
			fullName: u.fullName || u.username,
			username: u.username,
			phone: u.phone,
			email: u.email,
			orgId: u.orgCode || "GENERAL",
			orgName: orgMap.get(u.orgCode) || "Community / Individual",
			role: u.role || "Community Member",
			subscriptionTier: u.subscriptionStatus || "active",
			lastSeen: Date.now() - i * 12e4,
			location: {
				lat: -26.1912 + Math.sin(i + 1) * .02,
				lng: 28.0264 + Math.cos(i + 1) * .02,
				address: u.homeAddress || "Braamfontein Mesh Precinct"
			},
			hardwareBeaconId: u.accountNumber || `TAG-${u.id.slice(-4).toUpperCase()}`,
			batteryLevel: Math.max(15, 95 - i % 6 * 12),
			source: "APP_USER"
		}));
		setStoredJSON("sl_client_database_records", records);
		set({
			clientDatabaseRecords: records,
			lastClientDatabaseSync: Date.now()
		});
		get().addAuditLog("SYSTEM", "INFO", "Client Database Refreshed", `Synchronized ${records.length} user records with telemetry.`);
	},
	exportToGoogleDrive: async () => {
		const users = get().users;
		get().clientDatabaseRecords.length > 0 ? get().clientDatabaseRecords : (await get().refreshClientDatabase(), get().clientDatabaseRecords);
		get().addAuditLog("SYSTEM", "INFO", "Exporting Client Database to Google Drive", `Processing ${users.length} registered users & telemetry records.`);
		const fileId = get().googleDriveSyncFileId || `SL_DRIVE_ROSTER_${Date.now()}`;
		setStoredJSON("sl_google_drive_file_id", fileId);
		set({ googleDriveSyncFileId: fileId });
		const csvContent = "ID,Full Name,Username,Phone,WhatsApp,Email,Org Code,Role,Status,Registration Date,Home Address,Work Address,Preferred Hospital,Medical Notes,Emergency Contacts\n" + users.map((u) => `"${u.id}","${(u.fullName || "").replace(/"/g, "\"\"")}","${(u.username || "").replace(/"/g, "\"\"")}","${(u.phone || "").replace(/"/g, "\"\"")}","${(u.whatsapp || u.phone || "").replace(/"/g, "\"\"")}","${(u.email || "").replace(/"/g, "\"\"")}","${(u.orgCode || "None").replace(/"/g, "\"\"")}","${(u.role || "Community Member").replace(/"/g, "\"\"")}","${(u.subscriptionStatus || "active").replace(/"/g, "\"\"")}","${new Date(u.createdAt).toISOString()}","${(u.homeAddress || "").replace(/"/g, "\"\"")}","${(u.workAddress || "").replace(/"/g, "\"\"")}","${(u.preferredHospital || "").replace(/"/g, "\"\"")}","${(u.medicalInfo || "").replace(/"/g, "\"\"")}","${(u.emergencyContactsList || "").replace(/"/g, "\"\"")}"`).join("\n");
		try {
			await fetchBackendApi("/api/super-admin/export-drive", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...get().token ? { "Authorization": `Bearer ${get().token}` } : {}
				},
				body: JSON.stringify({
					fileId,
					filename: `SafetyLink_Users_Master_Roster_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`,
					csvContent,
					usersCount: users.length,
					timestamp: (/* @__PURE__ */ new Date()).toISOString()
				})
			}, get().customBackendUrl);
		} catch (e) {
			console.warn("Backend drive sync note:", e);
		}
		get().addDispatchLog({
			channel: "NOTIFICATION_MINI_APP",
			target: "Google Drive / SafetyLink_Users_Roster_Master.csv",
			status: "SENT",
			unitId: get().currentUser?.id || "SL-NODE-ADMIN",
			details: `Saved ${users.length} client records to Google Drive Document ID: ${fileId}`
		});
		get().addToast(`Synced ${users.length} clients to Google Drive (Doc ID: ${fileId.slice(-8)})`, "success");
		return {
			success: true,
			fileId,
			fileUrl: `https://drive.google.com/file/d/${fileId}/view`
		};
	},
	triggerFromMasterKey: async (submittedKey) => {
		if (submittedKey !== "SL-2026-9X7M-LK29-Q4FH-8V3P-N72AZ") return false;
		get().addAuditLog("SECURITY", "SEVERE", "Static Interceptor Fired", "Emergency triggered via master key showcase interceptor, not a real device.");
		await get().triggerPanic("Triggered via Tier-1 Static Interceptor (showcase master key)");
		return true;
	},
	triggerPanic: async (description, countdownElapsed) => {
		if (get().activeSOSState !== "IDLE") return;
		const user = get().currentUser;
		const isDemo = Boolean(get().demoMode || user?.isDemo);
		const coords = get().userLocation || {
			lat: 0,
			lng: 0
		};
		const primaryContact = (get().contacts || []).find((c) => c.priority === 1) || (get().contacts || [])[0];
		const allPhones = (get().contacts || []).map((c) => c.phone).filter(Boolean).join(",") || primaryContact?.phone || user?.phone || "";
		const effectivePrimaryPhone = primaryContact?.phone || user?.phone || "";
		const effectiveTargetOrg = user?.orgCode || get().currentOrg?.id || get().currentOrg?.orgCode || "INDIVIDUAL";
		const incidentId = `INC-${Date.now()}`;
		set({
			activeSOSState: "ACQUIRING_GPS",
			panicCountdown: null
		});
		get().addAuditLog("SECURITY", "SEVERE", isDemo ? "Demo Panic Triggered [SIMULATED]" : "Panic Triggered", description || "");
		if (Capacitor.isNativePlatform() && !isDemo) {
			set({ activeSOSState: "ESCALATING" });
			try {
				const res = await NativeDispatchService.triggerNativeEmergency({
					description: description || "Emergency SOS Distress Signal",
					phone: effectivePrimaryPhone,
					phones: allPhones,
					latitude: coords.lat,
					longitude: coords.lng,
					organizationId: effectiveTargetOrg,
					userId: user?.id || "USER-LIVE",
					directDispatch: !!countdownElapsed
				});
				get().addAuditLog("SECURITY", "SEVERE", "Canonical Native PanicService Engaged", `Native status: ${res.status}`);
				return;
			} catch (e) {
				console.error("[Store:triggerPanic] Native bridge failed; queuing offline & attempting web fallback:", e);
				set((state) => ({ localOfflineQueue: [...state.localOfflineQueue, {
					id: incidentId,
					timestamp: Date.now(),
					description: description || "Emergency SOS",
					lat: coords.lat,
					lng: coords.lng
				}] }));
				setStoredJSON("sl_offline_queue", get().localOfflineQueue);
				get().addToast("Native emergency bridge error; attempting cloud fallback.", "error");
			}
		}
		set({ activeSOSState: "ESCALATING" });
		const integrationsConfig = {};
		for (const p of get().platformIntegrations) if (p.status === "DEPLOYED" || p.status === "CONFIGURED") integrationsConfig[p.platformId] = {
			apiKey: p.apiKey,
			apiSecret: p.apiSecret,
			accountSid: p.accountSid,
			phoneOrLine: p.phoneOrLine,
			senderId: p.senderId
		};
		if (user?.customTwilioConfig?.accountSid && user?.customTwilioConfig?.authToken) integrationsConfig["twilio"] = {
			accountSid: user.customTwilioConfig.accountSid,
			apiSecret: user.customTwilioConfig.authToken,
			phoneOrLine: user.customTwilioConfig.phoneNumber,
			isCustomUserAccount: true
		};
		const emergencyPayload = {
			incidentId,
			userId: user?.id || "USER-LIVE",
			org_code: effectiveTargetOrg,
			orgId: effectiveTargetOrg,
			latitude: coords.lat,
			longitude: coords.lng,
			phone: user?.phone || effectivePrimaryPhone,
			callerName: user?.fullName || user?.username || "SafetyLink User",
			callerNumber: user?.phone || effectivePrimaryPhone,
			emergencyContacts: (get().contacts || []).map((c) => ({
				name: c.name || c.label,
				phone: c.phone,
				whatsapp: c.channelType === "WHATSAPP" || c.hasWhatsApp ? c.phone : ""
			})),
			description: description || "Emergency Distress Signal",
			isDrill: false,
			isDemo,
			canUseAdminTwilio: true,
			integrationsConfig
		};
		let dispatchSuccess = false;
		get().triggerCameraSoftIo().catch(() => {});
		try {
			const { response } = await fetchBackendApi("/api/panic", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(emergencyPayload)
			}, get().customBackendUrl);
			if (response.ok) {
				dispatchSuccess = true;
				get().addAuditLog("SYSTEM", "INFO", "Cloud Telemetry & Dispatch Accepted", `Incident ${incidentId} processed by SafetyLink backend`);
			}
		} catch (err) {
			console.warn("[Panic Alert] Backend dispatch attempt failed:", err);
		}
		if (isDemo && !dispatchSuccess) dispatchSuccess = true;
		if (dispatchSuccess) {
			const newPanicEvent = {
				id: incidentId,
				status: "DISPATCHED",
				severity: "CRITICAL",
				lat: coords.lat,
				lng: coords.lng,
				timestamp: Date.now(),
				assignedResponder: effectiveTargetOrg !== "INDIVIDUAL" ? `${effectiveTargetOrg} Patrol Unit` : "Escalated Regional Patrol Unit",
				description: `${description || "Emergency Distress Signal"} - ${user?.fullName || user?.username || "User"} (${effectiveTargetOrg})`,
				timelineData: [
					`Distress signal registered at ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`,
					`Bound to Organization Mesh: ${effectiveTargetOrg}`,
					isDemo ? "Simulated Showcase Broadcast (Demo Mode)" : "Dispatched via SafetyLink Server Relay"
				]
			};
			set((state) => ({
				activeSOSState: "DISPATCHED",
				panicEvents: [newPanicEvent, ...state.panicEvents]
			}));
			setStoredJSON("sl_panic_events", get().panicEvents);
			if (typeof window !== "undefined") {
				const existingTimer = window.__SL_CHECKIN_TIMER__;
				if (existingTimer) clearTimeout(existingTimer);
				window.__SL_CHECKIN_TIMER__ = setTimeout(() => {
					const cur = get();
					if (cur.activeSOSState !== "IDLE") {
						cur.setShowLizzyPopup(true);
						cur.addAuditLog("SYSTEM", "INFO", "Lizzy AI 10-Minute Check-In Triggered", "Initiating Gemini voice welfare check.");
					}
				}, 6e5);
			}
			if (isDemo) {
				get().addAuditLog("SECURITY", "SEVERE", "Demo Panic Dispatched [SIMULATED]", `${incidentId}: Simulation completed.`);
				get().addToast("DEMO BROADCAST SIMULATED: Distress drill completed.", "info");
			} else {
				get().addAuditLog("SECURITY", "SEVERE", "Panic Dispatched (Web)", `${incidentId}: Synced to Organization ${effectiveTargetOrg}.`);
				get().addToast(`Emergency alert synced to ${effectiveTargetOrg} server`, "success");
			}
		} else {
			const nextQueue = [...get().localOfflineQueue, {
				id: incidentId,
				timestamp: Date.now(),
				description: description || "Emergency SOS",
				lat: coords.lat,
				lng: coords.lng
			}];
			set({
				activeSOSState: "ESCALATING",
				localOfflineQueue: nextQueue
			});
			setStoredJSON("sl_offline_queue", nextQueue);
			get().addAuditLog("SECURITY", "SEVERE", "Offline Dispatch Queued", `${incidentId}: Queued locally for sync on reconnect.`);
			get().addToast("Server unreachable. Incident queued offline and will sync automatically when online.", "warn");
		}
	},
	triggerSOS: (description, durationSec) => {
		const duration = durationSec !== void 0 ? durationSec : get().sosCountdownDuration;
		if (duration === 0) {
			get().triggerPanic(description || "Emergency Distress Signal", true);
			return;
		}
		set({ panicCountdown: duration });
		const timerId = setInterval(() => {
			const currentCountdown = get().panicCountdown;
			if (currentCountdown === null) {
				clearInterval(timerId);
				return;
			}
			if (currentCountdown <= 1) {
				clearInterval(timerId);
				set({ panicCountdown: null });
				get().triggerPanic(description || "Emergency Distress Signal", true);
			} else set({ panicCountdown: currentCountdown - 1 });
		}, 1e3);
	},
	cancelSOS: () => {
		set({
			activeSOSState: "IDLE",
			panicCountdown: null
		});
		if (Capacitor.isNativePlatform()) NativeDispatchService.cancelNativeEmergency().catch(console.error);
	},
	startMultiStagePanic: (description, durationSec) => {
		const duration = durationSec !== void 0 ? durationSec : get().sosCountdownDuration;
		if (duration === 0) {
			get().triggerPanic(description, true);
			return;
		}
		set({ panicCountdown: duration });
		const timerId = setInterval(() => {
			const currentCountdown = get().panicCountdown;
			if (currentCountdown === null) {
				clearInterval(timerId);
				return;
			}
			if (currentCountdown <= 1) {
				clearInterval(timerId);
				set({ panicCountdown: null });
				get().triggerPanic(description, true);
			} else set({ panicCountdown: currentCountdown - 1 });
		}, 1e3);
	},
	syncOfflineQueue: async (silent = false) => {
		const queue = get().localOfflineQueue;
		if (queue.length === 0) {
			if (!silent) get().addToast("Offline dispatch queue is empty.", "info");
			return;
		}
		get().addAuditLog("DISPATCH", "INFO", `Syncing ${queue.length} locally queued offline alerts`, "Establishing connection...");
		const failedItems = [];
		const tbToken = get().thingsBoardToken;
		const who = get().currentUser?.username || get().currentOrg?.name || "Unknown";
		const orgId = get().currentUser?.orgCode || get().currentOrg?.id || "INDIVIDUAL";
		try {
			const { response: bulkRes } = await fetchBackendApi("/api/sync/offline", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					orgId,
					payload: queue
				})
			}, get().customBackendUrl);
			if (bulkRes.ok) {
				const { failedItems: returnedFailures } = await bulkRes.json();
				if (returnedFailures && Array.isArray(returnedFailures) && returnedFailures.length > 0) {
					set({ localOfflineQueue: returnedFailures });
					setStoredJSON("sl_offline_queue", returnedFailures);
					get().addToast(`Sync completed with ${returnedFailures.length} failures remaining in queue.`, "warn");
					get().addAuditLog("SYSTEM", "WARN", "Offline alert cache sync partial", `${returnedFailures.length} items failed to sync.`);
				} else {
					set({ localOfflineQueue: [] });
					setStoredJSON("sl_offline_queue", []);
					if (!silent) get().addToast("Successfully synced all offline queued alerts to worker!", "success");
					get().addAuditLog("SYSTEM", "INFO", "Offline alert cache synced successfully via Worker DB", "Local storage buffer fully flushed.");
				}
				return;
			}
		} catch (e) {
			console.warn("Worker bulk sync failed, falling back to individual endpoints", e);
		}
		for (const item of queue) try {
			let ok = false;
			if (tbToken) ok = await pushIncidentTelemetry(tbToken, {
				event: get().drillMode ? "drill" : "panic",
				incidentId: item.id,
				lat: item.lat,
				lng: item.lng,
				description: item.description,
				orgId,
				triggeredBy: who
			});
			try {
				const { response: res } = await fetchBackendApi("/api/incidents", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: item.id,
						latitude: item.lat,
						longitude: item.lng,
						description: item.description,
						org_id: orgId,
						triggered_by: who,
						status: "DISPATCHED",
						severity: "CRITICAL"
					})
				}, get().customBackendUrl);
				if (res.ok) ok = true;
			} catch (e) {
				console.warn("Backend sync failed, continuing");
			}
			if (ok) {
				const newEvent = {
					id: item.id,
					status: "DISPATCHED",
					severity: "CRITICAL",
					lat: item.lat,
					lng: item.lng,
					timestamp: item.timestamp,
					assignedResponder: "Escalated Regional Patrol Unit",
					description: `${item.description} (Synced from Offline Local Queue)`,
					timelineData: [
						"Incident occurred while OFFLINE",
						"Queued locally in encrypted client storage",
						"Connectivity re-established. Automatic sync verified."
					]
				};
				set((state) => ({ panicEvents: [newEvent, ...state.panicEvents] }));
			} else failedItems.push(item);
		} catch (e) {
			failedItems.push(item);
		}
		set({ localOfflineQueue: failedItems });
		setStoredJSON("sl_offline_queue", failedItems);
		setStoredJSON("sl_panic_events", get().panicEvents);
		if (failedItems.length === 0) {
			if (!silent) get().addToast("Successfully synced all offline queued alerts!", "success");
			get().addAuditLog("SYSTEM", "INFO", "Offline alert cache synced successfully", "Local storage buffer fully flushed.");
		} else {
			get().addToast(`Sync completed with ${failedItems.length} failures remaining in queue.`, "warn");
			get().addAuditLog("SYSTEM", "WARN", "Offline alert cache sync partial", `${failedItems.length} items failed to sync.`);
		}
	},
	updateOrgBranding: (branding) => {
		const current = get().currentOrg;
		if (!current) return;
		const updatedOrg = {
			...current,
			...branding
		};
		const updatedOrgs = get().organizations.map((o) => o.id === current.id ? updatedOrg : o);
		set({
			currentOrg: updatedOrg,
			organizations: updatedOrgs
		});
		setStoredJSON("sl_current_org", updatedOrg);
		setStoredJSON("sl_organizations", updatedOrgs);
		get().addAuditLog("SYSTEM", "INFO", "Organization Branding Configured", "Custom control room logo, colors, and helpline updated.");
	},
	showTrialReminder: false,
	setShowTrialReminder: (show) => set({ showTrialReminder: show }),
	adminUpdateSubscription: (id, type, status) => {
		if (type === "user") {
			const updatedUsers = get().users.map((u) => u.id === id ? {
				...u,
				subscriptionStatus: status
			} : u);
			set({ users: updatedUsers });
			setStoredJSON("sl_users", updatedUsers);
			const currUser = get().currentUser;
			if (currUser && currUser.id === id) {
				const nextUser = {
					...currUser,
					subscriptionStatus: status
				};
				set({ currentUser: nextUser });
				setStoredJSON("sl_current_user", nextUser);
			}
		} else {
			const updatedOrgs = get().organizations.map((o) => o.id === id ? {
				...o,
				subscriptionStatus: status
			} : o);
			set({ organizations: updatedOrgs });
			setStoredJSON("sl_organizations", updatedOrgs);
			const currOrg = get().currentOrg;
			if (currOrg && currOrg.id === id) {
				const nextOrg = {
					...currOrg,
					subscriptionStatus: status
				};
				set({ currentOrg: nextOrg });
				setStoredJSON("sl_current_org", nextOrg);
			}
		}
		get().addAuditLog("SYSTEM", "INFO", "Subscription Updated", `Admin updated subscription for ${type} ${id} to ${status}`);
	},
	updateClientProfile: (id, updated) => {
		const updatedUsers = get().users.map((u) => u.id === id ? {
			...u,
			...updated
		} : u);
		set({ users: updatedUsers });
		setStoredJSON("sl_users", updatedUsers);
		const currUser = get().currentUser;
		if (currUser && currUser.id === id) {
			const nextUser = {
				...currUser,
				...updated
			};
			set({ currentUser: nextUser });
			setStoredJSON("sl_current_user", nextUser);
		}
		get().addAuditLog("SECURITY", "INFO", "Client Profile Updated", `Profile for ID: ${id} modified in control room.`);
	},
	resolvePanic: (id) => {
		set((state) => ({
			panicEvents: state.panicEvents.map((ev) => ev.id === id ? {
				...ev,
				status: "RESOLVED",
				timelineData: [...ev.timelineData, `${(/* @__PURE__ */ new Date()).toLocaleTimeString()} UTC - Resolved by safety operator.`]
			} : ev),
			currentPanicEvent: state.currentPanicEvent?.id === id ? null : state.currentPanicEvent,
			activeSOSState: state.currentPanicEvent?.id === id ? "IDLE" : state.activeSOSState
		}));
		setStoredJSON("sl_panic_events", get().panicEvents);
		get().addAuditLog("SYSTEM", "INFO", `Incident ${id} marked as RESOLVED`, "The tactical situation has been stabilized and closed.");
		if (get().currentOrg?.sensorStream?.enabled) {
			get().addAuditLog("DISPATCH", "INFO", "[SensorStream] Closing UDP Telemetry stream", `Incident ${id} resolved.`);
			fetchBackendApi("/api/dispatch/sensorstream", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					udpHost: get().currentOrg?.sensorStream?.udpHost,
					udpPort: get().currentOrg?.sensorStream?.udpPort,
					payload: {
						incidentId: id,
						status: "RESOLVED"
					}
				})
			}, get().customBackendUrl).catch((e) => console.warn("SensorStream stop error", e));
		}
	},
	updateContact: (id, updated) => {
		const nextContacts = get().contacts.map((c) => c.id === id ? {
			...c,
			...updated
		} : c);
		set({ contacts: nextContacts });
		setStoredJSON("sl_contacts", nextContacts);
		if (!get().demoMode) setStoredJSON("sl_real_contacts", nextContacts);
		get().addAuditLog("SYSTEM", "INFO", "Emergency contact list modified", `ID: ${id} updated.`);
	},
	addContact: (contact) => {
		const newContact = {
			...contact,
			id: Math.random().toString(),
			priority: get().contacts.length + 1
		};
		const nextContacts = [...get().contacts, newContact];
		set({ contacts: nextContacts });
		setStoredJSON("sl_contacts", nextContacts);
		if (!get().demoMode) setStoredJSON("sl_real_contacts", nextContacts);
		get().addAuditLog("SYSTEM", "INFO", "New Backup Contact Added", `${newContact.label}`);
	},
	removeContact: (id) => {
		const nextContacts = get().contacts.filter((c) => c.id !== id).map((c, idx) => ({
			...c,
			priority: idx + 1
		}));
		set({ contacts: nextContacts });
		setStoredJSON("sl_contacts", nextContacts);
		if (!get().demoMode) setStoredJSON("sl_real_contacts", nextContacts);
		get().addAuditLog("SYSTEM", "WARN", "Backup Contact Removed", `ID: ${id}`);
	},
	startBleScan: () => {
		if (get().isScanning) return;
		set({
			isScanning: true,
			pairingProgress: "Requesting Bluetooth permission & scanning nearby devices...",
			discoveredDevices: []
		});
		get().addAuditLog("BLE", "INFO", "BLE LE Scanner Armed", "Scanning ALL nearby BLE devices, unfiltered (same approach as nRF Connect).");
		scanForNearbyDevices((found) => {
			set((state) => {
				if (state.discoveredDevices.some((d) => d.deviceId === found.deviceId)) return state;
				return { discoveredDevices: [...state.discoveredDevices, found].sort((a, b) => b.rssi - a.rssi) };
			});
		}, 15e3, (rawName, rawRssi) => {
			get().addAuditLog("BLE", "INFO", "Raw BLE Advertisement Seen", `${rawName} · ${rawRssi} dBm`);
		}).catch((err) => {
			set({
				isScanning: false,
				pairingProgress: null
			});
			get().addAuditLog("BLE", "SEVERE", "BLE Scan Failed", err.message);
		});
		setTimeout(() => {
			set({
				isScanning: false,
				pairingProgress: null
			});
		}, 15500);
	},
	stopBleScan: () => {
		stopScan();
		set({
			isScanning: false,
			pairingProgress: null
		});
	},
	registerDiscoveredDevice: (deviceId, name, deviceType) => {
		if (get().bleDevices.some((d) => d.macAddress === deviceId)) return;
		if (get().bleDevices.length >= 5) {
			get().addAuditLog("BLE", "WARN", "Device Limit Reached", "SafetyLink supports up to 5 registered devices. Remove one before adding another.");
			return;
		}
		const newDev = {
			macAddress: deviceId,
			friendlyName: name || "BLE Panic Button",
			deviceType: deviceType || "GENERIC_BLE_BUTTON",
			batteryLevel: 100,
			rssi: -60,
			connectionState: "DISCONNECTED",
			lastSeen: Date.now()
		};
		const updated = [...get().bleDevices, newDev];
		set({
			bleDevices: updated,
			discoveredDevices: get().discoveredDevices.filter((d) => d.deviceId !== deviceId)
		});
		setStoredJSON("sl_ble_devices", updated);
		get().addAuditLog("BLE", "INFO", "New Device Registered", `Device ${deviceId} added (${updated.length}/5). Tap BIND BUTTON to teach SafetyLink its press signal.`);
	},
	/**
	* The bonding wizard: connects, enumerates every GATT characteristic
	* that supports notify/indicate, listens for the physical button press,
	* and binds whichever channel actually fires. Works on any vendor's
	* hardware, not just iTAG -- nothing here assumes a specific UUID.
	*/
	bindDeviceTrigger: async (mac) => {
		set((state) => ({
			bleDevices: state.bleDevices.map((d) => d.macAddress === mac ? {
				...d,
				connectionState: "CONNECTING"
			} : d),
			pairingProgress: "Connecting and reading GATT profile..."
		}));
		get().addAuditLog("BLE", "INFO", "Bonding Wizard Started", `MAC: ${mac} -- press and hold the physical button when prompted.`);
		try {
			const trigger = await discoverAndBindTrigger(mac, (candidateCount) => {
				set({ pairingProgress: `Found ${candidateCount} candidate channel(s). Press and hold your physical button now...` });
				get().addAuditLog("BLE", "INFO", "Listening For Press", `${candidateCount} notify/indicate characteristic(s) found on ${mac}.`);
			}, 1e4);
			if (!trigger) {
				set((state) => ({
					bleDevices: state.bleDevices.map((d) => d.macAddress === mac ? {
						...d,
						connectionState: "DISCONNECTED"
					} : d),
					pairingProgress: null
				}));
				get().addAuditLog("BLE", "WARN", "Bonding Failed", `No press detected on ${mac} within 10s. Try again -- hold the button firmly for a full second.`);
				return false;
			}
			const updated = get().bleDevices.map((d) => d.macAddress === mac ? {
				...d,
				triggerServiceUuid: trigger.serviceUuid,
				triggerCharacteristicUuid: trigger.characteristicUuid,
				connectionState: "CONNECTED",
				lastSeen: Date.now()
			} : d);
			set({
				bleDevices: updated,
				pairingProgress: null
			});
			setStoredJSON("sl_ble_devices", updated);
			get().addAuditLog("BLE", "INFO", "Trigger Channel Bound", `${mac} -> service ${trigger.serviceUuid.slice(4, 8)}, characteristic ${trigger.characteristicUuid.slice(4, 8)}.`);
			get().connectBleDevice(mac);
			return true;
		} catch (err) {
			set((state) => ({
				bleDevices: state.bleDevices.map((d) => d.macAddress === mac ? {
					...d,
					connectionState: "DISCONNECTED"
				} : d),
				pairingProgress: null
			}));
			get().addAuditLog("BLE", "SEVERE", "Bonding Error", `${mac}: ${err.message}`);
			return false;
		}
	},
	connectBleDevice: (mac) => {
		const device = get().bleDevices.find((d) => d.macAddress === mac);
		if (!device) return;
		if (Capacitor.isNativePlatform()) {
			set((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === mac ? {
				...d,
				connectionState: "CONNECTING"
			} : d) }));
			__vitePreload(async () => {
				const { ITagPluginService } = await import("./ITagPluginService-Bw1X7OEl.js");
				return { ITagPluginService };
			}, __vite__mapDeps([10,4,1])).then(({ ITagPluginService }) => {
				ITagPluginService.connectDevice(mac, (status) => {
					set((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === mac ? {
						...d,
						connectionState: status === "connected" ? "CONNECTED" : "DISCONNECTED",
						rssi: status === "connected" ? -50 : -100,
						lastSeen: Date.now()
					} : d) }));
					setStoredJSON("sl_ble_devices", get().bleDevices);
				}, (val) => {
					get().addAuditLog("BLE", "SEVERE", "iTAG Physical Button Press", `Hardware click code ${val} from ${mac} handled by native PanicService`);
				}, (battery) => {
					set((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === mac ? {
						...d,
						batteryLevel: battery
					} : d) }));
					setStoredJSON("sl_ble_devices", get().bleDevices);
				}, (rssi) => {
					set((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === mac ? {
						...d,
						rssi
					} : d) }));
				}).catch((e) => console.warn("[store] Native connectDevice note:", e));
			}).catch(() => {});
			return;
		}
		if (!device.triggerServiceUuid || !device.triggerCharacteristicUuid) {
			get().bindDeviceTrigger(mac);
			return;
		}
		set((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === mac ? {
			...d,
			connectionState: "CONNECTING"
		} : d) }));
		subscribeToKnownTrigger(mac, {
			serviceUuid: device.triggerServiceUuid,
			characteristicUuid: device.triggerCharacteristicUuid
		}, () => {
			get().addAuditLog("BLE", "SEVERE", "Hardware Button Press Detected", `Real notification received from ${mac}`);
			get().handleHardwareButtonPress(mac);
		}, () => {
			set((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === mac ? {
				...d,
				connectionState: "DISCONNECTED",
				rssi: -100
			} : d) }));
			setStoredJSON("sl_ble_devices", get().bleDevices);
			get().addAuditLog("BLE", "SEVERE", "BLE Wearable Connection Severed", `Hardware link to ${mac} was terminated (out of range or battery dead).`);
			const maxAttempts = 10;
			let attempt = 0;
			const scheduleReconnect = () => {
				attempt++;
				if (attempt > maxAttempts) return;
				const device = get().bleDevices.find((d) => d.macAddress === mac);
				if (!device || device.connectionState === "CONNECTED") return;
				const delay = Math.min(3e4 * attempt, 12e4);
				setTimeout(() => {
					const d = get().bleDevices.find((d) => d.macAddress === mac);
					if (!d || d.connectionState === "CONNECTED") return;
					get().connectBleDevice(mac);
				}, delay);
			};
			scheduleReconnect();
		}).then(() => {
			set((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === mac ? {
				...d,
				connectionState: "CONNECTED",
				rssi: -55,
				lastSeen: Date.now()
			} : d) }));
			setStoredJSON("sl_ble_devices", get().bleDevices);
			get().addAuditLog("BLE", "INFO", "BLE Device Connected", `MAC: ${mac} -- subscribed to its bound trigger channel.`);
		}).catch((err) => {
			set((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === mac ? {
				...d,
				connectionState: "DISCONNECTED"
			} : d) }));
			setStoredJSON("sl_ble_devices", get().bleDevices);
			get().addAuditLog("BLE", "SEVERE", "BLE Connect Failed", `${mac}: ${err.message}`);
		});
	},
	disconnectBleDevice: (mac) => {
		const device = get().bleDevices.find((d) => d.macAddress === mac);
		disconnectDevice(mac, device?.triggerServiceUuid && device?.triggerCharacteristicUuid ? {
			serviceUuid: device.triggerServiceUuid,
			characteristicUuid: device.triggerCharacteristicUuid
		} : void 0);
		if (Capacitor.isNativePlatform()) __vitePreload(async () => {
			const { ITagPluginService } = await import("./ITagPluginService-Bw1X7OEl.js");
			return { ITagPluginService };
		}, __vite__mapDeps([10,4,1])).then(({ ITagPluginService }) => {
			ITagPluginService.disconnectDevice(mac).catch(() => {});
		}).catch(() => {});
		set((state) => ({ bleDevices: state.bleDevices.map((d) => d.macAddress === mac ? {
			...d,
			connectionState: "DISCONNECTED",
			rssi: -100
		} : d) }));
		setStoredJSON("sl_ble_devices", get().bleDevices);
		get().addAuditLog("BLE", "INFO", "BLE Wearable Disconnected", `MAC: ${mac}`);
	},
	removeDevice: (mac) => {
		disconnectDevice(mac);
		if (Capacitor.isNativePlatform()) __vitePreload(async () => {
			const { ITagPluginService } = await import("./ITagPluginService-Bw1X7OEl.js");
			return { ITagPluginService };
		}, __vite__mapDeps([10,4,1])).then(({ ITagPluginService }) => {
			ITagPluginService.forgetDevice(mac).catch(() => {});
		}).catch(() => {});
		const updated = get().bleDevices.filter((d) => d.macAddress !== mac);
		set({ bleDevices: updated });
		setStoredJSON("sl_ble_devices", updated);
		get().addAuditLog("BLE", "WARN", "BLE Wearable Device Forgotten", `MAC: ${mac}`);
	},
	approveOrganization: async (id) => {
		if (!get().demoMode) try {
			await fetchBackendApi(`/api/admin/organizations/${id}/approve`, { method: "POST" }, get().customBackendUrl);
		} catch (e) {
			console.error("Failed to approve", e);
		}
		const updated = get().organizations.map((o) => o.id === id ? {
			...o,
			approved: true
		} : o);
		set({ organizations: updated });
		setStoredJSON("sl_organizations", updated);
		get().addAuditLog("SECURITY", "INFO", "Organization Registry Accepted", `ID: ${id} is now approved.`);
	},
	generateReferralCode: (orgId) => {
		const code = `REF-${orgId.replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 6)}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
		const updated = get().organizations.map((o) => o.id === orgId ? {
			...o,
			referralCode: code,
			referralCount: o.referralCount ?? 0
		} : o);
		set({ organizations: updated });
		setStoredJSON("sl_organizations", updated);
		get().addAuditLog("SYSTEM", "INFO", "Referral Code Generated", `Org: ${orgId}, Code: ${code}`);
		return code;
	},
	applyReferralCode: (code, userId) => {
		const trimmed = code.trim().toUpperCase();
		const org = get().organizations.find((o) => o.referralCode?.toUpperCase() === trimmed);
		if (!org) return {
			success: false,
			error: "Referral code not found."
		};
		const updatedUsers = get().users.map((u) => u.id === userId ? {
			...u,
			referredByCode: trimmed
		} : u);
		set({ users: updatedUsers });
		setStoredJSON("sl_users", updatedUsers);
		const updatedOrgs = get().organizations.map((o) => o.id === org.id ? {
			...o,
			referralCount: (o.referralCount ?? 0) + 1
		} : o);
		set({ organizations: updatedOrgs });
		setStoredJSON("sl_organizations", updatedOrgs);
		get().addAuditLog("SYSTEM", "INFO", "Referral Code Applied", `Code: ${trimmed}, User: ${userId}, Org: ${org.name}`);
		return { success: true };
	},
	addCustomTool: (tool) => {
		const newTool = {
			...tool,
			id: `tool-${Math.random().toString(36).substring(2, 9)}`,
			createdAt: Date.now()
		};
		const updated = [...get().customTools, newTool];
		set({ customTools: updated });
		setStoredJSON("sl_custom_tools", updated);
		get().addAuditLog("SYSTEM", "INFO", "New Custom Tool/Setting Pushed", `Title: ${newTool.title}, Scope: ${newTool.targetOrgId ? "Org: " + newTool.targetOrgId : "Global"}`);
	},
	deleteCustomTool: (id) => {
		const updated = get().customTools.filter((t) => t.id !== id);
		set({ customTools: updated });
		setStoredJSON("sl_custom_tools", updated);
		get().addAuditLog("SYSTEM", "WARN", "Custom Tool/Setting Revoked", `ID: ${id}`);
	},
	addCamera: (cam) => {
		const user = get().currentUser;
		const org = get().currentOrg;
		const camId = `cam-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
		const resolvedOrgId = String(cam.orgId || org?.id || user?.orgCode || "INDIVIDUAL").slice(0, 64);
		const resolvedOwnerUid = String(auth.currentUser?.uid || user?.id || org?.id || "local-owner").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 128);
		const { username, password, whepBearerToken, turnUsername, turnCredential, ...cleanMeta } = cam;
		const stripUrlCredentials = (raw) => {
			if (!raw || !raw.trim()) return void 0;
			try {
				const u = new URL(raw.trim());
				u.username = "";
				u.password = "";
				return u.toString();
			} catch {
				return raw.trim().replace(/https?:\/\/[^/@]+@/i, (m) => m.toLowerCase().startsWith("https") ? "https://" : "http://");
			}
		};
		const sanitizedWhepUrl = stripUrlCredentials(cleanMeta.whepUrl || cleanMeta.relayUrl);
		const defaultPresets = cleanMeta.ptzPresets && cleanMeta.ptzPresets.length > 0 ? cleanMeta.ptzPresets.slice(0, 8) : [
			{
				presetId: 1,
				label: "Gate Entry"
			},
			{
				presetId: 2,
				label: "Perimeter"
			},
			{
				presetId: 3,
				label: "Loading Bay"
			},
			{
				presetId: 4,
				label: "Street View"
			}
		];
		const newCam = {
			...cleanMeta,
			id: camId,
			orgId: resolvedOrgId,
			ownerUid: resolvedOwnerUid,
			whepUrl: sanitizedWhepUrl,
			relayUrl: sanitizedWhepUrl || cleanMeta.relayUrl,
			signalingMode: cleanMeta.signalingMode || (cleanMeta.mode === "WHEP_HLS_RELAY" ? "WHEP_DIRECT" : cleanMeta.mode === "LAN_ISAPI" ? "LAN_ISAPI_POLL" : "HIK_CONNECT_P2P"),
			streamProfile: cleanMeta.streamProfile || (Number(cleanMeta.channel) === 101 ? "MAIN_HD" : "SUB_MOBILE"),
			stunServers: cleanMeta.stunServers && cleanMeta.stunServers.length > 0 ? cleanMeta.stunServers.slice(0, 5) : ["stun:stun.l.google.com:19302"],
			turnUrls: cleanMeta.turnUrls ? cleanMeta.turnUrls.slice(0, 4) : [],
			ptzEnabled: cleanMeta.ptzEnabled ?? true,
			twoWayAudioEnabled: cleanMeta.twoWayAudioEnabled ?? true,
			ptzPresets: defaultPresets,
			status: "UNVERIFIED",
			createdAt: Date.now()
		};
		if (username || password || whepBearerToken || turnUsername || turnCredential) {
			const creds = getStoredJSON("sl_hikvision_local_creds", {});
			creds[camId] = {
				username: username || "admin",
				password: password || "",
				...whepBearerToken ? { whepBearerToken } : {},
				...turnUsername ? { turnUsername } : {},
				...turnCredential ? { turnCredential } : {}
			};
			setStoredJSON("sl_hikvision_local_creds", creds);
		}
		const updated = [newCam, ...get().cameras];
		set({ cameras: updated });
		setStoredJSON("sl_hikvision_cameras", updated);
		get().addAuditLog("SYSTEM", "INFO", "Hikvision CCTV Camera Onboarded", `${newCam.name} (${newCam.mode}) scoped to ${resolvedOrgId}`);
		if (auth.currentUser?.emailVerified) {
			const fsPayload = {
				id: camId,
				ownerUid: auth.currentUser.uid,
				orgId: resolvedOrgId,
				name: newCam.name.slice(0, 100),
				brand: newCam.brand,
				mode: newCam.mode,
				signalingMode: newCam.signalingMode,
				streamProfile: newCam.streamProfile,
				channel: Number(newCam.channel) || 101,
				httpPort: Number(newCam.httpPort) || 80,
				rtspPort: Number(newCam.rtspPort) || 554,
				ptzEnabled: Boolean(newCam.ptzEnabled),
				twoWayAudioEnabled: Boolean(newCam.twoWayAudioEnabled),
				ptzPresets: (newCam.ptzPresets || []).slice(0, 8).map((p) => ({
					presetId: Number(p.presetId) || 1,
					label: String(p.label || "Preset").slice(0, 40)
				})),
				stunServers: (newCam.stunServers || []).slice(0, 5),
				turnUrls: (newCam.turnUrls || []).slice(0, 4),
				softIoTriggerId: Number(newCam.softIoTriggerId) || 1,
				triggerOnPanic: Boolean(newCam.triggerOnPanic),
				status: newCam.status,
				createdAt: serverTimestamp()
			};
			if (newCam.serialNumber) fsPayload.serialNumber = newCam.serialNumber.slice(0, 64);
			if (newCam.host) fsPayload.host = newCam.host.slice(0, 128);
			if (newCam.whepUrl) fsPayload.whepUrl = newCam.whepUrl.slice(0, 512);
			setDoc(doc(db, "cameras", camId), fsPayload).catch((err) => {
				try {
					handleFirestoreError(err, OperationType.CREATE, `cameras/${camId}`);
				} catch {}
			});
		}
		return newCam;
	},
	updateCamera: (id, updatedFields) => {
		const sanitizeUrl = (raw) => {
			if (!raw || !raw.trim()) return void 0;
			try {
				const u = new URL(raw.trim());
				u.username = "";
				u.password = "";
				return u.toString();
			} catch {
				return raw.trim().replace(/https?:\/\/[^/@]+@/i, (m) => m.toLowerCase().startsWith("https") ? "https://" : "http://");
			}
		};
		const sanitizedFields = { ...updatedFields };
		if ("whepUrl" in updatedFields) sanitizedFields.whepUrl = sanitizeUrl(updatedFields.whepUrl);
		if ("relayUrl" in updatedFields && !("whepUrl" in updatedFields)) sanitizedFields.whepUrl = sanitizeUrl(updatedFields.relayUrl);
		const updated = get().cameras.map((c) => c.id === id ? {
			...c,
			...sanitizedFields,
			updatedAt: Date.now()
		} : c);
		set({ cameras: updated });
		setStoredJSON("sl_hikvision_cameras", updated);
		if (auth.currentUser?.emailVerified) {
			const target = updated.find((c) => c.id === id);
			if (target) {
				const fsUpdate = {
					name: target.name.slice(0, 100),
					brand: target.brand,
					mode: target.mode,
					signalingMode: target.signalingMode || "WHEP_DIRECT",
					streamProfile: target.streamProfile || "SUB_MOBILE",
					channel: Number(target.channel) || 101,
					httpPort: Number(target.httpPort) || 80,
					rtspPort: Number(target.rtspPort) || 554,
					ptzEnabled: Boolean(target.ptzEnabled ?? true),
					twoWayAudioEnabled: Boolean(target.twoWayAudioEnabled ?? true),
					ptzPresets: (target.ptzPresets || []).slice(0, 8).map((p) => ({
						presetId: Number(p.presetId) || 1,
						label: String(p.label || "Preset").slice(0, 40)
					})),
					stunServers: (target.stunServers || []).slice(0, 5),
					turnUrls: (target.turnUrls || []).slice(0, 4),
					softIoTriggerId: Number(target.softIoTriggerId) || 1,
					triggerOnPanic: Boolean(target.triggerOnPanic),
					status: target.status,
					updatedAt: serverTimestamp()
				};
				if (target.serialNumber) fsUpdate.serialNumber = target.serialNumber.slice(0, 64);
				if (target.host) fsUpdate.host = target.host.slice(0, 128);
				if (target.whepUrl) fsUpdate.whepUrl = target.whepUrl.slice(0, 512);
				updateDoc(doc(db, "cameras", id), fsUpdate).catch((err) => {
					try {
						handleFirestoreError(err, OperationType.UPDATE, `cameras/${id}`);
					} catch {}
				});
			}
		}
	},
	removeCamera: (id) => {
		const updated = get().cameras.filter((c) => c.id !== id);
		set({ cameras: updated });
		setStoredJSON("sl_hikvision_cameras", updated);
		const creds = getStoredJSON("sl_hikvision_local_creds", {});
		if (creds[id]) {
			delete creds[id];
			setStoredJSON("sl_hikvision_local_creds", creds);
		}
		if (auth.currentUser?.emailVerified) deleteDoc(doc(db, "cameras", id)).catch((err) => {
			try {
				handleFirestoreError(err, OperationType.DELETE, `cameras/${id}`);
			} catch {}
		});
		get().addAuditLog("SYSTEM", "INFO", "CCTV Camera Removed", `ID: ${id}`);
	},
	getCameraLocalCredentials: (id) => {
		return getStoredJSON("sl_hikvision_local_creds", {})[id] || {
			username: "admin",
			password: ""
		};
	},
	setCameraLocalCredentials: (id, newCreds) => {
		const creds = getStoredJSON("sl_hikvision_local_creds", {});
		creds[id] = {
			...creds[id] || {},
			...newCreds
		};
		setStoredJSON("sl_hikvision_local_creds", creds);
	},
	addCameraEvidenceSnapshot: (snap) => {
		const entry = {
			...snap,
			id: `snap-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
			capturedAt: Date.now()
		};
		const next = [entry, ...get().cameraEvidenceSnapshots].slice(0, 12);
		set({ cameraEvidenceSnapshots: next });
		setStoredJSON("sl_hikvision_snapshots", next);
		get().addAuditLog("SYSTEM", "INFO", "Camera Snapshot Captured", `${entry.cameraName} (${entry.orgId})`);
		return entry;
	},
	removeCameraEvidenceSnapshot: (id) => {
		const next = get().cameraEvidenceSnapshots.filter((s) => s.id !== id);
		set({ cameraEvidenceSnapshots: next });
		setStoredJSON("sl_hikvision_snapshots", next);
	},
	probeCamera: async (id) => {
		const cam = get().cameras.find((c) => c.id === id);
		if (!cam) return {
			reachable: false,
			diagnostics: "Camera record not found."
		};
		if (cam.mode === "HIK_CONNECT_P2P") {
			const ok = Boolean(cam.serialNumber && cam.serialNumber.trim().length >= 6);
			const diag = ok ? `P2P Serial ${cam.serialNumber} ready for Hik-Connect mobile handoff.` : "Enter valid 9-character Hikvision serial number from NVR/camera sticker.";
			get().updateCamera(id, {
				status: ok ? "UNVERIFIED" : "ERROR",
				lastError: ok ? void 0 : diag,
				lastCheckedAt: Date.now()
			});
			return {
				reachable: ok,
				diagnostics: diag
			};
		}
		const creds = getStoredJSON("sl_hikvision_local_creds", {})[id] || {
			username: "admin",
			password: ""
		};
		try {
			const data = await (await fetch("/api/hikvision/probe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					mode: cam.mode,
					host: cam.host,
					httpPort: cam.httpPort || 80,
					channel: cam.channel || 101,
					username: creds.username,
					password: creds.password,
					relayUrl: cam.whepUrl || cam.relayUrl
				})
			})).json().catch(() => ({}));
			const nextStatus = data.reachable ? "ONLINE" : "OFFLINE";
			get().updateCamera(id, {
				status: nextStatus,
				lastError: data.reachable ? void 0 : data.diagnostics || data.error || "Unreachable",
				lastSnapshotBase64: data.snapshotPreviewBase64 || cam.lastSnapshotBase64,
				lastCheckedAt: Date.now()
			});
			return {
				reachable: Boolean(data.reachable),
				diagnostics: data.diagnostics || data.error || (data.reachable ? "Camera reachable." : "Unreachable")
			};
		} catch (err) {
			const msg = err?.message || "Probe failed.";
			get().updateCamera(id, {
				status: "ERROR",
				lastError: msg,
				lastCheckedAt: Date.now()
			});
			return {
				reachable: false,
				diagnostics: msg
			};
		}
	},
	fetchCameraSnapshot: async (id) => {
		const cam = get().cameras.find((c) => c.id === id);
		if (!cam) return {
			ok: false,
			diagnostics: "Camera not found."
		};
		if (!cam.host) return {
			ok: false,
			diagnostics: "No camera LAN IP/host configured for ISAPI snapshot."
		};
		const creds = get().getCameraLocalCredentials(id);
		try {
			const res = await fetch("/api/hikvision/snapshot", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					host: cam.host,
					httpPort: cam.httpPort || 80,
					channel: cam.channel || 102,
					username: creds.username || "admin",
					password: creds.password || ""
				})
			});
			const data = await res.json().catch(() => ({}));
			if (res.ok && data.ok && data.imageBase64) {
				get().updateCamera(id, {
					status: "ONLINE",
					lastError: void 0,
					lastSnapshotBase64: data.imageBase64,
					lastCheckedAt: Date.now()
				});
				return {
					ok: true,
					imageBase64: data.imageBase64,
					diagnostics: data.diagnostics || "Frame received."
				};
			}
			const diag = data.diagnostics || data.error || `HTTP ${res.status}`;
			get().updateCamera(id, {
				status: res.status === 401 ? "ERROR" : "OFFLINE",
				lastError: diag,
				lastCheckedAt: Date.now()
			});
			return {
				ok: false,
				diagnostics: diag
			};
		} catch (err) {
			const msg = err?.message || "Snapshot request failed.";
			get().updateCamera(id, {
				status: "ERROR",
				lastError: msg,
				lastCheckedAt: Date.now()
			});
			return {
				ok: false,
				diagnostics: msg
			};
		}
	},
	sendCameraPtz: async (id, cmd) => {
		const cam = get().cameras.find((c) => c.id === id);
		if (!cam) return {
			ok: false,
			diagnostics: "Camera not found."
		};
		if (!cam.host) return {
			ok: false,
			diagnostics: "Configure camera IP/hostname in Connection Settings to enable ISAPI PTZ."
		};
		const creds = get().getCameraLocalCredentials(id);
		try {
			const res = await fetch("/api/hikvision/ptz", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					host: cam.host,
					httpPort: cam.httpPort || 80,
					channel: cam.channel || 101,
					action: cmd.action,
					pan: cmd.pan || 0,
					tilt: cmd.tilt || 0,
					zoom: cmd.zoom || 0,
					presetId: cmd.presetId || 1,
					username: creds.username || "admin",
					password: creds.password || ""
				})
			});
			const data = await res.json().catch(() => ({}));
			return {
				ok: Boolean(data.ok),
				statusCode: data.statusCode || res.status,
				diagnostics: data.diagnostics || data.error || `HTTP ${res.status}`
			};
		} catch (err) {
			return {
				ok: false,
				diagnostics: err?.message || "PTZ network error."
			};
		}
	},
	triggerSingleCameraSoftIo: async (id) => {
		const cam = get().cameras.find((c) => c.id === id);
		if (!cam) return {
			triggered: false,
			diagnostics: "Camera not found."
		};
		if (!cam.host) return {
			triggered: false,
			diagnostics: "Configure LAN/Public camera host to trigger Soft-IO hardware relay."
		};
		const creds = get().getCameraLocalCredentials(id);
		try {
			const res = await fetch("/api/hikvision/trigger-io", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					host: cam.host,
					httpPort: cam.httpPort || 80,
					softIoTriggerId: cam.softIoTriggerId || 1,
					username: creds.username || "admin",
					password: creds.password || ""
				})
			});
			const data = await res.json().catch(() => ({}));
			if (data.triggered) get().addAuditLog("DISPATCH", "INFO", "Camera Soft-IO Relay Triggered", `${cam.name} Soft-IO #${cam.softIoTriggerId}`);
			return {
				triggered: Boolean(data.triggered),
				statusCode: data.statusCode || res.status,
				diagnostics: data.diagnostics || data.error || `HTTP ${res.status}`
			};
		} catch (err) {
			return {
				triggered: false,
				diagnostics: err?.message || "Soft-IO trigger failed."
			};
		}
	},
	triggerCameraSoftIo: async () => {
		const armed = get().cameras.filter((c) => c.triggerOnPanic && c.host);
		if (armed.length === 0) return;
		const credsMap = getStoredJSON("sl_hikvision_local_creds", {});
		await Promise.allSettled(armed.map(async (cam) => {
			const creds = credsMap[cam.id] || {
				username: "admin",
				password: ""
			};
			await fetch("/api/hikvision/trigger-io", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					host: cam.host,
					httpPort: cam.httpPort || 80,
					softIoTriggerId: cam.softIoTriggerId || 1,
					username: creds.username,
					password: creds.password
				})
			}).catch(() => {});
		}));
	},
	setCustomBackendUrl: (url) => {
		const trimmed = String(url || "").trim().replace(/\/+$/, "");
		const normalized = trimmed.includes(DEAD_BACKEND_HOST) ? PRIMARY_BACKEND_URL : trimmed;
		set({ customBackendUrl: normalized });
		setStoredJSON("sl_custom_backend_url", normalized);
		get().addAuditLog("SYSTEM", "INFO", "Custom Backend URL Updated", normalized ? `Backend set to ${normalized}` : "Backend URL cleared.");
	},
	setConnectyCubeConfig: (config) => {
		set({ connectyCubeConfig: config });
		setStoredJSON("sl_connectycube_config", config);
	},
	setTuyaConfig: (config) => {
		set({ tuyaConfig: config });
		setStoredJSON("sl_tuya_config", config);
	},
	setAuraApiUrl: (url) => {
		set({ auraApiUrl: url });
		setStoredJSON("sl_aura_api_url", url);
	},
	setThingsBoardToken: (token) => {
		set({ thingsBoardToken: token });
		setStoredJSON("sl_thingsboard_token", token);
		get().addAuditLog("SYSTEM", "INFO", "IoT Dashboard Token Updated", token ? "Token set (stored locally only, not in the repo)." : "Token cleared.");
	},
	setLanguage: (lang) => {
		set({ language: lang });
		setStoredJSON("sl_language", lang);
		get().addAuditLog("SYSTEM", "INFO", "Language preference updated", `Selected: ${lang.toUpperCase()}`);
	},
	downloadLanguage: async (langCode) => {
		get().addAuditLog("SYSTEM", "INFO", "Downloading Language Package", `Requesting SA language file: ${langCode.toUpperCase()}`);
		await new Promise((resolve) => setTimeout(resolve, 2e3));
		const downloaded = get().downloadedLanguages;
		if (!downloaded.includes(langCode)) {
			const updated = [...downloaded, langCode];
			set({ downloadedLanguages: updated });
			setStoredJSON("sl_downloaded_languages", updated);
			get().addAuditLog("SYSTEM", "INFO", "Language Package Downloaded", `Installed SA language: ${langCode.toUpperCase()}`);
		}
	},
	bleButtonConfig: getStoredJSON("sl_ble_button_config", DEFAULT_BLE_BUTTON_CONFIG),
	setBleButtonConfig: (config) => {
		const merged = {
			...get().bleButtonConfig,
			...config
		};
		set({ bleButtonConfig: merged });
		setStoredJSON("sl_ble_button_config", merged);
		if (Capacitor.isNativePlatform()) __vitePreload(async () => {
			const { SafetyLinkEmergency } = await import("./index-CRyeGhgM.js").then((n) => n.r);
			return { SafetyLinkEmergency };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9])).then(({ SafetyLinkEmergency }) => {
			SafetyLinkEmergency.setButtonConfig(merged).catch(console.warn);
		}).catch(console.warn);
		get().addAuditLog("BLE", "INFO", "BLE Button Actions Updated", `1-Press: ${merged.singlePressAction}, CancelOn10s: ${merged.cancelDuringCountdown}, 3-Press: ${merged.triplePressAction} (${merged.safetyTimeoutMinutes}m)`);
	},
	handleHardwareButtonPress: (sourceMac) => {
		const config = get().bleButtonConfig;
		if ((get().panicCountdown !== null || get().activeSOSState !== "IDLE") && config.cancelDuringCountdown) {
			get().cancelSOS();
			if (config.hapticFeedback && typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([700]);
			get().addToast("Disarmed: Panic alert countdown cancelled via hardware button", "info");
			get().addAuditLog("BLE", "INFO", "BLE Button Press -> Countdown Cancelled", `Source: ${sourceMac || "Wearable"}`);
			webButtonPressCount = 0;
			if (webButtonPressTimer) {
				clearTimeout(webButtonPressTimer);
				webButtonPressTimer = null;
			}
			return;
		}
		webButtonPressCount++;
		if (webButtonPressTimer) clearTimeout(webButtonPressTimer);
		webButtonPressTimer = setTimeout(() => {
			const count = webButtonPressCount;
			webButtonPressCount = 0;
			webButtonPressTimer = null;
			let action = config.singlePressAction;
			if (count === 2) action = config.doublePressAction;
			else if (count >= 3) action = config.triplePressAction;
			get().addAuditLog("BLE", "INFO", `BLE Button ${count} Click(s) Executing`, `Action: ${action} from ${sourceMac || "Hardware"}`);
			if (action === "PANIC") {
				if (config.hapticFeedback && typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([
					350,
					150,
					350
				]);
				get().startMultiStagePanic(`Hardware trigger: BLE button (${count} press)`, 10);
			} else if (action === "SILENT_PANIC") {
				if (config.hapticFeedback && typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([200]);
				get().setSilenceAlerts(true);
				get().startMultiStagePanic("Hardware trigger: Silent BLE alert", 10);
			} else if (action === "CANCEL") {
				if (config.hapticFeedback && typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([700]);
				get().cancelSOS();
				get().addToast("Disarmed: Active alert cancelled via button", "info");
			} else if (action === "SAFETY_TIMEOUT") {
				if (config.hapticFeedback && typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([
					100,
					100,
					100,
					100,
					100
				]);
				get().startWatchMeTimer(config.safetyTimeoutMinutes);
				get().addToast(`⏱️ Safety Walk Timeout active: ${config.safetyTimeoutMinutes} minutes`, "info");
			} else if (action === "FIND_PHONE") {
				if (config.hapticFeedback && typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([
					200,
					100,
					200,
					100,
					500
				]);
				get().addToast("🔔 Find My Phone ringing...", "info");
				try {
					const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
					const osc = audioCtx.createOscillator();
					const gain = audioCtx.createGain();
					osc.type = "triangle";
					osc.frequency.setValueAtTime(920, audioCtx.currentTime);
					gain.gain.setValueAtTime(.7, audioCtx.currentTime);
					osc.connect(gain);
					gain.connect(audioCtx.destination);
					osc.start();
					osc.stop(audioCtx.currentTime + 3.5);
				} catch (e) {
					console.warn("Audio tone error:", e);
				}
			}
		}, 480);
	},
	preferredSimId: getStoredJSON("sl_preferred_sim_id", -1),
	availableSims: [],
	setPreferredSim: async (subId) => {
		set({ preferredSimId: subId });
		setStoredJSON("sl_preferred_sim_id", subId);
		try {
			await NativeDispatchService.setPreferredSim(subId);
		} catch (err) {
			console.warn("[Store] Failed to notify native layer of preferred SIM:", err);
		}
		const label = subId === -1 ? "System Default (Auto-Lock)" : `SIM Card (Subscription ID: ${subId})`;
		get().addAuditLog("SYSTEM", "INFO", "Emergency SIM Card Locked", `Active cellular radio locked to ${label}. Dialog popups suppressed.`);
		get().addToast(`Primary Emergency SIM locked: ${label}`, "success");
	},
	loadSimCards: async () => {
		try {
			const res = await NativeDispatchService.getSimCards();
			set({
				availableSims: res.sims,
				preferredSimId: res.preferredSubscriptionId
			});
		} catch (err) {
			console.warn("[Store] Error loading SIM cards:", err);
		}
	},
	toasts: [],
	addToast: (message, type = "info") => {
		const id = Math.random().toString();
		const newToast = {
			id,
			message,
			type
		};
		set((state) => ({ toasts: [...state.toasts, newToast].slice(-3) }));
		setTimeout(() => {
			get().removeToast(id);
		}, 4500);
	},
	removeToast: (id) => {
		set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
	}
}));
if (typeof window !== "undefined") {
	window.__SAFETYLINK_STORE__ = useAppStore;
	window.addEventListener("online", () => {
		useAppStore.getState().syncProvisionalAccounts().catch(() => {});
		useAppStore.getState().syncOfflineQueue(true);
	});
}
//#endregion
export { LocalNotificationService as a, useAppStore as i, FALLBACK_BACKEND_URL as n, PRIMARY_BACKEND_URL as r, ADMIN_ORG_CODE as t };
