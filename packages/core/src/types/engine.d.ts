import { Response } from "../response"
import { Config } from "../config";

export type runParma = {
	res: Response;
	config: Config;
	isFail: boolean;
}