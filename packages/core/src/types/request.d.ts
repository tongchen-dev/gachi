import { Option } from "./option";
export type requestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD' | 'OPTION';
export type ReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
export type RemotePlaybackState = "connected" | "connecting" | "disconnected";
export type RequestCache = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
export type RequestCredentials = "include" | "omit" | "same-origin";
export type RequestDestination = "" | "audio" | "audioworklet" | "document" | "embed" | "font" | "frame" | "iframe" | "image" | "manifest" | "object" | "paintworklet" | "report" | "script" | "sharedworker" | "style" | "track" | "video" | "worker" | "xslt";
export type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";
export type RequestRedirect = "error" | "follow" | "manual";

export type requestOption = Option<{
	url: URL;
	method: requestMethod;
	payload: Record<string,any>;
	headers?: Record<string,string>;
	mode?: RequestMode;
	cache?: RequestCache;
	credentials?: RequestCredentials;
	redirect?: RequestRedirect;
	referrerPolicy?: ReferrerPolicy;
}>