export class Box {
	protected value:Map<string, any> = new Map();
	set(key: string, value:any){
		this.value.set(key,value);
	}
	get(key: string){
		return this.value.get(key) ?? null;
	}
	allKeys(){
		return Array.from(this.value.keys());
	}
	allValues(){
		return Array.from(this.value.values())
	}
	entries(){
		return this.value.entries();
	}
}