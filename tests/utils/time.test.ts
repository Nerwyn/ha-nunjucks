import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('time', () => {
	it('should return different values for now and utcnow', () => {
		assert.notEqual(
			renderTemplate(hass, '{{ now() }}'),
			renderTemplate(hass, '{{ utcnow() }}'),
		);
	});
});

// it('as_datetime should turn a timestamp into a datetime object', () => {
// 	const datetime = renderTemplate(hass, '{{ as_datetime(1726210000) }}')
// 	console.log(datetime)
// })
