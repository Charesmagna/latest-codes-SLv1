import { a as __toESM } from "./rolldown-runtime-7_rZTKki.js";
import { A as Radio, B as MoveUpRight, Ct as Camera, G as MoveDownRight, H as MoveRight, J as Mic, K as MoveDownLeft, M as Plus, O as RefreshCw, S as ShieldAlert, U as MoveLeft, V as MoveUpLeft, W as MoveDown, Y as MicOff, Z as Maximize2, at as Grid2x2, c as Volume2, g as Square, gt as CircleCheck, h as Trash2, i as X, kt as require_react, l as Video, lt as ExternalLink, n as ZoomIn, ot as Globe, pt as Copy, s as VolumeX, t as ZoomOut, ut as Download, w as Settings2, z as MoveUp } from "./icons-B-I2x5TV.js";
import { w as require_jsx_runtime } from "./vendor-DZX22qT5.js";
import { i as useAppStore } from "./store-CoihKo_w.js";
import { t as HikvisionCameraManager } from "./HikvisionCameraManager-BbFPfcLU.js";
//#region src/components/LiveCameraFeed.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function getEffectiveSignalingMode(cam) {
	if (cam.signalingMode) return cam.signalingMode;
	if (cam.mode === "WHEP_HLS_RELAY") return "WHEP_DIRECT";
	if (cam.mode === "LAN_ISAPI") return "LAN_ISAPI_POLL";
	return "HIK_CONNECT_P2P";
}
function sanitizeDisplayUrl(raw) {
	if (!raw) return "";
	try {
		const u = new URL(raw);
		u.username = "";
		u.password = "";
		return u.toString();
	} catch {
		return raw;
	}
}
function phaseBadgeStyles(phase, isLight) {
	switch (phase) {
		case "LIVE": return isLight ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-emerald-950/70 text-emerald-300 border-emerald-500/30";
		case "SIGNALING":
		case "ICE_CHECKING":
		case "RECONNECTING":
		case "FALLBACK_SNAPSHOT": return isLight ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-amber-950/70 text-amber-300 border-amber-500/30";
		case "FAILED": return isLight ? "bg-red-50 text-red-700 border-red-200" : "bg-red-950/70 text-red-300 border-red-500/30";
		case "P2P_READY": return isLight ? "bg-cyan-50 text-cyan-700 border-cyan-200" : "bg-cyan-950/70 text-cyan-300 border-cyan-500/30";
		default: return isLight ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-slate-900 text-slate-400 border-slate-700";
	}
}
function phaseLabel(phase) {
	switch (phase) {
		case "LIVE": return "LIVE · WEBRTC";
		case "SIGNALING": return "SIGNALING";
		case "ICE_CHECKING": return "ICE CHECKING";
		case "RECONNECTING": return "RECONNECTING";
		case "FALLBACK_SNAPSHOT": return "LAN FRAMES";
		case "P2P_READY": return "HIK-CONNECT P2P";
		case "FAILED": return "DISCONNECTED";
		default: return "STANDBY";
	}
}
var CameraStreamTile = ({ camera, isSpotlight, isSelected, globalMuted, isLight, reconnectEpoch, onSelectSpotlight, onOpenConfig, onRegisterActions }) => {
	const { getCameraLocalCredentials, fetchCameraSnapshot, addCameraEvidenceSnapshot, updateCamera, addToast } = useAppStore();
	const videoRef = (0, import_react.useRef)(null);
	const imgRef = (0, import_react.useRef)(null);
	const pcRef = (0, import_react.useRef)(null);
	const sessionUrlRef = (0, import_react.useRef)(null);
	const audioSenderRef = (0, import_react.useRef)(null);
	const micStreamRef = (0, import_react.useRef)(null);
	const analyserRafRef = (0, import_react.useRef)(null);
	const audioCtxRef = (0, import_react.useRef)(null);
	const statsTimerRef = (0, import_react.useRef)(null);
	const lastBytesRef = (0, import_react.useRef)(null);
	const retryTimerRef = (0, import_react.useRef)(null);
	const retryCountRef = (0, import_react.useRef)(0);
	const [phase, setPhase] = (0, import_react.useState)("IDLE");
	const [statusMessage, setStatusMessage] = (0, import_react.useState)("Initializing player...");
	const [stats, setStats] = (0, import_react.useState)({});
	const [localMuted, setLocalMuted] = (0, import_react.useState)(true);
	const [talkbackState, setTalkbackState] = (0, import_react.useState)("OFF");
	const [micLevel, setMicLevel] = (0, import_react.useState)(0);
	const [fallbackImage, setFallbackImage] = (0, import_react.useState)(camera.lastSnapshotBase64);
	const [manualEpoch, setManualEpoch] = (0, import_react.useState)(0);
	const effectiveMode = getEffectiveSignalingMode(camera);
	const effectiveMuted = globalMuted || localMuted;
	const endpointUrl = sanitizeDisplayUrl(camera.whepUrl || camera.relayUrl);
	const stopTalkback = (0, import_react.useCallback)(async () => {
		if (analyserRafRef.current) {
			cancelAnimationFrame(analyserRafRef.current);
			analyserRafRef.current = null;
		}
		if (audioCtxRef.current) {
			audioCtxRef.current.close().catch(() => {});
			audioCtxRef.current = null;
		}
		if (micStreamRef.current) {
			micStreamRef.current.getTracks().forEach((t) => t.stop());
			micStreamRef.current = null;
		}
		if (audioSenderRef.current) await audioSenderRef.current.replaceTrack(null).catch(() => {});
		setMicLevel(0);
		setTalkbackState((prev) => prev === "PERMISSION_DENIED" || prev === "UNSUPPORTED" ? prev : "OFF");
	}, []);
	const teardownPeer = (0, import_react.useCallback)(async () => {
		if (retryTimerRef.current) {
			window.clearTimeout(retryTimerRef.current);
			retryTimerRef.current = null;
		}
		if (statsTimerRef.current) {
			window.clearInterval(statsTimerRef.current);
			statsTimerRef.current = null;
		}
		lastBytesRef.current = null;
		await stopTalkback();
		const sessUrl = sessionUrlRef.current;
		sessionUrlRef.current = null;
		if (sessUrl) {
			const creds = getCameraLocalCredentials(camera.id);
			if (effectiveMode === "SERVER_PROXY") fetch("/api/hikvision/webrtc/signal", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "DELETE",
					targetUrl: sessUrl,
					bearerToken: creds.whepBearerToken,
					username: creds.username,
					password: creds.password
				})
			}).catch(() => {});
			else {
				const headers = {};
				if (creds.whepBearerToken) headers.Authorization = `Bearer ${creds.whepBearerToken}`;
				fetch(sessUrl, {
					method: "DELETE",
					headers
				}).catch(() => {});
			}
		}
		if (pcRef.current) {
			try {
				pcRef.current.oniceconnectionstatechange = null;
				pcRef.current.onconnectionstatechange = null;
				pcRef.current.ontrack = null;
				pcRef.current.close();
			} catch {}
			pcRef.current = null;
		}
		audioSenderRef.current = null;
		if (videoRef.current) videoRef.current.srcObject = null;
	}, [
		camera.id,
		effectiveMode,
		getCameraLocalCredentials,
		stopTalkback
	]);
	const startTalkback = (0, import_react.useCallback)(async (forceState) => {
		if (!(forceState !== void 0 ? forceState : talkbackState !== "ACTIVE")) {
			await stopTalkback();
			return;
		}
		if (camera.twoWayAudioEnabled === false) {
			addToast("Two-way audio is disabled in this camera configuration.", "warn");
			return;
		}
		if (effectiveMode !== "WHEP_DIRECT" && effectiveMode !== "SERVER_PROXY") {
			setTalkbackState("UNSUPPORTED");
			addToast("Two-way WebRTC talkback requires WHEP Direct or Server Proxy streaming mode.", "info");
			return;
		}
		if (!pcRef.current || pcRef.current.connectionState !== "connected") {
			addToast("Wait until the WebRTC stream is LIVE before enabling microphone talkback.", "warn");
			return;
		}
		if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
			setTalkbackState("UNSUPPORTED");
			addToast("Microphone talkback requires HTTPS or a secure Android WebView context.", "warn");
			return;
		}
		setTalkbackState("REQUESTING_MIC");
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true
				},
				video: false
			});
			const micTrack = stream.getAudioTracks()[0];
			if (!micTrack) throw new Error("No microphone track available.");
			let sender = audioSenderRef.current;
			if (!sender && pcRef.current) {
				const audioTr = pcRef.current.getTransceivers().find((tr) => tr.receiver.track?.kind === "audio" || tr.sender.track?.kind === "audio");
				if (audioTr) {
					if (audioTr.direction === "recvonly") audioTr.direction = "sendrecv";
					sender = audioTr.sender;
					audioSenderRef.current = sender;
				}
			}
			if (!sender) {
				stream.getTracks().forEach((t) => t.stop());
				setTalkbackState("UNSUPPORTED");
				addToast("Remote stream SDP has no audio backchannel transceiver. Ensure go2rtc includes isapi:// backchannel.", "warn");
				return;
			}
			await sender.replaceTrack(micTrack);
			micStreamRef.current = stream;
			setTalkbackState("ACTIVE");
			try {
				const AudioCtx = window.AudioContext || window.webkitAudioContext;
				if (AudioCtx) {
					const ctx = new AudioCtx();
					audioCtxRef.current = ctx;
					const source = ctx.createMediaStreamSource(stream);
					const analyser = ctx.createAnalyser();
					analyser.fftSize = 128;
					source.connect(analyser);
					const buf = new Uint8Array(analyser.frequencyBinCount);
					const tick = () => {
						if (!micStreamRef.current) return;
						analyser.getByteTimeDomainData(buf);
						let sum = 0;
						for (let i = 0; i < buf.length; i++) {
							const v = (buf[i] - 128) / 128;
							sum += v * v;
						}
						const rms = Math.min(100, Math.round(Math.sqrt(sum / buf.length) * 260));
						setMicLevel(rms);
						analyserRafRef.current = requestAnimationFrame(tick);
					};
					analyserRafRef.current = requestAnimationFrame(tick);
				}
			} catch {}
		} catch (err) {
			const name = err?.name || "";
			const denied = name === "NotAllowedError" || name === "PermissionDeniedError";
			setTalkbackState(denied ? "PERMISSION_DENIED" : "UNSUPPORTED");
			addToast(denied ? "Microphone permission denied. Allow microphone access in browser/Android settings for Talkback." : err?.message || "Unable to access microphone.", "warn");
		}
	}, [
		addToast,
		camera.twoWayAudioEnabled,
		effectiveMode,
		stopTalkback,
		talkbackState
	]);
	const captureFrame = (0, import_react.useCallback)(async () => {
		const canvas = document.createElement("canvas");
		let sourceEl = null;
		let srcW = 1280;
		let srcH = 720;
		if (videoRef.current && videoRef.current.videoWidth > 0) {
			sourceEl = videoRef.current;
			srcW = videoRef.current.videoWidth;
			srcH = videoRef.current.videoHeight;
		} else if (imgRef.current && imgRef.current.naturalWidth > 0) {
			sourceEl = imgRef.current;
			srcW = imgRef.current.naturalWidth;
			srcH = imgRef.current.naturalHeight;
		}
		if (!sourceEl) {
			if (camera.host) {
				const res = await fetchCameraSnapshot(camera.id);
				if (res.ok && res.imageBase64) {
					addCameraEvidenceSnapshot({
						cameraId: camera.id,
						cameraName: camera.name,
						orgId: camera.orgId,
						dataUrl: res.imageBase64
					});
					setFallbackImage(res.imageBase64);
					addToast(`Captured ISAPI snapshot for ${camera.name}.`, "success");
					return;
				}
			}
			addToast("No active video frame available to capture yet.", "warn");
			return;
		}
		canvas.width = srcW;
		canvas.height = srcH;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		try {
			ctx.drawImage(sourceEl, 0, 0, srcW, srcH);
			const barH = Math.max(28, Math.round(srcH * .055));
			ctx.fillStyle = "rgba(2, 6, 23, 0.78)";
			ctx.fillRect(0, srcH - barH, srcW, barH);
			ctx.fillStyle = "#e2e8f0";
			ctx.font = `600 ${Math.max(12, Math.round(barH * .45))}px ui-monospace, monospace`;
			const stamp = (/* @__PURE__ */ new Date()).toISOString();
			ctx.fillText(`SAFETYLINK · ${camera.name} · ${camera.orgId} · ${stamp}`, 12, srcH - Math.round(barH * .32));
			const dataUrl = canvas.toDataURL("image/jpeg", .9);
			addCameraEvidenceSnapshot({
				cameraId: camera.id,
				cameraName: camera.name,
				orgId: camera.orgId,
				dataUrl
			});
			const a = document.createElement("a");
			a.href = dataUrl;
			a.download = `safetylink-${camera.name.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}-${Date.now()}.jpg`;
			a.click();
			addToast(`Snapshot saved & downloaded (${srcW}x${srcH}).`, "success");
		} catch {
			if (camera.host) {
				const res = await fetchCameraSnapshot(camera.id);
				if (res.ok && res.imageBase64) {
					addCameraEvidenceSnapshot({
						cameraId: camera.id,
						cameraName: camera.name,
						orgId: camera.orgId,
						dataUrl: res.imageBase64
					});
					addToast(`Captured server ISAPI evidence snapshot for ${camera.name}.`, "success");
					return;
				}
			}
			addToast("Cross-origin stream blocked canvas export; configure Server Proxy or LAN host for server snapshots.", "warn");
		}
	}, [
		addCameraEvidenceSnapshot,
		addToast,
		camera.host,
		camera.id,
		camera.name,
		camera.orgId,
		fetchCameraSnapshot
	]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		retryCountRef.current = 0;
		const startWebRtc = async (attempt = 0) => {
			await teardownPeer();
			if (cancelled) return;
			if (!endpointUrl) {
				setPhase("FAILED");
				setStatusMessage("No WHEP / WebRTC relay URL configured. Open Connection Settings to set URL or switch to LAN ISAPI.");
				return;
			}
			setPhase(attempt > 0 ? "RECONNECTING" : "SIGNALING");
			setStatusMessage(attempt > 0 ? `Reconnecting WebRTC peer (attempt ${attempt}/3)...` : effectiveMode === "SERVER_PROXY" ? "Negotiating via signed SafetyLink signaling proxy..." : "Posting WHEP SDP offer...");
			const creds = getCameraLocalCredentials(camera.id);
			const iceServers = [];
			(camera.stunServers && camera.stunServers.length > 0 ? camera.stunServers : ["stun:stun.l.google.com:19302"]).forEach((url) => {
				if (url && url.trim()) iceServers.push({ urls: url.trim() });
			});
			if (camera.turnUrls && camera.turnUrls.length > 0) camera.turnUrls.forEach((url) => {
				if (url && url.trim()) iceServers.push({
					urls: url.trim(),
					...creds.turnUsername ? { username: creds.turnUsername } : {},
					...creds.turnCredential ? { credential: creds.turnCredential } : {}
				});
			});
			const pc = new RTCPeerConnection({ iceServers });
			pcRef.current = pc;
			const remoteStream = new MediaStream();
			if (videoRef.current) videoRef.current.srcObject = remoteStream;
			pc.ontrack = (ev) => {
				if (ev.streams && ev.streams[0]) ev.streams[0].getTracks().forEach((t) => {
					if (!remoteStream.getTracks().some((rt) => rt.id === t.id)) remoteStream.addTrack(t);
				});
				else if (ev.track) remoteStream.addTrack(ev.track);
				if (videoRef.current && videoRef.current.srcObject !== remoteStream) videoRef.current.srcObject = remoteStream;
				videoRef.current?.play().catch(() => {});
			};
			const scheduleRetryOrFail = (reason) => {
				if (cancelled) return;
				if (retryCountRef.current < 3) {
					const nextAttempt = retryCountRef.current + 1;
					retryCountRef.current = nextAttempt;
					const delayMs = nextAttempt * 2e3;
					setPhase("RECONNECTING");
					setStatusMessage(`${reason} Retrying in ${nextAttempt * 2}s (${nextAttempt}/3)...`);
					retryTimerRef.current = window.setTimeout(() => {
						if (!cancelled) startWebRtc(nextAttempt);
					}, delayMs);
				} else {
					setPhase("FAILED");
					setStatusMessage(reason);
				}
			};
			pc.oniceconnectionstatechange = () => {
				if (cancelled) return;
				const iceState = pc.iceConnectionState;
				if (iceState === "checking") {
					setPhase("ICE_CHECKING");
					setStatusMessage("Establishing ICE media path...");
				} else if (iceState === "failed") scheduleRetryOrFail("ICE connectivity failed (firewall/CG-NAT may require TURN relay).");
			};
			pc.onconnectionstatechange = () => {
				if (cancelled) return;
				const connState = pc.connectionState;
				if (connState === "connected") {
					retryCountRef.current = 0;
					setPhase("LIVE");
					setStatusMessage("Connected · Low-latency WebRTC stream active");
					updateCamera(camera.id, {
						status: "ONLINE",
						lastError: void 0,
						lastCheckedAt: Date.now()
					});
				} else if (connState === "failed") scheduleRetryOrFail("WebRTC peer connection failed.");
				else if (connState === "disconnected") {
					setPhase("RECONNECTING");
					setStatusMessage("Peer disconnected — monitoring ICE recovery...");
				}
			};
			try {
				pc.addTransceiver("video", { direction: "recvonly" });
				const audioTransceiver = pc.addTransceiver("audio", { direction: camera.twoWayAudioEnabled === false ? "recvonly" : "sendrecv" });
				audioSenderRef.current = audioTransceiver.sender;
				const offer = await pc.createOffer();
				await pc.setLocalDescription(offer);
				await new Promise((resolve) => {
					if (pc.iceGatheringState === "complete") {
						resolve();
						return;
					}
					const t = window.setTimeout(() => resolve(), 1200);
					const onGather = () => {
						if (pc.iceGatheringState === "complete") {
							window.clearTimeout(t);
							pc.removeEventListener("icegatheringstatechange", onGather);
							resolve();
						}
					};
					pc.addEventListener("icegatheringstatechange", onGather);
				});
				if (cancelled || !pc.localDescription?.sdp) return;
				let sdpAnswer = "";
				if (effectiveMode === "SERVER_PROXY") {
					const proxyRes = await fetch("/api/hikvision/webrtc/signal", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							action: "OFFER",
							targetUrl: endpointUrl,
							sdpOffer: pc.localDescription.sdp,
							bearerToken: creds.whepBearerToken,
							username: creds.username,
							password: creds.password
						})
					});
					const data = await proxyRes.json().catch(() => ({}));
					if (!proxyRes.ok || !data.ok || !data.sdpAnswer) throw new Error(data.error || `Server proxy returned HTTP ${proxyRes.status}`);
					sdpAnswer = data.sdpAnswer;
					if (data.locationHeader) sessionUrlRef.current = data.locationHeader;
				} else {
					const headers = {
						"Content-Type": "application/sdp",
						Accept: "application/sdp"
					};
					if (creds.whepBearerToken) headers.Authorization = `Bearer ${creds.whepBearerToken}`;
					const whepRes = await fetch(endpointUrl, {
						method: "POST",
						headers,
						body: pc.localDescription.sdp
					});
					const bodyText = await whepRes.text();
					if (!whepRes.ok) throw new Error(whepRes.status === 401 ? "WHEP HTTP 401 Unauthorized — check Bearer token in Connection Settings." : `WHEP gateway returned HTTP ${whepRes.status}`);
					sdpAnswer = bodyText;
					const loc = whepRes.headers.get("location");
					if (loc) try {
						sessionUrlRef.current = new URL(loc, endpointUrl).toString();
					} catch {
						sessionUrlRef.current = void 0;
					}
				}
				if (cancelled) return;
				await pc.setRemoteDescription({
					type: "answer",
					sdp: sdpAnswer
				});
				setPhase("ICE_CHECKING");
				setStatusMessage("SDP negotiated · Waiting for media packets...");
				statsTimerRef.current = window.setInterval(async () => {
					if (!pcRef.current || cancelled) return;
					try {
						const report = await pcRef.current.getStats();
						let codecName;
						let fps;
						let width;
						let height;
						let bytesReceived = 0;
						let framesDecoded = 0;
						let rttMs;
						let candidateType;
						let codecId;
						const codecs = /* @__PURE__ */ new Map();
						const candidates = /* @__PURE__ */ new Map();
						report.forEach((stat) => {
							if (stat.type === "codec" && stat.mimeType) codecs.set(stat.id, String(stat.mimeType).replace("video/", "").replace("audio/", "").toUpperCase());
							if (stat.type === "remote-candidate" || stat.type === "local-candidate") {
								if (stat.candidateType) candidates.set(stat.id, String(stat.candidateType));
							}
							if (stat.type === "inbound-rtp" && stat.kind === "video") {
								bytesReceived = Number(stat.bytesReceived || 0);
								framesDecoded = Number(stat.framesDecoded || 0);
								fps = stat.framesPerSecond !== void 0 ? Math.round(Number(stat.framesPerSecond)) : void 0;
								width = stat.frameWidth ? Number(stat.frameWidth) : void 0;
								height = stat.frameHeight ? Number(stat.frameHeight) : void 0;
								codecId = stat.codecId;
							}
							if (stat.type === "candidate-pair" && stat.state === "succeeded") {
								if (stat.currentRoundTripTime !== void 0) rttMs = Math.round(Number(stat.currentRoundTripTime) * 1e3);
								if (stat.localCandidateId && candidates.has(stat.localCandidateId)) candidateType = candidates.get(stat.localCandidateId);
							}
						});
						if (codecId && codecs.has(codecId)) codecName = codecs.get(codecId);
						const now = Date.now();
						let bitrateKbps;
						if (lastBytesRef.current && bytesReceived >= lastBytesRef.current.bytes) {
							const dt = (now - lastBytesRef.current.ts) / 1e3;
							if (dt > .2) bitrateKbps = Math.round((bytesReceived - lastBytesRef.current.bytes) * 8 / (dt * 1e3));
						}
						lastBytesRef.current = {
							bytes: bytesReceived,
							ts: now
						};
						setStats({
							codec: codecName,
							resolution: width && height ? `${width}x${height}` : void 0,
							fps,
							bitrateKbps,
							rttMs,
							candidateType,
							framesDecoded
						});
					} catch {}
				}, 1500);
			} catch (err) {
				if (cancelled) return;
				const msg = err?.message || "WebRTC signaling error.";
				const corsHint = effectiveMode === "WHEP_DIRECT" && /failed to fetch|networkerror|cors/i.test(msg) ? " (If blocked by CORS, switch signaling mode to Server Proxy in Settings.)" : "";
				setPhase("FAILED");
				setStatusMessage(`${msg}${corsHint}`);
			}
		};
		if (effectiveMode === "WHEP_DIRECT" || effectiveMode === "SERVER_PROXY") {
			startWebRtc(0);
			return () => {
				cancelled = true;
				teardownPeer();
			};
		}
		if (effectiveMode === "LAN_ISAPI_POLL") {
			teardownPeer();
			if (!camera.host) {
				setPhase("FAILED");
				setStatusMessage("No camera IP/hostname configured for LAN ISAPI live frame polling.");
				return;
			}
			setPhase("FALLBACK_SNAPSHOT");
			setStatusMessage(`Polling ${camera.host}:${camera.httpPort || 80} ISAPI channel ${camera.channel || 102}...`);
			const pollOnce = async () => {
				if (cancelled || document.hidden) return;
				const t0 = Date.now();
				const res = await fetchCameraSnapshot(camera.id);
				if (cancelled) return;
				if (res.ok && res.imageBase64) {
					setFallbackImage(res.imageBase64);
					setPhase("FALLBACK_SNAPSHOT");
					setStatusMessage(`LAN ISAPI Live Frames (${Date.now() - t0}ms RTT)`);
				} else setStatusMessage(res.diagnostics);
			};
			pollOnce();
			const iv = window.setInterval(pollOnce, isSpotlight ? 1800 : 3200);
			return () => {
				cancelled = true;
				window.clearInterval(iv);
				teardownPeer();
			};
		}
		teardownPeer();
		setPhase("P2P_READY");
		setStatusMessage(camera.serialNumber ? `Hik-Connect P2P Serial ${camera.serialNumber} ready · Tap Open Hik-Connect or attach go2rtc WHEP URL for inline WebRTC.` : "Configure serial number or WHEP relay URL.");
		return () => {
			cancelled = true;
			teardownPeer();
		};
	}, [
		camera.channel,
		camera.host,
		camera.httpPort,
		camera.id,
		camera.serialNumber,
		camera.stunServers,
		camera.turnUrls,
		camera.twoWayAudioEnabled,
		effectiveMode,
		endpointUrl,
		fetchCameraSnapshot,
		getCameraLocalCredentials,
		isSpotlight,
		manualEpoch,
		reconnectEpoch,
		teardownPeer,
		updateCamera
	]);
	(0, import_react.useEffect)(() => {
		if (videoRef.current) videoRef.current.muted = effectiveMuted;
	}, [effectiveMuted]);
	(0, import_react.useEffect)(() => {
		if (onRegisterActions && isSelected) onRegisterActions(camera.id, {
			captureFrame,
			reconnect: () => setManualEpoch((e) => e + 1),
			toggleTalkback: startTalkback,
			talkbackState,
			micLevel,
			phase,
			statusMessage
		});
	}, [
		camera.id,
		captureFrame,
		isSelected,
		micLevel,
		onRegisterActions,
		phase,
		startTalkback,
		statusMessage,
		talkbackState
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl overflow-hidden flex flex-col ${isLight ? `bg-white border ${isSelected ? "border-emerald-500" : "border-slate-200"}` : `bg-slate-900/90 border ${isSelected ? "border-emerald-500/70" : "border-slate-800"}`} transition-colors`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `px-3 py-2 flex items-center justify-between gap-2 border-b ${isLight ? "border-slate-200 bg-slate-50/70" : "border-slate-800 bg-slate-950/60"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onSelectSpotlight,
					className: "text-left min-w-0 flex-1 group",
					title: "Focus this camera in Spotlight control deck",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-xs font-semibold truncate ${isLight ? "text-slate-900" : "text-slate-100"}`,
							children: camera.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `px-1.5 py-0.5 text-[10px] font-mono font-semibold border rounded shrink-0 ${phaseBadgeStyles(phase, isLight)}`,
							children: phaseLabel(phase)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] font-mono text-slate-500 truncate tabular-nums mt-0.5",
						children: [
							camera.brand,
							" · Ch ",
							camera.channel,
							" · ",
							effectiveMode
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 shrink-0",
					children: [
						(effectiveMode === "WHEP_DIRECT" || effectiveMode === "SERVER_PROXY") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setLocalMuted((m) => !m),
							className: `p-1.5 rounded-lg border text-xs transition-colors ${isLight ? "border-slate-200 hover:bg-slate-100 text-slate-700" : "border-slate-800 hover:bg-slate-800 text-slate-300"}`,
							title: effectiveMuted ? "Unmute camera audio" : "Mute camera audio",
							children: effectiveMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5 text-emerald-400" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setManualEpoch((e) => e + 1),
							className: `p-1.5 rounded-lg border text-xs transition-colors ${isLight ? "border-slate-200 hover:bg-slate-100 text-slate-700" : "border-slate-800 hover:bg-slate-800 text-slate-300"}`,
							title: "Reconnect stream",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `w-3.5 h-3.5 ${phase === "SIGNALING" || phase === "RECONNECTING" ? "animate-spin" : ""}` })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onOpenConfig,
							className: `p-1.5 rounded-lg border text-xs transition-colors ${isLight ? "border-slate-200 hover:bg-slate-100 text-slate-700" : "border-slate-800 hover:bg-slate-800 text-slate-300"}`,
							title: "Camera connection, ICE & stream settings",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "w-3.5 h-3.5" })
						}),
						!isSpotlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onSelectSpotlight,
							className: `p-1.5 rounded-lg border text-xs transition-colors ${isLight ? "border-slate-200 hover:bg-slate-100 text-slate-700" : "border-slate-800 hover:bg-slate-800 text-slate-300"}`,
							title: "Open 1x1 Spotlight & PTZ Controls",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "w-3.5 h-3.5" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden",
				children: [
					(effectiveMode === "WHEP_DIRECT" || effectiveMode === "SERVER_PROXY") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: videoRef,
						autoPlay: true,
						playsInline: true,
						muted: effectiveMuted,
						className: `w-full h-full object-contain bg-black ${phase === "LIVE" || phase === "ICE_CHECKING" ? "block" : "hidden"}`
					}),
					effectiveMode === "LAN_ISAPI_POLL" && fallbackImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						ref: imgRef,
						src: fallbackImage,
						alt: `${camera.name} LAN ISAPI live frame`,
						className: "w-full h-full object-contain bg-black"
					}),
					(effectiveMode === "WHEP_DIRECT" || effectiveMode === "SERVER_PROXY") && phase !== "LIVE" || effectiveMode === "LAN_ISAPI_POLL" && !fallbackImage || effectiveMode === "HIK_CONNECT_P2P" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 text-center max-w-sm space-y-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-10 h-10 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center mx-auto text-slate-400",
								children: effectiveMode === "HIK_CONNECT_P2P" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-5 h-5 text-cyan-400" }) : phase === "FAILED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-5 h-5 text-red-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-5 h-5 text-amber-400" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-slate-200",
								children: camera.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-slate-400 leading-relaxed",
								children: statusMessage
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-center gap-2 pt-1",
								children: [
									effectiveMode === "HIK_CONNECT_P2P" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "hikconnect://",
										onClick: () => addToast("Launching Hik-Connect app for P2P cellular stream.", "info"),
										className: "px-3 py-1.5 text-[11px] font-medium rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white inline-flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Hik-Connect" })]
									}),
									phase === "FAILED" && effectiveMode === "WHEP_DIRECT" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											updateCamera(camera.id, { signalingMode: "SERVER_PROXY" });
											addToast("Switched signaling path to SafetyLink Server Proxy.", "info");
										},
										className: "px-3 py-1.5 text-[11px] font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700",
										children: "Try Server Proxy"
									}),
									phase === "FAILED" && camera.host && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											updateCamera(camera.id, { signalingMode: "LAN_ISAPI_POLL" });
											addToast("Switched to LAN ISAPI live frame polling.", "info");
										},
										className: "px-3 py-1.5 text-[11px] font-medium rounded-lg bg-amber-600 hover:bg-amber-500 text-white",
										children: "Fallback to LAN Frames"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: onOpenConfig,
										className: "px-3 py-1.5 text-[11px] font-medium rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300",
										children: "Configure Stream"
									})
								]
							})
						]
					}) : null,
					talkbackState === "ACTIVE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-red-600/95 text-white text-[10px] font-mono font-bold flex items-center gap-1.5 border border-red-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TALKBACK LIVE" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono tabular-nums border-t ${isLight ? "border-slate-200 bg-slate-50 text-slate-600" : "border-slate-800 bg-slate-950/80 text-slate-400"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stats.codec || (effectiveMode === "LAN_ISAPI_POLL" ? "MJPEG/JPEG" : "WEBRTC") }),
						stats.resolution && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stats.resolution }),
						stats.fps !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [stats.fps, " fps"] }),
						stats.bitrateKbps !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [stats.bitrateKbps, " kbps"] }),
						stats.rttMs !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"RTT ",
							stats.rttMs,
							"ms"
						] }),
						stats.candidateType && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["ICE:", stats.candidateType] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: captureFrame,
						className: `px-2 py-0.5 rounded border text-[10px] font-medium transition-colors inline-flex items-center gap-1 ${isLight ? "border-slate-300 hover:bg-slate-200 text-slate-700" : "border-slate-700 hover:bg-slate-800 text-slate-300"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Snap" })]
					})
				})]
			})
		]
	});
};
var LiveCameraFeed = ({ scope = "USER" }) => {
	const { cameras, cameraEvidenceSnapshots, currentOrg, currentUser, globalTheme, addCamera, updateCamera, removeCamera, getCameraLocalCredentials, setCameraLocalCredentials, removeCameraEvidenceSnapshot, sendCameraPtz, triggerSingleCameraSoftIo, addToast } = useAppStore();
	const isLight = globalTheme === "light";
	const activeOrgId = scope === "ORG" ? currentOrg?.id || currentUser?.orgCode || "ORG" : currentUser?.orgCode || currentOrg?.id || "INDIVIDUAL";
	const scopedCameras = (0, import_react.useMemo)(() => {
		if (scope === "ORG" && currentOrg?.id) return cameras.filter((c) => c.orgId === currentOrg.id);
		return cameras;
	}, [
		cameras,
		scope,
		currentOrg?.id
	]);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [filterMode, setFilterMode] = (0, import_react.useState)("ALL");
	const [layoutMode, setLayoutMode] = (0, import_react.useState)("1x1");
	const [quadPage, setQuadPage] = (0, import_react.useState)(0);
	const [selectedCameraId, setSelectedCameraId] = (0, import_react.useState)(null);
	const [globalMuted, setGlobalMuted] = (0, import_react.useState)(true);
	const [reconnectEpoch, setReconnectEpoch] = (0, import_react.useState)(0);
	const [showOnboarding, setShowOnboarding] = (0, import_react.useState)(false);
	const [editingCameraId, setEditingCameraId] = (0, import_react.useState)(null);
	const [ptzSpeed, setPtzSpeed] = (0, import_react.useState)(55);
	const [ptzFeedback, setPtzFeedback] = (0, import_react.useState)("");
	const [softIoResult, setSoftIoResult] = (0, import_react.useState)("");
	const [softIoBusy, setSoftIoBusy] = (0, import_react.useState)(false);
	const [editingPresets, setEditingPresets] = (0, import_react.useState)(false);
	const [spotlightReg, setSpotlightReg] = (0, import_react.useState)(null);
	const [qName, setQName] = (0, import_react.useState)("");
	const [qBrand, setQBrand] = (0, import_react.useState)("HIKVISION");
	const [qSignaling, setQSignaling] = (0, import_react.useState)("WHEP_DIRECT");
	const [qWhepUrl, setQWhepUrl] = (0, import_react.useState)("");
	const [qHost, setQHost] = (0, import_react.useState)("192.168.1.64");
	const [qHttpPort, setQHttpPort] = (0, import_react.useState)(80);
	const [qChannel, setQChannel] = (0, import_react.useState)(102);
	const [qSerial, setQSerial] = (0, import_react.useState)("");
	const [qUsername, setQUsername] = (0, import_react.useState)("admin");
	const [qPassword, setQPassword] = (0, import_react.useState)("");
	const [qBearer, setQBearer] = (0, import_react.useState)("");
	const [qStun, setQStun] = (0, import_react.useState)("stun:stun.l.google.com:19302");
	const [qTurnUrl, setQTurnUrl] = (0, import_react.useState)("");
	const [qTurnUser, setQTurnUser] = (0, import_react.useState)("");
	const [qTurnCred, setQTurnCred] = (0, import_react.useState)("");
	const [qPtzEnabled, setQPtzEnabled] = (0, import_react.useState)(true);
	const [qTwoWayAudio, setQTwoWayAudio] = (0, import_react.useState)(true);
	const [qSoftIoId, setQSoftIoId] = (0, import_react.useState)(1);
	const filteredCameras = (0, import_react.useMemo)(() => {
		const q = searchQuery.trim().toLowerCase();
		return scopedCameras.filter((cam) => {
			const mode = getEffectiveSignalingMode(cam);
			const matchesFilter = filterMode === "ALL" ? true : filterMode === "ONLINE" ? cam.status === "ONLINE" : mode === filterMode;
			const matchesQuery = !q || cam.name.toLowerCase().includes(q) || (cam.serialNumber || "").toLowerCase().includes(q) || (cam.host || "").toLowerCase().includes(q);
			return matchesFilter && matchesQuery;
		});
	}, [
		scopedCameras,
		filterMode,
		searchQuery
	]);
	const activeSpotlightCamera = (0, import_react.useMemo)(() => {
		return filteredCameras.find((c) => c.id === selectedCameraId) || filteredCameras[0] || null;
	}, [filteredCameras, selectedCameraId]);
	const totalQuadPages = Math.max(1, Math.ceil(filteredCameras.length / 4));
	const safeQuadPage = Math.min(quadPage, totalQuadPages - 1);
	const visibleQuadCameras = (0, import_react.useMemo)(() => {
		const start = safeQuadPage * 4;
		return filteredCameras.slice(start, start + 4);
	}, [filteredCameras, safeQuadPage]);
	const handleRegisterActions = (0, import_react.useCallback)((camId, reg) => {
		if (!activeSpotlightCamera || activeSpotlightCamera.id === camId) setSpotlightReg(reg);
	}, [activeSpotlightCamera]);
	const activePtzInFlightRef = (0, import_react.useRef)(null);
	const handlePtzStart = async (cam, pan, tilt, zoom, label) => {
		activePtzInFlightRef.current = cam.id;
		setPtzFeedback(`Sending ${label}...`);
		const scale = ptzSpeed / 100;
		const res = await sendCameraPtz(cam.id, {
			action: "CONTINUOUS",
			pan: Math.round(pan * scale),
			tilt: Math.round(tilt * scale),
			zoom: Math.round(zoom * scale)
		});
		setPtzFeedback(res.diagnostics);
	};
	const handlePtzStop = async (camId) => {
		if (activePtzInFlightRef.current !== camId) return;
		activePtzInFlightRef.current = null;
		const res = await sendCameraPtz(camId, { action: "STOP" });
		setPtzFeedback(res.diagnostics);
	};
	const handlePresetRecall = async (cam, preset) => {
		setPtzFeedback(`Moving to Preset #${preset.presetId} (${preset.label})...`);
		const res = await sendCameraPtz(cam.id, {
			action: "PRESET",
			presetId: preset.presetId
		});
		setPtzFeedback(res.diagnostics);
		addToast(res.diagnostics, res.ok ? "success" : "warn");
	};
	const handleManualSoftIo = async (cam) => {
		setSoftIoBusy(true);
		const res = await triggerSingleCameraSoftIo(cam.id);
		setSoftIoBusy(false);
		setSoftIoResult(res.diagnostics);
		addToast(res.diagnostics, res.triggered ? "success" : "warn");
	};
	const editingCamera = (0, import_react.useMemo)(() => scopedCameras.find((c) => c.id === editingCameraId) || null, [scopedCameras, editingCameraId]);
	(0, import_react.useEffect)(() => {
		if (!editingCamera) return;
		const creds = getCameraLocalCredentials(editingCamera.id);
		setQName(editingCamera.name);
		setQBrand(editingCamera.brand);
		setQSignaling(getEffectiveSignalingMode(editingCamera));
		setQWhepUrl(editingCamera.whepUrl || editingCamera.relayUrl || "");
		setQHost(editingCamera.host || "");
		setQHttpPort(editingCamera.httpPort || 80);
		setQChannel(editingCamera.channel || 102);
		setQSerial(editingCamera.serialNumber || "");
		setQUsername(creds.username || "admin");
		setQPassword(creds.password || "");
		setQBearer(creds.whepBearerToken || "");
		setQStun((editingCamera.stunServers || ["stun:stun.l.google.com:19302"]).join(", "));
		setQTurnUrl((editingCamera.turnUrls || []).join(", "));
		setQTurnUser(creds.turnUsername || "");
		setQTurnCred(creds.turnCredential || "");
		setQPtzEnabled(editingCamera.ptzEnabled ?? true);
		setQTwoWayAudio(editingCamera.twoWayAudioEnabled ?? true);
		setQSoftIoId(editingCamera.softIoTriggerId || 1);
	}, [editingCamera, getCameraLocalCredentials]);
	const handleSaveConfig = (e) => {
		e.preventDefault();
		const stunServers = qStun.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 5);
		const turnUrls = qTurnUrl.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4);
		const mappedDeployMode = qSignaling === "WHEP_DIRECT" || qSignaling === "SERVER_PROXY" ? "WHEP_HLS_RELAY" : qSignaling === "LAN_ISAPI_POLL" ? "LAN_ISAPI" : "HIK_CONNECT_P2P";
		const streamProfile = Number(qChannel) === 101 ? "MAIN_HD" : "SUB_MOBILE";
		if (editingCamera) {
			updateCamera(editingCamera.id, {
				name: qName.trim() || editingCamera.name,
				brand: qBrand,
				mode: mappedDeployMode,
				signalingMode: qSignaling,
				streamProfile,
				whepUrl: qWhepUrl.trim() || void 0,
				relayUrl: qWhepUrl.trim() || void 0,
				host: qHost.trim() || void 0,
				httpPort: Number(qHttpPort) || 80,
				channel: Number(qChannel) || 102,
				serialNumber: qSerial.trim().toUpperCase() || void 0,
				stunServers,
				turnUrls,
				ptzEnabled: qPtzEnabled,
				twoWayAudioEnabled: qTwoWayAudio,
				softIoTriggerId: Number(qSoftIoId) || 1
			});
			setCameraLocalCredentials(editingCamera.id, {
				username: qUsername.trim() || "admin",
				password: qPassword,
				whepBearerToken: qBearer.trim() || void 0,
				turnUsername: qTurnUser.trim() || void 0,
				turnCredential: qTurnCred || void 0
			});
			setEditingCameraId(null);
			setReconnectEpoch((v) => v + 1);
			addToast(`Updated WebRTC & hardware config for ${qName || editingCamera.name}.`, "success");
			return;
		}
		const created = addCamera({
			name: qName.trim() || `${qBrand} Cam ${scopedCameras.length + 1}`,
			brand: qBrand,
			mode: mappedDeployMode,
			signalingMode: qSignaling,
			streamProfile,
			orgId: activeOrgId,
			whepUrl: qWhepUrl.trim() || void 0,
			relayUrl: qWhepUrl.trim() || void 0,
			host: qHost.trim() || void 0,
			httpPort: Number(qHttpPort) || 80,
			rtspPort: 554,
			channel: Number(qChannel) || 102,
			serialNumber: qSerial.trim().toUpperCase() || void 0,
			stunServers,
			turnUrls,
			ptzEnabled: qPtzEnabled,
			twoWayAudioEnabled: qTwoWayAudio,
			softIoTriggerId: Number(qSoftIoId) || 1,
			triggerOnPanic: true,
			username: qUsername.trim() || "admin",
			password: qPassword,
			whepBearerToken: qBearer.trim() || void 0,
			turnUsername: qTurnUser.trim() || void 0,
			turnCredential: qTurnCred || void 0
		});
		setSelectedCameraId(created.id);
		setShowOnboarding(false);
		addToast(`Deployed "${created.name}" (${qSignaling}) to Live Cameras.`, "success");
	};
	const buildTwoWayGo2RtcYaml = (cam) => {
		const label = (cam?.name || qName || "hik_gate").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
		const ip = cam?.host || qHost || "192.168.1.64";
		const ch = cam?.channel || qChannel || 102;
		return [
			"streams:",
			`  ${label}:`,
			`    - rtsp://admin:<PASSWORD>@${ip}:554/Streaming/Channels/${ch}`,
			`    - isapi://admin:<PASSWORD>@${ip}:${cam?.httpPort || qHttpPort || 80}/`,
			"# Point SafetyLink WHEP URL to: https://<YOUR_TUNNEL_HOST>/api/webrtc?src=" + label
		].join("\n");
	};
	const panelClass = isLight ? "bg-white border border-slate-200 text-slate-900" : "bg-slate-900/90 border border-slate-800 text-slate-100";
	const inputClass = isLight ? "w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-emerald-500" : "w-full px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-950 text-slate-100 focus:outline-none focus:border-emerald-500";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 text-left pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `p-4 rounded-xl ${panelClass} space-y-3`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-sm font-bold tracking-tight flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-4 h-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live Hikvision Camera Feed · WebRTC Control Deck" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-slate-500 font-mono tabular-nums mt-0.5",
						children: [
							"Scope: ",
							activeOrgId,
							" · ",
							scopedCameras.length,
							" ",
							scopedCameras.length === 1 ? "camera" : "cameras",
							" ·",
							" ",
							scopedCameras.filter((c) => c.status === "ONLINE").length,
							" verified online"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `inline-flex items-center p-0.5 rounded-lg border ${isLight ? "bg-slate-100 border-slate-200" : "bg-slate-950 border-slate-800"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setLayoutMode("1x1"),
									className: `px-2.5 py-1 text-[11px] font-medium rounded-md flex items-center gap-1 transition-colors ${layoutMode === "1x1" ? isLight ? "bg-white text-slate-900 border border-slate-200" : "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1x1 Spotlight" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setLayoutMode("2x2"),
									className: `px-2.5 py-1 text-[11px] font-medium rounded-md flex items-center gap-1 transition-colors ${layoutMode === "2x2" ? isLight ? "bg-white text-slate-900 border border-slate-200" : "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid2x2, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2x2 Quad" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setGlobalMuted((m) => !m),
								className: `px-3 py-1.5 text-[11px] font-medium rounded-lg border flex items-center gap-1.5 ${isLight ? "border-slate-300 hover:bg-slate-100" : "border-slate-700 hover:bg-slate-800"}`,
								children: [globalMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-3.5 h-3.5 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: globalMuted ? "Audio Muted" : "Audio Enabled" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setReconnectEpoch((e) => e + 1),
								className: `px-3 py-1.5 text-[11px] font-medium rounded-lg border flex items-center gap-1.5 ${isLight ? "border-slate-300 hover:bg-slate-100" : "border-slate-700 hover:bg-slate-800"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reconnect All" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setEditingCameraId(null);
									setShowOnboarding((v) => !v);
								},
								className: "px-3 py-1.5 text-[11px] font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showOnboarding ? "Close Setup" : "Add / Onboard Camera" })]
							})
						]
					})]
				}), scopedCameras.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "search",
						value: searchQuery,
						onChange: (e) => {
							setSearchQuery(e.target.value);
							setQuadPage(0);
						},
						placeholder: "Search cameras by label, serial, or IP...",
						className: `flex-1 min-w-[200px] ${inputClass}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center gap-1",
						children: [
							{
								id: "ALL",
								label: "All"
							},
							{
								id: "WHEP_DIRECT",
								label: "WHEP Direct"
							},
							{
								id: "SERVER_PROXY",
								label: "Server Proxy"
							},
							{
								id: "LAN_ISAPI_POLL",
								label: "LAN ISAPI"
							},
							{
								id: "HIK_CONNECT_P2P",
								label: "Hik-Connect"
							},
							{
								id: "ONLINE",
								label: "Online Only"
							}
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setFilterMode(f.id);
								setQuadPage(0);
							},
							className: `px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-colors ${filterMode === f.id ? "border-emerald-500 bg-emerald-500/15 text-emerald-500" : isLight ? "border-slate-200 text-slate-600 hover:bg-slate-100" : "border-slate-800 text-slate-400 hover:bg-slate-800"}`,
							children: f.label
						}, f.id))
					})]
				})]
			}),
			(showOnboarding || editingCamera) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `p-4 rounded-xl ${panelClass} space-y-4`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-bold uppercase tracking-wider font-mono",
							children: editingCamera ? `Configure Stream & Credentials · ${editingCamera.name}` : "All-Method Camera & WebRTC Deployment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-slate-500 mt-0.5",
							children: "Switch seamlessly between WHEP Direct, Signed Server Proxy, LAN ISAPI Polling, or Hik-Connect P2P. Secrets stay local on this device."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setShowOnboarding(false);
								setEditingCameraId(null);
							},
							className: "p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveConfig,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2",
								children: [
									{
										id: "WHEP_DIRECT",
										label: "Direct WHEP (WebRTC)",
										sub: "go2rtc / MediaMTX HTTPS"
									},
									{
										id: "SERVER_PROXY",
										label: "Server Signaling Proxy",
										sub: "CORS-safe + Auth header injection"
									},
									{
										id: "LAN_ISAPI_POLL",
										label: "LAN ISAPI Live Frames",
										sub: "HTTP Digest/Basic + PTZ/Soft-IO"
									},
									{
										id: "HIK_CONNECT_P2P",
										label: "Hik-Connect P2P",
										sub: "QR / Serial mobile handoff"
									}
								].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setQSignaling(opt.id),
									className: `p-2.5 rounded-lg border text-left transition-colors ${qSignaling === opt.id ? "border-emerald-500 bg-emerald-500/10" : isLight ? "border-slate-200 hover:border-slate-300" : "border-slate-800 hover:border-slate-700"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold",
										children: opt.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-500 mt-0.5",
										children: opt.sub
									})]
								}, opt.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] text-slate-500 mb-1",
										children: "Camera Label"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: qName,
										onChange: (e) => setQName(e.target.value),
										placeholder: "Main Gate PTZ",
										className: inputClass
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] text-slate-500 mb-1",
										children: "Hardware Brand"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: qBrand,
										onChange: (e) => setQBrand(e.target.value),
										className: inputClass,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "HIKVISION",
												children: "Hikvision (DS-Series / NVR)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "HILOOK",
												children: "HiLook by Hikvision"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ONVIF_GENERIC",
												children: "ONVIF Profile S/G"
											})
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] text-slate-500 mb-1",
										children: "ISAPI Channel (101=HD, 102=Sub)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 1,
										max: 1024,
										value: qChannel,
										onChange: (e) => setQChannel(Number(e.target.value)),
										className: `${inputClass} font-mono tabular-nums`
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] text-slate-500 mb-1",
									children: "WebRTC WHEP / go2rtc Signaling URL (HTTPS)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "url",
									value: qWhepUrl,
									onChange: (e) => setQWhepUrl(e.target.value),
									placeholder: "https://cctv.yourdomain.online/api/webrtc?src=gate",
									className: `${inputClass} font-mono`
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] text-slate-500 mb-1",
									children: "WHEP Bearer Token (Optional · Local Only)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: qBearer,
									onChange: (e) => setQBearer(e.target.value),
									placeholder: "Optional gateway token",
									className: `${inputClass} font-mono`
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-4 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] text-slate-500 mb-1",
										children: "Camera IP / Host (PTZ & ISAPI)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: qHost,
										onChange: (e) => setQHost(e.target.value),
										placeholder: "192.168.1.64",
										className: `${inputClass} font-mono tabular-nums`
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] text-slate-500 mb-1",
										children: "HTTP ISAPI Port"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: qHttpPort,
										onChange: (e) => setQHttpPort(Number(e.target.value)),
										className: `${inputClass} font-mono tabular-nums`
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] text-slate-500 mb-1",
										children: "Device Username (Local)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: qUsername,
										onChange: (e) => setQUsername(e.target.value),
										className: `${inputClass} font-mono`
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] text-slate-500 mb-1",
										children: "Device Password / Verify Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										value: qPassword,
										onChange: (e) => setQPassword(e.target.value),
										placeholder: "Camera password (local only)",
										className: `${inputClass} font-mono`
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-4 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] text-slate-500 mb-1",
											children: "STUN Servers (comma-separated)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: qStun,
											onChange: (e) => setQStun(e.target.value),
											className: `${inputClass} font-mono`
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] text-slate-500 mb-1",
										children: "TURN Relay URL (Optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: qTurnUrl,
										onChange: (e) => setQTurnUrl(e.target.value),
										placeholder: "turns:turn.yourdomain.com:5349",
										className: `${inputClass} font-mono`
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-[11px] text-slate-500 mb-1",
										children: "Hik-Connect Serial (Optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: qSerial,
										onChange: (e) => setQSerial(e.target.value.toUpperCase()),
										placeholder: "K12345678",
										className: `${inputClass} font-mono uppercase`
									})] })
								]
							}),
							qTurnUrl.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] text-slate-500 mb-1",
									children: "TURN Username (Local Only)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: qTurnUser,
									onChange: (e) => setQTurnUser(e.target.value),
									className: inputClass
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] text-slate-500 mb-1",
									children: "TURN Credential (Local Only)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: qTurnCred,
									onChange: (e) => setQTurnCred(e.target.value),
									className: inputClass
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: qPtzEnabled,
												onChange: (e) => setQPtzEnabled(e.target.checked)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Enable PTZ & Presets" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: qTwoWayAudio,
												onChange: (e) => setQTwoWayAudio(e.target.checked)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Enable Two-Way WebRTC Talkback" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-500",
												children: "Soft-IO ID:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: 1,
												max: 64,
												value: qSoftIoId,
												onChange: (e) => setQSoftIoId(Number(e.target.value)),
												className: `w-16 px-2 py-1 text-xs font-mono tabular-nums rounded border ${isLight ? "border-slate-300 bg-white" : "border-slate-700 bg-slate-950"}`
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											navigator.clipboard?.writeText(buildTwoWayGo2RtcYaml(editingCamera)).catch(() => {});
											addToast("Copied two-way-audio go2rtc.yaml template.", "success");
										},
										className: `px-3 py-1.5 text-xs rounded-lg border flex items-center gap-1.5 ${isLight ? "border-slate-300 hover:bg-slate-100" : "border-slate-700 hover:bg-slate-800"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copy go2rtc Two-Way Config" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white",
										children: editingCamera ? "Save & Reconnect" : "Save & Launch Feed"
									})]
								})]
							})
						]
					}),
					!editingCamera && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-3 border-t border-slate-200 dark:border-slate-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2",
							children: "Or use Native QR Sticker Scanner & Field Playbook"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HikvisionCameraManager, {
							scope,
							compact: true
						})]
					})
				]
			}),
			filteredCameras.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `p-8 rounded-xl text-center space-y-3 ${panelClass}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "w-6 h-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-bold",
						children: scopedCameras.length === 0 ? "No Hikvision Cameras Connected Yet" : "No Cameras Match Current Filter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-500 max-w-md mx-auto leading-relaxed",
						children: "Connect any Hikvision, HiLook, or ONVIF camera using a WebRTC WHEP gateway (go2rtc / MediaMTX), SafetyLink Server Proxy, Direct Site Wi-Fi ISAPI, or Hik-Connect QR Serial."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center justify-center gap-2 pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowOnboarding(true),
							className: "px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white",
							children: "Deploy & Stream First Camera"
						})
					})
				]
			}) : layoutMode === "2x2" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-3",
					children: visibleQuadCameras.map((cam) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraStreamTile, {
						camera: cam,
						isSpotlight: false,
						isSelected: activeSpotlightCamera?.id === cam.id,
						globalMuted,
						isLight,
						reconnectEpoch,
						onSelectSpotlight: () => {
							setSelectedCameraId(cam.id);
							setLayoutMode("1x1");
						},
						onOpenConfig: () => setEditingCameraId(cam.id)
					}, cam.id))
				}), totalQuadPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `px-4 py-2.5 rounded-xl flex items-center justify-between text-xs ${panelClass}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono tabular-nums text-slate-500",
						children: [
							"Quad Page ",
							safeQuadPage + 1,
							" / ",
							totalQuadPages,
							" (",
							filteredCameras.length,
							" cameras)"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: safeQuadPage === 0,
							onClick: () => setQuadPage((p) => Math.max(0, p - 1)),
							className: "px-3 py-1 rounded border border-slate-300 dark:border-slate-700 disabled:opacity-40",
							children: "Prev"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: safeQuadPage >= totalQuadPages - 1,
							onClick: () => setQuadPage((p) => Math.min(totalQuadPages - 1, p + 1)),
							className: "px-3 py-1 rounded border border-slate-300 dark:border-slate-700 disabled:opacity-40",
							children: "Next"
						})]
					})]
				})]
			}) : activeSpotlightCamera && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-4 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-8 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraStreamTile, {
							camera: activeSpotlightCamera,
							isSpotlight: true,
							isSelected: true,
							globalMuted,
							isLight,
							reconnectEpoch,
							onSelectSpotlight: () => {},
							onOpenConfig: () => setEditingCameraId(activeSpotlightCamera.id),
							onRegisterActions: handleRegisterActions
						}, activeSpotlightCamera.id),
						filteredCameras.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `p-2.5 rounded-xl ${panelClass} flex items-center gap-2 overflow-x-auto`,
							children: filteredCameras.map((c) => {
								const active = c.id === activeSpotlightCamera.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setSelectedCameraId(c.id),
									className: `px-3 py-1.5 rounded-lg border text-left shrink-0 transition-colors ${active ? "border-emerald-500 bg-emerald-500/15 text-emerald-500" : isLight ? "border-slate-200 hover:bg-slate-100 text-slate-700" : "border-slate-800 hover:bg-slate-800 text-slate-300"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-semibold",
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[9px] font-mono text-slate-500 tabular-nums",
										children: [
											"Ch ",
											c.channel,
											" · ",
											getEffectiveSignalingMode(c)
										]
									})]
								}, c.id);
							})
						}),
						cameraEvidenceSnapshots.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `p-3.5 rounded-xl ${panelClass} space-y-2.5`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-xs font-bold uppercase tracking-wider font-mono",
									children: [
										"Captured Evidence Snapshots (",
										cameraEvidenceSnapshots.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-mono text-slate-500",
									children: "Stored locally on device"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5",
								children: cameraEvidenceSnapshots.slice(0, 8).map((snap) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `rounded-lg border overflow-hidden ${isLight ? "border-slate-200 bg-slate-50" : "border-slate-800 bg-slate-950"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: snap.dataUrl,
										alt: snap.cameraName,
										className: "w-full aspect-video object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-1.5 flex items-center justify-between gap-1 text-[10px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold truncate",
												children: snap.cameraName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-slate-500 tabular-nums",
												children: new Date(snap.capturedAt).toLocaleTimeString()
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: snap.dataUrl,
												download: `evidence-${snap.id}.jpg`,
												className: "p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800",
												title: "Download JPEG",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3 h-3" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => removeCameraEvidenceSnapshot(snap.id),
												className: "p-1 rounded text-red-500 hover:bg-red-500/10",
												title: "Delete snapshot",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3 h-3" })
											})]
										})]
									})]
								}, snap.id))
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `p-3.5 rounded-xl ${panelClass} space-y-3`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold uppercase tracking-wider font-mono",
										children: "Operator Response"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-mono text-slate-500 tabular-nums",
										children: ["Soft-IO #", activeSpotlightCamera.softIoTriggerId]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											disabled: activeSpotlightCamera.twoWayAudioEnabled === false,
											onPointerDown: () => spotlightReg?.toggleTalkback(true),
											onPointerUp: () => spotlightReg?.toggleTalkback(false),
											onPointerCancel: () => spotlightReg?.toggleTalkback(false),
											onPointerLeave: () => {
												if (spotlightReg?.talkbackState === "ACTIVE") spotlightReg.toggleTalkback(false);
											},
											className: `py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors select-none disabled:opacity-40 ${spotlightReg?.talkbackState === "ACTIVE" ? "bg-red-600 text-white border-red-500" : isLight ? "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800" : "bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-100"}`,
											children: [spotlightReg?.talkbackState === "ACTIVE" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hold to Talk" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											disabled: activeSpotlightCamera.twoWayAudioEnabled === false,
											onClick: () => spotlightReg?.toggleTalkback(),
											className: `py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors disabled:opacity-40 ${spotlightReg?.talkbackState === "ACTIVE" ? "bg-red-500/15 text-red-500 border-red-500/40" : isLight ? "bg-white hover:bg-slate-50 border-slate-300 text-slate-700" : "bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: spotlightReg?.talkbackState === "ACTIVE" ? "Mute Mic" : "Mic Lock" })]
										})]
									}), spotlightReg?.talkbackState === "ACTIVE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-[10px] font-mono text-red-400 tabular-nums",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "MICROPHONE TRANSMITTING" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [spotlightReg.micLevel, "%"] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1.5 rounded-full bg-slate-800 overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full bg-red-500 transition-all duration-75",
												style: { width: `${spotlightReg.micLevel}%` }
											})
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => spotlightReg?.captureFrame(),
										className: `py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 ${isLight ? "border-slate-300 hover:bg-slate-100 text-slate-800" : "border-slate-700 hover:bg-slate-800 text-slate-200"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Capture Frame" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										disabled: softIoBusy,
										onClick: () => handleManualSoftIo(activeSpotlightCamera),
										className: "py-2 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: softIoBusy ? "Firing..." : `SOS Soft-IO #${activeSpotlightCamera.softIoTriggerId}` })]
									})]
								}),
								softIoResult && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-mono text-amber-500 leading-snug",
									children: softIoResult
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `p-3.5 rounded-xl ${panelClass} space-y-3`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase tracking-wider font-mono",
									children: "PTZ & Presets"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-[10px] font-mono tabular-nums",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-slate-500",
										children: [
											"Speed ",
											ptzSpeed,
											"%"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 20,
										max: 100,
										value: ptzSpeed,
										onChange: (e) => setPtzSpeed(Number(e.target.value)),
										className: "w-16 accent-emerald-500"
									})]
								})]
							}), activeSpotlightCamera.ptzEnabled === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-slate-500",
								children: "PTZ is disabled on this camera profile. Enable it in Connection Settings if supported."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-3 gap-1.5 flex-1 max-w-[180px] mx-auto",
										children: [
											{
												icon: MoveUpLeft,
												pan: -80,
												tilt: 80,
												label: "Up-Left"
											},
											{
												icon: MoveUp,
												pan: 0,
												tilt: 80,
												label: "Tilt Up"
											},
											{
												icon: MoveUpRight,
												pan: 80,
												tilt: 80,
												label: "Up-Right"
											},
											{
												icon: MoveLeft,
												pan: -80,
												tilt: 0,
												label: "Pan Left"
											},
											{
												icon: Square,
												pan: 0,
												tilt: 0,
												label: "STOP",
												isStop: true
											},
											{
												icon: MoveRight,
												pan: 80,
												tilt: 0,
												label: "Pan Right"
											},
											{
												icon: MoveDownLeft,
												pan: -80,
												tilt: -80,
												label: "Down-Left"
											},
											{
												icon: MoveDown,
												pan: 0,
												tilt: -80,
												label: "Tilt Down"
											},
											{
												icon: MoveDownRight,
												pan: 80,
												tilt: -80,
												label: "Down-Right"
											}
										].map((btn) => {
											const Icon = btn.icon;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												title: btn.label,
												onPointerDown: () => {
													if (btn.isStop) sendCameraPtz(activeSpotlightCamera.id, { action: "STOP" });
													else handlePtzStart(activeSpotlightCamera, btn.pan, btn.tilt, 0, btn.label);
												},
												onPointerUp: () => !btn.isStop && handlePtzStop(activeSpotlightCamera.id),
												onPointerCancel: () => !btn.isStop && handlePtzStop(activeSpotlightCamera.id),
												onPointerLeave: () => !btn.isStop && handlePtzStop(activeSpotlightCamera.id),
												onBlur: () => !btn.isStop && handlePtzStop(activeSpotlightCamera.id),
												className: `h-10 rounded-lg border flex items-center justify-center transition-colors select-none ${btn.isStop ? "border-red-500/40 bg-red-500/10 text-red-500 hover:bg-red-500/20" : isLight ? "border-slate-300 bg-slate-50 hover:bg-slate-200 active:bg-emerald-500 active:text-white" : "border-slate-700 bg-slate-950 hover:bg-slate-800 active:bg-emerald-600 active:text-white"}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" })
											}, btn.label);
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2 w-20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onPointerDown: () => handlePtzStart(activeSpotlightCamera, 0, 0, 80, "Zoom In"),
											onPointerUp: () => handlePtzStop(activeSpotlightCamera.id),
											onPointerCancel: () => handlePtzStop(activeSpotlightCamera.id),
											onPointerLeave: () => handlePtzStop(activeSpotlightCamera.id),
											className: `py-3 rounded-lg border text-[11px] font-medium flex flex-col items-center justify-center gap-1 select-none ${isLight ? "border-slate-300 bg-slate-50 hover:bg-slate-200 active:bg-emerald-500 active:text-white" : "border-slate-700 bg-slate-950 hover:bg-slate-800 active:bg-emerald-600 active:text-white"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Zoom +" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onPointerDown: () => handlePtzStart(activeSpotlightCamera, 0, 0, -80, "Zoom Out"),
											onPointerUp: () => handlePtzStop(activeSpotlightCamera.id),
											onPointerCancel: () => handlePtzStop(activeSpotlightCamera.id),
											onPointerLeave: () => handlePtzStop(activeSpotlightCamera.id),
											className: `py-3 rounded-lg border text-[11px] font-medium flex flex-col items-center justify-center gap-1 select-none ${isLight ? "border-slate-300 bg-slate-50 hover:bg-slate-200 active:bg-emerald-500 active:text-white" : "border-slate-700 bg-slate-950 hover:bg-slate-800 active:bg-emerald-600 active:text-white"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Zoom -" })]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-slate-500",
											children: "Presets Recall"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setEditingPresets((v) => !v),
											className: "text-emerald-500 hover:underline font-medium",
											children: editingPresets ? "Done" : "Edit Labels"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-1.5",
										children: (activeSpotlightCamera.ptzPresets && activeSpotlightCamera.ptzPresets.length > 0 ? activeSpotlightCamera.ptzPresets : [
											{
												presetId: 1,
												label: "Gate Entry"
											},
											{
												presetId: 2,
												label: "Perimeter"
											},
											{
												presetId: 3,
												label: "Loading Bay"
											},
											{
												presetId: 4,
												label: "Street View"
											}
										]).map((preset, idx, arr) => editingPresets ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											maxLength: 40,
											value: preset.label,
											onChange: (e) => {
												const next = arr.map((item, i) => i === idx ? {
													...item,
													label: e.target.value
												} : item);
												updateCamera(activeSpotlightCamera.id, { ptzPresets: next });
											},
											className: inputClass
										}, preset.presetId) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handlePresetRecall(activeSpotlightCamera, preset),
											className: `px-2.5 py-1.5 rounded-lg border text-left text-[11px] flex items-center justify-between gap-1 transition-colors ${isLight ? "border-slate-200 hover:bg-slate-100 text-slate-800" : "border-slate-800 hover:bg-slate-800 text-slate-200"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: preset.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-[10px] text-slate-500 tabular-nums shrink-0",
												children: ["#", preset.presetId]
											})]
										}, preset.presetId))
									})]
								}),
								ptzFeedback && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-mono text-slate-400 leading-snug",
									children: ptzFeedback
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `p-3.5 rounded-xl ${panelClass} space-y-2.5 text-[11px]`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold uppercase tracking-wider font-mono text-xs",
										children: "Connection Path"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 font-mono text-emerald-500",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getEffectiveSignalingMode(activeSpotlightCamera) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-slate-500 break-all",
									children: activeSpotlightCamera.whepUrl || (activeSpotlightCamera.host ? `${activeSpotlightCamera.host}:${activeSpotlightCamera.httpPort || 80} (Ch ${activeSpotlightCamera.channel})` : activeSpotlightCamera.serialNumber || "Unconfigured")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setEditingCameraId(activeSpotlightCamera.id),
										className: `flex-1 py-1.5 px-3 rounded-lg border font-medium flex items-center justify-center gap-1.5 ${isLight ? "border-slate-300 hover:bg-slate-100" : "border-slate-700 hover:bg-slate-800"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Edit Stream & ICE" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											removeCamera(activeSpotlightCamera.id);
											setSelectedCameraId(null);
										},
										className: "py-1.5 px-2.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10",
										title: "Remove camera",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
									})]
								})
							]
						})
					]
				})]
			})
		]
	});
};
//#endregion
export { LiveCameraFeed };
