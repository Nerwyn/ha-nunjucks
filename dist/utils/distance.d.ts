import { HassEntities, HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant } from '../models/hass';
export declare function distance(hass: HomeAssistant, ...args: (string | HassEntity | number)[]): number | null | undefined;
export declare function closest(hass: HomeAssistant, ...args: (string | string[] | HassEntity | HassEntities)[]): HassEntity | null;
