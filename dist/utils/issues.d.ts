import { HomeAssistant } from '../models/interfaces/hass';
import { RepairsIssue } from '../models/interfaces/registries';
export declare function fetchRepairsIssues(hass: HomeAssistant): Promise<void>;
export declare function issues(): Record<string, RepairsIssue>;
export declare function issue(domain: string, issue_id: string): RepairsIssue;
