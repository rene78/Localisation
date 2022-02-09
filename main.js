// import { localeString } from './localeUtils.js';

const locale = await loadLanguageFile("de");
const EN = await loadLanguageFile("en");

async function loadLanguageFile(locale) {
  const linkToLanguageFile = "./locales/" + locale + ".json";
  const response = await fetch(linkToLanguageFile);
  const languageFile = await response.json();
  console.log(languageFile);
  return languageFile;
}

function localeString(localeString) {
  // console.log(locale);
  return locale[localeString] || EN[localeString];
}

const country1 = localeString("countries.DEU")
document.querySelector("#country-1").innerText = country1;