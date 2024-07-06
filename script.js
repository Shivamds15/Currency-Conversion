let url =
  "https://cdn.jsdelivr.net/gh/ismartcoding/currency-api@main/latest/data.json";

const useramt = document.querySelector(".useramt");
const convbtn = document.querySelector(".convbtn");
const convamtmsg = document.querySelector("#converted-amount");
const slectoption = document.querySelectorAll(".currency-group select");

function populateCurrencyOptions() {
  for (let select of slectoption) {
    for (currCode in countryList) {
      const newoption = document.createElement("option");
      newoption.value = currCode;
      newoption.innerHTML = currCode;
      if (select.name === "from" && currCode === "USD") {
        newoption.selected = "selected";
      }
      if (select.name === "to" && currCode === "INR") {
        newoption.selected = "selected";
      }
      select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
}

function updateFlag(element) {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const newsrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
}

async function conversionRatefetch() {
  let response = await fetch(url);
  let data = await response.json();
  return data.quotes;
}

async function convertCurrency(useramtval, toselectcurr, fromselectcurr) {
  console.log(fromselectcurr, useramtval, toselectcurr);
  let convratefetch = await conversionRatefetch(); //shivam
  let convratefrom = convratefetch[fromselectcurr];
  let convrateto = convratefetch[toselectcurr];
  let finalamt = (useramtval * (convrateto / convratefrom)).toFixed(2);
  console.log(finalamt);
  convamtmsg.innerHTML = `${useramtval} ${fromselectcurr} = ${finalamt} ${toselectcurr}`;
}

convbtn.addEventListener("click", (event) => {
  event.preventDefault();
  let useramtval = parseFloat(useramt.value);
  if (useramtval == "" || useramtval < 1) {
    useramtval = 1;
  }
  const toselectcurr = document.querySelector("#to-currency").value;
  const fromselectcurr = document.querySelector("#from-currency").value;
  convertCurrency(useramtval, toselectcurr, fromselectcurr);
});

window.addEventListener("load", () => {
  populateCurrencyOptions();
});
