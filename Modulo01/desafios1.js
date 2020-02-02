const nome = 'Raphael';
const peso = 72;
const altura = 1.7;
const sexo = 'M';
const idade = 59;
const contribuicao = 35;


const imc = peso / ( altura * altura );

if(imc >= 30) {
  console.log(`${nome} você está acima do peso`)
} else {
  console.log(`${nome} você não está acima do peso`)
}

if(sexo === 'M' && contribuicao === 35 || sexo === 'F' && contribuicao === 30) {
  if(sexo === 'M' && (idade + contribuicao >= 95) || sexo === 'F' && (idade + contribuicao >= 85) ) {
    console.log(`${nome},Parabens você já pode se aposentar`)
  } else {
    console.log(`${nome},OK! Porém sua aposentadoria é influenciada pelo fator previdenciário`)
  }
} else {
  console.log(`${nome}, Desculpe mas você ainda não pode aposentar`)
}