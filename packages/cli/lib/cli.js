#!/usr/bin/env node

const {program} = require('commander');
const package = require('../package.json');
const { buildProject } = require('./command/build');
const { initProject } = require('./command/init');
const { runProject } = require('./command/run');

program.name(package.name).description(package.description).version(package.version);

program
.command('init <project_name>')
.description('init gachi project.')
.action(initProject);

program
.command('build <project_name>')
.description('build project')
.action(buildProject);

program
.command('run <project_name>')
.description('run project')
.action(runProject)


program.parse(process.argv)