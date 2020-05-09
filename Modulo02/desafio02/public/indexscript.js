const itensGrid = document.querySelectorAll('.itens')
const showHide = document.querySelectorAll('.span')
const show = document.querySelectorAll('.show');
const emptyDiv = document.querySelectorAll('.hidden')


itensGrid.forEach(item => {
  item.addEventListener('click', () => {
    const ID = item.getAttribute('id')
    window.location.href = `/receita/${ID}`
    })
})

showHide.forEach((item, index) => {
    item.addEventListener('click', () => {
      if(item.innerText === 'ESCONDER') {
      show[index].classList.add('hide')
      emptyDiv[index].classList.remove('hide')
      item.innerText = 'mostrar'
      } else if(item.innerText === 'MOSTRAR') {
        show[index].classList.remove('hide')
        emptyDiv[index].classList.add('hide')
        item.innerText = 'esconder'
      }
  })
})