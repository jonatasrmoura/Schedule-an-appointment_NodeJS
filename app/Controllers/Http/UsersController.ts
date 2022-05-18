import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { sign } from 'jsonwebtoken';

import User from '../../Models/User';

export default class UsersController {
  public async authenticate({ request }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password']);

    const user = await User.findBy('email', email);

    if (!user) {
      throw new Error("Email or Password incorrect!");
    }

    const comparePassword = await User.findBy('password', password);

    if (!comparePassword || comparePassword.password !== password) {
      throw new Error("Email or Password incorrect!");
    }

    const token = sign({}, "f57208dc433b16fc5d685fef83001e80", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn = {
      token,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      },
    };

    return tokenReturn;
  }

  public async store({ request, response }: HttpContextContract) {
    const {
      name,
      surname,
      email,
      password
    } = request.only(['name', 'surname', 'email', 'password']);

    const userExists = await User.findBy('email', email);

    if (userExists) {
      throw new Error('User already exists!');
    }

    await User.create({
      name,
      surname,
      email,
      password
    });

    return response.status(201).send('User created successfully!');
  }

  public async index({ request }: HttpContextContract) {
    const { email } = request.only(['email']);

    const user = await User.findBy('email', email);

    if (!user) {
      throw new Error('User do not exists!');
    }

    const userSchedules = await User.query().preload('schedules').where('email', email);

    return userSchedules;
  }
}
