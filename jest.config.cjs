/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules'],
	moduleNameMapper: {
		'py-datetime': '<rootDir>/node_modules/py-datetime/dist/index.min.js',
		'd3-time-format':
			'<rootDir>/node_modules/d3-time-format/dist/d3-time-format.min.js',
		'd3-time': '<rootDir>/node_modules/d3-time/dist/d3-time.min.js',
		'd3-array': '<rootDir>/node_modules/d3-array/dist/d3-array.min.js',
	},
};
