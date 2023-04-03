const faker = require('faker');
const boom = require('@hapi/boom');


//Traemos los operadores de sequelize para hacer el filtrado por rango de precios
const {Op} = require('sequelize')


//TODO ESTO FUNCIONA AL ENPOINT DE PRODUCTS

//ORM SEQUELIZE

const {Sequelize} = require('./../libs/sequelize');
const sequelize = require('./../libs/sequelize');
const {models} = require('./../libs/sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();

  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
   const newProduct = await models.Product.create(data); //Que nos cree un nuevo producto con base a la informacion
   return newProduct;
  }

  async find(query) {

    const options = {
      include: ['category'],
      where : {}, //Si el usuario no me ingresa nada, no devuelvo nada
    }
    const {limit,offset} = query; //Me traigo el limit y el offset

    //Si existe ese limit y offset
    if(limit && offset) { //Para hacerlo de forma dinamica
      options.limit = limit;
      options.offset = offset;
    }

    const {price} = query;

    if(price) { //Si existe un precio que me pasaron por parametro

      options.where.price = price; //Si el precio que me pasan existe, hace el filtrado por el findAll

    }

    const {price_min,price_max} = query;
    if(price_min && price_max) {

      options.where.price = {
        [Op.gte] : price_min, //mayor o igual al precio minimo
        [Op.lte] : price_max, //Menor o igual al precio maximo

      };

    }

   //Ahora con sequelize puedo usar programacion orientada a objetos
 const products = await models.Product.findAll(options);
 return products;
}

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
