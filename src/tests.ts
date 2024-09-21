import { Environment, Template } from 'nunjucks';
import { match, search } from './utils/regexp';
import { datetime, list, set, string_like } from './utils/type_checking';

export function addTests(env: Environment) {
	for (const t in TESTS) {
		(env as unknown as Record<string, CallableFunction>).addTest(
			t,
			function (...args: string[]) {
				return TESTS[t](...args);
			},
		);
	}

	for (const t in HASS_TESTS) {
		(env as unknown as Record<string, CallableFunction>).addTest(
			t,
			function (...args: string[]) {
				const hass = JSON.parse(
					new Template('{{ hass | dump | safe }}').render(
						// @ts-ignore
						this.getVariables(),
					),
				);
				return HASS_TESTS[t](hass, ...args);
			},
		);
	}

	return env;
}

const HASS_TESTS: Record<string, CallableFunction> = {
	// Complex Type Checking
	list,
	set,
	datetime,
	string_like,

	// Regular Expressions
	match,
	search,
};

const TESTS: Record<string, CallableFunction> = {};
