const BaseURL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".exchangeBtn");
const amount = document.querySelector(".container input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
  updateExchRate();
});

// console.log(dropdownss[1].innerHTML);
for (let select of dropdowns) {
  for (currCode in countryList) {
    // console.log(currCode, countryList[currCode]);
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchRate = async () => {
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amount.value = "1";
  }
  // console.log(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase());
  let URL = `${BaseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  const rate = data[toCurr.value.toLowerCase()];
  const finalAmount = rate * amountVal;
  // console.log(finalAmount);
  msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  updateExchRate();
});
