/*As of 2022-02 the import below only works for Chromium based browsers (see https://stackoverflow.com/a/68593192/5263954)*/
// import EN from "./locales/en.json" assert { type: "json" };
// import DE from "./locales/de.json" assert { type: "json" };

const locale = loadLanguageFile("de");
const EN = loadLanguageFile("en");

async function loadLanguageFile(locale) {
  const linkToLanguageFile = "./locales/" + locale + ".json";
  const response = await fetch(linkToLanguageFile);
  const languageFile = await response.json();
  console.log(languageFile);
  return languageFile;
}

export function localeString(localeString) {
  // console.log(locale);
  return locale[localeString] || EN[localeString];
}