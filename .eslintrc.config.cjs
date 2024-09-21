module.exports = {
	plugins: { '@typescript-eslint': {} },
	rules: {
		'no-unused-vars': [
			'warn', // TODO change back to error when stubbed functions implemented
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
	},
	ignores: ['node_modules/*', 'dist', 'webpack.config.js'],
};
