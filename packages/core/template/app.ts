import {Engine} from '../src/index';
import Config from './config';
async function app(){
	const engine = new Engine(Config);
	await engine.run();
}
app().then();