import { DOMParser } from "xmldom";
import { select, SelectedValue } from "xpath";
import { get } from 'lodash';
export class Response {
	private value?: string;
	private xpathDoc?: SelectedValue[];
	load(data: string){
		this.value = data;
	};
	xpath(selector: string){
		if (this.value){
			let doc = new DOMParser({
				errorHandler: {
					warning: ()=>{}
				}
			}).parseFromString(this.value);
			this.xpathDoc = select(selector, doc)
		}
		return this;
	}
	extract(){
		if (this.xpathDoc){
			return this.xpathDoc.map((v: any) => {
				return v.nodeValue ?? v.value ?? v.toString();
			})
		}
		return null;
	};
	json(selector: string): any | any[]{
		let jsonObj = JSON.parse(this.value || '{}');
		let res = get(jsonObj, selector);
		if (res.length instanceof Array){
			return res;
		} else {
			return [res];
		}
	}
	getRaw(){
		return this.value;
	}
}