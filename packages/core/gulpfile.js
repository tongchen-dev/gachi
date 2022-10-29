const { src, dest, series, task } = require('gulp');
const ts = require('gulp-typescript');
const project = ts.createProject('tsconfig.json')
const uglify = require('gulp-uglify');
const { writeFileSync, rmSync } = require('fs');
const EventEmitter = require('events');
async function buildFile(){
	src('src/**/*.ts')
	.pipe(project({
		error: (error) => {
			console.log(error.message);
		}
	}))
	.pipe(dest('./dist/.tmp'));
}

async function uglifyJS(){
	src('dist/.tmp/**/*.js')
	.pipe(uglify({
		compress:true
	}))
	.pipe(dest('./dist'))
	src('src/**/*.d.ts')
	.pipe(dest('./dist'))
	src('./LICENSE')
	.pipe(dest('./dist'))
}

async function prePublish(){
	// console.clear()
	const package = require('./package.json');
	package.main = 'index.js';
	package.types = 'index.d.ts'
	package.devDependencies = undefined;
	package.gitHead = undefined;
	package.dependencies['@rollup/plugin-typescript'] = undefined;
	package.private = undefined;
	writeFileSync('./dist/package.json', JSON.stringify(package))
	src('./dist/**/*')
	.pipe(dest('../gachi/'))
}
task('build', buildFile)
task('prePublish', prePublish);
task('uglifyJS', uglifyJS);
task('clear', (done) => {
	const rmOptions = {
		force: true,
		recursive: true
	};
	rmSync('./dist/.tmp', rmOptions);
	rmSync('./dist', rmOptions);
	done();
})
task('default', series(['build', 'uglifyJS']))