/*As of 2022-02 the import below only works for Chromium based browsers (see https://stackoverflow.com/a/68593192/5263954)*/
import EN from "./locales/en.json" assert { type: "json" };
import DE from "./locales/de.json" assert { type: "json" };

const locale = "DE";
// const languageFile =loadLanguageFile("de");
// console.log(languageFile);

async function loadLanguageFile(locale) {
  const linkToLanguageFile = "./locales/" + locale + ".json";
  let response = await fetch(linkToLanguageFile);
  let languageFile = await response.json();
  return languageFile;
}

export function localeString(localeString) {

  switch (locale) {
    case 'DE':
      return DE[localeString] || EN[localeString];
    default:
      return EN[localeString];
  }
}