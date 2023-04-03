const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

//Para que me manden un rango de precio:
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();




const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),

  //Recordar que el categoryId del producto debe ser igual al id de la categoria, sino no es valido

  categoryId:categoryId.required(), //Si no ponemos esto,insomnia dara error, pq necesito un categoryId en mi producto
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,

  image: image,
  description:description,
  categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});
const queryProductSchema = Joi.object({ //query params para el offset y limit, y price
   limit,
   offset,
   price,
   price_min,
   //Quiero que si me colocan un minimo, el precio maximo sea requerido:
   price_max: price_max.when('price_min',{

    is: Joi.number().integer(), //Aca puedo poner un valor fijo tambien, 5 por ejemplo
    then: Joi.required(),

   })

});

module.exports = { createProductSchema, updateProductSchema, getProductSchema,queryProductSchema};
