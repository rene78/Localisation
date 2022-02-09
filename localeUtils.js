const languages = ["de", "en", "es"]; //Available languages on website. To be updated when a new language is added in Transifex
const preferredBrowserLanguage = getPreferredBrowserLanguage();
console.log(preferredBrowserLanguage);

const locale = await loadLanguageFile(preferredBrowserLanguage); //Load language file of preferred browser language
const EN = await loadLanguageFile("en"); //Load fallback language (English)

//Check the preferred browser languages and see, if we have a translation for it
//Go through all preferred languages defined in the browser and take the first match. If no match - English will be loaded.
function getPreferredBrowserLanguage() {
  // console.log(navigator.languages);
  for (let i = 0; i < navigator.languages.length; i++) {
    const navigatorLanguage = navigator.languages[i].slice(0, 2); //Just keep the first 2 letters (e.g. en-US --> en)
    // console.log(navigatorLanguage);
    if (languages.indexOf(navigatorLanguage) !== -1) return navigatorLanguage;
  }
  return "en"; //if none of the preferred browser languages is available on our site go with default (English)
}

async function loadLanguageFile(locale) {
  const linkToLanguageFile = "./locales/" + locale + ".json";
  const response = await fetch(linkToLanguageFile);
  const languageFile = await response.json();
  return languageFile;
}

export function localeString(localeString) {
  // console.log(locale);
  return locale[localeString] || EN[localeString];//load translation. If empty string --> fall back to English
}