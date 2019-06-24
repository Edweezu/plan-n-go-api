//need get for intial app componentdidMount, gets all users in the db and sets it as the state
//post
const path = require('path')
const express = require('express')
const UsersRouter = express.Router()
const jsonParser = express.json()
const UsersService = require('./users-service')
const { requireAuth } = require('../middleware/jwt-auth')

//similar to auth router folder
UsersRouter
    .route('/login')
    .post(jsonParser, (req, res, next) => {
        const { username, password } = req.body
        const loginUser = { username, password }
        const db = req.app.get('db')

        for(const [key, value] of Object.entries(loginUser)) {
            if (value == null) {
                return res.status(400).json({
                    error: `Missing '${key} in request body`
                })
            }
        }

        UsersService.getUserWithUserName(
            db,
            loginUser.username
          )
            .then(dbUser => {
              if (!dbUser)
                return res.status(400).json({
                  error: 'Incorrect user_name or password',
                })
      
              return UsersService.comparePasswords(loginUser.password, dbUser.password)
                .then(compareMatch => {
                  if (!compareMatch)
                    return res.status(400).json({
                      error: 'Incorrect user_name or password',
                    })
      
                  const sub = dbUser.username
                  const payload = { user_id: dbUser.id }
                  res.send({
                    authToken: UsersService.createJwt(sub, payload),
                  })
                })
            })
            .catch(next)

    })

//users router folder
UsersRouter
    .route('/register')
    .post(jsonParser, (req, res, next) => {
        const { password, username } = req.body
        const db = req.app.get('db')


    for (const field of ['username', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    const passwordError = UsersService.validatePassword(password)

    if (passwordError)
      return res.status(400).json({ error: passwordError })

    UsersService.hasUserWithUserName(
      db,
      username
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` })

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              username,
              password: hashedPassword
            }

            return UsersService.insertUser(
              db,
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user))
              })
          })
      })
      .catch(next)
    })


UsersRouter
    .route('/refresh')
    .post(requireAuth, (req, res,) => {
        const sub = req.user.user_name
        const payload = { user_id: req.user.id }
        res.send({
            authToken: UsersService.createJwt(sub, payload),
        })
    })


module.exports = UsersRouter
