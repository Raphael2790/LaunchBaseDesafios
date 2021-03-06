const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const modal = document.querySelector('.modal')


for(let card of cards) {
  card.addEventListener('click', () => {
    const modalId = card.getAttribute('id')
    window.open(`https://rocketseat.com.br/${modalId}`,'_blank');
  })
}

/*document.querySelector('.close-modal').addEventListener('click', () => {
  modalOverlay.classList.remove('active');
  modal.classList.remove('maximize')
});

document.querySelector('.maximize-modal').addEventListener('click', () => {
  modal.classList.add('maximize')
})
*/