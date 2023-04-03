// const boom = require('@hapi/boom');

// const {models} = require('./../libs/sequelize');

// class OrderService {

//   constructor(){
//   }
//   async create(data) {
//     const newOrder = await models.Order.create(data);
//     return newOrder;
//   }
//   //Funcion para el addItem
//   async addItem(data) {
//     const newItem = await models.OrderProdcut.create(data);
//     return newItem;
//   }

//   async find() {
//     return [];
//   }

//   async findOne(id) {
//     const order = await models.Order.findByPk(id,{
//       // include: ['customer'] //Que reciba la relacion de clientes
//       // //Para esto sirve el as:'customer' en order.model.js
//       include: [
//         {
//           association : 'customer',
//           include: ['user'] //Ahora de esa asociacion me anidara al cliente y me saldra el usuario

//           /*
//           Salida en insomnia
//           {
// 	"id": 1,
// 	"customerId": 20,
// 	"createdAt": "2023-04-03T01:00:28.834Z",
// 	"customer": {
// 		"id": 20,
// 		"name": "Rodrigo",
// 		"lastName": "Haaagggg",
// 		"phone": "123221312",
// 		"createdAt": "2023-04-02T23:23:46.039Z",
// 		"userId": 1,
// 		"user": {
// 			"id": 1,
// 			"email": "gonzalote212@mail.com",
// 			"password": "gonzalito",
// 			"role": "customer",
// 			"createdAt": "2023-04-02T22:19:31.898Z"
// 		}
// 	}
// }
//           */
//         }, //tambien quiero que incluya a items
//         'items'
//       ]
//     }); //Ahora me arrojara la informacion de ese cliente
//     return order;
//   }

//   async update(id, changes) {
//     return {
//       id,
//       changes,
//     };
//   }

//   async delete(id) {
//     return { id };
//   }

// }

// module.exports = OrderService;

const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return order;
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

module.exports = OrderService;
