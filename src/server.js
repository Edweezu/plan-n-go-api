const app = require('./app')
const PORT = require('./config').PORT
//const { PORT } = require('./config') 

// const PORT = process.env.PORT || 8000


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})