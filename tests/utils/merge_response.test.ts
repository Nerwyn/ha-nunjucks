import assert from 'assert';
import { renderTemplate } from '../../src';
import { hass } from '../hass';

describe('merge_response', () => {
	it('should merge lists of responses into a single list', () => {
		assert.equal(
			renderTemplate(
				hass,
				`{%- set r = {
						"calendar.sports": {
							"events": [
								{
									"start": "2024-02-27T17:00:00-06:00",
									"end": "2024-02-27T18:00:00-06:00",
									"summary": "Basketball vs. Rockets",
									"description": ""
								}
							]
						},
						"calendar.local_events": {"events": []},
						"calendar.house_schedules": {
							"events": [
								{
									"start": "2024-02-26T08:00:00-06:00",
									"end": "2024-02-26T09:00:00-06:00",
									"summary": "Dr. Appt",
									"description": ""
								},
								{
									"start": "2024-02-28T20:00:00-06:00",
									"end": "2024-02-28T21:00:00-06:00",
									"summary": "Bake a cake",
									"description": "something good"
								}
							]
						}
					} -%}
					{{ merge_response(r) | to_json }} 
					`,
			),
			'[{"start":"2024-02-27T17:00:00-06:00","end":"2024-02-27T18:00:00-06:00","summary":"Basketball vs. Rockets","description":"","entity_id":"calendar.sports","value_key":"events"},{"start":"2024-02-26T08:00:00-06:00","end":"2024-02-26T09:00:00-06:00","summary":"Dr. Appt","description":"","entity_id":"calendar.house_schedules","value_key":"events"},{"start":"2024-02-28T20:00:00-06:00","end":"2024-02-28T21:00:00-06:00","summary":"Bake a cake","description":"something good","entity_id":"calendar.house_schedules","value_key":"events"}]',
		);
	});

	it('should merge non-list action responses into a single list', () => {
		assert.equal(
			renderTemplate(
				hass,
				`{%- set r = {
					"vacuum.deebot_n8_plus_1": {
						"header": {
							"ver": "0.0.1"
						},
						"payloadType": "j",
						"resp": {
							"body": {
								"msg": "ok"
							}
						}
					},
					"vacuum.deebot_n8_plus_2": {
						"header": {
							"ver": "0.0.1"
						},
						"payloadType": "j",
						"resp": {
							"body": {
								"msg": "ok"
							}
						}
					}
				}
				%}
				{{ merge_response(r) | to_json }} 
				`,
			),
			'[{"header":{"ver":"0.0.1"},"payloadType":"j","resp":{"body":{"msg":"ok"}},"entity_id":"vacuum.deebot_n8_plus_1"},{"header":{"ver":"0.0.1"},"payloadType":"j","resp":{"body":{"msg":"ok"}},"entity_id":"vacuum.deebot_n8_plus_2"}]',
		);
	});
});
