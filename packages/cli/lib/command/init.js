const {buildConfigTemplate, buildEntryAppTemplate, buildSpiderTemplate, buildPackage} = require('../template/initProject');
const { mkdir, mkdirSync, writeFileSync, writeFile, copyFileSync } = require('fs');
const { resolve, join } = require('path');
const { relation } = require('./realation');
const { toCamelCase, toBigCamelCase } = require('../shared/utils');
const shell = require('shelljs');
const { execSync } = require('child_process');
exports.initProject = (project_name) => {
    const basePath = resolve('./');
    const projectPath = join(basePath, project_name);
    const spiderPath = join(basePath, project_name, 'spider');
	const templateProjectName = toBigCamelCase(project_name);
    const templates = {
        config: buildConfigTemplate(templateProjectName),
        appEntry: buildEntryAppTemplate(templateProjectName),
        spider: buildSpiderTemplate(templateProjectName),
		package: buildPackage(templateProjectName)
    }
	mkdirSync(projectPath);
	mkdirSync(spiderPath);
	console.log('[1/3] Create Fold')
	writeFileSync(join(projectPath, 'index.ts'), templates.appEntry);
	writeFileSync(join(projectPath, 'config.ts'), templates.config);
	writeFileSync(join(spiderPath, 'index.ts'), templates.spider);
	writeFileSync(join(projectPath, 'package.json'), templates.package);
	console.log('[2/3] Fetch dependencies')
	// shell.exec('pnpm install gachi');
	console.log('[3/3] init tsconfig.json');
	copyFileSync('tsconfig.json', join(projectPath, 'tsconfig.json'));
	console.log('Gachi is init success');
	console.log('Please run: ');
	console.log('pnpm/npm/yarn install');
}