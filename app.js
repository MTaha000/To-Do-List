const main = document.querySelector("main")
const addCardInput = document.querySelector(".addCard-Input")
const addCard = document.querySelector(".addCard")
const forms = document.querySelectorAll("form")
let removeCard;
let removeTask;
let cards;

let savedTasks = JSON.parse(localStorage.getItem("savedTasks")); // fetching savedTasks obj and converting

if (!savedTasks) {
  savedTasks = {};
}

addCard.addEventListener("submit", (e) => {
  e.preventDefault()

  const cardTitle = e.target[0].value;
  const card = myCreateCard(cardTitle);

  if (!cardTitle) return;

  savedTasks[cardTitle] = [];
  localStorage.setItem("savedTasks", JSON.stringify(savedTasks));

  main.insertBefore(card, addCard)
  cards = document.querySelectorAll(".card")

  removeCards()

  e.target.reset();
});

// Function Creating a cards
const myCreateCard = (cardTitle) => {

  const myDiv = document.createElement("div");
  const cardH3 = document.createElement("h3");
  const cardForm = document.createElement("form");
  const cardInput = document.createElement("input");
  const cardBtn = document.createElement("button");

  const h3Text = document.createTextNode(cardTitle);
  cardBtn.innerText = "ADD"
  myDiv.innerHTML += '<i class="fa-solid fa-xmark remove-card"></i>'

  myDiv.setAttribute("class", "card");
  cardInput.setAttribute("type", "text");
  cardInput.setAttribute("placeholder", "Add Your Task");

  cardH3.appendChild(h3Text);
  cardForm.appendChild(cardInput);
  cardForm.appendChild(cardBtn)
  myDiv.appendChild(cardH3);
  myDiv.appendChild(cardForm);

  cardForm.addEventListener("submit", addTask);

  return myDiv;
};

// Function Adding Tasks in Cards 
const addTask = (event) => {
  event.preventDefault()
  const currentForm = event.target;
  const inputValue = currentForm[0].value;
  const parent = currentForm.parentElement;
  const ticket = CreateTicket(inputValue);

  if (!inputValue) return;

  const h3Value = parent.children[1].innerText;

  // Data saved in localStorage Start
  if (!Array.isArray(savedTasks[h3Value])) {
    savedTasks[h3Value] = [];
  }
  savedTasks[h3Value].push(inputValue);
  localStorage.setItem("savedTasks", JSON.stringify(savedTasks)); // saving data after adding each task
  // Data saved in localStorage End 

  parent.appendChild(ticket)

  cards = document.querySelectorAll(".card")
  buttons = document.querySelectorAll("button")

  Draging(ticket);

  removeTasks()

  currentForm.reset();
}

// Function Creating a Tasks
function CreateTicket(value) {
  const para = document.createElement("p")
  const elementText = document.createTextNode(value);

  para.appendChild(elementText);
  para.innerHTML += '<i class="fa-solid fa-xmark removeTask"></i>'
  para.setAttribute("draggable", "true");
  return para;
}

// Theme Change
const header = document.querySelector("header")
let buttons;
let theme = "dark"

const themeChange = () => {
  buttons = document.querySelectorAll("buttons");

  if (theme === "dark") {
    main.style.backgroundColor = "white"
    header.style.backgroundColor = "rgb(124, 196, 230)"
    header.style.color = "black"
    addCard.style.backgroundColor = "rgb(124, 196, 230)"
    addCardInput.style.backgroundColor = "rgb(124, 196, 230)"
    buttons.forEach((btn) => {
      btn.style.color = "white"
      btn.style.backgroundColor = "rgb(41, 41, 41)"
      btn.style.border = "1px solid white"
    })
    theme = "light"
  } else {
    main.style.backgroundColor = "rgb(41, 41, 41)"
    header.style.backgroundColor = "rgb(2, 5, 39"
    header.style.color = "white"
    addCard.style.backgroundColor = "white"
    addCardInput.style.backgroundColor = "white"
    buttons.forEach((btn) => {
      btn.style.color = "black"
      btn.style.backgroundColor = "white"
      btn.style.border = "1px solid black"
    })
    theme = "dark"
  }
}

for (const title in savedTasks) {
  const card = myCreateCard(title);
  const arrayOfTasks = savedTasks[title];

  for (const taskValue of arrayOfTasks) {
    const task = CreateTicket(taskValue);
    card.appendChild(task)
    Draging(task)
  }
  main.insertBefore(card, addCard);
}

const clearBtn = document.querySelector(".clearBtn")
clearBtn.addEventListener("click", () => {
  localStorage.clear()
  location.reload()
})

cards = document.querySelectorAll(".card")

function Draging(target) {
  target.addEventListener("dragstart", (e) => {
    let selected = e.target;
    const prop = selected.parentElement.children[1].innerText
    const index = savedTasks[prop].indexOf(selected.innerText)
    savedTasks[prop].splice(index, 1)

    cards.forEach((card) => {
      card.addEventListener("dragover", (e) => {
        e.preventDefault();
      })

      card.addEventListener("drop", (e) => {

        card.appendChild(selected);
        savedTasks[e.target.children[1].innerText].push(selected.innerText)
        localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
        selected = null;
      })
    })
  })
}

// Removing Tasks saved in local storage 
function removeTasks() {
  removeTask = document.querySelectorAll(".removeTask")
  removeTask.forEach((i) => {

    i.addEventListener("click", (e) => {
      const objectProp = e.target.parentElement.parentElement.children[1].innerText;
      let currentTask = e.target.parentElement;
      let currentCard = e.target.parentElement.parentElement;
      const index = savedTasks[objectProp].indexOf(currentTask.innerText);

      savedTasks[objectProp].splice(index, 1)
      currentCard.removeChild(currentTask);
      localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
      currentTask = null;
    })
  })
}
removeTasks()

// Removing Cards saved in local storage 
function removeCards() {
  removeCard = document.querySelectorAll(".remove-card")
  removeCard.forEach((i) => {

    i.addEventListener("click", (e) => {
      let prop = e.target.parentElement.children[1].innerText;

      delete savedTasks[prop];
      main.removeChild(e.target.parentElement)
      localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
    })
  })
}
removeCards()
