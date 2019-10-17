'use strict'
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Brand = use("App/Models/Brand");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with brands
 */

class BrandController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Model} ctx.model
   */

  /**
   * Obtener todas las marcas
   */

  async index({ request, response }) {
    const { limit } = request.all() || 20;
    const { page } = request.all().limit || 1;
    const brands = await Brand.query()
      .orderBy("id", "desc")
      .paginate(page, limit);
    response.status(200).json({
      message: "Todas las marcas",
      data: brands
    });
  }

  /**
   * Obtener marca por id
   */
  async show({ params, response }) {
    let { id } = params;
    const brand = await Brand.findByOrFail("id", id);
    response.status(200).json({
      data: brand
    });
  }

  /**
   * Creando una marca
   */
  async store({ request, response }) {
    let { title, description, status } = request.all();
    const brand = new Brand();
    brand.fill({
      title,
      description,
      status
    });
    await brand.save();
    response.status(201).json(
      { message: "Marca creada con exito" },
      { success: true }
    );
  }

   /**
   * Actualizando una marca
   */
  async update({ params, request, response }) {
    let { id } = params;
    let { title, description, status } = request.all();
    const brand = await Brand.findByOrFail("id", id);

    brand.title = title;
    brand.description = description;
    brand.status = status;

    if (!brand) {
      response.status(404).json(
        { message:'Marca no encontrada' }
      )
    } 
    
    await brand.save();
    response.status(200).json({
      status: true,
      data: brand
    });

  }

    /**
   * Eliminado una marca
   */

  async destroy({ params, response }) {
    let { id } = params;
    const brand = await Brand.findByOrFail("id", id);
    if (!brand) {
      response.status(404).json(
        { message:'Marca no encontrada' }
      )
    } 
    await brand.delete();
    response.status(204).json({
      status: true
    });
  }

  

}

module.exports = BrandController
