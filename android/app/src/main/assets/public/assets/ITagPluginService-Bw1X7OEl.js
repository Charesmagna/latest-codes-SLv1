import { _ as Capacitor, b as registerPlugin } from "./capacitor-B_jS8XWy.js";
//#region src/services/ITagPluginService.ts
var ITagPlugin = registerPlugin("ITagPlugin");
var isNativeAvailable = Capacitor.isPluginAvailable("ITagPlugin") && Capacitor.getPlatform() !== "web";
/**
* Robust frontend wrapper service for the custom ITagPlugin.
* Handles background permission checks, scanning callbacks, GATT subscriptions, 
* button press logging, and triggering alarm sirens on connected physical iTAG keyfobs.
*/
var ITagPluginService = class {
	static listeners = [];
	/**
	* Initializes the plugin and requests dynamic Bluetooth and Location permissions.
	*/
	static async init() {
		if (!isNativeAvailable) {
			console.log("[ITagPluginService] Native BLE plugin not available on web platform. Bypassing native initialization.");
			return false;
		}
		try {
			console.log("[ITagPluginService] Initializing custom native BLE plugin...");
			const result = await ITagPlugin.checkAndRequestPermissions();
			console.log("[ITagPluginService] Native permissions status:", result);
			return result.granted;
		} catch (e) {
			console.warn("[ITagPluginService] Permissions request failed:", e);
			return false;
		}
	}
	/**
	* Starts scanning specifically for advertising iTAG devices or devices advertising 0xFFE0 service.
	* Calls onDeviceFound when a match is discovered.
	*/
	static async startScanning(onDeviceFound, onWarning) {
		if (!isNativeAvailable) {
			console.log("[ITagPluginService] Scanning requested on web platform (bypassed).");
			return;
		}
		await this.stopListening();
		const listener = await ITagPlugin.addListener("itag_found", (data) => {
			console.log("[ITagPluginService] Discovered matching iTAG node:", data.device);
			onDeviceFound(data.device);
		});
		this.listeners.push(listener);
		if (onWarning) {
			const warnListener = await ITagPlugin.addListener("itag_warning", (data) => {
				console.warn("[ITagPluginService] Native warning received:", data.warning);
				onWarning(data.warning);
			});
			this.listeners.push(warnListener);
		}
		await ITagPlugin.startScan();
	}
	/**
	* Stops the native BLE scanning process.
	*/
	static async stopScanning() {
		if (!isNativeAvailable) {
			console.log("[ITagPluginService] Stop scanning requested on web platform (bypassed).");
			return;
		}
		try {
			await ITagPlugin.stopScan();
			console.log("[ITagPluginService] Scanning stopped.");
		} catch (e) {
			console.warn("[ITagPluginService] Error stopping scan:", e);
		}
	}
	/**
	* Connects to a specific iTAG device and registers state changes and button triggers.
	*/
	static async connectDevice(address, onConnectionChange, onButtonPressed, onBatteryUpdate, onRssiUpdate) {
		if (!isNativeAvailable) {
			console.log(`[ITagPluginService] Connection to ${address} failed: Native BLE is only supported on native mobile platforms.`);
			return false;
		}
		try {
			console.log(`[ITagPluginService] Connecting to device at ${address}...`);
			if (onConnectionChange) {
				const connListener = await ITagPlugin.addListener("itag_connection_change", (data) => {
					if (data.address.toLowerCase() === address.toLowerCase()) {
						console.log(`[ITagPluginService] Connection state change for ${address}: ${data.status}`);
						onConnectionChange(data.status);
					}
				});
				this.listeners.push(connListener);
			}
			if (onButtonPressed) {
				const pressListener = await ITagPlugin.addListener("hardware_trigger_pressed", (data) => {
					if (data.address.toLowerCase() === address.toLowerCase()) {
						console.log(`[ITagPluginService] Physical button pressed on ${address} with code: ${data.value}`);
						onButtonPressed(data.value);
					}
				});
				this.listeners.push(pressListener);
			}
			if (onBatteryUpdate) {
				const batteryListener = await ITagPlugin.addListener("itag_battery_update", (data) => {
					if (data.address.toLowerCase() === address.toLowerCase()) {
						console.log(`[ITagPluginService] Battery level read for ${address}: ${data.battery}%`);
						onBatteryUpdate(data.battery);
					}
				});
				this.listeners.push(batteryListener);
			}
			if (onRssiUpdate) {
				const rssiListener = await ITagPlugin.addListener("itag_rssi_update", (data) => {
					if (data.address.toLowerCase() === address.toLowerCase()) {
						console.log(`[ITagPluginService] RSSI update for ${address}: ${data.rssi} dBm`);
						onRssiUpdate(data.rssi);
					}
				});
				this.listeners.push(rssiListener);
			}
			return (await ITagPlugin.connect({ address })).connected;
		} catch (e) {
			console.warn(`[ITagPluginService] Failed to establish GATT connection to ${address}:`, e);
			return false;
		}
	}
	/**
	* Disconnects a connected iTAG device.
	*/
	static async disconnectDevice(address) {
		if (!isNativeAvailable) {
			console.log(`[ITagPluginService] Disconnection from ${address} simulated on web.`);
			return true;
		}
		try {
			console.log(`[ITagPluginService] Terminating connection with device: ${address}`);
			return (await ITagPlugin.disconnect({
				address,
				unpair: false
			})).disconnected;
		} catch (e) {
			console.warn(`[ITagPluginService] Disconnect command failed for ${address}:`, e);
			return false;
		}
	}
	/**
	* Completely unpairs and forgets a saved iTAG device so it won't auto-reconnect.
	*/
	static async forgetDevice(address) {
		if (!isNativeAvailable) return true;
		try {
			console.log(`[ITagPluginService] Forgetting device: ${address}`);
			return (await ITagPlugin.forgetDevice({ address })).success;
		} catch (e) {
			console.warn(`[ITagPluginService] Forget device failed for ${address}:`, e);
			return false;
		}
	}
	/**
	* Retrieves all persistently bonded iTAG MAC addresses from native SharedPreferences.
	*/
	static async getSavedDevices() {
		if (!isNativeAvailable) return [];
		try {
			return (await ITagPlugin.getSavedDevices()).devices || [];
		} catch (e) {
			console.warn("[ITagPluginService] getSavedDevices failed:", e);
			return [];
		}
	}
	/**
	* Commands the physical iTAG to beep on-demand via the Immediate Alert characteristic.
	* @param address Mac address of the connected iTAG keyfob
	* @param level Alert level: 0 = silent, 1 = mild beep, 2 = high-frequency beep
	*/
	static async ringDevice(address, level = 2) {
		if (!isNativeAvailable) {
			console.log(`[ITagPluginService] Ring device ${address} level ${level} simulated on web.`);
			return true;
		}
		try {
			console.log(`[ITagPluginService] Triggering alert beep level ${level} on iTAG: ${address}`);
			return (await ITagPlugin.triggerAlert({
				address,
				level
			})).success;
		} catch (e) {
			console.warn(`[ITagPluginService] Immediate Alert write failed for ${address}:`, e);
			return false;
		}
	}
	/**
	* Retrieves an array of MAC addresses for all currently active native connection handles.
	*/
	static async getActiveConnections() {
		if (!isNativeAvailable) return [];
		try {
			return (await ITagPlugin.getConnectedDevices()).devices;
		} catch (e) {
			console.warn("[ITagPluginService] Failed to fetch active connections:", e);
			return [];
		}
	}
	/**
	* Dispose of all active event listeners.
	*/
	static async stopListening() {
		if (!isNativeAvailable) return;
		for (const listener of this.listeners) try {
			if (listener && typeof listener.remove === "function") await listener.remove();
		} catch (e) {
			console.warn("[ITagPluginService] Error removing event listener:", e);
		}
		this.listeners = [];
	}
};
//#endregion
export { ITagPluginService };
