import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('str', () => {
	it("should return the string representation of it's input", () => {
		assert.equal(
			renderTemplate(hass, '{{ str(as_datetime(199999990).year) + 1 }}'),
			'19761',
		);
	});
});
