const { PaymentSystem } = require('./paymentSystem.js')

class Notification {
  static NOTIFICATION_TYPE_NEW_CREDIT_UNKNOWN = 0
  static NOTIFICATION_TYPE_NEW_DEBIT = 1
  static NOTIFICATION_TYPE_NEW_CREDIT_STRIPE = 2
  static NOTIFICATION_TYPE_NEW_CREDIT_COINBASE = 3
  static NOTIFICATION_TYPE_NEW_CREDIT_FRIEND = 4
  static NOTIFICATION_TYPE_NEW_LOGIN = 5

  static #list = []
  static #count = 1

  constructor({ userId, type, message }) {
    this.id = Notification.#count++
    this.userId = userId
    this.date = new Date().toLocaleString('uk-UA')
    this.type = type
    this.message = message
  }

  static createNotification(userId, type, message) {
    const notification = new Notification({
      userId,
      type,
      message,
    })

    this.#list.push(notification)

    return notification
  }

  static createLogin(userId) {
    return this.createNotification(
      userId,
      Notification.NOTIFICATION_TYPE_NEW_LOGIN,
      'New login',
    )
  }

  static createDebit(userId, amount, transId) {
    return this.createNotification(
      userId,
      Notification.NOTIFICATION_TYPE_NEW_DEBIT,
      `You send  ${amount} USD. Transaction ID: ${transId}`,
    )
  }

  static createCredit(userId, amount, transId, systemType) {
    let msg = `New reward system  ${amount} USD. Transaction ID: ${transId}`
    let st =
      Notification.NOTIFICATION_TYPE_NEW_CREDIT_UNKNOWN
    switch (systemType) {
      case PaymentSystem.COINBASE:
        st =
          Notification.NOTIFICATION_TYPE_NEW_CREDIT_COINBASE
        break
      case PaymentSystem.STRIPE:
        st =
          Notification.NOTIFICATION_TYPE_NEW_CREDIT_STRIPE
        break
      case PaymentSystem.FRIEND:
        st =
          Notification.NOTIFICATION_TYPE_NEW_CREDIT_FRIEND
        msg = `Your friend send you ${amount} USD. Transaction ID: ${transId}`
        break
      default:
        throw new Error(
          `Invalid payment system. System type: ${systemType}`,
        )
    }

    return this.createNotification(userId, st, msg)
  }

  static getList() {
    return this.#list
  }

  static getListById(userId) {
    return this.#list.filter(
      (notif) => notif.userId === Number(userId),
    )
  }

  //static fillFakeNotifications() {
    // Notification.createLogin(2)
    // Notification.createDebit(2, 20, 1)
    // Notification.createCredit(
    //   3,
    //   40,
    //   2,
    //   PaymentSystem.STRIPE,
    // )
    // Notification.createCredit(
    //   3,
    //   100,
    //   3,
    //   PaymentSystem.COINBASE,
    // )
    // Notification.createCredit(
    //   1,
    //   200,
    //   4,
    //   PaymentSystem.FRIEND,
    // )
  //}
}

module.exports = {
  Notification,
}
