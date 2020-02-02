const user = {
  name: 'Mariana',
  transactions: [],
  balance: 0
}

function createTransaction(transaction) {
  user.transactions.push(transaction)
}

createTransaction({type:'credit',value:50.5});
createTransaction({type:'credit',value:100.8});
createTransaction({type:'debit',value:80.4});
createTransaction({type:'debit',value:53.5});
createTransaction({ type: 'credit', value: 50 });
createTransaction({ type: 'credit', value: 120 });
createTransaction({ type: 'debit', value: 80 });
createTransaction({ type: 'debit', value: 30 });

function getHigherTransactionByType(type) {
  let higherTransaction = {
    type: '',
    value: 0,
  }

  for(transaction of user.transactions) {
    if(transaction.type === type && transaction.value > higherTransaction.value) {
      higherTransaction = transaction
    }
  }
  return higherTransaction;
}

function getAverageTransactionValue() {
  let transactionAverage = 0;

  for(transaction of user.transactions) {
    transactionAverage += transaction.value;
  }
  return transactionAverage / user.transactions.length
}

function getTransactionsCount() {
  let transactionCount = {
    debit: 0,
    credit:0,
  }

  for(transaction of user.transactions) {
    if(transaction.type === 'debit') {
      transactionCount.debit ++
    } else if (transaction.type === 'credit') {
      transactionCount.credit ++
    }
  }
  return transactionCount;
}



console.log(getAverageTransactionValue())

console.log(getHigherTransactionByType('debit'))

console.log(getHigherTransactionByType('credit'))

console.log(getTransactionsCount())