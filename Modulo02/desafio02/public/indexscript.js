const itensGrid = document.querySelectorAll(".itens");
const showHide = document.querySelectorAll(".span");
const show = document.querySelectorAll(".show");
const emptyDiv = document.querySelectorAll(".hidden");

itensGrid.forEach((item) => {
  item.addEventListener("click", () => {
    const ID = item.getAttribute("id");
    window.location.href = `/receita/${ID}`;
  });
});

showHide.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (item.innerText === "ESCONDER") {
      show[index].classList.add("hide");
      emptyDiv[index].classList.remove("hide");
      item.innerText = "mostrar";
    } else if (item.innerText === "MOSTRAR") {
      show[index].classList.remove("hide");
      emptyDiv[index].classList.add("hide");
      item.innerText = "esconder";
    }
  });
});

// === Logica para adicionar ingredients === //
function addIngredients(event) {
  event.preventDefault();
  const divIngredients = document.getElementById("ingredient");
  const inputIngredients = document.getElementById("ingred");
  const input = document.createElement("input");

  input.setAttribute("name", "ingred");
  input.setAttribute("type", "text");
  input.classList.add("add-input");

  if (inputIngredients.value == "") {
    inputIngredients.innerText = "Digite algum passo por favor!";
  }
  input.value = inputIngredients.value;
  divIngredients.appendChild(input);

  inputIngredients.value = "";
}

function addSteps(event) {
  event.preventDefault();
  const divPrepare = document.getElementById("prepared");
  const inputStep = document.getElementById("prepare");
  const input = document.createElement("input");
  input.setAttribute("name", "prepare");
  input.setAttribute("type", "text");
  input.classList.add("add-input");

  if (inputStep.value == "") {
    inputStep.innerText = "Digite algum passo por favor!";
  }
  input.value = inputStep.value;

  divPrepare.appendChild(input);

  inputStep.value = "";
}

document
  .querySelector(".add-ingredient")
  .addEventListener("click", addIngredients);

document.querySelector(".add-step").addEventListener("click", addSteps);
