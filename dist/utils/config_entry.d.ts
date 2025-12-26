import { HomeAssistant } from '../models/interfaces/hass';
export declare function fetchConfigEntries(hass: HomeAssistant): Promise<void>;
export declare function config_entry_id(entity_id: string): string | undefined;
declare const ConfigEntryAttributes: readonly ["domain", "title", "state", "source", "disabled_by"];
type ConfigEntryAttribute = (typeof ConfigEntryAttributes)[number];
export declare function config_entry_attr(config_entry_id: string, attr: ConfigEntryAttribute): string | undefined;
export {};
