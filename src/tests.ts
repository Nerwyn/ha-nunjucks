import { Environment } from 'nunjucks';
import { contains } from './utils/contains';
import { match, search, test } from './utils/regexp';
import { is_datetime, list, set, string_like } from './utils/type_checking';

export function addTests(env: Environment) {
	for (const func in TESTS) {
		(env as unknown as Record<string, CallableFunction>).addTest(
			func,
			function (...args: string[]) {
				return TESTS[func](...args);
			},
		);
	}
	return env;
}

const TESTS: Record<string, CallableFunction> = {
	// Complex Type Checking
	list,
	set,
	datetime: is_datetime,
	string_like,

	// Contains
	contains,

	// Regular Expressions
	match,
	search,
	test,
};
