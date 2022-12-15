/* eslint-disable @typescript-eslint/no-use-before-define */
import './style/style.scss';
import './style/desktop.scss';

/* **********************VARIABLES********************** */

// HEADER BUTTONS
const sortBtn = document.querySelector('#sorting-btn') as HTMLButtonElement;
const categoriesBtn = document.querySelector('#categories-btn') as HTMLButtonElement;
const addBtn = document.querySelector('#add-btn') as HTMLButtonElement;

// HEADER CONTAINERS
const sortContainer = document.querySelector('.sort-container') as HTMLDivElement;
const addContainer = document.querySelector('.add-item-container') as HTMLDivElement;

// ADD ITEM FORM
const titleInput = document.querySelector('#title-input') as HTMLInputElement;
const categoryInput = document.querySelector('#category-input') as HTMLInputElement;
const dateInput = document.querySelector('#date-input') as HTMLInputElement;
const addItemBtn = document.querySelector('#add-item-btn') as HTMLButtonElement;

let validTitleInput = false;
let validCategoryInput = false;
let validDateInput = false;

// SORT ITEM BUTTONS
const sortByNameBtn = document.querySelector('#sort-name-btn') as HTMLButtonElement;
const sortByDeadlineBtn = document.querySelector('#sort-deadline-btn') as HTMLButtonElement;
const sortByDateAddedBtn = document.querySelector('#sort-date-added-btn') as HTMLButtonElement;

let sortBy = 'deadline';

// toDo ITEM LIST
type Item = {
  title?: string,
  category?: string,
  deadline?: Date,
  dateAddedToList?: Date,
  isChecked?: boolean,
};

let itemList: Item[] = [];

const todoItemsContainer = document.querySelector('#todo-items-container') as HTMLDivElement;

/* **********************FUNCTIONS********************** */

// Opening sort and add container
function openContainer(e: MouseEvent): void {
  const target = e.currentTarget as HTMLButtonElement;
  const targetID = target.id;

  if (targetID === 'sorting-btn') {
    sortContainer?.classList.toggle('open');
    if (addContainer?.classList.contains('open')) {
      addContainer?.classList.remove('open');
    }
  } else if (targetID === 'add-btn') {
    addContainer?.classList.toggle('open');
    if (sortContainer?.classList.contains('open')) {
      sortContainer?.classList.remove('open');
    }
  }
}

// Form validation
function validateForm(e: Event): void {
  const targetInput = e.currentTarget as HTMLInputElement;
  const targetInputValue = targetInput.value;
  const targetLabelContainer = targetInput.parentElement as HTMLLabelElement;
  const errorMsgContainer = targetLabelContainer.querySelector('.input-error') as HTMLSpanElement;

  // VALIDATE DATE INPUT
  if (targetInput.id === 'date-input') {
    // Get todays date
    const todaysFullDate = new Date();
    const todaysYear = todaysFullDate.getFullYear();
    const todaysMonth = todaysFullDate.getMonth() + 1;
    const todaysDate = todaysFullDate.getDate();

    // Get input date
    const inputSplit = targetInputValue.split('-');
    const inputYear = Number(inputSplit[0]);
    const inputMonth = Number(inputSplit[1]);
    const inputDate = Number(inputSplit[2]);

    // Compare todays date to input date (valid if input date is bigger or equal to todays date)
    if (inputYear > todaysYear && inputYear.toString().length === 4) {
      validDateInput = true;
      errorMsgContainer.innerHTML = '';
    } else if (inputYear === todaysYear && inputMonth > todaysMonth) {
      console.log('HEY!');
      validDateInput = true;
      errorMsgContainer.innerHTML = '';
    } else if (inputYear === todaysYear && inputMonth === todaysMonth && inputDate >= todaysDate) {
      validDateInput = true;
      errorMsgContainer.innerHTML = '';
    } else if (!targetInputValue) {
      validDateInput = false;
      errorMsgContainer.innerHTML = 'is Required';
    } else {
      validDateInput = false;
      errorMsgContainer.innerHTML = 'cannot be in the Past';
    }
  }

  // VALIDATE IF TITLE INPUT IS EMPTY
  if (targetInput.id === 'title-input') {
    if (targetInputValue) {
      validTitleInput = true;
      errorMsgContainer.innerHTML = '';
    } else {
      validTitleInput = false;
      errorMsgContainer.innerHTML = 'is Required';
    }
  }

  // VALIDATE IF CATEGORY INPUT IS EMPTY
  if (targetInput.id === 'category-input') {
    if (targetInputValue) {
      validCategoryInput = true;
      errorMsgContainer.innerHTML = '';
    } else {
      validCategoryInput = false;
      errorMsgContainer.innerHTML = 'is Required';
    }
  }

  if (validTitleInput && validCategoryInput && validDateInput) {
    addItemBtn?.removeAttribute('disabled');
  } else {
    addItemBtn?.setAttribute('disabled', 'true');
  }
}

