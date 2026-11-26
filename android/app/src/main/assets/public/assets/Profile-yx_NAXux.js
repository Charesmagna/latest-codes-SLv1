import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { $ as MapPin, Ct as Camera, D as Save, Ot as Activity, P as Phone, kt as require_react, u as User } from "./icons-B-I2x5TV.js";
import { w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-CoihKo_w.js";
//#region src/components/Profile.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Profile = () => {
	const { currentUser, updateClientProfile, addToast } = useAppStore();
	const [fullName, setFullName] = (0, import_react.useState)(currentUser?.fullName || "");
	const [username, setUsername] = (0, import_react.useState)(currentUser?.username || "");
	const [phone, setPhone] = (0, import_react.useState)(currentUser?.phone || "");
	const [medicalInfo, setMedicalInfo] = (0, import_react.useState)(currentUser?.medicalInfo || "");
	const [homeAddress, setHomeAddress] = (0, import_react.useState)(currentUser?.homeAddress || "");
	const [workAddress, setWorkAddress] = (0, import_react.useState)(currentUser?.workAddress || "");
	(0, import_react.useEffect)(() => {
		if (currentUser) {
			setFullName(currentUser.fullName || "");
			setUsername(currentUser.username || "");
			setPhone(currentUser.phone || "");
			setMedicalInfo(currentUser.medicalInfo || "");
			setHomeAddress(currentUser.homeAddress || "");
			setWorkAddress(currentUser.workAddress || "");
		}
	}, [currentUser]);
	const handleSave = (e) => {
		e.preventDefault();
		if (!currentUser) return;
		updateClientProfile(currentUser.id, {
			fullName,
			username,
			phone,
			medicalInfo,
			homeAddress,
			workAddress
		});
		addToast("Profile updated successfully.", "success");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative group cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-3xl border-2 border-slate-700 overflow-hidden",
						children: currentUser?.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: currentUser.avatarUrl,
							alt: "Avatar",
							className: "w-full h-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "👤" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {
							size: 16,
							className: "text-white mb-1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[8px] font-bold text-white uppercase tracking-wider",
							children: "Change"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-black text-slate-200 leading-tight",
						children: fullName || "Set your name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-mono text-slate-500 mt-1",
						children: ["@", username || "username"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSave,
				className: "space-y-4 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 12 }), " Full Name"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: fullName,
								onChange: (e) => setFullName(e.target.value),
								className: "w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors",
								placeholder: "Your full name"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs font-bold leading-none",
									children: "@"
								}), " Username"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: username,
								onChange: (e) => setUsername(e.target.value),
								className: "w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors",
								placeholder: "Choose a username"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 12 }), " Primary Phone Number"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "tel",
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								className: "w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors",
								placeholder: "e.g. +27829110000"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 12 }), " Home Address"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: homeAddress,
								onChange: (e) => setHomeAddress(e.target.value),
								rows: 2,
								className: "w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none",
								placeholder: "Your primary physical address"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 12 }), " Medical Info & Notes"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: medicalInfo,
								onChange: (e) => setMedicalInfo(e.target.value),
								rows: 3,
								className: "w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none",
								placeholder: "Allergies, blood type, conditions..."
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pt-4 border-t border-slate-800/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						className: "w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] transition-colors flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 14 }), " Save Profile"]
					})
				})]
			})]
		})
	});
};
//#endregion
export { Profile };
