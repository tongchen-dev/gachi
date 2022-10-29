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
import type {urls, runParma} from "gachi/dist/types";
export class Example1Spider implements Spider{
	urls: urls[]=[];
	open(): void {
		console.log('open')
	}
	run({ res, config }: runParma): void | Box {
		console.log('run')
	}
	close(): void {
		console.log('run')
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