import { Environment, Template } from 'nunjucks';

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

// TODO add tests

const HASS_TESTS: Record<string, CallableFunction> = {};

const TESTS: Record<string, CallableFunction> = {};
