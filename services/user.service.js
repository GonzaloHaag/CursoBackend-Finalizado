const boom = require('@hapi/boom');

const {models} = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    //Creacion de usuario, se conecta con el userEsquema que requiere obligatoriamente unos datos
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    //El modelo es User
    const respuesta = await models.User.findAll({
      include: ['customer']
    });//Voy al modelo y a User que es mi tabla
    return respuesta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user) { //Si no encuentra el usuario arrojo un error tipo boom

      throw boom.notFound('user no encontrado');

    }
    return user;
  }

  async update(id, changes) { //Actulizar user
    const user = await this.findOne(id); //Vamos a buscar por id --> Busco el findOne ya que si no lo encuntra dara error, para no repetir codigo
    const respuesta =  await user.update(changes); //Aplico cambios
    return respuesta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy(); //Si lo encuentra que lo borre

    return {id};
  }
}

module.exports = UserService;
