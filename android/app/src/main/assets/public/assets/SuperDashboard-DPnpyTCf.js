import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { kt as require_react } from "./icons-B-I2x5TV.js";
import { w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-DQZ7ziRL.js";
import { a as translate } from "./index-BolDz6jr.js";
import { t as FleetMonitor } from "./FleetMonitor-B8wJASt4.js";
//#region src/components/SuperAdminUsers.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var BACKEND = "https://safetylink-api.tshilidzi-mukwevho54.workers.dev";
/**
* Superadmin panel: counts, current users (masked numbers) and delete.
* Sign in with the superadmin email and password. The session lives in memory only.
*/
var SuperAdminUsers = () => {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [token, setToken] = (0, import_react.useState)("");
	const [summary, setSummary] = (0, import_react.useState)(null);
	const [users, setUsers] = (0, import_react.useState)([]);
	const [msg, setMsg] = (0, import_react.useState)("");
	const call = async (path, init) => {
		const res = await fetch(BACKEND + path, {
			...init,
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
				...init?.headers || {}
			}
		});
		const j = await res.json().catch(() => ({}));
		if (!res.ok) throw new Error(j.error || "Request failed (" + res.status + ")");
		return j;
	};
	const signIn = async () => {
		setMsg("");
		try {
			const res = await fetch(BACKEND + "/api/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email,
					password
				})
			});
			const j = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(j.error || "Sign-in failed");
			setToken(j.token);
			setPassword("");
			setMsg("");
		} catch (e) {
			setMsg(e.message);
		}
	};
	const load = async () => {
		setMsg("");
		try {
			const [s, u] = await Promise.all([call("/api/admin/summary"), call("/api/admin/users")]);
			setSummary(s);
			setUsers(u.users || []);
		} catch (e) {
			setMsg(e.message);
			if (String(e.message).includes("401")) setToken("");
		}
	};
	const remove = async (u) => {
		if (!window.confirm("Delete " + u.name + " (" + u.phone + ")? Their profile, contacts and app registration will be removed.")) return;
		try {
			await call("/api/admin/delete-user", {
				method: "POST",
				body: JSON.stringify({ phone: u.id })
			});
			setMsg("Deleted.");
			await load();
		} catch (e) {
			setMsg(e.message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 border-t border-slate-800 pt-6 text-slate-200 font-mono",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-bold text-cyan-400 tracking-widest uppercase mb-3",
				children: "Users"
			}),
			!token ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: "Superadmin email",
						className: "bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						placeholder: "Password",
						className: "bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: signIn,
						disabled: !email || !password,
						className: "bg-cyan-700 px-4 py-2 rounded text-sm disabled:opacity-40",
						children: "Sign in"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: load,
					className: "bg-cyan-700 px-4 py-2 rounded text-sm",
					children: "Refresh"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setToken("");
						setSummary(null);
						setUsers([]);
					},
					className: "bg-slate-800 px-4 py-2 rounded text-sm",
					children: "Sign out"
				})]
			}),
			msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-amber-400 mb-3",
				children: msg
			}),
			summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3 mb-4 text-center text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-900 rounded p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-slate-400",
							children: "Accounts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-emerald-400 text-lg font-bold",
							children: summary.totalAccounts
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-900 rounded p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-slate-400",
							children: "Active 30 days"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-emerald-400 text-lg font-bold",
							children: summary.activeLast30Days
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-900 rounded p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-slate-400",
							children: "Contacts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-emerald-400 text-lg font-bold",
							children: summary.contacts
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-900 rounded p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-slate-400",
							children: "App registered"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-emerald-400 text-lg font-bold",
							children: summary.devicesRegistered
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-900 rounded p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-slate-400",
							children: "Alerts 30 days"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-emerald-400 text-lg font-bold",
							children: summary.panicsLast30Days
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-900 rounded p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-slate-400",
							children: "Active 7 days"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-emerald-400 text-lg font-bold",
							children: summary.activeLast7Days
						})]
					})
				]
			}),
			users.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-slate-400 text-left",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Number" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Last sync" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Contacts" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "App" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-slate-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: u.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: u.phone }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: u.lastSync }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: u.contacts }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: u.appRegistered ? "Yes" : "No" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => remove(u),
								className: "text-red-400 hover:text-red-300",
								children: "Delete"
							}) })
						]
					}, u.id)) })]
				})
			})
		]
	});
};
//#endregion
//#region src/components/SuperDashboard.tsx
var SuperDashboard = () => {
	const { organizations, panicEvents, users, language } = useAppStore();
	const t = (key) => translate(key, language);
	(0, import_react.useEffect)(() => {}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-[#0b101a] border border-slate-800 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] min-h-[700px] text-white font-mono",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center mb-8 border-b border-slate-800 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-cyan-400 tracking-widest uppercase",
					children: t("super_dashboard.title") || "SafetyLink Global Command"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-500 mt-1",
					children: t("super_dashboard.subtitle") || "SUPER ADMIN DASHBOARD | READ-ONLY"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-slate-400",
								children: "Total Nodes (KPI)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-lg text-emerald-400 font-bold",
								children: organizations.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-slate-400",
								children: "Active Incidents (KPI)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-lg text-red-400 font-bold animate-pulse",
								children: panicEvents.filter((p) => p.status === "DISPATCHED" || p.status === "ESCALATING").length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-slate-400",
								children: "Total Users (KPI)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-lg text-blue-400 font-bold",
								children: users.length
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900/50 p-6 rounded-xl border border-slate-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold mb-4 text-cyan-500",
						children: "Organizations Table"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-slate-500 border-b border-slate-800",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2",
									children: "Code"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2",
									children: "Contact"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: organizations.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-slate-800/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2",
									children: o.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 font-mono text-cyan-400",
									children: o.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-slate-400",
									children: o.contactName
								})
							]
						}, o.id)) })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-900/50 p-6 rounded-xl border border-slate-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold mb-4 text-red-500",
						children: "Live Panics Table"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-slate-500 border-b border-slate-800",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2",
									children: "User"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2",
									children: "Time"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: panicEvents.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-slate-800/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2",
									children: p.profileUsed || "Unknown"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 font-mono text-red-400",
									children: p.status
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-slate-400",
									children: new Date(p.timestamp).toLocaleTimeString()
								})
							]
						}, p.id)) })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FleetMonitor, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuperAdminUsers, {})
		]
	});
};
//#endregion
export { SuperDashboard, SuperDashboard as default };
