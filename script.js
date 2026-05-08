const form = document.getElementById("form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionsList = document.getElementById("transactions");

// show Transactions Array
let transactions = [];

//to make and implement in transaction 

function addTransaction(e){

  e.preventDefault();
  const text = textInput.value.trim();
  const amount = Number(amountInput.value);

  if(text === "" || amount === 0){
    alert("Please enter valid data");
    return;
  }

  const transaction = {
    id: Date.now(),
    text,
    amount
  };

  transactions.push(transaction);
  renderTransactions();
  form.reset();
}

form.addEventListener("submit", addTransaction);

// to dynamic transaction rendering function
function renderTransactions(){

  transactionsList.innerHTML = "";
  transactions.forEach(transaction => {
    const li = document.createElement("li");

    li.classList.add(
      transaction.amount > 0 ? "income" : "expense"
    );

    li.innerHTML = `
      <span>
        ${transaction.text}
      </span>

      <div>
        ₹${Math.abs(transaction.amount)}

        <button
          class="delete-btn"
          onclick="deleteTransaction(${transaction.id})"
        >
          X
        </button>
      </div>
    `;

    transactionsList.appendChild(li);
  });
  updateSummary();
}