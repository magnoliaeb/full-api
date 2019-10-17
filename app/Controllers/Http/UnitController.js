'use strict'
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Unit = use("App/Models/Unit");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with units
 */

class UnitController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Model} ctx.model
   */

  /**
   * Obtener todas las unidades
   */

  async index({ request, response }) {
    const { limit } = request.all() || 20;
    const { page } = request.all().limit || 1;
    const units = await Unit.query()
      .orderBy("id", "desc")
      .paginate(page, limit);
    response.status(200).json({
      message: "Todas las unidades",
      data: units
    });
  }

  /**
   * Obtener unidad por id
   */
  async show({ params, response }) {
    let { id } = params;
    const unit = await Unit.findByOrFail("id", id);
    response.status(200).json({
      data: unit
    });
  }

  /**
   * Creando una unidad
   */
  async store({ request, response }) {
    let { symbol, description, status } = request.all();
    const unit = new Unit();
    unit.fill({
      symbol,
      description,
      status
    });
    await unit.save();
    response.status(201).json(
      { message: "Unidad creada con exito" },
      { success: true }
    );
  }

   /**
   * Actualizando una unidad
   */
  async update({ params, request, response }) {
    let { id } = params;
    let { symbol, description, status } = request.all();
    const unit = await Unit.findByOrFail("id", id);

    unit.symbol = symbol;
    unit.description = description;
    unit.status = status;

    if (!unit) {
      response.status(404).json(
        { message:'Unidad no encontrada' }
      )
    } 
    
    await unit.save();
    response.status(200).json({
      status: true,
      data: unit
    });

  }

    /**
   * Eliminado una unidad
   */

  async destroy({ params, response }) {
    let { id } = params;
    const unit = await Unit.findByOrFail("id", id);
    if (!unit) {
      response.status(404).json(
        { message:'Unidad no encontrada' }
      )
    } 
    await unit.delete();
    response.status(204).json({
      status: true
    });
  }

  

}


module.exports = UnitController
