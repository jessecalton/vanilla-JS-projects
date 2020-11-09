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
  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');

  // `dragStartIndex` is set at top level
  // Get our custom attribute from the `closest` <li>
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragEnter() {
  // console.log('Event: ', 'dragEnter');

  // `this` pertains to the element
  this.classList.add('over');
}
function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}
function dragOver(e) {
  console.log('Event: ', 'dragover');

  // We need the `preventDefault` here so the `drop` event gets recognized.
  // Otherwise, it would be blocked
  e.preventDefault();
}
function dragDrop() {
  // console.log('Event: ', 'drop');

  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// Swaps list items when they are dragged and dropped
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
  // This will do the swapping, and additional nodes won't be created.
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Checks the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  // Many different drag events: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
  const draggables = document.querySelectorAll('.draggable');
  const dragListItem = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItem.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);
