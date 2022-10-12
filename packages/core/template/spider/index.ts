import { Box, Spider } from "../../src";
import { runParma } from "../../src/types/engine";
import { urls } from "../../src/types/spider";
export class ProjectSpider implements Spider{
	urls: urls[];
	open(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	run({ res, config }: runParma): void | Box {
		
		throw new Error("Method not implemented.");
	}
	close(): Promise<void> {
		throw new Error("Method not implemented.");
	}

}