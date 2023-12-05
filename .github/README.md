# ha-nunjucks

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
![Project Maintenance][maintenance-shield]
[![GitHub Activity][last-commit-shield]][commits]
[![Community Forum][forum-shield]][forum]

[![Github][github]][github]

<a href="https://www.buymeacoffee.com/nerwyn" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

A wrapper for nunjucks for use with Home Assistant frontend custom components to render templates. This repository offers an easy way for developers to add templating support to Home Assistant custom cards.

## What is nunjucks?

[Nunjucks](https://mozilla.github.io/nunjucks/) is a templating engine for JavaScript that is heavily inspired by jinja2. Home Assistant uses jinja2 to process templates in card configurations on the backend, so the syntax of jinja2 and Nunjucks is virtually the same. This makes it an excellent alternative for Home Assistant templating for custom cards.

While some Home Assistant native cards support templating for certain fields, implementing proper Home Assistant jinja2 template support in custom cards is difficult. The only custom module that manages to do so (AFAIK) is card-mod, and it's implemenation is hard to port to other projects. This project offers a much easier plug and play solution to adding template support to custom cards.

## Usage

Just import `renderTemplate` from `ha-nunjucks` and provide it with the `hass` object and a template string you want to process.

```typescript
import { renderTemplate } from 'ha-nunjucks';

const renderedString = renderTemplate(this.hass, templateString);
```

Rather than rendering templates on the backend, this

## Available Extensions

The catch to this approach of rendering jinja2/nunjucks templates is that we have to reimplement all of the [Home Assistant template extension](https://www.home-assistant.io/docs/configuration/templating/#home-assistant-template-extensions) functions and filters. That's where you come in! If there are functions or filters that you use that are not currently supported, please make a feature request or try adding it to the project yourself and create a pull request.

So far a subset of the Home Assistant template extension functions have been implemented as documented below.

### Variables

These variables just remap Python built-in constants to JavaScript ones.

| Python | JavaScript |
| ------ | ---------- |
| True   | true       |
| False  | false      |
| None   | null       |

### [States](https://www.home-assistant.io/docs/configuration/templating/#states)

Functions used to determine an entity's state or an attribute.

| Name          | Arguments                   | Description                                                                                        |
| ------------- | --------------------------- | -------------------------------------------------------------------------------------------------- |
| states        | entity_id                   | Returns the state string of the given entity.                                                      |
| is_state      | entity_id, value            | Compares an entity's state with a specified state or list of states and returns `true` or `false`. |
| state_attr    | entity_id, attribute        | Returns the value of the attribute or `undefined` if it doesn't exist.                             |
| is_state_attr | entity_id, attribute, value | Tests if the given entity attribute is the specified value.                                        |
| has_value     | entity_id                   | Tests if the given entity is not unknown or unavailable.                                           |

### [Immediate If](https://www.home-assistant.io/docs/configuration/templating/#immediate-if-iif)

A shorthand for an if else statement.

| Name | Arguments                             | Description                                                                                                                                                                                                                                                          |
| ---- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iif  | condition, if_true, if_false, if_none | Immediate if. Returns the value of `if_true` if the condition is true, the value of `if_false` if it's false, and the value of `if_none` if it's `undefined`, `null`, or an empty string. All arguments except `condition` are optional. Cannot be used as a filter. |

### Other

Functions that are not from the Home Assistant templating documentation

| Name        | Arguments                                                                                            | Description                                                                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| match_media | [mediaquery](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) | Returns the boolean result of the provided [CSS media query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries). |

[last-commit-shield]: https://img.shields.io/github/last-commit/Nerwyn/ha-nunjucks?style=for-the-badge
[commits]: https://github.com/Nerwyn/service-call-tile-feature/commits/main
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/t/ha-nunjucks/
[license-shield]: https://img.shields.io/github/license/Nerwyn/service-call-tile-feature.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Nerwyn-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/Nerwyn/ha-nunjucks.svg?style=for-the-badge
[releases]: https://github.com/nerwyn/ha-nunjucks/releases
[github]: https://img.shields.io/github/followers/Nerwyn.svg?style=social