// Chnaging the global sortBy variable
function changeSortItemList(e: Event): void {
  const target = e.currentTarget as HTMLButtonElement;
  const targetID = target.id;

  if (targetID === 'sort-name-btn') {
    if (sortBy === 'name') {
      sortBy = 'nameReversed';
    } else {
      sortBy = 'name';
    }
  }

  if (targetID === 'sort-deadline-btn') {
    if (sortBy === 'deadline') {
      sortBy = 'deadlineReversed';
    } else {
      sortBy = 'deadline';
    }
  }

  if (targetID === 'sort-date-added-btn') {
    if (sortBy === 'dateAdded') {
      sortBy = 'dateAddedReversed';
    } else {
      sortBy = 'dateAdded';
    }
  }
  renderList();
  sortContainer?.classList.remove('open');
}

// Sorting itemList between name, deadline or date added to list
function sortItemList(): void {
  let sortedItemList = [];
  console.log(sortBy);

  if (sortBy === 'name') {
    sortedItemList = itemList.sort((a, b) => ((a.title! < b.title!) ? -1 : 1));
  }

  if (sortBy === 'nameReversed') {
    sortedItemList = itemList.sort((a, b) => ((a.title! > b.title!) ? -1 : 1));
  }

  if (sortBy === 'deadline') {
    sortedItemList = itemList.sort((a, b) => {
      const dateA = new Date(a.deadline!);
      const dateB = new Date(b.deadline!);
      return dateA.valueOf() - dateB.valueOf();
    });
  }

  if (sortBy === 'deadlineReversed') {
    sortedItemList = itemList.sort((a, b) => {
      const dateA = new Date(a.deadline!);
      const dateB = new Date(b.deadline!);
      return dateB.valueOf() - dateA.valueOf();
    });
  }

  if (sortBy === 'dateAdded') {
    sortedItemList = itemList.sort((a, b) => {
      const dateA = new Date(a.dateAddedToList!);
      const dateB = new Date(b.dateAddedToList!);
      return dateA.valueOf() - dateB.valueOf();
    });
  }

  if (sortBy === 'dateAddedReversed') {
    sortedItemList = itemList.sort((a, b) => {
      const dateA = new Date(a.dateAddedToList!);
      const dateB = new Date(b.dateAddedToList!);
      return dateB.valueOf() - dateA.valueOf();
    });
  }
}

