import { isOption, toOption, toRequestOption } from "../option";
import type { Extra } from "../types/common";
import type { Option } from "../types/option";
import type { requestMethod, requestOption } from "../types/request";

export async function request(option: requestOption | URL | string | [string,requestMethod,Record<string,any>]){
	let requestOption:requestOption | null;
	if (!isOption(option)){
		requestOption = toRequestOption(option as URL | string | [string, requestMethod, Record<string,any>]);
	} else {
		requestOption = option as requestOption;
	}
	if (requestOption === null){
		throw TypeError('option is non conformance.');
	}
	let body;
	if (requestOption.value.method === 'POST'){
		body=JSON.stringify(requestOption.value.payload);
	} else {
		for (const key in requestOption.value.payload) {
			const element = requestOption.value.payload[key];
			requestOption.value.url.searchParams.set(key, element);
		}
	}
	return await fetch(requestOption.value.url, {
		method: requestOption?.value.method,
		body: requestOption?.value.method !== 'GET' && requestOption.value.method !== 'HEAD' ? body : undefined,
		cache: requestOption.value.cache,
		credentials: requestOption.value.credentials,
		headers: requestOption.value.headers || {},
	})
}