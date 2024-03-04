const { Transaction } = require('./transaction.js')
const { Notification } = require('./notification.js')

class Payment {
  static credit(
    userId,
    agentId,
    amount,
    oldUserBalance,
    oldAgentBalance,
  ) {
    let trans = Transaction.executeTransaction(
      userId,
      agentId,
      Transaction.TRANSACTION_TYPE_RECEIVE,
      amount,
      oldUserBalance + amount,
    )

    Notification.createCredit(userId, amount, trans.id)

    trans = Transaction.executeTransaction(
      agentId,
      userId,
      Transaction.TRANSACTION_TYPE_SENDING,
      amount,
      oldAgentBalance - amount,
    )

    Notification.createDebit(agentId, amount, trans.id)
  }

  static debit(
    userId,
    agentId,
    amount,
    oldUserBalance,
    oldAgentBalance,
  ) {
    Transaction.executeTransaction(
      userId,
      agentId,
      Transaction.TRANSACTION_TYPE_SENDING,
      amount,
      oldUserBalance - amount,
    )

    Transaction.executeTransaction(
      agentId,
      userId,
      Transaction.TRANSACTION_TYPE_RECEIVE,
      amount,
      oldAgentBalance + amount,
    )
  }
}

module.exports = { Payment }
