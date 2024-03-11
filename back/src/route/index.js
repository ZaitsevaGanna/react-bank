const jwt = require('jsonwebtoken')

const express = require('express')
const cors = require('cors')
const router = express.Router()

const cookieParser = require('cookie-parser')
const app = express()

const { User } = require('../class/user')
const { Notification } = require('../class/notification')
const { Payment } = require('../class/payment')
const {
  Transaction,
  TransactionDto,
} = require('../class/transaction')

router.use(cors())
router.use(express.json())
app.use(cookieParser())

const idEmailMap = new Map()

const secretKey = process.env.JWT_SECRET

//Notification.fillFakeNotifications()

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res
      .status(401)
      .json({ error: 'Access denied. Token not provided.' })
  }
  console.log(
    '>=============env.process.JWT_SECRET',
    env.process.JWT_SECRET,
  )
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: 'Invalid token.' })
    }
    console.log('>=============jwt user', user)
    req.user = user
    next()
  })
}
//данные нотификаций

router.get('/notifications', (req, res) => {
  const id = req.query.id

  const notifications = id
    ? Notification.getListById(id)
    : Notification.getList()

  const last7Notif =
    notifications.length >= 7
      ? notifications.slice(-7)
      : notifications

  last7Notif.reverse()

  res.status(200).json(last7Notif)
})

// данные пользователей 
user1 = User.create({
  email: 'test@mail.com',
  password: 123456,
})
user1.isConfirm = true

user2 = User.create({
  email: 'test1@mail.com',
  password: 1234561,
})
user2.isConfirm = true

user3 = User.create({
  email: 'test2@mail.com',
  password: 1234562,
})
user3.isConfirm = true

router.get('/users', (req, res) => {
  const users = User.getList()

  res.status(200).json(users)
})

router.post('/signin', (req, res) => {
  const { email, password } = req.body

  if (email && password) {
    try {
      const usr = User.getByEmail(email)

      if (
        usr &&
        usr.password === password &&
        usr.isConfirm === true
      ) {
        console.log(usr)
        try {
          const user = {
            id: usr.id,
            email: usr.email,
          }

          // Создание JWT-токена и запись его в куки
          const token = jwt.sign(user, secretKey)

          console.log('токен', token)

          res.cookie('accessToken', token, {
            httpOnly: true,
          })

          console.log('cookie', res.cookie)

          res.json({
            message: 'Куки успешно установлены',
            token,
            user,
          })

          Notification.createLogin(user.id)
        } catch (error) {
          console.error('Error creating token:', error)
          res
            .status(500)
            .json({ error: 'Internal Server Error' })
        }

        // return res.status(200).json({
        //   message: 'Всё ОК!',
        // })
      } else
        res.status(400).json({ message: 'Не вірні данні' })
    } catch (e) {
      res.status(500).json({
        message: 'Виникла помилка!',
        err: JSON.stringify(e),
      })
    }
  } else {
    res
      .status(400)
      .json({ message: 'Не всі данні введені' })
  }
})

router.get('/balance', (req, res) => {
  const cookies = req.cookies

  console.log('>>>>>кукиииии>>>>>', cookies.accessToken)
  const userId = +req.query.id
  try {
    const { balance, last7Trans } =
      Transaction.getTransactionDtos(userId, 7)

    const transDtoArray = []

    for (let i = last7Trans.length - 1; i >= 0; i--) {
      const trans = last7Trans[i]
      let agentEmail = undefined
      if (trans.agentId) {
        if (idEmailMap.has(trans.agentId)) {
          agentEmail = idEmailMap.get(trans.agentId)
        } else {
          agentEmail = User.getEmailById(trans.agentId)
          idEmailMap.set(trans.agentId, agentEmail)
        }
      }
      transDtoArray.push(
        new TransactionDto(
          trans.id,
          agentEmail,
          trans.date,
          trans.transactionType,
          trans.operationAmount,
        ),
      )
    }

    const result = {
      userId: userId,
      balanceAmount: balance,
      transactions: transDtoArray,
    }

    res.status(200).json(result)
  } catch (error) {
    console.log('>>>>>>>>>>>>', error)
  }
})

router.get(
  '/transaction',
  // authenticateToken,
  (req, res) => {
    const cookies = req.cookies

    console.log('кукиииии', cookies)

    const transId = +req.query.transId
    const transaction = Transaction.getTransById(transId)

    if (!transaction) {
      return res
        .status(400)
        .json({ message: 'Трансакція не знайдена' })
    }

    const agentEmail = User.getEmailById(
      transaction.agentId,
    )

    return res.status(200).json({
      date: transaction.date,
      agentEmail: agentEmail,
      type: transaction.transactionType,
      operationAmount: transaction.operationAmount,
    })
  },
)

