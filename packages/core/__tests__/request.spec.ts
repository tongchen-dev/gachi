import { url } from 'inspector';
import { toRequestOption } from '../src/option';
import { request } from '../src/utils/request';
jest.setTimeout(30000)
describe('request test', ()=>{
	test('get - url - no body', async () => {
		const successRaw = await fetch(new URL('http://localhost:9898/get.html'));
		const raw = await request('http://localhost:9898/get.html');
		const text = await raw.text();
		expect(text).toStrictEqual(await successRaw.text());
	})
	test('get - option - no body', async () => {
		const successRaw = await fetch(new URL('http://localhost:9898/get.html'));
		let requestOption = toRequestOption('http://localhost:9898/get.html');
		if (requestOption){
			const raw = await request(requestOption);
			expect(await raw.text()).toStrictEqual(await successRaw.text());
		}
	})
	test('get - option - has body', async () => {
		const op = toRequestOption(['http://localhost:9898/get.html', 'GET', {
			project: 'gachi',
			author: 'GaoNeng'
		}]);
		let urlObj = new URL('http://localhost:9898/get.html');
		urlObj.searchParams.set('project', 'gachi');
		urlObj.searchParams.set('author', 'GaoNeng');
		if (op){
			const raw = await request(op);
			expect(await raw.text()).toBe(urlObj.search)
		}
	})
	test('post', async () => {
		const body = {
			project: 'gachi'
		};
		const raw = await request(['http://localhost:9898/post.html', 'POST', body]);
		const urlObject = new URL('http://localhost:9898/post.html');
		const successRaw = await fetch(urlObject, {
			method: 'POST',
			body: JSON.stringify(body),
		})
		expect(await raw.json()).toStrictEqual(await successRaw.json());
	})
})