'use strict'
const User = use("App/Models/User");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {
// un perfil pertenece a un usuario
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Profile
