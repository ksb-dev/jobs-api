const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
//const { BadRequestError } = require('../errors')
//const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  // Not recommended

  // const { name, email, password } = req.body

  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide name, email & password')
  // }

  // ------------------------------

  //const { name, email, password } = req.body

  // Hash password before creating & saving to DB (but here it is not recommended)

  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(password, salt)

  // const tempUser = { name, email, password: hashedPassword }
  // const user = await User.create({ ...tempUser })

  // --------------------------------

  // 2. Create User
  const user = await User.create({ ...req.body })

  // 3. Generate Token
  // const token = jwt.sign(
  //   { userId: user._id, name: user.name },
  //   process.env.JWT_SECRET,
  //   {
  //     expiresIn: '30d'
  //   }
  // )

  const token = user.generateToken()

  // 4. Send respone with token
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })

  //res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
  res.send('Login user')
}

module.exports = {
  register,
  login
}
