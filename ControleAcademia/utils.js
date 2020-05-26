module.exports = {
  age: function(timestamp) {
    const today = new Date();
    const birth = new Date(timestamp);
  
    let age = today.getFullYear() - birth.getFullYear()
    const month = today.getMonth() - birth.getMonth()
  
    if(month < 0 || month == 0 && today.getDate() < birth.getDate()) {
      return age = age - 1
    }
  
    return age
  },
  date: function(timestamp) {
    const date = new Date(timestamp);

    //UTC - formato data universal
    const year = date.getUTCFullYear();

    const month = `0${date.getUTCMonth() + 1}`.slice(-2);

    const day = `0${date.getUTCDate()}`.slice(-2);

    return `${year}-${month}-${day}`
  },
  split: function(string) {
    return string.split(',')
  },
  graduation: function(string) {
    const graduations = [ "Médio", "Superior", "Doutorado", "Mestrado"]

    const grade = graduations.filter((item) => {
      if(string.indexOf(item) > -1) return item})

      return grade
  }
}

