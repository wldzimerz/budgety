const ELEMENTS = {
  inputType: document.querySelector(".add__type"),
  inputDescr: document.querySelector(".add__description"),
  inputValue: document.querySelector(".add__value"),
  inputButton: document.querySelector(".add__btn"),
  incomeContainer: document.querySelector(".income__list"),
  expensesContainer: document.querySelector(".expenses__list"),
  total: document.querySelector(".budget__value"),
  incomeLabel: document.querySelector(".budget__income--value"),
  expenseLabel: document.querySelector(".budget__expenses--value"),
  percentageLabel: document.querySelector(".budget__expenses--percentage"),
  container: document.querySelector(".container"),
  expensesPercentageLabel: document.querySelector(".item__percentage"),
  dateLabel: document.querySelector(".budget__title--month"),
};

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

ELEMENTS.dateLabel.innerHTML = months[new Date().getMonth()] + " " + new Date().getFullYear();
ELEMENTS.total.innerHTML = Number(ELEMENTS.total.innerHTML).toFixed(2);
ELEMENTS.percentageLabel.innerHTML = "--";

function updateValues() {
  ELEMENTS.total.innerHTML = (Number(ELEMENTS.incomeLabel.innerHTML) - Number(ELEMENTS.expenseLabel.innerHTML)).toFixed(2);
  const percentage = `${Math.round((Number(ELEMENTS.expenseLabel.innerHTML) / Number(ELEMENTS.incomeLabel.innerHTML)) * 100)}%`;
  ELEMENTS.percentageLabel.innerHTML = percentage;
}

function itemsHandler() {
  const items = document.querySelectorAll(".item");
  for (let item of items) {
    const itemValue = item.querySelector(".item__value");
    const deleteButtons = item.getElementsByTagName("i");
    for (let deleteButton of deleteButtons) {
      deleteButton.addEventListener("click", () => {
        if (ELEMENTS.incomeContainer.contains(item)) {
          ELEMENTS.incomeLabel.innerHTML = (Number(ELEMENTS.incomeLabel.innerHTML) - Number(itemValue.innerHTML)).toFixed(2);
        } else if (ELEMENTS.expensesContainer.contains(item)) {
          ELEMENTS.expenseLabel.innerHTML = (Number(ELEMENTS.expenseLabel.innerHTML) - Number(itemValue.innerHTML)).toFixed(2);
        }
        item.remove();
        updateValues();
      });
    }
  }
}

function setDefaultValues() {
  ELEMENTS.inputDescr.value = null;
  ELEMENTS.inputValue.value = null;
  ELEMENTS.inputType.value = "inc";
}

ELEMENTS.inputButton.addEventListener("click", () => {
  if (ELEMENTS.inputType.value == "inc" && ELEMENTS.inputDescr.value !== "" && ELEMENTS.inputValue.value !== "") {
    ELEMENTS.incomeLabel.innerHTML = (Number(ELEMENTS.incomeLabel.innerHTML) + Number(ELEMENTS.inputValue.value)).toFixed(2);
    ELEMENTS.incomeContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="item clearfix" > <div class="item__description">${
        ELEMENTS.inputDescr.value
      }</div> <div class="right clearfix">  <div class="item__value"> ${Number(ELEMENTS.inputValue.value).toFixed(
        2
      )}</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
    );
    updateValues();
    itemsHandler();
    setDefaultValues();
  } else if (ELEMENTS.inputType.value == "exp" && ELEMENTS.inputDescr.value !== "" && ELEMENTS.inputValue.value !== "") {
    ELEMENTS.expenseLabel.innerHTML = (Number(ELEMENTS.expenseLabel.innerHTML) + Number(ELEMENTS.inputValue.value)).toFixed(2);
    ELEMENTS.expensesContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="item clearfix" >    <div class="item__description">${
        ELEMENTS.inputDescr.value
      }</div>    <div class="right clearfix">      <div class="item__value"> ${Number(ELEMENTS.inputValue.value).toFixed(
        2
      )}</div>      <div class="item__percentage">${Math.round(
        (Number(ELEMENTS.inputValue.value) / Number(ELEMENTS.total.innerHTML)) * 100
      )}%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
    );
    updateValues();
    itemsHandler();
    setDefaultValues();
  } else {
    alert("Fill the form please");
  }
});
