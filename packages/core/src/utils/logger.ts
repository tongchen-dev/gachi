import pkg from '../../package.json';
export function trace(msg: string, module: string){
	const date = new Date().getTime();
	console.log(`TRACE - ${module} - ${date}: ${msg}`);
}
export function info(msg: string, module: string){
	const date = new Date().getTime();
	console.log(`INFO - ${module} - ${date}: ${msg}`);
}
export function warn(msg: string, module: string){
	const date = new Date().getTime();
	console.log(`WARN - ${module} - ${date}: ${msg}`);
}
export function err(msg: string, module: string){
	const date = new Date().getTime();
	console.log(`ERR - ${module} - ${date}: ${msg}`);
}