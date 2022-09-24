import { Response } from "./response";
import { request } from "./utils/request";
import type { Spider } from "./spider";
import type { urls } from "./types/spider";
import type { Config } from "./config";
import type { runParma } from "./types/engine";
import { Flow } from "./flow";
import { Box } from "./box";

export class Engine{
	private config: Config;
	private spider: Spider;
	private urls: urls[] = [];
	private failUrls: urls[] = [];
	private retry: number;
	private successCode: number;
	private response: Response;
	private flow?: (new ()=> Flow)[];
    constructor(config: Config){
		this.config = config;
		this.spider = new this.config.program.spider();
		this.urls=this.spider.urls;
		this.retry = this.config.program.failUrl_retry ?? 1;
		this.successCode = this.config.program.success_code ?? 200;
		this.response = new (this.config.program.response || Response)()
		this.flow = this.config.program.flow;
	}
	public async run(){
		await this.spider.open?.();
		for (let i=0; i<this.urls.length;i++){
			const url = this.urls[i];
			const isFail = await this.sendRequest(url);
			let box = await this.spider.run({res: this.response, config: this.config, isFail}) ?? null;
			this.flow?.forEach((fn) => {
				box = (new fn).run({box, spider: this.spider, config: this.config});
			})
			if (isFail){
				this.failUrls.push(url);
				continue;
			}
		}	
		await this.processFail();
		await this.spider.close?.();
	}
	/**
	 * 
	 * @param url request urls object
	 * @param callback reqeust done will executor callback
	 * @param appendFail if request fail then will appendFail
	 */
	public async request(url: urls, callback: ({res, config}: runParma) => Box | void, appendFail: boolean = true){
		let isFail = await this.sendRequest(url);
		let box = await callback({
			res: this.response,
			config: this.config,
			isFail,
		}) ?? null;
		this.flow?.forEach((fn) => {
			box = (new fn).run({box, spider: this.spider, config: this.config});
		})
		if (isFail && appendFail){
			this.failUrls.push(url);
		}
	}
	private async sendRequest(url: urls){
		let res = await request(url);
		if (res.ok || res.status === this.successCode){
			this.response.load(await res.text())
			return true;
		} else {
			return false;
		}
	}
	private async processFail(){
		for (let i=0;i<this.retry;i++){
			for (let j=0;j<this.failUrls.length;j++){
				const url = this.urls[i];
				let isFail = await this.sendRequest(url);
				let box = await this.spider.run({
					res: this.response,
					config: this.config,
					isFail,
				}) ?? null;
				this.flow?.forEach((fn) => {
					box = (new fn).run({box, spider: this.spider, config: this.config});
				})
				if (!isFail){
					this.failUrls.splice(j,1);
					j--;
				}
			}
		}
	}
}