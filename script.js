const form = document.getElementById("form");
const textInput = document.getElementById("text");
const incomeAmountInput =document.getElementById("incomeAmount");
const expenseAmountInput =document.getElementById("expenseAmount");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const incomeTransactions =document.getElementById("incomeTransactions");
const expenseTransactions =document.getElementById("expenseTransactions");
const clearAllBtn =document.getElementById("clearAll");
const expenseTextInput =document.getElementById("expenseText");
// to  From Local Storage
let transactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

//to make and implement in transaction 

function addTransaction(e){
e.preventDefault();
const incomeText =textInput.value.trim();

const expenseText =expenseTextInput.value.trim();
  const incomeAmount =Number(incomeAmountInput.value);
  const expenseAmount =Number(expenseAmountInput.value);

if(

  text === "" ||

  (
    incomeAmount === 0 &&
    expenseAmount === 0
  )

){
  alert("Please enter valid data");
  return;
}

 const transaction = {
  id: Date.now(),

 text:
incomeAmount > 0
? incomeText
: expenseText,

  amount:
    incomeAmount > 0
    ? incomeAmount
    : -expenseAmount,
  date: new Date().toLocaleString()
};

  transactions.push(transaction);
  updateLocalStorage();
  renderTransactions();
  form.reset();
}


//remove transaction in array and ui

function deleteTransaction(id){

  transactions = transactions.filter(
    transaction => transaction.id !== id
  );
  updateLocalStorage();
  renderTransactions();
}

clearAllBtn.addEventListener("click", () => {

  const confirmDelete =
    confirm("Delete all transactions?");

  if(confirmDelete){

    transactions = [];
    updateLocalStorage();
    renderTransactions();
  }

});

// to dynamic transaction rendering function
function renderTransactions(){

  incomeTransactions.innerHTML = "";
  expenseTransactions.innerHTML = "";
  transactions.forEach(transaction => {
    const li = document.createElement("li");

    li.classList.add(

      transaction.amount > 0
      ? "income"
      : "expense"

    );

    li.innerHTML = `

      <div class="transaction-left">

<div>

  <h3>
    ${transaction.text}
  </h3>

  <p class="transaction-date">
    ${transaction.date}
  </p>

</div>

      </div>

      <div class="transaction-right">

        <span class="
          amount
          ${transaction.amount > 0
          ? "plus"
          : "minus"}
        ">

          ${transaction.amount > 0 ? "+" : "-"}

          ₹${Math.abs(transaction.amount)}

        </span>

        <button
          class="delete-btn"
          onclick="deleteTransaction(${transaction.id})"
        >
          X
        </button>

      </div>

    `;

    // income

    if(transaction.amount > 0){

      incomeTransactions.appendChild(li);

    }

    // expense

    else{

      expenseTransactions.appendChild(li);
    }

  });

  if(incomeTransactions.innerHTML === ""){

  incomeTransactions.innerHTML = `
    <p class="empty-msg">
      start by adding your first income
    </p>
  `;
}

if(expenseTransactions.innerHTML === ""){

  expenseTransactions.innerHTML = `
    <p class="empty-msg">
      Start by adding your first expense
    </p>
  `;
}

  updateSummary();
}

//update balance ,income, expense

function updateSummary(){

  const amounts = transactions.map(
    transaction => transaction.amount
  );

  const total = amounts
    .reduce((acc, item) => acc + item, 0);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0);

  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => acc + item, 0);

  balanceEl.innerText = `₹${total.toFixed(2)}`;

  incomeEl.innerText = `₹${income.toFixed(2)}`;

  expenseEl.innerText = `₹${Math.abs(expense).toFixed(2)}`;
}

// Save To Local Storage
function updateLocalStorage() {

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}

// Event Listener
form.addEventListener(
  "submit",
  addTransaction
);

renderTransactions();


