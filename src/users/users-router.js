//need get for intial app componentdidMount, gets all users in the db and sets it as the state
//post

const express = require('express')
const UsersRouter = express.Router()
const jsonParser = express.json()

//similar to auth router folder
UsersRouter
    .route('/login')
    .post(jsonParser, (req, res, next) => {

    })

//users router folder
UsersRouter
    .route('/register')
    .post(jsonParser, (req, res, next) => {
        
    })


UsersRouter
    .route('/refresh')
