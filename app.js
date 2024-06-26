const cards = document.querySelectorAll(".card")

const addTask = (event) => {
  event.preventDefault()
  const currentForm = event.target;
  const inputValue = currentForm[0].value;
  const parent = currentForm.parentElement;
  const ticket = CreateTicket(inputValue);
  localStorage.setItem("Data",inputValue)
  localStorage.getItem("Data")
  parent.appendChild(ticket)

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
  currentForm.reset();
}

cards.forEach((card) => {
  const form = card.lastElementChild

  form.addEventListener("submit", addTask)
})

function CreateTicket(value) {
  const para = document.createElement("p")
  const elementText = document.createTextNode(value);
  para.setAttribute("draggable", "true");
  para.appendChild(elementText);

  return para;
}
