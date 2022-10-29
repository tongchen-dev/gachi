const { src, dest } = require('gulp');
const ts = require('gulp-typescript');
const project = ts.createProject('tsconfig.json')
exports.build = async () => {
	src('src/**/*.ts')
	.pipe(project({
		error: (error) => {
			console.log(error.message);
		}
	}))
	.pipe(dest('./dist'));
	src('src/**/*.d.ts')
	.pipe(dest('./dist'));
}