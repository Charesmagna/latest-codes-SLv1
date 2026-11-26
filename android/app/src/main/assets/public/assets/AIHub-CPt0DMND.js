import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { $ as MapPin, J as Mic, c as Volume2, f as Upload, g as Square, kt as require_react, ot as Globe } from "./icons-B-I2x5TV.js";
import { b as motion, w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-DQZ7ziRL.js";
import { i as SafetyLinkLogo } from "./index-BolDz6jr.js";
//#region src/components/AIHub.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AIHub = () => {
	const { addAuditLog, triggerPanic, userLocation } = useAppStore();
	const [activeSubTab, setActiveSubTab] = (0, import_react.useState)("chat");
	(0, import_react.useEffect)(() => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) return;
		const recognition = new SpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = false;
		recognition.lang = "en-US";
		recognition.onresult = (event) => {
			const latestResult = event.results[event.results.length - 1];
			if (latestResult.isFinal) {
				const transcript = latestResult[0].transcript.trim().toLowerCase();
				if (transcript.includes("execute emergency protocol") || transcript.includes("help me now")) {
					triggerPanic("Triggered via Voice Command");
					addAuditLog("SYSTEM", "SEVERE", "Emergency protocol initiated via covert voice command");
				}
			}
		};
		recognition.onend = () => {
			try {
				recognition.start();
			} catch {}
		};
		try {
			recognition.start();
		} catch {}
		return () => {
			recognition.onend = null;
			try {
				recognition.stop();
			} catch {}
		};
	}, [triggerPanic, addAuditLog]);
	const [chatMessages, setChatMessages] = (0, import_react.useState)([{
		sender: "bot",
		text: "Greeting Responder. I am Lizzy AI (K'lev.ai), your Gemini-powered safety coordinator. Ask about routes, nearby SAPS/hospitals, or upload an image for hazard analysis.",
		timestamp: Date.now() - 5e3
	}]);
	const [chatInput, setChatInput] = (0, import_react.useState)("");
	const [isTyping, setIsTyping] = (0, import_react.useState)(false);
	const [voiceActive, setVoiceActive] = (0, import_react.useState)(false);
	const [voiceWaves, setVoiceWaves] = (0, import_react.useState)([
		10,
		10,
		10,
		10,
		10,
		10,
		10,
		10
	]);
	const [voiceLog, setVoiceLog] = (0, import_react.useState)("Press start to establish Gemini Live bidirectional voice link.");
	const [isRecordingTranscript, setIsRecordingTranscript] = (0, import_react.useState)(false);
	const [transcribing, setTranscribing] = (0, import_react.useState)(false);
	const [transcriptText, setTranscriptText] = (0, import_react.useState)("");
	const [ttsSpeaking, setTtsSpeaking] = (0, import_react.useState)(false);
	const transcribeRecorderRef = (0, import_react.useRef)(null);
	const transcribeChunksRef = (0, import_react.useRef)([]);
	const [saferQuery, setSaferQuery] = (0, import_react.useState)("");
	const [saferLoading, setSaferLoading] = (0, import_react.useState)(false);
	const [saferAdvisory, setSaferAdvisory] = (0, import_react.useState)("");
	const [saferSafeZones, setSaferSafeZones] = (0, import_react.useState)("");
	const [saferSearchLinks, setSaferSearchLinks] = (0, import_react.useState)([]);
	const [saferMapLinks, setSaferMapLinks] = (0, import_react.useState)([]);
	const [imagePrompt, setImagePrompt] = (0, import_react.useState)("");
	const [imageNotice, setImageNotice] = (0, import_react.useState)(null);
	const [veoPrompt, setVeoPrompt] = (0, import_react.useState)("");
	const [veoNotice, setVeoNotice] = (0, import_react.useState)(null);
	const handleChatSubmit = async (e) => {
		e.preventDefault();
		if (!chatInput.trim()) return;
		const userMsg = chatInput;
		setChatMessages((prev) => [...prev, {
			sender: "user",
			text: userMsg,
			timestamp: Date.now()
		}]);
		setChatInput("");
		setIsTyping(true);
		try {
			let lat = userLocation?.lat;
			let lng = userLocation?.lng;
			if ((!lat || !lng) && navigator.geolocation) try {
				const pos = await new Promise((resolve, reject) => {
					navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 3e3 });
				});
				lat = pos.coords.latitude;
				lng = pos.coords.longitude;
			} catch {}
			const response = await fetch("/api/gemini/generate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					prompt: userMsg,
					useGrounding: lat && lng ? "maps" : "search",
					lat,
					lng
				})
			});
			if (!response.ok) throw new Error("AI request failed");
			const data = await response.json();
			let reply = data.text || "I could not process your request at this time.";
			if (data.chunks && Array.isArray(data.chunks)) {
				const links = data.chunks.map((chunk) => {
					const place = chunk.maps?.title || chunk.web?.title || "Verified Source";
					const uri = chunk.maps?.uri || chunk.web?.uri;
					if (uri) return `<a href="${uri}" target="_blank" rel="noopener noreferrer" class="text-emerald-400 underline">${place}</a>`;
					return null;
				}).filter(Boolean);
				if (links.length > 0) reply += `<br/><br/>📍 <b>Verified Sources:</b><br/>` + links.join("<br/>");
			}
			setChatMessages((prev) => [...prev, {
				sender: "bot",
				text: reply,
				timestamp: Date.now()
			}]);
		} catch {
			setChatMessages((prev) => [...prev, {
				sender: "bot",
				text: "Could not reach Gemini service. Please verify internet connectivity.",
				timestamp: Date.now()
			}]);
		} finally {
			setIsTyping(false);
			addAuditLog("SYSTEM", "INFO", "Lizzy AI processed chat request", `Query: ${userMsg.substring(0, 30)}`);
		}
	};
	const handleAnalyzeImage = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setIsTyping(true);
		const reader = new FileReader();
		reader.onloadend = () => {
			setChatMessages((prev) => [...prev, {
				sender: "user",
				text: `[Evidence Photograph Uploaded: ${file.name}]`,
				timestamp: Date.now()
			}]);
			fetch("/api/gemini/analyze-image", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					imageBase64: reader.result?.toString().split(",")[1],
					mimeType: file.type,
					prompt: "Analyze this image for safety hazards, security parameters, or tactical anomalies."
				})
			}).then((r) => r.json()).then((data) => {
				setChatMessages((prev) => [...prev, {
					sender: "bot",
					text: `EVIDENCE ANALYZED (gemini-4-hydrogen): ${data.text || "No analysis returned."}`,
					timestamp: Date.now()
				}]);
				setIsTyping(false);
				addAuditLog("SECURITY", "INFO", "Lizzy AI analyzed evidence image", file.name);
			}).catch(() => setIsTyping(false));
		};
		reader.readAsDataURL(file);
	};
	(0, import_react.useEffect)(() => {
		let interval;
		if (voiceActive) interval = setInterval(() => {
			setVoiceWaves(Array.from({ length: 8 }, () => Math.floor(Math.random() * 32) + 5));
		}, 100);
		else setVoiceWaves([
			10,
			10,
			10,
			10,
			10,
			10,
			10,
			10
		]);
		return () => clearInterval(interval);
	}, [voiceActive]);
	const wsRef = (0, import_react.useRef)(null);
	const voiceAudioCtxRef = (0, import_react.useRef)(null);
	const voiceProcessorRef = (0, import_react.useRef)(null);
	const mediaRecorderRef = (0, import_react.useRef)(null);
	const toggleVoiceLink = async () => {
		if (voiceActive) {
			setVoiceActive(false);
			setVoiceLog("Voice link terminated.");
			addAuditLog("SYSTEM", "INFO", "Lizzy AI voice chat disconnected");
			if (wsRef.current) {
				try {
					wsRef.current.close();
				} catch {}
				wsRef.current = null;
			}
			if (voiceProcessorRef.current) {
				voiceProcessorRef.current.disconnect();
				voiceProcessorRef.current = null;
			}
			if (voiceAudioCtxRef.current) {
				voiceAudioCtxRef.current.close();
				voiceAudioCtxRef.current = null;
			}
			if (mediaRecorderRef.current?.stream) {
				mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
				mediaRecorderRef.current = null;
			}
			return;
		}
		setVoiceActive(true);
		setVoiceLog("Connecting to gemini-3.8-live...");
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: {
				channelCount: 1,
				sampleRate: 16e3
			} });
			const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
			const ws = new WebSocket(`${protocol}//${window.location.host}/live`);
			wsRef.current = ws;
			const AudioContextClass = window.AudioContext || window.webkitAudioContext;
			const inputAudioCtx = new AudioContextClass({ sampleRate: 16e3 });
			const outputAudioCtx = new AudioContextClass({ sampleRate: 24e3 });
			voiceAudioCtxRef.current = outputAudioCtx;
			const source = inputAudioCtx.createMediaStreamSource(stream);
			const processor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
			voiceProcessorRef.current = processor;
			mediaRecorderRef.current = { stream };
			ws.onopen = () => {
				setVoiceLog("Live audio link established! Speak to transmit.");
				addAuditLog("SYSTEM", "INFO", "Lizzy AI voice chat connected", "gemini-3.8-live");
				processor.onaudioprocess = (e) => {
					const inputData = e.inputBuffer.getChannelData(0);
					const pcm16 = new Int16Array(inputData.length);
					for (let i = 0; i < inputData.length; i++) pcm16[i] = Math.max(-1, Math.min(1, inputData[i])) * 32767;
					const bytes = new Uint8Array(pcm16.buffer);
					let binary = "";
					for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
					if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({
						type: "audio",
						data: btoa(binary)
					}));
				};
				source.connect(processor);
				processor.connect(inputAudioCtx.destination);
			};
			let nextStartTime = 0;
			ws.onmessage = (e) => {
				try {
					const msg = JSON.parse(e.data);
					if (msg.type === "audio" && msg.data) {
						const binary = atob(msg.data);
						const bytes = new Uint8Array(binary.length);
						for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
						const pcm16 = new Int16Array(bytes.buffer);
						const float32 = new Float32Array(pcm16.length);
						for (let i = 0; i < pcm16.length; i++) float32[i] = pcm16[i] / 32767;
						const audioBuffer = outputAudioCtx.createBuffer(1, float32.length, 24e3);
						audioBuffer.getChannelData(0).set(float32);
						const bufSource = outputAudioCtx.createBufferSource();
						bufSource.buffer = audioBuffer;
						bufSource.connect(outputAudioCtx.destination);
						if (nextStartTime < outputAudioCtx.currentTime) nextStartTime = outputAudioCtx.currentTime;
						bufSource.start(nextStartTime);
						nextStartTime += audioBuffer.duration;
						setVoiceLog("Receiving live audio from Lizzy...");
					} else if (msg.type === "interrupted") nextStartTime = outputAudioCtx.currentTime;
					else if (msg.type === "error") setVoiceLog(`Error: ${msg.message}`);
				} catch (err) {
					console.error(err);
				}
			};
			ws.onerror = () => setVoiceLog("WebSocket connection failed.");
			ws.onclose = () => setVoiceActive(false);
		} catch {
			setVoiceActive(false);
			setVoiceLog("Microphone access denied or unavailable.");
		}
	};
	const transcribeBlob = async (blob) => {
		setTranscribing(true);
		const reader = new FileReader();
		reader.onloadend = async () => {
			try {
				const base64 = reader.result?.toString().split(",")[1];
				const data = await (await fetch("/api/gemini/transcribe", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						audioBase64: base64,
						mimeType: blob.type || "audio/webm"
					})
				})).json();
				setTranscriptText(data.text || "No speech detected.");
			} catch {
				setTranscriptText("Transcription request failed.");
			} finally {
				setTranscribing(false);
			}
		};
		reader.readAsDataURL(blob);
	};
	const handleToggleTranscribeMic = async () => {
		if (isRecordingTranscript && transcribeRecorderRef.current) {
			transcribeRecorderRef.current.stop();
			setIsRecordingTranscript(false);
			return;
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const recorder = new MediaRecorder(stream);
			transcribeChunksRef.current = [];
			recorder.ondataavailable = (ev) => {
				if (ev.data.size > 0) transcribeChunksRef.current.push(ev.data);
			};
			recorder.onstop = () => {
				stream.getTracks().forEach((t) => t.stop());
				const blob = new Blob(transcribeChunksRef.current, { type: recorder.mimeType || "audio/webm" });
				transcribeBlob(blob);
			};
			transcribeRecorderRef.current = recorder;
			recorder.start();
			setIsRecordingTranscript(true);
		} catch {
			setTranscriptText("Microphone permission denied.");
		}
	};
	const handleAudioFileUpload = (e) => {
		const file = e.target.files?.[0];
		if (file) transcribeBlob(file);
	};
	const handleReadTranscriptAloud = async () => {
		if (!transcriptText.trim() || ttsSpeaking) return;
		setTtsSpeaking(true);
		try {
			const res = await fetch("/api/gemini/tts", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					text: transcriptText,
					voiceName: "Kore"
				})
			});
			if (res.ok) {
				const data = await res.json();
				if (data.audioBase64) {
					const audio = new Audio(`data:${data.mimeType || "audio/wav"};base64,${data.audioBase64}`);
					audio.onended = () => setTtsSpeaking(false);
					await audio.play();
					return;
				}
			}
		} catch {}
		setTtsSpeaking(false);
	};
	const handleSaferCityFetch = async (e) => {
		if (e) e.preventDefault();
		setSaferLoading(true);
		try {
			const data = await (await fetch("/api/gemini/safer-city", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					queryText: saferQuery.trim() || void 0,
					lat: userLocation?.lat,
					lng: userLocation?.lng
				})
			})).json();
			setSaferAdvisory(data.advisoryText || "No active advisories returned.");
			setSaferSafeZones(data.safeZonesText || "");
			const sLinks = Array.isArray(data.searchChunks) ? data.searchChunks.map((c) => c.web?.uri ? {
				title: c.web.title || "Web Source",
				uri: c.web.uri
			} : null).filter(Boolean) : [];
			const mLinks = Array.isArray(data.mapsChunks) ? data.mapsChunks.map((c) => c.maps?.uri ? {
				title: c.maps.title || "Google Maps Place",
				uri: c.maps.uri
			} : null).filter(Boolean) : [];
			setSaferSearchLinks(sLinks);
			setSaferMapLinks(mLinks);
		} catch {
			setSaferAdvisory("Failed to reach Safer City Grounding service.");
		} finally {
			setSaferLoading(false);
		}
	};
	const handleCheckPaidImage = async () => {
		const data = await (await fetch("/api/gemini/generate-image", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ prompt: imagePrompt })
		})).json();
		setImageNotice(data.error || "Requires a billing-enabled Gemini API key.");
	};
	const handleCheckPaidVideo = async () => {
		const data = await (await fetch("/api/gemini/generate-video", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ prompt: veoPrompt })
		})).json();
		setVeoNotice(data.error || "Requires a billing-enabled Gemini API key.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-slate-900/40 border border-slate-900 rounded-3xl p-5 text-left space-y-4 shadow relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center border-b border-slate-800 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyLinkLogo, {
						size: 18,
						glowColor: "rgba(16, 185, 129, 0.4)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-xs font-black tracking-widest font-mono uppercase text-slate-100 flex items-center gap-1",
						children: [
							"LIZZY AI • K'LEV",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-black text-emerald-400",
								children: "A"
							}),
							".",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-black text-emerald-400",
								children: "I"
							}),
							"NFO"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[8px] font-mono font-bold bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded uppercase tracking-wider",
					children: "gemini-4-hydrogen"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 bg-slate-950 rounded-2xl border border-slate-850",
				children: [
					{
						id: "chat",
						label: "Chatbot",
						icon: "💬"
					},
					{
						id: "voice",
						label: "Live Voice",
						icon: "🎙️"
					},
					{
						id: "transcribe",
						label: "Transcribe",
						icon: "🗣️"
					},
					{
						id: "safercity",
						label: "Safer City",
						icon: "🌐"
					},
					{
						id: "image",
						label: "Img (Pro)",
						icon: "🎨"
					},
					{
						id: "surveillance",
						label: "Veo (Pro)",
						icon: "📹"
					}
				].map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActiveSubTab(sub.id),
					className: `py-1.5 text-[9px] font-mono font-bold rounded-xl uppercase tracking-wider flex flex-col items-center justify-center gap-0.5 transition-all ${activeSubTab === sub.id ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-slate-200"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sub.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sub.label })]
				}, sub.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-[220px] flex flex-col justify-between",
				children: [
					activeSubTab === "chat" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 flex-1 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-950 border border-slate-850 rounded-2xl p-3 max-h-52 overflow-y-auto space-y-2.5 text-xs font-mono",
							children: [chatMessages.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `p-2 rounded-xl max-w-[88%] leading-relaxed ${m.sender === "user" ? "bg-emerald-900/30 border border-emerald-500/20 text-emerald-100 ml-auto" : "bg-slate-900 border border-slate-800 text-slate-300"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: m.text.replace(/\n/g, "<br/>") } })
							}, idx)), isTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-slate-500 italic animate-pulse",
								children: "Lizzy AI is analyzing..."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleChatSubmit,
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "p-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl cursor-pointer flex items-center justify-center text-sm shrink-0",
									title: "Analyze Hazard Image",
									children: ["📸", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/*",
										onChange: handleAnalyzeImage,
										className: "hidden"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: chatInput,
									onChange: (e) => setChatInput(e.target.value),
									placeholder: "Ask Lizzy AI about safe routes or hazards...",
									className: "flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl uppercase font-mono shrink-0",
									children: "Send"
								})
							]
						})]
					}),
					activeSubTab === "voice" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-center py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-center gap-1 h-12 w-full max-w-xs mx-auto bg-slate-950 rounded-2xl border border-slate-800 px-4",
								children: voiceWaves.map((val, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									animate: { height: val },
									className: `w-1 rounded-full ${voiceActive ? "bg-emerald-500" : "bg-slate-800"}`
								}, idx))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: toggleVoiceLink,
								className: `px-5 py-2.5 rounded-full font-mono text-xs font-extrabold uppercase tracking-wide border transition-all ${voiceActive ? "bg-red-600/30 hover:bg-red-600 border-red-500 text-red-200" : "bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white"}`,
								children: voiceActive ? "⏹️ Terminate Link" : "🎙️ Establish Live Voice Link"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[9px] font-mono text-slate-500 uppercase tracking-widest",
								children: "Powered by gemini-3.8-live"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3 bg-slate-950 border border-slate-850 rounded-xl text-[10px] font-mono text-slate-400 text-left",
								children: ["STATUS: ", voiceLog]
							})
						]
					}),
					activeSubTab === "transcribe" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] font-mono text-slate-400",
								children: [
									"Accessibility speech-to-text (",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-400",
										children: "gemini-3.5-transcribe"
									}),
									") & read-aloud TTS (",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-400",
										children: "gemini-3.8-flash-lite-tts"
									}),
									")."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleToggleTranscribeMic,
										className: `flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold ${isRecordingTranscript ? "bg-red-600 text-white animate-pulse" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`,
										children: [isRecordingTranscript ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { size: 14 }), isRecordingTranscript ? "Stop & Transcribe" : "Record Voice Note"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 14 }),
											" Upload Audio",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "audio/*",
												onChange: handleAudioFileUpload,
												className: "hidden"
											})
										]
									}),
									transcriptText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleReadTranscriptAloud,
										disabled: ttsSpeaking,
										className: "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { size: 14 }),
											" ",
											ttsSpeaking ? "Speaking..." : "Read Aloud"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-slate-950 border border-slate-800 rounded-2xl p-3 min-h-[110px] text-xs font-mono text-slate-200 whitespace-pre-wrap",
								children: transcribing ? "Transcribing spoken audio via gemini-3.5-transcribe..." : transcriptText || "Record or upload an audio clip to generate an accessible transcript."
							})
						]
					}),
					activeSubTab === "safercity" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSaferCityFetch,
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: saferQuery,
								onChange: (e) => setSaferQuery(e.target.value),
								placeholder: "City / suburb query (optional, defaults to GPS)...",
								className: "flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: saferLoading,
								className: "px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl font-mono",
								children: saferLoading ? "Scanning..." : "Refresh"
							})]
						}), saferAdvisory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-2 text-xs font-mono text-slate-200 max-h-56 overflow-y-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-emerald-400 font-bold uppercase text-[10px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { size: 12 }), " Google Search Safer City Advisories"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "whitespace-pre-line",
									children: saferAdvisory
								}),
								saferSearchLinks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-1 space-y-1",
									children: saferSearchLinks.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: l.uri,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "block text-[10px] text-blue-400 underline",
										children: ["🔗 ", l.title]
									}, i))
								}),
								saferSafeZones && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-amber-400 font-bold uppercase text-[10px] pt-2 border-t border-slate-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 12 }), " Google Maps Grounded Safe Zones"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "whitespace-pre-line",
									children: saferSafeZones
								})] }),
								saferMapLinks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-1 space-y-1",
									children: saferMapLinks.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: l.uri,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "block text-[10px] text-emerald-400 underline",
										children: ["📍 ", l.title]
									}, i))
								})
							]
						})]
					}),
					activeSubTab === "image" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs font-mono text-amber-200",
								children: "AI Image generation requires a billing-enabled Gemini API key. Standard free-tier text, voice, transcription, and hazard image analysis remain active."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: imagePrompt,
									onChange: (e) => setImagePrompt(e.target.value),
									placeholder: "Describe tactical asset...",
									className: "flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleCheckPaidImage,
									className: "px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl font-mono",
									children: "Check Tier"
								})]
							}),
							imageNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-mono text-amber-400",
								children: imageNotice
							})
						]
					}),
					activeSubTab === "surveillance" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs font-mono text-amber-200",
								children: "Veo video generation requires a billing-enabled Gemini API key. Website hero motion and background loops run directly via R2 video streams and interactive HTML5 motion."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: veoPrompt,
									onChange: (e) => setVeoPrompt(e.target.value),
									placeholder: "Describe video render...",
									className: "flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleCheckPaidVideo,
									className: "px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl font-mono",
									children: "Check Tier"
								})]
							}),
							veoNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-mono text-amber-400",
								children: veoNotice
							})
						]
					})
				]
			})
		]
	});
};
//#endregion
export { AIHub };
