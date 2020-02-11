const modalOverlay = document.querySelector('.modal-overlay');
const itensGrid = document.querySelectorAll('.modal')

itensGrid.forEach((item) => {
  item.addEventListener('click', () => {
    modalOverlay.classList.add('active');
  })
})

document.querySelector('.close-modal').addEventListener('click',() => {

})