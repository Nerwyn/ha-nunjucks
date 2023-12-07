**Description:**

<!--
Describe the functions you are adding. Include a link to an issue if there is one.
-->

**Checklist:**

- [ ] I've installed all developer dependencies and setup husky commit hooks by running `npm huskyinstall`.
- [ ] I've placed my new utility function in the correct location:
  - [ ] In a new file in the [utils folder](https://github.com/Nerwyn/ha-nunjucks/tree/main/src/utils).
  - [ ] In an existing file if functions from the same section of the [Home Assistant templating documentation](https://www.home-assistant.io/docs/configuration/templating/#home-assistant-template-extensions) already exist.
- [ ] I've added my function to the [CONTEXT](https://github.com/Nerwyn/ha-nunjucks/blob/main/src/context.ts) object.
- [ ] I've created [tests](https://github.com/Nerwyn/ha-nunjucks/tree/main/tests/utils) for my new functions, testing that they work correctly both when called directly and within a template using `renderTemplate`.
- [ ] I've updated the [README](https://github.com/Nerwyn/ha-nunjucks#available-extensions) with information about the new functions, following the descriptions from the Home Assistant templating documentation as closely as possible.
- [ ] My commit contains the the updated compiled files in the `dist` folder.
- [ ] I am merging into the `dev` branch, not `main`, so that an alpha or beta build can be made after this commit is merged to test the changes in Home Assistant by the repository owner.

**Link to relevant Home Assistant templating documentation:**

<!--
A link to the section of the Home Assistant templating documentation which contains the original version of this function, if there is one. Otherwise a link to any relevant information, such as MDN Web Docs.

https://www.home-assistant.io/docs/configuration/templating/
-->

**Additional information:**
