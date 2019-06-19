//need get for intial app componentdidMount, gets all users in the db and sets it as the state
//post

const express = require('express')
const UsersRouter = express.Router()
const jsonParser = express.json()
const UsersService = require('./users-service')

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

    })


UsersRouter
    .route('/refresh')


module.exports = UsersRouter
