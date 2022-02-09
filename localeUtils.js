const locale = await loadLanguageFile("de");
const EN = await loadLanguageFile("en");

async function loadLanguageFile(locale) {
  const linkToLanguageFile = "./locales/" + locale + ".json";
  const response = await fetch(linkToLanguageFile);
  const languageFile = await response.json();
  return languageFile;
}

export async function localeString(localeString) {
  console.log(locale);
  return locale[localeString] || EN[localeString];
}