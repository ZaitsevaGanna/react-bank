class UserSession {
  static #list = []

  constructor(user) {
    this.user = {
      isConfirm: user.isConfirm,
      email: user.email,
      id: user.id,
    }
    this.token = Session.generateToken()
  }

  static generateToken = () => {
    const length = 6
    const characters =
      'AaBbCcDdEeFfGgHhJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length,
      )
      result += characters[randomIndex]
    }
    return result
  }

  static create = (user) => {
    const session = new UserSession(user)
    this.#list.push(session)
    return session
  }

  static get = (token) => {
    return this.#list.find(
      (item) => item.token === token || null,
    )
  }
}

module.exports = { UserSession }
console.log('Token:', Session.generateToken())
