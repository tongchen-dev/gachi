import { resolve } from "path";
import { Box } from "..";

export class SaveBox extends Box{
	protected value: Map<'path' | 'data' | 'type' | 'ext' | 'fileName', any> = new Map();
	constructor(extName: string='txt'){
		super();
		this.value.set('ext', extName);
	}
	setFileName(name: string){
		this.value.set('fileName', name);
	}
	setFilePath(path: string){
		this.value.set('path', resolve(path));
	}
	setData(content: string){
		this.value.set('data', content);
	}
	setType(type: 'img' | 'text'){
		this.value.set('type', 'text');
	}
}