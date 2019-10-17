'use strict'
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use("App/Models/Category");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Model} ctx.model
   */

  /**
   * Obtener todas las categorias
   */

  async index({ request, response }) {
    const { limit } = request.all() || 20;
    const { page } = request.all().limit || 1;
    const categories = await Category.query()
      .orderBy("id", "desc")
      .paginate(page, limit);
    response.status(200).json({
      message: "Todas las categorias",
      data: categories
    });
  }

  /**
   * Obtener categoria por id
   */
  async show({ params, response }) {
    let { id } = params;
    const category = await Category.findByOrFail("id", id);
    response.status(200).json({
      data: category
    });
  }

  /**
   * Creando una categoria
   */
  async store({ request, response }) {
    let { title, description, status } = request.all();
    const category = new Category();
    category.fill({
      title,
      description,
      status
    });
    await category.save();
    response.status(201).json(
      { message: "Categoria creada con exito" },
      { success: true }
    );
  }

   /**
   * Actualizando una categoria
   */
  async update({ params, request, response }) {
    let { id } = params;
    let { title, description, status } = request.all();
    const category = await Category.findByOrFail("id", id);

    category.title = title;
    category.description = description;
    category.status = status;

    if (!category) {
      response.status(404).json(
        { message:'Categoria no encontrada' }
      )
    }


    await category.save();
    response.status(200).json({
      status: true,
      data: category
    });

  }

    /**
   * Eliminado una categoria
   */

  async destroy({ params, response }) {
    let { id } = params;
    const category = await Category.findByOrFail("id", id);
    if (!category) {
      response.status(404).json(
        { message:'Categoria no encontrada' }
      )
    }
    await category.delete();
    response.status(204).json({
      status: true
    });
  }



}

module.exports = CategoryController
