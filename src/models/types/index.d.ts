import { HassEntity } from 'home-assistant-js-websocket';
import { Environment } from 'nunjucks';
import { HomeAssistant } from '../interfaces/hass';
import { LabelRegistryEntry } from '../interfaces/registries';

export {};

declare global {
	interface Window {
		haNunjucks: {
			env: Environment;
			hass: HomeAssistant;
			states: Record<string, Record<string, HassEntity>>;
			labelRegistry: Record<string, LabelRegistryEntry>;
			numberFormat: Intl.NumberFormat;
			datetimeFormat: Intl.DateTimeFormat;
		};
	}
}
