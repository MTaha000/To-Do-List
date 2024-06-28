const main = document.querySelector("main")
const container = document.getElementById("container")
const addCardBtn = document.querySelector(".addCard")
const forms = document.querySelectorAll("form")

let cards;

addCardBtn.addEventListener("click", () => {
  const cardTitle = prompt("enter card name?");

  const card = myCreateCard(cardTitle);
  main.insertBefore(card, addCardBtn)

});

const myCreateCard = (cardTitle) => {

  const myDiv = document.createElement("div");
  const cardH3 = document.createElement("h3");
  const cardForm = document.createElement("form");
  const cardInput = document.createElement("input");
  const cardBtn = document.createElement("button");

  const h3Text = document.createTextNode(cardTitle);
  cardBtn.innerText = "ADD"

  myDiv.setAttribute("class", "card");
  cardInput.setAttribute("type", "text");
  cardInput.setAttribute("placeholder", "Add Your Task");

  cardH3.appendChild(h3Text);
  cardForm.appendChild(cardInput);
  cardForm.appendChild(cardBtn)
  myDiv.appendChild(cardH3);
  myDiv.appendChild(cardForm);

  cardForm.addEventListener("submit", addTask);
  cards = document.querySelectorAll(".card")

  return myDiv;
};


const addTask = (event) => {
  event.preventDefault()
  const currentForm = event.target;
  const inputValue = currentForm[0].value;
  const parent = currentForm.parentElement;
  const ticket = CreateTicket(inputValue);

  const h3Value = parent.children[0].innerText;

  // Data saved in localStorage Start
  if (!Array.isArray(savedTasks[h3Value])) {
    savedTasks[h3Value] = [];
  }
  savedTasks[h3Value].push(inputValue);
  localStorage.setItem("savedTasks", JSON.stringify(savedTasks)); // saving data after adding each task
  // Data saved in localStorage End 

  parent.appendChild(ticket)

  cards = document.querySelectorAll(".card")

  ticket.addEventListener("dragstart", (e) => {
    let selected = e.target;

    cards.forEach((card) => {
      card.addEventListener("dragover", (e) => {
        e.preventDefault();
      })

      card.addEventListener("drop", () => {
        card.appendChild(selected);
        selected = null;
      })
    })

  })

  const removeTask = document.querySelectorAll("i")
  removeTask.forEach((i) => {
    i.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    })
  })

  currentForm.reset();
}

let savedTasks = JSON.parse(localStorage.getItem("savedTasks")); // fetching savedTasks obj and converting

if (!savedTasks) {
  savedTasks = {};
}

function CreateTicket(value) {
  const para = document.createElement("p")
  const elementText = document.createTextNode(value);

  para.appendChild(elementText);
  para.innerHTML += '<i class="fa-solid fa-xmark"></i>'
  para.setAttribute("draggable", "true");
  return para;
}

// Theme Change
const header = document.querySelector("header")
const buttons = document.querySelectorAll("button")
const darkMode = document.querySelector(".themeBtn .fa-moon")
let theme = "dark"

const themeChange = () => {
  if (theme === "dark") {
    main.style.backgroundColor = "white"
    header.style.backgroundColor = "rgb(145, 145, 145)"
    header.style.color = "black"
    buttons.forEach((btn) => {
      btn.style.color = "white"
      btn.style.backgroundColor = "black"
    })
    darkMode.style.color = "black"
    theme = "light"
  } else {
    main.style.backgroundColor = "rgb(41, 41, 41)"
    header.style.backgroundColor = "black"
    header.style.color = "white"
    buttons.forEach((btn) => {
      btn.style.color = "black"
      btn.style.backgroundColor = "white"
    })
    theme = "dark"
  }
}