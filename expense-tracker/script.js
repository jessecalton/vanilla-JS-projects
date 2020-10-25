const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 },
];

let transactions = dummyTransactions;

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign (plus or minus)
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  // Make the innerHTML use the absolute value to strip off any "-" signs
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn"></button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  // Get an array of each transaction's value
  const amounts = transactions.map((transaction) => transaction.amount);
  // Add up the total transactions
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  // Get all the positive transactions
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  // Get all the negative transactions
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Init app
function init() {
  // Clear out the list
  list.innerHTML = '';

  // Loop through all the transactions, and append them to the DOM
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
