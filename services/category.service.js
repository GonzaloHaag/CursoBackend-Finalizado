const boom = require('@hapi/boom');

const {models} = require('./../libs/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    //Creacion de una categoria luego de las migraciones y esquemas
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
   const categories = await models.Category.findAll();
   return categories;
  }

  async findOne(id) { //En el momento que busco una categoria

    const category = await models.Category.findByPk(id,{
      include: ['products'] //Para q devuelva los productos relacionados a esa categoria en un array
    }); //por id
    return category; //Asi devuelve todos los productos relacionados a esta categoria
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;
