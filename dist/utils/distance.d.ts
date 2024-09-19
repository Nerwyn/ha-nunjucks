import { HomeAssistant } from 'custom-card-helpers';
import { HassEntities, HassEntity } from 'home-assistant-js-websocket';
export declare function distance(hass: HomeAssistant, ...args: (string | number)[]): number | null | undefined;
export declare function closest(hass: HomeAssistant, ...args: (string | string[] | HassEntity | HassEntities)[]): HassEntity | null;
