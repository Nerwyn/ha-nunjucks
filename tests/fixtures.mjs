import 'global-jsdom/register';
import { hass } from './hass';

export async function mochaGlobalSetup() {
	const ha = document.createElement('home-assistant');
	ha.hass = hass;
	document.body.appendChild(ha);

	await import('../src/index');
}
