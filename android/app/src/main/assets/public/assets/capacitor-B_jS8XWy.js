import { r as __exportAll } from "./rolldown-runtime-7_rZTKki.js";
//#region node_modules/@capacitor/core/dist/index.js
var dist_exports = /* @__PURE__ */ __exportAll({
	Capacitor: () => Capacitor,
	CapacitorException: () => CapacitorException,
	CapacitorPlatforms: () => CapacitorPlatforms,
	ExceptionCode: () => ExceptionCode,
	WebPlugin: () => WebPlugin,
	buildRequestInit: () => buildRequestInit,
	registerPlugin: () => registerPlugin
});
/*! Capacitor: https://capacitorjs.com/ - MIT License */
var createCapacitorPlatforms = (win) => {
	const defaultPlatformMap = /* @__PURE__ */ new Map();
	defaultPlatformMap.set("web", { name: "web" });
	const capPlatforms = win.CapacitorPlatforms || {
		currentPlatform: { name: "web" },
		platforms: defaultPlatformMap
	};
	const addPlatform = (name, platform) => {
		capPlatforms.platforms.set(name, platform);
	};
	const setPlatform = (name) => {
		if (capPlatforms.platforms.has(name)) capPlatforms.currentPlatform = capPlatforms.platforms.get(name);
	};
	capPlatforms.addPlatform = addPlatform;
	capPlatforms.setPlatform = setPlatform;
	return capPlatforms;
};
var initPlatforms = (win) => win.CapacitorPlatforms = createCapacitorPlatforms(win);
/**
* @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
*/
var CapacitorPlatforms = /*#__PURE__*/ initPlatforms(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
CapacitorPlatforms.addPlatform;
CapacitorPlatforms.setPlatform;
var ExceptionCode;
(function(ExceptionCode) {
	/**
	* API is not implemented.
	*
	* This usually means the API can't be used because it is not implemented for
	* the current platform.
	*/
	ExceptionCode["Unimplemented"] = "UNIMPLEMENTED";
	/**
	* API is not available.
	*
	* This means the API can't be used right now because:
	*   - it is currently missing a prerequisite, such as network connectivity
	*   - it requires a particular platform or browser version
	*/
	ExceptionCode["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));
var CapacitorException = class extends Error {
	constructor(message, code, data) {
		super(message);
		this.message = message;
		this.code = code;
		this.data = data;
	}
};
var getPlatformId = (win) => {
	var _a, _b;
	if (win === null || win === void 0 ? void 0 : win.androidBridge) return "android";
	else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) return "ios";
	else return "web";
};
var createCapacitor = (win) => {
	var _a, _b, _c, _d, _e;
	const capCustomPlatform = win.CapacitorCustomPlatform || null;
	const cap = win.Capacitor || {};
	const Plugins = cap.Plugins = cap.Plugins || {};
	/**
	* @deprecated Use `capCustomPlatform` instead, default functions like registerPlugin will function with the new object.
	*/
	const capPlatforms = win.CapacitorPlatforms;
	const defaultGetPlatform = () => {
		return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
	};
	const getPlatform = ((_a = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _a === void 0 ? void 0 : _a.getPlatform) || defaultGetPlatform;
	const defaultIsNativePlatform = () => getPlatform() !== "web";
	const isNativePlatform = ((_b = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _b === void 0 ? void 0 : _b.isNativePlatform) || defaultIsNativePlatform;
	const defaultIsPluginAvailable = (pluginName) => {
		const plugin = registeredPlugins.get(pluginName);
		if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) return true;
		if (getPluginHeader(pluginName)) return true;
		return false;
	};
	const isPluginAvailable = ((_c = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _c === void 0 ? void 0 : _c.isPluginAvailable) || defaultIsPluginAvailable;
	const defaultGetPluginHeader = (pluginName) => {
		var _a;
		return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find((h) => h.name === pluginName);
	};
	const getPluginHeader = ((_d = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _d === void 0 ? void 0 : _d.getPluginHeader) || defaultGetPluginHeader;
	const handleError = (err) => win.console.error(err);
	const pluginMethodNoop = (_target, prop, pluginName) => {
		return Promise.reject(`${pluginName} does not have an implementation of "${prop}".`);
	};
	const registeredPlugins = /* @__PURE__ */ new Map();
	const defaultRegisterPlugin = (pluginName, jsImplementations = {}) => {
		const registeredPlugin = registeredPlugins.get(pluginName);
		if (registeredPlugin) {
			console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
			return registeredPlugin.proxy;
		}
		const platform = getPlatform();
		const pluginHeader = getPluginHeader(pluginName);
		let jsImplementation;
		const loadPluginImplementation = async () => {
			if (!jsImplementation && platform in jsImplementations) jsImplementation = typeof jsImplementations[platform] === "function" ? jsImplementation = await jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
			else if (capCustomPlatform !== null && !jsImplementation && "web" in jsImplementations) jsImplementation = typeof jsImplementations["web"] === "function" ? jsImplementation = await jsImplementations["web"]() : jsImplementation = jsImplementations["web"];
			return jsImplementation;
		};
		const createPluginMethod = (impl, prop) => {
			var _a, _b;
			if (pluginHeader) {
				const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m) => prop === m.name);
				if (methodHeader) {
					if (methodHeader.rtype === "promise") return (options) => cap.nativePromise(pluginName, prop.toString(), options);
					else return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
				} else if (impl) return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
			} else if (impl) return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
			else throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
		};
		const createPluginMethodWrapper = (prop) => {
			let remove;
			const wrapper = (...args) => {
				const p = loadPluginImplementation().then((impl) => {
					const fn = createPluginMethod(impl, prop);
					if (fn) {
						const p = fn(...args);
						remove = p === null || p === void 0 ? void 0 : p.remove;
						return p;
					} else throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
				});
				if (prop === "addListener") p.remove = async () => remove();
				return p;
			};
			wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
			Object.defineProperty(wrapper, "name", {
				value: prop,
				writable: false,
				configurable: false
			});
			return wrapper;
		};
		const addListener = createPluginMethodWrapper("addListener");
		const removeListener = createPluginMethodWrapper("removeListener");
		const addListenerNative = (eventName, callback) => {
			const call = addListener({ eventName }, callback);
			const remove = async () => {
				const callbackId = await call;
				removeListener({
					eventName,
					callbackId
				}, callback);
			};
			const p = new Promise((resolve) => call.then(() => resolve({ remove })));
			p.remove = async () => {
				console.warn(`Using addListener() without 'await' is deprecated.`);
				await remove();
			};
			return p;
		};
		const proxy = new Proxy({}, { get(_, prop) {
			switch (prop) {
				case "$$typeof": return;
				case "toJSON": return () => ({});
				case "addListener": return pluginHeader ? addListenerNative : addListener;
				case "removeListener": return removeListener;
				default: return createPluginMethodWrapper(prop);
			}
		} });
		Plugins[pluginName] = proxy;
		registeredPlugins.set(pluginName, {
			name: pluginName,
			proxy,
			platforms: /* @__PURE__ */ new Set([...Object.keys(jsImplementations), ...pluginHeader ? [platform] : []])
		});
		return proxy;
	};
	const registerPlugin = ((_e = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _e === void 0 ? void 0 : _e.registerPlugin) || defaultRegisterPlugin;
	if (!cap.convertFileSrc) cap.convertFileSrc = (filePath) => filePath;
	cap.getPlatform = getPlatform;
	cap.handleError = handleError;
	cap.isNativePlatform = isNativePlatform;
	cap.isPluginAvailable = isPluginAvailable;
	cap.pluginMethodNoop = pluginMethodNoop;
	cap.registerPlugin = registerPlugin;
	cap.Exception = CapacitorException;
	cap.DEBUG = !!cap.DEBUG;
	cap.isLoggingEnabled = !!cap.isLoggingEnabled;
	cap.platform = cap.getPlatform();
	cap.isNative = cap.isNativePlatform();
	return cap;
};
var initCapacitorGlobal = (win) => win.Capacitor = createCapacitor(win);
var Capacitor = /*#__PURE__*/ initCapacitorGlobal(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
var registerPlugin = Capacitor.registerPlugin;
Capacitor.Plugins;
/**
* Base class web plugins should extend.
*/
var WebPlugin = class {
	constructor(config) {
		this.listeners = {};
		this.retainedEventArguments = {};
		this.windowListeners = {};
		if (config) {
			console.warn(`Capacitor WebPlugin "${config.name}" config object was deprecated in v3 and will be removed in v4.`);
			this.config = config;
		}
	}
	addListener(eventName, listenerFunc) {
		let firstListener = false;
		if (!this.listeners[eventName]) {
			this.listeners[eventName] = [];
			firstListener = true;
		}
		this.listeners[eventName].push(listenerFunc);
		const windowListener = this.windowListeners[eventName];
		if (windowListener && !windowListener.registered) this.addWindowListener(windowListener);
		if (firstListener) this.sendRetainedArgumentsForEvent(eventName);
		const remove = async () => this.removeListener(eventName, listenerFunc);
		return Promise.resolve({ remove });
	}
	async removeAllListeners() {
		this.listeners = {};
		for (const listener in this.windowListeners) this.removeWindowListener(this.windowListeners[listener]);
		this.windowListeners = {};
	}
	notifyListeners(eventName, data, retainUntilConsumed) {
		const listeners = this.listeners[eventName];
		if (!listeners) {
			if (retainUntilConsumed) {
				let args = this.retainedEventArguments[eventName];
				if (!args) args = [];
				args.push(data);
				this.retainedEventArguments[eventName] = args;
			}
			return;
		}
		listeners.forEach((listener) => listener(data));
	}
	hasListeners(eventName) {
		return !!this.listeners[eventName].length;
	}
	registerWindowListener(windowEventName, pluginEventName) {
		this.windowListeners[pluginEventName] = {
			registered: false,
			windowEventName,
			pluginEventName,
			handler: (event) => {
				this.notifyListeners(pluginEventName, event);
			}
		};
	}
	unimplemented(msg = "not implemented") {
		return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
	}
	unavailable(msg = "not available") {
		return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
	}
	async removeListener(eventName, listenerFunc) {
		const listeners = this.listeners[eventName];
		if (!listeners) return;
		const index = listeners.indexOf(listenerFunc);
		this.listeners[eventName].splice(index, 1);
		if (!this.listeners[eventName].length) this.removeWindowListener(this.windowListeners[eventName]);
	}
	addWindowListener(handle) {
		window.addEventListener(handle.windowEventName, handle.handler);
		handle.registered = true;
	}
	removeWindowListener(handle) {
		if (!handle) return;
		window.removeEventListener(handle.windowEventName, handle.handler);
		handle.registered = false;
	}
	sendRetainedArgumentsForEvent(eventName) {
		const args = this.retainedEventArguments[eventName];
		if (!args) return;
		delete this.retainedEventArguments[eventName];
		args.forEach((arg) => {
			this.notifyListeners(eventName, arg);
		});
	}
};
/******** END WEB VIEW PLUGIN ********/
/******** COOKIES PLUGIN ********/
/**
* Safely web encode a string value (inspired by js-cookie)
* @param str The string value to encode
*/
var encode = (str) => encodeURIComponent(str).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
/**
* Safely web decode a string value (inspired by js-cookie)
* @param str The string value to decode
*/
var decode = (str) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
var CapacitorCookiesPluginWeb = class extends WebPlugin {
	async getCookies() {
		const cookies = document.cookie;
		const cookieMap = {};
		cookies.split(";").forEach((cookie) => {
			if (cookie.length <= 0) return;
			let [key, value] = cookie.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
			key = decode(key).trim();
			value = decode(value).trim();
			cookieMap[key] = value;
		});
		return cookieMap;
	}
	async setCookie(options) {
		try {
			const encodedKey = encode(options.key);
			const encodedValue = encode(options.value);
			const expires = `; expires=${(options.expires || "").replace("expires=", "")}`;
			const path = (options.path || "/").replace("path=", "");
			const domain = options.url != null && options.url.length > 0 ? `domain=${options.url}` : "";
			document.cookie = `${encodedKey}=${encodedValue || ""}${expires}; path=${path}; ${domain};`;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async deleteCookie(options) {
		try {
			document.cookie = `${options.key}=; Max-Age=0`;
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async clearCookies() {
		try {
			const cookies = document.cookie.split(";") || [];
			for (const cookie of cookies) document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${(/* @__PURE__ */ new Date()).toUTCString()};path=/`);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async clearAllCookies() {
		try {
			await this.clearCookies();
		} catch (error) {
			return Promise.reject(error);
		}
	}
};
registerPlugin("CapacitorCookies", { web: () => new CapacitorCookiesPluginWeb() });
/**
* Read in a Blob value and return it as a base64 string
* @param blob The blob value to convert to a base64 string
*/
var readBlobAsBase64 = async (blob) => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.onload = () => {
		const base64String = reader.result;
		resolve(base64String.indexOf(",") >= 0 ? base64String.split(",")[1] : base64String);
	};
	reader.onerror = (error) => reject(error);
	reader.readAsDataURL(blob);
});
/**
* Normalize an HttpHeaders map by lowercasing all of the values
* @param headers The HttpHeaders object to normalize
*/
var normalizeHttpHeaders = (headers = {}) => {
	const originalKeys = Object.keys(headers);
	return Object.keys(headers).map((k) => k.toLocaleLowerCase()).reduce((acc, key, index) => {
		acc[key] = headers[originalKeys[index]];
		return acc;
	}, {});
};
/**
* Builds a string of url parameters that
* @param params A map of url parameters
* @param shouldEncode true if you should encodeURIComponent() the values (true by default)
*/
var buildUrlParams = (params, shouldEncode = true) => {
	if (!params) return null;
	return Object.entries(params).reduce((accumulator, entry) => {
		const [key, value] = entry;
		let encodedValue;
		let item;
		if (Array.isArray(value)) {
			item = "";
			value.forEach((str) => {
				encodedValue = shouldEncode ? encodeURIComponent(str) : str;
				item += `${key}=${encodedValue}&`;
			});
			item.slice(0, -1);
		} else {
			encodedValue = shouldEncode ? encodeURIComponent(value) : value;
			item = `${key}=${encodedValue}`;
		}
		return `${accumulator}&${item}`;
	}, "").substr(1);
};
/**
* Build the RequestInit object based on the options passed into the initial request
* @param options The Http plugin options
* @param extra Any extra RequestInit values
*/
var buildRequestInit = (options, extra = {}) => {
	const output = Object.assign({
		method: options.method || "GET",
		headers: options.headers
	}, extra);
	const type = normalizeHttpHeaders(options.headers)["content-type"] || "";
	if (typeof options.data === "string") output.body = options.data;
	else if (type.includes("application/x-www-form-urlencoded")) {
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(options.data || {})) params.set(key, value);
		output.body = params.toString();
	} else if (type.includes("multipart/form-data") || options.data instanceof FormData) {
		const form = new FormData();
		if (options.data instanceof FormData) options.data.forEach((value, key) => {
			form.append(key, value);
		});
		else for (const key of Object.keys(options.data)) form.append(key, options.data[key]);
		output.body = form;
		const headers = new Headers(output.headers);
		headers.delete("content-type");
		output.headers = headers;
	} else if (type.includes("application/json") || typeof options.data === "object") output.body = JSON.stringify(options.data);
	return output;
};
var CapacitorHttpPluginWeb = class extends WebPlugin {
	/**
	* Perform an Http request given a set of options
	* @param options Options to build the HTTP request
	*/
	async request(options) {
		const requestInit = buildRequestInit(options, options.webFetchExtra);
		const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
		const url = urlParams ? `${options.url}?${urlParams}` : options.url;
		const response = await fetch(url, requestInit);
		const contentType = response.headers.get("content-type") || "";
		let { responseType = "text" } = response.ok ? options : {};
		if (contentType.includes("application/json")) responseType = "json";
		let data;
		let blob;
		switch (responseType) {
			case "arraybuffer":
			case "blob":
				blob = await response.blob();
				data = await readBlobAsBase64(blob);
				break;
			case "json":
				data = await response.json();
				break;
			default: data = await response.text();
		}
		const headers = {};
		response.headers.forEach((value, key) => {
			headers[key] = value;
		});
		return {
			data,
			headers,
			status: response.status,
			url: response.url
		};
	}
	/**
	* Perform an Http GET request given a set of options
	* @param options Options to build the HTTP request
	*/
	async get(options) {
		return this.request(Object.assign(Object.assign({}, options), { method: "GET" }));
	}
	/**
	* Perform an Http POST request given a set of options
	* @param options Options to build the HTTP request
	*/
	async post(options) {
		return this.request(Object.assign(Object.assign({}, options), { method: "POST" }));
	}
	/**
	* Perform an Http PUT request given a set of options
	* @param options Options to build the HTTP request
	*/
	async put(options) {
		return this.request(Object.assign(Object.assign({}, options), { method: "PUT" }));
	}
	/**
	* Perform an Http PATCH request given a set of options
	* @param options Options to build the HTTP request
	*/
	async patch(options) {
		return this.request(Object.assign(Object.assign({}, options), { method: "PATCH" }));
	}
	/**
	* Perform an Http DELETE request given a set of options
	* @param options Options to build the HTTP request
	*/
	async delete(options) {
		return this.request(Object.assign(Object.assign({}, options), { method: "DELETE" }));
	}
};
registerPlugin("CapacitorHttp", { web: () => new CapacitorHttpPluginWeb() });
//#endregion
//#region \0vite/preload-helper.js
var scriptRel = "modulepreload";
var assetsURL = function(dep) {
	return "/" + dep;
};
var seen = {};
var isCssPreloadUrl = function isCssPreloadUrl(url) {
	return url.pathname.endsWith(".css");
};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		let preloadedHrefs;
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		function importMetaResolve(specifier) {
			if (import.meta.resolve) return new URL(import.meta.resolve(specifier));
			return new URL(
				specifier,
				/** #__KEEP__ */
				import.meta.url
			);
		}
		promise = allSettled(deps.map((depString) => {
			depString = assetsURL(depString, importerUrl);
			const dep = importMetaResolve(depString);
			if (dep.href in seen) return;
			seen[dep.href] = true;
			const isCss = isCssPreloadUrl(dep);
			if (preloadedHrefs === void 0) {
				preloadedHrefs = {
					all: /* @__PURE__ */ new Set(),
					styles: /* @__PURE__ */ new Set()
				};
				const links = document.getElementsByTagName("link");
				for (let i = links.length - 1; i >= 0; i--) {
					const link = links[i];
					preloadedHrefs.all.add(link.href);
					if (link.rel === "stylesheet") preloadedHrefs.styles.add(link.href);
				}
			}
			if ((isCss ? preloadedHrefs.styles : preloadedHrefs.all).has(dep.href)) return;
			const link = document.createElement("link");
			link.rel = isCss ? "stylesheet" : scriptRel;
			if (!isCss) link.as = "script";
			link.crossOrigin = "";
			link.href = dep.href;
			if (cspNonce) link.setAttribute("nonce", cspNonce);
			document.head.appendChild(link);
			if (isCss) return new Promise((res, rej) => {
				link.addEventListener("load", res);
				link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
			});
		}).filter((p) => p !== void 0));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
//#endregion
//#region node_modules/@capacitor/app/dist/esm/index.js
var esm_exports$3 = /* @__PURE__ */ __exportAll({ App: () => App });
var App = registerPlugin("App", { web: () => __vitePreload(() => Promise.resolve().then(() => web_exports$6).then((m) => new m.AppWeb()), void 0) });
//#endregion
//#region node_modules/@capacitor-community/bluetooth-le/dist/esm/definitions.js
/**
* Android scan mode
*/
var ScanMode;
(function(ScanMode) {
	/**
	* Perform Bluetooth LE scan in low power mode. This mode is enforced if the scanning application is not in foreground.
	* https://developer.android.com/reference/android/bluetooth/le/ScanSettings#SCAN_MODE_LOW_POWER
	*/
	ScanMode[ScanMode["SCAN_MODE_LOW_POWER"] = 0] = "SCAN_MODE_LOW_POWER";
	/**
	* Perform Bluetooth LE scan in balanced power mode. (default) Scan results are returned at a rate that provides a good trade-off between scan frequency and power consumption.
	* https://developer.android.com/reference/android/bluetooth/le/ScanSettings#SCAN_MODE_BALANCED
	*/
	ScanMode[ScanMode["SCAN_MODE_BALANCED"] = 1] = "SCAN_MODE_BALANCED";
	/**
	* Scan using highest duty cycle. It's recommended to only use this mode when the application is running in the foreground.
	* https://developer.android.com/reference/android/bluetooth/le/ScanSettings#SCAN_MODE_LOW_LATENCY
	*/
	ScanMode[ScanMode["SCAN_MODE_LOW_LATENCY"] = 2] = "SCAN_MODE_LOW_LATENCY";
})(ScanMode || (ScanMode = {}));
/**
* Android connection priority used in `requestConnectionPriority`
*/
var ConnectionPriority;
(function(ConnectionPriority) {
	/**
	* Use the connection parameters recommended by the Bluetooth SIG. This is the default value if no connection parameter update is requested.
	* https://developer.android.com/reference/android/bluetooth/BluetoothGatt#CONNECTION_PRIORITY_BALANCED
	*/
	ConnectionPriority[ConnectionPriority["CONNECTION_PRIORITY_BALANCED"] = 0] = "CONNECTION_PRIORITY_BALANCED";
	/**
	* Request a high priority, low latency connection. An application should only request high priority connection parameters to transfer large amounts of data over LE quickly. Once the transfer is complete, the application should request CONNECTION_PRIORITY_BALANCED connection parameters to reduce energy use.
	* https://developer.android.com/reference/android/bluetooth/BluetoothGatt#CONNECTION_PRIORITY_HIGH
	*/
	ConnectionPriority[ConnectionPriority["CONNECTION_PRIORITY_HIGH"] = 1] = "CONNECTION_PRIORITY_HIGH";
	/**
	* Request low power, reduced data rate connection parameters.
	* https://developer.android.com/reference/android/bluetooth/BluetoothGatt#CONNECTION_PRIORITY_LOW_POWER
	*/
	ConnectionPriority[ConnectionPriority["CONNECTION_PRIORITY_LOW_POWER"] = 2] = "CONNECTION_PRIORITY_LOW_POWER";
})(ConnectionPriority || (ConnectionPriority = {}));
//#endregion
//#region node_modules/@capacitor-community/bluetooth-le/dist/esm/conversion.js
/**
* Convert an array of numbers into a DataView.
*/
function numbersToDataView(value) {
	return new DataView(Uint8Array.from(value).buffer);
}
/**
* Convert a DataView into an array of numbers.
*/
function dataViewToNumbers(value) {
	return Array.from(new Uint8Array(value.buffer, value.byteOffset, value.byteLength));
}
/**
* Convert a 16 bit UUID into a 128 bit UUID string
* @param value number, e.g. 0x180d
* @return string, e.g. '0000180d-0000-1000-8000-00805f9b34fb'
*/
function numberToUUID(value) {
	return `0000${value.toString(16).padStart(4, "0")}-0000-1000-8000-00805f9b34fb`;
}
/**
* Convert a string of hex into a DataView of raw bytes.
* Note: characters other than [0-9a-fA-F] are ignored
* @param hex string of values, e.g. "00 01 02" or "000102"
* @return DataView of raw bytes
*/
function hexStringToDataView(hex) {
	const bin = [];
	let i, c, isEmpty = 1, buffer = 0;
	for (i = 0; i < hex.length; i++) {
		c = hex.charCodeAt(i);
		if (c > 47 && c < 58 || c > 64 && c < 71 || c > 96 && c < 103) {
			buffer = buffer << 4 ^ (c > 64 ? c + 9 : c) & 15;
			if (isEmpty ^= 1) bin.push(buffer & 255);
		}
	}
	return numbersToDataView(bin);
}
function dataViewToHexString(value) {
	return dataViewToNumbers(value).map((n) => {
		let s = n.toString(16);
		if (s.length == 1) s = "0" + s;
		return s;
	}).join(" ");
}
function webUUIDToString(uuid) {
	if (typeof uuid === "string") return uuid;
	else if (typeof uuid === "number") return numberToUUID(uuid);
	else throw new Error("Invalid UUID");
}
function mapToObject(map) {
	const obj = {};
	if (!map) return;
	map.forEach((value, key) => {
		obj[key.toString()] = value;
	});
	return obj;
}
//#endregion
//#region node_modules/@capacitor-community/bluetooth-le/dist/esm/plugin.js
var BluetoothLe = registerPlugin("BluetoothLe", { web: () => __vitePreload(() => Promise.resolve().then(() => web_exports$8).then((m) => new m.BluetoothLeWeb()), void 0) });
//#endregion
//#region node_modules/@capacitor-community/bluetooth-le/dist/esm/queue.js
var makeQueue = () => {
	let currentTask = Promise.resolve();
	return (fn) => new Promise((resolve, reject) => {
		currentTask = currentTask.then(() => fn()).then(resolve).catch(reject);
	});
};
function getQueue(enabled) {
	if (enabled) return makeQueue();
	return (fn) => fn();
}
//#endregion
//#region node_modules/@capacitor-community/bluetooth-le/dist/esm/validators.js
function parseUUID(uuid) {
	if (typeof uuid !== "string") throw new Error(`Invalid UUID type ${typeof uuid}. Expected string.`);
	uuid = uuid.toLowerCase();
	if (!(uuid.search(/^[0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12}$/) >= 0)) throw new Error(`Invalid UUID format ${uuid}. Expected 128 bit string (e.g. "0000180d-0000-1000-8000-00805f9b34fb").`);
	return uuid;
}
//#endregion
//#region node_modules/@capacitor-community/bluetooth-le/dist/esm/bleClient.js
var BleClientClass = class {
	constructor() {
		this.scanListener = null;
		this.eventListeners = /* @__PURE__ */ new Map();
		this.queue = getQueue(true);
	}
	enableQueue() {
		this.queue = getQueue(true);
	}
	disableQueue() {
		this.queue = getQueue(false);
	}
	async initialize(options) {
		await this.queue(async () => {
			await BluetoothLe.initialize(options);
		});
	}
	async isEnabled() {
		return await this.queue(async () => {
			return (await BluetoothLe.isEnabled()).value;
		});
	}
	async requestEnable() {
		await this.queue(async () => {
			await BluetoothLe.requestEnable();
		});
	}
	async enable() {
		await this.queue(async () => {
			await BluetoothLe.enable();
		});
	}
	async disable() {
		await this.queue(async () => {
			await BluetoothLe.disable();
		});
	}
	async startEnabledNotifications(callback) {
		await this.queue(async () => {
			var _a;
			const key = `onEnabledChanged`;
			await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
			const listener = await BluetoothLe.addListener(key, (result) => {
				callback(result.value);
			});
			this.eventListeners.set(key, listener);
			await BluetoothLe.startEnabledNotifications();
		});
	}
	async stopEnabledNotifications() {
		await this.queue(async () => {
			var _a;
			const key = `onEnabledChanged`;
			await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
			this.eventListeners.delete(key);
			await BluetoothLe.stopEnabledNotifications();
		});
	}
	async isLocationEnabled() {
		return await this.queue(async () => {
			return (await BluetoothLe.isLocationEnabled()).value;
		});
	}
	async openLocationSettings() {
		await this.queue(async () => {
			await BluetoothLe.openLocationSettings();
		});
	}
	async openBluetoothSettings() {
		await this.queue(async () => {
			await BluetoothLe.openBluetoothSettings();
		});
	}
	async openAppSettings() {
		await this.queue(async () => {
			await BluetoothLe.openAppSettings();
		});
	}
	async setDisplayStrings(displayStrings) {
		await this.queue(async () => {
			await BluetoothLe.setDisplayStrings(displayStrings);
		});
	}
	async requestDevice(options) {
		options = options ? this.validateRequestBleDeviceOptions(options) : void 0;
		return await this.queue(async () => {
			return await BluetoothLe.requestDevice(options);
		});
	}
	async requestLEScan(options, callback) {
		options = this.validateRequestBleDeviceOptions(options);
		await this.queue(async () => {
			var _a;
			await ((_a = this.scanListener) === null || _a === void 0 ? void 0 : _a.remove());
			this.scanListener = await BluetoothLe.addListener("onScanResult", (resultInternal) => {
				callback(Object.assign(Object.assign({}, resultInternal), {
					manufacturerData: this.convertObject(resultInternal.manufacturerData),
					serviceData: this.convertObject(resultInternal.serviceData),
					rawAdvertisement: resultInternal.rawAdvertisement ? this.convertValue(resultInternal.rawAdvertisement) : void 0
				}));
			});
			await BluetoothLe.requestLEScan(options);
		});
	}
	async stopLEScan() {
		await this.queue(async () => {
			var _a;
			await ((_a = this.scanListener) === null || _a === void 0 ? void 0 : _a.remove());
			this.scanListener = null;
			await BluetoothLe.stopLEScan();
		});
	}
	async getDevices(deviceIds) {
		if (!Array.isArray(deviceIds)) throw new Error("deviceIds must be an array");
		return this.queue(async () => {
			return (await BluetoothLe.getDevices({ deviceIds })).devices;
		});
	}
	async getConnectedDevices(services) {
		if (!Array.isArray(services)) throw new Error("services must be an array");
		services = services.map(parseUUID);
		return this.queue(async () => {
			return (await BluetoothLe.getConnectedDevices({ services })).devices;
		});
	}
	async getBondedDevices() {
		return this.queue(async () => {
			return (await BluetoothLe.getBondedDevices()).devices;
		});
	}
	async connect(deviceId, onDisconnect, options) {
		await this.queue(async () => {
			var _a;
			if (onDisconnect) {
				const key = `disconnected|${deviceId}`;
				await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
				const listener = await BluetoothLe.addListener(key, () => {
					onDisconnect(deviceId);
				});
				this.eventListeners.set(key, listener);
			}
			await BluetoothLe.connect(Object.assign({ deviceId }, options));
		});
	}
	async createBond(deviceId, options) {
		await this.queue(async () => {
			await BluetoothLe.createBond(Object.assign({ deviceId }, options));
		});
	}
	async isBonded(deviceId) {
		return await this.queue(async () => {
			return (await BluetoothLe.isBonded({ deviceId })).value;
		});
	}
	async disconnect(deviceId) {
		await this.queue(async () => {
			await BluetoothLe.disconnect({ deviceId });
		});
	}
	async getServices(deviceId) {
		return await this.queue(async () => {
			return (await BluetoothLe.getServices({ deviceId })).services;
		});
	}
	async discoverServices(deviceId) {
		await this.queue(async () => {
			await BluetoothLe.discoverServices({ deviceId });
		});
	}
	async getMtu(deviceId) {
		return await this.queue(async () => {
			return (await BluetoothLe.getMtu({ deviceId })).value;
		});
	}
	async requestConnectionPriority(deviceId, connectionPriority) {
		await this.queue(async () => {
			await BluetoothLe.requestConnectionPriority({
				deviceId,
				connectionPriority
			});
		});
	}
	async readRssi(deviceId) {
		return await this.queue(async () => {
			const result = await BluetoothLe.readRssi({ deviceId });
			return parseFloat(result.value);
		});
	}
	async read(deviceId, service, characteristic, options) {
		service = parseUUID(service);
		characteristic = parseUUID(characteristic);
		return await this.queue(async () => {
			const result = await BluetoothLe.read(Object.assign({
				deviceId,
				service,
				characteristic
			}, options));
			return this.convertValue(result.value);
		});
	}
	async write(deviceId, service, characteristic, value, options) {
		service = parseUUID(service);
		characteristic = parseUUID(characteristic);
		return this.queue(async () => {
			if (!(value === null || value === void 0 ? void 0 : value.buffer)) throw new Error("Invalid data.");
			let writeValue = value;
			if (Capacitor.getPlatform() !== "web") writeValue = dataViewToHexString(value);
			await BluetoothLe.write(Object.assign({
				deviceId,
				service,
				characteristic,
				value: writeValue
			}, options));
		});
	}
	async writeWithoutResponse(deviceId, service, characteristic, value, options) {
		service = parseUUID(service);
		characteristic = parseUUID(characteristic);
		await this.queue(async () => {
			if (!(value === null || value === void 0 ? void 0 : value.buffer)) throw new Error("Invalid data.");
			let writeValue = value;
			if (Capacitor.getPlatform() !== "web") writeValue = dataViewToHexString(value);
			await BluetoothLe.writeWithoutResponse(Object.assign({
				deviceId,
				service,
				characteristic,
				value: writeValue
			}, options));
		});
	}
	async readDescriptor(deviceId, service, characteristic, descriptor, options) {
		service = parseUUID(service);
		characteristic = parseUUID(characteristic);
		descriptor = parseUUID(descriptor);
		return await this.queue(async () => {
			const result = await BluetoothLe.readDescriptor(Object.assign({
				deviceId,
				service,
				characteristic,
				descriptor
			}, options));
			return this.convertValue(result.value);
		});
	}
	async writeDescriptor(deviceId, service, characteristic, descriptor, value, options) {
		service = parseUUID(service);
		characteristic = parseUUID(characteristic);
		descriptor = parseUUID(descriptor);
		return this.queue(async () => {
			if (!(value === null || value === void 0 ? void 0 : value.buffer)) throw new Error("Invalid data.");
			let writeValue = value;
			if (Capacitor.getPlatform() !== "web") writeValue = dataViewToHexString(value);
			await BluetoothLe.writeDescriptor(Object.assign({
				deviceId,
				service,
				characteristic,
				descriptor,
				value: writeValue
			}, options));
		});
	}
	async startNotifications(deviceId, service, characteristic, callback) {
		service = parseUUID(service);
		characteristic = parseUUID(characteristic);
		await this.queue(async () => {
			var _a;
			const key = `notification|${deviceId}|${service}|${characteristic}`;
			await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
			const listener = await BluetoothLe.addListener(key, (event) => {
				callback(this.convertValue(event === null || event === void 0 ? void 0 : event.value));
			});
			this.eventListeners.set(key, listener);
			await BluetoothLe.startNotifications({
				deviceId,
				service,
				characteristic
			});
		});
	}
	async stopNotifications(deviceId, service, characteristic) {
		service = parseUUID(service);
		characteristic = parseUUID(characteristic);
		await this.queue(async () => {
			var _a;
			const key = `notification|${deviceId}|${service}|${characteristic}`;
			await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
			this.eventListeners.delete(key);
			await BluetoothLe.stopNotifications({
				deviceId,
				service,
				characteristic
			});
		});
	}
	validateRequestBleDeviceOptions(options) {
		if (options.services) options.services = options.services.map(parseUUID);
		if (options.optionalServices) options.optionalServices = options.optionalServices.map(parseUUID);
		return options;
	}
	convertValue(value) {
		if (typeof value === "string") return hexStringToDataView(value);
		else if (value === void 0) return /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(0));
		return value;
	}
	convertObject(obj) {
		if (obj === void 0) return;
		const result = {};
		for (const key of Object.keys(obj)) result[key] = this.convertValue(obj[key]);
		return result;
	}
};
var BleClient = new BleClientClass();
//#endregion
//#region node_modules/@capacitor/local-notifications/dist/esm/definitions.js
/**
* Day of the week. Used for scheduling notifications on a particular weekday.
*/
var Weekday;
(function(Weekday) {
	Weekday[Weekday["Sunday"] = 1] = "Sunday";
	Weekday[Weekday["Monday"] = 2] = "Monday";
	Weekday[Weekday["Tuesday"] = 3] = "Tuesday";
	Weekday[Weekday["Wednesday"] = 4] = "Wednesday";
	Weekday[Weekday["Thursday"] = 5] = "Thursday";
	Weekday[Weekday["Friday"] = 6] = "Friday";
	Weekday[Weekday["Saturday"] = 7] = "Saturday";
})(Weekday || (Weekday = {}));
//#endregion
//#region node_modules/@capacitor/local-notifications/dist/esm/index.js
var LocalNotifications = registerPlugin("LocalNotifications", { web: () => __vitePreload(() => Promise.resolve().then(() => web_exports$2).then((m) => new m.LocalNotificationsWeb()), void 0) });
//#endregion
//#region node_modules/@capacitor/splash-screen/dist/esm/index.js
var SplashScreen = registerPlugin("SplashScreen", { web: () => __vitePreload(() => Promise.resolve().then(() => web_exports).then((m) => new m.SplashScreenWeb()), void 0) });
//#endregion
//#region node_modules/@capacitor/push-notifications/dist/esm/index.js
var PushNotifications = registerPlugin("PushNotifications", {});
//#endregion
//#region node_modules/@capacitor-community/bluetooth-le/dist/esm/timeout.js
async function runWithTimeout(promise, time, exception) {
	let timer;
	return Promise.race([promise, new Promise((_, reject) => {
		timer = setTimeout(() => reject(exception), time);
	})]).finally(() => clearTimeout(timer));
}
//#endregion
//#region node_modules/@capacitor-community/bluetooth-le/dist/esm/web.js
var web_exports$8 = /* @__PURE__ */ __exportAll({ BluetoothLeWeb: () => BluetoothLeWeb });
var BluetoothLeWeb = class extends WebPlugin {
	constructor() {
		super(...arguments);
		this.deviceMap = /* @__PURE__ */ new Map();
		this.discoveredDevices = /* @__PURE__ */ new Map();
		this.scan = null;
		this.DEFAULT_CONNECTION_TIMEOUT = 1e4;
		this.onAdvertisementReceivedCallback = this.onAdvertisementReceived.bind(this);
		this.onDisconnectedCallback = this.onDisconnected.bind(this);
		this.onCharacteristicValueChangedCallback = this.onCharacteristicValueChanged.bind(this);
	}
	async initialize() {
		if (typeof navigator === "undefined" || !navigator.bluetooth) throw this.unavailable("Web Bluetooth API not available in this browser.");
		if (!await navigator.bluetooth.getAvailability()) throw this.unavailable("No Bluetooth radio available.");
	}
	async isEnabled() {
		return { value: true };
	}
	async requestEnable() {
		throw this.unavailable("requestEnable is not available on web.");
	}
	async enable() {
		throw this.unavailable("enable is not available on web.");
	}
	async disable() {
		throw this.unavailable("disable is not available on web.");
	}
	async startEnabledNotifications() {}
	async stopEnabledNotifications() {}
	async isLocationEnabled() {
		throw this.unavailable("isLocationEnabled is not available on web.");
	}
	async openLocationSettings() {
		throw this.unavailable("openLocationSettings is not available on web.");
	}
	async openBluetoothSettings() {
		throw this.unavailable("openBluetoothSettings is not available on web.");
	}
	async openAppSettings() {
		throw this.unavailable("openAppSettings is not available on web.");
	}
	async setDisplayStrings() {}
	async requestDevice(options) {
		const filters = this.getFilters(options);
		const device = await navigator.bluetooth.requestDevice({
			filters: filters.length ? filters : void 0,
			optionalServices: options === null || options === void 0 ? void 0 : options.optionalServices,
			acceptAllDevices: filters.length === 0
		});
		this.deviceMap.set(device.id, device);
		return this.getBleDevice(device);
	}
	async requestLEScan(options) {
		this.requestBleDeviceOptions = options;
		const filters = this.getFilters(options);
		await this.stopLEScan();
		this.discoveredDevices = /* @__PURE__ */ new Map();
		navigator.bluetooth.removeEventListener("advertisementreceived", this.onAdvertisementReceivedCallback);
		navigator.bluetooth.addEventListener("advertisementreceived", this.onAdvertisementReceivedCallback);
		this.scan = await navigator.bluetooth.requestLEScan({
			filters: filters.length ? filters : void 0,
			acceptAllAdvertisements: filters.length === 0,
			keepRepeatedDevices: options === null || options === void 0 ? void 0 : options.allowDuplicates
		});
	}
	onAdvertisementReceived(event) {
		var _a, _b;
		const deviceId = event.device.id;
		this.deviceMap.set(deviceId, event.device);
		if (!this.discoveredDevices.has(deviceId) || ((_a = this.requestBleDeviceOptions) === null || _a === void 0 ? void 0 : _a.allowDuplicates)) {
			this.discoveredDevices.set(deviceId, true);
			const device = this.getBleDevice(event.device);
			const result = {
				device,
				localName: device.name,
				rssi: event.rssi,
				txPower: event.txPower,
				manufacturerData: mapToObject(event.manufacturerData),
				serviceData: mapToObject(event.serviceData),
				uuids: (_b = event.uuids) === null || _b === void 0 ? void 0 : _b.map(webUUIDToString)
			};
			this.notifyListeners("onScanResult", result);
		}
	}
	async stopLEScan() {
		var _a;
		if ((_a = this.scan) === null || _a === void 0 ? void 0 : _a.active) this.scan.stop();
		this.scan = null;
	}
	async getDevices(options) {
		return { devices: (await navigator.bluetooth.getDevices()).filter((device) => options.deviceIds.includes(device.id)).map((device) => {
			this.deviceMap.set(device.id, device);
			return this.getBleDevice(device);
		}) };
	}
	async getConnectedDevices(_options) {
		return { devices: (await navigator.bluetooth.getDevices()).filter((device) => {
			var _a;
			return (_a = device.gatt) === null || _a === void 0 ? void 0 : _a.connected;
		}).map((device) => {
			this.deviceMap.set(device.id, device);
			return this.getBleDevice(device);
		}) };
	}
	async getBondedDevices() {
		return {};
	}
	async connect(options) {
		var _a, _b;
		const device = this.getDeviceFromMap(options.deviceId);
		device.removeEventListener("gattserverdisconnected", this.onDisconnectedCallback);
		device.addEventListener("gattserverdisconnected", this.onDisconnectedCallback);
		const timeoutError = Symbol();
		if (device.gatt === void 0) throw new Error("No gatt server available.");
		try {
			const timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : this.DEFAULT_CONNECTION_TIMEOUT;
			await runWithTimeout(device.gatt.connect(), timeout, timeoutError);
		} catch (error) {
			await ((_b = device.gatt) === null || _b === void 0 ? void 0 : _b.disconnect());
			if (error === timeoutError) throw new Error("Connection timeout");
			else throw error;
		}
	}
	onDisconnected(event) {
		const key = `disconnected|${event.target.id}`;
		this.notifyListeners(key, null);
	}
	async createBond(_options) {
		throw this.unavailable("createBond is not available on web.");
	}
	async isBonded(_options) {
		throw this.unavailable("isBonded is not available on web.");
	}
	async disconnect(options) {
		var _a;
		(_a = this.getDeviceFromMap(options.deviceId).gatt) === null || _a === void 0 || _a.disconnect();
	}
	async getServices(options) {
		var _a, _b;
		const services = (_b = await ((_a = this.getDeviceFromMap(options.deviceId).gatt) === null || _a === void 0 ? void 0 : _a.getPrimaryServices())) !== null && _b !== void 0 ? _b : [];
		const bleServices = [];
		for (const service of services) {
			const characteristics = await service.getCharacteristics();
			const bleCharacteristics = [];
			for (const characteristic of characteristics) bleCharacteristics.push({
				uuid: characteristic.uuid,
				properties: this.getProperties(characteristic),
				descriptors: await this.getDescriptors(characteristic)
			});
			bleServices.push({
				uuid: service.uuid,
				characteristics: bleCharacteristics
			});
		}
		return { services: bleServices };
	}
	async getDescriptors(characteristic) {
		try {
			return (await characteristic.getDescriptors()).map((descriptor) => ({ uuid: descriptor.uuid }));
		} catch (_a) {
			return [];
		}
	}
	getProperties(characteristic) {
		return {
			broadcast: characteristic.properties.broadcast,
			read: characteristic.properties.read,
			writeWithoutResponse: characteristic.properties.writeWithoutResponse,
			write: characteristic.properties.write,
			notify: characteristic.properties.notify,
			indicate: characteristic.properties.indicate,
			authenticatedSignedWrites: characteristic.properties.authenticatedSignedWrites,
			reliableWrite: characteristic.properties.reliableWrite,
			writableAuxiliaries: characteristic.properties.writableAuxiliaries
		};
	}
	async getCharacteristic(options) {
		var _a;
		const service = await ((_a = this.getDeviceFromMap(options.deviceId).gatt) === null || _a === void 0 ? void 0 : _a.getPrimaryService(options === null || options === void 0 ? void 0 : options.service));
		return service === null || service === void 0 ? void 0 : service.getCharacteristic(options === null || options === void 0 ? void 0 : options.characteristic);
	}
	async getDescriptor(options) {
		const characteristic = await this.getCharacteristic(options);
		return characteristic === null || characteristic === void 0 ? void 0 : characteristic.getDescriptor(options === null || options === void 0 ? void 0 : options.descriptor);
	}
	async discoverServices(_options) {
		throw this.unavailable("discoverServices is not available on web.");
	}
	async getMtu(_options) {
		throw this.unavailable("getMtu is not available on web.");
	}
	async requestConnectionPriority(_options) {
		throw this.unavailable("requestConnectionPriority is not available on web.");
	}
	async readRssi(_options) {
		throw this.unavailable("readRssi is not available on web.");
	}
	async read(options) {
		const characteristic = await this.getCharacteristic(options);
		return { value: await (characteristic === null || characteristic === void 0 ? void 0 : characteristic.readValue()) };
	}
	async write(options) {
		const characteristic = await this.getCharacteristic(options);
		let dataView;
		if (typeof options.value === "string") dataView = hexStringToDataView(options.value);
		else dataView = options.value;
		await (characteristic === null || characteristic === void 0 ? void 0 : characteristic.writeValueWithResponse(dataView));
	}
	async writeWithoutResponse(options) {
		const characteristic = await this.getCharacteristic(options);
		let dataView;
		if (typeof options.value === "string") dataView = hexStringToDataView(options.value);
		else dataView = options.value;
		await (characteristic === null || characteristic === void 0 ? void 0 : characteristic.writeValueWithoutResponse(dataView));
	}
	async readDescriptor(options) {
		const descriptor = await this.getDescriptor(options);
		return { value: await (descriptor === null || descriptor === void 0 ? void 0 : descriptor.readValue()) };
	}
	async writeDescriptor(options) {
		const descriptor = await this.getDescriptor(options);
		let dataView;
		if (typeof options.value === "string") dataView = hexStringToDataView(options.value);
		else dataView = options.value;
		await (descriptor === null || descriptor === void 0 ? void 0 : descriptor.writeValue(dataView));
	}
	async startNotifications(options) {
		const characteristic = await this.getCharacteristic(options);
		characteristic === null || characteristic === void 0 || characteristic.removeEventListener("characteristicvaluechanged", this.onCharacteristicValueChangedCallback);
		characteristic === null || characteristic === void 0 || characteristic.addEventListener("characteristicvaluechanged", this.onCharacteristicValueChangedCallback);
		await (characteristic === null || characteristic === void 0 ? void 0 : characteristic.startNotifications());
	}
	onCharacteristicValueChanged(event) {
		var _a, _b;
		const characteristic = event.target;
		const key = `notification|${(_a = characteristic.service) === null || _a === void 0 ? void 0 : _a.device.id}|${(_b = characteristic.service) === null || _b === void 0 ? void 0 : _b.uuid}|${characteristic.uuid}`;
		this.notifyListeners(key, { value: characteristic.value });
	}
	async stopNotifications(options) {
		const characteristic = await this.getCharacteristic(options);
		await (characteristic === null || characteristic === void 0 ? void 0 : characteristic.stopNotifications());
	}
	getFilters(options) {
		var _a;
		const filters = [];
		for (const service of (_a = options === null || options === void 0 ? void 0 : options.services) !== null && _a !== void 0 ? _a : []) filters.push({
			services: [service],
			name: options === null || options === void 0 ? void 0 : options.name,
			namePrefix: options === null || options === void 0 ? void 0 : options.namePrefix
		});
		if (((options === null || options === void 0 ? void 0 : options.name) || (options === null || options === void 0 ? void 0 : options.namePrefix)) && filters.length === 0) filters.push({
			name: options.name,
			namePrefix: options.namePrefix
		});
		return filters;
	}
	getDeviceFromMap(deviceId) {
		const device = this.deviceMap.get(deviceId);
		if (device === void 0) throw new Error("Device not found. Call \"requestDevice\", \"requestLEScan\" or \"getDevices\" first.");
		return device;
	}
	getBleDevice(device) {
		var _a;
		return {
			deviceId: device.id,
			name: (_a = device.name) !== null && _a !== void 0 ? _a : void 0
		};
	}
};
//#endregion
//#region node_modules/@capacitor-mlkit/barcode-scanning/dist/esm/definitions.js
/**
* @since 0.0.1
*/
var BarcodeFormat;
(function(BarcodeFormat) {
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["Aztec"] = "AZTEC";
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["Codabar"] = "CODABAR";
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["Code39"] = "CODE_39";
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["Code93"] = "CODE_93";
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["Code128"] = "CODE_128";
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["DataMatrix"] = "DATA_MATRIX";
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["Ean8"] = "EAN_8";
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["Ean13"] = "EAN_13";
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["Itf"] = "ITF";
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["Pdf417"] = "PDF_417";
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["QrCode"] = "QR_CODE";
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["UpcA"] = "UPC_A";
	/**
	* Only available on Android and iOS.
	*
	* @since 0.0.1
	*/
	BarcodeFormat["UpcE"] = "UPC_E";
})(BarcodeFormat || (BarcodeFormat = {}));
/**
* @since 0.0.1
*/
var BarcodeValueType;
(function(BarcodeValueType) {
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["CalendarEvent"] = "CALENDAR_EVENT";
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["ContactInfo"] = "CONTACT_INFO";
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["DriversLicense"] = "DRIVERS_LICENSE";
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["Email"] = "EMAIL";
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["Geo"] = "GEO";
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["Isbn"] = "ISBN";
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["Phone"] = "PHONE";
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["Product"] = "PRODUCT";
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["Sms"] = "SMS";
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["Text"] = "TEXT";
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["Url"] = "URL";
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["Wifi"] = "WIFI";
	/**
	* @since 0.0.1
	*/
	BarcodeValueType["Unknown"] = "UNKNOWN";
})(BarcodeValueType || (BarcodeValueType = {}));
/**
* @since 0.0.1
*/
var LensFacing;
(function(LensFacing) {
	/**
	* @since 0.0.1
	*/
	LensFacing["Front"] = "FRONT";
	/**
	* @since 0.0.1
	*/
	LensFacing["Back"] = "BACK";
})(LensFacing || (LensFacing = {}));
/**
* @since 5.1.0
*/
var GoogleBarcodeScannerModuleInstallState;
(function(GoogleBarcodeScannerModuleInstallState) {
	/**
	* @since 5.1.0
	*/
	GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["UNKNOWN"] = 0] = "UNKNOWN";
	/**
	* @since 5.1.0
	*/
	GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["PENDING"] = 1] = "PENDING";
	/**
	* @since 5.1.0
	*/
	GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["DOWNLOADING"] = 2] = "DOWNLOADING";
	/**
	* @since 5.1.0
	*/
	GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["CANCELED"] = 3] = "CANCELED";
	/**
	* @since 5.1.0
	*/
	GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["COMPLETED"] = 4] = "COMPLETED";
	/**
	* @since 5.1.0
	*/
	GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["FAILED"] = 5] = "FAILED";
	/**
	* @since 5.1.0
	*/
	GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["INSTALLING"] = 6] = "INSTALLING";
	/**
	* @since 5.1.0
	*/
	GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["DOWNLOAD_PAUSED"] = 7] = "DOWNLOAD_PAUSED";
})(GoogleBarcodeScannerModuleInstallState || (GoogleBarcodeScannerModuleInstallState = {}));
//#endregion
//#region node_modules/@capacitor-mlkit/barcode-scanning/dist/esm/index.js
var esm_exports$2 = /* @__PURE__ */ __exportAll({
	BarcodeFormat: () => BarcodeFormat,
	BarcodeScanner: () => BarcodeScanner,
	BarcodeValueType: () => BarcodeValueType,
	GoogleBarcodeScannerModuleInstallState: () => GoogleBarcodeScannerModuleInstallState,
	LensFacing: () => LensFacing
});
var BarcodeScanner = registerPlugin("BarcodeScanner", { web: () => __vitePreload(() => Promise.resolve().then(() => web_exports$7).then((m) => new m.BarcodeScannerWeb()), void 0) });
//#endregion
//#region node_modules/@capacitor-mlkit/barcode-scanning/dist/esm/web.js
var web_exports$7 = /* @__PURE__ */ __exportAll({ BarcodeScannerWeb: () => BarcodeScannerWeb });
var BarcodeScannerWeb = class extends WebPlugin {
	async startScan(_options) {
		throw this.createUnavailableException();
	}
	async stopScan() {
		throw this.createUnavailableException();
	}
	async readBarcodesFromImage(_options) {
		throw this.createUnavailableException();
	}
	async scan() {
		throw this.createUnavailableException();
	}
	async isSupported() {
		throw this.createUnavailableException();
	}
	async enableTorch() {
		throw this.createUnavailableException();
	}
	async disableTorch() {
		throw this.createUnavailableException();
	}
	async toggleTorch() {
		throw this.createUnavailableException();
	}
	async isTorchEnabled() {
		throw this.createUnavailableException();
	}
	async isTorchAvailable() {
		throw this.createUnavailableException();
	}
	async setZoomRatio(_options) {
		throw this.createUnavailableException();
	}
	async getZoomRatio() {
		throw this.createUnavailableException();
	}
	async getMinZoomRatio() {
		throw this.createUnavailableException();
	}
	async getMaxZoomRatio() {
		throw this.createUnavailableException();
	}
	async openSettings() {
		throw this.createUnavailableException();
	}
	async isGoogleBarcodeScannerModuleAvailable() {
		throw this.createUnavailableException();
	}
	async installGoogleBarcodeScannerModule() {
		throw this.createUnavailableException();
	}
	async checkPermissions() {
		throw this.createUnavailableException();
	}
	async requestPermissions() {
		throw this.createUnavailableException();
	}
	createUnavailableException() {
		return new CapacitorException("This Barcode Scanner plugin method is not available on this platform.", ExceptionCode.Unavailable);
	}
};
//#endregion
//#region node_modules/@capacitor/app/dist/esm/web.js
var web_exports$6 = /* @__PURE__ */ __exportAll({ AppWeb: () => AppWeb });
var AppWeb = class extends WebPlugin {
	constructor() {
		super();
		this.handleVisibilityChange = () => {
			const data = { isActive: document.hidden !== true };
			this.notifyListeners("appStateChange", data);
			if (document.hidden) this.notifyListeners("pause", null);
			else this.notifyListeners("resume", null);
		};
		document.addEventListener("visibilitychange", this.handleVisibilityChange, false);
	}
	exitApp() {
		throw this.unimplemented("Not implemented on web.");
	}
	async getInfo() {
		throw this.unimplemented("Not implemented on web.");
	}
	async getLaunchUrl() {
		return { url: "" };
	}
	async getState() {
		return { isActive: document.hidden !== true };
	}
	async minimizeApp() {
		throw this.unimplemented("Not implemented on web.");
	}
};
//#endregion
//#region node_modules/@capacitor/filesystem/dist/esm/definitions.js
var Directory;
(function(Directory) {
	/**
	* The Documents directory.
	* On iOS it's the app's documents directory.
	* Use this directory to store user-generated content.
	* On Android it's the Public Documents folder, so it's accessible from other apps.
	* It's not accesible on Android 10 unless the app enables legacy External Storage
	* by adding `android:requestLegacyExternalStorage="true"` in the `application` tag
	* in the `AndroidManifest.xml`.
	* On Android 11 or newer the app can only access the files/folders the app created.
	*
	* @since 1.0.0
	*/
	Directory["Documents"] = "DOCUMENTS";
	/**
	* The Data directory.
	* On iOS it will use the Documents directory.
	* On Android it's the directory holding application files.
	* Files will be deleted when the application is uninstalled.
	*
	* @since 1.0.0
	*/
	Directory["Data"] = "DATA";
	/**
	* The Library directory.
	* On iOS it will use the Library directory.
	* On Android it's the directory holding application files.
	* Files will be deleted when the application is uninstalled.
	*
	* @since 1.1.0
	*/
	Directory["Library"] = "LIBRARY";
	/**
	* The Cache directory.
	* Can be deleted in cases of low memory, so use this directory to write app-specific files.
	* that your app can re-create easily.
	*
	* @since 1.0.0
	*/
	Directory["Cache"] = "CACHE";
	/**
	* The external directory.
	* On iOS it will use the Documents directory.
	* On Android it's the directory on the primary shared/external
	* storage device where the application can place persistent files it owns.
	* These files are internal to the applications, and not typically visible
	* to the user as media.
	* Files will be deleted when the application is uninstalled.
	*
	* @since 1.0.0
	*/
	Directory["External"] = "EXTERNAL";
	/**
	* The external storage directory.
	* On iOS it will use the Documents directory.
	* On Android it's the primary shared/external storage directory.
	* It's not accesible on Android 10 unless the app enables legacy External Storage
	* by adding `android:requestLegacyExternalStorage="true"` in the `application` tag
	* in the `AndroidManifest.xml`.
	* It's not accesible on Android 11 or newer.
	*
	* @since 1.0.0
	*/
	Directory["ExternalStorage"] = "EXTERNAL_STORAGE";
})(Directory || (Directory = {}));
var Encoding;
(function(Encoding) {
	/**
	* Eight-bit UCS Transformation Format
	*
	* @since 1.0.0
	*/
	Encoding["UTF8"] = "utf8";
	/**
	* Seven-bit ASCII, a.k.a. ISO646-US, a.k.a. the Basic Latin block of the
	* Unicode character set
	* This encoding is only supported on Android.
	*
	* @since 1.0.0
	*/
	Encoding["ASCII"] = "ascii";
	/**
	* Sixteen-bit UCS Transformation Format, byte order identified by an
	* optional byte-order mark
	* This encoding is only supported on Android.
	*
	* @since 1.0.0
	*/
	Encoding["UTF16"] = "utf16";
})(Encoding || (Encoding = {}));
//#endregion
//#region node_modules/@capacitor/filesystem/dist/esm/web.js
var web_exports$5 = /* @__PURE__ */ __exportAll({ FilesystemWeb: () => FilesystemWeb });
function resolve(path) {
	const posix = path.split("/").filter((item) => item !== ".");
	const newPosix = [];
	posix.forEach((item) => {
		if (item === ".." && newPosix.length > 0 && newPosix[newPosix.length - 1] !== "..") newPosix.pop();
		else newPosix.push(item);
	});
	return newPosix.join("/");
}
function isPathParent(parent, children) {
	parent = resolve(parent);
	children = resolve(children);
	const pathsA = parent.split("/");
	const pathsB = children.split("/");
	return parent !== children && pathsA.every((value, index) => value === pathsB[index]);
}
var FilesystemWeb = class FilesystemWeb extends WebPlugin {
	constructor() {
		super(...arguments);
		this.DB_VERSION = 1;
		this.DB_NAME = "Disc";
		this._writeCmds = [
			"add",
			"put",
			"delete"
		];
		/**
		* Function that performs a http request to a server and downloads the file to the specified destination
		*
		* @param options the options for the download operation
		* @returns a promise that resolves with the download file result
		*/
		this.downloadFile = async (options) => {
			var _a, _b;
			const requestInit = buildRequestInit(options, options.webFetchExtra);
			const response = await fetch(options.url, requestInit);
			let blob;
			if (!options.progress) blob = await response.blob();
			else if (!(response === null || response === void 0 ? void 0 : response.body)) blob = new Blob();
			else {
				const reader = response.body.getReader();
				let bytes = 0;
				const chunks = [];
				const contentType = response.headers.get("content-type");
				const contentLength = parseInt(response.headers.get("content-length") || "0", 10);
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					chunks.push(value);
					bytes += (value === null || value === void 0 ? void 0 : value.length) || 0;
					const status = {
						url: options.url,
						bytes,
						contentLength
					};
					this.notifyListeners("progress", status);
				}
				const allChunks = new Uint8Array(bytes);
				let position = 0;
				for (const chunk of chunks) {
					if (typeof chunk === "undefined") continue;
					allChunks.set(chunk, position);
					position += chunk.length;
				}
				blob = new Blob([allChunks.buffer], { type: contentType || void 0 });
			}
			return {
				path: (await this.writeFile({
					path: options.path,
					directory: (_a = options.directory) !== null && _a !== void 0 ? _a : void 0,
					recursive: (_b = options.recursive) !== null && _b !== void 0 ? _b : false,
					data: blob
				})).uri,
				blob
			};
		};
	}
	async initDb() {
		if (this._db !== void 0) return this._db;
		if (!("indexedDB" in window)) throw this.unavailable("This browser doesn't support IndexedDB");
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
			request.onupgradeneeded = FilesystemWeb.doUpgrade;
			request.onsuccess = () => {
				this._db = request.result;
				resolve(request.result);
			};
			request.onerror = () => reject(request.error);
			request.onblocked = () => {
				console.warn("db blocked");
			};
		});
	}
	static doUpgrade(event) {
		const db = event.target.result;
		switch (event.oldVersion) {
			default:
				if (db.objectStoreNames.contains("FileStorage")) db.deleteObjectStore("FileStorage");
				db.createObjectStore("FileStorage", { keyPath: "path" }).createIndex("by_folder", "folder");
		}
	}
	async dbRequest(cmd, args) {
		const readFlag = this._writeCmds.indexOf(cmd) !== -1 ? "readwrite" : "readonly";
		return this.initDb().then((conn) => {
			return new Promise((resolve, reject) => {
				const req = conn.transaction(["FileStorage"], readFlag).objectStore("FileStorage")[cmd](...args);
				req.onsuccess = () => resolve(req.result);
				req.onerror = () => reject(req.error);
			});
		});
	}
	async dbIndexRequest(indexName, cmd, args) {
		const readFlag = this._writeCmds.indexOf(cmd) !== -1 ? "readwrite" : "readonly";
		return this.initDb().then((conn) => {
			return new Promise((resolve, reject) => {
				const req = conn.transaction(["FileStorage"], readFlag).objectStore("FileStorage").index(indexName)[cmd](...args);
				req.onsuccess = () => resolve(req.result);
				req.onerror = () => reject(req.error);
			});
		});
	}
	getPath(directory, uriPath) {
		const cleanedUriPath = uriPath !== void 0 ? uriPath.replace(/^[/]+|[/]+$/g, "") : "";
		let fsPath = "";
		if (directory !== void 0) fsPath += "/" + directory;
		if (uriPath !== "") fsPath += "/" + cleanedUriPath;
		return fsPath;
	}
	async clear() {
		(await this.initDb()).transaction(["FileStorage"], "readwrite").objectStore("FileStorage").clear();
	}
	/**
	* Read a file from disk
	* @param options options for the file read
	* @return a promise that resolves with the read file data result
	*/
	async readFile(options) {
		const path = this.getPath(options.directory, options.path);
		const entry = await this.dbRequest("get", [path]);
		if (entry === void 0) throw Error("File does not exist.");
		return { data: entry.content ? entry.content : "" };
	}
	/**
	* Write a file to disk in the specified location on device
	* @param options options for the file write
	* @return a promise that resolves with the file write result
	*/
	async writeFile(options) {
		const path = this.getPath(options.directory, options.path);
		let data = options.data;
		const encoding = options.encoding;
		const doRecursive = options.recursive;
		const occupiedEntry = await this.dbRequest("get", [path]);
		if (occupiedEntry && occupiedEntry.type === "directory") throw Error("The supplied path is a directory.");
		const parentPath = path.substr(0, path.lastIndexOf("/"));
		if (await this.dbRequest("get", [parentPath]) === void 0) {
			const subDirIndex = parentPath.indexOf("/", 1);
			if (subDirIndex !== -1) {
				const parentArgPath = parentPath.substr(subDirIndex);
				await this.mkdir({
					path: parentArgPath,
					directory: options.directory,
					recursive: doRecursive
				});
			}
		}
		if (!encoding && !(data instanceof Blob)) {
			data = data.indexOf(",") >= 0 ? data.split(",")[1] : data;
			if (!this.isBase64String(data)) throw Error("The supplied data is not valid base64 content.");
		}
		const now = Date.now();
		const pathObj = {
			path,
			folder: parentPath,
			type: "file",
			size: data instanceof Blob ? data.size : data.length,
			ctime: now,
			mtime: now,
			content: data
		};
		await this.dbRequest("put", [pathObj]);
		return { uri: pathObj.path };
	}
	/**
	* Append to a file on disk in the specified location on device
	* @param options options for the file append
	* @return a promise that resolves with the file write result
	*/
	async appendFile(options) {
		const path = this.getPath(options.directory, options.path);
		let data = options.data;
		const encoding = options.encoding;
		const parentPath = path.substr(0, path.lastIndexOf("/"));
		const now = Date.now();
		let ctime = now;
		const occupiedEntry = await this.dbRequest("get", [path]);
		if (occupiedEntry && occupiedEntry.type === "directory") throw Error("The supplied path is a directory.");
		if (await this.dbRequest("get", [parentPath]) === void 0) {
			const subDirIndex = parentPath.indexOf("/", 1);
			if (subDirIndex !== -1) {
				const parentArgPath = parentPath.substr(subDirIndex);
				await this.mkdir({
					path: parentArgPath,
					directory: options.directory,
					recursive: true
				});
			}
		}
		if (!encoding && !this.isBase64String(data)) throw Error("The supplied data is not valid base64 content.");
		if (occupiedEntry !== void 0) {
			if (occupiedEntry.content instanceof Blob) throw Error("The occupied entry contains a Blob object which cannot be appended to.");
			if (occupiedEntry.content !== void 0 && !encoding) data = btoa(atob(occupiedEntry.content) + atob(data));
			else data = occupiedEntry.content + data;
			ctime = occupiedEntry.ctime;
		}
		const pathObj = {
			path,
			folder: parentPath,
			type: "file",
			size: data.length,
			ctime,
			mtime: now,
			content: data
		};
		await this.dbRequest("put", [pathObj]);
	}
	/**
	* Delete a file from disk
	* @param options options for the file delete
	* @return a promise that resolves with the deleted file data result
	*/
	async deleteFile(options) {
		const path = this.getPath(options.directory, options.path);
		if (await this.dbRequest("get", [path]) === void 0) throw Error("File does not exist.");
		if ((await this.dbIndexRequest("by_folder", "getAllKeys", [IDBKeyRange.only(path)])).length !== 0) throw Error("Folder is not empty.");
		await this.dbRequest("delete", [path]);
	}
	/**
	* Create a directory.
	* @param options options for the mkdir
	* @return a promise that resolves with the mkdir result
	*/
	async mkdir(options) {
		const path = this.getPath(options.directory, options.path);
		const doRecursive = options.recursive;
		const parentPath = path.substr(0, path.lastIndexOf("/"));
		const depth = (path.match(/\//g) || []).length;
		const parentEntry = await this.dbRequest("get", [parentPath]);
		const occupiedEntry = await this.dbRequest("get", [path]);
		if (depth === 1) throw Error("Cannot create Root directory");
		if (occupiedEntry !== void 0) throw Error("Current directory does already exist.");
		if (!doRecursive && depth !== 2 && parentEntry === void 0) throw Error("Parent directory must exist");
		if (doRecursive && depth !== 2 && parentEntry === void 0) {
			const parentArgPath = parentPath.substr(parentPath.indexOf("/", 1));
			await this.mkdir({
				path: parentArgPath,
				directory: options.directory,
				recursive: doRecursive
			});
		}
		const now = Date.now();
		const pathObj = {
			path,
			folder: parentPath,
			type: "directory",
			size: 0,
			ctime: now,
			mtime: now
		};
		await this.dbRequest("put", [pathObj]);
	}
	/**
	* Remove a directory
	* @param options the options for the directory remove
	*/
	async rmdir(options) {
		const { path, directory, recursive } = options;
		const fullPath = this.getPath(directory, path);
		const entry = await this.dbRequest("get", [fullPath]);
		if (entry === void 0) throw Error("Folder does not exist.");
		if (entry.type !== "directory") throw Error("Requested path is not a directory");
		const readDirResult = await this.readdir({
			path,
			directory
		});
		if (readDirResult.files.length !== 0 && !recursive) throw Error("Folder is not empty");
		for (const entry of readDirResult.files) {
			const entryPath = `${path}/${entry.name}`;
			if ((await this.stat({
				path: entryPath,
				directory
			})).type === "file") await this.deleteFile({
				path: entryPath,
				directory
			});
			else await this.rmdir({
				path: entryPath,
				directory,
				recursive
			});
		}
		await this.dbRequest("delete", [fullPath]);
	}
	/**
	* Return a list of files from the directory (not recursive)
	* @param options the options for the readdir operation
	* @return a promise that resolves with the readdir directory listing result
	*/
	async readdir(options) {
		const path = this.getPath(options.directory, options.path);
		const entry = await this.dbRequest("get", [path]);
		if (options.path !== "" && entry === void 0) throw Error("Folder does not exist.");
		const entries = await this.dbIndexRequest("by_folder", "getAllKeys", [IDBKeyRange.only(path)]);
		return { files: await Promise.all(entries.map(async (e) => {
			let subEntry = await this.dbRequest("get", [e]);
			if (subEntry === void 0) subEntry = await this.dbRequest("get", [e + "/"]);
			return {
				name: e.substring(path.length + 1),
				type: subEntry.type,
				size: subEntry.size,
				ctime: subEntry.ctime,
				mtime: subEntry.mtime,
				uri: subEntry.path
			};
		})) };
	}
	/**
	* Return full File URI for a path and directory
	* @param options the options for the stat operation
	* @return a promise that resolves with the file stat result
	*/
	async getUri(options) {
		const path = this.getPath(options.directory, options.path);
		let entry = await this.dbRequest("get", [path]);
		if (entry === void 0) entry = await this.dbRequest("get", [path + "/"]);
		return { uri: (entry === null || entry === void 0 ? void 0 : entry.path) || path };
	}
	/**
	* Return data about a file
	* @param options the options for the stat operation
	* @return a promise that resolves with the file stat result
	*/
	async stat(options) {
		const path = this.getPath(options.directory, options.path);
		let entry = await this.dbRequest("get", [path]);
		if (entry === void 0) entry = await this.dbRequest("get", [path + "/"]);
		if (entry === void 0) throw Error("Entry does not exist.");
		return {
			type: entry.type,
			size: entry.size,
			ctime: entry.ctime,
			mtime: entry.mtime,
			uri: entry.path
		};
	}
	/**
	* Rename a file or directory
	* @param options the options for the rename operation
	* @return a promise that resolves with the rename result
	*/
	async rename(options) {
		await this._copy(options, true);
	}
	/**
	* Copy a file or directory
	* @param options the options for the copy operation
	* @return a promise that resolves with the copy result
	*/
	async copy(options) {
		return this._copy(options, false);
	}
	async requestPermissions() {
		return { publicStorage: "granted" };
	}
	async checkPermissions() {
		return { publicStorage: "granted" };
	}
	/**
	* Function that can perform a copy or a rename
	* @param options the options for the rename operation
	* @param doRename whether to perform a rename or copy operation
	* @return a promise that resolves with the result
	*/
	async _copy(options, doRename = false) {
		let { toDirectory } = options;
		const { to, from, directory: fromDirectory } = options;
		if (!to || !from) throw Error("Both to and from must be provided");
		if (!toDirectory) toDirectory = fromDirectory;
		const fromPath = this.getPath(fromDirectory, from);
		const toPath = this.getPath(toDirectory, to);
		if (fromPath === toPath) return { uri: toPath };
		if (isPathParent(fromPath, toPath)) throw Error("To path cannot contain the from path");
		let toObj;
		try {
			toObj = await this.stat({
				path: to,
				directory: toDirectory
			});
		} catch (e) {
			const toPathComponents = to.split("/");
			toPathComponents.pop();
			const toPath = toPathComponents.join("/");
			if (toPathComponents.length > 0) {
				if ((await this.stat({
					path: toPath,
					directory: toDirectory
				})).type !== "directory") throw new Error("Parent directory of the to path is a file");
			}
		}
		if (toObj && toObj.type === "directory") throw new Error("Cannot overwrite a directory with a file");
		const fromObj = await this.stat({
			path: from,
			directory: fromDirectory
		});
		const updateTime = async (path, ctime, mtime) => {
			const fullPath = this.getPath(toDirectory, path);
			const entry = await this.dbRequest("get", [fullPath]);
			entry.ctime = ctime;
			entry.mtime = mtime;
			await this.dbRequest("put", [entry]);
		};
		const ctime = fromObj.ctime ? fromObj.ctime : Date.now();
		switch (fromObj.type) {
			case "file": {
				const file = await this.readFile({
					path: from,
					directory: fromDirectory
				});
				if (doRename) await this.deleteFile({
					path: from,
					directory: fromDirectory
				});
				let encoding;
				if (!(file.data instanceof Blob) && !this.isBase64String(file.data)) encoding = Encoding.UTF8;
				const writeResult = await this.writeFile({
					path: to,
					directory: toDirectory,
					data: file.data,
					encoding
				});
				if (doRename) await updateTime(to, ctime, fromObj.mtime);
				return writeResult;
			}
			case "directory": {
				if (toObj) throw Error("Cannot move a directory over an existing object");
				try {
					await this.mkdir({
						path: to,
						directory: toDirectory,
						recursive: false
					});
					if (doRename) await updateTime(to, ctime, fromObj.mtime);
				} catch (e) {}
				const contents = (await this.readdir({
					path: from,
					directory: fromDirectory
				})).files;
				for (const filename of contents) await this._copy({
					from: `${from}/${filename.name}`,
					to: `${to}/${filename.name}`,
					directory: fromDirectory,
					toDirectory
				}, doRename);
				if (doRename) await this.rmdir({
					path: from,
					directory: fromDirectory
				});
			}
		}
		return { uri: toPath };
	}
	isBase64String(str) {
		try {
			return btoa(atob(str)) == str;
		} catch (err) {
			return false;
		}
	}
};
FilesystemWeb._debug = true;
//#endregion
//#region node_modules/@capacitor/geolocation/dist/esm/index.js
var esm_exports$1 = /* @__PURE__ */ __exportAll({ Geolocation: () => Geolocation$1 });
var Geolocation$1 = registerPlugin("Geolocation", { web: () => __vitePreload(() => Promise.resolve().then(() => web_exports$4).then((m) => new m.GeolocationWeb()), void 0) });
//#endregion
//#region node_modules/@capacitor/geolocation/dist/esm/web.js
var web_exports$4 = /* @__PURE__ */ __exportAll({ GeolocationWeb: () => GeolocationWeb });
var GeolocationWeb = class extends WebPlugin {
	async getCurrentPosition(options) {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition((pos) => {
				resolve(pos);
			}, (err) => {
				reject(err);
			}, Object.assign({
				enableHighAccuracy: false,
				timeout: 1e4,
				maximumAge: 0
			}, options));
		});
	}
	async watchPosition(options, callback) {
		return `${navigator.geolocation.watchPosition((pos) => {
			callback(pos);
		}, (err) => {
			callback(null, err);
		}, Object.assign({
			enableHighAccuracy: false,
			timeout: 1e4,
			maximumAge: 0,
			minimumUpdateInterval: 5e3
		}, options))}`;
	}
	async clearWatch(options) {
		window.navigator.geolocation.clearWatch(parseInt(options.id, 10));
	}
	async checkPermissions() {
		if (typeof navigator === "undefined" || !navigator.permissions) throw this.unavailable("Permissions API not available in this browser");
		const permission = await window.navigator.permissions.query({ name: "geolocation" });
		return {
			location: permission.state,
			coarseLocation: permission.state
		};
	}
	async requestPermissions() {
		throw this.unimplemented("Not implemented on web.");
	}
};
new GeolocationWeb();
//#endregion
//#region node_modules/@capacitor/haptics/dist/esm/definitions.js
var ImpactStyle;
(function(ImpactStyle) {
	/**
	* A collision between large, heavy user interface elements
	*
	* @since 1.0.0
	*/
	ImpactStyle["Heavy"] = "HEAVY";
	/**
	* A collision between moderately sized user interface elements
	*
	* @since 1.0.0
	*/
	ImpactStyle["Medium"] = "MEDIUM";
	/**
	* A collision between small, light user interface elements
	*
	* @since 1.0.0
	*/
	ImpactStyle["Light"] = "LIGHT";
})(ImpactStyle || (ImpactStyle = {}));
var NotificationType;
(function(NotificationType) {
	/**
	* A notification feedback type indicating that a task has completed successfully
	*
	* @since 1.0.0
	*/
	NotificationType["Success"] = "SUCCESS";
	/**
	* A notification feedback type indicating that a task has produced a warning
	*
	* @since 1.0.0
	*/
	NotificationType["Warning"] = "WARNING";
	/**
	* A notification feedback type indicating that a task has failed
	*
	* @since 1.0.0
	*/
	NotificationType["Error"] = "ERROR";
})(NotificationType || (NotificationType = {}));
/**
* @deprecated Use `NotificationType`.
* @since 1.0.0
*/
var HapticsNotificationType = NotificationType;
/**
* @deprecated Use `ImpactStyle`.
* @since 1.0.0
*/
var HapticsImpactStyle = ImpactStyle;
//#endregion
//#region node_modules/@capacitor/haptics/dist/esm/index.js
var esm_exports = /* @__PURE__ */ __exportAll({
	Haptics: () => Haptics,
	HapticsImpactStyle: () => HapticsImpactStyle,
	HapticsNotificationType: () => HapticsNotificationType,
	ImpactStyle: () => ImpactStyle,
	NotificationType: () => NotificationType
});
var Haptics = registerPlugin("Haptics", { web: () => __vitePreload(() => Promise.resolve().then(() => web_exports$3).then((m) => new m.HapticsWeb()), void 0) });
//#endregion
//#region node_modules/@capacitor/haptics/dist/esm/web.js
var web_exports$3 = /* @__PURE__ */ __exportAll({ HapticsWeb: () => HapticsWeb });
var HapticsWeb = class extends WebPlugin {
	constructor() {
		super(...arguments);
		this.selectionStarted = false;
	}
	async impact(options) {
		const pattern = this.patternForImpact(options === null || options === void 0 ? void 0 : options.style);
		this.vibrateWithPattern(pattern);
	}
	async notification(options) {
		const pattern = this.patternForNotification(options === null || options === void 0 ? void 0 : options.type);
		this.vibrateWithPattern(pattern);
	}
	async vibrate(options) {
		const duration = (options === null || options === void 0 ? void 0 : options.duration) || 300;
		this.vibrateWithPattern([duration]);
	}
	async selectionStart() {
		this.selectionStarted = true;
	}
	async selectionChanged() {
		if (this.selectionStarted) this.vibrateWithPattern([70]);
	}
	async selectionEnd() {
		this.selectionStarted = false;
	}
	patternForImpact(style = ImpactStyle.Heavy) {
		if (style === ImpactStyle.Medium) return [43];
		else if (style === ImpactStyle.Light) return [20];
		return [61];
	}
	patternForNotification(type = NotificationType.Success) {
		if (type === NotificationType.Warning) return [
			30,
			40,
			30,
			50,
			60
		];
		else if (type === NotificationType.Error) return [
			27,
			45,
			50
		];
		return [
			35,
			65,
			21
		];
	}
	vibrateWithPattern(pattern) {
		if (navigator.vibrate) navigator.vibrate(pattern);
		else throw this.unavailable("Browser does not support the vibrate API");
	}
};
//#endregion
//#region node_modules/@capacitor/local-notifications/dist/esm/web.js
var web_exports$2 = /* @__PURE__ */ __exportAll({ LocalNotificationsWeb: () => LocalNotificationsWeb });
var LocalNotificationsWeb = class extends WebPlugin {
	constructor() {
		super(...arguments);
		this.pending = [];
		this.deliveredNotifications = [];
		this.hasNotificationSupport = () => {
			if (!("Notification" in window) || !Notification.requestPermission) return false;
			if (Notification.permission !== "granted") try {
				new Notification("");
			} catch (e) {
				if (e.name == "TypeError") return false;
			}
			return true;
		};
	}
	async getDeliveredNotifications() {
		const deliveredSchemas = [];
		for (const notification of this.deliveredNotifications) {
			const deliveredSchema = {
				title: notification.title,
				id: parseInt(notification.tag),
				body: notification.body
			};
			deliveredSchemas.push(deliveredSchema);
		}
		return { notifications: deliveredSchemas };
	}
	async removeDeliveredNotifications(delivered) {
		for (const toRemove of delivered.notifications) {
			const found = this.deliveredNotifications.find((n) => n.tag === String(toRemove.id));
			found === null || found === void 0 || found.close();
			this.deliveredNotifications = this.deliveredNotifications.filter(() => !found);
		}
	}
	async removeAllDeliveredNotifications() {
		for (const notification of this.deliveredNotifications) notification.close();
		this.deliveredNotifications = [];
	}
	async createChannel() {
		throw this.unimplemented("Not implemented on web.");
	}
	async deleteChannel() {
		throw this.unimplemented("Not implemented on web.");
	}
	async listChannels() {
		throw this.unimplemented("Not implemented on web.");
	}
	async schedule(options) {
		if (!this.hasNotificationSupport()) throw this.unavailable("Notifications not supported in this browser.");
		for (const notification of options.notifications) this.sendNotification(notification);
		return { notifications: options.notifications.map((notification) => ({ id: notification.id })) };
	}
	async getPending() {
		return { notifications: this.pending };
	}
	async registerActionTypes() {
		throw this.unimplemented("Not implemented on web.");
	}
	async cancel(pending) {
		this.pending = this.pending.filter((notification) => !pending.notifications.find((n) => n.id === notification.id));
	}
	async areEnabled() {
		const { display } = await this.checkPermissions();
		return { value: display === "granted" };
	}
	async changeExactNotificationSetting() {
		throw this.unimplemented("Not implemented on web.");
	}
	async checkExactNotificationSetting() {
		throw this.unimplemented("Not implemented on web.");
	}
	async requestPermissions() {
		if (!this.hasNotificationSupport()) throw this.unavailable("Notifications not supported in this browser.");
		return { display: this.transformNotificationPermission(await Notification.requestPermission()) };
	}
	async checkPermissions() {
		if (!this.hasNotificationSupport()) throw this.unavailable("Notifications not supported in this browser.");
		return { display: this.transformNotificationPermission(Notification.permission) };
	}
	transformNotificationPermission(permission) {
		switch (permission) {
			case "granted": return "granted";
			case "denied": return "denied";
			default: return "prompt";
		}
	}
	sendPending() {
		var _a;
		const toRemove = [];
		const now = (/* @__PURE__ */ new Date()).getTime();
		for (const notification of this.pending) if (((_a = notification.schedule) === null || _a === void 0 ? void 0 : _a.at) && notification.schedule.at.getTime() <= now) {
			this.buildNotification(notification);
			toRemove.push(notification);
		}
		this.pending = this.pending.filter((notification) => !toRemove.find((n) => n === notification));
	}
	sendNotification(notification) {
		var _a;
		if ((_a = notification.schedule) === null || _a === void 0 ? void 0 : _a.at) {
			const diff = notification.schedule.at.getTime() - (/* @__PURE__ */ new Date()).getTime();
			this.pending.push(notification);
			setTimeout(() => {
				this.sendPending();
			}, diff);
			return;
		}
		this.buildNotification(notification);
	}
	buildNotification(notification) {
		const localNotification = new Notification(notification.title, {
			body: notification.body,
			tag: String(notification.id)
		});
		localNotification.addEventListener("click", this.onClick.bind(this, notification), false);
		localNotification.addEventListener("show", this.onShow.bind(this, notification), false);
		localNotification.addEventListener("close", () => {
			this.deliveredNotifications = this.deliveredNotifications.filter(() => !this);
		}, false);
		this.deliveredNotifications.push(localNotification);
		return localNotification;
	}
	onClick(notification) {
		const data = {
			actionId: "tap",
			notification
		};
		this.notifyListeners("localNotificationActionPerformed", data);
	}
	onShow(notification) {
		this.notifyListeners("localNotificationReceived", notification);
	}
};
//#endregion
//#region node_modules/@capacitor/share/dist/esm/web.js
var web_exports$1 = /* @__PURE__ */ __exportAll({ ShareWeb: () => ShareWeb });
var ShareWeb = class extends WebPlugin {
	async canShare() {
		if (typeof navigator === "undefined" || !navigator.share) return { value: false };
		else return { value: true };
	}
	async share(options) {
		if (typeof navigator === "undefined" || !navigator.share) throw this.unavailable("Share API not available in this browser");
		await navigator.share({
			title: options.title,
			text: options.text,
			url: options.url
		});
		return {};
	}
};
//#endregion
//#region node_modules/@capacitor/splash-screen/dist/esm/web.js
var web_exports = /* @__PURE__ */ __exportAll({ SplashScreenWeb: () => SplashScreenWeb });
var SplashScreenWeb = class extends WebPlugin {
	async show(_options) {}
	async hide(_options) {}
};
//#endregion
//#region node_modules/@capacitor/filesystem/dist/esm/index.js
var Filesystem = registerPlugin("Filesystem", { web: () => __vitePreload(() => Promise.resolve().then(() => web_exports$5).then((m) => new m.FilesystemWeb()), void 0) });
//#endregion
//#region node_modules/@capacitor/share/dist/esm/index.js
var Share = registerPlugin("Share", { web: () => __vitePreload(() => Promise.resolve().then(() => web_exports$1).then((m) => new m.ShareWeb()), void 0) });
//#endregion
export { Capacitor as _, Directory as a, registerPlugin as b, esm_exports$2 as c, SplashScreen as d, LocalNotifications as f, __vitePreload as g, esm_exports$3 as h, esm_exports$1 as i, BarcodeFormat as l, App as m, Filesystem as n, Encoding as o, BleClient as p, esm_exports as r, BarcodeScanner as s, Share as t, PushNotifications as u, WebPlugin as v, dist_exports as y };
