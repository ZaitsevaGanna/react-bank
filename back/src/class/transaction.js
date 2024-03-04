class Transaction {
  static TRANSACTION_TYPE_RECEIVE = 0
  static TRANSACTION_TYPE_SENDING = 1

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
    this.date = new Date()
    this.transactionType = transactionType
    this.agentId = agentId
    this.operationAmount = operationAmount
    this.balance = balance
  }

  static executeTransaction(
    senderId,
    receiverId,
    transactionType,
    amount,
    balance,
  ) {
    const transaction = new Transaction(
      senderId,
      receiverId,
      transactionType,
      amount,
      balance,
    )

    this.#list.push(transaction)

    console.log(this.#list)
    return transaction
  }

  static getList() {
    return this.#list
  }

  static getListById(userId) {
    return this.#list.filter(
      (notif) => notif.userId === Number(userId),
    )
  }
}

module.exports = { Transaction }
