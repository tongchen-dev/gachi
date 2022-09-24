const {createServer} = require('http');
const { URL } = require('url');

const server = createServer((req, res) => {
	const {method,url, headers} = req;
	let data = '';
	let urlObj = new URL(url, `http://localhost:9898/`)
	if (urlObj.pathname === '/get.html'){
		if (urlObj.search){
			res.end(urlObj.search);
		} else {
			res.end('hi');
		}
	}
	if (url === '/post.html'){
		req.on('data', (chunk) => {
			data += chunk?.toString?.();
		})
		req.on('close', () => {
			let returnObject = {
				data: JSON.parse(data || '{}'),
				headers
			}
			res.end(JSON.stringify(returnObject));
		})
	}
})
server.listen(9898,'localhost', () => {
	console.log(`[Server]: Test server is running in http://localhost:9898`);
})