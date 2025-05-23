import { date, datetime, time } from 'ts-py-datetime';
import { HomeAssistant } from '../models/interfaces/hass';
export declare function state_translated(hass: HomeAssistant, entity_id: string, state?: string): string;
export declare function attr_name_translated(hass: HomeAssistant, entity_id: string, attr_name: string): string;
export declare function attr_value_translated(hass: HomeAssistant, entity_id: string, attr_name: string, attr_value?: string): any;
export declare function number_translated(value: number): string | number;
export declare function date_translated(value: date | datetime): string | date | datetime;
export declare function time_translated(value: time | datetime): string | datetime | time;
export declare function datetime_translated(value: datetime): string | datetime;
