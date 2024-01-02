// Підключаємо роутер до бек-енду
const fs = require('fs').promises
const path = require('path')

const express = require('express')
const router = express.Router()

const { User } = require('../class/user')

const storageFolderPath = '../temp'

User.create({
  email: 'test@mail.com',
  password: 123,
})

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

router.get('/myusers', (req, res) => {
  const users = User.getList()

  return res.status(200).json(users)
})

router.post('/myusers', (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    try {
      if (User.isExists(email)) {
        return res.status(409).json({
          message: 'Користувач з таким email вже існує',
        })
      }

      User.create({ email, password })
      console.log('Данные от клиента:', email, password)

      return res
        .status(201)
        .json({ message: 'Інфа відправлена' })
    } catch (e) {
      res.status(500).json({
        message: 'Виникла помилка!',
      })
    }
  } else {
    console.log('Не всі данні введені')
    res
      .status(400)
      .json({ message: 'Не всі данні введені' })
  }
})
// Експортуємо глобальний роутер
module.exports = router
