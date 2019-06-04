require('dotenv').config()

module.exports = {
    "migrationDirectory": "migrations",
    "driver": "pg",
    "host": process.env.MIGRATIONS_DB_HOST,
    "port": process.env.MIGRATIONS_DB_PORT,
    "database": process.env.MIGRATIONS_DB_NAME,
    "username": process.env.MIGRATIONS_DB_USER
}