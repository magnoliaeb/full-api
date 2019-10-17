'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnitSchema extends Schema {
  up () {
    this.create('units', (table) => {
      table.increments()
      table.string('symbol').notNullable().unique()
      table.text('description')
      table.boolean('status').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('units')
  }
}

module.exports = UnitSchema
