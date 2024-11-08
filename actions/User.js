import User from '../models/User.js';
const argon2 = require('argon2');

async function getUserMongo(filters){
    const userFiltered = await User.findOne(filters);
    return userFiltered; 
}


async function getUsersMongo(filters){
    const usersquantity = await User.countDocuments(filters);
    const usersFiltered = await User.find(filters);

    return {
        results: usersFiltered,
        // paginaMax: Usersquantity / 20,
        Usersquantity : usersquantity
    }; 
}

async function createUserMongo(data) {
    data.password = await argon2.hash(data.password, { type: argon2.argon2id });
    const usuarioCreado = await User.create(data);

    return usuarioCreado;
}

async function updateUserMongo(id, changes) {
    const resultado = await User.findByIdAndUpdate(id, changes);

    return resultado
}

async function deleteUserMongo(id) {
    const resultado = await User.findByIdAndUpdate(id, {disabled:true});
    return resultado;
}

module.exports = {
    createUserMongo,
    getUserMongo,
    getUsersMongo,
    updateUserMongo,
    deleteUserMongo
};

