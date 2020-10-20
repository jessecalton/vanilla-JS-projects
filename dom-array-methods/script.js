const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Putting the people in here.
// Each person has a name and money value.
let data = [];
getRandomUser();
// fetch random user and add moneys
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  // res.json() returns a promise as well
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);
}
