const empresa = {
  nome:'Rocketseats',
  cor:'Roxo',
  foco:'Programação',
  endereço: {
    rua:'Rua Guilherme Gembala',
    numero:260,
  }
}

console.log(`A empresa ${empresa.nome} está localizada em ${empresa.endereço.rua}, ${empresa.endereço.numero}`);

const programadores = {
  nome:'Raphael',
  idade:29,

}
const tecnologias= {
  propriedades:[
    {
      nome:'C++',
      especialidade:'Desktop'
    },
    {
      nome:'Python',
      especialidade:'Data Science',
    },
    {
      nome:'Javascript',
      especialidade:'Web/Mobile'
    }
  ]
}

console.log(`O usuário ${programadores.nome} tem ${programadores.idade} e usa a tecnologia 
${tecnologias.propriedades[2].nome} com especialidade em ${tecnologias.propriedades[2].especialidade}`)