const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 },
// ];

// Our local storage
// Need JSON.parse since it's a stringified array
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

// Check first if anything is in localStorage under the 'transactions' key
// If not, initialize the value with an empty array
let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      // I always forget the "plus" sign hack to turn a string into a number...
      amount: +amount.value,
    };
    // We can add our new transaction to the array, but still need to run the function to
    // add it to the DOM
    transactions.push(transaction);
    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    // Don't forget to clear the values!
    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

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
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
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

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

// Init app
function init() {
  // Clear out the list
  list.innerHTML = '';

  // Loop through all the transactions, and append them to the DOM
  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Update local storage transactions
function updateLocalStorage() {
  // Gotta stringify it before it gets sent!
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

init();

form.addEventListener('submit', addTransaction);
