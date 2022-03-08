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

//This function gets the translated string and all variables and returns the string with filled in vars.
//Taken from https://github.com/stefalda/react-localization/blob/master/src/LocalizedStrings.js and simplified. Thanks Stefano!
export function localeString(localeString, valuesForPlaceholders) {
  // console.log(locale);
  const translatedStringNoVarsFilledIn= locale[localeString] || EN[localeString];//load translation. If empty string --> fall back to English

  const placeholderRegex = /(\{[\d|\w]+\})/;
  const res = (translatedStringNoVarsFilledIn || '')
    .split(placeholderRegex) //Split string into text parts at {}, e.g. ['You have selected ', '{number}', ' out of ', '{total}', ' values']
    .filter(textPart => !!textPart) //Filter out empty strings in array of text parts
    .map((textPart) => {
      if (textPart.match(placeholderRegex)) { //Find words with { at beginning and } at the end
        const matchedKey = textPart.slice(1, -1);//Remove { and }
        const valueForPlaceholder = valuesForPlaceholders[matchedKey];
        if (valueForPlaceholder !== undefined) {
          return valueForPlaceholder;
        } else {
          // If value isn't found, then it must have been undefined/null
          return undefined;
        }
        // return valueForPlaceholder;
      }
      return textPart;
    });
  return res.join('');
}