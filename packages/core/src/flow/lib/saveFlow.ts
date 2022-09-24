import { Flow } from "..";
import { Box } from "../../box";
import { flowParam } from "../../types/flow";
import { statSync, mkdirSync, writeSync, writeFileSync, createWriteStream } from 'fs';
import { resolve, join } from 'path';
import { err } from "../../utils/logger";
import { exit } from "process";
import { min } from "lodash";
import { SaveBox } from "../../box/lib/saveBox";

export class SaveFlow implements Flow{
	run({ box, spider, config }: flowParam<SaveBox | Box>): Box | null {
		const data = box.get('data');
		const type = box.get('type');
		const fileName = box.get('fileName') ?? box.get('title');
		const extName = box.get('ext');
		const basePath = box.get('path');
		const path = join(basePath, `${fileName}.${extName}`);
		if (!data || !type){
			err(`${!data ? 'data' : 'type'} is empty.`, 'save-flow');
			err('skip save-flow', 'save-flow');
			return null;
		}
		try {
			statSync(basePath);
		} catch (e) {
			mkdirSync(basePath);
		}
		try {
			if (type === 'text'){
				writeFileSync(path, data);
			}
			if (type === 'img'){
				writeFileSync(path, data, 'binary');
			}
		} catch (e) {
			err('has eror', 'save-flow');
			exit(-1)
		}
		return null;
	}
}