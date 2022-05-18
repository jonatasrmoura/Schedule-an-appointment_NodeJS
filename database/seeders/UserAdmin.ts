import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { v4 as uuidV4 } from 'uuid';

import User from 'App/Models/User';

export default class UserAdminSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        id: uuidV4(),
        name: 'Vini',
        surname: 'Sênior',
        email: 'vini@finpec.com.br',
        password: '123',
        isAdmin: true,
      },
      {
        id: uuidV4(),
        name: 'João',
        surname: 'Kraemer',
        email: 'jk@finpec.com.br',
        password: '123',
        isAdmin: true,
      },
      {
        id: uuidV4(),
        name: 'Jonatas',
        surname: 'Moura',
        email: 'jonatas.moura@finpec.com.br',
        password: '123',
        isAdmin: true,
      },
    ]);
  }
}
