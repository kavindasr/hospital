require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    secret: process.env.SECRET || 'Matara',
    token_exp: process.env.TOKEN_EXP || 100000,
    saltRound: process.env.SALT_ROUND || 10,
}