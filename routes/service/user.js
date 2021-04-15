const ApiError = require('../helpers/ApiError');
const { getDatabase } = require('../helpers/get_database');
const { genHash, compare } = require('../helpers/bcrypt');
const { sign } = require('../helpers/jwt');
const ROLES = require('../enums/role');

const userRegistrationService = async (body) => {
    const database = await getDatabase();
    const userOld = await database.user.findOne({
        where: { nic: body.nic}
    });
    if (userOld) throw ApiError.conflicted();
    body.pswrd = await genHash(body.pswrd);
    
    await database.user.create(body);
}

const loginService = async (body) => {
    const database = await getDatabase();
    const user = await database.user.findOne({
        where: { nic: body.nic}
    }); 
    if (!user) throw ApiError.notfound({message: 'User not found'});

    const isValid = compare(body.pswrd, user.pswrd);
    if (!isValid) throw ApiError.unauthorized({message: 'Password mismatch'});

    const token_data = {
        nic: user.nic,
        user_name: user.user_name,
        role: user.role,
    }
    const token = sign(token_data);

    return {
        token,
        user: token_data,
        page: ROLES[token_data.role-1]
    }
}

module.exports = {
    userRegistrationService,
    loginService,
}