import { HassEntity } from 'home-assistant-js-websocket';
import { Environment } from 'nunjucks';
import { HomeAssistant } from '../interfaces/hass';
import {
	ConfigEntry,
	EntityRegistryEntry,
	LabelRegistryEntry,
} from '../interfaces/registries';

export {};

export interface IHaNunjucks {
	version: string;
	env: Environment;
	hass: HomeAssistant;
	states: Record<string, Record<string, HassEntity>>;
	entityRegistry: Record<string, EntityRegistryEntry>;
	configEntries: Record<string, ConfigEntry>;
	labelRegistry: Record<string, LabelRegistryEntry>;
	numberFormat: Intl.NumberFormat;
	dateFormat: Intl.DateTimeFormat;
	timeFormat: Intl.DateTimeFormat;
	datetimeFormat: Intl.DateTimeFormat;
	ordinalFormat: Intl.PluralRules;
}

declare global {
	interface Window {
		haNunjucks: IHaNunjucks;
	}
}
