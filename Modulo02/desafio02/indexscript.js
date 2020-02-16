const modalOverlay = document.querySelector('.modal-overlay');
const itensGrid = document.querySelectorAll('.itens')
const modalContent = document.querySelector('.modal-content');
const modal = document.querySelector('.modal')


itensGrid.forEach((item ) => {
  item.addEventListener('click', () => {
    const itemId = item.getAttribute('id');
    const itemText = item.querySelector('p').innerText
    const itemSmallText = item.querySelector('small').innerText
    console.log(itemId)
  
    modalOverlay.classList.add('active');
    modal.querySelector('img').src = `./assets/${itemId}.png`
    modal.querySelector('p').innerText = itemText;
    modal.querySelector('small').innerText = itemSmallText;
    })
})


document.querySelector('.close-modal').addEventListener('click',() => {
  modalOverlay.classList.remove('active');
})