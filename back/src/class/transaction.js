class Transaction {
  static TRANSACTION_TYPE_UNKNOWN = 0
  static TRANSACTION_TYPE_SENDING = 1
  static TRANSACTION_TYPE_RECEIVE_STRIPE = 2
  static TRANSACTION_TYPE_RECEIVE_COINBASE = 3
  static TRANSACTION_TYPE_RECEIVE_FRIEND = 4

  static #list = []
  static #count = 1

  constructor({
    userId,
    agentId,
    transactionType,
    operationAmount,
    balance,
  }) {
    this.id = Transaction.#count++
    this.userId = userId
    this.date = new Date().toLocaleString('uk-UA')
    this.transactionType = transactionType
    this.agentId = agentId
    this.operationAmount = operationAmount
    this.balance = balance
  }

  static executeTransaction(
    userId,
    agentId,
    transactionType,
    operationAmount,
  ) {
    let balance = Transaction.getBalanceByUserId(userId)
    switch (transactionType) {
      case this.TRANSACTION_TYPE_RECEIVE_FRIEND:
      case this.TRANSACTION_TYPE_RECEIVE_STRIPE:
      case this.TRANSACTION_TYPE_RECEIVE_COINBASE:
        balance += operationAmount
        break
      case this.TRANSACTION_TYPE_SENDING:
        balance -= operationAmount
        break
      default:
        throw new Error('Unknown transaction type.')
    }
    const transaction = new Transaction({
      userId,
      agentId,
      transactionType,
      operationAmount,
      balance,
    })

    console.log('>>>transaction', transaction)
    this.#list.push(transaction)

    console.log('>>>Список трансакций', this.#list)
    return transaction
  }

  static getList() {
    return this.#list
  }

  static getListById(userId) {
    return (
      this.#list.filter(
        (trans) => trans.userId === Number(userId),
      ) || []
    )
  }

  static getTransById(transId) {
    return this.#list.find(
      (trans) => trans.id === Number(transId),
    )
  }

  static getBalanceByUserId(userId) {
    const ls = Transaction.getListById(userId)
    if (ls.length > 0) {
      return ls[ls.length - 1].balance
    }
    return 0
  }

  static getBalanceByUserlist(ls) {
    if (ls && ls.length > 0) {
      return ls[ls.length - 1].balance
    }
    return 0
  }

  static getTransactionDtos(userId, pageSize) {
    const transactions = Transaction.getListById(userId)

    const last7Trans =
      transactions.length >= pageSize
        ? transactions.slice(-pageSize)
        : transactions

    const balance =
      Transaction.getBalanceByUserlist(last7Trans)

    return { balance, last7Trans }
  }
}

class TransactionDto {
  constructor(
    id,
    agentEmail,
    date,
    transactionType,
    operationAmount,
  ) {
    this.id = id
    this.agentEmail = agentEmail
    this.date = date.toLocaleString('uk-UA')
    this.transactionType = transactionType
    this.operationAmount = operationAmount
  }
}

module.exports = { Transaction, TransactionDto }
