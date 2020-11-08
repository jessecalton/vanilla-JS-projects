const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

// Store <li> listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  // Make sure to copy it to not alter the original array
  [...richestPeople]
    // Making an array of objects with the person's name and the sort order
    .map((a) => ({ value: a, sort: Math.random() }))
    // Sorting the array in descending order
    .sort((a, b) => a.sort - b.sort)
    // Sanitizing the ordered array back into String values
    .map((a) => a.value)
    // Creating the elements out of the sorted array
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      // Setting draggable="true" so the element can be dragged
      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `;
      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });
}
