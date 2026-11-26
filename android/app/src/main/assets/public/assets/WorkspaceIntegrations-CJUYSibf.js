import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { dt as Database, et as Mail, k as RectangleEllipsis, kt as require_react, rt as LoaderCircle, st as FileUp, tt as LogOut } from "./icons-B-I2x5TV.js";
import { w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { i as onAuthStateChanged, n as GoogleAuthProvider, o as signInWithPopup, s as signOut } from "./firebase-_Tcd8IXL.js";
import { a as firebase_applet_config_default, n as auth } from "./firebase-lrXFt3yU.js";
//#region src/components/WorkspaceIntegrations.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/drive");
provider.addScope("https://www.googleapis.com/auth/drive.readonly");
provider.addScope("https://mail.google.com/");
provider.addScope("https://www.googleapis.com/auth/forms.body");
provider.addScope("https://www.googleapis.com/auth/forms.responses.readonly");
var isSigningIn = false;
var cachedAccessToken = null;
var initAuth = (onAuthSuccess, onAuthFailure) => {
	return onAuthStateChanged(auth, async (user) => {
		if (user) {
			if (cachedAccessToken) {
				if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
			} else if (!isSigningIn) {
				cachedAccessToken = null;
				if (onAuthFailure) onAuthFailure();
			}
		} else {
			cachedAccessToken = null;
			if (onAuthFailure) onAuthFailure();
		}
	});
};
var googleSignIn = async () => {
	try {
		isSigningIn = true;
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		if (!credential?.accessToken) throw new Error("Failed to get access token from Firebase Auth");
		cachedAccessToken = credential.accessToken;
		return {
			user: result.user,
			accessToken: cachedAccessToken
		};
	} catch (error) {
		console.error("Sign in error:", error);
		throw error;
	} finally {
		isSigningIn = false;
	}
};
var logout = async () => {
	await signOut(auth);
	cachedAccessToken = null;
};
function WorkspaceIntegrations() {
	const [needsAuth, setNeedsAuth] = (0, import_react.useState)(true);
	const [token, setToken] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [isLoggingIn, setIsLoggingIn] = (0, import_react.useState)(false);
	const [isLoadingDrive, setIsLoadingDrive] = (0, import_react.useState)(false);
	const [driveFiles, setDriveFiles] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const unsub = initAuth((u, t) => {
			setNeedsAuth(false);
			setUser(u);
			setToken(t);
		}, () => {
			setNeedsAuth(true);
			setUser(null);
			setToken(null);
		});
		const script = document.createElement("script");
		script.src = "https://apis.google.com/js/api.js";
		script.onload = () => {
			window.gapi.load("picker", { "callback": () => {
				console.log("Picker loaded");
			} });
		};
		document.body.appendChild(script);
		return () => unsub();
	}, []);
	const handleLogin = async () => {
		setIsLoggingIn(true);
		try {
			const result = await googleSignIn();
			if (result) {
				setToken(result.accessToken);
				setUser(result.user);
				setNeedsAuth(false);
			}
		} catch (err) {
			console.error("Login failed:", err);
		} finally {
			setIsLoggingIn(false);
		}
	};
	const handleLogout = async () => {
		await logout();
		setNeedsAuth(true);
		setUser(null);
		setToken(null);
	};
	const loadDriveFiles = async () => {
		if (!token) return;
		setIsLoadingDrive(true);
		try {
			const data = await (await fetch("https://www.googleapis.com/drive/v3/files?pageSize=5&fields=files(id,name,mimeType)", { headers: { Authorization: `Bearer ${token}` } })).json();
			setDriveFiles(data.files || []);
		} catch (e) {
			console.error(e);
		}
		setIsLoadingDrive(false);
	};
	const openPicker = () => {
		if (!token || !window.google || !window.google.picker) return;
		const view = new window.google.picker.DocsView(window.google.picker.ViewId.DOCS);
		new window.google.picker.PickerBuilder().addView(view).setOAuthToken(token).setDeveloperKey(firebase_applet_config_default.apiKey).setCallback((data) => {
			if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.PICKED) {
				const doc = data[window.google.picker.Response.DOCUMENTS][0];
				alert(`Selected: ${doc[window.google.picker.Document.NAME]}`);
			}
		}).build().setVisible(true);
	};
	if (needsAuth) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 bg-slate-900 border border-slate-800 rounded-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-bold text-slate-300 font-mono tracking-widest uppercase mb-4",
				children: "Workspace Sync"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate-500 mb-6",
				children: "Connect your Google Workspace to sync evidence, dispatch logs, and command forms automatically."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleLogin,
				disabled: isLoggingIn,
				className: "w-full flex justify-center items-center gap-3 bg-white text-slate-900 hover:bg-slate-100 font-bold py-3 rounded-xl transition-all shadow-sm",
				children: [isLoggingIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin text-slate-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					className: "w-5 h-5",
					viewBox: "0 0 48 48",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							fill: "#EA4335",
							d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							fill: "#4285F4",
							d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							fill: "#FBBC05",
							d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							fill: "#34A853",
							d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							fill: "none",
							d: "M0 0h48v48H0z"
						})
					]
				}), "Connect Workspace"]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden font-mono",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/40",
					children: user?.email?.[0].toUpperCase()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-bold text-slate-200",
					children: user?.email
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[10px] text-emerald-400 flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }), "ACTIVE SYNC"]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleLogout,
				className: "text-slate-500 hover:text-slate-300 p-2 rounded-full hover:bg-slate-800 transition-colors",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 16 })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 grid grid-cols-2 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 sm:col-span-1 bg-slate-950/50 border border-slate-800 rounded-xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-3 text-slate-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {
								size: 16,
								className: "text-blue-400"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-bold uppercase tracking-wider",
								children: "Drive Evidence"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: loadDriveFiles,
							className: "w-full mb-3 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg font-bold uppercase transition-colors",
							children: isLoadingDrive ? "Fetching..." : "List Recent Files"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: driveFiles.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] truncate text-slate-400 bg-slate-900 px-2 py-1.5 rounded border border-slate-800",
								children: f.name
							}, f.id))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 sm:col-span-1 bg-slate-950/50 border border-slate-800 rounded-xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-3 text-slate-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, {
								size: 16,
								className: "text-purple-400"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-bold uppercase tracking-wider",
								children: "File Picker"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-slate-500 mb-4 leading-relaxed",
							children: "Select specific incident reports or camera logs securely using Google Picker."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: openPicker,
							className: "w-full text-[10px] bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 py-2 rounded-lg font-bold uppercase transition-colors",
							children: "Open File Picker"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 sm:col-span-1 bg-slate-950/50 border border-slate-800 rounded-xl p-4 opacity-70",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-3 text-slate-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
							size: 16,
							className: "text-red-400"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-bold uppercase tracking-wider",
							children: "Dispatch Mail"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-slate-500",
						children: "Gmail integration active. System will dispatch SOS emails via your account."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 sm:col-span-1 bg-slate-950/50 border border-slate-800 rounded-xl p-4 opacity-70",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-3 text-slate-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RectangleEllipsis, {
							size: 16,
							className: "text-emerald-400"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-bold uppercase tracking-wider",
							children: "Forms Sync"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-slate-500",
						children: "Connected to Google Forms for emergency response questionnaires."
					})]
				})
			]
		})]
	});
}
//#endregion
export { WorkspaceIntegrations as default, googleSignIn, initAuth, logout };
