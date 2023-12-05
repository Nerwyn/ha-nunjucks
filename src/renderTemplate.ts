import { HomeAssistant } from 'custom-card-helpers';
import { renderString } from 'nunjucks';

import {
	_states,
	_is_state,
	_state_attr,
	_is_state_attr,
	_has_value,
} from './utils/states';
import { _iif } from './utils/iif';
import { _match_media } from './utils/css';

/**
 * Render a Home Assistant template string using nunjucks
 * @param {HomeAssistant} hass The Home Assistant object
 * @param {string} str The template string to render
 * @returns {string} The rendered template string if a string was provided, otherwise the unaltered input
 */
export function renderTemplate(hass: HomeAssistant, str: string): string {
	if (
		typeof str == 'string' &&
		((str.includes('{{') && str.includes('}}')) ||
			(str.includes('{%') && str.includes('%}')))
	) {
		const context = {
			True: true,
			False: false,
			None: null,
			states(entity_id: string) {
				return _states(hass, entity_id);
			},
			is_state(entity_id: string, value: string) {
				return _is_state(hass, entity_id, value);
			},
			state_attr(entity_id: string, attribute: string) {
				return _state_attr(hass, entity_id, attribute);
			},
			is_state_attr(entity_id: string, attribute: string, value: string) {
				return _is_state_attr(hass, entity_id, attribute, value);
			},
			has_value(entity_id: string) {
				return _has_value(hass, entity_id);
			},
			iif(
				condition: string,
				if_true: string,
				if_false?: string,
				if_none?: string,
			) {
				return _iif(hass, condition, if_true, if_false, if_none);
			},
			match_media(mediaquery: string) {
				return _match_media(mediaquery);
			},
		};

		str = renderString(structuredClone(str), context).trim();

		if (str == undefined || str == null) {
			str = '';
		}
	}

	return str;
}
