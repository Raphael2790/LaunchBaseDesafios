const currentPage = window.location.pathname;
const menuItens = document.querySelectorAll('header .links a')

console.log(currentPage);
console.log(menuItens);

for(item of menuItens) {
  if(currentPage.includes(item.getAttribute("href"))){
    item.classList.add("active")
  }
}