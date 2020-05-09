const itensGrid = document.querySelectorAll('.itens')



itensGrid.forEach((item, index) => {
  item.addEventListener('click', () => {
    window.location.href = `/receitas/${index}`
    })
})