//#region src/utils/crypto.ts
/**
* SafetyLink Client-Side Cryptographic Utilities
* Provides Zero-Knowledge encryption and decryption for files using Web Crypto AES-GCM (256-bit)
* with PBKDF2 key derivation (SHA-256, 100,000 iterations).
*/
async function deriveKey(password, salt) {
	const enc = new TextEncoder();
	const passwordKey = await window.crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]);
	return window.crypto.subtle.deriveKey({
		name: "PBKDF2",
		salt,
		iterations: 1e5,
		hash: "SHA-256"
	}, passwordKey, {
		name: "AES-GCM",
		length: 256
	}, false, ["encrypt", "decrypt"]);
}
/**
* Encrypts an ArrayBuffer of file data using the provided master password.
*/
async function encryptFileData(fileData, password) {
	const salt = window.crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16));
	const iv = window.crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12));
	const key = await deriveKey(password, salt);
	const encrypted = await window.crypto.subtle.encrypt({
		name: "AES-GCM",
		iv
	}, key, fileData);
	const uint8Encrypted = new Uint8Array(encrypted);
	let binary = "";
	for (let i = 0; i < uint8Encrypted.length; i++) binary += String.fromCharCode(uint8Encrypted[i]);
	return {
		ciphertext: window.btoa(binary),
		iv: window.btoa(String.fromCharCode(...iv)),
		salt: window.btoa(String.fromCharCode(...salt))
	};
}
/**
* Decrypts a base64 ciphertext using the master password and cryptographic salt/IV parameters.
*/
async function decryptFileData(ciphertextBase64, ivBase64, saltBase64, password) {
	const binaryCipher = window.atob(ciphertextBase64);
	const encryptedData = new Uint8Array(binaryCipher.length);
	for (let i = 0; i < binaryCipher.length; i++) encryptedData[i] = binaryCipher.charCodeAt(i);
	const binaryIv = window.atob(ivBase64);
	const iv = new Uint8Array(binaryIv.length);
	for (let i = 0; i < binaryIv.length; i++) iv[i] = binaryIv.charCodeAt(i);
	const binarySalt = window.atob(saltBase64);
	const salt = new Uint8Array(binarySalt.length);
	for (let i = 0; i < binarySalt.length; i++) salt[i] = binarySalt.charCodeAt(i);
	const key = await deriveKey(password, salt);
	return await window.crypto.subtle.decrypt({
		name: "AES-GCM",
		iv
	}, key, encryptedData);
}
async function derivePasswordVerifier(password) {
	const enc = new TextEncoder();
	const salt = enc.encode("sl-vault-verifier-v1");
	const keyMaterial = await window.crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveBits"]);
	const bits = await window.crypto.subtle.deriveBits({
		name: "PBKDF2",
		salt,
		iterations: 1e5,
		hash: "SHA-256"
	}, keyMaterial, 256);
	return Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
//#endregion
export { decryptFileData, derivePasswordVerifier, encryptFileData };
