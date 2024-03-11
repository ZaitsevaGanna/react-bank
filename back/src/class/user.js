class User {
  static #list = []

  static #count = 1

  constructor({ email, password }) {
    this.id = User.#count++
    this.email = String(email).toLowerCase()
    this.password = String(password)
    this.isConfirm = false
    User.regenerateCode(this)
  }

  static create(data) {
    const user = new User(data)

    this.#list.push(user)
    console.log(this.#list)
    return user
  }

  static getByEmail(email) {
    return this.#list.find(
      (user) => user.email === email.toLowerCase(),
    )
  }

  static getById(id) {
    return (
      this.#list.find((user) => user.id === Number(id)) ||
      null
    )
  }

  static getEmailById(id) {
    const user = this.#list.find(
      (user) => user.id === Number(id),
    )
    return user ? user.email : null
  }

  static getByPass(pass) {
    return this.#list.find(
      (user) => user.password === pass.toLowerCase(),
    )
  }
  static getList() {
    return this.#list
  }

  static regenerateCode(user) {
    user.code = Math.floor(Math.random() * 10000 + 1000)
  }
}

module.exports = { User }
