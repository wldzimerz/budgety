const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.querySelector(".budget__title--month").innerHTML = months[new Date().getMonth()] + " " + new Date().getFullYear();

const total = document.querySelector(".budget__value");
const totalIncome = document.querySelector(".budget__income--value");
const totalExpences = document.querySelector(".budget__expenses--value");
const inputType = document.querySelector(".add__type");
const description = document.querySelector(".add__description");
const input = document.querySelector(".add__value");
const income = document.querySelector(".income__list");
const expences = document.querySelector(".expenses__list");
document.querySelector(".add__btn").addEventListener("click", function () {
  if (inputType.value == "inc") {
    totalIncome.innerHTML = Number(totalIncome.innerHTML) + Number(input.value);
    income.innerHTML = income.innerHTML + "<br>" + input.value;
  } else {
    totalExpences.innerHTML = Number(totalExpences.innerHTML) + Number(input.value);
    expences.innerHTML = expences.innerHTML + "<br>" + input.value;
  }
  description.value = null;
  input.value = null;
  inputType.value = "inc";
  total.innerHTML = Number(totalIncome.innerHTML) - Number(totalExpences.innerHTML);
});
