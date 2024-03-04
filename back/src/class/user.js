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
    return (
      this.#list.find(
        (user) =>
          user.email === String(email).toLowerCase(),
      ) || null
    )
  }

  static getById(id) {
    return (
      this.#list.find((user) => user.id === Number(id)) ||
      null
    )
  }

  static getList() {
    return this.#list
  }

  static isExists(email) {
    return this.getByEmail(email) !== null
  }

  static regenerateCode(user) {
    user.code = Math.floor(Math.random() * 10000 + 1000)
  }
}

module.exports = { User }
