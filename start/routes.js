'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.group(() => {
  Route.post('auth/register','AuthController.register')
  Route.post('auth/login','AuthController.login')

  // peril del usuario
  Route.resource('profile','ProfileController').apiOnly()
  // mis categorias
  Route.resource('categories','CategoryController').apiOnly()
  // mis marcas
  Route.resource('brands','BrandController').apiOnly()
  // mis unidates
  Route.resource('units','UnitController').apiOnly()
}).prefix('api')


// Route.get('/', () => {
//   return { greeting: 'Hello world in JSON' }
// })
