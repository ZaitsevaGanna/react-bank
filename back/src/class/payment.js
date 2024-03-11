const { Transaction } = require('./transaction.js')
const { Notification } = require('./notification.js')
const { PaymentSystem } = require('./paymentSystem.js')

class Payment {
  static credit(userId, agentId, amount, systemType) {
    let st = Transaction.TRANSACTION_TYPE_RECEIVE_FRIEND
    switch (systemType) {
      case PaymentSystem.COINBASE:
        st = Transaction.TRANSACTION_TYPE_RECEIVE_COINBASE
        break
      case PaymentSystem.STRIPE:
        st = Transaction.TRANSACTION_TYPE_RECEIVE_STRIPE
        break
      case PaymentSystem.FRIEND:
        st = Transaction.TRANSACTION_TYPE_RECEIVE_FRIEND

        break
      default:
        throw new Error(
          `Invalid payment system. System type: ${systemType}`,
        )
    }

    let trans = Transaction.executeTransaction(
      userId,
      agentId,
      st,
      amount,
    )

    Notification.createCredit(
      userId,
      amount,
      trans.id,
      systemType,
    )
  }

  static debit(userId, agentId, amount, systemType) {
    try {
      let trans = Transaction.executeTransaction(
        userId,
        agentId,
        Transaction.TRANSACTION_TYPE_SENDING,
        amount,
      )

      Notification.createDebit(userId, amount, trans.id)

      trans = Transaction.executeTransaction(
        agentId,
        userId,
        Transaction.TRANSACTION_TYPE_RECEIVE_FRIEND,
        amount,
      )

      Notification.createCredit(
        agentId,
        amount,
        trans.id,
        PaymentSystem.FRIEND,
      )
    } catch (err) {
      console.log('>>>>>>>> debit', err)
    }
  }
}
module.exports = { Payment }
