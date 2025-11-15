import { HomeAssistant } from '../models/interfaces/hass';
export declare function iif(hass: HomeAssistant, condition: string, if_true?: string | Record<string, string>, if_false?: string, if_none?: string): string | boolean;
