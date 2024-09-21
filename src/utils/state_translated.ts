import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';

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
