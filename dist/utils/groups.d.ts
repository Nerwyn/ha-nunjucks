import { HomeAssistant } from 'custom-card-helpers';
import { HassEntities, HassEntity } from 'home-assistant-js-websocket';
export declare function expand(hass: HomeAssistant, ...args: (string | HassEntity | HassEntities)[]): HassEntity[];
