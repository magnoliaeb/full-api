'use strict'
/** @type {import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

class AuthController {
  /**
   *
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Model} ctx.model
   */

  // async show({ response, auth }) {
  //   const user = await auth.getUser()
  //   console.log(user);
  // }

  async login ({ request, response, auth }) {
    let { email, password } = request.all();

      if (auth.attempt(email,password)) {
        let user = await User.findBy('email', email)
        const accessToken = await auth.generate(user)
        return response.json({"user":user, "access_token": accessToken})

      }


}

async register ({ request, response}) {
    let { email, username, password } = request.all();
    const user = new User();
    user.fill({
        username,
        email,
        password
    })
   await user.save();
  //  let accessToken = await auth.generate(user)

   return response.status(200).json({
       message:'Ususario creado',
      //  accessToken:accessToken,
       data:user
   })
}

async logout (auth) {
  await auth.logout();
}



}

module.exports = AuthController
