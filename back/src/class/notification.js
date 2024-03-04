class Notification {
  static NOTIFICATION_TYPE_NEW_LOGIN = 0
  static NOTIFICATION_TYPE_NEW_DEBIT = 1
  static NOTIFICATION_TYPE_NEW_CREDIT = 2

  static #list = []
  static #count = 1

  constructor({ userId, type, message }) {
    this.id = Notification.#count++
    this.userId = userId
    this.date = new Date()
    this.type = type
    this.message = message
  }

  static createNotification(
    userId,
    type,
    message,
    amount = 0.0,
  ) {
    const notification = new Notification({
      userId,
      type,
      message,
      amount,
    })

    this.#list.push(notification)
    console.log(this.#list)
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
      `You send (amount: ${amount} USD. Transaction ID: ${transId})`,
    )
  }

  static createCredit(userId, amount, transId) {
    return this.createNotification(
      userId,
      Notification.NOTIFICATION_TYPE_NEW_CREDIT,
      `New reward system (amount: ${amount} USD. Transaction ID: ${transId})`,
    )
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

module.exports = {
  Notification,
}
