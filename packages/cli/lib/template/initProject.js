exports.buildEntryAppTemplate = () => {
return `
import {Engine} from 'gachi';
import Config from './config';
async function app(){
	const engine = new Engine(Config);
	await engine.run();
}
app().then();
`
}

exports.buildSpiderTemplate = (projectName) => {
	return `
import { Box, Spider } from "gachi";
import { runParma } from "gachi/types/engine";
import { urls } from "gachi/types/spider";
export class ${projectName}Spider implements Spider{
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
`;
}

exports.buildConfigTemplate = (projectName) => {
	return `
import { Config } from 'gachi';
import { ${projectName}Spider } from './spider';
export default {
	program:{
		spider: ${projectName}Spider
	}
} as Config;
`
}

exports.buildPackage = (projectName) => {
	return `
{
	"name": "${projectName}",
	"version": "0.0.0",
	"description": "",
	"author": "",
	"scripts": {
		"run": "gachi-cli run",
		"build": "gachi-cli build"
	},
	"dependencies":{
		"gachi": "0.0.7"
	}
}
`
}