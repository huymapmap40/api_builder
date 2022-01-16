module.exports = {
	semi: true,
	trailingComma: 'none',
	singleQuote: true,
	printWidth: 120,
	tabWidth: 4,
	useTabs: false,
	overrides: [
		{
			files: '*.yaml',
			options: {
				tabWidth: 2,
				singleQuote: true
			}
		}
	]
};
