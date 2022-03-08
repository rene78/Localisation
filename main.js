import { localeString } from './localeUtils.js';

const deu = localeString("countries.DEU");
document.querySelector("#deu").innerText = deu;

const ita = localeString("countries.ITA");
document.querySelector("#ita").innerText = ita;

const number = 12;
const total = 34;

const of = localeString("of", {
  number: number,
  total: total
})

document.querySelector("#of").innerText = of;