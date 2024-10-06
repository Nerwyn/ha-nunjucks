import { HomeAssistant } from 'custom-card-helpers';
export declare let HASS: HomeAssistant | undefined;
/**
 * Render a Home Assistant template string using nunjucks
 * @param {HomeAssistant} hass The Home Assistant object
 * @param {string} str The template string to render
 * @param {object} [context] Additional context to expose to nunjucks
 * @returns {string | boolean} The rendered template string if a string was provided, otherwise the unaltered input
 */
export declare function renderTemplate(hass: HomeAssistant, str: string, context?: object): string | boolean;
