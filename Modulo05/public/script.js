const currentPage = window.location.pathname;
const menuItens = document.querySelectorAll('header .links a');

for(item of menuItens) {
  if(currentPage.includes(item.getAttribute("href"))){
    item.classList.add("active");
  }
}

const menuItensDesafios = document.querySelectorAll('header .links-desafios a');

for(item of menuItensDesafios) {
  if(currentPage.includes(item.getAttribute("href"))){
    item.classList.add("active");
  }
}