router.post('/settingsEmail', (req, res) => {
  const { userId, oldEmail, newEmail } = req.body
  if (oldEmail && newEmail) {
    try {
      const user = User.getByEmail(oldEmail)

      if (user.id == userId) {
        user.email = newEmail

        return res.status(200).json({
          message: 'Все OK',
        })
      } else {
        return res
          .status(400)
          .json({ message: 'Не всі данні введені' })
      }
    } catch (e) {
      return res.status(500).json({
        message: 'Виникла помилка!',
      })
    }
  }
})

router.post('/settingsPass', (req, res) => {
  const { userId, oldPass, newPass } = req.body
  if (oldPass && newPass) {
    try {
      const user = User.getByPass(oldPass)

      if (user.id == userId) {
        user.password = newPass

        return res.status(200).json({
          message: 'Все OK',
        })
      } else {
        return res
          .status(400)
          .json({ message: 'Не всі данні введені' })
      }
    } catch (e) {
      return res.status(500).json({
        message: 'Виникла помилка!',
      })
    }
  }
})
router.post('/signup', (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    try {
      if (User.getByEmail(email)) {
        return res.status(409).json({
          message: 'Користувач з таким email вже існує',
        })
      }
      const usr = User.create({ email, password })
      // console.log('Данные от клиента:', email, password)

      return res.status(200).json({
        id: usr.id,
        code: usr.code,
        message: 'Інфа відправлена',
      })
    } catch (e) {
      return res.status(500).json({
        message: 'Виникла помилка!',
      })
    }
  } else {
    console.log('Не всі данні введені')
    return res
      .status(400)
      .json({ message: 'Не всі данні введені' })
  }
})

router.post('/signup-confirm', (req, res) => {
  const { id, code } = req.body

  console.log(`>===== Kод и id юзера: ${code}, ${id}`)

  if (!id) {
    return res.status(400).json({
      message: 'Отсутствует идентификатор пользователя',
    })
  }

  try {
    const usr = User.getById(id)

    if (usr.code == code) {
      usr.isConfirm = true

      return res.status(200).json()
    }

    return res.status(404).json({ message: 'Код не існує' })
  } catch (e) {
    console.error('Error creating token:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/recovery-confirm', (req, res) => {
  const { id, userCode, newUserPassword } = req.body

  console.log(`>===== Kод и id юзера: ${userCode}, ${id}`)

  const usr = User.getById(id)

  if (usr.code == userCode) {
    console.log(
      `>===== newUserPassword: ${newUserPassword}`,
    )
    console.log(`>===== usr.password: ${usr.password}`)
    usr.password = newUserPassword
    Notification.createLogin(usr.id)

    console.log(
      `>===== usr.password (after): ${usr.password}`,
    )

    return res.status(200).json()
  }

  return res.status(404).json({ message: 'Код не існує' })
})

router.post('/recovery', (req, res) => {
  const { email } = req.body
  if (email) {
    try {
      const usr = User.getByEmail(email)

      if (usr.email) {
        User.regenerateCode(usr)

        console.log(usr.code)

        return res.status(200).json({
          id: usr.id,
          code: usr.code,
          message: 'Користувач з таким email вже існує',
        })
      } else {
        return res.status(400)
      }
    } catch (e) {
      return res.status(500).json({
        message: 'Виникла помилка!',
      })
    }
  } else {
    return res
      .status(400)
      .json({ message: 'Не всі данні введені' })
  }
})

router.post('/receive', (req, res) => {
  const userId = +req.body.userId
  const receiveSum = +req.body.receiveSum
  const systemType = +req.body.systemType

  if (receiveSum || systemType) {
    try {
      console.log(
        'Ответ с receive',
        receiveSum,
        systemType,
        userId,
      )
      Payment.credit(userId, null, receiveSum, systemType)
      return res.status(200).json({
        //id: usr.id,
        // code: usr.code,
        message: 'Гроші переведені',
      })
    } catch (e) {
      console.log('>>>>>>>>>>>>>>', e)
      return res.status(500).json({
        message: 'Виникла помилка!',
      })
    }
  } else {
    return res
      .status(400)
      .json({ message: 'Не всі данні введені' })
  }
})

router.post('/send', (req, res) => {
  const userId = +req.body.userId
  const agentEmail = req.body.agentEmail
  const sum = req.body.sum

  if (agentEmail && sum) {
    try {
      const usr = User.getByEmail(agentEmail)

      if (!usr)
        return res.status(400).json({
          message: 'Невідомий отримувач!',
        })

      const usrId = usr.id

      if (userId === usrId) {
        return res
          .status(403)
          .json({ message: 'Заборонено!' })
      }

      Payment.debit(userId, usrId, +sum)

      return res.status(200).json({
        id: usrId,
        message: 'Користувачy переведені гроші',
      })
    } catch (e) {
      return res.status(500).json({
        message: 'Виникла помилка!',
      })
    }
  } else {
    return res
      .status(400)
      .json({ message: 'Не всі данні введені' })
  }
})


// Експортуємо глобальний роутер

module.exports = router
