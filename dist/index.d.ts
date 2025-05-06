import { HomeAssistant } from './models/interfaces/hass';
/**
 * Render a Home Assistant template string using nunjucks
 * @param {HomeAssistant} hass The Home Assistant object
 * @param {string} str The template string to render
 * @param {object} [context] Additional context to expose to nunjucks
 * @param {boolean} [validate=true] Validate that the input contains a template.
 * @returns {string | boolean} The rendered template string if a string was provided, otherwise the unaltered input
 */
export declare function renderTemplate(hass: HomeAssistant, str: string, context?: object, validate?: boolean): string | boolean;
/**
 * Test if the input contains a valid template
 * @param {any} str the variable to check
 * @returns if the input is a string that contains a template
 */
export declare function hasTemplate(str: any): boolean;
