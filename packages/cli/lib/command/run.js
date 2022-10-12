const ts = require('typescript');
const { resolve, basename } = require('path');
const { exec } = require('shelljs');
const {buildProject} = require('./build');

exports.runProject = (projectName) => {
	buildProject(projectName);
	const configFilePath = ts.findConfigFile(resolve('.', projectName), ts.sys.readFile, 'tsconfig.json');
	const configFile = ts.readConfigFile(configFilePath, ts.sys.readFile).config;
	const entryDir = configFile.compilerOptions.outDir;
	const defaultEntry = 'index.js';
	const entryPath = resolve(projectName, basename(entryDir), defaultEntry);
	exec(`node ${entryPath}`);
}