// Calculating deadline in days
function calculateDeadline(item: Item): number {
  const datefromJSON = new Date(item.deadline!);
  const itemDeadlineDate: number = datefromJSON.getTime();
  const todaysDate: number = new Date().getTime();
  const difference = itemDeadlineDate - todaysDate;
  const daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

// Marks a item with yellow color if deadline equal or under 5 days
function checkIfCloseDeadline(deadlineInDays: number): string {
  console.log(deadlineInDays);
  if (deadlineInDays <= 5 && deadlineInDays > 0) {
    return ' close-deadline';
  }
  if (deadlineInDays <= 0) {
    return ' after-deadline';
  }
  return '';
}

// Rendering itemList to main
function renderList(): void {
  todoItemsContainer.innerHTML = '';

  sortItemList();

  for (let i = 0; i < itemList.length; i++) {
    const item = itemList[i];
    const isChecked = checkIfChecked(item);
    const deadlineInDays = calculateDeadline(item);
    const closeDeadline = checkIfCloseDeadline(deadlineInDays);

    todoItemsContainer.innerHTML += `
    <article class="todo-item open${isChecked}${closeDeadline}">

      <button>
        <span id="${i}" class="material-symbols-outlined check-item-btn">task_alt</span>
      </button>

      <p>${item.title!}</p>

      <div class="time-left">
        <span class="material-symbols-outlined">hourglass_empty</span>
        <span>${deadlineInDays}days</span>
      </div>

      <button>
        <span id="${i}" class="material-symbols-outlined remove-item-btn">do_not_disturb_on</span>
      </button>
    
    </article>
    `;
  }
  addEventListenersToItemBtns();
  saveData();
}

// Removing item from itemList
function removeItem(e: Event): void {
  const button = e.currentTarget as HTMLSpanElement;
  const buttonID = Number(button.id);

  itemList.splice(buttonID, 1);
  renderList();
}

// Marking a toDo as done
function checkItem(e: Event): void {
  const button = e.currentTarget as HTMLSpanElement;
  const buttonID = Number(button.id);
  const item = itemList[buttonID];

  if (item.isChecked) {
    item.isChecked = false;
  } else {
    item.isChecked = true;
  }

  renderList();
}

// Visually marking an checked item
function checkIfChecked(item: Item): string {
  if (item.isChecked) {
    return ' checked';
  }
  return '';
}

// Add eventlisteners after rendering items
function addEventListenersToItemBtns(): void {
  const removeItemBtns = document.querySelectorAll('.remove-item-btn') as NodeList;
  const checkItemBtns = document.querySelectorAll('.check-item-btn') as NodeList;

  for (let i = 0; i < removeItemBtns.length; i++) {
    const removeItemBtn = removeItemBtns[i];
    removeItemBtn.addEventListener('click', removeItem);
  }

  for (let i = 0; i < checkItemBtns.length; i++) {
    const removeItemBtn = checkItemBtns[i];
    removeItemBtn.addEventListener('click', checkItem);
  }
}

// Clear form-inputs
function clearForm(): void {
  addContainer?.classList.remove('open');
  addItemBtn?.setAttribute('disabled', 'true');
  titleInput.value = '';
  categoryInput.value = '';
  dateInput.value = '';
}

// Add toDo item from form to itemList
function addItemToList(): void {
  const titleValue = titleInput?.value;
  const categoryValue = categoryInput?.value;
  const dateValue = new Date(dateInput.value);
  const dateAdded = new Date();

  const newItem: Item = {
    title: titleValue,
    category: categoryValue,
    deadline: dateValue,
    dateAddedToList: dateAdded,
    isChecked: false,
  };

  itemList.push(newItem);
  clearForm();
  renderList();
}

// Save itemList to localStorage
function saveData(): void {
  localStorage.setItem('data', JSON.stringify(itemList));
}

// Load itemList from localStorage
function loadData(): void {
  if (localStorage.getItem('data') !== null) {
    itemList = JSON.parse(localStorage.getItem('data')!) as [];
  }
}
/* **********************LOGIC********************** */

// HEADER EVENTLISTENERS
sortBtn?.addEventListener('click', openContainer);
categoriesBtn?.addEventListener('click', openContainer);
addBtn?.addEventListener('click', openContainer);

// ADD ITEM EVENTLISTENERS
titleInput?.addEventListener('blur', validateForm);
categoryInput?.addEventListener('blur', validateForm);
dateInput?.addEventListener('change', validateForm);
addItemBtn?.addEventListener('click', addItemToList);

// SORT ITEM EVENTLISTENERS
sortByNameBtn.addEventListener('click', changeSortItemList);
sortByDeadlineBtn.addEventListener('click', changeSortItemList);
sortByDateAddedBtn.addEventListener('click', changeSortItemList);

loadData();
renderList();
