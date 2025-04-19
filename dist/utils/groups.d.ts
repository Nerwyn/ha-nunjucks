import { HassEntities, HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant } from '../models/interfaces/hass';
export declare function expand(hass: HomeAssistant, ...args: (string | HassEntity | HassEntities)[]): HassEntity[];
