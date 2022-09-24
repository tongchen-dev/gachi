import { Box } from "../box"
import { Spider } from "../spider";
import { Config, customConfig } from "../config";

export type flowParam<B> = {
	box:B;
	spider: Spider;
	config: customConfig;
}