import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';

export function states(
	hass: HomeAssistant,
	entity_id: string,
	rounded?: boolean,
	with_unit?: boolean,
) {
	try {
		const stateObj = hass.states[entity_id];
		let state: string | number | boolean = stateObj?.state;
		// https://www.home-assistant.io/docs/configuration/templating/#formatting-sensor-states
		if (with_unit && rounded == undefined) {
			rounded = true;
		}
		if (rounded && !isNaN(stateObj?.state as unknown as number)) {
			const precision = parseInt(
				(
					hass[
						'entities' as keyof HomeAssistant
					] as unknown as Record<string, Record<string, string>>
				)[entity_id]?.display_precision ?? 0,
			) as number;

			state = Number(state).toPrecision(precision);
		}
		if (with_unit && stateObj?.attributes?.unit_of_measurement) {
			state = `${state} ${stateObj?.attributes?.unit_of_measurement}`;
		}
		return state;
	} catch {
		return undefined;
	}
}

export function is_state(
	hass: HomeAssistant,
	entity_id: string,
	value: string | string[],
) {
	try {
		const state = states(hass, entity_id);
		if (Array.isArray(value)) {
			return value.includes(state as string);
		}
		return state == value;
	} catch {
		return false;
	}
}

export function state_attr(
	hass: HomeAssistant,
	entity_id: string,
	attribute: string,
) {
	try {
		return hass.states[entity_id].attributes[attribute];
	} catch {
		return undefined;
	}
}

export function is_state_attr(
	hass: HomeAssistant,
	entity_id: string,
	attribute: string,
	value: string | string[],
) {
	try {
		const stateAttr = state_attr(hass, entity_id, attribute);
		if (
			typeof value == 'string' &&
			value.startsWith('[') &&
			value.endsWith(']')
		) {
			value = JSON.parse(value);
		}
		if (Array.isArray(value)) {
			return value.includes(stateAttr);
		}
		return stateAttr == value;
	} catch {
		return false;
	}
}

export function has_value(hass: HomeAssistant, entity_id: string) {
	try {
		const state = states(hass, entity_id);
		if ([false, 0, -0, ''].includes(state as string)) {
			return true;
		} else {
			return Boolean(state);
		}
	} catch {
		return false;
	}
}

export function state_translated(
	hass: HomeAssistant,
	entity_id: string,
	state?: string,
) {
	try {
		return (
			hass['formatEntityState' as keyof HomeAssistant] as unknown as (
				stateObj: HassEntity,
				state?: string,
			) => string
		)(hass.states[entity_id], state);
	} catch {
		return state ?? hass.states[entity_id]?.state ?? undefined;
	}
}

export function attr_name_translated(
	hass: HomeAssistant,
	entity_id: string,
	attr_name: string,
	attr_value?: string,
) {
	try {
		return (
			hass[
				'formatEntityAttributeName' as keyof HomeAssistant
			] as unknown as (
				stateObj: HassEntity,
				attr_name: string,
				attr_value?: string,
			) => string
		)(hass.states[entity_id], attr_name, attr_value);
	} catch {
		return (
			attr_name ??
			hass.states[entity_id]?.attributes?.[attr_name] ??
			undefined
		);
	}
}

export function attr_value_translated(
	hass: HomeAssistant,
	entity_id: string,
	attr_name: string,
	attr_value?: string,
) {
	try {
		return (
			hass[
				'formatEntityAttributeValue' as keyof HomeAssistant
			] as unknown as (
				stateObj: HassEntity,
				attr_name: string,
				attr_value?: string,
			) => string
		)(hass.states[entity_id], attr_name, attr_value);
	} catch {
		return (
			attr_value ??
			hass.states[entity_id]?.attributes?.[attr_name] ??
			undefined
		);
	}
}
