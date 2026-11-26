import { r as __exportAll } from "./rolldown-runtime-7_rZTKki.js";
import { _ as Capacitor, b as registerPlugin } from "./capacitor-B_jS8XWy.js";
//#region src/services/NativeDispatchService.ts
var NativeDispatchService_exports = /* @__PURE__ */ __exportAll({
	NativeDispatchService: () => NativeDispatchService,
	SafetyLinkEmergency: () => SafetyLinkEmergency
});
var NativeEmergencyDispatch = registerPlugin("EmergencyDispatch");
var SafetyLinkEmergency = registerPlugin("SafetyLinkEmergency");
/**
* NativeDispatchService
*
* Canonical unified bridge routing emergency calls to the native Android emergency engine
* (PanicService / EmergencyDispatchPlugin) when running on device, or providing explicit
* simulation feedback when running in pure web browsers.
*/
var NativeDispatchService = class {
	static isNative = Capacitor.isNativePlatform();
	static async triggerNativeEmergency(payload) {
		if (!this.isNative) {
			console.log("[NativeDispatch:web-sim] Triggering simulated emergency countdown:", payload);
			return {
				status: "COUNTDOWN",
				countdownSeconds: 10
			};
		}
		try {
			return await SafetyLinkEmergency.trigger(payload);
		} catch (e) {
			console.error("[NativeDispatch] SafetyLinkEmergency.trigger failed:", e);
			throw e;
		}
	}
	static async cancelNativeEmergency() {
		if (!this.isNative) {
			console.log("[NativeDispatch:web-sim] Emergency cancelled");
			return { status: "CANCELLED" };
		}
		try {
			return await SafetyLinkEmergency.cancel();
		} catch (e) {
			console.error("[NativeDispatch] SafetyLinkEmergency.cancel failed:", e);
			throw e;
		}
	}
	static async getLastNativeResult() {
		if (!this.isNative) return { hasResult: false };
		try {
			return await SafetyLinkEmergency.getLastResult();
		} catch (e) {
			console.warn("[NativeDispatch] SafetyLinkEmergency.getLastResult failed:", e);
			return { hasResult: false };
		}
	}
	static logDispatchEntry(entry) {
		try {
			if (typeof window !== "undefined") {
				const store = window.__SAFETYLINK_STORE__;
				if (store?.getState) {
					const state = store.getState();
					const unitId = entry.unitId || state.currentUser?.id || "SL-UNIT-LOCAL";
					const loc = state.userLocation;
					state.addDispatchLog({
						channel: entry.channel,
						target: entry.target,
						status: entry.status,
						unitId,
						coordinates: loc ? {
							lat: loc.lat,
							lng: loc.lng
						} : void 0,
						details: entry.details || `${entry.channel} dispatch processed via ${this.isNative ? "Android Native Telephony" : "Web Simulation"}.`
					});
				}
			}
		} catch (e) {
			console.warn("[NativeDispatch] Logging hook exception:", e);
		}
	}
	static async sendUssd(code) {
		if (!this.isNative) {
			console.log(`[NativeDispatch:web-sim] Would dial USSD ${code}`);
			this.logDispatchEntry({
				channel: "USSD",
				target: code,
				status: "INITIATED",
				details: "Simulated USSD carrier code execution."
			});
			return {
				success: true,
				simulated: true,
				status: "INITIATED"
			};
		}
		try {
			const res = await NativeEmergencyDispatch.sendUssd({ code });
			const status = res.dialed ? "INITIATED" : "FAILED";
			this.logDispatchEntry({
				channel: "USSD",
				target: code,
				status,
				details: res.error || (res.dialed ? "Native USSD dialed via Android telephony." : "USSD failed")
			});
			return {
				success: res.dialed,
				simulated: false,
				error: res.error,
				status
			};
		} catch (e) {
			console.error("[NativeDispatch] sendUssd failed", e);
			this.logDispatchEntry({
				channel: "USSD",
				target: code,
				status: "FAILED",
				details: e instanceof Error ? e.message : String(e)
			});
			return {
				success: false,
				simulated: false,
				error: e instanceof Error ? e.message : String(e),
				status: "FAILED"
			};
		}
	}
	static async toggleFloatingWidget(enable) {
		if (!this.isNative) {
			console.log("[NativeDispatch:web-sim] Toggle floating widget:", enable);
			return { enabled: enable };
		}
		try {
			return await SafetyLinkEmergency.toggleFloatingWidget({ enable });
		} catch (e) {
			console.error("[NativeDispatch] toggleFloatingWidget failed", e);
			return { enabled: false };
		}
	}
	static async sendSms(phone, message) {
		if (!this.isNative) {
			console.log(`[NativeDispatch:web-sim] Would SMS ${phone}: "${message}"`);
			this.logDispatchEntry({
				channel: "SMS",
				target: phone,
				status: "SENT",
				details: `Simulated SMS broadcast: "${message.slice(0, 50)}..."`
			});
			return {
				success: true,
				simulated: true,
				status: "SENT"
			};
		}
		try {
			const res = await NativeEmergencyDispatch.sendSms({
				phone,
				message
			});
			const status = res.sent ? "SENT" : "FAILED";
			this.logDispatchEntry({
				channel: "SMS",
				target: phone,
				status,
				details: res.error || (res.sent ? "Native SMS transmitted via Android SmsManager." : "SmsManager transmission error")
			});
			return {
				success: res.sent,
				simulated: false,
				error: res.error,
				status
			};
		} catch (e) {
			console.error("[NativeDispatch] sendSms failed", e);
			this.logDispatchEntry({
				channel: "SMS",
				target: phone,
				status: "FAILED",
				details: e instanceof Error ? e.message : String(e)
			});
			return {
				success: false,
				simulated: false,
				error: e instanceof Error ? e.message : String(e),
				status: "FAILED"
			};
		}
	}
	static async placeCall(phone) {
		if (!this.isNative) {
			console.log(`[NativeDispatch:web-sim] Initiating direct cellular call to ${phone}`);
			if (typeof window !== "undefined" && phone) try {
				const cleanPhone = phone.replace(/[\s-]/g, "");
				const telLink = document.createElement("a");
				telLink.href = `tel:${cleanPhone}`;
				telLink.style.display = "none";
				document.body.appendChild(telLink);
				telLink.click();
				document.body.removeChild(telLink);
			} catch (e) {
				console.warn("[NativeDispatch] Direct tel link exception:", e);
			}
			this.logDispatchEntry({
				channel: "VOICE_CALL",
				target: phone,
				status: "INITIATED",
				details: `Direct hardware telephony call connection deployed to ${phone}.`
			});
			return {
				success: true,
				simulated: false,
				status: "INITIATED"
			};
		}
		try {
			const res = await NativeEmergencyDispatch.placeCall({ phone });
			const actuallyDialed = Boolean(res.dialed && !res.dialerFallback);
			const status = actuallyDialed ? "INITIATED" : "FAILED";
			this.logDispatchEntry({
				channel: "VOICE_CALL",
				target: phone,
				status,
				details: res.error || (actuallyDialed ? "Native call dispatched via CALL_PHONE." : "Call unavailable (dialer fallback only)")
			});
			return {
				success: actuallyDialed,
				simulated: false,
				error: res.error,
				status
			};
		} catch (e) {
			console.error("[NativeDispatch] placeCall failed", e);
			this.logDispatchEntry({
				channel: "VOICE_CALL",
				target: phone,
				status: "FAILED",
				details: e instanceof Error ? e.message : String(e)
			});
			return {
				success: false,
				simulated: false,
				error: e instanceof Error ? e.message : String(e),
				status: "FAILED"
			};
		}
	}
	static async openWhatsApp(phone, message) {
		if (!this.isNative) {
			console.log(`[NativeDispatch:web-sim] Would open WhatsApp to ${phone}: "${message}"`);
			this.logDispatchEntry({
				channel: "WHATSAPP",
				target: phone,
				status: "SENT",
				details: `Simulated WhatsApp dispatch: "${message.slice(0, 50)}..."`
			});
			return {
				success: true,
				simulated: true
			};
		}
		try {
			const res = await NativeEmergencyDispatch.openWhatsApp({
				phone,
				message
			});
			const status = res.opened ? "SENT" : "FAILED";
			this.logDispatchEntry({
				channel: "WHATSAPP",
				target: phone,
				status,
				details: res.error || (res.opened ? "WhatsApp intent launched." : "WhatsApp failed")
			});
			return {
				success: res.opened,
				simulated: false,
				error: res.error
			};
		} catch (e) {
			console.error("[NativeDispatch] openWhatsApp failed", e);
			this.logDispatchEntry({
				channel: "WHATSAPP",
				target: phone,
				status: "FAILED",
				details: e instanceof Error ? e.message : String(e)
			});
			return {
				success: false,
				simulated: false,
				error: e instanceof Error ? e.message : String(e)
			};
		}
	}
	static async triggerVibration() {
		if (navigator.vibrate) try {
			navigator.vibrate([
				400,
				200,
				400,
				200,
				600
			]);
		} catch (e) {
			console.warn("Vibration rejected by environment:", e);
		}
		console.log("[NativeDispatch] High-intensity distress haptics sequence engaged.");
	}
	static async forceUnlockAndWake() {
		if (this.isNative) try {
			await SafetyLinkEmergency.enforceHardwareWake();
		} catch (e) {
			console.warn("[NativeDispatch] enforceHardwareWake failed", e);
		}
		console.log("[NativeDispatch] Android background force-unlock and keyguard-bypass routine triggered.");
	}
	/**
	* Retrieves real-time device battery percentage and charging state via native
	* Android BatteryManager or the standard Web Battery Status API.
	*/
	static async getDeviceBattery() {
		if (this.isNative) try {
			const res = await SafetyLinkEmergency.getDeviceBattery();
			return {
				level: Math.round(res.level),
				isCharging: !!res.isCharging,
				chargingTime: res.chargingTime,
				dischargingTime: res.dischargingTime,
				isSupported: true
			};
		} catch (err) {
			console.warn("[NativeDispatch] Native getDeviceBattery failed, falling back to Web API:", err);
		}
		try {
			if (typeof navigator !== "undefined" && "getBattery" in navigator) {
				const battery = await navigator.getBattery();
				return {
					level: Math.round(battery.level * 100),
					isCharging: !!battery.charging,
					chargingTime: battery.chargingTime,
					dischargingTime: battery.dischargingTime,
					isSupported: true
				};
			}
		} catch (e) {
			console.warn("[NativeDispatch] navigator.getBattery unavailable:", e);
		}
		return {
			level: 95,
			isCharging: false,
			isSupported: false
		};
	}
	/**
	* Subscribes to real-time charge and battery level changes.
	* Returns an unsubscribe function.
	*/
	static subscribeBatteryUpdates(callback) {
		let active = true;
		if (typeof navigator !== "undefined" && "getBattery" in navigator) navigator.getBattery().then((battery) => {
			if (!active) return;
			const handler = () => {
				if (!active) return;
				callback({
					level: Math.round(battery.level * 100),
					isCharging: !!battery.charging,
					chargingTime: battery.chargingTime,
					dischargingTime: battery.dischargingTime,
					isSupported: true
				});
			};
			battery.addEventListener("levelchange", handler);
			battery.addEventListener("chargingchange", handler);
			handler();
		}).catch(() => {});
		const interval = setInterval(async () => {
			if (!active) return;
			try {
				callback(await this.getDeviceBattery());
			} catch {}
		}, 15e3);
		return () => {
			active = false;
			clearInterval(interval);
		};
	}
	/**
	* Retrieves installed active SIM card profiles from device SubscriptionManager.
	*/
	static async getSimCards() {
		if (!this.isNative) return {
			sims: [{
				subscriptionId: 1,
				slot: 0,
				carrier: "Vodacom (Simulated)",
				label: "SIM 1 - Primary Voice & Data"
			}, {
				subscriptionId: 2,
				slot: 1,
				carrier: "MTN / Rain (Simulated)",
				label: "SIM 2 - Dedicated Emergency"
			}],
			preferredSubscriptionId: Number(localStorage.getItem("sl_preferred_sim_id") || "-1")
		};
		try {
			const res = await NativeEmergencyDispatch.getSimCards();
			return {
				sims: res.sims || [],
				preferredSubscriptionId: res.preferredSubscriptionId ?? -1,
				error: res.error
			};
		} catch (e) {
			console.warn("[NativeDispatch] getSimCards error:", e);
			return {
				sims: [],
				preferredSubscriptionId: -1,
				error: e instanceof Error ? e.message : String(e)
			};
		}
	}
	/**
	* Locks all emergency SMS, Calls, and USSDs to the selected SIM card subscription ID.
	* Passing -1 sets it to System Default (auto-handled by OS with zero user prompts).
	*/
	static async setPreferredSim(subscriptionId) {
		localStorage.setItem("sl_preferred_sim_id", subscriptionId.toString());
		if (!this.isNative) return subscriptionId;
		try {
			return (await NativeEmergencyDispatch.setPreferredSim({ subscriptionId })).preferredSubscriptionId;
		} catch (e) {
			console.warn("[NativeDispatch] setPreferredSim error:", e);
			return subscriptionId;
		}
	}
	/**
	* Persists user profile, alert note, coordinates, and emergency contacts to native
	* SharedPreferences (safetylink_prefs and sl_contacts_store) so DispatchRunner.java
	* can execute completely standalone from physical buttons without WebView.
	*/
	static async saveNativeProfile(payload) {
		if (!this.isNative) return true;
		try {
			await NativeEmergencyDispatch.saveNativeProfile(payload);
			return true;
		} catch (e) {
			console.warn("[NativeDispatch] saveNativeProfile failed:", e);
			return false;
		}
	}
};
//#endregion
export { NativeDispatchService_exports as n, SafetyLinkEmergency as r, NativeDispatchService as t };
