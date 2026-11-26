import { C as initializeApp, S as getApps, d as memoryLocalCache, n as GoogleAuthProvider, r as getAuth, u as getDocFromServer, v as doc, x as getApp, y as initializeFirestore } from "./firebase-_Tcd8IXL.js";
var firebase_applet_config_default = {
	projectId: "safetylink-99e56",
	appId: "1:632592710003:web:2b4a0845c9ccfc6f76ed06",
	apiKey: "AIzaSyCd2iCcJxxplbOzbi_nokqsXB10G4VAZos",
	authDomain: "safetylink-99e56.firebaseapp.com",
	firestoreDatabaseId: "ai-studio-safetylinkcore-007fb760-a967-4bff-baac-44f177daf47c",
	storageBucket: "safetylink-99e56.firebasestorage.app",
	messagingSenderId: "632592710003",
	measurementId: "G-DT3QV71F58",
	oAuthClientId: "632592710003-l1tjtsr60ncp9eqgjiuoq5rcp5kd04a2.apps.googleusercontent.com",
	recaptchaSiteKey: ""
};
//#endregion
//#region src/lib/firebase.ts
var app = !getApps().length ? initializeApp({
	projectId: firebase_applet_config_default.projectId,
	appId: firebase_applet_config_default.appId,
	apiKey: firebase_applet_config_default.apiKey,
	authDomain: firebase_applet_config_default.authDomain,
	storageBucket: firebase_applet_config_default.storageBucket,
	messagingSenderId: firebase_applet_config_default.messagingSenderId,
	measurementId: firebase_applet_config_default.measurementId
}) : getApp();
var db = initializeFirestore(app, {
	experimentalForceLongPolling: true,
	localCache: memoryLocalCache()
}, firebase_applet_config_default.firestoreDatabaseId || "(default)");
var auth = getAuth(app);
new GoogleAuthProvider().setCustomParameters({ prompt: "select_account" });
var OperationType = /* @__PURE__ */ function(OperationType) {
	OperationType["CREATE"] = "create";
	OperationType["UPDATE"] = "update";
	OperationType["DELETE"] = "delete";
	OperationType["LIST"] = "list";
	OperationType["GET"] = "get";
	OperationType["WRITE"] = "write";
	return OperationType;
}({});
function handleFirestoreError(error, operationType, path) {
	const errInfo = {
		error: error instanceof Error ? error.message : String(error),
		authInfo: {
			userId: auth.currentUser?.uid ?? null,
			email: auth.currentUser?.email ?? null,
			emailVerified: auth.currentUser?.emailVerified ?? null,
			isAnonymous: auth.currentUser?.isAnonymous ?? null,
			tenantId: auth.currentUser?.tenantId ?? null,
			providerInfo: auth.currentUser?.providerData?.map((provider) => ({
				providerId: provider.providerId,
				email: provider.email
			})) || []
		},
		operationType,
		path
	};
	console.error("Firestore Error: ", JSON.stringify(errInfo));
	throw new Error(JSON.stringify(errInfo));
}
async function testConnection() {
	try {
		await getDocFromServer(doc(db, "test", "connection"));
		return true;
	} catch (error) {
		if (error instanceof Error && error.message.includes("the client is offline")) console.error("Please check your Firebase configuration.");
		return false;
	}
}
if (typeof window !== "undefined") testConnection().catch(() => {});
//#endregion
export { firebase_applet_config_default as a, handleFirestoreError as i, auth as n, db as r, OperationType as t };
