import { d as NativeBiometric, p as BiometryType } from "./vendor-DZX22qT5.js";
import { _ as Capacitor } from "./capacitor-B_jS8XWy.js";
var biometricService = class BiometricService {
	static instance;
	sessionExpiry = {};
	SESSION_DURATION_MS = 3e5;
	constructor() {}
	static getInstance() {
		if (!BiometricService.instance) BiometricService.instance = new BiometricService();
		return BiometricService.instance;
	}
	/**
	* Checks if biometric hardware (fingerprint, face, etc.) is available on the current device
	*/
	async checkAvailability() {
		if (!Capacitor.isNativePlatform()) {
			const hasWebAuthn = typeof window !== "undefined" && window.PublicKeyCredential !== void 0 && typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === "function";
			let webAuthnAvailable = false;
			if (hasWebAuthn) try {
				webAuthnAvailable = await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
			} catch (_) {
				webAuthnAvailable = false;
			}
			return {
				isAvailable: webAuthnAvailable,
				biometryType: webAuthnAvailable ? "FINGERPRINT" : "NONE",
				hasHardware: webAuthnAvailable
			};
		}
		try {
			const result = await NativeBiometric.isAvailable({ useFallback: true });
			let biometryType = "NONE";
			if (result.biometryType === BiometryType.TOUCH_ID) biometryType = "TOUCH_ID";
			else if (result.biometryType === BiometryType.FACE_ID || result.biometryType === BiometryType.FACE_AUTHENTICATION) biometryType = "FACE_ID";
			else if (result.biometryType === BiometryType.FINGERPRINT) biometryType = "FINGERPRINT";
			else if (result.biometryType === BiometryType.IRIS_AUTHENTICATION) biometryType = "IRIS";
			else if (result.isAvailable) biometryType = "FINGERPRINT";
			return {
				isAvailable: !!result.isAvailable,
				biometryType,
				hasHardware: !!result.isAvailable
			};
		} catch (err) {
			console.warn("[BiometricService] Availability check failed:", err?.message || err);
			return {
				isAvailable: false,
				biometryType: "NONE",
				hasHardware: false,
				error: err?.message
			};
		}
	}
	/**
	* Prompts the user with the native Android BiometricPrompt / iOS FaceID or fallback credential
	*/
	async authenticate(options) {
		const title = options?.title || "SafetyLink Biometric Security";
		const subtitle = options?.subtitle || "Identity Verification Required";
		const description = options?.description || "Confirm your fingerprint to access confidential assets.";
		const negativeButtonText = options?.negativeButtonText || "Use PIN";
		if (!Capacitor.isNativePlatform()) {
			if (typeof window !== "undefined" && window.PublicKeyCredential) try {
				if (await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()) return true;
			} catch (_) {}
			return false;
		}
		try {
			await NativeBiometric.verifyIdentity({
				title,
				subtitle,
				description,
				negativeButtonText,
				maxAttempts: 3,
				useFallback: true
			});
			return true;
		} catch (err) {
			console.warn("[BiometricService] Verification failed/canceled:", err?.message || err);
			return false;
		}
	}
	/**
	* Validates if a scope (e.g. 'vault', 'settings') currently has an active biometric grace period
	*/
	isScopeUnlocked(scope) {
		const expiry = this.sessionExpiry[scope];
		if (!expiry) return false;
		if (Date.now() > expiry) {
			delete this.sessionExpiry[scope];
			return false;
		}
		return true;
	}
	/**
	* Grants an authenticated grace window for the specified scope
	*/
	grantScopeUnlock(scope, durationMs) {
		this.sessionExpiry[scope] = Date.now() + (durationMs || this.SESSION_DURATION_MS);
	}
	/**
	* Manually locks the given scope immediately
	*/
	lockScope(scope) {
		delete this.sessionExpiry[scope];
	}
}.getInstance();
//#endregion
export { biometricService as t };
