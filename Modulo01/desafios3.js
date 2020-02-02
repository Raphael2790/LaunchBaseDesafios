const usuarios = [
  {nome:'Raphael',tecnologias:['Javascript','Node.js']},
  {nome:'Carlos',tecnologias:['CSS','Javascript']},
  {nome:'Tuane',tecnologias:['Bootstrap','CSS']}
]

for(user of usuarios) {
  console.log(`${user.nome} trabalha com ${user.tecnologias}`)
}

function checaSeUsuarioUsaCSS(usuario) {
  let trueOrFalse;
  for(let i =0 ; i < usuario.tecnologias.length; i++) {
      if(usuario.tecnologias[i] === 'CSS') {
        return trueOrFalse = true;
      }else {
        trueOrFalse = false;
      }
    }
    return trueOrFalse;
  }

for(let i = 0; i < usuarios.length; i++) {
  const usuarioTrabalhaComCSS = checaSeUsuarioUsaCSS(usuarios[i]);
  if(usuarioTrabalhaComCSS) {
    console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`)
  }
}
