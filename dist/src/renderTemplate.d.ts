import { HomeAssistant } from 'custom-card-helpers';
/**
 * Render a Home Assistant template string using nunjucks
 * @param {HomeAssistant} hass The Home Assistant object
 * @param {string} str The template string to render
 * @returns {string} The rendered template string if a string was provided, otherwise the unaltered input
 */
export declare function renderTemplate(hass: HomeAssistant, str: string): string;
