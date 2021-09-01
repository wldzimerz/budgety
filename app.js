const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.querySelector(".budget__title--month").innerHTML = months[new Date().getMonth()] + " " + new Date().getFullYear();

const total = document.querySelector(".budget__value");
const totalIncome = document.querySelector(".budget__income--value");
const totalExpences = document.querySelector(".budget__expenses--value");
const inputType = document.querySelector(".add__type");
const description = document.querySelector(".add__description");
const input = document.querySelector(".add__value");
const income = document.querySelector(".income__list");
const incomeElements = income.getElementsByClassName("item");
const expences = document.querySelector(".expenses__list");
const expencesElements = expences.getElementsByClassName("item");
const expencesPercentage = document.querySelector(".budget__expenses--percentage");
expencesPercentage.innerHTML = "--";
document.querySelector(".add__btn").addEventListener("click", () => {
  let expenceListCount = expencesElements.length;
  let incomeListCount = incomeElements.length;
  if (inputType.value == "inc" && description.value !== "" && input.value !== "") {
    totalIncome.innerHTML = (Number(totalIncome.innerHTML) + Number(input.value)).toFixed(2);
    income.insertAdjacentHTML(
      "beforeend",
      `<div class="item clearfix" id="income-${incomeListCount++}"> <div class="item__description">${
        description.value
      }</div> <div class="right clearfix">  <div class="item__value">+ ${Number(input.value).toFixed(
        2
      )}</div>          <div class="item__delete">            <button class="item__delete--btn">              <i class="ion-ios-close-outline"></i>            </button>          </div>        </div>      </div>`
    );
  } else if (inputType.value == "exp" && description.value !== "" && input.value !== "") {
    totalExpences.innerHTML = (Number(totalExpences.innerHTML) + Number(input.value)).toFixed(2);
    expences.insertAdjacentHTML(
      "beforeend",
      `<div class="item clearfix" id="expense-${expenceListCount++}">    <div class="item__description">${
        description.value
      }</div>    <div class="right clearfix">      <div class="item__value">- ${Number(input.value).toFixed(
        2
      )}</div>      <div class="item__percentage">${Math.round(
        (Number(input.value) / Number(total.innerHTML)) * 100
      )}%</div>      <div class="item__delete">        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>      </div>    </div>  </div>`
    );
  }
  description.value = null;
  input.value = null;
  inputType.value = "inc";
  total.innerHTML = (Number(totalIncome.innerHTML) - Number(totalExpences.innerHTML)).toFixed(2);
  expencesPercentage.innerHTML = Math.round((Number(totalExpences.innerHTML) / Number(totalIncome.innerHTML)) * 100) + "%";
  const items = document.querySelectorAll(".item");
  for (let item of items) {
    const deleteButtons = item.getElementsByTagName("i");
    for (let deleteButton of deleteButtons) {
      deleteButton.addEventListener("click", () => {
        item.remove();
      });
    }
  }
});
