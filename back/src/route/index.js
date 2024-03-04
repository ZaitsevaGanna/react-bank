// Підключаємо роутер до бек-енду
//const fs = require('fs').promises
//const path = require('path')

const jwt = require('jsonwebtoken')

const express = require('express')
const cors = require('cors')
const router = express.Router()

const { User } = require('../class/user')
const { Notification } = require('../class/notification')

router.use(cors())
//const { UserSession } = require('../class/userSession')

//const storageFolderPath = '../temp'

const defUser = User.create({
  email: 'test@mail.com',
  password: 123456,
})

defUser.isConfirm = true

const secretKey = 'your-secret-key'

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res
      .status(401)
      .json({ error: 'Access denied. Token not provided.' })
  }

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

router.get('/notifications', (req, res) => {
  const notifications = Notification.getList()

  res.status(200).json(notifications)
})

// router.get(`/notifications/user`, (req, res) => {
//   const { userId } = req.query

//   const notifications = Notification.getListById(userId)

//   res.status(200).json(notifications)
// })

router.get('/users', (req, res) => {
  const users = User.getList()

  res.status(200).json(users)
})

router.get('/balance', authenticateToken, (req, res) => {
  res.json({
    message: 'This is a secure endpoint.',
    user: req.user,
  })
})
router.get(
  '/transaction',
  authenticateToken,
  (req, res) => {
    res.json({
      message: 'This is a secure endpoint.',
      user: req.user,
    })
  },
)

router.post('/signup', (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    try {
      if (User.isExists(email)) {
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

router.post('/signin', (req, res) => {
  const { email, password } = req.body

  if (email && password) {
    try {
      const usr = User.getByEmail(email)
      console.log('>====Мой юзер', usr)

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

          // Создание JWT-токена
          const token = jwt.sign(user, secretKey)

          res.json({ token, user })

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
// Експортуємо глобальний роутер
module.exports = router

// Підключіть файли роутів
// const test = require('./test')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
// router.use('/', test)
// Використовуйте інші файли роутів, якщо є

// router.get('/users', async (req, res) => {
//   if (userList.length === 0) {
//     userList = await loadData('users', storageFolderPath)
//   }

//   res.status(200).json(userList)
// })

// router.post('/users', async (req, res) => {
//   try {
//     const data = req.body
//     userList.push(data)
//     console.log('Данные от клиента:', data)

//     const result = await saveData(
//       userList,
//       'users',
//       storageFolderPath,
//     )
//     if (result.isSuccess) {
//       res.status(201).json(result.msg)
//     } else {
//       res.status(400).json(result.msg)
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: 'Произошла ошибка при сохранении данных.',
//     })
//   }
// })

// async function saveData(data, fileName, folderPath) {
//   const jsonData = JSON.stringify(data, null, 2)
//   const res = {}
//   const filePath = path.join(folderPath, `${fileName}.json`)

//   try {
//     await checkOrCreateFolder(folderPath)
//     await fs.writeFile(filePath, jsonData)
//     res.msg = 'Данные успешно записаны в файл.'
//     res.isSuccess = true
//     console.log(res.msg)
//     return res
//   } catch (err) {
//     res.msg = 'Ошибка при записи в файл:'
//     res.isSuccess = false
//     console.error(res.msg, err)
//     throw res
//   }
// }

// async function loadData(fileName, folderPath) {
//   const filePath = path.join(folderPath, `${fileName}.json`)

//   try {
//     const fileContent = await fs.readFile(filePath, 'utf8')
//     const parsedData = JSON.parse(fileContent)
//     console.log(
//       'Файл успешно загружен и распарсен:',
//       parsedData,
//     )
//     return parsedData
//   } catch (error) {
//     console.error(
//       'Ошибка при чтении или парсинге файла:',
//       error,
//     )
//     return []
//     //throw error
//   }
// }

// async function checkOrCreateFolder(folderPath) {
//   try {
//     await fs.access(folderPath)
//   } catch (error) {
//     console.log(`Папка ${folderPath} не существует.`)
//     await fs.mkdir(folderPath)
//     console.log(`Папка ${folderPath} успешно создана.`)
//   }
// }
