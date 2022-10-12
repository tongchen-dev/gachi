exports.relation = (project_name)=>({
	name: project_name,
	type: 'fold',
	children: [{
		name: 'src',
		type: 'fold',
		children: [{
			name: 'index.ts',
			type: 'file',
			module: 'appEntry'
		}, {
			name: 'config.ts',
			type: 'file',
			module: 'config',
		}, {
			name: 'spider',
			type: 'fold',
			children: [{
				name: 'index.ts',
				type: 'fold',
				module: 'spider'
			}]
		}]
	}]
});