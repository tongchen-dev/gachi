import { Box } from "../box";
import { runParma } from "../types/engine";
import { urls } from "../types/spider";

export interface Spider<T=any> {
	urls: urls[];
	open(): Promise<void> | void | T;
	run({res, config}: runParma): Box | void;
	close(): Promise<void> | void | T;
}