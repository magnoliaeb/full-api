'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.string('name',100).notNullable()
      table.string('lastname', 100)
      table.string('dni', 20).notNullable().unique()
      table.string('phone', 20).notNullable()
      // tipo de usuario admin (1) o cliente (0)
      table.boolean('type').defaultTo(0).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
