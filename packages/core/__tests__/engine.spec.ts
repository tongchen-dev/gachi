import { join, resolve } from 'path';
import { mkdirSync, writeFileSync } from "fs";
import { urls } from "../src/types/spider";
import { flowParam } from "../src/types/flow";
import { runParma } from "../src/types/engine";
import { Engine, Config, Spider, Box, Flow} from "../src";
mkdirSync(resolve(__dirname, 'data'));
class SaveFlow implements Flow {
	run({ box, spider, config }: flowParam<Box | null>): Box | null {
		const basePath = box?.get('basePath');
		const ext = box?.get('ext');
		const data = box?.get('data') as string[];
		for (const item of data){
			let d = item.replace(/\//gm, '-');
			writeFileSync(`${join(basePath)}\\${d}.${ext}`, '', {
				flag: 'w+'
			});
		}
		return null;
	}
}
class spider implements Spider{
	urls: urls[] = ["https://www.runoob.com/"];
	box: Box;
	constructor(){
		this.box = new Box();
		this.box.set('basePath', resolve(__dirname, './data'));
		this.box.set('ext', 'txt');
	}
	async open(): Promise<void> {
		console.log('is open');
	}
	run({ res, config }: runParma): void | Box {
		const titles = res.xpath(`/html/body/div[contains(@class,"main")]/div[1]/div[2]/div[contains(@class, 'codelist-desktop')]/a/h4/text()`).extract();
		this.box.set('data', titles);
		return this.box;
	}
	async close(): Promise<void> {
		console.log('is close')
	}

}
const conf:Config = {
	program:{
		spider,
		flow: [SaveFlow]
	}
}

describe('engine', ()=>{
	let instance: Engine;
	it('init', ()=>{
		instance = new Engine(conf);
	})
	it('run', async ()=>{
		await instance.run();
	})
})