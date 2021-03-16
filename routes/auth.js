const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/register', async(req, res) => {
  const { username, password, name } = req.body

  // simple validation
  if (!name || !username || !password) {
    return res.render('register', { message: 'Please try again' })
  }

  const passwordHash = bcrypt.hashSync(password, 10)
  const user = new User({
    name,
    username,
    password: passwordHash
  })

  await user.save()
  req.session.user = user
  res.render('index', { user })
})

router.post('/hospital', async(req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({
    username
  })

  
  if (user) {
    req.session.user = user
    const isCorrect = bcrypt.compareSync(password, user.password)

    if (isCorrect) {
      return res.render('ticket',{ username: user.username, password: password})
    } else {
      return res.render('hospitalDate', { message: 'กรุณาลองอีกครั้ง: ไม่มีหมายเลขโรงพยาบาลนี้' })
    }
  } else {
    return res.render('hospitalDate', { message: 'กรุณาลองอีกครั้ง: ชื่อนี้ไม่มีอยู่ในระบบ' })
  }
})

module.exports = router