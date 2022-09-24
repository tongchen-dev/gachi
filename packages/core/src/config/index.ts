import { Flow } from "../flow";
import { Response } from "../response";
import { Spider } from "../spider"

export interface customConfig {
	[x:string]: any
}

export interface Config {
	program:{
		spider: new () => Spider;
		response?: typeof Response;
		flow?: (new (...args: any[]) => Flow)[];
		failUrl_retry?: number;
		success_code?: number;
	}
	custom?:customConfig
}