import { Extra } from '../types/common';
import { Option } from '../types/option';
import { requestMethod, requestOption } from '../types/request';

export function isOption(maybeOption: unknown): boolean{
	return maybeOption instanceof OptionFactory;
}
export function toOption<T>(obj: T): Option<T>{
	return new OptionFactory<T>(obj);
}
export function toRequestOption<T>(
	obj: URL | string | [string,requestMethod,Record<string,any>]
): requestOption | null{
	let option:requestOption | null = null;
	if (obj instanceof Array){
		const [url, method, payload] = obj;
		let urlObject = new URL(url);
		option = toOption({
			url: urlObject,
			method,
			payload
		});
	}
	if (obj instanceof URL){
		option = toOption({
			url:obj,
			method: 'GET',
			payload: {},
        });
	}
    if (typeof obj === 'string'){
		let urlObject = new URL(obj);
		option = toOption({
			url: urlObject,
			method: 'GET',
			payload: {},
		});
	}
	return option;
}
class OptionFactory<T>{
	public _isOption = true;
	public value: T;
	constructor(value: T){
		this.value = value;
	}
}