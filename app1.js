const ELEMENTS = {
  inputType: document.querySelector(".add__type"),
  inputDescr: document.querySelector(".add__description"),
  inputValue: document.querySelector(".add__value"),
  inputButton: document.querySelector(".add__btn"),
  incomeContainer: document.querySelector(".income__list"),
  expensesContainer: document.querySelector(".expenses__list"),
  budgetLabel: document.querySelector(".budget__value"),
  incomeLabel: document.querySelector(".budget__income--value"),
  expenseLabel: document.querySelector(".budget__expenses--value"),
  percentageLabel: document.querySelector(".budget__expenses--percentage"),
  container: document.querySelector(".container"),
  expensesPercentageLabel: document.querySelector(".item__percentage"),
  dateLabel: document.querySelector(".budget__title--month"),
};

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const state = {
  counter: "0.00",
  operationType: "+",
  expenses: [],
  income: [],
};

console.log("spread: ");

ELEMENTS.dateLabel.innerHTML = months[new Date().getMonth()] + " " + new Date().getFullYear();

function updateCounter(counter) {
  ELEMENTS.budgetLabel.innerHTML = counter;
}

function updateExpenses(values = []) {
  ELEMENTS.expensesContainer.innerHTML = values.join("");
}

function updateIncome(values = []) {
  ELEMENTS.incomeContainer.innerHTML = values.join("");
}

function updateUI() {
  updateCounter(state.counter);
  updateExpenses(state.expenses);
  updateIncome(state.income);
}

const map = {
  inc: ({ description, value }) => {
    const template = `
    <div class="item clearfix" id="income-0">
      <div class="item__description">${description}</div>
        <div class="right clearfix">
          <div class="item__value">+ ${Number(value).toFixed(2)}</div>
          <div class="item__delete">
            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
          </div>
      </div>
    </div>
  `;

    state.income.push(template);
  },
  exp: ({ description, value }) => {
    const template = `
    <div class="item clearfix" id="income-0">
      <div class="item__description">${description}</div>
        <div class="right clearfix">
          <div class="item__value">- ${Number(value).toFixed(2)}</div>
          <div class="item__delete">
            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
          </div>
      </div>
    </div>
  `;

    state.expenses.push(template);
  },
};

updateUI();

ELEMENTS.inputButton.addEventListener("click", () => {
  if (!ELEMENTS.inputDescr.value || !ELEMENTS.inputValue.value) {
    return alert("Введите значение");
  }

  const addValue = map[ELEMENTS.inputType.value];

  addValue({
    description: ELEMENTS.inputDescr.value,
    type: ELEMENTS.inputType.value,
    value: ELEMENTS.inputValue.value,
  });

  ELEMENTS.inputDescr.value = "";
  ELEMENTS.inputValue.value = "";

  updateUI();
});
