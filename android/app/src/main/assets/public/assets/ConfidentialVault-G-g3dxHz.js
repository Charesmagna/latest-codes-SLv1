import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { kt as require_react } from "./icons-B-I2x5TV.js";
import { b as motion, w as require_jsx_runtime, x as AnimatePresence } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-CoihKo_w.js";
import { decryptFileData, derivePasswordVerifier, encryptFileData } from "./crypto-DEtdSq-j.js";
import { t as biometricService } from "./BiometricService-XD0nursW.js";
//#region src/components/GooglePicker.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function GooglePicker(_props) {
	const [msg] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 bg-slate-800 rounded-lg text-slate-400 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Google Drive integration coming soon." }), msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-red-400 mt-2",
			children: msg
		})]
	});
}
//#endregion
//#region src/components/ConfidentialVault.tsx
var ConfidentialVault = () => {
	const { activeSOSState, vaultPassword, vaultSecurityQuestion, vaultSecurityAnswer, vaultFiles, vaultApps, silenceAlerts, firestoreSync, decoyActive, decoyCode, decoyDistressCode, setDecoyActive, setDecoyCode, setDecoyDistressCode, setVaultPassword, setSilenceAlerts, setFirestoreSync, addVaultFile, removeVaultFile, addVaultApp, removeVaultApp, addToast, addAuditLog } = useAppStore();
	const [isUnlocked, setIsUnlocked] = (0, import_react.useState)(false);
	const [passwordInput, setPasswordInput] = (0, import_react.useState)("");
	const [showForgot, setShowForgot] = (0, import_react.useState)(false);
	const [forgotAnswerInput, setForgotAnswerInput] = (0, import_react.useState)("");
	const [biometricAvailable, setBiometricAvailable] = (0, import_react.useState)(false);
	const [biometryType, setBiometryType] = (0, import_react.useState)("FINGERPRINT");
	const [isAuthenticatingBiometric, setIsAuthenticatingBiometric] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		biometricService.checkAvailability().then((res) => {
			if (active) {
				setBiometricAvailable(res.isAvailable);
				setBiometryType(res.biometryType);
			}
		});
		if (biometricService.isScopeUnlocked("vault")) setIsUnlocked(true);
		return () => {
			active = false;
		};
	}, []);
	const handleBiometricUnlock = async () => {
		setIsAuthenticatingBiometric(true);
		try {
			if (await biometricService.authenticate({
				title: "Unlock Confidential Vault",
				subtitle: "Biometric Security Gate",
				description: "Verify your fingerprint or face to decrypt sensitive vault contents.",
				negativeButtonText: "Use Master Password"
			})) {
				setIsUnlocked(true);
				biometricService.grantScopeUnlock("vault");
				addToast("Biometrics verified. Vault unlocked.", "success");
				addAuditLog("SECURITY", "INFO", "Confidential Vault unlocked.", "Biometric identity verified.");
			} else addToast("Biometric authentication unconfirmed or canceled.", "warn");
		} catch (err) {
			addToast(`Biometric error: ${err.message}`, "error");
		} finally {
			setIsAuthenticatingBiometric(false);
		}
	};
	const [setupPassword, setSetupPassword] = (0, import_react.useState)("");
	const [setupQuestion, setSetupQuestion] = (0, import_react.useState)("What was your first tactical security node ID?");
	const [setupAnswer, setSetupAnswer] = (0, import_react.useState)("");
	const [newFileName, setNewFileName] = (0, import_react.useState)("");
	const [newFileType, setNewFileType] = (0, import_react.useState)("PDF");
	const [newFileSize, setNewFileSize] = (0, import_react.useState)("1.2 MB");
	const [newAppName, setNewAppName] = (0, import_react.useState)("");
	const [newAppPackage, setNewAppPackage] = (0, import_react.useState)("");
	const [isEncrypting, setIsEncrypting] = (0, import_react.useState)(false);
	const [dragActive, setDragActive] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const [credentials, setCredentials] = (0, import_react.useState)(() => {
		try {
			const raw = localStorage.getItem("sl_vault_passwords");
			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	});
	const [credLabel, setCredLabel] = (0, import_react.useState)("");
	const [credUsername, setCredUsername] = (0, import_react.useState)("");
	const [credPassword, setCredPassword] = (0, import_react.useState)("");
	const [credNotes, setCredNotes] = (0, import_react.useState)("");
	const [credSearch, setCredSearch] = (0, import_react.useState)("");
	const [revealedCreds, setRevealedCreds] = (0, import_react.useState)({});
	const persistCredentials = (next) => {
		setCredentials(next);
		try {
			localStorage.setItem("sl_vault_passwords", JSON.stringify(next));
		} catch {}
	};
	const handleAddCredential = async (e) => {
		e.preventDefault();
		if (!credLabel.trim() || !credPassword.trim()) {
			addToast("Credential label and password are required.", "warn");
			return;
		}
		try {
			const payload = new TextEncoder().encode(JSON.stringify({
				password: credPassword,
				notes: credNotes.trim()
			}));
			const { ciphertext, iv, salt } = await encryptFileData(payload.buffer, vaultPassword || "sl-vault-session");
			const entry = {
				id: "cred-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
				label: credLabel.trim(),
				username: credUsername.trim(),
				ciphertext,
				iv,
				salt,
				createdAt: Date.now()
			};
			persistCredentials([entry, ...credentials]);
			setCredLabel("");
			setCredUsername("");
			setCredPassword("");
			setCredNotes("");
			addToast(`Credential "${entry.label}" encrypted with AES-GCM-256.`, "success");
			addAuditLog("SECURITY", "INFO", `Password Manager entry sealed: ${entry.label}`, "Encrypted locally with Web Crypto AES-GCM.");
		} catch (err) {
			addToast(`Failed to encrypt credential: ${err?.message || "Error"}`, "error");
		}
	};
	const handleRevealCredential = async (cred) => {
		if (revealedCreds[cred.id]) {
			setRevealedCreds((prev) => {
				const copy = { ...prev };
				delete copy[cred.id];
				return copy;
			});
			return;
		}
		try {
			const buf = await decryptFileData(cred.ciphertext, cred.iv, cred.salt, vaultPassword || "sl-vault-session");
			const parsed = JSON.parse(new TextDecoder().decode(buf));
			setRevealedCreds((prev) => ({
				...prev,
				[cred.id]: parsed
			}));
		} catch {
			addToast("Unable to decrypt credential with active vault key.", "error");
		}
	};
	const handleCopyCredentialPassword = async (cred) => {
		try {
			let secret = revealedCreds[cred.id]?.password;
			if (!secret) {
				const buf = await decryptFileData(cred.ciphertext, cred.iv, cred.salt, vaultPassword || "sl-vault-session");
				secret = JSON.parse(new TextDecoder().decode(buf)).password;
			}
			await navigator.clipboard?.writeText(secret || "");
			addToast(`Copied password for ${cred.label}.`, "success");
		} catch {
			addToast("Failed to decrypt & copy password.", "error");
		}
	};
	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
		else if (e.type === "dragleave") setDragActive(false);
	};
	const handleDrop = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		const file = e.dataTransfer.files?.[0];
		if (!file) return;
		await processAndEncryptFile(file);
	};
	const handleFileSelect = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		await processAndEncryptFile(file);
		if (e.target) e.target.value = "";
	};
	const processAndEncryptFile = async (file) => {
		setIsEncrypting(true);
		addToast(`Encrypting ${file.name} (Zero-Knowledge)...`, "info");
		try {
			const reader = new FileReader();
			reader.onload = async (event) => {
				try {
					const arrayBuffer = event.target?.result;
					const { ciphertext, iv, salt } = await encryptFileData(arrayBuffer, vaultPassword);
					addVaultFile({
						name: file.name,
						size: `${(file.size / 1024).toFixed(1)} KB`,
						type: file.name.split(".").pop()?.toUpperCase() || "BIN",
						ciphertext,
						iv,
						salt,
						isEncrypted: true
					});
					addToast(`File cryptographically sealed: ${file.name}`, "success");
					addAuditLog("SECURITY", "INFO", `File added to Zero-Knowledge Vault: ${file.name}`, "AES-GCM 256-bit sealed.");
				} catch (err) {
					addToast(`Encryption failed: ${err.message}`, "error");
				} finally {
					setIsEncrypting(false);
				}
			};
			reader.readAsArrayBuffer(file);
		} catch (err) {
			addToast(`Failed to read file: ${err.message}`, "error");
			setIsEncrypting(false);
		}
	};
	const handleDecryptAndDownload = async (file) => {
		if (!file.ciphertext || !file.iv || !file.salt) {
			addToast(`Decrypting mock file: ${file.name}`, "info");
			setTimeout(() => {
				const blob = new Blob([`Decrypted mock payload for ${file.name}`], { type: "text/plain" });
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = file.name;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				addToast(`Mock file decrypted & downloaded!`, "success");
			}, 500);
			return;
		}
		addToast(`Decrypting cryptographic node: ${file.name}...`, "info");
		try {
			const arrayBuffer = await decryptFileData(file.ciphertext, file.iv, file.salt, vaultPassword);
			const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = file.name;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			addToast(`File verified & decrypted: ${file.name}`, "success");
			addAuditLog("SECURITY", "INFO", `Decrypted and downloaded file: ${file.name}`, "Integrity check passed.");
		} catch (err) {
			addToast(`Decryption failed: Integrity check failed or incorrect key.`, "error");
			addAuditLog("SECURITY", "SEVERE", `Failed decryption attempt on file: ${file.name}`, err.message);
		}
	};
	const handleSetupSubmit = async (e) => {
		e.preventDefault();
		if (!setupPassword || !setupAnswer) {
			addToast("Please fill out all security credentials.", "error");
			return;
		}
		await setVaultPassword(setupPassword, setupQuestion, setupAnswer);
		setIsUnlocked(true);
		addToast("Confidential Vault encrypted successfully.", "success");
	};
	const handleUnlockSubmit = async (e) => {
		e.preventDefault();
		if (await derivePasswordVerifier(passwordInput) === vaultPassword) {
			setIsUnlocked(true);
			setShowForgot(false);
			setPasswordInput("");
			addToast("Cryptographic vault block decrypted.", "success");
			addAuditLog("SECURITY", "INFO", "Confidential Vault unlocked.", "Successful password entry.");
		} else addToast("Decryption failed: Incorrect password.", "error");
	};
	const handleForgotSubmit = (e) => {
		e.preventDefault();
		if (forgotAnswerInput.trim().toLowerCase() === vaultSecurityAnswer.trim().toLowerCase()) {
			setIsUnlocked(true);
			setShowForgot(false);
			setForgotAnswerInput("");
			addToast("Security answer verified. Vault unlocked.", "success");
			addAuditLog("SECURITY", "WARN", "Vault bypassed via security question.", "Forgot password recovery flow completed.");
		} else addToast("Verification failed: Incorrect security response.", "error");
	};
	const handleAddFile = (e) => {
		e.preventDefault();
		if (!newFileName) return;
		addVaultFile({
			name: newFileName.endsWith(`.${newFileType.toLowerCase()}`) ? newFileName : `${newFileName}.${newFileType.toLowerCase()}`,
			size: newFileSize,
			type: newFileType
		});
		setNewFileName("");
		addToast("File enqueued to secure directory block.", "success");
	};
	const handleAddApp = (e) => {
		e.preventDefault();
		if (!newAppName || !newAppPackage) return;
		addVaultApp({
			name: newAppName,
			packageName: newAppPackage
		});
		setNewAppName("");
		setNewAppPackage("");
		addToast("Target application bound to hidden system matrix.", "success");
	};
	if (activeSOSState !== "IDLE") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 midnight-glass border border-red-500/20 text-center space-y-4 animate-fadeIn",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center p-8 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pulse-glow-circle border-t-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-0 flex items-center justify-center text-red-500 font-mono text-xs font-bold animate-pulse",
					children: "LOCK"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-mono font-black uppercase text-red-400 tracking-wider",
					children: "Data-Sync Pending..."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-mono text-slate-500 leading-relaxed uppercase",
					children: "SOS distress signal broadcast active. Cryptographic partition instantly locked down to protect user-defined secure files and private applications."
				})]
			})]
		})
	});
	if (!vaultPassword) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-5 midnight-glass text-left space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-slate-900 pb-3 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xl",
				children: "🛡️"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-mono font-black uppercase tracking-wider text-slate-200",
				children: "Initialize Private Vault"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[8px] font-mono text-slate-500",
				children: "Configure Secure Cryptographic Segment"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSetupSubmit,
			className: "space-y-4 font-mono text-[10px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-slate-400 uppercase font-bold tracking-wider",
						children: "Vault Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						placeholder: "Enter secure master password...",
						value: setupPassword,
						onChange: (e) => setSetupPassword(e.target.value),
						className: "w-full p-2.5 bg-slate-950 border border-slate-900 focus:border-emerald-500/30 rounded-xl text-slate-100 placeholder-slate-700 outline-none transition-all"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-slate-400 uppercase font-bold tracking-wider",
						children: "Security Question"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: setupQuestion,
						onChange: (e) => setSetupQuestion(e.target.value),
						className: "w-full p-2.5 bg-slate-950 border border-slate-900 focus:border-emerald-500/30 rounded-xl text-slate-300 outline-none transition-all cursor-pointer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "What was your first tactical security node ID?" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "What is your primary emergency dispatch region?" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "What was the name of your first security responder unit?" })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-slate-400 uppercase font-bold tracking-wider",
						children: "Security Answer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Enter cryptographic fallback answer...",
						value: setupAnswer,
						onChange: (e) => setSetupAnswer(e.target.value),
						className: "w-full p-2.5 bg-slate-950 border border-slate-900 focus:border-emerald-500/30 rounded-xl text-slate-100 placeholder-slate-700 outline-none transition-all"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 font-bold uppercase tracking-wider rounded-xl transition-all",
					children: "Create Vault Partition"
				})
			]
		})]
	});
	if (!isUnlocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-5 midnight-glass text-left space-y-5 animate-fadeIn",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-slate-900 pb-3 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl",
						children: "🔐"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-mono font-black uppercase tracking-wider text-slate-200",
						children: "Decrypt Vault block"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] font-mono text-slate-500",
						children: "Secure operator verification required"
					})] })]
				})
			}),
			biometricAvailable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleBiometricUnlock,
					disabled: isAuthenticatingBiometric,
					className: "w-full py-3 bg-gradient-to-r from-emerald-950/50 via-slate-900 to-emerald-950/50 hover:from-emerald-900/60 hover:to-slate-800 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 font-mono text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-lg group active:scale-[0.98]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg group-hover:scale-110 transition-transform",
						children: biometryType === "FACE_ID" ? "👤" : "👆"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isAuthenticatingBiometric ? "Verifying Biometrics..." : `Scan ${biometryType === "FACE_ID" ? "Face ID" : "Fingerprint"} to Decrypt` })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[1px] flex-1 bg-slate-900" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] font-mono uppercase tracking-widest text-slate-600",
							children: "OR USE MASTER PASSWORD"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[1px] flex-1 bg-slate-900" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: !showForgot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
					initial: {
						opacity: 0,
						x: -10
					},
					animate: {
						opacity: 1,
						x: 0
					},
					exit: {
						opacity: 0,
						x: 10
					},
					onSubmit: handleUnlockSubmit,
					className: "space-y-4 font-mono text-[10px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-slate-400 uppercase font-bold tracking-wider",
								children: "Master Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								placeholder: "Enter vault password...",
								value: passwordInput,
								onChange: (e) => setPasswordInput(e.target.value),
								className: "w-full p-2.5 bg-slate-950 border border-slate-900 focus:border-cyan-500/30 rounded-xl text-slate-100 placeholder-slate-700 outline-none transition-all"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-between items-center text-[8px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowForgot(true),
								className: "text-cyan-400 hover:underline uppercase tracking-wider font-bold",
								children: "Forgot password?"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "w-full py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 font-bold uppercase tracking-wider rounded-xl transition-all",
							children: "Unlock Partition"
						})
					]
				}, "unlock") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
					initial: {
						opacity: 0,
						x: 10
					},
					animate: {
						opacity: 1,
						x: 0
					},
					exit: {
						opacity: 0,
						x: -10
					},
					onSubmit: handleForgotSubmit,
					className: "space-y-4 font-mono text-[10px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-slate-950/80 border border-slate-900 rounded-xl space-y-1 text-slate-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[8px] text-slate-500 font-bold uppercase block",
								children: "Security Question"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold",
								children: vaultSecurityQuestion
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-slate-400 uppercase font-bold tracking-wider",
								children: "Your Answer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Enter fallback answer...",
								value: forgotAnswerInput,
								onChange: (e) => setForgotAnswerInput(e.target.value),
								className: "w-full p-2.5 bg-slate-950 border border-slate-900 focus:border-amber-500/30 rounded-xl text-slate-100 placeholder-slate-700 outline-none transition-all"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-between items-center text-[8px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowForgot(false),
								className: "text-slate-500 hover:text-slate-300 uppercase tracking-wider font-bold",
								children: "Back to Password"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "w-full py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 font-bold uppercase tracking-wider rounded-xl transition-all",
							children: "Verify Answer"
						})
					]
				}, "forgot")
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 animate-fadeIn",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 midnight-glass text-left space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center border-b border-slate-900 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl",
								children: "🔓"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs font-mono font-black uppercase tracking-wider text-emerald-400",
								children: "Vault Partition Active"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[8px] font-mono text-slate-500",
								children: "Cryptographic block decrypted"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setIsUnlocked(false);
								biometricService.lockScope("vault");
								addToast("Confidential Vault locked successfully.", "info");
							},
							className: "text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-all",
							children: "Lock Vault"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 font-mono text-[9px] uppercase tracking-wider",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3 bg-slate-950/60 border border-slate-900 rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-slate-200",
									children: "Decoy Disguise Launcher"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[7.5px] text-slate-500 font-normal",
									children: "Launch app disguised as operational calculator"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setDecoyActive(!decoyActive),
									className: `px-3 py-1 rounded-lg border font-black transition-all ${decoyActive ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-slate-900/40 border-slate-800 text-slate-500"}`,
									children: decoyActive ? "ACTIVE" : "DISABLED"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3 bg-slate-950/60 border border-slate-900 rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-slate-200",
									children: "Tactical Silence Mode"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[7.5px] text-slate-500 font-normal",
									children: "Disable device audio sirens on SOS broadcast"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSilenceAlerts(!silenceAlerts),
									className: `px-3 py-1 rounded-lg border font-black transition-all ${silenceAlerts ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-slate-900/40 border-slate-800 text-slate-500"}`,
									children: silenceAlerts ? "SILENT" : "SIREN"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-3 bg-slate-950/60 border border-slate-900 rounded-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-slate-200",
									children: "Firestore Cloud Sync"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[7.5px] text-slate-500 font-normal",
									children: "Sync configuration securely with Firestore database"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFirestoreSync(!firestoreSync),
									className: `px-3 py-1 rounded-lg border font-black transition-all ${firestoreSync ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-slate-900/40 border-slate-800 text-slate-500"}`,
									children: firestoreSync ? "CLOUD ACTIVE" : "LOCAL ONLY"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 font-mono text-[9px] uppercase tracking-wider pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 font-bold block text-[7.5px]",
								children: "Calculator Bypass code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								maxLength: 4,
								value: decoyCode,
								onChange: (e) => setDecoyCode(e.target.value.replace(/[^0-9]/g, "")),
								className: "w-full bg-transparent border-none text-emerald-400 font-bold text-base outline-none p-0"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 font-bold block text-[7.5px]",
								children: "Covert Distress code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								maxLength: 4,
								value: decoyDistressCode,
								onChange: (e) => setDecoyDistressCode(e.target.value.replace(/[^0-9]/g, "")),
								className: "w-full bg-transparent border-none text-red-400 font-bold text-base outline-none p-0"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 midnight-glass text-left space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-slate-900 pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-mono font-black uppercase text-slate-300 tracking-wider",
							children: "Hidden specified applications"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8px] font-mono text-slate-500",
							children: "Apps hidden immediately on panic broadcast"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 font-mono text-[9px]",
						children: [vaultApps.map((app) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2.5 bg-slate-950/80 border border-slate-900 rounded-xl flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-slate-200 block",
								children: app.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[7px] text-slate-600 block",
								children: app.packageName
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									removeVaultApp(app.id);
									addToast("App removed from secure lockdown.", "info");
								},
								className: "text-red-500 hover:text-red-400 font-bold text-[8px] uppercase tracking-wider",
								children: "Remove"
							})]
						}, app.id)), vaultApps.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8.5px] text-slate-600 text-center uppercase tracking-wider py-2",
							children: "No apps in secure block list"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAddApp,
						className: "grid grid-cols-2 gap-2 pt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newAppPackage,
								onChange: (e) => {
									setNewAppPackage(e.target.value);
									const selectedOption = e.target.options[e.target.selectedIndex];
									if (selectedOption.text !== "Custom App...") setNewAppName(selectedOption.text);
								},
								className: "col-span-2 p-2 bg-slate-950 border border-slate-900 rounded-lg text-[9px] font-mono text-slate-200 outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "-- Select App to Hide --"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "org.thoughtcrime.securesms",
										children: "Signal Private Messenger"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "com.whatsapp",
										children: "WhatsApp"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "org.telegram.messenger",
										children: "Telegram"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "com.twitter.android",
										children: "X (Twitter)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "com.facebook.katana",
										children: "Facebook"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "com.google.android.apps.photos",
										children: "Google Photos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "com.google.android.gm",
										children: "Gmail"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "com.instagram.android",
										children: "Instagram"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "custom",
										children: "Custom App..."
									})
								]
							}),
							newAppPackage === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "App Name (e.g. Signal)",
								value: newAppName,
								onChange: (e) => setNewAppName(e.target.value),
								className: "p-2 bg-slate-950 border border-slate-900 rounded-lg text-[9px] font-mono text-slate-200 outline-none placeholder-slate-700"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Package (e.g. org.signal)",
								value: newAppPackage,
								onChange: (e) => setNewAppPackage(e.target.value),
								className: "p-2 bg-slate-950 border border-slate-900 rounded-lg text-[9px] font-mono text-slate-200 outline-none placeholder-slate-700"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "col-span-2 py-2 bg-slate-900/60 hover:bg-slate-850 text-slate-300 border border-slate-800 text-[8px] font-mono font-bold uppercase tracking-widest rounded-lg transition-all",
								children: "Add Hidden App Target"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 midnight-glass text-left space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-slate-900 pb-2 flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-mono font-black uppercase text-emerald-400 tracking-wider",
							children: "🔐 Encrypted Password Manager"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8px] font-mono text-slate-500",
							children: "Zero-Knowledge AES-256-GCM Credential Storage (On-Device)"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[8px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold px-2 py-0.5 rounded uppercase",
							children: [credentials.length, " SAVED"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: credSearch,
						onChange: (e) => setCredSearch(e.target.value),
						placeholder: "Search saved credentials...",
						className: "w-full p-2 bg-slate-950 border border-slate-900 rounded-lg text-[9px] font-mono text-slate-200 outline-none focus:border-emerald-500/50"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 font-mono text-[9px] max-h-56 overflow-y-auto",
						children: [credentials.filter((c) => !credSearch.trim() || c.label.toLowerCase().includes(credSearch.toLowerCase()) || c.username.toLowerCase().includes(credSearch.toLowerCase())).map((cred) => {
							const revealed = revealedCreds[cred.id];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2.5 bg-slate-950/80 border border-slate-900 rounded-xl space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-slate-200 block truncate",
											children: cred.label
										}), cred.username && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[8px] text-slate-500 block truncate",
											children: cred.username
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 shrink-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => handleRevealCredential(cred),
												className: "px-2 py-0.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded text-[7.5px] font-bold uppercase",
												children: revealed ? "Hide" : "Reveal"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => handleCopyCredentialPassword(cred),
												className: "px-2 py-0.5 bg-emerald-950/50 hover:bg-emerald-950 border border-emerald-500/30 text-emerald-400 rounded text-[7.5px] font-bold uppercase",
												children: "Copy"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													persistCredentials(credentials.filter((c) => c.id !== cred.id));
													addToast(`Removed credential "${cred.label}".`, "info");
												},
												className: "px-1.5 py-0.5 text-red-500 hover:text-red-400 font-bold text-[7.5px] uppercase",
												children: "Del"
											})
										]
									})]
								}), revealed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-2 bg-slate-900/70 border border-emerald-500/20 rounded-lg text-[8.5px] space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-emerald-300 font-bold break-all",
										children: ["Password: ", revealed.password]
									}), revealed.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-slate-400 break-words",
										children: ["Notes: ", revealed.notes]
									})]
								})]
							}, cred.id);
						}), credentials.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8.5px] text-slate-600 text-center uppercase tracking-wider py-2",
							children: "No credentials saved in password manager"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAddCredential,
						className: "space-y-2 pt-2 border-t border-slate-900/50 font-mono",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Service / Site (e.g. Banking)",
									value: credLabel,
									onChange: (e) => setCredLabel(e.target.value),
									className: "p-2 bg-slate-950 border border-slate-900 rounded-lg text-[9px] text-slate-200 outline-none",
									required: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Username / Email",
									value: credUsername,
									onChange: (e) => setCredUsername(e.target.value),
									className: "p-2 bg-slate-950 border border-slate-900 rounded-lg text-[9px] text-slate-200 outline-none"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									placeholder: "Password / Secret PIN",
									value: credPassword,
									onChange: (e) => setCredPassword(e.target.value),
									className: "p-2 bg-slate-950 border border-slate-900 rounded-lg text-[9px] text-slate-200 outline-none",
									required: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Optional recovery notes",
									value: credNotes,
									onChange: (e) => setCredNotes(e.target.value),
									className: "p-2 bg-slate-950 border border-slate-900 rounded-lg text-[9px] text-slate-200 outline-none"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-[8.5px] font-bold uppercase tracking-widest rounded-lg transition-all",
								children: "+ Encrypt & Save Credential"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 midnight-glass text-left space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-slate-900 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-mono font-black uppercase text-slate-300 tracking-wider",
						children: "Remote Secure Storage Link"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[8px] font-mono text-slate-500",
						children: "Link external protected nodes via OAuth"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GooglePicker, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 midnight-glass text-left space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-slate-900 pb-2 flex justify-between items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-mono font-black uppercase text-slate-300 tracking-wider",
							children: "Secure File block directory"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8px] font-mono text-slate-500",
							children: "Confidential nodes and logs locked under ZK vault"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold px-2 py-0.5 rounded uppercase",
							children: "AES-GCM 256-Bit"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onDragEnter: handleDrag,
						onDragOver: handleDrag,
						onDragLeave: handleDrag,
						onDrop: handleDrop,
						onClick: () => fileInputRef.current?.click(),
						className: `border border-dashed p-5 rounded-xl cursor-pointer text-center transition-all ${dragActive ? "border-cyan-500 bg-cyan-500/5" : "border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/70"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								ref: fileInputRef,
								onChange: handleFileSelect,
								className: "hidden"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl block mb-1",
								children: "📥"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[9px] font-mono text-slate-300 font-bold uppercase tracking-wider",
								children: ["Drag & drop files here, or ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-cyan-400 underline",
									children: "browse"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[7.5px] font-mono text-slate-500 uppercase mt-1",
								children: isEncrypting ? "Encrypting node..." : "Files are immediately encrypted client-side using Zero-Knowledge keys"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 font-mono text-[9px]",
						children: [vaultFiles.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2.5 bg-slate-950/80 border border-slate-900 rounded-xl flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 flex-1 min-w-0 mr-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base flex-shrink-0",
									children: "📄"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "truncate",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-slate-200 truncate",
											children: file.name
										}), file.ciphertext ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[6.5px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-1 rounded uppercase font-black tracking-widest flex-shrink-0",
											children: "ZK-AES"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[6.5px] bg-slate-900 border border-slate-800 text-slate-500 px-1 rounded uppercase font-black tracking-widest flex-shrink-0",
											children: "Default"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[7.5px] text-slate-500 block uppercase tracking-wider",
										children: [
											file.type,
											" · ",
											file.size
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 flex-shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleDecryptAndDownload(file),
									className: "text-cyan-400 hover:text-cyan-300 font-bold text-[8px] uppercase tracking-wider px-2 py-1 bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-900/30 rounded-lg transition-all",
									children: "Decrypt & Download"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										removeVaultFile(file.id);
										addToast("File deleted securely from vault.", "info");
									},
									className: "text-red-500 hover:text-red-400 font-bold text-[8px] uppercase tracking-wider px-2 py-1 bg-red-950/10 hover:bg-red-950/30 border border-red-900/10 rounded-lg transition-all",
									children: "Delete"
								})]
							})]
						}, file.id)), vaultFiles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[8.5px] text-slate-600 text-center uppercase tracking-wider py-2",
							children: "Secure directory block empty"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAddFile,
						className: "space-y-2 pt-2 border-t border-slate-900/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[8px] font-mono text-slate-500 uppercase tracking-wider font-bold",
								children: "Inject Plaintext Placeholder Block (Manual Setup):"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "File Title (e.g. mission_manifest)",
									value: newFileName,
									onChange: (e) => setNewFileName(e.target.value),
									className: "flex-1 p-2 bg-slate-950 border border-slate-900 rounded-lg text-[9px] font-mono text-slate-200 outline-none placeholder-slate-700"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: newFileType,
									onChange: (e) => setNewFileType(e.target.value),
									className: "p-2 bg-slate-950 border border-slate-900 rounded-lg text-[9px] font-mono text-slate-300 outline-none cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "PDF" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "JSON" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "XLSX" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "JPG" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "TXT" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "File Size (e.g. 512 KB)",
									value: newFileSize,
									onChange: (e) => setNewFileSize(e.target.value),
									className: "flex-1 p-2 bg-slate-950 border border-slate-900 rounded-lg text-[9px] font-mono text-slate-200 outline-none placeholder-slate-700"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 py-2 bg-slate-900/60 hover:bg-slate-850 text-slate-300 border border-slate-800 text-[8px] font-mono font-bold uppercase tracking-widest rounded-lg transition-all",
									children: "Inject File Block"
								})]
							})
						]
					})
				]
			})
		]
	});
};
//#endregion
export { ConfidentialVault };
