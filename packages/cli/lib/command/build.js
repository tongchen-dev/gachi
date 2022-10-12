const ts = require('typescript');
const {resolve, join} = require('path');
exports.buildProject = (project_name) => {
	const basePath = resolve(project_name);
	const configFilePath = ts.findConfigFile(basePath, ts.sys.fileExists, 'tsconfig.json');
	const configFile = ts.readConfigFile(configFilePath, ts.sys.readFile).config;
	configFile.compilerOptions.outDir = join(basePath, configFile.compilerOptions.outDir);
	const program = ts.createProgram([join(basePath, 'index.ts')], configFile.compilerOptions);
	program.emit()
}