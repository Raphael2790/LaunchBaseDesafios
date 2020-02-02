const users = [
  {
    name: 'Salvio',
    revenues: [115.3, 48.7, 98.3, 14.5],
    expenses: [85.3, 13.5, 19.9]
  },
  {
    name: 'Marcio',
    revenues: [24.6, 214.3, 45.3],
    expenses: [185.3, 12.1, 120.0]
  },
  {
    name: 'Lucia',
    revenues: [9.8, 120.3, 340.2, 45.3],
    expenses: [450.2, 29.9]
  }
]

function sumNumbers(numbers) {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
  }

  return sum;
}

function calcuteBalance(revenues, expenses) {
  let balance = 0;
  
  balance = sumNumbers(revenues) - sumNumbers(expenses);
  
  return balance
}

for (let i = 0; i < users.length; i++) {
  let balance = calcuteBalance(users[i].revenues, users[i].expenses);

  if (balance < 0) {
    console.log(`${users[i].name} possui balance NEGATIVO de ${balance}`);
  } else {
    console.log(`${users[i].name} possui balance POSITIVO de ${balance}`);
  }

}