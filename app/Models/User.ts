import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidV4 } from 'uuid';

import Schedule from './Schedule';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @hasMany(() => Schedule)
  public schedules: HasMany<typeof Schedule>

  @column()
  public name: string;

  @column()
  public surname: string;

  @column()
  public email: string;

  @column()
  public password: string;

  @column()
  public isAdmin: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  constructor() {
    super();
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
