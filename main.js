import { localeString } from './localeUtils.js';

const country1 = await localeString("countries.DEU")
document.querySelector("#country-1").innerText = country1;