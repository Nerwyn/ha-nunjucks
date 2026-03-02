import { HassEntity } from 'home-assistant-js-websocket';
import { Environment } from 'nunjucks';
import { HomeAssistant } from '../interfaces/hass';
import {
	ConfigEntry,
	LabelRegistryEntry,
	RepairsIssue,
} from '../interfaces/registries';

export {};

export interface IHaNunjucks {
	renderTemplate: (
		hass: HomeAssistant,
		str: string,
		context: object,
		validate: boolean = true,
	) => string | boolean;

	version: string;
	env: Environment;
	hass: HomeAssistant;
	states: Record<string, Record<string, HassEntity>>;

	labelRegistry: {
		labelId: Record<string, LabelRegistryEntry>;
		name2LabelId: Record<string, string>;
	};
	entityRegistry: {
		entityId2ConfigEntryId: Record<string, string>;
		configEntryId2EntityIds: Record<string, string[]>;
	};
	configEntries: {
		entryId: Record<string, ConfigEntry>;
		title2EntryId: Record<string, string[]>;
	};
	repairsIssues: Record<string, RepairsIssue>;

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
