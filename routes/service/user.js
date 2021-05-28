const ApiError = require('../helpers/ApiError');
const { getDatabase } = require('../helpers/get_database');
const { genHash, compare } = require('../helpers/bcrypt');
const { sign } = require('../helpers/jwt');
const ROLES = require('../enums/role');
const user = require('../models/user');

const userRegistrationService = async (body) => {
    const database = await getDatabase();
    const userOld = await database.user.findOne({
        where: { nic: body.nic}
    });
    console.log(userOld)
    if (userOld) throw ApiError.conflicted({ message: 'Can not create the user' });
    body.password = await genHash(body.password);
    const role = body.role;
    
    delete body.role;
    const user = await database.user.create(body);

    const sepecificUser = (body.departmentId)? 
                        {userNic: body.nic, departmentId: body.departmentId}
                        :{userNic: body.nic}
    try{
        await database[role].create(sepecificUser);
    }catch (error){
        await user.destroy();
        throw ApiError.conflicted({ message: 'Can not create the user' });
    }   
}

const loginService = async (body) => {
    const database = await getDatabase();
    const user = await database.user.findOne({
        where: { nic: body.nic}
    });   
    if (!user) throw ApiError.notfound({message: 'User not found'});
    
    const isValid = compare(body.password, user.password);
    if (!isValid) throw ApiError.unauthorized({message: 'Password mismatch'});
    
    const doctor = await user.getDoctor();
    const nurse = await user.getNurse();
    const dWoker = await user.getDWoker();
    
    let role
    if(doctor){
        role=doctor.dataValues;
        role.type="doctor";
        role.homepage= ROLES.doctor
    }else if(nurse){
        role=nurse.dataValues;
        role.type="nurse";
        role.homepage=ROLES.nurse
    }else{
        role=dWoker.dataValues;
        role.type="dWoker";
        role.homepage=ROLES.dWoker[(role.departmentId).toString()]
    }
    const token_data = {
        nic: user.nic,
        user_name: user.name,
        role
    }
    const token = sign(token_data);
    
    return {
        token,
        user: token_data,
    }
}

module.exports = {
    userRegistrationService,
    loginService,
}